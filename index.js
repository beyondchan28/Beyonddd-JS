
const canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 600;

const ctx = canvas.getContext("2d");
const playerSprite = document.getElementById("player");

const ENTITES_AMOUNT = 1;
let entities = new Array(ENTITES_AMOUNT);
let cTransfroms = new Array(ENTITES_AMOUNT);

window.onload = init; //start the game

//component interface
class Transform {
	constructor(pos, rot) {
		this.pos = (pos === undefined) ? new Vector2() : pos;
		this.rot = (rot === undefined) ? 0 : rot; 
	}
}

//for setup its default values
function components_setup() {
	for (let i = 0; i < ENTITES_AMOUNT; i += 1) {
		cTransfroms[i] = new Transform();
	}

}

function entities_setup() {
	for (let i = 0; i < ENTITES_AMOUNT; i += 1) {
		let entity = {
			transform : cTransfroms[i],
		}
		entities[i]= entity;
	}
}

function init() {
	components_setup();
	entities_setup();
	console.log(cTransfroms);
	console.log(entities);

	window.requestAnimationFrame(game_loop);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "lightblue";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "green";
	ctx.fillRect(10,10,150,100);
	ctx.drawImage(playerSprite, entities[0].transform.pos.x, entities[0].transform.pos.y);
}

function input() {
	document.addEventListener("keypress", (event) => {
		if (event.key === "d") {
			console.log(entities[0]);
			entities[0].transform.pos.x += 1;	
		}
	})
}

let secondsPassed = 0;
let oldTimeStamp = 0;
let fps = 0;

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

function game_loop(timeStamp) {
	input();
	draw();
	calculate_FPS(timeStamp);

	window.requestAnimationFrame(game_loop);
}
