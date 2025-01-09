
const canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 600;

const ctx = canvas.getContext("2d");

window.onload = init; //start the game

//For calculating FPS
let secondsPassed = 0;
let oldTimeStamp = 0;
let fps = 0;

function init() {
	components_setup();
	entities_setup();
	// assets_setup();
	collision_rect_setup();
	grid_generate_data(64);
	input_setup();

	window.requestAnimationFrame(game_loop);
}

function game_loop(timeStamp) {
	input_process();
	draw();
	calculate_FPS(timeStamp);

	window.requestAnimationFrame(game_loop);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "lightblue";
	ctx.fillRect(0, 0, canvas.width, canvas.height); //background
	
	ctx.save();

	draw_circle(new Vector2(200, 100), 20, "black", "red");

	collision_rect_debug(0, 1);
	asset_process();
	
	// grid_draw();

	ctx.restore();
}

function calculate_FPS(ts) {
	secondsPassed = (ts - oldTimeStamp) / 1000;
	oldTimeStamp = ts;

	fps = Math.round(1 / secondsPassed);
	
	ctx.fillStyle = "white";
	ctx.fillRect(0, canvas.height, 200, 100);
	ctx.font = "25px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("FPS: " + fps, canvas.width - 100, 30);
}


function draw_line(start, end) {
	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.lineTo(end.x, end.y);
	ctx.lineWidth = 2;
	ctx.stroke();
}

function draw_circle(center, radius, outlineTint, fillTint) {
	ctx.beginPath();
	ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
	ctx.strokeStyle = outlineTint;
	ctx.stroke();
	ctx.fillStyle = fillTint;
	ctx.fill();
}

function draw_text(font, text, pos, tint) {
	ctx.font = font;
	ctx.fillStyle = tint;
	ctx.fillText(text, pos.x, pos.y);
}

function draw_rect(pos, size, fillTint) {
	ctx.fillStyle = fillTint;
	ctx.fillRect(pos.x, pos.y, size.x, size.y);
}

function draw_stroke_rect(pos, size, strokeTint) {
	ctx.strokeStyle = strokeTint;
	ctx.strokeRect(pos.x, pos.y, size.x, size.y);
}

function draw_image(sprite) {
	ctx.drawImage(sprite.img, sprite.spos.x, sprite.spos.y, sprite.ssize.x, sprite.ssize.y, sprite.pos.x, sprite.pos.y, sprite.size.x, sprite.size.y);
}