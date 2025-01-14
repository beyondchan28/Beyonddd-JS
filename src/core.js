window.onload = init; //start the game

function init() {
	game_setup();
	window.requestAnimationFrame(update);
}

function update(timeStamp) {
	// input_process();
	game_update();
	draw();
	// animation_update(cAnimations[0]);
	calculate_FPS(timeStamp);

	window.requestAnimationFrame(update);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "lightblue";
	ctx.fillRect(0, 0, canvas.width, canvas.height); //background
	
	ctx.save();


	// for (let ent of entityMap.values()) {
	// 	collision_rect_debug(ent.id);
	// }
	// asset_process();
	
	// grid_draw();

	ctx.restore();
}