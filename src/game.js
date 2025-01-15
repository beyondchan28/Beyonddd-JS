/* 
	architeture for making a level/scene 
		GameSettings
		
		READY :
			> scene setup 
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

const es = new EngineSettings();

function game_setup() {
	let newScene = scene_create("Menu", es.sceneMap);
	let player = entity_create("Player", newScene);
	let enemy = entity_create("Enemy", newScene);

	asset_load_image("anim_walk", "assets/Spritesheet/walk.png", es.assetImageMap);
	console.log(es.assetImageMap);

	let newTransform = new Transform();
	let newSprite = new Sprite();
	let newAnimation = new Animation();

	component_add(player, "t", newScene);
	component_add(player, "s", newScene);
	component_add(player, "a", newScene);

	console.log(newScene.cTransforms);
	console.log(newScene.entityMap);
	console.log(es.sceneMap);

	es.currentScene = newScene;
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