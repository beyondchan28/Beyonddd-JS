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

util.context_setup("canvas");
util.canvas_set_size(800, 600);
window.onload = _init; //start the game


function game_level_setup() {

	engine.input_create("UP", "Space");

	const levelScene = engine.scene_create("Level");

	engine.scene_change("Level");

	let player = engine.entity_create("Player");
	let enemy = engine.entity_create("Enemy");

	// engine.asset_load_image("anim_walk", "assets/Spritesheet/walk.png");

	// engine.component_add(player, "t");
	// engine.component_add(enemy, "t");
	// let enemyT = engine.component_get(enemy.transformIdx, "t");
	// enemyT.pos.y += 10;
	// enemyT.pos.x += 50;

	// engine.component_add(player, "s");
	// engine.component_add(enemy, "s");
	
	// engine.sprite_set(player.spriteIdx, "anim_walk");
	// engine.sprite_set(enemy.spriteIdx, "anim_walk");
	
	// engine.component_add(player, "a");
	// engine.animation_set_sprite(player.animationIdx, player.spriteIdx);
	// engine.animation_setup(player.animationIdx, "PlayerWalk", 6, 5);

	// engine.component_add(enemy, "a");
	// engine.animation_set_sprite(enemy.animationIdx, enemy.spriteIdx);
	// engine.animation_setup(enemy.animationIdx, "EnemyWalk", 6, 20);

	// console.log(currScene.cAnimations[player.spriteIdx].sprite.image.src);
	// console.log(newScene.entityMap);
	// console.log(es.sceneMap);
	

}

function game_menu_setup() {
	engine.input_create("UP", "Space");
	

	const menuScene = engine.scene_gui_create("Menu");
	
	menuScene.input = () => {
		for (let i of engine.input_get_array()) {
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
			
			i.type = "NONE";
		}
	};

	menuScene.draw();
	engine.scene_change("Menu");
	engine.scene_get_type();
}

function _init() {
	game_menu_setup();
	// game_level_setup();
	window.requestAnimationFrame(_update);
}

function _input() {
	engine.scene_get_current().input();
}

function _update(timeStamp) {
	if (!engine.is_paused()) {
		engine.input_process();
		_input();

		// game_update();
	}
	
	_draw();
	
	if (engine.is_show_fps()) {
		util.calculate_FPS(timeStamp);
	}

	window.requestAnimationFrame(_update);
}

function _draw() {	
	util.clear_background("lightblue");

	// ctx.save();
	
	if (engine.is_draw_image()) {
		if (!engine.scene_is_gui_only()) {
			const sortedEntities = engine.entities_y_sorted();
			const currSceneAnim = engine.scene_get_current().cAnimations;
			const currSceneSpr = engine.scene_get_current().cSprites;
			
			for (let ent of sortedEntities.values()) {
				engine.animation_update(currSceneAnim[ent.animationIdx]);
			}
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

