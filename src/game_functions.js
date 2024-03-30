import { dot_order } from "./objects.js";

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
			return [xo, yo];
		});
		
		return xys;
		
	}
	
	return 0;
}



function get_biome_value(x_,y_,res) {
	let N = 15*res;
	
	let dxs = [...Array(N)].map((n,i) => i*2+N*100 );
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
	
	
	
	
	return {
		"biome": biome,
		"difficulty": difficulty,
		"color": color,
		"special": xyo,
	};
	
	
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

export function get_chunk_shapes(m) {
	
	
	
	for (let i=0; i<CHUNK_ITER.length; i++) {
		let cid = CHUNK_ITER[i];
		let biome = m[cid].b["biome"];
		
		switch (biome) {
			case "f":
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
				if (
					m[ DIR[cid].up ].b["biome"] == "g" && 
					m[ DIR[cid].left ].b["biome"] == "g" && 
					m[ DIR[cid].right ].b["biome"] == "w" &&
					m[ DIR[cid].down ].b["biome"] == "w" &&
					m[ DIR[cid].dRight ].b["biome"] == "w"
				) {
					m[cid].s = "gJ";
				} else if (
					m[ DIR[cid].up ].b["biome"] !== "w" && 
					m[ DIR[cid].left ].b["biome"] == "w" && 
					m[ DIR[cid].right ].b["biome"] == "w" &&
					m[ DIR[cid].down ].b["biome"] == "w" //&&
					//m[ DIR[cid].dLeft ].b["biome"] == "w" &&
					//m[ DIR[cid].dRight ].b["biome"] !== "w"
				) {
					m[cid].s = "gL";
				} else if (
					m[ DIR[cid].up ].b["biome"] == "w" && 
					m[ DIR[cid].left ].b["biome"] == "g" && 
					m[ DIR[cid].right ].b["biome"] == "w" &&
					m[ DIR[cid].down ].b["biome"] == "g" &&
					m[ DIR[cid].uRight ].b["biome"] == "w"
				) {
					m[cid].s = "g7";
				} else if (
					m[ DIR[cid].up ].b["biome"] == "w" && 
					m[ DIR[cid].left ].b["biome"] == "w" && 
					m[ DIR[cid].right ].b["biome"] == "g" &&
					m[ DIR[cid].down ].b["biome"] == "g" &&
					m[ DIR[cid].uLeft ].b["biome"] == "w"
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
					m[ DIR[cid].down ].b["biome"] !== "w"
				) {
					m[cid].s = "wlbns"; // water land bridge north-south
				} else if (
					m[ DIR[cid].up ].b["biome"] == "w" && 
					m[ DIR[cid].left ].b["biome"] !== "w" && 
					m[ DIR[cid].right ].b["biome"] !== "w" &&
					m[ DIR[cid].down ].b["biome"] == "w"
				) {
					m[cid].s = "wlbwe"; // water land bridge west-east
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
					m[ DIR[cid].right ].b["biome"] == "w" &&
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
				} else {
					m[cid].s = "w";
				}
			
				break;
			default:
				m[cid].s = "x";
		
		} // end switch
	} // end for
	
	
}

export function get_chunk_shapes_(m) {
	
	//m["O"].s = get_chunk_shape(m["O"].b["biome"])
	
	
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







if (0) { // set TileMap from _NEW_ chunk created from seed, and then store in cache
	let chunk_events = [...Array(world_chunk_size)].map(_ => Array(world_chunk_size).fill(0));
	let chunk_image = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_image_mid = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_seed = PRNG(cidO, 256);
	let csi = 0;
	
	/*
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value)
			
		  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
		  csi++;
		  if (csi >= chunk_seed.length) {
		    csi=0;
		  }
			value = value > noiseThres ? 15 : 0;//0+2*(chunk_count%2); 
			
			//let value = testing_chunk[chy][chx];
			// -------------------------------- 
			
			chunk_events[chy][chx] = value > 0 ? 1 : 0;
			
		}
	}
	
	
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) ----------- WATER
			if (!chunk_events[chy][chx]) {
			  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
			  csi++;
			  if (csi >= chunk_seed.length) {
			    csi=0;
			  }
				value = value > noiseThres-4 ? 15 : 0;//0+2*(chunk_count%2); 
			
				//let value = testing_chunk[chy][chx];
				// -------------------------------- 
			
				chunk_events[chy][chx] = value > 0 ? 3 : 0;
			}
		  
			
		}
	}
	
	
	// create_terrain_low(chunk_events)
	
	// create_terrain_high(chunk_events)
	
	
	chunk_set[cidO] = { "event": chunk_events, "image_low": chunk_image, "image_mid": chunk_image_mid };
	chunk_count++;
	/**/
}




if (0) { // set TileMap from _NEW_ chunk created from seed, and then store in cache
	//console.log("setting "+cidr);
	let chunk_events = [...Array(world_chunk_size)].map(_ => Array(world_chunk_size).fill(0));
	let chunk_image = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_image_mid = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_seed = PRNG(cidr, 256);
	let csi = 0;
	
	/*
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) 
		  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
		  csi++;
		  if (csi >= chunk_seed.length) {
		    csi=0;
		  }
			value = value > noiseThres ? 15 : 0;//0+2*(chunk_count%2); 
			// -------------------------------- 
			
			
			
			chunk_events[chy][chx] = value > 0 ? 1 : 0;
			
		}
	}
	
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) ----------- WATER
			if (!chunk_events[chy][chx]) {
			  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
			  csi++;
			  if (csi >= chunk_seed.length) {
			    csi=0;
			  }
				value = value > noiseThres-4 ? 15 : 0;//0+2*(chunk_count%2); 
			
				//let value = testing_chunk[chy][chx];
				// -------------------------------- 
			
				chunk_events[chy][chx] = value > 0 ? 3 : 0;
			}
		  
			
		}
	}
	
	chunk_set[cidr] = { "event": chunk_events, "image_low": chunk_image, "image_mid": chunk_image_mid };
	chunk_count++;
	/**/
}


if (0) { // set TileMap from _NEW_ chunk created from seed, and then store in cache
	//console.log("setting "+cidT);
	let chunk_events = [...Array(world_chunk_size)].map(_ => Array(world_chunk_size).fill(0));
	let chunk_image = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_image_mid = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_seed = PRNG(cidT, 256);
	let csi = 0;
	
	/*
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) 
		  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
		  csi++;
		  if (csi >= chunk_seed.length) {
		    csi=0;
		  }
			value = value > noiseThres ? 15 : 0;//0+2*(chunk_count%2); 
			// -------------------------------- 
			
			chunk_events[chy][chx] = value > 0 ? 1 : 0;
		}
	}
	
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) ----------- WATER
			if (!chunk_events[chy][chx]) {
			  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
			  csi++;
			  if (csi >= chunk_seed.length) {
			    csi=0;
			  }
				value = value > noiseThres-4 ? 15 : 0;//0+2*(chunk_count%2); 
			
				//let value = testing_chunk[chy][chx];
				// -------------------------------- 
			
				chunk_events[chy][chx] = value > 0 ? 3 : 0;
			}
		  
			
		}
	}
	
	chunk_set[cidT] = { "event": chunk_events, "image_low": chunk_image, "image_mid": chunk_image_mid };
	chunk_count++;
	/**/
}


if (0) { // set TileMap from _NEW_ chunk created from seed, and then store in cache
	//console.log("setting "+cid7);
	let chunk_events = [...Array(world_chunk_size)].map(_ => Array(world_chunk_size).fill(0));
	let chunk_image = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_image_mid = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_seed = PRNG(cid7, 256);
	let csi = 0;
	
	/*
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) 
		  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
		  csi++;
		  if (csi >= chunk_seed.length) {
		    csi=0;
		  }
			value = value > noiseThres ? 15 : 0;//0+2*(chunk_count%2); 
			// -------------------------------- 
			
			chunk_events[chy][chx] = value > 0 ? 1 : 0;
		}
	}
	
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) ----------- WATER
			if (!chunk_events[chy][chx]) {
			  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
			  csi++;
			  if (csi >= chunk_seed.length) {
			    csi=0;
			  }
				value = value > noiseThres-4 ? 15 : 0;//0+2*(chunk_count%2); 
			
				//let value = testing_chunk[chy][chx];
				// -------------------------------- 
			
				chunk_events[chy][chx] = value > 0 ? 3 : 0;
			}
		  
			
		}
	}
	
	chunk_set[cid7] = { "event": chunk_events, "image_low": chunk_image, "image_mid": chunk_image_mid };
	chunk_count++;
	
	/**/
}


if (0) { // set TileMap from _NEW_ chunk created from seed, and then store in cache
	//console.log("setting "+cidE);
	let chunk_events = [...Array(world_chunk_size)].map(_ => Array(world_chunk_size).fill(0));
	let chunk_image = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_image_mid = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_seed = PRNG(cidE, 256);
	let csi = 0;
	/*
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) 
		  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
		  csi++;
		  if (csi >= chunk_seed.length) {
		    csi=0;
		  }
			value = value > noiseThres ? 15 : 0;//0+2*(chunk_count%2); 
			// -------------------------------- 
			
			chunk_events[chy][chx] = value > 0 ? 1 : 0;
		}
	}
	
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) ----------- WATER
			if (!chunk_events[chy][chx]) {
			  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
			  csi++;
			  if (csi >= chunk_seed.length) {
			    csi=0;
			  }
				value = value > noiseThres-4 ? 15 : 0;//0+2*(chunk_count%2); 
			
				//let value = testing_chunk[chy][chx];
				// -------------------------------- 
			
				chunk_events[chy][chx] = value > 0 ? 3 : 0;
			}
		  
			
		}
	}
	
	chunk_set[cidE] = { "event": chunk_events, "image_low": chunk_image, "image_mid": chunk_image_mid };
	chunk_count++;
	/**/
}


if (0) { // set TileMap from _NEW_ chunk created from seed, and then store in cache
	//console.log("setting "+cid3);
	let chunk_events = [...Array(world_chunk_size)].map(_ => Array(world_chunk_size).fill(0));
	let chunk_image = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_image_mid = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_seed = PRNG(cid3, 256);
	let csi = 0;
	
	/*
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) 
		  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
		  csi++;
		  if (csi >= chunk_seed.length) {
		    csi=0;
		  }
			value = value > noiseThres ? 15 : 0;//0+2*(chunk_count%2); 
			// -------------------------------- 
			
			chunk_events[chy][chx] = value > 0 ? 1 : 0;
		}
	}
	
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) ----------- WATER
			if (!chunk_events[chy][chx]) {
			  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
			  csi++;
			  if (csi >= chunk_seed.length) {
			    csi=0;
			  }
				value = value > noiseThres-4 ? 15 : 0;//0+2*(chunk_count%2); 
			
				//let value = testing_chunk[chy][chx];
				// -------------------------------- 
			
				chunk_events[chy][chx] = value > 0 ? 3 : 0;
			}
		  
			
		}
	}
	
	chunk_set[cid3] = { "event": chunk_events, "image_low": chunk_image, "image_mid": chunk_image_mid };
	chunk_count++;
	/**/
}


if (0) { // set TileMap from _NEW_ chunk created from seed, and then store in cache
	//console.log("setting "+cidL);
	let chunk_events = [...Array(world_chunk_size)].map(_ => Array(world_chunk_size).fill(0));
	let chunk_image = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_image_mid = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_seed = PRNG(cidL, 256);
	let csi = 0;
	
	/*
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) 
		  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
		  csi++;
		  if (csi >= chunk_seed.length) {
		    csi=0;
		  }
			value = value > noiseThres ? 15 : 0;//0+2*(chunk_count%2); 
			// -------------------------------- 
			
			chunk_events[chy][chx] = value > 0 ? 1 : 0;
		}
	}
	
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) ----------- WATER
			if (!chunk_events[chy][chx]) {
			  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
			  csi++;
			  if (csi >= chunk_seed.length) {
			    csi=0;
			  }
				value = value > noiseThres-4 ? 15 : 0;//0+2*(chunk_count%2); 
			
				//let value = testing_chunk[chy][chx];
				// -------------------------------- 
			
				chunk_events[chy][chx] = value > 0 ? 3 : 0;
			}
		  
			
		}
	}
	
	chunk_set[cidL] = { "event": chunk_events, "image_low": chunk_image, "image_mid": chunk_image_mid };
	chunk_count++;
	
	/**/
}


if (0) { // set TileMap from _NEW_ chunk created from seed, and then store in cache
	//console.log("setting "+cidU);
	let chunk_events = [...Array(world_chunk_size)].map(_ => Array(world_chunk_size).fill(0));
	let chunk_image = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_image_mid = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_seed = PRNG(cidU, 256);
	let csi = 0;
	
	/*
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) 
		  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
		  csi++;
		  if (csi >= chunk_seed.length) {
		    csi=0;
		  }
			value = value > noiseThres ? 15 : 0;//0+2*(chunk_count%2); 
			// -------------------------------- 
			
			chunk_events[chy][chx] = value > 0 ? 1 : 0;
		}
	}
	
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) ----------- WATER
			if (!chunk_events[chy][chx]) {
			  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
			  csi++;
			  if (csi >= chunk_seed.length) {
			    csi=0;
			  }
				value = value > noiseThres-4 ? 15 : 0;//0+2*(chunk_count%2); 
			
				//let value = testing_chunk[chy][chx];
				// -------------------------------- 
			
				chunk_events[chy][chx] = value > 0 ? 3 : 0;
			}
		  
			
		}
	}
	
	chunk_set[cidU] = { "event": chunk_events, "image_low": chunk_image, "image_mid": chunk_image_mid };
	chunk_count++;
	
	/**/
}




if (0) { // set TileMap from _NEW_ chunk created from seed, and then store in cache
	//console.log("setting "+cidJ);
	let chunk_events = [...Array(world_chunk_size)].map(_ => Array(world_chunk_size).fill(0));
	let chunk_image = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_image_mid = [...Array(world_chunk_size+2)].map(_ => Array(world_chunk_size+2).fill(0));
	let chunk_seed = PRNG(cidJ, 256);
	let csi = 0;
	
	/*
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) 
		  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
		  csi++;
		  if (csi >= chunk_seed.length) {
		    csi=0;
		  }
			value = value > noiseThres ? 15 : 0;//0+2*(chunk_count%2); 
			// -------------------------------- 
			
			
			chunk_events[chy][chx] = value > 0 ? 1 : 0;
			
		}
	}
	
	for (let chy=0; chy<world_chunk_size; chy++) {
		for (let chx=0; chx<world_chunk_size; chx++) {
			
			// TESTING PURPOSES (value) ----------- WATER
			if (!chunk_events[chy][chx]) {
			  let value = 0 + Math.floor(chunk_seed[csi]*(noiseMax)); // 0, 1
			  csi++;
			  if (csi >= chunk_seed.length) {
			    csi=0;
			  }
				value = value > noiseThres-4 ? 15 : 0;//0+2*(chunk_count%2); 
			
				//let value = testing_chunk[chy][chx];
				// -------------------------------- 
			
				chunk_events[chy][chx] = value > 0 ? 3 : 0;
			}
		}
	}
	
	chunk_set[cidJ] = { "event": chunk_events, "image_low": chunk_image, "image_mid": chunk_image_mid };
	chunk_count++;
	
	/**/
}



















/**/