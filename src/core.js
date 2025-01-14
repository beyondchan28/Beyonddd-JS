const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

window.onload = init; //start the game

function init() {
	game_setup();
	window.requestAnimationFrame(update);
}

function update(timeStamp) {
	// if (!gameSettings.isPaused) {
	// 	input_process();
	// 	game_update();
	// }
	
	draw();
	// animation_update(cAnimations[0]);
	
	if (gameSettings.showFPS) {
		calculate_FPS(timeStamp);
	}

	window.requestAnimationFrame(update);
}

function draw() {	
	clear_background("brown");

	ctx.save();
	
	// if (gameSettings.isDrawImage) {
	// 	asset_process();
	// }

	// if (gameSettings.isDrawCollisionShape) {
	// 	for (let ent of entityMap.values()) {
	// 		collision_rect_debug(ent.id);
	// 	}
	// }
	
	// grid_draw();

	ctx.restore();
}