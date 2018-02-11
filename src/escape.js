APE = {
	canvas: null,
	width: 1920,
	height: 1080,
	json: {},
	thing: {},
	scene: null,
	transition: null,
	transitionIn: false,
	transitionOut: false,
	mode: null,  // "title", "menu", "game", "taunt", "credits"
	nextMode: null,
	acceptInput: false,
	input: false,
	lastKey: null,
	grabLeft: false,
	showDebug: false,
	lastGamepadState: null,
	anchor: {
		x: -1,
		y: -1
	},
	hit: {
		x: -1,
		y: -1
	},
	nextGrab: {
		x: -1,
		y: -1
	},
	newAction: false,
	freefall: false,
	speed: {
		x: 0,
		y: 0
	},
	tally: false,
	level: 0,
	coins: 0,
	gotCoin: false,
	levels: [
		{
			name: "lv01",
			map: {
				canvas: null,
				ctx: null,
				data: null,
				scale: 0
			},
			start: {
				x: 180,
				y: 116
			},
			coin: {
				x: 700,
				y: 840
			}
		}
	]
};
function LOAD(json) {
	var data = json;
	var name = data.name || "anonymous";
	APE.json[name] = data;
}
if(!console) {
	console = {
		log: function() {},
		error: function() {}
	};
}
function combineCallbacks(cbList, resultsVary, cb) {
	var results = [];
	var res = [];
	var uniq = [];
	while(results.length < cbList.length) {
		results.push(null);
	}
	cbList.every(function(callback, idx) {
		return callback(function(val) {
			res.push(val);
			results[idx] = val;
			if(uniq.indexOf(val) < 0) {
				uniq.push(val);
			}
			if(res.length === cbList.length) {
				if(uniq.length === 1) {
					cb(uniq[0], results);
				} else if(uniq.length > 1) {
					cb(resultsVary, results);
				} else {
					cb(null, results);
				}
			}
		});
	});
}


function changeScene(next, skipTrans) {
	if(APE.nextMode) {
		// hold your horses, we're not changed from before yet!
		return;
	}
	var x = APE.width / 2;
	var y = APE.height / 2;
	switch(APE.mode) {
	case "menu":
	case "game":
		x = APE.hit.x;
		y = APE.hit.y;
	default:
		break;
	}
	APE.nextMode = next;
	APE.acceptInput = false;
	APE.transitionOut = true;
	if(skipTrans) {
		transitionEnd();
	} else {
		APE.scene.transition(APE.transition, APE.transitionOut, x, y);
	}
}

function transitionEnd() {
	//set up next scene etc
	if(APE.transitionOut) {
		APE.scene.clear();
		APE.thing.coin.setInstances(null);
		APE.mode = APE.nextMode;
		switch(APE.mode) {
		default:
		case "title":
			initTitle();
			break;
		case "menu":
			initMenu();
			break;
		case "game":
			initGame();
			break;
		case "credits":
			initCredits();
			break;
		case "taunt":
			initTaunt();
			break;
		}
		APE.transitionIn = true;
	}
	APE.transitionOut = !APE.transitionOut;
	APE.acceptInput = APE.transitionOut;
	APE.lastKey = null;
	APE.nextMode = null;
}

function animateMenu(time) {
	var sin300 = Math.sin(time / 300);

	// animate signs just for fun
	APE.thing.credits.$.sign.rotate = sin300 * 5;
	APE.thing.play.$.sign.rotate = sin300 * -5;

	// animate howto
	if(sin300 > 0) {
		APE.thing.menu.setTags(["right"]);
		APE.thing.menu.$.key.offset.y = APE.height / 3;
		APE.thing.menu.$.key.scale = 0.35;
	} else {
		APE.thing.menu.setTags(["left"]);
		APE.thing.menu.$.key.offset.y = APE.height / 3 -40;
		APE.thing.menu.$.key.scale = 0.4;
	}

	// animate ape
	APE.thing.ape.x = APE.anchor.x;
	APE.thing.ape.y = APE.anchor.y;
	if(APE.grabLeft) {
		ape_hangleft(APE.thing.ape, time);
		APE.hit.x = APE.anchor.x + sin300 * 150;
		APE.nextGrab.x = APE.anchor.x + sin300 * 290;
	} else {
		ape_hangright(APE.thing.ape, time);
		APE.hit.x = APE.anchor.x - sin300 * 150;
		APE.nextGrab.x = APE.anchor.x - sin300 * 290;
	}
	APE.hit.y = APE.anchor.y + 90;
	APE.nextGrab.y = APE.anchor.y;

	if(APE.showDebug) {
		// red at anchor point
		APE.thing.targetred.x = APE.anchor.x;
		APE.thing.targetred.y = APE.anchor.y;

		// yellow at collision point(?)
		APE.thing.targetyellow.x = APE.hit.x;
		APE.thing.targetyellow.y = APE.hit.y;

		// blue at next grab point
		APE.thing.targetblue.x = APE.nextGrab.x;
		APE.thing.targetblue.y = APE.nextGrab.y;
	}
}

function animateGame(time) {
	var sin300 = Math.sin(time / 300);
	var cos300 = Math.cos(time / 300);

	// animate ape

	if(APE.newAction) {
		// something changed (grabbed, let go, etc), let's see what's going on
		APE.newAction = false;

		if(canGrab(APE.nextGrab.x, APE.nextGrab.y)) {
			APE.freefall = false;
			APE.anchor.x = APE.nextGrab.x;
			APE.anchor.y = APE.nextGrab.y;
		} else if(APE.freefall && canGrab(APE.thing.ape.x, APE.thing.ape.y)) {
			// if we're falling, grab with either hand
			APE.freefall = false;
			APE.anchor.x = APE.thing.ape.x;
			APE.anchor.y = APE.thing.ape.y;
		} else {
			if(APE.freefall) {
				// cancel flipped input
				APE.grabLeft = !APE.grabLeft;
			} else {
				// jump! tick will move us
				APE.speed.y = -Math.abs(sin300 * 10);

				if(APE.grabLeft) {
					APE.thing.ape.x = APE.thing.ape.x - sin300 * 155;
					APE.speed.x = sin300 * -5;
				} else {
					APE.thing.ape.x = APE.thing.ape.x + sin300 * 155;
					APE.speed.x = sin300 * 5;
				}
				APE.thing.ape.y = APE.thing.ape.y - 45;
			}
			APE.freefall = true;
		}
	}
	//console.log("y launch speed", -Math.abs(sin300 * 10));
	/*
	if(APE.grabLeft) {
		console.log("x launch speed", sin300 * -5);
	} else {
		console.log("x launch speed", sin300 * 5);
	}
*/
	
	// keep doing what we're doing
	if(APE.freefall) {
		//TODO: flailing animation?
	} else {
		// swinging as usual
		APE.thing.ape.x = APE.anchor.x;
		APE.thing.ape.y = APE.anchor.y;
	}
	if(APE.grabLeft) {
		ape_hangleft(APE.thing.ape, time);
		APE.hit.x = APE.thing.ape.x + sin300 * 75;
		APE.nextGrab.x = APE.thing.ape.x + sin300 * 155;
	} else {
		ape_hangright(APE.thing.ape, time);
		APE.hit.x = APE.thing.ape.x - sin300 * 75;
		APE.nextGrab.x = APE.thing.ape.x - sin300 * 155;
	}
	APE.hit.y = APE.thing.ape.y + 45;
	APE.nextGrab.y = APE.thing.ape.y;
	APE.thing.ape.x = APE.thing.ape.x;
	APE.thing.ape.y = APE.thing.ape.y;

	if(APE.showDebug) {
		// red at anchor point
		APE.thing.targetred.x = APE.thing.ape.x;
		APE.thing.targetred.y = APE.thing.ape.y;

		// yellow at collision point(?)
		APE.thing.targetyellow.x = APE.hit.x;
		APE.thing.targetyellow.y = APE.hit.y;

		// blue at next grab point
		APE.thing.targetblue.x = APE.nextGrab.x;
		APE.thing.targetblue.y = APE.nextGrab.y;
	}

	// animate coin
	if(!APE.gotCoin) {
		coin_spin(APE.thing.coin, time);
	}
}

function animateTaunt(time) {
	// animate coin
	coin_spin(APE.thing.coin, time);
}

function animateCredits(time) {
	APE.thing.creditsbg.$.sky.rotate = time / 360;
}

/* Simply detect if any button has changed state */
function pollGamepad() {
	let gamepads;
	let prev;

	if (navigator.getGamepads) {
		gamepads = navigator.getGamepads();
	} else if (navigator.webkitGetGamepads) {
		gamepads = navigator.webkitGetGamepads();
	} else {
		gamepads = [];
	}

	if (!gamepads[0]) {
		return;
	}

	prev = [];
	for (let g = 0, pad; pad = gamepads[g]; g++) {
		prev[g] = [];

		for (let b = 0, btn; btn = pad.buttons[b]; b++) {
			if (APE.lastGamepadState &&
				APE.lastGamepadState[g] &&
				APE.lastGamepadState[g][b] !== btn.pressed
			) {
				APE.input = true;
			}

			prev[g][b] = btn.pressed;
		}
	}

	APE.lastGamepadState = prev;
}

function handleinput(time) {
	pollGamepad();

	switch(APE.mode) {
	case "menu":
	case "game":
		if(APE.input) {
			APE.input = false;
			if(APE.grabLeft) {
				APE.thing.ape.removeTags(["ropen", "lclose"]);
				APE.thing.ape.addTags(["rclose", "lopen"]);
			} else {
				APE.thing.ape.removeTags(["rclose", "lopen"]);
				APE.thing.ape.addTags(["ropen", "lclose"]);
			}
			// switch hands
			APE.grabLeft = !APE.grabLeft;
			APE.newAction = true;
			APE.anchor.x = APE.nextGrab.x;
			APE.anchor.y = APE.nextGrab.y;
		}
		break;
	case "taunt":
		if(APE.input) {
			APE.input = false;
			if(APE.level >= APE.levels.length) {
				changeScene("credits");
			} else {
				changeScene("game");
			}
		}
	case "title":
	case "credits":
	default:
		if(APE.input) {
			APE.input = false;
			if(APE.tally) {
				changeScene("title");
			} else {
				changeScene("menu");
			}
		}
	}
}

function reachedGoal(x, y) {
	//blue channel
	return APE._mapData.data[((Math.floor(y * APE._mapScale) *
							   (APE._mapData.width * 4)) +
							  (Math.floor(x * APE._mapScale) * 4)) + 2];
}
function canGrab(x, y) {
	//green channel
	return APE._mapData.data[((Math.floor(y * APE._mapScale) *
							   (APE._mapData.width * 4)) +
							  (Math.floor(x * APE._mapScale) * 4)) + 1];
}
function isSolid(x, y) {
	//red channel
	return APE._mapData.data[((Math.floor(y * APE._mapScale) *
							   (APE._mapData.width * 4)) +
							  (Math.floor(x * APE._mapScale) * 4)) + 0];
}
function touchCoin(x, y) {
	return (x - 64 < APE._coinx && x + 64 > APE._coinx &&
			y - 64 < APE._coiny && y + 64 > APE._coiny);
}

function tick(scene, time) {
	if(APE.acceptInput) {
		handleinput(time);
	}
	switch(APE.mode) {
	case "title":
	default:
		break;
	case "menu":
		animateMenu(time);
		if(APE.hit.x > APE.width * 7/8) {
			changeScene("game");
		} else if(APE.hit.x < APE.width * 1/8) {
			changeScene("credits");
		}
		break;
	case "game":
		animateGame(time);
		if(APE.freefall) {
			APE.thing.ape.x += APE.speed.x;
			APE.thing.ape.y += APE.speed.y;
			if(APE.speed.x > 0) {
				APE.speed.x -= 0.02;
			} else {
				APE.speed.x += 0.02;
			}
			APE.speed.y += 0.5;
		}

		// finish level
		if(!APE.tally && reachedGoal(APE.hit.x, APE.hit.y)) {
			// TODO: winning jingle
			APE.tally = true;
			var next = "game";
			APE.level++;
			if(APE.gotCoin) {
				APE.coins++;
			}
			if(APE.level >= APE.levels.length || APE.gotCoin) {
				next = "taunt";
			}
			changeScene(next);
		}

		// if we fall off the screen, start over
		if(APE.thing.ape.x < 0 || APE.thing.ape.x > APE.width ||
		   APE.thing.ape.y > APE.height) {
			changeScene("game");
		}
		// collect coin
		if(!APE.gotCoin && touchCoin(APE.hit.x, APE.hit.y)) {
			APE.gotCoin = true;
			APE.scene.removeOBJ("coin");
		}
		break;
	case "taunt":
		animateTaunt(time);
		break;
	case "credits":
		animateCredits(time);
		break;
	};
	if(APE.transitionIn) {
		APE.transitionIn = false;
		APE.scene.transition(APE.transition, false,
							 APE.width / 2, APE.height / 2);
	}
}


function initTitle() {
	APE.coins = 0;
	APE.level = 0;
	APE.tally = false;

	APE.scene.addBG(APE.thing.title, "title");
	//TODO: music
}
function initCredits() {
	APE.scene.setBG("#6888fc");
	APE.scene.addOBJ(APE.thing.creditsbg, "creditsbg");
	APE.scene.addOBJ(APE.thing.escape, "escape");
	APE.thing.escape.x = APE.width / 2;
	APE.thing.escape.y = APE.height / 3;

	var owen =    new penduinTEXT("Owen Swerkstrom - graphics, programming",
							   50, "white", false, false, true);
	owen.x = APE.width * 4/16;
	owen.y = APE.height * 10/16;
	var micah =   new penduinTEXT("Micah N Gorrell - concept",
								50, "white", false, false, true);
	micah.x = APE.width * 4/16;
	micah.y = APE.height * 11/16;
	var special = new penduinTEXT("      Kim Guyer - ideas and understanding",
								  50, "white", false, false, true);
	special.x = APE.width * 4/16;
	special.y = APE.height * 12/16;

	APE.scene.addTEXT(owen);
	APE.scene.addTEXT(micah);
	APE.scene.addTEXT(special);
}
function initMenu() {
	APE.coins = 0;
	APE.level = 0;

	APE.scene.setBG("#006800");
	APE.scene.addOBJ(APE.thing.menu, "menu");

	APE.scene.addOBJ(APE.thing.vine01, "vine");
	var inst = [];
	for(var i = 0; i < 7; ++i) {
		inst.push({
			x: i * (563/2) - 1,
			y: APE.height / 2 - 55
		});
	}
	APE.thing.vine01.setInstances(inst);

	APE.scene.addOBJ(APE.thing.ape, "ape");
	APE.thing.ape.scale = 2; // show the ape bigger for menu
	// set up tags for ape's hands
	APE.thing.ape.setTags(["ropen", "lclose"]);
	APE.grabLeft = true;
	// set up anchor point for animation
	APE.anchor.x = (APE.width / 2);
	APE.anchor.y = (APE.height / 2 - 55);

	APE.scene.addOBJ(APE.thing["credits"], "credits");
	APE.thing.credits.x = (APE.width / 6);
	APE.thing.credits.y = (APE.height * 7 / 8);

	APE.scene.addOBJ(APE.thing["play"], "play");
	APE.thing.play.x = (APE.width * 5 / 6);
	APE.thing.play.y = (APE.height * 7 / 8);

	var howto = new penduinTEXT("Hold any key/button/etc and release!",
								50, "white", false, false, true);
//	howto.x = 0;
//	howto.y = 0;
	howto.x = APE.width * 3/12;
	howto.y = APE.height * 1/12;
	APE.scene.addTEXT(howto, "howto");

	APE.scene.addOBJ(APE.thing.targetred);
	APE.scene.addOBJ(APE.thing.targetyellow);
	APE.scene.addOBJ(APE.thing.targetblue);
	APE.thing.targetred.x = APE.thing.targetred.y = -100;
	APE.thing.targetyellow.x = APE.thing.targetyellow.y = -100;
	APE.thing.targetblue.x = APE.thing.targetblue.y = -100;
	//var text = new penduinTEXT("################", 200, "white", false, false, true);
	//APE.scene.addTEXT(text, "hashes");
	//text.y = -80;
}
function initGame() {
	// cache some stuff for quick lookups
	APE._mapData = APE.levels[APE.level].map.data;
	APE._mapScale = APE.levels[APE.level].map.scale;
	APE._coinx = APE.levels[APE.level].coin.x;
	APE._coiny = APE.levels[APE.level].coin.y;
	console.log(APE._mapData);
	APE.gotCoin = false;

	APE.scene.addBG(APE.thing.lv01);
	APE.scene.addOBJ(APE.thing.ape, "ape");
	APE.scene.addOBJ(APE.thing.coin, "coin");
	APE.thing.ape.scale = 1;
	APE.thing.coin.scale = 1;
	APE.anchor.x = APE.levels[APE.level].start.x;
	APE.anchor.y = APE.levels[APE.level].start.y;
	APE.thing.coin.x = APE.levels[APE.level].coin.x;
	APE.thing.coin.y = APE.levels[APE.level].coin.y;

	APE.scene.addOBJ(APE.thing.targetred);
	APE.scene.addOBJ(APE.thing.targetyellow);
	APE.scene.addOBJ(APE.thing.targetblue);
	APE.thing.targetred.x = APE.thing.targetred.y = -100;
	APE.thing.targetyellow.x = APE.thing.targetyellow.y = -100;
	APE.thing.targetblue.x = APE.thing.targetblue.y = -100;

	APE.tally = false;
	APE.freefall = false;
	APE.grabLeft = true;
	APE.input = false;
	APE.newAction = false;
	APE.thing.ape.removeTags(["rclose", "lopen"]);
	APE.thing.ape.addTags(["ropen", "lclose"]);
}
function initTaunt() {
	APE.scene.addBG(APE.thing.taunt);

	APE.scene.addOBJ(APE.thing.coin, "coin");
	APE.thing.coin.scale = 2;
	var inst = [];
	for(var i = 0; i < APE.coins; ++i) {
		inst.push({
			x: (APE.width / 2) - ((APE.coins - 1) * 50) + (i * 100),
			y: APE.height * 3/5
		});
	}
	APE.thing.coin.setInstances(inst);

	var theend = false;
	var taunts = [
		"Shouldn't ever see this one...",
		"What does an ape need with a gold coin?",
		"You had one already; your greed sickens me!",
		"Well-trained ape, collecting shiny money.",
		"Money won't buy your escape, ape.",
		"Monkey see, monkey accrue.",
		"What are you, saving up for a toll tree?"
	];
	var str = "Finding finding funds fun?";
	if(APE.coins < taunts.length) {
		str = taunts[APE.coins];
	}
	if(APE.level >= APE.levels.length) {
		// endings
		theend = true;
		APE.tally = true;
		if(APE.coins === APE.levels.length) {
			str = "Esc the ape failed to escape capitalism.";
		} else if(APE.coins) {
			str = "Esc the ape's freedom was risked for "+ APE.coins +" coins.";
		} else {
			str = "Esc the ape escaped, flat broke.";
		}
	}
	var taunt = new penduinTEXT(str, 50, "white", false, false, true);
	taunt.x = APE.width / 6;
	taunt.y = APE.height * 3/4;
	APE.scene.addTEXT(taunt);
	if(theend) {
		var end = new penduinTEXT("THE END", 200, "white", false, false, true);
		end.x = APE.width / 4;
		end.y = APE.height * 1/3;
		APE.scene.addTEXT(end);
	}
}

function start() {
	console.log("start");
	APE.acceptinput = true;
	APE.scene = new penduinSCENE(APE.canvas, APE.width, APE.height,
								 tick, 60);
	APE.scene.setBG("#000000");
	//APE.scene.showFPS(true);

	changeScene("title", true);
//	changeScene("taunt", true);
//	changeScene("game", true);
}

window.addEventListener("load", function() {
	APE.canvas = document.querySelector("#display");
	var cbs = [];

	// load object armatures and backgrounds
	Object.keys(APE.json).every(function(key) {
		cbs.push(function(cb) {
			APE.thing[key] = new penduinOBJ(APE.json[key], cb);
			return true;
		});
		return true;
	});

	// load transitions
	APE.transition = new penduinTRANSITION(transitionEnd, undefined,
										   undefined, 500);
	// load level maps
	APE.levels.every(function(lv) {
		console.log(lv);
		var img = document.getElementById(lv.name);
		lv.map.canvas = document.createElement("canvas");
		lv.map.canvas.width = img.width;
		lv.map.canvas.height = img.height;
		lv.map.scale = img.width / APE.width;
		lv.map.ctx = lv.map.canvas.getContext("2d");
		lv.map.ctx.drawImage(img, 0, 0);
		lv.map.data = lv.map.ctx.getImageData(0, 0, img.width, img.height);
		return true;
	});

	combineCallbacks(cbs, null, start);
});


function newInput(e) {
	// whether up or down, an input change is what we care about
	if(APE.acceptInput) {
		if(e.keyCode) {
			// hack to ignore key repeat
			if(e.type === "keydown" && !APE.lastKey) {
				APE.lastKey = e.keyCode;
				APE.input = true;
				//console.log("ok 'cause new keydown");
			}
			if(e.type === "keyup" && APE.lastKey === e.keyCode) {
				APE.lastKey = null;
				APE.input = true;
				//console.log("ok 'cause matching keyup");
			}
		} else {
			APE.input = true;
			//console.log("ok 'cause not a key");
		}
	}
}
window.addEventListener("keydown", newInput);
window.addEventListener("keyup", newInput);
window.addEventListener("mousedown", newInput);
window.addEventListener("mouseup", newInput);
window.addEventListener("touchend", newInput);
window.addEventListener("touchstart", newInput);
window.addEventListener("gamepadconnected", pollGamepad);

/*
window.addEventListener("click", function() {
});

function handlekey(event, down) {
	console.log("here", APE.input);
	switch(event.keyCode) {
	case 38:  //up
	case 104: //num8
	case 87:  //w
		break;
	case 40:  //down
	case 98:  //num2
	case 83:  //s
		break;
	case 37:  //left
	case 100: //num4
	case 65:  //a
		break;
	case 39:  //right
	case 102: //num6
	case 68:  //d
		break;
	case 32:  //space
		break;
	case 27:  //esc
		break;
	case 42:  //printscreen
		if(down) {
			console.log("screenshot");
			APE.scene.screenshot();
		}
		break;
	default:
//		console.log(event.keyCode);
		return;
		break;
	}
	event.preventDefault();
};
window.addEventListener("keydown", function(e) {
	handlekey(e, true);
});
window.addEventListener("keyup", function(e) {
	handlekey(e, false);
});
*/
