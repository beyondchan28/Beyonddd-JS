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

import * as engine from "./engine.js";
import * as util from "./utility.js";

window.onload = _init; //start the game


function game_setup() {
	util.context_setup("canvas");
	util.canvas_set_size(800, 600);

	engine.input_create("UP", "Space");

	let newScene = engine.scene_create("Menu");
	engine.scene_change("Menu");

	let player = engine.entity_create("Player");
	let enemy = engine.entity_create("Enemy");

	engine.asset_load_image("anim_walk", "assets/Spritesheet/walk.png");
	console.log(engine.settings.assetImageMap);

	engine.component_add(player, "t");
	engine.component_add(enemy, "t");
	let enemyT = engine.component_get(enemy.transformIdx, "t");
	enemyT.pos.y += 10;
	enemyT.pos.x += 50;

	engine.component_add(player, "s");
	engine.component_add(enemy, "s");
	
	engine.sprite_set(player.spriteIdx, "anim_walk");
	engine.sprite_set(enemy.spriteIdx, "anim_walk");
	
	engine.component_add(player, "a");
	engine.animation_set_sprite(player.animationIdx, player.spriteIdx);
	engine.animation_setup(player.animationIdx, "PlayerWalk", 6, 5);

	engine.component_add(enemy, "a");
	engine.animation_set_sprite(enemy.animationIdx, enemy.spriteIdx);
	engine.animation_setup(enemy.animationIdx, "EnemyWalk", 6, 20);

	// console.log(currScene.cAnimations[player.spriteIdx].sprite.image.src);
	// console.log(newScene.entityMap);
	// console.log(es.sceneMap);
	

}

function _init() {
	game_setup();
	window.requestAnimationFrame(_update);
}

function game_update() {
	
}

function _input() {
	for (let i of engine.settings.inputArr) {
		if (i.type === "START") {
			if (i.name == "UP") {
				console.log("pressed");
				const enemy = engine.entity_get("Enemy");
				const enemyS = engine.component_get(enemy.spriteIdx, "s");
				if (enemyS.flipH) {
					enemyS.flipH = false;
				} else {
					enemyS.flipH = true;

				}
			}
		}

		else if (i.type === "END") {
			if (i.name == "UP") {
				console.log("release");
			}
		}

		i.type = "NONE";
	}
}

function _update(timeStamp) {
	if (!engine.settings.isPaused) {
		engine.input_process();
		_input();

		// game_update();
	}
	
	_draw();
	
	if (engine.settings.showFPS) {
		util.calculate_FPS(timeStamp);
	}

	window.requestAnimationFrame(_update);
}

function _draw() {	
	util.clear_background("lightblue");

	// ctx.save();
	
	if (engine.settings.isDrawImage) {
		const sortedEntities = engine.entities_y_sorted();
		const currSceneAnim = engine.settings.currentScene.cAnimations;
		const currSceneSpr = engine.settings.currentScene.cSprites;
		
		for (let ent of sortedEntities.values()) {
			engine.animation_update(currSceneAnim[ent.animationIdx]);
		}
	}
	// grid_draw();

	// if (es.isDrawCollisionShape) {
	// 	for (let ent of entityMap.values()) {
	// 		collision_rect_debug(ent.id);
	// 	}
	// }
	

	// ctx.restore();
}

