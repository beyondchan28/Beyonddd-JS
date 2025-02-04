// All the Engine API are in this file.
import * as bynd from "./src/beyonddd.js";

// assigning canvas, context, and its size 
bynd.canvas_setup("canvas", 800, 600); 

// creating scene
const scene = bynd.scene_create("Level"); 

// change to the scene and set it as the current scene.
bynd.scene_change("Level");

// running before the game start. used for setup entities, components, inputs etc. 
scene.setup = () => {
	bynd.input_press_create("buttonName", "keyCode"); //Mapping an Press-able Input
	bynd.asset_load_image("assetName", "assetPath"); //Adding Asset Image
	
	const entity = bynd.entity_create("Entity");
	bynd.component_add(entity, "t"); //adding __Transform__ Component to Entity 
	bynd.component_add(entity, "s"); //adding __Sprite__ Component to Entity
	
	bynd.sprite_set(entity.spriteIdx, "assetName"); //assign __Asset__ to Sprite 
	
	bynd.component_add(entity, "a"); //adding __Animation__ Component to Entity
	bynd.animation_set_sprite(entity.animationIdx, entity.spriteIdx); //set Sprite to Animation
	bynd.animation_setup(entity.animationIdx, "EntityAnimation", 6, 5); //setup Animation properties
}

// logic for inputs or what will happen if an input happenning
scene.input = () => {
	if (bynd.is_key_pressed("buttonName")) {
		// LOGIC AFTER THE INPUT CHECKING
	}
};


// used for game logic such as movement, physics, enemies, etc. 
scene.update = () => {
	//YOUR IMPLEMENTATION HERE
};


// used for rendering images, animations, and sprites
scene.draw = () => {
	//YOUR IMPLEMENTATION HERE
};

// entry point or game running
window.onload = bynd.init;
