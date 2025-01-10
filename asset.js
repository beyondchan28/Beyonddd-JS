let playerImg = load_image("assets/icon.png");
let atlas = load_image("assets/Spritesheet/roguelikeChar_transparent.png");

//setup games assets here
function assets_setup() {
	let sprite = new Sprite(playerImg, cTransforms[0].pos);
	cSprites[0] = sprite;
}

function load_image(src) {
	let img = new Image();
	img.src = src;
	return img;
}

//TODO: load atlas
function asset_process() {
	for (let s of cSprites) {
		draw_image(s);
	}
}