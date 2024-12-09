
const canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 600;

const ctx = canvas.getContext("2d");
const playerSprite = document.getElementById("player");

window.onload = init; //start the game

//For calculating FPS
let secondsPassed = 0;
let oldTimeStamp = 0;
let fps = 0;

function init() {
	components_setup();
	entities_setup();
	grid_generate_data(64);

	window.requestAnimationFrame(game_loop);
}

function game_loop(timeStamp) {
	input();
	draw();
	calculate_FPS(timeStamp);

	window.requestAnimationFrame(game_loop);
}

function input() {
	document.addEventListener("keypress", (event) => {
		if (event.key === "d") {
			entities[0].transform.pos.x += 1;	
		}
	})
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

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "lightblue";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "green";
	ctx.fillRect(10,10,150,100);
	ctx.drawImage(playerSprite, entities[0].transform.pos.x, entities[0].transform.pos.y);
	grid_draw();
	grid_coordinate();
}


function draw_line(start, end) {
	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.lineTo(end.x, end.y);
	ctx.lineWidth = 2;
	ctx.stroke();
}

function draw_text(font, text, pos, tint) {
	ctx.font = font;
	ctx.fillStyle = tint;
	ctx.fillText(text, pos.x, pos.y);
}

