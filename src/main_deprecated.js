// update is called once per frame
//import gamepad;
import { platforms } from "./platforms.js";
//import { player1_movement } from "./thal.js";
import { TERRAIN, ZEN, dot_order, pnode, PLAT_STYLE, BRANCH } from "./objects.js";
import { dot_ } from "./game_functions.js";

//import { tileinfo } from "./objects.js";
//import { build_test_level } from "./build_level.js";
//import { build_level } from "./build_level.js";

// pyqt5 pixel editor for small level areas, converts into a level array then click on 'copy' button, or convert to a file?





// Development/projects/thalgame
/*

----------
current TODO:

using testPlaceTerrain() first to figure out main platform-branching-ground structure
(line ~3516)

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
			
			key 'unlocks' door
			lever/switch/button 'activates' wall/object/platform

			ropes/vines/ladders to go up, holes and the like to go down
			

			'teleportation' or magic thing
	
	
	
	

	- entire 'Thal' game could be one world? that way cut scenes could take up like half of the game lol



	- doors and entering animation
	- entering new dungeons, need way to store area data
			- if game is procedural, only need to access level structures as you load them.
	
	
	
	

	




			
	- 'dead ends' should have either:
			bosses
			special items
			
			
	✔ graph/node structure to find the way out
		initial 'main' path, then add random branches to it
	
		( can be used in the world map )
			







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
















*/

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

const SCREEN_WIDTH = 8*32;
const SCREEN_HEIGHT = 8*32;
//const SCROLL_LEFT = SCREEN_WIDTH
const XMID = Math.floor(SCREEN_WIDTH/2);
const YMID = Math.floor(SCREEN_HEIGHT/2);

//var Texture = require('pixelbox/Texture');
//var texture1 = new Texture(SCREEN_WIDTH, SCREEN_HEIGHT);

/* ============= textures and images ============= */
// backgrounds
var bg1 = assets.backgrounds.bg1;
var bg1b = assets.backgrounds.bg1b;

// tilesheets
var ts_1 = assets.tilesheet;
var ts_m = assets.tilesheet_mountain;
var ts_2 = assets.tilesheet2;
var ts_se = assets.tilesheet_enemies;
var ts_a = assets.animations.title_screen.a;
var ts_terrain = assets.tilesheet_terrain;

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


const WORLD_ID = document.getElementById("world_id_info").innerHTML;
const SAVE_STATE = document.getElementById("save_state_info").innerHTML;




//const seed = PRNG("who knows", 10000); // "Hello World" -> 0.6276661821175367, ...
const seed = PRNG(WORLD_ID, 10000); // "Hello World" -> 0.6276661821175367, ...


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

//function inc_rnd()



// for any randomizers, put in a list of rnd() nad use what is 

// TODO: organize tilesheet 
/* ======================================================== */







/* ======================================================== */



// for players 1 and 2 (3 tiles tall, 2 tiles wide)
function get_psheet(anim_index){
  return [
    anim_index, anim_index+1,
    anim_index+16,anim_index+17,
    anim_index+32,anim_index+33
  ];
}






var HEAD = 0;
var HEAD2 = 2;


const XOFFSET = 4;
const YOFFSET = 16;

var p = { x: 0*8, y: 0*8 }; //player
var p2 = { x: 5*8, y: 29*8 }; //player2


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
var moving_platforms = [];
function create_platform(x, y, movetype, random_phase=true){
	let plat = {};
	for (let key in platforms[movetype]){
		plat[key] = platforms[movetype][key];
	}
	
	let rnd_pl_im = rnd(0, 3);
	
	plat.image = 224+rnd_pl_im;
	plat.x = x;
	plat.y = y-8;
	
  if (random_phase) {
    plat.vframe = rnd(0, plat.vx.length-1);
  }
  
  moving_platforms.push(plat);
}


var small_enemies = [];
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
  small_enemies.push(enemy);
}
















// get pixel immediately outside of the 'collision' box
function pR(px){ return px+8+1; }
function pL(px){ return px-1; }
function pB(py){ return py+8+1; }
function pT(py){ return py-1; }








var score = 0;
var combo = 0; // increment
var combo_start = 0;

//var grid = level_01;

// 


function check_grid(px, py){
  let px8 = Math.floor(px/8);
  let py8 = Math.floor(py/8);
  if (px8 >= width || py8 >= height || px8 < 0 || py8 < 0 ) {
    return 1; 
  } else {
		
    return level_grid_[py8][px8];
  }
}

function check_event_grid(px, py){
	
  let px8 = Math.floor(px/8);
  let py8 = Math.floor(py/8);
	//console.log("px8 "+px8+" py8 "+py8);
	
	//console.log(level_events_[py8][px8]);
  if (px8 >= width || py8 >= height || px8 < 0 || py8 < 0 ) {
    return 1; 
  } else {
  	return level_events_[py8][px8];
  }
  
  
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
var jump = [4,4,3,3,3,3,2,2,2,2,2,1,1,1,1,1,1,1,1];
var jump2 = [3,3,3,3,3,2,2,2,2,1,1,1,1,1];
var j = 0;
var j2 = 0;

var fall = [0,0,0,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3];
var fall2 = [0,0,0,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3];
var f = 0;
var f2 = 0;

var running = false;
var running2 = false;
var run = [1,1,1,1,1,1,1,1,1,1,1,1,1,2];//,1,2,1,2,1,2,1,2,1,2,1,2,1,2];// 7 is the maximum, otherwise clipping happens
var run2 = [1,1,1,1,1,1,1,1,1,1,1,1,1,2];
var r = 0;
var r2 = 0;

var sliding = false;
var sliding2 = false;
var slide = [1,0];//[2,2,2,2,1,1,1,0];
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

var entering = false;
var penter_frames = [
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
];
var penter_index = 0;

var door_animation = false;


var bg_width = 256;
//var bg_depth_scroll_1 = 0;


var test_toggle_anim = false;




function player1_movement() {
  
	// ======= temporary - testing speech =======
  if (!test_toggle_anim) {
    if (btn.S && btn.B) {
      //tilesheet(ts_anim);
      test_toggle_anim = true;
      face_frame = 0;
    }
  } else if (btn.S && btn.A) {
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
	
	if (btnp.P) {
		reset_position("P");
	}
	if (btnp.O) {
		reset_position("O");
	}
  
	
  if (entering) {
		if (penter_index >= penter_frames.length-1 ) {
			entering = false;
			penter_index = 0;
			//activated_area = -1;
			
			p.x = ready_enter_door["gotox"]*8;
			p.y = ready_enter_door["gotoy"]*8;
			//current_area = ready_enter_door["goto"];
			//activated_area = 1;
			//console.log(ready_enter_door);
			ready_enter_door = {};
			
		} else {
			penter_index++;
		}
  	return;
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
  if (btn.R) {
		
		if (p.x >= level_pixel_width-9 && check_event_grid(p.x, p.y) == 11) {
				//console.log("right edge TRIG");
				activated_area = p1_check_door(11);
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
      p.x = snap_right(p.x);
      running = false; //? doesnt do anything since it is set to true a few lines above
      
    } else {
      p.x += run[r];
      bumped_sound = false;
    }
    
    if (r < run.length-1) {
      r += 1;
      if (run[r] >= 3) {
        s = 0;
      }
    }
    
  } else if (btn.L)  {
		if (p.x <= 1 && check_event_grid(p.x, p.y) == 10) {
			//console.log("left edge TRIG");
			activated_area = p1_check_door(10);
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
      p.x = snap_left(p.x);
      running = false;
      
    } else {
      p.x -= run[r];
      bumped_sound = false;
    }
    
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
    
		// need to check TWO grid spots below
    if ( (check_grid(p.x, pB(p.y)) == 0) && (check_grid(p.x+7, pB(p.y)) == 0) ) {
			//grounded = false;
			// 
			if (!climbing) { grounded = false; }
    }
    
  } else if (climbing) {
  	grounded = true;
  }
  
  
  
  /* --------  vertical movement: jumping, swimming, climbing --------- */
	if ( (check_grid(p.x, p.y) != 2) && (check_grid(p.x+7, p.y) != 2) ) {
		climbing = false;
  }
	
  if (btn.A) {
		
		if (!btn.L && !btn.R) {
			
			if ( (check_event_grid(p.x, p.y) == 4) || (check_event_grid(p.x+7, p.y) == 4)) {
				entering = true;
				activated_area = p1_check_door(4);
				//door_sound = false;
			
				return;
			}
		}
		
		if ( (check_event_grid(p.x, p.y) == 13) || (check_event_grid(p.x+7, p.y) == 13)) {
			//entering = true;
			activated_area = p1_check_door(13);
			//door_sound = false;
		
			return;
		}
		
		if ( (check_grid(p.x, p.y) == 2) || (check_grid(p.x+7, p.y) == 2) ) {
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
			
    } else if (grounded || on_platform) {
      
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
  
  
	if (btn.D) {
		
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
			activated_area = p1_check_door(12);
			//door_sound = false;
		
			return;
		}
	}
  
  
  /* -------- vertical movement: falling ---------- */ 
  if (!jumping && !grounded) {
    
    // need to check TWO grid spots below
    down_check = pB(p.y+fall[f]); // this one is 
    if ( (check_grid(p.x, down_check) == 1) || (check_grid(p.x+7, down_check) == 1) ) {
      p.y = snap_down(p.y);
      grounded = true;
      f = 0;
      assets.bleeper.land.play();
    } else {
      p.y += fall[f];
      if (f < fall.length-1) { f += 1; }
    }
    
    
  } else {
    f = 0; //?
  }
  
  //----------- last minute checks for current position (inside collision box)
  if ((check_grid(p.x, p.y+7) == 1) && (check_grid(p.x+7, p.y+7) == 0)) {
    p.x = snap_left(p.x+7); //Math.floor(px/8)*8;
    can_wall_jump = true;
  } else
  if ((check_grid(p.x, p.y+7) == 0) && (check_grid(p.x+7, p.y+7) == 1)) {
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
  if (btn.B) {
		
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
    
  
    if (btn.R || btn.L) {
      psheet = get_psheet(ZEN[HEAD].run);
      
      pframe = pwalk_frames[pwalk_index];
      pwalk_index++;
      if (pwalk_index >= pwalk_frames.length) pwalk_index = 0;
      
    } else {
      
      pframe = pidle_frames[pidle_index];
      pidle_index++;
      if (pidle_index >= pidle_frames.length) pidle_index = 0;
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
	
	if (entering) {
		psheet = get_psheet(ZEN[HEAD].door);
		pframe = penter_frames[penter_index];
	}
  

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


var reset_position_x = 0;
var reset_position_y = 0;
function reset_position(where_to) {
	
	if (where_to == "P") {
		p.x = reset_position_x;
		p.y = reset_position_y;
	}
	
	if (where_to == "O") {
		
		p.y -= 80;
	}
}


var drstring = "";
function p1_check_door(exit_type) {
	console.log("checking door type "+exit_type);
	// return should be the area index to activate (activate_area)
	// need to find out which door was activated
	// specify door_area and door_index
	
	let doors = curr_area["exits"];//door_areas[current_area];
	
	// {"1":{} }
	//let goto_ = -1;
	
	
	for (let d_i of Object.keys(doors)) {
		let door = doors[d_i];
		if (door["type"] == exit_type) {
			p.x = door["gotox"]*8;
			p2.x = door["gotox"]*8;
			p.y = door["gotoy"]*8;
			p2.y = door["gotoy"]*8;
			//goto_ = d_i;
			
			reset_position_x = door["gotox"]*8;
			reset_position_y = door["gotoy"]*8;
			
			
			if (door["type"] == 4) {
				door_animation = true;
			}
			return d_i;
		}
	}
		
	/*	
		if ( door["type"] == 13 && btn.U) {
			//console.log("top exit! to "+d_i);
			//console.log(door);
			//current_area = d_i;
			//p.y = 0;
			//p2.y = 0;
			p.x = door["gotox"]*8;
			p2.x = door["gotox"]*8;
			p.y = door["gotoy"]*8;
			p2.y = door["gotoy"]*8;
			goto_ = d_i;
			break;
			
		} else if ( door["type"] == 12 && btn.D) {
			//console.log("-> right exit! to "+d_i);
			//console.log("bottom exit! to "+d_i);
			//console.log(door);
			p.x = door["gotox"]*8;
			p2.x = door["gotox"]*8;
			p.y = door["gotoy"]*8;
			p2.y = door["gotoy"]*8;
			goto_ = d_i;
			break;
			
		} else if ( door["type"] == 11 && btn.R) {
			//console.log("-> right exit! to "+d_i);
			//current_area = d_i;
			//p.x = 0;
			//p2.x = 0;
			p.x = door["gotox"]*8;
			p2.x = door["gotox"]*8;
			p.y = door["gotoy"]*8;
			p2.y = door["gotoy"]*8;
			goto_ = d_i;
			break;
			
		} else if ( door["type"] == 10 && btn.L) {
			//console.log("<- left exit! to "+d_i);
			//current_area = d_i;
			//p.x = newLevel.areas[d_i]["width"]*8;
			//p2.x = newLevel.areas[d_i]["width"]*8;
			p.x = door["gotox"]*8;
			p2.x = door["gotox"]*8;
			p.y = door["gotoy"]*8;
			p2.y = door["gotoy"]*8;
			goto_ = d_i;
			break;
		
		} else if ( Math.abs(p.x- door.gx*8-8)<16 && Math.abs(p.y - door.gy*8)<8 ) {
			door_animation = true;
			
			//console.log("p1_check_door d_i: "+d_i+"  door type: "+door["type"]);
			goto_ = d_i;//door["type"];
			break;
		}
	}
	*/
	
	return -1; // no door
}

/*
function p1_check_area() {
	return -1;
}
*/


function p1_check_platform_collision() {
  
  //  Doesn't use grid, since they move around
  var coll_list = [];
  for (let ip=0; ip<moving_platforms.length; ip++){
    let m = moving_platforms[ip];
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
  for (let ip=0; ip<moving_platforms.length; ip++){
    let m = moving_platforms[ip];
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
	
	if (curr_area["width"] > 32) {
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
	
	if (curr_area["height"] > 32) {
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
  for (let ip=0; ip<moving_platforms.length; ip++){
    let plfm = moving_platforms[ip];
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
	if (curr_area["width"] > 32) {
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
	
	if (curr_area["height"] > 32) {
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
	
  for (let ip=0; ip<moving_platforms.length; ip++){
    let plfm = moving_platforms[ip];
    sprite(plfm.image+plfm.frames[plfm.frame], plfm.x+mp_xoffset-p.x*lfe*rte, plfm.y+mp_yoffset-p.y*tpe*bte);
    //sprite(e.image+e.frames[e.frame]+e.dead_frame, e.x+en_xoffset-p.x*lfe*rte, e.y+en_yoffset-p.y*tpe*bte, e.going_left);
  }
}



var enemy_test = 0;
//var stuck_in_block = false; 

// 

/*        */
function update_small_enemies() {
  
  for (let ses=0; ses<small_enemies.length; ses++){
    let e = small_enemies[ses];
    
    // should only update if they are near the player, i.e. Thal has to bring it into the screen
    if (!e.in_screen || e.x-p.x > SCREEN_WIDTH || e.x-p.x < -SCREEN_WIDTH ) { continue; }
    
    if (!e.alive) {
      e.dead_frames++;
      continue;
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
    for (let ib=0; ib<bb_shots.length; ib++){
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
  
  small_enemies = small_enemies.filter( function(a) { return a.dead_frames < 60; } );
  
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
	
	if (curr_area["width"] > 32) {
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
	
	if (curr_area["height"] > 32) {
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
  for (let ses=0; ses<small_enemies.length; ses++){
    let e = small_enemies[ses];
    
    if (e.dead_frames%2 == 0) {
      e.dead_frame = e.dead_frame == 4? 8:4;
    }
    
    //sprite(e.image+e.frames[e.frame]+e.dead_frame, e.x+en_offset-p.x*lfe*rte, e.y+YMID-p.y, e.going_left);
		
		sprite(e.image+e.frames[e.frame]+e.dead_frame, e.x+en_xoffset-p.x*lfe*rte, e.y+en_yoffset-p.y*tpe*bte, e.going_left);
		/*
		sprite(d.images[0], (d.gx*8)+dr_xoffset-p.x*lfe*rte, (d.gy*8)+dr_yoffset-p.y*tpe*bte-info_box_offset, false);
		draw(level_image_, l_offset-p.x*lfe*rte, u_offset-p.y*tpe*bte-info_box_offset);
		/**/
  }
}

//var aaa = "";
var has_key = 1;
var ready_enter_door = {};


/* ========================= DOORS + ACTIVATE AREAS =========================== */
function update_door(goto_area) {
	
	// current_area is updated earlier in level_update()
	//console.log("goto_area "+goto_area+" from area "+current_area);
	
	
	
	if (goto_area > -1) {
		
		
		//let doors = door_areas[current_area];
		let doors = curr_area["exits"];
		//console.log(doors);
		
		//console.log("B");
		//console.log("goto_area "+goto_area+" from area "+current_area);
		//console.log("finding doors["+goto_area+"]:");
		//console.log(doors);
		
		let door = doors[goto_area];
		//console.log(door);
		//console.log("C");
		
		if (door["status"] === 0) {
			// -------- ENTER NEW AREA --------
			/*
			
			door.images.forEach((d, i) => {
			  door.images[i] = door.open_images[i]+2;
			})
			*/
			
			if (door_animation) {
				//door.status = 1;
				assets.bleeper.enter_area.play();
				ready_enter_door = door;
				door_animation = false;
				//console.log("goto_area "+goto_area+" from area "+current_area);
			}
			
			
			
		} else if (door.status == 1) {
			// -------- ENTER NEW AREA --------
			// opening door
			door.images.forEach((d, i) => {
			  door.images[i] = door.open_images[i];
			})
			if (door_animation) {
				door.status = 0;
				assets.bleeper.door_open.play();
				door_animation = false;
				
			}
			
		} else if (door.status == 2) {
			if (has_key) {
				// unlocking door
				door.images.forEach((d, i) => {
				  door.images[i] = door.open_images[i]+2;
				})
				if (door_animation) {
					door.status = 1;
					has_key--;
					assets.bleeper.door_unlock.play();
					//door_sound = false;
					door_animation = false;
				}
			} else {
				if (door_animation) {
					assets.bleeper.unlock_fail.play();
					door_animation = false;
				}	
			}
		} else {
			// nothing
		}
		
		
	} 
}


var dr_xoffset = 0;
var dr_yoffset = 0;
function draw_doors() {
	let doors_ = curr_area["exits"];//door_areas[current_area];
	
	if (curr_area["width"] > 32) {
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
	
	if (curr_area["height"] > 32) {
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

var stall_scroll = false;

// calculate whether background scrolls based on left_edge and right_edge
// this also controls lfe, rte, tpe, and bte
function background_scroll() {
	/*
		
	
	*/
  
  // need to calculate how long the level is, then put as may as necessary as well as on both ends.
  if (curr_area["width"] > 32) {
		if (left_edge == 0) {
				lfe = 1;
				bg_offset_0 = -6;
				bg_offset_1 = -32;
			
		} else {
				lfe = 0;
				bg_offset_0 = 0;
				bg_offset_1 = 0;
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
				bg_offset_0 = Math.floor((level_pixel_width-XMID)/20)-6;
				bg_offset_1 = Math.floor((level_pixel_width-XMID)/4)-32;
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
  }
	
	if (curr_area["height"] > 32) {
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
	
  bg_dist_0 = Math.floor(p.x/20)*lfe*rte + bg_offset_0;
	
	// right_edge = p.x-level_pixel_width+XMID; 
  // 0 - 256 - ()
	
	
	// bg1 is father away
  draw(bg1, le_ - bg_width - bg_dist_0, 0+12);
  draw(bg1, le_ - bg_dist_0, 0+12);
  draw(bg1, le_ + bg_width - bg_dist_0, 0+12);
	draw(bg1, le_ + bg_width*2 - bg_dist_0, 0+12);
  
  
  bg_dist_1 = Math.floor(p.x/4)*lfe*rte + bg_offset_1;
	
	// bg1b is closer
	draw(bg1b, le_ - bg_width*2 - bg_dist_1, 0+12);
  draw(bg1b, le_ - bg_width - bg_dist_1, 0+12);
  draw(bg1b, le_ - bg_dist_1, 0+12);
  draw(bg1b, le_ + bg_width - bg_dist_1, 0+12);
	draw(bg1b, le_ + bg_width*2 - bg_dist_1, 0+12);
  
	//console.log(bg_offset);
	
	
	
}
















// USE: inherits(Child, Parent) make class Child inherit from class Parent


















/* ===================== LEVEL GRAPH ===================== */

var current_area = 0;
var activated_area = -1;
//var current_level = 0;
//var exit_choices = ["edge", "edge", "door"];

class LevelGraph {
	/*
    
		--------------------
		   6─┐   ┌─5──9
		     │   │
		0───1┴──2┼──3───4 
		         │
	      8──7─┘
		
		
	
		
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
			
			exits themselves need to know terrain type ahead, e.g. if cave entrance then it should have rock around it
			
		*/
		
		//console.log("build area: "+area_index+"   numXscr: "+numScreensX+" numYscr: "+numScreensY);
		let area_grid = [...Array(numScreensY*32)].map(_ => Array(numScreensX*32).fill(0));
		let event_grid = [...Array(numScreensY*32)].map(_ => Array(numScreensX*32).fill(0));
		let area_image = new TileMap(numScreensX*32, numScreensY*32);
		let area_image_behind = new TileMap(numScreensX*32, numScreensY*32);
		let area_image_front = new TileMap(numScreensX*32, numScreensY*32);
		
		//let area_oob = new TileMap(numScreensX*32, numScreensY*32); // bottom of the screen?
		
		let connection_list = this.AdjList.get(area_index); // e.g. index=1: [0,2]
		let prev_area_index = connection_list[0]; // e.g. index=1: 0
		
		//console.log("area_index: "+area_index+"     conn_list: "+connection_list);
		
		// this might depend on whether level is vertical
		let edge_list = this.shuffleArray([11,11,11,10,12,13,4]); // more 11s mean better chance of moving to the right
		
		let terrain_type = "";
		
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
				
				let status = 0; // <------ *********** RANDOMIZE
				
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
						gx = numScreensX*32 - 5;
						gy = numScreensY*32 - 2;
			      break;
			    case 10: // exit thru left edge
						gx = 0;
						gy = numScreensY*32 - 2;
			      break;
			    case 11: // exit thru right edge
						gotox = 0;
						gx = numScreensX*32 - 1;
						gy = numScreensY*32 - 2;
			      break;
			    case 12: // exit thru bottom
						gotoy = 0; 
						gx = Math.floor((numScreensX*32)/2);
						gy = numScreensY*32 - 1;
			      break;
			    case 13: // exit thru top
						gx = Math.floor((numScreensX*32)/2);
						gy = 0;
			      break;
					
			      
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
					"status": status,
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
				//let type_string = exit_type === 4? "door" : "edge";
				//console.log("  built exit: 1 ("+type_string+")");
				
				//console.log(". . exits[1]: "+gx+" "+gy+" -> "+gotox+" "+gotoy+"    type: "+exit_type);
				//if first room, only one exit at the end 
				// (can be random in that last screen, else right edge)
				
				terrain_type = this.init_terrain_type;
				
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
				
				let status = 0; // can't randomize, since this is the way back (unless it closes or locks behind you)
				let gx = 0;
				let gy = 0;
			  
				
				switch (prev_exit_type) {
					case 4: // door
			      this_exit_type = 4;
						gx = 5;
						gy = numScreensY*32 - 2;
			      break;
					
					case 10: // if left edge...
						this_exit_type = 11; // ...then this is a right exit  |   ->|
						gx = numScreensX*32 - 1; 
						gy = numScreensY*32 - 2;
						break;
			    case 11: // if right edge...
			      this_exit_type = 10; // ...then this is a left exit   |<-   |
						gx = 0;
						gy = numScreensY*32 - 2; //prev_exit["y"];
			      break;
					case 12: // if bottom...
						this_exit_type = 13; // then exit through top         |  ^  |
						gx = Math.floor((numScreensX*32)/2);
						gy = 0;
						break;
					case 13: // if top...
						this_exit_type = 12; // then exit through bottom      |  _  |
						gx = Math.floor((numScreensX*32)/2);
						gy = numScreensY*32 - 1;
						break;
						
			  }
				
				// remove this exit type from edge list
				edge_list = edge_list.filter(function(type){ return type != this_exit_type; });
				
				// update previous room
				prev_exit["gotox"] = gx;
				prev_exit["gotoy"] = gy;
				this.areas[prev_area_index]["exits"][area_index] = prev_exit;
				
				exits[prev_area_index] = {
					"goto": prev_area_index,
					"gx": gx,
					"gy": gy,
					"gotox": prev_exit["gx"], 
					"gotoy": prev_exit["gy"],
					"type": this_exit_type,
					"status": status,
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
				let type_string = this_exit_type === 4? "door" : "edge";
				//console.log("  built exit: "+prev_area_index+" ("+type_string+")");
				//console.log(". . exits[last]: "+gx+" "+gy+" -> "+prev_exit["gx"]+" "+prev_exit["gy"]+"    type: "+this_exit_type);
				
				//console.log(". . exits[last]: "+gx+" "+gy+" -> "+gotox+" "+gotoy);
				let prev_ter = this.areas[prev_area_index]["terrain"];
				let ter_list = TERRAIN[prev_ter][prev_exit_type.toString()];
				terrain_type = ter_list[rnd(0, ter_list.length)];
				
			
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
					
					
					let status = 0; // <------ *********** RANDOMIZE
					
					let gx = 0;
					let gy = 0;
			  	
					// exit type is based on previous room
					switch (prev_exit_type) {
						case 4: // door
				      this_exit_type = 4;
							gx = 5;
							gy = numScreensY*32 - 2;
				      break;
							
						case 10: // if left edge...
							this_exit_type = 11; // ...then this is a right exit  |   ->|
							gx = numScreensX*32 - 1; 
							gy = numScreensY*32 - 2;
							break;
				    case 11: // if right edge...
				      this_exit_type = 10; // ...then this is a left exit   |<-   |
							gx = 0;
							gy = numScreensY*32 - 2; //prev_exit["y"];
				      break;
						case 12: // if bottom...
							this_exit_type = 13; // then exit through top         |  ^  |
							gx = Math.floor((numScreensX*32)/2);
							gy = 0;
							break;
						case 13: // if top...
							this_exit_type = 12; // then exit through bottom      |  _  |
							gx = Math.floor((numScreensX*32)/2);
							gy = numScreensY*32 - 1;
							break;
				  }
					
					// remove this exit type from edge list
					edge_list = edge_list.filter(function(type){ return type != this_exit_type; });
					
					// update previous room
					prev_exit["gotox"] = gx;
					prev_exit["gotoy"] = gy;
					this.areas[prev_area_index]["exits"][area_index] = prev_exit;
					
					//console.log(this.areas[prev_area_index]["exits"]);
					
					exits[prev_area_index] = {
						"goto": prev_area_index,
						"gx": gx,
						"gy": gy,
						"gotox": prev_exit["gx"], 
						"gotoy": prev_exit["gy"],
						"type": this_exit_type,
						"status": status,
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
					
					
					//let type_string = this_exit_type === 4? "door" : "edge";
					//console.log("  built exit: "+prev_area_index+" ("+type_string+")");
					
					
					let ter_list = TERRAIN[this.areas[prev_area_index]["terrain"]][prev_exit_type.toString()];
					//console.log(this.areas[prev_area_index]["terrain"]+" "+prev_area_index+" "+prev_exit_type.toString()); // 4 4
					//console.log(TERRAIN[this.areas[prev_area_index]["terrain"]]);
					
					
					
					terrain_type = ter_list[rnd(0, ter_list.length)]; // error? cant read undefined
					
					
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
						
						let status = 0; // <------ *********** RANDOMIZE
						
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
								gx = numScreensX*32 - goto_area - 5;
								gy = numScreensY*32 - 2;
					      break;
					    case 10: // exit thru left edge
								gx = 0;
								gy = numScreensY*32 - 2;
					      break;
					    case 11: // exit thru right edge
								gotox = 0;
								gx = numScreensX*32 - 1;
								gy = numScreensY*32 - 2;
					      break;
					    case 12: // exit thru bottom
								gotoy = 0; 
								gx = Math.floor((numScreensX*32)/2);
								gy = numScreensY*32 - 1;
					      break;
					    case 13: // exit thru top
								gx = Math.floor((numScreensX*32)/2);
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
							"status": status,
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
						
						let status = 0; // <------ *********** RANDOMIZE
				
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
								gx = numScreensX*32 - goto_area - 5;
								gy = numScreensY*32 - 2;
					      break;
					    
							case 10: // exit thru left edge
								gx = 0;
								gy = numScreensY*32 - 2;
					      break;
					    case 11: // exit thru right edge
								gotox = 0;
								gx = numScreensX*32 - 1;
								gy = numScreensY*32 - 2;
					      break;
					    case 12: // exit thru bottom
								gotoy = 0; 
								gx = Math.floor((numScreensX*32)/2);
								gy = numScreensY*32 - 1;
					      break;
					    case 13: // exit thru top
								gx = Math.floor((numScreensX*32)/2);
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
							"status": status,
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
		
		//console.log("A ");
		
		
		
		for (let e of Object.keys(exits)) {
			//console.log(exit_);
			
			event_grid[exits[e]["gy"]][exits[e]["gx"]] = exits[e]["type"]; // 'type': 4, 10, 11, 12, 13
			
			// ------ TESTING (putting ladders)--------
			/*
			if (testing) {
				tilesheet(ts_m);
				//area_image.set(exits[e]["gx"], exits[e]["gy"], 192);
				for (let y_=1; y_<numScreensY*32-1; y_++) {
					let x_ = Math.floor((numScreensX*32)/2);
					area_grid[y_][x_] = 2;
					area_image.set(x_, y_, 242);
				}
			}
			*/
			
			
			
		}
		
		let area_info = {
			"grid": area_grid,
			"event_grid": event_grid,
			"image": area_image, 
			"image_behind": area_image_behind,
			"image_front": area_image_front,
			"exits": exits, // [0,2]
			"width": numScreensX*32,
			"height": numScreensY*32,
			"xscreens": numScreensX,
			"yscreens": numScreensY,
			"terrain": terrain_type,
			"is_vertical": is_vertical
		}
		
		// each area should have a collection of pnodes
		//console.log(terrain_type);
		
		
		//console.log("------------"+area_index);
		//console.log(area_info["exits"]);
		
		//console.log("B ");
		this.areas.splice(area_index, 1, area_info); // at position 'index' add area and remove
		
		//console.log("C ");
		// floor
		// exits
		
		
		
	}
	
	
	
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
	}
	
	moveExit(area_index, exit_index, xnew, ynew) {
		
	}
	
	
		/*
			16 17 18  19 20 21  22 23 24  25 26 27  28 29 30 31
		  32 33 34  35 36 37  38 39 40  41 42 43  44 45 46 47
		  48 49 50  51 52 53  54 55 56  57 58 59  60 61 62 63
		*/
	
	
	// this was from the previous chunk attempt
	placeChunks(area_index) {
		throw 0;
		/*
			TODO:
				
				Pre-made Level Chunks
				
				
				return exits are not in the right spots.
				need to cycle through afterward
		
				
		
				How to ensure a chunk_grid that works.
		
		
		*/
		
		//console.log("____");
		
		let area = this.areas[area_index];
		
		//let img_index = area_index === this.finalArea ? 192 : 208;
		//let img_offset = area_index === this.finalArea ? 0 : area_index;
		
		//let bm = area["height"];
		
		let aH = area["height"];
		let aW = area["width"];
		
		let bH = aH+2;
		let bW = aW+2;
		
		let gbtm = aH-1;
		let bbtm = aH;
		let b0 = 1;
		
		
		let plats_and_border_grid = [...Array(aH)].map(_ => Array(aW).fill(0)); // <---- try this
		let plats_and_border_img = [...Array(bH)].map(_ => Array(bW).fill(0));
		
		//let num_branches = area["xscreens"]*area["yscreens"];
		// how to divide where the branches are evenly
		
		//let myStruct_img = [...Array(area["height"])].map(_ => Array(area["width"]+2).fill(0)); // background platforms
		//let myStruct_grid = [...Array(area["height"])].map(_ => Array(area["width"]+2).fill(0)); // interactable platforms
		
		
		
		
		/*
		let exits = this.areas[area_index]["exits"];
		for (let e of Object.keys(exits)) {
			exit_type = exits[e]["type"])
		}
		/**/
		
		
		// ------------- position exits
		/*
		let exit_types = Object.keys(area["exits"]).map(ex => area["exits"][ex]["type"]);
		
		// ensure right side has a proper exit
		if (exit_types.includes(11)) {
			//console.log(last_plat_y);
			for (let j=last_plat_y; j<area["height"]; j++) {
				for (let i=area["width"]-1; i>area["width"]-last_plat_width; i--) {
					plats_and_border_grid[j][i] = 1;
				}
			}
		}
		/**/
		
		
		// -------------- create chunk map. a 'screen' is 4 8x8 chunks wide by 4 8x8 chunks tall
		
		let chx_max = area["xscreens"]*4;
		let chy_max = area["yscreens"]*4;
		
		let chunks_map = [...Array(chy_max)].map(_ => Array(chx_max).fill(0));
		
		let chi = 0;
		let chj = chy_max-2; //bottom (can randomize first)
		let chunk_type = 11;
		let chunk_types = CHUNKS["rules"][chunk_type]["R"];
		
		
		
		let curr_chunk_type = 11;
		let curr_chunk_list = CHUNKS["horizontal"][curr_chunk_type]; // get possible chunks for that type indicated by the number
		let cc_rnd_index = 0; // change to random from list
		let curr_chunk = curr_chunk_list[cc_rnd_index];
		
		//let area = this.areas[area_index];
		let num_doors = 0;
		let place_doors = [];
		let which_doors = this.shuffleArray( Object.keys(area["exits"]).map((e, i) => (area["exits"][e]["type"] === 4 ? e : -99)).filter(i => i !== -99) );
		if (which_doors.length) {
			num_doors = which_doors.length;
			place_doors = this.shuffleArray([...Array(chx_max).keys()]).splice(num_doors); // scatter horizontally
		}
		
		
		
		// first fill chunk map with chunk values, this doesnt dot the map yet
		// could create vertical stuff first?
		// use platform chunks to go sideways
		if (area["right_to_left"]) {
			for (let chi=chx_max-1; chi>=0; chi--) {
				
				chunk_type = chunk_types[rnd(0, chunk_types.length)];
				chunks_map[chj][chi] = chunk_type;
			  
				
				if ([33, 66].includes(chunk_type) && chj > 0) {
					let go_up = rnd(0,3);
					if (go_up > 1) {
						chunk_type = 11;
						chj--;
					} 
				} else if ([11].includes(chunk_type) && chj < chy_max-1) {
					let go_down = rnd(0,3);
					if (go_down > 1) {
						chunk_type = 33; // or if exit ? leave blank
						chj++;
					} 
				}
				
				
				
				// grab next one
				chunk_types = CHUNKS["rules"][chunk_type]["L"];
				
				
			
			}
		} else {
			for (let chi=0; chi<chx_max; chi++) {
				
				chunk_type = chunk_types[rnd(0, chunk_types.length)];
				chunks_map[chj][chi] = chunk_type;
			
				if ([33, 66].includes(chunk_type) && chj > 0) {
					let go_up = rnd(0,10);
					if (go_up) {
						chunk_type = 11;
						chj--;
					} 
				} else if ([11].includes(chunk_type) && chj < chy_max-1) {
					let go_down = rnd(0,10);
					if (go_down) {
						chunk_type = 33;
						chj++;
					} 
				}
				
				// grab next one
				chunk_types = CHUNKS["rules"][chunk_type]["R"];
				
				// fill below with 33
				for (let below=chj+1; below<chy_max; below++) {
					
					chunks_map[below][chi] = 33;
				}
				
				
				
			
				//for (let j=chy_max-1; j>1 && chunks_map[j-1][bot_exit_x] === 0; j--) {
				//	chunks_map[j][bot_exit_x] = 77;
				//}
			
				
				
			}
		}
		
		// none, top, bottom, top+bottom
		// need to be able to connect to top
		// minimum is 4 chunks on a screen,
		
		//let bot_exit_x = -1;
		
		//if (Object.keys(area["exits"]).includes(12)) {
		//	let bot_exit_x = rnd(1, chx_max-1);
		//	for (let j=chy_max-1; j>1 && chunks_map[j-1][bot_exit_x] === 0; j--) {
		//		chunks_map[j][bot_exit_x] = 77;
		//	}
		//}
		
		
		//let top_exit_x = -1;
		/*
		if (Object.keys(area["exits"]).includes(13)) {
			let top_exit_x = rnd(1, chx_max-1);
			for (let j=0; j<chy_max-1 && chunks_map[j-1][bot_exit_x] === 0; j--) {
				chunks_map[j][bot_exit_x] = 77;
			}
		}/**/
		
		
		
		
		
		
		
		
		// -------------- image values: border and corners ---------------
		// ------ 'plats_and_border_img' is the surrounding border box (just outside what is visible) -----
		
		// top and bottom edges
		for (let x=0; x<bW; x++) {
			plats_and_border_img[0][x] = 49;
			plats_and_border_img[bH-1][x] = 17;
		}
		// left and right edges
		for (let y=0; y<bH; y++) {
			plats_and_border_img[y][0] = 34;
			plats_and_border_img[y][bW-1] = 32;
		}
		// corners
		plats_and_border_img[0][0] = 25;
		plats_and_border_img[0][bW-1] = 27;
		plats_and_border_img[bH-1][0] = 57;
		plats_and_border_img[bH-1][bW-1] = 59;
		
		// use terrain grid to dot img grid
		
		//for (let j=0; j<aH; j++) {
		//	for (let i=0; i<aW; i++) {
		//		if (plats_and_border_grid[j][i] === 1) {
		//		dot_(plats_and_border_img, i+1, j+1); //image is offset by one
		//			//console.log(i+" "+j);
		//		}
		//	}
		//}
		
		
		
		
		
		// use this to determine if 20,30,21,31,12,13 are used
		let bot_exit_x = -1;
		if (Object.keys(area["exits"]).includes(12)) {
			bot_exit_x = rnd(1, chx_max-1);
		}
		
		
		
		
		
		
		for (let jj=0; jj<chunks_map.length; jj++) {
			
			for (let ii=0; ii<chunks_map[0].length; ii++) {
				
				curr_chunk_type = chunks_map[jj][ii]; // get number from overall map
				if (curr_chunk_type === 0) {
					continue;
				}
				
				
				curr_chunk_list = CHUNKS["horizontal"][curr_chunk_type];
				cc_rnd_index = 0; //rnd(0, curr_chunk_list.length-1);
				curr_chunk = curr_chunk_list[cc_rnd_index];
				
				for (let j=0; j<8; j++) {
					for (let i=0; i<8; i++) {
						
						let new_x = (8*ii)+i;
						let new_y = (8*jj)+j;
						
						
						/*
									
						1 solid

						2 climb 
						3 empty or climb if exit
						10 solid or empty if exit
						
						20 empty or fall down arrow if exit
						12 solid or fall down arrow if exit
						21 solid or climb if exit
						22 empty or climb down if exit
						23 solid or climb down if exit
						
						30 empty or jump up arrow if exit
						13 solid or jump up arrow if exit
						31 solid or climb if exit
						33 empty or climb up if exit
						32 solid or climb up if exit
						
						
						14 solid or door if exit
						
						
						*/
						
						if (ii === bot_exit_x) {
							// bottom chunk
							if (jj === chy_max-1) {
								switch (curr_chunk[j][i]) {
									case 1:
										plats_and_border_grid[ new_y ][ new_x ] = 1;
										break;
									case 10:
										plats_and_border_grid[ new_y ][ new_x ] = 0;
										break;
									case 20:
										plats_and_border_grid[ new_y ][ new_x ] = 20;
										break;
									case 12:
										plats_and_border_grid[ new_y ][ new_x ] = 20;
										break;
									case 21:
										plats_and_border_grid[ new_y ][ new_x ] = 21;
										break;
									case 22:
										plats_and_border_grid[ new_y ][ new_x ] = 0;
										break;
									case 23:
										plats_and_border_grid[ new_y ][ new_x ] = 23;
										break;
								}
							} else { 
								/* 
									path to bottom (going through each jj)
									how to keep from blocking above? 
									maybe just have column of chunks reserved, use pnode type algorithm to cascade downward -- like an ice climber level
								
									
								*/
								//
								
								
								//
								
								
								//
								
								
								//
								
								
							}
						} else {
							if ([1,10,12,21,23].includes(curr_chunk[j][i])){
								plats_and_border_grid[ new_y ][ new_x ] = 1;
							}
						}
						
						// door
						if ([4, 14].includes(curr_chunk[j][i])) {	
							plats_and_border_grid[ new_y ][ new_x ] = 4;
						}
						
						// place door (TODO: other exits)
						if (which_doors.length && [4, 14].includes(curr_chunk[j][i]) && place_doors.includes(ii)) {
							
							let use_this_door = which_doors.shift();
							//area["image"].set( new_x, new_y-4, use_this_door);
							if (!WHATAMI) {
								WHATAMI = this.areas[area_index]["exits"][use_this_door]["gx"];
							}
							this.areas[area_index]["exits"][use_this_door]["gx"] = new_x;
							this.areas[area_index]["exits"][use_this_door]["gy"] = new_y;
							
							area["event_grid"][new_y][new_x] = 4;
						}	
						
						// last step: dot grid
						if (plats_and_border_grid[ new_y ][ new_x ] === 1) {
							dot_(plats_and_border_img, new_x+1, new_y+1); //image is offset by one
						}
					}
				}
			}
		}
		
		//let which_exits = Object.keys(area["exits"]).filter(e => e !== 4);
		for (const e_i in area["exits"]) { 
			let exit_ = area["exits"][e_i];
			
			let exit_type_ = exit_["type"];
			if ( exit_type_ === 10 || exit_type_ === 11 ) {
				let x_side = exit_type_ === 10 ? 0 : aW-1;
				for (let check_downward=0; check_downward<aH; check_downward++) {
					if (plats_and_border_grid[check_downward][x_side]) {
						area["event_grid"][check_downward-1][x_side] = exit_type_;
						
						area["image"].set( x_side, check_downward-1, exit_type_);
						//this.areas[area_index]["exits"][exit_type]["gx"] = new_x;
						break;
					}
				}
			} else if (exit_type_ === 12) {
				
			}
			
		}
		
		
		// --------------- display arrows showing exits
		
		/*
		tilesheet(ts_m);
		for (const e_i in area["exits"]) { // for each exit...
			
			//				"goto": goto_area,
			//				"gx": gx,
			//				"gy": gy,
			//				"gotox": gotox, 
			//				"gotoy": gotoy,
			//				"type": exit_type,
			//				"status": status, // activated/locked/unlocked/ etc
			//				"open_images": [234, 235, 218, 219, 202, 203],
			//				"images": [...]
			
			let exit = area["exits"][e_i];
			let ex = exit["gx"];
			let ey = exit["gy"];
			area["image"].set(ex,ey, exit["type"]);
			
			if ( [12, 13].includes(exit["type"]) ) {
				
				//area["image_front"].set(ex,ey, exit["type"]);
				continue;
			}
			*/
			
			
			/*
			//let exit_back = ;
			let finding_new_spot = true;
			
			for (let row_=1; row_<aH && finding_new_spot; row_++) { // start from the top and check each grid spot down
				let	grid_check = plats_and_border_grid[row_][ex];
				
				if ( grid_check > 0 ) { // if grid has something
					area["event_grid"][ey][ex] = 0; // unset old exit
					area["event_grid"][row_-1][ex] = exit["type"]; // set new exit 
					
					area["exits"][e_i]["gy"] = row_-1;
					//area["image_front"].set(ex, row_-1, exit["type"]);
					
					this.areas[exit["goto"]]["exits"][area_index]["gotoy"] = row_-1;
					
					finding_new_spot = false;
				}
			}
			/**/
		//}
		/**/
		
		//   placeStructure(         from_img, to_area, ax=0, ay=0, toff=0, layer="image", ptype=1)
		this.placeStructure(plats_and_border_img, area,   -1,   -1,      0,       "image",       1); // "image"
		
	}
	
	
	
	
	// ------- for testing -------- 
	
	
	
	testPlaceTerrain(area_index) {
		/*
			TODO / Things to fix:
				ground being created on top of exit from bottom
		
				platform pnode chain dipping below bottom of screen 
				
				actual paths around the level
		
		*/
		
		//console.log("____");
		
		let area = this.areas[area_index];
		
		//let img_index = area_index === this.finalArea ? 192 : 208;
		//let img_offset = area_index === this.finalArea ? 0 : area_index;
		
		//let bm = area["height"];
		
		let aH = area["height"];
		let aW = area["width"];
		
		let bH = aH+2;
		let bW = aW+2;
		
		let gbtm = aH-1;
		let bbtm = aH;
		let b0 = 1;
		
		
		let plats_and_border_grid = [...Array(aH)].map(_ => Array(aW).fill(0)); // <---- try this
		let plats_and_border_img = [...Array(bH)].map(_ => Array(bW).fill(0));
		
		//let num_branches = area["xscreens"]*area["yscreens"];
		// how to divide where the branches are evenly
		
		//let myStruct_img = [...Array(area["height"])].map(_ => Array(area["width"]+2).fill(0)); // background platforms
		//let myStruct_grid = [...Array(area["height"])].map(_ => Array(area["width"]+2).fill(0)); // interactable platforms
		
		
		// ------ 'plats_and_border_img' is the surrounding border box (just outside what is visible) -----
		// top and bottom edges
		for (let x=0; x<bW; x++) {
			plats_and_border_img[0][x] = 49;
			plats_and_border_img[bH-1][x] = 17;
		}
		// left and right edges
		for (let y=0; y<bH; y++) {
			plats_and_border_img[y][0] = 34;
			plats_and_border_img[y][bW-1] = 32;
		}
		// corners
		plats_and_border_img[0][0] = 25;
		plats_and_border_img[0][bW-1] = 27;
		plats_and_border_img[bH-1][0] = 57;
		plats_and_border_img[bH-1][bW-1] = 59;
		// ---------------------------------------
		
		
		
		// temporary corners to stand on for exits (change to plats_and_border_grid?)
		//this.dot_(plats_and_border_img, 1, bbtm);
		//this.dot_(plats_and_border_img, bW-2, bbtm);
		//plats_and_border_grid[bbtm][1] = 1;
		//plats_and_border_grid[bbtm][bW-2] = 1;
		/*
			let p_0 = new pnode();
			let p_1 = new pnode();
			let p_2 = new pnode();
			let p_3 = new pnode();
			let p_4 = new pnode();
			
			p_0.setNext(p_1, 1, 0);
			p_1.setNext(p_2, 2, 1);
			p_2.setNext(p_3, 3, 0);
			p_3.setNext(p_4, 5, -1);
			
			
			
		
		/**/
		
		// ------- set up chain structure here ------
		let init_grnd_width = rnd(4, 10); //2
		let init_grnd_thick = 1;
		let init_grnd_x = 0;
		let init_grnd_y = 10;//rnd(2, 10); // this is a temporary solution, probably should have a better approach
		
		let ground_struct = new pnode(init_grnd_width, init_grnd_thick, init_grnd_x, init_grnd_y); // starting tile
		
		// these will depend on whether areas have left vs right, or top vs bottom exit
		let temp_x = 0;
		let temp_y = gbtm-init_grnd_y;	// find last exit on right, if possible
		
		// 10 styles for each difficulty (10 difficulties, for 100 styles with different parameters)
		let pstyles = this.shuffleArray(PLAT_STYLE); // different PLAT_STYLEs are found in ./src/objects.js
		let pN = pstyles.length;
		let p_ = 0;
		let pm = pstyles[p_];
			
		let chunks = this.shuffleArray([8, 8, 8, 8, 8, 8, 8, 8, 8, 16, 16, 16, 16, 32, 32, 64]); // 
		//let chunks = this.shuffleArray([2,2,2,2,2,2,2,2,4,4,4,4,4,4,8,8,8,8,8,8,16,16,16,16,32]);
		
		let cN = chunks.length; // number of chunks
		let c_ = 0;
		let chunk = chunks[c_];
		let cC = 0; // chunk cycle
		
		let last_plat_width = 0;
		let last_plat_y = 0;
		
		// create chain -- grab initial platform
		let curr_plat = ground_struct;
		while (temp_x < aW) {
			
			let keep_from_top = 0;
			if (temp_y - 6 < 0){
				keep_from_top = 3;
			}
			
			//let rw = rnd(2,5);
			//let rh = 1;
			//let rg = rnd(1,4);
			//let ry = rnd(-1,2);
			let rw = rnd(pm["rw0"], pm["rw1"]); // --- SET DIFFICULTY "flatness" sets the length of the platforms, how 'flat' the terrain is
			let rh = rnd(pm["rh0"], pm["rh1"]); // each platform is a random thickness. 0 means it reaches the bottom
			let rg = rnd(pm["rg0"], pm["rg1"]); // --- SET DIFFICULTY "gaps" sets the distance between platforms
			let ry = rnd(-pm["ry0"], keep_from_top+1+pm["ry1"]); // --- SET DIFFICULTY "steepness" sets the hill steepness
			
			
			// prevent chain from going below level
			// OR use perlin noise
			if (temp_y+ry >= aH) {
				ry = -1; // bring it back up
			} else if (temp_y+ry < 0) {
				ry = 1; // bring it back down
			}
			
			
			temp_y += ry;
			temp_x += rw + rg;
			
			
			last_plat_width = rw + rg;
			last_plat_y = temp_y;
			
			// height is relative vertical distance from platform below, x and y are absolute
			let next_plat = new pnode(rw, rh, temp_x, temp_y); // testing
		  curr_plat.setNext(next_plat, rg, ry);//, temp_x, temp_y);
			
			//testing
			//curr_plat.setNext(next_plat, rg, ry, 3+5, gbtm-init_grnd_y);
			
		  curr_plat = next_plat;
			
			
			// ------ chunk cycle -------
			cC += rw + rg;
			if (cC > chunk) {
				//console.log("reset chunk at "+temp_x);
				cC = 0;
				c_++;
				if (c_ >= cN) {
					c_ = 0;
				}
				chunk = chunks[c_];
				
				p_++;
				if (p_ >= pN) {
					p_ = 0;
				}
				pm = pstyles[p_];
			}
		}
		
		
		
		//let curr_plat = ground_struct.getFromChain(0);
		//temp_x = curr_plat["x"]; // reset 
		//temp_y = curr_plat["y"];
		//temp_y = gbtm-init_grnd_y; // reset
		
		// place platform chain to grid
		for (let plat of ground_struct.getChain()) {
			temp_x = plat["x"];
			temp_y = plat["y"];
			//console.log(plat["index"]+" "+plat["x"]+" ");
			//let temp_x = plat["x"] + plat["gap"]
			for (let j=0; j<plat["thick"] && (temp_y+j>=0 && temp_y+j<aH); j++) {
				for (let i=0; i<plat["width"] && (temp_x+i>=0 && temp_x+i<aW); i++) {
					plats_and_border_grid[temp_y+j][temp_x+i] = 1;
					//plats_and_border_grid[aH-(15-i)][temp_x+i] = 1;
				}
			}
			
			
			// testing, seeing how wide each plat is
			plats_and_border_grid[aH-31][temp_x] = 1;
			for (let i=0; i< plat["width"]; i++) {
				plats_and_border_grid[aH-(29-i)][temp_x+i] = 1;
			}
			
			//temp_x = plat["next_height"];
			
			//temp_x += plat["width"]+plat["next_gap"];
			//temp_y += plat["next_height"];
		}
		
		
		//let up = "vomit";
		//throw up;
		
		
		
		
		//  === === === === === branches === === === === ===
		let branch_i = 0;
		
		let nplats = ground_struct.getChain(0).length; //
		let nbranches = 5;//rnd(3, 10); // first layer
		let spl = [...Array(nplats-3).keys()];
		
		//spl.splice(0,1);
		let branch_points = this.shuffleArray(spl).slice(0, nbranches).sort(function(a_, b_) {return a_-b_});
		
		//console.log(branch_points);
		//console.log(ground_struct.getFromChain(branch_points[0]));
		//console.log(ground_struct.getFromChain(branch_points[1]));
		//console.log(ground_struct.getFromChain(branch_points[2]));
		
		//let up = "vomit";
		//throw up;
		
		for (let br=0; br<branch_points.length; br++) {
			
			let brp = branch_points[br];
			//console.log(brp);
			let rgt_x = area["width"]-1; // default right boundary if no next platform
			if (br < branch_points.length-1) {
				let brp_next = branch_points[br+1];
				let next_branch = ground_struct.getFromChain(brp_next);
				rgt_x = next_branch["x"]+Math.floor(next_branch["width"]/2)-2;
				
				//testing:
				rgt_x = next_branch["x"]-2;
			}
			
			
			let branch = ground_struct.getFromChain(brp);
			
			let b0_x = branch["x"];//+Math.floor(branch["width"]/2)-1; // get x index of starting branch plat
			
			//testing
			//plats_and_border_grid[aH-32][b0_x] = 1;
			
			
			
			
			let b0_dir = rnd(0,2); // direction (left, right)
			if (b0_dir > 0) {
				b0_x++;
			}
			
			//testing: 
			b0_x = branch["x"]+1;
			
			let b0_ry = 3;//rnd(3, 6); // 2,3,4,5   relative y from original plat;
			
			let b0_y = branch["y"]-b0_ry-1 >= 0 ? branch["y"]-b0_ry-1 : 0; // get y index of starting branch plat
			
			//plats_and_border_grid[b0_y][b0_x] = 1; // place starting block
			
			// bounding box indices
			let top_y = b0_y-5; // from
			let lft_x = b0_x+1; // from
			
			let bot_y = branch["y"]-3; // to
			//  rgt_x // to
			
			//console.log(b0_x+" "+bot_y+"-"+top_y+" "+rgt_x+"-"+lft_x);
			let box_height = bot_y-top_y;
			let box_width = rgt_x-lft_x;
			
			try {
				let b_area_grid = [...Array(box_height)].map(_ => Array(box_width).fill(0)); // <---- try this
				for (let ay=bot_y-1, j=box_height-1; ay>=top_y && ay>=0; ay--, j--) {
					// 
					for (let ax=lft_x, i=0; ax<rgt_x && ax<aW; ax++, i++) {
						//
						//console.log(ax+"+"+i+" "+ay+"+"+j+"  bw="+box_width+" bh="+box_height+" "+b_area_grid[0].length+" "+b_area_grid.length);
						//console.log("b_area_grid["+j+"]["+i+"]    "+b_area_grid.length+" "+b_area_grid[0].length);
						//b_area_grid[j][i] = 1;
						//plats_and_border_grid[ay][ax] = 1;
						// check below	
					}
				}
				this.placeOnGrid(b_area_grid, plats_and_border_grid, lft_x, top_y);
			} catch (e) {
				//console.log(e);
			}
			/*
			0
			1
			2 []  \
			3 []   |3
			4 []  /
			*/
			//this.placeStructure(b_area_grid, plats_and_border_grid, lft_x, top_y, 0, "image", 1); // "image"
			
			
			// determine bounding area first before doing 'plats_and_border_grid[b0_y][i] = 1;'
			// bounding area
			/*
			for (let i=b0_x+1; i<max_x-1; i++){
				//let b0_thk = rnd(1, max_low); // 1,2,3 thickness
				let isHole = true;
				let y_offset = 0;
				for (let j=b0_y; j<aH; j++) {
					if (plats_and_border_grid[j][i] === 1) {
						isHole = false;
						break;
					}
				}
				if (isHole) {
					//plats_and_border_grid[b0_y][i] = 1;
				} else {
					//plats_and_border_grid[b0_y][i] = 1;
				}
			}*/
			//console.log(b0_dir+" "+area_index+" "+b0_x+" "+area["width"]+" "+area["height"]+" "+branch["x"]+" "+branch["y"]);
			
		}
		
		//for (let plat of ground_struct.getChain(0)) {
		
		//if (branch_i < branch_points.length && plat["index"] == branch_points[branch_i]) {
			/*
			let next_pbranch = ground_struct.getFromChain(plat["index"]+1);
			let max_x = next_pbranch["x"];
			
			let b0_ry = rnd(2, 6); // 2,3,4,5   relative y from original plat;
			let max_low = 6-b0_ry;
			let b0_thk = rnd(1, max_low); // 1,2,3 thickness
			//console.log(""+b0_ry+" "+b0_thk);
			
			
			let b0_wdh = rnd(1,4); // width
			let temp_b_x = plat["x"];
			let b0_x = temp_b_x + Math.floor(plat["width"]/2)-1;
			let b0_dir = rnd(0,2); // direction (left, right)
			if (b0_dir > 0) {
				b0_x++;
			}
			
			//                      width=1, thick=1,  x=0,  y=0,  dir=1)
			let b0_struct = new pnode(b0_wdh, b0_thk, b0_x, b0_y, b0_dir);
			
			let bstyles = BRANCH[0];//this.shuffleArray(BRANCH); // 
			let bN = bstyles.length;
			let b_ = 0;
			let bm = bstyles[b_];
			
			
			
			//	- need to check how much space is available-- as big a square as possible in either direction
			//	- avoid creeping over to next platform
			//	- avoid going over edges   x >= 0,   x < area["width"],   y >= 0,   y < area["height"]
					
			
			
			
			
			let b_plat = b0_struct;
			while (temp_b_x < max_x && temp_b_x < aW) {
				let rw = rnd(bm["rw0"], bm["rw1"]);
			  let rh = rnd(bm["rh0"], bm["rh1"]);
				let next_b_plat = new pnode(rw, rh);
				let rg = rnd(bm["rg0"], bm["rg1"]); // --- SET DIFFICULTY "gaps" sets the distance between platforms
				let ry = rnd(-bm["ry0"], 1+bm["ry1"]); // --- SET DIFFICULTY "steepness" sets the hill steepness
				if (temp_b_y+ry >= aH) {
					ry = -1; // bring it back up
				} else if (temp_b_y+ry < 0) {
					ry = 1; // bring it back down
				}
			
			
				// height is relative vertical distance from platform below, x and y are absolute
			  curr_plat.setNext(next_plat, rg, ry, temp_x, temp_y); 
			  curr_plat = next_plat;
			
				plats_and_border_grid[plat["y"]-2][b0_x] = 1; // no lower than 2
				//plats_and_border_grid[plat["y"]-3][b0_xpos] = 1;
				//plats_and_border_grid[plat["y"]-4][b0_xpos] = 1;
				//plats_and_border_grid[plat["y"]-5][b0_x] = 1; // no higher than 5
			
			}
			
			
			// area["grid"][plat["y"]-7][b0_x] = 2;
			// area["image"].set(b0_x, plat["y"]-6, 8);
			// try {
			//	area["grid"][plat["y"]-12][b0_x+1] = 2;
			//	area["image"].set(b0_x+1, plat["y"]-7, 8);
			// } catch (e) {}
			
			
			
			// === === === === === === === === === === === === 
			
			
			
			
			branch_i++; //
			
		}/**/
		
		
		let exit_types = Object.keys(area["exits"]).map(ex => area["exits"][ex]["type"]);
		
		// ensure right side has a proper exit
		if (exit_types.includes(11)) {
			//console.log(last_plat_y);
			for (let j=last_plat_y; j<area["height"]; j++) {
				for (let i=area["width"]-1; i>area["width"]-last_plat_width; i--) {
					plats_and_border_grid[j][i] = 1;
				}
			}
		}
		
		
		
		
		
		
		
		// -------------- image values: border and corners ---------------
		
		// top and bottom edges
		for (let x=0; x<bW; x++) {
			plats_and_border_img[0][x] = 49;
			plats_and_border_img[bH-1][x] = 17;
		}
		// left and right edges
		for (let y=0; y<bH; y++) {
			plats_and_border_img[y][0] = 34;
			plats_and_border_img[y][bW-1] = 32;
		}
		// corners
		plats_and_border_img[0][0] = 25;
		plats_and_border_img[0][bW-1] = 27;
		plats_and_border_img[bH-1][0] = 57;
		plats_and_border_img[bH-1][bW-1] = 59;
		
		// use terrain grid to dot img grid
		for (let j=0; j<aH; j++) {
			for (let i=0; i<aW; i++) {
				if (plats_and_border_grid[j][i] === 1) {
					dot_(plats_and_border_img, i+1, j+1); //image is offset by one
					//console.log(i+" "+j);
				}
			}
		}
		
		// probably wait to move exits until all platforms are placed
		//let exit_types = Object.keys(area["exits"]).map(ex => area["exits"][ex]["type"]);
		//console.log(exit_types);
		
		
		//console.log(" "+ground_struct.getChain(0).length+" plats in width "+area["width"]+"");
		// 
		
		
		// moving exits
		//console.log("----- area "+area_index+" exits: -------");
		//let exit_types = Object.keys(area["exits"]).map(ex => area["exits"][ex]["type"]);
		//console.log(exit_types);
		tilesheet(ts_m);
		for (const e_i in area["exits"]) { // for each exit...
			/*
							"goto": goto_area,
							"gx": gx,
							"gy": gy,
							"gotox": gotox, 
							"gotoy": gotoy,
							"type": exit_type,
							"status": status, // activated/locked/unlocked/ etc
							"open_images": [234, 235, 218, 219, 202, 203],
							"images": [...]
			*/
			let exit = area["exits"][e_i];
			let ex = exit["gx"];
			let ey = exit["gy"];
			area["image"].set(ex,ey, exit["type"]);
			
			if ( [12, 13].includes(exit["type"]) ) {
				
				//area["image_front"].set(ex,ey, exit["type"]);
				continue;
			}
			
			//let exit_back = ;
			let finding_new_spot = true;
			
			for (let row_=1; row_<aH && finding_new_spot; row_++) { // start from the top and check each grid spot down
				let	grid_check = plats_and_border_grid[row_][ex];
				
				if ( grid_check > 0 ) { // if grid has something
					area["event_grid"][ey][ex] = 0; // unset old exit
					area["event_grid"][row_-1][ex] = exit["type"]; // set new exit 
					
					area["exits"][e_i]["gy"] = row_-1;
					//area["image_front"].set(ex, row_-1, exit["type"]);
					
					this.areas[exit["goto"]]["exits"][area_index]["gotoy"] = row_-1;
					
					finding_new_spot = false;
				}
			}
		}
		
		//   placeStructure(         from_img, to_area, ax=0, ay=0, toff=0, layer="image", ptype=1)
		this.placeStructure(plats_and_border_img, area,   -1,   -1,      0,       "image",       1); // "image"
		
	}
		
	testPlaceClimbObjects(area_index) {
		// ------ TESTING (putting ladders)--------
		tilesheet(ts_m);
		let area = this.areas[area_index];
		let nY = area["height"];
		let nX = area["width"];
		
		if (testing) {
			area["image_front"].set(ex, row_-1, exit["type"]);
			//area["image"].set(exits[e]["gx"], exits[e]["gy"], 192);
			//for (let y_=0; y_<nY; y_++) {
			let x_ = Math.floor(nX/2);
			area["grid"][0][x_] = 2;
			area["image_behind"].set(x_, 0, 8);
			//}
		}
	}
		//this.dot(area_index, 5, bm);
		//this.dot(area_index, 5, bm+1);
		//this.dot(area_index, 6, bm);
		//this.dot(area_index, 6, bm+1);
		
		//area["image"].set(area_index, bm-28, 193);  // ***** USE DOT *****
		
		
		//area["image"].set(3, 5, 193);  // ***** USE DOT *****
		//area["image"].set(2, 4, 193);  // ***** USE DOT *****
		
		//checkBlockIds(3,6);
		/*
		// climb (ladder, beanstalk)
		for (let y=0; y<area["height"]-1; y++) {
			area["grid"][y][1] = 2;
			area["image"].set(1, y, 242);
		}
			//}
		*/
		
	
	
	/*
	fixFloorOob(area_index) {
		let area = this.areas[area_index];
		let img = area["image"];
		let bm = area["height"]-1;
		let fix_tile = 0;
		let check_tile = 0;
		for (let x=0; x<area["width"]; x++) {
			check_tile = img.get(x, bm) ? img.get(x, bm)["sprite"] : 0;
			if (x == 0) {
				fix_tile = dot_order["oob_bl_corner"][check_tile.toString()];
			} else if (x == area["width"]-1) {
				fix_tile = dot_order["oob_br_corner"][check_tile.toString()];
			} else {
				fix_tile = dot_order["oob_bottom"][check_tile.toString()];
			}
			
			img.set(x, bm, fix_tile);
		}
	}
	*/
	
	testPlaceEnemies(area_index) {
		/*
				need an enemy spawner, for pnodes
		
		*/
		// need spawner
		
  	let area = this.areas[area_index];
		let nY = area["height"];
		let nX = area["width"];
	  // scatter jumping enemies
		
	  for (let spray_everywhere=0; spray_everywhere<1; spray_everywhere++) {
	    for (let i=0; i<1; i++) {
    
	      let rx = rnd(0, nX);
	      let ry = rnd(nY-20, nY);
      
	      create_small_enemy(rx*8, ry*8, "steadyjump", 0+i*16);
    
	    }
	  }
		/**/
  
	  // scatter walking enemies
		
	  for (let spray_everywhere=0; spray_everywhere<1; spray_everywhere++) {
	    for (let i=0; i<1; i++) {
      
	      let rx = rnd(0, nX);
	      let ry = rnd(nY-20, nY);
      
	      create_small_enemy(rx*8, ry*8, "walkbump", 0+i*16);
	    }
	  }
	  /**/
		
	  //create_small_enemy(30*8, 30*8, "walkbump", 0+0*16);
	  //create_small_enemy(11*8, 30*8, "steadyjump", 0+1*16);
	}
	
	
	
	testPlaceMovingPlatforms(area_index) {
	  // random moving platforms
  	let area = this.areas[area_index];
		let nY = area["height"];
		let nX = area["width"];
		
	  for (let i=0; i<5; i++) {
    
	    let rx = rnd(0, nX);
	    let ry = rnd(nY-10, nY);
			let rm = rnd(0, platforms.length);
    
	    create_platform(rx*8, ry*8, rm);
    
	  }
		//console.log("E ");
		/**/
		
		// try moving entire 'structures'?
	}
	
	
	
	
	
	// 
	build_areas(terrain_type="ground") {
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
				
		
		*/
		
		
		
		this.init_terrain_type = terrain_type;
		
		
		
		for (let i=0; i<this.numAreas; i++) {
			let x_screen_size = rnd(1,11);
			let y_screen_size = 1;
			let isVertical = false;
			// tall vs long levels, dont want them too big
			if (x_screen_size > 2) {
				y_screen_size = rnd(1,3);
			} else {
				y_screen_size = rnd(1,9);
				if (y_screen_size > 1) {
					isVertical = true;
				}
			}
			
			//let is_dungeon = rnd(0,3);
			this.build_area(i, x_screen_size, y_screen_size, isVertical);
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
		
		// place terrain after level graph is created
		for (let i=0; i<this.numAreas; i++) {
			this.testPlaceTerrain(i); // could have parameter for terrain 'style'
		}
		
		
		
		
		
		
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
	
	
	testScatter(area_index) {
		
		let area = this.areas[area_index];
		//let img = area["image"];
		
		
		/* ---------- TESTING new dot method ----------- */
		let myStruct = [...Array(30)].map(_ => Array(30).fill(0));
		
		//dot_(myStruct, 1, 4);
		//dot_(myStruct, 4, 5);
		//dot_(myStruct, 4, 6);
		//dot_(myStruct, 5, 6);
		//dot_(myStruct, 5, 5);
		//dot_(myStruct, 6, 6);
		//dot_(myStruct, 6, 7);
		
		
		let behind_floor = [...Array(7)].map(_ => Array(7).fill(0));
		/*
		this.dot_(behind_floor, 3, 1);
		this.dot_(behind_floor, 2, 2);
		this.dot_(behind_floor, 3, 2);
		this.dot_(behind_floor, 4, 2);
		this.dot_(behind_floor, 1, 3);
		this.dot_(behind_floor, 2, 3);
		this.dot_(behind_floor, 3, 3);
		this.dot_(behind_floor, 4, 3);
		this.dot_(behind_floor, 5, 3);
		this.dot_(behind_floor, 2, 4);
		this.dot_(behind_floor, 3, 4);
		this.dot_(behind_floor, 4, 4);
		this.dot_(behind_floor, 3, 5);
		*/
		
		let myStructBehind = [...Array(30)].map(_ => Array(30).fill(0));
		let myStructFront = [...Array(30)].map(_ => Array(30).fill(0));
		/*
		for (let y=0; y< myGrid.length; y++) {
			console.log(myGrid[y]);
		}
		*/
		
		
		
		/*
		this.dot(area_index, 10, 10);
		this.dot(area_index, 11, 10);
		this.dot(area_index, 12, 10);
		this.dot(area_index, 12, 11);
		this.dot(area_index, 13, 10);
		this.dot(area_index, 11, 11);
		*/
		
		/*
		this.dot(area_index, 10, 10);
		//this.dot(area_index, 10, 12);
		this.dot(area_index, 10, 11);
		//this.dot(area_index, 11, 11);
		this.dot(area_index, 11, 10);
		this.dot(area_index, 11, 11);
		//this.dot(area_index, 11, 10);
		this.dot(area_index, 9, 10);
		//this.dot(area_index, 10, 9);
		//this.dot(area_index, 11, 11);
		//this.dot(area_index, 9, 9);
		this.dot(area_index, 9, 11);
		//this.dot(area_index, 11, 9);
		
		//this.dot(area_index, 10, 10);
		
		
		this.dot(area_index, 20, 20);
		this.dot(area_index, 21, 20);
		this.dot(area_index, 22, 20);
		
		this.dot(area_index, 20, 22);
		this.dot(area_index, 21, 22);
		this.dot(area_index, 22, 22);
		
		this.dot(area_index, 20, 21);
		//
		this.dot(area_index, 22, 21);
		this.dot(area_index, 21, 21);
		this.dot(area_index, 21, 21);
		this.dot(area_index, 23, 21);
		this.dot(area_index, 23, 20);
		this.dot(area_index, 20, 23);
		this.dot(area_index, 20, 24);
		this.dot(area_index, 21, 23);
		this.dot(area_index, 21, 24);
		
		
		this.dot(area_index, 10, 23);
		this.dot(area_index, 10, 24);
		this.dot(area_index, 11, 23);
		this.dot(area_index, 11, 24);
		this.dot(area_index, 12, 23);
		this.dot(area_index, 12, 24);
		*/
		
		//this.dot
		//this.dot(area_index, 22, 20);
		
		let amount = 200;
		let xx_ = 0;
		let yy_ = 0;
		
		for (let a=0; a<amount; a++) {
			xx_ = rnd(1, 20);
			yy_ = rnd(1, 20);
			
			dot_(myStruct, xx_, yy_);
			
		}
		/*
		for (let a=0; a<600; a++) {
			xx_ = rnd(1, 20);
			yy_ = rnd(1, 20);
			
			dot_(myStructBehind, xx_, yy_);
			
		}
		
		for (let a=0; a<100; a++) {
			xx_ = rnd(1, 20);
			yy_ = rnd(1, 20);
			
			dot_(myStructFront, xx_, yy_);
			
		}
		*/
		
		//this.dot(area_index, 7, 8);
		/**/
		
		//this.dot(area_index, 7, 8);
		//let area = this.areas[0];
		//this.placeStructure(myStruct, area, 10, 10, 1);
		this.placeStructure(myStructFront, area, 5, 5, 0, "image_front");
		this.placeStructure(myStructBehind, area, 5, 5, 2, "image_behind");
		
		
		//this.placeStructure(behind_floor, area, 10, 28, 0, "image_front");
		//this.placeImageStructure(myStruct, area, 8, 9, 0);
		
		
	}
	
	
}




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




/* ========================= INITIALIZE (can be random) =========================== */

tilesheet(ts_1); // can change tile sheet later on with this

// these are found in the LevelGraph
//var width = 32; // 32 is one 'screen', 64 is two 'screens' 
//var height = 32;
//var rt = width-1;
//var bm = height-1;
//var level_pixel_width = width*8;


//Math.floor(width/2);
//var curr_level = create_level();


var TileMap = require('pixelbox/TileMap');

// random number of rooms and graph but all the same size 
// need to randomize room sizes
let numMainRooms = 5;//rnd(3, 5);
let numExtra = 3;//rnd(4, 10);
let newLevel = new LevelGraph(numMainRooms, numExtra);

//console.log();

newLevel.build_areas();


//newLevel.build_area(0);
//newLevel.build_area(1);
//newLevel.build_area(2);



//newLevel.testPlaceFloor(0);
//newLevel.testPlaceFloor(1);
//newLevel.testPlaceFloor(2);
//newLevel.build_area(1);

var curr_area = newLevel.areas[current_area];
reset_position_x = 7*8;
reset_position_y = 10*8;
p.x = reset_position_x;
p.y = reset_position_y;

var level_image_ = curr_area["image"];//new TileMap(width, height);
var level_image_behind = curr_area["image_behind"];//new TileMap(width, height);
var level_image_front = curr_area["image_front"];//new TileMap(width, height);

var level_grid_ = curr_area["grid"];//[...Array(height)].map(_ => Array(width).fill(0));
var level_events_ = curr_area["event_grid"];

//console.log()
var width = curr_area["width"]; // 32 is one 'screen', 64 is two 'screens' 
var height = curr_area["height"];
var rt = width-1;
var bm = height-1;
var level_pixel_width = width*8;
var level_pixel_height = height*8;


// start music. should start depending on screen -- title, level, world
start_music();





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

function update_world() {
  
}







// curr_area is the object, current_area is the index



//console.log("hello thal");

//start_music();

var l_offset = 0;
var u_offset = 0;
const info_box_offset = 0;//48;
function update_level() {
	
	// if (finished_animation)  
	if (activated_area > -1) {
		
		//console.log("going from area "+current_area+" to "+activated_area);
		if (entering) {
			update_door(activated_area);
		} else {
			curr_area = newLevel.areas[activated_area];
			current_area = activated_area;
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
		}
	}
	
	//let jj = level_image_.get(2,5)
	//console.log(jj);
	//console.log(level_image_.get(0,31));
	//checkBlockIds(2, 5);
	
	
	
	
	
	
	
  update_moving_platforms(); //takes priority over player
  
  //check_platform_collision();
  
  player1_movement();
  player2_movement();
  
  player1_animation();
  player2_animation();
  
  projectile_update(); // update takes care of movement and animation
  
  update_small_enemies();
	
	
	
  // drawing
  cls();
	background_scroll();
	
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
	tilesheet(ts_m);
	
	draw(level_image_behind, l_offset-p.x*lfe*rte, u_offset-p.y*tpe*bte-info_box_offset);
	draw(level_image_, l_offset-p.x*lfe*rte, u_offset-p.y*tpe*bte-info_box_offset);
	
	
	
	
	tilesheet(ts_1); // could have separate one for objects
	
	draw_doors();
  draw_moving_platforms();
	
  tilesheet(ts_se);
  draw_small_enemies();
  
  tilesheet(ts_2);
	
	//print(p.x+" ", 64);
  // draw 6 player 2 sprite tiles:
  sprite(psheet2[0]+(pframe2*2), l_offset+p2.x-XOFFSET+(8*going_left2)-p.x*lfe*rte, u_offset+p2.y-YOFFSET-p.y*tpe*bte-info_box_offset, going_left2);
  sprite(psheet2[1]+(pframe2*2), l_offset+p2.x+8-XOFFSET-(8*going_left2)-p.x*lfe*rte, u_offset+p2.y-YOFFSET-p.y*tpe*bte-info_box_offset, going_left2);
  sprite(psheet2[2]+(pframe2*2), l_offset+p2.x-XOFFSET+(8*going_left2)-p.x*lfe*rte, u_offset+p2.y+8-YOFFSET-p.y*tpe*bte-info_box_offset, going_left2);
  sprite(psheet2[3]+(pframe2*2), l_offset+p2.x+8-XOFFSET-(8*going_left2)-p.x*lfe*rte, u_offset+p2.y+8-YOFFSET-p.y*tpe*bte-info_box_offset, going_left2);
  sprite(psheet2[4]+(pframe2*2), l_offset+p2.x-XOFFSET+(8*going_left2)-p.x*lfe*rte, u_offset+p2.y+16-YOFFSET-p.y*tpe*bte-info_box_offset, going_left2);
  sprite(psheet2[5]+(pframe2*2), l_offset+p2.x+8-XOFFSET-(8*going_left2)-p.x*lfe*rte, u_offset+p2.y+16-YOFFSET-p.y*tpe*bte-info_box_offset, going_left2);
  
  tilesheet(ts_1);
  // draw 6 player 1 sprite tiles:
  sprite(psheet[0]+(pframe*2), XMID-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge-YOFFSET+bottom_edge-info_box_offset, going_left);
  sprite(psheet[1]+(pframe*2), XMID-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge-YOFFSET+bottom_edge-info_box_offset, going_left);
  sprite(psheet[2]+(pframe*2), XMID-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge+8-YOFFSET+bottom_edge-info_box_offset, going_left);
  sprite(psheet[3]+(pframe*2), XMID-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge+8-YOFFSET+bottom_edge-info_box_offset, going_left);
  sprite(psheet[4]+(pframe*2), XMID-left_edge-XOFFSET+(8*going_left)+right_edge, YMID-top_edge+16-YOFFSET+bottom_edge-info_box_offset, going_left);
  sprite(psheet[5]+(pframe*2), XMID-left_edge+8-XOFFSET-(8*going_left)+right_edge, YMID-top_edge+16-YOFFSET+bottom_edge-info_box_offset, going_left);
  
	//tilesheet(ts_m);
	//draw(level_image_front, l_offset-p.x*lfe*rte, u_offset-p.y*tpe*bte-info_box_offset);
  
	tilesheet(ts_1);
	draw_projectiles();
  
  // for whichever sprites are 'in' the window view
  // (condition is just whether sprites are within some distance from the player)
  
  //draw(info_bar, 0, SCREEN_HEIGHT-info_box_offset)
  
  if (test_toggle_anim) {
    draw(face[face_frames[face_frame]], 16, 16);//SCREEN_HEIGHT-48);
    
  }
	
  debug_print();
  
  
  let thisLoop = Date.now();
  fps = Math.round(1000 / (thisLoop - lastLoop));
  lastLoop = thisLoop;
	
	
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
	print("area: "+area_string, 8, 0); //+" keys: "+has_key
	print(newLevel.area_info(current_area), 160, 200);
  //print(score, 100, 16);
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
var max_dt = 2; // change 'speed' of game
var lastLoop = 1;
var fps = 0;
var fps_display = 0;



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
  if (dt - combo_start > 180) combo = 0;
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
	// curr_area["terrain"]
	if (current_area == newLevel.finalArea) {
		// BOSS music
	} else if (curr_area["terrain"] === "ground") {
		//music('testA', 0.4); // castle
	} else if (current_area === 0) {
		//music('Theme2Day', 0.4); // castle
	} else if (current_area === 1) {
		//music('Theme2Night', 0.3); // outdoor night
	} else if (current_area === 2) {
		//music('Theme3Day', 0.4); // outdoor day
	}
	
	
}



/* ========================== UPDATE ============================== */
var state = "level";

exports.update = function () {
  
	frame_dt++;
	if (frame_dt >= max_dt) {
		
		frame_dt = 0;
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
  
  //score++;

};












