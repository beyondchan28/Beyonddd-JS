/* 
	architeture for making a level/scene 
		GameSettings
		
		READY : 
			> component setup
			> asset setup
			> animation setup
			> collision setup
			> input setup
			> entity setup
		PROCESS :
			> input process
			> as
			> game_logic


*/

//setup games assets here
function assets_setup() {
	asset_load_image("player", "assets/icon.png");
	asset_load_image("atlas", "assets/Spritesheet/roguelikeChar_transparent.png");
	asset_load_image("walk_anim", "assets/Spritesheet/walk.png");
}

//for setup its default values
function components_setup() {
 	cTransforms[0].pos.set(10,10);
 	cTransforms[1].pos.set(5,5);

 	cBoundingBoxes[0].size.set(20, 20);
	cBoundingBoxes[0].halfSize = (cBoundingBoxes[0].size).scale(0.5);

	cBoundingBoxes[1].size.set(100, 100);
	cBoundingBoxes[1].halfSize = (cBoundingBoxes[1].size).scale(0.5);
}

//setup bounding box here
function collision_rect_setup() {
	// console.log(collision_rect_check(0, 1));
}

function animation_setup() {
	let animSprite = new Sprite(assetImageMap.get("walk_anim"), cTransforms[0].pos);
	cSprites[0] = animSprite;
	let playerAnim = new Animation("walk", cSprites[0], 6, 0, 5);
	cAnimations[0] = playerAnim;
}

function input_setup() {
	input_create("UP", "w");
	console.log(input_map);
}

function entity_setup() {
	entity_create("player");
}

function game_setup() {
	// entity_setup();
	// assets_setup();
	// animation_setup();
	// collision_rect_setup();
	// grid_generate_data(64);
}


function game_update() {
	// player_input();
}

function player_input() {
	for (let i of inputMap.values()) {
		if (i.type === "START") {
			if (i.name == "UP") {
				console.log("pressed");
			}
		}

		else if (i.type === "END") {
			if (i.name == "UP") {
				console.log("release");
			}
		}
	}
}