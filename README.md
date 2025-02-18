## Beyonddd-JS
Small JavaScript Framework for Making Games !

Zero dependencies and written in vanilla javascript using HTML Canvas.

### How To Use
---
All files needed to start to building your game are in the *src* folder.

``` javascript
// All the Engine API are in this file.
import * as be from "./src/beyonddd.js";

// assigning canvas, context, and its size 
be.canvas_setup("canvas", 800, 600); 

// creating scene
const scene = be.scene_create("Level"); 

// change to the scene and set it as the current scene.
be.scene_change("Level");

// running before the game start. used for setup entities, components, inputs etc. 
scene.setup = () => {
	be.input_press_create("buttonName", be.KEY.SPACE); //Mapping an Press-able Input
	be.asset_load_image("assetName", "/dir/to/asset"); //Adding Asset Image
	
	const entity = be.entity_create("Entity");
	be.component_add(entity, be.COMPONENT_TYPE.TRANSFORM); //adding __Transform__ Component to Entity 
	be.component_add(entity, be.COMPONENT_TYPE.SPRITE); //adding __Sprite__ Component to Entity
	
	be.sprite_set(entity.spriteIdx, "assetName"); //assign __Asset__ to Sprite 
	
	be.component_add(entity, be.COMPONENT_TYPE.ANIMATION); //adding __Animation__ Component to Entity
	be.animation_set_sprite(entity.animationIdx, entity.spriteIdx); //set Sprite to Animation
	be.animation_setup(entity.animationIdx, "EntityAnimation", 6, 5); //setup Animation properties
}

// logic for inputs or what will happen if an input happenning
scene.input = () => {
	if (be.is_key_pressed("buttonName")) {
		// LOGIC AFTER THE INPUT CHECKING
	}
};


// used for game logic such as movement, physics, enemies, etc. 
scene.update = () => {
	//YOUR IMPLEMENTATION HERE
};


// entry point or game running
window.onload = be.init;

```
Here's the example/boilerplate to make your *game.js*.

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
- [ ] Game editor
- [ ] Particle system
- [ ] Physics system
- [ ] Tiled/OGMO editor integration
