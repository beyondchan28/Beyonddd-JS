window.onload = init; //start the game

function init() {
	components_setup();
	entities_setup();
	// assets_setup();
	animation_setup();
	collision_rect_setup();
	grid_generate_data(64);
	input_setup();

	window.requestAnimationFrame(game_loop);
}

function game_loop(timeStamp) {
	input_process();
	update();
	draw();
	animation_update(cAnimations[0], timeStamp);
	calculate_FPS(timeStamp);

	window.requestAnimationFrame(game_loop);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "lightblue";
	ctx.fillRect(0, 0, canvas.width, canvas.height); //background
	
	ctx.save();

	collision_rect_debug(0, 1);
	// asset_process();
	
	// grid_draw();


	ctx.restore();
}




