const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

window.onload = init; //start the game

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

function game_setup() {
	let newScene = scene_create("Menu");
	scene_change("Menu");

	let player = entity_create("Player");
	let enemy = entity_create("Enemy");

	asset_load_image("anim_walk", "assets/Spritesheet/walk.png");
	console.log(es.assetImageMap);

	component_add(player, "t");
	
	component_add(player, "s");
	component_sprite_set(player.spriteIdx, "anim_walk");
	
	component_add(player, "a");
	animation_set_sprite(player.animationIdx, player.spriteIdx);
	animation_setup(player.animationIdx, "PlayerWalk", 6, 5);

	console.log(currScene.cAnimations[player.spriteIdx].sprite.image.src);
	console.log(newScene.entityMap);
	console.log(es.sceneMap);

	// entity_setup();
	// assets_setup();
	// animation_setup();
	// collision_rect_setup();
	// grid_generate_data(64);
}

function init() {
	game_setup();
	window.requestAnimationFrame(update);
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

function update(timeStamp) {
	// if (!es.isPaused) {
	// 	input_process();
	// 	game_update();
	// }
	
	draw();
	// animation_update(cAnimations[0]);
	
	if (es.showFPS) {
		calculate_FPS(timeStamp);
	}

	window.requestAnimationFrame(update);
}

function draw() {	
	clear_background("brown");

	ctx.save();
	
	if (es.isDrawImage) {
		let currSceneAnim = es.currentScene.cAnimations
		for (let anim of currSceneAnim) {
			// console.log(anim);
			animation_update(anim);
		}
	}

	// if (es.isDrawCollisionShape) {
	// 	for (let ent of entityMap.values()) {
	// 		collision_rect_debug(ent.id);
	// 	}
	// }
	
	// grid_draw();

	ctx.restore();
}