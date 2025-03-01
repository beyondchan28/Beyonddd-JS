import * as be from "./src/beyonddd.js";

be.canvas_setup("canvas", 800, 600); // assigning canvas, context, and its size 
const menuScene = be.scene_create("Menu"); // creating scene (with GUI-only type of components)
be.scene_change("Menu"); // change to the scene as the current scene.

// running before the game start. used for setup entities, components, inputs etc. 
const player = be.entity_create("Player");
menuScene.setup = () => {
	be.input_press_create("X", be.KEY.SPACE);
	be.input_down_create("XX", be.KEY.SPACE);
	be.input_release_create("XXX", be.KEY.SPACE);

	be.asset_load_image("anim_walk", "assets/spritesheet/walk.png");
	be.asset_load_image("icon", "assets/icon.png");

	be.component_add(player, be.COMPONENT_TYPE.TRANSFORM);
	const playerT = be.component_get(player.transformIdx, be.COMPONENT_TYPE.TRANSFORM);
	playerT.pos.x = 400;
	playerT.pos.y = 300;

	be.component_add(player, be.COMPONENT_TYPE.SPRITE);
	be.sprite_set(player.spriteIdx, "anim_walk");

	be.component_add(player, be.COMPONENT_TYPE.ANIMATION);
	be.animation_set_sprite(player.animationIdx, player.spriteIdx);
	be.animation_setup(player.animationIdx, "Walk", 6, 5);

	const pePos = playerT.pos.clone();
	be.component_add(player, be.COMPONENT_TYPE.PARTICLE_EMITTER);
	be.particle_emitter_set(
		player.particleEmitterIdx, 
		pePos, 
		1.5, 
		1000, 
		be.COLOR.RED, 
		new be.Vector2(-3, -3), 
		new be.Vector2(3, 3),
		new be.Vector2(10, 10)
	);

}

// logic for inputs or what will happen if an input happenning
menuScene.input = () => {
	// console.log("pressed : ",be.is_key_pressed("X"));
	const playerSprite = be.component_get(player.spriteIdx, be.COMPONENT_TYPE.SPRITE);
	if (be.is_key_pressed("X")) {
		if (playerSprite.flipH) {
			playerSprite.flipH = false;
		} else {
			playerSprite.flipH = true;
		}
	}
	// console.log("down : ", be.is_key_down("XX"));
	// console.log("released : ", be.is_key_released("XXX"));
};


const vel = new be.Vector2(1, 0);
// used for game logic such as movement, physics, enemies, etc. 
menuScene.update = () => {
	// console.log("GAME LOGIC COMPUTED");
};


window.onload = be.init; // entry point or game running
