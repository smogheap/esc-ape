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
	mode: "title",  //"menu", "game", "taunt", "credits"
	nextMode: "title",
	acceptInput: false,
	input: false,
	lastKey: null,
	grabLeft: false,
	anchor: {
		"x": -1,
		"y": -1
	},
	hit: {
		"x": -1,
		"y": -1
	},
	nextGrab: {
		"x": -1,
		"y": -1
	},
	level: 0,
	coins: 0,
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
	}
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


function changeScene(next) {
	APE.nextMode = next;
	APE.acceptInput = false;
	APE.transitionOut = true;
	APE.scene.transition(APE.transition, APE.transitionOut,
						 APE.width / 2, APE.height / 2);
}

function transitionEnd() {
	//set up next scene etc
	if(APE.transitionOut) {
		APE.scene.removeOBJs();
		APE.scene.removeBGs();
		APE.mode = APE.nextMode;
		switch(APE.mode) {
		default:
		case "title":
			initTitle();
			break;
		case "menu":
			initMenu();
			break;
		case "credits":
			initCredits();
			break;
		}
		APE.transitionIn = true;
	}
	APE.transitionOut = !APE.transitionOut;
	APE.acceptInput = APE.transitionOut;
	APE.lastKey = null;
}

function animateMenu(time) {
	var sin300 = Math.sin(time / 300);

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

	// '#' at anchor point
	APE.thing.hash.x = APE.anchor.x;
	APE.thing.hash.y = APE.anchor.y;

	// 'x' at collision point(?)
	APE.thing.reticle.x = APE.hit.x;
	APE.thing.reticle.y = APE.hit.y;

	// '!' at next grab point
	APE.thing.target.x = APE.nextGrab.x;
	APE.thing.target.y = APE.nextGrab.y;

	if(APE.hit.x > APE.width) {
		changeScene("game");
	} else if(APE.hit.x < 0) {
		changeScene("credits");
	}
}

function handleinput(time) {
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
			APE.anchor.x = APE.nextGrab.x;
			APE.anchor.y = APE.nextGrab.y;
		}
		break;
	case "title":
	default:
		if(APE.input) {
			APE.input = false;
			changeScene("menu");
		}
	}
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

	APE.scene.addBG(APE.thing.title, "title");
}
function initCredits() {
	APE.coins = 0;
	APE.level = 0;

	APE.scene.addBG(APE.thing.title, "title");
}
function initMenu() {
	APE.coins = 0;
	APE.level = 0;

	APE.scene.setBG("#006800");

	APE.scene.addOBJ(APE.thing.ape, "ape");
	APE.thing.ape.scale = 2; // show the ape bigger for menu
	// set up tags for ape's hands
	APE.thing.ape.setTags(["ropen", "lclose"]);
	APE.grabLeft = true;
	// set up anchor point for animation
	APE.anchor.x = (APE.width / 2);
	APE.anchor.y = (APE.height / 2);

	APE.scene.addOBJ(APE.thing["credits"], "credits");
	APE.thing.credits.x = (APE.width / 6);
	APE.thing.credits.y = (APE.height * 7 / 8);

	APE.scene.addOBJ(APE.thing["play"], "play");
	APE.thing.play.x = (APE.width * 5 / 6);
	APE.thing.play.y = (APE.height * 7 / 8);

	APE.thing.reticle = new penduinTEXT("x", 100, "white", true, true, true);
	APE.scene.addTEXT(APE.thing.reticle, "mark");
	APE.thing.hash = new penduinTEXT("#", 100, "white", true, true, true);
	APE.scene.addTEXT(APE.thing.hash, "hash");
	APE.thing.target = new penduinTEXT("!", 100, "white", true, true, true);
	APE.scene.addTEXT(APE.thing.target, "target");
	//var text = new penduinTEXT("################", 200, "white", false, false, true);
	//APE.scene.addTEXT(text, "hashes");
	//text.y = -80;
}

function start() {
	console.log("start");
	APE.acceptinput = true;
	APE.scene = new penduinSCENE(APE.canvas, APE.width, APE.height,
								 tick, 60);
	//APE.scene.showFPS(true);

	initTitle();
	APE.scene.transition(APE.transition, APE.transitionOut,
						 APE.width / 2, APE.height / 2);
}

window.addEventListener("load", function() {
	APE.canvas = document.querySelector("#display");
	var cbs = [];

	// load object armatures
	Object.keys(APE.json).every(function(key) {
		cbs.push(function(cb) {
			APE.thing[key] = new penduinOBJ(APE.json[key], cb);
			return true;
		});
		return true;
	});

	// load transitions
	cbs.push(function(cb) {
		APE.transition = new penduinTRANSITION(transitionEnd);
		cb(true);
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
