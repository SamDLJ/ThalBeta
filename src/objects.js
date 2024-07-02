export const T = {
	"starting_terrain": "sky",
	
	"climb": 523,
	"stairs": 524,
	"lf_arrow": 246,
	"rt_arrow": 247,
	"dn_arrow": 248,
	"up_arrow": 249,
	"door_red": 250, // 2
	"door_orn": 251, // 3
	"door_ylw": 252, // 5
	"door_grn": 253, // 7
	"door_blu": 254, // 11
	"door_ppl": 255, // 13
	
	"nutmeg": 475,
	
	"pepper_tl": 460,
	"pepper_tr": 461,
	"pepper_bl": 476,
	"pepper_br": 477,
	
	
	"sugar_tl": 430, //446,
	"sugar_tr": 431, //447,
	"sugar_ml": 446, //462,
	"sugar_mr": 447, //463,
	"sugar_bl": 462, //478,
	"sugar_br": 463, //479,
	"sugar_bbl": 478, //478,
	"sugar_bbr": 479, //479,
	
	"door_key": 496,
	"small_enemy": 360,
	
	"grass_tile": 12,
	"tree_tile": 13,
	"light_palace_tile": 15,
	"dark_palace_tile": 16,
	
	
	"w_water_tiles": 1,
	"w_forest_tiles": 2,
	"w_mountain_tiles": 3,
	
};



export const platforms = [
  {
    image: 626,
    x: 2,
    y: 2, 
    vx: [
      0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2, 
      0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2,
      0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2, 
      0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,2,
      0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2, 
      0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2,
      0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2, 
      0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2, 0,0,0,0,0,0,0,-2
    ], //equal length
    vy: [
      0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,-1, 0,0,0,0,0,0,0,-1, 
      0,0,0,0,0,0,0,-1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,-1,
      0,0,0,0,0,0,0,-1, 0,0,0,0,0,0,0,-1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 
      0,0,0,0,0,0,0,-1, 0,0,0,0,0,0,0,-1, 0,0,0,0,0,0,0,-1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,-1,
      0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,-1, 0,0,0,0,0,0,0,-1, 
      0,0,0,0,0,0,0,-1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,-1,
      0,0,0,0,0,0,0,-1, 0,0,0,0,0,0,0,-1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,1, 
      0,0,0,0,0,0,0,-1, 0,0,0,0,0,0,0,-1, 0,0,0,0,0,0,0,-1, 0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,-1
    ], //equal length
    vframe: 0,
    frame:0, 
    frames:[0,1,2,3,4],
    alive: true
  },
  {
    image: 626,
    x: 2,
    y: 2, 
    vx: [
			0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 1,1,1,1,1,1,1,1,
			0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, -1,-1,-1,-1,-1,-1,-1,-1,
			
    ], //equal length
    vy: [
			0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 
			0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 
    ], //equal length
    vframe: 0,
    frame:0, 
    frames:[0,1,2,3,4],
    alive: true
  },
  {
    image: 626,
    x: 2,
    y: 2, 
    vx: [
			0,0,0,0,0,0,0,0, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,
			0,0,0,0,0,0,0,0, -1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1,
    ], //equal length
    vy: [
			0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
    ], //equal length
    vframe: 0,
    frame:0, 
    frames:[0,1,2,3,4],
    alive: true
  },
  { //circular
    image: 626,
    x: 2,
    y: 2, 
    vx: [
			1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,0,0,1,0,0,0, 1,0,0,0, 
			-1,0,0,0,-1,0,0,0, -1,0,0,0, -1,0,-1,0,-1,0,-1,0, -1,0,-1,0,-1,0,-1,0,
			-1,0,-1,0,-1,0,-1,0, -1,0,-1,0,-1,0,-1,0, -1,0,0,0,-1,0,0,0, -1,0,0,0, 
			1,0,0,0,1,0,0,0, 1,0,0,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0,
    ], //equal length
    vy: [
			1,0,0,0,1,0,0,0, 1,0,0,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0,
			1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,0,0,1,0,0,0, 1,0,0,0, 
			-1,0,0,0,-1,0,0,0, -1,0,0,0, -1,0,-1,0,-1,0,-1,0, -1,0,-1,0,-1,0,-1,0,
			-1,0,-1,0,-1,0,-1,0, -1,0,-1,0,-1,0,-1,0, -1,0,0,0,-1,0,0,0, -1,0,0,0, 
			
    ], //equal length
    vframe: 0,
    frame:0, 
    frames:[0,1,2,3,4],
    alive: true
  },
  { //circular
    image: 626,
    x: 2,
    y: 2, 
    vx: [
			1,0,1,0,1,0,1,0, 1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0, 1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 
			0,0,0,0,0,0,0,0, -1,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0, -1,0,0,0,0,0,0,0, -1,0,0,0,-1,0,0,0,-1,0,0,0,-1,0,0,0, -1,0,0,0,-1,0,0,0,-1,0,0,0,-1,0,0,0,
			-1,0,-1,0,-1,0,-1,0, -1,0,0,0,-1,0,0,0,-1,0,0,0,-1,0,0,0, -1,0,0,0,-1,0,0,0,-1,0,0,0,-1,0,0,0, -1,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0, -1,0,0,0,0,0,0,0, 
			0,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,
    ], //equal length
    vy: [
			0,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,
			1,0,1,0,1,0,1,0, 1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0, 1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0, 1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 
			0,0,0,0,0,0,0,0, -1,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0, -1,0,0,0,0,0,0,0, -1,0,0,0,-1,0,0,0,-1,0,0,0,-1,0,0,0, -1,0,0,0,-1,0,0,0,-1,0,0,0,-1,0,0,0,
			-1,0,-1,0,-1,0,-1,0, -1,0,0,0,-1,0,0,0,-1,0,0,0,-1,0,0,0, -1,0,0,0,-1,0,0,0,-1,0,0,0,-1,0,0,0, -1,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0, -1,0,0,0,0,0,0,0, 
    ], //equal length
    vframe: 0,
    frame:0, 
    frames:[0,1,2,3,4],
    alive: true
  },
];

// positions on the spritesheet. Will have to change if new tilesheet is introduced
export const ZEN = [
	
	// Thal (no helmet)
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
		"hurt": 60,
		"invisible": 62,
		"wm_idle": 32,
  },
	
	// Thal 
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
		"hurt": 62,
		"invisible": 63
  },
	
	// Enx
  {
    "idle": 0+256,
    "jump": 48+256,
    "run": 4+256,
    "fall": 12+256,
    "shoot": 50+256,
    "slide": 6+256,
    "skid": 100+256,
    "climb": 102+256,
  },
];

// could have multiple of the same so that shuffleArray works better
export const PLAT_STYLE = [
	/*
	{"name": "lots_of_stairs", 
		"rw0": 1, "rh0": 4, "rg0": 0, "ry0": 1, 
	"rw1": 2, "rh1": 5, "rg1": 1, "ry1": 1
	},/**/
	
	/*]; let nothing = [ /**/
	
	{"name": "lots_of_stairs", 
		"rw0": 1, "rh0": 4, "rg0": 0, "ry0": 1, 
	"rw1": 2, "rh1": 5, "rg1": 1, "ry1": 1
	},/**/
	
	{"name": "medium_long_holes", 
		"rw0": 2, "rh0": 0, "rg0": 0, "ry0": 1, 
	"rw1": 5, "rh1": 1, "rg1": 5, "ry1": 1
	},/**/
	
	{"name": "small_long_holes", 
		"rw0": 1, "rh0": 0, "rg0": 0, "ry0": 1, 
	"rw1": 2, "rh1": 1, "rg1": 2, "ry1": 1
	},/**/
	
	{"name": "high_small_boxes", 
		"rw0": 2, "rh0": 1, "rg0": 0, "ry0": 3, 
	"rw1": 5, "rh1": 4, "rg1": 2, "ry1": 3
	},/**/

	{"name": "rugged", 
		"rw0": 1, "rh0": 0, "rg0": 0, "ry0": 4, 
	"rw1": 5, "rh1": 1, "rg1": 1, "ry1": 4
	},/**/
	
	{"name": "high_flat", 
		"rw0": 1, "rh0": 1, "rg0": 0, "ry0": 3, 
	"rw1": 10, "rh1": 3, "rg1": 4, "ry1": 3
	},/**/
	
	{"name": "normal_fill", 
		"rw0": 2, "rh0": 0, "rg0": 0, "ry0": 1, 
		"rw1": 7, "rh1": 1, "rg1": 1, "ry1": 1
	},/**/
	
	{"name": "normal", 
		"rw0": 2, "rh0": 1, "rg0": 0, "ry0": 1, 
		"rw1": 7, "rh1": 8, "rg1": 1, "ry1": 1
	},/**/
	
	{"name": "normal_fill_up", 
		"rw0": 1, "rh0": 0, "rg0": 0, "ry0": 2, 
		"rw1": 5, "rh1": 1, "rg1": 1, "ry1": 1
	},/**/
	
	{"name": "normal_fill_down", 
		"rw0": 1, "rh0": 0, "rg0": 0, "ry0": 1, 
		"rw1": 5, "rh1": 1, "rg1": 1, "ry1": 2
	},/**/
	
	{"name": "normal_up", 
		"rw0": 2, "rh0": 1, "rg0": 0, "ry0": 2, 
		"rw1": 7, "rh1": 7, "rg1": 1, "ry1": 1
	},/**/
	
	{"name": "normal_down", 
		"rw0": 2, "rh0": 1, "rg0": 0, "ry0": 1, 
		"rw1": 7, "rh1": 7, "rg1": 1, "ry1": 2
	},/**/

	
	{"name": "high_up", 
		"rw0": 2, "rh0": 1, "rg0": 0, "ry0": 2, 
		"rw1": 7, "rh1": 4, "rg1": 4, "ry1": 1
	},/**/
	
	{"name": "high_down", 
		"rw0": 2, "rh0": 1, "rg0": 0, "ry0": 1, 
		"rw1": 7, "rh1": 4, "rg1": 4, "ry1": 2
	},/**/
	
	
	/*
	{"name": "steep_up", 
		"rw0": 1, "rh0": 0, "rg0": 0, "ry0": 3, 
		"rw1": 6, "rh1": 6, "rg1": 4, "ry1": 1
	},/**/
	/*
	{"name": "steep_down", 
		"rw0": 1, "rh0": 0, "rg0": 0, "ry0": 1, 
		"rw1": 6, "rh1": 6, "rg1": 4, "ry1": 3
	},/**/
	
	
	
	/*
	{"name": "normal2", 
		"rw0": 1, "rh0": 5, "rg0": 0, "ry0": 1, 
		"rw1": 2, "rh1": 8, "rg1": 7, "ry1": 1
	},/**/
	/*
	{"name": "normal3", 
		"rw0": 1, "rh0": 0, "rg0": 0, "ry0": 1, 
		"rw1": 2, "rh1": 3, "rg1": 7, "ry1": 1
	},/**/
	
];

export const BRANCH = [
	/*  */
	{
		"name": "normal", 
		"rw0": 1, "rh0": 0, "rg0": 0, "ry0": 1, 
		"rw1": 2, "rh1": 3, "rg1": 7, "ry1": 1
	},/**/
];




/*
 tilesheet for each one

 mountain is outside but has background


mixture of two different tilesets, depending on height:
	- caveground is outside but at the bottom  in front of the mountain. dirt-grass + brown-dirt-rock tilesets
	- mountain is grey-rock + brown-dirt-rock tilesets
	- cliff is grey-rock + brown-dirt-rock
 	- peak is grey-rock + ice-snow tilesets
	
	
	- fill_in_ceiling chunks: 
			insidecavetop, insidecave, underground, insidetower, insidetowertop, insidetowerground, basement
	
	- is_sky chunks:
			sky, aboveground

	- is_r:
			"peakright", "cliffright", ""
	
	- cave_right
	
	peakright
			 ____ ____ ____ ____ 
			|    |    |    |  ->|
			|____|____|____|____|
			|<-  | _  | /  |    |
			|____|____|/___|____|
			|    |   /|    |    |
			|____|__/_|____|____|

	cliffright is like a wall, to the right goes to the mountain
			 ____ ____ ____ ____ 
			|    |    | ^ /|____|
			|____|____|____|__->|
			|<-  | _  | /  |    |
			|____|____|/___|____|
			|    |   /|    |    |
			|____|__/_|____|____|

	caveright is like a wall, to the right goes to caveground
			 ____ ____ ____ ____ 
			|    |    | ^ /|____|
			|____|____|____|__->|
			|    |    | /  |    |
			|____|____|/___|____|
			|<-__|___/|    |    |
			|____|____|____|____|
	






towerground right and left worldmap: 
	"sw"
	
	
inside tower should be straight across, no 'hills'
chunk shapes should have no walls (not like the caves)


DONE:

peak_ -> insidecavetop
cliff_ -> insidecave
cave_ -> insidecave

mountain, caveground

	
*/
export const TERRAIN = {
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
		"12": ["cliffright", "caveground"],
		"13": ["cliffright", "peakright"],
		"4": ["insidecave"],
		
	},
	"cliffleft": {
		"10": ["mountain"],
		"11": ["aboveground"],
		"12": ["cliffleft", "caveground"],
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
		"13": ["sky"],
		"4": ["sky"]
	},
	
	"sky": {
		"10": ["sky", "peakleft", "roofleft"],
		"11": ["sky", "peakright", "roofright"],
		"12": ["aboveground"],
		"13": ["sky"],
		"4": ["sky"]
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
		"13": ["basement", "insidetowerground"],
		"4": ["basement"]
	}
};

/*
 39 is the 'single' grass block
*/

/*
	16 17 18  19 20 21  22 23 24  25 26 27  28 29 30 31
  32 33 34  35 36 37  38 39 40  41 42 43  44 45 46 47
  48 49 50  51 52 53  54 55 56  57 58 59  60 61 62 63
*/

export const dot_order = {
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
	
};






/* ========================= PLATFORM NODES =========================== */

export class pnode {
  // a pnode is a platform node or singular block
  // 'length' will determine which sprites to display according to the ptypes
  constructor(width=1, thick=1, x=0, y=0, dir=1, ptype="") {
    
    this.prev_pnode = null;
    this.prev_gap = 0; // gap between this pnode and the previous pnode
    this.prev_height = 0; // relative height of previous pnode
    this.prev_end = 0; // number of pnodes to the left
    
    this.branch = null; // branches go up -y or down +y
    this.branch_height = 0;
		this.branch_skew = 0;
    
		this.ptype = ptype; // solid (default), climb, platform, swim, mud, ice, move
		this.direction = dir;
		this.enemies = []; // list of string names, or whatever is sufficient for re-spawning enemies
		this.items = []; //
		this.special_item = null;
    
    // could be individual 'blocks', then checks both the ptype
    
    this.width = width; 
		// avoids tall pole-like structures, looks dumb
		/*
		if (thick === 0) {
			if (width > 1) {
				this.thick = 128;
			} else {
				this.thick = 1;
			}
		} else {
			this.thick = thick;
		}
		*/
		this.thick = thick === 0 ? 128 : thick; 
    
    
    this.x = x; // absolute x position on map. set later 
    this.y = y; // absolute y position on map. set later
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
  setBranch(branch_pnode, xpos=0, height_=0) {
    this.branch = branch_pnode;
    this.branch_height = height_;
		this.branch_skew = xpos;
    branch_pnode.branch = this;
    branch_pnode.branch_height = -1*height_;
		branch_pnode.branch_skew = -1*xpos;
  }
	
	setNext(next_pnode, gap=0, height=0 /*, x=0, y=0 */) {
    this.next_pnode = next_pnode;
    this.next_gap = gap;
    this.next_height = height;
		//next_pnode.y = y;
		//next_pnode.x = x;
    next_pnode.prev_pnode = this;
    next_pnode.prev_gap = gap;
    next_pnode.prev_height = -1*height;
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
  
	printChain(i=0) {
		let chain = "";
		let branch = "";
		
		if (this.hasNext()) {
			chain = this.next_pnode.printChain(i+1);
		}
		
		if (this.hasBranch()) {
			//branch = " "+this.branch_height; //
			
			//branch = ""+this.branch_height+"("+this.branch.getChain()+")";
		}
		return ""+i+"["+this.next_gap+""+branch+" "+this.next_height+"] "+chain;
	}
	
	
	getChain(pos=0, rel_xdist=0) {
		//console.log(pos+" x"+rel_xdist);
		let curr_chain = [{
			"index": pos,
			"xdist": rel_xdist,
			"x": this.x,
			"y": this.y,
			"width": this.width,
			"thick": this.thick,
			"next_gap": this.next_gap,
			"next_height": this.next_height,
			"branch_height": this.branch_height,
			"branch_skew": this.branch_skew,
		}];
		let next_chain = [];
		
		//console.log(pos);
		if (this.hasNext()) {
			let next_xdist = this.width + this.next_gap;
			
			next_chain = this.next_pnode.getChain(pos+1, next_xdist);//next_xdist+rel_xdist);
		} else {
			//console.log("END OF CHAIN: "+pos);
		}
		
		for (let c of next_chain) {
			curr_chain.push(c);
		}
		
		
		return curr_chain;
		
	}
	
	getFromChain(pos, start=0) {
		
		let got_it = {
			"x": this.x,
			"y": this.y,
			"width": this.width,
			"thick": this.thick,
			"next_gap": this.next_gap,
			"next_height": this.next_height,
			"branch_height": this.branch_height,
			"branch_skew": this.branch_skew,
		}
		
		if (pos === start) {
			return got_it;
		}
		
		if (this.hasNext()) {
			return this.next_pnode.getFromChain(pos, start+1);
		}
		
		return got_it;
	}
	
	
  getPrev() {
    if (this.prev_node) {
			
      //return this.prev_node.print();
    }
    return 0;
  }
  getBranch() {
    if (this.branch) {
      //return this.branch.print();
    }
    return 0;
  }
  getNext() {
    if (this.next_node) {
			//console.log(this.)
      //return this.next_node.print();
    }
    return 0;
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
			this.branch.branch_skew = 0;
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
