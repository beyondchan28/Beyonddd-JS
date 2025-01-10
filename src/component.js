const ENTITES_AMOUNT = 2;

let cTransforms = new Array(ENTITES_AMOUNT);
let cSprites = new Array(ENTITES_AMOUNT);
let cBoundingBoxes = new Array(ENTITES_AMOUNT);
let cAnimations = new Array(ENTITES_AMOUNT);

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

//component interface
class Transform {
	constructor(pos, rot, scale) {
		this.pos = (pos === undefined) ? new Vector2() : pos;
		this.rot = (rot === undefined) ? 0 : rot;
		this.scale = (scale === undefined) ? 1 : scale;
	}
}

class BoundingBox {
	constructor(size, halfSize) {
		this.size = (size === undefined) ? new Vector2() : size;
		this.halfSize = (halfSize === undefined) ? new Vector2() : halfSize;
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

class Animation {
	constructor(name, sprite, frameCount, currentFrame, speed, size) {
		this.name = (name === undefined) ? "" : name;
		this.sprite = (sprite === undefined) ? new Sprite() : sprite;
		this.frameCount = (frameCount === undefined) ? 0 : frameCount;
		this.currentFrame = (currentFrame === undefined) ? 0.0 : currentFrame;
		this.speed = (speed === undefined) ? 1 : speed;
		this.sprite.ssize = (size === undefined) ? new Vector2(this.sprite.img.width/this.frameCount, this.sprite.img.height) : size;
	}
}


