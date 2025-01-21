// update is called once per frame
//import gamepad;
import { platforms } from "./platforms.js";
//import { player1_movement } from "./thal.js";
import { TERRAIN, ZEN, dot_order, pnode, PLAT_STYLE, BRANCH, T } from "./objects.js";
import { CHUNKS } from "./chunks.js";
import { 
	mini_map, build_chunk,
	dot_, dot_image, dot_w, get_chunk_info, init_curr_chunk_ids, biome_variance_index,
	herringbone_tile, m_chunk, w_chunk, d_chunk, s_chunk, p_chunk,
	rocky, drawImageFromArray
 } from "./game_functions.js";

//import { tileinfo } from "./objects.js";
//import { build_test_level } from "./build_level.js";
//import { build_level } from "./build_level.js";


//var gamepad1 = gamepads[0];
//gamepad;
var WHATAMI = 0;

const COOL_PLACES = {
	0: { x: 0, y: 0 },
	1: { x: -157, y: -532 }, // mountain
	2: { x: -68, y: -42 }, // big forest to the northwest
	3: { x: -52, y: -260}, // weird snow target pattern thing way up north
	
	// new map (these are the chunk numbers, not the x and y)
	4: { x: 510, y:8 },
	5: { x: 550, y:50 },
	6: { x: -27, y: -1 },
	7: { x: 27, y: 317 }, // lots of lakes
	8: { x: 11, y: 336 }, // lhrt
	9: { x: -529, y: -660},
	10: {x: -542, y: -639},
	11: { x: -560, y: -651},
	12: { x: -563, y: -634 },
	13: { x: -533, y: -637 },
	14: { x: 1, y: 23 },
	
};

const cool_place = 1;

// temporary for chunks
const INIT_X = COOL_PLACES[cool_place].x;
const INIT_Y = COOL_PLACES[cool_place].y;



var SHOW_MAP = 1;

/*

forests:
	-68, -42  big forest to the northwest

mountain peaks:
	88, -164 
*/


// Development/projects/thalgame




const WORLD_ID = document.getElementById("world_id_info").innerHTML;
const SAVE_STATE = document.getElementById("save_state_info").innerHTML;

var X_CLICK = 0;
var Y_CLICK = 0;





//const bleeper = require('pixelbox/bleeper');
//import { level_01_grid } from "./levels.js";
//import { level_02_grid } from "./levels.js";

//var level_01_image = getMap("map");
//var level_02_image = getMap("map2");

//var level_image = [...level_01_image];
//var grid;

//var grid_width = grid[0].length;
//var grid_height = grid.length;


var debug_msg = "";
var testing = true;

const G_W = 32;
const G_H = 24;
const SPRITE_PIXEL_SIZE = 8;
const SCREEN_WIDTH = SPRITE_PIXEL_SIZE * G_W;
const SCREEN_HEIGHT = SPRITE_PIXEL_SIZE * G_H;

//const SCROLL_LEFT = SCREEN_WIDTH
const XMID = Math.floor(SCREEN_WIDTH/2);
const YMID = Math.floor(SCREEN_HEIGHT/2);

//var Texture = require('pixelbox/Texture');
//var texture1 = new Texture(SCREEN_WIDTH, SCREEN_HEIGHT);

/* ============= textures and images ============= */
// backgrounds
var bg1 = assets.backgrounds.bg1;
var bg1b = assets.backgrounds.bg1b;
var bg2 = assets.backgrounds.bg2;
var bg1c = assets.backgrounds.bg1c;

var bg3a = assets.backgrounds.bg3a;
var bg3b = assets.backgrounds.bg3b;
var bg3c = assets.backgrounds.bg3c;
var bg3d = assets.backgrounds.bg3d;

var bg_rain = assets.foregrounds.light_rain;


// tilesheets
var ts_1 = assets.tilesheet_grassland;
var ts_wmap = assets.tilesheet_worldmap;
var ts_uwmap = assets.tilesheet_undermap;
//var ts_m = assets.tilesheet_mountain;
//var ts_2 = assets.tilesheet2;
//var ts_se = assets.tilesheet_enemies;
//var ts_a = assets.animations.title_screen.a;
//var ts_terrain = assets.tilesheet_terrain;

/* 
	south park style speech
		face = [
			0		[b p m]
			1		[a c d e g h i j k n s t u x y z]
			2		[o q r w]
			3		[l th]
			4		[f v ph]
		]
*/
var face = [
  assets.animations.thal_speech.face0,
  assets.animations.thal_speech.face1,
];

var face2 = [
  assets.animations.enx_speech.face0,
  assets.animations.enx_speech.face1,
];

var face_frames = [
  0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0
];

var face_frame = 0;

// rests at the bottom of the screen
var info_bar = assets.info_bar;



const block = {
	"wall": 241,
	"walls": [241, 242, 243,],
	"ground": 240,
	"grounds": [240, 241],
};










/* =============== random number generator ================ */
/* random number generator for seed. n is how many you need (source?)*/
function PRNG(input_string, n){
  // create seed state
  function xmur3(str) {
      for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
          h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
          h = h << 13 | h >>> 19;
      return function() {
          h = Math.imul(h ^ h >>> 16, 2246822507);
          h = Math.imul(h ^ h >>> 13, 3266489909);
          return (h ^= h >>> 16) >>> 0;
      }
  }
  // output randomizer
  function mulberry32(a) {
      return function() {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      }
  }
  var ssseed = xmur3(input_string);
  var rrrand = mulberry32(ssseed());
  var rands = [];
  for (let i=0; i<n; i++) { rands.push(rrrand()); }
  
  return rands;
}








//const seed = PRNG("who knows", 10000); // "Hello World" -> 0.6276661821175367, ...
const seed = PRNG(WORLD_ID, 10000); // "Hello World" -> 0.6276661821175367, ...
//const seed = PRNG("devil666", 10000); 
// each area can have its own seed

// how would this work if exported from another function?
// input starting iR, spit out final?
var iR = 0; //increment every time a new number is used

function rnd(min_, max_) {
  let value = min_ + Math.floor(seed[iR]*(max_-min_));
  iR++;
  if (iR >= seed.length) {
    iR=0;
  }
  return value;
}





// worldmap movement
/* ======================================================== */
function player1_world_movement() {
	
	// game pad controls override the keyboard
	if (gamepad1) {
		if (gamepad1.btn["A"]) { GP.B = 1; } else { GP.B = 0; }
		if (gamepad1.btn["B"]) { GP.A = 1; } else { GP.A = 0; }
		if (gamepad1.btn["up"] && !gamepad1.btn["start"]) { GP.L = 1; } else { GP.L = 0; }
		if (gamepad1.btn["down"] && !gamepad1.btn["start"]) { GP.R = 1; } else { GP.R = 0; }
		if (gamepad1.btn["back"]) { if (GP.Select) { GP.Select = 2; } else { GP.Select = 1; } } else { GP.Select = 0; }
		if (gamepad1.btn["start"]) { if (GP.Start) { GP.Start = 2; } else { GP.Start = 1; } } else { GP.Start = 0; }
		if (gamepad1.z >= 1) { GP.D = 1; } else { GP.D = 0; }
		if (gamepad1.z <= -1) { GP.U = 1; } else { GP.U = 0; }
	} else {
		//document.getElementById("world_id_info").innerHTML;
		// check if page was clicked (touch events)
		//console.log(sessionStorage.getItem("X")+" "+sessionStorage.getItem("Y"));
		
		
		switch (sessionStorage.getItem("X")) {
			
		  case "1":
				//console.log("right");
				GP.R = 1;
				break;
			case "-1":
				//console.log("left");
				GP.L = 1;
				break;
			default:
				GP.R = 0;
				GP.L = 0;
				
				
			
		}
		
		switch (sessionStorage.getItem("Y")) {
		  case "1":
				//console.log("down");
				GP.D = 1;
				break;
			case "-1":
				//console.log("up");
				GP.U = 1;
				break;
			default:
				GP.U = 0;
				GP.D = 0;
			
		}
		
		
		
		
	}
	
	if (btn.I) {
		pw.x += 4;
		pw.y += 4;
		//console.log("???");
	}
	
	if (btn.O) {
		tilesheet(ts_wmap);
		//console.log(all_seeds_test);
	}
	
	if (btn.P) {
		//pw.x = 2*8;
		//pw.y = 4*8;
		//console.log(chunk_set);
		//pw.cx = 0;
		//pw.cy = 0;
		
		tilesheet(ts_uwmap);
		//console.log(chunk_set);
		/*
		let cset = chunk_set[pw.cx+"_"+pw.cy]["image"];
		for (let cy=0; cy<16; cy++) {
			//console.log(cset[cy]);
			let sss = "";
			for (let cx=0; cx<16; cx++) {
				if (cset[cy][cx] < 10) {
					sss += cset[cy][cx]+"  ";
				} else {
					sss += cset[cy][cx]+" ";
				}
				
				//console.log(cset[cy][cx]);
			}
			console.log(sss);
		}
		/**/
		
		//flush_chunk_set(pw.cx, pw.cy);
	}
	
	let blocked = [1,2,20,35,41,61,63,60,610,620,63620,64620,630,640,63610,64610,62610,64630, 71,72,73,74,75,76];

	w_walking = 0;
	if (btn.R || GP.R) {
		w_walking = 1;
		going_left = false;
		if (!(blocked.includes(check_world_grid(pw.x+2, pw.y)))) { //&& check_world_grid(pw.x+2, pw.y+4) !== 1) {
			//console.log();
			if (1) {
				let xspeed = pw.x%3 ? 2 : 1;
				pw.x+= xspeed; 
			}
	 	}
	} else if (btn.L || GP.L) {
		w_walking = 1;
		going_left = true;
		if (!(blocked.includes(check_world_grid(pw.x-2, pw.y)))) { //&& check_world_grid(pw.x-2, pw.y+4) !== 1) {
			if (1) {
				let xspeed = pw.x%3 ? 2 : 1;
				pw.x-= xspeed; 
			}
	 	}
	}
	
	if (btn.A || GP.U) {
		w_walking = 1;
		if (!(blocked.includes(check_world_grid(pw.x, pw.y-2)))) { // && check_world_grid(pw.x+2, pw.y-4) !== 1) {
			if (1) {
				let yspeed = pw.y%3 ? 2 : 1;
				pw.y-= yspeed; 
			}
		}
	} else if (btn.D || GP.D) {
		w_walking = 1;
		// (check_grid(p.x, pB(p.y)) == 0) && (check_grid(p.x+7, pB(p.y)) == 0)
		if (!(blocked.includes(check_world_grid(pw.x, pw.y+2)))) { //&& check_world_grid(pw.x+2, pw.y+4) !== 1) {
			if (1) {
				let yspeed = pw.y%3 ? 2 : 1;
				pw.y+= yspeed; 
			}
		}
	}

}

var Ish = 768;
var pw_sheet_id = Ish;

var w_walking = 0;
var w_walking_index = 0;
//var w_walking_frames = [0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0]; //,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2];
//var w_walking_frames = [4,4,4,4,4,4,4,6,6,6,6,6,6,6,8,8,8,8,8,8,8,10,10,10,10,10,10,10,12,12,12,12,12,12,12, 14,14,14,14,14,14,14];
var w_walking_frames = [4,4,4,4,6,6,6,6,8,8,8,8,8,8,8,10,10,10,10,12,12,12,12,14,14,14,14,14,14];

function player1_world_animation() {
	if (w_walking) {
		w_walking_index++;
    if (w_walking_index >= w_walking_frames.length) {
			w_walking_index = 0;
		}
		pw_sheet_id = Ish + w_walking_frames[w_walking_index];
	} else {
		w_walking_index = 0;
		pw_sheet_id = Ish;
	}
	
	
}


var M_LAYER = -1;
var UNDERGROUND = 0;



/* ======================================================== */



// for players 1 and 2 (3 tiles tall, 2 tiles wide)
function get_psheet(anim_index){
  return [
    anim_index, anim_index+1,
    anim_index+16, anim_index+17,
    anim_index+32, anim_index+33
  ];
}






var HEAD = 0;
var HEAD2 = 2;


const XOFFSET = 4;
const YOFFSET = 16;



var p = { x: 0*8, y: 0*8 }; //player
var p2 = { x: 5*8, y: 29*8 }; //player2
var pw = { x: 8 *8 + INIT_X*16*8, y: 8 *8 + INIT_Y*16*8, cx: INIT_X, cy: INIT_Y }; //player
var pw2 = { x: 0*8, y: 0*8 }; //player2

var psheet = get_psheet(ZEN[HEAD].idle);
var psheet2 = get_psheet(ZEN[HEAD2].idle);
var going_left = false;
var going_left2 = false;


var bb_shots = [];
function create_bb_shot(px,py, pvx=0, pvy=0){
  var bb_ = {
    image: 192,
    x: px,//-XOFFSET, //XMID-px+50, 
    y: py-3,//-YOFFSET, //YMID-py+50, 
    vx: pvx, 
    vy: pvy, 
    frame: 0, // this is the index, goes from 0 to 41 vvv
    frames:[0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,1,2,1,2,1,2,1,2,1,2,2,2,2,2,3,2,3,2,3,2,3,2],
    last_hit: "",
    alive: true
  };
  bb_shots.push(bb_);
}

var snake_segs = [];
function create_snake(px,py, pvx=0, pvy=0){
  var ss_ = {
    image: 208,
    x: px,//-XOFFSET, //XMID-px+50, 
    y: py-8,//-YOFFSET, //YMID-py+50, 
    vx: pvx, 
    vy: pvy, 
    frame:0, 
    frames:[0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,],
    alive: true
  };
  snake_segs.push(ss_);
}
var snake = false;


//var door_areas = {};
// place in levelGraph
// door_areas[area_index][door_index]
//var doors = []; // within one area, will need double array for other areas

/*
function create_door(area, x, y, status=0, next, x_next, y_next) {
	// x and y are part of the grid, not the actual pixel values
	// locked: 0 is not locked, 1 needs key, 2 needs password
	// press down to close the door (might be useful?)
	
	let door = {
		"area": area,
		"x": x,
		"y": y,
		"status": status,
		"next": next,
		"x_next": x_next,
		"y_next": y_next,
		"open_images": [234, 235, 218, 219, 202, 203],
		"images": [
			234+(status*2), 
			235+(status*2), 
			218+(status*2), 
			219+(status*2), 
			202+(status*2), 
			203+(status*2)
		],
		
	};
	
	if (area in door_areas) {
		curr_area["exits"][]
		
		door_areas[area].push(door);
	} else {
		door_areas[area] = [door];
	}
}
/**/


// moving platforms

/*
var moving_platforms = [];
function create_platform(x, y, movetype, random_phase=true){
	let plat = {};
	for (let key in platforms[movetype]){
		plat[key] = platforms[movetype][key];
	}
	
	let rnd_pl_im = 0;//rnd(0, 3);
	
	plat.image = 226+rnd_pl_im;
	plat.x = x;
	plat.y = y-8;
	
  if (random_phase) {
    plat.vframe = rnd(0, plat.vx.length-1);
  }
  
  //moving_platforms.push(plat);
}*/


//var small_enemies = [];
function create_small_enemy(x,y, move_type="walkbump", image=0, random_phase=true){
  /* 
    get hp and other stats from library, depending on name
    
  */
  
  
  //[1,0,0,0,2,0,0,0], // [0,0,0,1] // very slow movement
  
  let xmove, ymove, move;// = []; 
  let vframe = 0;
  
  if (move_type == "steadyjump") {
    
    let xspeeds = [
      [
        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 
        1,0,1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0,1,0,
        1,0,1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0,1,0,
      ],
      [
        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 
        1,0,2,0,1,0,2,0,1,0, 2,0,1,0,2,0,1,0,2,0, 1,0,2,0,1,0,2,0,1,0,
        2,0,1,0,2,0,1,0,2,0, 1,0,2,0,1,0,2,0,1,0, 2,0,1,0,2,0,1,0,2,0,
      ],
      [
        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 
        1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,
      ],
    ];
    let rnd_xspeed = rnd(0, 3);
    xmove = xspeeds[rnd_xspeed];
    
    ymove = [
      0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0, // <- index 59
      -3,0,-3,0,-3,0,-2,0,-2,0, -2,0,-1,0,-1,0,-1,0,-1,0, 0,0,0,0,0,0,0,0,0, 0, // <- index 89
      0,0,0,0,0,0,0,0,0,0, 1,0,1,0,1,0,1,0,2,0, 2,0,2,0,3,0,3,0,3,0
    ];
    move = "steady"; // "upjump" 60 <= x && x < 90, "downjump" 90 <= x && x < 120
    
    let rnd_phase = rnd(0, 59);
    vframe = rnd_phase;
    
    
  } else if (move_type == "steadyfly") {
    
    // stationary. could have initial movement
    // random direction
    xmove = [0];
    ymove = [0];
    move = "steady";
     
  } else if (move_type == "hone") {
    
    xmove = [0];
    ymove = [0];
    move = "hone";
    
  } else if (move_type == "walkbump") {
    
    let xspeeds = [
      [1,0,0,0,0,2,0,0,0,0], [1,0,0,0,2,0,0,0], [1,0,0,2,0,0], 
      [1,0,2,0], [1,0,0,0,0,0,0,0,0,0], [1,1,2], [1,2]
    ];
    let rnd_xspeed = rnd(0, 6);
    xmove = xspeeds[rnd_xspeed];
    ymove = [0];//1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3];
    move = "walk";
    
  } else {
    // stationary
    xmove = [0];
    ymove = [0];
    move = "steady";
    
  }
  //let rnd_y = 
  
  
  
  
  
  var enemy = {
    image: image, // 0, 
    x: x,
    y: y-4, //?
    
    HP: 2,
    ATK: 1,
    SCORE: 50,
    
    move_type: move_type,
    move_phase: move, // for honing patterns, etc
    
    vx: xmove,
    vy: ymove,
    
    vxframe: vframe,
    vyframe: vframe,
    
    fallframe: 0,
    fall: [1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3],
    grounded: false,
    
    frames: [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3],
    frame: 0, //should be the index
    
    aframes: [0,1,2,3], // attack frames
    aframe: 0,
    attacking: false,
    going_left: true, // default for most platform games
    
    stuck_in_block: false,
    in_screen: true,
    dead_frame: 0, // +4 for dead sprite image
    dead_frames: -1, // will increment to get flashy effect
    alive: true
    
  };
  if (random_phase) {
    enemy.frame = rnd(0, enemy.frames.length-1);
  }
	
	
  //curr_area["small enemies"].push(enemy);
}
















// get pixel immediately outside of the 'collision' box
function pR(px){ return px+8+1; }
function pL(px){ return px-1; }
function pB(py){ return py+8+1; }
function pT(py){ return py-1; }








var score = 0;
var combo = 0; // increment
var combo_start = 0;




var nutmeg = 0;
var sugar = 0;
var cayenne = 0;
//var 

// deprecated
function check_world_grid_(px, py) {
	let px8 = Math.floor(Math.abs(px)/8)%16;
  let py8 = Math.floor(Math.abs(py)/8)%16;
	let curr_x8 = Math.floor(Math.abs(pw.x)/8)%16;
	let curr_y8 = Math.floor(Math.abs(pw.y)/8)%16;
	
	// account for negative side of the map (-x -y)
	if (pw.x < 0) {
		px8 = 15 - px8;
		curr_x8 = 15 - curr_x8;
		
	}
	if (pw.y < 0) {
		py8 = 15 - py8;
		curr_y8 = 15 - curr_y8;
	}
	
	try {
		return curr_chunk["collision_event"][py8+16][px8+16];
	} catch {
		return 0;
	}
	
}

function check_world_grid(px, py){
	/*
		15 is the rightmost and bottommost index of the chunk
		15 also happens to be the 'solid' tile label that we cant walk through
		these are two different 15s
	
	*/
  
	let px8 = Math.floor(Math.abs(px)/8)%16;
  let py8 = Math.floor(Math.abs(py)/8)%16;
	let curr_x8 = Math.floor(Math.abs(pw.x)/8)%16;
	let curr_y8 = Math.floor(Math.abs(pw.y)/8)%16;
	
	// account for negative side of the map (-x -y)
	if (pw.x < 0) {
		px8 = 15 - px8;
		curr_x8 = 15 - curr_x8;
		
	}
	if (pw.y < 0) {
		py8 = 15 - py8;
		curr_y8 = 15 - curr_y8;
	}
	
	
	
	
	// account for 'loop-collision' with curr_chunk wrap -- find grid for chunk map beside it
	let next_chunk = "";
	
	if (px8 === 15 && curr_x8 === 0) {
		
		next_chunk = (pw.cx-1)+"_"+pw.cy;
		let block_ = 0;
		try {
			block_ = chunk_set[next_chunk]["event"][py8][15]; // rightmost grid tile
			//block_ = chunk_set["collision_event"][py8][15];
			//block_ = curr_chunk["collision_event"][py8][px8];
			//console.log(block_);
			return block_;
		} catch (e) {
			//console.log(next_chunk);
			//console.log(chunk_set[next_chunk]);
		}
		
		
	}
	
	if (px8 === 0 && curr_x8 === 15) {
		next_chunk = (pw.cx+1)+"_"+pw.cy;
		let block_ = 0;
		try {
			block_ = chunk_set[next_chunk]["event"][py8][0]; // leftmost grid tile
			//block_ = chunk_set["collision_event"][py8][0];
			//console.log(block_);
			return block_;
		} catch (e) {
			//console.log(next_chunk);
			//console.log(chunk_set[next_chunk]);
		}
		
	}
	
	if (py8 === 15 && curr_y8 === 0) {
		next_chunk = pw.cx+"_"+(pw.cy-1);
		let block_ = 0;
		try {
			block_ = chunk_set[next_chunk]["event"][15][px8]; // bottommost most grid tile
			//block_ = chunk_set["collision_event"][15][px8];
			
			return block_;
		} catch (e) {
			//console.log(next_chunk);
			//console.log(chunk_set[next_chunk]);
		}
		
	}
	
	if (py8 === 0 && curr_y8 === 15) {
		next_chunk = pw.cx+"_"+(pw.cy+1);
		let block_ = 0;
		try {
			block_ = chunk_set[next_chunk]["event"][0][px8]; // topmost grid tile
			//block_ = chunk_set["collision_event"][0][px8];
			//console.log(block_);
			return block_;
		} catch (e) {
			//console.log(next_chunk);
			//console.log(chunk_set[next_chunk]);
			
		}
		
	}
	
	
	
	//console.log(pw.cx+"_"+pw.cy+" "+px8+" "+py8+" "+curr_x8+" "+curr_y8);
	
	
	//console.log(curr_chunk["event"]);
	
	try {
		
		//let grid_value = curr_chunk["collision_event"][py8][px8];
		let grid_value = curr_chunk["event"][py8][px8];
		
		/*
		//let grid_value_1 = curr_chunk["event"][py8+1][px8];
		if ([1,61,63].includes(grid_value)) {
			
			//console.log(curr_chunk);
			return grid_value;
			
		} else if (grid_value === 41) {
			return 1;
		} else if (grid_value === 65) {
			M_LAYER = 1;
			return 0;
		} else {
			return 0;
		}/**/
		return grid_value;
		//
	} catch (e) {
		//console.log("e");
		return 0;
	} /**/
}


function check_grid(px, py){
  let px8 = Math.floor(px/8);
  let py8 = Math.floor(py/8);
  if (px8 >= width || py8 >= height || px8 < 0 || py8 < 0 ) {
    return 1; 
  } else {
		if (!(isNaN(parseFloat(px)) && isNaN(parseFloat(py)))) {
			//console.log(py8+" "+px8);
			try {
				return level_grid_[py8][px8];
			} catch (err) {
				console.log(p.y+" "+p.x);
				throw err;
			}
		}
  }
}

function check_event_grid(px, py){
	//if (px && py) {
	  let px8 = Math.floor(px/8);
	  let py8 = Math.floor(py/8);
		//console.log("px8 "+px8+" py8 "+py8);
	
		//console.log(level_events_[py8][px8]);
	  if (px8 >= width || py8 >= height || px8 < 0 || py8 < 0 ) {
	    return 1; 
	  } else {
	  	return level_events_[py8][px8]; // 1
	  }
		//} 
}

function snap_right(px){
  return Math.floor(pL(px)/8)*8+8;
}

function snap_left(px){
  return Math.floor(px/8)*8;
}

function snap_down(py){
  return Math.floor(py/8)*8 +8;
}

function snap_up(py){
  return Math.floor(py/8)*8;
}



var pgridx = Math.floor(p.x/8);
var pgridx2 = Math.floor(p2.x/8);
var pgridy = Math.floor(p.y/8);
var pgridy2 = Math.floor(p2.y/8);


var right_check = 0;
var right_check2 = 0;
var left_check = 0;
var left_check2 = 0;
var down_check = 0;
var down_check2 = 0;
var up_check = 0;
var up_check2 = 0;


var bumped_sound = false;
var bumped_sound2 = false;
var bonked_sound = false;
var bonked_sound2 = false;
var shoot_sound = false;
var shoot_sound2 = false;
var door_sound = false;
var door_sound2 = false;

var grounded = false;
var grounded2 = false;
var on_platform = false;
var on_platform2 = false;



var can_wall_jump = false;

// blinking
var pidle_frames = [
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
];

// up-down movement
var pidle_frames2 = [
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

var pidle_index = 0;
var pidle_index2 = 0;

var pwalk_frames = [0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5];
var pwalk_frames2 = [0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5];
var pwalk_index = 0;
var pwalk_index2 = 0;


// used in both the animation and the count
var shooting = false;
var shooting2 = false;
var pshoot_frames = [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1];
var pshoot_frames2 = [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1];
var pshoot_index = 0;
var pshoot_index2 = 0;

var skidding = false;
var skidding2 = false;
var pskid_frames = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var pskid_frames2 = [0,0,0,0,0,0,0,0,0,0,0];
var pskid_index = 0;
var pskid_index2 = 0;

var pframe = 0;
var pframe2 = 0;

var jumping = false;
var jumping2 = false;
var jump = [4,4,3,3,3,2,2,2,2,1,1,1,1,1];//,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var jump2 = [3,3,3,3,3,2,2,2,2,1,1,1,1,1];
var j = 0;
var j2 = 0;

var fall = [0,0,0,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3];
var fall2 = [0,0,0,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3];
var f = 0;
var f2 = 0;

var running = false;
var running2 = false;
var run = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2];//,1,2,1,2,1,2,1,2,1,2,1,2,1,2];// 7 is the maximum, otherwise clipping happens
var run2 = [1,1,1,1,1,1,1,1,1,1,1,1,1,2];
var r = 0;
var r2 = 0;

var sliding = false;
var sliding2 = false;
var slide = [2,2,2,1,1,1,0];
var slide2 = [2,2,2,2,1,1,1,1,1,1,1,1,0];
var s = slide.length-1; //last should always be 0
var s2 = slide2.length-1; //last should always be 0

var climbing = false;
var climbing2 = false;
var pclimb_frames = [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1];
var pclimb2_frames = [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1];
var pclimb_index = 0;
var pclimb_index2 = 0;
//var c = climb.length-1; //last should always be 0
//var c2 = climb2.length-1; //last should always be 0

var hurting = false;
var hurting2 = false;
var hurt_frames = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0];
var knock_back = [2,2,1, 1, 1,0,0];
var knock_back_y = [-1,-1,-1, 0,0,0,0];
var hurt2_frames = [0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0];
var hurt_index = 0;
var hurt2_index = 0;

var entering = 0;
var unlock_fail_sound = false;
var penter_frames = [
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
];
var penter_index = 0;

var door_animation = false;


var areasavepoint = -1;
var activate_reenter_bexit = -1;


var bg_width = 256;
//var bg_depth_scroll_1 = 0;


var test_toggle_anim = false;
var paused = false;


var GP = {
	"A": 0,
	"B": 0,
	"U": 0,
	"D": 0,
	"L": 0,
	"R": 0,
	"Start": 0,
	"Select": 0
}



function player1_movement() {
  
	// game pad controls override the keyboard
	if (gamepad1) {
		if (gamepad1.btn["A"]) { GP.B = 1; } else { GP.B = 0; }
		if (gamepad1.btn["B"]) { GP.A = 1; } else { GP.A = 0; }
		if (gamepad1.btn["up"] && !gamepad1.btn["start"]) { GP.L = 1; } else { GP.L = 0; }
		if (gamepad1.btn["down"] && !gamepad1.btn["start"]) { GP.R = 1; } else { GP.R = 0; }
		if (gamepad1.btn["back"]) { if (GP.Select) { GP.Select = 2; } else { GP.Select = 1; } } else { GP.Select = 0; }
		if (gamepad1.btn["start"]) { if (GP.Start) { GP.Start = 2; } else { GP.Start = 1; } } else { GP.Start = 0; }
		if (gamepad1.z >= 1) { GP.D = 1; } else { GP.D = 0; }
		if (gamepad1.z <= -1) { GP.U = 1; } else { GP.U = 0; }
	}
	
	//console.log("checking  "+p.x+" "+p.y);
	
	
	
	// ======= temporary - testing speech =======
  if (!test_toggle_anim) {
    if ((btn.S && btn.B) || GP.Select === 1) {
      //tilesheet(ts_anim);
      test_toggle_anim = true;
      face_frame = 0;
    }
  } else if ((btn.S && btn.A) || GP.Select === 1) {
    //tilesheet(ts_0);
    test_toggle_anim = false;
    if (HEAD) { HEAD = 0; }
    else { HEAD = 1; }
  } else {
    if (face_frame < face_frames.length-1) {
      face_frame++;
    }// else {face_frame = face_frames.length-1;}
    return;
  }
	
	if (!paused) {
		if (GP.Start === 1) {
			assets.bleeper.incorrect.play();
			paused = true;
		}
	} else if (GP.Start === 1) {
		assets.bleeper.correct.play();
		paused = false;
	} else {
		return;
	}
	
	
	if (btn.U) {
		reset_position("3");
	} else {
		cheat_up = 0;
	}
	
	if (btnp.P) {
		reset_position("P");
	}
	if (btnp.O) {
		reset_position("O");
	}
	if (btnp.K) {
		reset_position("K");
	}
	if (btnp.I) {
		reset_position("I");
	}
  
	if (unlocking_door) {
		unlocking_door--;
		return;
	} 
	if (trying_door_fail) {
		trying_door_fail--;
		return;
	}
	if (opening_door) {
		opening_door--;
		return;
	}
	if (entering_door) {
		entering_door--;
		return;
	}
	
	
	
	/*
  if (entering) { // entering should be a number instead of boolean
		console.log("p1_movement(): if("+entering+")");
		
		if (entering === 2 && !unlock_fail_sound) {
			assets.bleeper.unlock_fail.play();
			unlock_fail_sound = true;
			activated_area = -1;
			//penter_index = penter_frames.length-1;
		} else if (entering === 1) {
			//console.log("  entering is 1");
		}
		
		if (penter_index >= penter_frames.length-1 ) {
			
			
			penter_index = 0;
			//activated_area = -1;
			if (entering === 1) {
				console.log("   !    entering === "+entering);
				
				//p.x = ready_enter_door["gotox"]*8;
				//p.y = ready_enter_door["gotoy"]*8;
				//console.log(ready_enter_door);
				//console.log(p.x+" "+p.y);
				//entering = 0; // ?
			}  else {
				console.log("   !    not entering === 1    entering === "+entering);
				//ready_enter_door = {};
			}
			
			
			
			//current_area = ready_enter_door["goto"];
			//activated_area = 1;
			//console.log(ready_enter_door);
			//ready_enter_door = {};
			entering = 0;
			unlock_fail_sound = false;
			activated_area = -1;
			
		} else {
			penter_index++;
		}
  	return;
  }/**/
	
	
	
	
	
	if (hurting) {
		if (hurt_index === 0) {
			assets.bleeper.ouch.play();
		}
		if (hurt_index < knock_back.length) {
			p.x = going_left ? p.x + knock_back[hurt_index] : p.x - knock_back[hurt_index];
			if (grounded) {
				p.y = p.y + knock_back_y[hurt_index];
			}
		}
	}
	
	
  /* --------  horizontal movement: sliding --------- */
  if (sliding) {
    if (going_left) {
      
      left_check = pL(p.x-slide[s]);
      if (check_grid(left_check, p.y) == 1) {
        p.x = snap_left(p.x);
        
      } else {
        p.x -= slide[s];
      }
      s += 1;
    } else {
      
      right_check = pR(p.x+slide[s]);
      if ( check_grid(right_check, p.y) == 1) {
        p.x = snap_right(p.x);
        
      } else {
        p.x += slide[s];
      }
      s += 1;
    }
    
    if (s >= slide.length-1){
      sliding = false;
      //s = 0; // dont reset until running!
    }
  }
  
  //console.log(p.x+" "+level_pixel_width);
  /* --------  horizontal movement: button --------- */
  if (btn.R || GP.R) {
		
		if (p.x >= level_pixel_width-9 && check_event_grid(p.x, p.y) == 11) {
				//console.log("right edge TRIG");
				activated_area = p1_check_exit(11);
				// can still return a value and do something with it
				return;
		}
		
    
    if (going_left) {
      r = 0; // reset if changed direction
      if (running && grounded) {
        assets.bleeper.urch.play();
        skidding = true;
      }
    }
    going_left = false;
    running = true;
    sliding = false;
    s = 4;
    
    right_check = pR(p.x+run[r]);
		
    if ( check_grid(right_check, p.y) == 1) { // also check blocks above and below
      if (!bumped_sound && p.x < level_pixel_width-16) {
				//console.log(p.x+" "+level_pixel_width);
       	assets.bleeper.bump.play();
        bumped_sound = true;
      }
			
      p.x = snap_right(p.x-1); // ****** <----- ****** testing
			
      running = false; //? doesnt do anything since it is set to true a few lines above
      
    } else {
      p.x += run[r];
      bumped_sound = false;
    }
		
		/*
		if ( check_grid(p.x+8, p.y) === 51) {
  		p.y = p.y-(8-p.x%8);
			console.log(p.y);
  	} else if ( check_grid(p.x, p.y) === 15) {
		//console.log(p.x%8);
  		p.y = p.y-p.x%8;
			console.log(p.y);
  	}/**/
    
    if (r < run.length-1) {
      r += 1;
      if (run[r] >= 3) {
        s = 0;
      }
    }
    
  } else if (btn.L || GP.L)  {
		if (p.x <= 1 && check_event_grid(p.x, p.y) == 10) {
			//console.log("left edge TRIG");
			activated_area = p1_check_exit(10);
			return;
		}
		
    if (!going_left) {
      r = 0; // reset if changed direction. dont want to 'charge' it up
      if (running && grounded) {
        assets.bleeper.urch.play();
        skidding = true;
      }
    }
    going_left = true;
    running = true;
    sliding = false;
    s = 4;
    
    left_check = pL(p.x-run[r]);
    if (check_grid(left_check, p.y) == 1) {
      if (!bumped_sound) {
        assets.bleeper.bump.play();
        bumped_sound = true;
        //ban_left = true; //
      }
			
			
      p.x = snap_left(p.x+1); // ****** <----- ****** testing
      running = false;
      
    } else {
      p.x -= run[r];
      bumped_sound = false;
    }
		
		/*
		if ( check_grid(p.x+8, p.y) === 51) {
  		p.y = p.y-(8-p.x%8);
			console.log(p.y);
  	} else if ( check_grid(p.x, p.y) === 15) {
		//console.log(p.x%8);
  		p.y = p.y-p.x%8;
			console.log(p.y);
  	}/**/
    
    if (r < run.length-1) {
      r += 1;
      if (run[r] >= 3) {
        s = 0;
      }
    }
    
  } else {
    if (s < slide.length-1){
      sliding = true;
    } 
    
    running = false;
    r = 0;
  }
  
  
  
  
  /* -------- vertical movement: went off edge ---------- */
  if (grounded) {
		
		if (p.y < curr_area["height"]*8 - 8) {
			if (going_left) {
				groundsavepoint = [p.x+4, p.y]; 
			} else {
				groundsavepoint = [p.x-4, p.y]; 
			}
			
		}
		
		// need to check TWO grid spots below
    if ( (check_grid(p.x, pB(p.y)) == 0) && (check_grid(p.x+7, pB(p.y)) == 0) ) {
			//grounded = false;
			// 
			if (!climbing) { grounded = false; }
    } 
		// slopes, may not work if walking on to it from the side?
		
		
		
    
  } else if (climbing) {
  	grounded = true;
  }
  
  
  
  /* --------  vertical movement: jumping, swimming, climbing --------- */
	if ( (check_grid(p.x, p.y) != 2) && (check_grid(p.x+7, p.y) != 2) ) {
		climbing = false;
  }
	
	
	
  if (btn.A || GP.A || GP.U) { // btn.A is jump/up, so the 'w' key
		
		if (!btn.L && !btn.R && !GP.L && !GP.R) {
			//console.log("checking  "+p.x+" "+p.y);
			if ( (check_event_grid(p.x, p.y) == 4) || (check_event_grid(p.x+7, p.y) == 4) && (!gamepad1 || GP.U)) {
				
				activated_area = p1_check_exit(4);
				
				
				// entering should be changed in the above function
				//entering = activated_area > -1 ? 1 : 2; // locked if 2
				//door_sound = false;
				//console.log("p1_movement(): if btn.A and door on grid: entering = "+entering+", activated area = "+activated_area);
			
				return;
			}
		}
		
		// UP
		if ( (check_event_grid(p.x, p.y) == 13) || (check_event_grid(p.x+7, p.y) == 13) && (!gamepad1 || GP.U || GP.A)) {
			//entering = true;
			activated_area = p1_check_exit(13); // going up
			//groundsavepoint[1] = -(current_area); // <--- dealing with falling back down
			areasavepoint = current_area;
			//console.log("going up thru exit...areasavepoint: area "+areasavepoint);
			//console.log("                  ...groundsavepoint:    "+groundsavepoint);
			//groundsavepoint[0] = p.x;
			//groundsavepoint[1] = p.y;
			//door_sound = false;
			
      //jumping = true;
      //grounded = false;
      //on_platform = false;
			//console.log("jump");
		
			return;
		}
		
		if ( (check_grid(p.x, p.y) == 2) || (check_grid(p.x+7, p.y) == 2) && (!gamepad1 || GP.U)) {
			climbing = true;
			//grounded = false;
			pclimb_index++;
			p.y--;
			//console.log(pclimb_index);
			// play sounds
			if (pclimb_index%8 == 0) {
				//console.log(pclimb_index);
				assets.bleeper.climb.play();
			}
			
    } else if ((grounded || on_platform ) && ((!gamepad1 && btn.A) || GP.A)) {
      
      if ( (check_grid(p.x, pT(p.y)) == 1) || (check_grid(p.x+7, pT(p.y)) == 1) ) {
        if (!bonked_sound) {
					
          assets.bleeper.bonk.play();
          bonked_sound = true;
        }
      } else {
        //jump
        assets.bleeper.jump.play();
        up_check = pT(p.y-jump[j]);
        
        if (check_grid(p.x, up_check) == 1 || check_grid(p.x+7, up_check) == 1) {
					//console.log("1 if (check_grid(p.x, up_check) == 1 || check_grid(p.x+7, up_check) == 1) {");
          p.y = snap_up(p.y);
          assets.bleeper.bonk.play();
          jumping = false;
          j = 0;
        } else {
          p.y -= jump[j];
        }
      
        jumping = true;
        grounded = false;
        on_platform = false;
        
      }
      
    } else if (jumping) {
			
      
      up_check = pT(p.y-jump[j]);
      if (check_grid(p.x, up_check) == 1 || check_grid(p.x+7, up_check) == 1) {
				
				//console.log("2 if (check_grid(p.x, up_check) == 1 || check_grid(p.x+7, up_check) == 1) {");
        p.y = snap_up(p.y);
        assets.bleeper.bonk.play();
        jumping = false;
        j = 0;
      } else {
        p.y -= jump[j];
      }
      j += 1;
      if (j >= jump.length-1) {
        jumping = false;
        j = 0;
      }
    }
  } else {
    jumping = false;
    j = 0;
    bonked_sound = false;
  }
  
  
	if (btn.D || GP.D) {
		
		if ( (check_grid(p.x, p.y) == 2) || (check_grid(p.x+7, p.y) == 2) ) {
			// if not on ground or the tile below is also a ladder -- FIX: clipping into ground
			climbing = true;
			//grounded = false;
			pclimb_index++;
			p.y++;
			//console.log(pclimb_index);
			// play sounds
			if (pclimb_index%8 == 0) {
				//console.log(pclimb_index);
				assets.bleeper.climb.play();
			}
		}
		
		if ( (check_event_grid(p.x, p.y) == 12) || (check_event_grid(p.x+7, p.y) == 12)) {
			//entering = true;
			activated_area = p1_check_exit(12);
			//console.log("goin down..."+activated_area);
			//door_sound = false;
		
			return;
		}
	} else {
		// place this where it makes sense, pushing down etc.
		// what do when hopping up from area below?
		if (p.y >= curr_area["height"]*8 - 8) {
			// check if recently went through exit
			
			if (areasavepoint > -1 && groundsavepoint[1] < 32) {
				
				//activated_area = Math.abs(groundsavepoint[1]);
				//console.log(areasavepoint);
				//
				// go back to the previous room
				//p.y = 0;
				//return;
				//console.log(" activate: go back to previous area below");
				//console.log("         : gsp "+groundsavepoint);
				//console.log("         : asp "+areasavepoint);
				//console.log("         : aca "+activated_area);
				//activated_area = areasavepoint;
				
				activate_reenter_bexit = areasavepoint;
				areasavepoint = -1;
				
				p.x = groundsavepoint[0];
				p.y = 0;
				groundsavepoint[1] = 0;
				//return;
				
			} else {
				//console.log(" asp = -1: hitting bottom");
				//console.log("         : gsp "+groundsavepoint);
				p.x = groundsavepoint[0];
				p.y = groundsavepoint[1];
				assets.bleeper.ouch.play();
				hurting = true;
				
			}
			
		}
	}
  
  
  /* -------- vertical movement: falling ---------- */ 
  if (!jumping && !grounded) {
    
    // need to check TWO grid spots below
    down_check = pB(p.y+fall[f]); // this one is 
    if ( (check_grid(p.x, down_check) == 1) || (check_grid(p.x+7, down_check) == 1) ) {
			//console.log("snap down");
      p.y = snap_down(p.y-2); // snap down <--------- testing
      grounded = true;
      f = 0;
      //assets.bleeper.land.play();
    } else {
      p.y += fall[f];
      if (f < fall.length-1) { f += 1; }
    }
    
    
  } else {
    f = 0; //?
  }
	
	
  
  //----------- last minute checks for current position (inside collision box)
  if ((check_grid(p.x, p.y+7) == 1) && (check_grid(p.x+7, p.y+7) == 0)) {
		//console.log("p.x = snap_left");
    p.x = snap_left(p.x+4); //Math.floor(px/8)*8;
    can_wall_jump = true;
  } else if ((check_grid(p.x, p.y+7) == 0) && (check_grid(p.x+7, p.y+7) == 1)) {
		//console.log("p.x = snap_right");
    p.x = snap_right(p.x-4); //Math.floor(px/8)*8+8;
    can_wall_jump = true;
  } else {
    can_wall_jump = false;
  }
  
  
  
  if (skidding) {
    if (pskid_index < pskid_frames.length-1){
      pskid_index++;
    } else {
      skidding = false;
      pskid_index = 0;
    }
  }
  
  
  /* -------- weapon: bubble shot (overrides skid animation) ---------- */ 
  if (btn.B || GP.B) {
		
    if (!shooting && !test_toggle_anim) { //true to test
      shooting = true;
      assets.bleeper.shoot.play();
      
      if (going_left) {
        create_bb_shot(p.x, p.y, -2, 0);
        //create_snake(p.x, p.y, 0, 0);
        //create_bb_shot(p.x,p.y);
      } else {
        //create_bb_shot(p.x,p.y);
        create_bb_shot(p.x, p.y, 2, 0);
        //create_snake(p.x, p.y, 0, 0);
      }
      
      
    }
  } 
  
  if (shooting) {
    if (pshoot_index < pshoot_frames.length-1){
      pshoot_index++;
    } else {
      shooting = false;
      pshoot_index = 0;
    }
  }
  
  //snake = true;
  if (snake) {
    create_snake(p.x, p.y, 0, 0);
  }
	
	/*
	if (check_grid(p.x-4, p.y+4) === 51) {
		console.log("!!");
	}
	if (check_grid(p.x-4, p.y+4) === 15) {
		console.log("!!");
	}/**/
  
  // ---- just move the player the bare minimum, 
  // beside or above the platform -----
  // should influence whether player should be moving horizontally with it
  p.x += p1_check_platform_collision();
  
	
	if (p.x < XMID) {
		left_edge = XMID-p.x;
	} else {
		left_edge = 0;
	}
	if (p.x > level_pixel_width-XMID) {
		right_edge = p.x-level_pixel_width+XMID;
	} else {
		right_edge = 0;
	}
	
	if (p.y < YMID) {
		top_edge = YMID-p.y;
	} else {
		top_edge = 0;
	}
	if (p.y > level_pixel_height-YMID) {
		//console.log("hurt! fall! oh no!");
		bottom_edge = p.y-level_pixel_height+YMID;
	} else {
		bottom_edge = 0;
	}
	
	
	
}
var left_edge = 0;
var right_edge = 0;
var top_edge = 0;
var bottom_edge = 0;






function player1_animation(){
  
  if (grounded) {
    psheet = get_psheet(ZEN[HEAD].idle); //ZEN[HEAD].idle
    
  
    if (btn.R || btn.L || GP.R || GP.L) {
      psheet = get_psheet(ZEN[HEAD].run);
      
      pframe = pwalk_frames[pwalk_index];
      pwalk_index++;
      if (pwalk_index >= pwalk_frames.length) pwalk_index = 0;
      
    } else {
      
      pframe = pidle_frames[pidle_index];
      pidle_index++;
      if (pidle_index >= pidle_frames.length || hurting) pidle_index = 0;
    }
    
    if (skidding) {
      psheet = get_psheet(ZEN[HEAD].skid);
      pframe = pskid_frames[pskid_index];//pidle_frames[pidle_index];
      //pskid_index++;
      //if (pskid_index >= pskid_frames.length) pskid_index = 0;
    }
    
  } else { //not grounded
    psheet = get_psheet(ZEN[HEAD].fall);
    pframe = 0;
  }
  
  if (jumping) {
    psheet = get_psheet(ZEN[HEAD].jump);
    pframe = 0;
  }
  
	if (climbing) {
		psheet = get_psheet(ZEN[HEAD].climb);
		if (pclimb_index >= pclimb_frames.length) pclimb_index = 0;
		pframe = pclimb_frames[pclimb_index];
	}
	
  if (shooting) {
    psheet = get_psheet(ZEN[HEAD].shoot);
    pframe = pshoot_frames[pshoot_index];
  }
	
	
	if (opening_door || unlocking_door || entering_door) {
		psheet = get_psheet(ZEN[HEAD].door);
		pframe = penter_frames[penter_index];
	}/**/
	
	
	/*
var hurting = false;
var hurt_frames = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1];
var hurt_index = 0;
	*/
	
	if (hurting) {
		
		//
		hurt_index++;
		if (hurt_index >= hurt_frames.length-1) {
			hurt_index = 0;
			hurting = false;
		}
		
		
		if (hurt_frames[hurt_index] === 2) {
			psheet = get_psheet(ZEN[HEAD].hurt);
			pframe = 0;
		} else if (hurt_frames[hurt_index] === 1) {
			psheet = get_psheet(ZEN[HEAD].invisible);
			pframe = 0;
		} else {
			//console.log(psheet[0]);
		}
		
		
		
	}/**/
	
	
	
  

}

function player2_movement() {
  /* --------  horizontal movement: sliding --------- */
  if (sliding2) {
    if (going_left2) {
      
      left_check2 = pL(p2.x-slide2[s2]);
      if (check_grid(left_check2, p2.y) == 1) {
        p2.x = snap_left(p2.x);
        
      } else {
        p2.x -= slide2[s2];
      }
      s2 += 1;
    } else {
      
      right_check2 = pR(p2.x+slide2[s2]);
      if ( check_grid(right_check2, p2.y) == 1) {
        p2.x = snap_right(p2.x);
        
      } else {
        p2.x += slide2[s2];
      }
      s2 += 1;
    }
    
    if (s2 >= slide2.length-1){
      sliding2 = false;
      //s = 0; // dont reset until running!
    }
  }
  
  
  /* --------  horizontal movement: button --------- */
  if (btn.R2) {
    
    if (going_left2) {
      r2 = 0; // reset if changed direction
      if (running2 && grounded2) {
        assets.bleeper.urch.play();
        skidding2 = true;
      }
    }
    going_left2 = false;
    running2 = true;
    sliding2 = false;
    s2 = 4;
    
    right_check2 = pR(p2.x+run2[r2]);
    if ( check_grid(right_check2, p2.y) == 1) { // also check blocks above and below
      if (!bumped_sound2) {
        assets.bleeper.bump.play();
        bumped_sound2 = true;
      }
      p2.x = snap_right(p2.x);
      running2 = false; //? doesnt do anything since it is set to true a few lines above
      
    } else {
      p2.x += run2[r2];
      bumped_sound2 = false;
    }
    
    if (r2 < run2.length-1) {
      r2 += 1;
      if (run2[r2] >= 3) {
        s2 = 0;
      }
    }
    
  } else if (btn.L2)  {
    if (!going_left2) {
      r2 = 0; // reset if changed direction. dont want to 'charge' it up
      if (running2 && grounded2) {
        assets.bleeper.urch.play();
        skidding2 = true;
      }
    }
    going_left2 = true;
    running2 = true;
    sliding2 = false;
    s2 = 4;
    
    left_check2 = pL(p2.x-run2[r2]);
    if (check_grid(left_check2, p2.y) == 1) {
      if (!bumped_sound2) {
        assets.bleeper.bump.play();
        bumped_sound2 = true;
        //ban_left = true; //
      }
      p2.x = snap_left(p2.x);
      running2 = false;
      
    } else {
      p2.x -= run2[r2];
      bumped_sound2 = false;
    }
    
    if (r2 < run2.length-1) {
      r2 += 1;
      if (run2[r2] >= 3) {
        s2 = 0;
      }
    }
    
  } else {
    if (s2 < slide2.length-1){
      sliding2 = true;
    } 
    
    running2 = false;
    r2 = 0;
  }
  
  
  
  
  /* -------- vertical movement: went off edge ---------- */
  if (grounded2) {
    // need to check TWO grid spots below
    if ( (check_grid(p2.x, pB(p2.y)) == 0) && (check_grid(p2.x+7, pB(p2.y)) == 0) ) {
      grounded2 = false;
    }
    
  }
  
  
  
  /* --------  vertical movement: jumping --------- */
  if (btn.A2) {
    
    if (grounded2 || on_platform2) {
      
      if ( (check_grid(p2.x, pT(p2.y)) == 1) || (check_grid(p2.x+7, pT(p2.y)) == 1) ) {
        if (!bonked_sound2) {
          assets.bleeper.bonk.play();
          bonked_sound2 = true;
        }
      } else {
        //jump
        assets.bleeper.jump.play();
        up_check2 = pT(p2.y-jump2[j2]);
        
        if (check_grid(p2.x, up_check2) == 1 || check_grid(p2.x+7, up_check2) == 1) {
          p2.y = snap_up(p2.y);
          assets.bleeper.bonk.play();
          jumping2 = false;
          j2 = 0;
        } else {
          p2.y -= jump2[j2];
        }
      
        jumping2 = true;
        grounded2 = false;
        on_platform2 = false;
        
      }
      
    } else if (jumping2) {
      
      up_check2 = pT(p2.y-jump2[j2]);
      if (check_grid(p2.x, up_check2) == 1 || check_grid(p2.x+7, up_check2) == 1) {
        p2.y = snap_up(p2.y);
        assets.bleeper.bonk.play();
        jumping2 = false;
        j2 = 0;
      } else {
        p2.y -= jump2[j2];
      }
      j2 += 1;
      if (j2 >= jump2.length-1) {
        jumping2 = false;
        j2 = 0;
      }
    }
  } else {
    jumping2 = false;
    j2 = 0;
    bonked_sound2 = false;
  }
  
  
  
  
  /* -------- vertical movement: falling ---------- */ 
  if (!jumping2 && !grounded2) {
    
    // need to check TWO grid spots below
    down_check2 = pB(p2.y+fall2[f2]); // this one is 
    if ( (check_grid(p2.x, down_check2) == 1) || (check_grid(p2.x+7, down_check2) == 1) ) {
      p2.y = snap_down(p2.y);
      grounded2 = true;
      f2 = 0;
      assets.bleeper.land.play();
    } else {
      p2.y += fall2[f2];
      if (f2 < fall2.length-1) { f2 += 1; }
    }
    
    
  } else {
    f2 = 0; //?
  }
  
  //----------- last minute checks for current position (inside collision box)
  if ((check_grid(p2.x, p2.y+7) == 1) && (check_grid(p2.x+7, p2.y+7) == 0)) {
    p2.x = snap_left(p2.x+7); //Math.floor(px/8)*8;
    can_wall_jump = true;
  } else
  if ((check_grid(p2.x, p2.y+7) == 0) && (check_grid(p2.x+7, p2.y+7) == 1)) {
    p2.x = snap_right(p2.x-4); //Math.floor(px/8)*8+8;
    can_wall_jump = true;
  } else {
    can_wall_jump = false;
  }
  
  
  
  if (skidding2) {
    if (pskid_index2 < pskid_frames2.length-1){
      pskid_index2++;
    } else {
      skidding2 = false;
      pskid_index2 = 0;
    }
  }
  
  
  /* -------- weapon: bubble shot (overrides skid animation) ---------- */ 
  if (btn.B2) {
    if (!shooting2) { //true to test
      shooting2 = true;
      assets.bleeper.shoot.play();
      
      if (going_left2) {
        //create_bb_shot(p2.x, p2.y, -2, 0);
        create_snake(p2.x, p2.y, 0, 0);
        //create_bb_shot(p.x,p.y);
      } else {
        //create_bb_shot(p.x,p.y);
        //create_bb_shot(p2.x, p2.y, 2, 0);
        create_snake(p2.x, p2.y, 0, 0);
      }
      
      
    }
  } 
  
  if (shooting2) {
    if (pshoot_index2 < pshoot_frames2.length-1){
      pshoot_index2++;
    } else {
      shooting2 = false;
      pshoot_index2 = 0;
    }
  }
  
  //snake = true;
  if (snake) {
    create_snake(p2.x, p2.y, 0, 0);
  }
  
  // ---- just move the player the bare minimum, 
  // beside or above the platform -----
  // should influence whether player should be moving horizontally with it
  p2.x += p2_check_platform_collision();
  
	
}

function player2_animation(){
  
  if (grounded2) {
    psheet2 = get_psheet(ZEN[HEAD2].idle);
    
  
    if (btn.R2 || btn.L2) {
      psheet2 = get_psheet(ZEN[HEAD2].run);
      
      pframe2 = pwalk_frames2[pwalk_index2];
      pwalk_index2++;
      if (pwalk_index2 >= pwalk_frames2.length) pwalk_index2 = 0;
      
    } else {
      
      pframe2 = pidle_frames2[pidle_index2];
      pidle_index2++;
      if (pidle_index2 >= pidle_frames2.length) pidle_index2 = 0;
    }
    
    if (skidding2) {
      psheet2 = get_psheet(ZEN[HEAD2].skid);
      pframe2 = pskid_frames2[pskid_index2];//pidle_frames[pidle_index];
      //pskid_index++;
      //if (pskid_index >= pskid_frames.length) pskid_index = 0;
    }
    
  } else { //not grounded
    psheet2 = get_psheet(ZEN[HEAD2].fall);
    pframe2 = 0;
  }
  
  if (jumping2) {
    psheet2 = get_psheet(ZEN[HEAD2].jump);
    pframe2 = 0;
  }
  
  if (shooting2) {
    psheet2 = get_psheet(ZEN[HEAD2].shoot);
    pframe2 = pshoot_frames2[pshoot_index2];
  }
  

}


var cheat_up = 0;
var reset_position_x = 0;
var reset_position_y = 0;
var groundsavepoint = [0,0];
var debug_on = false;
function reset_position(where_to) {
	
	if (where_to == "P") {
		p.x = groundsavepoint[0];//reset_position_x;
		p.y = groundsavepoint[1]-8;//reset_position_y;
		//console.log("???");
	}
	
	if (where_to == "3") {
		if (cheat_up === 0) {
			cheat_up = 1;
			p.y -= 80;
		} else if (cheat_up === 1) {
			cheat_up = 2;
		}
	}
	
	if (where_to == "O") {
		
		if (has_key === 0) {
			p.x -= 80;
		} else if (has_key === 1) {
			p.x += 80;
		} else if (has_key === 2) {
			p.y += 80;
		} else if (has_key === 3) {
			p.y -= 80;
		}
		
		
	}
	
	if (where_to == "K") {
		
		has_key++;
	}
	
	if (where_to == "I") {
		//hurting = true;
		//console.log("ouch!");
		
		if (debug_on) {
			debug_on = false;
		} else {
			debug_on = true;
			if (has_key > 0) {
				has_key--;
			}
		}
	}
	
	
	
	
}



/* ========================= DOORS + ACTIVATE AREAS =========================== */



var has_key = 0;
var ready_enter_door = {};

var trying_door_fail = 0;
var unlocking_door = 0;
var opening_door = 0;
var entering_door = 0;
var drstring = "";
function p1_check_exit(exit_type) {
	let doors = curr_area["exits"];
	for (let d_i of Object.keys(doors)) {
		let door = doors[d_i];
		if (door["type"] == exit_type) { // make sure we are on an exit
			if (door["type"] == 4) {
				if (Math.abs(door["gx"]-Math.floor(p.x/8)) < 2) { // make sure we get the correct exit in the list
					if (door["status"] === 2) { // locked. check if has_key
						//console.log("door status 2");
						if (has_key && !unlocking_door) {
							//console.log("  unlocking door");
							assets.bleeper.door_unlock.play();
							has_key--;
							unlocking_door = 30;
							door.status = 1; // unlock but keep the door closed
							door.images.forEach((d, i) => {
							  door.images[i] = door.open_images[i]+2;
							})
						} else if (!trying_door_fail && !unlocking_door) {
							//console.log("  door is locked! need key");
							assets.bleeper.unlock_fail.play();
							trying_door_fail = 30; // timer
						}
						return -1;
					} else if (door["status"] === 1) { // unlocked, closed
						//console.log("door status 1");
						if (!opening_door) {
							//console.log("  opening door");
							assets.bleeper.door_open.play();
							opening_door = 30;
							door.status = 0;
							door.images.forEach((d, i) => {
							  door.images[i] = door.open_images[i];
							})
							ready_enter_door = door;
						} 
						return d_i;
					} else if (door["status"] === 0) { // unlocked, open
						//console.log("door status 0");
						if (!entering_door) {
							//console.log("  entering door");
							entering_door = 30;
							ready_enter_door = door;
						}
						return d_i;
					}
				}
			} else {
				ready_enter_door = door;
				
				return d_i;
			}
		}
	}
	return -1; // no door
}






function p1_check_platform_collision() {
  
  //  Doesn't use grid, since they move around
  var coll_list = [];
  for (let ip=0; ip<curr_area["platforms"].length; ip++){
    let m = curr_area["platforms"][ip];
    if ( Math.abs(p.x-m.x)<8 && Math.abs(p.y-m.y)<8 ) {
      coll_list.push(m);
    }
  }
  
  var horizontal_movement = 0;
  
  // find highest platform block (lowest c.y value) should check next ones after in list
  for (let ic=0; ic<coll_list.length; ic++){
    let c = coll_list[ic];
    if (p.y < c.y) {
      p.y = c.y-8; 
      grounded = true;
      on_platform = true; // should influence the player x position
      let cvframe = c.vframe-1;
      if (cvframe < 0) {
        cvframe = c.vx.length-1;
      }
      horizontal_movement = c.vx[cvframe];
    }
    
  }
  return horizontal_movement;
  
}

function p2_check_platform_collision() {
  
  //  Doesn't use grid, since they move around
  var coll_list2 = [];
  for (let ip=0; ip<curr_area["platforms"].length; ip++){
    let m = curr_area["platforms"][ip];
    if ( Math.abs(p2.x-m.x)<8 && Math.abs(p2.y-m.y)<8 ) {
      coll_list2.push(m);
    }
  }
  
  var horizontal_movement2 = 0;
  
  // find highest platform block (lowest c.y value) should check next ones after in list
  for (let ic=0; ic<coll_list2.length; ic++){
    let c = coll_list2[ic];
    if (p2.y < c.y) {
      p2.y = c.y-8; 
      grounded2 = true;
      on_platform2 = true; // should influence the player x position
      let cvframe = c.vframe-1;
      if (cvframe < 0) {
        cvframe = c.vx.length-1;
      }
      horizontal_movement2 = c.vx[cvframe];
    }
    
  }
  return horizontal_movement2;
  
}






// movement, animation, kill
function projectile_update(){
  // bbshots
  for (let ib=0; ib<bb_shots.length; ib++){
    let bb = bb_shots[ib];
    bb.x += bb.vx;
    bb.y += bb.vy;
    if (bb.frame < bb.frames.length-1) { bb.frame += 1; } 
    else { bb.alive = false; }
  }
  bb_shots = bb_shots.filter( function(a) { return a.alive; } );
  
  // snake
  for (let si=0; si<snake_segs.length; si++){
    let ss_ = snake_segs[si];
    ss_.x += ss_.vx;
    ss_.y += ss_.vy;
    if (ss_.frame < ss_.frames.length-1) { ss_.frame += 1; } 
    else { ss_.alive = false; }
  }
  snake_segs = snake_segs.filter( function(a) { return a.alive; } );
  
  
}

var pr_xoffset = 0;
var pr_yoffset = 0;
function draw_projectiles() {
	
	if (curr_area["width"] > G_W) {
		if (left_edge == 0) {
			pr_xoffset = SCREEN_WIDTH-XMID;
		} else {
			pr_xoffset = 0;
		}
		if (right_edge == 0) {
		} else {
			pr_xoffset = -(level_pixel_width - SCREEN_WIDTH);
		}
	} else {
		pr_xoffset = 0;
	}
	
	if (curr_area["height"] > G_H) {
		if (top_edge == 0) {
			pr_yoffset = SCREEN_HEIGHT-YMID;
		} else {
			pr_yoffset = 0;
		}
	
		if (bottom_edge == 0) {
		} else {
			pr_yoffset = -(level_pixel_height - SCREEN_HEIGHT); // to fit in info bar
		}
	} else {
		pr_yoffset = 0;
	}
	/*
	if (left_edge == 0) {
		pr_offset = SCREEN_WIDTH-XMID;
	} else {
		pr_offset = XMID;
	}
	if (right_edge == 0) {
	} else {
		pr_offset = -(level_pixel_width - SCREEN_WIDTH);
	}
	
	sprite(e.image+e.frames[e.frame]+e.dead_frame, e.x+en_xoffset-p.x*lfe*rte, e.y+en_yoffset-p.y*tpe*bte, e.going_left);
	*/
	
	//tileset()
  for (let ib=0; ib<bb_shots.length; ib++){
    let bb = bb_shots[ib];
    //sprite(bb.image+bb.frames[bb.frame], bb.x-(p.x+XMID), bb.y-(p.y+YMID));
    sprite(bb.image+bb.frames[bb.frame], bb.x+pr_xoffset-p.x*lfe*rte, bb.y+pr_yoffset-p.y*tpe*bte); // off edges the shot doesnt show
    
  }
  for (let si=0; si<snake_segs.length; si++){
    let ss_ = snake_segs[si];
    //sprite(bb.image+bb.frames[bb.frame], bb.x-(p.x+XMID), bb.y-(p.y+YMID));
    sprite(ss_.image+ss_.frames[ss_.frame], ss_.x+pr_xoffset-p.x*lfe*rte, ss_.y+pr_yoffset-p.y*tpe*bte);
  } 
}

function update_moving_platforms(){
  for (let ip=0; ip<curr_area["platforms"].length; ip++){
    let plfm = curr_area["platforms"][ip];
    plfm.x += plfm.vx[plfm.vframe];
    plfm.y += plfm.vy[plfm.vframe];
    plfm.vframe += 1;
    if (plfm.vframe >= plfm.vx.length) { plfm.vframe = 0; }
  }
}

var mp_xoffset = 0;
var mp_yoffset = 0;
function draw_moving_platforms(){
	
	/*
	if (left_edge == 0) {
		mp_offset = SCREEN_WIDTH-XMID;
	} else {
		mp_offset = 0;
	}
	if (right_edge == 0) {
	} else {
		mp_offset = -(level_pixel_width - SCREEN_WIDTH);
	}
	/**/
	if (curr_area["width"] > G_W) {
		if (left_edge == 0) {
			mp_xoffset = SCREEN_WIDTH-XMID;
		} else {
			mp_xoffset = 0;
		}
		if (right_edge == 0) {
		} else {
			mp_xoffset = -(level_pixel_width - SCREEN_WIDTH);
		}
	} else {
		mp_xoffset = 0;
	}
	
	if (curr_area["height"] > G_H) {
		if (top_edge == 0) {
			mp_yoffset = SCREEN_HEIGHT-YMID;
		} else {
			mp_yoffset = 0;
		}
	
		if (bottom_edge == 0) {
		} else {
			mp_yoffset = -(level_pixel_height - SCREEN_HEIGHT); // to fit in info bar
		}
	} else {
		mp_yoffset = 0;
	}
	
  for (let ip=0; ip<curr_area["platforms"].length; ip++){
    let plfm = curr_area["platforms"][ip];
    sprite(plfm.image+plfm.frames[plfm.frame], plfm.x+mp_xoffset-p.x*lfe*rte, plfm.y+mp_yoffset-p.y*tpe*bte);
    //sprite(e.image+e.frames[e.frame]+e.dead_frame, e.x+en_xoffset-p.x*lfe*rte, e.y+en_yoffset-p.y*tpe*bte, e.going_left);
  }
}



var enemy_test = 0;
//var stuck_in_block = false; 

// 

/*        */
function update_small_enemies() {
  let small_enemies = curr_area["small_enemies"];
  for (let ses=0; ses<small_enemies.length; ses++) {
    let e = small_enemies[ses];
    
    // should only update if they are near the player, i.e. Thal has to bring it into the screen
    if (!e.in_screen || e.x-p.x > SCREEN_WIDTH || e.x-p.x < -SCREEN_WIDTH ) { continue; }
    
    if (!e.alive) {
      e.dead_frames++;
      continue;
    }
    
		/* -------- detect collision with player -------- */
    if ( Math.abs(p.x-e.x)<8 && Math.abs(p.y-e.y)<8 ) {
      hurting = true;
    }
    
    /* -------- horizontal movement ---------- */ 
    if (e.going_left) {
      left_check = pL(e.x-e.vx[e.vxframe]);
      
      if (check_grid(left_check, e.y) == 1) {
        if (e.stuck_in_block) {
          e.alive = false;
          e.vxframe = 0;
          continue;
        }
        e.x = snap_left(e.x);
        e.going_left = false;
        e.stuck_in_block = true;
        
      } else {
        e.x -= e.vx[e.vxframe];
        e.stuck_in_block = false; //reset
      }
    } else {
      right_check = pR(e.x+e.vx[e.vxframe]);
      if ( check_grid(right_check, e.y) == 1) {
        if (e.stuck_in_block) {
          e.alive = false; //after enemy loop movements, can do 'remove' loop
          e.vxframe = 0;
          continue;
          
        }
        e.x = snap_right(e.x);
        e.going_left = true;
        e.stuck_in_block = true;
        
      } else {
        e.x += e.vx[e.vxframe];
        e.stuck_in_block = false;
      } 
    }
		
		if (e.y >= curr_area["height"]*8 -8) {
			e.alive = false;
		}
    
    e.vxframe++;
    if (e.vxframe >= e.vx.length) e.vxframe = 0;
    
    // one e.vframe   instead of both vxframe and vyframe?
    
    /* -------- vertical movement: grounded or jumping ---------- */ 
    if (e.grounded) {
      
      // only trigger falling if actually on the ground -- could be jumping
      if ( (e.move_type == "walkbump") || (e.move_type == "steadyjump" && e.move_phase == "steady") ) {
        
        // need to check TWO grid spots below.
        if ( (check_grid(e.x, pB(e.y)) <= 0) && (check_grid(e.x+7, pB(e.y)) <= 0) ) {
          // if empty, start falling phase
          e.vyframe = 0;
          e.fallframe = 0;
          e.grounded = false;
          // reset e.vxframe?
        }
         
      } else if (e.move_type == "steadyjump" && e.move_phase == "upjump") {
        // what if 'bonk' ?
        
        up_check = pT(e.y+e.vy[e.vyframe]); // will be adding negative number for moving upward
        if ( (check_grid(e.x, up_check) == 1) || (check_grid(e.x+7, up_check) == 1) ) {
          e.vyframe = 0; // 'steady' phase may be longer because of this, if jump is interrupted
          e.vxframe = 0; // bonked. or, could change index to descending (e.vxframe = 90)?
          e.y = snap_up(e.y); // what if in the middle of the air?
          e.grounded = false; // fall
          e.move_phase = "steady";
          
        } else {
          e.y += e.vy[e.vyframe];
        }
      } else if (e.move_type == "steadyjump" && e.move_phase == "downjump") {
        
        down_check = pB(e.y+e.vy[e.vyframe]); // positive number for descending in the jump
        if ( (check_grid(e.x, down_check) == 1) || (check_grid(e.x+7, down_check) == 1) ) {
          e.vyframe = 0; // 'steady' phase may be longer because of this, if jump is interrupted
          e.vxframe = 0; // landed
          e.y = snap_down(e.y); // what if in the middle of the air?
          e.grounded = true; // already grounded
          e.move_phase = "steady";
          
        } else {
          e.y += e.vy[e.vyframe];
        }
      }
      
    } else { /* -------- vertical movement: falling, not grounded ---------- */
    
      // need to check TWO grid spots below
      down_check = pB(e.y+e.fall[e.fallframe]); // vyframe for this type of enemy is just falling frames
      if ( (check_grid(e.x, down_check) == 1) || (check_grid(e.x+7, down_check) == 1) ) {
        e.y = snap_down(e.y);
        e.grounded = true;
        //assets.bleeper.land.play();
      } else {
        e.y += e.fall[e.fallframe]; 
      }
    }
    
    // vertical velocity movement, even though 'grounded'
    e.vyframe++;
    if (e.vyframe >= e.vy.length) e.vyframe = 0;
    
    if (e.move_type == "steadyjump") {
      
      if (e.vyframe < 60) {
        e.move_phase = "steady";
      } else if (60 <= e.vyframe && e.vyframe < 90) {
        e.move_phase = "upjump";
      } else if (90 <= e.vyframe && e.vyframe < 120) {
        e.move_phase = "downjump";
      }
    }
    
    // "upjump" 60 <= x && x < 90, "downjump" 90 <= x && x < 120
    
    // terminal velocity
    if (e.fallframe < e.fall.length-1) e.fallframe++;
    
    
    /* ---------- animation ---------- */
    
    e.frame++;
    if (e.frame >= e.frames.length) e.frame = 0;
    
    
    /* check bubble shot */
    enemy_test = bb_shots.length+" ";
    for (let ib=0; ib<bb_shots.length; ib++) {
      if (e.alive && Math.abs(bb_shots[ib].x - e.x) < 4 && Math.abs(bb_shots[ib].y - e.y) < 4){
        bb_shots[ib].alive = false;
        assets.bleeper.hit.play();
        enemy_test = "hit!";
        e.HP -= 1; // bb_shot damage or p.ATK
        if (e.HP <= 0) {
          enemy_test = "kill!";
          e.alive = false;
          
          score += e.SCORE * player_combo();
          
          /* 
            p.score, or they just share the score 
            (would be pretty sweet to help the other player get a combo)
          */
        }
        
      }
    }
    //enemy_test = " "+e.move_phase+" "+e.stuck_in_block;
  }
  
  curr_area["small_enemies"] = curr_area["small_enemies"].filter( function(a) { return a.dead_frames < 60; } );
  
}

var en_xoffset = 0;
var en_yoffset = 0;
function draw_small_enemies() {
	
	/*
	if (left_edge == 0) {
		en_offset = SCREEN_WIDTH-XMID;
	} else {
		en_offset = 0;
	}
	if (right_edge == 0) {
	} else {
		en_offset = -(level_pixel_width - SCREEN_WIDTH);
	}
	/**/
	
	if (curr_area["width"] > G_W) {
		if (left_edge == 0) {
			en_xoffset = SCREEN_WIDTH-XMID;
		} else {
			en_xoffset = 0;
		}
		if (right_edge == 0) {
		} else {
			en_xoffset = -(level_pixel_width - SCREEN_WIDTH);
		}
	} else {
		en_xoffset = 0;
	}
	
	if (curr_area["height"] > G_H) {
		if (top_edge == 0) {
			en_yoffset = SCREEN_HEIGHT-YMID;
		} else {
			en_yoffset = 0;
		}
	
		if (bottom_edge == 0) {
		} else {
			en_yoffset = -(level_pixel_height - SCREEN_HEIGHT); // to fit in info bar
		}
	} else {
		en_yoffset = 0;
	}
	
  // ses == small enemy sprites
  for (let ses=0; ses<curr_area["small_enemies"].length; ses++){
    let e = curr_area["small_enemies"][ses];
    
    if (e.dead_frames%2 == 0) {
      e.dead_frame = e.dead_frame == 4? -48:4;
    }
    
    //sprite(e.image+e.frames[e.frame]+e.dead_frame, e.x+en_offset-p.x*lfe*rte, e.y+YMID-p.y, e.going_left);
		
		sprite(e.image+e.frames[e.frame]+e.dead_frame, e.x+en_xoffset-p.x*lfe*rte, e.y+en_yoffset-p.y*tpe*bte, e.going_left);
		/*
		sprite(d.images[0], (d.gx*8)+dr_xoffset-p.x*lfe*rte, (d.gy*8)+dr_yoffset-p.y*tpe*bte-info_box_offset, false);
		draw(level_image_, l_offset-p.x*lfe*rte, u_offset-p.y*tpe*bte-info_box_offset);
		/**/
  }
}


// special items get a floaty dance
var itm_anim_y = [ 
	0,0,0,
	1,1,1,1,
	2,2,2,2,2,
	3,3,3,3,3,3,3,3,3,
	2,2,2,2,2,
	1,1,1,1,
	0,0,0,
	-1,-1,-1,-1,
	-2,-2,-2,-2,-2,
	-3,-3,-3,-3,-3,-3,-3,-3,-3,
	-2,-2,-2,-2,-2,
	-1,-1,-1,-1
];
var itm_anim_x = [
	
	2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
	1,1,1,1,1,1,1,1,1,1,
	0,0,0,0,0,0,0,
	-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,
	-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	0,0,0,0,0,0,0,
	1,1,1,1,1,1,1,1,1,1
	
	
];
var iay = 0;
var iax = 0;
var itm_xoffset = 0;
var itm_yoffset = 0;
function draw_items(){
	if (curr_area["width"] > G_W) {
		if (left_edge == 0) {
			itm_xoffset = SCREEN_WIDTH-XMID;
		} else {
			itm_xoffset = 0;
		}
		if (right_edge == 0) {
		} else {
			itm_xoffset = -(level_pixel_width - SCREEN_WIDTH);
		}
	} else {
		itm_xoffset = 0;
	}
	
	if (curr_area["height"] > G_H) {
		if (top_edge == 0) {
			itm_yoffset = SCREEN_HEIGHT-YMID;
		} else {
			itm_yoffset = 0;
		}
	
		if (bottom_edge == 0) {
		} else {
			itm_yoffset = -(level_pixel_height - SCREEN_HEIGHT); // to fit in info bar
		}
	} else {
		itm_yoffset = 0;
	}
	
	/*
		
		only get to use items if the level is completed.
		if level is not completed, all items are reset, must get them all again
	
	*/
	
	iay++;
	if (iay > itm_anim_y.length-1) {
		iay = 0;
	}
	iax++;
	if (iax > itm_anim_x.length-1) {
		iax = 0;
	}
	
	
	
  for (let i=0; i<curr_area["items"].length; i++) {
		let itm = curr_area["items"][i];
		if (itm["gathered"] === false) {
			if (itm["name"] === "nutmeg") {
				sprite(T["nutmeg"], itm.gx*8+itm_xoffset-p.x*lfe*rte, itm.gy*8+itm_yoffset-p.y*tpe*bte);
			} else if (itm["name"] === "sugar_l") {
				sprite(T["sugar_bbl"], itm.gx*8+itm_xoffset-p.x*lfe*rte, itm.gy*8+itm_yoffset-p.y*tpe*bte);
				//sprite(T["sugar_bbr"], itm.gx*8+8+itm_xoffset-p.x*lfe*rte, itm.gy*8+itm_yoffset-p.y*tpe*bte);
				sprite(T["sugar_bl"], itm.gx*8+itm_xoffset-p.x*lfe*rte, itm.gy*8-8+itm_yoffset-p.y*tpe*bte);
				//sprite(T["sugar_br"], itm.gx*8+8+itm_xoffset-p.x*lfe*rte, itm.gy*8-8+itm_yoffset-p.y*tpe*bte);
				sprite(T["sugar_ml"], itm.gx*8+itm_xoffset-p.x*lfe*rte, itm.gy*8-16+itm_yoffset-p.y*tpe*bte);
				//sprite(T["sugar_mr"], itm.gx*8+8+itm_xoffset-p.x*lfe*rte, itm.gy*8-16+itm_yoffset-p.y*tpe*bte);
				sprite(T["sugar_tl"], itm.gx*8+itm_xoffset-p.x*lfe*rte, itm.gy*8-24+itm_yoffset-p.y*tpe*bte);
				//sprite(T["sugar_tr"], itm.gx*8+8+itm_xoffset-p.x*lfe*rte, itm.gy*8-24+itm_yoffset-p.y*tpe*bte);
			} else if (itm["name"] === "sugar_r") {
				//sprite(T["sugar_bbl"], itm.gx*8+itm_xoffset-p.x*lfe*rte, itm.gy*8+itm_yoffset-p.y*tpe*bte);
				sprite(T["sugar_bbr"], itm.gx*8+itm_xoffset-p.x*lfe*rte, itm.gy*8+itm_yoffset-p.y*tpe*bte);
				//sprite(T["sugar_bl"], itm.gx*8+itm_xoffset-p.x*lfe*rte, itm.gy*8-8+itm_yoffset-p.y*tpe*bte);
				sprite(T["sugar_br"], itm.gx*8+itm_xoffset-p.x*lfe*rte, itm.gy*8-8+itm_yoffset-p.y*tpe*bte);
				//sprite(T["sugar_ml"], itm.gx*8+itm_xoffset-p.x*lfe*rte, itm.gy*8-16+itm_yoffset-p.y*tpe*bte);
				sprite(T["sugar_mr"], itm.gx*8+itm_xoffset-p.x*lfe*rte, itm.gy*8-16+itm_yoffset-p.y*tpe*bte);
				//sprite(T["sugar_tl"], itm.gx*8+itm_xoffset-p.x*lfe*rte, itm.gy*8-24+itm_yoffset-p.y*tpe*bte);
				sprite(T["sugar_tr"], itm.gx*8+itm_xoffset-p.x*lfe*rte, itm.gy*8-24+itm_yoffset-p.y*tpe*bte);
			} else if (itm["name"] === "sugar_dbl") {
				sprite(T["sugar_bbl"], itm.gx*8-4+itm_xoffset-p.x*lfe*rte, itm.gy*8+itm_yoffset-p.y*tpe*bte);
				sprite(T["sugar_bbr"], itm.gx*8-4+8+itm_xoffset-p.x*lfe*rte, itm.gy*8+itm_yoffset-p.y*tpe*bte);
				sprite(T["sugar_bl"], itm.gx*8-4+itm_xoffset-p.x*lfe*rte, itm.gy*8-8+itm_yoffset-p.y*tpe*bte);
				sprite(T["sugar_br"], itm.gx*8-4+8+itm_xoffset-p.x*lfe*rte, itm.gy*8-8+itm_yoffset-p.y*tpe*bte);
				sprite(T["sugar_ml"], itm.gx*8-4+itm_xoffset-p.x*lfe*rte, itm.gy*8-16+itm_yoffset-p.y*tpe*bte);
				sprite(T["sugar_mr"], itm.gx*8-4+8+itm_xoffset-p.x*lfe*rte, itm.gy*8-16+itm_yoffset-p.y*tpe*bte);
				sprite(T["sugar_tl"], itm.gx*8-4+itm_xoffset-p.x*lfe*rte, itm.gy*8-24+itm_yoffset-p.y*tpe*bte);
				sprite(T["sugar_tr"], itm.gx*8-4+8+itm_xoffset-p.x*lfe*rte, itm.gy*8-24+itm_yoffset-p.y*tpe*bte);
			} else if (itm["name"] === "pepper") {
				sprite(T["pepper_bl"], itm.gx*8-4+itm_xoffset-p.x*lfe*rte, itm.gy*8+itm_yoffset-p.y*tpe*bte);
				sprite(T["pepper_br"], itm.gx*8-4+8+itm_xoffset-p.x*lfe*rte, itm.gy*8+itm_yoffset-p.y*tpe*bte);
				sprite(T["pepper_tl"], itm.gx*8-4+itm_xoffset-p.x*lfe*rte, itm.gy*8-8+itm_yoffset-p.y*tpe*bte);
				sprite(T["pepper_tr"], itm.gx*8-4+8+itm_xoffset-p.x*lfe*rte, itm.gy*8-8+itm_yoffset-p.y*tpe*bte);
			} else if (itm["name"] === "door_key") {
				
				sprite(T["door_key"], itm.gx*8+itm_xoffset-p.x*lfe*rte+itm_anim_x[iax], itm.gy*8+itm_yoffset-p.y*tpe*bte+itm_anim_y[iay]);
			}
		}
		if (Math.abs(p.x-(itm.gx*8)) < 8 && Math.abs(p.y-(itm.gy*8)) < 8) {
			if (!itm["gathered"]){
				if (itm["name"] === "nutmeg") {
					nutmeg++;
					score += 50;
				} else if (itm["name"] === "sugar_l" || itm["name"] === "sugar_r") {
					sugar++;
					score += 50;
				} else if (itm["name"] === "sugar_dbl") {
					sugar++;
					sugar++;
					score += 200;
				} else if (itm["name"] === "pepper") {
					cayenne++;
					score += 100;
				} else if (itm["name"] === "door_key") {
					has_key++;
					score += 200;
				}
				
				if (itm["name"] === "door_key") {
					assets.bleeper.collect_key.play();
				} else if (itm["name"] === "sugar_dbl") {
					assets.bleeper.collect_big.play();
				} else {
					assets.bleeper.collect.play();
				}
				
			}
			itm["gathered"] = true;
			
		}
  }
	
	
	
}







var dr_xoffset = 0;
var dr_yoffset = 0;
function draw_doors() {
	let doors_ = curr_area["exits"];//door_areas[current_area];
	let terrain_type = curr_area["terrain"];
	
	if (curr_area["width"] > G_W) {
		if (left_edge == 0) {
			dr_xoffset = SCREEN_WIDTH-XMID;
		} else {
			dr_xoffset = 0;
		}
		if (right_edge == 0) {
		} else {
			dr_xoffset = -(level_pixel_width - SCREEN_WIDTH);
		}
	} else {
		dr_xoffset = 0;
	}
	
	if (curr_area["height"] > G_H) {
		if (top_edge == 0) {
			dr_yoffset = SCREEN_HEIGHT-YMID;
		} else {
			dr_yoffset = 0;
		}
	
		if (bottom_edge == 0) {
		} else {
			dr_yoffset = -(level_pixel_height - SCREEN_HEIGHT); // to fit in info bar
		}
	} else {
		dr_yoffset = 0;
	}
	
	
	for (let door of Object.keys(doors_)) {
		let d = doors_[door];
		
		if (d["type"] == 4) {
			sprite(d.images[0], (d.gx*8)+dr_xoffset-p.x*lfe*rte, (d.gy*8)+dr_yoffset-p.y*tpe*bte-info_box_offset, false);
			sprite(d.images[1], (d.gx*8)+dr_xoffset+8-p.x*lfe*rte, (d.gy*8)+dr_yoffset-p.y*tpe*bte-info_box_offset, false);
			sprite(d.images[2], (d.gx*8)+dr_xoffset-p.x*lfe*rte, (d.gy*8)+dr_yoffset-8-p.y*tpe*bte-info_box_offset, false);
			sprite(d.images[3], (d.gx*8)+dr_xoffset+8-p.x*lfe*rte, (d.gy*8)+dr_yoffset-8-p.y*tpe*bte-info_box_offset, false);
			sprite(d.images[4], (d.gx*8)+dr_xoffset-p.x*lfe*rte, (d.gy*8)+dr_yoffset-16-p.y*tpe*bte-info_box_offset, false);
			sprite(d.images[5], (d.gx*8)+dr_xoffset+8-p.x*lfe*rte, (d.gy*8)+dr_yoffset-16-p.y*tpe*bte-info_box_offset, false);
		}
	}
	
}

//assets.bleeper.land.play();




var anm = "";










/* ========================= BACKGROUND SCROLLING =========================== */
var bg_dist_0 = 0;
var bg_dist_1 = 0;
var bg_dist_2 = 0;
var bg_dist_3 = 0;
var bg_dist_4 = 0;

var lfe = 0;
var rte = 0;
var tpe = 0;
var bte = 0;

var bg_offset_0 = 0;
var bg_offset_1 = 0;
var bg_offset_2 = 0;
var bg_offset_3 = 0;
var bg_offset_4 = 0;

var bg_scale_0 = 32; // 1 is not moving at all
var bg_scale_1 = 16;
var bg_scale_2 = 8;
var bg_scale_3 = 4;
var bg_scale_4 = 2;



var stall_scroll = false;

// calculate whether background scrolls based on left_edge and right_edge
// this also controls lfe, rte, tpe, and bte
function background_scroll(terrain_type) {
	
	/*
		
	
	*/
  
  // need to calculate how long the level is, then put as may as necessary as well as on both ends.
  if (curr_area["width"] > G_W) {
		if (left_edge == 0) {
				lfe = 1;
				bg_offset_0 = -4;
				bg_offset_1 = -8;
				bg_offset_2 = -16;
				bg_offset_3 = -32;
				bg_offset_4 = -64;
			
		} else {
				lfe = 0;
				bg_offset_0 = 0;
				bg_offset_1 = 0;
				bg_offset_2 = 0;
				bg_offset_3 = 0;
				bg_offset_4 = 0;
		}
	
		if (right_edge == 0) {
				rte = 1;
				//bg_offset_0 = 0;
				//bg_offset_1 = 0;
				//bg_offset_0 = -1;
				//bg_offset_1 = -1;
				//let checkx = Math.floor(level_pixel_width/4);
				//console.log("... "+p.x+" "+checkx);
				
		} else {
				rte = 0;
				
				// Math.floor(p.x/4) == 160
				// level_pixel_width-XMID) == 640
				bg_offset_0 = Math.floor((level_pixel_width-XMID)/bg_scale_0)-4;
				bg_offset_1 = Math.floor((level_pixel_width-XMID)/bg_scale_1)-8;
				bg_offset_2 = Math.floor((level_pixel_width-XMID)/bg_scale_2)-16;
				bg_offset_3 = Math.floor((level_pixel_width-XMID)/bg_scale_3)-32;
				bg_offset_4 = Math.floor((level_pixel_width-XMID)/bg_scale_4)-64;
				/*
				console.log(Math.floor(p.x/4)+" "+(level_pixel_width-XMID));
				if (Math.floor(p.x/4) >= level_pixel_width-XMID) {
					console.log(level_pixel_width-XMID);
					bg_offset_1 = level_pixel_width+32;
				};
				*/
				/*
				let checkx = Math.floor((level_pixel_width-XMID)/4);
				//console.log(); //level_pixel_width
				bg_offset_0 = level_pixel_width-XMID-115;
				bg_offset_1 = level_pixel_width-XMID-checkx;
				
				
				
				let Math.floor(p.x/4);
				console.log("xxx "+p.x+" "+checkx+" "+bg_offset_1);
				
				//console.log(bg_offset_1);
				*/
				//bg_offset_0 = 0;
				//bg_offset_1 = 0;
		}
  } else {
		
  	lfe = 0;
		rte = 0;
		
		bg_offset_0 = 0;
		bg_offset_1 = 0;
		bg_offset_2 = 0;
		bg_offset_3 = 0;
		bg_offset_4 = 0;
		
  }
	
	if (curr_area["height"] > G_H) {
		if (top_edge == 0) {
				tpe = 1;
		} else {
				tpe = 0;
		}
	
		if (bottom_edge == 0) {
				bte = 1;
		} else {
				bte = 0;
		}
	} else {
		tpe = 0;
		bte = 0;
	}
	
		
  
	//return;
	//console.log(curr_area["width"]);
	
	// going right
	// l_offset: 0    lfe: 0   rte: 1
	// l_offset: 0    lfe: 1   rte: 1     <---- faulty frame
	// l_offset: 128    lfe: 1   rte: 1
	//
	// going left
	// l_offset: 128    lfe: 1   rte: 1
	// l_offset: 128    lfe: 0   rte: 1   <---- faulty frame
	// l_offset: 0    lfe: 0   rte: 1
	//
	
	
	// so we can tell where the background edge loops around. 3*8 is default
	let le_ = 0;//3*8;
	
  bg_dist_0 = Math.floor(p.x/bg_scale_0)*lfe*rte + bg_offset_0;
	
	// right_edge = p.x-level_pixel_width+XMID; 
  // 0 - 256 - ()
	
	let offset_plus = 0;
	
	if (terrain_type === "underground") {
		
	  draw(bg2, le_ - bg_width - bg_dist_0, 0);
	  draw(bg2, le_ - bg_dist_0, 0);
	  draw(bg2, le_ + bg_width - bg_dist_0, 0);
		draw(bg2, le_ + bg_width*2 - bg_dist_0, 0);
		
	} else if (["ground", "aboveground"].includes(terrain_type)) {
		// bg1 is farther away
	  draw(bg1, le_ - bg_width - bg_dist_0, 0+offset_plus);
	  draw(bg1, le_ - bg_dist_0, 0+offset_plus);
	  draw(bg1, le_ + bg_width - bg_dist_0, 0+offset_plus);
		draw(bg1, le_ + bg_width*2 - bg_dist_0, 0+offset_plus);
  
	  bg_dist_1 = Math.floor(p.x/4)*lfe*rte + bg_offset_1;
	
		// bg1b is closer
		draw(bg1b, le_ - bg_width*2 - bg_dist_1, 0+offset_plus);
	  draw(bg1b, le_ - bg_width - bg_dist_1, 0+offset_plus);
	  draw(bg1b, le_ - bg_dist_1, 0+offset_plus);
	  draw(bg1b, le_ + bg_width - bg_dist_1, 0+offset_plus);
		draw(bg1b, le_ + bg_width*2 - bg_dist_1, 0+offset_plus);
  
		//console.log(bg_offset);
	} else if (["sky", "peak", "peakright", "peakleft"].includes(terrain_type)) {
		
		let ofp = 0;
		// backmost
		//draw(bg3a, le_ - bg_width*2 - bg_dist_0, 0+ofp);
	  draw(bg3a, le_ - bg_width - bg_dist_0, 0+ofp);
	  draw(bg3a, le_ - bg_dist_0, 0+ofp);
	  draw(bg3a, le_ + bg_width - bg_dist_0, 0+ofp);
		draw(bg3a, le_ + bg_width*2 - bg_dist_0, 0+ofp);
		
	  bg_dist_1 = Math.floor(p.x/bg_scale_1)*lfe*rte + bg_offset_1;
	
		// bg_b is closer
		draw(bg3b, le_ - bg_width*2 - bg_dist_1, 0+ofp);
	  draw(bg3b, le_ - bg_width - bg_dist_1, 0+ofp);
	  draw(bg3b, le_ - bg_dist_1, 0+ofp);
	  draw(bg3b, le_ + bg_width - bg_dist_1, 0+ofp);
		draw(bg3b, le_ + bg_width*2 - bg_dist_1, 0+ofp);
		
	  bg_dist_2 = Math.floor(p.x/bg_scale_2)*lfe*rte + bg_offset_2;
	
		// bg_c
		draw(bg3c, le_ - bg_width*2 - bg_dist_2, 0+ofp);
	  draw(bg3c, le_ - bg_width - bg_dist_2, 0+ofp);
	  draw(bg3c, le_ - bg_dist_2, 0+ofp);
	  draw(bg3c, le_ + bg_width - bg_dist_2, 0+ofp);
		draw(bg3c, le_ + bg_width*2 - bg_dist_2, 0+ofp);
		
	  bg_dist_3 = Math.floor(p.x/bg_scale_3)*lfe*rte + bg_offset_3;
	
		// bg_d
		draw(bg3d, le_ - bg_width*2 - bg_dist_3, 0+ofp);
	  draw(bg3d, le_ - bg_width - bg_dist_3, 0+ofp);
	  draw(bg3d, le_ - bg_dist_3, 0+ofp);
	  draw(bg3d, le_ + bg_width - bg_dist_3, 0+ofp);
		draw(bg3d, le_ + bg_width*2 - bg_dist_3, 0+ofp);
  	
		//console.log(bg_offset);
	} else if (["towergroundright", "towergroundleft"].includes(terrain_type)) {
		// bg1 is father away
	  draw(bg1, le_ - bg_width - bg_dist_0, 0+offset_plus);
	  draw(bg1, le_ - bg_dist_0, 0+offset_plus);
	  draw(bg1, le_ + bg_width - bg_dist_0, 0+offset_plus);
		draw(bg1, le_ + bg_width*2 - bg_dist_0, 0+offset_plus);
  
	  bg_dist_1 = Math.floor(p.x/bg_scale_2)*lfe*rte + bg_offset_2;
	
		// bg1b is closer
		draw(bg1b, le_ - bg_width*2 - bg_dist_1, 0+offset_plus);
	  draw(bg1b, le_ - bg_width - bg_dist_1, 0+offset_plus);
	  draw(bg1b, le_ - bg_dist_1, 0+offset_plus);
	  draw(bg1b, le_ + bg_width - bg_dist_1, 0+offset_plus);
		draw(bg1b, le_ + bg_width*2 - bg_dist_1, 0+offset_plus);
	
	} else if (["insidetowerground", "insidetower", "insidetowertop"].includes(terrain_type)) {
		// bg1 is father away
	  /*
		draw(bg1c, le_ - bg_width - bg_dist_0, 0+12);
	  draw(bg1c, le_ - bg_dist_0, 0+12);
	  draw(bg1c, le_ + bg_width - bg_dist_0, 0+12);
		draw(bg1c, le_ + bg_width*2 - bg_dist_0, 0+12);
  */
	
	  bg_dist_1 = Math.floor(p.x/4)*lfe*rte + bg_offset_1;
	
		// bg1b is closer
		draw(bg1c, le_ - bg_width*2 - bg_dist_1, 0+offset_plus);
	  draw(bg1c, le_ - bg_width - bg_dist_1, 0+offset_plus);
	  draw(bg1c, le_ - bg_dist_1, 0+offset_plus);
	  draw(bg1c, le_ + bg_width - bg_dist_1, 0+offset_plus);
		draw(bg1c, le_ + bg_width*2 - bg_dist_1, 0+offset_plus);
	
	}
	
	
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



var drop1x = 0;
var drop1y = 0;
var drop2x = 0;
var drop2y = 0;
var drop3x = 0;
var drop3y = 0;
var drop4x = 0;
var drop4y = 0;
var drop5x = 0;
var drop5y = 0;
function draw_weather() {
	if (!(dt%32)) {
		drop1x = getRandomInt(250);
		drop1y = getRandomInt(192);
	}
	if (!(dt%16)) {
		drop2x = getRandomInt(250);
		drop2y = getRandomInt(192);
	}
	if (!(dt%8)) {
		drop3x = getRandomInt(250);
		drop3y = getRandomInt(192);
	}
	if (!(dt%32)) {
		drop4x = getRandomInt(250);
		drop4y = getRandomInt(192);
	}
	if (!(dt%32)) {
		drop4x = getRandomInt(250);
		drop4y = getRandomInt(192);
	}
	/*
	if (dt%2){
		draw(bg_rain, 0, dt%8);
	}
	/**/
	
	sprite(508, drop1x, drop1y+(dt%32)*3);
	sprite(508, drop2x, drop2y+(dt%16)*3);
	sprite(508, drop3x, drop3y+(dt%8)*3);
	sprite(508, drop4x, drop4y+(dt%32)*3);
	sprite(508, drop5x, drop5y+(dt%32)*3);
	
	//sprite(508, 0, 0);
	
}

function draw_minimap() {
	
	
	
	let cmap = curr_area["cmap"];
	for (let cy=0; cy<cmap.length; cy++){
		for (let cx=0; cx<cmap[0].length; cx++) {
			if (cmap[cy][cx]) {
				if (["^^", "vv", ">^", "^<", ">.", ".<", "v_", "_v", "C.", "C^", "Cv"].includes(cmap[cy][cx])) {
					sprite(510, 3+cx, 3+cy);
				} else if (["D-"].includes(cmap[cy][cx])) {
					sprite(509, 3+cx, 3+cy); sprite(509, 3+cx+1, 3+cy);
					sprite(509, 3+cx, 3+cy+2); sprite(509, 3+cx+1, 3+cy+2);
				} else if (["D|"].includes(cmap[cy][cx])) {
					sprite(509, 3+cx, 3+cy); sprite(510, 3+cx+1, 3+cy);
					sprite(510, 3+cx+1, 3+cy+1);
					sprite(509, 3+cx, 3+cy+2); sprite(510, 3+cx+1, 3+cy+2);
				} else {
					sprite(509, 3+cx, 3+cy);
				}
			}
			
		}
	}
}



function tupleExists(array, tuple) {
  for (const arr of array) {
    if (arr[0] === tuple[0] && arr[1] === tuple[1]) {
      return true;
    }
  }
  return false;
}


function findElementByValues(obj, pName1, pValue1, pName2, pValue2) {
  for (const key in obj) {
    if (obj[key][pName1] === pValue1 && obj[key][pName2] === pValue2) {
      return obj[key];
    }
  }
  return null; // If no match is found
}







/* ===================== LEVEL GRAPH ===================== */

class LevelGraph {
	/*
    
		--------------------
		   6─┐   ┌─5──9
		     │   │
		0───1┴──2┼──3───4 
		         │
	      8──7─┘
		
		
		
		6, 8, and 9 should have cool items or difficult enemies
	
		
		the first element in each array is what the node in the graph is connected to
		0 is the area at the start of the level
	
		- WorldGraph will have a similar structure
		
		- also contains information about each area (image and grid)
	
		- always starts in 0
		- random.choice(['edge', 'door']) to next area
			make sure it is the same going back, left edge or door
	
		- distribute  key+lock combos 
	
	
	
	
	*/
	
	
	
  
  constructor(mainPath, sidePaths=0) {
		
		// create graph first, then can use after to build each level
    this.finalArea = mainPath-1; //first room is room 'zero'
    this.numAreas = mainPath + sidePaths; // can use to scatter artifacts
    this.sidePaths = sidePaths;
    this.AdjList = new Map(); // adjacency list
		
		this.init_terrain_type = "";
		//this.ground_level = 0;
		
		this.areas = [];
    
    // adding level areas
    for (let i=0; i<mainPath; i++) {
      //console.log("adding "+i+" to areas")
      this.addArea(i);
    }
    
    // connecting level areas
    for (let i=0, j=1; i<mainPath-1; i++, j++) {
      //console.log("connected main path: "+i+" to "+j);
      this.connect(i, j);
    }
    
		var not_ends = Array.from(Array(mainPath-2).keys(),n=>n+1);
    var leftover = mainPath;
    //console.log(leftover);
    while (leftover < this.numAreas) {
      // pick one randomly from areas
      let len = not_ends.length;
			let pick = rnd(0,len);
  
      let random_area = not_ends[pick];
  
      // add this area to current areas
      not_ends.push(leftover);
      this.addArea(leftover);
      this.connect(random_area, leftover);
      leftover++;
    }
		
		// dead ends
		let leaves = [];
		for (var i of this.AdjList.keys()) {
      if (i > this.finalArea && this.AdjList.get(i).length === 1) {
        leaves.push(i);
      }
    }
    this.leaves = leaves;
  }

  // add level section
  addArea(a) {
    // initialize the adjacent list with a null array
    this.AdjList.set(a, []);
  }

  // add edge to the graph
  connect(a, b) {
    this.AdjList.get(a).push(b);
    this.AdjList.get(b).push(a);
  }
	
	info() {
		return ""
      +"\nmain path length: "+(this.finalArea+1)+"   num other areas: "+this.sidePaths
      +"\nleaves:  "+this.leaves+"   start: [0]  end: ["+this.finalArea+"]"
			+"\n CURRENT AREA: "+current_area
			+"\nwidth: "+this.areas[current_area]["width"]+"  leaves: "+this.areas[current_area]["exits"]
			
	}
	
	
	area_info(area_index) {
		//let area = this.AdjList.get(area_index);
		let exits = this.areas[area_index]["exits"];
		let string = "";
		let exit_type = "";
		for (let e of Object.keys(exits)) {
			switch (exits[e]["type"]) {
				case 4:
					exit_type = "door";
					break;
				case 10:
					exit_type = "left  <";
					break;
				case 11:
					exit_type = "right >";
					break;
				case 12:
					exit_type = "down  v";
					break;
				case 13:
					exit_type = "up    ^";
					break;
			}
			string += e+": "+exit_type+"\n";
		}
		string += "width: "+this.areas[area_index]["width"];
		string += "  height: "+this.areas[area_index]["height"];
		string += "\nterrain: "+this.areas[area_index]["terrain"];
		string += "\nvertical: "+this.areas[area_index]["is_vertical"];
		if (this.areas[area_index]["right_to_left"]) {
			string += "\n   <--- go left";
		} else {
			string += "\n   go right -->";
		}
		
		
		
		
		return string;
	}
	
	shuffleArray(arr) {
		/* Richard Durstenfeld */
		
	  let curId = arr.length;
	  // There remain elements to shuffle
	  while (0 !== curId) {
	    // Pick a remaining element
	    //let randId = Math.floor(Math.random() * curId);
	    let randId = rnd(0, curId)
	    curId -= 1;
	    // Swap it with the current element.
	    let tmp = arr[curId];
	    arr[curId] = arr[randId];
	    arr[randId] = tmp;
	  }
		
	  return arr;
	}
	
	
	
	// add area to list if it doesnt exist, else replace
	build_area(area_index, numScreensX=1, numScreensY=1, is_vertical=false) {
		/*
			
			
		
		
			
		*/
		
		//console.log("build area: "+area_index+"   numXscr: "+numScreensX+" numYscr: "+numScreensY);
		//let area_chunk_map
		
		let area_grid = [...Array(numScreensY*G_H)].map(_ => Array(numScreensX*G_W).fill(0));
		let event_grid = [...Array(numScreensY*G_H)].map(_ => Array(numScreensX*G_W).fill(0));
		let area_image = new TileMap(numScreensX*G_W, numScreensY*G_H);
		let area_image_behind = new TileMap(numScreensX*G_W, numScreensY*G_H);
		let area_image_front = new TileMap(numScreensX*G_W, numScreensY*G_H);
		
		//let area_oob = new TileMap(numScreensX*32, numScreensY*32); // bottom of the screen?
		
		let connection_list = this.AdjList.get(area_index); // e.g. index=1: [0,2]
		let prev_area_index = connection_list[0]; // e.g. index=1: 0
		
		//console.log("area_index: "+area_index+"     conn_list: "+connection_list);
		
		// this might depend on whether level is vertical
		let edge_list = this.shuffleArray([11,11,11,10,12,13,4]); // more 11s mean better chance of moving to the right
		
		let terrain_type = "";
		let right_to_left = false;
		
		let exits = {}; // can have more than one exit in this area (except area 0)
		
		// status 0 means not filled. goto is the area it leads to
		/*
		let edge_exits = {
			"left": Array.from( Array(numScreensY).keys(), k => (
				{"status": 0, "x": 0, "y": k*32+30, "type": 10, "goto": -1}
			)),
			"right": Array.from( Array(numScreensY).keys(), k => (
				{"status": 0, "x": numScreensX*32-1, "y": k*32+30, "type": 11, "goto": -1}
			)),
			"top": Array.from( Array(numScreensX).keys(), k => (
				{"status": 0, "x": k*32+16, "y": 0, "type": 13, "goto": -1}
			)),
			"bottom": Array.from( Array(numScreensX).keys(), k => (
				{"status": 0, "x": k*32+16, "y": numScreensY*32-2, "type": 12, "goto": -1}
			)),
		};
		let edge_exits_list = [];
		
		// these will help with mapping after shuffling
		for (let lr=0; lr<numScreensY; lr++){
			edge_exits_list.push(["left", lr]);
			edge_exits_list.push(["right", lr]);
		}
		for (let tb=0; tb<numScreensX; tb++){
			edge_exits_list.push(["top", tb]);
			edge_exits_list.push(["bottom", tb]);
		}
		
		edge_exits_list = this.shuffleArray(edge_exits_list);
		//console.log(edge_exits_list);
		
		*/
		
		// try to have each exit on both edges of the area map 
		// first is the "left"
		for (let ai=0; ai<connection_list.length; ai++) {
			//console.log(". conn_list["+ai+"]: "+connection_list[ai]);
			
			if (area_index == 0) {
				// LEAF: first area is a special case
				/*
						   .─┐   ┌─.──.
						     │   │
						0───.┴──.┼──.───. 
						         │
					      .──.─┘
				*/
				
				let exit_type = 4; // default is door
				
				if (edge_list.length > 0){
					exit_type = edge_list.pop(); // otherwise pop from list and remove others
					edge_list = edge_list.filter(function(type){ return type != exit_type; });
				}
				//console.log(edge_list);
				//let exit_type_i = rnd(0, 5);
				
				// 4 is door, //10 is left edge, 11 is right edge, 
				// 12 and 13 are optional paths 'in'/'out' of the background
				//let exit_type = 0;
				
				let status_ = 0;//rnd(0,2); // <------ *********** RANDOMIZE
				if (exit_type === 4) {
					status_ = 2;
				}
				
				let gotox = -1;
				let gotoy = -1;
				let gx = 0;
				let gy = 0;
				
				
				//let next_terrain_type = TERRAIN[exit_type]
				
				// don't know width or height of next area
				gotox = -1;
				gotoy = -1;
				
			  switch (exit_type) {
					case 4: // exit thru door
						gotox = 5; // this will be changed later, better algorithm
						gx = numScreensX*G_W - 5;
						gy = numScreensY*G_H - 2;
			      break;
			    case 10: // exit thru left edge
						gx = 0;
						gy = numScreensY*G_H - 2;
						right_to_left = true;
			      break;
			    case 11: // exit thru right edge
						gotox = 0;
						gx = numScreensX*G_W - 1;
						gy = numScreensY*G_H - 2;
			      break;
			    case 12: // exit thru bottom
						gotoy = 0; 
						gx = Math.floor((numScreensX*G_W)/2);
						gy = numScreensY*G_H - 1;
			      break;
			    case 13: // exit thru top
						gx = Math.floor((numScreensX*G_W)/2);
						gy = 0;
			      break;
					
			      
			  }
				
				terrain_type = this.init_terrain_type;
				let toff = 0;//64*5;
				if (terrain_type === "ground") {
					//toff = 64*5;
				}
				/**/
				// {"status": 0, "x": 0, "y": k*32+30, "type": 10, "goto": -1}
				// for area 0, area 1 is the only possibility
				
				
				exits["1"] = {
					
					"goto": 1,
					"gx": gx,
					"gy": gy,
					"gotox": gotox,
					"gotoy": gotoy,
					"type": exit_type,
					"status": status_,
					"open_images": [
						234+toff, 
						235+toff, 
						218+toff, 
						219+toff, 
						202+toff, 
						203+toff
					],
					"images": [
						234+(status_*2)+toff, 
						235+(status_*2)+toff, 
						218+(status_*2)+toff,
						219+(status_*2)+toff,
						202+(status_*2)+toff,
						203+(status_*2)+toff
					],
				};
				//let type_string = exit_type === 4? "door" : "edge";
				//console.log("  built exit: 1 ("+type_string+")");
				
				//console.log(". . exits[1]: "+gx+" "+gy+" -> "+gotox+" "+gotoy+"    type: "+exit_type);
				//if first room, only one exit at the end 
				// (can be random in that last screen, else right edge)
				
				
				
			} else if (area_index == this.finalArea) {
				/*
						   .─┐   ┌─.──.
						     │   │
						.───.┴──.┼──.───4 
						         │
					      .──.─┘
				*/
				
				
				
				// LEAF: last area ('boss room') is also a special case
				//let prev_area_i = this.finalArea-1; // previous one e.g. area: 4 has connection_list: [3]
				let prev_exit = this.areas[prev_area_index]["exits"][area_index]; // the last area's exit to THIS one 
				let prev_exit_type = prev_exit["type"];
				let this_exit_type = -1;
				
				let status_ = 0;//rnd(0,2); // can't randomize, since this is the way back (unless it closes or locks behind you)
				if (prev_exit_type === 4) {
					status_ = 1;
				}
				
				let gx = 0;
				let gy = 0;
			  
				
				switch (prev_exit_type) {
					case 4: // door
			      this_exit_type = 4;
						gx = 5;
						gy = numScreensY*G_H - 2;
			      break;
					
					case 10: // if left edge...
						this_exit_type = 11; // ...then THIS exit is a right exit to the previous room  | boss ->|- prev |
						gx = numScreensX*G_W - 1; 
						gy = numScreensY*G_H - 2;
						right_to_left = true; // because entering into the boss fight from the right
						break;
			    case 11: // if right edge...
			      this_exit_type = 10; // ...then THIS exit is a left exit to the previous room  | prev -|<- boss |
						gx = 0;
						gy = numScreensY*G_H - 2; //prev_exit["y"];
			      break;
					case 12: // if bottom...
						this_exit_type = 13; // then exit through top         |  ^  |
						gx = Math.floor((numScreensX*G_W)/2);
						gy = 0;
						break;
					case 13: // if top...
						this_exit_type = 12; // then exit through bottom      |  _  |
						gx = Math.floor((numScreensX*G_W)/2);
						gy = numScreensY*G_H - 1;
						break;
						
			  }
				
				// remove this exit type from edge list
				edge_list = edge_list.filter(function(type){ return type != this_exit_type; });
				
				// update previous room
				prev_exit["gotox"] = gx;
				prev_exit["gotoy"] = gy;
				this.areas[prev_area_index]["exits"][area_index] = prev_exit;
				
				let prev_ter = this.areas[prev_area_index]["terrain"];
				let ter_list = TERRAIN[prev_ter][prev_exit_type.toString()];
				terrain_type = ter_list[rnd(0, ter_list.length)];
				let toff = 0;//64*5;
				if (terrain_type === "ground") {
					//toff = 64*5;
				}
				
				exits[prev_area_index] = {
					"goto": prev_area_index,
					"gx": gx,
					"gy": gy,
					"gotox": prev_exit["gx"], 
					"gotoy": prev_exit["gy"],
					"type": this_exit_type,
					"status": status_,
					"open_images": [
						234+toff, 
						235+toff, 
						218+toff, 
						219+toff, 
						202+toff, 
						203+toff
					],
					"images": [
						234+(status_*2)+toff, 
						235+(status_*2)+toff, 
						218+(status_*2)+toff,
						219+(status_*2)+toff,
						202+(status_*2)+toff,
						203+(status_*2)+toff
					],
				};
				let type_string = this_exit_type === 4? "door" : "edge";
				//console.log("  built exit: "+prev_area_index+" ("+type_string+")");
				//console.log(". . exits[last]: "+gx+" "+gy+" -> "+prev_exit["gx"]+" "+prev_exit["gy"]+"    type: "+this_exit_type);
				
				//console.log(". . exits[last]: "+gx+" "+gy+" -> "+gotox+" "+gotoy);
				
				
			
			}	else {
				
				/*
						   6─┐   ┌─5──9
						     │   │
						.───1┴──2┼──3───. 
						         │
					      8──7─┘
					
					e.g.
					
						area_index: 1, 
						connection_list: [0, 2, 6]  
						this.finalArea: 4
				*/
				
				if (ai == 0) {
					/*
					  backward branching--
						first number in list is the 'way back' to the previous room
						e.g. [0, ..., ...] 
						
					*/
					
					
					
					let prev_exit = this.areas[prev_area_index]["exits"][area_index]; // the last area's exit to THIS one 
					let prev_exit_type = prev_exit["type"];
					let this_exit_type = -1;
					
					
					let status_ = 0;//rnd(0,2); // cant randomize, since this is the way back
					if (prev_exit_type === 4) {
						status_ = 1;
					}
					
					let gx = 0;
					let gy = 0;
			  	
					// exit type is based on previous room
					switch (prev_exit_type) {
						case 4: // door
				      this_exit_type = 4;
							gx = 5;
							gy = numScreensY*G_H - 2;
				      break;
							
						case 10: // if left edge...
							this_exit_type = 11; // ...then this is a right exit to the previous room  |   ->|
							gx = numScreensX*G_W - 1; 
							gy = numScreensY*G_H - 2;
							right_to_left = true;
							break;
				    case 11: // if right edge...
				      this_exit_type = 10; // ...then this is a left exit to the previous room  |<-   |
							gx = 0;
							gy = numScreensY*G_H - 2; //prev_exit["y"];
				      break;
						case 12: // if bottom...
							this_exit_type = 13; // then exit through top         |  ^  |
							gx = Math.floor((numScreensX*G_W)/2);
							gy = 0;
							break;
						case 13: // if top...
							this_exit_type = 12; // then exit through bottom      |  _  |
							gx = Math.floor((numScreensX*G_W)/2);
							gy = numScreensY*G_H - 1;
							break;
				  }
					
					// remove this exit type from edge list
					edge_list = edge_list.filter(function(type){ return type != this_exit_type; });
					
					// update previous room
					prev_exit["gotox"] = gx;
					prev_exit["gotoy"] = gy;
					this.areas[prev_area_index]["exits"][area_index] = prev_exit;
					
					//console.log(this.areas[prev_area_index]["exits"]);
					let ter_list = TERRAIN[this.areas[prev_area_index]["terrain"]][prev_exit_type.toString()];
					terrain_type = ter_list[rnd(0, ter_list.length)]; // error? cant read undefined
					let toff = 0;//64*5;
					if (terrain_type === "ground") {
						toff = 64*5;
					}
					
					exits[prev_area_index] = {
						"goto": prev_area_index,
						"gx": gx,
						"gy": gy,
						"gotox": prev_exit["gx"], 
						"gotoy": prev_exit["gy"],
						"type": this_exit_type,
						"status": status_,
						"open_images": [
							234+toff, 
							235+toff, 
							218+toff, 
							219+toff, 
							202+toff, 
							203+toff
						],
						"images": [
							234+(status_*2)+toff, 
							235+(status_*2)+toff, 
							218+(status_*2)+toff,
							219+(status_*2)+toff,
							202+(status_*2)+toff,
							203+(status_*2)+toff
						],
					};
					
					
					//let type_string = this_exit_type === 4? "door" : "edge";
					//console.log("  built exit: "+prev_area_index+" ("+type_string+")");
					
					
					
					
					
				} else {
					/*
							forward branching
					*/
					
					let goto_area = connection_list[ai];
					
					
					if (goto_area <= this.finalArea) {
						/*
								branching, toward final 'boss' room
								e.g. [..., 2, ...]
						*/
						
						let exit_type = 4; // default is door
						if (edge_list.length > 0){
							exit_type = edge_list.pop(); // otherwise pop from list and remove others
							edge_list = edge_list.filter(function(type){ return type != exit_type; });
						}
						
						let status_ = 0;
						if (exit_type === 4) {
							status_ = 2; //rnd(0,2); // <------ *********** RANDOMIZE
						}
						
						let gotox = 0;
						let gotoy = 0;
						let gx = 0;
						let gy = 0;
						
						// don't know width or height of next area
						gotox = -1;
						gotoy = -1;
				
					  switch (exit_type) {
							case 4: // exit thru door
								gotox = 5; // this will be changed later, better algorithm
								gx = numScreensX*G_W - goto_area - 5;
								gy = numScreensY*G_H - 2;
					      break;
					    case 10: // exit thru left edge
								gx = 0;
								gy = numScreensY*G_H - 2;
								right_to_left = true;
					      break;
					    case 11: // exit thru right edge
								gotox = 0;
								gx = numScreensX*G_W - 1;
								gy = numScreensY*G_H - 2;
					      break;
					    case 12: // exit thru bottom
								gotoy = 0; 
								gx = Math.floor((numScreensX*G_W)/2);
								gy = numScreensY*G_H - 1;
					      break;
					    case 13: // exit thru top
								gx = Math.floor((numScreensX*G_W)/2);
								gy = 0;
					      break;
					  }
						
						
						
						exits[goto_area] = {
							"goto": goto_area,
							"gx": gx,
							"gy": gy,
							"gotox": gotox, 
							"gotoy": gotoy,
							"type": exit_type,
							"status": status_,
							"open_images": [
								234, 
								235, 
								218, 
								219, 
								202, 
								203
							],
							"images": [
								234+(status_*2), 
								235+(status_*2), 
								218+(status_*2),
								219+(status_*2),
								202+(status_*2),
								203+(status_*2)
							],
						};
						let type_string = exit_type === 4? "door" : "edge";
						//console.log("  built exit: "+goto_area+" ("+type_string+")");
						//console.log(". . if (ai <= last) exits["+goto_area+"]: "+gx+" "+gy+" -> "+gotox+" "+gotoy);
						//console.log(". . exits["+goto_area+"]: "+gx+" "+gy+" -> "+gotox+" "+gotoy+"    type: "+exit_type);
					
					} else {
						/*
							branching, toward dead-ends
							e.g. [..., ..., 6]
						*/
						let exit_type = 4; // default is door
						if (edge_list.length > 0){
							exit_type = edge_list.pop(); // otherwise pop from list and remove others
							edge_list = edge_list.filter(function(type){ return type != exit_type; });
						}
						
						let status_ = 0;
						if (exit_type === 4) {
							status_ = 2; //rnd(0,2); // <------ *********** RANDOMIZE
						}
						
						let gotox = 0;
						let gotoy = 0;
						let gx = 0;
						let gy = 0;
						
						// don't know width or height of next area
						gotox = -1;
						gotoy = -1;
				
					  switch (exit_type) {
							case 4: // exit thru door
								gotox = 5; // this will be changed later, better algorithm
								gx = numScreensX*G_W - goto_area - 5;
								gy = numScreensY*G_H - 2;
					      break;
					    
							case 10: // exit thru left edge
								gx = 0;
								gy = numScreensY*G_H - 2;
								right_to_left = true;
					      break;
					    case 11: // exit thru right edge
								gotox = 0;
								gx = numScreensX*G_W - 1;
								gy = numScreensY*G_H - 2;
					      break;
					    case 12: // exit thru bottom
								gotoy = 0; 
								gx = Math.floor((numScreensX*G_W)/2);
								gy = numScreensY*G_H - 1;
					      break;
					    case 13: // exit thru top
								gx = Math.floor((numScreensX*G_W)/2);
								gy = 0;
					      break;
					  }
						
						exits[goto_area] = {
							"goto": goto_area,
							"gx": gx,
							"gy": gy,
							"gotox": gotox, 
							"gotoy": gotoy,
							"type": exit_type,
							"status": status_,
							"open_images": [
								234,//+toff, 
								235,//+toff, 
								218,//+toff, 
								219,//+toff, 
								202,//+toff, 
								203,//+toff
							],
							"images": [
								234+(status_*2),//+toff, 
								235+(status_*2),//+toff, 
								218+(status_*2),//+toff,
								219+(status_*2),//+toff,
								202+(status_*2),//+toff,
								203+(status_*2),//+toff
							],
						};
						let type_string = exit_type === 4? "door" : "edge";
						//console.log("  built exit: "+goto_area+" ("+type_string+")");
						//console.log(". . if (ai > to leaves) exits["+goto_area+"]: "+gx+" "+gy+" -> "+gotox+" "+gotoy);
						//console.log(". . exits["+goto_area+"]: "+gx+" "+gy+" -> "+gotox+" "+gotoy+"    type: "+exit_type);
					}
					
					
					//this.areas[prev_area_index]["exits"][area_index];
				}
				
			}
			
			//console.log("-- end "+ai+" ");
		}
		
		
		
		
		let area_info = {
			//"chunk_map": area_chunks,
			"grid": area_grid,
			"event_grid": event_grid,
			"items": [],
			"small_enemies": [],
			"platforms": [],
			"image": area_image, 
			"image_behind": area_image_behind,
			"image_front": area_image_front,
			"exits": exits, // [0,2]
			"width": numScreensX*G_W,
			"height": numScreensY*G_H,
			"xscreens": numScreensX,
			"yscreens": numScreensY,
			"terrain": terrain_type,
			"is_vertical": is_vertical,
			"right_to_left": right_to_left 
		}
		
		
		
		this.areas.splice(area_index, 1, area_info); // at position 'index' add area info and remove
		
		
		
		
	}
	
	
	/*
	makeAreaDungeon(area_index) {
		let area = this.areas[area_index];
		
		for (let y_=0; y_<area["height"]; y_++){
			for (let x_=0; x_<area["width"]; x_++){
				if (area["grid"][y_][x_] == 0) {
					//area["grid"][y_][x_] = 1;
					area["image"].set(x_, y_, 241 );
				}
			}
		}
	}/**/
	
	/*
	moveExit(area_index, exit_index, xnew, ynew) {
		
	}/**/
	
	
		/*
			16 17 18  19 20 21  22 23 24  25 26 27  28 29 30 31
		  32 33 34  35 36 37  38 39 40  41 42 43  44 45 46 47
		  48 49 50  51 52 53  54 55 56  57 58 59  60 61 62 63
		*/
	
	
	/*
	createDungeonChunkMap(area_index) {
		
		
	}/**/
	
	
	
	
	
	printChunks(a, cmap, dcx, dcy, ucx, ucy) {
		let area = this.areas[a];
		
		let exits_ = Object.keys(area["exits"]).map(e => area["exits"][e].type);
		//console.log("      area "+a);
		for (let j=0; j<cmap.length; j++) {
			let print_row = j+"";
			for (let i=0; i<cmap[0].length; i++) {
				let c_ = cmap[j][i] ? cmap[j][i] : "  ";
				if ((j === ucy && i === ucx) || (j === dcy && i === dcx)) {
					print_row += "["+c_;
				} else {
					if ((j === ucy && i-1 === ucx) || (j === dcy && i-1 === dcx)){
						print_row += "]"+c_;
					} else {
						print_row += " "+c_;
					}
					
				}
				
			}
			console.log(print_row);
		}
		/*
		if (bcx > 0) {
			let bottom_exit = "  ";
			for (let bx_=0; bx_<bcx; bx_++) {
				bottom_exit += "   ";
			}
			bottom_exit += "↓↓";
			console.log(bottom_exit);
		}*/
		console.log();
	}
	
	
	createChunkMap(area_index) {
		
		let area = this.areas[area_index];
		let aH = area["height"]; // area height
		let aW = area["width"]; // area width
		let bH = aH+2; // border height
		let bW = aW+2; // border width
		let gbtm = aH-1; // grid bottom
		let bbtm = aH; // border bottom
		let b0 = 1;
		let terrain_grid = [...Array(aH)].map(_ => Array(aW).fill(0));
		let terrain_img = [...Array(bH)].map(_ => Array(bW).fill(0));
		let terrain_img_behind = [...Array(bH)].map(_ => Array(bW).fill(0));
		let terrain_img_front = [...Array(bH)].map(_ => Array(bW).fill(0));
		
		
		for (let x=0; x<bW; x++) { // top and bottom edges
			terrain_img[0][x] = 49;
			terrain_img[bH-1][x] = 17;
			terrain_img_behind[0][x] = 49;
			terrain_img_behind[bH-1][x] = 17;
			terrain_img_front[0][x] = 49;
			terrain_img_front[bH-1][x] = 17;
		}
		for (let y=0; y<bH; y++) { // left and right edges
			terrain_img[y][0] = 34;
			terrain_img[y][bW-1] = 32;
			terrain_img_behind[y][0] = 34;
			terrain_img_behind[y][bW-1] = 32;
			terrain_img_front[y][0] = 34;
			terrain_img_front[y][bW-1] = 32;
		}
		terrain_img[0][0] = 25; // corners
		terrain_img[0][bW-1] = 27;
		terrain_img[bH-1][0] = 57;
		terrain_img[bH-1][bW-1] = 59;
		terrain_img_behind[0][0] = 25; // corners
		terrain_img_behind[0][bW-1] = 27;
		terrain_img_behind[bH-1][0] = 57;
		terrain_img_behind[bH-1][bW-1] = 59;
		terrain_img_front[0][0] = 25; // corners
		terrain_img_front[0][bW-1] = 27;
		terrain_img_front[bH-1][0] = 57;
		terrain_img_front[bH-1][bW-1] = 59;
		
		
		
		
		
		let chx_max = area["xscreens"]*4; // number of chunks across
		let chy_max = area["yscreens"]*3; // number of chunks down
		
		let is_underground = ["underground"].includes(area.terrain);
		let is_sky = ["sky"].includes(area.terrain);
		let is_aboveground = ["aboveground"].includes(area.terrain);
		let is_castle = ["insidetowertop", "insidetower", "insidetowerground"].includes(area.terrain);
		
		
		let no_floor = ["aboveground", "sky"].includes(area.terrain);
		let fill_in_ceiling = [
			"insidecavetop", 
			"insidecave", 
			"underground", 
			//"insidetower", 
			//"insidetowertop", 
			//"insidetowerground", 
			"basement",
			"caveground",
			"mountain"
		].includes(area.terrain);
		
		let is_peak = ["peak"].includes(area.terrain);
		let is_mountain = ["mountain"].includes(area.terrain);
		let is_cave = ["caveground"].includes(area.terrain);
		let is_peak_right = ["peakright"].includes(area.terrain); 
		let is_cliff_right = ["cliffright"].includes(area.terrain);
		let is_cave_right = ["caveright"].includes(area.terrain);
		let is_peak_left = ["peakleft"].includes(area.terrain);
		let is_cliff_left = ["cliffleft"].includes(area.terrain);
		let is_cave_left = ["caveleft"].includes(area.terrain);
		
		let is_roof_left = ["roofleft"].includes(area.terrain);
		let is_roof_right = ["roofright"].includes(area.terrain);
		let is_roof = ["roof"].includes(area.terrain);
		let is_tower_left = ["towerleft"].includes(area.terrain);
		let is_tower_right = ["towerright"].includes(area.terrain);
		let is_tower = ["tower"].includes(area.terrain);
		let is_towerground_left = ["towergroundleft"].includes(area.terrain);
		let is_towerground_right = ["towergroundright"].includes(area.terrain);
		let is_towerground = ["towerground"].includes(area.terrain);
		
		let is_inside_tower = ["insidetowertop", "insidetower", "insidetowerground"].includes(area.terrain);
		
		//let is_r = ["peakright", "cliffright"].includes(area.terrain);
		//let is_7 = ["peakleft", "cliffleft"].includes(area.terrain);
		
		
		let toff = 0;
		switch (area.terrain) {
			case "towergroundleft":
				toff = 64 * 6;
				break;
			case "towergroundright":
				toff = 64 * 6;
				break;
			case "towerground":
				toff = 64 * 6;
				break;
			case "underground":
				toff = 64 * 2;
				break;
			case "insidetowerground":
				toff = 64 * 6;
				break;
		}
		
		console.log(area_index+" "+area.terrain);
		//let fill_terrain = is_underground ? "HH" : "" ;
		let chunks_map = [...Array(chy_max)].map(_ => Array(chx_max).fill(""));
		let chi = area["right_to_left"] ? chx_max-1 : 0; // starting chunk x position
		let chj = rnd(1, chy_max); // starting chunk y position (was chy_max-2)
		// left and right exit locations
		
		let lft_cx = 0;
		let lft_cy = chj;
		let rgt_cx = chx_max-1;
		let rgt_cy = chj;
		//let srt_edge_cy = chj;
		//let end_edge_cy = chj;
		
		//player starting locations (these will only change if area_index == 0)
		let psxc = -1; // player start x chunk
		let psyc = -1;
		
		let chunk_type = "__";
		let chunk_types = [];
		
		let HH = ["HH", "Hh", "hH", "hh"];
		
		
		
		// ------------ exit dictionary, only doors. exit chunk locations -----------
		let door_exits = Object.keys(area["exits"]).reduce(function (door_exits, key) {
		    if (area["exits"][key].type === 4) {
					door_exits[key] = area["exits"][key];
				}
		    return door_exits;
		}, {});
		
		
		
		
		
		// ------ x chunk positions for doors -- Why not create list of tuples from terrain trail?
		//let door_exit_locs = this.shuffleArray([...Array(chx_max-2).keys()].map(k => k+1)).splice(0, Object.keys(door_exits).length).sort();
		
		
		//console.log(door_exit_locs);
		// we need to map each x chunk location with one of the door exit objects, so that
		//    door info is accessed by x chunk position rather than by area_index.
		//    just need the y position when the x position is found
		
		/*
		let ddd = {};
		let dexlc = 0;
		for (let [k, door_info] of Object.entries(door_exits)) { // k is the area_index
			//let dk = door_exit_locs[dexlc]; // dk is the x location for that door in door_exit_locs
			door_info["cx"] = -1;
			door_info["cy"] = -1; //initialize 
			door_exits[k] = door_info;
			dexlc++;
			ddd[dk] = door_info; // set x position as key in ddd dictionary
			
		}*/
		//console.log(door_exits);
		
		let terrain_trail_for_doors = []; // if run out, create a new path in that area for the outlier door
		//console.log(ddd);
		
		
		// if caveright, caveleft, cliffright, cliffleft, peakright, peakleft, then either of these might be set
		let door_x_set = -1; // cave right
		let door_y_set = -1;
		//console.log("door exits based on x chunk:");
		//console.log(ddd);
		//console.log("door exits based on area index:");
		
		let exit_up_x = -1; let exit_up_y = 0;
		let exit_rt_y = -1; let exit_rt_x = chx_max-1;
		let exit_dn_x = -1; let exit_dn_y = chy_max-1;
		let exit_lf_y = -1; let exit_lf_x = 0;
		
		//let snake_up = [];
		
		let exits_ = Object.keys(area["exits"]).map(e => area["exits"][e].type); //
		
		
		
		const MAX_ZIGZAG = {"left": -4, "right": 4};
		
		
		// ------------------ bottom exit and path  ----------------
		let btm_cx = -1;
		let btm_cy = -1;
		// this is the location of the path entrance to the exit on the terrain surface [__]
		let down_cx = -1;
		let down_cy = -1;
		
		// ------------------ top exit and path ----------------
		let top_cx = -1;
		let top_cy = -1;
		// this is the start of the path upward to get to the top exit
		let up_cx = -1;
		let up_cy = -1;
		
		
		
		// ------------- START main chunkmap shape 
		// fill chunk map terrain across (above ground, not for caves) -----------
		// cliffs, peaks, and roofs should be covered here
		// doors are also placed here? else statements
		
		
		
		let change_vertical = 0;
		let last_chunk = "__";
		
			
		if (is_peak_right) { // ------- TERRAIN TYPE: peakright *** *** ***
			
			let chy_r = chy_max-1;
			let start_bot_x_max = chx_max - Math.floor(chx_max/4); // need at least some terrain on the right side
			let start_bot = rnd(1, start_bot_x_max);
			for (let cx=start_bot; cx<chx_max; cx++) {
				chunks_map[chy_r][cx] = chunk_type;
				for (let below=chy_r+1; below<chy_max; below++) {
					chunks_map[below][cx] = "HH";//HH[rnd(0, HH.length)];
				}
				if (chy_r > 1) {
					chunk_type = chunk_type === "__" ? "-<" : "__";
				} else {
					let chunk_types = CHUNKS["rules"][chunk_type]["R"];
					chunk_type = chunk_types[rnd(0, chunk_types.length)];
				}
				if (cx < chx_max-1) {
					if (start_bot < cx && chy_r > 1) {
						terrain_trail_for_doors.push([cx,chy_r]);
					}
					chy_r = chunk_type === "__"  && chy_r > 1 ? chy_r-1 : chy_r; // move up
				}
			}
			
			// right exit and bottom exit (change chunk here ?)
			if (exits_.includes(11)) {
				exit_rt_y = chy_r;
				switch (chunks_map[exit_rt_y][exit_rt_x]) {
					case "__":
						chunks_map[exit_rt_y][exit_rt_x] = "_>";
						break;
					case "-<":
						chunks_map[exit_rt_y][exit_rt_x] = "->";
						break;
					case ">-":
						chunks_map[exit_rt_y][exit_rt_x] = ">>";
						break;
				}
			}
			if (exits_.includes(12)) {
				exit_dn_x = start_bot;
				switch (chunks_map[exit_dn_y][exit_dn_x]) {
					case "__":
						chunks_map[exit_dn_y][exit_dn_x] = "v_";
						break;
					case "-<":
						chunks_map[exit_dn_y][exit_dn_x] = "v<";
						break;
					case ">-":
						chunks_map[exit_dn_y][exit_dn_x] = ">v";
						break;
				}
			}
			
			// left exit
			if (exits_.includes(10)) {
				let snake_left_i = rnd(0, terrain_trail_for_doors.length);
				let snake_left = terrain_trail_for_doors[snake_left_i]; // x and y
				//console.log(snake_left);
				terrain_trail_for_doors.splice(snake_left_i, 1); // remove from terrain trail
				
				terrain_trail_for_doors = terrain_trail_for_doors.filter((sxy) => { 
					//console.log(sxy[0]+" > "+snake_left[0]+" ?");
					//console.log(sxy[0] > snake_left[0]);
					return sxy[0] > snake_left[0];
				});
				
				// change start of snake to one of these   _^  ^_  >^  ^<
				switch (chunks_map[snake_left[1]][snake_left[0]]) {
					case "__":
						chunks_map[snake_left[1]][snake_left[0]] = "^_";
						break;
					case "-<":
						chunks_map[snake_left[1]][snake_left[0]] = "^<";
						break;
					case ">-":
						chunks_map[snake_left[1]][snake_left[0]] = ">^";
						break;
				}
				
				// go up first
				let scurrx = snake_left[0];
				let scurry = snake_left[1]-1;
				//console.log(snake_left);
				if (scurry > 1) {
					chunks_map[scurry][scurrx] = "^^";
					scurry-=1;
				}
				chunks_map[scurry][scurrx] = "-7";
				terrain_trail_for_doors.push([scurrx,scurry]);
				scurrx-=1;
				
				for (; scurrx>0; scurrx--) {
					chunks_map[scurry][scurrx] = "--";
					terrain_trail_for_doors.push([scurrx,scurry]);
					// TODO: instead of straight across to the left, zigzag up and down
				}
				chunks_map[scurry][scurrx] = "<-";
				//console.log(terrain_trail_for_doors);
			
			}
			
			// top exit
			if (exits_.includes(13)) {
				let snake_top_i = rnd(0, terrain_trail_for_doors.length);
				let snake_top = terrain_trail_for_doors[snake_top_i]; // x and y
				
				let scurrtx = snake_top[0];
				let scurrty = snake_top[1];
				for (; scurrty>=0; scurrty--) {
					chunks_map[scurrty][scurrtx] = "^^";
				}
			}
			//console.log(terrain_trail_for_doors);
			
			
			
		} else if (is_peak_left) { // ------- TERRAIN TYPE: peakleft *** *** ***
			
			let chy_7 = chy_max-1;
			let start_bot_x_min = 0 + Math.floor(chx_max/4); // need at least some terrain on the left side
			let start_bot = rnd(start_bot_x_min, chx_max-1);
			for (let cx=start_bot; cx>=0; cx--) { // even though left to right, filling in from right to left
				chunks_map[chy_7][cx] = chunk_type;
				for (let below=chy_7+1; below<chy_max; below++) {
					chunks_map[below][cx] = "HH";//HH[rnd(0, HH.length)];
				}
				if (chy_7 > 1) {
					chunk_type = chunk_type === "__" ? ">-" : "__";
				} else {
					let chunk_types = CHUNKS["rules"][chunk_type]["L"];
					chunk_type = chunk_types[rnd(0, chunk_types.length)];
				}
				
				if (cx > 0) {
					if (cx < start_bot && chy_7 > 1) {
						terrain_trail_for_doors.push([cx,chy_7]);
					}
					chy_7 = chunk_type === "__" && chy_7 > 1 ? chy_7-1 : chy_7; // ensure space to go left
				}
			}
			
			
			// left exit and bottom exit
			if (exits_.includes(10)) {
				exit_lf_y = chy_7;
				switch (chunks_map[exit_lf_y][exit_lf_x]) {
					case "__":
						chunks_map[exit_lf_y][exit_lf_x] = "<_";
						break;
					case "-<":
						chunks_map[exit_lf_y][exit_lf_x] = "<-";
						break;
					case ">-":
						chunks_map[exit_lf_y][exit_lf_x] = "<<";
						break;
				}
			}
			if (exits_.includes(12)) {
				exit_dn_x = start_bot;
				switch (chunks_map[exit_dn_y][exit_dn_x]) {
					case "__":
						chunks_map[exit_dn_y][exit_dn_x] = "_v";
						break;
					case "-<":
						chunks_map[exit_dn_y][exit_dn_x] = "v<";
						break;
					case ">-":
						chunks_map[exit_dn_y][exit_dn_x] = ">v";
						break;
				}
			}
			
			// right exit
			if (exits_.includes(11)) {
				let snake_right_i = rnd(0, terrain_trail_for_doors.length);
				let snake_right = terrain_trail_for_doors[snake_right_i]; // x and y
				
				terrain_trail_for_doors.splice(snake_right_i, 1); // remove from terrain trail
				
				terrain_trail_for_doors = terrain_trail_for_doors.filter((sxy) => { 
					//console.log(sxy[0]+" > "+snake_left[0]+" ?");
					//console.log(sxy[0] > snake_left[0]);
					return sxy[0] > snake_right[0];
				});
				
				// change start of snake to one of these   _^  ^_  >^  ^<
				switch (chunks_map[snake_right[1]][snake_right[0]]) {
					case "__":
						chunks_map[snake_right[1]][snake_right[0]] = "_^";
						break;
					case "-<":
						chunks_map[snake_right[1]][snake_right[0]] = "^<";
						break;
					case ">-":
						chunks_map[snake_right[1]][snake_right[0]] = ">^";
						break;
				}
				
				// go up first
				let scurrx = snake_right[0];
				let scurry = snake_right[1]-1;
				
				if (scurry > 1) {
					chunks_map[scurry][scurrx] = "^^";
					scurry-=1;
				}
				chunks_map[scurry][scurrx] = "r-";
				terrain_trail_for_doors.push([scurrx,scurry]);
				scurrx+=1;
				
				for (; scurrx<chx_max-1; scurrx++) {
					chunks_map[scurry][scurrx] = "--";
					terrain_trail_for_doors.push([scurrx,scurry]);
					// TODO: instead of straight across to the left, zigzag up and down
				}
				chunks_map[scurry][scurrx] = "->";
				console.log("scurrx "+scurrx+" scurry "+scurry);
				
				//console.log(terrain_trail_for_doors);
			
			}
			
			// top exit
			if (exits_.includes(13)) {
				let snake_top_i = rnd(0, terrain_trail_for_doors.length);
				let snake_top = terrain_trail_for_doors[snake_top_i]; // x and y
				
				let scurrtx = snake_top[0];
				let scurrty = snake_top[1];
				for (; scurrty>=0; scurrty--) {
					chunks_map[scurrty][scurrtx] = "^^";
				}
			}
			//console.log(terrain_trail_for_doors);
			
			
			
		} else if (is_cliff_right) { // ------- TERRAIN TYPE: cliffright *** *** ***
			
			let start_top_x = rnd(chx_max/2, chx_max-(chx_max/4)); // if min=2 max=3  then  possible indices: 2
			let cx = start_top_x;
			let cy = 0;
			let change_chunk = 0;
			for (; cy<chy_max; cy++) { // snake down toward left, without going past the bottom
				if (cy > 0) {
					let shift_left = rnd(0,2);
					if (shift_left) {
						//cx--;
						change_chunk = rnd(0,2);
					}
					if (cy < chy_max-1) {
						terrain_trail_for_doors.push([cx,cy]);
					}
				}
				chunks_map[cy][cx] = change_chunk ? "-<" : "_|";
				
				for (let rx=cx+1; rx<chx_max; rx++) { // fill to the right
					chunks_map[cy][rx] = "HH";
				}
				cx = change_chunk ? cx-1 : cx;
				change_chunk = 0; // reset
			}
			
			//console.log(terrain_trail_for_doors);
			
			// bottom exit and top exit
			if (exits_.includes(12)) {
				exit_dn_x = cx;
				switch (chunks_map[exit_dn_y][exit_dn_x]) {
					case "_|":
						chunks_map[exit_dn_y][exit_dn_x] = "v|";
						break;
					case "-<":
						chunks_map[exit_dn_y][exit_dn_x] = "v<";
						break;
				}
			}
				
			if (exits_.includes(13)) {
				exit_up_x = start_top_x;
				switch (chunks_map[exit_up_y][exit_up_x]) {
					case "_|":
						chunks_map[exit_up_y][exit_up_x] = "^|";
						break;
					case "-<":
						chunks_map[exit_up_y][exit_up_x] = "^|";
						break;
				}
			}
			
			// left exit
			if (exits_.includes(10)) {
				let snake_left_i = rnd(0, terrain_trail_for_doors.length);
				let snake_left = terrain_trail_for_doors[snake_left_i]; // x and y
				
				terrain_trail_for_doors.splice(snake_left_i, 1); // remove from terrain trail
				
				let scurrx = snake_left[0]-1;
				let scurry = snake_left[1];
				chunks_map[scurry][scurrx] = "-.";
				
				for (scurrx--; scurrx>0; scurrx--) {
					chunks_map[scurry][scurrx] = "--";
					terrain_trail_for_doors.push([scurrx,scurry]);
				}
				chunks_map[scurry][scurrx] = "<-";
				
			}
			
			// right exit
			if (exits_.includes(11)) {
				let snake_right_i = rnd(0, terrain_trail_for_doors.length);
				let snake_right = terrain_trail_for_doors[snake_right_i]; // x and y
				
				terrain_trail_for_doors.splice(snake_right_i, 1); // remove from terrain trail
				
				chunks_map[snake_right[1]][snake_right[0]] = "_!";
				
				let scurrx = snake_right[0]+1;
				let scurry = snake_right[1];
				chunks_map[scurry][scurrx] = "=="; // TODO: fix
				
				for (; scurrx<chx_max-1; scurrx++) {
					chunks_map[scurry][scurrx] = "==";
					terrain_trail_for_doors.push([scurrx,scurry]);
				}
				chunks_map[scurry][scurrx] = "=>";
				
			}
			
			
			
			
		} else if (is_cliff_left) { // ------- TERRAIN TYPE: cliffleft *** *** ***
			
			
			let start_top_x = rnd(chx_max/4, (chx_max/2)); // if min=1 max=2  then  possible indices: 1
			let cx = start_top_x;
			let cy = 0;
			let change_chunk = 0;
			for (; cy<chy_max; cy++) { // snake down toward right, without going past the bottom
				if (cy > 0) {
					let shift_right = rnd(0,2);
					if (shift_right) {
						//cx++;
						change_chunk = rnd(0,2);
					}
					if (cy < chy_max-1) {
						terrain_trail_for_doors.push([cx,cy]);
					}
				}
				chunks_map[cy][cx] = change_chunk ? ">-" : "|_";
				for (let rx=cx-1; rx>=0; rx--) { // fill to the left
					chunks_map[cy][rx] = "HH";
				}
				cx = change_chunk ? cx+1 : cx;
				change_chunk = 0; // reset
				
			}
			
			//console.log(terrain_trail_for_doors);
			
			// bottom exit and top exit
			if (exits_.includes(12)) {
				exit_dn_x = cx;
				switch (chunks_map[exit_dn_y][exit_dn_x]) {
					case "|_":
						chunks_map[exit_dn_y][exit_dn_x] = "|v";
						break;
					case ">-":
						chunks_map[exit_dn_y][exit_dn_x] = ">v";
						break;
				}
			}
				
			if (exits_.includes(13)) {
				exit_up_x = start_top_x;
				switch (chunks_map[exit_up_y][exit_up_x]) {
					case "|_":
						chunks_map[exit_up_y][exit_up_x] = "|^";
						break;
					case ">-":
						chunks_map[exit_up_y][exit_up_x] = "|^";
						break;
				}
			}
			
			
			// left exit
			if (exits_.includes(10)) {
				let snake_left_i = rnd(0, terrain_trail_for_doors.length);
				let snake_left = terrain_trail_for_doors[snake_left_i]; // x and y
				
				terrain_trail_for_doors.splice(snake_left_i, 1); // remove from terrain trail
				
				chunks_map[snake_left[1]][snake_left[0]] = "!_";
				let scurrx = snake_left[0]-1;
				let scurry = snake_left[1];
				chunks_map[scurry][scurrx] = "==";
				
				for (; scurrx>0; scurrx--) {
					chunks_map[scurry][scurrx] = "==";
					terrain_trail_for_doors.push([scurrx,scurry]);
				}
				chunks_map[scurry][scurrx] = "<=";
				
			}
			
			// right exit
			if (exits_.includes(11)) {
				let snake_right_i = rnd(0, terrain_trail_for_doors.length);
				let snake_right = terrain_trail_for_doors[snake_right_i]; // x and y
				
				terrain_trail_for_doors.splice(snake_right_i, 1); // remove from terrain trail
				
				let scurrx = snake_right[0]+1;
				let scurry = snake_right[1];
				chunks_map[scurry][scurrx] = ".-";
				
				for (scurrx++; scurrx<chx_max-1; scurrx++) {
					chunks_map[scurry][scurrx] = "--";
					terrain_trail_for_doors.push([scurrx,scurry]);
				}
				chunks_map[scurry][scurrx] = "->";
				
			}
			
			
			
			
			
			
		} else if (is_cave_right) { // ------- TERRAIN TYPE: caveright *** *** ***
			
			let start_top_x = rnd(chx_max/2, chx_max-(chx_max/4)); // if min=2 max=3  then  possible indices: 2
			let cx = start_top_x;
			let cy = 0;
			let change_chunk = 0;
			
			for (; cy<chy_max-1; cy++) { // snake down toward left, without going past the bottom
				if (cy > 0) {
					let shift_left = rnd(0,2);
					if (shift_left) {
						//cx--;
						change_chunk = rnd(0,2);
					}
					if (cx > 0 && cy > 0) {
						terrain_trail_for_doors.push([cx,cy]); // dont include top exit
					}
				}
				chunks_map[cy][cx] = change_chunk ? "-<" : "_|";
				for (let rx=cx+1; rx<chx_max; rx++) { // fill to the right
					chunks_map[cy][rx] = "HH";
				}
				cx = change_chunk ? cx-1 : cx;
				change_chunk = 0; // reset
			}
			
			// determine right exit here instead
			if (exits_.includes(11)) {
				let snake_right_i = rnd(0, terrain_trail_for_doors.length);
				let snake_right = terrain_trail_for_doors[snake_right_i]; // x and y
				terrain_trail_for_doors.splice(snake_right_i, 1); // remove from terrain trail
				
				// remove any above and below the right exit
				terrain_trail_for_doors = terrain_trail_for_doors.filter((xy) => xy[1] === chy_max-1);
				
				chunks_map[snake_right[1]][snake_right[0]] = "_!";
				
				let scurrx = snake_right[0]+1;
				let scurry = snake_right[1];
				chunks_map[scurry][scurrx] = "=="; // TODO: fix
				
				for (; scurrx<chx_max-1; scurrx++) {
					chunks_map[scurry][scurrx] = "==";
					terrain_trail_for_doors.push([scurrx,scurry]);
				}
				chunks_map[scurry][scurrx] = "=>";
				
			}
			
			// bottom row
			for (let rx=cx+1; rx<chx_max; rx++) { // fill to the right
				chunks_map[cy][rx] = "HH";
			}
			chunks_map[cy][cx] = "-<";
			
			for (cx-=1; cx>=0; cx--) { // fill to the left and fill downward
				chunk_types = CHUNKS["rules"][last_chunk]["L"];
				last_chunk = chunk_types[rnd(0, chunk_types.length)];
				chunks_map[cy][cx] = last_chunk;
				if (cx > 0) {
					terrain_trail_for_doors.push([cx,cy]);
				}
				for (let fill_down=cy+1; fill_down<chy_max; fill_down++) {
					chunks_map[cy][cx] = "HH";
				}
			}
			
			
			
			// left exit
			if (exits_.includes(10)) {
				//exit_lf_y = cy;
				exit_lf_y = cy;
				switch (chunks_map[exit_lf_y][exit_lf_x]) {
					case "__":
						chunks_map[exit_lf_y][exit_lf_x] = "<_";
						break;
					case "-<":
						chunks_map[exit_lf_y][exit_lf_x] = "<-";
						break;
					case ">-":
						chunks_map[exit_lf_y][exit_lf_x] = "<<";
						break;
				}
			}
			
			// top exit
			if (exits_.includes(13)) {
				exit_up_x = start_top_x;
				switch (chunks_map[exit_up_y][exit_up_x]) {
					case "_|":
						chunks_map[exit_up_y][exit_up_x] = "^|";
						break;
					case "-<":
						chunks_map[exit_up_y][exit_up_x] = "^|";
						break;
				}
			}
			
			// bottom exit
			if (exits_.includes(12)) {
				let snake_down_i = rnd(0, terrain_trail_for_doors.length);
				let snake_down = terrain_trail_for_doors[snake_down_i]; // x and y
			
				terrain_trail_for_doors.splice(snake_down_i, 1); // remove from terrain trail
				
				
				if (chunks_map[snake_down[1]][snake_down[0]] === "==") { // inside mountain
					chunks_map[snake_down[1]][snake_down[0]] = "TT";
					for (let scurry=snake_down[1]+1; scurry<chy_max; scurry++) {
						chunks_map[scurry][snake_down[0]] = "vv";
					}
				} else {
					switch (chunks_map[snake_down[1]][snake_down[0]]) { // outside mountain, on bottom row
						case "__":
							chunks_map[snake_down[1]][snake_down[0]] = "v_";
							break;
						case "-<":
							chunks_map[snake_down[1]][snake_down[0]] = "v<";
							break;
						case ">-":
							chunks_map[snake_down[1]][snake_down[0]] = ">v";
							break;
						case "_|":
							chunks_map[snake_down[1]][snake_down[0]] = "v|";
							break;
					}
				}
			}
			
			//console.log(terrain_trail_for_doors);
			
			
			
			
			
			
			
			
			
		} else if (is_cave_left) { // ------- TERRAIN TYPE: caveleft *** *** ***
			
			//console.log("...cl");
			let start_top_x = rnd(chx_max/4, (chx_max/2)); // if min=1 max=2  then  possible indices: 1
			let cx = start_top_x;
			let cy = 0;
			let change_chunk = 0;
			for (; cy<chy_max-1; cy++) { // snake down toward right, without going past the bottom
				if (cy > 0) {
					let shift_right = rnd(0,2);
					if (shift_right) {
						//cx++;
						change_chunk = rnd(0,2);
					}
					if (cx < chx_max-1 && cy > 0) {
						terrain_trail_for_doors.push([cx,cy]);
					}
				}
				chunks_map[cy][cx] = change_chunk ? ">-" : "|_";
				for (let rx=cx-1; rx>=0; rx--) { // fill to the left
					chunks_map[cy][rx] = "HH";
				}
				cx = change_chunk ? cx+1 : cx;
				change_chunk = 0; // reset
				
			}
			
			
			
			// determine left exit here instead
			if (exits_.includes(10)) {
				let snake_left_i = rnd(0, terrain_trail_for_doors.length);
				let snake_left = terrain_trail_for_doors[snake_left_i]; // x and y
				
				terrain_trail_for_doors.splice(snake_left_i, 1); // remove from terrain trail
				
				// remove any above and below the left exit
				terrain_trail_for_doors = terrain_trail_for_doors.filter((xy) => xy[1] === chy_max-1);
				
				chunks_map[snake_left[1]][snake_left[0]] = "!_";
				let scurrx = snake_left[0]-1;
				let scurry = snake_left[1];
				chunks_map[scurry][scurrx] = "==";
				
				for (; scurrx>0; scurrx--) {
					chunks_map[scurry][scurrx] = "==";
					terrain_trail_for_doors.push([scurrx,scurry]);
				}
				chunks_map[scurry][scurrx] = "<=";
				
			}
			
			for (let rx=cx-1; rx>=0; rx--) { // fill to the left
				chunks_map[cy][rx] = "HH";
			}
			chunks_map[cy][cx] = ">-";
			for (cx+=1; cx<chx_max; cx++) { // fill to the right and fill downward
				chunk_types = CHUNKS["rules"][last_chunk]["R"];
				last_chunk = chunk_types[rnd(0, chunk_types.length)];
				chunks_map[cy][cx] = last_chunk;
				if (cx < chx_max-1) {
					terrain_trail_for_doors.push([cx,cy]);
				}
				for (let fill_down=cy+1; fill_down<chy_max; fill_down++) {
					chunks_map[cy][cx] = "HH";
				}
			}
			
			
			// right exit
			if (exits_.includes(11)) {
				exit_rt_y = cy;
				switch (chunks_map[exit_rt_y][exit_rt_x]) {
					case "__":
						chunks_map[exit_rt_y][exit_rt_x] = "_>";
						break;
					case "-<":
						chunks_map[exit_rt_y][exit_rt_x] = "->";
						break;
					case ">-":
						chunks_map[exit_rt_y][exit_rt_x] = ">>";
						break;
				}
			}
			
			// top exit
			if (exits_.includes(13)) {
				exit_up_x = start_top_x;
				switch (chunks_map[exit_up_y][exit_up_x]) {
					case "_|":
						chunks_map[exit_up_y][exit_up_x] = "^|";
						break;
					case "-<":
						chunks_map[exit_up_y][exit_up_x] = "^|";
						break;
				}
			}
			
			
			// bottom exit
			if (exits_.includes(12)) {
				let snake_down_i = rnd(0, terrain_trail_for_doors.length);
				let snake_down = terrain_trail_for_doors[snake_down_i]; // x and y
			
				terrain_trail_for_doors.splice(snake_down_i, 1); // remove from terrain trail
				
				
				if (chunks_map[snake_down[1]][snake_down[0]] === "==") { // inside mountain
					chunks_map[snake_down[1]][snake_down[0]] = "TT";
					for (let scurry=snake_down[1]+1; scurry<chy_max; scurry++) {
						chunks_map[scurry][snake_down[0]] = "vv";
					}
				} else {
					switch (chunks_map[snake_down[1]][snake_down[0]]) { // outside mountain, on bottom row
						case "__":
							chunks_map[snake_down[1]][snake_down[0]] = "_v";
							break;
						case "-<":
							chunks_map[snake_down[1]][snake_down[0]] = "v<";
							break;
						case ">-":
							chunks_map[snake_down[1]][snake_down[0]] = ">v";
							break;
						case "_|":
							chunks_map[snake_down[1]][snake_down[0]] = "|v";
							break;
					}
				}
			}
		} 



	
/*
		
Outside tower
		
		           ^^                        ^^               ^^
               ^^		                     ^^               ^^
               ^^                        ^^               ^^          
<- -- -. rc _c c^ _c c>   <c _c _c .. _c c^ _c c>   <c _c c^ c7 .- -- -- -> 
         .C CC CC CC CC   CC CC CC vv CC CC CC CC   CC CC CC C. 
         vC CC CC CC CC   CC CC CC vv CC CC CC CC   CC CC CC Cv 

         ^C CC CC CC CC   CC CC ^^ CC CC CC CC CC   CC CC CC C^ 
         .C cc cc cc c>   CC CC ^^ CC CC CC CC CC   CC CC CC C. 
<- -- -. .C CC CC CC CC   CC CC ^^ CC CC CC CC CC   <c cc cc C. 
         .C CC CC CC CC   <c cc c^ cc cc .. cc c>   CC CC CC C. .- -- -- ->
         .C CC CC CC CC   CC CC CC CC CC vv CC CC   CC CC CC C. 
         vC CC CC CC CC   CC CC CC CC CC vv CC CC   CC CC CC Cv 

         ^C CC CC CC CC   CC CC CC c^ CC CC CC CC   CC CC CC C^ 
         .C CC CC CC CC   CC CC CC ^^ CC CC CC CC   CC CC CC C. 
         .C CC CC CC CC   CC CC CC ^^ CC CC CC CC   CC CC CC C. 
         .C CC CC CC CC   CC CC CC ^^ CC CC CC CC   CC CC CC C. 
<_ .. __ _C cc cc cc c>   <c cc cc c^ .. cc cc c>   <c cc .. C_ __ __ __ _>
HH vv HH HH HH HH HH HH   HH HH HH HH vv HH HH HH   HH HH vv HH HH HH HH HH
	
*/		
		
		else if (is_roof_left) {
			let c7x = rnd(2, chx_max-1);
			let c7y = rnd(1, chy_max-1);
			chunks_map[c7y][c7x] = "c7";
			for (let chj=c7y+1; chj<chy_max; chj++) {
				chunks_map[chj][c7x] = "C.";
			}
			for (let chi=c7x-1; chi>=0; chi--) {
				chunks_map[c7y][chi] = "_c";
				if (0 < chi && chi < chx_max-1) {
					terrain_trail_for_doors.push([chi, c7y]);
				}
				for (let chj=c7y+1; chj<chy_max; chj++) {
					chunks_map[chj][chi] = "CC";
				}
			}
			
			if (exits_.includes(10)) {
				chunks_map[c7y][0] = "<c";
			}
			
			if (exits_.includes(11)) {
				for (let chi=c7x+1; chi<chx_max-1; chi++) {
					chunks_map[c7y][chi] = "--";
				}
				chunks_map[c7y][chx_max-1] = "->";
			}
			
			// top exit
			if (exits_.includes(13)) {
				let snake_up_i = rnd(0, terrain_trail_for_doors.length);
				let snake_up = terrain_trail_for_doors[snake_up_i]; // x and y
				terrain_trail_for_doors.splice(snake_up_i, 1); // remove from terrain trail
				
				chunks_map[snake_up[1]][snake_up[0]] = "c^";
				for (let chjj=snake_up[1]-1; chjj>=0; chjj--) {
					chunks_map[chjj][snake_up[0]] = "^^";
				}
				
				exit_up_x = snake_up[0];
			}
			
			// bottom exit
			if (exits_.includes(12)) {
				chunks_map[chy_max-1][c7x] = "Cv";
				exit_dn_x = c7x;
			}
			
			// in case no places left for doors
			if (terrain_trail_for_doors.length < 1) {
				for (let ccj=0; ccj<chy_max; ccj++) {
					if (chunks_map[ccj][c7x] === "C.") {
						terrain_trail_for_doors.push([c7x, ccj]);
					}
				}
			}
			
			// background castle wall
			for (let csy=c7y*8+4; csy<bH; csy++) {
				for (let csx=0; csx<c7x*8+4; csx++) {
					dot_(terrain_img_behind, csx+1, csy+1);
				}
			}
			
			
			
		} else if (is_roof_right) {
			let rcx = rnd(1, chx_max-2);
			let rcy = rnd(1, chy_max-1);
			//console.log(rcx+"/"+chx_max+" "+rcy+"/"+chy_max);
			chunks_map[rcy][rcx] = "rc";
			for (let chj=rcy+1; chj<chy_max; chj++) {
				chunks_map[chj][rcx] = ".C";
			}
			for (let chi=rcx+1; chi<chx_max; chi++) {
				chunks_map[rcy][chi] = "_c";
				//console.log(chi+" "+rcy); //?
				if (0 < chi && chi < chx_max-1) {
					//console.log("push "+chi+" "+rcy); //?
					terrain_trail_for_doors.push([chi, rcy]);
					//console.log(terrain_trail_for_doors.length);
				}
				for (let chj=rcy+1; chj<chy_max; chj++) {
					chunks_map[chj][chi] = "CC";
				}
			}
			
			if (exits_.includes(11)) {
				chunks_map[rcy][chx_max-1] = "c>";
			}
			
			if (exits_.includes(10)) {
				for (let chi=rcx-1; chi>0; chi--) {
					chunks_map[rcy][chi] = "--";
				}
				chunks_map[rcy][0] = "<-";
			}
			
			//console.log(terrain_trail_for_doors.length);
			// top exit
			if (exits_.includes(13)) {
				let snake_up_i = rnd(0, terrain_trail_for_doors.length);
				
				let snake_up = terrain_trail_for_doors[snake_up_i]; // x and y
				terrain_trail_for_doors.splice(snake_up_i, 1); // remove from terrain trail
				
				chunks_map[snake_up[1]][snake_up[0]] = "c^";
				for (let chjj=snake_up[1]-1; chjj>=0; chjj--) {
					chunks_map[chjj][snake_up[0]] = "^^";
				}
				
				exit_up_x = snake_up[0];
			}
			
			// bottom exit
			if (exits_.includes(12)) {
				chunks_map[chy_max-1][rcx] = "vC";
				exit_dn_x = rcx;
			}
			
			// in case no places left for doors
			if (terrain_trail_for_doors.length < 1) {
				for (let ccj=0; ccj<chy_max; ccj++) {
					if (chunks_map[ccj][rcx] === ".C") {
						terrain_trail_for_doors.push([rcx, ccj]);
					}
				}
			}
			
			// background castle wall
			for (let csy=rcy*8+4; csy<bH; csy++) {
				for (let csx=rcx*8+4; csx<bW; csx++) {
					dot_(terrain_img_behind, csx+1, csy+1);
				}
			}
			
		} else if (is_roof) {
			let topy = rnd(1, chy_max-1);
			for (let chi=0; chi<chx_max; chi++) {
				chunks_map[topy][chi] = "_c";
				if (0 < chi && chi < chx_max-1) {
					terrain_trail_for_doors.push([chi, topy]);
				}
				for (let chj=topy+1; chj<chy_max; chj++) {
					chunks_map[chj][chi] = "CC";
				}
			}
			
			if (exits_.includes(10)) {
				chunks_map[topy][0] = "<c";
			}
			if (exits_.includes(11)) {
				chunks_map[topy][chx_max-1] = "c>";
			}
			
			// top exit
			if (exits_.includes(13)) {
				let snake_up_i = rnd(0, terrain_trail_for_doors.length);
				let snake_up = terrain_trail_for_doors[snake_up_i]; // x and y
				terrain_trail_for_doors.splice(snake_up_i, 1); // remove from terrain trail
				
				chunks_map[snake_up[1]][snake_up[0]] = "c^";
				for (let chjj=snake_up[1]-1; chjj>=0; chjj--) {
					chunks_map[chjj][snake_up[0]] = "^^";
				}
				
				exit_up_x = snake_up[0];
			}
			
			// bottom exit
			if (exits_.includes(12)) {
				let snake_down_i = rnd(0, terrain_trail_for_doors.length);
				let snake_down = terrain_trail_for_doors[snake_down_i]; // x and y
				terrain_trail_for_doors.splice(snake_down_i, 1); // remove from terrain trail
				
				chunks_map[snake_down[1]][snake_down[0]] = "..";
				//chunks_map[snake_down[1]+1][snake_down[0]] = "vv";
				for (let chjj=snake_down[1]+1; chjj<chy_max; chjj++) {
					chunks_map[chjj][snake_down[0]] = "vv";
				}
				
				exit_dn_x = snake_down[0];
			}
			
			// background castle wall
			for (let csy=topy*8+4; csy<bH; csy++) {
				for (let csx=0; csx<bW; csx++) {
					dot_(terrain_img_behind, csx+1, csy+1);
				}
			}
			
			
		} else if (is_tower_left) {
			
			let entryx = rnd(1, chx_max-1);
			for (let chi=0; chi<entryx; chi++) {
				for (let chj=0; chj<chy_max; chj++) {
					chunks_map[chj][chi] = "CC";
				}
			}
			for (let chj=0; chj<chy_max; chj++) {
				chunks_map[chj][entryx] = "C.";
			}
			
			if (exits_.includes(13)) {
				chunks_map[0][entryx] = "C^";
				exit_up_x = entryx;
			}
			
			if (exits_.includes(12)) {
				chunks_map[chy_max-1][entryx] = "Cv";
				exit_dn_x = entryx;
			}
			
			if (exits_.includes(10)) {
				let go_left = rnd(1, chy_max-1);
				for (let chi=entryx-1; chi>0; chi--) {
					chunks_map[go_left][chi] = "cc";
					if (0 < chi && chi < chx_max-1) {
						terrain_trail_for_doors.push([chi, go_left]);
					}
				}
				chunks_map[go_left][0] = "<c";
			}
			
			if (exits_.includes(11)) {
				let go_right = rnd(1, chy_max-1);
				for (let chi=entryx+1; chi<chx_max-1; chi++) {
					chunks_map[go_right][chi] = "--";
				}
				chunks_map[go_right][chx_max-1] = "->";
			}
			
			if (terrain_trail_for_doors.length < 3) {
				for (let chj=1; chj<chy_max-1; chj++) {
					terrain_trail_for_doors.push([entryx, chj]);
				}
			}
			
			// background castle wall
			for (let csy=0; csy<bH; csy++) {
				for (let csx=0; csx<entryx*8+4; csx++) {
					dot_(terrain_img_behind, csx+1, csy+1);
				}
			}
			
		} else if (is_tower_right) {
			
			let entryx = rnd(1, chx_max-1);
			for (let chj=0; chj<chy_max; chj++) {
				chunks_map[chj][entryx] = ".C";
			}
			
			for (let chi=entryx+1; chi<chx_max; chi++) {
				for (let chj=0; chj<chy_max; chj++) {
					chunks_map[chj][chi] = "CC";
				}
			}
			
			if (exits_.includes(13)) {
				chunks_map[0][entryx] = "^C";
				exit_up_x = entryx;
			}
			
			if (exits_.includes(12)) {
				chunks_map[chy_max-1][entryx] = "vC";
				exit_dn_x = entryx;
				console.log("down exit tower right");
			}
			
			if (exits_.includes(10)) {
				let go_left = rnd(1, chy_max-1);
				for (let chi=entryx-1; chi>0; chi--) {
					chunks_map[go_left][chi] = "--";
				}
				chunks_map[go_left][0] = "<-";
			}
			
			if (exits_.includes(11)) {
				let go_right = rnd(1, chy_max-1);
				for (let chi=entryx+1; chi<chx_max-1; chi++) {
					chunks_map[go_right][chi] = "cc";
				}
				chunks_map[go_right][chx_max-1] = "c>";
			}
			
			if (terrain_trail_for_doors.length < 3) {
				for (let chj=1; chj<chy_max-1; chj++) {
					terrain_trail_for_doors.push([entryx, chj]);
				}
			}
			
			// background castle wall
			for (let csy=0; csy<bH; csy++) {
				for (let csx=entryx*8+4; csx<bW; csx++) {
					dot_(terrain_img_behind, csx+1, csy+1);
				}
			}
			
		} else if (is_tower) {
			
			for (let chi=0; chi<chx_max; chi++) {
				for (let chj=0; chj<chy_max; chj++) {
					chunks_map[chj][chi] = "CC";
				}
			}
			
			// place tower ledge across anyway, will need even if only one exit
			// can have multiple entries into the tower
			let entryy = rnd(1, chy_max-1);
			for (let chi=0; chi<chx_max; chi++) {
				chunks_map[entryy][chi] = "cc";
				if (0 < chi && chi < chx_max-1) {
					terrain_trail_for_doors.push([chi,entryy]);
				}
			}
			
			
			if (exits_.includes(10)) {
				chunks_map[entryy][0] = "<c";
			}
			
			if (exits_.includes(11)) {
				chunks_map[entryy][chx_max-1] = "c>";
			}
			
			// top exit
			if (exits_.includes(13)) {
				let snake_up_i = rnd(0, terrain_trail_for_doors.length);
				let snake_up = terrain_trail_for_doors[snake_up_i]; // x and y
				terrain_trail_for_doors.splice(snake_up_i, 1); // remove from terrain trail
				
				chunks_map[snake_up[1]][snake_up[0]] = "c^";
				for (let chjj=snake_up[1]-1; chjj>=0; chjj--) {
					chunks_map[chjj][snake_up[0]] = "^^";
				}
				
				exit_up_x = snake_up[0];
			}
			
			// bottom exit
			if (exits_.includes(12)) {
				let snake_down_i = rnd(0, terrain_trail_for_doors.length);
				let snake_down = terrain_trail_for_doors[snake_down_i]; // x and y
				terrain_trail_for_doors.splice(snake_down_i, 1); // remove from terrain trail
				
				chunks_map[snake_down[1]][snake_down[0]] = "..";
				chunks_map[snake_down[1]+1][snake_down[0]] = "vv";
				
				exit_dn_x = snake_down[0];
			}
			
			// background castle wall
			for (let csy=0; csy<bH; csy++) {
				for (let csx=0; csx<bW; csx++) {
					dot_(terrain_img_behind, csx+1, csy+1);
				}
			}
			
		} else if (is_towerground_left) {
			// literally just sweeping across the chunk map and filling it in
			// doors can be scattered across the wall, by changing some of the "CC" chunks to "Cc" or "cC"
			let entryx = rnd(1, chx_max-1);
			for (let chi=0; chi<entryx; chi++) {
				for (let chj=0; chj<chy_max-2; chj++) {
					chunks_map[chj][chi] = "CC";
				}
				chunks_map[chy_max-2][chi] = "cc";
				if (0 < chi && chi < chx_max-1) {
					terrain_trail_for_doors.push([chi, chy_max-2]);
				}
				chunks_map[chy_max-1][chi] = "HH";
			}
			
			for (let chj=0; chj<chy_max-2; chj++) {
				chunks_map[chj][entryx] = "C.";
			}
			chunks_map[chy_max-2][entryx] = "C_";
			chunks_map[chy_max-1][entryx] = "HH";
			
			for (let chi=entryx+1; chi<chx_max; chi++) {
				chunks_map[chy_max-2][chi] = "__";
				if (0 < chi && chi < chx_max-1) {
					terrain_trail_for_doors.push([chi, chy_max-2]);
				}
				chunks_map[chy_max-1][chi] = "HH";
			}
			
			// background castle wall
			for (let csy=0; csy<bH; csy++) {
				for (let csx=0; csx<entryx*8+4; csx++) {
					dot_(terrain_img_behind, csx+1, csy+1);
				}
			}
			
			// top exit
			if (exits_.includes(13)) {
				
				/*
				let snake_up_i = rnd(0, terrain_trail_for_doors.length);
				let snake_up = terrain_trail_for_doors[snake_up_i]; // x and y
				terrain_trail_for_doors.splice(snake_up_i, 1); // remove from terrain trail
				
				switch (chunks_map[snake_up[1]][snake_up[0]]) {
					case "__":
						chunks_map[snake_up[1]][snake_up[0]] = "^_";
						break;
					case "cc":
						chunks_map[snake_up[1]][snake_up[0]] = "c^";
						break;
				}
				for (let chjj=snake_up[1]-1; chjj>=0; chjj--) {
					chunks_map[chjj][snake_up[0]] = "^^";
				}
				*/
				chunks_map[0][entryx] = "C^";
				exit_up_x = entryx;//snake_up[0];
			}
			
			// bottom exit
			if (exits_.includes(12)) {
				let snake_down_i = rnd(0, terrain_trail_for_doors.length);
				let snake_down = terrain_trail_for_doors[snake_down_i]; // x and y
				terrain_trail_for_doors.splice(snake_down_i, 1); // remove from terrain trail
				
				switch (chunks_map[snake_down[1]][snake_down[0]]) {
					case "__":
						chunks_map[snake_down[1]][snake_down[0]] = "v_";
						break;
					case "cc":
						chunks_map[snake_down[1]][snake_down[0]] = "cv";
						break;
				}
				chunks_map[snake_down[1]+1][snake_down[0]] = "vv";
				
				exit_dn_x = snake_down[0];
			}
			
			
			
			
		} else if (is_towerground_right) {
			// literally just sweeping across the chunk map and filling it in
			// doors can be scattered across the wall, by changing some of the "CC" chunks to "Cc" or "cC"
			let entryx = rnd(1, chx_max-1);
			for (let chi=0; chi<entryx; chi++) {
				chunks_map[chy_max-2][chi] = "__";
				if (0 < chi && chi < chx_max-1) {
					terrain_trail_for_doors.push([chi, chy_max-2]);
				}
				chunks_map[chy_max-1][chi] = "HH";
			}
			for (let chj=0; chj<chy_max-1; chj++) {
				chunks_map[chj][entryx] = ".C";
				// dot_(terrain_img_behind, new_x+1, new_y+1); // <---- 
			}
			chunks_map[chy_max-2][entryx] = "_C"; // avoid putting down exit on this one
			chunks_map[chy_max-1][entryx] = "HH";
			for (let chi=entryx+1; chi<chx_max; chi++) {
				for (let chj=0; chj<chy_max-2; chj++) {
					chunks_map[chj][chi] = "CC";
				}
				chunks_map[chy_max-2][chi] = "cc";
				if (0 < chi && chi < chx_max-1) {
					terrain_trail_for_doors.push([chi, chy_max-2]);
				}
				chunks_map[chy_max-1][chi] = "HH";
			}
			
			// background castle wall
			for (let csy=0; csy<bH; csy++) {
				for (let csx=entryx*8+4; csx<bW; csx++) {
					dot_(terrain_img_behind, csx+1, csy+1);
				}
			}
			
			// top exit
			if (exits_.includes(13)) {
				/*
				let snake_up_i = rnd(0, terrain_trail_for_doors.length);
				let snake_up = terrain_trail_for_doors[snake_up_i]; // x and y
				terrain_trail_for_doors.splice(snake_up_i, 1); // remove from terrain trail
				
				switch (chunks_map[snake_up[1]][snake_up[0]]) {
					case "__":
						chunks_map[snake_up[1]][snake_up[0]] = "_^";
						break;
					case "cc":
						chunks_map[snake_up[1]][snake_up[0]] = "c^";
						break;
				}
				for (let chjj=snake_up[1]-1; chjj>=0; chjj--) {
					chunks_map[chjj][snake_up[0]] = "^^";
				}
				*/
				chunks_map[0][entryx] = "^C";
				exit_up_x = entryx;//snake_up[0];
			}
			
			// bottom exit
			if (exits_.includes(12)) {
				let snake_down_i = rnd(0, terrain_trail_for_doors.length);
				let snake_down = terrain_trail_for_doors[snake_down_i]; // x and y
				terrain_trail_for_doors.splice(snake_down_i, 1); // remove from terrain trail
				
				switch (chunks_map[snake_down[1]][snake_down[0]]) {
					case "__":
						chunks_map[snake_down[1]][snake_down[0]] = "_v";
						break;
					case "cc":
						chunks_map[snake_down[1]][snake_down[0]] = "..";
						break;
				}
				chunks_map[snake_down[1]+1][snake_down[0]] = "vv";
				
				exit_dn_x = snake_down[0];
			}
			
			
			
		} else if (is_towerground) {
			for (let chi=0; chi<chx_max; chi++) {
				for (let chj=0; chj<chy_max-2; chj++) {
					chunks_map[chj][chi] = "CC";
				}
				chunks_map[chy_max-2][chi] = "cc";
				if (0 < chi && chi < chx_max-1) {
					terrain_trail_for_doors.push([chi, chy_max-2]);
				}
				
				chunks_map[chy_max-1][chi] = "HH";
			}
			
			// background castle wall
			for (let csy=0; csy<bH; csy++) {
				for (let csx=0; csx<bW; csx++) {
					dot_(terrain_img_behind, csx+1, csy+1);
				}
			}
			
			
			// top exit
			if (exits_.includes(13)) {
				let snake_up_i = rnd(0, terrain_trail_for_doors.length);
				let snake_up = terrain_trail_for_doors[snake_up_i]; // x and y
				terrain_trail_for_doors.splice(snake_up_i, 1); // remove from terrain trail
				
				chunks_map[snake_up[1]][snake_up[0]] = "c^";
				for (let chjj=snake_up[1]-1; chjj>=0; chjj--) {
					chunks_map[chjj][snake_up[0]] = "^^";
				}
				
				exit_up_x = snake_up[0];
			}
			
			// bottom exit
			if (exits_.includes(12)) {
				let snake_down_i = rnd(0, terrain_trail_for_doors.length);
				let snake_down = terrain_trail_for_doors[snake_down_i]; // x and y
				terrain_trail_for_doors.splice(snake_down_i, 1); // remove from terrain trail
				
				chunks_map[snake_down[1]][snake_down[0]] = "..";
				chunks_map[snake_down[1]+1][snake_down[0]] = "vv";
				
				exit_dn_x = snake_down[0];
			}
		
/*
			
	inside tower has different chunk layout		
			
			
*/			
		
		
		}	else if (is_inside_tower) {
			
			
			
			for (let Dj=0; Dj<chy_max; Dj+=3) {
				let stairs = rnd(2, parseInt((chx_max-2)/2));
				for (let Di=0; Di<chx_max; Di+=2) {
					if (parseInt(Di/2) === stairs && Dj+3 < chy_max) {
						
						chunks_map[Dj][Di] = "D|";
						if (Dj+3 < chy_max) {
							chunks_map[Dj+3][Di] = "D|";
						}
					} else if (chunks_map[Dj][Di] !== "D|") {
						
						chunks_map[Dj][Di] = "D-";
					}
					
					// testing
					/*if (area_index === 0 && Di === 0) {
						psxc = chi;
						psyc = chj;
						chunk_type = "ss";
					}/**/
					
					terrain_trail_for_doors.push([Di, Dj+1]);
				}
			}
			
			if (exits_.includes(10)) {
				let left_exit = rnd(0, parseInt(chy_max/3));
				chunks_map[left_exit*3][0] = "D<";
			}
			
			if (exits_.includes(11)) {
				let right_exit = rnd(0, parseInt(chy_max/3));
				chunks_map[right_exit*3][chx_max-2] = "D>";
			}
			
			
			
			
			
			
		}
		
		
/*	
   regular ground
		
		
*/
		else if (area["right_to_left"]) {
			
			
			
			for (let chi=chx_max-1; chi>=0; chi--) {
				chunk_types = CHUNKS["rules"][chunk_type]["L"];
				chunk_type = chunk_types[rnd(0, chunk_types.length)];
				change_vertical = rnd(-1,2); // -1 0 1 
				if (
					change_vertical === -1 && 
					chj > 1 &&
					last_chunk === ">-"
				) {
					chj--; lft_cy--; //end_edge_cy--;
					chunk_type = "__";
				} else if (
					change_vertical === 1 && 
					chj < chy_max-1 &&
					last_chunk === "__"
				) {
					chj++; lft_cy++; //end_edge_cy++;
					chunk_type = "-<";
				}
				
				if (!no_floor) {
					// could do holes as well, do it 
					for (let below=chj+1; below<chy_max; below++) {
						chunks_map[below][chi] = "HH";// HH[rnd(0, HH.length)];
					}
				}
		
				if (area_index === 0 && chi === chx_max-1) {
					psxc = chi;
					psyc = chj;
					chunk_type = "ss";
				}
		
				// place door. get door info based off chunk x position
				/*if (door_exit_locs.includes(chi)){
					let dc = door_exit_locs[door_exit_locs.indexOf(chi)];
					ddd[dc]["cy"] = chj;
				}/**/
		
				chunks_map[chj][chi] = chunk_type;
				if (0 < chi && chi < chx_max-1) {
					terrain_trail_for_doors.push([chi,chj]);
				}
				last_chunk = chunk_type;
			}
			
			
			if (exits_.includes(12)) {
				let snake_down_i = rnd(0, terrain_trail_for_doors.length);
				let snake_down = terrain_trail_for_doors[snake_down_i]; // x and y
				
				terrain_trail_for_doors.splice(snake_down_i, 1); // remove from terrain trail
				
				switch (chunks_map[snake_down[1]][snake_down[0]]) {
					case "__":
						chunks_map[snake_down[1]][snake_down[0]] = "..";
						break;
					case "-<":
						chunks_map[snake_down[1]][snake_down[0]] = ".<";
						break;
					case ">-":
						chunks_map[snake_down[1]][snake_down[0]] = ">.";
						break;
				}
				let scurrx=snake_down[0]; // TODO: change via zigzag
				let scurry=snake_down[1]+1;
				for (; scurry<chy_max; scurry++) {
					chunks_map[scurry][snake_down[0]] = "vv";
				}
				exit_dn_x = scurrx;
				//btm_cy = scurry;
				//console.log("btm exit set");
			}
			
			if (exits_.includes(13)) {
				let snake_up_i = rnd(0, terrain_trail_for_doors.length);
				let snake_up = terrain_trail_for_doors[snake_up_i]; // x and y
		
				terrain_trail_for_doors.splice(snake_up_i, 1); // remove from terrain trail
				
				switch (chunks_map[snake_up[1]][snake_up[0]]) {
					case "__":
						chunks_map[snake_up[1]][snake_up[0]] = "^_";
						break;
					case "-<":
						chunks_map[snake_up[1]][snake_up[0]] = "^<";
						break;
					case ">-":
						chunks_map[snake_up[1]][snake_up[0]] = ">^";
						break;
				}
				let scurrx=snake_up[0]; // TODO: change via zigzag
				let scurry=snake_up[1]-1;
				for (; scurry>=0; scurry--) {
					chunks_map[scurry][snake_up[0]] = "^^";
				}
				exit_up_x = scurrx;
				//top_cy = scurry;
				//console.log("top exit set");
			}
			
		} else {
			
			for (let chi=0; chi<chx_max; chi++) {
				chunk_types = CHUNKS["rules"][chunk_type]["R"];
				chunk_type = chunk_types[rnd(0, chunk_types.length)];
				change_vertical = rnd(-1,2); //rnd(-1,2); // -1 rise, 0, 1     
				if (
					change_vertical === -1 && 
					chj > 1 &&
					last_chunk === "-<"
				) {
					chj--; rgt_cy--; //end_edge_cy--;
					chunk_type = "__";
				} else if (
					change_vertical === 1 && 
					chj < chy_max-1 &&
					last_chunk === "__"
				) {
					chj++; rgt_cy++; //end_edge_cy++;
					chunk_type = ">-";
				}
		
				if (!no_floor) { // this will have to change as more terrain types are structured
					for (let below=chj+1; below<chy_max; below++) {
						chunks_map[below][chi] = "HH";//HH[rnd(0, HH.length)];
					}
				}
				if (is_underground) {
					/*
					for (let below=chj-2; below>=0; below--) {
						chunks_map[below][chi] = HH[rnd(0, HH.length)];
					}*/
				}
		
				if (area_index === 0 && chi === 0) {
					psxc = chi;
					psyc = chj;
					chunk_type = "ss";
				}
		
				chunks_map[chj][chi] = chunk_type;
				if (0 < chi && chi < chx_max-1) {
					terrain_trail_for_doors.push([chi,chj]);
				}
				last_chunk = chunk_type;
			}
			
			
			if (exits_.includes(12)) {
				let snake_down_i = rnd(0, terrain_trail_for_doors.length);
				let snake_down = terrain_trail_for_doors[snake_down_i]; // x and y
		
				terrain_trail_for_doors.splice(snake_down_i, 1); // remove from terrain trail
				
				switch (chunks_map[snake_down[1]][snake_down[0]]) {
					case "__":
						chunks_map[snake_down[1]][snake_down[0]] = "..";
						break;
					case "-<":
						chunks_map[snake_down[1]][snake_down[0]] = ".<";
						break;
					case ">-":
						chunks_map[snake_down[1]][snake_down[0]] = ">.";
						break;
				}
				let scurrx=snake_down[0]; // TODO: change via zigzag
				let scurry=snake_down[1]+1;
				for (; scurry<chy_max; scurry++) {
					chunks_map[scurry][snake_down[0]] = "vv";
				}
				exit_dn_x = scurrx;
				//btm_cy = scurry;
				//console.log("btm exit set");
			}
			
			if (exits_.includes(13)) {
				let snake_up_i = rnd(0, terrain_trail_for_doors.length);
				let snake_up = terrain_trail_for_doors[snake_up_i]; // x and y
		
				terrain_trail_for_doors.splice(snake_up_i, 1); // remove from terrain trail
				
				switch (chunks_map[snake_up[1]][snake_up[0]]) {
					case "__":
						chunks_map[snake_up[1]][snake_up[0]] = "_^";
						break;
					case "-<":
						chunks_map[snake_up[1]][snake_up[0]] = "^<";
						break;
					case ">-":
						chunks_map[snake_up[1]][snake_up[0]] = ">^";
						break;
				}
				
				let scurrx=snake_up[0]; // TODO: change via zigzag
				let scurry=snake_up[1]-1;
				for (; scurry>=0; scurry--) {
					chunks_map[scurry][snake_up[0]] = "^^";
				}
				exit_up_x = scurrx;
				//top_cy = scurry;
				//console.log("top exit set");
			}
				
		}
		
		//console.log(door_exits);
		
		//console.log(terrain_trail_for_doors);
		let d_locs = [];
		
		
		// -------------- END main chunkmap shape
		
		//let shf_d = this.shuffleArray(terrain_trail_for_doors);
		
		for (let k of Object.keys(door_exits)) { // k is the area.
			let get_d_i = rnd(0, terrain_trail_for_doors.length);
			let get_d = terrain_trail_for_doors[get_d_i]; // x and y
			terrain_trail_for_doors.splice(get_d, 1); // remove from terrain trail
			
			door_exits[k]["cx"] = get_d[0]; 
			door_exits[k]["cy"] = get_d[1];
			
			d_locs.push(get_d);
			//console.log(door_exits[k]);
		}
		
		// check the chunk, then 
		
		//console.log(door_exits);
		//console.log(d_locs);
		//console.log("---------");
		
		//console.log(d_locs.map(xy => xy[0]));
		// terrain_trail_for_doors
		//console.log(terrain_trail_for_doors);
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		//if (area["right_to_left"]) {
		//	console.log(end_edge_cy+" "+srt_edge_cy);
		//} else {
		//	console.log(srt_edge_cy+" "+end_edge_cy);
		//}
		
		
		
		
		
		//console.log(ddd);
		
		
		// where to put them?
		
		
		// reset if exit not available
		if (!exits_.includes(10)) {
			lft_cx = -1;
			lft_cy = -1;
		}
		if (!exits_.includes(11)) {
			rgt_cx = -1;
			rgt_cy = -1;
		}
		
		
		
		
		// add to terrain_trail_for_doors after 
		
		
		
		/*
		if (exits_.includes(12) && !(is_cave_left || is_cave_right || is_cliff_left || is_cliff_right || is_peak_left || is_peak_right)) {
			//console.log("... "+area.terrain+ "   checking if bottom exit");
			btm_cx = rnd(1, chx_max-1);
			btm_cy = chy_max-1;
			
			
			if (["HH", "Hh", "hH", "hh"].includes(chunks_map[btm_cy][btm_cx])) {
				// if underground, snake upward until surface TODO: change to snake downward instead
				let curr_bx = btm_cx;
				let curr_by = btm_cy;
				let curr_chunk = chunks_map[curr_by][curr_bx];
				
				while (!["__", "-<", ">-"].includes(curr_chunk) && curr_by > 0) {
					let go_left = 0;
					let go_right = 0;
					//if (chunks_map[curr_by][curr_bx])
					while (["HH", "Hh", "hH", "hh"].includes(chunks_map[curr_by][curr_bx+go_left]) && curr_bx+go_left > 0 && go_left > MAX_ZIGZAG["left"]) { 
						go_left--; 
					}
					while (["HH", "Hh", "hH", "hh"].includes(chunks_map[curr_by][curr_bx+go_right]) && curr_bx+go_right < chx_max && go_right < MAX_ZIGZAG["right"]) { 
						go_right++; 
					}
					let go_x = rnd(go_left, go_right);
					if (go_x < 0) {
						chunks_map[curr_by][curr_bx] = "=7";
						for (let xx=-1; go_x<xx; xx--) { chunks_map[curr_by][curr_bx+xx] = "=="; }
						if (["__", "-<", ">-"].includes(chunks_map[curr_by][curr_bx+go_x])) {
							chunks_map[curr_by][curr_bx+go_x] = "L=";
							curr_bx += go_x;
							//curr_by--;
							break;
						} else {
							chunks_map[curr_by][curr_bx+go_x] = "L=";
						}
					} else if (0 < go_x) {
						chunks_map[curr_by][curr_bx] = "r=";
						for (let xx=1; xx<go_x; xx++) { chunks_map[curr_by][curr_bx+xx] = "=="; }
						if (["__", "-<", ">-"].includes(chunks_map[curr_by][curr_bx+go_x])) {
							chunks_map[curr_by][curr_bx+go_x] = "=J";
							curr_bx += go_x;
							//curr_by--;
							break;
						} else {
							chunks_map[curr_by][curr_bx+go_x] = "=J";
						}
					} else {
						//console.log("put vv "+curr_by+" "+curr_bx);
						chunks_map[curr_by][curr_bx] = "vv";
					}
					curr_bx += go_x;
					curr_by--;
					if (curr_by < 0) {
						console.log("curr_by < 0   "+curr_by+" "+curr_bx)
						//throw 0;
						break;
					}
					try {
						curr_chunk = chunks_map[curr_by][curr_bx];
					} catch(err) {
						console.log(curr_by+" "+curr_bx);
						throw err;
						break;
					}
					
				}
				
				down_cx = curr_bx;
				down_cy = curr_by;
				
			} else if (["__", "-<", ">-"].includes(chunks_map[btm_cy][btm_cx])) {
				// if exit is already on surface, then out_c and btm_c are the same
				down_cx = btm_cx;
				down_cy = btm_cy;
				console.log(" exit already on surface")
			} else if (no_floor) {
				
			}
			
		} /**/
		
		
		
		/*
		if (exits_.includes(13) && !(is_cave_left || is_cave_right || is_cliff_left || is_cliff_right || is_peak_left || is_peak_right)) {
			top_cx = rnd(1, chx_max-1);
			top_cy = 0;
			
			if (chunks_map[top_cy][top_cx] === "") {
				// if in the sky, snake downward until surface
				let curr_tx = top_cx;
				let curr_ty = top_cy;
				let curr_chunk = chunks_map[curr_ty][curr_tx];
				while (!["__", "-<", ">-"].includes(curr_chunk) && curr_ty < chy_max-1) {
					let go_left = 0;
					let go_right = 0;
					while (
						chunks_map[curr_ty][curr_tx+go_left] === "" && 
						chunks_map[curr_ty+1][curr_tx+go_left] === "" &&
						curr_tx+go_left > 1 && 
						go_left > MAX_ZIGZAG["left"]
					) { 
						go_left--; 
					}
					while (
						chunks_map[curr_ty][curr_tx+go_right] === "" && 
						chunks_map[curr_ty+1][curr_tx+go_right] === "" &&
						curr_tx+go_right < chx_max-1 && 
						go_right < MAX_ZIGZAG["right"]
					) { 
						go_right++; 
					}
					let go_x = rnd(go_left, go_right);
					if (go_x < 0) {
						chunks_map[curr_ty][curr_tx] = "-J";
						for (let xx=-1; go_x<xx; xx--) { chunks_map[curr_ty][curr_tx+xx] = "--"; }
						if (["__", "-<", ">-"].includes(chunks_map[curr_ty][curr_tx+go_x])) {
							chunks_map[curr_ty][curr_tx+go_x] = "r-";
							curr_tx += go_x;
							//curr_by--;
							break;
						} else {
							chunks_map[curr_ty][curr_tx+go_x] = "r-";
						}
					} else if (0 < go_x) {
						chunks_map[curr_ty][curr_tx] = "L-";
						for (let xx=1; xx<go_x; xx++) { chunks_map[curr_ty][curr_tx+xx] = "--"; }
						if (["__", "-<", ">-"].includes(chunks_map[curr_ty][curr_tx+go_x])) {
							chunks_map[curr_ty][curr_tx+go_x] = "-7";
							curr_tx += go_x;
							//curr_by--;
							break;
						} else {
							chunks_map[curr_ty][curr_tx+go_x] = "-7";
						}
					} else {
						chunks_map[curr_ty][curr_tx] = "^^";
					}
					curr_tx += go_x;
					curr_ty++;
					try {
						curr_chunk = chunks_map[curr_ty][curr_tx];
					} catch(err) {
						console.log(curr_ty+" "+curr_tx);
						break;
					}
				}
				
				up_cx = curr_tx;
				up_cy = curr_ty;
				
			} else if (["__", "-<", ">-"].includes(chunks_map[top_cy][top_cx])) {
				// if exit is already on terrain, then up_c and top_c are the same
				up_cx = top_cx;
				up_cy = top_cy;
				
			}
			
		} /**/
		
		
		
		// --- fill in ceiling if underground type
		// insidecavetop, insidecave, underground, insidetower, insidetowertop, insidetowerground, basement
		if (fill_in_ceiling) {
			for (let cx=0; cx<chx_max; cx++) {
				let top_exit_path = false;
				for (let cy=0; cy<chy_max-2; cy++) {
					if (["r-", "-7", "-J", "L-", "--", "vv"].includes(chunks_map[cy][cx])) {
						top_exit_path = true;
					}
					if (chunks_map[cy][cx] === "" && chunks_map[cy+1][cx] === "") {
						//if (chunks_map[cy+2][cx] === "") {
						if (top_exit_path) {
							let okay_fill_in_i_guess = rnd(0,3);
							if (okay_fill_in_i_guess === 0) {
								if (cy >= 1 && chunks_map[cy-1][cx] === "jj") {
									chunks_map[cy-1][cx] = "ii";
								}
								chunks_map[cy][cx] = "jj";
							}
						} else {
							if (cy >= 1 && chunks_map[cy-1][cx] === "jj") {
								chunks_map[cy-1][cx] = "ii";
							}
							chunks_map[cy][cx] = "jj";
						}
					}
				}
			}
		}
		
		// change platforms if a sky or aboveground area
		if (no_floor) {
			for (let cy=0; cy<chy_max; cy++) {
				for (let cx=1; cx<chx_max-1; cx++) {
					switch (chunks_map[cy][cx]) {
						case "__":
							chunks_map[cy][cx] = "--";
						  break;
						case "-<":
							chunks_map[cy][cx] = "_-";
						  break;
						case ">-":
							chunks_map[cy][cx] = "-_";
						  break;
					}
				}
			}
		}
		
		
		
		// left and right edges
		//	before
		//    -<           >- 
		//    >-           -<
		//    __           __
		
		//	after
		//    <<           >> 
		//    <-           ->
		//    <_           _>
		
		// up and down
		//	before
		//    -<            
		//    >-           
		//    __           
		
		//	after
		//    ^<           
		//    >^           
		//    _^ 
		          
		
		// dead ends dont have the above terrain edge type
		//if (area_index === 7) {
			//console.log("lr_cy: "+lr_cy);
			//console.log("end chunk height: "+end_edge_cy);
			//}
		
		if (up_cx >= 0 && up_cy >= 0) {
			console.log("up!");
			let replace_chunk = chunks_map[up_cy][up_cx];
			
			switch (replace_chunk) {
				case "-<":
					chunks_map[up_cy][up_cx] = "^<";
					break;
				case ">-":
					chunks_map[up_cy][up_cx] = ">^";
					break;
				case "__":
					if (chunks_map[up_cy-1][up_cx] === "-7") {
						chunks_map[up_cy][up_cx] = "_^";
					} else if (chunks_map[up_cy-1][up_cx] === "r-") {
						chunks_map[up_cy][up_cx] = "^_";
					} else if (chunks_map[up_cy-1][up_cx] === "^^") {
						chunks_map[up_cy][up_cx] = "_^";
					}
					
					break;
			}
		}
		
		// replace edge terrain with exit types
		if (lft_cx >= 0 && lft_cy >= 0) {
			
			let replace_chunk = chunks_map[lft_cy][lft_cx];
			
			//console.log(replace_chunk+"     "+lft_cx+" "+lft_cy+"   "+rgt_cx+" "+rgt_cy);
			switch (replace_chunk) {
				case "-<":
					chunks_map[lft_cy][lft_cx] = "<<";
					break;
				case ">-":
					chunks_map[lft_cy][lft_cx] = "<-";
					break;
				case "__":
					chunks_map[lft_cy][lft_cx] = "<_";
					break;
			}
		}
		if (rgt_cx >= 0 && rgt_cy >= 0) {
			let replace_chunk = chunks_map[rgt_cy][rgt_cx];
			switch (replace_chunk) {
				case ">-":
					chunks_map[rgt_cy][rgt_cx] = ">>";
					break;
				case "-<":
					chunks_map[rgt_cy][rgt_cx] = "->";
					break;
				case "__":
					chunks_map[rgt_cy][rgt_cx] = "_>";
					break;
			}
		}
		
		// bandaid solution to fix missing edge exit chunks (may be more types, fix later)
		if (exits_.includes(10)) {
			//console.log("fixing left exit");
			for (let cy=0; cy<chy_max; cy++) {
				if (chunks_map[cy][0] === "-<") {
					chunks_map[cy][0] = "<<";
					break;
				} else if (chunks_map[cy][0] === ">-") {
					chunks_map[cy][0] = "<-";
					break;
				} else if (chunks_map[cy][0] === "__") {
					chunks_map[cy][0] = "<_";
					break;
				} else if (chunks_map[cy][0] === "cc") {
					chunks_map[cy][0] = "<c";
					break;
				}
			}
		}
		
		if (exits_.includes(11)) {
			//console.log("fixing right exit");
			for (let cy=0; cy<chy_max; cy++) {
				if (chunks_map[cy][chx_max-1] === ">-") {
					chunks_map[cy][chx_max-1] = ">>";
					break;
				} else if (chunks_map[cy][chx_max-1] === "-<") {
					chunks_map[cy][chx_max-1] = "->";
					break;
				} else if (chunks_map[cy][chx_max-1] === "__") {
					chunks_map[cy][chx_max-1] = "_>";
					break;
				} else if (chunks_map[cy][chx_max-1] === "cc") {
					chunks_map[cy][chx_max-1] = "c>";
					break;
				}
			}
		}
		
		
		
		// =================== dot and paint grid, as well as exits OUT ===============
		
		// CC  current chunk
		let CC_list = CHUNKS[chunk_type];
		let CC_i = 0; //rnd(0, CC_list.length); // current chunk index for list (should be random)
		let CC = CC_list[CC_i];
		
		var num_ps = 0;
		
		let chunk_size_y = is_inside_tower ? 24 : 8;
		let chunk_size_x = is_inside_tower ? 16 : 8;
		//console.log(chy_max); // 9
		
		for (let jj=0; jj<chy_max; jj = is_inside_tower ? jj+3 : jj+1 ) {
			//console.log("jj "+jj);
			for (let ii=0; ii<chx_max; ii = is_inside_tower ? ii+2 : ii+1) {
				
				chunk_type = chunks_map[jj][ii]; // get number from overall map
				if (chunk_type === "") {
					continue;
				}
				
				
				
				
				CC_list = CHUNKS[chunk_type];
				CC_i = rnd(0, CC_list.length);
				CC = CC_list[CC_i];
				
				if ( tupleExists(d_locs, [ii,jj]) ) {
				//	// TODO
				//	console.log(d_locs);
				//	console.log(door_exits);
				}
				
				
				
				for (let j=0; j<chunk_size_y; j++) {
					//console.log("chsy"+chunk_size_y+"*jj"+jj+" + "+j);
					for (let i=0; i<chunk_size_x; i++) {
						
						let new_x = (8*ii)+i;
						let new_y = (8*jj)+j;
						
						
						
						
						// TODO: all this needs to be organized
						if (CC[j][i] === 9) {
							num_ps++;
							let pmovetype = rnd(0,5);
							this.create_platform(area_index, new_x*8, new_y*8, pmovetype);
						} 
						if (CC[j][i] === 90) { // move left then right
							num_ps++;
							this.create_platform(area_index, new_x*8, new_y*8, 0);
						}
						if (CC[j][i] === 91) { // move right then left
							num_ps++;
							this.create_platform(area_index, new_x*8, new_y*8, 1);
						}
						if (CC[j][i] === 92) { // move down then up
							num_ps++;
							this.create_platform(area_index, new_x*8, new_y*8, 2);
						}
						if (CC[j][i] === 93) { // move up then down
							num_ps++;
							this.create_platform(area_index, new_x*8, new_y*8, 3);
						}
						if (CC[j][i] === 94) {
							num_ps++;
							this.create_platform(area_index, new_x*8, new_y*8, 4);
						}
						
						
						
						
						if (CC[j][i] === 1) {
							try {
								terrain_grid[ new_y ][ new_x ] = 1;
							} catch (err) {
								//console.log(new_y+" "+new_x); // 78 0
								//console.log(terrain_grid.length+" "+terrain_grid[0].length); // 72 73
								
								throw "pokemon";
							}
							
							dot_(terrain_img, new_x+1, new_y+1); //image is offset by one
						}
						
						if (CC[j][i] === 2) {
							terrain_grid[ new_y ][ new_x ] = 2;
							area["image"].set( new_x, new_y, T["climb"]+toff);
							
						}
						
						if (CC[j][i] === 40) { // ----- <-- door
							if (tupleExists(d_locs, [ii,jj])) {
								let ch_ = findElementByValues(door_exits, "cx", ii, "cy", jj);
								if (ch_) {
									this.areas[area_index]["exits"][ch_["goto"]]["gx"] = new_x;
									this.areas[area_index]["exits"][ch_["goto"]]["gy"] = new_y;
								
									this.areas[area_index]["exits"][ch_["goto"]]["goto"] = ch_["goto"];
								
									area["event_grid"][new_y][new_x] = 4;
								
									//make sure other side goes back to this exact spot
									this.areas[ch_["goto"]]["exits"][area_index]["gotox"] = new_x;
									this.areas[ch_["goto"]]["exits"][area_index]["gotoy"] = new_y;
									this.areas[ch_["goto"]]["exits"][area_index]["goto"] = area_index;
								}
								
							} else {
								terrain_grid[ new_y ][ new_x ] = 1;
								dot_(terrain_img, new_x+1, new_y+1);
							}
							/*let found_door_xy = d_locs.filter(xy => xy[0] === ii && xy[1] === jj);
							if (found_door_xy.length) {
								console.log(found_door_xy);
								console.log(door_exits);
							}/**/
							//if (door_exit_locs.includes(ii) && jj === ddd[ii]["cy"] ) {
								// 
								//} else {
								//terrain_grid[ new_y ][ new_x ] = 1;
								//dot_(terrain_img, new_x+1, new_y+1);
								//}
						}
						
						if (CC[j][i] === 10) {
							//console.log("10: "+ii+"="+down_cx+" "+jj+"="+down_cy);
							if ((jj === down_cy && ii === down_cx) || (jj === btm_cy && ii === btm_cx)) {
								//console.log("10 found on chunk "+ii+" "+jj);
								//terrain_grid[ new_y ][ new_x ] = 2;
								//
							} else {
								terrain_grid[ new_y ][ new_x ] = 1;
								dot_(terrain_img, new_x+1, new_y+1);
							}
						}
						
						if (CC[j][i] === 21) {
							
							if (jj === down_cy && ii === down_cx) { // climb down
								terrain_grid[ new_y ][ new_x ] = 2;
								area["image"].set( new_x, new_y, T["climb"]+toff);
							} else {
								terrain_grid[ new_y ][ new_x ] = 1;
								//area["image"].set( new_x, new_y, 1);
								dot_(terrain_img, new_x+1, new_y+1);
							}
						}
						
						if (CC[j][i] === 41) { // ------ <- door
							if (tupleExists(d_locs, [ii,jj])) {
								let ch_ = findElementByValues(door_exits, "cx", ii, "cy", jj);
								if (ch_) {
									this.areas[area_index]["exits"][ch_["goto"]]["gx"] = new_x;
									this.areas[area_index]["exits"][ch_["goto"]]["gy"] = new_y;
								
									this.areas[area_index]["exits"][ch_["goto"]]["goto"] = ch_["goto"];
								
									area["event_grid"][new_y][new_x] = 4;
								
									//make sure other side goes back to this exact spot
									this.areas[ch_["goto"]]["exits"][area_index]["gotox"] = new_x;
									this.areas[ch_["goto"]]["exits"][area_index]["gotoy"] = new_y;
									this.areas[ch_["goto"]]["exits"][area_index]["goto"] = area_index;
								}
								
							}
							/*let found_door_xy = d_locs.filter(xy => xy[0] === ii && xy[1] === jj);
							if (found_door_xy.length) {
								console.log(found_door_xy);
								console.log(door_exits);/**/
								//if (door_exit_locs.includes(ii) && jj === ddd[ii]["cy"] ) {
								//	terrain_grid[ new_y ][ new_x ] = 1;
								//	dot_(terrain_img, new_x+1, new_y+1);
								//}
						}
						
						// fix door info
						if (CC[j][i] === 4 || CC[j][i] === 14) {
							if (tupleExists(d_locs, [ii,jj])) {
								let ch_ = findElementByValues(door_exits, "cx", ii, "cy", jj);
								if (ch_) {
									this.areas[area_index]["exits"][ch_["goto"]]["gx"] = new_x;
									this.areas[area_index]["exits"][ch_["goto"]]["gy"] = new_y;
								
									this.areas[area_index]["exits"][ch_["goto"]]["goto"] = ch_["goto"];
								
									area["event_grid"][new_y][new_x] = 4;
								
									//make sure other side goes back to this exact spot
									this.areas[ch_["goto"]]["exits"][area_index]["gotox"] = new_x;
									this.areas[ch_["goto"]]["exits"][area_index]["gotoy"] = new_y;
									this.areas[ch_["goto"]]["exits"][area_index]["goto"] = area_index;
								}
								
							}
						}
						
						if (jj === top_cy && ii === top_cx || (exit_up_x > -1 && exit_up_x === ii && exit_up_y === jj)) {
							
							if (CC[j][i] === 30) {
								//console.log("top: "+top_cx+" "+top_cy);
								area["event_grid"][new_y][new_x] = 13;
								area["event_grid"][new_y][new_x-1] = 13; // around arrow
								area["event_grid"][new_y][new_x+1] = 13; // around arrow
								area["image"].set( new_x, new_y, T["up_arrow"]);
							} else if (CC[j][i] === 33) {
								//console.log("hello");
								area["event_grid"][new_y][new_x] = 13;
								area["image"].set( new_x, new_y, T["climb"]);
								terrain_grid[ new_y ][ new_x ] = 2;
							}
						}
						
						
						
						// down chunk
						if (jj === down_cy && ii === down_cx) {
							if (CC[j][i] === 21) {
								terrain_grid[ new_y ][ new_x ] = 1;
								dot_(terrain_img, new_x+1, new_y+1);
							} else if (CC[j][i] === 12 || CC[j][i] === 122) {
								terrain_grid[ new_y ][ new_x ] = 2;
								area["image"].set( new_x, new_y, T["climb"]+toff);
							}
						}
						
						// bottom exit overrides the down chunk
						if (jj === btm_cy && ii === btm_cx || (exit_dn_x > -1 && exit_dn_x === ii && exit_dn_y === jj)) {
							
							if (CC[j][i] === 20) {
								//console.log("btm: "+btm_cx+" "+btm_cy);
								area["event_grid"][new_y][new_x] = 12;
								area["event_grid"][new_y][new_x-1] = 12; // around arrow
								area["event_grid"][new_y][new_x+1] = 12; // around arrow
								area["image"].set( new_x, new_y, T["dn_arrow"]);
							} else if (CC[j][i] === 21) {
								area["event_grid"][new_y][new_x] = 12;
								area["event_grid"][new_y][new_x-1] = 12; // around arrow
								area["event_grid"][new_y][new_x+1] = 12; // around arrow
								area["image"].set( new_x, new_y, T["dn_arrow"]);
							} else if (CC[j][i] === 12) {
								area["event_grid"][new_y][new_x] = 2;
								area["image"].set( new_x, new_y, T["climb"]+toff);
							} else if (CC[j][i] === 122) {
								area["event_grid"][new_y][new_x] = 12;
								area["image"].set( new_x, new_y, T["climb"]+toff);
							} else if (CC[j][i] === 22) {
								area["event_grid"][new_y][new_x] = 12;
								area["image"].set( new_x, new_y, T["climb"]+toff);
							}
						}
						
						// ------ slopes
						if (CC[j][i] === 51) {
							terrain_grid[new_y][new_x] = 51;
							area["image"].set( new_x, new_y, 497 /*T["stairs"]+toff/**/);
						}
						if (CC[j][i] === 15) {
							terrain_grid[new_y][new_x] = 15;
							area["image"].set( new_x, new_y, 497 /*T["stairs"]+toff/**/, true);
						}
						// -------------
						
						if (CC[j][i] === 32) {
							area["event_grid"][new_y][new_x] = 10;
							area["event_grid"][new_y-1][new_x] = 10; // around arrow
							area["event_grid"][new_y-2][new_x] = 10; // around arrow
							area["image"].set( new_x, new_y, T["lf_arrow"]);
							
							// TODO: match location on other side of exit
						}
						
						
						
						if (CC[j][i] === 23) {
							area["event_grid"][new_y][new_x] = 11;
							area["event_grid"][new_y-1][new_x] = 11; // around arrow
							area["event_grid"][new_y-2][new_x] = 11; // around arrow
							/*
							area["event_grid"][new_y-3][new_x] = 11; // around arrow
							area["event_grid"][new_y-4][new_x] = 11; // around arrow
							area["event_grid"][new_y-5][new_x] = 11; // around arrow
							*/
							area["image"].set( new_x, new_y, T["rt_arrow"]);
							
							// TODO: match location on other side of exit
						}
						
						// player start positions
						if (
							area_index === 0 && 
							jj === psyc &&
							ii === psxc &&
							CC[j][i] === -1
						) {
							p.x = new_x*8; 
							p.y = (new_y-1)*8;
							//console.log("found p1 start:"+p.x+" "+p.y);
						}
						
						if (
							area_index === 0 && 
							jj === psyc &&
							ii === psxc &&
							CC[j][i] === -2
						) {
							p2.x = new_x*8; 
							p2.y = (new_y-1)*8;
							//console.log("found p2 start"+p2.x+" "+p2.y);
						}
						
						
						
						
					}
				}
		  }
		}
		
		
		this.areas[area_index]["grid"] = terrain_grid;
		
		// 8 bright ground
		// 9 dirt
		// dark ground
		//console.log(door_exits);
		this.printChunks(area_index, chunks_map, down_cx, down_cy, up_cx, up_cy);
		
		this.areas[area_index]["cmap"] = chunks_map;
		
		
		
		
		
		
		
		// temporary
		/*
		if (is_underground) {
			// back image
			let rise_up = rnd(8, aH);
			for (let x=0; x<=aW; x++) {
				let change_ = rnd(0,3);
				if (change_ === 2) {
					rise_up = rnd(8, aH);
				}
			
				for (let y=aH; y>aH-rise_up-1; y--) {
					dot_(terrain_img_behind, x, y);
				}
			}
		} else {
			// back image
			let rise_up = rnd(8, aH);
			for (let x=0; x<=aW; x++) {
				let change_ = rnd(0,3);
				if (change_ === 2) {
					rise_up = rnd(8, aH);
				}
			
				for (let y=aH; y>aH-rise_up-1; y--) {
					dot_(terrain_img_behind, x, y);
				}
			}
			
			this.tillSoil(terrain_img_behind);
		
			// front image
			//let rise_up = rnd(8, aH);
			for (let x=0; x<=aW; x++) {
				let change_ = rnd(0,3);
				if (change_ === 2) {
					rise_up = rnd(3, aH);
				}
			
				for (let y=aH; y>aH-rise_up-1; y--) {
					dot_(terrain_img_front, x, y);
				}
			}
			
		}/**/
		
		//console.log(num_ps);
		//console.log("---------------");
		
		if (is_peak_right || is_peak_left || is_peak) {
			this.placeStructure(terrain_img_behind, area,   -1,   -1,      17,       "image_behind",       0);
			this.placeStructure(terrain_img, area,   -1,   -1,      16,       "image",       1);
		} else if (is_cliff_left || is_cliff_right || is_mountain) {
			this.placeStructure(terrain_img_behind, area,   -1,   -1,      19,       "image_behind",       0);
			this.placeStructure(terrain_img, area,   -1,   -1,      18,       "image",       1);
		} else if (is_cave_left || is_cave_right || is_cave) {
			this.placeStructure(terrain_img_behind, area,   -1,   -1,      21,       "image_behind",       0);
			this.placeStructure(terrain_img, area,   -1,   -1,      20,       "image",       1);
		}	else if (is_underground) {
			this.placeStructure(terrain_img_behind, area,   -1,   -1,      11,       "image_behind",       0);
			this.placeStructure(terrain_img, area,   -1,   -1,      10,       "image",       1);
		} else if (is_towerground_right || is_towerground_left || is_towerground) {
			this.placeStructure(terrain_img_behind, area,   -1,   -1,      T["dark_palace_tile"],       "image_behind",       0);
			this.placeStructure(terrain_img, area,   -1,   -1,      T["light_palace_tile"],       "image",       1);
		} else if (is_tower_right || is_tower_left || is_tower || is_roof_left || is_roof_right || is_roof ) {
			
			
			
			this.placeStructure(terrain_img_behind, area,   -1,   -1,      T["dark_palace_tile"],       "image_behind",       0);
			this.placeStructure(terrain_img, area,   -1,   -1,      T["light_palace_tile"],       "image",       1);
		} else if (is_inside_tower) {
			
			
			for (let x=0; x<=aW; x++) {
				for (let y=0; y<=aH; y++) {
					dot_(terrain_img_behind, x, y);
				}
			}
			
			this.placeStructure(terrain_img_behind, area,   -1,   -1,      15,       "image_behind",       0);
			this.placeStructure(terrain_img, area,   -1,   -1,      14,       "image",       1);
		} else if (is_sky) { 
			this.placeStructure(terrain_img_behind, area,   -1,   -1,      13,       "image_behind",       0);
			this.placeStructure(terrain_img, area,   -1,   -1,      23,       "image",       1);
			
		} else if (is_aboveground) {
			
			let keep_thickness = rnd(1, 5);
			for (let x=0; x<aW; x++) {
				let found_tree = 0;
				let keep_thickness = rnd(0,4);
				if (!keep_thickness) {
					keep_thickness = rnd(1,5);
				}
				
				for (let y=aH-1; y>0; y--) {
					//terrain_grid[ new_y ][ new_x ] = 1;
					if (terrain_grid[y][x]) {
						for (let fill_thickness=0; fill_thickness < keep_thickness; fill_thickness++) {
							dot_(terrain_img, x+1, y+fill_thickness);
						}
						
						if (x%3) {
							for (let tree_trunk=0; tree_trunk < aH; tree_trunk++) {
								dot_(terrain_img_behind, x+1, y+tree_trunk);
							}
						}
						y=0;
					}
				}
			}
			
			/*
			if (!found_tree) {
				if (terrain_grid[y][x]) { 
					found_tree = 1; 
				}
			} else {
				if (terrain_grid[y][x] === 0) { found_tree = 2; }
			}
			
			if (found_tree === 2) {
				for (let fill_thickness=0; fill_thickness < max_thickness; fill_thickness++) {
					dot_(terrain_img, x+1, y+fill_thickness);
				}
				//dot_(terrain_img_behind, x+1, y);
				
			}/**/
			
			this.placeStructure(terrain_img_behind, area,   -1,   -1,      T["tree_tile"],       "image_behind",       0);
			this.placeStructure(terrain_img, area,   -1,   -1,      T["tree_tile"],       "image",       1);
			
		} else {
			this.placeStructure(terrain_img_behind, area,   -1,   -1,      9,       "image_behind",       0);
			this.placeStructure(terrain_img, area,   -1,   -1,      T["tree_tile"],      "image",       1);
			
			//this.placeStructure(terrain_img_front, area,   -1,   -1,      10,       "image_front",       0);
		}/**/
		//console.log("-------------------------");
		
		this.tillSoil(terrain_img);
	}
	
	
	fixChunkExits(area_index) {
		
		let area = this.areas[area_index]; // this.areas[area_index]["exits"][e_i]["gotox"]
		
		for (const e_i in area["exits"]) { 
			let exit_ = area["exits"][e_i];
			//let type_ = exit_["type"];
			//let goto_ = exit_["goto"];
			
			let next_area = this.areas[exit_["goto"]];
			//let next_exits = next_area["exits"];
			let next_grid = next_area["event_grid"]; // not the regular grid
			
			
			if (exit_["type"] === 11) {
				for (let j=0; j<next_grid.length; j++) {
					if (next_grid[j][0] === 10) {
						this.areas[area_index]["exits"][e_i]["gotox"] = 0;
						this.areas[area_index]["exits"][e_i]["gotoy"] = j;
					}
				}
			} else if (exit_["type"] === 10) {
				let max_gridx = next_grid[0].length;
				for (let j=0; j<next_grid.length; j++) {
					if (next_grid[j][max_gridx-1] === 11) {
						this.areas[area_index]["exits"][e_i]["gotox"] = max_gridx-1;
						this.areas[area_index]["exits"][e_i]["gotoy"] = j;
					}
				}
			} else if (exit_["type"] === 13) {
				let max_gridy = next_grid.length;
				for (let i=0; i<next_grid[0].length; i++) {
					if (next_grid[max_gridy-1][i] === 12) {
						this.areas[area_index]["exits"][e_i]["gotox"] = i;
						this.areas[area_index]["exits"][e_i]["gotoy"] = max_gridy-1;
					}
				}
			} else if (exit_["type"] === 12) {
				for (let i=0; i<next_grid[0].length; i++) {
					if (next_grid[0][i] === 13) {
						this.areas[area_index]["exits"][e_i]["gotox"] = i;
						this.areas[area_index]["exits"][e_i]["gotoy"] = 0;
					}
				}
			}
			
			/*
				exit_ :
						{
						  "goto": 1,
						  "gx": 31,
						  "gy": 30,
						  "gotox": 0,
						  "gotoy": 62,
						  "type": 11,
						  "status": 0,
						  "open_images": [
						    234,
						    235,
						    218,
						    219,
						    202,
						    203
						  ],
						  "images": [
						    234,
						    235,
						    218,
						    219,
						    202,
						    203
						  ]
						}
			*/
			
			
		
		}
		
	}
	
	
	
	
	
	tillSoil(terrain_image) {
		/*
			16 17 18  19 20 21  22 23 24  25 26 27  28 29 30 31
		  32 33 34  35 36 37  38 39 40  41 42 43  44 45 46 47
		  48 49 50  51 52 53  54 55 56  57 58 59  60 61 62 63
		*/
		
		// fix terrain and add things to make more interesting
		// already dotted
		
		//let area = this.areas[area_index];
		let aH = terrain_image.length; //area["height"]+2; // area height
		let aW = terrain_image[0].length; //area["width"]+2; // area width
		for (let j=0; j<aH; j++) {
			for (let i=0; i<aW; i++) {
				let dig = rnd(-1, 2);
				// 17 32 34
				
				if (dig > -1) {
					
					if (terrain_image[j][i] === 32) {
						terrain_image[j][i] = 1+dig;
					} else if (terrain_image[j][i] === 17) {
						terrain_image[j][i] = 3+dig;
					} else if (terrain_image[j][i] === 34) {
						terrain_image[j][i] = 5+dig;
					} else if (terrain_image[j][i] === 62) {
						terrain_image[j][i] = 7+dig;
					} else if (terrain_image[j][i] === 63) {
						terrain_image[j][i] = 9+dig;
					} else if (terrain_image[j][i] === 39) {
						terrain_image[j][i] = 36;
					} else if (terrain_image[j][i] === 33) {
						terrain_image[j][i] = 13+dig;
					}
				}
				
			}
		}/**/
		
		//console.log("tilled the soil");
		//this.areas[area_index]["image"] = area_image;
	}
	
	// TODO
	create_platform(area_index, x, y, movetype, random_phase=true){
		let plat = {};
		for (let key in platforms[movetype]){
			plat[key] = platforms[movetype][key];
		}
	
		let rnd_pl_im = 0;//rnd(0, 3);
	
		plat.image = 36+64*8;//226+rnd_pl_im;
		plat.x = x;
		plat.y = y-8;
	
	  if (random_phase) {
	    plat.vframe = rnd(0, plat.vx.length-1);
	  }
  
	  //moving_platforms.push(plat);
		this.areas[area_index]["platforms"].push(plat);
	}
	
	
	distributeSmallEnemies(area_index) {
		let area = this.areas[area_index]; // level may have less than 10 
		for (let n=20; n>0; n--) {
			//let rnd_area = rnd(0, this.areas.length);
			//let area = this.areas[rnd_area];
			
			// look for empty spot to place item
			let placex = rnd(16, area["width"]);
			for (let check_up=area["height"]-2; check_up > 0; check_up--){
				if (area["grid"][check_up][placex] === 0 && area["grid"][check_up+1][placex] === 1) {
					//this.areas[rnd_area]["items"].push({ "spice": "pepper", "gx": placex, "gy": check_up, "gathered": false });
					let enemy = this.create_small_enemy(placex*8, check_up*8, "walkbump", T["small_enemy"]+0*16);
					
					this.areas[area_index]["small_enemies"].push(enemy);
					check_up = 0;
					break;
				}
			}
		}
	}
	
	create_small_enemy(x,y, move_type="walkbump", image=0, random_phase=true) {
	  /* 
	    get hp and other stats from library, depending on name
    
	  */
  
  
	  //[1,0,0,0,2,0,0,0], // [0,0,0,1] // very slow movement
  
	  let xmove, ymove, move;// = []; 
	  let vframe = 0;
  
	  if (move_type == "steadyjump") {
    
	    let xspeeds = [
	      [
	        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,
	        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 
	        1,0,1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0,1,0,
	        1,0,1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0,1,0,
	      ],
	      [
	        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,
	        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 
	        1,0,2,0,1,0,2,0,1,0, 2,0,1,0,2,0,1,0,2,0, 1,0,2,0,1,0,2,0,1,0,
	        2,0,1,0,2,0,1,0,2,0, 1,0,2,0,1,0,2,0,1,0, 2,0,1,0,2,0,1,0,2,0,
	      ],
	      [
	        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,
	        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 
	        1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,
	        1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,
	      ],
	    ];
	    let rnd_xspeed = rnd(0, 3);
	    xmove = xspeeds[rnd_xspeed];
    
	    ymove = [
	      0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,
	      0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0, // <- index 59
	      -3,0,-3,0,-3,0,-2,0,-2,0, -2,0,-1,0,-1,0,-1,0,-1,0, 0,0,0,0,0,0,0,0,0, 0, // <- index 89
	      0,0,0,0,0,0,0,0,0,0, 1,0,1,0,1,0,1,0,2,0, 2,0,2,0,3,0,3,0,3,0
	    ];
	    move = "steady"; // "upjump" 60 <= x && x < 90, "downjump" 90 <= x && x < 120
    
	    let rnd_phase = rnd(0, 59);
	    vframe = rnd_phase;
    
    
	  } else if (move_type == "steadyfly") {
    
	    // stationary. could have initial movement
	    // random direction
	    xmove = [0];
	    ymove = [0];
	    move = "steady";
     
	  } else if (move_type == "hone") {
    
	    xmove = [0];
	    ymove = [0];
	    move = "hone";
    
	  } else if (move_type == "walkbump") {
    
	    let xspeeds = [
	      [1,0,0,0,0,2,0,0,0,0], [1,0,0,0,2,0,0,0], [1,0,0,2,0,0], 
	      [1,0,2,0], [1,0,0,0,0,0,0,0,0,0], [1,1,2], [1,2]
	    ];
	    let rnd_xspeed = rnd(0, 6);
	    xmove = xspeeds[rnd_xspeed];
	    ymove = [0];//1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3];
	    move = "walk";
    
	  } else {
	    // stationary
	    xmove = [0];
	    ymove = [0];
	    move = "steady";
    
	  }
	  //let rnd_y = 
  
  
  
  
  
	  var enemy = {
	    image: image, // 0, 
	    x: x,
	    y: y-4, //?
    
	    HP: 2,
	    ATK: 1,
	    SCORE: 50,
    
	    move_type: move_type,
	    move_phase: move, // for honing patterns, etc
    
	    vx: xmove,
	    vy: ymove,
    
	    vxframe: vframe,
	    vyframe: vframe,
    
	    fallframe: 0,
	    fall: [1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3],
	    grounded: false,
    
	    frames: [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3],
	    frame: 0, //should be the index
    
	    aframes: [0,1,2,3], // attack frames
	    aframe: 0,
	    attacking: false,
	    going_left: true, // default for most platform games
    
	    stuck_in_block: false,
	    in_screen: true,
	    dead_frame: 0, // +4 for dead sprite image
	    dead_frames: -1, // will increment to get flashy effect
	    alive: true
    
	  };
	  if (random_phase) {
	    enemy.frame = rnd(0, enemy.frames.length-1);
	  }
	
		return enemy;
	  //curr_area["small enemies"].push(enemy);
	}
	
	distributeItems() {
		// Includes keys
		
		let graph = {}; // no information, just the node indices
		for (let i=0; i<this.areas.length; i++) {
			graph[i] = Object.keys(this.areas[i]["exits"]);
		}
		
		//console.log(this.areas[]);
		
		let startingNode = 0;
		let visitingNodes = {};
		let depth = -1;
		let result = [];
		let stats = {
			"bossroom": this.finalArea,
			"deadends": [],
			"hasdoor": []
		};
		
		
		let door_exits = []; // 2d array
		for (let i=0; i<this.areas.length; i++) {
			let area = this.areas[i]; // 0
			
			
			
			let dexits = Object.keys(area["exits"]).reduce(function (dexits, key) {
			    if (area["exits"][key].type == 4) {
						dexits[key] = area["exits"][key];
					}
			    return dexits;
			}, {});/**/
			
			if (Object.keys(dexits).length) {
				door_exits.push(dexits);
			}
		}
		
		//console.log(door_exits);
		
		/**/
		
		// create list of areas with info
		this.depthFirstSearch(graph, startingNode, visitingNodes, depth, result, stats);
		
		// using the above result, distribute keys by backtracking from the area
		//this.distributeKeys(result);
		
		
		
		//let area_items = [];
		let nutmegs = 20; // level may have less than 10 
		for (let n=nutmegs; n>0; n--) {
			let rnd_area = rnd(0, this.areas.length);
			let area = this.areas[rnd_area];
			
			// look for empty spot t place item
			let placex = rnd(0, area["width"]);
			for (let check_up=area["height"]-2; check_up > 0; check_up--){
				if (area["grid"][check_up][placex] === 0 && area["grid"][check_up+1][placex] === 1) {
					this.areas[rnd_area]["items"].push({ "name": "nutmeg", "gx": placex, "gy": check_up, "gathered": false });
					check_up = 0;
					break;
				}
			}
		}
		
		let peppers = 20; // level may have less than 10 
		for (let n=peppers; n>0; n--) {
			let rnd_area = rnd(0, this.areas.length);
			let area = this.areas[rnd_area];
			
			// look for empty spot to place item
			let placex = rnd(0, area["width"]);
			for (let check_up=area["height"]-2; check_up > 0; check_up--){
				if (area["grid"][check_up][placex] === 0 && area["grid"][check_up+1][placex] === 1) {
					this.areas[rnd_area]["items"].push({ "name": "pepper", "gx": placex, "gy": check_up, "gathered": false });
					check_up = 0;
					break;
				}
			}
		}
		
		let sugars = 20;
		let sugar_types = ["sugar_l", "sugar_r", "sugar_dbl"];
		for (let n=sugars; n>0; n--) {
			let rnd_area = rnd(0, this.areas.length);
			let area = this.areas[rnd_area];
			
			// look for empty spot to place item
			let placex = rnd(0, area["width"]);
			for (let check_up=area["height"]-2; check_up > 0; check_up--){
				if (area["grid"][check_up][placex] === 0 && area["grid"][check_up+1][placex] === 1) {
					let sugar_type = rnd(0, 3);
					this.areas[rnd_area]["items"].push({ "name": sugar_types[sugar_type], "gx": placex, "gy": check_up, "gathered": false });
					check_up = 0;
					break;
				}
			}
		}
		
		
		// TESTING -- will change
		let door_keys = 20; // level may have less than 10 
		for (let n=door_keys; n>0; n--) {
			let rnd_area = rnd(0, this.areas.length);
			let area = this.areas[rnd_area];
			
			// look for empty spot to place item
			let placex = rnd(0, area["width"]);
			for (let check_up=area["height"]-2; check_up > 0; check_up--){
				if (area["grid"][check_up][placex] === 0 && area["grid"][check_up+1][placex] === 1) {
					this.areas[rnd_area]["items"].push({ "name": "door_key", "gx": placex, "gy": check_up, "gathered": false });
					check_up = 0;
					break;
				}
			}
		}
		
		
		//console.log(boss);
		//console.log(result);
		
		/*
​
			the deeper the area, the better the reward
		[
				{ n: "1", depth: 1, status: "mainpath", door_exits: [8, 6] }
				​{ n: "2", depth: 2, status: "mainpath" }
				​{ n: "3", depth: 3, status: "mainpath" }
				​{ n: "4", depth: 4, status: "mainpath" }
				​{ n: "5", depth: 5, status: "bossroom" }
				​{ n: "6", depth: 4, status: "deadend" }
				{ n: "10", depth: 4, status: "deadend" }
				​{ n: "7", depth: 3, status: "deadend" }
				​{ n: "9", depth: 3, status: "deadend" }
				​{ n: "11", depth: 3, status: "deadend" }
				​{ n: "8", depth: 2, status: "deadend" }
				​{ n: "12", depth: 2, status: "deadend" }
		]
		
				0: Object { 4: {…}, 8: {…}, 11: {…} }
				1: Object { 6: {…} }
				2: Object { 1: {…} }
				3: Object { 3: {…} }
				4: Object { 10: {…} }
				5: Object { 1: {…} }
				6: Object { 7: {…} }
				7: Object { 1: {…} }
		*/
		
		
		
		// sort based on depth
		// place keys in farthest places
		
		
		// have a set number of spices at a time per level
		
		//this.areas[]
		//this.areas[area_index]["grid"] = terrain_grid;
		
		
	}
	
	depthFirstSearch(graph, node, visited, depth, result, stats) {
	  if (visited[node]) { return; }
		
		depth++;
	  visited[node] = true;
		
		
		if (node > 0) {
			if (graph[node].length === 1) {
				let status_ = node == this.finalArea ? "bossroom" : "deadend";
				result.push({ 
					"n": node,
					//"end": true,
					"depth": depth,
					"status": status_,
					"door_to": []
				});
			} else {
				let status_ = node < this.finalArea ? "mainpath" : "sidepath";
				result.push({ 
					"n": node,
					//"end": false,
					"depth": depth,
					"status": status_,
					"door_to": []
				});
			}
		}
		
	  const neighbors = graph[node];
	  for (const neighbor of neighbors) {
			this.depthFirstSearch(graph, neighbor, visited, depth, result, stats);
	  }
	}
	
	distributeLevelGoals() {
		// key items, bosses, mini bosses
		// defeat boss
		// kill all enemies
		// collect key items
		//
	}
	
	distributeKeys(graph) {
		let boss = graph.find(r => r.n == this.finalArea);
		
		console.log("BOSS:");
		console.log(boss);
		
		
		
	}
	
	
	
	
	
	
	
	
	
	build_areas(terrain_type=DEFAULT_START_TERRAIN) {
		/*
			have a category of sizes, possible vertical 'ice climber'/'kid icarus' type levels
			
			elevation:
			terrain: 
		    cave
			types:
				 "mountain"-"sky"-"balconey"--"tower"
					 |      \   |   /             | 
				  "cave"--"outdoor"--------"indoor"      
				      |       |               |
				    "underground"------"basement"
			
			
			create chunk map
		
			x_screen_size == 4
			y_screen_size == 3
			
			 ____ ____ ____ ____
			|    |    |    |    |
			|____|____|____|____|
			|    |    |    |    |
			|____|____|____|____|
			|    |    |    |    |
			|____|____|____|____|
		
		*/
		
		
		
		this.init_terrain_type = terrain_type;
		
		
		// create level graph
		for (let i=0; i<this.numAreas; i++) {
			
			let x_screens = rnd(1 + (i === 0 ? 0 : 1 ), 7); // start area can be one screen, the rest must be at least 2 screens wide
			let y_screens = 1;
			let isVertical = false;
			// tall vs long levels, dont want them too big
			if (x_screens > 3) {
				y_screens = rnd(2,3); // 2 screens tall
			} else {
				y_screens = rnd(2,5);
				if (y_screens > 3 && x_screens < 3) {
					isVertical = true;
				}
			}
			
			//let is_dungeon = rnd(0,3);
			
			// ------- build_area() adds to the level graph
			this.build_area(i, x_screens, y_screens, isVertical); // build_area vs testPlaceTerrain
			//this.build_area(i, 1, 1);
			
			
			if (testing) {
				/*
					placeTerrain and placePlatforms need to combine? For edges connecting
				
					fill in below each platform
				
				*/
				//console.log("area build: "+i);
				//this.testPlaceTerrain(i); // includes platforms. should be in build_area? or place after
				//this.testScatter(i);
				//this.testPlaceFloor(i);
				//this.testPlaceClimbObjects(i);
				//this.testPlaceEnemies(i);
				//this.testPlaceMovingPlatforms(i);
				
				//this.fixFloorOob(i);
				//this.testPlacePlatforms(i);
				//if (is_dungeon) {
					//this.makeAreaDungeon(i);
					//}
			
			}
			
		}
		
		// --------- level graph is complete.
		
		// --------- create chunk map
		for (let i=0; i<this.numAreas; i++) {
			this.createChunkMap(i);
		}
		
		// --------- fix exits
		for (let i=0; i<this.numAreas; i++) {
			this.fixChunkExits(i);
		}
		
		// --------- distribute keys
		this.distributeItems();
		
		
		// --------- enemies
		for (let i=0; i<this.numAreas; i++) {
			this.distributeSmallEnemies(i);
		}
		
		// --------- fix terrain
		//for (let i=0; i<this.numAreas; i++) {
		//	this.tillSoil(i);
		//}
		
		
		//for (let i=0; i<this.numAreas; i++) {
			//this.distributeItems(i, );
			//}
		
		
		
		
		
		
		//  use terrain info from finished level to create world map (return statement?)
		
	}
	
	
	
	placeStructure(from_img, to_area, ax=0, ay=0, toff=0, layer="image", ptype=1) {
		// image_layer -> "image" "image_behind" "image_front"
		// set ptype = 0 if just an image
		
		let tile_offset = toff*64;
		let to_area_img = to_area[layer];
		for (let iy=0; iy < from_img.length && ay+iy < to_area["height"]; iy++) {
			for (let ix=0; ix < from_img[0].length && ax+ix < to_area["width"]; ix++) {
				if (from_img[iy][ix] > 0 && (0 <= ay+iy && 0 <= ax+ix)) {
					to_area_img.set(ax+ix, ay+iy, from_img[iy][ix]+tile_offset);
					if (ptype > 0) {
						to_area["grid"][ay+iy][ax+ix] = ptype;
					}
				}
			}
		}
	}
	
	placeOnGrid(from_grid, to_grid, ax, ay) {
		//console.log("----------");
		let fh = from_grid.length;
		let fw = from_grid[0].length;
		let th = to_grid.length;
		let tw = to_grid[0].length;
		
		for (let jy=0; jy < from_grid.length && ay+jy < to_grid.length && ay+jy>=0; jy++) {
			for (let ix=0; ix < from_grid[0].length && ax+ix < to_grid[0].length && ax+ix>=0; ix++) {
				//console.log("to_grid["+(ay+jy)+"]["+(ax+ix)+"] "+th+" "+tw+" = from_grid["+jy+"]["+ix+"] "+fh+" "+fw+" ");
				
				to_grid[ay+jy][ax+ix] = from_grid[jy][ix];
			}
		}
	}
	
	
	
	
	
}


// 2,3,5,7,11,13 //

/*
	16 17 18  19 20 21  22 23 24  25 26 27  28 29 30 31
  32 33 34  35 36 37  38 39 40  41 42 43  44 45 46 47
  48 49 50  51 52 53  54 55 56  57 58 59  60 61 62 63
*/


// testing
/*
let p_0 = new pnode();
let p_1 = new pnode();
let p_2 = new pnode();
let p_3 = new pnode();
let p_4 = new pnode();
let p_b0 = new pnode();
let p_b1 = new pnode();
let p_b2 = new pnode();

p_0.setNext(p_1, 1, 0);
p_1.setNext(p_2, 2, 1);
p_2.setNext(p_3, 3, 0);
p_3.setNext(p_4, 5, -1);

p_2.setBranch(p_b0, 0, 4);
p_b0.setNext(p_b1, 5, 0);

let chain = p_0.getChain();

console.log(p_0.printChain());
console.log(chain);
*/

var TileMap = require('pixelbox/TileMap');

/* ========================= INITIALIZE WORLD =========================== */

if (1) {
	tilesheet(ts_wmap);
	
	
	
	
	// these will be in class object instead
	// TODO: try creating a gridless world that doesn't need to be stored in memory, based on seed and px py
	
	let numWScreensX = 1;
	let numWScreensY = 1;
	var w_height = numWScreensY*G_H;
	var w_width = numWScreensX*G_W;
	//var world_event_grid = [...Array(w_height)].map(_ => Array(w_width).fill(0));
	//var world_area_image = new TileMap(w_width, w_height); // multiple areas?
	const W_IMAGE_SIZE = 18;
	
	/*
	var render_r = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_T = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_7 = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_E = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_O = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_3 = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_L = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_U = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_J = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	/**/
	var render_map = new TileMap(50, 50);
	var render_map_mid = new TileMap(50, 50);
	var render_map_top = new TileMap(50, 50);
	/*
	var render_r_m = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_T_m = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_7_m = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_E_m = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_O_m = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_3_m = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_L_m = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_U_m = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	var render_J_m = new TileMap(W_IMAGE_SIZE, W_IMAGE_SIZE);
	/**/
	var render_map_m = new TileMap(50, 50);
	var render_map_particles = new TileMap(50, 50);
	var render_map_canopy = new TileMap(50, 50);
	var render_map_canopy_1 = new TileMap(50, 50);
	var render_map_above = new TileMap(50, 50);
	
	/*
	var render_test = new TileMap(16, 16);
	for (let wy=0; wy<16; wy++) {
		for (let wx=0; wx<16; wx++) {
			render_test.set(wx, wy, 0);
		}
	}/**/
	
	//var world_pixel_width = w_width*8;
	//var world_pixel_height = w_height*8;
	/**/
	
	
	/*
	for (let wy=0; wy<w_height; wy++) {
		for (let wx=0; wx<w_width; wx++) {
			world_area_image.set(wx, wy, 0);
			if (rnd(0,9) === 0) {
				world_area_image.set(wx,wy, 1);
				world_event_grid[wy][wx] = 1;
			}
		}
	}*/
	
	
	
	//var world_image_ = area["image"].set( new_x, new_y, T["rt_arrow"]);curr_area["image"];//new TileMap(width, height);
	
}



/* ========================= INITIALIZE LEVEL =========================== */


//




if (0) {
	tilesheet(ts_1); // can change tile sheet later on with this
	
	const DEFAULT_START_TERRAIN = T["starting_terrain"];
	var current_area = 0;
	var activated_area = -1;



	// random number of rooms and graph but all the same size 
	// need to randomize room sizes
	let numMainRooms = rnd(3, 5); //3, 10
	let numExtra = rnd(4, 7); // 4, 15
	let newLevel = new LevelGraph(numMainRooms, numExtra);
	newLevel.build_areas();



	//var current_level = 0;
	//var exit_choices = ["edge", "edge", "door"];
	var curr_area = newLevel.areas[current_area];

	var level_image_ = curr_area["image"];//new TileMap(width, height);
	var level_image_behind = curr_area["image_behind"];//new TileMap(width, height);
	var level_image_front = curr_area["image_front"];//new TileMap(width, height);
	var level_grid_ = curr_area["grid"];//[...Array(height)].map(_ => Array(width).fill(0));
	var level_events_ = curr_area["event_grid"];

	var width = curr_area["width"]; // 32 is one 'screen', 64 is two 'screens' 
	var height = curr_area["height"]; // 24 ,  48
	var rt = width-1;
	var bm = height-1;
	var level_pixel_width = width*8;
	var level_pixel_height = height*8;


	// start music. should start depending on screen -- title, level, world
	start_music();
	/**/
}






/* ========================== UPDATE FUNCTIONS ============================== */

// ts_s1a == 'scene 1 a' animations, could be different sizes. 
// separate png file might be easier than trying to 'chunk' the spritesheet
// frame, x, y, 

function update_title() {
  tilesheet(ts_a);
  //cls();
  
  if (dt%60 == 0) {
    
    draw(info_bar, 0, SCREEN_HEIGHT-64)
    sprite(0+Math.floor(dt/60), 0+Math.floor(dt/60)*8, 128);
  }
  
  if (dt >= 2000) {
    state = "level";
    
  }
  // credits or btn
  // presents or btn
  // 
  // title and options, and btn
  // 

}

function update_scene() {
  
}


// TODO: temporary, need build_world()
//var world_image = 
/*
			*******************  WORLD UPDATE *********************

*/

var offset_toggle = 0;
function update_world() {
	update_setting_gamepad();
	/*
		x y position on world determines seed
	
	
	*/
  
	player1_world_movement();
	player1_world_animation();
	//player1_animation();
	
	// animation()
	//player2_world_movement();
	
	cls();
	
	
	// need to calculate difference for right side of screen
	/*
	if (world_pixel_width === SCREEN_WIDTH) {
		l_offset = 0; offset_toggle = 1;
	} else {
		if (left_edge == 0) {
			l_offset = SCREEN_WIDTH-XMID;
		} else {
			l_offset = 0;
		}
	
		if (right_edge == 0) {
			//console.log("right_edge == 0")
		} else {
			l_offset = -(world_pixel_width - SCREEN_WIDTH); // ?
		}
	}
	
	if (world_pixel_height === SCREEN_HEIGHT) {
		u_offset = 0;
	} else {
		if (top_edge == 0) {
			u_offset = SCREEN_HEIGHT-YMID;
		} else {
			u_offset = 0;
		}
	
		if (bottom_edge == 0) {
		} else {
			u_offset = -(world_pixel_height - SCREEN_HEIGHT); // ?
		}
	}/**/
	
	update_world_chunks();
	
	draw_world_chunks(); // <-- trees, mountains, and player are drawn in here
	//draw(world_area_image, l_offset+(XMID*offset_toggle)-pw.x, u_offset+(YMID*offset_toggle)-pw.y);
	
	//draw_player_1();
	//draw_cover();
	
	
	
	/*
	sprite(pw_sheet_id+(pframe*2), XMID-4-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge, going_left);
	sprite(pw_sheet_id+1+(pframe*2), XMID-4-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge, going_left);
	sprite(pw_sheet_id+16+(pframe*2), XMID-4-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+8, going_left);
	sprite(pw_sheet_id+17+(pframe*2), XMID-4-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+8, going_left);
	sprite(pw_sheet_id+32+(pframe*2), XMID-4-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+16, going_left);
	sprite(pw_sheet_id+33+(pframe*2), XMID-4-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+16, going_left);
	/**/
	
	draw_world_chunks_canopy();
	
	draw_world_particles(); // water, wind and leaves rustling, grass
	
	//draw_trees_behind(); // <----- **** TREE **** this needs to be fixed
	//draw_player_1();
	//draw_trees_front();
	
	//sprite(368, XMID-left_edge-XOFFSET+right_edge, YMID-top_edge-4+bottom_edge, going_left);
  /*sprite(psheet[0]+(pframe*2)+128, XMID-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge-YOFFSET+bottom_edge-info_box_offset, going_left);
  sprite(psheet[1]+(pframe*2), XMID-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge-YOFFSET+bottom_edge-info_box_offset, going_left);
  sprite(psheet[2]+(pframe*2), XMID-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge+8-YOFFSET+bottom_edge-info_box_offset, going_left);
  sprite(psheet[3]+(pframe*2), XMID-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge+8-YOFFSET+bottom_edge-info_box_offset, going_left);
  sprite(psheet[4]+(pframe*2), XMID-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge+16-YOFFSET+bottom_edge-info_box_offset, going_left);
  sprite(psheet[5]+(pframe*2), XMID-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge+16-YOFFSET+bottom_edge-info_box_offset, going_left);
	/**/
	
	toggle_speed();
}


var PLAYER_Y_WORLD_OFFSET = 8;

function draw_player_1_() {
	sprite(pw_sheet_id+(pframe*2), XMID-4-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge-PLAYER_Y_WORLD_OFFSET, going_left);
	sprite(pw_sheet_id+1+(pframe*2), XMID-4-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge-PLAYER_Y_WORLD_OFFSET, going_left);
	sprite(pw_sheet_id+16+(pframe*2), XMID-4-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+8-PLAYER_Y_WORLD_OFFSET, going_left);
	sprite(pw_sheet_id+17+(pframe*2), XMID-4-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+8-PLAYER_Y_WORLD_OFFSET, going_left);
	sprite(pw_sheet_id+32+(pframe*2), XMID-4-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+16-PLAYER_Y_WORLD_OFFSET, going_left);
	sprite(pw_sheet_id+33+(pframe*2), XMID-4-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+16-PLAYER_Y_WORLD_OFFSET, going_left);
}

function draw_player_1() {
	sprite(pw_sheet_id+(pframe*2), XMID-left_edge+right_edge-8+(8*going_left), YMID-top_edge+bottom_edge-22, going_left);
	sprite(pw_sheet_id+1+(pframe*2), XMID-left_edge+right_edge-(8*going_left), YMID-top_edge+bottom_edge-22, going_left);
	sprite(pw_sheet_id+16+(pframe*2), XMID-left_edge+right_edge-8+(8*going_left), YMID-top_edge+bottom_edge-14, going_left);
	sprite(pw_sheet_id+17+(pframe*2), XMID-left_edge+right_edge-(8*going_left), YMID-top_edge+bottom_edge-14, going_left);
	sprite(pw_sheet_id+32+(pframe*2), XMID-left_edge+right_edge-8+(8*going_left), YMID-top_edge+bottom_edge-6, going_left);
	sprite(pw_sheet_id+33+(pframe*2), XMID-left_edge+right_edge-(8*going_left), YMID-top_edge+bottom_edge-6, going_left);
	/*
	draw(pw_sheet_id+(pframe*2), XMID-4-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge-PLAYER_Y_WORLD_OFFSET, going_left);
	draw(pw_sheet_id+1+(pframe*2), XMID-4-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge-PLAYER_Y_WORLD_OFFSET, going_left);
	draw(pw_sheet_id+16+(pframe*2), XMID-4-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+8-PLAYER_Y_WORLD_OFFSET, going_left);
	draw(pw_sheet_id+17+(pframe*2), XMID-4-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+8-PLAYER_Y_WORLD_OFFSET, going_left);
	draw(pw_sheet_id+32+(pframe*2), XMID-4-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+16-PLAYER_Y_WORLD_OFFSET, going_left);
	draw(pw_sheet_id+33+(pframe*2), XMID-4-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+16-PLAYER_Y_WORLD_OFFSET, going_left);
	*/
}


function draw_cover() {
	
	//sprite()
}


function draw_mount_behind(xpm, ypm) {
	let n_x = pw.x < 0 ? 128 : 0;
	let n_y = pw.y < 0 ? 128 : 0;
	for (let y=0; y<ypm+17; y++) {
		for (let x=0; x<50; x++) {
			let bw = main_map["image_m_base_wall"][y][x];
			let bp = main_map["image_m_base_plat"][y][x];
			let mw = main_map["image_m_mid_wall"][y][x];
			let mp = main_map["image_m_mid_plat"][y][x];
			
			if (bw) {
				sprite(64*9+bw, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)+(y-1)*8-CHUNK_Y_OFFSET);
			}
			if (bp && (bp !== 33)) {
				sprite(64*7+bp, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)+(y-1)*8-CHUNK_Y_OFFSET);
			}
			if (mw) {
				sprite(64*9+mw, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)+(y-1)*8-CHUNK_Y_OFFSET);
			}
			if (mp && (mp !== 33)) {
				sprite(64*7+mp, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)+(y-1)*8-CHUNK_Y_OFFSET);
			}
			
		}
	}
}

function draw_mount_front(xpm, ypm) {
	let n_x = pw.x < 0 ? 128 : 0;
	let n_y = pw.y < 0 ? 128 : 0;
	for (let y=ypm+17; y<50; y++) {
		for (let x=0; x<50; x++) {
			let bw = main_map["image_m_base_wall"][y][x];
			let bp = main_map["image_m_base_plat"][y][x];
			let mw = main_map["image_m_mid_wall"][y][x];
			let mp = main_map["image_m_mid_plat"][y][x];
			
			if (bw) {
				sprite(64*9+bw, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)+(y-1)*8-CHUNK_Y_OFFSET);
			}
			if (bp && (bp !== 33)) {
				sprite(64*7+bp, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)+(y-1)*8-CHUNK_Y_OFFSET);
			}
			if (mw) {
				sprite(64*9+mw, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)+(y-1)*8-CHUNK_Y_OFFSET);
			}
			if (mp && (mp !== 33)) {
				sprite(64*7+mp, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)+(y-1)*8-CHUNK_Y_OFFSET);
			}
		}
	}
}

function draw_trees_behind() { // **** TREE ****
	let pwx8 = Math.floor(pw.x/8);
	let pwy8 = Math.floor(pw.y/8);
	let pwx8_pacman = pwx8 < 0 ? 16+pwx8%16 : pwx8%16;
	let pwy8_pacman = pwy8 < 0 ? 16+pwy8%16 : pwy8%16;
	for (let y=0; y<pwy8_pacman+17; y++) {
		for (let x=0; x<50; x++) {
				let tile_ = main_map["event"][y][x];
				if ([40,41,42,43,44,45].includes(tile_)) {
					draw_tree(tile_, x, y);
				}
		}
	}
}

function draw_trees_front() {
	let pwx8 = Math.floor(pw.x/8);
	let pwy8 = Math.floor(pw.y/8);
	let pwx8_pacman = pwx8 < 0 ? 16+pwx8%16 : pwx8%16;
	let pwy8_pacman = pwy8 < 0 ? 16+pwy8%16 : pwy8%16;
	for (let y=pwy8_pacman+17; y<50; y++) {
		for (let x=0; x<50; x++) {
				let tile_ = main_map["event"][y][x];
				if ([40,41,42,43,44,45].includes(tile_)) {
					draw_tree(tile_, x, y);
				}
		}
	}
}




function draw_tree(tree_type, x, y) {
	let n_x = pw.x < 0 ? 128 : 0;
	let n_y = pw.y < 0 ? 128 : 0;
	
	
	switch (tree_type) {
	  case 40:
			// randomized trees (also acts as a default, should )
			sprite(64*2+12, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)+(y-1)*8-CHUNK_Y_OFFSET);
			sprite(64*2+11, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)-CHUNK_Y_OFFSET+8*(y-1 - 1));
			sprite(64*2+11, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)-CHUNK_Y_OFFSET+8*(y-1 - 2));
			//sprite(64*2+11, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)-CHUNK_Y_OFFSET+8*(y-1 - 3));
			
			
			break;
		case 41:
			sprite(64*2+12, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)+(y-1)*8-CHUNK_Y_OFFSET);
			sprite(64*2+11, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)-CHUNK_Y_OFFSET+8*(y-1 - 1));
			sprite(64*2+11, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)-CHUNK_Y_OFFSET+8*(y-1 - 2));
			sprite(64*2+11, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)-CHUNK_Y_OFFSET+8*(y-1 - 3));
			//sprite(64*2+11, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)-CHUNK_Y_OFFSET+8*(y-1 - 4));
			
			break;
		case 42:
			sprite(64*3+12, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)+(y-1)*8-CHUNK_Y_OFFSET);
			sprite(64*3+11, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)-CHUNK_Y_OFFSET+8*(y-1 - 1));
			
			
			break;
		case 43:
			sprite(64*3+39, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)+(y-1)*8-CHUNK_Y_OFFSET);
			
			break;
		case 44:
			sprite(64*4+39, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)+(y-1)*8-CHUNK_Y_OFFSET);
			
			break;
		case 45:
			sprite(64*5+39, -(pw.x%128+n_x)+(x-1)*8, -(pw.y%128+n_y)+(y-1)*8-CHUNK_Y_OFFSET);
			
			break;
	}
}



/*



g g w
ggJ w
w w w

g g g  
f f g
w w g


g f f
g w f
w w w





	r,  T,  7,
	E,	O,  3,
	L,  U,  J

functions:

	gJ 
  gL 
  g7 
  gr
	wr 
  w7 
  wL 
  wJ
	wn 
  wc 
  w3 
  wu
	wlbns 
  wlbwe
	wlhst 
  wlhet 
  wlhwt 
  wlhnt



// everything below the middle of the screen should be on the top layer
// everything above the middle of the screen should be on the bottom layer




*/

var all_seeds_test = [];

// ready made
var grass_terrain_chunk = [...Array(16)].map(_ => Array(16).fill(0));
var water_terrain_chunk = [...Array(16)].map(_ => Array(16).fill(1));
var forest_terrain_chunk = [...Array(16)].map(_ => Array(16).fill(2));
var mountain_terrain_chunk = [...Array(16)].map(_ => Array(16).fill(3));
var desert_terrain_chunk = [...Array(16)].map(_ => Array(16).fill(4));


// each of the 9 3x3 chunks will go through this
function build_chunk_shape_dep(chunk_info) { //chs, cid, sp="", b2="", bvi={}) {
//function build_chunk_shape(chs, cid, sp="", b2="", bvi={}) {
	//console.log(chunk_info);
	
	/*
	Object { cid: "-1_-1", x: -1, y: -1, b: {…}, s: "g", bvi: {} }
	​
	b: {
	  "biome": "g",
	  "biome2": "g",
	  "difficulty": 1,
	  "color": "rgb(20,100,0)",
	  "special": 0,
	  "bvi": {
	    "0": true,
	    "1": false,
	    "2": true,
	    "3": false,
	    "4": false,
	    "5": false,
	    "6": false,
	    "7": false,
	    "8": 3
	  }
	}
	bvi: Object {  }
	cid: "-1_-1"
	s: "g"
	x: -1
	y: -1
	​/**/
	
	
	// should have "M" info by now for biome 2
	let b2 = chunk_info.b.biome2;
	let bvi = chunk_info.b.bvi;
	let cid = chunk_info.cid;
	
	//console.log(cid);
	let hbid = "";
	if (bvi[8] === 1) {
		cid = (chunk_info.x-1)+"_"+chunk_info.y;
		//console.log("   "+cid);
	} else if (bvi[8] === 2) {
		cid = chunk_info.x+"_"+(chunk_info.y-1);
		//console.log("   "+cid);
	}
	
	
	let chs = chunk_info.s;
	
	// sp is "x" as default, will deal with it later
	
	let events = [...Array(16)].map(_ => Array(16).fill(0)); 
	let ci = 0;
	
	let chunk_seed = PRNG(cid, 128);
	
	
	if (["mr", "m7", "mL", "mJ", "mc", "mn", "m3", "mu", "met", "mer", "mel", "mbv", "mbh"].includes(chs)) {
		// MOUNTAIN CHUNK
		//events = m_chunk(chunk_seed, b2, bvi, chs);
		
	} else if (["M", "g", "p"].includes(chs)) {
		if (b2 === "f") {
			//console.log("\n");
			//console.log(cid);
			if (!all_seeds_test.includes(chunk_seed[0])) {
				all_seeds_test.push(chunk_seed[0]);
			}
			
		} else if (b2 === "m") {
			
			// TURN OFF or remove to get mountain chunks/herringbone tiles
			return events;
		}
		
		
		if (bvi[8] === 0) {
			events = herringbone_tile(chunk_seed, b2, bvi, "left"); // should produce the same hb tile as the right one below
		} else if (bvi[8] === 3) {
			events = herringbone_tile(chunk_seed, b2, bvi, "top"); // should produce the same hb tile as the bottom one below
		} else if (bvi[8] === 1) {
			events = herringbone_tile(chunk_seed, b2, bvi, "right"); // should produce the same hb tile as the left one above
		} else if (bvi[8] === 2) {
			events = herringbone_tile(chunk_seed, b2, bvi, "bottom"); // should produce the same hb tile as the top one above
		}
		
	} else if (["d", "dr", "d7", "dL", "dJ","dgr", "dg7", "dgL", "dgJ", "dc", "dn", "d3", "du", "deT", "deU", "deE", "de3", "dlhnt", "dlhst", "dlhet", "dlhwt", "dbns", "dbwe"].includes(chs)) {
	  
	  //console.log(chs);
		events = d_chunk(chunk_seed, b2, bvi, chs);
		
		
	} else if (chs === "w") {
		events = water_terrain_chunk;
		
	} else if ([
		"gJ", "gL", "g7", "gr", 
		"wr", "w7", "wL", "wJ", "wn", "wc", "w3", "wu", "wo", 
		"weT", "weE", "we3", "weU", 
		"wlbns", "wlbwe", "wlhst", "wlhnt", "wlhwt", "wlhet", 
		"wdr", "wd7", "wdL", "wdJ"
	].includes(chs)) {
		events = w_chunk(chunk_seed, b2, bvi, chs);
	} else if ([
		"xr", "xT", "x7", "sr", "s7", "sS", "sE", "s3", "sL", "sU", "sJ"
	].includes(chs)) {
		events = s_chunk(chunk_seed, b2, bvi, chs);
	} else if ([
		"pr", "peT", "p7", "peE", "pe3", "pL", "peU", "pJ", "ptu", "ptc", "pt3", "ptn"
	].includes(chs)) {
		events = p_chunk(chunk_seed, b2, bvi, chs);
	}
	
	
	return events;//[events, events_canopy];
}




var world_chunk_size = 16;
var chunk_set = {};




// initiate this with the current location
var curr_chunk_ids = init_curr_chunk_ids(pw.cx, pw.cy);



let up = 0;








var chunk_count = 0;
var curr_chunk = chunk_set[curr_chunk_ids["O"].cid];

var main_map = []

const noiseMax = 10;
const noiseThres = 8;

//var update_chunk_render = 0;
function update_world_chunks() {
	
	// current player position
	let pwx = pw.x < 0 ? pw.x-1 : pw.x;
	let pwy = pw.y < 0 ? pw.y-1 : pw.y;
	
	let chunkx = Math.floor((pwx/8)/world_chunk_size);
	let chunky = Math.floor((pwy/8)/world_chunk_size);
	
	let cidO = chunkx+"_"+chunky;
	//let hbid = Math.floor(chunkx/2)+"_"+Math.floor(chunky/2)
	pw.cx = chunkx;
	pw.cy = chunky;
	
	
	
	// get_chunk_info(x,y) should get the biome and shape of the chunk
	
	// check the current chunk location -- if player steps into a new chunk (or not loaded into set yet), do the necessary changes
	if (curr_chunk_ids["O"].cid != cidO || Object.keys(chunk_set).length < 2) {
		
		curr_chunk_ids["O"].cid = cidO;
		
		let oheights = null;
		let ograds = null;//curr_chunk_ids["O"].b.gradient;
		let obiomes = null;
		
		//curr_chunk_ids["O"].hbid = hbid;
		
		curr_chunk_ids["O"].x = chunkx;
		curr_chunk_ids["O"].y = chunky;
		
		
		// NEW ******** DRAW MAP HERE
		if (SHOW_MAP) {
			curr_chunk_ids["O"].b = get_chunk_info(chunkx, chunky, 1, 1); // x, y, reset_mini_map, reset_chunk_layout
			drawImageFromArray(curr_chunk_ids["O"].b.local_mini_map);
			
			//let cl = curr_chunk_ids["O"].b.layout;
			ograds = curr_chunk_ids["O"].b.ograds;
			obiomes = curr_chunk_ids["O"].b.obiomes;
			oheights = curr_chunk_ids["O"].b.oheights;
			
			//console.log(obiomes);
			/*
			let cgrad = ograds[4];
			let cbiome = obiomes[4];
			let cheight = oheights[4];
			/**/
			//console.log(ograds);
			//let cbiome = obiomes[4];
			
			// print tiny chunk map
			if (0) {
				let cols_ = "";
				for (let cly=0; cly<3; cly++) {
					let row_ = cgrad[cly].join(" ");
					cols_ = cols_+row_+"\n";
				} console.log(cols_);
			
				cols_ = "";
				for (let cly=0; cly<3; cly++) {
					let row_ = cbiome[cly].join(" ");
					cols_ = cols_+row_+"\n";
				} console.log(cols_);
			}
			
		} else {
			//console.log("SHOW_MAP == false");
			curr_chunk_ids["O"].b = get_chunk_info(chunkx, chunky, 0, 1);
			
			//let cl = curr_chunk_ids["O"].b.layout;
			ograds = curr_chunk_ids["O"].b.ograds;
			obiomes = curr_chunk_ids["O"].b.obiomes;
			oheights = curr_chunk_ids["O"].b.oheights;
			
			//console.log(obiomes);
			/*
			let cgrad = ograds[4];
			let cbiome = obiomes[4];
			let cheight = oheights[4];
			/**/
		}
		let cgrad = ograds[4];
		let cbiome = obiomes[4];
		let cheight = oheights[4];
		
		
		
		
		//curr_chunk_ids["O"].bvi = biome_variance_index(chunkx, chunky);
		
		let cidr = (chunkx-1)+"_"+(chunky-1);
		curr_chunk_ids["r"].cid = cidr;
		curr_chunk_ids["r"].x = chunkx-1;
		curr_chunk_ids["r"].y = chunky-1;
		curr_chunk_ids["r"].b = null;//get_chunk_info(chunkx-1, chunky-1);
		//curr_chunk_ids["r"].bvi = biome_variance_index(chunkx-1, chunky-1);
		
		let cidT = chunkx+"_"+(chunky-1);
		curr_chunk_ids["T"].cid = cidT;
		curr_chunk_ids["T"].x = chunkx;
		curr_chunk_ids["T"].y = chunky-1;
		curr_chunk_ids["T"].b = null;//get_chunk_info(chunkx, chunky-1);
		//curr_chunk_ids["T"].bvi = biome_variance_index(chunkx, chunky-1);
		
		let cid7 = (chunkx+1)+"_"+(chunky-1);
		curr_chunk_ids["7"].cid = cid7;
		curr_chunk_ids["7"].x = chunkx+1;
		curr_chunk_ids["7"].y = chunky-1;
		curr_chunk_ids["7"].b = null;//get_chunk_info(chunkx+1, chunky-1);
		//curr_chunk_ids["7"].bvi = biome_variance_index(chunkx+1, chunky-1);
		
		let cidE = (chunkx-1)+"_"+chunky;
		curr_chunk_ids["E"].cid = cidE;
		curr_chunk_ids["E"].x = chunkx-1;
		curr_chunk_ids["E"].y = chunky;
		curr_chunk_ids["E"].b = null;//get_chunk_info(chunkx-1, chunky);
		//curr_chunk_ids["E"].bvi = biome_variance_index(chunkx-1, chunky);
		
		let cid3 = (chunkx+1)+"_"+chunky;
		curr_chunk_ids["3"].cid = cid3;
		curr_chunk_ids["3"].x = chunkx+1;
		curr_chunk_ids["3"].y = chunky;
		curr_chunk_ids["3"].b = null;//get_chunk_info(chunkx+1, chunky);
		//curr_chunk_ids["3"].bvi = biome_variance_index(chunkx+1, chunky);
		
		let cidL = (chunkx-1)+"_"+(chunky+1);
		curr_chunk_ids["L"].cid = cidL;
		curr_chunk_ids["L"].x = chunkx-1;
		curr_chunk_ids["L"].y = chunky+1;
		curr_chunk_ids["L"].b = null;//get_chunk_info(chunkx-1, chunky+1);
		//curr_chunk_ids["L"].bvi = biome_variance_index(chunkx-1, chunky+1);
		
		let cidU = chunkx+"_"+(chunky+1);
		curr_chunk_ids["U"].cid = cidU;
		curr_chunk_ids["U"].x = chunkx;
		curr_chunk_ids["U"].y = chunky+1;
		curr_chunk_ids["U"].b = null;//get_chunk_info(chunkx, chunky+1);
		//curr_chunk_ids["U"].bvi = biome_variance_index(chunkx, chunky+1);
		
		let cidJ = (chunkx+1)+"_"+(chunky+1);
		curr_chunk_ids["J"].cid = cidJ;
		curr_chunk_ids["J"].x = chunkx+1;
		curr_chunk_ids["J"].y = chunky+1;
		curr_chunk_ids["J"].b = null;//get_chunk_info(chunkx+1, chunky+1);
		//curr_chunk_ids["J"].bvi = biome_variance_index(chunkx+1, chunky+1);
		
		
		// info about far chunks -- this will help with the shape of the close chunks
		curr_chunk_ids["rr"].b = null;//get_chunk_info(chunkx-2, chunky-2);
		curr_chunk_ids["rT"].b = null;//get_chunk_info(chunkx-1, chunky-2);
		curr_chunk_ids["TT"].b = null;//get_chunk_info(chunkx, chunky-2);
		curr_chunk_ids["T7"].b = null;//get_chunk_info(chunkx+1, chunky-2);
		curr_chunk_ids["77"].b = null;//get_chunk_info(chunkx+2, chunky-2);
		
		curr_chunk_ids["Er"].b = null;//get_chunk_info(chunkx-2, chunky-1);
		curr_chunk_ids["EE"].b = null;//get_chunk_info(chunkx-2, chunky);
		curr_chunk_ids["EL"].b = null;//get_chunk_info(chunkx-2, chunky+1);
		
		curr_chunk_ids["73"].b = null;//get_chunk_info(chunkx+2, chunky-1);
		curr_chunk_ids["33"].b = null;//get_chunk_info(chunkx+2, chunky);
		curr_chunk_ids["J3"].b = null;//get_chunk_info(chunkx+2, chunky+1);
		
		curr_chunk_ids["LL"].b = null;//get_chunk_info(chunkx-2, chunky+2);
		curr_chunk_ids["LU"].b = null;//get_chunk_info(chunkx-1, chunky+2);
		curr_chunk_ids["UU"].b = null;//get_chunk_info(chunkx, chunky+2);
		curr_chunk_ids["UJ"].b = null;//get_chunk_info(chunkx+1, chunky+2);
		curr_chunk_ids["JJ"].b = null;//get_chunk_info(chunkx+2, chunky+2);
		
		
		// TODO: don't need the chunk images after all, just the events for each of the surrounding chunks
		// 
		
		// set chunk_set for each
		// stinky
		//let chunk_events_ = [...Array(16)].map(_ => Array(16).fill(0)); /// probably change
		
		
		// TODO ********** TESTING need to put things on map to test the gradients work
		
		/*
		if (ograds[4][2][1] === 1) {
			for (let bbb=4; bbb<11; bbb++) {
				chunk_events_[12][bbb] = 1;
			}
		}/**/
		
		
		/*
		ograds = [0,1,2,3,4,5,6,7,8];
		
		/**/
		
		let cidr_events = build_chunk(oheights[0], ograds[0], obiomes[0], 0, chunkx-1, chunky-1);
		let cidT_events = build_chunk(oheights[1], ograds[1], obiomes[1], 0, chunkx, chunky-1);
		let cid7_events = build_chunk(oheights[2], ograds[2], obiomes[2], 0, chunkx+1, chunky-1);
		let cidE_events = build_chunk(oheights[3], ograds[3], obiomes[3], 0, chunkx-1, chunky);
		
		//console.log(chunkx+"-"+chunky);
		let cidO_events = build_chunk(oheights[4], ograds[4], obiomes[4], SHOW_MAP, chunkx, chunky);
	  //console.log("^^^");
		
		let cid3_events = build_chunk(oheights[5], ograds[5], obiomes[5], 0, chunkx+1, chunky);
		let cidL_events = build_chunk(oheights[6], ograds[6], obiomes[6], 0, chunkx-1, chunky+1);
		let cidU_events = build_chunk(oheights[7], ograds[7], obiomes[7], 0, chunkx, chunky+1);
		let cidJ_events = build_chunk(oheights[8], ograds[8], obiomes[8], 0, chunkx+1, chunky+1);
		
			
			
			
		//chunk_events_[8][8] = 1;
		chunk_set[cidr] = { "event": cidr_events,/**/ "b": curr_chunk_ids["r"].b, };
		chunk_set[cidT] = { "event": cidT_events,/**/ "b": curr_chunk_ids["T"].b, };
		chunk_set[cid7] = { "event": cid7_events,/**/ "b": curr_chunk_ids["7"].b, };
		chunk_set[cidE] = { "event": cidE_events,/**/ "b": curr_chunk_ids["E"].b, };
		chunk_set[cidO] = { "event": cidO_events,/**/ "b": curr_chunk_ids["O"].b, };
		chunk_set[cid3] = { "event": cid3_events,/**/ "b": curr_chunk_ids["3"].b, };
		chunk_set[cidL] = { "event": cidL_events,/**/ "b": curr_chunk_ids["L"].b, };
		chunk_set[cidU] = { "event": cidU_events,/**/ "b": curr_chunk_ids["U"].b, };
		chunk_set[cidJ] = { "event": cidJ_events,/**/ "b": curr_chunk_ids["J"].b, };
		
		
		
		
		let chunk_events = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		
		
		// grass and water
		main_map["image_grass_0"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0)); // no grass
		main_map["image_grass_1"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0)); // grass
		main_map["image_grass_2"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0)); // tall grass
		
		main_map["image_deep_water"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		main_map["image_forest"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		main_map["image_bushes"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		
		
		main_map["image_forest_canopy_1"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		main_map["image_forest_canopy_2"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		main_map["image_forest_canopy"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		
		/*
		main_map["image_m_base_wall"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		main_map["image_m_base_plat"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		main_map["image_m_mid_wall"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		main_map["image_m_mid_plat"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		/**/
		main_map["image_cliff_top"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		main_map["image_cliff_face"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		
		//main_map["image_mountain_4"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		//main_map["image_mountain_5"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		//main_map["image_mountain"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		
		main_map["image_snow"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		main_map["image_snow_rocks"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		//main_map["image_mountain_side"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		//let dot_image_mountain = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		
		main_map["image_desert"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		main_map["image_desert_rocks"] = [...Array(3*world_chunk_size+2)].map(_ => Array(3*world_chunk_size+2).fill(0));
		
		main_map["event"] = chunk_events;
		
		
		
		
		// *******  UPDATE current chunk (middle) ********
		//curr_chunk = chunk_set[cidO];
		
		
		
		// chunk_events
		
		//main_map["event"][chy]
		
		//console.log(chunk_set[cidO]["event"]);
		
		/* ------ 2. DOT the 9 tiles ------ 
		
			OR
		
			DOT the bigger 3x3 tilemap
		
		
		*/
		
		
		/*
		
		TODO: for forest, can just put the trunk down. Then, wherever that trunk exists, place sprites on top as an image you can walk under
		
		0 = grass (walkable)
		1 = water (solid)
		2 = forest (solid)
		3 = rocks/mountain (solid, |__| can go thru from top, or |^^| can go thru from bottom, but still u-shaped and n-shaped dotting)
		4 = desert (walkable)
		2 = above (cloud, treetop, cliff-behind, gate, underbridge, etc)
		
		*/
		
		// ****** DOT the maps *******
		
		let chunk_order = [
			[cidO, 16, 16], 
			[cidr, 0, 0],
			[cidT, 16, 0],
			[cid7, 32, 0],
			[cidE, 0, 16],
			[cid3, 32, 16],
			[cidL, 0, 32],
			[cidU, 16, 32],
			[cidJ, 32, 32]
		];
		
		for (let chy=0; chy<world_chunk_size; chy++) {
			for (let chx=0; chx<world_chunk_size; chx++) {
				for (let co=0; co<=8; co++) {
					let cid_ = chunk_order[co][0];
					//console.log(cid_);
					let xx_ = chunk_order[co][1];
					let yy_ = chunk_order[co][2];
					if (chunk_set[cid_]["event"][chy][chx]) {
						
						// setting the chunk map events but...not using them?
						main_map["event"][chy+yy_+1][chx+xx_+1] = chunk_set[cid_]["event"][chy][chx];
						
						if (chunk_set[cid_]["event"][chy][chx] === 1) { // water
							dot_w( main_map["image_grass_1"], chx+xx_+1, chy+yy_+1);
						
						} else if ([11].includes(chunk_set[cid_]["event"][chy][chx])) { // deep water
							dot_w( main_map["image_grass_1"], chx+xx_+1, chy+yy_+1);
							dot_w( main_map["image_deep_water"], chx+xx_+1, chy+yy_+1);
						
						} else if ([20, 21, 22].includes(chunk_set[cid_]["event"][chy][chx])) { // bushes
							dot_w( main_map["image_bushes"], chx+xx_+1, chy+yy_+1);

						} else if ([41, 42].includes(chunk_set[cid_]["event"][chy][chx])) { // 41 is the forest tree trunks
							//dot_w( main_map["image_grass_1"], chx+16+1, chy+16+1);
						
							//dot_w( main_map["image_forest"], chx+16+1, chy+16+1);
							if (chunk_set[cid_]["event"][chy][chx] === 42) {
								/*
								dot_w( main_map["image_forest_canopy_1"], chx+16+1-1, chy+16+1-1);
								... /**/
								
							} else {
								/*
								dot_w( main_map["image_forest_canopy"], chx+16+1-1, chy+16+1-1);
								... /**/
							}
						
						}
						/*else if ([61,62,63,64,6261,6361,6461,6362,6462,6463,610,620,63620,64620,630,640,63610,64610,62610,64630].includes(chunk_set[cid_]["event"][chy][chx])) {
						  let chse0 = chunk_set[cid_]["event"][chy][chx];
							
						  if ([61,6261,6361,6461,6362,610,62610,63610,64610,63620].includes(chse0)) { dot_w( main_map["image_m_base_wall"], chx+xx_+1, chy+yy_+1); }
							if ([62,6261,6362,6462,6463,620,62610,63620,64620,64630].includes(chse0)) { dot_w( main_map["image_m_base_plat"], chx+xx_+1, chy+yy_+1); }
							if ([63,6361,6362,6463,630,63610,63620,64630].includes(chse0)) { dot_w( main_map["image_m_mid_wall"], chx+xx_+1, chy+yy_+1); }
							if ([63,64,6461,6462,6463,630,640,64610,64620,64630].includes(chse0)) { dot_w( main_map["image_m_mid_plat"], chx+xx_+1, chy+yy_+1); }
							
							
							//if ([610,620,63620,64620,630,640,63610,64610,62610,64630].includes(chse0)) {} 
							
						
						} /**/ // 32 33 34
							else if ([31,32,33,35].includes(chunk_set[cid_]["event"][chy][chx])) {
							dot_w( main_map["image_cliff_top"], chx+xx_+1, chy+yy_+1);
						} else if (chunk_set[cid_]["event"][chy][chx] === 34) {
							dot_w( main_map["image_cliff_face"], chx+xx_+1, chy+yy_+1);
							
							
							
							
						} else if (chunk_set[cid_]["event"][chy][chx] === 33) {
							//dot_w( main_map["image_desert_rocks"], chx+xx_+1, chy+yy_+1);
							//dot_w( main_map["image_desert"], chx+xx_+1, chy+yy_+1);
							//dot_w( main_map["image_cliff_edge"], chx+xx_+1, chy+yy_+1);
							
						} else if (chunk_set[cid_]["event"][chy][chx] === 91) {
							dot_w( main_map["image_snow_rocks"], chx+xx_+1, chy+yy_+1);
							dot_w( main_map["image_snow"], chx+xx_+1, chy+yy_+1);
							
						} else if (chunk_set[cid_]["event"][chy][chx] === 110) { // grass paths, etc
							dot_w( main_map["image_grass_0"], chx+xx_+1, chy+yy_+1);
						} else if (chunk_set[cid_]["event"][chy][chx] === 112) { // grass paths, etc
							dot_w( main_map["image_grass_2"], chx+xx_+1, chy+yy_+1);
					
					
						} else if ([400,401,402,403,404].includes(chunk_set[cid_]["event"][chy][chx])) { // flowers
							//chunk_set[cidO]["event"][chy][chx]
						}
					}
					
				}
				
			}
		}
		
		
		//main_map["event"][chy+16+1][chx+16+1] = chunk_set[cid_]["event"][chy][chx];
		
		
		
		/* ------ 3. SET dotted image for 3x3 map ------ 
		need to add +16*T["w_forest_tileset"] or whatever to each of these
		
		
			16 17 18  19 20 21  22 23 24  25 26 27  28 29 30 31
		  32 33 34  35 36 37  38 39 40  41 42 43  44 45 46 47
		  48 49 50  51 52 53  54 55 56  57 58 59  60 61 62 63
		
		/**/
		
		/*
		for (let chy=0; chy<3*world_chunk_size; chy++) {
			for (let chx=0; chx<3*world_chunk_size; chx++) {
				
			}
		}/**/
		
		// mountain, other layers
		/*
		for (let chy=0; chy<world_chunk_size; chy++) {
			for (let chx=0; chx<world_chunk_size; chx++) {
				
			}
		}/**/
		
		
		//mountain_cliff_fill_in_side(main_map["image_mountain_side"])
		
		
		for (let chy=0; chy<3*world_chunk_size; chy++) {
			for (let chx=0; chx<3*world_chunk_size; chx++) {
				render_map_particles.set(chx+0, chy+0, 79); // clean slate for animation
				//render_map_canopy.set(chx+0, chy+0, 79); // clean slate
				//render_map_canopy_1.set(chx+0, chy+0, 79); // clean slate
				//render_map_above.set(chx+0, chy+0, 79); // clean slate
				render_map.set(chx+0, chy+0, 79);
				//render_map_mid.set(chx+0, chy+0, 79); // clean slate
				//render_map_top.set(chx+0, chy+0, 79); // clean slate
				
				
				let tile_ = main_map["event"][chy+1][chx+1];
				
				if (tile_ === 0) {
					//render_map_canopy.set(chx+0, chy+0, main_map["image_forest"][chy+1][chx+1] + 128);
					render_map.set(chx+0, chy+0, 0);
				} else if (tile_ === 1) {
					
					render_map.set(chx+0, chy+0, main_map["image_grass_1"][chy+1][chx+1]);
					//render_map_canopy.set(chx+0, chy+0, main_map["image_forest"][chy+1][chx+1] + 128);
					
				} else if (tile_ === 110) {
					
					render_map.set(chx+0, chy+0, main_map["image_grass_0"][chy+1][chx+1] + 64*5);
					//render_map_canopy.set(chx+0, chy+0, main_map["image_forest"][chy+1][chx+1] + 128);
					
				} else if (tile_ === 111) { 
					//render_map.set(chx+0, chy+0, 11); 
				} else if (tile_ === 112) { 
					render_map.set(chx+0, chy+0, main_map["image_grass_2"][chy+1][chx+1] + 64*4);
					//render_map.set(chx+0, chy+0, 12); 
				} else if (tile_ === 113) { 
					//render_map.set(chx+0, chy+0, 13); 
				} else if (tile_ === 114) { 
					//render_map.set(chx+0, chy+0, 14);
					
					
				} else if (tile_ === 11) {
					render_map.set(chx+0, chy+0, main_map["image_deep_water"][chy+1][chx+1] + 64);
					
					//render_map_f.set(chx+0, chy+0, main_map["image_forest"][chy+1][chx+1]+64);
				} else if (tile_ === 20) {
					render_map.set(chx+0, chy+0, main_map["image_bushes"][chy+1][chx+1] + 64*8);
					
					//render_map_f.set(chx+0, chy+0, main_map["image_forest"][chy+1][chx+1]+64);
				} else if (tile_ === 2) {
					
					
					//render_map_canopy.set(chx+0, chy+0, main_map["image_forest"][chy+1][chx+1] + 128);
					//render_map.set(chx+0, chy+0, 0);
					//render_map_f.set(14,10, 100);
				} else if (tile_ === 3) {
					//console.log("if tile_ === 3");
					//render_map.set(chx+0, chy+0, main_map["image_mountain"][chy+1][chx+1] + 128);
					render_map.set(chx+0, chy+0, main_map["image_desert"][chy+1][chx+1] + 64*11);
				} /*else if (tile_ === 34) { // desert rocks
					//console.log("if tile_ === 3");
					//render_map.set(chx+0, chy+0, main_map["image_mountain"][chy+1][chx+1] + 128);
					render_map.set(chx+0, chy+0, main_map["image_desert_rocks"][chy+1][chx+1] + 64*6);
					
					
					
				}/**/ else if (tile_ === 31) {
					render_map.set(chx+0, chy+0, main_map["image_cliff_top"][chy+1][chx+1] + 64*20);
				} else if (tile_ === 32) { // left cliff  _Γ
					render_map.set(chx+0, chy+0, 32 + 64*20);
				} else if (tile_ === 33) { //right cliff  7_
					render_map.set(chx+0, chy+0, 34 + 64*20);
				} else if (tile_ === 34) {
					render_map.set(chx+0, chy+0, main_map["image_cliff_face"][chy+1][chx+1] + 64*21);
				} else if (tile_ === 35) {
					render_map.set(chx+0, chy+0, main_map["image_cliff_top"][chy+1][chx+1] + 64*20);
					
					
					
				} else if (tile_ === 4) {
					//render_map.set(chx+0, chy+0, main_map["image_desert"][chy+1][chx+1] + 192);
					
				} 
				
				else if ([40,41,42,43,44,45].includes(tile_)) { // tree randomizer (should be set in f_chunk or the other chunk methods)
					
					//render_map.set(chx+0, chy+0, 0);
					//render_map_canopy.set(chx+0, chy+0, 139);
				} 
				
				else if (tile_ === 41) { // tree base + trunk
					//console.log("set 41");
					//render_map.set(chx+0, chy+0, 0);
					render_map.set(chx+0, chy+0, 140); // **** TREE ****
					//try { render_map_above.set(chx+0, chy+0-1, 139); } catch {}
					//try { render_map_above.set(chx+0, chy+0-2, 139); } catch {}
					//try { render_map_above.set(chx+0, chy+0-3, 139); } catch {}
					
					// set the mob info
					
				}
				
				else if (tile_ === 42) { // tree base + trunk
					//console.log(41+64);
					//render_map.set(chx+0, chy+0, 0);
					render_map.set(chx+0, chy+0, 140+64); // **** TREE **** base
					
					/*
					main_map["image_forest_canopy"][chy+1][chx+1]+= 64;
					main_map["image_forest_canopy"][chy+1-1][chx+1-1]+= 64;
					main_map["image_forest_canopy"][chy+1-1][chx+1]+= 64;
					main_map["image_forest_canopy"][chy+1-1][chx+1+1]+= 64;
					main_map["image_forest_canopy"][chy+1][chx+1-1]+= 64;
					main_map["image_forest_canopy"][chy+1][chx+1+1]+= 64;
					main_map["image_forest_canopy"][chy+1+1][chx+1-1]+= 64;
					main_map["image_forest_canopy"][chy+1+1][chx+1]+= 64;
					main_map["image_forest_canopy"][chy+1+1][chx+1+1]+= 64;
					/**/
					
					//try { render_map_above.set(chx+0, chy+0-1, 139+64); } catch {}
					//try { render_map_above.set(chx+0, chy+0-2, 139+64); } catch {}
					//try { render_map_above.set(chx+0, chy+0-3, 139+64); } catch {}
					//try { render_map_above.set(chx+0, chy+0-4, 139+64); } catch {}
					//try { render_map_above.set(chx+0, chy+0-5, 139+64); } catch {}
					
					//let tree_type = chunk_set[cidO]["event"][chy][chx] === 42 ? 64 : 0;
					//main_map["image_m_base_plat"]
				} else if ([/*61,62,63,64,/**/6261,6361,6461,6362,6462,6463,610,620,630,640,62610,63610,64610,63620,64620,64630].includes(tile_)) {
					
					/*
					let bw = main_map["image_m_base_wall"][chy+1][chx+1];
					let bp = main_map["image_m_base_plat"][chy+1][chx+1];
					let mw = main_map["image_m_mid_wall"][chy+1][chx+1];
					let mp = main_map["image_m_mid_plat"][chy+1][chx+1];
					/**/
					
					if (bw || (bp && bp !== 33) || mw || (mp && mp !== 33)) {
						
						//try { chunk_set["collision_event"][chy-16][chx-16] = 1; } catch {}
						//try { chunk_set[cidT]["collision_event"][chy][chx-16] = 1; } catch {}
						//try { chunk_set[cidU]["collision_event"][chy-32][chx-16] = 1; } catch {}
						//try { chunk_set[cidE]["collision_event"][chy-16][chx] = 1; } catch {}
						//try { chunk_set[cid3]["collision_event"][chy-16][chx-32] = 1; } catch {}
						//try { chunk_set[cidU]["collision_event"][chy-32][chx-16] = 1; } catch {}
					} else {
						render_map.set(chx+0, chy+0, 0);
					}
					
			  } else if (tile_ === 61999) {
					if (main_map["image_m_base_wall"][chy+1][chx+1]) {
						//try { chunk_set[cidO]["event"][chy-16][chx-16] = 60; } catch {}
						//chunk_set[cidO]["collision_event"]
						try { chunk_set[cidO]["collision_event"][chy-16][chx-16] = 1; } catch {}
					}
					let rock_type = 9;
					//render_map.set(chx+0, chy+0, main_map["image_m_base_wall"][chy+1][chx+1] + rock_type*64 );
					
				} else if (tile_ === 62999) {
					let rock_type = 7;
					//if (main_map["image_m_base_plat"][chy+1][chx+1] !== 33) {
						//try { chunk_set[cidO]["collision_event"][chy-16][chx-16] = 1; } catch {}
						//try { curr_chunk["event"][chy-16][chx-16] = 60; } catch {}
						//render_map_mid.set(chx+0, chy+0, main_map["image_m_base_plat"][chy+1][chx+1] + rock_type*64 );
						
						//} else {
						//render_map.set(chx+0, chy+0, 0);
						
						//}
				} else if (tile_ === 63999) {
					let rock_type = 9;
					//render_map_mid.set(chx+0, chy+0, main_map["image_m_mid_wall"][chy+1][chx+1] + rock_type*64 );
					if (main_map["image_m_mid_wall"][chy+1][chx+1]) {
						try { chunk_set[cidO]["collision_event"][chy-16][chx-16] = 1; } catch {}
					}
					
				} else if (tile_ === 64999) {
					let rock_type = 7;
					//render_map_top.set(chx+0, chy+0, main_map["image_m_mid_plat"][chy+1][chx+1] + rock_type*64 );
					/*if (main_map["image_m_mid_plat"][chy+1][chx+1] !== 33) {
						try { chunk_set[cidO]["collision_event"][chy-16][chx-16] = 1; } catch {}
					}/**/
					
				} else if (tile_ === 6362999) {
					let rock_type = 9;
					//render_map_mid.set(chx+0, chy+0, main_map["image_m_mid_wall"][chy+1][chx+1] + rock_type*64 );
					
				} else if (tile_ === 6462999) {
					let rock_type = 7;
					//render_map_mid.set(chx+0, chy+0, main_map["image_m_mid_plat"][chy+1][chx+1] + rock_type*64 );
					
				} else if (tile_ === 6361999) {
					let rock_type = 9;
					//render_map_mid.set(chx+0, chy+0, main_map["image_m_mid_wall"][chy+1][chx+1] + rock_type*64 );
					
				} else if (tile_ === 6461999) {
					let rock_type = 7;
					//render_map_mid.set(chx+0, chy+0, main_map["image_m_mid_plat"][chy+1][chx+1] + rock_type*64 );
					
				} else if (tile_ === 6261999) {
					let rock_type = 7;
					//render_map_mid.set(chx+0, chy+0, main_map["image_m_base_plat"][chy+1][chx+1] + rock_type*64 );
					
				} else if (tile_ === 6463999) {
					let rock_type = 7;
					//render_map_top.set(chx+0, chy+0, main_map["image_m_mid_plat"][chy+1][chx+1] + rock_type*64 );
					
				
				} else if (tile_ === 65) { // stairs
					render_map.set(chx+0, chy+0, 64*9 + 11);
					
				
				} else if (tile_ === 70) { // slope
					render_map.set(chx+0, chy+0, 64*10 + 0);
					
				} else if (tile_ === 71) { // slope
					render_map.set(chx+0, chy+0, 64*10 + 3);
					
				} else if (tile_ === 72) { // slope
					render_map.set(chx+0, chy+0, 64*10 + 4);
					
				} else if (tile_ === 73) { // slope
					render_map.set(chx+0, chy+0, 64*10 + 1);
					
				} else if (tile_ === 74) { // slope
					render_map.set(chx+0, chy+0, 64*10 + 2);
					
				} else if (tile_ === 75) { // slope
					render_map.set(chx+0, chy+0, 64*10 + 4);
					
				} else if (tile_ === 76) { // slope
					render_map.set(chx+0, chy+0, 64*10 + 3);
					
				
				
				} else if (tile_ === 9) { // snow
					render_map.set(chx+0, chy+0, main_map["image_snow"][chy+1][chx+1] + 64*19);
					
				// snow 
				
				} else if (tile_ === 91) { // mountainsnow rocks
					//render_map.set(chx+0, chy+0, 64*7 + 36);
					render_map.set(chx+0, chy+0, main_map["image_snow_rocks"][chy+1][chx+1] + 64*19);
				
				
				} else if (tile_ === 100) { // forest
					render_map.set(chx+0, chy+0, 141);
					//console.log("lll");
				} else if (tile_ === 101) {
					//console.log("f");
					render_map.set(chx+0, chy+0, 142);
				} else if (tile_ === 120) { 
					render_map.set(chx+0, chy+0, 5*64+39); 
				
				} else if ([400,401,402,403,404,405].includes(tile_)) { // flowers. 400 is the flower randomizer
					//console.log("flowers: "+(tile_-400));
					//render_map.set(chx+0, chy+0, 16*64+(400-tile_));
					render_map.set(chx+0, chy+0, 16*64+(tile_-400));
				}// testing
			}
		}
		
		// need to change image before displaying it
		
		// tree canopy
		/*
		for (let chy=0; chy<3*world_chunk_size; chy++) {
			for (let chx=0; chx<3*world_chunk_size; chx++) {
				let tree_type = main_map["event"][chy][chx] === 42 ? 64 : 0;
				
				if (main_map["image_forest_canopy"][chy][chx]) {
					
					//console.log(tree_type);
					
					render_map_canopy.set(chx+0, chy+0, main_map["image_forest_canopy"][chy][chx] + 128);
				}
				if (main_map["image_forest_canopy_1"][chy][chx]) {
					
					//console.log(tree_type);
					
					render_map_canopy_1.set(chx+0, chy+0, main_map["image_forest_canopy_1"][chy][chx] + 128+64);
				}
			}
		}*/
		//console.log("jjjjjjjj");
		/*
		for (let chy=0; chy<3*world_chunk_size; chy++) {
			for (let chx=0; chx<3*world_chunk_size; chx++) {
				let m_edge = main_map["image_mountain"][chy+1][chx+1];
				
				if (m_edge === 48) { // avoid tree trunks and other things
					try { render_map.set(chx+0, chy+1, 48 + 5*64 ); } catch {}
				} else if (m_edge === 49) {
					try { render_map.set(chx+0, chy+1, 49 + 5*64 ); } catch {}
				} else if (m_edge === 50) {
					try { render_map.set(chx+0, chy+1, 50 + 5*64 ); } catch {}
				}
			}
		}/**/
		
		/*
		for (let chy=0; chy<3*world_chunk_size; chy++) {
			for (let chx=0; chx<3*world_chunk_size; chx++) {
				//let tile_ = main_map["image_grass_1"][chy+1][chx+1];
				render_map.set(chx+0, chy+0, main_map["image_forest"][chy+1][chx+1]);
				//render_map_m.set(chx+0, chy+0, main_map["image_forest"][chy+1][chx+1]); // need to change to sprites if we want to be able to walk under them
			}
		}/**/
		
		
		
		
		
		for (let chy=0; chy<48; chy++) {
			for (let chx=0; chx<48; chx++) {
				try {
					if (render_map.items[chx][chy].sprite === 33) {
						render_map_particles.set(chx, chy, 75+p_frame);
					}
				} catch {}
			}
		}
		
		//drawImageFromArray();
	}
	
	
	/*{
  "x": 0,
  "y": 10,
  "sprite": 0,
  "flipH": false,
  "flipV": false,
  "flipR": false,
  "flagA": false,
  "flagB": false
} /**/
	//if (p_dt === 0) {
		
		//}	
	/*
	if (p_frame_change) {
		p_frame_change = 0;
		for (let chy=0; chy<3*world_chunk_size; chy++) {
			for (let chx=0; chx<3*world_chunk_size; chx++) {
				if (render_map.items[chy][chx].sprite === 33) {
					//render_map_particles.set(chx, chy, 33+p_frame);//items[chy][chx].sprite = 33+p_dt;
				}
			}
		}
	}
	/**/
		
	curr_chunk = chunk_set[cidO];
	
	
	//console.log(chunk_count);
	
	flush_chunk_set(chunkx, chunky);
	
}






// this is to prevent too much memory being used
function flush_chunk_set(cx, cy) {
	//let chunkO = cx+"_"+cy;
  //[ "0_0", "-1_-1", "0_-1", "1_-1", "-1_0", "1_0", "-1_1", "0_1", "1_1" ]
	
	//for (let cxmin=cx)
	// create list of ones to remove
	//let keys = Object.keys(chunk_set);
	
	/*
	const filteredArray = keys.filter(item => {
	  const [x, y] = item.split('_').map(num => parseInt(num));
	  return cx-2 <= x && x <= cx+2 && cy-2 <= y && y <= cy+2;
	});
	*/
	//let new_chunk_set = {};
	
	let render_distance = 3;
	
	for (const [key, value] of Object.entries(chunk_set)) {
		const [x, y] = key.split('_').map(num => parseInt(num));
	  if (!(cx-render_distance <= x && x <= cx+render_distance && cy-render_distance <= y && y <= cy+render_distance)) {
	    delete chunk_set[key];
		}
	}
	
	//chunk_set = new_chunk_set;
	//console.log(new_chunk_set);
	
}
















var CHUNK_X_OFFSET = 0;
var CHUNK_Y_OFFSET = 32;
var CANOPY_X_OFFSET = 1;
var CANOPY_Y_OFFSET = 5;
var ABOVE_X_OFFSET = 0;
var ABOVE_Y_OFFSET = 0;

function draw_world_chunks() {
	
	let n_x = pw.x < 0 ? 128 : 0;
	let n_y = pw.y < 0 ? 128 : 0;
	let pwx8 = Math.floor(pw.x/8);
	let pwy8 = Math.floor(pw.y/8);
	let pwx8_pacman = pwx8 < 0 ? 16+pwx8%16 : pwx8%16;
	let pwy8_pacman = pwy8 < 0 ? 16+pwy8%16 : pwy8%16;
	
	
	/*
	sprite(pw_sheet_id+(pframe*2), XMID-4-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge-PLAYER_Y_WORLD_OFFSET, going_left);
	sprite(pw_sheet_id+1+(pframe*2), XMID-4-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge-PLAYER_Y_WORLD_OFFSET, going_left);
	sprite(pw_sheet_id+16+(pframe*2), XMID-4-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+8-PLAYER_Y_WORLD_OFFSET, going_left);
	sprite(pw_sheet_id+17+(pframe*2), XMID-4-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+8-PLAYER_Y_WORLD_OFFSET, going_left);
	sprite(pw_sheet_id+32+(pframe*2), XMID-4-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+16-PLAYER_Y_WORLD_OFFSET, going_left);
	sprite(pw_sheet_id+33+(pframe*2), XMID-4-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge-16+bottom_edge+16-PLAYER_Y_WORLD_OFFSET, going_left);
	
	*/
	
	/*
	draw(render_r, 0-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_T, 128-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_7, 256-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_E, 0-(pw.x%128+n_x), 128-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_O, 128-(pw.x%128+n_x), 128-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_3, 256-(pw.x%128+n_x), 128-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_L, 0-(pw.x%128+n_x), 256-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_U, 128-(pw.x%128+n_x), 256-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_J, 256-(pw.x%128+n_x), 256-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	/**/
	
	
	draw(render_map, 0-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	
	draw(render_map_particles, 0-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	
	if (M_LAYER === -1) {
		draw_player_1();
	} else if (M_LAYER === 0) {
		throw 0;
		draw_mount_behind(pwx8_pacman, pwy8_pacman);
		draw_trees_behind();
		draw_player_1();
		draw_mount_front(pwx8_pacman, pwy8_pacman);
		draw_trees_front();
		//draw(render_map_mid, 0-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
		//draw(render_map_top, 0-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	} else if (M_LAYER === 1) {
		throw 0;
		//draw(render_map_mid, 0-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
		draw_mount_behind(pwx8_pacman, pwy8_pacman);
		draw_trees_behind();
		draw_player_1();
		draw_mount_front(pwx8_pacman, pwy8_pacman);
		draw_trees_front();
		//draw(render_map_top, 0-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	} else if (M_LAYER === 2) {
		throw 0;
		//draw(render_map_mid, 0-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
		//draw(render_map_top, 0-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
		draw_mount_behind(pwx8_pacman, pwy8_pacman);
		draw_trees_behind();
		draw_player_1();
		draw_mount_front(pwx8_pacman, pwy8_pacman);
		draw_trees_front();
	}/**/
	
	
	
	//draw(render_map_m, 0-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	
	/*
	draw(render_r_m, 0-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_T_m, 128-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_7_m, 256-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_E_m, 0-(pw.x%128+n_x), 128-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_O_m, 128-(pw.x%128+n_x), 128-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_3_m, 256-(pw.x%128+n_x), 128-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_L_m, 0-(pw.x%128+n_x), 256-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_U_m, 128-(pw.x%128+n_x), 256-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	draw(render_J_m, 256-(pw.x%128+n_x), 256-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	/**/
			
	
	//draw(visible_world, XMID-pw.x, YMID-pw.y);
	
	
	
	
	//let ttcx = pw.cx >= 0 ? pw.cx-1 : pw.cx;
	//let ttcy = pw.cy >= 0 ? pw.cy-1 : pw.cy;
	//let tupleToCheck = [ttcx, ttcy];
	let tupleToCheck = [pw.cx, pw.cy];
	let cbs = curr_chunk_ids["O"].b.special;
	
	print("x y  : "+pw.x+" "+pw.y, 8, 8);
	print("grid : "+pwx8+" "+pwy8+" /  "+pwx8_pacman+" "+pwy8_pacman, 8, 16);
	print("chunk: "+pw.cx+" "+pw.cy+"  (total: "+Object.keys(chunk_set).length+")", 8, 24);
	print("biome height:  "+curr_chunk_ids["O"].b.height, 8, 32);
	/*
	if (curr_chunk_ids["O"].b.biome2 === "M") {
		print("   secondary biome type: Mount ", 128, 32);
	} else {
		print("   secondary biome type: "+curr_chunk_ids["O"].b.biome, 128, 32);
	}/**/
	
	print("biome shape: "+curr_chunk_ids["O"].s, 8, 40);
	print("biome diff: "+curr_chunk_ids["O"].b.difficulty, 8, 48);
	
	print("bvi: "+
	  curr_chunk_ids["O"].b.bvi[0]+" "+
		curr_chunk_ids["O"].b.bvi[1]+" "+
		curr_chunk_ids["O"].b.bvi[2]+" "+
		curr_chunk_ids["O"].b.bvi[3]+" "+
	  curr_chunk_ids["O"].b.bvi[8], 
	8, 176);
	
	//print("slope: "+curr_chunk_ids["O"].b.slope, 8, 184);
	//print("gap: "+curr_chunk_ids["O"].b.gap, 64, 184);
	
	if (cbs.length > 0) {
		
		print(cbs.length+" specials:", 8, 56)
		for (let i=0; i<cbs.length; i++) {
			print(" "+cbs[i], 8, 64+(i*8));
		}
		if (cbs.some(subArray => subArray.toString() === tupleToCheck.toString())) {
			print("!!! "+pw.cx+" "+pw.cy, 64,128);
		}
	}
	
	//print(tupleToCheck, 64,128);
	//print(curr_chunk_ids["O"].b.special, 64,136);
	
	
	
	//console.log(tupleExists);
	
	/*
	
		"biome": biome,
		"difficulty": difficulty,
		"color": color,
		"special": xyo,
	};
	*/
	
	//console.log(curr_chunk_ids["O"]);
	
	
	
	
	
	
}


function draw_world_chunks_canopy() {
	
	let n_x = pw.x < 0 ? 128 : 0;
	let n_y = pw.y < 0 ? 128 : 0;
	
	
	draw(render_map_above, 0-(pw.x%128+n_x)-ABOVE_X_OFFSET*8, 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET-ABOVE_Y_OFFSET*8);
	draw(render_map_canopy, 0-(pw.x%128+n_x)-CANOPY_X_OFFSET*8, 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET-CANOPY_Y_OFFSET*8);
	draw(render_map_canopy_1, 0-(pw.x%128+n_x)-CANOPY_X_OFFSET*8, 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET-CANOPY_Y_OFFSET*8);
	
	
}



function draw_world_particles() {
	//let n_x = pw.x < 0 ? 128 : 0;
	//let n_y = pw.y < 0 ? 128 : 0;
	
	//sprite(14, 0-(pw.x%128+n_x), 0-(pw.y%128+n_y)-32);
	//draw(render_map_particles, 0-(pw.x%128+n_x), 0-(pw.y%128+n_y)-CHUNK_Y_OFFSET);
	
	if (p_frame_change) {
		p_frame_change = 0;
		for (let chy=0; chy<48; chy++) {
			for (let chx=0; chx<48; chx++) {
				try {
					if (render_map.items[chx][chy].sprite === 33) {
						render_map_particles.set(chx, chy, 75+p_frame);
					}
				} catch {}
			}
		}
	}
	
}



// curr_area is the object, current_area is the index



//console.log("hello thal");

//start_music();

var l_offset = 0;
var u_offset = 0;
const info_box_offset = 0;//48;
function update_level() {
	
	update_setting_gamepad();
	
	// if (finished_animation)  
	if (activated_area > -1 || activate_reenter_bexit > -1) {
		//console.log("... "+ready_enter_door["gotox"]*8+" "+ready_enter_door["gotoy"]*8);
		//console.log("activated area")
		//music();
		//console.log("update_level(): attempting to go from area "+current_area+" to "+activated_area);
		if (opening_door || entering_door) {
			//console.log("update_level(): if (entering === 2) TRUE   { update_door("+activated_area+") ... }");
			console.log("  entering door");
			//update_door(activated_area);
			//entering = 0;
			//activated_area = -1;
			//ready_enter_door = {};
		} else {
			//console.log("CHANGING curr_area. activated_area: "+activated_area+"  entering: "+entering+"  "+ready_enter_door["gotox"]+" "+ready_enter_door["gotoy"]);
			
			if (activated_area > -1) {
				curr_area = newLevel.areas[activated_area];
				current_area = activated_area;
				
				p.x = ready_enter_door["gotox"]*8;
				p.y = ready_enter_door["gotoy"]*8;
				//console.log("checking  "+ready_enter_door["gotox"]+" "+ready_enter_door["gotoy"]);
				p2.x = ready_enter_door["gotox"]*8;
				p2.y = ready_enter_door["gotoy"]*8;
				
				
			} else if (activate_reenter_bexit > -1) {
				curr_area = newLevel.areas[activate_reenter_bexit];
				current_area = activate_reenter_bexit;
				
			}
			ready_enter_door = {};
			//console.log("??? "+p.x+" "+p.y);
			
			
			level_image_ = curr_area["image"];
			level_image_behind = curr_area["image_behind"];
			level_image_front = curr_area["image_front"];//new TileMap(width, height);
			
			
			level_grid_ = curr_area["grid"];//[...Array(height)].map(_ => Array(width).fill(0));
			level_events_ = curr_area["event_grid"];
			width = curr_area["width"]; // 32 is one 'screen', 64 is two 'screens' 
			height = curr_area["height"];
			rt = width-1;
			bm = height-1;
			level_pixel_width = width*8;
			level_pixel_height = height*8;
			
			
			
			
			//curr_music = music_library[curr_area["terrain"]]; // random for each terrain?
			//start_music();
			//console.log("switched! should be in area "+current_area+" at coordinate ("+p.x+", "+p.y+")");
			// activated door should be the key for that door list [0,2,3] etc.
		
			activated_area = -1;
			activate_reenter_bexit = -1;
			
			start_music();
		}
		//start_music();
		//activated_area = -1;
	}
	
	//let jj = level_image_.get(2,5)
	//console.log(jj);
	//console.log(level_image_.get(0,31));
	//checkBlockIds(2, 5);
	
	
	
	
	
	
	
  update_moving_platforms(); //takes priority over player
  
  //check_platform_collision();
  
  player1_movement();
	
	
	//console.log("after player movement");
  player2_movement();
	
	if (paused) {
		debug_print();
		return;
	}
  
  player1_animation();
  player2_animation();
  
  projectile_update(); // update takes care of movement and animation
  
  update_small_enemies();
	
	
	
  // drawing
  cls();
	background_scroll(curr_area["terrain"]);
	
	// need to calculate difference for right side of screen
	if (level_pixel_width == SCREEN_WIDTH) {
		l_offset = 0;
	} else {
		if (left_edge == 0) {
			l_offset = SCREEN_WIDTH-XMID;
		} else {
			l_offset = 0;
		}
	
		if (right_edge == 0) {
			//console.log("right_edge == 0")
		} else {
			l_offset = -(level_pixel_width - SCREEN_WIDTH); // ?
		}
	}
	
	
	
	
	
	if (level_pixel_height == SCREEN_HEIGHT) {
		u_offset = 0;
	} else {
		if (top_edge == 0) {
			u_offset = SCREEN_HEIGHT-YMID;
		} else {
			u_offset = 0;
		}
	
		if (bottom_edge == 0) {
		} else {
			u_offset = -(level_pixel_height - SCREEN_HEIGHT); // ?
		}
	}
	// need to calculate difference for top of screen
	
	
	// switching tilesheets takes up memory
	
	
	// going right
	// l_offset: 0    lfe: 0   rte: 1
	// l_offset: 0    lfe: 1   rte: 1     <---- faulty frame
	// l_offset: 128    lfe: 1   rte: 1
	//
	// going left
	// l_offset: 128    lfe: 1   rte: 1
	// l_offset: 128    lfe: 0   rte: 1   <---- faulty frame
	// l_offset: 0    lfe: 0   rte: 1
	//
	//if (lfe*rte == 1) {
	//	l_offset = SCREEN_WIDTH-XMID;
	//}
	//console.log(top_edge+" "+bottom_edge+" "+left_edge+" "+right_edge);
	//tilesheet(ts_terrain);
	
	
	
	
	
	draw(level_image_behind, l_offset-p.x*lfe*rte, u_offset-p.y*tpe*bte-info_box_offset);
	draw(level_image_, l_offset-p.x*lfe*rte, u_offset-p.y*tpe*bte-info_box_offset);
	
	
	
	
	//tilesheet(ts_1); // could have separate one for objects
	
	draw_doors();
  draw_moving_platforms();
	
	draw_items(); // include animations
	
  //tilesheet(ts_se);
  draw_small_enemies();
  
  //tilesheet(ts_2);
	
	//print(p.x+" ", 64);
  // draw 6 player 2 sprite tiles:
  sprite(psheet2[0]+(pframe2*2), l_offset+p2.x-XOFFSET+(8*going_left2)-p.x*lfe*rte, u_offset+p2.y-YOFFSET-p.y*tpe*bte-info_box_offset, going_left2);
  sprite(psheet2[1]+(pframe2*2), l_offset+p2.x+8-XOFFSET-(8*going_left2)-p.x*lfe*rte, u_offset+p2.y-YOFFSET-p.y*tpe*bte-info_box_offset, going_left2);
  sprite(psheet2[2]+(pframe2*2), l_offset+p2.x-XOFFSET+(8*going_left2)-p.x*lfe*rte, u_offset+p2.y+8-YOFFSET-p.y*tpe*bte-info_box_offset, going_left2);
  sprite(psheet2[3]+(pframe2*2), l_offset+p2.x+8-XOFFSET-(8*going_left2)-p.x*lfe*rte, u_offset+p2.y+8-YOFFSET-p.y*tpe*bte-info_box_offset, going_left2);
  sprite(psheet2[4]+(pframe2*2), l_offset+p2.x-XOFFSET+(8*going_left2)-p.x*lfe*rte, u_offset+p2.y+16-YOFFSET-p.y*tpe*bte-info_box_offset, going_left2);
  sprite(psheet2[5]+(pframe2*2), l_offset+p2.x+8-XOFFSET-(8*going_left2)-p.x*lfe*rte, u_offset+p2.y+16-YOFFSET-p.y*tpe*bte-info_box_offset, going_left2);
  
  //tilesheet(ts_1);
  // draw 6 player 1 sprite tiles:
  sprite(psheet[0]+(pframe*2), XMID-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge-YOFFSET+bottom_edge-info_box_offset, going_left);
  sprite(psheet[1]+(pframe*2), XMID-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge-YOFFSET+bottom_edge-info_box_offset, going_left);
  sprite(psheet[2]+(pframe*2), XMID-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge+8-YOFFSET+bottom_edge-info_box_offset, going_left);
  sprite(psheet[3]+(pframe*2), XMID-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge+8-YOFFSET+bottom_edge-info_box_offset, going_left);
  sprite(psheet[4]+(pframe*2), XMID-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge+16-YOFFSET+bottom_edge-info_box_offset, going_left);
  sprite(psheet[5]+(pframe*2), XMID-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge+16-YOFFSET+bottom_edge-info_box_offset, going_left);
  
	//tilesheet(ts_m);
	//draw(level_image_front, l_offset-p.x*lfe*rte, u_offset-p.y*tpe*bte-info_box_offset);
  
	//tilesheet(ts_1);
	draw_projectiles();
	
	draw_weather();
	
	draw_minimap();
  
  // for whichever sprites are 'in' the window view
  // (condition is just whether sprites are within some distance from the player)
  
  //draw(info_bar, 0, SCREEN_HEIGHT-info_box_offset)
  
  if (test_toggle_anim) {
    draw(face[face_frames[face_frame]], 16, 16);//SCREEN_HEIGHT-48);
    
  }
	
	if (debug_on) {
		debug_print();
	}
  
  
  /*
  let thisLoop = Date.now();
  fps = Math.round(1000 / (thisLoop - lastLoop));
  lastLoop = thisLoop;
	*/
	
	toggle_speed();
} 




//console.log(newLevel.info());

/* ========================== DEBUGGING ============================== */
function debug_print() {
	//print(newLevel.info(), 0, 0);
	
  //sprite(128+pwalkframe, p.x, p.y, going_left);
  //debug_msg = score+" p.y= "+p.y+"   grid["+pgridy+"]["+pgridx+"]= "+grid[pgridy][pgridx]+"    f= "+f;
  //print(can_wall_jump);
  //debug_msg = "grn: "+grounded+" jmp: "+jumping+" fll:";
	//let lvl = current_level+"\n";
	anm  = test_toggle_anim? "..anm: on": "anm: off";
	let gr_jm_cl = " g-"+grounded+" j-"+jumping+" c-"+climbing;
	debug_msg = l_offset+" ";
  
	//multip = player_combo();
  fps_display = fps < 45? fps+"   LAG!":fps;
  
  debug_msg = debug_msg+" "+enemy_test+" "+dt+" "+(dt - combo_start)+" "+combo+" ";
   
	let area_string = current_area == newLevel.finalArea ? " BOSS " : current_area;
	print(dt, 200,0);
	print("         area: "+area_string+"   x"+p.x+" y"+p.y, 24, 0); //+" keys: "+has_key
	print("key: "+has_key, 8, 0);
	print("nutmeg: "+nutmeg, 8, 8);
	print("sugar:  "+sugar, 8, 16);
	print("pepper: "+cayenne, 8, 24);
	print("enemies: "+curr_area["small_enemies"].length, 8, 32);
	print("activated_area: "+activated_area, 8, 48);
	print("trying_door_fail: "+trying_door_fail, 8, 56);
	print("unlocking_door: "+unlocking_door, 8, 64);
	print("opening_door: "+opening_door, 8, 72);
	print("combo: "+combo, 8, 80);
	print("gsp: "+groundsavepoint[0]+", "+groundsavepoint[1], 8, 88);
	
	//print("ready_door: "+ready_enter_door["gotox"]+" "+ready_enter_door["gotoy"], 8, 72);
	
	
	//print(WHATAMI, 8, 8);
	print(newLevel.area_info(current_area), 120, 20);
  print(score, 100, 16);
  //print("Thal: ("+p.x+", "+p.y+")  Enx: ("+p2.x+", "+p2.y+")  combo: +"+combo, 100, 24);
  
	// going right
	// l_offset: 0    lfe: 1   rte: 1
	// l_offset: 0    lfe: 0   rte: 1     <---- faulty frame
	// l_offset: 128    lfe: 1   rte: 1
	//
	// going left
	// l_offset: 128    lfe: 1   rte: 1
	// l_offset: 128    lfe: 0   rte: 1   <---- faulty frame
	// l_offset: 0    lfe: 0   rte: 1
	//
	
  //print(debug_msg, 8, SCREEN_HEIGHT-54);
  //print(debug_msg);
  //print(going_left*1);
  //print(grid[pgridy][pgridx]+" j:"+jumping+" j["+j+"]:"+jump[j]+"  g:"+grounded, 0, 0);
  //print(p.x+" "+p.y+"  grid["+pgridy+"]["+pgridx+"] = "+grid[pgridy][pgridx]);
  debug_msg = "";
	//print("l_edge:"+left_edge+" p.x:"+p.x+" r_edge:"+right_edge+"  l_offset:"+l_offset, 32,0)
  
}







/* ========================= TIMED EVENTS =========================== */
var dt = 0;
var frame_dt = 0;
var max_dt = 1; // change 'speed' of game
var lastLoop = 1;
var fps = 0;
var fps_display = 0;

// particles
var p_dt = 0;
var p_dt_max = 5;
var p_frame = 0;
var p_max_frames = 4;
var p_frame_change = 0;



function toggle_speed() {
	if (btn.gs2) {
		max_dt = 1;
		print("x2 speed", 64, 8);
	} else if (btn.gs1){
		max_dt = 2;
		print("x1 speed", 64, 8);
	}
}

// timed events:
function player_combo() {
  if (dt - combo_start > 60) combo = 0;
  combo_start = dt;
  combo++;
  let multiplier = 1;
  if (combo >= 4) multiplier = 2;
  if (combo >= 10) multiplier = 3;
  
  return multiplier;
}


/* ========================== MUSIC =============================== */
// music('bgm'); //play the bgm.mp3 file in loop; 
/* if another music is already playing, it will cross fade to the new music; 
		if no soundId is provided, music stops
*/

function start_music() {
	// each area type has 1 to 3 songs? want just enough to not feel repetitive
	
	if (0) {
		curr_area = newLevel.areas[current_area];
		//music();
		// curr_area["terrain"]
		if (current_area == newLevel.finalArea) {
			// BOSS music
		}
	
		else if (["ground"].includes(curr_area["terrain"])) {
			music('Theme3Day', 0.3); // outdoor day
		}
		else if (["towergroundleft", "towergroundright", "towerground", "towerleft", "towerright"].includes(curr_area["terrain"])) {
			music('testA', 0.3); // castle
		} 
		else if (["insidecave", "underground"].includes(curr_area["terrain"])) {
			music('Theme2Night', 0.3); // outdoor night
		} 
		else if (["peak", "peakleft", "peakright"].includes(curr_area["terrain"])) {
			music('Theme2Day', 0.3); // castle
		} else {
			music('testA', 0.3); // castle
		}
	}
	
	
	
	
}

//console.log(gamepads[0].buttons);
//exports.gamepad;

var gamepad1 = null;

function update_setting_gamepad() {
	//print("Press any button to continue.", 8, 16);
	
	
	if (gamepads[0].available) {
		//print("gamepad detected.");
		gamepad1 = gamepads[0];
		//console.log(gamepads[0].btnp);
		//return "level";
	} else {
		gamepad1 = null;
	}
	/*else {
		if (btn.A) {
			return "level";
		}
	}/**/
	
	
	
	//return "wait_gamepad";
}

/* ========================== UPDATE ============================== */
var state = "world";

exports.update = function () {
  
	frame_dt++;
	if (frame_dt >= max_dt) {
		frame_dt = 0;
		
		// animation
		p_dt++;
		if (p_dt >= 20) {
			p_dt = 0;
			p_frame_change = 1;
			p_frame++;
			if (p_frame >= 4) {
			  p_frame = 0;	
			}
		}
		
		dt++;
	  switch (state) {
	    case "title":
	      update_title();
	      break;
	    case "scene":
	      update_scene();
	      break;
	    case "world":
	      update_world();
	      break;
	    case "level":
	      update_level();
	      break;
	  }
	}
	
	
  
	//let gp = gamepads[0];
	//console.log(gp.btn);
	//let gp_state = gamepad.buttons; // get state of gamepad id 0
  //score++;

};

	/*
	p_dt++;
	if (p_dt >= p_dt_max){
		p_dt = 0;
		p_frame++;
		if (p_frame >= p_max_frames) {
			p_frame = 0;
/**/



/*

----------
current TODO:


50130

50521
62986

With helmet, you dont lose oxygen.
Without helmet, you get more points.



- weather effects?
  got rain




finishing a level faster gets you more points


- fall down all dizzy when 'dying' in the level, takes you back to start of level
- dying in the over world

entrance to platforms upward should be very vertical (e.g. single ladder or vine)



need more interesting 'blobs' as platform branches
- dirt+grass tiles with grass+grass tiles combination

 better doors (use door.status and areas to unlock door)

If some levels are not actually beatable, that might be ok--might make searching the 'universe' for beatable levels more fun.
Think of a Library of Babel style game where every possible level is constructed

set up the 'seed' as things are clicked on


- some areas can have pnode platform creation instead of a chunk map.
	- have a mixture of pnodes and chunks--randomized platforms and 'blobs' can connect areas 
					(use empty chunk data to build on, or even underground caves)
	- might look better in a sky or 'tree canopy' level


tilesets and biomes:
- dirt/grass, 
- grass/moss, 
- caves 
- tree/jungle level
-


- jumping up through an exit -- player should shoot upwards, reset the jumping index/animation


2 hits then restart level?
(maximum 5 hits)

See about using Firebase? for multiplayer 'live database' thing

css
// image-rendering: pixelated;

HEROKU IS NOT FREE ANYMORE
(base) Samuels-MacBook-Pro:thalgame samueljohnson$ heroku ps
 ›   Warning: heroku update available from 7.60.2 to 7.67.1.
 ▸    Starting November 28th, 2022, free Heroku Dynos will no longer be available. To keep your apps running, upgrade to paid dynos. Learn more in our blog
 ▸    (https://blog.heroku.com/next-chapter).
No dynos on ⬢ thalgame

	
	
	- vertical style levels
	
	
	- 'puzzle' aspects, to get to each area 
			
			Castle: keys unlock doors

			lever/switch/button 'activates' wall/object/platform

			ropes/vines/ladders to go up, holes and the like to go down
			

			'teleportation' or magic thing

			Mountains: cave holes
	
	
	
	

	- entire 'Thal' game could be one world? that way cut scenes could take up like half of the game lol



	
	- entering new dungeons, need way to store area data
			- if game is procedural, only need to access level structures as you load them.
	
	
	
	- dead ends should have slightly harder enemies


	




			
	- 'dead ends' should have either:
			bosses
			special items
			
			
	✔ graph/node structure to find the way out
		initial 'main' path, then add random branches to it
	
		( can be used in the world map )
			


26+26+9






----------
  
 intro sequence + title screen

 animations:
    cutscenes as well as character dialogue



 slopes
 test 'structure' (2d array?) that can be placed conveniently in the level
 
 
 save state for password:
    save all of the treasures/artifacts (bosses respawn, but not necessary to kill) 
    player name (world id) is incorporated in the cryptograph along with the item sequence/combination
    
    101100000name_world_id -> morph -> password with 20 characters

    after decoding, will do a check to make sure it is a legitimate password:
      
      ten 1s and 0s at the start
      name after that exactly matches the world id that the person has put in
      ... good to go!

    



    
  
    will need to choose which things to save for progress? gives password for those

 enemies and physics
 new tilesheet for each 'thing'
 
two players (just need left, right, jump, and shoot. WASD for player 1, arrows for player 2)
  heroes:
  Thal   Enx   G. Goose
  
  villains:
  Nally  Theehoarth

  minis:
  Nut Meg

  minivillains:
  Tun Gem
collision detection? or Thal just overtop--physics would be similar to platforms, easy to implement




level types (last through the whole level):
   weather effects: ice changes 'slide' and 




game types (as shown in over world):
	
	
  platform (working on now) 
  
	overworld (enter levels from here) 'minithal' version
  
	space-shooter (between worlds, enter worlds from here)


simple colour palette, like gameboy






how to avoid html injection? inputting values might be risky?


travel options 
	- walking/on foot, OR...
	vehicle with upgrades:
	- the "Plain Jane", slightly faster than walking but not by much (speed 2)
	- giant tires -> dune-buggy thing that can run over mountains all jittery. (speed 2)
	- amphibious thing to go across water, (speed 2 on land, speed 1 on water)
	- "Turbo Zap" - super duper fast, for planetary highways (speed 3)




worldmap terrain ideas
	- instead of inputting a seed manually, game starts on biggest scale and zooms in as the user clicks on it 
			('universe' -> 'filament' -> 'galactic cluster' -> 'galaxy' -> 'star cluster' -> 'star' -> 'planet' -> 'continent' -> 'area')
		- should auto-generate at each scale -- have a tileset for this

		- OR, start medium scale ('finish' game, then the user scrolls out -- 'whoa theres more?')
	- can enter anywhere on the map -- creates random seed
	- quicksand and mud, randomly get stuck, must button mash to get out
	- zoomed in version with new tileset: trees and rocks/boulders
		- canyon-type, bottom layer is walkable, then use inverse of trail to fill rest of map with 1s, so trail is '0'
			- (mostly helps for drawing it)
	- need to implement maze, as well as trails, "wnodes"
	- recheck all cliff/rock formations, if beside trees should re-number. one final image map at the end.
	
	- 

- level map, when destroying, see if can blit a new image and change the terrain
	- platforms and pnodes, more involved
	
- 

- G.G. ("Gwen Goose") sprite
	- white, brown coat
	
- more Thal sprites, without helmet
	- string ability (becomes "1 dimensional"), basically creates cracks, holes, any other void or empty "matrix"
		- running moves in a wavy loop
		- whip attack
		- squeeze through small cracks (two types: - and | )
		- create holes and loops (avoid portal-like things) by tying in knots and strings
		- hands should be bright circles, to get that satisfying "mario" aesthetic
- stats and item use


		
- mood and feel of the game: lonely, lost, nostalgic, adventure, retrowave, alien planets, 
	- entering cities or areas could have epic backgrounds: megaopolis, grid sunset, mountain-range, cloud-tops, 
	- scale taken care of by level generating algorithm








------------------


  item: mortar and pestle (Kutni)
    can get upgrades! this allows the player to save up their collected spices and not use (crush) them until they get a "better" one
    (saving the spices risks losing progress, only saves the kutni)
    
    many levels of each type, but only one of each level has 'the Kutni' upgrade. (single integer for cryptograph, 0-5)
    
    - wood (brown), get from The Jungle (World 1) 
                    +1 to max stat
    - stone (grey), get from The Mountains (World 2)
                    +2 to max stat
    - marble (white), get from The Palace (World 3)
                    +3 to max stat
    - diamond (light blue), get from The Volcano (World 4)
                    +5 to max stat
    - neutron (black), get from The Star System (World 5), more like a dyson sphere
                    +8 to max stat
    
    changes the color on her vest
    
    
    
    
    use: to crush spices, for stats

    
    
    (basically any tree in the game will have either of these, doesn't have to be a 'nutmeg' tree since it is an alien world)
    
    Lots in the Jungle (World 1) so need to stock up early on.
    The Mountains (World 2) is less so. (some mountain levels have snow and ice. be careful! increase speed (sugar))
    The Palace (World 3) doesn't have 'natural' ones growing, so very scarce.
    World 4 and 5 have no spices.
    
    find raw spices -> 
    
    example screen:
    
               (icon, raw material)                 (icon, pile+jar).                  
    nutmeg   20        O  |\                  |\     A[]   (dark brown)    MP       5 [/////..]          7  
                          | \                 | \  
    cinnamon  4        |  |  \   (  mortar    |  \   A[]   (light brown)   HP       2 [//..............] 16      
                          |   >   and pestle  |   >
    cayenne  11        j  |  /       pic  )   |  /   A[]   (light orange)  DEF.       [///]              3
                          | /                 | /  
    sugar     1        Y  |/                  |/     A[]   (light gold)    SPD.     3 [///..]            5   <- in quicksand/water etc.

    
    
    
      nutmeg 
        - looks like: trees, fruit is yellow, some split open to reveal red inside
        - collected as: brown-red seeds 
        - use mortar and pestle: dark brown powder 
        
        - raw effects: fully heal mana
        - ground effects: fully heal and increase max mana
    
      cinnamon 
        - looks like: trees, bark is bright brown
        - collected as: sticks/rolls 
        - mortar and pestle: light brown powder
        
        - raw effects: fully heal HP
        - ground effects: fully heal and increase max HP
    
      cayenne 
        - looks like: plant, red/orange peppers 
        - collected as: peppers
        - mortar and pestle: red/orange powder
        
        - raw effects: increase defense temporarily and cause "burn" damage to enemies temporarily
        - ground effects: increase max defense
    
      sugar 
        - looks like: plant, striped black-white or green-yellow
        - collected as: short, striped stalks
        - mortar and pestle: light gold powder
        
        - raw effects: electricity storage and power, increase speed temporarily
        - ground effects: increase max speed (better through water, quicksand, steep hills, sticky sap, etc.)
		
			
			clove?
      
      save state saves your mortar and pestle, but not your stats.
      don't want to allow the player to cheat--resetting the game should be more difficult, not be a loophole.
      if reset, can re-collect all the spices you dropped and grind them into 'better' stats but that's up to the player whether it is worth it.
      Also lose your high score. (by starting from 0 it will know if you've reset the game, so it wont give out special bonuses)
     
      

  
  
  
  
  other main 'Key' items (shows up as little icons at the top):
    - gears -- to make machines go or work, basically changes the physics of the game
        - change gravity
        - can put in machinery to make buttons, levers, and switches work (moving platforms)
        - 
    - bongos -- changes enemy behaviour of the game (could be easier or more difficult?)
				- jump higher (double jump)
				- changes music, more catchy
    
    - triangles -- allows 'loop' magic and boosts some stats

  Key items are a single integer in the save state (covers all 8 combinations 000 001 010 011 100 101 110 111)
  
  randomized over all the 'final' bosses, 3 out of 5 bosses.


  1 integer for mortar and pestle
  1 integer for key items

  
  
		
		
-----
far world map tileset has grass, mountains, lakes, etc
close world map tileset has trees, bushes, etc

got small "zoomed out" map from large map,
now just need to get a bigger, "zoomed in" map from a small 'over world' map

for each x,y in the small map, create ...


----- 






----

instead of sprite collision, use the tilemap to determine solids


---

Nut and Meg as miniature clones/sidekicks

Tun and Gem are Nut and Meg's clones (lol!) even tinier







firebase with pixelbox








*/






