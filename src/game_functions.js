import { dot_order } from "./objects.js";
import { GRASS_HBTILES } from "./grass_herringbone.js";
import { MOUNT_HBTILES } from "./mount_herringbone.js";
import { FOREST_HBTILES } from "./forest_herringbone.js";
import { PEAK_HBTILES } from "./peak_herringbone.js";

import { MOUNTAINS } from "./mountain_chunks.js";
import { COAST } from "./coast_chunks.js";
import { DESERT } from "./desert_chunks.js";
import { SLOPES } from "./slope_chunks.js";
import { PEAK } from "./peak_chunks.js";

//NEW
import { CSHAPES, CLIFFS } from "./cshapes.js";

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

//const cseed = PRNG("chunk_seed", 10000); // "Hello World" -> 0.6276661821175367, ...

/*
var iR = 0; //increment every time a new number is used
function rnd(min_, max_) {
  let value = min_ + Math.floor(seed[iR]*(max_-min_));
  iR++;
  if (iR >= seed.length) {
    iR=0;
  }
  return value;
}/**/


const simplex_world_1 = new SimplexNoise("world1xx");
const simplex_world_2 = new SimplexNoise("world2yyy");
const simplex_continent_1 = new SimplexNoise("continent1");
const simplex_continent_2 = new SimplexNoise("continent2");
const simplex_country_1 = new SimplexNoise("country1");
const simplex_country_2 = new SimplexNoise("country2");
const simplex_village_1 = new SimplexNoise("village1");
const simplex_village_2 = new SimplexNoise("village2");
const simplex_yard_1 = new SimplexNoise("yard1");
const simplex_yard_2 = new SimplexNoise("yard2");

const simplex_river1_0 = new SimplexNoise("0river0");
const simplex_river1_1 = new SimplexNoise("1river1");
const simplex_river1_2 = new SimplexNoise("2river2");
const simplex_river2_0 = new SimplexNoise("0riVer0");
const simplex_river2_1 = new SimplexNoise("1riVer1");
const simplex_river2_2 = new SimplexNoise("2riVer2");


const simplex_chunk = new SimplexNoise("chunk");



export function init_curr_chunk_ids(cx,cy) {
	
	let curr_chunk_ids_ = {
	
		"r": { cid: (cx-1).toString()+"_"+(cy-1).toString(), x: cx-1, y: cy-1, b: {}, s: 0, bvi: {} }, 
		"T": { cid: cx.toString()+"_"+(cy-1).toString(), x: cx, y: cy-1, b: {}, s: 0 }, 
		"7": { cid: (cx+1).toString()+"_"+(cy-1).toString(), x: cx+1, y: cy-1, b: {}, s: 0, bvi: {} },
		"E": { cid: (cx-1).toString()+"_"+cy.toString(), x: cx-1, y: cy, b: {}, s: 0, bvi: {} }, 

		"O": { cid: cx.toString()+"_"+cy.toString(), x: cx, y: cy, b: {}, s: 0, bvi: {} }, 

		"3": { cid: (cx+1).toString()+"_"+cy.toString(), x: cx+1, y: cy, b: {}, s: 0, bvi: {} },
		"L": { cid: (cx-1).toString()+"_"+(cy+1).toString(), x: cx-1, y: cy+1, b: {}, s: 0, bvi: {} }, 
		"U": { cid: cx.toString()+"_"+(cy+1).toString(), x: cx, y: cy+1, b: {}, s: 0, bvi: {} }, 
		"J": { cid: (cx+1).toString()+"_"+(cy+1).toString(), x: cx+1, y: cy+1, b: {}, s: 0, bvi: {} },

		"rr": { cid: (cx-2).toString()+"_"+(cy-2).toString(), x: cx-2, y: cy-2, b: {}, s: 0, bvi: {} },
		"rT": { cid: (cx-1).toString()+"_"+(cy-2).toString(), x: cx-1, y: cy-2, b: {}, s: 0, bvi: {} },
		"TT": { cid: cx.toString()+"_"+(cy-2).toString(), x: cx, y: cy-2, b: {}, s: 0, bvi: {} },
		"T7": { cid: (cx+1).toString()+"_"+(cy-2).toString(), x: cx+1, y: cy-2, b: {}, s: 0, bvi: {} },
		"77": { cid: (cx+2).toString()+"_"+(cy-2).toString(), x: cx+2, y: cy-2, b: {}, s: 0, bvi: {} },
		"Er": { cid: (cx-2).toString()+"_"+(cy-1).toString(), x: cx-2, y: cy-1, b: {}, s: 0, bvi: {} }, 
		"EE": { cid: (cx-2).toString()+"_"+cy.toString(), x: cx-2, y: cy, b: {}, s: 0, bvi: {} }, 
		"EL": { cid: (cx-2).toString()+"_"+(cy+1).toString(), x: cx-2, y: cy+1, b: {}, s: 0, bvi: {} }, 
		"73": { cid: (cx+2).toString()+"_"+(cy-1).toString(), x: cx+2, y: cy-1, b: {}, s: 0, bvi: {} }, 
		"33": { cid: (cx+2).toString()+"_"+cy.toString(), x: cx+2, y: cy, b: {}, s: 0, bvi: {} }, 
		"J3": { cid: (cx+2).toString()+"_"+(cy+1).toString(), x: cx+2, y: cy+1, b: {}, s: 0, bvi: {} }, 
		"LL": { cid: (cx-2).toString()+"_"+(cy+2).toString(), x: cx-2, y: cy+2, b: {}, s: 0, bvi: {} }, 
		"LU": { cid: (cx-1).toString()+"_"+(cy+2).toString(), x: cx-1, y: cy+2, b: {}, s: 0, bvi: {} }, 
		"UU": { cid: cx.toString()+"_"+(cy+2).toString(), x: cx, y: cy+2, b: {}, s: 0, bvi: {} }, 
		"UJ": { cid: (cx+1).toString()+"_"+(cy+2).toString(), x: cx+1, y: cy+2, b: {}, s: 0, bvi: {} }, 
		"JJ": { cid: (cx+2).toString()+"_"+(cy+2).toString(), x: cx+2, y: cy+2, b: {}, s: 0, bvi: {} }
	
	};
	
	return curr_chunk_ids_;
}




/*

110 dirt
112 long grass
20 small connected bushes



/**/
// why dont we just use hb tiles for all biomes?

export function herringbone_tile(seed, b2, bvi, hbtype="") {
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	var chunk_canopy = [...Array(16)].map(_ => Array(16).fill(0));
	
	let num_tiles = 0;
	let tile_index = 0;
	if (b2 === "f") {
		//console.log(seed);
	}
	
	
	if (["left", "right"].includes(hbtype)) {
		if (b2 === "g") {
			try {
				num_tiles = GRASS_HBTILES["horizontal"].length;
				tile_index = Math.floor(seed[iR]*(num_tiles));
				iR = iR >= seed.length-1 ? 0 : iR+1;
				chunk = GRASS_HBTILES["horizontal"][tile_index][hbtype];
			} catch {}
		} else if (b2 === "f") {
			try {
				num_tiles = FOREST_HBTILES["horizontal"].length;
				tile_index = Math.floor(seed[iR]*(num_tiles));
				iR = iR >= seed.length-1 ? 0 : iR+1;
				chunk = FOREST_HBTILES["horizontal"][tile_index][hbtype];
			} catch {}
		} else if (b2 === "m") {
			try {
				num_tiles = MOUNT_HBTILES["horizontal"].length;
				tile_index = Math.floor(seed[iR]*(num_tiles));
				iR = iR >= seed.length-1 ? 0 : iR+1;
				chunk = MOUNT_HBTILES["horizontal"][tile_index][hbtype];
			} catch {}
		} else if (b2 === "p") {
			try {
				num_tiles = PEAK_HBTILES["horizontal"].length;
				tile_index = Math.floor(seed[iR]*(num_tiles));
				iR = iR >= seed.length-1 ? 0 : iR+1;
				chunk = PEAK_HBTILES["horizontal"][tile_index][hbtype];
			} catch {}
		}
	} else if (["top", "bottom"].includes(hbtype)) {
		if (b2 === "g") {
			try {
				num_tiles = GRASS_HBTILES["vertical"].length;
				tile_index = Math.floor(seed[iR]*(num_tiles));
				iR = iR >= seed.length-1 ? 0 : iR+1;
				chunk = GRASS_HBTILES["vertical"][tile_index][hbtype];
			} catch {}
		} else if (b2 === "f") {
			try {
				num_tiles = FOREST_HBTILES["vertical"].length;
				tile_index = Math.floor(seed[iR]*(num_tiles));
				iR = iR >= seed.length-1 ? 0 : iR+1;
				chunk = FOREST_HBTILES["vertical"][tile_index][hbtype];
			} catch {}
		} else if (b2 === "m") {
			try {
				num_tiles = MOUNT_HBTILES["vertical"].length;
				tile_index = Math.floor(seed[iR]*(num_tiles));
				iR = iR >= seed.length-1 ? 0 : iR+1;
				chunk = MOUNT_HBTILES["vertical"][tile_index][hbtype];
			} catch {}
		} else if (b2 === "p") {
			try {
				num_tiles = PEAK_HBTILES["vertical"].length;
				tile_index = Math.floor(seed[iR]*(num_tiles));
				iR = iR >= seed.length-1 ? 0 : iR+1;
				chunk = PEAK_HBTILES["vertical"][tile_index][hbtype];
			} catch {}
		}
		
	} 
	/*
	    ====== use seed to randomize certain sprites (e.g. flowers)
	*/
	let r_tree = 0;
	for (let y=0; y<chunk.length; y++) {
		for (let x=0; x<chunk[0].length; x++) {
			if (chunk[y][x] === 40) {
				r_tree = Math.floor(seed[iR]*4);
				iR = iR >= seed.length-1 ? 0 : iR+1;
				chunk[y][x] = 41+r_tree;
			}
		}
	}
	
  return chunk;
	
}


export function m_chunk(seed, b2, bvi, chs) {
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	var chunk_canopy = [...Array(16)].map(_ => Array(16).fill(0));
	
	let num_tiles = 0;
	let tile_index = 0;
	//console.log(chs);
	try {
		num_tiles = MOUNTAINS[chs].length;
		tile_index = Math.floor(seed[iR]*(num_tiles));
		iR = iR >= seed.length-1 ? 0 : iR+1;
		chunk = MOUNTAINS[chs][tile_index];
	} catch {}
  return chunk;
	
}

export function w_chunk(seed, b2, bvi, chs) {
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	var chunk_canopy = [...Array(16)].map(_ => Array(16).fill(0));
	
	let num_tiles = 0;
	let tile_index = 0;
	//console.log(chs);
	try {
		num_tiles = COAST[chs].length;
		tile_index = Math.floor(seed[iR]*(num_tiles));
		iR = iR >= seed.length-1 ? 0 : iR+1;
		chunk = COAST[chs][tile_index];
	} catch {}
  return chunk;
	
}

export function d_chunk(seed, b2, bvi, chs) {
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	var chunk_canopy = [...Array(16)].map(_ => Array(16).fill(0));
	
	let num_tiles = 0;
	let tile_index = 0;
	//console.log(chs);
	try {
		num_tiles = DESERT[chs].length;
		tile_index = Math.floor(seed[iR]*(num_tiles));
		iR = iR >= seed.length-1 ? 0 : iR+1;
		chunk = DESERT[chs][tile_index];
	} catch {}
  return chunk;
	
}

export function s_chunk(seed, b2, bvi, chs) {
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	var chunk_canopy = [...Array(16)].map(_ => Array(16).fill(0));
	
	let num_tiles = 0;
	let tile_index = 0;
	//console.log(chs);
	try {
		num_tiles = SLOPES[chs].length;
		tile_index = Math.floor(seed[iR]*(num_tiles));
		iR = iR >= seed.length-1 ? 0 : iR+1;
		chunk = SLOPES[chs][tile_index];
	} catch {}
  return chunk;
	
}

export function p_chunk(seed, b2, bvi, chs) {
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	var chunk_canopy = [...Array(16)].map(_ => Array(16).fill(0));
	
	let num_tiles = 0;
	let tile_index = 0;
	//console.log(chs);
	try {
		num_tiles = PEAK[chs].length;
		tile_index = Math.floor(seed[iR]*(num_tiles));
		iR = iR >= seed.length-1 ? 0 : iR+1;
		chunk = PEAK[chs][tile_index];
	} catch {}
  return chunk;
	
}



/*

GRASS/MEADOW/FIELD types

plain
- short
- thick patches
- dirt spots

trails - connects to other grass chunks
- dirt
- fences, wooden things
- bushes



*/




function lift(array, index, lift_height=1) {
	
	let new_array = [...array];
	
	let i_height = 0;
	let i_prev = index;
	let i_left = index-1;
	let i_right = index+1;
	
	while (i_height < lift_height) {
		i_height++;
		
		new_array[index]++;
		i_prev = index;
		i_left = index-1;
		while (i_left >= 0) {
			if (Math.abs(new_array[i_left]-new_array[i_prev]) > 1) {
				new_array[i_left]++;
			} else {
				i_prev = i_left;
				i_left--;
			}
		}
		i_prev = index;
		i_right = index+1;
		while (i_right < array.length) {
			if (Math.abs(new_array[i_prev]-new_array[i_right]) > 1) {
				new_array[i_right]++;
			} else {
				i_prev = i_right;
				i_right++;
			}
		}
		
	}
	
	
	return new_array;
}










function xyWithinRadius(r, x, y) {
    let result = [];

    // Loop through each potential coordinate within a square around (x, y)
    for (let i = x - r; i <= x + r; i++) {
        for (let j = y - r; j <= y + r; j++) {
            // Check if the distance from (i, j) to (x, y) is less than or equal to the radius
            if (Math.sqrt(Math.pow(i - x, 2) + Math.pow(j - y, 2)) <= r) {
                result.push([i, j]);
            }
        }
    }

    return result;
}




// Example usage:
//let radius = 3;
//let centerX = 0;
//let centerY = 0;
//console.log(xyWithinRadius(5, 8, 8));

// TODO

/* 
export function wc(seed) {

}/**/

/* 
export function w3(seed) {

}/**/




export function dot_(img, i, j) {
	//return;
	// return if on corner or edge 
	// to avoid array index oob errors, 2D img array should 
	//  be +2 wider and +2 higher than the actual image.
	// for grid, have correct images already along border before dotting
	
	
	// * * *    imgW = 3, indices: 0, 1, 2   imgW-2 =  1
	
	let imgH = img.length;
	let imgW = img[0].length;
	
	
	if (i <= 0 || i >= imgW-1 || j <= 0 || j >= imgH-1) {
		
		//console.log("return (width: "+imgW+", height: "+imgH+")  i,j: ("+i+", "+j+")");
		return;
	} 
	
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



export function dot_w(img, i, j) {
	/*
		try except
	
	*/
	
	let imgH = img.length;
	let imgW = img[0].length;
	
	
	if (i <= 0 || i >= imgW-1 || j <= 0 || j >= imgH-1) {
		
		//console.log("return (width: "+imgW+", height: "+imgH+")  i,j: ("+i+", "+j+")");
		return;
	} 
	
	
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




/*

===============

GET BIOME INFORMATION

---------------

/**/

function is_special(x_,y_) {
	let radius = Math.floor(Math.sqrt((x_)**2 + (y_)**2));
	if (Number.isInteger(Math.sqrt(radius)) && radius > 15) {
		
		// number of thetas is proportional to radius
		let n = Math.floor(Math.sqrt(radius)); // or log
		let delta_th = 19.9;
		let A = 22.9;//5.64;//29.39;
		let B = 19.01;
		let C = 191.07; 
		
		/*((i+1)*r_offset_B*(radius**2))*/  /*(((i+1)*r_offset_A)*delta_th)*/
		
		let start_th = A*Math.PI/180;
		let ths = [...Array(n)].map((_,i) => start_th + (((i+A)**2)/B)*((2*Math.PI)/(n)) );
		
		let xys = ths.map((t,i) => {
			let xo = Math.floor( radius * Math.sin(t+((i*B)*Math.PI/180)) );
			let yo = Math.floor( radius * Math.cos(t+((i*B)*Math.PI/180)) );
			
			xo = xo > 0 ? xo+1 : xo;
			yo = yo > 0 ? yo+1 : yo;
			return [xo, yo];
		});
		
		return xys;
		
	}
	
	return 0;
}




function get_biome_value(x_,y_,res) {
	let N = 15*res; // 15* res
	
	let dxs = [...Array(N)].map((n,i) => i*2+N*100 ); // N*100
	let dys = [...Array(N)].map((n,i) => i*3+N );
	
	let xs = dxs.map(dx_ => x_+dx_);
	let ys = dys.map(dy_ => y_+dy_);
	
	let ths = [...Array(N)].map((n,i) => i*0.29 );
	
	let xrs = ths.map( (th,i) => Math.floor( xs[i] * Math.cos(th) - ys[i] * Math.sin(th) ) );
	let yrs = ths.map( (th,i) => Math.floor( ys[i] * Math.cos(th) + xs[i] * Math.sin(th) ) );
	
	let sizes = [...Array(N)].map((n,i) => 0.01 + 0.0097*i);
	let chps = sizes.map((s,i) => Math.cos(s*xrs[i])*Math.cos(s*yrs[i]));
	
	let chp = chps.reduce((acc,c) => acc + c, 0);
	let b = chp;
	
	return b;
	
}


export function get_biome_info_(x, y) {
	
	let thickness = 1;
	let radius = Math.floor(thickness*Math.sqrt((x)**2 + (y)**2));
	let difficulty = Math.floor(Math.sqrt(radius));
	
	let xyo = is_special(x,y);
	let bvi = biome_variance_index(x,y);
	
	let z1 = "";
	let z2 = "";
	let z3 = "";
	
	z1 = get_biome_value(x,y,1);
	if (z1 > 6) {
		z1 = 5;
	} else if (z1 > 1.4) {
		z1 = 4;
	} /*else if (z1 > 0.5) {
		z1 = 2;
	} */else if (z1 > 0.5){
		z1 = 1;
	} else if (z1 > 0.0005) {
		z1 = 2;
	} else {
		z1 = 0;
	}
	
	
	z2 = get_biome_value(x,y,2);
	if (z2 > 11) {
		z2 = 5; //
	} else if (z2 > 6) {
		z2 = 3; // deep forest
	} else if (z2 > 2.8) {
		z2 = 2;
	} else if (z2 > 0.000001) {
		z2 = 1;
	} else {
		z2 = 0;
	}/**/
	
	
	z3 = get_biome_value(x,y,3);
	if (z3 > 4) {
		z3 = 1;
	} else if (z3 > 2) {
		z3 = 1;
	} else if (z3 > 0.2){
		z3 = 3;
	} else if (z3 > 0.2){
		z3 = 0;
	} else {
		z3 = 0;
	}
	
	let color = "rgb("+(difficulty*2)+",0,"+(250-difficulty*10)+")";
	let biome = "w";
	
	if (z2 === 5) {
		color = "rgb(120,0,120)"; // <--
		biome = "X";
	} else if (z2 === 3) {
		color = "rgb(0,30,0)";
		biome = "F"; // deepforest
		if (z2 >= 1 && z1 === 4) {
			color = "rgb(230,230,240)";
			biome = "p";
		}
		
	} else if (z2 >= 1 || z3 === 1) {
		color = "rgb(20,100,0)";
		biome = "g";
		if (z1 >= 4) {
			//color = "rgb(120,110,0)";
			//biome = "desert";
			//color = "rgb(0,280,280)";
			//biome = "mountains";
			if (z1 === 5) {
				color = "rgb(200,170,0)";
				biome = "d";
			} else if (z2 === 0) {
				color = "rgb(200,170,0)";
				biome = "d";
			} else if (z3 === 2) {
				color = "rgb(220,220,0)";
				biome = "F";
				
			} 
			if (z2 === 2) {
				color = "rgb(120,120,120)";
				biome = "m";
				//if (z2 >= 1) {
					//color = "rgb(0,230,230)";
					//biome = "peak";
					//}
			}
			
		} else if (z2 === 2) {
			color = "rgb(10,60,0)";
			biome = "f";
			
		} else if (z1 === 2) {
			color = "rgb(120,120,120)";
			biome = "m";
			
		} else if (z1 === 1) {
			color = "rgb(10,60,0)";
			biome = "f";
		} else if (z3 === 3){
			color = "rgb(10,60,0)";
			biome = "f";
		}
	} else if (z3 === 2) {
		color = "rgb(20,100,0)";
		biome = "i";
	}
	
	
	
	// ********* testing DELETE after
	let biome2 = "g";
	let slope = 0;
	let gap = 0;
	
	if (biome === "w") {
		//slope = 15;
	} else if (biome === "m") {
		biome = "g";
		biome2 = "m";
		
	} else if (biome === "d") {
		biome = "d";
		biome2 = "d";
	} else if (biome === "f") {
		biome = "g";
		biome2 = "f";
	} else if (biome === "F") {
		biome = "g";
		biome2 = "q";
	} else if (biome === "p") {
		biome = "p";
		biome2 = "p";
		//slope = ;
	}
	
	
	
	return {
		"biome_layout": biome, 
		"difficulty": difficulty,
		"color": color,
		"special": xyo,
		"bvi": bvi,
		"slope": slope,
		"gap": gap,
	};
	
	
}


// -------- further biome random spread VARIANCE

function variance_setup(xx, yy, xoffset, yoffset, sparse) {
	//console.log(xx, yy, xoffset, yoffset, sparse);
	let x = xx+xoffset;
	let y = yy+yoffset;
	let p = (x*y)+((x-y)*(x+y));
	
	//console.log((p%2+p%3-p%5+p%7-p%9)+"  "+(p%2-p%3+p%5-p%7+p%9-p%13-p%17-p%19-p%23));
	
	let q = 0;
	
	switch (sparse) {
	  case 0:
		  q = !(p%2+p%3-p%5+p%7-p%9);
		  break;
	  case 1:
		  q = !(p%2-p%3-p%5+p%7-p%9);//+p%13);//+p%17-p%19);
		  break;
	  case 2:
		  q = !(p%2-p%3+p%5-p%7-p%9-p%13+p%17+p%19);
		  break;
	  case 3:
		  q = !(p%2-p%3+p%5-p%7+p%9+p%13);//+p%17-p%19);
		  break;
	  case 4:
		  q = !(p%2+p%3+p%5-p%7+p%9+p%13);//+p%17-p%19);
		  break;
	  case 5:
		  q = !(p%2-p%3-p%5+p%7-p%9-p%13-p%17+p%19-p%23);
		  break;
	  case 6:
		  q = !(p%2+p%3-p%5-p%7+p%9-p%13-p%17-p%19);
		  break;
		case 7:
		  q = !(p%2-p%3+p%5-p%7+p%9-p%13-p%17-p%19-p%23);
		  break;
	}
	
	//console.log(q);
	
	return q;
}

function variance(x,y, s) {
	
	let q1 = variance_setup(x,y,0,0, s);
	let q2 = variance_setup(x,y,90,20, s);
	let q3 = variance_setup(x,y,0,990, s);
	let q4 = variance_setup(x,y,-71,0, s);
	let q5 = variance_setup(x,y,222,431, s);
	let q6 = variance_setup(x,y,22,-4311, s);
	let q7 = variance_setup(x,y,-222,-93108, s);
	
	let result = q1 || q2 || q3 || q4 || q5 || q6 || q7;
	
	//console.log(result);
	return result;
	
}

function biome_variance_index(x,y) {
		
		let bvi = {
			0: false, 
			1: false, 
			2: false, 
			3: false, 
			4: false, 
			5: false, 
			6: false, 
			7: false,
			8: 0,
		};
		
		if (x == 0 && y == 0) {
			return bvi;
	  };
		
		
		bvi[0] = variance(x,y,0);
		bvi[1] = variance(x,y,1);
		bvi[2] = variance(x,y,2);
		bvi[3] = variance(x,y,3);
		bvi[4] = variance(x,y,4);
		bvi[5] = variance(x,y,5);
		bvi[6] = variance(x,y,6);
		bvi[7] = variance(x,y,7);
		//bvi[8] = trail_type(x,y);
		
		let hb_i = (x-y%4)%4;
		hb_i = hb_i < 0 ? 4+hb_i : hb_i;
		
		bvi[8] = hb_i;
		//console.log(bvi[8]);
		
		//console.log(bvi);
		return bvi;
}








/*

	"O": { cid: "0_0", x: 0, y: 0, b: {}, s: 0 }, 

	"r": { cid: "-1_-1", x: -1, y: -1, b: {}, s: 0 }, 
	"T": { cid: "0_-1", x: 0, y: -1, b: {}, s: 0 }, 
	"7": { cid: "1_-1", x: 1, y: -1, b: {}, s: 0 },
	"E": { cid: "-1_0", x: -1, y: 0, b: {}, s: 0 }, 
	"3": { cid: "1_0", x: 1, y: 0, b: {}, s: 0 },
	"L": { cid: "-1_1", x: -1, y: 1, b: {}, s: 0 }, 
	"U": { cid: "0_1", x: 0, y: 1, b: {}, s: 0 }, 
	"J": { cid: "1_1", x: 1, y: 1, b: {}, s: 0 },
	
	"rr": { cid: "-2_-2", x: -2, y: -2, b: {}, s: 0 },
	"rT": { cid: "-1_-2", x: -1, y: -2, b: {}, s: 0 },
	"TT": { cid: "0_-2", x: 0, y: -2, b: {}, s: 0 },
	"T7": { cid: "1_-2", x: 1, y: -2, b: {}, s: 0 },
	"77": { cid: "2_-2", x: 2, y: -2, b: {}, s: 0 },
	"Er": { cid: "-2_-1", x: -2, y: -1, b: {}, s: 0 }, 
	"EE": { cid: "-2_0", x: -2, y: 0, b: {}, s: 0 }, 
	"EL": { cid: "-2_1", x: -2, y: 1, b: {}, s: 0 }, 
	"73": { cid: "2_-1", x: 2, y: -1, b: {}, s: 0 }, 
	"33": { cid: "2_0", x: 2, y: 0, b: {}, s: 0 }, 
	"J3": { cid: "2_1", x: 2, y: 1, b: {}, s: 0 }, 
	"LL": { cid: "-2_2", x: -2, y: 2, b: {}, s: 0 }, 
	"LU": { cid: "-1_2", x: -1, y: 2, b: {}, s: 0 }, 
	"UU": { cid: "0_2", x: 0, y: 2, b: {}, s: 0 }, 
	"UJ": { cid: "1_2", x: 1, y: 2, b: {}, s: 0 }, 
	"JJ": { cid: "2_2", x: 2, y: 2, b: {}, s: 0 }, 

	b: {
		"biome": biome,
		"difficulty": difficulty,
		"color": color
	}

	rr rT TT T7 77
  Er  r  T  7 73
  EE  E  O  3 33
  EL  L  U  J J3
  LL LU UU UJ JJ 
    
functions:

	gJ gL g7 gr
	
	wr w7 wL wJ

	wn wc w3 wu

	wlbns wlbwe

	wlhst wlhet wlhwt wlhnt

id_5x5
b_pos
b_neg


*/








const DIR = {
		"r": { "up": "rT", "left": "Er", "right": "T", "down": "E", "uLeft": "rr", "uRight": "TT", "dLeft": "EE", "dRight": "O" }, 
		"T": { "up": "TT", "left": "r", "right": "7", "down": "O", "uLeft": "rT", "uRight": "T7", "dLeft": "E", "dRight": "3"  }, 
		"7": { "up": "T7", "left": "T", "right": "73", "down": "3", "uLeft": "TT", "uRight": "77", "dLeft": "O", "dRight": "33"},
		"E": { "up": "r", "left": "EE", "right": "O", "down": "L", "uLeft": "Er", "uRight": "T", "dLeft": "EL", "dRight": "U" }, 
		"O": { "up": "T", "left": "E", "right": "3", "down": "U", "uLeft": "r", "uRight": "7", "dLeft": "L", "dRight": "J" }, 
		"3": { "up": "7", "left": "O", "right": "33", "down": "J", "uLeft": "T", "uRight": "73", "dLeft": "U", "dRight": "J3" }, 
		"L": { "up": "E", "left": "EL", "right": "U", "down": "LU", "uLeft": "EE", "uRight": "O", "dLeft": "LL", "dRight": "UU" }, 
		"U": { "up": "O", "left": "L", "right": "J", "down": "UU", "uLeft": "E", "uRight": "3", "dLeft": "LU", "dRight": "UJ" }, 
		"J": { "up": "3", "left": "U", "right": "J3", "down": "UJ", "uLeft": "O", "uRight": "33", "dLeft": "UU", "dRight": "JJ" }, 
	
		"rr": { "up": "", "left": "", "right": "", "down": "" }, 
		"rT": { "up": "", "left": "", "right": "", "down": "" }, 
		"TT": { "up": "", "left": "", "right": "", "down": "" }, 
		"T7": { "up": "", "left": "", "right": "", "down": "" }, 
		"77": { "up": "", "left": "", "right": "", "down": "" }, 
		"Er": { "up": "", "left": "", "right": "", "down": "" }, 
		"EE": { "up": "", "left": "", "right": "", "down": "" }, 
		"EL": { "up": "", "left": "", "right": "", "down": "" }, 
		"73": { "up": "", "left": "", "right": "", "down": "" }, 
		"33": { "up": "", "left": "", "right": "", "down": "" }, 
		"J3": { "up": "", "left": "", "right": "", "down": "" }, 
		"LL": { "up": "", "left": "", "right": "", "down": "" }, 
		"LU": { "up": "", "left": "", "right": "", "down": "" }, 
		"UU": { "up": "", "left": "", "right": "", "down": "" }, 
		"UJ": { "up": "", "left": "", "right": "", "down": "" }, 
		"JJ": { "up": "", "left": "", "right": "", "down": "" },
};
const CHUNK_ITER = ["r", "T", "7", "E", "O", "3", "L", "U", "J"];



function check_if_river_1(x,y) {
	
	let ra0 = 450; 
	let ra1 = 70; 
	let ra2 = 10;
	
  let r0 = simplex_river1_0.noise2D(x/200, y/200);
	let r0n = 0 + (r0 + 1) * ra0;
  let r1 = simplex_river1_1.noise2D(x/20, y/20);
	let r1n = 0 + (r1 + 1) * ra1;
	let r2 = simplex_river1_2.noise2D(x/10, y/10);
	let r2n = 0 + (r2 + 1) * ra2;
	let r_max = (ra0*2) + (ra1*2) + (ra2*2);
	
	let rall = r0n + r1n + r2n;
	
	let r = Math.floor(rall);
	let rp = (r/r_max) * 100;
	
	let int_rperc = Math.floor(rp);
	//if (rtally.hasOwnProperty(int_rperc)) {
  //  rtally[int_rperc]++;
	//}
	
	let phase = 40;
	let thickness = 2;
	let is_river_ = false;
	if (phase <= rp && rp < phase+thickness){
		is_river_ = true;
	}
	return is_river_;
}

function check_if_river_2(x,y) {
	
	let ra0 = 450; 
	let ra1 = 70; 
	let ra2 = 10;
	
  let r0 = simplex_river2_0.noise2D(x/200, y/200);
	let r0n = 0 + (r0 + 1) * ra0;
  let r1 = simplex_river2_1.noise2D(x/20, y/20);
	let r1n = 0 + (r1 + 1) * ra1;
	let r2 = simplex_river2_2.noise2D(x/10, y/10);
	let r2n = 0 + (r2 + 1) * ra2;
	let r_max = (ra0*2) + (ra1*2) + (ra2*2);
	
	let rall = r0n + r1n + r2n;
	
	let r = Math.floor(rall);
	let rp = (r/r_max) * 100;
	
	let int_rperc = Math.floor(rp);
	//if (rtally.hasOwnProperty(int_rperc)) {
	//	rtally[int_rperc]++;
	//}
	
	let phase = 40;
	let thickness = 4;
	let is_river_ = false;
	if (phase <= rp && rp < phase+thickness){
		is_river_ = true;
	}
	return is_river_;
}








function get_gradient_info_math(x,y) {
	
	let thickness = 1;
	let radius = Math.floor(thickness*Math.sqrt((x)**2 + (y)**2));
	let difficulty = Math.floor(Math.sqrt(radius));
	
	let xyo = is_special(x,y); // : null;
	let bvi = biome_variance_index(x,y); // : null;
  

	let is_river_1 = check_if_river_1(x,y);
	let is_river_2 = check_if_river_2(x,y);
	
	
	let o1 = 100; let o2 = 100;
	let a1 = 40; let a2 = 40; 
	let b1 = 25; let b2 = 25;
	let c1 = 5; let c2 = 5;
	let d1 = 4; let d2 = 4;
	
  let hworld1 = simplex_world_1.noise2D(x/400, y/400);
	let hw1n = 0 + (hworld1 + 1) * o1;
	let hworld2 = simplex_world_2.noise2D(x/300, y/300);
	let hw2n = 0 + (hworld2 + 1) * o2;
	let hw_max = (o1*2) + (o2*2);
	
  let hcontinent1 = simplex_continent_1.noise2D(x/200, y/200);
	let hci1n = 0 + (hcontinent1 + 1) * a1;
	let hcontinent2 = simplex_continent_2.noise2D(x/100, y/100);
	let hci2n = 0 + (hcontinent2 + 1) * a2;
	let hci_max = (a1*2) + (a2*2);
	
  let hcountry1 = simplex_country_1.noise2D(x/50, y/50);
	let hcy1n = 0 + (hcountry1 + 1) * b1;
	let hcountry2 = simplex_country_2.noise2D(x/25, y/25);
	let hcy2n = 0 + (hcountry2 + 1) * b2;
	let hcy_max = (b1*2) + (b2*2);
	
  let hvillage1 = simplex_village_1.noise2D(x/10, y/10);
	let hv1n = 0 + (hvillage1 + 1) * c1;
	let hvillage2 = simplex_village_2.noise2D(x/7, y/7);
	let hv2n = 0 + (hvillage2 + 1) * c2;
	let hv_max = (c1*2) + (c2*2);
	
  let hyard1 = simplex_yard_1.noise2D(x/5, y/5);
	let hy1n = 0 + (hyard1 + 1) * d1;
	let hyard2 = simplex_yard_2.noise2D(x/4, y/4);
	let hy2n = 0 + (hvillage2 + 1) * d2;
	let hy_max = (d1*2) + (d2*2);
	
	//let hy_ = Math.floor(hy1n + hy2n);
	
	let hw = hw1n + hw2n;
	let hci = hci1n+hci2n; // 10 + 10 = 0 to 20
	let hcy = hcy1n+hcy2n; // 20
	let hv = hv1n+hv2n; // 20
	let hy = hy1n+hy2n; // 20
	
	let h = Math.floor(hw+hci+hcy+hv+hy);
	let h_max = hw_max + hci_max + hcy_max + hv_max + hy_max;
	let h_100 = Math.floor((h/h_max)*100);
	
	
  
	//console.log(bvi);
	return [h, h_100, is_river_1, is_river_2, difficulty, xyo, bvi];
}


// maps the calculated value (0 to 100) into an index (0 and 1 for water, up to 12+ for peaks 
function get_main_altitude_type(h_p) {
	//console.log(h_p);
	let biome_height = 0; // deep water
	if (HEIGHTS["water"].h <= h_p && h_p < HEIGHTS["grass"].h) {
		// water 45 - 49
		biome_height = 1;
	
	} else if (HEIGHTS["grass"].h  <= h_p && h_p < HEIGHTS["upland"].h) {
		// grass 50 - 53
		biome_height = 2;
		
	} else if (HEIGHTS["upland"].h <= h_p && h_p < HEIGHTS["hills"].h) {
		// upland 54 - 57
		biome_height = 3;
		
	} else if (HEIGHTS["hills"].h <= h_p && h_p < HEIGHTS["uphills"].h) {
		// hills 58 - 61
		biome_height = 4;
	  if (60 <= h_p) { biome_height = 5; }
		
	} else if (HEIGHTS["uphills"].h <= h_p && h_p < HEIGHTS["mountains"].h) {
		// uphills 62 - 65
		biome_height = 6;
	  if (64 <= h_p) { biome_height = 7; } 
		
	} else if (HEIGHTS["mountains"].h <= h_p && h_p < HEIGHTS["peaks"].h) {
		// mountains 66 - 69
		biome_height = 8 + (h_p-66);
		
	} else if (HEIGHTS["peaks"].h <= h_p) {
		// peaks  (cant make it too high)
	  biome_height = 12 + (h_p-70);
	}
	
	//return Math.floor(h_p);
	return biome_height;

}
/**/



// TODO:  *****  USE THIS instead for the mini map
function get_main_altitude_color(biome_height, r1, r2) {
	let color = "#000";
	switch (biome_height) {
	  case 0:
			color = "#007"; // deep water
			break;
	  case 1:
			color = "#00a"; // water
			break;
	  case 2:
			color = "#491"; // grass
			break;
	  case 3:
			color = "#5a1"; // upland
			break;
	  case 4:
			color = "#780"; // hills
			break;
	  case 5:
			color = "#890"; // hills 2
			break;
	  case 6:
			color = "#870"; // uphills
			break;
	  case 7:
			color = "#983"; // uphills 2
			break;
	  case 8:
			color = "#655"; // mountains
			break;
	  case 9:
			color = "#766"; // mountains 2
			break;
	  case 10:
			color = "#877"; // mountains 3
			break;
	  case 11:
			color = "#988"; // mountains 4
			break;
	  case 12:
			color = "#99a"; // peak
			break;
	  case 13:
			color = "#aaa"; // peak
			break;
	  case 14:
			color = "#aab"; // peak
			break;
	  case 15:
			color = "#bbb"; // peak
			break;
	  case 16:
			color = "#bbc"; // peak
			break;
	  case 17:
			color = "#ccc"; // peak
			break;
	  case 18:
			color = "#ccd"; // peak
			break;
	  case 19:
			color = "#ddd"; // peak
			break;
	  case 20:
			color = "#dde"; // peak
			break;
	  case 21:
			color = "#eee"; // peak
			break;
	  case 22:
			color = "#eef"; // peak
			break;
	  case 23:
			color = "#fff"; // peak
			break;
	}
	if (biome_height > 23) {
		color = "#fff";
	}
	
	if (2 <= biome_height && biome_height < 4) {
		if (r1) {
			if (r2) { // both
				color = "#0aa";//"#0ff";
			} else { // only r1
				color = "#0aa";//"#f0f";
			}
		} else if (r2) { // only r2
			color = "#0aa";//"#0f0";	
		}
	}
	
	
	
	return color;
}



const HEIGHTS = {
	"deep_water": {index: 0, h: 45, color: "#007"},
	"water": {index: 0, h: 45, color: "#00a"}, //30
	"grass": {index: 1, h: 50, color: "#590"/*"#050"*/}, //45
	"upland": {index: 2, h: 54, color: "#6a0"/*"#161"*/}, //58
	"hills": {index: 3, h: 58, color: "#7b0"/*"#696"*/}, //62
	"uphills": {index: 4, h: 62, color: "#8c0"/*"#960"*/}, //64
	"mountains": {index: 5, h: 66, color: "#888"/*"#888"*/}, //69
	"peaks": {index: 6, h: 70, color: "#fff"}, //74
	"river": {index: 0, h: 45, color: "#00a"}, //30
};

//const GRAD_DIST = [0, 45, 50,54,58,62,66,70];



/*
function get_altitude_color(h_p) {
	// h_p should be a number from 0 - 100
	let biome_height = 0;
	let r_ = 0;
	let g_ = 0;
	let b_ = 0;
	
	
	for (let i=0; i<GRAD_DIST.length; i++) {
		if (GRAD_DIST[i] < h_p) { biome_height++; } 
		else { break; }
	}
	let color = "rgb("+r_+","+g_+","+b_+")";
	return [biome_height, color];
}

/**/





const SIZES = [
	{"qsize": 16, "scale": 4},
	{"qsize": 32, "scale": 2},
	{"qsize": 64, "scale": 1},
];

let s_ = 0;
const QSIZE = SIZES[s_].qsize;
const SCALE = SIZES[s_].scale;


function create_mini_map(local_x, local_y) {
	let pixelData = [];
	let spPixelData = [];
	
	for (let y=local_y-QSIZE, ly=0; y<=local_y+QSIZE; y++, ly++) {
		for (let x=local_x-QSIZE, lx=0; x<local_x+QSIZE; x++, lx++) {
			
			let biome_type = get_main_biome_type(x, y);
			
		  let ggim = get_gradient_info_math(x, y);
			let alt_type = get_main_altitude_type(ggim[1]);
			let alt_color = get_main_altitude_color(alt_type, ggim[2], ggim[3]);
			let xyo = ggim[5];
			
			pixelData.push([lx, ly, alt_color, biome_type]);
			
			if (xyo !== 0) {
				for (let xyi=0; xyi<xyo.length; xyi++) {
					let xx = xyo[xyi][0];
					let yy = xyo[xyi][1];
					if (xx === x && yy === y) {
						pixelData.push([xx-local_x+QSIZE,yy-local_y+QSIZE, "#f00"]);
					}
				}
			} 
			
		}
	}
	
	return pixelData;
	
}



function grad_layout(ref_map) {
	
	let all_9_maps = [];
	for (let b=-1; b<2; b++) {
		for (let a=-1; a<2; a++) {
			let new_map = [...Array(3)].map(_ => Array(3).fill(0));
			new_map[0][0] = ref_map[1+b][1+a]-ref_map[2+b][2+a];
			new_map[0][1] = ref_map[1+b][2+a]-ref_map[2+b][2+a];
			new_map[0][2] = ref_map[1+b][3+a]-ref_map[2+b][2+a];
			new_map[1][0] = ref_map[2+b][1+a]-ref_map[2+b][2+a];
			new_map[1][2] = ref_map[2+b][3+a]-ref_map[2+b][2+a];
			new_map[2][0] = ref_map[3+b][1+a]-ref_map[2+b][2+a];
			new_map[2][1] = ref_map[3+b][2+a]-ref_map[2+b][2+a];
			new_map[2][2] = ref_map[3+b][3+a]-ref_map[2+b][2+a];
			all_9_maps.push(new_map);
		}
	}

	return all_9_maps;
}

function biome_layout(ref_map) {
	// just splits into more thingys
	let all_9_maps = [];
	for (let b=1; b<4; b++) {
		for (let a=1; a<4; a++) {
			let new_map = [...Array(3)].map(_ => Array(3).fill(0));
			new_map[0][0] = ref_map[b-1][a-1];
			new_map[0][1] = ref_map[b-1][a];
			new_map[0][2] = ref_map[b-1][a+1];
			new_map[1][0] = ref_map[b][a-1];
			new_map[1][1] = ref_map[b][a];
			new_map[1][2] = ref_map[b][a+1];
			new_map[2][0] = ref_map[b+1][a-1];
			new_map[2][1] = ref_map[b+1][a];
			new_map[2][2] = ref_map[b+1][a+1];
			all_9_maps.push(new_map);
		}
	}

	return all_9_maps;
}

function height_layout(ref_map) {
	//console.log(ref_map);
	// just splits into more thingys
	let all_9_maps = [];
	for (let b=1; b<4; b++) {
		for (let a=1; a<4; a++) {
			let new_map = [...Array(3)].map(_ => Array(3).fill(0));
			/*new_map[0][0] = get_main_altitude_type(Math.floor(ref_map[b-1][a-1]));
			new_map[0][1] = get_main_altitude_type(Math.floor(ref_map[b-1][a]));
			new_map[0][2] = get_main_altitude_type(Math.floor(ref_map[b-1][a+1]));
			new_map[1][0] = get_main_altitude_type(Math.floor(ref_map[b][a-1]));
			new_map[1][1] = get_main_altitude_type(Math.floor(ref_map[b][a]));
			new_map[1][2] = get_main_altitude_type(Math.floor(ref_map[b][a+1]));
			new_map[2][0] = get_main_altitude_type(Math.floor(ref_map[b+1][a-1]));
			new_map[2][1] = get_main_altitude_type(Math.floor(ref_map[b+1][a]));
			new_map[2][2] = get_main_altitude_type(Math.floor(ref_map[b+1][a+1]));/**/
			new_map[0][0] = ref_map[b-1][a-1];
			new_map[0][1] = ref_map[b-1][a];
			new_map[0][2] = ref_map[b-1][a+1];
			new_map[1][0] = ref_map[b][a-1];
			new_map[1][1] = ref_map[b][a];
			new_map[1][2] = ref_map[b][a+1];
			new_map[2][0] = ref_map[b+1][a-1];
			new_map[2][1] = ref_map[b+1][a];
			new_map[2][2] = ref_map[b+1][a+1];
			all_9_maps.push(new_map);
		}
	}
	
	return all_9_maps;
	//return ref_map;
}

function seed_layout(ref_map) {
	// just splits into more thingys
	let all_9_maps = [];
	for (let b=1; b<4; b++) {
		for (let a=1; a<4; a++) {
			let new_map = [...Array(3)].map(_ => Array(3).fill(0));
			new_map[0][0] = ref_map[b-1][a-1];
			new_map[0][1] = ref_map[b-1][a];
			new_map[0][2] = ref_map[b-1][a+1];
			new_map[1][0] = ref_map[b][a-1];
			new_map[1][1] = ref_map[b][a];
			new_map[1][2] = ref_map[b][a+1];
			new_map[2][0] = ref_map[b+1][a-1];
			new_map[2][1] = ref_map[b+1][a];
			new_map[2][2] = ref_map[b+1][a+1];
			all_9_maps.push(new_map);
		}
	}

	return all_9_maps;
}




const FOREST_TYPE = {
	//"": 
	
}

const FMIN = 7;
const FMAX = 14;

function get_main_biome_type(x,y) {
	
	// ----- FOREST -----
	let f1 = 11; 
	let f2 = 3;
  let forest1 = simplex_country_1.noise2D(x/53, y/53);
	let forest1n = 0 + (forest1 + 1) * f1;
	let forest2 = simplex_country_2.noise2D(x/27, y/27);
	let forest2n = 0 + (forest2 + 1) * f2;
	let forest_max = (f1*2) + (f2*2);
	
	let forest_n = Math.floor(forest1n+forest2n); // 20
	
	//let h = Math.floor(hcy+hv+hy);
	//let h_max = hcy_max + hv_max + hy_max;
	//let hp = (h/h_max) * 100;
	if (FMIN <= forest_n && forest_n < FMAX) {
		return "forest";
	}
	
	
	
	return forest_n;
}


/*
var _h_h_p = null;//get_gradient_info_math(x, y);

var _h = null;//h_h_p[0];
var _h_p = null;//h_h_p[1];
var _is_river_1 = null;//h_h_p[2];
var _is_river_2 = null;//h_h_p[3];
var _difficulty = null;//h_h_p[4];
var _xyo = null;//h_h_p[5];
var _bvi = null;//h_h_p[6];
*/


// this function gets info from all 25 chunks around the 'center' one
export function get_chunk_info(x,y, reset_mini_map=0, reset_chunk_layout=0) {
	
	let g_layout = null;
	let b_layout = null;
	let h_layout = null;
	//let s_layout = null;
	let dot_map_downhill = null;
	let dot_map_uphill = null;
	//let cgrad = null;
	let ograds = null;
	let obiomes = null;
	let oheights = null;
	//let oseeds = null;
	
	let height_ = null;
	let difficulty_ = null;
	let color_ = null;
	let special_ = null;
	let bvi_ = null;
	let xyo_ = null;
	let is_river_1_ = null;
	let is_river_2_ = null;
	
	//let seed_xy = x+"_"+y;
	//let seed_ = PRNG(seed_xy, 100);
	
	if (reset_chunk_layout === 1) {
		// get surrounding map
		g_layout = [...Array(5)].map(_ => Array(5).fill(0));
		b_layout = [...Array(5)].map(_ => Array(5).fill(0));
		h_layout = [...Array(5)].map(_ => Array(5).fill(0));
		//s_layout = [...Array(5)].map(_ => Array(5).fill(0));
		
		for (let yy=-2; yy<3; yy++) {
			for (let xx=-2; xx<3; xx++) {
				let ggim = get_gradient_info_math(x+xx, y+yy); // []
				
				// [h, h_p, is_river_1, is_river_2, difficulty, xyo, bvi];
				b_layout[yy+2][xx+2] = get_main_biome_type(x+xx, y+yy);//bims; // from [20, ..., 37]
				//h_layout[yy+2][xx+2] = get_main_altitude_type(ggim[1]);//ggim[1];//gims[0];
				g_layout[yy+2][xx+2] = get_main_altitude_type(ggim[1]); // 
				
				//s_layout[yy+2][xx+2] = (x+xx)+"_"+(y+yy);
				
				//let gims = ggim[1];//get_gradient_info_math(x+xx, y+yy); // []
				if (yy === 0 && xx === 0) {
					height_ = get_main_altitude_type(ggim[1]);//ggim[1];
					is_river_1_ = ggim[2];
					is_river_2_ = ggim[3];
					difficulty_ = ggim[4];
					xyo_ = ggim[5];
					bvi_ = ggim[6];
				}
			}
		}
		
		let bf = b_layout.flat();
		let small = Math.min(...bf);
		let big = Math.max(...bf);
		
		//console.log("---------vvvvvvv-------");
		//console.log(bf.join(" ")+" range: "+small+" - "+big);
		//console.log("range: "+small+" - "+big)
		//console.log(b_layout.flat().join(" "));
		//console.log(h_layout.flat().join(" "));
		//console.log(g_layout.flat().join(" "));
		//console.log("---------^^^^^^^-------");
		
		
		ograds = grad_layout(g_layout);
		obiomes = biome_layout(b_layout);
		oheights = height_layout(g_layout);
		//oseeds = seed_layout(s_layout);
		
	}
	
	
	let mini_map = null;
	if (reset_mini_map) {
		mini_map = create_mini_map(x, y);
	}
	
	
	return {
		//"biome": biome,
		//"is_river": river,
		//"layout": chunk_layout,
		//"cgrad": cgrad,
		"oheights": oheights,
		"ograds": ograds,
		"obiomes": obiomes,
		//"oseeds": oseeds,
		
		"difficulty": difficulty_,
		"color": color_,//height_and_color[1],//color,
		"special": xyo_,
		"bvi": bvi_,
		"height": height_,//height_and_color[0],//height,//HEIGHTS[biome].index,
		"local_mini_map": mini_map,
		
		//"seed": seed_
	};
}












const N = 100;
export function build_chunk(oheight, ograd, obiome, print_=0, x=0, y=0) {
	let seed = PRNG(x+"_"+y, N+1);
	let iR = 0;                             
	//r = min + Math.floor(seed[iR] * max);
	//iR = iR >= N ? 0 : iR+1;
	
	//console.log(obiome.flat().join(" "));
	
	
	let events = [...Array(16)].map(_ => Array(16).fill(0));
	
	
	
	
	let w = 11; // 11 for deep water
	let d = 110;
	let d2 = 111;
	let r = 0;
	
	let n = 1;
	
	
	events = build_chunk_WATER_VS_LAND(seed, events, oheight, ograd, obiome, x,y);
	
	events = build_chunk_MOUNTAIN(seed, events, oheight, ograd, obiome, x,y);
	
	
	//events[0][0] = 20;
	//events[0][15] = 21;
	//events[15][0] = 22;
	//events[15][15] = 0;
	
	if (obiome[1][1] === "forest" && events[0][0] !== w) {
		// ------- FOREST --------
		
		/*
		events[0][0] = 20;
		events[0][1] = 70;
		events[0][2] = 71;
		events[0][3] = 72;
		events[0][4] = 73;
		events[0][5] = 74;
		events[0][6] = 75;
		events[0][7] = 76;
		events[0][8] = 77;
		/**/
		//console.log(events[0][0]);
	}
	
	
	
	
	
	if (print_) {
		let ss = "";
		let ss_h = "";
		let ss_g = "";
		
		for (let y=0; y<3; y++) {
			
			ss = ss+" "+oheight[y][0]+" "+oheight[y][1]+" "+oheight[y][2]+"     "+ograd[y][0]+" "+ograd[y][1]+" "+ograd[y][2]+"\n";
		}
		console.log(ss);
	
		
		for (let y=0; y<3; y++) {
			for (let x=0; x<3; x++) {
				ss_g = ss_g+" "+ograd[y][x];
			}
			ss_g = ss_g+"\n";
		}
		//console.log(ss_g);
	  
		//console.log();
  }
	
	return events;
}











function build_chunk_WATER_VS_LAND(seed, events, oheight, ograd, obiome, x,y) {
	let iR = 0;
	
	let w = 11; // 11 for deep water
	let d = 110;
	let d2 = 111;
	let r = 0;
	
	//let n = 1;


	// ================  WATER  =================
	if (oheight[1][1] === 1) {
	
	  // middle done first
		if (oheight[1][1] === 1) {
			for (let a=4; a<12; a++) {
				for (let b=4; b<12; b++) {
				  events[a][b] = w;
				}
			}
		}
	
		// top left corner
		if (oheight[0][0] === 1 || (oheight[0][1] === 1 && oheight[1][0] === 1)) {
			for (let a=0; a<4; a++) {
				for (let b=0; b<4; b++) {
				  events[a][b] = w;
				}
			}
		} else {
			if (oheight[0][0] !== 1) { 
			  if (oheight[1][0] !== 1 && oheight[2][0] === 1) { // left tall corner
					r = 0 + Math.floor(seed[iR] * (CSHAPES["brc"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["brc"][r][b][a]) {
								events[8+b][0+a] = w;
							}
						}
					}
				}
				if (oheight[0][1] !== 1 && oheight[0][2] === 1) { // top wide corner
					r = 0 + Math.floor(seed[iR] * (CSHAPES["brc"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["brc"][r][b][a]) {
								events[0+b][8+a] = w;
							}
						}
					}
				}
				if (oheight[1][0] !== 1 && oheight[0][1] !== 1) {
					r = 0 + Math.floor(seed[iR] * (CSHAPES["tlc"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["tlc"][r][b][a]) {
								events[4+b][4+a] = 0;
							}
						}
					}
				}
			}
		}
	
  
		// top right corner
		if (oheight[0][2] === 1 || (oheight[0][1] === 1 && oheight[1][2] === 1)) {
			for (let a=0; a<4; a++) {
				for (let b=12; b<16; b++) {
				  events[a][b] = w;
				}
			}
		} else {
			if (oheight[0][2] !== 1) { 
			  if (oheight[1][2] !== 1 && oheight[2][2] === 1) { // right tall corner
					r = 0 + Math.floor(seed[iR] * (CSHAPES["blc"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["blc"][r][b][a]) {
								events[8+b][12+a] = w;
							}
						}
					}
				}
				if (oheight[0][1] !== 1 && oheight[0][0] === 1) { // top wide corner
					r = 0 + Math.floor(seed[iR] * (CSHAPES["blc"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["blc"][r][b][a]) {
								events[0+b][4+a] = w;
							}
						}
					}
				}
				if (oheight[1][2] !== 1 && oheight[0][1] !== 1) {
					r = 0 + Math.floor(seed[iR] * (CSHAPES["trc"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["trc"][r][b][a]) {
								events[4+b][8+a] = 0;
							}
						}
					}
				}
			}
		}
	
  
		// bottom left corner
		if (oheight[2][0] === 1 || (oheight[1][0] === 1 && oheight[2][1] === 1)) {
			for (let a=12; a<16; a++) {
				for (let b=0; b<4; b++) {
				  events[a][b] = w;
				}
			}
		} else {
			if (oheight[2][0] !== 1) { 
			  if (oheight[1][0] !== 1 && oheight[0][0] === 1) { // left tall corner
					r = 0 + Math.floor(seed[iR] * (CSHAPES["trc"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["trc"][r][b][a]) {
								events[4+b][0+a] = w;
							}
						}
					}
				}
				if (oheight[2][1] !== 1 && oheight[2][2] === 1) { // bottom wide corner
					r = 0 + Math.floor(seed[iR] * (CSHAPES["trc"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["trc"][r][b][a]) {
								events[12+b][8+a] = w;
							}
						}
					}
				}
				if (oheight[1][0] !== 1 && oheight[2][1] !== 1) {
					r = 0 + Math.floor(seed[iR] * (CSHAPES["blc"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["blc"][r][b][a]) {
								events[8+b][4+a] = 0;
							}
						}
					}
				}
			}
		}
  
	
	  // bottom right corner
		if (
			oheight[2][2] === 1 || // corner is water, or
			(oheight[1][2] === 1 && oheight[2][1] === 1) // right and bottom are both water 
		) {
			for (let a=12; a<16; a++) {
				for (let b=12; b<16; b++) {
				  events[a][b] = w;
				}
			}
		} else {
			if (oheight[2][2] !== 1) {
			  if (oheight[1][2] !== 1 && oheight[0][2] === 1) { // right tall corner
					r = 0 + Math.floor(seed[iR] * (CSHAPES["tlc"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["tlc"][r][b][a]) {
								events[4+b][12+a] = w;
							}
						}
					}
				}
				if (oheight[2][1] !== 1 && oheight[2][0] === 1) { // bottom wide corner
					r = 0 + Math.floor(seed[iR] * (CSHAPES["tlc"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["tlc"][r][b][a]) {
								events[12+b][4+a] = w;
							}
						}
					}
				}
				if (oheight[1][2] !== 1 && oheight[2][1] !== 1) {
					r = 0 + Math.floor(seed[iR] * (CSHAPES["brc"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["brc"][r][b][a]) {
								events[8+b][8+a] = 0;
							}
						}
					}
				}	
			}
		}
	
	
		// ---------- TOP ------------
		if (oheight[0][1] === 1) {
			for (let a=0; a<4; a++) {
				for (let b=4; b<12; b++) {
				  events[a][b] = w;
				}
			}
		} else {
			if (oheight[0][2] === 1 && oheight[2][2] === 1) { // lighthouse south tip
				r = 0 + Math.floor(seed[iR] * (CSHAPES["lhst"].length));
				iR = iR >= N ? 0 : iR+1;
				for (let b=0; b<8; b++) {
					for (let a=0; a<8; a++) {
						if (CSHAPES["lhst"][r][b][a]) {
							events[0+b][4+a] = w;
						}
					}
				}
			} else if (oheight[0][0] === 1 && oheight[0][2] !== 1) { // top: water on left, two grass on right
				if (oheight[1][2] === 1) { // water on right
					r = 0 + Math.floor(seed[iR] * (CSHAPES["b3"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<12; a++) {
							if (CSHAPES["b3"][r][b][a]) {
								events[0+b][4+a] = w;
							}
						}
					}
				} 
			} else if (oheight[0][0] !== 1 && oheight[0][2] === 1 && oheight[1][0] === 1) { // top: two grass on left, water on right, water on left
				r = 0 + Math.floor(seed[iR] * (CSHAPES["b3"].length));
				iR = iR >= N ? 0 : iR+1;
				for (let b=0; b<4; b++) {
					for (let a=0; a<12; a++) {
						if (CSHAPES["b3"][r][b][a]) {
							events[0+b][0+a] = w;
						}
					}
				}
			} else { // full edge on bottom
				// MIDDLE row
				if (oheight[1][0] === 1 && oheight[1][2] === 1) { // left is water, right is water
					r = 0 + Math.floor(seed[iR] * (CSHAPES["b"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<8; a++) {
							if (CSHAPES["b"][r][b][a]) {
								events[0+b][0+a] = w;
							}
						}
					}
					r = 0 + Math.floor(seed[iR] * (CSHAPES["b"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<8; a++) {
							if (CSHAPES["b"][r][b][a]) {
								events[0+b][8+a] = w;
							}
						}
					}
				} else if (oheight[1][0] === 1 && oheight[1][2] !== 1) { // left is water, right is grass
					r = 0 + Math.floor(seed[iR] * (CSHAPES["b"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<8; a++) {
							if (CSHAPES["b"][r][b][a]) {
								events[0+b][0+a] = w;
							}
						}
					}/**/
				} else if (oheight[1][0] !== 1 && oheight[1][2] === 1) { // left is grass, right is water
					r = 0 + Math.floor(seed[iR] * (CSHAPES["b"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<8; a++) {
							if (CSHAPES["b"][r][b][a]) {
								events[0+b][8+a] = w;
							}
						}
					}
				} else { // both are grass
					//events[8][11] = d;
				}
			}
		
		}
	

	  // ------- LEFT --------
		if (oheight[1][0] === 1) {
			for (let a=4; a<12; a++) {
				for (let b=0; b<4; b++) {
				  events[a][b] = w;
				}
			}
		} else {
			// checking top and bottom now, given left is NOT water
			if (oheight[0][0] === 1 && oheight[2][0] === 1) { // lighthouse west tip
				r = 0 + Math.floor(seed[iR] * (CSHAPES["lhwt"].length));
				iR = iR >= N ? 0 : iR+1;
				for (let b=0; b<8; b++) {
					for (let a=0; a<8; a++) {
						if (CSHAPES["lhwt"][r][b][a]) {
							events[4+b][0+a] = w;
						}
					}
				}
			} else if (oheight[0][0] === 1 && oheight[2][0] !== 1 && oheight[2][1] === 1) { // water on top, two grass on bottom, and no grass blocking bottom middle
				r = 0 + Math.floor(seed[iR] * (CSHAPES["r3"].length));
				iR = iR >= N ? 0 : iR+1;
				for (let b=0; b<12; b++) {
					for (let a=0; a<4; a++) {
						if (CSHAPES["r3"][r][b][a]) {
							events[4+b][0+a] = w;
						}
					}
				}/**/
			} else if (oheight[0][0] !== 1 && oheight[2][0] === 1 && oheight[0][1] === 1) { // two grass on top, water on bottom, and no grass blocking top middle
				r = 0 + Math.floor(seed[iR] * (CSHAPES["r3"].length));
				iR = iR >= N ? 0 : iR+1;
				for (let b=0; b<12; b++) {
					for (let a=0; a<4; a++) {
						if (CSHAPES["r3"][r][b][a]) {
							events[0+b][0+a] = w;
						}
					}
				}
			} else { // full edge on left
				// MIDDLE column
				if (oheight[0][1] === 1 && oheight[2][1] === 1) { // top is water, bottom is water
					r = 0 + Math.floor(seed[iR] * (CSHAPES["r"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<8; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["r"][r][b][a]) {
								events[0+b][0+a] = w;
							}
						}
					}
					r = 0 + Math.floor(seed[iR] * (CSHAPES["r"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<8; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["r"][r][b][a]) {
								events[8+b][0+a] = w;
							}
						}
					}
				} else if (oheight[0][1] === 1 && oheight[2][1] !== 1) { // top is water, bottom is grass
					r = 0 + Math.floor(seed[iR] * (CSHAPES["r"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<8; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["r"][r][b][a]) {
								events[0+b][0+a] = w;
							}
						}
					}
				} else if (oheight[0][1] !== 1 && oheight[2][1] === 1) { // top is grass, bottom is water
					r = 0 + Math.floor(seed[iR] * (CSHAPES["r"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<8; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["r"][r][b][a]) {
								events[8+b][0+a] = w;
							}
						}
					}
				} else { // both are grass
					events[8][5] = d;
				}
			}
		}
	

	  // ----------- RIGHT ---------------
		if (oheight[1][2] === 1) {
			for (let a=4; a<12; a++) {
				for (let b=12; b<16; b++) {
				  events[a][b] = w;
				}
			}
		} else {
			if (oheight[0][2] === 1 && oheight[2][2] === 1) { // lighthouse east tip
				r = 0 + Math.floor(seed[iR] * (CSHAPES["lhet"].length));
				iR = iR >= N ? 0 : iR+1;
				for (let b=0; b<8; b++) {
					for (let a=0; a<8; a++) {
						if (CSHAPES["lhet"][r][b][a]) {
							events[4+b][8+a] = w;
						}
					}
				}
			} else if (oheight[0][2] === 1 && oheight[2][2] !== 1) {
				if (oheight[2][1] === 1) { // water on top, two grass on bottom, no grass blocking bottom middle
					r = 0 + Math.floor(seed[iR] * (CSHAPES["l3"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<12; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["l3"][r][b][a]) {
								events[4+b][12+a] = w;
							}
						}
					}
				}
			} else if (oheight[0][2] !== 1 && oheight[2][2] === 1 && oheight[0][1] === 1) { // two grass on top, water on bottom, no grass blocking top middle
				r = 0 + Math.floor(seed[iR] * (CSHAPES["l3"].length));
				iR = iR >= N ? 0 : iR+1;
				for (let b=0; b<12; b++) {
					for (let a=0; a<4; a++) {
						if (CSHAPES["l3"][r][b][a]) {
							events[0+b][12+a] = w;
						}
					}
				}
			} else { // full edge on right
				// MIDDLE column
				if (oheight[0][1] === 1 && oheight[2][1] === 1) { // top is water, bottom is water
					r = 0 + Math.floor(seed[iR] * (CSHAPES["l"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<8; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["l"][r][b][a]) {
								events[0+b][12+a] = w;
							}
						}
					}
					r = 0 + Math.floor(seed[iR] * (CSHAPES["l"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<8; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["l"][r][b][a]) {
								events[8+b][12+a] = w;
							}
						}
					}
				} else if (oheight[0][1] === 1 && oheight[2][1] !== 1) { // top is water, bottom is grass
					r = 0 + Math.floor(seed[iR] * (CSHAPES["l"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<8; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["l"][r][b][a]) {
								events[0+b][12+a] = w;
							}
						}
					}
				} else if (oheight[0][1] !== 1 && oheight[2][1] === 1) { // top is grass, bottom is water
					r = 0 + Math.floor(seed[iR] * (CSHAPES["l"].length));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<8; b++) {
						for (let a=0; a<4; a++) {
							if (CSHAPES["l"][r][b][a]) {
								events[8+b][12+a] = w;
							}
						}
					}
				} else { // both are grass
					events[8][11] = d;
				}
			}
		}
	
	
		// ---------- BOTTOM ------------
		if (oheight[2][1] === 1) {
			for (let a=12; a<16; a++) {
				for (let b=4; b<12; b++) {
				  events[a][b] = w;
				}
			}
		} else {
			if (oheight[2][0] === 1 && oheight[2][2] === 1) { // lighthouse north tip
				r = 0 + Math.floor(seed[iR] * (CSHAPES["lhnt"].length-1));
				iR = iR >= N ? 0 : iR+1;
				for (let b=0; b<8; b++) {
					for (let a=0; a<8; a++) {
						if (CSHAPES["lhnt"][r][b][a]) {
							events[8+b][4+a] = w;
						}
					}
				}
			} else if (oheight[2][0] === 1 && oheight[2][2] !== 1) { // bottom: water on left, two grass on right
				if (oheight[1][2] === 1) { // water on right
					r = 0 + Math.floor(seed[iR] * (CSHAPES["t3"].length-1));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<12; a++) {
							if (CSHAPES["t3"][r][b][a]) {
								events[12+b][4+a] = w;
							}
						}
					}
				} 
			} else if (oheight[2][0] !== 1 && oheight[2][2] === 1 && oheight[1][0] === 1) { // two grass on left, water on right, water on left
				r = 0 + Math.floor(seed[iR] * (CSHAPES["t3"].length-1));
				iR = iR >= N ? 0 : iR+1;
				for (let b=0; b<4; b++) {
					for (let a=0; a<12; a++) {
						if (CSHAPES["t3"][r][b][a]) {
							events[12+b][0+a] = w;
						}
					}
				}
			} else { // full edge on bottom
				// MIDDLE row
				if (oheight[1][0] === 1 && oheight[1][2] === 1) { // left is water, right is water
					r = 0 + Math.floor(seed[iR] * (CSHAPES["t"].length-1));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<8; a++) {
							if (CSHAPES["t"][r][b][a]) {
								events[12+b][0+a] = w;
							}
						}
					}
					r = 0 + Math.floor(seed[iR] * (CSHAPES["t"].length-1));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<8; a++) {
							if (CSHAPES["t"][r][b][a]) {
								events[12+b][8+a] = w;
							}
						}
					}
				} else if (oheight[1][0] === 1 && oheight[1][2] !== 1) { // left is water, right is grass
					r = 0 + Math.floor(seed[iR] * (CSHAPES["t"].length-1));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<8; a++) {
							if (CSHAPES["t"][r][b][a]) {
								events[12+b][0+a] = w;
							}
						}
					}
				} else if (oheight[1][0] !== 1 && oheight[1][2] === 1) { // left is grass, right is water
					r = 0 + Math.floor(seed[iR] * (CSHAPES["t"].length-1));
					iR = iR >= N ? 0 : iR+1;
					for (let b=0; b<4; b++) {
						for (let a=0; a<8; a++) {
							if (CSHAPES["t"][r][b][a]) {
								events[12+b][8+a] = w;
							}
						}
					}
				} else { // both are grass
					//events[8][11] = d;
				}
			
			}
		
		}
			
		// ============= LAND ==================
	} else { 
	
	
		// top left corner
		if (oheight[0][0] === 1 && (oheight[0][1] === 1 && oheight[1][0] === 1)) {
			r = 0 + Math.floor(seed[iR] * (CSHAPES["tlc"].length));
			iR = iR >= N ? 0 : iR+1;
			for (let b=0; b<4; b++) {
				for (let a=0; a<4; a++) {
					if (CSHAPES["tlc"][r][b][a]) {
						events[0+b][0+a] = w;
					}
				}
			}
		}
	
		// top right corner
		if (oheight[0][2] === 1 && (oheight[0][1] === 1 && oheight[1][2] === 1)) {
			r = 0 + Math.floor(seed[iR] * (CSHAPES["trc"].length));
			iR = iR >= N ? 0 : iR+1;
			for (let b=0; b<4; b++) {
				for (let a=0; a<4; a++) {
					if (CSHAPES["trc"][r][b][a]) {
						events[0+b][12+a] = w;
					}
				}
			}
		}
	
		// bottom left corner
		if (oheight[2][0] === 1 && (oheight[1][0] === 1 && oheight[2][1] === 1)) {
			r = 0 + Math.floor(seed[iR] * (CSHAPES["blc"].length));
			iR = iR >= N ? 0 : iR+1;
			for (let b=0; b<4; b++) {
				for (let a=0; a<4; a++) {
					if (CSHAPES["blc"][r][b][a]) {
						events[12+b][0+a] = w;
					}
				}
			}
		}
	
	  // bottom right corner
		if (oheight[2][2] === 1 && (oheight[1][2] === 1 && oheight[2][1] === 1)) {
			r = 0 + Math.floor(seed[iR] * (CSHAPES["brc"].length));
			iR = iR >= N ? 0 : iR+1;
			for (let b=0; b<4; b++) {
				for (let a=0; a<4; a++) {
					if (CSHAPES["brc"][r][b][a]) {
						events[12+b][12+a] = w;
					}
				}
			}
		} 
	
		// top left cross
		if (oheight[0][0] !== 1 && oheight[0][1] === 1 && oheight[1][0] === 1) {
			r = 0 + Math.floor(seed[iR] * (CSHAPES["tlc"].length));
			iR = iR >= N ? 0 : iR+1;
			for (let b=0; b<4; b++) {
				for (let a=0; a<4; a++) {
					if (CSHAPES["tlc"][r][b][a]) {
						events[0+b][0+a] = w;
					}
				}
			}
		}
	
		// top right cross
		if (oheight[0][2] !== 1 && oheight[0][1] === 1 && oheight[1][2] === 1) {
			r = 0 + Math.floor(seed[iR] * (CSHAPES["trc"].length));
			iR = iR >= N ? 0 : iR+1;
			for (let b=0; b<4; b++) {
				for (let a=0; a<4; a++) {
					if (CSHAPES["trc"][r][b][a]) {
						events[0+b][12+a] = w;
					}
				}
			}
		}
	
		// bottom left cross
		if (oheight[2][0] !== 1 && oheight[1][0] === 1 && oheight[2][1] === 1) {
			r = 0 + Math.floor(seed[iR] * (CSHAPES["blc"].length));
			iR = iR >= N ? 0 : iR+1;
			for (let b=0; b<4; b++) {
				for (let a=0; a<4; a++) {
					if (CSHAPES["blc"][r][b][a]) {
						events[12+b][0+a] = w;
					}
				}
			}
		}
	
		// bottom right cross
		if (oheight[2][2] !== 1 && oheight[1][2] === 1 && oheight[2][1] === 1) {
			r = 0 + Math.floor(seed[iR] * (CSHAPES["brc"].length));
			iR = iR >= N ? 0 : iR+1;
			for (let b=0; b<4; b++) {
				for (let a=0; a<4; a++) {
					if (CSHAPES["brc"][r][b][a]) {
						events[12+b][12+a] = w;
					}
				}
			}
		}
	
	}


	return events;

}


function build_chunk_MOUNTAIN(seed, e, oh, og, ob, x,y) {
	let iR = 0;
	let r = 0;
	
	
	//console.log()
	// EDGES / RIDGES / CLIFFS / SLOPES
	// 36 37
	
	// top left corner
	if (og[0][0] === 1) {
		if (og[0][1] !== 1 && og[1][0] !== 1) { // empty around corner
			e[0][3] = 34; e[1][3] = 34; e[1][2] = 34; e[2][2] = 34; e[2][1] = 34; e[3][1] = 34; e[2][0] = 34; e[3][0] = 34;
		} else if (og[0][1] !== 1 && og[1][0] === 1) {
		} else if (og[0][1] === 1 && og[1][0] !== 1) {
		} else if (og[0][1] === 1 && og[1][0] === 1) { // full corner
			if (og[2][1] !== 1 && og[1][2] !== 1) { // opposites are empty
				r = 0 + Math.floor(seed[iR] * (CLIFFS["cliff_tlc"].length));
				iR = iR >= N ? 0 : iR+1;
				for (let b=0; b<8; b++) {
					for (let a=0; a<8; a++) {
						let c = CLIFFS["cliff_tlc"][r][b][a];
						if (c === 4) {
							e[4+b][4+a] = 34;
						} else if (c === 2) {
							e[4+b][4+a] = 32;
						}
					}
				}
				// top right connect across
				e[3][12] = 34; e[4][12] = 34; e[3][13] = 34; e[4][13] = 34; e[3][14] = 34; e[4][14] = 34; e[3][15] = 34; e[4][15] = 34;
				// bottom left connect down
				e[10][3] = 33; e[11][3] = 33; e[12][3] = 33; e[13][3] = 33; e[14][3] = 33; e[15][3] = 33;
			}
		}
	}
	
	// top right corner
	if (og[0][2] === 1) {
		if (og[0][1] !== 1 && og[1][2] !== 1) { // empty around corner
			e[0][12] = 34; e[1][12] = 34; e[1][13] = 34; e[2][13] = 34; e[2][14] = 34; e[3][14] = 34; e[2][15] = 34; e[3][15] = 34;
		} else if (og[0][1] !== 1 && og[1][2] === 1) {
		} else if (og[0][1] === 1 && og[1][2] !== 1) {
		} else if (og[0][1] === 1 && og[1][2] === 1) { // full corner
			if (og[1][0] !== 1 && og[2][1] !== 1) { // opposites are empty
				r = 0 + Math.floor(seed[iR] * (CLIFFS["cliff_trc"].length));
				iR = iR >= N ? 0 : iR+1;
				for (let b=0; b<8; b++) {
					for (let a=0; a<8; a++) {
						let c = CLIFFS["cliff_trc"][r][b][a];
						if (c === 4) {
							e[4+b][4+a] = 34;
						} else if (c === 3) {
							e[4+b][4+a] = 33;
						}
					}
				}
				// top left connect across
				e[3][0] = 34; e[4][0] = 34; e[3][1] = 34; e[4][1] = 34; e[3][2] = 34; e[4][2] = 34; e[3][3] = 34; e[4][3] = 34;
				// bottom right connect down
				e[10][12] = 32; e[11][12] = 32; e[12][12] = 32; e[13][12] = 32; e[14][12] = 32; e[15][12] = 32;
			}
		}
	}
	
	// bottom left corner
	if (og[2][0] === 1) {
		if (og[1][0] !== 1 && og[2][1] !== 1) { // empty around corner
			e[12][0] = 31; e[13][0] = 31; e[13][1] = 31; e[14][1] = 31; e[14][2] = 31; e[15][2] = 31; e[14][3] = 31; e[15][3] = 31;
		} else if (og[1][0] !== 1 && og[2][1] === 1) {
		} else if (og[1][0] === 1 && og[2][1] !== 1) {
		} else if (og[1][0] === 1 && og[2][1] === 1) { // full corner
			if (og[0][1] !== 1 && og[1][2] !== 1) { // opposites are empty
				r = 0 + Math.floor(seed[iR] * (CLIFFS["cliff_blc"].length));
				iR = iR >= N ? 0 : iR+1;
				for (let b=0; b<8; b++) {
					for (let a=0; a<8; a++) {
						let c = CLIFFS["cliff_blc"][r][b][a];
						if (c === 1) {
							e[4+b][4+a] = 31;
						} else if (c === 3) {
							e[4+b][4+a] = 33;
						}
					}
				}
				// top left connect up
				e[0][3] = 33; e[1][3] = 33; e[2][3] = 33; e[3][3] = 33;
				// bottom right connect across
				e[12][11] = 31; e[13][11] = 31; e[12][12] = 31; e[13][12] = 31; e[12][13] = 31; e[13][13] = 31; e[12][14] = 31; e[13][14] = 31; e[12][15] = 31; e[13][15] = 31;
			}
		}
	}
	
	// bottom right corner
	if (og[2][2] === 1) {
		if (og[1][2] !== 1 && og[2][1] !== 1) { // empty around corner
			e[12][15] = 31; e[13][15] = 31; e[13][14] = 31; e[14][14] = 31; e[14][13] = 31; e[15][13] = 31; e[14][12] = 31; e[15][12] = 31;
		} else if (og[1][2] !== 1 && og[2][1] === 1) {
		} else if (og[1][2] === 1 && og[2][1] !== 1) {
		} else if (og[1][2] === 1 && og[2][1] === 1) { // full corner
			if (og[0][1] !== 1 && og[1][0] !== 1) { // opposites are empty
				r = 0 + Math.floor(seed[iR] * (CLIFFS["cliff_brc"].length));
				iR = iR >= N ? 0 : iR+1;
				for (let b=0; b<8; b++) {
					for (let a=0; a<8; a++) {
						let c = CLIFFS["cliff_brc"][r][b][a];
						if (c === 1) {
							e[4+b][4+a] = 31;
						} else if (c === 2) {
							e[4+b][4+a] = 32;
						}
					}
				}
				// top right connect up
				e[0][12] = 32; e[1][12] = 32; e[2][12] = 32; e[3][12] = 32;
				// bottom left connect across
				e[12][0] = 31; e[13][0] = 31; e[12][1] = 31; e[13][1] = 31; e[12][2] = 31; e[13][2] = 31; e[12][3] = 31; e[13][3] = 31; e[12][4] = 31; e[13][4] = 31;
			}
		}
	}
	
	//top
	if (og[0][1] === 1) {
		if (og[1][0] !== 1 && og[1][2] !== 1) { // left right empty
			for (let a=0; a<16; a++) {
				e[3][a] = 34; e[4][a] = 34;
			}
		}
	}
	
	//left
	if (og[1][0] === 1) {
		if (og[0][1] !== 1 && og[2][1] !== 1) { // top bottom empty
			for (let b=0; b<16; b++) {
				e[b][3] = 33;
			}
		}
	}
	
	//right
	if (og[1][2] === 1) {
		if (og[0][1] !== 1 && og[2][1] !== 1) { // top bottom empty
			for (let b=0; b<16; b++) {
				e[b][12] = 32;
			}
		}
	}
	
	// bottom
	if (og[2][1] === 1) {
		if (og[1][0] !== 1 && og[1][2] !== 1) { // left right empty
			for (let a=0; a<16; a++) {
				e[12][a] = 31; e[13][a] = 31;
			}
		}
	}
	
	/*
	// top
	if (ograd[0][1] === 1) {
		if (ograd[0][0] !== 1 && ograd[0][2] !== 1) {
			for (let x=0; x<16; x++) {
				events[2][x] = 34; // 34 bottom face
				events[3][x] = 34;
			}
		}
	}
	
	// bottom
	if (ograd[2][1] === 1) {
		if (ograd[2][0] !== 1 && ograd[2][2] !== 1) {
			for (let x=0; x<16; x++) {
				events[12][x] = 31; // 31 top edge
				events[13][x] = 31;
			}
		}
	}
	
	// left side ( 7_ right cliff 33 )
	if (ograd[1][0] === 1) {
		if (ograd[0][0] !== 1 && ograd[2][0] !== 1) {
			for (let y=0; y<16; y++) {
				if (events[y][3] === 34) {
					events[y][3] = 334; // 334 right cliff overlap front face
				} else if (events[y][3] === 31) {
					events[y][3] = 331; // 331 right cliff overlap back edge
				} else {
					events[y][3] = 33;
				}
			}
		}
	}
	
	// right side ( _Γ left cliff 32 )
	if (ograd[1][2] === 1) {
		if (ograd[0][2] !== 1 && ograd[2][2] !== 1) {
			for (let y=0; y<16; y++) {
				if (events[y][12] === 34) {
					events[y][12] = 324; // 324 left cliff overlap front face
				} else if (events[y][12] === 31) {
					events[y][12] = 321; // 321 left cliff overlap back edge
				} else {
					events[y][12] = 32;
				}
			}
		}
	}/**/
	
	e[0][0] = 403;
	
	
	
	
	return e;
}





/*


	
	/*
	if (ograd[0][0] === -1 && ograd[0][1] === -1 && ograd[0][2] === -1
		&& ograd[1][0] === -1 && ograd[1][2] === -1 
		&& ograd[2][0] === -1 && ograd[2][1] === -1 && ograd[2][2] === -1
	) {
		for (let b=0; b<8; b++) {
			for (let a=0; a<8; a++) {
				if (CLIFFS["test_cliff_top"][0][b][a]) {
					events[4+b][4+a] = 30;
				}
				if (CLIFFS["test_cliff_face"][0][b][a]) {
					events[4+b][4+a] = 31;
				}
			}
		}	
	}


if (0) {
	for (let b=0; b<8; b++) {
		for (let a=0; a<8; a++) {
			let c = CLIFFS["test_cliff"][0][b][a];
			// 31 reserved for other cliff type
		
		
			switch (c) {
				case 1:
					events[4+b][4+a] = 31; //top
					break;
				case 2:
					events[4+b][4+a] = 32; //left
					break;
				case 3:
					events[4+b][4+a] = 33; //right
					break;
				case 4:
					events[4+b][4+a] = 34; // bottom
					break;
				case 5:
					events[4+b][4+a] = 35; // top (block)
					break;
				default:
					break;
			}
		}
	}	
}

/*
events[0][3] = 401; events[1][3] = 401; events[2][3] = 401; events[3][3] = 401;
for (let a=4; a<12; a++) {
	events[a][3] = 30;
}
events[12][3] = 401; events[13][3] = 401; events[14][3] = 401; events[15][3] = 401;
/**/


















































/*
function mini_map_(sp_id) {
	
	let sprite_id = 960;
	
	
	switch (sp_id.biome) {
		case "w": 
			sprite_id = 960;
			break;
		case "g":
			if (["m", "M"].includes(sp_id.biome2)) {
				sprite_id = 963;
			} else if (sp_id.biome2 === "f") {
				sprite_id = 964;
			} else if (sp_id.biome2 === "q") {
			  sprite_id = 966;
			} else {
				sprite_id = 961;
			}
			break;
		case "d":
			sprite_id = 962;
			break;
		case "m":
			sprite_id = 963;
			break;
		case "M":
			sprite_id = 963;
			break;
		case "f":
			sprite_id = 964;
			break;
		case "p":
			sprite_id = 965;
			break;
		case "q":
			sprite_id = 966;
			break;
	}
	return sprite_id;
}/**/





// Function to draw the image on the canvas
export function drawImageFromArray(pixelData) {
  const canvas = document.getElementById('myCanvas');
  const context = canvas.getContext('2d');
	
	
	//context.translate(canvas.width / (SCALE*2), canvas.height / (SCALE*2));
	
	//console.log(pixelData)
	// biome
  pixelData.forEach(([x, y, color, biome]) => {
		//console.log(x+" "+y);
    context.fillStyle = color;
    context.fillRect(x*SCALE, y*SCALE, 1*SCALE, 1*SCALE);
		if (biome === "forest") {
		  context.fillStyle = "#070";
		  context.fillRect(x*SCALE, y*SCALE, 1, 1);/**/
			//context.fillRect(QSIZE*SCALE, QSIZE*SCALE+1, 1, 1);/**/
			//context.fillRect(QSIZE*SCALE+2, QSIZE*SCALE+1, 1, 1);/**/
			//context.fillRect(QSIZE*SCALE+1, QSIZE*SCALE+2, 1, 1);/**/
		} 
		
  });/**/
	
	/*
  // special areas
  spPixelData.forEach(([x, y, color]) => {
    context.fillStyle = color;
    context.fillRect(x*SCALE+xx*SCALE*1, y*SCALE+yy*SCALE*1, SCALE*1, SCALE*1);
  });/**/
	
  // origin (0,0)
  context.fillStyle = "rgb(250,250,250)";
  context.fillRect(QSIZE*SCALE+1, QSIZE*SCALE, 1, 1);/**/
	context.fillRect(QSIZE*SCALE, QSIZE*SCALE+1, 1, 1);/**/
	context.fillRect(QSIZE*SCALE+2, QSIZE*SCALE+1, 1, 1);/**/
	context.fillRect(QSIZE*SCALE+1, QSIZE*SCALE+2, 1, 1);/**/
		
}




const CHUNK_SCALE = 4;


// Function to draw the CHUNK image on the canvas (NOT USED YET)
export function drawChunk(chunkLayoutData) {
	throw 0;
  const canvas = document.getElementById('myCanvasChunk');
  const context = canvas.getContext('2d');
	
	
	//context.translate(canvas.width / (SCALE*2), canvas.height / (SCALE*2));
	
	//console.log(pixelData)
	// biome
  chunkLayoutData.forEach(([x, y, color]) => {
		//console.log(x+" "+y);
    context.fillStyle = color;
    context.fillRect(x*CHUNK_SCALE, y*CHUNK_SCALE, 1*CHUNK_SCALE, 1*CHUNK_SCALE);
  });
	
}


// THIS is the bread and butter
function chunk_layout() {
	//throw 0;
}



