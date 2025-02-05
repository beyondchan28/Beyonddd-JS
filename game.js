import * as be from "./src/beyonddd.js";

be.canvas_setup("canvas", 800, 600); // assigning canvas, context, and its size 
const menuScene = be.scene_create("Menu"); // creating scene (with GUI-only type of components)
be.scene_change("Menu"); // change to the scene as the current scene.

// running before the game start. used for setup entities, components, inputs etc. 
menuScene.setup = () => {
	be.input_press_create("X", "Space");
	be.input_down_create("XX", "Space");
	be.input_release_create("XXX", "Space");
}

// logic for inputs or what will happen if an input happenning
menuScene.input = () => {
	// console.log("pressed : ",be.is_key_pressed("X"));
	// console.log("down : ", be.is_key_down("XX"));
	// console.log("released : ", be.is_key_released("XXX"));
};


// used for game logic such as movement, physics, enemies, etc. 
menuScene.update = () => {
	// console.log("GAME LOGIC COMPUTED");
};


// used for rendering images, animations, and sprites
menuScene.draw = () => {
	// console.log("DRAWING THINGS");
};

window.onload = be.init; // entry point or game running



function game_level_setup() {

	be.input_create("UP", "Space");

	const levelScene = be.scene_create("Level");

	be.scene_change("Level");

	let player = be.entity_create("Player");
	let enemy = be.entity_create("Enemy");

	// be.asset_load_image("anim_walk", "assets/Spritesheet/walk.png");

	// be.component_add(player, "t");
	// be.component_add(enemy, "t");
	// let enemyT = be.component_get(enemy.transformIdx, "t");
	// enemyT.pos.y += 10;
	// enemyT.pos.x += 50;

	// be.component_add(player, "s");
	// be.component_add(enemy, "s");
	
	// be.sprite_set(player.spriteIdx, "anim_walk");
	// be.sprite_set(enemy.spriteIdx, "anim_walk");
	
	// be.component_add(player, "a");
	// be.animation_set_sprite(player.animationIdx, player.spriteIdx);
	// be.animation_setup(player.animationIdx, "PlayerWalk", 6, 5);

	// be.component_add(enemy, "a");
	// be.animation_set_sprite(enemy.animationIdx, enemy.spriteIdx);
	// be.animation_setup(enemy.animationIdx, "EnemyWalk", 6, 20);

	// console.log(currScene.cAnimations[player.spriteIdx].sprite.image.src);
	// console.log(newScene.entityMap);
	// console.log(es.sceneMap);
	

}




function _draw() {	
	

	// ctx.save();
	
	if (be.is_draw_image()) {
		if (!be.scene_is_gui_only()) {
			const sortedEntities = be.entities_y_sorted();
			const currSceneAnim = be.scene_get_current().cAnimations;
			const currSceneSpr = be.scene_get_current().cSprites;
			
			for (let ent of sortedEntities.values()) {
				be.animation_update(currSceneAnim[ent.animationIdx]);
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

