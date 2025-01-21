import tkinter as tk
import re
import json
import ast
import random

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
        
        self.stamp_options_strs = [
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
          "Trees Random",
          "Stairs",
          "Flower 1",
          "Flower 2",
          "Flower 3",
          "Flower 4",
          "Flower 5",
          "Flower 6",
          "Flowers Random",
          "snow",
        ]
        
        # Variable to hold the selected option
        self.selected_stamp_option = tk.StringVar(self.root)
        self.selected_stamp_option.set(self.stamp_options_strs[0])  # Default option
        
        # Create the drop-down list
        self.stamp_option_menu = tk.OptionMenu(self.root, self.selected_stamp_option, *self.stamp_options_strs)
        self.stamp_option_menu.pack(side=tk.RIGHT)
        
        
        self.shape_options_strs = ["g", "f", "m", "M", "p"]
        
        # Variable to hold the selected option
        self.selected_shape_option = tk.StringVar(self.root)
        self.selected_shape_option.set(self.shape_options_strs[0])  # Default option
        
        # Create the drop-down list
        self.shape_option_menu = tk.OptionMenu(self.root, self.selected_shape_option, *self.shape_options_strs)
        self.shape_option_menu.pack(side=tk.RIGHT)
        
        
        '''
        self.color_var = tk.IntVar()
        self.color_var.set(1)  # Default color: black
        
        self.color_options = [(0, "Eraser"), (1, "Dirt"), (2, "Grass"), (3, "Bushes"), (4, "Trees"), (5, "Layer 1"), (6, "Layer 2"), (7, "Layer 3")]
        for index, (color_value, color_name) in enumerate(self.color_options):
            radio_btn = tk.Radiobutton(self.root, text=color_name, variable=self.color_var, value=color_value)
            radio_btn.pack(side=tk.TOP)
            
        self.biome_var = tk.IntVar()
        self.biome_var.set(0)  # Default biome: grass
        
        self.biome_options = [(0, "g"), (1, "f"), (2, "m"), (3, "M")]
        for index, (biome_value, biome_name) in enumerate(self.biome_options):
            radio_btn = tk.Radiobutton(self.root, text=biome_name, variable=self.biome_var, value=biome_value)
            radio_btn.pack(side=tk.LEFT)
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
        
        
        
        self.rotate_btn = tk.Button(self.root, text="Rotate", command=self.rotate_canvas)
        self.rotate_btn.pack(side=tk.TOP)
        
        self.preset_btn = tk.Button(self.root, text="Get preset", command=self.get_preset)
        self.preset_btn.pack(side=tk.TOP)
        
        self.save_btn = tk.Button(self.root, text="Delete", command=self.delete_js_data)
        self.save_btn.pack(side=tk.BOTTOM)
        
        self.save_btn = tk.Button(self.root, text="Save", command=self.save_canvas_data)
        self.save_btn.pack(side=tk.BOTTOM)
        
        
        
        
        
        # Initialize canvas data as a 2D array of integers
        self.canvas_data = [[0 for i in range(self.canvas_width)] for j in range(self.canvas_height)]
        
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
          16: {"index": 400, "icon": "flower"},# flower
          17: {"index": 401, "icon": "flower"},
          18: {"index": 402, "icon": "flower"},
          19: {"index": 403, "icon": "flower"},
          20: {"index": 404, "icon": "flower"},
          21: {"index": 405, "icon": "flower"},
          22: {"index": 406, "icon": "flower"},# random flowers
          23: {"index": 91, "icon": "snow"}, # snow rocks
          24: {"index": 40, "icon": "tree"},# random trees
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
            40: 24,
            65: 15,
            400: 16,
            401: 17,
            402: 18,
            403: 19,
            404: 20,
            405: 21,
            406: 22,
            91: 23,
            
          },
          "stamp_from_string": {
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
            "Trees Random": 24,
            "Stairs": 15,
            "Flower 1": 16,
            "Flower 2": 17,
            "Flower 3": 18,
            "Flower 4": 19,
            "Flower 5": 20,
            "Flower 6": 21,
            "Flowers Random": 22,
            "snow": 23,
          }
        }
        
        
        self.icons = {
          "snow": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 1,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,1,0, 1,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,1, 1,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1, 1,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,0, 1,0,1,0,0,0,0,0],
            [0,0,0,0,0,1,0,0, 1,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "dirt": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,0], [0,0,1,1,0,0,0,0, 0,0,0,0,0,0,1,0], [0,0,1,1,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,1,1,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,1,1,0,0,0,0], [0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,1,0,0,0,0,0,0, 0,1,0,0,0,0,0,0], [0,0,0,0,1,1,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,1,1,0,0, 0,0,0,0,0,1,1,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,1,1,0], [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,1,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "grass": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,1,0, 0,0,0,1,0,0,0,0], [0,0,0,1,0,0,0,1, 0,0,1,0,0,0,0,0], [0,0,0,0,1,0,0,1, 0,0,1,0,0,0,0,0], [0,0,0,0,1,0,0,1, 0,1,0,0,1,0,0,0], 
            [0,0,0,0,0,1,0,1, 0,1,0,1,0,0,0,0], [0,0,0,0,0,1,0,1, 0,1,0,1,0,0,0,0], [0,0,0,0,0,1,0,1, 0,1,0,1,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "bush": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,1,1, 1,1,0,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,1,1,0, 0,0,1,0,0,0,0,0], [0,0,0,0,1,0,0,0, 0,0,0,1,0,0,0,0], 
            [0,0,0,0,1,0,0,0, 0,0,1,1,0,0,0,0], [0,0,0,0,1,0,1,0, 0,0,0,1,0,0,0,0], [0,0,0,0,1,0,0,1, 0,0,0,1,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,0,1,1, 1,1,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "tree": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,1,1, 1,0,0,0,0,0,0,0], [0,0,0,0,0,1,1,1, 1,1,0,0,0,0,0,0], [0,0,0,0,0,0,1,1, 1,0,0,0,0,0,0,0], [0,0,0,0,0,0,1,1, 1,0,0,0,0,0,0,0], [0,0,0,0,0,1,1,1, 1,1,0,0,0,0,0,0], 
            [0,0,0,1,1,1,1,1, 1,1,1,1,0,0,0,0], [0,0,0,0,0,1,1,1, 1,1,0,0,0,0,0,0], [0,0,0,0,0,1,1,1, 1,1,0,0,0,0,0,0], [0,0,0,0,1,1,1,1, 1,1,1,0,0,0,0,0], [0,0,1,1,1,1,1,1, 1,1,1,1,1,0,0,0], [0,0,0,0,0,0,1,1, 1,0,0,0,0,0,0,0], [0,0,0,0,0,0,1,1, 1,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "cliff1": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,1], [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,1], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
          ],
          "cliff2": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,1,0], [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,1,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0], 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0],
          ],
          "cliff2cliff1": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0], [0,0,1,0,0,1,0,0, 0,0,0,0,0,0,0,0], [0,0,1,0,0,1,0,0, 0,0,1,0,0,0,0,0], [0,0,1,0,0,1,0,0, 0,0,1,0,0,0,1,0], [0,0,1,0,0,0,0,0, 0,0,1,0,0,0,1,0], [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,1,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0], 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0], [0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0], [0,1,0,0,0,1,0,0, 0,0,1,0,0,0,0,1], [0,1,0,0,0,1,0,0, 0,0,1,0,0,0,0,1], [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,1], [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,1],
          ],
          "cliff2plat1": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,1,1,1,1,0], [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,1,0], [0,0,1,1,1,1,0,0, 0,0,0,0,0,0,1,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0], 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,1,1,1,1,0,0,0], [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0], [1,1,1,1,0,1,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0],
          ],
          "plat1": [ 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,1,1,1,1,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,1,1,1,1,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,1,1,1,1,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [1,1,1,1,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "plat2": [ 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,1,1,1,1,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,1,1,1,1], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,1,1,1,1,0], [0,0,0,0,1,1,1,1, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "plat2plat1": [ 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,1,1,1,1,0,0,0, 0,0,0,1,1,1,1,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,1,1,1,1,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,1,1,1,1], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,1,1,1,1,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [1,1,1,1,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,1,1,1,1,0], [0,0,0,0,1,1,1,1, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ],
          "plat2cliff1": [ 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,1,1,1,1,1,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,1,0,1,1,1,1], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,1], [0,1,0,0,0,0,0,0, 0,0,0,1,1,1,1,1], [0,0,0,0,1,1,1,1, 0,0,0,0,0,0,0,1], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
          ],
          "plat1cliff1": [ 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,0,1,1,1,1,0], [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0], [0,0,1,1,1,1,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,1,1,1,1,0,0,0], [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [1,1,1,1,0,0,0,0, 0,0,0,0,0,0,0,1], [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,1], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1],
          ],
          "plat2cliff2": [ 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,1,1,1,1,0,0,0, 0,0,0,0,0,0,0,0], [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,1,0], [0,0,1,0,0,0,0,0, 0,0,0,0,0,0,1,0], [0,0,0,0,0,0,0,0, 0,0,0,0,1,1,1,1], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0], 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,1,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,1,1,1,1,1,0], [0,0,0,0,1,1,1,1, 0,0,0,0,0,0,0,0], [0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0],
          ],
          "stairs": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1], 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], [1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1],
          ],
          "flower": [
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0], 
            [0,0,0,0,0,1,1,1, 1,1,0,0,0,0,0,0], 
            [0,0,0,0,1,0,0,0, 0,0,1,0,0,0,0,0], 
            [0,0,0,1,0,0,1,1, 1,0,0,1,0,0,0,0], 
            [0,0,0,1,0,0,1,1, 1,0,0,1,0,0,0,0], 
            [0,0,0,0,1,0,0,0, 0,0,1,0,0,0,0,0], 
            [0,0,0,0,0,1,1,1, 1,1,0,0,0,0,0,0],
            
            [0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,0], 
            [0,0,0,0,1,1,0,1, 0,0,0,0,0,0,0,0], 
            [0,0,0,0,1,1,1,1, 0,0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0,1, 0,0,1,1,0,0,0,0], 
            [0,0,0,0,0,0,0,1, 1,1,1,1,0,0,0,0], 
            [0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0,1, 0,0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
          ]
          
          
        }
        
        
        self.timer = 0
        self.flower = 0

        
    def paint(self, event):
        x = event.x // self.pixel_size  # Convert mouse coordinates to pixel coordinates
        y = event.y // self.pixel_size
        stamp_str =  self.selected_stamp_option.get() #self.color_var.get()  # Get selected color
        stamp_index = self.translate_mapping["stamp_from_string"][stamp_str]
        holes = self.scattered_var.get()
        
        curr_canvas_data = self.canvas_data[y][x]
        
        if 1 <= x and x < self.canvas_width-1 and 1 <= y and y < self.canvas_height-1:
          
          if holes:
            self.timer += 1
            if self.timer%10:
              return
          else:
            self.timer = 0
            
          
          if curr_canvas_data != stamp_index:  # Only store changes
            
            '''
            self.flower += 1
            if self.flower >= 6:
              self.flower = 0
            flower_value = 0
            '''
            
            self.undo_stack.append((x, y, self.canvas_data[y][x]))  # Store previous pixel state
            # Update canvas data and draw pixel on canvas
            
            
            
            self.canvas_data[y][x] = self.translate_mapping[stamp_index]["index"]
            
            outline = "gray" if stamp_index == 0 else ""
            self.canvas.create_rectangle(
              x * self.pixel_size, 
              y * self.pixel_size,
              (x+1) * self.pixel_size, 
              (y+1) * self.pixel_size,
              fill=self.get_color_from_value(stamp_index), 
              outline=outline
            )
            self.draw_icon(x * self.pixel_size, y * self.pixel_size, self.translate_mapping[stamp_index]["icon"])
          
          size = self.size_var.get()
          if size == 2:
            if 1 <= x and x < self.canvas_width-1 and 1 <= (y+1) and (y+1) < self.canvas_height-1:
              if self.canvas_data[y+1][x] != stamp_index:  # Only store changes
                self.undo_stack.append((x, y+1, self.canvas_data[y+1][x]))  # Store previous pixel state
                # Update canvas data and draw pixel on canvas
            
                self.canvas_data[y+1][x] = self.translate_mapping[stamp_index]["index"]
            
                outline = "gray" if stamp_index == 0 else ""
                self.canvas.create_rectangle(
                  x * self.pixel_size, 
                  (y+1) * self.pixel_size,
                  (x+1) * self.pixel_size, 
                  (y+1+1) * self.pixel_size,
                  fill=self.get_color_from_value(stamp_index), 
                  outline=outline
                )
                self.draw_icon(x * self.pixel_size, (y+1) * self.pixel_size, self.translate_mapping[stamp_index]["icon"])
            if 1 <= (x+1) and (x+1) < self.canvas_width-1 and 1 <= y and y < self.canvas_height-1:
              if self.canvas_data[y][x+1] != stamp_index:  # Only store changes
                self.undo_stack.append((x+1, y, self.canvas_data[y][x+1]))  # Store previous pixel state
                # Update canvas data and draw pixel on canvas
            
                self.canvas_data[y][x+1] = self.translate_mapping[stamp_index]["index"]
            
                outline = "gray" if stamp_index == 0 else ""
                self.canvas.create_rectangle(
                  (x+1) * self.pixel_size, 
                  y * self.pixel_size,
                  (x+1+1) * self.pixel_size, 
                  (y+1) * self.pixel_size,
                  fill=self.get_color_from_value(stamp_index), 
                  outline=outline
                )
                self.draw_icon((x+1) * self.pixel_size, y * self.pixel_size, self.translate_mapping[stamp_index]["icon"])
            if 1 <= (x+1) and (x+1) < self.canvas_width-1 and 1 <= (y+1) and (y+1) < self.canvas_height-1:
              if self.canvas_data[y+1][x+1] != stamp_index:  # Only store changes
                self.undo_stack.append((x+1, y+1, self.canvas_data[y+1][x+1]))  # Store previous pixel state
                # Update canvas data and draw pixel on canvas
            
                self.canvas_data[y+1][x+1] = self.translate_mapping[stamp_index]["index"]
            
                outline = "gray" if stamp_index == 0 else ""
                self.canvas.create_rectangle(
                  (x+1) * self.pixel_size, 
                  (y+1) * self.pixel_size,
                  (x+1+1) * self.pixel_size, 
                  (y+1+1) * self.pixel_size,
                  fill=self.get_color_from_value(stamp_index), 
                  outline=outline
                )
                self.draw_icon((x+1) * self.pixel_size, (y+1) * self.pixel_size, self.translate_mapping[stamp_index]["icon"])
        
    
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
    
    def rotate_canvas(self):
        # Clear canvas data and redraw canvas with all white pixels
        self.clear_canvas()
        self.preset_index = 0
        if self.canvas_width == 18:
          self.canvas_width = 34  # Number of pixels in the x-direction
          self.canvas_height = 18  # Number of pixels in the y-direction
        elif self.canvas_width == 34:
          self.canvas_width = 18  # Number of pixels in the x-direction
          self.canvas_height = 34  # Number of pixels in the y-direction
        
        self.canvas.config(width=self.canvas_width * self.pixel_size, height=self.canvas_height * self.pixel_size)
        self.canvas.delete("all")
        
        # Initialize canvas data as a 2D array of integers
        self.canvas_data = [[0 for i in range(self.canvas_width)] for j in range(self.canvas_height)]
        
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
          16: "#ff00ff", # flower
          17: "#ff0080",
          18: "#ffff33",
          19: "#33ffcc",
          20: "#3399ff",
          21: "#9933ff",
          22: "#ffffff", # random
          23: "#777755", # snow rock
          24: "#ffffff", # random
          
        }
        
        #flower_mapping = ["#ff00ff", "#ff0080", "#ffff33", "#33ffcc", "#3399ff", "#9933ff"]
        #if value == 16:
        #  return flower_mapping[self.flower]
          
        
        return color_mapping.get(value, "#ffffff")  # Default to white if value not found
        
    
    
    
    # --- deprecated
    def get_shape_from_value(self, value):
        # Map integer biome values to corresponding biome strings
        shape_mapping = {
          0: "g", 
          1: "f", 
          2: "m",
          3: "M",
          4: "p",
        }
        
        return shape_mapping.get(value, "m")
    
    # --- deprecated
    def get_biome_from_value(self, value):
        # Map integer biome values to corresponding biome strings
        biome_mapping = {0: "g", 1: "f", 2: "m", 3: "M", 4: "p"}
        return biome_mapping.get(value, "g")
    
    
    def get_preset(self):
      self.clear_canvas()
      
      biome = self.selected_shape_option.get() #self.get_shape_from_value(self.shape_var.get())
      #biome = self.get_biome_from_value(self.biome_var.get())
      
      orientation = "vertical" if self.canvas_height > self.canvas_width else "horizontal"
      
      presets = self.collect_presets(biome, orientation)
      
      if len(presets) != self.presets_length: # reset/change if different
        self.presets_length = len(presets)
        self.preset_index = 0
      
      preset_string = presets[self.preset_index][:-1]
      preset = self.string_to_dict(preset_string) # minus the comma
      
      self.preset_index += 1
      if self.preset_index >= self.presets_length:
        self.preset_index = 0
      
      preset_map_A = preset["top"] if orientation == "vertical" else preset["left"]
      preset_map_B = preset["bottom"] if orientation == "vertical" else preset["right"]
      
      for y in range(len(preset_map_A)):
        for x in range(len(preset_map_A[0])):
          value = preset_map_A[y][x]
          #if value in [400,401,402,403,404,405]:
          #  value = 400
            
          self.canvas_data[y+1][x+1] = value
          #outline = self.check_outline(x,y)
          self.canvas.create_rectangle(
            (x+1) * self.pixel_size, 
            (y+1) * self.pixel_size,
            (x+2) * self.pixel_size, 
            (y+2) * self.pixel_size,
            fill=self.preset_color(value),
            outline="gray"
          )
          color = self.translate_mapping[9999][value]
          self.draw_icon((x+1)*self.pixel_size, (y+1)*self.pixel_size, self.translate_mapping[color]["icon"])
      
      for y in range(len(preset_map_B)):
        for x in range(len(preset_map_B[0])):
          
          value = preset_map_B[y][x]
          
          
          if orientation == "vertical":
            
            self.canvas_data[y+1+16][x+1] = value
            #outline = self.check_outline(x,y)
            self.canvas.create_rectangle(
              (x+1) * self.pixel_size, 
              (y+1+16) * self.pixel_size,
              (x+2) * self.pixel_size, 
              (y+2+16) * self.pixel_size,
              fill=self.preset_color(value),
              outline="gray"
            )
            color = self.translate_mapping[9999][value]
            self.draw_icon((x+1)*self.pixel_size, (y+1+16)* self.pixel_size, self.translate_mapping[color]["icon"])
          else:
            
            self.canvas_data[y+1][x+1+16] = value
            #outline = self.check_outline(x,y)
            self.canvas.create_rectangle(
              (x+1+16) * self.pixel_size, 
              (y+1) * self.pixel_size,
              (x+2+16) * self.pixel_size, 
              (y+2) * self.pixel_size,
              fill=self.preset_color(value),
              outline="gray"
            )
            color = self.translate_mapping[9999][value]
            self.draw_icon((x+1+16)*self.pixel_size, (y+1)*self.pixel_size, self.translate_mapping[color]["icon"])
          
      
    def check_outline(self, x,y):
      outline = "gray"
      return outline
      
    def fade_color(self, x, y):
      d = "#dedede"
      e = "#ddeedd"
      fade = "white"
      if x == 0:
        if 6 <= y and y < 10:
          fade = d
        elif 22 <= y and y < 26:
          fade = d
      elif 6 <= x and x < 10:
        if y == 0:
          fade = d
        elif 6 <= y and y < 10:
          fade = d
        elif 22 <= y and y < 26:
          fade = d
        elif y == self.canvas_height-3:
          fade = d
      elif 22 <= x and x < 26:
        if y == 0:
          fade = d
        elif 6 <= y and y < 10:
          fade = d
        elif 22 <= y and y < 26:
          fade = d
        elif y == self.canvas_height-3:
          fade = d
      elif x == self.canvas_width-3:
        if 6 <= y and y < 10:
          fade = d
        elif 22 <= y and y < 26:
          fade = d
        
          
      return fade
    
    
    
    def preset_color(self, value):
      
      #d = "#ffffff"
      #e = "#ffffff"
      
      #pc = "#000000"
      #if 400 <= value and value <= 405:
      #  value = 400
      
      value_ = self.translate_mapping[9999][value]
      
      return self.get_color_from_value(value_)
    
    
    
    def draw_icon(self, x0, y0, icon=""):
      if icon:
        for y in range(16):
          for x in range(16):
            if self.icons[icon][y][x]:
              self.canvas.create_rectangle(x0+x, y0+y, x0+x+1, y0+y+1, fill="#000000", outline="")
    
    
    
              
    def save_canvas_data(self):
        
        new_contents = {}
        orientation = "horizontal"
        
        biome = self.selected_shape_option.get()
        
        if self.canvas_height > self.canvas_width:
          orientation = "vertical"
          vertical = {"top": [], "bottom": []}
          for j, rowy in enumerate(self.canvas_data):
            if j == 0 or j == self.canvas_height-1:
              continue
            if j < 17:
              try:
                row_ = [400+random.randint(0,5) if x == 406 else x for x in rowy[1:17]]
                if biome == "p":
                  row_ = [9 if x == 0 else x for x in row_]
                vertical["top"].append(row_)
              except:
                print(rowy)
                raise
            else:
              row_ = [400+random.randint(0,5) if x == 406 else x for x in rowy[1:17]]
              if biome == "p":
                row_ = [9 if x == 0 else x for x in row_]
              vertical["bottom"].append(row_)
              
          new_contents = str(vertical).strip().replace(" ", "")+","
          
        else:
          horizontal = {"left": [], "right": []}
          for j, rowy in enumerate(self.canvas_data):
            if j == 0 or j == self.canvas_height-1:
              continue
            row_l = [400+random.randint(0,5) if x == 406 else x for x in rowy[1:17]]
            if biome == "p":
              row_l = [9 if x == 0 else x for x in row_l]
            horizontal["left"].append(row_l)
            row_r = [400+random.randint(0,5) if x == 406 else x for x in rowy[17:-1]]
            if biome == "p":
              row_r = [9 if x == 0 else x for x in row_r]
            horizontal["right"].append(row_r)
          
          new_contents = str(horizontal).strip().replace(" ", "")+","
        
        
        #biome = self.get_biome_from_value(self.biome_var.get())  # Get selected biome
        biome = self.selected_shape_option.get()
        
        self.update_js_data(biome, orientation, new_contents)
        
    
    def string_to_dict(self, string):
        # Use ast.literal_eval to safely evaluate the string as a Python expression
        dictionary = ast.literal_eval(string)
        return dictionary        
    
    def collect_presets_(self, file_path, letter, orientation):
      collect_lines = []
      with open(file_path, 'r') as file_:
        lines = file_.readlines()
        #print(len(lines))
        enter_here = 0
        for i, line in enumerate(lines): 
          if i == 0:
            continue
          
          comp_line = line.strip().replace(" ", "")
          if enter_here == 2:
            #if comp_line in ['"f":{', '"g":{', '"m":{', '"M":{', '"vertical":[', '"horizontal":[']:
            if comp_line in ['"vertical":[', '"horizontal":[']:
              enter_here = 0
              break
              
            elif len(comp_line) < 5:
              enter_here = 0
              break
              
            else:
              collect_lines.append(comp_line)
          
          if enter_here == 1: 
            if (comp_line == '"vertical":[' and orientation == "vertical") or \
               (comp_line == '"horizontal":[' and orientation == "horizontal"):
              enter_here = 2
          
          if (comp_line == '"f":{' and letter == "f") or \
             (comp_line == '"g":{' and letter == "g") or \
             (comp_line == '"m":{' and letter == "m") or \
             (comp_line == '"M":{' and letter == "M") or \
             (comp_line == '"p":{' and letter == "p"):
            enter_here = 1
      
      return collect_lines
    
    
    def collect_presets(self, file_path, letter, orientation):
      collect_lines = []
      with open(file_path, 'r') as file_:
        lines = file_.readlines()
        #print(len(lines))
        enter_here = 0
        for i, line in enumerate(lines): 
          if i == 0:
            continue
          
          comp_line = line.strip().replace(" ", "")
          if enter_here == 1:
            if comp_line in ['"vertical":[', '"horizontal":[']:
              enter_here = 0
              break
              
            elif len(comp_line) < 5:
              enter_here = 0
              break
              
            else:
              collect_lines.append(comp_line)
          
          
          if (comp_line == '"vertical":[' and orientation == "vertical") or \
            (comp_line == '"horizontal":[' and orientation == "horizontal"):
            enter_here = 1
      
      return collect_lines
    
        
    def update_js_data(self, biome, orientation, data_array):
      # Read the JavaScript file
      #print(letter, orientation, data_array)
      if biome == "g":
        file_path = "grass_herringbone.js"
        export_line = "export const GRASS_HBTILES = {"
      elif biome == "f":
        file_path = "forest_herringbone.js"
        export_line = "export const FOREST_HBTILES = {"
      elif biome == "m":
        file_path = "mount_herringbone.js"
        export_line = "export const MOUNT_HBTILES = {"
      elif biome == "p":
        file_path = "peak_herringbone.js"
        export_line = "export const PEAK_HBTILES = {"
        
      
      
      collect_lines = []
      with open(file_path, 'r') as file_:
        lines = file_.readlines()
        #print(len(lines))
        insert_here = 0
        for i, line in enumerate(lines):
          
          if i == 0:
            
            collect_lines.append(export_line)
            continue
          #print(i, line)
          comp_line = line.strip().replace(" ", "")
          if insert_here == 1:
            collect_lines.append(data_array)
            #print(">>> data_array put here")
            insert_here = 0
          
          if (comp_line == '"vertical":[' and orientation == "vertical") or \
             (comp_line == '"horizontal":[' and orientation == "horizontal"):
            insert_here = 1
            #print(">>> found orientation")
          
          collect_lines.append(comp_line)
      
      collect_lines = [line+"\n" for line in collect_lines]  
      
      # Write the updated content back to the file
      with open(file_path, 'w') as file_:
        print("writing", orientation, biome, "tile to", file_path)
        file_.writelines(collect_lines)
    
    
    def delete_js_data(self):
      print("delete sketchy at the moment")
      return
      
      if self.preset_index == 0:
        return
        
      print("deleting", self.preset_index-1)
      
      collect_lines = []
      find_ = 0
      letter = self.get_biome_from_value(self.biome_var.get())  # Get selected biome
      orientation = "vertical" if self.canvas_height > self.canvas_width else "horizontal"
      
      file_path = "herringbone.js"
      with open(file_path, 'r') as file_:
        lines = file_.readlines()
        #print(len(lines))
        find_here = 0
        for i, line in enumerate(lines):
          
          if i == 0:
            collect_lines.append("export const HBTILES = {")
            continue
          #print(i, line)
          comp_line = line.strip().replace(" ", "")
          
          if find_here == 2:
            if find_ == self.preset_index-1:
              find_here = 4
              continue # skip appending
            else:
              find_ += 1
            #print(">>> data_array put here")
            #insert_here = 0
          if find_here == 1: 
            if (comp_line == '"vertical":[' and orientation == "vertical") or \
               (comp_line == '"horizontal":[' and orientation == "horizontal"):
              find_here = 2
              #print(">>> found orientation")
          
          if (comp_line == '"f":{' and letter == "f") or \
             (comp_line == '"g":{' and letter == "g") or \
             (comp_line == '"m":{' and letter == "m") or \
             (comp_line == '"M":{' and letter == "M"):
            find_here = 1
            #print(">>> found biome")
          
          collect_lines.append(comp_line)
      
      collect_lines = [line+"\n" for line in collect_lines]
      
      
      
      # Write the updated content back to the file
      with open(file_path, 'w') as file_:
        file_.writelines(collect_lines)
      
      #pass
        
'''
export const HBTILES = {
"g":{
"vertical":[
],
"horizontal":[
]
},
"f":{
"vertical":[
],
"horizontal":[
]
},
"m":{
"vertical":[
],
"horizontal":[
],
},
"m_":{
"vertical":[
],
"horizontal":[
]
},
"M":{
"vertical":[
],
"horizontal":[
]
},

}



'''  
  
  
      

if __name__ == "__main__":
    root = tk.Tk()
    paint_app = PaintApp(root)
    root.mainloop()
