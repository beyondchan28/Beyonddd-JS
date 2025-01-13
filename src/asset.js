const asset_image_map = new Map();

function asset_load_image(name, src) {
	let img = new Image();
	img.src = src;
	asset_image_map.set(name, img);
	return img;
}

//TODO: load atlas
function asset_process() {
	for (let s of cSprites) {
		draw_image(s);
	}
}