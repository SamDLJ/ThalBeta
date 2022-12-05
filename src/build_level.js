import { platforms } from "./platforms.js";

function rnd(min_, max_, seed_, iR_) {
	
  let value = min_ + Math.floor(seed_[iR_]*(max_-min_));
	return value;
}

function incR(iR) {
  iR++;
  if (iR >= seed_.length) {
    iR=0;
  }
  return iR;
}




export function build_test_level(seed, start_iR) {
  
	var iR = start_iR;
  // level_image.setTilesheet(tilesheet); 
  // level_image.get(x, y);
  // level_image.set(x, y, tile, ...)
  // level_image.remove(x, y);
  // level_image.find(tile, flagA, flagB);
  
  var width = 128;
  var height = 32;
  var rt = width-1;
  var bm = height-1;
  
  var TileMap = require('pixelbox/TileMap');
  var level_image = new TileMap(width, height);
  var level_grid = [...Array(height)].map(_ => Array(width).fill(0));
  
  //var rx = 0;
  //var ry = 0;
  
  
  /* this is testing for now, will have separate function eventually to build a more 'logical' level*/
  // fill image and grid with sprite images
  for (let i=0; i<25; i++) {
    level_image.set(i, bm, 224);
    level_grid[bm][i] = 1;
  }
  for (let i=0; i<25; i++) {
    level_image.set(30+i, bm, 224);
    level_grid[bm][30+i] = 1;
  }
  
  // singular blocks
  level_image.set(0, bm-1, 224);
  level_grid[bm-1][0] = 1;
  
  level_image.set(12, bm-1, 224);
  level_grid[bm-1][12] = 1;
  
  // randomly scattered, randomly coloured blocks
  for (let i=0; i<30; i++) {
    let x = rnd(0, width, seed, iR);
		iR = incR(iR);
    let y = rnd(height-8, height, seed, iR);
		iR = incR(iR);
    let block_choice = rnd(0, 4, seed, iR);
		iR = incR(iR);
    level_image.set(x, y, 224+block_choice);
    level_grid[y][x] = 1;
  } 
  
  // random moving platforms
  for (let i=0; i<10; i++) {
    
    let rx = rnd(0, width, seed, iR);
		iR = incR(iR);
    let ry = rnd(height-10, height, seed, iR);
		iR = incR(iR);
		let rm = rnd(0, platforms.length, seed, iR);
		iR = incR(iR);
    
    create_platform(rx*8, ry*8, rm);
    
  }
  
  let mult = 10;
  // scatter jumping enemies
  for (let spray_everywhere=0; spray_everywhere<mult; spray_everywhere++) {
    for (let i=0; i<4; i++) {
    
      let rx = rnd(0, width);
      let ry = rnd(height-20, height);
      
      create_small_enemy(rx*8, ry*8, "steadyjump", 0+i*16);
    
    }
  }
  
  // scatter walking enemies 
  for (let spray_everywhere=0; spray_everywhere<mult; spray_everywhere++) {
    for (let i=0; i<4; i++) {
      
      let rx = rnd(0, width);
      let ry = rnd(height-20, height);
      
      create_small_enemy(rx*8, ry*8, "walkbump", 0+i*16);
    }
  }
  
  create_small_enemy(30*8, 30*8, "walkbump", 0+0*16);
  create_small_enemy(11*8, 30*8, "steadyjump", 0+1*16);
  
  //create_small_enemy(x,y, name="", image=0, random_phase=true){
  
  // use rnd(3,6)
  /*
  
  need new algorithm: 
    1. build floor
    2. ???
  
  
  */
  //debug_msg = iR;
  
  return [level_image, level_grid];
  
}
/*

-------- level_nodes.py ------





from random import choice
%matplotlib inline
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
import random


# node: type and location from prev
MAX_JUMP_X = 5
MAX_JUMP_Y = 5


class pnode:
    """
    - move last up or down toward 
        
    """
    def __init__(self, ptype=0, length=1, height=0):
        
        self.ptype = ptype
        
        # left and right are absolute positions?
        #self.plocL = left
        #if right is not None:
        #    self.plocR = right
        #else:
        #    self.plocR = self.plocL
        self.prev = None
        self.next = None
        self.branch = None
        
        self.length = length
        self.height = height # relative to prev: -1, -2, 0, 3, etc
        
        self.currmap = None
        self.pnodes = None
    
    def set_next(self, pnode):
        self.next = pnode
    
    def set_prev(self, pnode):
        self.prev = pnode
        
    def set_branch(self, pnode):
        self.branch = pnode
    
    def link(self, pnodes):
        #print("in link...")
        #print(self.pnodes)
        if isinstance(pnodes, list):
            self.next = pnodes[0]
            #pnodes[0].set_prev(self)
            for i, p in enumerate(pnodes):
                if i < len(pnodes)-1:
                    p.set_next(pnodes[i+1])
                    pnodes[i+1].set_prev(p)
    
    def hasPrev(self):
        return self.prev is not None
    
    def hasBranch(self):
        return self.branch is not None
    
    def hasNext(self):
        return self.next is not None
        
    def __str__(self):    
        return str(self.getInfo())
        
    def getInfo(self):
        info = {
            "ptype": self.ptype,
            "length": self.length,
            "height": self.height,
            "branch": self.hasBranch()
        }
        return info
    
    def countChain(self):
        if self.next is None:
            return 1
        return 1 + self.next.countChain()
    
    def getLast(self):
        if self.next is None:
            return self#.getInfo() # <- pnode? instead of string/dict
        return self.next.getLast()
    
    def getChain(self):
        if self.next is None:
            return [self.getInfo()]
        return [self.getInfo()]+self.next.getChain()
    
    def getTypeChain(self):
        if self.next is None:
            return [self.ptype]
        return [self.ptype]+self.next.getTypeChain()
    
    def getHeightChain(self):
        if self.next is None:
            return [self.height]
        return [self.height]+self.next.getHeightChain()
    
    def getHeightRange(self):
        ymax = 0
        ymin = 0
        ycurr = 0
        for c in self.getHeightChain():
            ycurr += c
            if ycurr >= ymax:
                ymax = ycurr
            if ycurr <= ymin:
                ymin = ycurr
        return (ymax, ymin)
    
    def getLengthChain(self):
        if self.next is None:
            return [self.length]
        return [self.length]+self.next.getLengthChain()
    
    def balance(self):
        s = sum(c['height'] for c in self.getChain())
        if s != 0:
            print("not balanced...")
            
    
    def getMap(self):
        ymax_ymin = self.getHeightRange()
        hh = ymax_ymin[0] - ymax_ymin[1] + 1
        xchain = self.getLengthChain()
        ychain = self.getHeightChain()
        ww = sum(xchain)
        pmap = [[0 for x in range(ww)] for y in range(hh)]
        x = 0
        y = hh + ymax_ymin[1]-1
        for i, t in enumerate(self.getTypeChain()):
            xc, yc = xchain[i], ychain[i]
            y -= yc
            for xx in range(xc):
                pmap[y][x] = t
                x += 1
        #print(pmap)
        return pmap
    
    def setMap(self):
        self.currmap = self.getMap()
        #save it to the object itself
    
    def printMap(self):
        if self.currmap is not None:
            pmap = self.currmap
        else:
            pmap = self.getMap()
        map_string = "\n"
        for j in range(len(pmap)):
            for i in range(len(pmap[0])):
                xy = str(pmap[j][i])
                if len(xy) < 2:
                    map_string += " "
                map_string += str(pmap[j][i])+""
            map_string += "\n"    
        
        return map_string










*/





//var TileMap = require('pixelbox/TileMap');
//var level_image = new TileMap(width, height);
//var level_grid = [...Array(height)].map(_ => Array(width).fill(0));









/*      JUNK         */

//	dot(area_index, x_, y_) {
		/*
		
			
			TODO:
				- what happens to other sprites on top or behind?
		
				- place on separate grid first:
		      dot( temp_image_grid, x_, y_ )
		
					img.set(x_+1, y_+1, br_C)		-->  img[y_+1][x_+1] = br_C
					img.get(x_-1, y_+1)					-->  bl_C = img[y_+1][x_-1]
					
				
				return img
		
			or, have a method that copies an entire image onto another
			
		*/
/*		
		let area = this.areas[area_index];
		let img = area["image"];
		
		
		
		let m = 1;
		let curr = img.get(x_, y_) ? img.get(x_, y_)["sprite"] : 0;
		if (curr) {
			return;
		}
		
		let tl = img.get(x_-1, y_-1) ? img.get(x_-1, y_-1)["sprite"] : 0;
		let tl_C = dot_order["tl"][tl.toString()];
		let tr = img.get(x_+1, y_-1) ? img.get(x_+1, y_-1)["sprite"] : 0;
		let tr_C = dot_order["tr"][tr.toString()];
		//console.log("tr: "+tr+"   tr_C: "+tr_C);
		let bl = img.get(x_-1, y_+1) ? img.get(x_-1, y_+1)["sprite"] : 0;
		let bl_C = dot_order["bl"][bl.toString()];
		let br = img.get(x_+1, y_+1) ? img.get(x_+1, y_+1)["sprite"] : 0;
		let br_C = dot_order["br"][br.toString()];
		
		let t_ = img.get(x_, y_-1) ? img.get(x_, y_-1)["sprite"] : 0;
		let t_C = 0;
		//let t_C = dot_order["t_"][t_.toString()];
		if (t_) { 
			//img.set(x_, y_-1, t_C);
			
			m *= 2;
		}
		
		let _l = img.get(x_-1, y_) ? img.get(x_-1, y_)["sprite"] : 0;
		//let _lC = dot_order["_l"][_l.toString()]; // C = changed
		let _lC = 0;
		if (_l) {
			//img.set(x_-1, y_, _lC);
			m *= 3;
		}
		
		let b_ = img.get(x_, y_+1) ? img.get(x_, y_+1)["sprite"] : 0;
		//let b_C = dot_order["b_"][b_.toString()]; // C = changed
		let b_C = 0;
		if (b_) {
			//img.set(x_, y_+1, b_C);
			m *= 5;
		}
		
		let _r = img.get(x_+1, y_) ? img.get(x_+1, y_)["sprite"] : 0;
		//let _rC = dot_order["_r"][_r.toString()]; // C = changed
		let _rC = 0;
		if (_r) {
			//img.set(x_+1, y_, _rC);
			m *= 7;
		}
		
		
		let o = 39;
		let p_ = 1;
		switch (m) {
			case (210): // all
				//p_ = 1;
				if (br_C) {
					img.set(x_+1, y_+1, br_C);
					p_ *= 2;
				}
				if (bl_C) {
					img.set(x_-1, y_+1, bl_C);
					p_ *= 3;
				}
				if (tr_C) {
					img.set(x_+1, y_-1, tr_C);
					p_ *= 5;
				}
				if (tl_C) {
					img.set(x_-1, y_-1, tl_C);
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
				img.set(x_+1, y_, _rC);
				img.set(x_-1, y_, _lC);
				img.set(x_, y_-1, t_C);
				img.set(x_, y_+1, b_C);
				break;
			case (105): // 5 3 7 bottom left right
				//let p_ = 1;
				if (br_C) {
					img.set(x_+1, y_+1, br_C);
					p_ *= 2;
				}
				if (bl_C) {
					img.set(x_-1, y_+1, bl_C);
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
				img.set(x_+1, y_, _rC);
				img.set(x_-1, y_, _lC);
				img.set(x_, y_+1, b_C);
				break;
			case (70): // 2 5 7 top right bottom
				//let p_ = 1;
				if (br_C) {
					img.set(x_+1, y_+1, br_C);
					p_ *= 2;
				}
				if (tr_C) {
					img.set(x_+1, y_-1, tr_C);
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
				img.set(x_, y_-1, t_C);
				img.set(x_+1, y_, _rC);
				img.set(x_, y_+1, b_C);
				break;
			case (42): // 2 3 7 top left right
				//let p_ = 1;
				if (tr_C) {
					img.set(x_+1, y_-1, tr_C);
					p_ *= 2;
				}
				if (tl_C) {
					img.set(x_-1, y_-1, tl_C);
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
				img.set(x_, y_-1, t_C);
				img.set(x_-1, y_, _lC);
				img.set(x_+1, y_, _rC);
				break;
			case (30): // 2 3 5 top left bottom
				//let p_ = 1;
				if (bl_C) {
					img.set(x_-1, y_+1, bl_C);
					p_ *= 2;
				}
				if (tl_C) {
					img.set(x_-1, y_-1, tl_C);
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
				img.set(x_, y_-1, t_C);
				img.set(x_-1, y_, _lC);
				img.set(x_, y_+1, b_C);
				break;

			case (35): // 5 7 bottom right
				if (br_C) {
					_rC = dot_order["r_m35"][_r.toString()];
					b_C = dot_order["b_m35"][b_.toString()];
					img.set(x_+1, y_+1, br_C);
					o = 16;
				} else {
					_rC = dot_order["_r"][_r.toString()];
					b_C = dot_order["b_"][b_.toString()];
					o = 22;
				}
				img.set(x_, y_+1, b_C);
				img.set(x_+1, y_, _rC);
				break;
			case (15): // 5 3 bottom left 
				if (bl_C) {
					_lC = dot_order["l_m15"][_l.toString()];
					b_C = dot_order["b_m15"][b_.toString()];
					img.set(x_-1, y_+1, bl_C);
					o = 18;
				} else {
					_lC = dot_order["_l"][_l.toString()];
					b_C = dot_order["b_"][b_.toString()];
					o = 24;
				}
				img.set(x_, y_+1, b_C);
				img.set(x_-1, y_, _lC);
				break;
			case (14): // 2 7 top right
				//console.log("huh?");
				if (tr_C) {
					t_C = dot_order["t_m14"][t_.toString()];
					_rC = dot_order["r_m14"][_r.toString()];
					img.set(x_+1, y_-1, tr_C);
					o = 48;
					//console.log("t_: "+t_+"   _r: "+_r+"    ------- t_C: "+t_C+"    ----- _rC: "+_rC);
				} else {
					t_C = dot_order["t_"][t_.toString()];
					_rC = dot_order["_r"][_r.toString()];
					o = 54;
					
				}
				img.set(x_, y_-1, t_C);
				img.set(x_+1, y_, _rC);
				break;

			case (6): // 2 3 top left
				
				if (tl_C) {
					t_C = dot_order["t_m6"][t_.toString()];
					_lC = dot_order["l_m6"][_l.toString()];
					img.set(x_-1, y_-1, tl_C);
					o = 50;
				} else {
					t_C = dot_order["t_"][t_.toString()];
					_lC = dot_order["_l"][_l.toString()];
					o = 56;
				}
				img.set(x_, y_-1, t_C);
				img.set(x_-1, y_, _lC);
				break;
			case (21): // 3 7 left right
				_rC = dot_order["_r"][_r.toString()];
				img.set(x_+1, y_, _rC);
				_lC = dot_order["_l"][_l.toString()];
				img.set(x_-1, y_, _lC);
				o = 62;
				break;
			case (10): // 2 5 top bottom
				b_C = dot_order["b_"][b_.toString()];
				img.set(x_, y_+1, b_C);
				t_C = dot_order["t_"][t_.toString()];
				img.set(x_, y_-1, t_C);
				o = 63;
				break;
			case (7): // right
				_rC = dot_order["_r"][_r.toString()];
				img.set(x_+1, y_, _rC);
				o = 41;
				break;
			case (5): // bottom
				b_C = dot_order["b_"][b_.toString()];
				img.set(x_, y_+1, b_C);
				o = 26;
				break;
			case (3): // left
				_lC = dot_order["_l"][_l.toString()];
				img.set(x_-1, y_, _lC);
				o = 43;
				break;
			case (2): // top
				t_C = dot_order["t_"][t_.toString()];
				img.set(x_, y_-1, t_C);
				o = 58;
				break;
		}
		
		//console.log(o+" "+m);
		if (!curr) {
			img.set(x_, y_, o);
		}
	}
/**/