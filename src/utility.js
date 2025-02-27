/* 
	This script have all the API from the canvas/window.
	including rendering depedency stuff to screen and FPS.

	rendering on different file is for such case that
	the engine need to change with new rendering library.
*/


//TODO : Mapped color to obj to avoid string

let canvas
let ctx 


//For calculating FPS
export let secondsPassed = 0;
let oldTimeStamp = 0;
let fps = 0;

export function context_setup(ctxId) {
	canvas =  document.getElementById(ctxId);
	ctx = canvas.getContext("2d");
}

export function canvas_set_size(width, height) {
	canvas.width = width;
	canvas.height = height;
}

export function canvas_get() {
	return canvas;
}

export function context_get() {
	return ctx;
}

export function canvas_set_translate(pos) {
	ctx.save();
	ctx.translate(pos.x, pos.y);
}

export function calculate_FPS(ts) {
	secondsPassed = (ts - oldTimeStamp) / 1000;
	oldTimeStamp = ts;

	fps = Math.round(1 / secondsPassed);
	ctx.fillStyle = "white";
	ctx.fillRect(0, canvas.height, 200, 100);
	ctx.font = "25px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("FPS: " + fps, canvas.width - 100, 30);
}

export function clear_background(col) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = col;
	ctx.fillRect(0, 0, canvas.width, canvas.height); //background
}

export function draw_line(start, end) {
	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.lineTo(end.x, end.y);
	ctx.lineWidth = 2;
	// ctx.stroke();
}

export function draw_circle(center, radius, outlineTint, fillTint) {
	ctx.beginPath();
	ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
	ctx.strokeStyle = outlineTint;
	ctx.stroke();
	ctx.fillStyle = fillTint;
	ctx.fill();
}

export function draw_text(font, text, pos, tint) {
	ctx.font = font;
	ctx.fillStyle = tint;
	ctx.fillText(text, pos.x, pos.y);
}

export function draw_rect(pos, size, fillTint) {
	ctx.fillStyle = fillTint;
	ctx.fillRect(pos.x, pos.y, size.x, size.y);
}

export function draw_stroke_rect(pos, size, strokeTint) {
	ctx.strokeStyle = strokeTint;
	ctx.strokeRect(pos.x, pos.y, size.x, size.y);
}

export function draw_image(sprite) {
	if (sprite.flipH) {
		ctx.save();
		ctx.translate(sprite.pos.x, sprite.pos.y);
		ctx.scale(-1, 1);
		ctx.drawImage(sprite.image, 
			sprite.spos.x, sprite.spos.y, 
			sprite.ssize.x, sprite.ssize.y, 
			0, 0, 
			-sprite.size.x, sprite.size.y
		);
		ctx.restore();
	} else if (!sprite.flipH) {		
		ctx.drawImage(sprite.image, 
			sprite.spos.x, sprite.spos.y, 
			sprite.ssize.x, sprite.ssize.y, 
			sprite.pos.x, sprite.pos.y, 
			sprite.size.x, sprite.size.y
		);
	}
}
