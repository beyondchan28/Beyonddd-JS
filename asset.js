const playerImg = document.getElementById("player");
const atlas = document.getElementById("atlas");

//setup games assets here
function assets_setup() {
	let sprite = new Sprite(playerImg, cTransforms[0].pos);
	cSprites[0] = sprite;
}

//TODO: load atlas
function asset_process() {
	for (let s of cSprites) {
		draw_image(s);
	}
}