## Beyonddd-JS
Small JavaScript Framework for Making Games !

Zero dependencies and written in vanilla javascript using HTML Canvas.

### How To Use
---
All files needed to start to building your game are in the *src* folder.

``` javascript
import * as bynd from "./src/beyonddd.js";

// assigning canvas, context, and its size 
bynd.canvas_setup("canvas", 800, 600); 

// creating scene (with GUI-only type of components)
const menuScene = bynd.scene_gui("Level"); 

// change to the scene and set it as the current scene.
bynd.scene_change("Level");

// running before the game start. used for setup entities, components, inputs etc. 
menuScene.setup = () => {
	//YOUR IMPLEMENTATION HERE
}

// logic for inputs or what will happen if an input happenning
menuScene.input = (input) => {
	if (input.type === "START") {
		if (input.name == "INPUT_NAME") {			
			console.log("pressed");
			//YOUR IMPLEMENTATION HERE
		}
	}

	else if (input.type === "END") {
		if (input.name == "INPUT_NAME") {
			console.log("release");
			//YOUR IMPLEMENTATION HERE
		}
	}
};


// used for game logic such as movement, physics, enemies, etc. 
menuScene.update = () => {
	//YOUR IMPLEMENTATION HERE
};


// used for rendering images, animations, and sprites
menuScene.draw = () => {
	//YOUR IMPLEMENTATION HERE
};

// entry point or game running
window.onload = bynd.init;

```
Here's the boilerplate to make your *game.js*.

``` html
<script type="module" src="game.js"></script>
```
and then include *game.js* as **module** in the *HTML file*.

### Project Goals
---
- Organized as simple as possible and as minimal as possible.
- Using vanilla JavaScript without any JS runtime needed.
- Integrate with other tools for game making tools. so it'll not bloat the framework.
- Making a sample game : Flappy Bird with Gun.

### To-Do List
---
- [x] Base proper game loop
- [x] Base grid
- [X] Input mapping
- [X] More component
- [X] Animation system
- [X] Scene system
- [X] Asset system
- [ ] Particle system
- [ ] Physics system
- [ ] Tiled/OGMO editor integration
