import * as bynd from "./src/beyonddd.js";

bynd.canvas_setup("canvas", 800, 600); // assigning canvas, context, and its size 
const menuScene = bynd.scene_create("Menu"); // creating scene (with GUI-only type of components)
bynd.scene_change("Menu"); // change to the scene as the current scene.

// running before the game start. used for setup entities, components, inputs etc. 
menuScene.setup = () => {
	bynd.input_press_create("X", "Space");
	bynd.input_down_create("XX", "Space");
	bynd.input_release_create("XXX", "Space");
}

// logic for inputs or what will happen if an input happenning
menuScene.input = () => {
	// console.log("pressed : ",bynd.is_key_pressed("X"));
	// console.log("down : ", bynd.is_key_down("XX"));
	console.log("released : ", bynd.is_key_released("XXX"));
};


// used for game logic such as movement, physics, enemies, etc. 
menuScene.update = () => {
	// console.log("GAME LOGIC COMPUTED");
};


// used for rendering images, animations, and sprites
menuScene.draw = () => {
	// console.log("DRAWING THINGS");
};

window.onload = bynd.init; // entry point or game running



function game_level_setup() {

	bynd.input_create("UP", "Space");

	const levelScene = bynd.scene_create("Level");

	bynd.scene_change("Level");

	let player = bynd.entity_create("Player");
	let enemy = bynd.entity_create("Enemy");

	// bynd.asset_load_image("anim_walk", "assets/Spritesheet/walk.png");

	// bynd.component_add(player, "t");
	// bynd.component_add(enemy, "t");
	// let enemyT = bynd.component_get(enemy.transformIdx, "t");
	// enemyT.pos.y += 10;
	// enemyT.pos.x += 50;

	// bynd.component_add(player, "s");
	// bynd.component_add(enemy, "s");
	
	// bynd.sprite_set(player.spriteIdx, "anim_walk");
	// bynd.sprite_set(enemy.spriteIdx, "anim_walk");
	
	// bynd.component_add(player, "a");
	// bynd.animation_set_sprite(player.animationIdx, player.spriteIdx);
	// bynd.animation_setup(player.animationIdx, "PlayerWalk", 6, 5);

	// bynd.component_add(enemy, "a");
	// bynd.animation_set_sprite(enemy.animationIdx, enemy.spriteIdx);
	// bynd.animation_setup(enemy.animationIdx, "EnemyWalk", 6, 20);

	// console.log(currScene.cAnimations[player.spriteIdx].sprite.image.src);
	// console.log(newScene.entityMap);
	// console.log(es.sceneMap);
	

}




function _draw() {	
	

	// ctx.save();
	
	if (bynd.is_draw_image()) {
		if (!bynd.scene_is_gui_only()) {
			const sortedEntities = bynd.entities_y_sorted();
			const currSceneAnim = bynd.scene_get_current().cAnimations;
			const currSceneSpr = bynd.scene_get_current().cSprites;
			
			for (let ent of sortedEntities.values()) {
				bynd.animation_update(currSceneAnim[ent.animationIdx]);
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

