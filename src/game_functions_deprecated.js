import { dot_order } from "./objects.js";
import { HBTILES } from "./herringbone.js";
import { MOUNTAINS } from "./mountain_chunks.js";

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



// 40s are forest

function forest(seed, bvi) {
	
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	var chunk_canopy = [...Array(16)].map(_ => Array(16).fill(0));
	
	for (let yy=0; yy<16; yy++) {
		for (let xx=0; xx<16; xx++) {
		  let rr = Math.floor(seed[iR]*(2));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			chunk[yy][xx] = 100+rr;
		}
	}
	
	let N = 15;
	
	//let xi = 8;
	//let yi = 0;
	//let randr = 1;
	let randx = 0;
	let randy = 0;
	let tree_type = 40;
	let tt_range_0 = 40;
	let tt_range_1 = 42;
	
	//let tree_type = 41;
	
	if (bvi[0]) {
		N = 20;
		
		//console.log(bvi);
		if (bvi[1]) {
			//console.log("3");
			//tree_type = 42;
			tt_range_0 = 41;
			tt_range_1 = 42;
		}
	}
	if (bvi[2]) {
		N = 4;
		tt_range_0 = 42;
		tt_range_1 = 45;
	}
	//let tree_type = bvi[1] ? 41+64 : 41;
	
	for (let i=0; i<N; i++) {
		randx = 0 + Math.floor(seed[iR]*(15-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		randy = 0 + Math.floor(seed[iR]*(15-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		
		tree_type = tt_range_0 + Math.floor(seed[iR]*(tt_range_1-tt_range_0));
		iR = iR >= seed.length-1 ? 0 : iR+1;
		
		
		
		chunk[randy][randx] = tree_type;
		/*
		try { 
			if (![41, 42].includes(chunk[randy-1][randx-1])) {
				chunk[randy-1][randx-1] = 0; 
			}
		} catch {}
		try { 
			if (![41, 42].includes(chunk[randy-1][randx])) {
				chunk[randy-1][randx] = 0; 
			}
		} catch {}
		try { 
			if (![41, 42].includes(chunk[randy-1][randx+1])) {
				chunk[randy-1][randx+1] = 0; 
			}
		} catch {}
		try { 
			if (![41, 42].includes(chunk[randy][randx-1])) {
				chunk[randy][randx-1] = 0;
			}
		} catch {}
		try { 
			if (![41, 42].includes(chunk[randy][randx+1])) {
			  chunk[randy][randx+1] = 0; 
			}
		} catch {}
		try { 
			if (![41, 42].includes(chunk[randy+1][randx-1])) {
				chunk[randy+1][randx-1] = 0; 
			}
		} catch {}
		try { 
			if (![41, 42].includes(chunk[randy+1][randx])) {
				chunk[randy+1][randx] = 0; 
			}
		} catch {}
		try { 
			if (![41, 42].includes(chunk[randy+1][randx+1])) {
				chunk[randy+1][randx+1] = 0; 
			}
		} catch {}
		
		/**/
		/*
		try { chunk_canopy[randy-1][randx-1] = 2; } catch {}
		try { chunk_canopy[randy-1][randx] = 2; } catch {}
		try { chunk_canopy[randy-1][randx+1] = 2; } catch {}
		try { chunk_canopy[randy][randx-1] = 2; } catch {}
		try { chunk_canopy[randy][randx] = 2; } catch {}
		try { chunk_canopy[randy][randx+1] = 2; } catch {}
		try { chunk_canopy[randy+1][randx-1] = 2; } catch {}
		try { chunk_canopy[randy+1][randx] = 2; } catch {}
		try { chunk_canopy[randy+1][randx+1] = 2; } catch {}
		/**/
		//let random_height = 3 + Math.floor(seed[iR]*(6));
		//iR = iR >= seed.length-1 ? 0 : iR+1;
		
		
		//for (let h=1; h<random_height && randy-h; h++) {
		//	try { chunk[randy-h][randx] = 40; } catch {}	
		//}
	}
	
	
	
	return chunk; //[chunk, chunk_canopy];
}



/*

   ================= MOUNTAINS ===================


		

	
	0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0
	0 1 0 0 0 1 1 0 0 0 0 0 1 1 0 0
	0 0 0 1 1 1 1 0 0 0 0 0 1 1 0 0
	0 1 0 1 1 0 0 0 0 0 0 1 1 1 1 0
	0 0 0 0 0 0 1 0 0 0 0 1 1 1 1 0
	1 0 0 0 0 1 1 0 0 0 1 0 1 0 0 0
	0 0 0 1 1 1 1 0 0 0 1 1 0 0 0 0
	0 0 0 1 1 1 0 0 1 1 0 1 0 0 0 0
	0 0 0 1 0 0 0 0 1 1 0 1 0 0 0 0
	0 1 0 0 0 0 0 0 0 0 1 1 0 1 0 0
	0 1 0 0 0 0 1 1 0 0 1 1 1 1 1 0
	0 0 0 0 1 1 1 1 0 0 1 1 1 1 0 0
	0 0 1 0 1 1 0 0 0 0 0 0 0 0 0 0
	0 0 0 0 0 0 1 1 0 1 1 0 0 1 1 0
	0 0 0 0 0 0 1 1 0 0 0 0 0 1 1 0
	0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
	



/**/


export function rocky(seed, bvi){ //, input_dot_map=null) {
	let iR = 0;
	var chunk_layer_1 = [...Array(16)].map(_ => Array(16).fill(0));
	
	
	let rock_type = 61;
	//let rock2 = 62;
	
	let N = 20;
	for (let i=0; i<N; i++) {
		let rx = Math.floor(seed[iR]*(16));
		iR = iR >= seed.length-1 ? 0 : iR+1;
		let ry = Math.floor(seed[iR]*(16));
		iR = iR >= seed.length-1 ? 0 : iR+1;
		
		chunk_layer_1[ry][rx] = rock_type;
	}
	
	
	
	if (bvi[0]) {
		N = 30;
		for (let i=0; i<N; i++) {
			let rx = Math.floor(seed[iR]*(15));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			let ry = Math.floor(seed[iR]*(15));
			iR = iR >= seed.length-1 ? 0 : iR+1;
		
			chunk_layer_1[ry][rx] = rock_type;
			try { chunk_layer_1[ry][rx+1] = rock_type; } catch {}
			try { chunk_layer_1[ry+1][rx] = rock_type; } catch {}
			try { chunk_layer_1[ry+1][rx+1] = rock_type; } catch {}
		
		}
		
	}
	
	
	if (bvi[1]) {
		N = 10;
		if (bvi[3]) {
			N = 40;
		}
		
		for (let i=0; i<N; i++) {
			let rx = Math.floor(seed[iR]*(14));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			let ry = Math.floor(seed[iR]*(14));
			iR = iR >= seed.length-1 ? 0 : iR+1;
	
			chunk_layer_1[ry][rx] = rock_type;
			try { chunk_layer_1[ry][rx+1] = rock_type } catch {}
			try { chunk_layer_1[ry][rx+2] = rock_type } catch {}
			try { chunk_layer_1[ry+1][rx] = rock_type } catch {}
			try { chunk_layer_1[ry+1][rx+1] = rock_type } catch {}
			try { chunk_layer_1[ry+1][rx+2] = rock_type } catch {}
			try { chunk_layer_1[ry+2][rx] = rock_type } catch {}
			try { chunk_layer_1[ry+2][rx+1] = rock_type } catch {}
			try { chunk_layer_1[ry+2][rx+2] = rock_type } catch {}
	
	
		}
	}
	
	
	var chunk_layer_2 = [];//[...Array(16)].map(_ => Array(16).fill(0));
	chunk_layer_1.forEach((subArray) => chunk_layer_2.push([...subArray]));
	
	for (let y=1; y<15; y++) {
		for (let x=1; x<15; x++) {
			if (
				chunk_layer_1[y-1][x-1] === rock_type &&
				chunk_layer_1[y-1][x] === rock_type &&
				chunk_layer_1[y-1][x+1] === rock_type &&
				chunk_layer_1[y][x-1] === rock_type &&
				chunk_layer_1[y][x] === rock_type &&
				chunk_layer_1[y][x+1] === rock_type &&
				chunk_layer_1[y+1][x-1] === rock_type &&
				chunk_layer_1[y+1][x] === rock_type &&
				chunk_layer_1[y+1][x+1] === rock_type
			) {
				chunk_layer_2[y][x] = rock_type+1;
			}
		}
	}
	
	
	var chunk_layer_3 = [];//[...Array(16)].map(_ => Array(16).fill(0));
	chunk_layer_2.forEach((subArray) => chunk_layer_3.push([...subArray]));
	
	if (bvi[0] && bvi[2]) {
		N = 10;
		if (bvi[1]) {
			N = 30;
		}
		
		for (let y=2; y<14; y++) {
			for (let x=2; x<14; x++) {
				if (
					chunk_layer_2[y-1][x-1] === rock_type+1 &&
					chunk_layer_2[y-1][x] === rock_type+1 &&
					chunk_layer_2[y-1][x+1] === rock_type+1 &&
					chunk_layer_2[y][x-1] === rock_type+1 &&
					chunk_layer_2[y][x] === rock_type+1 &&
					chunk_layer_2[y][x+1] === rock_type+1 &&
					chunk_layer_2[y+1][x-1] === rock_type+1 &&
					chunk_layer_2[y+1][x] === rock_type+1 &&
					chunk_layer_2[y+1][x+1] === rock_type+1
				) {
					chunk_layer_3[y][x] = rock_type+2;
				}
			}
		}
		return chunk_layer_3;
	} else {
		return chunk_layer_2;
	}
	
}




function bent_array(lngth) {
    if (lngth <= 0) {
        return [];
    }
    let pattern = [];
    let middle = Math.floor((lngth-1) / 2);
    for (let i = 0; i < lngth; i++) {
        if (i <= middle) {
            pattern.push(i);
        } else {
            pattern.push(pattern[lngth - 1 - i]);
        }
    }
    return pattern;
}

function bend_array(seed, lngth, remove, offset=0) {
	let iR = offset;
  let arr = bent_array(lngth);
  //let remove = taut; //taut >= lngth ? lngth-taut;
  for (let rm=0; rm<remove; rm++) {
    // scan list and find indices that can be decremented
    let dec = [];
    for (let i=1; i<lngth-1; i++) {
      if (
        arr[i-1] <= arr[i] && 
        arr[i] >= arr[i+1] /*&&
        arr[i] >= 1/**/
      ) {
        dec.push(i);
      }
    }
    // pick one from random
	  let ri = Math.floor(seed[iR]*(dec.length));
		iR = iR >= seed.length-1 ? 0 : iR+1;
		
    arr[dec[ri]]--;
  }
  return arr;
}

function squiggle(seed, len) {
	let iR = 0;
	
  const arr = [];
  for (let i = 0; i < len; i++) {
	  let r = Math.floor(seed[iR]*3)-1;
		iR = iR >= seed.length-1 ? 0 : iR+1;
    arr.push(r);
  }
  return arr;
}


/*

110 dirt
112 long grass
20 small connected bushes



/**/
// why dont we just use hb tiles for all biomes?

export function g_hb(seed, b2, bvi, hbtype="") {
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	var chunk_canopy = [...Array(16)].map(_ => Array(16).fill(0));
	
	let num_tiles = 0;
	let tile_index = 0;
	
	if (["left", "right"].includes(hbtype)) {
		try {
			num_tiles = HBTILES[b2]["horizontal"].length;
			tile_index = Math.floor(seed[iR]*(num_tiles));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			chunk = HBTILES[b2]["horizontal"][tile_index][hbtype];
		} catch {
			//console.log(" "+b2+" "+hbtype);
			//console.log(HBTILES[b2]);
			
		}
		
	} else if (["top", "bottom"].includes(hbtype)) {
		try {
			num_tiles = HBTILES[b2]["vertical"].length;
			tile_index = Math.floor(seed[iR]*(num_tiles));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			chunk = HBTILES[b2]["vertical"][tile_index][hbtype];
		} catch {
			//console.log(" "+b2+" "+hbtype);
			//console.log(HBTILES[b2]);
		}
	} 
	
	/*
	else if (b2 == "f") {
		chunk = forest(seed, bvi);
	} else if (b2 == "m") {
		chunk = rocky_edge(seed, bvi);
	} else {/**/
		
		
  
	
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



// this is where the "edge" biomes are determined, e.g. forest edge and mountain edge
// ****** DEPRECATED -- using new g() function above *****
export function g_(seed, b2, bvi) {//, ch2="") {
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	var chunk_canopy = [...Array(16)].map(_ => Array(16).fill(0));
	//console.log(ch2);
	//console.log(ch2 == "f");
	if (b2 == "f") {
		chunk = forest(seed, bvi);
	} else if (b2 == "m") {
		chunk = rocky_edge(seed, bvi);
	} else { //if (bvi[0] && bvi[1]) {
		
	//	chunk = common(); // seed number determines
	//} else {
		// 
		
		
		/*for (let yy=0; yy<16; yy++) {
			for (let xx=0; xx<16; xx++) {
			  let rr = Math.floor(seed[iR]*(4));
				iR = iR >= seed.length-1 ? 0 : iR+1;
				//chunk[yy][xx] = 20;
			}
		}/**/
		
		/*
		for (let bushes=0; bushes<20; bushes++) {
		  let rx = Math.floor(seed[iR]*(15));
			iR = iR >= seed.length-1 ? 0 : iR+1;
		  let ry = Math.floor(seed[iR]*(15));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			chunk[ry][rx] = 20;
			try { chunk[ry][rx+1] = 20; } catch {}
			try { chunk[ry+1][rx] = 20; } catch {}
			try { chunk[ry+1][rx+1] = 20; } catch {}
		}
		for (let bushes=0; bushes<20; bushes++) {
		  let rx = Math.floor(seed[iR]*(16));
			iR = iR >= seed.length-1 ? 0 : iR+1;
		  let ry = Math.floor(seed[iR]*(16));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			chunk[ry][rx] = 20;
			
		}/**/
		
		/*
		for (let bushes=0; bushes<20; bushes++) {
		  let rx = Math.floor(seed[iR]*(15));
			iR = iR >= seed.length-1 ? 0 : iR+1;
		  let ry = Math.floor(seed[iR]*(15));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			chunk[ry][rx] = 112;
			try { chunk[ry][rx+1] = 112; } catch {}
			try { chunk[ry+1][rx] = 112; } catch {}
			try { chunk[ry+1][rx+1] = 112; } catch {}
		}
		for (let bushes=0; bushes<20; bushes++) {
		  let rx = Math.floor(seed[iR]*(16));
			iR = iR >= seed.length-1 ? 0 : iR+1;
		  let ry = Math.floor(seed[iR]*(16));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			chunk[ry][rx] = 112;
			
		}/**/
		
		let N = 30;
		
		//let trail_type = bvi[8];
		let htile_type = bvi[8];
		
		/*
		if ([1,2,3,4,5,6,7,8].includes(trail_type)) {
			for (let bushes=0; bushes<20; bushes++) {
			  let rx = Math.floor(seed[iR]*(6));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  let ry = Math.floor(seed[iR]*(6));
				iR = iR >= seed.length-1 ? 0 : iR+1;
				chunk[ry][rx] = 20;
			}
			for (let bushes=0; bushes<20; bushes++) {
			  let rx = 9+Math.floor(seed[iR]*(6));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  let ry = Math.floor(seed[iR]*(6));
				iR = iR >= seed.length-1 ? 0 : iR+1;
				chunk[ry][rx] = 20;
			}
			for (let bushes=0; bushes<20; bushes++) {
			  let rx = Math.floor(seed[iR]*(6));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  let ry = 9+Math.floor(seed[iR]*(6));
				iR = iR >= seed.length-1 ? 0 : iR+1;
				chunk[ry][rx] = 20;
			}
			for (let bushes=0; bushes<20; bushes++) {
			  let rx = 9+Math.floor(seed[iR]*(6));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  let ry = 9+Math.floor(seed[iR]*(6));
				iR = iR >= seed.length-1 ? 0 : iR+1;
				chunk[ry][rx] = 20;
			}
		}/**/
		
		/*
			
			trail shapes   bvi[8]
			  1 "┻━":
				2 "┣━":
				3 "┳━":
				4 "┫ ":
				5 "┗━":
				6 "┏━":
				7 "┓ ":
				8 "┛ ":
				0 ". ":
		
		  trail types
		    110 dirt, no grass
		    112 long grass,
		    20  bushes
			
	  0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
	  0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
		0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0
		0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0
		0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0
		0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0
		0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0
		0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0
		0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0
		0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
		0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
		0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
		0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
		0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
		0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
		0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
		
		
		*/
		let rm = 0;
		let currx = 0;
		let curry = 0;
		let trail_across = [0,0,0,0,0,0,0,0];
		switch (trail_type) {
		  case 1: //"┻━"
				//seed, lngth, remove, offset
				
				// from left
				rm = 3 + Math.floor(seed[iR]*(7));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 0);
				for (let x=0; x<trail_across.length; x++) {
					let ty = trail_across[x];
					chunk[7+ty][x] = 110;
					try { chunk[7+ty][x+1] = 110; } catch {}
					try { chunk[7+ty+1][x] = 110; } catch {}
					try { chunk[7+ty+1][x+1] = 110; } catch {}
				}
				
				// from center to right
				rm = 3 + Math.floor(seed[iR]*(7));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 8);
				for (let x=0; x<trail_across.length; x++) {
					let ty = trail_across[x];
					chunk[7+ty][x+7] = 110;
					try { chunk[7+ty][x+7+1] = 110; } catch {}
					try { chunk[7+ty+1][x+7] = 110; } catch {}
					try { chunk[7+ty+1][x+7+1] = 110; } catch {}
				}
				
				// from top
				//rm = 3 + Math.floor(seed[iR]*(15));
				//iR = iR >= seed.length-1 ? 0 : iR+1;
			  //trail_across = bend_array(seed, 8, rm, 8);
				// NEED TO CHANGE
				//let td = squiggle(seed, 8);
				currx = 7;
				for (let y=0; y<8; y++) {
					chunk[y][currx] = 110;
					try { chunk[y][currx+1] = 110; } catch {}
					try { chunk[y+1][currx] = 110; } catch {}
					try { chunk[y+1][currx+1] = 110; } catch {}
					rm = Math.floor(seed[iR]*(3))-1;
					iR = iR >= seed.length-1 ? 0 : iR+1;
					currx += rm;
				}
				
				break;
			case 2: //"┣━"
				
				
				//from right to center
				/**/
				curry = 7;
				for (let x=14; x>=7; x--) {
					chunk[curry][x] = 110;
					try { chunk[curry][x+1] = 110; } catch {}
					try { chunk[curry+1][x] = 110; } catch {}
					try { chunk[curry+1][x+1] = 110; } catch {}
					rm = Math.floor(seed[iR]*(3))-1;
					iR = iR >= seed.length-1 ? 0 : iR+1;
					curry += rm;
				}
				/*
				rm = 3 + Math.floor(seed[iR]*(7));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 8);
				for (let x=0; x<trail_across.length; x++) {
					let ty = trail_across[x];
					chunk[7+ty][x+7] = 110;
					try { chunk[7+ty][x+7+1] = 110; } catch {}
					try { chunk[7+ty+1][x+7] = 110; } catch {}
					try { chunk[7+ty+1][x+7+1] = 110; } catch {}
				}*/
				
				// from top
				rm = 3 + Math.floor(seed[iR]*(15));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 8);
				for (let y=0; y<trail_across.length; y++) {
					let tx = trail_across[y];
					chunk[y][7+tx] = 110;
					try { chunk[y][7+tx+1] = 110; } catch {}
					try { chunk[y+1][7+tx] = 110; } catch {}
					try { chunk[y+1][7+tx+1] = 110; } catch {}
				}
				
				// from center to bottom
				rm = 3 + Math.floor(seed[iR]*(15));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 8);
				for (let y=0; y<trail_across.length; y++) {
					let tx = trail_across[y];
					chunk[7+y][7+tx] = 110;
					try { chunk[7+y][7+tx+1] = 110; } catch {}
					try { chunk[7+y+1][7+tx] = 110; } catch {}
					try { chunk[7+y+1][7+tx+1] = 110; } catch {}
				}
				
			  break;
				
			case 3: // "┳━"
				//from left
				rm = 3 + Math.floor(seed[iR]*(7));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 0);
				for (let x=0; x<trail_across.length; x++) {
					let ty = trail_across[x];
					chunk[7+ty][x] = 110;
					try { chunk[7+ty][x+1] = 110; } catch {}
					try { chunk[7+ty+1][x] = 110; } catch {}
					try { chunk[7+ty+1][x+1] = 110; } catch {}
				}
				//from center to right
				rm = 3 + Math.floor(seed[iR]*(7));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 8);
				for (let x=0; x<trail_across.length; x++) {
					let ty = trail_across[x];
					chunk[7+ty][x+7] = 110;
					try { chunk[7+ty][x+7+1] = 110; } catch {}
					try { chunk[7+ty+1][x+7] = 110; } catch {}
					try { chunk[7+ty+1][x+7+1] = 110; } catch {}
				}
				
				// from bottom to center
				currx = 7;
				for (let y=14; y>=7; y--) {
					chunk[y][currx] = 110;
					try { chunk[y][currx+1] = 110; } catch {}
					try { chunk[y+1][currx] = 110; } catch {}
					try { chunk[y+1][currx+1] = 110; } catch {}
					rm = Math.floor(seed[iR]*(3))-1;
					iR = iR >= seed.length-1 ? 0 : iR+1;
					currx += rm;
				}
				/*
				rm = 3 + Math.floor(seed[iR]*(15));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 8);
				for (let y=0; y<trail_across.length; y++) {
					let tx = trail_across[y];
					chunk[7+y][7+tx] = 110;
					try { chunk[7+y][7+tx+1] = 110; } catch {}
					try { chunk[7+y+1][7+tx] = 110; } catch {}
					try { chunk[7+y+1][7+tx+1] = 110; } catch {}
				}
				/**/
				
				
				break;
			case 4: //"┫ "
				
				//from top
				rm = 3 + Math.floor(seed[iR]*(15));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 8);
				for (let y=0; y<trail_across.length; y++) {
					let tx = trail_across[y];
					chunk[y][7+tx] = 110;
					try { chunk[y][7+tx+1] = 110; } catch {}
					try { chunk[y+1][7+tx] = 110; } catch {}
					try { chunk[y+1][7+tx+1] = 110; } catch {}
				}
				//from center to bottom
				rm = 3 + Math.floor(seed[iR]*(15));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 8);
				for (let y=0; y<trail_across.length; y++) {
					let tx = trail_across[y];
					chunk[7+y][7+tx] = 110;
					try { chunk[7+y][7+tx+1] = 110; } catch {}
					try { chunk[7+y+1][7+tx] = 110; } catch {}
					try { chunk[7+y+1][7+tx+1] = 110; } catch {}
				}
				
				// from left
				curry = 7;
				for (let x=0; x<8; x++) {
					chunk[curry][x] = 110;
					try { chunk[curry][x+1] = 110; } catch {}
					try { chunk[curry+1][x] = 110; } catch {}
					try { chunk[curry+1][x+1] = 110; } catch {}
					rm = Math.floor(seed[iR]*(3))-1;
					iR = iR >= seed.length-1 ? 0 : iR+1;
					curry += rm;
				}
				/*
				rm = 3 + Math.floor(seed[iR]*(7));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 0);
				for (let x=0; x<trail_across.length; x++) {
					let ty = trail_across[x];
					chunk[7+ty][x] = 110;
					try { chunk[7+ty][x+1] = 110; } catch {}
					try { chunk[7+ty+1][x] = 110; } catch {}
					try { chunk[7+ty+1][x+1] = 110; } catch {}
				}/**/
				
				
				
				
				break;
			
			case 5: //"┗━"
				// from top
				rm = 3 + Math.floor(seed[iR]*(15));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 8);
				for (let y=0; y<trail_across.length; y++) {
					let tx = trail_across[y];
					chunk[y][7+tx] = 110;
					try { chunk[y][7+tx+1] = 110; } catch {}
					try { chunk[y+1][7+tx] = 110; } catch {}
					try { chunk[y+1][7+tx+1] = 110; } catch {}
				}
				//from center to right
				rm = 3 + Math.floor(seed[iR]*(7));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 8);
				for (let x=0; x<trail_across.length; x++) {
					let ty = trail_across[x];
					chunk[7+ty][x+7] = 110;
					try { chunk[7+ty][x+7+1] = 110; } catch {}
					try { chunk[7+ty+1][x+7] = 110; } catch {}
					try { chunk[7+ty+1][x+7+1] = 110; } catch {}
				}
				
				break;	
			case 6: //"┏━";
				//from center to right
				rm = 3 + Math.floor(seed[iR]*(7));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 8);
				for (let x=0; x<trail_across.length; x++) {
					let ty = trail_across[x];
					chunk[7+ty][x+7] = 110;
					try { chunk[7+ty][x+7+1] = 110; } catch {}
					try { chunk[7+ty+1][x+7] = 110; } catch {}
					try { chunk[7+ty+1][x+7+1] = 110; } catch {}
				}
				
				//from center to bottom
				rm = 3 + Math.floor(seed[iR]*(15));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 8);
				for (let y=0; y<trail_across.length; y++) {
					let tx = trail_across[y];
					chunk[7+y][7+tx] = 110;
					try { chunk[7+y][7+tx+1] = 110; } catch {}
					try { chunk[7+y+1][7+tx] = 110; } catch {}
					try { chunk[7+y+1][7+tx+1] = 110; } catch {}
				}
				break;
			case 7: //"┓ ";
				
				//from center to bottom
				rm = 3 + Math.floor(seed[iR]*(15));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 8);
				for (let y=0; y<trail_across.length; y++) {
					let tx = trail_across[y];
					chunk[7+y][7+tx] = 110;
					try { chunk[7+y][7+tx+1] = 110; } catch {}
					try { chunk[7+y+1][7+tx] = 110; } catch {}
					try { chunk[7+y+1][7+tx+1] = 110; } catch {}
				}
				// from left
				rm = 3 + Math.floor(seed[iR]*(7));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 0);
				for (let x=0; x<trail_across.length; x++) {
					let ty = trail_across[x];
					chunk[7+ty][x] = 110;
					try { chunk[7+ty][x+1] = 110; } catch {}
					try { chunk[7+ty+1][x] = 110; } catch {}
					try { chunk[7+ty+1][x+1] = 110; } catch {}
				}
				
				break;
			case 8: //"┛ ";
				// from left
				rm = 3 + Math.floor(seed[iR]*(7));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 0);
				for (let x=0; x<trail_across.length; x++) {
					let ty = trail_across[x];
					chunk[7+ty][x] = 110;
					try { chunk[7+ty][x+1] = 110; } catch {}
					try { chunk[7+ty+1][x] = 110; } catch {}
					try { chunk[7+ty+1][x+1] = 110; } catch {}
				}
				// from top
				rm = 3 + Math.floor(seed[iR]*(15));
				iR = iR >= seed.length-1 ? 0 : iR+1;
			  trail_across = bend_array(seed, 8, rm, 8);
				for (let y=0; y<trail_across.length; y++) {
					let tx = trail_across[y];
					chunk[y][7+tx] = 110;
					try { chunk[y][7+tx+1] = 110; } catch {}
					try { chunk[y+1][7+tx] = 110; } catch {}
					try { chunk[y+1][7+tx+1] = 110; } catch {}
				}
				break;
		}
		// TODO:
		/*
    result = 1;
    result = 2;
	  result = 3;
	  result = 4;
	  result = 5;
    result = 6;
    result = 7;
    result = 8;
		/**/ 
		
	
	}
	
	//console.log(chunk);
	return chunk;//[chunk, chunk_canopy];
	
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





export function g7(seed) {
	
	//const seed = PRNG(xx+"_"+yy, 64);
	let iR = 0;
	
	//let chunk_data = [];
	
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	
	let xi = 8;
	let yi = 0;
	let r = 0;
	while (xi < 16 && yi < 16) {
		for (let xi_=xi; xi_<16; xi_++){
			chunk[yi][xi_] = 1;
		}
		xi++;
		r = 0+Math.floor(seed[iR]*(2-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		if (!r) { yi++; }
	}
	
	xi = 15;
	yi = 7;
	r = 0;
	while (xi >= 0 && yi >= 0) {
		for (let yi_=yi; yi_>=0; yi_--){
			chunk[yi_][xi] = 1;
		}
		yi--;
		r = 0+Math.floor(seed[iR]*(2-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		if (!r) { xi--; }
	}
	
	chunk[0][15] = 11;
	/*
	for (let y=0; y<16; y++) {
		for (let x=0; x<16; x++) {
			if (chunk[y][x]) {
				pixelData.push([x*8,y*8, "rgb(0,200,250)"]);
			}
		}
	}/**/
	//chunk[14][14] = 2;
	return chunk;//pixelData;
}

export function gr(seed) {
	
	//const seed = PRNG(xx+"_"+yy, 64);
	let iR = 0;
	
	//let chunk_data = [];
	
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	
	let xi = 7;
	let yi = 0;
	let r = 0;
	while (xi >= 0 && yi < 8) {
		for (let xi_=xi; xi_>=0; xi_--) {
			chunk[yi][xi_] = 1;
		}
		xi--;
		r = 0+Math.floor(seed[iR]*(2-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi+=r;
	}
	
	xi = 0;
	yi = 7;
	r = 0;
	while (xi >= 0 && yi >= 0) {
		for (let yi_=yi; yi_>=0; yi_--){
			chunk[yi_][xi] = 1;
		}
		yi--;
		r = 0+Math.floor(seed[iR]*(2-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi+=r;
	}
	
	chunk[0][0] = 11;
	/*
	for (let y=0; y<16; y++) {
		for (let x=0; x<16; x++) {
			if (chunk[y][x]) {
				pixelData.push([x*8,y*8, "rgb(0,200,250)"]);
			}
		}
	}/**/
	
	return chunk;//pixelData;
}

export function gL(seed) {
	
	//const seed = PRNG(xx+"_"+yy, 64);
	let iR = 0;
	
	//let chunk_data = [];
	
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	
	let xi = 7;
	let yi = 15;
	let r = 0;
	while (xi >= 0 && yi >= 0) {
		for (let xi_=xi; xi_>=0; xi_--) {
			chunk[yi][xi_] = 1;
		}
		xi--;
		r = 0+Math.floor(seed[iR]*(2-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi-=r;
	}
	
	xi = 0;
	yi = 8;
	r = 0;
	while (xi >= 0 && yi < 16) {
		for (let yi_=yi; yi_<16; yi_++){
			chunk[yi_][xi] = 1;
		}
		yi++;
		r = 0+Math.floor(seed[iR]*(2-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi+=r;
	}
	
	chunk[15][0] = 11;
	/*
	for (let y=0; y<16; y++) {
		for (let x=0; x<16; x++) {
			if (chunk[y][x]) {
				pixelData.push([x*8,y*8, "rgb(0,200,250)"]);
			}
		}
	}/**/
	
	return chunk;//pixelData;
}

export function gJ(seed) {
	
	//const seed = PRNG(xx+"_"+yy, 64);
	let iR = 0;
	
	//let chunk_data = [];
	
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	
	let xi = 8;
	let yi = 15;
	let r = 0;
	while (xi < 16 && yi >= 0) {
		for (let xi_=xi; xi_<16; xi_++) {
			chunk[yi][xi_] = 1;
		}
		xi++;
		r = 0+Math.floor(seed[iR]*(2-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi-=r;
	}
	
	xi = 15;
	yi = 8;
	r = 0;
	while (xi >= 0 && yi < 16) {
		for (let yi_=yi; yi_<16; yi_++){
			chunk[yi_][xi] = 1;
		}
		yi++;
		r = 0+Math.floor(seed[iR]*(2-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi-=r;
	}
	
	/*
	for (let y=0; y<16; y++) {
		for (let x=0; x<16; x++) {
			if (chunk[y][x]) {
				pixelData.push([x*8,y*8, "rgb(0,200,250)"]);
			}
		}
	}/**/
	
	return chunk;//pixelData;
}


export function wL(seed) {
	let iR = 0;
	
	var chunk = [...Array(16)].map(_ => Array(16).fill(1));
	
	let xi = 0;
	let yi = 8;
	let r = 0;
	
	while (xi < 8 && yi < 16) {
		for (let yi_=yi; yi_<16; yi_++){
			chunk[yi_][xi] = 0;
		}
		xi++;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi+=r;
	}
	
	xi = 7;
	yi = 15;
	r = 0;
	while (xi >= 0 && yi >= 8) {
		for (let xi_=xi; xi_>=0; xi_--) {
			chunk[yi][xi_] = 0;
		}
		yi--;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi-=r;
	}
	
	return chunk;
}

export function wJ(seed) {
	let iR = 0;
	
	var chunk = [...Array(16)].map(_ => Array(16).fill(1));
	
	let xi = 15;
	let yi = 8;
	let r = 0;
	
	while (xi > 8 && yi < 16) {
		for (let yi_=yi; yi_<16; yi_++){
			chunk[yi_][xi] = 0;
		}
		xi--;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi+=r;
	}
	
	xi = 8;
	yi = 15;
	r = 0;
	while (xi < 16 && yi >= 8) {
		for (let xi_=xi; xi_<16; xi_++) {
			chunk[yi][xi_] = 0;
		}
		yi--;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi+=r;
	}
	
	return chunk;
}

export function w7(seed) {
	let iR = 0;
	
	var chunk = [...Array(16)].map(_ => Array(16).fill(1));
	
	let xi = 8;
	let yi = 0;
	let r = 0;
	
	while (xi < 16 && yi < 8) {
		for (let xi_=xi; xi_<16; xi_++){
			chunk[yi][xi_] = 0;
		}
		yi++;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi+=r;
	}
	
	xi = 15;
	yi = 7;
	r = 0;
	while (xi >=8 && yi > 0) {
		for (let yi_=yi; yi_>=0; yi_--) {
			chunk[yi_][xi] = 0;
		}
		xi--;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi-=r;
	}
	
	return chunk;
}

export function wr(seed) {
	let iR = 0;
	
	var chunk = [...Array(16)].map(_ => Array(16).fill(1));
	
	let xi = 7;
	let yi = 0;
	let r = 0;
	
	while (xi >= 0 && yi < 8) {
		for (let xi_=xi; xi_>=0; xi_--){
			chunk[yi][xi_] = 0;
		}
		yi++;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi-=r;
	}
	
	xi = 0;
	yi = 7;
	r = 0;
	while (xi < 8 && yi > 0) {
		for (let yi_=yi; yi_>=0; yi_--) {
			chunk[yi_][xi] = 0;
		}
		xi++;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi-=r;
	}
	
	return chunk;
}

export function wu(seed) {
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(1));
	
	/*
	let xi = 0;
	let yi = 0;
	let r = 0;
	while (xi < 8 && yi < 16) {
		chunk[yi][xi] = 1;
		for (let yi_=yi; yi_>=0; yi_--){
			chunk[yi_][xi] = 1;
		}
		r = 0+Math.floor(seed[iR]*(2-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi+=r;
		r = 0+Math.floor(seed[iR]*(2-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi+=r;
	}
	if (yi > 15) {
		yi = 15;
	}
	while (xi < 8) {
		for (let yi_=yi; yi_>=0; yi_--){
			chunk[yi_][xi] = 1;
		}
		xi++;
	}
	
	xi = 15;
	yi = 0;
	r = 0;
	while (xi > 7 && yi < 16) {
		chunk[yi][xi] = 1;
		for (let yi_=yi; yi_>=0; yi_--){
			chunk[yi_][xi] = 1;
		} 
		r = 0+Math.floor(seed[iR]*(2-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi+=r;
		r = 0+Math.floor(seed[iR]*(2-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi-=r;
	}
	if (yi > 15) {
		yi = 15;
	}
	while (xi > 7) {
		for (let yi_=yi; yi_>=0; yi_--){
			chunk[yi_][xi] = 1;
		}
		xi--;
	}/**/
	
	let xi = 15;
	let yi = 8;
	let r = 0;
	
	while (xi > 8 && yi < 16) {
		for (let yi_=yi; yi_<16; yi_++){
			chunk[yi_][xi] = 0;
		}
		xi--;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi+=r;
	}
	
	xi = 8;
	yi = 15;
	r = 0;
	while (xi < 16 && yi >= 8) {
		for (let xi_=xi; xi_<16; xi_++) {
			chunk[yi][xi_] = 0;
		}
		yi--;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi+=r;
	}
	
	xi = 0;
	yi = 8;
	r = 0;
	
	while (xi < 8 && yi < 16) {
		for (let yi_=yi; yi_<16; yi_++){
			chunk[yi_][xi] = 0;
		}
		xi++;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi+=r;
	}
	
	xi = 7;
	yi = 15;
	r = 0;
	while (xi >= 0 && yi >= 8) {
		for (let xi_=xi; xi_>=0; xi_--) {
			chunk[yi][xi_] = 0;
		}
		yi--;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi-=r;
	}
	
	
	return chunk;
}


export function wn(seed) {
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(1));
	
	let xi = 7;
	let yi = 0;
	let r = 0;
	
	while (xi < 16 && yi < 8) {
		for (let xi_=xi; xi_<16; xi_++){
			chunk[yi][xi_] = 0;
		}
		yi++;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi+=r;
	}
	
	xi = 15;
	yi = 7;
	r = 0;
	while (xi >=8 && yi >= 0) {
		for (let yi_=yi; yi_>=0; yi_--) {
			chunk[yi_][xi] = 0;
		}
		xi--;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi-=r;
	}/**/
	
	
	xi = 7;
	yi = 0;
	r = 0;
	while (xi >= 0 && yi < 8) {
		for (let xi_=xi; xi_>=0; xi_--){
			chunk[yi][xi_] = 0;
		}
		yi++;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi-=r;
	}
	
	xi = 0;
	yi = 7;
	r = 0;
	while (xi < 7 && yi >= 0) {
		for (let yi_=yi; yi_>=0; yi_--) {
			chunk[yi_][xi] = 0;
		}
		xi++;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi-=r;
	}/**/
	
	
	return chunk;
}


export function wc(seed) {
	
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(1));
	
	
	let yi = 7;
	let xi = 0;
	let r = 0;
	
	
	while (yi < 16 && xi < 8) {
		for (let yi_=yi; yi_<16; yi_++){
			chunk[yi_][xi] = 0;
		}
		xi++;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi+=r;
	}
	/**/
	
	
	yi = 15;
	xi = 7;
	r = 0;
	while (yi >=8 && xi >= 0) {
		for (let xi_=xi; xi_>=0; xi_--) {
			chunk[yi][xi_] = 0;
		}
		yi--;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi-=r;
	}/**/
	
	
	xi = 7;
	yi = 0;
	r = 0;
	while (xi >= 0 && yi < 8) {
		for (let xi_=xi; xi_>=0; xi_--){
			chunk[yi][xi_] = 0;
		}
		yi++;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi-=r;
	}/**/
	
	
	xi = 0;
	yi = 7;
	r = 0;
	while (xi < 7 && yi >= 0) {
		for (let yi_=yi; yi_>=0; yi_--) {
			chunk[yi_][xi] = 0;
		}
		xi++;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi-=r;
	}/**/
	
	
	
	return chunk;
}


export function w3(seed) {
	
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(1));
	
	let yi = 15;
	let xi = 8;
	let r = 0;
	
	while (yi > 8 && xi < 16) {
		for (let xi_=xi; xi_<16; xi_++){
			chunk[yi][xi_] = 0;
		}
		yi--;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi+=r;
	}
	
	yi = 8;
	xi = 15;
	r = 0;
	while (yi < 16 && xi >= 8) {
		for (let yi_=yi; yi_<16; yi_++) {
			chunk[yi_][xi] = 0;
		}
		xi--;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi+=r;
	}
	
	yi = 0;
	xi = 8;
	r = 0;
	
	while (yi < 8 && xi < 16) {
		for (let xi_=xi; xi_<16; xi_++){
			chunk[yi][xi_] = 0;
		}
		yi++;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi+=r;
	}
	
	yi = 7;
	xi = 15;
	r = 0;
	while (yi >= 0 && xi >= 8) {
		for (let yi_=yi; yi_>=0; yi_--) {
			chunk[yi_][xi] = 0;
		}
		xi--;
		r = 1+Math.floor(seed[iR]*(4-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi-=r;
	}/**/
	
	
	return chunk;
}



export function wlhnt(seed) {
	let iR = 0;
	//let pixelData = [];
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	
	
	//let xi = 7;
	//let yi = 0;
	let r = 0;
	
	let xi = 0;
	let yi = 15;
	while (xi < 16 && yi >= 0) {
		for (let yi_=yi; yi_>=0; yi_--) {
			chunk[yi_][xi] = 1;
		}
		xi++;
		r = Math.floor(seed[iR]*(2-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi-=r;
	}
	
	xi = 15;
	yi = 15;
	while (xi >= 0 && yi >= 0) {
		for (let yi_=yi; yi_>=0; yi_--) {
			chunk[yi_][xi] = 1;
		}
		xi--;
		r = Math.floor(seed[iR]*(2-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi-=r;
	}
	
	return chunk;
}

export function wlhst(seed) {
	let iR = 0;
	//let pixelData = [];
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	
	
	let xi = 0;
	let yi = 0;
	let r = 0;
	while (xi < 16 && yi < 16) {
		for (let yi_=yi; yi_<16; yi_++) {
			chunk[yi_][xi] = 1;
		}
		xi++;
		r = Math.floor(seed[iR]*(3-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi+=r;
	}
	
	xi = 15;
	yi = 0;
	while (xi >= 0 && yi < 16) {
		for (let yi_=yi; yi_<16; yi_++) {
			chunk[yi_][xi] = 1;
		}
		xi--;
		r = Math.floor(seed[iR]*(3-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		yi+=r;
	}
	
	return chunk;
}

export function wlhet(seed) {

	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));


	let xi = 0;
	let yi = 0;
	let r = 0;
	while (xi < 16 && yi < 16) {
		for (let xi_=xi; xi_<16; xi_++) {
			chunk[yi][xi_] = 1;
		}
		yi++;
		r = Math.floor(seed[iR]*(3-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi+=r;
	}


	xi = 0;
	yi = 15;
	while (xi < 16 && yi > 0) {
		for (let xi_=xi; xi_<16; xi_++) {
			chunk[yi][xi_] = 1;
		}
		yi--;
		r = Math.floor(seed[iR]*(3-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi+=r;
	}/**/
	
	return chunk;

}

export function wlhwt(seed) {

	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	
	let xi = 15;
	let yi = 0;
	let r = 0;
	while (xi >= 0 && yi < 16) {
		for (let xi_=xi; xi_>=0; xi_--) {
			chunk[yi][xi_] = 1;
		}
		yi++;
		r = Math.floor(seed[iR]*(3-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi-=r;
	}
	
	
	xi = 15;
	yi = 15;
	while (xi >= 0 && yi > 0) {
		for (let xi_=xi; xi_>=0; xi_--) {
			chunk[yi][xi_] = 1;
		}
		yi--;
		r = Math.floor(seed[iR]*(3-0)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		xi-=r;
	}/**/
	
	return chunk;

}

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


export function wlbns(seed) {
	
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	
	let xi = 0;
	let yi = 0;
	let r = 0;
	let coast = [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1];
	
	
	for (let i=0; i<25; i++) {
		r = 1 + Math.floor(seed[iR]*(14-1)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
	  coast = lift(coast, r, 1);
	}/**/
	
	while (yi < 16) {
		for (let xi_=0; xi_<coast[yi]; xi_++) {
			chunk[yi][xi_] = 1;
		}
		yi++;
	}
	
	yi = 0;
	coast = [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1];
	
	for (let i=0; i<25; i++) {
		r = 1 + Math.floor(seed[iR]*(14-1)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
	  coast = lift(coast, r, 1);
	}/**/
	
	while (yi < 16) {
		for (let xi_=0; xi_<coast[yi]; xi_++) {
			chunk[yi][15-xi_] = 1;
		}
		yi++;
	}
	
	return chunk;
	
}

export function wlbwe(seed) {
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	
	
	let xi = 0;
	let yi = 0;
	let r = 0;
	let coast = [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1];
	
	
	for (let i=0; i<25; i++) {
		r = 1 + Math.floor(seed[iR]*(14-1)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
	  coast = lift(coast, r, 1);
	}/**/
	
	while (xi < 16) {
		for (let yi_=0; yi_<coast[xi]; yi_++) {
			chunk[yi_][xi] = 1;
		}
		xi++;
	}
	
	xi = 0;
	coast = [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1];
	
	for (let i=0; i<25; i++) {
		r = 1 + Math.floor(seed[iR]*(14-1)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
	  coast = lift(coast, r, 1);
	}/**/
	
	while (xi < 16) {
		for (let yi_=0; yi_<coast[xi]; yi_++) {
			chunk[15-yi_][xi] = 1;
		}
		xi++;
	}
	
	return chunk;
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


export function wo(seed) {
	
	
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	
	
	//let xi = 8;
	//let yi = 0;
	let randr = 1;
	let randx = 0;
	let randy = 0;
	
	for (let i=0; i<2; i++) {
		randx = 4 + Math.floor(seed[iR]*(12-4)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		randy = 4 + Math.floor(seed[iR]*(12-4)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		
		randr = 3 + Math.floor(seed[iR]*(5-3)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		
		let coords = xyWithinRadius(randr, randx, randy);
		
		for (let c=0; c<coords.length; c++){
			let x = coords[c][0];
			let y = coords[c][1];
			try { chunk[y][x] = 1; } catch(e){}
		}
	}
	
	
	for (let i=0; i<15; i++) {
		randx = 3 + Math.floor(seed[iR]*(13-3)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		randy = 3 + Math.floor(seed[iR]*(13-3)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		
		randr = 0 + Math.floor(seed[iR]*(4-1)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		
		let coords = xyWithinRadius(randr, randx, randy);
		
		for (let c=0; c<coords.length; c++){
			let x = coords[c][0];
			let y = coords[c][1];
			try { chunk[y][x] = 1; } catch(e){}
		}
	}
	
	for (let i=0; i<20; i++) {
		randx = 1 + Math.floor(seed[iR]*(14-1)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		randy = 1 + Math.floor(seed[iR]*(14-1)); // min + seed[iR] * (max - min)
		iR = iR >= seed.length-1 ? 0 : iR+1;
		
		try { chunk[randy][randx] = 1; } catch (e) {}
	  try { chunk[randy][randx+1] = 1; } catch (e) {}
		try {	chunk[randy+1][randx] = 1; } catch (e) {}
		try {	chunk[randy+1][randx+1] = 1; } catch (e) {}
	}
	
	
	return chunk;
	
}

// water edge top
export function weT(seed) {
	
	
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(1));
	
	
	let ry = 0;
	let rx = 1;
	let xi = 0;
	
	let rugged = 0 + Math.floor(seed[iR]*(2-0));
	
	if (rugged) {
		while (xi<16) {
			let middle = 4 < xi && xi < 12 ? (6 < xi && xi < 10 ? 2 : 1) : 0;
			rx = 1 + Math.floor(seed[iR]*(2-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			ry =  middle + Math.floor(seed[iR]*(3-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			for (let n=xi; n<xi+rx && n<16; n++) {
				for (let yi=0; yi<ry; yi++) {
					chunk[15-yi][n] = 0;
				}
			}
			xi += rx;
		}
	} else {
		while (xi<16) {
			let middle = 4 < xi && xi < 12 ? 1 : 0;
			rx = 1 + Math.floor(seed[iR]*(6-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			ry =  middle + Math.floor(seed[iR]*(2-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			for (let n=xi; n<xi+rx && n<16; n++) {
				for (let yi=0; yi<ry; yi++) {
					chunk[15-yi][n] = 0;
				}
			}
			xi += rx;
		}
	}
	
	
	return chunk;
	
}

// water edge left
export function weE(seed) {
	
	
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(1));
	
	
	let ry = 0;
	let rx = 1;
	let xi = 0;
	
	let rugged = 0 + Math.floor(seed[iR]*(2-0));
	
	if (rugged) {
		while (xi<16) {
			let middle = 4 < xi && xi < 12 ? (6 < xi && xi < 10 ? 2 : 1) : 0;
			rx = 1 + Math.floor(seed[iR]*(2-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			ry =  middle + Math.floor(seed[iR]*(3-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			for (let n=xi; n<xi+rx && n<16; n++) {
				for (let yi=0; yi<ry; yi++) {
					chunk[n][15-yi] = 0;
				}
			}
			xi += rx;
		}
	} else {
		while (xi<16) {
			let middle = 4 < xi && xi < 12 ? 1 : 0;
			rx = 1 + Math.floor(seed[iR]*(6-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			ry =  middle + Math.floor(seed[iR]*(2-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			for (let n=xi; n<xi+rx && n<16; n++) {
				for (let yi=0; yi<ry; yi++) {
					chunk[n][15-yi] = 0;
				}
			}
			xi += rx;
		}
	}
	
	return chunk;
	
}

//water edge right
export function we3(seed) {
	
	
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(1));
	
	let ry = 0;
	let rx = 1;
	let xi = 0;
	
	let rugged = 0 + Math.floor(seed[iR]*(2-0));
	
	if (rugged) {
		while (xi<16) {
			let middle = 4 < xi && xi < 12 ? (6 < xi && xi < 10 ? 2 : 1) : 0;
			rx = 1 + Math.floor(seed[iR]*(2-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			ry =  middle + Math.floor(seed[iR]*(3-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			for (let n=xi; n<xi+rx && n<16; n++) {
				for (let yi=0; yi<ry; yi++) {
					chunk[n][yi] = 0;
				}
			}
			xi += rx;
		}
	} else {
		while (xi<16) {
			let middle = 4 < xi && xi < 12 ? 1 : 0;
			rx = 1 + Math.floor(seed[iR]*(6-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			ry =  middle + Math.floor(seed[iR]*(2-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			for (let n=xi; n<xi+rx && n<16; n++) {
				for (let yi=0; yi<ry; yi++) {
					chunk[n][yi] = 0;
				}
			}
			xi += rx;
		}
	}
	
	return chunk;
	
}

// water edge bottom
export function weU(seed) {
	
	
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(1));
	
	
	let ry = 0;
	let rx = 1;
	let xi = 0;
	
	let rugged = 0 + Math.floor(seed[iR]*(2-0));
	//console.log(rugged+"?");
	if (rugged) {
		while (xi<16) {
			let middle = 4 < xi && xi < 12 ? (6 < xi && xi < 10 ? 2 : 1) : 0;
			rx = 1 + Math.floor(seed[iR]*(2-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			ry =  middle + Math.floor(seed[iR]*(3-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			for (let n=xi; n<xi+rx && n<16; n++) {
				for (let yi=0; yi<ry; yi++) {
					chunk[yi][n] = 0;
				}
			}
			xi += rx;
		}
	} else {
		while (xi<16) {
			let middle = 4 < xi && xi < 12 ? 1 : 0;
			rx = 1 + Math.floor(seed[iR]*(6-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			ry =  middle + Math.floor(seed[iR]*(2-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			for (let n=xi; n<xi+rx && n<16; n++) {
				for (let yi=0; yi<ry; yi++) {
					chunk[yi][n] = 0;
				}
			}
			xi += rx;
		}
	}
	
	
	return chunk;
	
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

	'dot' is a bitwise or with the cells around it:

	0 0  0 0  0 0
  0 1  1 1  1 0

  0 1  1 1  1 0
  0 1  1 1  1 0

  0 1  1 1  1 0
  0 0  0 0  0 0


	 1    3    2

   5    15   10

   4    12   8 
	
	
	
	TODO: update the corresponding adjacent chunks
	
*/
export function dot_image(grid_image, x, y, cx, cy) {
	let chunkO = cx+"_"+cy;
	let check_ = "";
	
	grid_image[y][x] = 15;
	
	if (x === 0) {
		if (y === 0) {
			/*
				 _|__ __
					|o
			    |
			
				top-left corner
			*/
			
			check_ = (cx-1)+"_"+(cy-1);
			try { chunk_set[check_]["image"][15][15] = chunk_set[check_]["image"][15][15] | 1; } catch (e) {}
			check_ = cx+"_"+(cy-1);
			try { chunk_set[check_]["image"][15][0] = chunk_set[check_]["image"][15][0] | 3; } catch (e) {}
			try { chunk_set[check_]["image"][15][1] = chunk_set[check_]["image"][15][1] | 2; } catch (e) {}
			check_ = (cx-1)+"_"+cy;
			try { chunk_set[check_]["image"][0][15] = chunk_set[check_]["image"][0][15] | 5; } catch (e) {}
			try { chunk_set[check_]["image"][1][15] = chunk_set[check_]["image"][1][15] | 4; } catch (e) {}
			
			grid_image[y][x+1] = grid_image[y][x+1] | 10;
			grid_image[y+1][x] = grid_image[y+1][x] | 12;
			grid_image[y+1][x+1] = grid_image[y+1][x+1] | 8;
			
		} else if (y === 15) {
			/*
				  |
				 _|o_ __
					|
			
				bottom-left corner
			*/
			
			check_ = (cx-1)+"_"+cy;
			try { chunk_set[check_]["image"][14][15] = chunk_set[check_]["image"][14][15] | 1; } catch (e) {}
			try { chunk_set[check_]["image"][15][15] = chunk_set[check_]["image"][15][15] | 5; } catch (e) {}
			check_ = (cx-1)+"_"+(cy+1);
			try { chunk_set[check_]["image"][0][15] = chunk_set[check_]["image"][0][15] | 4; } catch (e) {}
			check_ = cx+"_"+(cy+1);
			try { chunk_set[check_]["image"][0][0] = chunk_set[check_]["image"][0][0] | 12; } catch (e) {}
			try { chunk_set[check_]["image"][0][1] = chunk_set[check_]["image"][0][1] | 8; } catch (e) {}
		
			grid_image[y-1][x] = grid_image[y-1][x] | 3;
			grid_image[y-1][x+1] = grid_image[y-1][x+1] | 2;
			grid_image[y][x+1] = grid_image[y][x+1] | 10;
			
		} else {
			/*
				  |
				  |o  
					|
				
				left
			*/
			
			check_ = (cx-1)+"_"+cy;
			try { chunk_set[check_]["image"][y-1][15] = chunk_set[check_]["image"][y-1][15] | 1; } catch (e) {}
			try { chunk_set[check_]["image"][y][15] = chunk_set[check_]["image"][y][15] | 5; } catch (e) {}
			try { chunk_set[check_]["image"][y+1][15] = chunk_set[check_]["image"][y+1][15] | 4; } catch (e) {}
			
			grid_image[y-1][x] = grid_image[y-1][x] | 3;
			grid_image[y-1][x+1] = grid_image[y-1][x+1] | 2;
			grid_image[y][x+1] = grid_image[y][x+1] | 10;
			grid_image[y+1][x+1] = grid_image[y+1][x+1] | 8;
			grid_image[y+1][x] = grid_image[y+1][x] | 12;
			
		}
	} else if (x === 15) {
		if (y === 0) {
			/*
				 __ __|_
				     o|
					    |
				
				top-right corner
			*/
			check_ = (cx+1)+"_"+(cy-1);
			try { chunk_set[check_]["image"][0][15] = chunk_set[check_]["image"][0][15] | 2; } catch (e) {}
			check_ = (cx+1)+"_"+cy;
			try { chunk_set[check_]["image"][0][0] = chunk_set[check_]["image"][0][0] | 10; } catch (e) {}
			try { chunk_set[check_]["image"][1][0] = chunk_set[check_]["image"][1][0] | 8; } catch (e) {}
			check_ = cx+"_"+(cy-1);
			try { chunk_set[check_]["image"][15][15] = chunk_set[check_]["image"][15][15] | 3; } catch (e) {}
			try { chunk_set[check_]["image"][15][14] = chunk_set[check_]["image"][15][14] | 1; } catch (e) {}
			
			grid_image[y][x-1] = grid_image[y][x-1] | 5;
			grid_image[y+1][x-1] = grid_image[y+1][x-1] | 4;
			grid_image[y+1][x] = grid_image[y+1][x] | 12;
			
		} else if (y === 15) {
			/*
				      |
				 __ _o|_
					    |
			
				bottom-right corner
			*/
			check_ = (cx+1)+"_"+(cy+1);
			try { chunk_set[check_]["image"][0][0] = chunk_set[check_]["image"][0][0] | 8; } catch (e) {}
			check_ = (cx+1)+"_"+cy;
			try { chunk_set[check_]["image"][14][0] = chunk_set[check_]["image"][14][0] | 2; } catch (e) {}
			try { chunk_set[check_]["image"][15][0] = chunk_set[check_]["image"][15][0] | 10; } catch (e) {}
			check_ = cx+"_"+(cy+1);
			try { chunk_set[check_]["image"][0][15] = chunk_set[check_]["image"][0][15] | 12; } catch (e) {}
			try { chunk_set[check_]["image"][0][14] = chunk_set[check_]["image"][0][14] | 4; } catch (e) {}
			
			grid_image[y][x-1] = grid_image[y][x-1] | 5;
			grid_image[y-1][x-1] = grid_image[y-1][x-1] | 1;
			grid_image[y-1][x] = grid_image[y-1][x] | 3;
			
		} else {
			/*
				  |
				 o|  
					|
			
				right
			*/
			check_ = (cx+1)+"_"+cy;
			try { chunk_set[check_]["image"][y-1][0] = chunk_set[check_]["image"][y-1][0] | 2; } catch (e) {}
			try { chunk_set[check_]["image"][y][0] = chunk_set[check_]["image"][y][0] | 10; } catch (e) {}
			try { chunk_set[check_]["image"][y+1][0] = chunk_set[check_]["image"][y+1][0] | 8; } catch (e) {}
			
			grid_image[y-1][x] = grid_image[y-1][x] | 3;
			grid_image[y-1][x-1] = grid_image[y-1][x-1] | 1;
			grid_image[y][x-1] = grid_image[y][x-1] | 5;
			grid_image[y+1][x-1] = grid_image[y+1][x-1] | 4;
			grid_image[y+1][x] = grid_image[y+1][x] | 12;
			
		}
	} else {
		if (y === 0) {
			/*
			  __ __ __
			     o
			
				top
			*/
			check_ = cx+"_"+(cy-1);
			try { chunk_set[check_]["image"][15][x-1] = chunk_set[check_]["image"][15][x-1] | 1; } catch (e) {}
			try { chunk_set[check_]["image"][15][x] = chunk_set[check_]["image"][15][x] | 3; } catch (e) {}
			try { chunk_set[check_]["image"][15][x+1] = chunk_set[check_]["image"][15][x+1] | 2; } catch (e) {}
			
			grid_image[y][x-1] = grid_image[y][x-1] | 5;
			grid_image[y+1][x-1] = grid_image[y+1][x-1] | 4;
			grid_image[y+1][x] = grid_image[y+1][x] | 12;
			grid_image[y+1][x+1] = grid_image[y+1][x+1] | 8;
			grid_image[y][x+1] = grid_image[y][x+1] | 10;
			
			
		} else if (y === 15) {
			/*
			  __ o_ __
			  
				
				bottom
			*/
			
			check_ = cx+"_"+(cy+1);
			try { chunk_set[check_]["image"][0][x-1] = chunk_set[check_]["image"][0][x-1] | 4; } catch (e) {}
			try { chunk_set[check_]["image"][0][x] = chunk_set[check_]["image"][0][x] | 12; } catch (e) {}
			try { chunk_set[check_]["image"][0][x+1] = chunk_set[check_]["image"][0][x+1] | 8; } catch (e) {}
			
			grid_image[y][x-1] = grid_image[y][x-1] | 5;
			grid_image[y-1][x-1] = grid_image[y-1][x-1] | 1;
			grid_image[y-1][x] = grid_image[y-1][x] | 3;
			grid_image[y-1][x+1] = grid_image[y-1][x+1] | 2;
			grid_image[y][x+1] = grid_image[y][x+1] | 10;
			
			
		} else {
			// not on edge
			try { grid_image[y-1][x-1] = grid_image[y-1][x-1] | 1; } catch (e) {}
			try { grid_image[y-1][x] = grid_image[y-1][x] | 3; } catch (e) {}
			try { grid_image[y-1][x+1] = grid_image[y-1][x+1] | 2; } catch (e) {}
			try { grid_image[y][x-1] = grid_image[y][x-1] | 5; } catch (e) {}
			try { grid_image[y][x+1] = grid_image[y][x+1] | 10; } catch (e) {}
			try { grid_image[y+1][x-1] = grid_image[y+1][x-1] | 4; } catch (e) {}
			try { grid_image[y+1][x] = grid_image[y+1][x] | 12; } catch (e) {}
			try { grid_image[y+1][x+1] = grid_image[y+1][x+1] | 8; } catch (e) {}
		}
	}
	
}



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


/*

===============

GET BIOME INFORMATION

---------------

/**/

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
	if (1) {
		if (!["w", "g", "m"].includes(biome)) {
			if (biome === "f") {
				
				biome2 = "f";
			}
			biome = "g";
			
			//if (["f"].inclues(biome2)) {
			//	biome
				//}
		} else {
			if (["f"].includes(biome)) {
				biome2 = "f";
			} else if (["m"].includes(biome)) {
				biome = "g";
				biome2 = "m";
			}
		}
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

function trail_type_(x,y) {
	
  let a = Math.sin(x*13.1)*Math.sin(y*13.1) > 0.10;
  let b = Math.sin(x*12.4)*Math.sin(y*12.4) > 0.16;
  let c = -Math.sin(x*12.9)*Math.sin(y*12.9+1) > 0.2;
  let d = -Math.sin(x*12.1)*Math.sin(y*12.1-1) > -0.2;
	
  let big1 = Math.sin((x-3)*12.17)*Math.sin(y*12.4) > 0.16;
  let big2 = Math.sin((x+2)*12.4)*Math.sin((y-5)*12.13) > 0.16;
  let big3 = -Math.sin(x*11.9)*Math.sin((y-1)*12.25) > 0.16;
  let big4 = -Math.sin(x*12.25)*Math.sin((y+1)*11.8) > 0.16;
  let sma1 = Math.sin((x+1)*10.01)*Math.sin(y*12.9) > 0.10;
  let sma2 = Math.sin((x)*12.9)*Math.sin((y-1)*10.01) > 0.10;
  //let c = -Math.sin(x*12.9)*Math.sin(y*12.9+1) > 0.2;
  //let d1 = -Math.sin((x-1)*2.1)*Math.sin((y-1)*4.1) < -0.2;
  //let d2 = -Math.sin((x-2)*1.1)*Math.sin((y-2)*1.03) < -0.2;
	
  let x1 = (x+1)%3 <1
  let x2 = (x+2)%3 <1
  let y1 = (y+1)%3 <1
  let y2 = (y+2)%3 <1
	
	let result = 0;
	
	
  if (big1 || big2 || big3 || big4) {
    result = 1;
    if (sma1 && sma2) {
      if (x%2 || y%2) {
        result = 2;//"╋━";
        if (x1) {
	        if (y1) {
	        	result = 3;//"┏━";
	        }
					if (y2) {
						result = 4;//"┓ ";
					}  
			  }
        if (x2) {
          if (y1) {
          	result = 5;//"┗━";
          }
          if (y2) {
          	result = 6;//"┛ ";
          }
      	}
      }
    } else if (sma1) {
    	result = 7;//"┃ ";
    } else if (sma2) {
    	result = 8;//"━━";
    }
  }
	/**/
	/*
	if ((a && c) || (b && d)) {
		if (x%2 && y%2) {
			return 1;
		} else if (x%2) {
			return 2;
		} else if (y%2) {
			return 3;
		}
	}/**/
	
	return result;
}



function trail_type(xx,yy) {
  
	let result = 0;
  let p = (xx*yy)+((xx-yy)*(xx+yy));
  
  
  
  let x = xx;
	let y = yy;
  
  
  if (Math.sin(xx*12.1)*Math.sin(yy*12.23) > 0.13) {
    if (p%3) {
      x = xx+5; //5
      y = yy-17; //-17
    } else {
      x = xx+2; //2
      y = yy+10; //10
	  }
  } else {
    if (p%3) {
      x = xx-91; //-91
	    y = yy+101; //101
		} else {
      x = xx+8;
		  y = yy;
		}
  }
    
		
  
	let r = ". ";
  
  
  
  
  // "┗━" "┓ " "┛ " "┏━"
  if (x%2) {
    if (x%3) {
      if (x%5) {
        
        if (y%2) {
          if (y%3) {
            if (y%5) {
              r = "┗━";//"a "
            } else {
              r = "┻━";//"b "
						}
          } else {
            if (y%5) {
              r = "┫ ";//"c "
            } else {
              r = "┗━";//"d "
						}
					}
        } else {
          if (y%3) {
            if (y%5) {
              r = "┓ ";//"e "
            } else {
              r = "┳━";//"f "
						}
          } else {
            if (y%5) {
              r = "┏━";//"┃ "//"g "
            } else {
              r = "┳━";//"h "
						}
					}
				}
        
      } else {
        
        if (y%2) {
          if (y%3) {
            if (y%5) {
              r = "┻━";//"i "
            } else {
              r = "┗━";//"j "
						}
          } else {
            if (y%5) {
              r = "┫ ";//"k "
            } else {
              r = "┣━";//"l "
						}
					}
        } else {
          if (y%3) {
            if (y%5) {
              r = "┳━";//"m "
            } else {
              r = "┣━";//"n "
						}
          } else {
            if (y%5) {
              r = "┳━";//"o "
            } else {
              r = "┫ ";//"p "
						}
          }
				}
			}
    } else {
      if (x%5) {
        
        if (y%2) {
          if (y%3) {
            if (y%5) {
              r = "┣━";//"q "
            } else {
              r = "┳━";//"r "
						}
          } else {
            if (y%5) {
              r = "┳━";//"┓ "//"s "
            } else {
              r = "┣━";//"t "
						}
					}
        } else {
          if (y%3) {
            if (y%5) {
              r = "┻━";// "u "
            } else {
              r = "┣━";//"v "
						}
          } else {
            if (y%5) {
              r = "┫ ";//"w "
            } else {
              r = "┓ ";//"x "
						}
					}
				}
              
      } else {
        
        if (y%2) {
          if (y%3) {
            if (y%5) {
              r = "┣━";//"y "
            } else {
              r = "┫ ";//"z "
						}
          } else {
            if (y%5) {
              r = "┗━";//"A "
            } else {
              r = "┛ ";//"B "
						}
					}
        } else {
          if (y%3) {
            if (y%5) {
              r = "┏━";//"C "
            } else {
              r = "┻━";//"D "
						}
          } else {
            if (y%5) {
              r = "┫ ";//"E "
            } else {
              r = "┳━";//"F "
						}
					}
				}
			}
		}
        
  } else {
    if (x%3) {
      if (x%5) {
        
        if (y%2) {
          if (y%3) {
            if (y%5) {
              r = "┫ ";//". "//"┓ "//"G "
            } else {
              r = "┳━";//"H "
						}
          } else {
            if (y%5) {
              r = "┏━";//"I "
            } else {
              r = "┫ ";//"J "
						}
					}
        } else {
          if (y%3) {
            if (y%5) {
              r = "┛ ";//"K "
            } else {
              r = "┻━";//"L "
						}
          } else {
            if (y%5) {
              r = "┻━";//"M "
            } else {
              r = "┗━";//"N "
						}
					}
				}
        
      } else {
        
        if (y%2) {
          if (y%3) {
            if (y%5) {
              r = "┓ ";//"O "
            } else {
              r = "┣━";//"P "
						}
          } else {
            if (y%5) {
              r = "┣━";//"Q "
            } else {
              r = "┳━";//"R "
						}
					}
        } else {
          if (y%3) {
            if (y%5) {
              r = "┗━";//"S "
            } else {
              r = "┻━";//"T "
						}
          } else {
            if (y%5) {
              r = "┛ ";//"U "
            } else {
              r = "┣━"//"V "
						}
					}
				}
			}
              
    } else {
      if (x%5) {
        
        if (y%2) {
          if (y%3) {
            if (y%5) {
              r = "┓ ";//"W "
            } else {
              r = "┳━";//"X "
						}
          } else {
            if (y%5) {
              r = "┏━";//"Y "
            } else {
              r = "┳━";//"Z "
						}
					}
        } else {
          if (y%3) {
            if (y%5) {
              r = "┛ ";//"1 "
            } else {
              r = "┫ ";//"2 "
						}
          } else {
            if (y%5) {
              r = "┻━";//"3 "
            } else {
              r = "┗━";//"4 "
						}
					}
				}
        
      } else {
        
        if (y%2) {
          if (y%3) {
            if (y%5) {
              r = "┳━";//"5 "
            } else {
              r = "┫ ";//"6 "
						}
          } else {
            if (y%5) {
              r = "┣━";//"7 "
            } else {
              r = "┳━";//"8 "
						}
					}
        } else {
          if (y%3) {
            if (y%5) {
              r = "┣━";//"9 "
            } else {
              r = "┻━";//"0 "
						}
					
          } else {
            if (y%5) {
              r = "┛ ";//"// "
            } else {
              r = "┻━";//"@ "
						}
					}
				}
			}
		}
	}
        
	// -----------------
	// chisel out

	let size = 0;
	let size2 = 0;//0.1

	let big1 = Math.sin((xx+size)*(0.2+size2))*Math.sin((yy+size)*(0.1+size2)+3) > 0.7;
	let big2 = Math.sin((xx+size)*(0.19+size2)-1)*Math.sin((yy+size)*(0.10+size2)+1) > 0.7;
	let big3 = Math.sin((xx+size)*(0.10+size2)+1)*Math.sin((yy+size)*(0.19+size2)-5) > 0.7;
	let big4 = Math.sin((xx+size)*(0.23+size2)-7)*Math.sin((yy+size)*(0.18+size2)) > 0.6;
	let big5 = Math.sin((xx+size)*(0.3+size2))*Math.sin((yy+size)*(0.4+size2)+8) > 0.6;
	let sma1 = Math.sin(xx*0.6)*Math.sin(yy*0.6) > 0.4;
	let sma2 = Math.sin((xx-1)*0.4)*Math.sin((yy-2)*0.4) > 0.4;


	if (big1 || big2 || big3 || big4 || big5 || sma1 || sma2) {
		r = ". ";
	}
	
	switch (r) {
	  case "┻━":
			return 1;
			break;
		case "┣━":
			return 2;
			break;
		case "┳━":
			return 3;
			break;
		case "┫ ":
			return 4;
			break;
		case "┗━":
			return 5;
			break;
		case "┏━":
			return 6;
			break;
		case "┓ ":
			return 7;
			break;
		case "┛ ":
			return 8;
			break;
		case ". ":
			return 0;
			break;
		default:
			return 0;
	}
	  
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
		if (0) {
			if (["f", "m", "F", "d"].includes(biome.charAt(0))) {
				biome = "g";
			}
		}
		
		if (0) {
			
			// if biome2 is surrounded by mountains, then this biome should be M
			if (["m", "M"].includes(biome.charAt(0))) {
				//console.log("4315")
				
				if (
					["m", "M"].includes(m[ DIR[cid].up ].b["biome2"]) && 
					["m", "M"].includes(m[ DIR[cid].left ].b["biome2"]) && 
					["m", "M"].includes(m[ DIR[cid].right ].b["biome2"]) &&
					["m", "M"].includes(m[ DIR[cid].down ].b["biome2"])
				) {
					//console.log("mmmm?");
					//m[cid].b["biome2"] = "M";
				}
			}
		} //
		
		
		
		
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
				m[cid].s = "wr";
			} else if (
				m[ DIR[cid].up ].b["biome"] !== "w" && 
				m[ DIR[cid].left ].b["biome"] == "w" && 
				m[ DIR[cid].right ].b["biome"] !== "w" &&
				m[ DIR[cid].down ].b["biome"] == "w"
			) {
				m[cid].s = "w7";
			} else if (
				m[ DIR[cid].up ].b["biome"] == "w" && 
				m[ DIR[cid].left ].b["biome"] !== "w" && 
				m[ DIR[cid].right ].b["biome"] == "w" &&
				m[ DIR[cid].down ].b["biome"] !== "w"
			) {
				m[cid].s = "wL";
			} else if (
				m[ DIR[cid].up ].b["biome"] == "w" && 
				m[ DIR[cid].left ].b["biome"] == "w" && 
				m[ DIR[cid].right ].b["biome"] !== "w" &&
				m[ DIR[cid].down ].b["biome"] !== "w"
			) {
				m[cid].s = "wJ";
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
		}
		
		if (biome2 == "m") {
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
		
			
			//case "m":
				//console.log("get chunk shape m");
				
				
				/*
				
				
				if (
					m[ DIR[cid].up ].b["biome"] == "m" && 
					m[ DIR[cid].left ].b["biome"] == "m" && 
					m[ DIR[cid].right ].b["biome"] == "m" &&
					m[ DIR[cid].down ].b["biome"] == "m"
				) {
					m[cid].s = "M";
				}/**/
				/*
				if (
					m[ DIR[cid].up ].b["biome"] == "m" && 
					m[ DIR[cid].left ].b["biome"] == "m" && 
					m[ DIR[cid].right ].b["biome"] !== "m" &&
					m[ DIR[cid].down ].b["biome"] !== "m"
				) {
					m[cid].s = "mJ";
				} else if (
					m[ DIR[cid].up ].b["biome"] == "m" && 
					m[ DIR[cid].left ].b["biome"] !== "m" && 
					m[ DIR[cid].right ].b["biome"] == "m" &&
					m[ DIR[cid].down ].b["biome"] !== "m"
				) {
					m[cid].s = "mL";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "m" && 
					m[ DIR[cid].left ].b["biome"] == "m" && 
					m[ DIR[cid].right ].b["biome"] !== "m" &&
					m[ DIR[cid].down ].b["biome"] == "m"
				) {
					m[cid].s = "m7";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "m" && 
					m[ DIR[cid].left ].b["biome"] !== "m" && 
					m[ DIR[cid].right ].b["biome"] == "m" &&
					m[ DIR[cid].down ].b["biome"] == "m"
				) {
					m[cid].s = "mr";
				} else if (
					m[ DIR[cid].up ].b["biome"] == "m" && 
					m[ DIR[cid].left ].b["biome"] !== "m" && 
					m[ DIR[cid].right ].b["biome"] !== "m" &&
					m[ DIR[cid].down ].b["biome"] !== "m"
				) {
					m[cid].s = "mu";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "m" && 
					m[ DIR[cid].left ].b["biome"] == "m" && 
					m[ DIR[cid].right ].b["biome"] !== "m" &&
					m[ DIR[cid].down ].b["biome"] !== "m"
				) {
					m[cid].s = "m3";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "m" && 
					m[ DIR[cid].left ].b["biome"] !== "m" && 
					m[ DIR[cid].right ].b["biome"] == "m" &&
					m[ DIR[cid].down ].b["biome"] !== "m"
				) {
					m[cid].s = "mc";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "m" && 
					m[ DIR[cid].left ].b["biome"] !== "m" && 
					m[ DIR[cid].right ].b["biome"] !== "m" &&
					m[ DIR[cid].down ].b["biome"] == "m"
				) {
					m[cid].s = "mn";
				} else {
					m[cid].s = "m";
				}
				/**/
				
			
			
		//} // end switch
	} // end for
	
	
}


// this one is not used DEPRECATED
export function get_chunk_shapes_(m) {
	
	//m["O"].s = get_chunk_shape(m["O"].b["biome"])
	//console.log(m);
	
	
	// middle chunk
	if (m["O"].b["biome"] == "g") {
		if (
			m["T"].b["biome"] == "g" && 
			m["E"].b["biome"] == "g" && 
			m["3"].b["biome"] == "w" &&
			m["U"].b["biome"] == "w"
		) {
			m["O"].s = "gJ";
		} else if (
			m["T"].b["biome"] == "g" && 
			m["E"].b["biome"] == "w" && 
			m["3"].b["biome"] == "g" &&
			m["U"].b["biome"] == "w"
		) {
			m["O"].s = "gL";
		} else if (
			m["T"].b["biome"] == "w" && 
			m["E"].b["biome"] == "g" && 
			m["3"].b["biome"] == "w" &&
			m["U"].b["biome"] == "g"
		) {
			m["O"].s = "g7";
		} else if (
			m["T"].b["biome"] == "w" && 
			m["E"].b["biome"] == "w" && 
			m["3"].b["biome"] == "g" &&
			m["U"].b["biome"] == "g"
		) {
			m["O"].s = "gr";
		} else {
			m["O"].s = "g";
		}
	} else if (m["O"].b["biome"] == "w") {
		if (
			m["T"].b["biome"] == "g" && 
			m["E"].b["biome"] == "g" && 
			m["3"].b["biome"] == "w" &&
			m["U"].b["biome"] == "w"
		) {
			m["O"].s = "wr";
		} else if (
			m["T"].b["biome"] == "g" && 
			m["E"].b["biome"] == "w" && 
			m["3"].b["biome"] == "g" &&
			m["U"].b["biome"] == "w"
		) {
			m["O"].s = "w7";
		} else if (
			m["T"].b["biome"] == "w" && 
			m["E"].b["biome"] == "g" && 
			m["3"].b["biome"] == "w" &&
			m["U"].b["biome"] == "g"
		) {
			m["O"].s = "wL";
		} else if (
			m["T"].b["biome"] == "w" && 
			m["E"].b["biome"] == "w" && 
			m["3"].b["biome"] == "g" &&
			m["U"].b["biome"] == "g"
		) {
			m["O"].s = "wJ";
		} else if (
			m["T"].b["biome"] == "g" && 
			m["E"].b["biome"] == "w" && 
			m["3"].b["biome"] == "w" &&
			m["U"].b["biome"] == "g"
		) {
			m["O"].s = "wlbns"; // water land bridge north-south
		} else if (
			m["T"].b["biome"] == "w" && 
			m["E"].b["biome"] == "g" && 
			m["3"].b["biome"] == "g" &&
			m["U"].b["biome"] == "w"
		) {
			m["O"].s = "wlbwe"; // water land bridge west-east
		} else if (
			m["T"].b["biome"] == "g" && 
			m["E"].b["biome"] == "g" && 
			m["3"].b["biome"] == "g" &&
			m["U"].b["biome"] == "w"
		) {
			m["O"].s = "wn";
		} else if (
			m["T"].b["biome"] == "g" && 
			m["E"].b["biome"] == "g" && 
			m["3"].b["biome"] == "w" &&
			m["U"].b["biome"] == "g"
		) {
			m["O"].s = "wc";
		} else if (
			m["T"].b["biome"] == "g" && 
			m["E"].b["biome"] == "w" && 
			m["3"].b["biome"] == "g" &&
			m["U"].b["biome"] == "g"
		) {
			m["O"].s = "w3";
		} else if (
			m["T"].b["biome"] == "w" && 
			m["E"].b["biome"] == "g" && 
			m["3"].b["biome"] == "g" &&
			m["U"].b["biome"] == "g"
		) {
			m["O"].s = "wu";
		} else if (
			m["T"].b["biome"] == "g" && 
			m["E"].b["biome"] == "w" && 
			m["3"].b["biome"] == "w" &&
			m["U"].b["biome"] == "w"
		) {
			m["O"].s = "wlhst"; // water lighthouse south tip
		} else if (
			m["T"].b["biome"] == "w" && 
			m["E"].b["biome"] == "g" && 
			m["3"].b["biome"] == "w" &&
			m["U"].b["biome"] == "w"
		) {
			m["O"].s = "wlhet"; // water lighthouse east tip
		} else if (
			m["T"].b["biome"] == "w" && 
			m["E"].b["biome"] == "w" && 
			m["3"].b["biome"] == "g" &&
			m["U"].b["biome"] == "w"
		) {
			m["O"].s = "wlhwt"; // water lighthouse west tip
		} else if (
			m["T"].b["biome"] == "w" && 
			m["E"].b["biome"] == "w" && 
			m["3"].b["biome"] == "w" &&
			m["U"].b["biome"] == "g" &&
			m["L"].b["biome"] == "w" &&
			m["J"].b["biome"] == "w" 
		) {
			m["O"].s = "wlhnt"; // water lighthouse north tip
		} else {
			m["O"].s = "w";
		}
	} else {
		m["O"].s = "x";
	}
	
	/*
	    rr rT TT 
      Er  r  T 
      EE  E  O 
	*/
	// top left chunk
	if (m["r"].b["biome"] == "g") {
		if (
			m["rT"].b["biome"] == "g" && 
			m["Er"].b["biome"] == "g" && 
			m["T"].b["biome"] == "w" &&
			m["E"].b["biome"] == "w"
		) {
			m["r"].s = "gJ";
		} else if (
			m["rT"].b["biome"] == "g" && 
			m["Er"].b["biome"] == "w" && 
			m["T"].b["biome"] == "g" &&
			m["E"].b["biome"] == "w"
		) {
			m["r"].s = "gL";
		} else if (
			m["rT"].b["biome"] == "w" && 
			m["Er"].b["biome"] == "g" && 
			m["T"].b["biome"] == "w" &&
			m["E"].b["biome"] == "g"
		) {
			m["r"].s = "g7";
		} else if (
			m["rT"].b["biome"] == "w" && 
			m["Er"].b["biome"] == "w" && 
			m["T"].b["biome"] == "g" &&
			m["E"].b["biome"] == "g"
		) {
			m["r"].s = "gr";
		} else {
			m["r"].s = "g";
		}
	} else if (m["r"].b["biome"] == "w") {
		if (
			m["rT"].b["biome"] == "g" && 
			m["Er"].b["biome"] == "g" && 
			m["T"].b["biome"] == "w" &&
			m["E"].b["biome"] == "w"
		) {
			m["r"].s = "wr";
		} else if (
			m["rT"].b["biome"] == "g" && 
			m["Er"].b["biome"] == "w" && 
			m["T"].b["biome"] == "g" &&
			m["E"].b["biome"] == "w"
		) {
			m["r"].s = "w7";
		} else if (
			m["rT"].b["biome"] == "w" && 
			m["Er"].b["biome"] == "g" && 
			m["T"].b["biome"] == "w" &&
			m["E"].b["biome"] == "g"
		) {
			m["r"].s = "wL";
		} else if (
			m["rT"].b["biome"] == "w" && 
			m["Er"].b["biome"] == "w" && 
			m["T"].b["biome"] == "g" &&
			m["E"].b["biome"] == "g"
		) {
			m["r"].s = "wJ";
		} else if (
			m["rT"].b["biome"] == "g" && 
			m["Er"].b["biome"] == "w" && 
			m["T"].b["biome"] == "w" &&
			m["E"].b["biome"] == "g"
		) {
			m["r"].s = "wlbns"; // water land bridge north-south
		} else if (
			m["rT"].b["biome"] == "w" && 
			m["Er"].b["biome"] == "g" && 
			m["T"].b["biome"] == "g" &&
			m["E"].b["biome"] == "w"
		) {
			m["r"].s = "wlbwe"; // water land bridge west-east
		} else if (
			m["rT"].b["biome"] == "g" && 
			m["Er"].b["biome"] == "g" && 
			m["T"].b["biome"] == "g" &&
			m["E"].b["biome"] == "w"
		) {
			m["r"].s = "wn";
		} else if (
			m["rT"].b["biome"] == "g" && 
			m["Er"].b["biome"] == "g" && 
			m["T"].b["biome"] == "w" &&
			m["E"].b["biome"] == "g"
		) {
			m["r"].s = "wc";
		} else if (
			m["rT"].b["biome"] == "g" && 
			m["Er"].b["biome"] == "w" && 
			m["T"].b["biome"] == "g" &&
			m["E"].b["biome"] == "g"
		) {
			m["r"].s = "w3";
		} else if (
			m["rT"].b["biome"] == "w" && 
			m["Er"].b["biome"] == "g" && 
			m["T"].b["biome"] == "g" &&
			m["E"].b["biome"] == "g"
		) {
			m["r"].s = "wu";
		} else if (
			m["rT"].b["biome"] == "g" && 
			m["Er"].b["biome"] == "w" && 
			m["T"].b["biome"] == "w" &&
			m["E"].b["biome"] == "w"
		) {
			m["r"].s = "wlhst"; // water lighthouse south tip
		} else if (
			m["rT"].b["biome"] == "w" && 
			m["Er"].b["biome"] == "g" && 
			m["T"].b["biome"] == "w" &&
			m["E"].b["biome"] == "w"
		) {
			m["r"].s = "wlhet"; // water lighthouse east tip
		} else if (
			m["rT"].b["biome"] == "w" && 
			m["Er"].b["biome"] == "w" && 
			m["T"].b["biome"] == "g" &&
			m["E"].b["biome"] == "w"
		) {
			m["r"].s = "wlhwt"; // water lighthouse west tip
		} else if (
			m["rT"].b["biome"] == "w" && 
			m["Er"].b["biome"] == "w" && 
			m["T"].b["biome"] == "w" &&
			m["E"].b["biome"] == "g"
			//m["L"].b["biome"] == "w" &&
			//m["J"].b["biome"] == "w" 
		) {
			m["r"].s = "wlhnt"; // water lighthouse north tip
		} else {
			m["r"].s = "w";
		}
	} else {
		m["r"].s = "x";
	}
	
	/*
	   rT TT T7
      r  T  7
      E  O  3
	*/
	// top chunk
	if (m["T"].b["biome"] == "g") {
		if (
			m["TT"].b["biome"] == "g" && 
			m["r"].b["biome"] == "g" && 
			m["7"].b["biome"] == "w" &&
			m["O"].b["biome"] == "w"
		) {
			m["T"].s = "gJ";
		} else if (
			m["TT"].b["biome"] == "g" && 
			m["r"].b["biome"] == "w" && 
			m["7"].b["biome"] == "g" &&
			m["O"].b["biome"] == "w"
		) {
			m["T"].s = "gL";
		} else if (
			m["TT"].b["biome"] == "w" && 
			m["r"].b["biome"] == "g" && 
			m["7"].b["biome"] == "w" &&
			m["O"].b["biome"] == "g"
		) {
			m["T"].s = "g7";
		} else if (
			m["TT"].b["biome"] == "w" && 
			m["r"].b["biome"] == "w" && 
			m["7"].b["biome"] == "g" &&
			m["O"].b["biome"] == "g"
		) {
			m["T"].s = "gr";
		} else {
			m["T"].s = "g";
		}
	} else if (m["T"].b["biome"] == "w") {
		if (
			m["TT"].b["biome"] == "g" && 
			m["r"].b["biome"] == "g" && 
			m["7"].b["biome"] == "w" &&
			m["O"].b["biome"] == "w"
		) {
			m["T"].s = "wr";
		} else if (
			m["TT"].b["biome"] == "g" && 
			m["r"].b["biome"] == "w" && 
			m["7"].b["biome"] == "g" &&
			m["O"].b["biome"] == "w"
		) {
			m["T"].s = "w7";
		} else if (
			m["TT"].b["biome"] == "w" && 
			m["r"].b["biome"] == "g" && 
			m["7"].b["biome"] == "w" &&
			m["O"].b["biome"] == "g"
		) {
			m["T"].s = "wL";
		} else if (
			m["TT"].b["biome"] == "w" && 
			m["r"].b["biome"] == "w" && 
			m["7"].b["biome"] == "g" &&
			m["O"].b["biome"] == "g"
		) {
			m["T"].s = "wJ";
		} else if (
			m["TT"].b["biome"] == "g" && 
			m["r"].b["biome"] == "w" && 
			m["7"].b["biome"] == "w" &&
			m["O"].b["biome"] == "g"
		) {
			m["T"].s = "wlbns"; // water land bridge north-south
		} else if (
			m["TT"].b["biome"] == "w" && 
			m["r"].b["biome"] == "g" && 
			m["7"].b["biome"] == "g" &&
			m["O"].b["biome"] == "w"
		) {
			m["T"].s = "wlbwe"; // water land bridge west-east
		} else if (
			m["TT"].b["biome"] == "g" && 
			m["r"].b["biome"] == "g" && 
			m["7"].b["biome"] == "g" &&
			m["O"].b["biome"] == "w"
		) {
			m["T"].s = "wn";
		} else if (
			m["TT"].b["biome"] == "g" && 
			m["r"].b["biome"] == "g" && 
			m["7"].b["biome"] == "w" &&
			m["O"].b["biome"] == "g"
		) {
			m["T"].s = "wc";
		} else if (
			m["TT"].b["biome"] == "g" && 
			m["r"].b["biome"] == "w" && 
			m["7"].b["biome"] == "g" &&
			m["O"].b["biome"] == "g"
		) {
			m["T"].s = "w3";
		} else if (
			m["TT"].b["biome"] == "w" && 
			m["r"].b["biome"] == "g" && 
			m["7"].b["biome"] == "g" &&
			m["O"].b["biome"] == "g"
		) {
			m["T"].s = "wu";
		} else if (
			m["TT"].b["biome"] == "g" && 
			m["r"].b["biome"] == "w" && 
			m["7"].b["biome"] == "w" &&
			m["O"].b["biome"] == "w"
		) {
			m["T"].s = "wlhst"; // water lighthouse south tip
		} else if (
			m["TT"].b["biome"] == "w" && 
			m["r"].b["biome"] == "g" && 
			m["7"].b["biome"] == "w" &&
			m["O"].b["biome"] == "w"
		) {
			m["T"].s = "wlhet"; // water lighthouse east tip
		} else if (
			m["TT"].b["biome"] == "w" && 
			m["r"].b["biome"] == "w" && 
			m["7"].b["biome"] == "g" &&
			m["O"].b["biome"] == "w"
		) {
			m["T"].s = "wlhwt"; // water lighthouse west tip
		} else if (
			m["TT"].b["biome"] == "w" && 
			m["r"].b["biome"] == "w" && 
			m["7"].b["biome"] == "w" &&
			m["O"].b["biome"] == "g"
		) {
			m["T"].s = "wlhnt"; // water lighthouse north tip
		} else {
			m["T"].s = "w";
		}
	} else {
		m["T"].s = "x";
	}
	
	/*
      TT T7 77
       T  7 73
       O  3 33
	*/
	// top right chunk
	if (m["7"].b["biome"] == "g") {
		if (
			m["T7"].b["biome"] == "g" && 
			m["T"].b["biome"] == "g" && 
			m["73"].b["biome"] == "w" &&
			m["3"].b["biome"] == "w"
		) {
			m["7"].s = "gJ";
		} else if (
			m["T7"].b["biome"] == "g" && 
			m["T"].b["biome"] == "w" && 
			m["73"].b["biome"] == "g" &&
			m["3"].b["biome"] == "w"
		) {
			m["7"].s = "gL";
		} else if (
			m["T7"].b["biome"] == "w" && 
			m["T"].b["biome"] == "g" && 
			m["73"].b["biome"] == "w" &&
			m["3"].b["biome"] == "g"
		) {
			m["7"].s = "g7";
		} else if (
			m["T7"].b["biome"] == "w" && 
			m["T"].b["biome"] == "w" && 
			m["73"].b["biome"] == "g" &&
			m["3"].b["biome"] == "g"
		) {
			m["7"].s = "gr";
		} else {
			m["7"].s = "g";
		}
	} else if (m["7"].b["biome"] == "w") {
		if (
			m["T7"].b["biome"] == "g" && 
			m["T"].b["biome"] == "g" && 
			m["73"].b["biome"] == "w" &&
			m["3"].b["biome"] == "w"
		) {
			m["7"].s = "wr";
		} else if (
			m["T7"].b["biome"] == "g" && 
			m["T"].b["biome"] == "w" && 
			m["73"].b["biome"] == "g" &&
			m["3"].b["biome"] == "w"
		) {
			m["7"].s = "w7";
		} else if (
			m["T7"].b["biome"] == "w" && 
			m["T"].b["biome"] == "g" && 
			m["73"].b["biome"] == "w" &&
			m["3"].b["biome"] == "g"
		) {
			m["7"].s = "wL";
		} else if (
			m["T7"].b["biome"] == "w" && 
			m["T"].b["biome"] == "w" && 
			m["73"].b["biome"] == "g" &&
			m["3"].b["biome"] == "g"
		) {
			m["7"].s = "wJ";
		} else if (
			m["T7"].b["biome"] == "g" && 
			m["T"].b["biome"] == "w" && 
			m["73"].b["biome"] == "w" &&
			m["3"].b["biome"] == "g"
		) {
			m["7"].s = "wlbns"; // water land bridge north-south
		} else if (
			m["T7"].b["biome"] == "w" && 
			m["T"].b["biome"] == "g" && 
			m["73"].b["biome"] == "g" &&
			m["3"].b["biome"] == "w"
		) {
			m["7"].s = "wlbwe"; // water land bridge west-east
		} else if (
			m["T7"].b["biome"] == "g" && 
			m["T"].b["biome"] == "g" && 
			m["73"].b["biome"] == "g" &&
			m["3"].b["biome"] == "w"
		) {
			m["7"].s = "wn";
		} else if (
			m["T7"].b["biome"] == "g" && 
			m["T"].b["biome"] == "g" && 
			m["73"].b["biome"] == "w" &&
			m["3"].b["biome"] == "g"
		) {
			m["7"].s = "wc";
		} else if (
			m["T7"].b["biome"] == "g" && 
			m["T"].b["biome"] == "w" && 
			m["73"].b["biome"] == "g" &&
			m["3"].b["biome"] == "g"
		) {
			m["7"].s = "w3";
		} else if (
			m["T7"].b["biome"] == "w" && 
			m["T"].b["biome"] == "g" && 
			m["73"].b["biome"] == "g" &&
			m["3"].b["biome"] == "g"
		) {
			m["7"].s = "wu";
		} else if (
			m["T7"].b["biome"] == "g" && 
			m["T"].b["biome"] == "w" && 
			m["73"].b["biome"] == "w" &&
			m["3"].b["biome"] == "w"
		) {
			m["7"].s = "wlhst"; // water lighthouse south tip
		} else if (
			m["T7"].b["biome"] == "w" && 
			m["T"].b["biome"] == "g" && 
			m["73"].b["biome"] == "w" &&
			m["3"].b["biome"] == "w"
		) {
			m["7"].s = "wlhet"; // water lighthouse east tip
		} else if (
			m["T7"].b["biome"] == "w" && 
			m["T"].b["biome"] == "w" && 
			m["73"].b["biome"] == "g" &&
			m["3"].b["biome"] == "w"
		) {
			m["7"].s = "wlhwt"; // water lighthouse west tip
		} else if (
			m["T7"].b["biome"] == "w" && 
			m["T"].b["biome"] == "w" && 
			m["73"].b["biome"] == "w" &&
			m["3"].b["biome"] == "g"
		) {
			m["7"].s = "wlhnt"; // water lighthouse north tip
		} else {
			m["7"].s = "w";
		}
	} else {
		m["7"].s = "x";
	}
	
	/*
     Er  r  T 
     EE  E  O
     EL  L  U 
  */
	// left chunk
	if (m["E"].b["biome"] == "g") {
		if (
			m["r"].b["biome"] == "g" && 
			m["EE"].b["biome"] == "g" && 
			m["O"].b["biome"] == "w" &&
			m["L"].b["biome"] == "w"
		) {
			m["E"].s = "gJ";
		} else if (
			m["r"].b["biome"] == "g" && 
			m["EE"].b["biome"] == "w" && 
			m["O"].b["biome"] == "g" &&
			m["L"].b["biome"] == "w"
		) {
			m["E"].s = "gL";
		} else if (
			m["r"].b["biome"] == "w" && 
			m["EE"].b["biome"] == "g" && 
			m["O"].b["biome"] == "w" &&
			m["L"].b["biome"] == "g"
		) {
			m["E"].s = "g7";
		} else if (
			m["r"].b["biome"] == "w" && 
			m["EE"].b["biome"] == "w" && 
			m["O"].b["biome"] == "g" &&
			m["L"].b["biome"] == "g"
		) {
			m["E"].s = "gr";
		} else {
			m["E"].s = "g";
		}
	} else if (m["E"].b["biome"] == "w") {
		if (
			m["r"].b["biome"] == "g" && 
			m["EE"].b["biome"] == "g" && 
			m["O"].b["biome"] == "w" &&
			m["L"].b["biome"] == "w"
		) {
			m["E"].s = "wr";
		} else if (
			m["r"].b["biome"] == "g" && 
			m["EE"].b["biome"] == "w" && 
			m["O"].b["biome"] == "g" &&
			m["L"].b["biome"] == "w"
		) {
			m["E"].s = "w7";
		} else if (
			m["r"].b["biome"] == "w" && 
			m["EE"].b["biome"] == "g" && 
			m["O"].b["biome"] == "w" &&
			m["L"].b["biome"] == "g"
		) {
			m["E"].s = "wL";
		} else if (
			m["r"].b["biome"] == "w" && 
			m["EE"].b["biome"] == "w" && 
			m["O"].b["biome"] == "g" &&
			m["L"].b["biome"] == "g"
		) {
			m["E"].s = "wJ";
		} else if (
			m["r"].b["biome"] == "g" && 
			m["EE"].b["biome"] == "w" && 
			m["O"].b["biome"] == "w" &&
			m["L"].b["biome"] == "g"
		) {
			m["E"].s = "wlbns"; // water land bridge north-south
		} else if (
			m["r"].b["biome"] == "w" && 
			m["EE"].b["biome"] == "g" && 
			m["O"].b["biome"] == "g" &&
			m["L"].b["biome"] == "w"
		) {
			m["E"].s = "wlbwe"; // water land bridge west-east
		} else if (
			m["r"].b["biome"] == "g" && 
			m["EE"].b["biome"] == "g" && 
			m["O"].b["biome"] == "g" &&
			m["L"].b["biome"] == "w"
		) {
			m["E"].s = "wn";
		} else if (
			m["r"].b["biome"] == "g" && 
			m["EE"].b["biome"] == "g" && 
			m["O"].b["biome"] == "w" &&
			m["L"].b["biome"] == "g"
		) {
			m["O"].s = "wc";
		} else if (
			m["r"].b["biome"] == "g" && 
			m["EE"].b["biome"] == "w" && 
			m["O"].b["biome"] == "g" &&
			m["L"].b["biome"] == "g"
		) {
			m["E"].s = "w3";
		} else if (
			m["r"].b["biome"] == "w" && 
			m["EE"].b["biome"] == "g" && 
			m["O"].b["biome"] == "g" &&
			m["L"].b["biome"] == "g"
		) {
			m["E"].s = "wu";
		} else if (
			m["r"].b["biome"] == "g" && 
			m["EE"].b["biome"] == "w" && 
			m["O"].b["biome"] == "w" &&
			m["L"].b["biome"] == "w"
		) {
			m["E"].s = "wlhst"; // water lighthouse south tip
		} else if (
			m["r"].b["biome"] == "w" && 
			m["EE"].b["biome"] == "g" && 
			m["O"].b["biome"] == "w" &&
			m["L"].b["biome"] == "w"
		) {
			m["E"].s = "wlhet"; // water lighthouse east tip
		} else if (
			m["r"].b["biome"] == "w" && 
			m["EE"].b["biome"] == "w" && 
			m["O"].b["biome"] == "g" &&
			m["L"].b["biome"] == "w"
		) {
			m["E"].s = "wlhwt"; // water lighthouse west tip
		} else if (
			m["r"].b["biome"] == "w" && 
			m["EE"].b["biome"] == "w" && 
			m["O"].b["biome"] == "w" &&
			m["L"].b["biome"] == "g"
		) {
			m["E"].s = "wlhnt"; // water lighthouse north tip
		} else {
			m["E"].s = "w";
		}
	} else {
		m["E"].s = "x";
	}
	
	/* 
       T  7 73
       O  3 33
       U  J J3
	*/
	// right chunk
	if (m["3"].b["biome"] == "g") {
		if (
			m["7"].b["biome"] == "g" && 
			m["O"].b["biome"] == "g" && 
			m["33"].b["biome"] == "w" &&
			m["J"].b["biome"] == "w"
		) {
			m["3"].s = "gJ";
		} else if (
			m["7"].b["biome"] == "g" && 
			m["O"].b["biome"] == "w" && 
			m["33"].b["biome"] == "g" &&
			m["J"].b["biome"] == "w"
		) {
			m["3"].s = "gL";
		} else if (
			m["7"].b["biome"] == "w" && 
			m["O"].b["biome"] == "g" && 
			m["33"].b["biome"] == "w" &&
			m["J"].b["biome"] == "g"
		) {
			m["3"].s = "g7";
		} else if (
			m["7"].b["biome"] == "w" && 
			m["O"].b["biome"] == "w" && 
			m["33"].b["biome"] == "g" &&
			m["J"].b["biome"] == "g"
		) {
			m["3"].s = "gr";
		} else {
			m["3"].s = "g";
		}
	} else if (m["3"].b["biome"] == "w") {
		if (
			m["7"].b["biome"] == "g" && 
			m["O"].b["biome"] == "g" && 
			m["33"].b["biome"] == "w" &&
			m["J"].b["biome"] == "w"
		) {
			m["3"].s = "wr";
		} else if (
			m["7"].b["biome"] == "g" && 
			m["O"].b["biome"] == "w" && 
			m["33"].b["biome"] == "g" &&
			m["J"].b["biome"] == "w"
		) {
			m["3"].s = "w7";
		} else if (
			m["7"].b["biome"] == "w" && 
			m["O"].b["biome"] == "g" && 
			m["33"].b["biome"] == "w" &&
			m["J"].b["biome"] == "g"
		) {
			m["3"].s = "wL";
		} else if (
			m["7"].b["biome"] == "w" && 
			m["O"].b["biome"] == "w" && 
			m["33"].b["biome"] == "g" &&
			m["J"].b["biome"] == "g"
		) {
			m["3"].s = "wJ";
		} else if (
			m["7"].b["biome"] == "g" && 
			m["O"].b["biome"] == "w" && 
			m["33"].b["biome"] == "w" &&
			m["J"].b["biome"] == "g"
		) {
			m["3"].s = "wlbns"; // water land bridge north-south
		} else if (
			m["7"].b["biome"] == "w" && 
			m["O"].b["biome"] == "g" && 
			m["33"].b["biome"] == "g" &&
			m["J"].b["biome"] == "w"
		) {
			m["3"].s = "wlbwe"; // water land bridge west-east
		} else if (
			m["7"].b["biome"] == "g" && 
			m["O"].b["biome"] == "g" && 
			m["33"].b["biome"] == "g" &&
			m["J"].b["biome"] == "w"
		) {
			m["3"].s = "wn";
		} else if (
			m["7"].b["biome"] == "g" && 
			m["O"].b["biome"] == "g" && 
			m["33"].b["biome"] == "w" &&
			m["J"].b["biome"] == "g"
		) {
			m["3"].s = "wc";
		} else if (
			m["7"].b["biome"] == "g" && 
			m["O"].b["biome"] == "w" && 
			m["33"].b["biome"] == "g" &&
			m["J"].b["biome"] == "g"
		) {
			m["3"].s = "w3";
		} else if (
			m["7"].b["biome"] == "w" && 
			m["O"].b["biome"] == "g" && 
			m["33"].b["biome"] == "g" &&
			m["J"].b["biome"] == "g"
		) {
			m["3"].s = "wu";
		} else if (
			m["7"].b["biome"] == "g" && 
			m["O"].b["biome"] == "w" && 
			m["33"].b["biome"] == "w" &&
			m["J"].b["biome"] == "w"
		) {
			m["3"].s = "wlhst"; // water lighthouse south tip
		} else if (
			m["7"].b["biome"] == "w" && 
			m["O"].b["biome"] == "g" && 
			m["33"].b["biome"] == "w" &&
			m["J"].b["biome"] == "w"
		) {
			m["3"].s = "wlhet"; // water lighthouse east tip
		} else if (
			m["7"].b["biome"] == "w" && 
			m["O"].b["biome"] == "w" && 
			m["33"].b["biome"] == "g" &&
			m["J"].b["biome"] == "w"
		) {
			m["3"].s = "wlhwt"; // water lighthouse west tip
		} else if (
			m["7"].b["biome"] == "w" && 
			m["O"].b["biome"] == "w" && 
			m["33"].b["biome"] == "w" &&
			m["J"].b["biome"] == "g"
		) {
			m["3"].s = "wlhnt"; // water lighthouse north tip
		} else {
			m["3"].s = "w";
		}
	} else {
		m["3"].s = "x";
	}
	/*
     EE  E  O
     EL  L  U 
     LL LU UU
	*/
	// bottom left chunk
	if (m["L"].b["biome"] == "g") {
		if (
			m["E"].b["biome"] == "g" && 
			m["EL"].b["biome"] == "g" && 
			m["U"].b["biome"] == "w" &&
			m["LU"].b["biome"] == "w"
		) {
			m["L"].s = "gJ";
		} else if (
			m["E"].b["biome"] == "g" && 
			m["EL"].b["biome"] == "w" && 
			m["U"].b["biome"] == "g" &&
			m["LU"].b["biome"] == "w"
		) {
			m["L"].s = "gL";
		} else if (
			m["E"].b["biome"] == "w" && 
			m["EL"].b["biome"] == "g" && 
			m["U"].b["biome"] == "w" &&
			m["LU"].b["biome"] == "g"
		) {
			m["L"].s = "g7";
		} else if (
			m["E"].b["biome"] == "w" && 
			m["EL"].b["biome"] == "w" && 
			m["U"].b["biome"] == "g" &&
			m["LU"].b["biome"] == "g"
		) {
			m["L"].s = "gr";
		} else {
			m["L"].s = "g";
		}
	} else if (m["L"].b["biome"] == "w") {
		if (
			m["E"].b["biome"] == "g" && 
			m["EL"].b["biome"] == "g" && 
			m["U"].b["biome"] == "w" &&
			m["LU"].b["biome"] == "w"
		) {
			m["L"].s = "wr";
		} else if (
			m["E"].b["biome"] == "g" && 
			m["EL"].b["biome"] == "w" && 
			m["U"].b["biome"] == "g" &&
			m["LU"].b["biome"] == "w"
		) {
			m["L"].s = "w7";
		} else if (
			m["E"].b["biome"] == "w" && 
			m["EL"].b["biome"] == "g" && 
			m["U"].b["biome"] == "w" &&
			m["LU"].b["biome"] == "g"
		) {
			m["L"].s = "wL";
		} else if (
			m["E"].b["biome"] == "w" && 
			m["EL"].b["biome"] == "w" && 
			m["U"].b["biome"] == "g" &&
			m["LU"].b["biome"] == "g"
		) {
			m["L"].s = "wJ";
		} else if (
			m["E"].b["biome"] == "g" && 
			m["EL"].b["biome"] == "w" && 
			m["U"].b["biome"] == "w" &&
			m["LU"].b["biome"] == "g"
		) {
			m["L"].s = "wlbns"; // water land bridge north-south
		} else if (
			m["E"].b["biome"] == "w" && 
			m["EL"].b["biome"] == "g" && 
			m["U"].b["biome"] == "g" &&
			m["LU"].b["biome"] == "w"
		) {
			m["L"].s = "wlbwe"; // water land bridge west-east
		} else if (
			m["E"].b["biome"] == "g" && 
			m["EL"].b["biome"] == "g" && 
			m["U"].b["biome"] == "g" &&
			m["LU"].b["biome"] == "w"
		) {
			m["O"].s = "wn";
		} else if (
			m["E"].b["biome"] == "g" && 
			m["EL"].b["biome"] == "g" && 
			m["U"].b["biome"] == "w" &&
			m["LU"].b["biome"] == "g"
		) {
			m["L"].s = "wc";
		} else if (
			m["E"].b["biome"] == "g" && 
			m["EL"].b["biome"] == "w" && 
			m["U"].b["biome"] == "g" &&
			m["LU"].b["biome"] == "g"
		) {
			m["L"].s = "w3";
		} else if (
			m["E"].b["biome"] == "w" && 
			m["EL"].b["biome"] == "g" && 
			m["U"].b["biome"] == "g" &&
			m["LU"].b["biome"] == "g"
		) {
			m["L"].s = "wu";
		} else if (
			m["E"].b["biome"] == "g" && 
			m["EL"].b["biome"] == "w" && 
			m["U"].b["biome"] == "w" &&
			m["LU"].b["biome"] == "w"
		) {
			m["L"].s = "wlhst"; // water lighthouse south tip
		} else if (
			m["E"].b["biome"] == "w" && 
			m["EL"].b["biome"] == "g" && 
			m["U"].b["biome"] == "w" &&
			m["LU"].b["biome"] == "w"
		) {
			m["L"].s = "wlhet"; // water lighthouse east tip
		} else if (
			m["E"].b["biome"] == "w" && 
			m["EL"].b["biome"] == "w" && 
			m["U"].b["biome"] == "g" &&
			m["LU"].b["biome"] == "w"
		) {
			m["L"].s = "wlhwt"; // water lighthouse west tip
		} else if (
			m["E"].b["biome"] == "w" && 
			m["EL"].b["biome"] == "w" && 
			m["U"].b["biome"] == "w" &&
			m["LU"].b["biome"] == "g"
		) {
			m["L"].s = "wlhnt"; // water lighthouse north tip
		} else {
			m["L"].s = "w";
		}
	} else {
		m["L"].s = "x";
	}
	
	/*
     E  O  3
     L  U  J
     LU UU UJ
	*/
	// bottom chunk
	if (m["U"].b["biome"] == "g") {
		if (
			m["O"].b["biome"] == "g" && 
			m["L"].b["biome"] == "g" && 
			m["J"].b["biome"] == "w" &&
			m["UU"].b["biome"] == "w"
		) {
			m["U"].s = "gJ";
		} else if (
			m["O"].b["biome"] == "g" && 
			m["L"].b["biome"] == "w" && 
			m["J"].b["biome"] == "g" &&
			m["UU"].b["biome"] == "w"
		) {
			m["U"].s = "gL";
		} else if (
			m["O"].b["biome"] == "w" && 
			m["L"].b["biome"] == "g" && 
			m["J"].b["biome"] == "w" &&
			m["UU"].b["biome"] == "g"
		) {
			m["U"].s = "g7";
		} else if (
			m["O"].b["biome"] == "w" && 
			m["L"].b["biome"] == "w" && 
			m["J"].b["biome"] == "g" &&
			m["UU"].b["biome"] == "g"
		) {
			m["U"].s = "gr";
		} else {
			m["U"].s = "g";
		}
	} else if (m["U"].b["biome"] == "w") {
		if (
			m["O"].b["biome"] == "g" && 
			m["L"].b["biome"] == "g" && 
			m["J"].b["biome"] == "w" &&
			m["UU"].b["biome"] == "w"
		) {
			m["U"].s = "wr";
		} else if (
			m["O"].b["biome"] == "g" && 
			m["L"].b["biome"] == "w" && 
			m["J"].b["biome"] == "g" &&
			m["UU"].b["biome"] == "w"
		) {
			m["U"].s = "w7";
		} else if (
			m["O"].b["biome"] == "w" && 
			m["L"].b["biome"] == "g" && 
			m["J"].b["biome"] == "w" &&
			m["UU"].b["biome"] == "g"
		) {
			m["U"].s = "wL";
		} else if (
			m["O"].b["biome"] == "w" && 
			m["L"].b["biome"] == "w" && 
			m["J"].b["biome"] == "g" &&
			m["UU"].b["biome"] == "g"
		) {
			m["U"].s = "wJ";
		} else if (
			m["O"].b["biome"] == "g" && 
			m["L"].b["biome"] == "w" && 
			m["J"].b["biome"] == "w" &&
			m["UU"].b["biome"] == "g"
		) {
			m["U"].s = "wlbns"; // water land bridge north-south
		} else if (
			m["O"].b["biome"] == "w" && 
			m["L"].b["biome"] == "g" && 
			m["J"].b["biome"] == "g" &&
			m["UU"].b["biome"] == "w"
		) {
			m["U"].s = "wlbwe"; // water land bridge west-east
		} else if (
			m["O"].b["biome"] == "g" && 
			m["L"].b["biome"] == "g" && 
			m["J"].b["biome"] == "g" &&
			m["UU"].b["biome"] == "w"
		) {
			m["U"].s = "wn";
		} else if (
			m["O"].b["biome"] == "g" && 
			m["L"].b["biome"] == "g" && 
			m["J"].b["biome"] == "w" &&
			m["UU"].b["biome"] == "g"
		) {
			m["U"].s = "wc";
		} else if (
			m["O"].b["biome"] == "g" && 
			m["L"].b["biome"] == "w" && 
			m["J"].b["biome"] == "g" &&
			m["UU"].b["biome"] == "g"
		) {
			m["U"].s = "w3";
		} else if (
			m["O"].b["biome"] == "w" && 
			m["L"].b["biome"] == "g" && 
			m["J"].b["biome"] == "g" &&
			m["UU"].b["biome"] == "g"
		) {
			m["U"].s = "wu";
		} else if (
			m["O"].b["biome"] == "g" && 
			m["L"].b["biome"] == "w" && 
			m["J"].b["biome"] == "w" &&
			m["UU"].b["biome"] == "w"
		) {
			m["U"].s = "wlhst"; // water lighthouse south tip
		} else if (
			m["O"].b["biome"] == "w" && 
			m["L"].b["biome"] == "g" && 
			m["J"].b["biome"] == "w" &&
			m["UU"].b["biome"] == "w"
		) {
			m["U"].s = "wlhet"; // water lighthouse east tip
		} else if (
			m["O"].b["biome"] == "w" && 
			m["L"].b["biome"] == "w" && 
			m["J"].b["biome"] == "g" &&
			m["UU"].b["biome"] == "w"
		) {
			m["U"].s = "wlhwt"; // water lighthouse west tip
		} else if (
			m["O"].b["biome"] == "w" && 
			m["L"].b["biome"] == "w" && 
			m["J"].b["biome"] == "w" &&
			m["UU"].b["biome"] == "g"
		) {
			m["U"].s = "wlhnt"; // water lighthouse north tip
		} else {
			m["U"].s = "w";
		}
	} else {
		m["U"].s = "x";
	}
	
	/*
     O  3 33
     U  J J3
    UU UJ JJ 
	*/
	// bottom right chunk
	if (m["J"].b["biome"] == "g") {
		if (
			m["3"].b["biome"] == "g" && 
			m["U"].b["biome"] == "g" && 
			m["J3"].b["biome"] == "w" &&
			m["UJ"].b["biome"] == "w"
		) {
			m["J"].s = "gJ";
		} else if (
			m["3"].b["biome"] == "g" && 
			m["U"].b["biome"] == "w" && 
			m["J3"].b["biome"] == "g" &&
			m["UJ"].b["biome"] == "w"
		) {
			m["J"].s = "gL";
		} else if (
			m["3"].b["biome"] == "w" && 
			m["U"].b["biome"] == "g" && 
			m["J3"].b["biome"] == "w" &&
			m["UJ"].b["biome"] == "g"
		) {
			m["J"].s = "g7";
		} else if (
			m["3"].b["biome"] == "w" && 
			m["U"].b["biome"] == "w" && 
			m["J3"].b["biome"] == "g" &&
			m["UJ"].b["biome"] == "g"
		) {
			m["J"].s = "gr";
		} else {
			m["J"].s = "g";
		}
	} else if (m["J"].b["biome"] == "w") {
		if (
			m["3"].b["biome"] == "g" && 
			m["U"].b["biome"] == "g" && 
			m["J3"].b["biome"] == "w" &&
			m["UJ"].b["biome"] == "w"
		) {
			m["J"].s = "wr";
		} else if (
			m["3"].b["biome"] == "g" && 
			m["U"].b["biome"] == "w" && 
			m["J3"].b["biome"] == "g" &&
			m["UJ"].b["biome"] == "w"
		) {
			m["J"].s = "w7";
		} else if (
			m["3"].b["biome"] == "w" && 
			m["U"].b["biome"] == "g" && 
			m["J3"].b["biome"] == "w" &&
			m["UJ"].b["biome"] == "g"
		) {
			m["J"].s = "wL";
		} else if (
			m["3"].b["biome"] == "w" && 
			m["U"].b["biome"] == "w" && 
			m["J3"].b["biome"] == "g" &&
			m["UJ"].b["biome"] == "g"
		) {
			m["J"].s = "wJ";
		} else if (
			m["3"].b["biome"] == "g" && 
			m["U"].b["biome"] == "w" && 
			m["J3"].b["biome"] == "w" &&
			m["UJ"].b["biome"] == "g"
		) {
			m["J"].s = "wlbns"; // water land bridge north-south
		} else if (
			m["3"].b["biome"] == "w" && 
			m["U"].b["biome"] == "g" && 
			m["J3"].b["biome"] == "g" &&
			m["UJ"].b["biome"] == "w"
		) {
			m["J"].s = "wlbwe"; // water land bridge west-east
		} else if (
			m["3"].b["biome"] == "g" && 
			m["U"].b["biome"] == "g" && 
			m["J3"].b["biome"] == "g" &&
			m["UJ"].b["biome"] == "w"
		) {
			m["J"].s = "wn";
		} else if (
			m["3"].b["biome"] == "g" && 
			m["U"].b["biome"] == "g" && 
			m["J3"].b["biome"] == "w" &&
			m["UJ"].b["biome"] == "g"
		) {
			m["J"].s = "wc";
		} else if (
			m["3"].b["biome"] == "g" && 
			m["U"].b["biome"] == "w" && 
			m["J3"].b["biome"] == "g" &&
			m["UJ"].b["biome"] == "g"
		) {
			m["J"].s = "w3";
		} else if (
			m["3"].b["biome"] == "w" && 
			m["U"].b["biome"] == "g" && 
			m["J3"].b["biome"] == "g" &&
			m["UJ"].b["biome"] == "g"
		) {
			m["J"].s = "wu";
		} else if (
			m["3"].b["biome"] == "g" && 
			m["U"].b["biome"] == "w" && 
			m["J3"].b["biome"] == "w" &&
			m["UJ"].b["biome"] == "w"
		) {
			m["J"].s = "wlhst"; // water lighthouse south tip
		} else if (
			m["3"].b["biome"] == "w" && 
			m["U"].b["biome"] == "g" && 
			m["J3"].b["biome"] == "w" &&
			m["UJ"].b["biome"] == "w"
		) {
			m["J"].s = "wlhet"; // water lighthouse east tip
		} else if (
			m["3"].b["biome"] == "w" && 
			m["U"].b["biome"] == "w" && 
			m["J3"].b["biome"] == "g" &&
			m["UJ"].b["biome"] == "w"
		) {
			m["J"].s = "wlhwt"; // water lighthouse west tip
		} else if (
			m["3"].b["biome"] == "w" && 
			m["U"].b["biome"] == "w" && 
			m["J3"].b["biome"] == "w" &&
			m["UJ"].b["biome"] == "g"
		) {
			m["J"].s = "wlhnt"; // water lighthouse north tip
		} else {
			m["J"].s = "w";
		}
	} else {
		m["J"].s = "x";
	}
	
}

/*

shape based on land:
gr       g7
    __    __
	 /  |  |  \
  |___|  |___|
   ___    ___
	|   |  |   |
   \__|  |__/

gL       gJ

shape also based on land:
wJ       wL
    _    _
	 / |  | \
  /__|  |__\
  ___    ___
	\  |  |  /
   \_|  |_/

w7       wr


*/












// ------- for testing DONT NEED -------- 
/*
testPlacePlatforms(area_index) {
	
	
	
	let area = this.areas[area_index];
	
	
	
	
	//let testA = [...Array(5)].map(_ => Array(2).fill(0));
	//console.log(testA);
	//console.log("myStruct.length: "+myStruct_img.length+" myStruct[0].length: "+myStruct_img[0].length);
	
	let myStruct_img = [...Array(area["height"])].map(_ => Array(area["width"]+2).fill(0));
	let myStruct_grid = [...Array(area["height"])].map(_ => Array(area["width"]+2).fill(0));
	
	// connect a chain of pnodes together
	let ground_tile = new pnode(240);
	let prev_ground_tile = ground_tile;
	for (let i=0; i<7*area["width"]; i++) {
	  let new_ground_tile = new pnode(39);//+(i%2));
		let next_x = rnd(1,4);
		let next_y = rnd(-2, 3);
	  prev_ground_tile.setNext(new_ground_tile, next_x, next_y);
	  prev_ground_tile = new_ground_tile;
	}
	
	// 
	let temp = ground_tile;
	let x_ = 0;
	let y_ = area["height"]-7;
	
	while (temp.hasNext()) {
		let rw = rnd(1, 10); // each platform is a random width
		let rh = rnd(1, 3); // each platform is a random height
		
		// could have other 'artifacts' on top of the platform too
		for (let j=0; j<rh; j++) {
			for (let i=0; i<rw; i++) {
				
				if (x_+i < area["width"] && y_+j < area["height"]) {
					if (x_+i == 0) {
						console.log("got edge");
					}
					this.dot_(myStruct_img, x_+i, y_+j);
				} else {
				}
			}
		}
		
	  x_ += temp.next_gap;
	  y_ += temp.next_height;
	  temp = temp.next_pnode;

	}
	this.placeStructure(myStruct_img, area, -1);
	//console.log("x: "+x_+" width:"+area["width"]);
	//console.log("grid value: "+area["grid"][y_+j][x_+i]+"   "+x_+" "+y_+" "+i+" "+j+" "+(x_+i)+" "+(y_+j)+" "+area["width"]+" "+area["height"]);
	/*if (area["grid"][y_+j][x_+i] === 0) { // don't paste over edge
	//if (myStruct_grid[y_][x_] <= 9){ // don't paste over edge
		//area["grid"][y_+j][x_+i] = 1;
		//myStruct_grid[y_][x_] = 1;
		//console.log((x_+i)+" "+(y_+j));
		
	}
	
	
	//area["image"].set(x_, y_, temp.ptype); // ***** USE DOT *****
	
	
	
	
	
	
	
}


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






/*
console.log("--------------------------------------------------\n");
for (let y=0; y<16; y++) {
	let string_ = "";
	for (let x=0; x<16; x++) {
		if (cake[y][x] === 0) {
			string_ += "  0";
		} else if (cake[y][x] < 0){
			string_ += cake[y][x];
		} else {
			string_ += " "+cake[y][x];
		}
	}
	console.log(string_);
}/**/







/*
function mountain_cliff_top(seed) {
	let iR = 0;
	var chunk = [...Array(16)].map(_ => Array(16).fill(0));
	
	let N = 50;
	
	for (let i=0; i<N; i++) {
		let rx = Math.floor(seed[iR]*(16));
		iR = iR >= seed.length-1 ? 0 : iR+1;
		let ry = Math.floor(seed[iR]*(16));
		iR = iR >= seed.length-1 ? 0 : iR+1;
		
		chunk[ry][rx] = 60;
	}
	
	return chunk;
}


// only works with the cake layered mountain
export function mountain_smear(seed, b2, bvi) {
	
	let iR = 0;
	let height = 0;
	var cake = [...Array(16)].map(_ => Array(16).fill(0));
	
	let heights = [0, 61, 62, 63, 64];//, 65, 66, 67];
	let r = 1 + Math.floor(seed[iR]*(heights.length-0));
	iR = iR >= seed.length-1 ? 0 : iR+1;
	let lane_width = 1 + Math.floor(seed[iR]*(2-0));
	iR = iR >= seed.length-1 ? 0 : iR+1;
	
	let h = r;
	let last_bottom_height = h;
	
	for (let x=0; x<16; x+=lane_width) {
		
		
		for (let y=15; y>=0; y--) {
			if (y == 15) {
				h = last_bottom_height;
			}
			
			r = -1 + Math.floor(seed[iR]*(7-0));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			
			
			if (r < 0) { // lower mountain
				r = 1 + Math.floor(seed[iR]*(h-0));
				iR = iR >= seed.length-1 ? 0 : iR+1;
				h -= r;
				if (h <= 0) {
					h = 0;
				}
				
			} else if (r === 0) { // raise mountain
				h++;
				if (h >= heights.length-1) {
					h = heights.length-1;
				}
				
				for (let lw=0; lw<lane_width; lw++){
					try { cake[y][x+lw] = -heights[h]; } catch {}
				}				
				
			} else { // same level
				for (let lw=0; lw<lane_width; lw++){
				  try { cake[y][x+lw] = heights[h]; } catch {}
				}
				
			}
			
		}
		
		lane_width = 1 + Math.floor(seed[iR]*(2-0));
		iR = iR >= seed.length-1 ? 0 : iR+1;
		
	}
	
	
	
	return cake;
	
}








export function mountain_layers(seed, b2, bvi) {
	
	let iR = 0;
	let height = 0;
	var cake = [...Array(16)].map(_ => Array(16).fill(0));
	//cake[8][8] = 60;
	
	
	for (let h=0; h<5; h++) {
		height++;
		
		let N = 60;
		for (let n=0; n<N; n++) {
			let rx = 0+Math.floor(seed[iR]*(16));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			let ry = 0+Math.floor(seed[iR]*(16));
			iR = iR >= seed.length-1 ? 0 : iR+1;
		
			if (cake[ry][rx] === height-1) {
			  cake[ry][rx] = height;
			}
		
			try {
				if (cake[ry][rx+1] === height-1) {
					cake[ry][rx+1] = height;
				}
			} catch {}
			try { 
				if (cake[ry+1][rx] === height-1) {
				  cake[ry+1][rx] = height; 
				}
			} catch {}
			try { 
				if (cake[ry+1][rx+1] === height-1) {
					cake[ry+1][rx+1] = height;
				}
			} catch {}
		
		}
		
		N = 0;
	
		for (let n=0; n<N; n++) {
			let rx = Math.floor(seed[iR]*(16));
			iR = iR >= seed.length-1 ? 0 : iR+1;
			let ry = Math.floor(seed[iR]*(16));
			iR = iR >= seed.length-1 ? 0 : iR+1;
		
			if (cake[ry][rx] === height-1) {
			  cake[ry][rx] = height;
			}
		}
	}
	
	
	for (let y=0; y<16; y++) {
		for (let x=0; x<16; x++) {
			if (cake[y][x]) {
				cake[y][x] += 60;
			}
		}
	}
	
	return cake;
	
}
/**/

/*

		switch (biome) {
			
			case "f":
				//console.log("fff");
				if (
					m[ DIR[cid].up ].b["biome"] == "f" && 
					m[ DIR[cid].left ].b["biome"] == "f" && 
					m[ DIR[cid].right ].b["biome"] !== "f" &&
					m[ DIR[cid].down ].b["biome"] !== "f"
				) {
					m[cid].s = "fJ";
				} else if (
					m[ DIR[cid].up ].b["biome"] == "f" && 
					m[ DIR[cid].left ].b["biome"] !== "f" && 
					m[ DIR[cid].right ].b["biome"] == "f" &&
					m[ DIR[cid].down ].b["biome"] !== "f"
				) {
					m[cid].s = "fL";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "f" && 
					m[ DIR[cid].left ].b["biome"] == "f" && 
					m[ DIR[cid].right ].b["biome"] !== "f" &&
					m[ DIR[cid].down ].b["biome"] == "f"
				) {
					m[cid].s = "f7";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "f" && 
					m[ DIR[cid].left ].b["biome"] !== "f" && 
					m[ DIR[cid].right ].b["biome"] == "f" &&
					m[ DIR[cid].down ].b["biome"] == "f"
				) {
					m[cid].s = "fr";
				} else if (
					m[ DIR[cid].up ].b["biome"] == "f" && 
					m[ DIR[cid].left ].b["biome"] !== "f" && 
					m[ DIR[cid].right ].b["biome"] !== "f" &&
					m[ DIR[cid].down ].b["biome"] !== "f"
				) {
					m[cid].s = "fu";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "f" && 
					m[ DIR[cid].left ].b["biome"] == "f" && 
					m[ DIR[cid].right ].b["biome"] !== "f" &&
					m[ DIR[cid].down ].b["biome"] !== "f"
				) {
					m[cid].s = "f3";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "f" && 
					m[ DIR[cid].left ].b["biome"] !== "f" && 
					m[ DIR[cid].right ].b["biome"] == "f" &&
					m[ DIR[cid].down ].b["biome"] !== "f"
				) {
					m[cid].s = "fc";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "f" && 
					m[ DIR[cid].left ].b["biome"] !== "f" && 
					m[ DIR[cid].right ].b["biome"] !== "f" &&
					m[ DIR[cid].down ].b["biome"] == "f"
				) {
					m[cid].s = "fn";
				} else {
					m[cid].s = "f";
				}
				break;
			
			case "m":
				//console.log("get chunk shape m");
				/*
				need all edge cases, so we know where the mountain ends
				
				
				
				
				
				
				/*
				
				
				if (
					m[ DIR[cid].up ].b["biome"] == "m" && 
					m[ DIR[cid].left ].b["biome"] == "m" && 
					m[ DIR[cid].right ].b["biome"] == "m" &&
					m[ DIR[cid].down ].b["biome"] == "m"
				) {
					m[cid].s = "M";
				}
				/*
				if (
					m[ DIR[cid].up ].b["biome"] == "m" && 
					m[ DIR[cid].left ].b["biome"] == "m" && 
					m[ DIR[cid].right ].b["biome"] !== "m" &&
					m[ DIR[cid].down ].b["biome"] !== "m"
				) {
					m[cid].s = "mJ";
				} else if (
					m[ DIR[cid].up ].b["biome"] == "m" && 
					m[ DIR[cid].left ].b["biome"] !== "m" && 
					m[ DIR[cid].right ].b["biome"] == "m" &&
					m[ DIR[cid].down ].b["biome"] !== "m"
				) {
					m[cid].s = "mL";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "m" && 
					m[ DIR[cid].left ].b["biome"] == "m" && 
					m[ DIR[cid].right ].b["biome"] !== "m" &&
					m[ DIR[cid].down ].b["biome"] == "m"
				) {
					m[cid].s = "m7";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "m" && 
					m[ DIR[cid].left ].b["biome"] !== "m" && 
					m[ DIR[cid].right ].b["biome"] == "m" &&
					m[ DIR[cid].down ].b["biome"] == "m"
				) {
					m[cid].s = "mr";
				} else if (
					m[ DIR[cid].up ].b["biome"] == "m" && 
					m[ DIR[cid].left ].b["biome"] !== "m" && 
					m[ DIR[cid].right ].b["biome"] !== "m" &&
					m[ DIR[cid].down ].b["biome"] !== "m"
				) {
					m[cid].s = "mu";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "m" && 
					m[ DIR[cid].left ].b["biome"] == "m" && 
					m[ DIR[cid].right ].b["biome"] !== "m" &&
					m[ DIR[cid].down ].b["biome"] !== "m"
				) {
					m[cid].s = "m3";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "m" && 
					m[ DIR[cid].left ].b["biome"] !== "m" && 
					m[ DIR[cid].right ].b["biome"] == "m" &&
					m[ DIR[cid].down ].b["biome"] !== "m"
				) {
					m[cid].s = "mc";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "m" && 
					m[ DIR[cid].left ].b["biome"] !== "m" && 
					m[ DIR[cid].right ].b["biome"] !== "m" &&
					m[ DIR[cid].down ].b["biome"] == "m"
				) {
					m[cid].s = "mn";
				} else {
					m[cid].s = "m";
				}
				
				break;
			case "d":
				if (
					m[ DIR[cid].up ].b["biome"] == "d" && 
					m[ DIR[cid].left ].b["biome"] == "d" && 
					m[ DIR[cid].right ].b["biome"] !== "d" &&
					m[ DIR[cid].down ].b["biome"] !== "d"
				) {
					m[cid].s = "dJ";
				} else if (
					m[ DIR[cid].up ].b["biome"] == "d" && 
					m[ DIR[cid].left ].b["biome"] !== "d" && 
					m[ DIR[cid].right ].b["biome"] == "d" &&
					m[ DIR[cid].down ].b["biome"] !== "d"
				) {
					m[cid].s = "dL";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "d" && 
					m[ DIR[cid].left ].b["biome"] == "d" && 
					m[ DIR[cid].right ].b["biome"] !== "d" &&
					m[ DIR[cid].down ].b["biome"] == "d"
				) {
					m[cid].s = "d7";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "d" && 
					m[ DIR[cid].left ].b["biome"] !== "d" && 
					m[ DIR[cid].right ].b["biome"] == "d" &&
					m[ DIR[cid].down ].b["biome"] == "d"
				) {
					m[cid].s = "dr";
				} else if (
					m[ DIR[cid].up ].b["biome"] == "d" && 
					m[ DIR[cid].left ].b["biome"] !== "d" && 
					m[ DIR[cid].right ].b["biome"] !== "d" &&
					m[ DIR[cid].down ].b["biome"] !== "d"
				) {
					m[cid].s = "du";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "d" && 
					m[ DIR[cid].left ].b["biome"] == "d" && 
					m[ DIR[cid].right ].b["biome"] !== "d" &&
					m[ DIR[cid].down ].b["biome"] !== "d"
				) {
					m[cid].s = "d3";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "d" && 
					m[ DIR[cid].left ].b["biome"] !== "d" && 
					m[ DIR[cid].right ].b["biome"] == "d" &&
					m[ DIR[cid].down ].b["biome"] !== "d"
				) {
					m[cid].s = "dc";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "d" && 
					m[ DIR[cid].left ].b["biome"] !== "d" && 
					m[ DIR[cid].right ].b["biome"] !== "d" &&
					m[ DIR[cid].down ].b["biome"] == "d"
				) {
					m[cid].s = "dn";
				} else {
					m[cid].s = "d";
				}
				break;
				
			case "F":
				if (
					m[ DIR[cid].up ].b["biome"] == "F" && 
					m[ DIR[cid].left ].b["biome"] == "F" && 
					m[ DIR[cid].right ].b["biome"] !== "F" &&
					m[ DIR[cid].down ].b["biome"] !== "F"
				) {
					m[cid].s = "FJ";
				} else if (
					m[ DIR[cid].up ].b["biome"] == "d" && 
					m[ DIR[cid].left ].b["biome"] !== "d" && 
					m[ DIR[cid].right ].b["biome"] == "d" &&
					m[ DIR[cid].down ].b["biome"] !== "d"
				) {
					m[cid].s = "FL";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "F" && 
					m[ DIR[cid].left ].b["biome"] == "F" && 
					m[ DIR[cid].right ].b["biome"] !== "F" &&
					m[ DIR[cid].down ].b["biome"] == "F"
				) {
					m[cid].s = "F7";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "F" && 
					m[ DIR[cid].left ].b["biome"] !== "F" && 
					m[ DIR[cid].right ].b["biome"] == "F" &&
					m[ DIR[cid].down ].b["biome"] == "F"
				) {
					m[cid].s = "Fr";
				} else if (
					m[ DIR[cid].up ].b["biome"] == "F" && 
					m[ DIR[cid].left ].b["biome"] !== "F" && 
					m[ DIR[cid].right ].b["biome"] !== "F" &&
					m[ DIR[cid].down ].b["biome"] !== "F"
				) {
					m[cid].s = "Fu";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "F" && 
					m[ DIR[cid].left ].b["biome"] == "F" && 
					m[ DIR[cid].right ].b["biome"] !== "F" &&
					m[ DIR[cid].down ].b["biome"] !== "F"
				) {
					m[cid].s = "F3";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "F" && 
					m[ DIR[cid].left ].b["biome"] !== "F" && 
					m[ DIR[cid].right ].b["biome"] == "F" &&
					m[ DIR[cid].down ].b["biome"] !== "F"
				) {
					m[cid].s = "Fc";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "F" && 
					m[ DIR[cid].left ].b["biome"] !== "F" && 
					m[ DIR[cid].right ].b["biome"] !== "F" &&
					m[ DIR[cid].down ].b["biome"] == "F"
				) {
					m[cid].s = "Fn";
				} else {
					m[cid].s = "F";
				}
				break;
			case "g":
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
				break;
			case "w":
				if (
					m[ DIR[cid].up ].b["biome"] !== "w" && 
					m[ DIR[cid].left ].b["biome"] !== "w" && 
					m[ DIR[cid].right ].b["biome"] == "w" &&
					m[ DIR[cid].down ].b["biome"] == "w"
				) {
					m[cid].s = "wr";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "w" && 
					m[ DIR[cid].left ].b["biome"] == "w" && 
					m[ DIR[cid].right ].b["biome"] !== "w" &&
					m[ DIR[cid].down ].b["biome"] == "w"
				) {
					m[cid].s = "w7";
				} else if (
					m[ DIR[cid].up ].b["biome"] == "w" && 
					m[ DIR[cid].left ].b["biome"] !== "w" && 
					m[ DIR[cid].right ].b["biome"] == "w" &&
					m[ DIR[cid].down ].b["biome"] !== "w"
				) {
					m[cid].s = "wL";
				} else if (
					m[ DIR[cid].up ].b["biome"] == "w" && 
					m[ DIR[cid].left ].b["biome"] == "w" && 
					m[ DIR[cid].right ].b["biome"] !== "w" &&
					m[ DIR[cid].down ].b["biome"] !== "w"
				) {
					m[cid].s = "wJ";
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
					console.log("wc being created");
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
			
				break;
			default:
				m[cid].s = "x";
		
		} // end switch

/**/