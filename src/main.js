// update is called once per frame
//import gamepad;
import { platforms } from "./platforms.js";
//import { tileinfo } from "./objects.js";
//import { build_test_level } from "./build_level.js";
//import { build_level } from "./build_level.js";

// pyqt5 pixel editor for small level areas, converts into a level array then click on 'copy' button, or convert to a file?





// Development/projects/thalgame
/*

----------
current TODO:

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
    - bongos -- changes enemy behaviour of the game
    
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
for animation/movie sequences, she could have 'simpsons' strabismus eyes when being silly





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

// this will also have tilesheets for each one
const TERRAIN = {
	"peak": {
		"10": ["peakright", "peak"],
		"11": ["peakleft", "peak"],
		"12": ["mountain"],
		"13": ["sky"],
		"4": ["insidecavetop"],
		
	},
	"peakright": {
		"10": ["sky"],
		"11": ["peak"],
		"12": ["cliffright"],
		"13": ["sky"],
		"4": ["insidecavetop"],
		
	},
	"peakleft": {
		"10": ["peak"],
		"11": ["sky"],
		"12": ["cliffleft"],
		"13": ["sky"],
		"4": ["insidecavetop"],
		
	},
	
	"mountain": {
		"10": ["mountain", "cliffright"],
		"11": ["mountain", "cliffleft"],
		"12": ["mountain", "caveground"],
		"13": ["mountain", "peak"],
		"4": ["insidecave"],
		
	},
	"cliffright": {
		"10": ["aboveground"],
		"11": ["mountain"],
		"12": ["cliffright", "caveright"],
		"13": ["cliffright", "peakright"],
		"4": ["insidecave"],
		
	},
	"cliffleft": {
		"10": ["mountain"],
		"11": ["aboveground"],
		"12": ["cliffleft", "caveleft"],
		"13": ["cliffleft", "peakleft"],
		"4": ["insidecave"]
	},
	
	"caveground": {
		"10": ["caveground", "caveright"],
		"11": ["caveground", "caveleft"],
		"12": ["underground"],
		"13": ["mountain"],
		"4": ["insidecave"]
	},
	"caveleft": {
		"10": ["caveground"],
		"11": ["ground", "caveright"],
		"12": ["underground"],
		"13": ["cliffleft"],
		"4": ["insidecave"]
	},
	"caveright": {
		"10": ["ground", "caveleft"],
		"11": ["caveground"],
		"12": ["underground"],
		"13": ["cliffright"],
		"4": ["insidecave"]
	},
	
	"underground": {
		"10": ["underground"],
		"11": ["underground"],
		"12": ["underground"],
		"13": ["underground", "ground"],
		"4": ["underground"]
	},
	
	"ground": {
		"10": ["ground", "caveleft", "towergroundleft"],
		"11": ["ground", "caveright", "towergroundright"],
		"12": ["underground"],
		"13": ["aboveground"],
		"4": ["underground"]
	},
	
	"aboveground": {
		"10": ["aboveground", "cliffleft", "roofleft"],
		"11": ["aboveground", "cliffright", "roofright"],
		"12": ["ground"],
		"13": ["sky"]
	},
	
	"sky": {
		"10": ["sky", "peakleft", "roofleft"],
		"11": ["sky", "peakright", "roofright"],
		"12": ["aboveground"],
		"13": ["sky"]
	},
	
	"roof": {
		"10": ["roofright", "roof"],
		"11": ["roofleft", "roof"],
		"12": ["tower"],
		"13": ["sky"],
		"4": ["insidetowertop"]
	},
	"roofright": {
		"10": ["sky"],
		"11": ["roof"],
		"12": ["towerright"],
		"13": ["sky"],
		"4": ["insidetowertop"]
	},
	"roofleft": {
		"10": ["roof"],
		"11": ["sky"],
		"12": ["roofleft"],
		"13": ["sky"],
		"4": ["insidetowertop"]
	},
	
	"tower": {
		"10": ["towerright"],
		"11": ["towerleft"],
		"12": ["towerground"],
		"13": ["roof"],
		"4": ["insidetower"]
	},
	"towerright": {
		"10": ["aboveground"],
		"11": ["tower"],
		"12": ["towergroundright"],
		"13": ["roofright"],
		"4": ["insidetower"]
	},
	"towerleft": {
		"10": ["tower"],
		"11": ["aboveground"],
		"12": ["towergroundleft"],
		"13": ["roofleft"],
		"4": ["insidetower"]
	},
	
	"towerground": {
		"10": ["towergroundright"],
		"11": ["towergroundleft"],
		"12": ["underground"],
		"13": ["tower"],
		"4": ["insidetowerground"]
	},
	"towergroundright": {
		"10": ["ground"],
		"11": ["towerground"],
		"12": ["underground"],
		"13": ["towerright"],
		"4": ["insidetowerground"]
	},
	"towergroundleft": {
		"10": ["towerground"],
		"11": ["ground"],
		"12": ["underground"],
		"13": ["towerleft"],
		"4": ["insidetowerground"]
	},
	
	"insidecavetop": {
		"10": ["insidecavetop"],
		"11": ["insidecavetop"],
		"12": ["insidecave"],
		"13": ["peak", "peakleft", "peakright"],
		"4": ["peak", "peakleft", "peakright", "mountain", "cliffleft", "cliffright"]
	},
	"insidecave": {
		"10": ["insidecave"],
		"11": ["insidecave"],
		"12": ["insidecave"],
		"13": ["insidecave", "insidecavetop"],
		"4": ["insidecave", "mountain", "cliffleft", "cliffright", "caveground", "caveleft", "caveright"]
	},
	
	// sheet
	"insidetowertop": {
		"10": ["insidetowertop"],
		"11": ["insidetowertop"],
		"12": ["insidetower"],
		"13": ["roof", "roofleft", "roofright"],
		"4": ["roof", "roofleft", "roofright", "insidetowertop"]
	},
	"insidetower": {
		"10": ["insidetower"],
		"11": ["insidetower"],
		"12": ["insidetowerground"],
		"13": ["insidetowertop"],
		"4": ["insidetower", "tower", "towerleft", "towerright"]
	},
	"insidetowerground": {
		"10": ["insidetowerground"],
		"11": ["insidetowerground"],
		"12": ["basement"],
		"13": ["insidetower"],
		"4": ["insidetowerground", "towerground", "towergroundleft", "towergroundright"]
	},
	
	"basement": {
		"10": ["basement"],
		"11": ["basement"],
		"12": ["basement"],
		"13": ["basement", "insidetower"],
		"4": ["basement"]
	}
}





/* ======================================================== */



// for players 1 and 2 (3 tiles tall, 2 tiles wide)
function get_psheet(anim_index){
  return [
    anim_index, anim_index+1,
    anim_index+16,anim_index+17,
    anim_index+32,anim_index+33
  ];
}



// positions on the spritesheet.
const ZEN = [
	
	// Thal
  {
    "idle": 144,
    "jump": 54,
    "run": 148,
    "fall": 54,
    "shoot": 56,
    "slide": 148,
    "skid": 106,
    "climb": 102,
		"door": 56,
  },
	
	// Thal (no helmet)
  {
    "idle": 0,
    "jump": 48,
    "run": 4,
    "fall": 48,
    "shoot": 50,
    "slide": 4,
    "skid": 100,
    "climb": 112,
		"door": 52,
  },
	
	// Enx
  {
    "idle": 0,
    "jump": 48,
    "run": 4,
    "fall": 12,
    "shoot": 50,
    "slide": 6,
    "skid": 100,
    "climb": 102,
  },
];


var HEAD = 0;
var HEAD2 = 2;


const XOFFSET = 4;
const YOFFSET = 16;

var p = { x: 3*8, y: 29*8 }; //player
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
	
	plat.image = 226;
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
				console.log(p.x+" "+level_pixel_width);
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

var pr_offset = 0;
function draw_projectiles(){
	if (left_edge == 0) {
		pr_offset = SCREEN_WIDTH-XMID;
	} else {
		pr_offset = XMID;
	}
	if (right_edge == 0) {
	} else {
		pr_offset = -(level_pixel_width - SCREEN_WIDTH);
	}
	
  for (let ib=0; ib<bb_shots.length; ib++){
    let bb = bb_shots[ib];
    //sprite(bb.image+bb.frames[bb.frame], bb.x-(p.x+XMID), bb.y-(p.y+YMID));
    sprite(bb.image+bb.frames[bb.frame], bb.x+pr_offset-p.x, bb.y+YMID-p.y); // off edges the shot doesnt show
    
  }
  for (let si=0; si<snake_segs.length; si++){
    let ss_ = snake_segs[si];
    //sprite(bb.image+bb.frames[bb.frame], bb.x-(p.x+XMID), bb.y-(p.y+YMID));
    sprite(ss_.image+ss_.frames[ss_.frame], ss_.x+pr_offset-p.x*lfe*rte, ss_.y+YMID-p.y);
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

var mp_offset = 0;
function draw_moving_platforms(){
	if (left_edge == 0) {
		mp_offset = SCREEN_WIDTH-XMID;
	} else {
		mp_offset = 0;
	}
	if (right_edge == 0) {
	} else {
		mp_offset = -(level_pixel_width - SCREEN_WIDTH);
	}
	
  for (let ip=0; ip<moving_platforms.length; ip++){
    let plfm = moving_platforms[ip];
    sprite(plfm.image+plfm.frames[plfm.frame], plfm.x+mp_offset-p.x*lfe*rte, plfm.y+YMID-p.y*tpe*bte);
    
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

var en_offset = 0;
function draw_small_enemies() {
	if (left_edge == 0) {
		en_offset = SCREEN_WIDTH-XMID;
	} else {
		en_offset = 0;
	}
	if (right_edge == 0) {
	} else {
		en_offset = -(level_pixel_width - SCREEN_WIDTH);
	}
	
  // ses == small enemy sprites
  for (let ses=0; ses<small_enemies.length; ses++){
    let e = small_enemies[ses];
    
    if (e.dead_frames%2 == 0) {
      e.dead_frame = e.dead_frame == 4? 8:4;
    }
    
    sprite(e.image+e.frames[e.frame]+e.dead_frame, e.x+en_offset-p.x*lfe*rte, e.y+YMID-p.y, e.going_left);
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
  draw(bg1, le_ - bg_width - bg_dist_0, 0+12);
  draw(bg1, le_ - bg_dist_0, 0+12);
  draw(bg1, le_ + bg_width - bg_dist_0, 0+12);
	draw(bg1, le_ + bg_width*2 - bg_dist_0, 0+12);
  
  
  bg_dist_1 = Math.floor(p.x/4)*lfe*rte + bg_offset_1;
	
	
	
  draw(bg1b, le_ - bg_width - bg_dist_1, 0+12);
  draw(bg1b, le_ - bg_dist_1, 0+12);
  draw(bg1b, le_ + bg_width - bg_dist_1, 0+12);
	draw(bg1b, le_ + bg_width*2 - bg_dist_1, 0+12);
  
	//console.log(bg_offset);
	
	
	
}
















// USE: inherits(Child, Parent) make class Child inherit from class Parent



/* ========================= PLATFORM NODES =========================== */

class pnode {
  // a pnode is a platform node or singular block
  // 'length' will determine which sprites to display according to the ptypes
  constructor(ptype) {
    
    this.prev_pnode = null;
    this.prev_gap = 0; // gap between this pnode and the previous pnode
    this.prev_height = 0; // relative height of previous pnode
    this.prev_end = 0; // number of pnodes to the left
    
    this.branch = null;
    this.branch_height = 0;
    this.ptype = ptype;
    
    // could be individual 'blocks', then checks both the ptype
    // as well as the 
    // this.length = length; 
    
    
    //this.x = 0; // absolute x position on map 
    //this.y = 0; // absolute y position on map
    //this.art = null; // double array for which sprite tiles
    
    this.next_pnode = null;
    this.next_gap = 0; // gap between this pnode and the next pnode
    this.next_height = 0; // relative height of next pnode
    this.next_end = 0; // number of pnodes to the right
    
  }
  
  setPrev(prev_pnode, gap, height_) {
    this.prev_pnode = prev_pnode;
    this.prev_gap = gap;
    this.prev_height = height_;
    prev_pnode.next_pnode = this;
    prev_pnode.next_gap = gap;
    prev_pnode.next_height = -1*height_;
  }
  setBranch(branch_pnode, height_=0) {
    this.branch = branch_pnode;
    this.branch_height = height_;
    branch_pnode.branch = this;
    branch_pnode.branch_height = -1*height_;
  }
  setNext(next_pnode, gap=0, height_=0) {
    this.next_pnode = next_pnode;
    this.next_gap = gap;
    this.next_height = height_;
    next_pnode.prev_pnode = this;
    next_pnode.prev_gap = gap;
    next_pnode.prev_height = -1*height_;
  }
  
  hasPrev() {
    return this.prev_pnode ? true : false;
  }
  hasBranch() {
    return this.branch ? true : false;
  }
  hasNext() {
    return this.next_pnode ? true : false;
  }
  
  getPrev() {
    if (this.prev_node) {
      return this.prev_node.print();
    }
    return {};
  }
  getBranch() {
    if (this.branch) {
      return this.branch.print();
    }
    return {};
  }
  getNext() {
    if (this.next_node) {
      return this.next_node.print();
    }
    return {};
  }
  
  detach() {
    if (this.hasPrev()) {
      this.prev_pnode.next_pnode = null;
      this.prev_pnode.next_height = 0;
      this.prev_pnode.next_gap = 0;
    }
    if (this.hasNext()) {
      this.next_pnode.prev_pnode = null;
      this.next_pnode.prev_height = 0;
      this.next_pnode.prev_gap = 0;
    }
    if (this.hasBranch()){
      this.branch.branch = null;
      this.branch.branch_height = 0;
    }
    this.prev_pnode = null;
    this.prev_gap = 0;
    this.prev_height = 0;
    this.branch = null;
    this.next_pnode = null;
    this.next_gap = 0;
    this.next_height = 0;
    
  }
  
  // use this for console.log(pnode.info())
  info() {
    return {
      "prev_node": this.hasPrev(),
      "prev_gap": this.prev_gap,
      "prev_height": this.prev_height,
      "branch": this.hasBranch(),
      "ptype": this.ptype,
      "x": this.x,
      "y": this.y,
      "next_node": this.hasNext(),
      "next_gap": this.next_gap,
      "next_height": this.next_height,
      "next_end": this.next_end
    };
  }
  
}














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
	build_area(area_index, numScreensX=1, numScreensY=1) {
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
					terrain_type = ter_list[rnd(0, ter_list.length)];
					
					
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
			
			event_grid[exits[e]["gy"]][exits[e]["gx"]] = exits[e]["type"];
			
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
		}
		
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
	
	// ------- for testing -------- 
	
	testPlaceTerrain(area_index) {
		let area = this.areas[area_index];
		//let img_index = area_index === this.finalArea ? 192 : 208;
		//let img_offset = area_index === this.finalArea ? 0 : area_index;
		
		//let bm = area["height"];
		
		let bH = area["height"]+2;
		let bW = area["width"]+2;
		
		let gbtm = area["height"]-1;
		let bbtm = area["height"];
		let b0 = 1;
		
		
		let border = [...Array(bH)].map(_ => Array(bW).fill(0));
		
		// top and bottom edges
		for (let x=0; x<bW; x++) {
			border[0][x] = 49;
			border[bH-1][x] = 17;
		}
		// left and right edges
		for (let y=0; y<bH; y++) {
			border[y][0] = 34;
			border[y][bW-1] = 32;
		}
		// corners
		border[0][0] = 25;
		border[0][bW-1] = 27;
		border[bH-1][0] = 57;
		border[bH-1][bW-1] = 59;
		
		// create floor
		
		for (let x=1; x<bW; x++) {
			
			
			if (Math.abs(Math.floor(bW/2) - x) < 2) { continue; }
			
			this.dot_(border, x, bbtm);
			area["grid"][gbtm][x-1] = 1;
		}/**/
		
		this.dot_(border, 1, bbtm);
		area["grid"][gbtm][0] = 1;
		
		// could randomize floor bumps/ holes, and then place images behind or in front?
		/*
		this.dot_(behindborder, 1, bm);
		this.dot_(behindborder, 2, bm);
		this.dot_(behindborder, 3, bm);
		this.dot_(behindborder, 4, bm);
		this.dot_(behindborder, 5, bm);
		this.dot_(behindborder, 2, bm-1);
		this.dot_(behindborder, 3, bm-1);
		this.dot_(behindborder, 4, bm-1);
		this.dot_(behindborder, 5, bm-1);
		this.dot_(behindborder, 2, bm-2);
		this.dot_(behindborder, 3, bm-2);
		this.dot_(behindborder, 4, bm-2);
		this.dot_(behindborder, 2, bm-3);
		this.dot_(behindborder, 3, bm-3);
		this.dot_(behindborder, 4, bm-3);
		this.dot_(behindborder, 4, bm-4);
		this.dot_(behindborder, 3, bm-4);
		/**/
		
		this.placeStructure(border, area, -1, -1, 1); // "image"
		
		
		
			/*
			if (Math.abs(Math.floor(area["width"]/2) - x) <= 2){
				continue;
			}
			*/
			//area["grid"][bm][x] = 1;
			//this.dot(area_index, x, bm);
			//this.dot(area_index, x, bm+1);
			//area["image"].set(x, bm, 240 );  // ***** USE DOT *****
		return border;
	}
		
	testPlaceClimbObjects(area_index) {
		// ------ TESTING (putting ladders)--------
		tilesheet(ts_m);
		let area = this.areas[area_index];
		let nY = area["height"];
		let nX = area["width"];
		
		if (testing) {
			
			//area_image.set(exits[e]["gx"], exits[e]["gy"], 192);
			for (let y_=0; y_<nY; y_++) {
				let x_ = Math.floor(nX/2);
				area["grid"][y_][x_] = 2;
				area["image"].set(x_, y_, 8);
			}
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
	
	
	
	// ------- for testing -------- 
	testPlacePlatforms(area_index) {
		
		
		let area = this.areas[area_index];
		
		let ground_tile = new pnode(240);
		let prev_ground_tile = ground_tile;

		//let new_ground = ground;
		for (let i=0; i<20; i++) {
		  let new_ground_tile = new pnode(240+(i%2));
			let next_x = rnd(1,7);
			let next_y = rnd(-2, 3);
		  prev_ground_tile.setNext(new_ground_tile, next_x, next_y);
		  prev_ground_tile = new_ground_tile;
		}
		//console.log(ground.info());
		
		// view
		
		let temp = ground_tile;
		let x_ = 3;
		let y_ = 16;
		while (temp.hasNext()) {
		  //console.log(temp.ptype+" "+x+" "+y);
			if (x_ < area["width"] && y_ < area["height"]) {
				if (area["grid"][y_][x_] <= 9){ // don't paste over edge
					area["grid"][y_][x_] = 1;
				}
				area["image"].set(x_, y_, temp.ptype); // ***** USE DOT *****
				
			} else {
				console.log("oob! "+x_+" "+y_);
			}
			
			
		  x_ += temp.next_gap;
		  y_ += temp.next_height;
		  temp = temp.next_pnode;
			
		}
		/**/
		
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
			let x_screen_size = rnd(1,4);
			let y_screen_size = rnd(1,2);
			//let is_dungeon = rnd(0,3);
			this.build_area(i, x_screen_size, y_screen_size);
			//this.build_area(i, 1, 1);
			
			
			if (testing) {
				
				this.testPlaceTerrain(i);
				this.testScatter(i);
				//this.testPlaceFloor(i);
				this.testPlaceClimbObjects(i);
				//this.fixFloorOob(i);
				//this.testPlacePlatforms(i);
				//if (is_dungeon) {
					//this.makeAreaDungeon(i);
					//}
			
			}
			
		}
		
		
		
		
		
		
	}
	
	
	
	placeStructure(from_img, to_area, ax, ay, toff=0, layer="image") {
		// image_layer -> "image" "image_behind" "image_front"
		let tile_offset = toff*64;
		let to_area_img = to_area[layer];
		for (let iy=0; iy<from_img.length && ay+iy < to_area["height"]; iy++) {
			for (let ix=0; ix<from_img[0].length && ax+ix < to_area["width"]; ix++) {
				if (from_img[iy][ix] > 0 && (0 <= ay+iy && 0 <= ax+ix)) {
					to_area_img.set(ax+ix, ay+iy, from_img[iy][ix]+tile_offset);
				}
			}
		}
	}
	
	
	testScatter(area_index) {
		
		let area = this.areas[area_index];
		//let img = area["image"];
		
		
		/* ---------- TESTING new dot method ----------- */
		let myStruct = [...Array(30)].map(_ => Array(30).fill(0));
		
		this.dot_(myStruct, 1, 4);
		this.dot_(myStruct, 4, 5);
		this.dot_(myStruct, 4, 6);
		this.dot_(myStruct, 5, 6);
		this.dot_(myStruct, 5, 5);
		this.dot_(myStruct, 6, 6);
		this.dot_(myStruct, 6, 7);
		
		
		let behind_floor = [...Array(7)].map(_ => Array(7).fill(0));
		
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
			
			this.dot_(myStruct, xx_, yy_);
			
		}
		
		for (let a=0; a<600; a++) {
			xx_ = rnd(1, 20);
			yy_ = rnd(1, 20);
			
			this.dot_(myStructBehind, xx_, yy_);
			
		}
		
		for (let a=0; a<300; a++) {
			xx_ = rnd(1, 20);
			yy_ = rnd(1, 20);
			
			this.dot_(myStructFront, xx_, yy_);
			
		}
		
		
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
	
	
	
	
	
	
	
	
	
	dot_(img, i, j) {
		// return if on corner or edge 
		// to avoid array index oob errors, 2D img array should 
		//  be +2 wider and +2 higher than the actual image.
		// for grid, have correct images already along border before dotting
		
		
		// * * *    imgW = 3, indices: 0, 1, 2   imgW-2 =  1
		
		let imgH = img.length;
		let imgW = img[0].length;
		
		if (i <= 0 || i >= imgW-1 || j <= 0 || j >= imgH-1) return;
		
		let m = 1;
		let curr = img[j][i];
		if (curr) {
			return;
		}
		
		let tl = img[j-1][i-1];
		let tl_C = dot_order["tl"][tl.toString()];
		let tr = img[j-1][i+1];
		let tr_C = dot_order["tr"][tr.toString()];
		let bl = img[j+1][i-1];
		let bl_C = dot_order["bl"][bl.toString()];
		let br = img[j+1][i+1];
		let br_C = dot_order["br"][br.toString()];
		
		let t_ = img[j-1][i];
		if (t_) { m *= 2; }
		let t_C = 0;
		
		let _l = img[j][i-1];
		if (_l) { m *= 3; }
		let _lC = 0;
		
		let b_ = img[j+1][i];
		if (b_) { m *= 5; }
		let b_C = 0;
		
		let _r = img[j][i+1];
		if (_r) { m *= 7; }
		let _rC = 0;
		
		
		let o = 39;
		let p_ = 1;
		switch (m) {
			case (210): // all
				//p_ = 1;
				if (br_C) {
					//img.set(x_+1, y_+1, br_C);
					img[j+1][i+1] = br_C;
					p_ *= 2;
				}
				if (bl_C) {
					//img.set(x_-1, y_+1, bl_C);
					img[j+1][i-1] = bl_C;
					p_ *= 3;
				}
				if (tr_C) {
					//img.set(x_+1, y_-1, tr_C);
					img[j-1][i+1] = tr_C;
					p_ *= 5;
				}
				if (tl_C) {
					//img.set(x_-1, y_-1, tl_C);
					img[j-1][i-1] = tl_C;
					p_ *= 7;
				}
				switch (p_) {
					// 210
					case (210): // tl tr bl br (all)
						_lC = dot_order["l_m30"][_l.toString()];
						_rC = dot_order["r_m70"][_r.toString()];
						b_C = dot_order["b_m105"][b_.toString()];
						t_C = dot_order["t_m42"][t_.toString()];
						o = 33;
						break;
					case (105): // 3 5 7 bl tr tl
						t_C = dot_order["t_m42"][t_.toString()];
						_rC = dot_order["r_m14"][_r.toString()];
						_lC = dot_order["l_m30"][_l.toString()];
						b_C = dot_order["b_m15"][b_.toString()];
						o = 25;
						break;
					case (70): // 2 5 7 br tr tl
						_rC = dot_order["r_m70"][_r.toString()];
						b_C = dot_order["b_m35"][b_.toString()];
						t_C = dot_order["t_m42"][t_.toString()];
						_lC = dot_order["l_m6"][_l.toString()];
						o = 27;
						break;
						
					case (42): // 2 3 7 br bl tl
						_rC = dot_order["r_m35"][_r.toString()];
						b_C = dot_order["b_m105"][b_.toString()];
						_lC = dot_order["l_m30"][_l.toString()];
						t_C = dot_order["t_m6"][t_.toString()];
						o = 57;
						break;
					case (30): // 2 3 5 br bl tr
						t_C = dot_order["t_m14"][t_.toString()];
						_rC = dot_order["r_m70"][_r.toString()];
						_lC = dot_order["l_m15"][_l.toString()];
						b_C = dot_order["b_m105"][b_.toString()];
						o = 59;
						break;
					case (35): // 5 7 tr tl
						t_C = dot_order["t_m42"][t_.toString()];
						_lC = dot_order["l_m6"][_l.toString()];
						_rC = dot_order["r_m14"][_r.toString()];
						b_C = dot_order["b_"][b_.toString()];
						o = 52;
						break;
					case (21): // 3 7 bl tl
						t_C = dot_order["t_m6"][t_.toString()];
						_lC = dot_order["l_m30"][_l.toString()];
						b_C = dot_order["b_m15"][b_.toString()];
						_rC = dot_order["_r"][_r.toString()];
						o = 37;
						break;
					case (15): // 5 3 tr bl
						t_C = dot_order["t_m14"][t_.toString()];
						_rC = dot_order["r_m14"][_r.toString()];
						_lC = dot_order["l_m15"][_l.toString()];
						b_C = dot_order["b_m15"][b_.toString()];
						o = 61;
						break;
					case (14): // 2 7 tl br
						t_C = dot_order["t_m6"][t_.toString()];
						_lC = dot_order["l_m6"][_l.toString()];
						_rC = dot_order["r_m35"][_r.toString()];
						b_C = dot_order["b_m35"][b_.toString()];
						o = 60;
						break;
					case (10): // 2 5 br tr
						t_C = dot_order["t_m14"][t_.toString()];
						_rC = dot_order["r_m70"][_r.toString()];
						b_C = dot_order["b_m35"][b_.toString()];
						_lC = dot_order["_l"][_l.toString()];
						o = 35;
						break;
					case (6): // 2 3 br bl
						_lC = dot_order["l_m15"][_l.toString()];
						_rC = dot_order["r_m35"][_r.toString()];
						b_C = dot_order["b_m105"][b_.toString()];
						t_C = dot_order["t_"][t_.toString()];
						o = 20;
						break;
					case (7): // 7 tl
						_lC = dot_order["l_m6"][_l.toString()];
						_rC = dot_order["_r"][_r.toString()];
						b_C = dot_order["b_"][b_.toString()];
						t_C = dot_order["t_m6"][t_.toString()];
						o = 53;
						break;
					case (5): // 5 tr
						_lC = dot_order["_l"][_l.toString()];
						_rC = dot_order["r_m14"][_r.toString()];
						b_C = dot_order["b_"][b_.toString()];
						t_C = dot_order["t_m14"][t_.toString()];
						o = 51;
						break;
					case (3): // 3 bl
						_lC = dot_order["l_m15"][_l.toString()];
						_rC = dot_order["_r"][_r.toString()];
						b_C = dot_order["b_m15"][b_.toString()];
						t_C = dot_order["t_"][t_.toString()];
						o = 21;
						break;
					case (2): // 2 br
						_lC = dot_order["_l"][_l.toString()];
						_rC = dot_order["r_m35"][_r.toString()];
						b_C = dot_order["b_m35"][b_.toString()];
						t_C = dot_order["t_"][t_.toString()];
						o = 19;
						break;
					case (1): // 
						_lC = dot_order["_l"][_l.toString()];
						_rC = dot_order["_r"][_r.toString()];
						b_C = dot_order["b_"][b_.toString()];
						t_C = dot_order["t_"][t_.toString()];
						o = 42;
						break;
				}
				//img.set(x_+1, y_, _rC);
				img[j][i+1] = _rC;
				//img.set(x_-1, y_, _lC);
				img[j][i-1] = _lC;
				//img.set(x_, y_-1, t_C);
				img[j-1][i] = t_C;
				//img.set(x_, y_+1, b_C);
				img[j+1][i] = b_C;
				break;
			case (105): // 5 3 7 bottom left right
				//let p_ = 1;
				if (br_C) {
					//img.set(x_+1, y_+1, br_C);
					img[j+1][i+1] = br_C;
					p_ *= 2;
				}
				if (bl_C) {
					//img.set(x_-1, y_+1, bl_C);
					img[j+1][i-1] = bl_C;
					p_ *= 3;
				}
				switch (p_){
					case (6): // br bl
						_lC = dot_order["l_m15"][_l.toString()];
						_rC = dot_order["r_m35"][_r.toString()];
						b_C = dot_order["b_m105"][b_.toString()];
						o = 17;
						break;
					case (3): // bl
						_lC = dot_order["l_m15"][_l.toString()];
						b_C = dot_order["b_m15"][b_.toString()];
						_rC = dot_order["_r"][_r.toString()];
						o = 29;
						break;
					case (2): // br
						_lC = dot_order["_l"][_l.toString()];
						_rC = dot_order["r_m35"][_r.toString()];
						b_C = dot_order["b_m35"][b_.toString()];
						o = 30;
						break;
					case (1): //
						_lC = dot_order["_l"][_l.toString()];
						_rC = dot_order["_r"][_r.toString()];
						b_C = dot_order["b_"][b_.toString()];
						o = 55;
						break;
				}
				//img.set(x_+1, y_, _rC);
				img[j][i+1] = _rC;
				//img.set(x_-1, y_, _lC);
				img[j][i-1] = _lC;
				//img.set(x_, y_+1, b_C);
				img[j+1][i] = b_C;
				break;
			case (70): // 2 5 7 top right bottom
				//let p_ = 1;
				if (br_C) {
					//img.set(x_+1, y_+1, br_C);
					img[j+1][i+1] = br_C;
					p_ *= 2;
				}
				if (tr_C) {
					//img.set(x_+1, y_-1, tr_C);
					img[j-1][i+1] = tr_C;
					p_ *= 3;
				}
				switch (p_){
					case (6): // br tr
						t_C = dot_order["t_m14"][t_.toString()];
						_rC = dot_order["r_m70"][_r.toString()];
						b_C = dot_order["b_m35"][b_.toString()];
						o = 32;
						break;
					case (3): // tr
						t_C = dot_order["t_m14"][t_.toString()];
						_rC = dot_order["r_m14"][_r.toString()];
						b_C = dot_order["b_"][b_.toString()];
						o = 46;
						break;
					case (2): // br
						t_C = dot_order["t_"][t_.toString()];
						_rC = dot_order["r_m35"][_r.toString()];
						b_C = dot_order["b_m35"][b_.toString()];
						o = 28;
						break;
					case (1): // 
						t_C = dot_order["t_"][t_.toString()];
						_rC = dot_order["_r"][_r.toString()];
						b_C = dot_order["b_"][b_.toString()];
						o = 40;
						break;
				}
				//img.set(x_, y_-1, t_C);
				img[j-1][i] = t_C;
				//img.set(x_+1, y_, _rC);
				img[j][i+1] = _rC;
				//img.set(x_, y_+1, b_C);
				img[j+1][i] = b_C;
				break;
			case (42): // 2 3 7 top left right
				//let p_ = 1;
				if (tr_C) {
					//img.set(x_+1, y_-1, tr_C);
					img[j-1][i+1] = tr_C;
					p_ *= 2;
				}
				if (tl_C) {
					//img.set(x_-1, y_-1, tl_C);
					img[j-1][i-1] = tl_C;
					p_ *= 3;
				}
				switch (p_){
					case (6): // tr tl
						t_C = dot_order["t_m42"][t_.toString()];
						_lC = dot_order["l_m6"][_l.toString()];
						_rC = dot_order["r_m14"][_r.toString()];
						o = 49;
						break;
					case (3): // tl
						t_C = dot_order["t_m6"][t_.toString()];
						_lC = dot_order["l_m6"][_l.toString()];
						_rC = dot_order["_r"][_r.toString()];
						o = 47;
						break;
					case (2): // tr
						t_C = dot_order["t_m14"][t_.toString()];
						_lC = dot_order["_l"][_l.toString()];
						_rC = dot_order["r_m14"][_r.toString()];
						o = 44;
						break;
					case (1): // 
						t_C = dot_order["t_"][t_.toString()];
						_lC = dot_order["_l"][_l.toString()];
						_rC = dot_order["_r"][_r.toString()];
						o = 23;
						break;
				}
				//img.set(x_, y_-1, t_C);
				img[j-1][i] = t_C;
				//img.set(x_-1, y_, _lC);
				img[j][i-1] = _lC;
				//img.set(x_+1, y_, _rC);
				img[j][i+1] = _rC;
				break;
			case (30): // 2 3 5 top left bottom
				//let p_ = 1;
				if (bl_C) {
					//img.set(x_-1, y_+1, bl_C);
					img[j+1][i-1] = bl_C;
					p_ *= 2;
				}
				if (tl_C) {
					//img.set(x_-1, y_-1, tl_C);
					img[j-1][i-1] = tl_C;
					p_ *= 3;
				}
				switch (p_){
					case (6): // bl tl
						t_C = dot_order["t_m6"][t_.toString()];
						_lC = dot_order["l_m30"][_l.toString()];
						b_C = dot_order["b_m15"][b_.toString()];
						o = 34;
						break;
					case (3): // tl
						t_C = dot_order["t_m6"][t_.toString()];
						_lC = dot_order["l_m6"][_l.toString()];
						b_C = dot_order["b_"][b_.toString()];
						o = 45;
						break;
					case (2): // bl
						t_C = dot_order["t_"][t_.toString()];
						_lC = dot_order["l_m15"][_l.toString()];
						b_C = dot_order["b_m15"][b_.toString()];
						o = 31;
						break;
					case (1): //
						t_C = dot_order["t_"][t_.toString()];
						_lC = dot_order["_l"][_l.toString()];
						b_C = dot_order["b_"][b_.toString()];
						o = 38;
						break;
				}
				//img.set(x_, y_-1, t_C);
				img[j-1][i] = t_C;
				//img.set(x_-1, y_, _lC);
				img[j][i-1] = _lC;
				//img.set(x_, y_+1, b_C);
				img[j+1][i] = b_C;
				break;

			case (35): // 5 7 bottom right
				if (br_C) {
					_rC = dot_order["r_m35"][_r.toString()];
					b_C = dot_order["b_m35"][b_.toString()];
					//img.set(x_+1, y_+1, br_C);
					img[j+1][i+1] = br_C;
					o = 16;
				} else {
					_rC = dot_order["_r"][_r.toString()];
					b_C = dot_order["b_"][b_.toString()];
					o = 22;
				}
				//img.set(x_, y_+1, b_C);
				img[j+1][i] = b_C;
				//img.set(x_+1, y_, _rC);
				img[j][i+1] = _rC;
				break;
			case (15): // 5 3 bottom left 
				if (bl_C) {
					_lC = dot_order["l_m15"][_l.toString()];
					b_C = dot_order["b_m15"][b_.toString()];
					//img.set(x_-1, y_+1, bl_C);
					img[j+1][i-1] = bl_C;
					o = 18;
				} else {
					_lC = dot_order["_l"][_l.toString()];
					b_C = dot_order["b_"][b_.toString()];
					o = 24;
				}
				//img.set(x_, y_+1, b_C);
				img[j+1][i] = b_C;
				//img.set(x_-1, y_, _lC);
				img[j][i-1] = _lC;
				break;
			case (14): // 2 7 top right
				//console.log("huh?");
				if (tr_C) {
					t_C = dot_order["t_m14"][t_.toString()];
					_rC = dot_order["r_m14"][_r.toString()];
					//img.set(x_+1, y_-1, tr_C);
					img[j-1][i+1] = tr_C;
					o = 48;
					//console.log("t_: "+t_+"   _r: "+_r+"    ------- t_C: "+t_C+"    ----- _rC: "+_rC);
				} else {
					t_C = dot_order["t_"][t_.toString()];
					_rC = dot_order["_r"][_r.toString()];
					o = 54;
					
				}
				//img.set(x_, y_-1, t_C);
				img[j-1][i] = t_C;
				//img.set(x_+1, y_, _rC);
				img[j][i+1] = _rC;
				break;

			case (6): // 2 3 top left
				
				if (tl_C) {
					t_C = dot_order["t_m6"][t_.toString()];
					_lC = dot_order["l_m6"][_l.toString()];
					//img.set(x_-1, y_-1, tl_C);
					img[j-1][i-1] = tl_C;
					o = 50;
				} else {
					t_C = dot_order["t_"][t_.toString()];
					_lC = dot_order["_l"][_l.toString()];
					o = 56;
				}
				//img.set(x_, y_-1, t_C);
				img[j-1][i] = t_C;
				//img.set(x_-1, y_, _lC);
				img[j][i-1] = _lC;
				break;
			case (21): // 3 7 left right
				_rC = dot_order["_r"][_r.toString()];
				//img.set(x_+1, y_, _rC);
				img[j][i+1] = _rC;
				_lC = dot_order["_l"][_l.toString()];
				//img.set(x_-1, y_, _lC);
				img[j][i-1] = _lC;
				o = 62;
				break;
			case (10): // 2 5 top bottom
				b_C = dot_order["b_"][b_.toString()];
				//img.set(x_, y_+1, b_C);
				img[j+1][i] = b_C;
				t_C = dot_order["t_"][t_.toString()];
				//img.set(x_, y_-1, t_C);
				img[j-1][i] = t_C;
				o = 63;
				break;
			case (7): // right
				_rC = dot_order["_r"][_r.toString()];
				//img.set(x_+1, y_, _rC);
				img[j][i+1] = _rC;
				o = 41;
				break;
			case (5): // bottom
				b_C = dot_order["b_"][b_.toString()];
				//img.set(x_, y_+1, b_C);
				img[j+1][i] = b_C;
				o = 26;
				break;
			case (3): // left
				_lC = dot_order["_l"][_l.toString()];
				//img.set(x_-1, y_, _lC);
				img[j][i-1] = _lC;
				o = 43;
				break;
			case (2): // top
				t_C = dot_order["t_"][t_.toString()];
				//img.set(x_, y_-1, t_C);
				img[j-1][i] = t_C;
				o = 58;
				break;
		}
		
		//console.log(o+" "+m);
		if (!curr) {
			//img.set(x_, y_, o);
			img[j][i] = o;
		}
	
	}
	
	
	
	
	

}


/*
 39 is the 'single' grass block
*/

/*
	16 17 18  19 20 21  22 23 24  25 26 27  28 29 30 31
  32 33 34  35 36 37  38 39 40  41 42 43  44 45 46 47
  48 49 50  51 52 53  54 55 56  57 58 59  60 61 62 63
*/

const dot_order = {
	"t_": {
		"0": 0, 
		"23": 42, "39": 26, "41": 22, "43": 24, "44": 51, "47": 53, "48": 46, "49": 52, 
		"50": 45, "54": 40, "56": 38, "58": 63, "62": 55
	},
	"t_m6": { // dirt fill top left
		"0": 0, 
		"23": 21, "43": 18, "44": 61, "47": 37, "49": 25, 
		"50": 34, "56": 31, "62": 29
	},
	"t_m14": { // dirt fill top right 
		"0": 0, 
		"23": 19, "41": 16, "47": 60, "44": 35, "48": 32, "49": 27, "54": 28, "62": 30
	},
	"t_m42": { // dirt fill top left and right
		"0": 0, 
		"23": 20, "39": 20, "47": 57, "44": 59, "49": 33, "62": 17
	},
	"_l": {
		"0": 0,
		"18": 29, "24": 55, "26": 22, "31": 21, "34": 37, "38": 42, "39": 41, 
		"43": 62, "45": 53, "50": 47, "56": 23, "58": 54, "63": 40
	},
	"l_m6": { // dirt fill top left
		"0": 0,
		"31": 61, "34": 25, "38": 51, "45": 52, "50": 49, "56": 44, "58": 48, "63": 46
	},
	"l_m15": { // dirt fill bottom left
		"0": 0,
		"18": 17, "24": 30, "26": 16, "31": 20, "34": 57, "38": 19, "45": 60, "63": 28
	},
	"l_m30": { // dirt fill top bottom left
		"0": 0,
		"31": 59, "34": 33, "38": 35, "45": 27, "63": 32
	},
	"b_": {
		"0": 0,
		"16": 28, "17": 20, "18": 31, "22": 40, "24": 38, "26": 63, "29": 21, 
		"30": 19, "39": 58, "41": 54, "43": 56, "55": 42, "62": 23
	},
	"b_m15": { // dirt fill bottom left
		"0": 0,
		"17": 57, "18": 34, "24": 45, "29": 37, 
		"30": 60, "43": 50, "55": 53, "62": 47
	},
	"b_m35": { // dirt fill bottom right
		"0": 0,
		"16": 32, "17": 59, "22": 46, "29": 61, 
		"30": 35, "41": 48, "55": 51, "62": 44
	},
	"b_m105": { // dirt fill bottom left right
		"0": 0,
		"17": 33, "29": 25, "30": 27, "55": 52, "62": 49
	},
	"_r": {
		"0": 0,
		"16": 30, "22": 55, "26": 24, "28": 19, "32": 35, "39": 43, "40": 42, 
		"41": 62, "46": 51, "48": 44, "54": 23, "58": 56, "63": 38
	},
	"r_m14": { // dirt fill top right 
		"0": 0,
		"28": 60, "32": 27, "40": 53, "46": 52, "48": 49, "54": 47, "58": 50, "63": 45
	},
	"r_m35": { // dirt fill bottom right
		"0": 0,
		"16": 17, "22": 29, "26": 18, "28": 20, "32": 59, "40": 21, 
		"46": 61, "63": 31
	},
	"r_m70": { // dirt fill top bottom right
		"0": 0,
		"28": 57, "32": 33, "40": 37, "46": 25, "63": 34
	},
	"tl": {
		"0": 0, 
		"21": 20, "22": 16, "25": 33, "29": 17, "37": 57, "40": 28, "42": 19, 
		"46": 32, "51": 35, "52": 27, "53": 60, "55": 30, "61": 59
	},
	"tr": {
		"0": 0, 
		"19": 20, "24": 18, "27": 33, "30": 17, "35": 59, "38": 31, "42": 21, 
		"45": 34, "51": 61, "52": 25, "53": 37, "55": 29, "60": 57
	},
	"bl": {
		"0": 0, 
		"19": 35, "20": 59, "21": 61, "23": 44, "28": 32, "37": 25, "40": 46,
		"42": 51, "47": 49, "53": 52, "54": 48, "57": 33, "60": 27
	},
	"br": {
		"0": 0, 
		"19": 60, "20": 57, "21": 37, "23": 47, "31": 34, "35": 27, "38": 45,
		"42": 53, "44": 49, "51": 52, "56": 50, "59": 33, "61": 25
	},
	"oob_bottom": {
		"0": 0,
		"55": 17, "22": 16, "24": 18
	},
	"oob_bl_corner": {
		"0": 0,
		"55": 17, "22": 17, "24": 17
	},
	"oob_br_corner": {
		"0": 0,
		"55": 17, "22": 17, "24": 17
	}
	
}

/*
	16 17 18  19 20 21  22 23 24  25 26 27  28 29 30 31
  32 33 34  35 36 37  38 39 40  41 42 43  44 45 46 47
  48 49 50  51 52 53  54 55 56  57 58 59  60 61 62 63
*/

//const up = 0;
// 26
// when placing a block on the grid, check the ones around it
/*
function dot(x,y, terrain) {
	//console.log(img_);
	//level_image_
	//let xxx = curr_area["image"];//level_image_.get(0, 1);
	
	let img = newLevel.areas[current_area]["image"];
	
	img.set(x,y, 26) // 26 will be changed
	
	//let getim = image_.get(y,y);
	//console.log(getim);
	
	//
	//let i = xxx.get(x, y);
	//level_image_
	//console.log(x+" "+y+" "+i);
	
	let tl = img.get(x-1, y-1) ? img.get(x-1, y-1)["sprite"] : -1;
	let t_ = img.get(x, y-1) ? img.get(x, y-1)["sprite"] : -1;
	let tr = img.get(x+1, y-1) ? img.get(x+1, y-1)["sprite"] : -1;
	let _l = img.get(x-1, y) ? img.get(x-1, y)["sprite"] : -1;
	let _r = img.get(x+1, y) ? img.get(x+1, y)["sprite"] : -1;
	let bl = img.get(x-1, y+1) ? img.get(x-1, y+1)["sprite"] : -1;
	let b_ = img.get(x, y+1) ? img.get(x, y+1)["sprite"] : -1;
	let br = img.get(x+1, y+1) ? img.get(x+1, y+1)["sprite"] : -1;
	
	
	
	console.log(tl);
	console.log(t_);
	console.log(tr);
	console.log(_l);
	console.log(_r);
	console.log(bl);
	console.log(b_);
	console.log(br);
	
	//+" "+t_+" "+tr+" "+_l+" "+_r+" "+bl+" "+b_+" "+br);
	
	throw up;
	
}
*/

/*
function create_level() {
	
	
	
	// 
	
	return ggg;
}
*/



//console.log(curr_level.info());

//console.log(curr_level.areas[0]);

// 


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
let numMainRooms = 3;//rnd(3, 5);
let numExtra = 7;//rnd(4, 10);
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


// ***********
// TODO: add methods for levelGraph object to place stuff in areas.
// ***********

/* ==================== TEST MAP ======================
  This is a test map.
  Will create a more organized one later on.
*/

/*
function test_make_level() {
	//console.log("A ");
	level_grid_[bm-1][0] = 10;
	level_grid_[bm-1][rt] = 11;
	level_image_.set(0, bm-1, 229);
	level_image_.set(rt, bm-1, 229);
	
	// floor
  for (let i=0; i<32; i++) {
    level_image_.set(i, bm, 225);
    level_grid_[bm][i] = 1;
  }
  //console.log("B ");
  
  // singular blocks
	/*
  level_image_.set(0, bm-1, 224);
  level_grid_[bm-1][0] = 1;
  
  level_image_.set(12, bm-1, 224);
  level_grid_[bm-1][12] = 1;
	*/
	// ladders/climbing
	//level_image_.set(2, bm-1, 228);
  //level_image_.set(2, bm-2, 228);
	//level_image_.set(2, bm-3, 228);
	
  //level_grid_[bm-1][2] = 2; // 2 is climb, 3 could be water?
	//level_grid_[bm-2][2] = 2;
	//level_grid_[bm-3][2] = 2;
	//console.log("C ");
	// doors
	//create_door(0, 7, bm-1, 0, 1, 7, bm-1); //
	//create_door(0, 14, bm-1, 1, 1, 14, bm-1); //
	//create_door(0, 19, bm-1, 2, 1, 16, bm-1); //
	//create_door(0, 27, bm-1, 2, 1, 19, bm-1); //
	//level_grid_[bm-1][7] = 4; // only need one trigger sprite per door, not 2
	//level_grid_[bm-1][14] = 4; 
	//level_grid_[bm-1][19] = 4; 
	//level_grid_[bm-1][27] = 4; 
	
	//console.log("D ");
	// 10, 11 are left and right screen triggers, to get to next areas


  // randomly scattered, randomly coloured blocks
	/*
  for (let i=0; i<10; i++) {
    let x = rnd(0, width);
    let y = rnd(height-8, height);
    let block_choice = rnd(0, 4);
    
    level_image_.set(x, y, 224+block_choice);
    level_grid_[y][x] = 1;
  }
  /**/
  // random moving platforms
	/*
  for (let i=0; i<5; i++) {
    
    let rx = rnd(0, width);
    let ry = rnd(height-10, height);
		let rm = rnd(0, platforms.length);
    
    create_platform(rx*8, ry*8, rm);
    
  }
	//console.log("E ");
	/**/
  
  //let mult = 10;
  // scatter jumping enemies
	/*
  for (let spray_everywhere=0; spray_everywhere<mult; spray_everywhere++) {
    for (let i=0; i<4; i++) {
    
      let rx = rnd(0, width);
      let ry = rnd(height-20, height);
      
      create_small_enemy(rx*8, ry*8, "steadyjump", 0+i*16);
    
    }
  }
	*/
  
  // scatter walking enemies
	/*
  for (let spray_everywhere=0; spray_everywhere<mult; spray_everywhere++) {
    for (let i=0; i<4; i++) {
      
      let rx = rnd(0, width);
      let ry = rnd(height-20, height);
      
      create_small_enemy(rx*8, ry*8, "walkbump", 0+i*16);
    }
  }
  */
	/*
  create_small_enemy(30*8, 30*8, "walkbump", 0+0*16);
  create_small_enemy(11*8, 30*8, "steadyjump", 0+1*16);
	//console.log("F ");
	
	
	
	
	// ------ pnode attempt ------------
	var ground = new pnode(224);
	var prev_ground = ground;

	for (let i=0; i<5; i++) {
	  let new_ground = new pnode(224);
		let xx = rnd(1,6);
		let yy = rnd(-2,3);
		//console.log(yy);
		//let xx = rnd(0,4)-4;
	  prev_ground.setNext(new_ground, xx, yy);
	  prev_ground = new_ground;
	}
  //console.log("G ");
	var temp = ground;
	var x_init = 1;
	var y_init = bm-8;
	
	var x = x_init;
	var y = y_init;
	//var x_g = 1;
	//var y_g = bm-8;
  //console.log("H ");

	let ii = 0;
	while (temp.hasNext()) {
		console.log(ii+" x"+x+" y"+y+"  ptype"+temp.ptype);
	  //console.log(ii+"   curr: ("+x+", "+y+")    next: ("+temp.next_gap+", "+temp.next_height+")");
		
		level_image_.set(x, y, temp.ptype);
	  level_grid_[y][x] = 1;
		//console.log("J ");
		x += temp.next_gap;
		y += temp.next_height;

    //console.log("K ");
	  temp = temp.next_pnode;
		ii++;
		//console.log("L ");
	}
	
	//console.log(ground.info());
}	/**/
  





/*
function test_make_level() {
	let test_ground = new pnode(225);
	level_image_.set(0, 0, test_ground.ptype);
  level_grid_[15][0] = 0;
	
}

*/
//test_make_level();

// level_graph.build(0);
// 







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
  
	tilesheet(ts_m);
	draw(level_image_front, l_offset-p.x*lfe*rte, u_offset-p.y*tpe*bte-info_box_offset);
  
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




console.log(newLevel.info());

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
	print(newLevel.area_info(current_area), 0, 16);
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












