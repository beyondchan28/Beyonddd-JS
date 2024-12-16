const ENTITES_AMOUNT = 1;

let cTransfroms = new Array(ENTITES_AMOUNT);
let cSprites = new Array(ENTITES_AMOUNT);

//component interface
class Transform {
	constructor(pos, rot, scale) {
		this.pos = (pos === undefined) ? new Vector2() : pos;
		this.rot = (rot === undefined) ? 0 : rot;
		this.scale = (scale === undefined) ? 1 : scale;
	}
}

class Sprite {
	constructor(img, pos, size, spos, ssize) {
		this.img = (img === undefined) ? new Image() : img;
		this.pos = (pos === undefined) ? new Vector2() : pos; //starting point when first loaded
		this.size = (size === undefined) ? new Vector2(this.img.width, this.img.height) : size;
		this.spos = (spos === undefined) ? new Vector2() : spos;
		this.ssize = (ssize === undefined) ? new Vector2(this.img.width, this.img.height) : ssize;
 	}
}

//for setup its default values
function components_setup() {
	for (let i = 0; i < ENTITES_AMOUNT; i += 1) {
		cTransfroms[i] = new Transform();
	}

}