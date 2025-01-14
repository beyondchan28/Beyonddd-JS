class Component {
	constructor() {
		this.userId = -1; // -1 means no entity using this component
	}
	get_user() {
		return this.userId;
	}
	set_user(entityId) {
		console.assert(typeof entityId !== "number", "Should enter a number");
		this.userId = entityId;
	}
	erase_user() {
		this.userId = -1;
	}
	is_used() {
		return (this.userId !== -1 ) ? true : false;
	}
}

class Transform extends Component {
	constructor(pos, rot, scale) {
		super();
		this.pos = (pos === undefined) ? new Vector2() : pos;
		this.rot = (rot === undefined) ? 0 : rot;
		this.scale = (scale === undefined) ? 1 : scale;
	}
}

class BoundingBox extends Component {
	constructor(size, halfSize) {
		super();
		this.size = (size === undefined) ? new Vector2() : size;
		this.halfSize = (halfSize === undefined) ? new Vector2() : halfSize;
	}
}

class Sprite extends Component {
	constructor(img, pos, size, spos, ssize) {
		super();
		this.img = (img === undefined) ? new Image() : img;
		this.pos = (pos === undefined) ? new Vector2() : pos; //starting point when first loaded
		this.size = (size === undefined) ? new Vector2(this.img.width, this.img.height) : size;
		this.spos = (spos === undefined) ? new Vector2() : spos;
		this.ssize = (ssize === undefined) ? new Vector2(this.img.width, this.img.height) : ssize;
 	}
}

class Animation extends Component {
	constructor(name, sprite, frameCount, currentFrame, speed, size) {
		super();
		this.name = (name === undefined) ? "" : name;
		this.sprite = (sprite === undefined) ? new Sprite() : sprite;
		this.frameCount = (frameCount === undefined) ? 1 : frameCount;
		this.currentFrame = (currentFrame === undefined) ? 0 : currentFrame;
		this.speed = (speed === undefined) ? 1 : speed;
		this.sprite.ssize = (size === undefined) ? new Vector2(this.sprite.img.width/this.frameCount, this.sprite.img.height) : size;
		this.sprite.size = (size === undefined) ? new Vector2(this.sprite.img.width/this.frameCount, this.sprite.img.height) : size;
	}
}


