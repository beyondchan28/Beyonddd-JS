/*
	This script includes all the pre-defined data types,
	Including Entity, Component, Scene, and Vector.
*/


export class Vector2 {
	constructor(x, y) {
		this.x = (x === undefined) ? 0 : x;
		this.y = (y === undefined) ? 0 : y;
	}
	set(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}
	clone() {
		return new Vector2(this.x, this.y)
	}
	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
	}
	addAndCopy(vector) {
		return new Vector2(this.x + vector.x, this.y + vector.y);
	}
	subtract(vector) {
		return new Vector2(this.x - vector.x, this.y - vector.y);
	}
	scale(scalar) {
		return new Vector2(this.x * scalar, this.y * scalar);
	}
	dot(vector) {
		return (this.x * vector.x + this.y * vector.y);
	}
	mutiply(vector) {
		return new Vector2(this.x * vector.x, this.y * vector.y);
	}
	delta(vector) {
		return new Vector2(Math.abs(this.x - vector.x), Math.abs(this.y - vector.y));
	}
	moveTowards(vector, t) {
		// Linearly interpolates between vectors A and B by t.
		// t = 0 returns A, t = 1 returns B
		t = Math.min(t, 1); // still allow negative t
		var diff = vector.subtract(this);
		return this.add(diff.scale(t));
	}
	magnitude() {
		return Math.sqrt(this.magnitudeSqr());
	}
	magnitudeSqr() {
		return (this.x * this.x + this.y * this.y);
	}
	distance(vector) {
		return Math.sqrt(this.distanceSqr(vector));
	}
	distanceSqr(vector) {
		var deltaX = this.x - vector.x;
		var deltaY = this.y - vector.y;
		return (deltaX * deltaX + deltaY * deltaY);
	}
	normalize() {
		var mag = this.magnitude();
		var vector = this.clone();
		if(Math.abs(mag) < 1e-9) {
			vector.x = 0;
			vector.y = 0;
		} else {
			vector.x /= mag;
			vector.y /= mag;
		}
		return vector;
	}
	angle() {
		return Math.atan2(this.y, this.x);
	}
	rotate(alpha) {
		var cos = Math.cos(alpha);
		var sin = Math.sin(alpha);
		var vector = new Vector2();
		vector.x = this.x * cos - this.y * sin;
		vector.y = this.x * sin + this.y * cos;
		return vector;
	}
	toPrecision(precision) {
		var vector = this.clone();
		vector.x = vector.x.toFixed(precision);
		vector.y = vector.y.toFixed(precision);
		return vector;
	}
	toString() {
		var vector = this.toPrecision(1);
		return ("[" + vector.x + "; " + vector.y + "]");
	}

}

class Component {
	constructor() {
		this.userId = -1; // -1 means no entity using this component
	}
	get_user() {
		return this.userId;
	}
	set_user(entityId) {
		this.userId = entityId;
	}
	erase_user() {
		this.userId = -1;
	}
	is_used() {
		return (this.userId !== -1 ) ? true : false;
	}
}

export class Transform extends Component {
	constructor(pos, rot, scale) {
		super();
		this.pos = (pos === undefined) ? new Vector2() : pos;
		this.rot = (rot === undefined) ? 0 : rot;
		this.scale = (scale === undefined) ? 1 : scale;
	}
}

export class BoundingBox extends Component {
	constructor(size, halfSize) {
		super();
		this.size = (size === undefined) ? new Vector2() : size;
		this.halfSize = (halfSize === undefined) ? new Vector2() : halfSize;
	}
}

export class Sprite extends Component {
	constructor(image, pos, size, spos, ssize) {
		super();
		this.image = (image === undefined) ? new Image() : image;
		this.pos = (pos === undefined) ? new Vector2() : pos; //starting point when first loaded
		this.size = (size === undefined) ? new Vector2(this.image.width, this.image.height) : size;
		this.spos = (spos === undefined) ? new Vector2() : spos;
		this.ssize = (ssize === undefined) ? new Vector2(this.image.width, this.image.height) : ssize;
 		this.halfSize = new Vector2();
 		this.flipH = false;
 	}
 	set_size() {
 		this.size = new Vector2(this.image.width, this.image.height);
		this.ssize = new Vector2(this.image.width, this.image.height);
		this.halfSize.set(this.image.width*0.5, this.image.height*0.5);
 	}
 	set_origin() {
 		this.pos.add(this.size.scale(0.5));
 	}
}

export class Animation extends Component {
	constructor(name, sprite, frameCount, currentFrame, speed, size) {
		super();
		this.name = (name === undefined) ? "" : name;
		this.sprite = (sprite === undefined) ? new Sprite() : sprite;
		this.frameCount = (frameCount === undefined) ? 1 : frameCount;
		this.currentFrame = (currentFrame === undefined) ? 0 : currentFrame;
		this.speed = (speed === undefined) ? 1 : speed;
		this.sprite.ssize = (size === undefined) ? new Vector2(this.sprite.image.width/this.frameCount, this.sprite.image.height) : size;
		this.sprite.size = (size === undefined) ? new Vector2(this.sprite.image.width/this.frameCount, this.sprite.image.height) : size;
	}

	setup(name, frameCount, speed) {
		this.name = name;
		this.frameCount = frameCount;
		this.speed = speed;
		this.sprite.ssize = new Vector2(this.sprite.image.width/this.frameCount, this.sprite.image.height);
		this.sprite.size = new Vector2(this.sprite.image.width/this.frameCount, this.sprite.image.height);
		this.sprite.halfSize.set(this.sprite.size.x*0.5, this.sprite.size.y*0.5);
	}
}

export class Text extends Component {
	constructor(font, text, pos, tint) {
		this.font = (font === undefined) ? "25px Arial" : font;
		this.text = (text === undefined) ? "TEXT WRITTEN HERE" : text;
		this.pos = (pos === undefined) ? new Vector2() : pos;
		this.tint = (tint === undefined) ? "black" : tint;
	}
}

export class ColorRectangle extends Component {
	constructor(pos, size, fillTint) {
		this.pos = (pos === undefined) ? new Vector2() : pos;
		this.size = (pos === undefined) ? new Vector2(1, 1) : size;
		this.fillTint === (fillTint === undefined) ? "white" : fillTint;
	}
}

export class Physics extends Component {
	constructor() {
		this.velocity = new Vector2();
		this.acceleration = new Vector2();
		this.maxSpeed = 0;
		this.maxForce = 0;
		this.mass = 0;
	}
}

/* 
	Note :
	the problem with Class approach (putting all the 
	components inside every entity) is
	when iterating through entityMap to access
	one specific component, it loads all the thing inside the
	entity, so it required a lot more time to call
	rather than grouped every component on its own
	data structure such as array. But its nicer to organized .
*/

export const ENTITY_TYPE = {
	GAMEPLAY_OBJECT: 0,
	GUI: 1,
}

export class Entity {
	constructor(entityType) {
		this.id = -1;
		this.active = true;
		
		// keep track the used comp by its index. -1 means using none.
		if (entityType === ENTITY_TYPE.GAMEPLAY_OBJECT) {
			this.transformIdx = -1;
			this.boundingBoxIdx = -1;
			this.spriteIdx = -1;
			this.animationIdx = -1;
		} else if (entityType === ENTITY_TYPE.GUI) {
			this.transformIdx = -1;
			this.textIdx = -1;
			this.colorRectIdx = -1;
		}
}
}

export const INPUT_TYPE = {
	PRESS: 0,
	RELEASE: 1,
	DOWN: 2,
}

export const INPUT_STATE = {
	PRESSED: 0,
	RELEASED: 1,
	NONE: 2,
}

export class InputKey {
	constructor(name, key, type) {
		this.name = name;
		this.key = key;
		this.type = type; //pressed, release, down 
		this.state = INPUT_STATE.NONE;
	}
}


export const SCENE_TYPE = {
	GUI_ONLY: 0,
	GAMEPLAY_ONLY: 1,
	DEFAULT: 2,
}

export class Scene {
	constructor(sceneType) {
		this.type = sceneType;
		this.setup = () => {console.error("This should be override/replaced as scene's _setup_ function")};
		this.input = () => {console.error("This should be override/replaced as scene's _input_ function")};
		this.update = () => {console.error("This should be override/replaced as scene's _update_ function")}; // game logic goes here
		switch (sceneType) {
			case SCENE_TYPE.GUI_ONLY:
				this.guiEntityMap = new Map();
				this.cTexts = new Array();
				this.cColorRectangles = new Array();
				break;
			case SCENE_TYPE.GAMEPLAY_ONLY:
				this.entityMap = new Map();
				this.cTransforms = new Array();
				this.cBoundingBoxes = new Array();
				this.cSprites = new Array();
				this.cAnimations = new Array();
				break;
			case SCENE_TYPE.DEFAULT:
				this.guiEntityMap = new Map();
				this.cTexts = new Array();
				this.cColorRectangles = new Array();

				this.entityMap = new Map();
				this.cTransforms = new Array();
				this.cBoundingBoxes = new Array();
				this.cSprites = new Array();
				this.cAnimations = new Array();
				break;
		}
	}
}


export class EngineSettings {
	constructor() {
		this.isPaused = false;
		this.isDrawImage = true;
		this.isDrawCollisionShape = false;
		this.showFPS = true;

		this.inputMap = new Map();
		this.sceneMap = new Map();
		this.assetImageMap = new Map();

		this.currentScene = null;
	}

}
