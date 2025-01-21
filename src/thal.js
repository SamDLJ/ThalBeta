/*



*/

// import btn from ???


export function player1_movement(inputs) {
  
	//test_toggle_anim
	//face_frame
	
	
	// ======= temporary - testing speech =======
  if (!inputs.test_toggle_anim) {
    if (btn.S && btn.B) {
      //tilesheet(ts_anim);
      inputs.test_toggle_anim = true;
      inputs.face_frame = 0;
    }
  } else if (btn.S && btn.A) {
    //tilesheet(ts_0);
    inputs.test_toggle_anim = false;
    if (inputs.HEAD) { inputs.HEAD = 0; }
    else { inputs.HEAD = 1; }
  } else {
    if (inputs.face_frame < inputs.face_frames.length-1) {
      inputs.face_frame++;
    }// else {face_frame = face_frames.length-1;}
    return;
  }
	
	if (btnp.P) {
		inputs.p.x = inputs.reset_position_x;
		inputs.p.y = inputs.reset_position_y;
	}
	
  
	
  if (inputs.entering) {
		if (inputs.penter_index >= inputs.penter_frames.length-1 ) {
			inputs.entering = false;
			inputs.penter_index = 0;
			//activated_area = -1;
			
			inputs.p.x = inputs.ready_enter_door["gotox"]*8;
			inputs.p.y = inputs.ready_enter_door["gotoy"]*8;
			//current_area = ready_enter_door["goto"];
			//activated_area = 1;
			//console.log(ready_enter_door);
			inputs.ready_enter_door = {};
			
		} else {
			inputs.penter_index++;
		}
  	return;
  }
	
	
	
  /* --------  horizontal movement: sliding --------- */
  if (inputs.sliding) {
    if (inputs.going_left) {
      
      inputs.left_check = pL(p.x-slide[s]);
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