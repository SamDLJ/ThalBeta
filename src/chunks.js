/*
	1 solid
	
	
	
	
	3 empty or climb if exit
	13 solid or jump up arrow if exit
	
	32 left arrow
	23 right arrow
	
	
	
	30 (edge only) empty, or jump up arrow if exit
  31 (edge only) solid, or jump up arrow if exit
  33 (edge only) climb, or climb up exit if exit
	
	
	
	
	1 solid
	2 empty, or climb if terrain up (climb if platform chunk)
	
	4 empty, or door location
	14 solid, or door location
	41 empty, or solid if door exit (to stand on)
	40 solid, or empty if door exit (to access through)
	
	10 solid, or empty if exit
	12 solid, or climb if exit
	20 (edge only) empty, or fall down arrow if exit
	21 (edge only) solid, or fall down arrow if exit
	22 (edge only) climb, or climb down exit if exit
	122 (edge only) solid, or climb down exit if exit
	
	
	(edge only) empty, or left arrow if exit
	(edge only) solid, or left arrow if exit
	
	
	
	
	

                            13
                                                    
                                                      
                                                 __[__]-< >- >- __
                                           __ -< HH vv HH HH HH HH >- __ 
                         __ -< >- __ __ -< HH HH HH L= == =7 HH HH HH HH >- __ 
10  __ __ -< >- __ -< -< HH HH HH HH HH HH HH HH r= == == =J HH HH HH HH HH HH >- __
    HH HH HH HH HH HH HH HH HH HH HH HH HH HH HH vv HH HH HH HH HH HH HH HH HH HH HH >- __  11

                                                    12


.C CC CC CC CC
_C cc cc cc cc 
HH HH HH HH HH









         
         rc _c _c _c c>   <c _c _c .. _c _c _c c>   <c _c _c c7 
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











for L-, -J, r-, -7, make sure can go through horizontally

always need the two middle blank so that can go thru up or down (-- tile doesn't need the two middle ones empty)


^^
vv

-<
>-
__

..
>.
.<

^<
>^
_^
^_








*/
export const CHUNKS = {

	"rules": {
		"__": {
			"L": ["__", "__", ">-"],
			"R": ["__", "__", "-<"]
		},
		">-": {
			"L": ["-<", ">-"],
			"R": ["__", "-<", ">-"]
		},
		"-<": {
			"L": ["__", "-<", ">-"],
			"R": ["-<", ">-"]
		},
		"ss": {
			"L": ["__", "-<", ">-"],
			"R": ["__", "-<", ">-"]
		},
		
	},
	"__": [
		
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,4,0,0,0,0],
			[0,0,0,1,1,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,1,1,21,1,1,1,1]
		],
		
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,4,0,0,0,0,0,0],
			[1,1,1,1,1,1,21,1]
		],
		
		[
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,9,0],
			[4,0,0,2,1,0,0,0],
			[1,41,0,2,0,0,0,1],
			[1,0,0,2,0,0,0,1],
			[1,0,0,2,0,0,0,1],
			[1,0,0,2,0,0,0,1],
			[1,1,10,21,10,10,1,1]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,9,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,4,0,0,0,0,0],
			[1,1,1,21,10,1,1,1]
		],
		[
			[0,0,0,4,0,0,0,0],
			[0,0,0,41,41,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,9,0,0],
			[0,0,0,0,0,0,0,0],
			[0,9,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,9,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,1,1],
			[0,0,0,0,0,0,1,0],
			[0,0,0,0,0,0,1,0],
			[0,0,0,1,4,0,1,0],
			[1,21,1,1,1,1,1,1]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,9,0,0,0,1,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,4,0,0,0,0],
			[1,1,10,1,1,1,1,1],
			[1,1,10,1,1,1,1,1],
			[1,1,12,1,1,1,1,1],
			[1,1,122,1,1,1,1,1]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,9,0],
			[0,0,0,0,1,1,0,0],
			[0,4,0,0,1,1,0,0],
			[1,1,10,1,1,1,0,0],
			[1,1,10,1,1,1,1,1],
			[1,1,12,1,1,1,1,1],
			[1,1,122,1,1,1,1,1]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,4,0,0,0,0,0,0],
			[1,1,41,0,10,0,1,1],
			[1,1,0,0,10,1,1,1],
			[1,1,1,1,12,1,1,1],
			[1,1,1,1,122,1,1,1]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,4,0,0,1,0,0],
			[1,1,1,1,20,1,1,1]
		],
		[
			[0,0,1,1,1,1,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,1,0,0,0,0,1,1],
			[1,1,0,0,0,0,1,1],
			[1,1,4,0,0,0,1,1],
			[1,1,1,1,20,0,1,1]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,1,1],
			[1,1,0,0,0,0,1,1],
			[1,1,4,0,0,0,1,1],
			[1,1,1,1,0,20,1,1]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,10,1,0,0,0],
			[0,10,0,10,1,4,0,0],
			[1,1,21,1,1,1,1,1]
		],
		[
			[0,1,0,0,0,0,0,0],
			[1,1,1,0,0,0,0,0],
			[0,1,0,0,0,0,0,0],
			[0,0,0,4,0,0,0,0],
			[0,0,0,1,1,0,0,0],
			[0,0,0,1,1,1,0,0],
			[0,0,0,1,1,1,0,0],
			[1,1,21,1,1,1,1,1]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,4,0,0,0],
			[0,0,0,1,1,1,1,0],
			[0,1,10,1,1,1,1,1],
			[0,1,10,1,1,1,1,1],
			[1,1,20,1,1,1,1,1]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,4,0,0,0],
			[0,0,0,10,1,1,0,0],
			[0,0,0,10,1,1,0,0],
			[0,0,1,10,1,1,1,0],
			[0,0,1,10,1,1,1,0],
			[1,1,1,20,1,1,1,1]
		],/**/
	],
	"ss": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,-2,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,-1,1,0,1,0],
			[1,1,1,1,1,1,1,1]
		],
		/*
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,-2,-1,4,0,0,0],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1]
		],/**/
	],
	">>": [
		[
			[0,0,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
			[0,0,1,0,0,0,0,0],
			[0,41,0,40,0,0,0,0],
			[0,41,0,40,0,0,0,0],
			[0,41,4,40,0,0,0,23],
			[0,41,41,41,1,1,1,1],
		]
	],
	"<<": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,1,1],
			[0,0,0,0,0,0,1,1],
			[0,0,0,0,0,1,0,0],
			[0,0,0,0,1,0,0,0],
			[0,0,0,0,1,0,0,0],
			[32,0,4,0,1,0,0,0],
			[1,1,1,1,0,0,0,0],
		]
	],
	"->": [
		[
			[0,0,0,0,0,0,0,23],
			[0,0,0,0,0,1,1,1],
			[0,0,0,0,1,0,0,0],
			[0,0,0,1,0,0,0,0],
			[0,0,1,0,0,0,0,0],
			[0,0,1,0,0,0,0,0],
			[4,0,1,0,0,0,0,0],
			[1,1,1,0,0,0,0,0],
		]
	],
	"<-": [
		[
			[32,0,0,0,0,0,0,0],
			[1,1,1,0,0,0,0,0],
			[0,0,0,1,0,0,0,0],
			[0,0,0,0,1,0,0,0],
			[0,0,0,0,0,1,0,0],
			[0,0,0,0,0,1,0,0],
			[0,0,0,0,0,1,4,0],
			[0,0,0,0,0,1,1,1],
		]
	],
	"<_": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[32,0,0,0,0,0,0,0],
			[1,1,0,0,4,0,0,0],
			[1,1,1,1,1,1,1,1],
		]
	],
	"_>": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,23],
			[0,0,4,0,0,0,1,1],
			[1,1,1,1,1,1,1,1],
		]
	],
	"==": [
		[
			[1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,1],
			[1,0,0,4,0,0,0,1],
			[1,1,1,1,1,1,1,1]
		],
	],
	"--": [ // keep low to the ground
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,4,0,0,0,0],
			[0,0,0,1,1,0,0,0],
			[0,1,1,1,1,1,1,0],
			[0,1,1,0,0,1,1,0],
			[0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,4,0,0,0,0,0],
			[1,0,1,1,0,1,0,1],
			[0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,4,0,1,1,0,0],
			[0,1,1,1,1,1,0,0],
			[0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,4,0,0,0,0,0,0],
			[0,1,1,0,0,0,0,0],
			[0,1,1,0,0,0,0,0],
			[0,0,0,0,0,0,1,1],
			[0,0,0,0,0,0,1,1]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,9,0,0,0,0],
			[0,0,0,0,0,4,0,0],
			[0,0,0,0,0,10,10,0],
			[0,0,0,0,0,0,0,0]
		],
	],
	"_-": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,1,1],
			[0,0,0,0,0,0,0,0],
			[0,0,0,4,0,0,0,0],
			[0,0,0,1,1,0,0,0],
			[0,1,1,0,0,0,0,0],
			[0,1,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]
		],
	],
	"-_": [
		[
			[0,0,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
			[0,0,0,0,4,0,0,0],
			[0,0,0,0,1,1,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1]
		],
	],
	"HH": [
		[
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1]
		],
	],
	"hH": [
		[
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,4,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1]
		],
	],
	"Hh": [
		[
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,4,1,1], 
			[1,1,1,1,1,1,1,1]
		],
	],
	"hh": [
		[
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,1,4,1,1,1,1], 
			[1,1,1,1,1,1,1,1]
		],
	],
	">-": [
		[
			[1,0,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
			[1,1,1,0,0,0,0,0],
			[1,1,1,1,0,0,0,0],
			[1,1,1,1,4,0,0,0],
			[1,1,1,1,1,1,1,0],
			[1,1,1,1,1,1,1,1],
		],
		[
			[1,1,0,0,2,0,0,0],
			[1,1,0,0,0,0,0,0],
			[1,1,1,0,0,0,0,0],
			[1,1,1,14,40,0,0,1],
			[1,1,0,41,41,0,0,1],
			[1,1,0,0,0,0,0,1],
			[1,1,0,0,0,0,0,1],
			[1,1,10,21,10,10,1,1],
		],
		[
			[1,1,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
			[1,1,0,4,0,0,1,0],
			[1,1,1,1,1,0,1,1],
			[1,1,1,1,1,0,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
		],
		[
			[1,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,1,0],
			[1,1,1,0,0,0,0,0],
			[1,1,1,4,0,0,0,0],
			[1,1,1,1,1,12,0,0],
			[1,1,1,1,1,12,0,0],
			[1,1,1,1,1,12,1,1],
			[1,1,1,1,1,122,1,1],
		],
		[
			[1,0,0,0,0,0,0,0],
			[1,1,1,0,0,0,0,0],
			[1,1,1,0,0,0,0,0],
			[1,1,1,4,0,0,0,0],
			[1,1,1,1,1,0,0,0],
			[1,1,1,1,0,0,0,0],
			[1,1,1,1,0,0,0,0],
			[1,1,1,1,0,0,1,1],
		],
		[
			[0,1,1,0,0,0,0,0],
			[0,1,1,0,0,0,0,0],
			[1,0,0,0,0,0,0,0],
			[1,0,0,0,0,1,0,0],
			[1,0,0,0,0,0,0,0],
			[1,4,0,0,0,0,0,0],
			[1,1,1,10,10,1,1,1],
			[1,1,1,10,10,1,1,1],
		],
		[
			[1,1,1,0,0,0,0,0],
			[1,1,1,0,0,0,0,0],
			[1,1,1,0,0,0,0,0],
			[0,0,0,0,0,0,1,0],
			[0,0,0,0,0,1,1,0],
			[0,4,0,0,0,1,1,0],
			[1,1,1,1,1,1,1,0],
			[1,1,1,1,1,1,1,1],
		],
		[
			[1,1,0,0,0,0,0,0],
			[1,1,1,1,0,0,0,0],
			[1,1,1,1,1,1,0,0],
			[1,1,1,1,1,1,4,0],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
		],
		[
			[1,1,0,0,0,0,0,0],
			[1,1,1,0,0,0,0,0],
			[1,1,1,0,0,0,0,0],
			[1,1,1,0,0,4,0,0],
			[1,1,1,0,0,1,1,1],
			[1,1,1,0,0,1,1,1],
			[1,1,1,0,0,1,1,1],
			[1,1,1,0,0,1,1,1],
		],
		[
			[1,1,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
			[0,0,1,1,0,0,0,0],
			[0,0,1,1,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,1,1],
			[4,0,0,0,0,0,1,1],
			[1,1,1,1,1,1,1,1],
		],
	],
	"-<": [
		[
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,1,1],
			[0,0,0,0,0,0,1,1],
			[0,0,0,4,0,1,1,1],
			[0,0,0,1,1,1,1,1],
			[0,1,1,1,1,1,1,1],
			[0,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1]
		],
		[
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,4,0,0,2,0,1],
			[1,1,1,1,1,1,1,1]
		],
		[
			[0,0,0,0,0,0,1,1],
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,1],
			[1,0,0,14,0,0,0,1],
			[1,0,0,41,41,0,0,1],
			[1,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,1],
			[1,1,10,21,10,10,1,1],
		],
		[
			[0,0,0,0,1,1,1,1],
			[0,0,0,0,0,1,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,4,0,0,0,0],
			[1,1,10,1,1,1,1,1],
			[1,1,10,1,1,1,1,1],
			[1,1,10,1,1,1,1,1],
			[1,1,21,1,1,1,1,1],
		],
	],
	"=>": [
		[
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,0,0,0,0,1,1], 
			[0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,23], 
			[0,0,0,0,0,0,1,1], 
			[1,1,1,1,1,1,1,1]
		],
	],
	"<=": [
		[
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,0,0,0,0,1,1], 
			[0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,0], 
			[0,0,0,0,0,0,0,0], 
			[32,0,0,0,0,0,1,1], 
			[1,1,1,1,1,1,1,1]
		],
	],
	"=7": [
		[
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,0,0,0,0,1,1], 
			[0,0,0,0,0,0,1,1], 
			[0,0,0,0,0,0,1,1], 
			[1,1,0,0,0,0,1,1], 
			[1,1,0,0,0,0,1,1], 
			[1,1,1,0,20,1,1,1]
		],
	],
	"r=": [
		[
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,0,0,0,0,1,1], 
			[1,1,0,0,0,0,0,0], 
			[1,1,0,0,0,0,0,0], 
			[1,1,0,0,0,0,1,1], 
			[1,1,0,0,0,0,1,1], 
			[1,1,1,20,0,1,1,1]
		],
	],
	"rr": [
		[
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,0,0,0,0,1,1], 
			[1,1,0,0,0,0,0,0], 
			[1,1,0,0,0,0,0,0], 
			[1,1,0,0,0,0,1,1], 
			[1,1,0,0,0,0,1,1], 
			[1,1,1,20,0,1,1,1]
		],
	],
	"77": [
		[
			[1,1,1,1,1,1,1,1], 
			[1,1,1,1,1,1,1,1], 
			[1,1,0,0,0,0,1,1], 
			[0,0,0,0,0,0,1,1], 
			[0,0,0,0,0,0,1,1], 
			[1,1,0,0,0,0,1,1], 
			[1,1,0,0,0,0,1,1], 
			[1,1,1,20,0,1,1,1]
		],
	],
	"=J": [
		[
			[1,0,0,0,0,0,0,1], 
			[1,0,0,0,0,0,0,1], 
			[1,1,1,0,0,0,0,1], 
			[0,0,0,0,0,0,0,1], 
			[0,0,0,0,0,0,1,1], 
			[1,0,0,0,0,0,1,1], 
			[1,0,0,0,0,0,1,1], 
			[1,1,1,1,1,1,1,1]
		],
	],
	"L=": [
		[
			[1,0,0,0,0,0,0,1], 
			[1,0,0,0,0,0,0,1], 
			[1,0,0,0,0,0,1,1], 
			[1,0,0,0,0,1,0,0], 
			[1,1,0,0,0,0,0,0], 
			[1,1,0,0,0,0,0,1], 
			[1,1,0,0,0,0,0,1], 
			[1,1,1,1,1,1,1,1]
		],
	],
	"-7": [
		[
			[0,0,0,0,0,1,0,0],
			[0,0,0,0,0,1,0,0],
			[0,0,0,0,0,1,1,0],
			[0,0,0,0,0,1,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,1,2,0,0,0,0],
			[1,1,1,2,1,1,0,0],
			[0,0,0,2,0,0,0,0]
		],
	],
	"r-": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,1,1],
			[1,0,0,2,0,0,1,1]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,0,0,2,0,0,0,1],
			[1,1,1,2,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,9,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,0]
		],
	],
	
	"-J": [
		[
			[0,0,0,0,30,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,1,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,1],
			[0,1,1,1,0,1,1,1]
		],
		[
			[0,0,0,0,30,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,1,1,1,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1],
			[1,1,0,0,0,0,0,1],
			[0,0,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,30,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,2,0,0,0],
			[0,0,0,0,2,0,0,0],
			[0,0,0,0,2,1,1,1],
			[0,0,0,0,2,1,1,1],
			[1,1,1,0,0,0,0,0],
			[1,1,1,0,0,0,0,0]
		],
	],
	"L-": [
		[
			[0,30,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
			[0,1,0,0,0,0,0,1],
			[0,1,0,0,0,0,1,1],
			[0,1,1,0,0,0,1,1]
		],
	],
	"v<": [
		[
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,1,1],
			[0,0,0,0,0,0,1,1],
			[0,4,0,0,0,0,1,1],
			[0,1,1,20,1,1,1,1],
		]
	],
	"^<": [
		[
			[0,0,0,2,0,0,0,1],
			[0,0,0,2,0,0,0,1],
			[0,0,0,2,0,0,0,1],
			[0,0,0,2,0,0,0,1],
			[1,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0],
			[1,4,0,0,0,0,0,0],
			[1,1,1,0,0,0,0,0],
		]
	],
	">v": [
		[
			[1,1,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,1,1],
			[1,0,0,0,0,0,1,1],
			[1,4,0,0,0,0,1,1],
			[1,1,1,20,1,1,1,1],
		]
	],
	">^": [
		[
			[1,0,0,0,2,0,0,0],
			[1,0,0,0,2,0,0,0],
			[1,0,0,0,2,0,0,0],
			[1,0,0,0,2,0,0,0],
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,1],
			[0,0,4,0,0,0,0,1],
			[1,1,1,1,1,1,1,1],
		]
	],
	"_v": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,4,0,0,0,0,0],
			[1,1,1,1,1,20,0,0],
		]
	],
	"_^": [
		[
			[0,0,0,0,0,2,0,0],
			[0,0,0,0,0,2,0,0],
			[0,0,0,0,0,2,0,0],
			[0,0,0,0,0,2,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,4,0,0,0,0,0],
			[1,1,1,1,1,1,1,1],
		]
	],
	"v_": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,4,0,0,0],
			[0,0,20,1,1,1,1,1],
		]
	],
	"^_": [
		[
			[0,0,2,0,0,0,0,0],
			[0,0,2,0,0,0,0,0],
			[0,0,2,0,0,0,0,0],
			[0,0,2,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,4,0,0,0],
			[1,1,1,1,1,1,1,1],
		]
	],
	
	
	"^^": [
		[
			[0,0,0,30,0,0,0,0],
			[0,0,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,1,0,0,0,0],
			[0,0,0,0,0,0,1,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,0,0],
		]
	],
	"TT": [
		[
			[1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,1],
			[1,1,0,0,0,0,1,1],
		]
	],
	"vv": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,1,0],
			[0,1,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,20,0,1,1,0],
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,1,1,1,1,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,1,1,1,1,1],
			[0,0,0,0,0,1,1,1],
			[1,1,20,0,0,1,1,1],
		],
		[
			[0,0,0,0,0,0,1,1],
			[0,0,0,0,0,0,1,1],
			[0,0,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,1,1,0,0,0,0,0],
			[1,1,1,0,0,0,0,0],
			[1,1,1,0,20,1,1,1],
		]
	],
	"vV": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,1,0],
			[0,1,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,20,0,1,1,0],
		],
		[
			[1,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,0,1],
			[1,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,1],
			[1,0,0,1,1,1,1,1],
			[1,0,0,0,0,1,1,1],
			[1,1,20,0,0,1,1,1],
		],
		[
			[1,0,0,0,0,0,1,1],
			[1,0,0,0,0,0,1,1],
			[1,0,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,1],
			[1,1,1,0,0,0,0,1],
			[1,1,1,0,0,0,0,1],
			[1,1,1,0,20,1,1,1],
		]
	],
	"Vv": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,1,0],
			[0,1,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,20,0,1,1,0],
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,1,1,1,1,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,1,1,1,1,0],
			[0,0,0,0,0,1,1,0],
			[0,1,20,0,0,1,1,0],
		],
		[
			[0,0,0,0,0,0,1,0],
			[0,0,0,0,0,0,1,0],
			[0,0,1,1,1,1,1,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,1,1,0,0,0,0,0],
			[0,1,1,0,0,0,0,0],
			[0,1,1,0,20,1,1,0],
		]
	],
	
	"jj": [
		[
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[0,1,1,1,1,1,1,1],
			[0,0,0,1,1,0,0,1],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
		],
		[
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,0,1,1],
			[1,0,0,0,1,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
		],
		[
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,0],
			[0,0,1,1,1,1,1,0],
			[0,0,1,1,1,1,1,0],
			[0,0,0,1,1,0,1,0],
			[0,0,0,1,0,0,0,0],
			[0,0,0,1,0,0,0,0],
			[0,0,0,0,0,0,0,0],
		],
		[
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,0,0,1,1],
			[1,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
		],
		[
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,0],
			[0,0,1,1,1,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
		],
	],
	"ii": [
		[
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1],
		],
	],
	"_|": [
		[
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,1,0,1],
			[0,0,0,0,0,0,0,1],
			[0,4,0,0,0,0,0,1],
			[0,1,1,1,0,0,0,1],
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,1],
			[0,0,1,0,0,0,0,1]
		],
		[
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,4,0,0,2,0,1],
			[0,0,1,1,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1]
		],
	],
	"_!": [
		[
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,1,0,1],
			[0,0,0,0,0,0,0,0],
			[0,4,0,0,0,0,0,0],
			[0,1,1,1,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1],
			[0,0,1,0,0,0,0,1]
		],
		[
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,0],
			[0,0,4,0,0,2,0,0],
			[0,0,1,1,0,2,0,0],
			[0,0,0,0,0,2,0,0],
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1]
		],
	],
	"v|": [
		[
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,1,0,1],
			[0,0,0,0,0,0,0,1],
			[0,0,4,0,0,0,0,1],
			[0,0,1,1,0,0,0,1],
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,1],
			[0,1,1,0,20,0,0,1]
		],
		[
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,4,0,0,2,0,1],
			[0,0,1,1,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,122,0,1]
		],
	],
	"^|": [
		[
			[0,0,0,0,0,30,0,1],
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,1,1,1],
			[0,4,0,0,0,0,0,1],
			[0,1,1,1,0,0,0,1],
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,1]
		],
		[
			[0,0,0,0,0,33,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,4,0,0,2,0,1],
			[0,0,1,1,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1],
			[0,0,0,0,0,2,0,1]
		],
	],
	"|_": [
		[
			[1,0,0,0,2,0,0,0],
			[1,0,0,0,2,0,0,0],
			[1,0,0,0,2,0,0,0],
			[1,0,4,0,2,0,0,0],
			[1,2,1,1,1,0,0,0],
			[1,2,0,0,0,0,0,0],
			[1,2,0,0,0,0,0,0],
			[1,2,0,0,0,0,0,0],
		],
		[
			[1,2,0,0,0,0,0,0],
			[0,2,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,4,0,1,0,0],
			[1,0,0,1,1,1,0,0],
			[1,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
		],
	],
	"!_": [
		[
			[1,0,0,0,2,0,0,0],
			[1,0,0,0,2,0,0,0],
			[0,0,0,0,2,0,0,0],
			[0,0,4,0,2,0,0,0],
			[0,2,1,1,1,0,0,0],
			[0,2,0,0,0,0,0,0],
			[1,2,0,0,0,0,0,0],
			[1,2,0,0,0,0,0,0],
		],
		[
			[1,2,0,0,0,0,0,0],
			[0,2,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,4,0,1,0,0],
			[0,0,0,1,1,1,0,0],
			[0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
		],
	],
	"|v": [
		[
			[1,0,0,0,2,0,0,0],
			[1,0,0,0,2,0,0,0],
			[1,0,0,0,2,0,0,0],
			[1,0,4,0,2,0,0,0],
			[1,2,1,1,1,0,0,0],
			[1,2,0,0,0,0,0,0],
			[1,2,0,0,0,0,0,0],
			[1,122,0,0,0,0,0,0],
		],
		[
			[1,2,0,0,0,0,0,0],
			[0,2,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,4,0,1,0,0],
			[1,0,0,1,1,1,0,0],
			[1,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
		],
	],
	"|^": [
		[
			[1,0,0,0,2,0,0,0],
			[1,0,0,0,2,0,0,0],
			[1,0,0,0,2,0,0,0],
			[1,0,4,0,2,0,0,0],
			[1,2,1,1,1,0,0,0],
			[1,2,0,0,0,0,0,0],
			[1,2,0,0,0,0,0,0],
			[1,2,0,0,0,0,0,0],
		],
		[
			[1,2,0,0,0,0,0,0],
			[0,2,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,4,0,1,0,0],
			[1,0,0,1,1,1,0,0],
			[1,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
		],
	],
	"-.": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,1,0,0,0,0,0,0],
		],
	],
	".-": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,1,1],
		],
	],
	"..": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,4,0,0,0,0],
			[0,0,0,1,1,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,1,0,20,0,0,1,1],
		],
	],
	">.": [
		[
			[1,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0],
			[1,0,0,4,0,0,0,0],
			[0,0,0,1,1,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,1,0,0,20,0,1,1],
		],
	],
	".<": [
		[
			[0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,1],
			[0,0,0,4,0,0,0,1],
			[0,0,0,1,1,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,1,0,20,0,0,1,1],
		],
	],
	
	"_C": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,4,0,0],
			[1,1,1,1,1,1,1,1],
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,1,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,1,0,0,0],
			[0,0,0,0,1,0,0,0],
			[0,0,1,0,1,0,0,0],
			[0,0,1,0,0,4,0,0],
			[1,1,1,1,1,1,1,1],
		]
	],
	".C": [
		[
			[0,0,0,0,0,0,0,2],
			[0,0,0,0,0,0,0,2],
			[0,0,0,0,0,0,0,2],
			[0,0,4,0,0,0,0,2],
			[0,0,1,1,0,0,0,2],
			[0,0,0,0,0,0,0,2],
			[0,0,0,0,0,0,0,2],
			[0,0,0,0,0,0,0,2],
		]
	],
	"^C": [
		[
			[0,0,0,0,33,0,0,0],
			[0,0,0,0,2,0,0,0],
			[0,0,0,0,2,0,0,0],
			[0,0,0,0,2,0,0,0],
			[0,0,0,0,2,0,0,0],
			[0,0,0,0,2,0,0,0],
			[0,0,0,0,2,0,0,0],
			[0,0,0,0,2,0,0,0],
		]
	],
	"vC": [
		[
			[0,0,0,0,2,0,0,0],
			[0,0,0,0,2,0,0,0],
			[0,0,0,0,2,0,0,0],
			[0,0,0,0,2,0,0,0],
			[0,0,0,0,2,0,0,0],
			[0,0,0,0,2,0,0,0],
			[0,0,0,0,2,0,0,0],
			[0,0,0,0,22,0,0,0],
		]
	],
	"CC": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
		]
	],
	"C_": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,4,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1],
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,4,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1],
		]
	],
	"C.": [
		[
			[2,0,0,0,0,0,0,0],
			[2,0,0,0,0,0,0,0],
			[2,0,0,4,0,0,0,0],
			[2,0,0,1,1,0,0,0],
			[2,0,0,0,0,0,0,0],
			[2,0,0,0,0,0,0,0],
			[2,0,1,0,0,0,0,0],
			[2,0,0,0,0,0,0,0],
		]
	],
	"C^": [
		[
			[0,0,0,33,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
		]
	],
	"Cv": [
		[
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,22,0,0,0,0],
		]
	],
	"rc": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,1,1,1,1],
		]
	],
	"_c": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1],
		]
	],
	"cc": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,4,0,0,0,0],
			[1,1,1,1,1,1,1,1],
		],
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,4,0,0,0],
			[0,0,0,0,1,1,1,0],
			[0,0,0,0,1,1,1,0],
			[0,0,0,0,1,1,1,0],
			[1,1,1,1,1,1,1,1],
		]
	],
	"<c": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[32,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1],
		]
	],
	"c>": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,23],
			[1,1,1,1,1,1,1,1],
		]
	],
	"c.": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,1,1,1,0,0,0,0],
		]
	],
	".c": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,1,1,1,1],
		]
	],
	"c7": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[1,1,1,1,0,0,0,0],
		]
	],
	"cv": [
		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[1,1,0,2,0,0,1,1],
		]
	],
	"c^": [
		[
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[0,0,0,2,0,0,0,0],
			[1,1,1,1,1,1,1,1],
		]
	],
	"D-": [
		[
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[1,0,0,-1,-2,0,0,0, 0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[0,0,0,0,1,15,0,0, 0,0,0,0,51,1,0,0],
			[0,0,0,0,1,1,15,0, 0,0,0,51,1,1,0,0],
			[0,0,4,0,1,1,1,15, 0,0,51,1,1,1,0,0],
			
			[1,1,1,1,1,1,1,1, 15,0,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1]
		]
	],
	"D<": [
		[
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
			[32,0,0,0,4,0,0,0, 0,0,0,0,0,0,0,0],
			
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1]
		]
	],
	"D>": [
		[
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
			[0,0,0,0,4,0,0,0, 0,0,0,0,0,0,0,23],
			
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1]
		]
	],
	"D|": [
		[
			[1,0,0,0,0,0,0,0, 33,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 2,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 2,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 2,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,1,1, 1,1,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
			[1,0,0,0,1,1,0,0, 0,0,0,0,0,0,0,1],
			
			[0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
			[0,0,1,1,0,0,0,0, 0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0, 0,0,0,0,1,1,1,0],
			[0,0,0,0,4,0,0,0, 0,0,0,0,0,0,0,0],
			[0,0,0,0,1,1,1,1, 2,0,0,0,0,0,0,0],
			
			[1,0,0,0,0,0,0,0, 2,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 2,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 2,1,1,1,0,0,0,1],
			[1,0,0,0,0,0,0,0, 2,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 2,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 2,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0, 2,0,0,0,0,0,0,1],
			[1,0,0,0,0,1,1,1, 22,0,0,0,0,0,0,1]
		]
	],
};







/*




// random number generator for seed. n is how many you need
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
  
  for (let i=0; i<n; i++) {
    //var rrrand = mulberry32(ssseed())
    rands.push(rrrand());
  }
  
  return rands;
  
}/**/

/*


function rnd_(min_, max_) {
  //var before = "";
  //rnd = seed_copy[iR];//*max;
  var value = min_ + Math.floor(seed[iR]*max_);
  
  //debug_msg = rnd;
  //typeof num;
  //if (typeof rnd === "number") { debug_msg += "number"; }
  //if (typeof rnd === "string") { debug_msg = "string"; }
  
  
  //debug_msg = h;
  //var h = Number.parseFloat(seed[0]);
  //var v = min + Math.floor(rnd * max);
  //var v = seed[iR];//Math.floor(0.737726*max_);
  
  
  
  
  
  
  
  try { 
    if (seed && seed.length > 0) {
       //score = "seed has "+seed.length+" elements. seed["+iR+"] = "+seed[iR];
       score = rnd;
    } else {
       score = 'seed is empty.';
    }
    //score = seed; 
  } catch (e) { 
    score = e; 
  }
  
  iR++;
  if (iR > seed.length-1) {
    iR=0;
  }
  
  return value;
}



*/




