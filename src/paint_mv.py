import tkinter as tk
import re
import json
import ast

"""

"""




class PaintApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Create Tile")
        
        self.pixel_size = 16  # Size of each pixel
        self.canvas_width = 18  # Number of pixels in the x-direction
        self.canvas_height = 34  # Number of pixels in the y-direction
        
        self.canvas = tk.Canvas(self.root, bg="gray", width=self.canvas_width * self.pixel_size, height=self.canvas_height * self.pixel_size)
        self.canvas.pack(fill=tk.BOTH, expand=True)
        
        self.canvas.bind("<B1-Motion>", self.paint)
        
        #self.color_picker = tk.Label(self.root, text="Color:")
        #self.color_picker.pack(side=tk.TOP)
        
        self.scattered_var = tk.IntVar()
        self.scattered_var.set(0)  # Default size: 1
        
        self.scattered_options = [(0, "solid"), (1, "holes")]
        for index, (scattered_value, scattered_name) in enumerate(self.scattered_options):
            radio_btn = tk.Radiobutton(self.root, text=scattered_name, variable=self.scattered_var, value=scattered_value)
            radio_btn.pack(side=tk.RIGHT)
        
        
        self.layer_options_strs = [
          "Eraser", 
          "Cliff", 
          "Plateau",
          "Cliff over plateau",
          "Plateau over plateau",
          "Cliff top", 
          "Plateau Top",
          "Cliff over cliff",
          "Plateau Top over cliff",
          "Plateau over cliff",
          "Plateau Top over cliff top",
          "Dirt",
          "Grass", 
          "Bushes",
          "Trees",
          "Stairs",
        ]
        
        # Variable to hold the selected option
        self.selected_layer_option = tk.StringVar(self.root)
        self.selected_layer_option.set(self.layer_options_strs[0])  # Default option
        
        # Create the drop-down list
        self.layer_option_menu = tk.OptionMenu(self.root, self.selected_layer_option, *self.layer_options_strs)
        self.layer_option_menu.pack(side=tk.RIGHT)
        
        
        '''
        self.shape_options_strs = ["m", "m7", "mL", "mJ", "mr", "mc", "mn", "m3", "mu", "met", "mer", "mel", "meb", "mbv", "mbh", "M"]
        
        # Variable to hold the selected option
        self.selected_shape_option = tk.StringVar(self.root)
        self.selected_shape_option.set(self.shape_options_strs[0])  # Default option
        
        # Create the drop-down list
        self.shape_option_menu = tk.OptionMenu(self.root, self.selected_shape_option, *self.shape_options_strs)
        self.shape_option_menu.pack(side=tk.RIGHT)
        '''
        
        self.clear_btn = tk.Button(self.root, text="Clear", command=self.clear_canvas)
        #self.clear_btn.grid(row=1, column=0)
        self.clear_btn.pack(side=tk.LEFT)
        
        self.undo_btn = tk.Button(self.root, text="Undo", command=self.undo)
        #self.undo_btn.grid(row=0, column=0)
        self.undo_btn.pack(side=tk.LEFT)
        
            
        self.size_var = tk.IntVar()
        self.size_var.set(1)  # Default size: 1
        
        self.size_options = [(1, "1x1"), (2, "2x2")]
        for index, (size_value, size_name) in enumerate(self.size_options):
            radio_btn = tk.Radiobutton(self.root, text=size_name, variable=self.size_var, value=size_value)
            radio_btn.pack(side=tk.TOP)
        
        self.X_var = tk.IntVar()
        self.X_var.set(0)  # Default size: 1
        
        self.X_options = [(0, "O"), (1, "X")]
        for index, (X_value, X_name) in enumerate(self.X_options):
            radio_btn = tk.Radiobutton(self.root, text=X_name, variable=self.X_var, value=X_value)
            radio_btn.pack(side=tk.LEFT)
        
        
        self.preset_btn = tk.Button(self.root, text="Get preset", command=self.get_preset)
        self.preset_btn.pack(side=tk.TOP)
        
        self.save_btn = tk.Button(self.root, text="Delete", command=self.delete_js_data)
        self.save_btn.pack(side=tk.BOTTOM)
        
        self.save_btn = tk.Button(self.root, text="Save", command=self.save_canvas_data)
        self.save_btn.pack(side=tk.BOTTOM)
        
        
        
        
        
        # Initialize canvas data as a 2D array of integers
        self.canvas_data = [[0 for i in range(self.canvas_width)] for j in range(self.canvas_height)]
        self.canvas_data_X = [[0 for i in range(self.canvas_width)] for j in range(self.canvas_height)]
        
        for y in range(self.canvas_height-2):
          for x in range(self.canvas_width-2):
            outline = self.check_outline(x,y)
            self.canvas.create_rectangle(
              (x+1) * self.pixel_size, 
              (y+1) * self.pixel_size,
              (x+2) * self.pixel_size, 
              (y+2) * self.pixel_size,
              fill=self.fade_color(x,y), 
              outline=outline
            )
        
        self.undo_stack = []  # Stack to store previous canvas states
        
        
        self.preset_index = 0
        self.presets_length = 0
        
        
        
        self.translate_mapping = {
          0: {"index": 0, "icon": ""},# no change
          1: {"index": 61, "icon": "cliff1"},
          2: {"index": 62, "icon": "plat1"},
          3: {"index": 6362, "icon": "cliff2plat1"},
          4: {"index": 6462, "icon": "plat2plat1"},
          5: {"index": 63, "icon": "cliff2"},
          6: {"index": 64, "icon": "plat2"},
          7: {"index": 6361, "icon": "cliff2cliff1"},
          8: {"index": 6461, "icon": "plat2cliff1"},
          9: {"index": 6261, "icon": "plat1cliff1"},
          10: {"index": 6463, "icon": "plat2cliff2"},
          11: {"index": 110, "icon": "dirt"}, # dirt
          12: {"index": 112, "icon": "grass"},# long grass
          13: {"index": 20, "icon": "bush"},# bush
          14: {"index": 41, "icon": "tree"},# large bush
          15: {"index": 65, "icon": "stairs"},# large bush
          
          
          23: {"index": 610, "icon": "cliff1"},
          46: {"index": 620, "icon": "plat1"},
          69: {"index": 63620, "icon": "cliff2plat1"},
          92: {"index": 64620, "icon": "plat2plat1"},
          115: {"index": 630, "icon": "cliff2"},
          138: {"index": 640, "icon": "plat2"},
          161: {"index": 63610, "icon": "cliff2cliff1"},
          184: {"index": 64610, "icon": "plat2cliff1"},
          207: {"index": 62610, "icon": "plat1cliff1"},
          230: {"index": 64630, "icon": "plat2cliff2"},
          
          253: {"index": 110, "icon": "dirt"}, # dirt
          276: {"index": 112, "icon": "grass"},# long grass
          299: {"index": 20, "icon": "bush"},# bush
          322: {"index": 41, "icon": "tree"},# large bush
          345: {"index": 65, "icon": "stairs"},# large bush
          
          9999: {
            0: 0,
            61: 1,
            62: 2,
            6362: 3,
            6462: 4,
            63: 5,
            64: 6,
            6361: 7,
            6461: 8,
            6261: 9,
            6463: 10,
            110: 11,
            112: 12,
            20: 13,
            41: 14,
            65: 15,
            
            610: 23,
            620: 46,
            63620: 69,
            64620: 92,
            630: 115,
            640: 138,
            63610: 161,
            64610: 184,
            62610: 207,
            64630: 230,
            #253,
            #276,
            #299,
            #322,
            #345,
          },
          "color_from_string": {
            "Eraser": 0,
            "Cliff": 1, 
            "Plateau": 2,
            "Cliff over plateau": 3,
            "Plateau over plateau": 4,
            "Cliff top": 5, 
            "Plateau Top": 6,
            "Cliff over cliff": 7,
            "Plateau Top over cliff": 8,
            "Plateau over cliff": 9,
            "Plateau Top over cliff top": 10,
            "Dirt": 11,
            "Grass": 12, 
            "Bushes": 13,
            "Trees": 14,
            "Stairs": 15,
          }
        }
        
        
        self.icons = {
          "x": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,1,0],
            [0,0,1,0,0,0,0,0, 0,0,0,0,0,1,0,0],
            [0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0],
            [0,0,0,0,1,0,0,0, 0,0,0,1,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,1,0, 0,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1, 1,0,0,0,0,0,0,0],
            
            [0,0,0,0,0,0,0,1, 1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,0, 0,1,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,1,0,0,0, 0,0,0,1,0,0,0,0],
            [0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0],
            [0,0,1,0,0,0,0,0, 0,0,0,0,0,1,0,0],
            [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "dirt": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,0],
            [0,0,1,1,0,0,0,0, 0,0,0,0,0,0,1,0],
            [0,0,1,1,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,1,1,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,1,1,0,0,0,0],
            [0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0, 0,1,0,0,0,0,0,0],
            [0,0,0,0,1,1,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,1,1,0,0, 0,0,0,0,0,1,1,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,1,1,0],
            [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "grass": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,0, 0,0,0,1,0,0,0,0],
            [0,0,0,1,0,0,0,1, 0,0,1,0,0,0,0,0],
            [0,0,0,0,1,0,0,1, 0,0,1,0,0,0,0,0],
            [0,0,0,0,1,0,0,1, 0,1,0,0,1,0,0,0],
            
            [0,0,0,0,0,1,0,1, 0,1,0,1,0,0,0,0],
            [0,0,0,0,0,1,0,1, 0,1,0,1,0,0,0,0],
            [0,0,0,0,0,1,0,1, 0,1,0,1,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "bush": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1, 1,1,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,1,1,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,1,0,0,0, 0,0,0,1,0,0,0,0],
            
            [0,0,0,0,1,0,0,0, 0,0,1,1,0,0,0,0],
            [0,0,0,0,1,0,1,0, 0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,0,1, 0,0,0,1,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,1,1, 1,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "tree": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1, 1,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,1,1, 1,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1, 1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1, 1,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,1,1, 1,1,0,0,0,0,0,0],
            
            [0,0,0,1,1,1,1,1, 1,1,1,1,0,0,0,0],
            [0,0,0,0,0,1,1,1, 1,1,0,0,0,0,0,0],
            [0,0,0,0,0,1,1,1, 1,1,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,1, 1,1,1,0,0,0,0,0],
            [0,0,1,1,1,1,1,1, 1,1,1,1,1,0,0,0],
            [0,0,0,0,0,0,1,1, 1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1, 1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "cliff1": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
            [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
          ],
          "cliff2": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,1,0],
            [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0],
            
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0],
          ],
          "cliff2cliff1": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0],
            [0,0,1,0,0,1,0,0, 0,0,0,0,0,0,0,0],
            [0,0,1,0,0,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,1,0,0,1,0,0, 0,0,1,0,0,0,1,0],
            [0,0,1,0,0,0,0,0, 0,0,1,0,0,0,1,0],
            [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,1,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0],
            
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0],
            [0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0],
            [0,1,0,0,0,1,0,0, 0,0,1,0,0,0,0,1],
            [0,1,0,0,0,1,0,0, 0,0,1,0,0,0,0,1],
            [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,1],
            [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,1],
          ],
          "cliff2plat1": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,1,1,1,1,0],
            [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,1,0],
            [0,0,1,1,1,1,0,0, 0,0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0],
            
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,1,1,1,1,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0],
            [1,1,1,1,0,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0],
          ],
          "plat1": [ 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,1,1,1,1,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,1,1,1,1,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,1,1,1,1,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [1,1,1,1,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "plat2": [ 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,1,1,1,1,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,1,1,1,1],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,1,1,1,1,0],
            [0,0,0,0,1,1,1,1, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "plat2plat1": [ 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,1,1,1,1,0,0,0, 0,0,0,1,1,1,1,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,1,1,1,1,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,1,1,1,1],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,1,1,1,1,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [1,1,1,1,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,1,1,1,1,0],
            [0,0,0,0,1,1,1,1, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "plat2cliff1": [ 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,1,1,1,1,1,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,1,0,1,1,1,1],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
            [0,1,0,0,0,0,0,0, 0,0,0,1,1,1,1,1],
            [0,0,0,0,1,1,1,1, 0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
          ],
          "plat1cliff1": [ 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,0,1,1,1,1,0],
            [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,1,1,1,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,1,1,1,1,0,0,0],
            [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [1,1,1,1,0,0,0,0, 0,0,0,0,0,0,0,1],
            [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
          ],
          "plat2cliff2": [ 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,1,1,1,1,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,1,0],
            [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,1,1,1,1],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0],
            
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,1,1,1,1,1,0],
            [0,0,0,0,1,1,1,1, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0],
          ],
          "stairs": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
            
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
          ]
          
          
        }
        
        self.timer = 0

        
    def paint(self, event):
        x = event.x // self.pixel_size  # Convert mouse coordinates to pixel coordinates
        y = event.y // self.pixel_size
        color_str =  self.selected_layer_option.get() #self.color_var.get()  # Get selected color
        color_index = self.translate_mapping["color_from_string"][color_str]
        holes = self.scattered_var.get()
        is_x = self.X_var.get()
        color_index = color_index*23 if is_x else color_index
        
        
        if 1 <= x and x < self.canvas_width-1 and 1 <= y and y < self.canvas_height-1:
          
          if holes:
            self.timer += 1
            if self.timer%10:
              return
          else:
            self.timer = 0
            
          
          if self.canvas_data[y][x] != color_index:  # Only store changes
            
            
            self.undo_stack.append((x, y, self.canvas_data[y][x]))  # Store previous pixel state
            # Update canvas data and draw pixel on canvas
            
            self.canvas_data[y][x] = self.translate_mapping[color_index]["index"]
            
            
            outline = "gray" if color_index == 0 else ""
            self.canvas.create_rectangle(
              x * self.pixel_size, 
              y * self.pixel_size,
              (x+1) * self.pixel_size, 
              (y+1) * self.pixel_size,
              fill=self.get_color_from_value(color_index), 
              outline=outline
            )
            
            
            self.draw_icon(x * self.pixel_size, y * self.pixel_size, self.translate_mapping[color_index]["icon"], is_x)
            
            
          
          size = self.size_var.get()
          if size == 2:
            if 1 <= x and x < self.canvas_width-1 and 1 <= (y+1) and (y+1) < self.canvas_height-1:
              if self.canvas_data[y+1][x] != color_index:  # Only store changes
                self.undo_stack.append((x, y+1, self.canvas_data[y+1][x]))  # Store previous pixel state
                # Update canvas data and draw pixel on canvas
            
                #self.canvas_data[y+1][x] = self.translate_mapping[color]["index"]
                self.canvas_data[y+1][x] = self.translate_mapping[color_index]["index"]
                
            
                outline = "gray" if color_index == 0 else ""
                self.canvas.create_rectangle(
                  x * self.pixel_size, 
                  (y+1) * self.pixel_size,
                  (x+1) * self.pixel_size, 
                  (y+1+1) * self.pixel_size,
                  fill=self.get_color_from_value(color_index), 
                  outline=outline
                )
                self.draw_icon(x * self.pixel_size, (y+1) * self.pixel_size, self.translate_mapping[color_index]["icon"], is_x)
            if 1 <= (x+1) and (x+1) < self.canvas_width-1 and 1 <= y and y < self.canvas_height-1:
              if self.canvas_data[y][x+1] != color_index:  # Only store changes
                self.undo_stack.append((x+1, y, self.canvas_data[y][x+1]))  # Store previous pixel state
                # Update canvas data and draw pixel on canvas
            
                #self.canvas_data[y][x+1] = self.translate_mapping[color]["index"]
                self.canvas_data[y][x+1] = self.translate_mapping[color_index]["index"]
                
                
                outline = "gray" if color_index == 0 else ""
                self.canvas.create_rectangle(
                  (x+1) * self.pixel_size, 
                  y * self.pixel_size,
                  (x+1+1) * self.pixel_size, 
                  (y+1) * self.pixel_size,
                  fill=self.get_color_from_value(color_index), 
                  outline=outline
                )
                self.draw_icon((x+1) * self.pixel_size, y * self.pixel_size, self.translate_mapping[color_index]["icon"], is_x)
            if 1 <= (x+1) and (x+1) < self.canvas_width-1 and 1 <= (y+1) and (y+1) < self.canvas_height-1:
              if self.canvas_data[y+1][x+1] != color_index:  # Only store changes
                self.undo_stack.append((x+1, y+1, self.canvas_data[y+1][x+1]))  # Store previous pixel state
                # Update canvas data and draw pixel on canvas
            
                #self.canvas_data[y+1][x+1] = self.translate_mapping[color]["index"]
                self.canvas_data[y+1][x+1] = self.translate_mapping[color_index]["index"]
                
            
                outline = "gray" if color_index == 0 else ""
                self.canvas.create_rectangle(
                  (x+1) * self.pixel_size, 
                  (y+1) * self.pixel_size,
                  (x+1+1) * self.pixel_size, 
                  (y+1+1) * self.pixel_size,
                  fill=self.get_color_from_value(color_index), 
                  outline=outline
                )
                self.draw_icon((x+1) * self.pixel_size, (y+1) * self.pixel_size, self.translate_mapping[color_index]["icon"], is_x)
        
    
    def undo(self):
        if self.undo_stack:
          x, y, prev_color = self.undo_stack.pop()  # Retrieve previous pixel state
          self.canvas_data[y][x] = prev_color  # Restore previous pixel color
          # Redraw pixel on canvas with previous color
          self.canvas.create_rectangle(
            x * self.pixel_size, 
            y * self.pixel_size,
            (x + 1) * self.pixel_size, 
            (y + 1) * self.pixel_size,
            fill=self.get_color_from_value(prev_color), 
            outline="gray"
          )
            
    def clear_canvas(self):
        # Clear canvas data and redraw canvas with all white pixels
        self.canvas_data = [[0 for _ in range(self.canvas_width)] for _ in range(self.canvas_height)]
        self.canvas.delete("all")
        for y in range(self.canvas_height-2):
          for x in range(self.canvas_width-2):
            outline = self.check_outline(x,y)
            self.canvas.create_rectangle(
              (x+1) * self.pixel_size, 
              (y+1) * self.pixel_size,
              (x + 2) * self.pixel_size, 
              (y + 2) * self.pixel_size,
              fill=self.fade_color(x,y), 
              outline=outline
            )
    
    
    
            
    def get_color_from_value(self, value):
        # Map integer color values to corresponding color strings
        
        color_mapping = {
          0: "#ffffff", # eraser
          1: "#777755", # cliff
          2: "#aacc88", # plateau
          3: "#7a6652", # cliff over plateau
          4: "#bbff88", # plateau over plateau
          5: "#7a6652", # cliff top
          6: "#bbff88", # plateau top
          7: "#7a6652", # cliff over cliff
          8: "#bbff88", # plateau top over cliff
          9: "#99bb77", # plateau over cliff
          10: "#bbff88", # plateau top over cliff top
          11: "#e69900", # dirt
          12: "#008800", # grass
          13: "#00cc66", # bushes
          14: "#b3b300", # trees
          15: "#888888", # stairs
          
          23: "#777755", # cliff
          46: "#aacc88", # plateau
          69: "#7a6652", # cliff over plateau
          92: "#bbff88", # plateau over plateau
          115: "#7a6652", # cliff top
          138: "#bbff88", # plateau top
          161: "#7a6652", # cliff over cliff
          184: "#bbff88", # plateau top over cliff
          207: "#99bb77", # plateau over cliff
          230: "#bbff88", # plateau top over cliff top
          253: "#e69900", # dirt
          276: "#008800", # grass
          299: "#00cc66", # bushes
          322: "#b3b300", # trees
          345: "#888888", # stairs
        }
        return color_mapping.get(value, "#ffffff")  # Default to white if value not found
    
        
    def get_shape_from_value(self, value):
        # Map integer biome values to corresponding biome strings
        shape_mapping = {
          0: "m", 
          1: "m7", 
          2: "mL", 
          3: "mJ",
          4: "mr",
          5: "mc", 
          6: "mn", 
          7: "m3", 
          8: "mu", 
          9: "met", 
          10: "mer", 
          11: "mel", 
          12: "meb", 
          13: "M"
        }
        
        return shape_mapping.get(value, "m")
    
    
    def get_preset(self):
      self.clear_canvas()
      
      shape = self.selected_shape_option.get() #self.get_shape_from_value(self.shape_var.get())
      print("searching shape: ", shape)
      
      presets = self.collect_presets("mountain_chunks.js", shape)
      
      if len(presets) != self.presets_length: # reset/change if different
        self.presets_length = len(presets)
        self.preset_index = 0
      
      
      preset_string = presets[self.preset_index][:-1]
      preset_map = self.string_to_dict(preset_string) # minus the comma
      
      self.preset_index += 1
      if self.preset_index >= self.presets_length:
        self.preset_index = 0
      
      
      for y in range(len(preset_map)):
        for x in range(len(preset_map[0])):
          self.canvas_data[y+1][x+1] = preset_map[y][x]
          #outline = self.check_outline(x,y)
          self.canvas.create_rectangle(
            (x+1) * self.pixel_size, 
            (y+1) * self.pixel_size,
            (x+2) * self.pixel_size, 
            (y+2) * self.pixel_size,
            fill=self.preset_color(preset_map[y][x]),
            outline="gray"
          )
          
          
          color_index = self.translate_mapping[9999][preset_map[y][x]]
          is_x = color_index >= 23
          
          self.draw_icon((x+1)*self.pixel_size, (y+1)*self.pixel_size, self.translate_mapping[color_index]["icon"], is_x)
      
          
      
    def check_outline(self, x,y):
      outline = "gray"
      return outline
      
    def fade_color(self, x, y):
      d = "#dedede"
      e = "#ddeedd"
      fade = "white"
      
      if (x == 0 and 6 <= y and y < 10) or \
       (x == 15 and 6 <= y and y < 10) or \
       (y == 0 and 6 <= x and x < 10) or \
       (y == 15 and 6 <= x and x < 10) or \
       (6 <= x and x < 10 and 6 <= y and y < 10):
          fade = d
      
      return fade
    
    
    
    def preset_color(self, value):
      
      #d = "#ffffff"
      #e = "#ffffff"
      #pc = "#000000"
      value_ = self.translate_mapping[9999][value]
      return self.get_color_from_value(value_)
    
    
    
    def draw_icon(self, x0, y0, icon="", is_x=False):
      if icon:
        for y in range(16):
          for x in range(16):
            if self.icons[icon][y][x] or (is_x and self.icons["x"][y][x]):
              self.canvas.create_rectangle(x0+x, y0+y, x0+x+1, y0+y+1, fill="#000000", outline="")
    
    
    
              
    def save_canvas_data(self):
        
        new_contents = {}
        chunk_rows = []
        for j, rowy in enumerate(self.canvas_data):
          if j == 0 or j == self.canvas_height-1:
            continue
          chunk_rows.append([x for x in rowy[1:17]])
        
        new_contents = str(chunk_rows).strip().replace(" ", "")+","
        
        
        shape = self.selected_shape_option.get() #self.get_shape_from_value(self.shape_var.get())  # Get selected biome
        
        self.update_js_data("mountain_chunks.js", shape, new_contents)
        
    
    def string_to_dict(self, string):
        # Use ast.literal_eval to safely evaluate the string as a Python expression
        dictionary = ast.literal_eval(string)
        return dictionary        
    
    
    def collect_presets(self, file_path, shape):
      
      collect_lines = []
      with open(file_path, 'r') as file_:
        lines = file_.readlines()
        
        enter_here = 0
        
        for i, line in enumerate(lines): 
          if i == 0:
            continue
          
          comp_line = line.strip().replace(" ", "")
          
          if enter_here == 1:
            if shape in comp_line or len(comp_line) < 5:
              enter_here = 0
              break
            else:
              collect_lines.append(comp_line)
          
          if (shape == "m" and comp_line == '"m":{') or (shape in comp_line):
            enter_here = 1
      
      return collect_lines
    
        
    def update_js_data(self, file_path, shape, data_array):
      # Read the JavaScript file
      #print(letter, orientation, data_array)
      
      collect_lines = []
      with open(file_path, 'r') as file_:
        lines = file_.readlines()
        #print(len(lines))
        insert_here = 0
        for i, line in enumerate(lines):
          
          if i == 0:
            collect_lines.append("export const MOUNTAINS = {")
            continue
          
          #print(i, line)
          comp_line = line.strip().replace(" ", "")
            
          if insert_here == 1:
            collect_lines.append(data_array)
            insert_here = 2
          
          if insert_here == 0 and ((shape == "m" and comp_line == '"m":{') or (shape in comp_line)):
            insert_here = 1
          
          collect_lines.append(comp_line)
      
      collect_lines = [line+"\n" for line in collect_lines]  
      
      # Write the updated content back to the file
      with open(file_path, 'w') as file_:
        print("writing", shape, "tile to"+file_path)
        file_.writelines(collect_lines)
    
    
    
    
    
    
    def delete_js_data(self):
      print("delete not functional yet")
      pass
        
  


      
'''
export const MOUNTAINS = {
"m":[
  [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
],
"m7":[
  [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
],
"mL":[
	[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
],
"mr":[
	[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
],
"mJ":[
	[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
],
"mc":[
	[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
], 
"mn":[
	[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
],
"m3":[
	[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
],
"mu":[
	[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
],
"met":[
	[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
],
"mer":[
	[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
],
"mel":[
	[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
],
"meb":[
	[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
],
"M":[
	[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
],
}
      
      
      
      
export const MOUNTAINS = {
"m":[

],
"m7":[

],
"mL":[

],
"mr":[

],
"mJ":[

],
"mc":[

], 
"mn":[

],
"m3":[

],
"mu":[

],
"met":[

],
"mer":[

],
"mel":[

],
"meb":[

],
"M":[

],
}
'''
  
      

if __name__ == "__main__":
    root = tk.Tk()
    paint_app = PaintApp(root)
    root.mainloop()
