import * as be from "./src/beyonddd.js";

const SCENE_WIDTH = 800;
const SCENE_HEIGHT = 600;

be.canvas_setup("canvas", SCENE_WIDTH, SCENE_HEIGHT); // assigning canvas, context, and its size 
const menuScene = be.scene_create("Menu"); // creating scene (with GUI-only type of components)
be.scene_change("Menu"); // change to the scene as the current scene.

// running before the game start. used for setup entities, components, inputs etc. 
const BUTTON_AMOUNT = 3
const BUTTON_SIZE = 64
const BUTTON_GAP = 10;
const BUTTON_X_OFFSET = (SCENE_WIDTH / 2) - ((BUTTON_SIZE) * BUTTON_AMOUNT) / 2
const BUTTON_Y_OFFSET = SCENE_HEIGHT - BUTTON_SIZE - 30

for (let i = 0; i < BUTTON_AMOUNT; i += 1) {
	const button = be.entity_create(`button${i}`);
}
const player = be.entity_create("Player");
const enemy = be.entity_create("Enemy");


menuScene.setup = () => {
	be.input_press_create("X", be.KEY.SPACE);

	be.input_down_create("Up", be.KEY.W);
	be.input_down_create("Down", be.KEY.S);
	be.input_down_create("Left", be.KEY.A);
	be.input_down_create("Right", be.KEY.D);

	// be.input_down_create("XX", be.KEY.SPACE);
	// be.input_release_create("XXX", be.KEY.SPACE);

	be.asset_load_image("anim_walk", "assets/walk.png");
	be.asset_load_image("icon", "assets/icon.png");

	

	be.component_add(player, be.COMPONENT_TYPE.TRANSFORM);
	const playerT = be.component_get(player.get_id(), be.COMPONENT_TYPE.TRANSFORM);
	playerT.pos.x = 100;
	playerT.pos.y = 100;

	be.component_add(player, be.COMPONENT_TYPE.SPRITE);
	be.sprite_set(player.spriteIdx, "anim_walk");

	be.component_add(player, be.COMPONENT_TYPE.ANIMATION);
	be.animation_set_sprite(player.animationIdx, player.spriteIdx);
	be.animation_setup(player.animationIdx, "Walk", 6, 10);

	be.component_add(player, be.COMPONENT_TYPE.BOUNDING_BOX);
	be.bounding_box_set(
		player.boundingBoxIdx, 
		new be.Vector2(210/6, 43), 
		be.COLLISION_TYPE.KINEMATIC
	);

	for (let i = 0; i < BUTTON_AMOUNT; i += 1) {
		const button = be.entity_get(`button${i}`)

		be.component_add(button, be.COMPONENT_TYPE.TRANSFORM);
		const buttonT = be.component_get(
			button.get_id(), be.COMPONENT_TYPE.TRANSFORM
		);

		
		buttonT.pos.x = BUTTON_SIZE * i + BUTTON_X_OFFSET + (BUTTON_GAP * i);
		buttonT.pos.y = BUTTON_Y_OFFSET;

		be.component_add(button, be.COMPONENT_TYPE.SPRITE);
		// be.sprite_set(button.spriteIdx, "icon");

		be.component_add(button, be.COMPONENT_TYPE.BOUNDING_BOX);
		be.bounding_box_set(
			button.boundingBoxIdx, 
			new be.Vector2(BUTTON_SIZE, BUTTON_SIZE), 
			be.COLLISION_TYPE.STATIC
		);
	}

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

	if (be.is_key_down("Up")) {
		be.scene_get_current().cTransforms[player.transformIdx].pos.y -= 1;
	}

	if (be.is_key_down("Down")) {
		be.scene_get_current().cTransforms[player.transformIdx].pos.y += 1;
	}

	if (be.is_key_down("Left")) {
		be.scene_get_current().cTransforms[player.transformIdx].pos.x -= 1;
	}

	if (be.is_key_down("Right")) {
		be.scene_get_current().cTransforms[player.transformIdx].pos.x += 1;
	}

	be.scene_get_current().cTransforms[player.transformIdx].pos.normalize();
	// console.log("down : ", be.is_key_down("XX"));
	// console.log("released : ", be.is_key_released("XXX"));
};


const vel = new be.Vector2(1, 0);
// used for game logic such as movement, physics, enemies, etc. 
menuScene.update = () => {
	// console.log("GAME LOGIC COMPUTED");
};


window.onload = be.init; // entry point or game running
