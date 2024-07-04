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
	//console.log(b2);
	
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


export function get_biome_info(x, y) {
	
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
	
	/*
	if (z2 === 5) {
		color = "rgb(255,255,255)";
		biome = "p";
	} else if (z2 === 3) {
		color = "rgb(100,100,100)";
		biome = "m";
	} else if ( z2 >= 1 || z3 === 1) {
		color = "rgb(30,130,0)";
		biome = "g";
		if (z2 === 2) {
			color = "rgb(20,80,0)";
			biome = "f";
		} else if (z1 === 2) {
			color = "rgb(10,40,0)";
			biome = "d";
		} else if (z1 === 1) {
			color = "rgb(20,80,0)";
			biome = "f";
		}
	}/**/
	
	
	// ********* testing DELETE after
	let biome2 = "g";
	
	if (biome === "w") {
		
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
	}
	
	
	return {
		"biome": biome, 
		"biome2": biome2,
		"difficulty": difficulty,
		"color": color,
		"special": xyo,
		"bvi": bvi
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

export function get_chunk_shapes(m) { // m stands for 'map' I guess
	
	/*
		g and w are the main shapes
	
	  f and m are 'second-tier' biomes since they depend on the shape of g and w
	
	/**/
	
	for (let i=0; i<CHUNK_ITER.length; i++) {
		let cid = CHUNK_ITER[i];
		let biome = m[cid].b["biome"];
		let biome2 = m[cid].b["biome2"];
		//console.log(biome+" "+biome2);
		// temporary
		
		
		
		
		
		if (biome == "g") {
			//console.log("get chunk shape for g");
			// need to account for other tiles instead of just g and w
			if (
				m[ DIR[cid].up ].b["biome"] == "g" && 
				m[ DIR[cid].left ].b["biome"] == "g" && 
				m[ DIR[cid].right ].b["biome"] == "w" &&
				m[ DIR[cid].down ].b["biome"] == "w" &&
				m[ DIR[cid].dRight ].b["biome"] == "w"
			) {
				m[cid].s = "gJ";
			} else if (
				
				m[ DIR[cid].left ].b["biome"] == "w" &&
				m[ DIR[cid].down ].b["biome"] == "w" && 
				!(m[ DIR[cid].uLeft ].b["biome"] == "w" && m[ DIR[cid].up ].b["biome"] == "w") &&
				!(
					m[ DIR[cid].left ].b["biome"] == "w" && 
					m[ DIR[cid].dLeft ].b["biome"] == "w" && 
					m[ DIR[cid].down ].b["biome"] == "w" &&
					m[ DIR[cid].dRight ].b["biome"] == "w" &&
					m[ DIR[cid].right ].b["biome"] == "w"
				) &&
				m[ DIR[cid].dLeft ].b["biome"] == "w"
				/*m[ DIR[cid].up ].b["biome"] == "w" && 
				
				//m[ DIR[cid].right ].b["biome"] !== "w" &&
				//m[ DIR[cid].dLeft ].b["biome"] == "w" && // ?
				m[ DIR[cid].dRight ].b["biome"] !== "w" && 
				(m[ DIR[cid].uLeft ].b["biome"] !== "w" || m[ DIR[cid].right ].b["biome"] !== "w")  // not both water
				/**/
				
			) {
				m[cid].s = "gL";
			} else if (
				m[ DIR[cid].up ].b["biome"] == "w" && 
				//m[ DIR[cid].left ].b["biome"] == "w" && 
				m[ DIR[cid].right ].b["biome"] == "w" &&
				//m[ DIR[cid].down ].b["biome"] == "g" &&
				//m[ DIR[cid].uRight ].b["biome"] == "w"
				!(
					m[ DIR[cid].left ].b["biome"] == "w" && 
					m[ DIR[cid].uLeft ].b["biome"] == "w" && 
					m[ DIR[cid].up ].b["biome"] == "w" &&
					m[ DIR[cid].uRight ].b["biome"] == "w" &&
					m[ DIR[cid].right ].b["biome"] == "w"
				) &&
				!(
					m[ DIR[cid].up ].b["biome"] == "w" &&
					m[ DIR[cid].uRight ].b["biome"] == "w" &&
					m[ DIR[cid].right ].b["biome"] == "w" &&
					m[ DIR[cid].dRight ].b["biome"] == "w" && 
					m[ DIR[cid].down ].b["biome"] == "w"
				) &&
				!(
					m[ DIR[cid].up ].b["biome"] == "w" &&
					m[ DIR[cid].uRight ].b["biome"] !== "w" &&
					m[ DIR[cid].right ].b["biome"] == "w"
				)
				// TODO ******* seehere
				
			) {
				m[cid].s = "g7";
			} else if (
				m[ DIR[cid].up ].b["biome"] == "w" && 
				m[ DIR[cid].left ].b["biome"] == "w" && 
				m[ DIR[cid].right ].b["biome"] == "g" &&
				//m[ DIR[cid].down ].b["biome"] == "g" &&
				m[ DIR[cid].uLeft ].b["biome"] == "w" &&
				!(
					m[ DIR[cid].up ].b["biome"] == "w" &&
					m[ DIR[cid].uLeft ].b["biome"] == "w" && 
					m[ DIR[cid].left ].b["biome"] == "w" && 
					m[ DIR[cid].dLeft ].b["biome"] == "w" &&
					m[ DIR[cid].down ].b["biome"] == "w"
				)
			) {
				m[cid].s = "gr";
			} else {
				m[cid].s = "g";
			}
			
			
		} else if (biome == "w") {
			if (
				m[ DIR[cid].up ].b["biome"] !== "w" && 
				m[ DIR[cid].left ].b["biome"] !== "w" && 
				m[ DIR[cid].right ].b["biome"] == "w" &&
				m[ DIR[cid].down ].b["biome"] == "w"
			) {
				if (
					m[ DIR[cid].up ].b["biome"] == "d" && m[ DIR[cid].left ].b["biome"] == "d"
				) {
					m[cid].s = "wdr";
				} else {
					m[cid].s = "wr";
				}
				
			} else if (
				m[ DIR[cid].up ].b["biome"] !== "w" && 
				m[ DIR[cid].left ].b["biome"] == "w" && 
				m[ DIR[cid].right ].b["biome"] !== "w" &&
				m[ DIR[cid].down ].b["biome"] == "w"
			) {
				if (
					m[ DIR[cid].up ].b["biome"] == "d" && m[ DIR[cid].right ].b["biome"] == "d"
				) {
					m[cid].s = "wd7";
				} else {
					m[cid].s = "w7";
				}
			} else if (
				m[ DIR[cid].up ].b["biome"] == "w" && 
				m[ DIR[cid].left ].b["biome"] !== "w" && 
				m[ DIR[cid].right ].b["biome"] == "w" &&
				m[ DIR[cid].down ].b["biome"] !== "w"
			) {
				if (
					m[ DIR[cid].down ].b["biome"] == "d" && m[ DIR[cid].left ].b["biome"] == "d"
				) {
					m[cid].s = "wdL";
				} else {
					m[cid].s = "wL";
				}
			} else if (
				m[ DIR[cid].up ].b["biome"] == "w" && 
				m[ DIR[cid].left ].b["biome"] == "w" && 
				m[ DIR[cid].right ].b["biome"] !== "w" &&
				m[ DIR[cid].down ].b["biome"] !== "w"
			) {
				if (
					m[ DIR[cid].down ].b["biome"] == "d" && m[ DIR[cid].right ].b["biome"] == "d"
				) {
					m[cid].s = "wdJ";
				} else {
					m[cid].s = "wJ";
				}
			} else if (
				m[ DIR[cid].up ].b["biome"] !== "w" && 
				m[ DIR[cid].left ].b["biome"] == "w" && 
				m[ DIR[cid].right ].b["biome"] == "w" &&
				m[ DIR[cid].down ].b["biome"] !== "w" && // if only one of the below is a grass
				(
					(m[ DIR[cid].dLeft ].b["biome"] == "w" ? 1 : 0) +
					(m[ DIR[cid].dRight ].b["biome"] == "w" ? 1 : 0) +
					(m[ DIR[cid].uLeft ].b["biome"] == "w" ? 1 : 0) +
					(m[ DIR[cid].uRight ].b["biome"] == "w" ? 1 : 0) >= 3
				)
			) {
				m[cid].s = "wlbns"; // water land bridge north-south (could have a left-biased NS bridge)
			} else if (
				m[ DIR[cid].up ].b["biome"] == "w" && 
				m[ DIR[cid].left ].b["biome"] !== "w" && 
				m[ DIR[cid].right ].b["biome"] !== "w" &&
				m[ DIR[cid].down ].b["biome"] == "w" &&
				(
					(m[ DIR[cid].dLeft ].b["biome"] == "w" ? 1 : 0) +
					(m[ DIR[cid].dRight ].b["biome"] == "w" ? 1 : 0) +
					(m[ DIR[cid].uLeft ].b["biome"] == "w" ? 1 : 0) +
					(m[ DIR[cid].uRight ].b["biome"] == "w" ? 1 : 0) >= 3
				)
				
			) {
				m[cid].s = "wlbwe"; // water land bridge west-east (could have a top-biased WE bridge)
				
			} else if (
				m[ DIR[cid].up ].b["biome"] !== "w" && 
				m[ DIR[cid].left ].b["biome"] !== "w" && 
				m[ DIR[cid].right ].b["biome"] !== "w" &&
				m[ DIR[cid].down ].b["biome"] === "w" 
				//m[ DIR[cid].dLeft ].b["biome"] !== "w" &&
				//m[ DIR[cid].dRight ].b["biome"] !== "w"
			) {
				m[cid].s = "wn";
			} else if (
				m[ DIR[cid].up ].b["biome"] !== "w" && 
				m[ DIR[cid].left ].b["biome"] !== "w" && 
				m[ DIR[cid].right ].b["biome"] == "w" &&
				m[ DIR[cid].down ].b["biome"] !== "w"
				
			) {
				//console.log("wc being created");
				m[cid].s = "wc";
			} else if (
				m[ DIR[cid].up ].b["biome"] !== "w" && 
				m[ DIR[cid].left ].b["biome"] == "w" && 
				m[ DIR[cid].right ].b["biome"] !== "w" &&
				m[ DIR[cid].down ].b["biome"] !== "w"
			) {
				
				m[cid].s = "w3";
			} else if (
				m[ DIR[cid].up ].b["biome"] == "w" && 
				m[ DIR[cid].left ].b["biome"] !== "w" && 
				m[ DIR[cid].right ].b["biome"] !== "w" &&
				m[ DIR[cid].down ].b["biome"] !== "w"
			) {
				m[cid].s = "wu";
			} else if (
				m[ DIR[cid].up ].b["biome"] !== "w" && 
				m[ DIR[cid].left ].b["biome"] == "w" && 
				m[ DIR[cid].right ].b["biome"] == "w" &&
				m[ DIR[cid].down ].b["biome"] == "w" &&
				m[ DIR[cid].uLeft ].b["biome"] == "w" &&
				m[ DIR[cid].uRight ].b["biome"] == "w"
			) {
				m[cid].s = "wlhst"; // water lighthouse south tip
			} else if (
				m[ DIR[cid].up ].b["biome"] == "w" && 
				m[ DIR[cid].left ].b["biome"] == "g" && 
				//m[ DIR[cid].right ].b["biome"] == "w" &&
				m[ DIR[cid].down ].b["biome"] == "w" &&
				m[ DIR[cid].uLeft ].b["biome"] == "w" &&
				m[ DIR[cid].dLeft ].b["biome"] == "w"
			) {
				m[cid].s = "wlhet"; // water lighthouse east tip
			} else if (
				m[ DIR[cid].up ].b["biome"] == "w" && 
				m[ DIR[cid].left ].b["biome"] == "w" && 
				m[ DIR[cid].right ].b["biome"] == "g" &&
				m[ DIR[cid].down ].b["biome"] == "w" &&
				m[ DIR[cid].uRight ].b["biome"] == "w" &&
				m[ DIR[cid].dRight ].b["biome"] == "w"
			) {
				m[cid].s = "wlhwt"; // water lighthouse west tip
			} else if (
				m[ DIR[cid].up ].b["biome"] == "w" && 
				m[ DIR[cid].left ].b["biome"] == "w" && 
				m[ DIR[cid].right ].b["biome"] == "w" &&
				m[ DIR[cid].down ].b["biome"] == "g" &&
				m[ DIR[cid].dLeft ].b["biome"] == "w" &&
				m[ DIR[cid].dRight ].b["biome"] == "w"
			) {
				m[cid].s = "wlhnt"; // water lighthouse north tip
			} else if (
				m[ DIR[cid].up ].b["biome"] == "g" && 
				m[ DIR[cid].left ].b["biome"] == "g" && 
				m[ DIR[cid].right ].b["biome"] == "g" &&
				m[ DIR[cid].down ].b["biome"] == "g" 
			) {
				m[cid].s = "wo"; // small water lake
			} else if (
				m[ DIR[cid].up ].b["biome"] == "w" && 
				m[ DIR[cid].left ].b["biome"] == "w" && 
				m[ DIR[cid].right ].b["biome"] == "w" &&
				m[ DIR[cid].dLeft ].b["biome"] == "g" &&
				m[ DIR[cid].down ].b["biome"] == "g" &&
				m[ DIR[cid].dRight ].b["biome"] == "g" 
			) {
				m[cid].s = "weT"; // water edge top
			} else if (
				m[ DIR[cid].up ].b["biome"] == "w" && 
				m[ DIR[cid].left ].b["biome"] == "w" && 
				m[ DIR[cid].uRight ].b["biome"] == "g" &&
				m[ DIR[cid].right ].b["biome"] == "g" &&
				m[ DIR[cid].dRight ].b["biome"] == "g" &&
				m[ DIR[cid].down ].b["biome"] == "w" 
			) {
				m[cid].s = "weE"; // water edge left
			} else if (
				m[ DIR[cid].up ].b["biome"] == "w" && 
				m[ DIR[cid].uLeft ].b["biome"] == "g" && 
				m[ DIR[cid].left ].b["biome"] == "g" && 
				m[ DIR[cid].dLeft ].b["biome"] == "g" && 
				m[ DIR[cid].right ].b["biome"] == "w" &&
				m[ DIR[cid].down ].b["biome"] == "w" 
			) {
				m[cid].s = "we3"; // water edge right
			} else if (
				m[ DIR[cid].uLeft ].b["biome"] == "g" && 
				m[ DIR[cid].up ].b["biome"] == "g" && 
				m[ DIR[cid].uRight ].b["biome"] == "g" && 
				m[ DIR[cid].left ].b["biome"] == "w" && 
				m[ DIR[cid].right ].b["biome"] == "w" &&
				m[ DIR[cid].down ].b["biome"] == "w" 
			) {
				m[cid].s = "weU"; // water edge bottom
			} else {
				m[cid].s = "w";
			}
		} else if (biome === "p") {
			// p, q
			//console.log("change m shape");
			if (
				m[ DIR[cid].up ].b["biome"] == "p" && 
				m[ DIR[cid].left ].b["biome"] == "p" && 
				m[ DIR[cid].right ].b["biome"] == "p" &&
				m[ DIR[cid].down ].b["biome"] == "p"
			) {
				m[cid].s = "p"; // <-- use herringbone tile
			} else if (
				m[ DIR[cid].up ].b["biome"] == "p" && 
				m[ DIR[cid].left ].b["biome"] == "p" && 
				m[ DIR[cid].right ].b["biome"] !== "p" &&
				m[ DIR[cid].down ].b["biome"] !== "p"
			) {
				m[cid].s = "pJ";
			} else if (
				m[ DIR[cid].up ].b["biome"] == "p" && 
				m[ DIR[cid].left ].b["biome"] !== "p" && 
				m[ DIR[cid].right ].b["biome"] == "p" &&
				m[ DIR[cid].down ].b["biome"] !== "p"
			) {
				m[cid].s = "pL";
			} else if (
				m[ DIR[cid].up ].b["biome"] !== "p" && 
				m[ DIR[cid].left ].b["biome"] == "p" && 
				m[ DIR[cid].right ].b["biome"] !== "p" &&
				m[ DIR[cid].down ].b["biome"] == "p"
			) {
				m[cid].s = "p7";
			} else if (
				m[ DIR[cid].up ].b["biome"] !== "p" && 
				m[ DIR[cid].left ].b["biome"] !== "p" && 
				m[ DIR[cid].right ].b["biome"] == "p" &&
				m[ DIR[cid].down ].b["biome"] == "p"
			) {
				m[cid].s = "pr";
			} else if (
				m[ DIR[cid].up ].b["biome"] == "p" && 
				m[ DIR[cid].left ].b["biome"] !== "p" && 
				m[ DIR[cid].right ].b["biome"] !== "p" &&
				m[ DIR[cid].down ].b["biome"] !== "p"
			) {
				m[cid].s = "ptu";
			} else if (
				m[ DIR[cid].up ].b["biome"] !== "p" && 
				m[ DIR[cid].left ].b["biome"] == "p" && 
				m[ DIR[cid].right ].b["biome"] !== "p" &&
				m[ DIR[cid].down ].b["biome"] !== "p"
			) {
				m[cid].s = "pt3";
			} else if (
				m[ DIR[cid].up ].b["biome"] !== "p" && 
				m[ DIR[cid].left ].b["biome"] !== "p" && 
				m[ DIR[cid].right ].b["biome"] == "p" &&
				m[ DIR[cid].down ].b["biome"] !== "p"
			) {
				m[cid].s = "ptc";
			} else if (
				m[ DIR[cid].up ].b["biome"] !== "p" && 
				m[ DIR[cid].left ].b["biome"] !== "p" && 
				m[ DIR[cid].right ].b["biome"] !== "p" &&
				m[ DIR[cid].down ].b["biome"] == "p"
			) {
				m[cid].s = "ptn";
			} else if (
				m[ DIR[cid].up ].b["biome"] == "p" && 
				m[ DIR[cid].left ].b["biome"] == "p" && 
				m[ DIR[cid].right ].b["biome"] == "p" &&
				m[ DIR[cid].down ].b["biome"] !== "p"
			) {
				m[cid].s = "peU";//bottom edge
			} else if (
				m[ DIR[cid].up ].b["biome"] == "p" && 
				m[ DIR[cid].left ].b["biome"] == "p" && 
				m[ DIR[cid].right ].b["biome"] !== "p" &&
				m[ DIR[cid].down ].b["biome"] == "p"
			) {
				m[cid].s = "pe3";//right edge
			} else if (
				m[ DIR[cid].up ].b["biome"] == "p" && 
				m[ DIR[cid].left ].b["biome"] !== "p" && 
				m[ DIR[cid].right ].b["biome"] == "p" &&
				m[ DIR[cid].down ].b["biome"] == "p"
			) {
				m[cid].s = "peE";//left edge
			} else if (
				m[ DIR[cid].up ].b["biome"] !== "p" && 
				m[ DIR[cid].left ].b["biome"] == "p" && 
				m[ DIR[cid].right ].b["biome"] == "p" &&
				m[ DIR[cid].down ].b["biome"] == "p"
			) {
				m[cid].s = "peT";//top edge
			} else if (
				m[ DIR[cid].up ].b["biome"] !== "p" && 
				m[ DIR[cid].left ].b["biome"] == "p" && 
				m[ DIR[cid].right ].b["biome"] == "p" &&
				m[ DIR[cid].down ].b["biome"] == "p"
			) {
				m[cid].s = "pT";//top edge
			} else {
				
				m[cid].s = "p"; // 
			}
			
		}
		
		if (biome2 === "m") {
			//console.log("change m shape");
			if (
				m[ DIR[cid].up ].b["biome2"] == "m" && 
				m[ DIR[cid].left ].b["biome2"] == "m" && 
				m[ DIR[cid].right ].b["biome2"] == "m" &&
				m[ DIR[cid].down ].b["biome2"] == "m"
			) {
				m[cid].s = "M";
			} else if (
				m[ DIR[cid].up ].b["biome2"] == "m" && 
				m[ DIR[cid].left ].b["biome2"] == "m" && 
				m[ DIR[cid].right ].b["biome2"] !== "m" &&
				m[ DIR[cid].down ].b["biome2"] !== "m"
			) {
				m[cid].s = "mJ";
			} else if (
				m[ DIR[cid].up ].b["biome2"] == "m" && 
				m[ DIR[cid].left ].b["biome2"] !== "m" && 
				m[ DIR[cid].right ].b["biome2"] == "m" &&
				m[ DIR[cid].down ].b["biome2"] !== "m"
			) {
				m[cid].s = "mL";
			} else if (
				m[ DIR[cid].up ].b["biome2"] !== "m" && 
				m[ DIR[cid].left ].b["biome2"] == "m" && 
				m[ DIR[cid].right ].b["biome2"] !== "m" &&
				m[ DIR[cid].down ].b["biome2"] == "m"
			) {
				m[cid].s = "m7";
			} else if (
				m[ DIR[cid].up ].b["biome2"] !== "m" && 
				m[ DIR[cid].left ].b["biome2"] !== "m" && 
				m[ DIR[cid].right ].b["biome2"] == "m" &&
				m[ DIR[cid].down ].b["biome2"] == "m"
			) {
				m[cid].s = "mr";
			} else if (
				m[ DIR[cid].up ].b["biome2"] == "m" && 
				m[ DIR[cid].left ].b["biome2"] !== "m" && 
				m[ DIR[cid].right ].b["biome2"] !== "m" &&
				m[ DIR[cid].down ].b["biome2"] !== "m"
			) {
				m[cid].s = "mu";
			} else if (
				m[ DIR[cid].up ].b["biome2"] !== "m" && 
				m[ DIR[cid].left ].b["biome2"] == "m" && 
				m[ DIR[cid].right ].b["biome2"] !== "m" &&
				m[ DIR[cid].down ].b["biome2"] !== "m"
			) {
				m[cid].s = "m3";
			} else if (
				m[ DIR[cid].up ].b["biome2"] !== "m" && 
				m[ DIR[cid].left ].b["biome2"] !== "m" && 
				m[ DIR[cid].right ].b["biome2"] == "m" &&
				m[ DIR[cid].down ].b["biome2"] !== "m"
			) {
				m[cid].s = "mc";
			} else if (
				m[ DIR[cid].up ].b["biome2"] !== "m" && 
				m[ DIR[cid].left ].b["biome2"] !== "m" && 
				m[ DIR[cid].right ].b["biome2"] !== "m" &&
				m[ DIR[cid].down ].b["biome2"] == "m"
			) {
				m[cid].s = "mn";
			} else if (
				m[ DIR[cid].up ].b["biome2"] == "m" && 
				m[ DIR[cid].left ].b["biome2"] == "m" && 
				m[ DIR[cid].right ].b["biome2"] == "m" &&
				m[ DIR[cid].down ].b["biome2"] !== "m"
			) {
				m[cid].s = "meb";//bottom edge
			} else if (
				m[ DIR[cid].up ].b["biome2"] == "m" && 
				m[ DIR[cid].left ].b["biome2"] == "m" && 
				m[ DIR[cid].right ].b["biome2"] !== "m" &&
				m[ DIR[cid].down ].b["biome2"] == "m"
			) {
				m[cid].s = "mer";//right edge
			} else if (
				m[ DIR[cid].up ].b["biome2"] == "m" && 
				m[ DIR[cid].left ].b["biome2"] !== "m" && 
				m[ DIR[cid].right ].b["biome2"] == "m" &&
				m[ DIR[cid].down ].b["biome2"] == "m"
			) {
				m[cid].s = "mel";//left edge
			} else if (
				m[ DIR[cid].up ].b["biome2"] !== "m" && 
				m[ DIR[cid].left ].b["biome2"] == "m" && 
				m[ DIR[cid].right ].b["biome2"] == "m" &&
				m[ DIR[cid].down ].b["biome2"] == "m"
			) {
				m[cid].s = "met";//top edge
			} else {
				m[cid].s = "m"; // small m by itself could just be a bit of rocky terrain
			}
			
		}
		
		if (biome2 === "d") {
			//console.log("change m shape");
			if (
				m[ DIR[cid].up ].b["biome2"] == "d" && 
				m[ DIR[cid].left ].b["biome2"] == "d" && 
				m[ DIR[cid].right ].b["biome2"] == "d" &&
				m[ DIR[cid].down ].b["biome2"] == "d"
			) {
				m[cid].s = "d";
			} else if (
				m[ DIR[cid].up ].b["biome2"] == "d" && 
				m[ DIR[cid].left ].b["biome2"] == "d" && 
				m[ DIR[cid].right ].b["biome2"] !== "d" &&
				m[ DIR[cid].down ].b["biome2"] !== "d"
			) {
				if (
					(m[ DIR[cid].down ].b["biome"] == "w" && m[ DIR[cid].right ].b["biome"] !== "w") ||
					(m[ DIR[cid].down ].b["biome"] !== "w" && m[ DIR[cid].right ].b["biome"] == "w") ||
					(m[ DIR[cid].down ].b["biome"] !== "w" && m[ DIR[cid].right ].b["biome"] !== "w") ||
					(m[ DIR[cid].dRight ].b["biome"] !== "w")
				) {
					m[cid].s = "dgJ";
				} else {
					m[cid].s = "dJ";
				}
			} else if (
				m[ DIR[cid].up ].b["biome2"] == "d" && 
				m[ DIR[cid].left ].b["biome2"] !== "d" && 
				m[ DIR[cid].right ].b["biome2"] == "d" &&
				m[ DIR[cid].down ].b["biome2"] !== "d"
			) {
				if (
					(m[ DIR[cid].down ].b["biome"] == "w" && m[ DIR[cid].left ].b["biome"] !== "w") ||
					(m[ DIR[cid].down ].b["biome"] !== "w" && m[ DIR[cid].left ].b["biome"] == "w") ||
					(m[ DIR[cid].down ].b["biome"] !== "w" && m[ DIR[cid].left ].b["biome"] !== "w") ||
					(m[ DIR[cid].dLeft ].b["biome"] !== "w")
				) {
					m[cid].s = "dgL";
				} else {
					m[cid].s = "dL";
				}
				
			} else if (
				m[ DIR[cid].up ].b["biome2"] !== "d" && 
				m[ DIR[cid].left ].b["biome2"] == "d" && 
				m[ DIR[cid].right ].b["biome2"] !== "d" &&
				m[ DIR[cid].down ].b["biome2"] == "d"
			) {
				if (
					(m[ DIR[cid].up ].b["biome"] == "w" && m[ DIR[cid].right ].b["biome"] !== "w") ||
					(m[ DIR[cid].up ].b["biome"] !== "w" && m[ DIR[cid].right ].b["biome"] == "w") ||
					(m[ DIR[cid].up ].b["biome"] !== "w" && m[ DIR[cid].right ].b["biome"] !== "w") ||
					(m[ DIR[cid].uRight ].b["biome"] !== "w")
				) {
					m[cid].s = "dg7";
				} else {
					m[cid].s = "d7";
				}
				
			} else if (
				m[ DIR[cid].up ].b["biome2"] !== "d" && 
				m[ DIR[cid].left ].b["biome2"] !== "d" && 
				m[ DIR[cid].right ].b["biome2"] == "d" &&
				m[ DIR[cid].down ].b["biome2"] == "d"
			) {
				if (
					(m[ DIR[cid].up ].b["biome"] == "w" && m[ DIR[cid].left ].b["biome"] !== "w") ||
					(m[ DIR[cid].up ].b["biome"] !== "w" && m[ DIR[cid].left ].b["biome"] == "w") ||
					(m[ DIR[cid].up ].b["biome"] !== "w" && m[ DIR[cid].left ].b["biome"] !== "w") ||
					(m[ DIR[cid].uLeft ].b["biome"] !== "w")
				) {
					m[cid].s = "dgr";
				} else {
					m[cid].s = "dr";
				}
			} else if (
				m[ DIR[cid].up ].b["biome2"] == "d" && 
				m[ DIR[cid].left ].b["biome2"] !== "d" && 
				m[ DIR[cid].right ].b["biome2"] !== "d" &&
				m[ DIR[cid].down ].b["biome2"] !== "d"
			) {
				m[cid].s = "du";
			} else if (
				m[ DIR[cid].up ].b["biome2"] !== "d" && 
				m[ DIR[cid].left ].b["biome2"] == "d" && 
				m[ DIR[cid].right ].b["biome2"] !== "d" &&
				m[ DIR[cid].down ].b["biome2"] !== "d"
			) {
				m[cid].s = "d3";
			} else if (
				m[ DIR[cid].up ].b["biome2"] !== "d" && 
				m[ DIR[cid].left ].b["biome2"] !== "d" && 
				m[ DIR[cid].right ].b["biome2"] == "d" &&
				m[ DIR[cid].down ].b["biome2"] !== "d"
			) {
				m[cid].s = "dc";
			} else if (
				m[ DIR[cid].up ].b["biome2"] !== "d" && 
				m[ DIR[cid].left ].b["biome2"] !== "d" && 
				m[ DIR[cid].right ].b["biome2"] !== "d" &&
				m[ DIR[cid].down ].b["biome2"] == "d"
			) {
				m[cid].s = "dn";
			} else if (
				m[ DIR[cid].up ].b["biome2"] == "d" && 
				m[ DIR[cid].left ].b["biome2"] == "d" && 
				m[ DIR[cid].right ].b["biome2"] == "d" &&
				m[ DIR[cid].down ].b["biome2"] !== "d"
			) {
				m[cid].s = "d";//"deU";//bottom edge
			} else if (
				m[ DIR[cid].up ].b["biome2"] == "d" && 
				m[ DIR[cid].left ].b["biome2"] == "d" && 
				m[ DIR[cid].right ].b["biome2"] !== "d" &&
				m[ DIR[cid].down ].b["biome2"] == "d"
			) {
				m[cid].s = "d";//"de3";//right edge
			} else if (
				m[ DIR[cid].up ].b["biome2"] == "d" && 
				m[ DIR[cid].left ].b["biome2"] !== "d" && 
				m[ DIR[cid].right ].b["biome2"] == "d" &&
				m[ DIR[cid].down ].b["biome2"] == "d"
			) {
				m[cid].s = "d";//"deE";//left edge
			} else if (
				m[ DIR[cid].up ].b["biome2"] !== "d" && 
				m[ DIR[cid].left ].b["biome2"] == "d" && 
				m[ DIR[cid].right ].b["biome2"] == "d" &&
				m[ DIR[cid].down ].b["biome2"] == "d"
			) {
				m[cid].s = "d";//"deT";//top edge
			} else {
				m[cid].s = "d"; // small m by itself could just be a bit of rocky terrain
			}
			
		}
		
		
		
		// mountain peak view blocks: xr, xT, x7
		// mountain slope blocks: sr, s7, sE, s3 
		/*
		
		biome2 shapes, with surrounding mountain chunks
		. . . . . . . . . . . . . . . .
		. . . . . . xrxTx7. . . . . . . . //sX   
		. xrxTx7. . srpns7xTxTx7. . . . . //msr, ms7
		. srpos7. xrsEpEpTpTp7s7x7. . . . // 
		. sL? ? x7srprP P P P p7s7. . . .
		xrxTsrpo. sLpLP P P P p3s3x7. . .
		srpos7. . xrsEpEP P pUpUp7s7. . .
		sLsUsJ. . scpcP pUpJsUsUpusJ. . .
		. . . . . . sLpusUsJ. . su. . . . // stu
		. . . . . . . su. . . . . . . . . // stu
		. . xrxTx7. . . msmsms. . . . .
		. . srpos7. . mspcphp7ms. . . .
		. . sLsUsJ. . . msmspvms. . . .
		xTxTxTx7. . . . . mspums. . . .
		p7sTpns7. . . . . . ms. . . . .
		P pTp3. . . . . . . . . . . . .
		
		sS = slope south -- could be anything
		
		*/
		if (biome !== "p") {
			let ouL = 1;
			let ou_ = 1;
			let ouR = 1;
			let o_L = 1;
			let o_R = 1;
			let odL = 1;
			let od_ = 1;
			let odR = 1;
			
			if (m[ DIR[cid].uLeft ].b["biome"] == "p") { ouL = 2; }
			if (m[ DIR[cid].up ].b["biome"] == "p") { ou_ = 3; }
			if (m[ DIR[cid].uRight ].b["biome"] == "p") { ouR = 5; }
			if (m[ DIR[cid].left ].b["biome"] == "p") { o_L = 7; }
			if (m[ DIR[cid].right ].b["biome"] == "p") { o_R = 11; }
			if (m[ DIR[cid].dLeft ].b["biome"] == "p") { odL = 13; }
			if (m[ DIR[cid].down ].b["biome"] == "p") { od_ = 17; }
			if (m[ DIR[cid].dRight ].b["biome"] == "p") { odR = 19; }
			
			let ooo = ouL * ou_ * ouR * o_L * o_R * odL * od_ * odR;
			
			if (ooo > 1) {
				
			  let mcids = "sS";
			
				switch (ooo) {
			  
					case 0:
					  mcids = ""; break;
					case 1:
					  break;
					case 2:
						mcids = "sJ"; break;
					case 3:
						mcids = "sU"; break;
					case 5:
						mcids = "sL"; break;
					case 7:
						mcids = "s7"; break;
					case 11:
						mcids = "sr"; break;
					case 13:
					  mcids = "x7"; break;
					case 17:
					  mcids = "xT"; break;
					case 19:
					  mcids = "xr"; break;
					case 14:
					  mcids = "s3"; break;
					case 55:
					  mcids = "sE"; break;
					case 91:
						mcids = "s7"; break;
					case 209:
						mcids = "sr"; break;
					case 221:
					  mcids = "xT"; break;
					case 182:
					  mcids = "s3"; break;
					case 1547:
					  mcids = "s7"; break;
					case 4199:
					  mcids = "xT"; break;
					case 323:
					  mcids = "xT"; break;
					case 187:
					  mcids = "xT"; break;
					case 3553:
					  mcids = "xT"; break;
					case 17765:
					  mcids = "sE"; break;
					case 3094:
					  mcids = "s3"; break;
					case 46189:
					  mcids = "xT"; break;
					case 1045:
						mcids = "sE"; break;
					
					default:
						break;
				}
				
				
				m[cid].s = mcids;
			
			}
			/*
			               2  3  5
			               7     11
			               13 17 19
			*/
			
		}
	} // end for
	
	
}

