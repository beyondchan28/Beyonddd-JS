const playerImg = document.getElementById("player");
const atlas = document.getElementById("atlas");

//setup games assets here
function assets_setup() {
	let pos = new Vector2(10, 10);
	let sprite = new Sprite(playerImg, pos);
	console.log(sprite);
	cSprites.push(sprite);
	entities[0].sprite = sprite;
	console.log(cSprites);
}

//TODO: load atlas

function asset_process() {
	for (let e of entities) {
		draw_image(e.sprite);
	}
}