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
	component_add(enemy, "t");
	let enemyT = component_get(enemy.transformIdx, "t");
	enemyT.pos.y += 10;
	enemyT.pos.x += 50;

	component_add(player, "s");
	component_add(enemy, "s");
	let enemyS = component_get(enemy.spriteIdx, "s");
	enemyS.flipH = true;
	sprite_set(player.spriteIdx, "anim_walk");
	sprite_set(enemy.spriteIdx, "anim_walk");
	
	component_add(player, "a");
	animation_set_sprite(player.animationIdx, player.spriteIdx);
	animation_setup(player.animationIdx, "PlayerWalk", 6, 5);

	component_add(enemy, "a");
	animation_set_sprite(enemy.animationIdx, enemy.spriteIdx);
	animation_setup(enemy.animationIdx, "EnemyWalk", 6, 20);

	// console.log(currScene.cAnimations[player.spriteIdx].sprite.image.src);
	// console.log(newScene.entityMap);
	// console.log(es.sceneMap);
	

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
	clear_background("lightblue");

	// ctx.save();
	
	if (es.isDrawImage) {
		const sortedEntities = entities_y_sorted();
		const currSceneAnim = es.currentScene.cAnimations;
		const currSceneSpr = es.currentScene.cSprites;
		
		for (let ent of sortedEntities.values()) {
			animation_update(currSceneAnim[ent.animationIdx]);
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

/* 
	NOTE: 
	using sorted entitis despite of the component array for the y_pos sort
	because there's sprites and animations that need to be sorted along side
	by its y position, so its more efficient if sort the entity rather than
	component's array.
*/
function entities_y_sorted() {
	const sortedEntities = new Map([...currScene.entityMap]
		.sort((e1, e2) => 
			(currScene.cTransforms[e1[1].transformIdx].pos.y + currScene.cSprites[e1[1].spriteIdx].halfSize) - 
			(currScene.cTransforms[e2[1].transformIdx].pos.y + currScene.cSprites[e2[1].spriteIdx].halfSize))
		);
	return sortedEntities;
}