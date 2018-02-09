APE = {
	canvas: null,
	width: 1920,
	height: 1080,
	json: {},
	thing: {},
	scene: null
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


function animate(time) {
	ape_test(APE.thing.ape, time);
	
	ape_test(APE.thing.miniape, time + 500);
	APE.thing.miniape.x += 3;
	if(APE.thing.miniape.x > APE.width) {
		APE.thing.miniape.x = 0;
	}
}

function spititem() {
	if(isempty(APE.pos.x, APE.pos.y) && isempty(APE.pos.x, APE.pos.y - 1)) {
		if(APE.inv.bub) {
			APE.inv.bub--;
			inventory();
			APE.anim = APE.action = "spitbub";
		} else if(APE.inv.key) {
			APE.inv.key--;
			inventory();
			APE.anim = APE.action = "spitkey";
		}
	}
}

function handleinput(time) {
}

function tick(scene, time) {
	handleinput(time);
	animate(time);
}


function start() {
	console.log("start");
	APE.acceptinput = true;
	APE.scene = new penduinSCENE(APE.canvas, APE.width, APE.height,
								 tick, 60);
	APE.scene.showFPS(true);

	APE.scene.addOBJ(APE.thing.ape, "ape");
	APE.thing.ape.x = (APE.width / 2);
	APE.thing.ape.y = (APE.height / 2);
	console.log(APE.thing.ape.$);

	APE.scene.addOBJ(APE.thing.miniape, "miniape");
	APE.thing.miniape.x = 0;
	APE.thing.miniape.y = (APE.height / 8);

	APE.scene.setBG("#006800");

	var text = new penduinTEXT("################", 200, "white", false, false, true);
	APE.scene.addTEXT(text, "hashes");
	text.y = -80;
	
	//APE.scene.setVignette("image/scribble/vign01.png");
	//APE.scene.setGhost(0.75);
	//APE.scene.setGlow(0.6, 6);
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

	// extra stuff
	cbs.push(function(cb) {
		var mini = JSON.parse(JSON.stringify(APE.json["ape"]));
		mini.scale = 0.1;
		APE.thing["miniape"] = new penduinOBJ(mini, cb);
		return true;
	});

	combineCallbacks(cbs, null, start);
});

window.addEventListener("click", function() {
});


function handlekey(event, down) {
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
