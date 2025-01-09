const ENTITES_AMOUNT = 2;

let cTransforms = new Array(ENTITES_AMOUNT);
let cSprites = new Array(ENTITES_AMOUNT);
let cBoundingBoxes = new Array(ENTITES_AMOUNT);

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

class BoundingBox {
	constructor(size, halfSize) {
		this.size = (size === undefined) ? new Vector2() : size;
		this.halfSize = (halfSize === undefined) ? new Vector2() : halfSize;
	}
}

//for setup its default values
function components_setup() {
	for (let i = 0; i < ENTITES_AMOUNT; i += 1) {
		cTransforms[i] = new Transform();
		cSprites[i] = new Sprite();
		cBoundingBoxes[i] = new BoundingBox();
 	}

 	cTransforms[0].pos.set(10,10);
 	cTransforms[1].pos.set(5,5);

 	cBoundingBoxes[0].size.set(20, 20);
	cBoundingBoxes[0].halfSize = (cBoundingBoxes[0].size).scale(0.5);

	cBoundingBoxes[1].size.set(100, 100);
	cBoundingBoxes[1].halfSize = (cBoundingBoxes[1].size).scale(0.5);
}