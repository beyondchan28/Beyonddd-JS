/*
	This script includes all the APIs for the engine.
*/

import * as util from "./utility.js";

const INPUT_TYPE = {
    PRESS:   0,
    RELEASE: 1,
    DOWN:    2,
}

const INPUT_STATE = {
    PRESSED:  0,
    RELEASED: 1,
    NONE:     2,
}

const ENTITY_TYPE = {
    GAMEPLAY_OBJECT: 0,
    GUI:             1,
}

const SCENE_TYPE = {
    GUI_ONLY:      0,
    GAMEPLAY_ONLY: 1,
    DEFAULT:       2,
}


export const KEY = {
    SPACE:       " ",
    TAB:         "Tab",
    ENTER:       "Enter",
    SHIFT:       "Shift",
    CONTROL:     "Control",
    ALT:         "Alt",
    CAPSLOCK:    "CapsLock",
    ESCAPE:      "Escape",
    ARROW_LEFT:  "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    ARROW_UP:    "ArrowUp",
    ARROW_DOWN:  "ArrowDown",
    A:           "a",
    B:           "b",
    C:           "c",
    D:           "d",
    E:           "e",
    F:           "f",
    G:           "g",
    H:           "h",
    I:           "i",
    J:           "j",
    K:           "k",
    L:           "l",
    M:           "m",
    N:           "n",
    O:           "o",
    P:           "p",
    Q:           "q",
    R:           "r",
    S:           "s",
    T:           "t",
    U:           "u",
    V:           "v",
    W:           "w",
    X:           "x",
    Y:           "y",
    Z:           "z",
    ONE:         "1",
    TWO:         "2",
    THREE:       "3",
    FOUR:        "4",
    FIVE:        "5",
    SIX:         "6",
    SEVEN:       "7",
    EIGHT:       "8",
    NINE:        "9",
    ZERO:        "0",
    COMA:        ",",
    DOT:         ".",
    SLASH:       "/",
    BACKSLASH:   "\\",
    COLON:       ":",
    SEMI_COLON:  "\;",
    QUOTE:       "\"",
    EXCLAMATION: "\!",
}

export const COLOR = {
    BLACK:      "black",
    WHITE:      "white",
    BLUE:       "blue",
    YELLOW:     "yellow",
    GREEN:      "green",
    LIGHT_BLUE: "lightblue"
}


export const COMPONENT_TYPE = {
    TRANSFORM:        0,
    BOUNDING_BOX:     1,
    PHYSICS:          2,
    SPRITE:           3,
    ANIMATION:        4,
    TEXT:             5,
    COLOR_RECTANGLE:  6,
    PARTICLE_EMITTER: 7,
}

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

class Animation extends Component {
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

class Text extends Component {
	constructor(font, text, pos, tint) {
		this.font = (font === undefined) ? "25px Arial" : font;
		this.text = (text === undefined) ? "TEXT WRITTEN HERE" : text;
		this.pos = (pos === undefined) ? new Vector2() : pos;
		this.tint = (tint === undefined) ? COLOR.BLACK : tint;
	}
}

class ColorRectangle extends Component {
	constructor(pos, size, fillTint) {
		this.pos = (pos === undefined) ? new Vector2() : pos;
		this.size = (pos === undefined) ? new Vector2(1, 1) : size;
		this.fillTint === (fillTint === undefined) ? COLOR.WHITE : fillTint;
	}
}

class Physics extends Component {
	constructor() {
		this.velocity = new Vector2();
		this.acceleration = new Vector2();
		this.maxSpeed = 0;
		this.maxForce = 0;
		this.mass = 0;
	}
}


/*
	Emitter :
		- position
		- rate/amount
		- duration
		- setup particle's properties  
	particle :
		- pos
		- size
		- angle
		- vel
		- rot
		- lifetime
		- col
		- sprite
		- blend mode
*/


class ParticleEmitter extends Component {
	constructor(pos, duration, amount) {
		this.pos = (pos === undefined) ? new Vector2() : pos;
		this.duration = (duration === undefined) ? 5 : duration ;
		this.amount = (amount === undefined) ? 10 : amount;
		this.particles = new Array(this.amount);
		// Add enum for different emit shape

		for (let i = 0; i < this.amount; i += 1) {
			const p = new Particle();
			this.particles.push(p);
		}
	}
}

class Particle {
	constructor() {
		this.pos = new Vector2();
		this.size = new Vector2();
		this.velocity = new Vector2(1, 1);
		this.lifeTime = 1;
		this.col = COLOR.WHITE; 
		this.sprite = new Sprite();
		// this.blend = null;		
		// this.angle = 0;
		// this.rot = 0;
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


class Entity {
	constructor(entityType) {
        this.id     = -1;
        this.active = true;
		
		// keep track the used comp by its index. -1 means using none.
		if (entityType === ENTITY_TYPE.GAMEPLAY_OBJECT) {
            this.transformIdx   = -1;
            this.boundingBoxIdx = -1;
            this.spriteIdx      = -1;
            this.animationIdx   = -1;
		} else if (entityType === ENTITY_TYPE.GUI) {
            this.transformIdx = -1;
            this.textIdx      = -1;
            this.colorRectIdx = -1;
		}
	}
}

class InputKey {
	constructor(name, key, type) {
		this.name = name;
		this.key = key;
		this.type = type; //pressed, release, down 
		this.state = INPUT_STATE.NONE;
	}
}


class Scene {
	constructor(sceneType) {
        this.type   = sceneType;
        this.setup  = () => {console.error("This should be override/replaced as scene's _setup_ function")};
        this.input  = () => {console.error("This should be override/replaced as scene's _input_ function")};
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
		        this.cParticleEmitters = new Array();
				break;
		}
	}
}


class EngineSettings {
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


const settings = new EngineSettings();
let currScene = settings.currentScene;

const camera = {
	pos : new Vector2(),
	size : new Vector2(),
}

export function animation_update(anim) {
	anim.currentFrame++;
	let animFrame = Math.floor((anim.currentFrame / anim.speed) % anim.frameCount);
	let spriteXSSize = anim.sprite.ssize.x;
	anim.sprite.spos.x = animFrame * spriteXSSize;	
	util.draw_image(anim.sprite);
}

export function animation_set_sprite(animId, spriteId) {
	currScene.cAnimations[animId].sprite = currScene.cSprites[spriteId];
}

export function animation_setup(animIdx, name, frameCount, speed) {
	currScene.cAnimations[animIdx].setup(name,frameCount, speed);
}



export function asset_load_image(name, src) {
	let img = new Image();
	img.src = src;
	settings.assetImageMap.set(name, img);
	return img;
}

export function asset_get_image(name) {
	return settings.assetImageMap.get(name);
}


export function canvas_get() {
	return util.canvas_get();
}

export function camera_movement(vel) {
	camera.pos.add(vel);
	util.canvas_set_translate(camera.pos);
	// console.log(camera.pos.x);
}

export function collision_rect_debug(id) {
	util.draw_stroke_rect(currScene.cTransforms[id].pos, currScene.cBoundingBoxes[id].size, COLOR.BLACK);
}

export function collision_rect_check(tIdx1, tIdx2, bbIdx1, bbIdx2) {
	let dpos = currScene.cTransfroms[tIdx1].pos.delta(currScene.cTransfroms[tIdx2].pos);
	let overlap = currScene.cBoundingBoxes[bbIdx1].halfSize.add(currScene.cBoundingBoxes[bbIdx2].halfSize).subtract(dpos);
	return (overlap.x > 0.0 && overlap.y > 0.0) ? overlap : null;
}


export function component_add(ent, compType) {
	switch (compType) {
		case COMPONENT_TYPE.TRANSFORM:
			let t = new Transform();
			currScene.cTransforms.push(t);
			ent.transformIdx = currScene.cTransforms.length - 1;
			t.set_user(ent.id);
			break;
		case COMPONENT_TYPE.SPRITE:
			let s = new Sprite();
			s.pos = currScene.cTransforms[ent.transformIdx].pos;
			currScene.cSprites.push(s);
			ent.spriteIdx = currScene.cSprites.length - 1;
			s.set_user(ent.id);
			break;
		case COMPONENT_TYPE.ANIMATION:
			let a = new Animation();
			currScene.cAnimations.push(a);
			ent.animationIdx = currScene.cAnimations.length - 1;
			a.set_user(ent.id);
			break;
		case COMPONENT_TYPE.BOUNDING_BOX:
			let bb = new BoundingBox();
			currScene.cBoundingBoxes.push(bb);
			ent.boundingBoxIdx = currScene.cBoundingBoxes.length - 1;
			bb.set_user(ent.id);
			break;
		default:
			console.error("wrong component. typed the first letter on every word inserted.");
	}
}

export function component_get(compId, type) {
	switch (type) {
		case COMPONENT_TYPE.ANIMATION:
			return currScene.cAnimations[compId];
			break;
		case COMPONENT_TYPE.TRANSFORM:
			return currScene.cTransforms[compId];
			break;
		case COMPONENT_TYPE.SPRITE:
			return currScene.cSprites[compId];
			break;
		case COMPONENT_TYPE.BOUNDING_BOX:
			return currScene.cBoundingBoxes[compId];
			break;
		default:
			console.error("wrong component type passed.");
			break;
	}
}


export function component_sprite_set(sprId, imgName) {
	currScene.cSprites[sprId].image = asset_get_image(imgName);
	currScene.cSprites[sprId].set_size();
	// currScene.cSprites[sprId].set_origin();
}



export function entity_create(name) {
	let newEntity = new Entity(ENTITY_TYPE.GAMEPLAY_OBJECT);
	newEntity.id = currScene.entityMap.size;
	currScene.entityMap.set(name, newEntity);
	console.log(newEntity);
	return newEntity;
}

export function entity_get(name) {
	return currScene.entityMap.get(name);
}

export function entity_remove(name) {
	currScene.entityMap.delete(name);
}

export function entity_get_map() {
	return currScene.entityMap;
}

export function entity_gui_create(name) {
	const guiEntity = new Entity(ENTITY_GUI);
	guiEntity.id = currScene.guiEntityMap.size;
	currScene.guiEntity.set(name, guiEntity);
	return guiEntity;
}

export function entity_gui_get(name) {
	return currScene.guiEntityMap.get(name);
}

export function entity_gui_remove(name) {
	currScene.guiEntity.delete(name);
}

export function entity_gui_get_map() {
	return currScene.guiEntityMap;
}


export function input_press_create(name, key) {
	const inputKey = new InputKey(name, key, INPUT_TYPE.PRESS);
	settings.inputMap.set(name, inputKey);
}
export function input_release_create(name, key) {
	const inputKey = new InputKey(name, key, INPUT_TYPE.RELEASE);
	settings.inputMap.set(name, inputKey);
}
export function input_down_create(name, key) {
	const inputKey = new InputKey(name, key, INPUT_TYPE.DOWN);
	settings.inputMap.set(name, inputKey);
}

export function is_key_pressed(name) {
	const input = settings.inputMap.get(name);
	if (input.type === INPUT_PRESS && 
		input.state === INPUT_STATE.PRESSED) 
	{
		input.state = INPUT_STATE.NONE
		return true;
	}
	return false;
}

export function is_key_down(name) {
	const input = settings.inputMap.get(name);
	return (input.type === INPUT_DOWN && 
			input.state === INPUT_STATE.PRESSED) ? true : false;
}

export function is_key_released(name) {
	const input = settings.inputMap.get(name);
	if (input.type === INPUT_RELEASE && 
		input.state === INPUT_STATE.RELEASED)
	{
		input.state = INPUT_STATE.NONE;
		return true; 
	}
	return false;
}

export function is_paused() {
	return settings.isPaused;
}

export function is_draw_image() {
	return settings.isDrawImage;
}

export function is_draw_collision_shape() {
	return settings.isDrawCollisionShape;
}

export function is_show_fps() {
	return settings.showFPS;
}


export function settings_get() {
	return settings;
}


export function scene_create(name) {
	const newScene = new Scene(SCENE_TYPE.DEFAULT);
	settings.sceneMap.set(name, newScene);
	return newScene;
}

export function scene_gui_create(name) {
	const newScene = new Scene(SCENE_TYPE.GUI_ONLY);
	settings.sceneMap.set(name, newScene);
	return newScene;
}

export function scene_gameplay_create(name) {
	const newScene = new Scene(SCENE_TYPE.GAMEPLAY_ONLY);
	settings.sceneMap.set(name, newScene);
	return newScene;
}

export function scene_is_gui_only() {
	return scene_get_type() === SCENE_GUI_ONLY;
}

export function scene_change(name) {
	settings.currentScene = settings.sceneMap.get(name);
	currScene = settings.currentScene;
	console.log(currScene);
}

export function scene_get_current() {
	return settings.currentScene;
}

export function scene_get_type() {
	return settings.currentScene.type;
}




export function canvas_setup(canvas, width, height) {
	util.context_setup(canvas);
	util.canvas_set_size(width, height);
}

export function init() {
	currScene.setup();
	camera_setup();
	window.requestAnimationFrame(update);
}

function camera_setup() {
	const canvasWidth = canvas_get().width;
	const canvasHeight = canvas_get().height;
	camera.size = new Vector2(canvasWidth, canvasHeight);
}

function draw() {
	const currSceneSpr = currScene.cSprites;
	for (let s of currSceneSpr) {
		entities_y_sorted();
		util.draw_image(s);
	}

}

function collision() {
	const currSceneBB = currScene.cBoundingBoxes;
	if (currSceneBB.size <= 1) {
		return
	}

	const entities = currScene.entityMap.values(); 
	for (let idx = 0; idx < currSceneBB.size; idx += 1) {
		if (idx + 1 < currSceneBB.size) {
			var overlap = collision_rect_check(
				entities[idx].transformIdx, entities[idx + 1].transformIdx, 
				entities[idx].boundingBoxIdx, entities[idx + 1].boundingBoxIdx);

			if (overlap) {
				
			}

		} else if (idx == currSceneBB.size - 1) {
			var ovelap = collision_rect_check(
				entities[idx].transformIdx, entities[0].transformIdx,
				entities[idx].boundingBoxIdx, entities[0].boundingBoxIdx);
		}
	}

}

function update(timeStamp) {
	if (!is_paused()) {
		currScene.input();
		currScene.update();
		// collision();
	}
	
	if (is_draw_image()) {
		util.clear_background(COLOR.LIGHT_BLUE);
		draw();
		util.context_get().restore(); // related to camera/canvas movement/translate implementation this
	}
	
	if (is_show_fps()) {
		util.calculate_FPS(timeStamp);
	}

	window.requestAnimationFrame(update);
}

//WARNING: might had weird behaviour if there is same name
document.addEventListener("keydown", (event) => {
	for (let inp of settings.inputMap.values()) {
		if (inp.key === event.key) {
			inp.state = INPUT_STATE.PRESSED;
		} 
	}
});

document.addEventListener("keyup", (event) => {
	for (let inp of settings.inputMap.values()) {
		if (inp.key === event.key) {
			inp.state = INPUT_STATE.RELEASED;
		}		
	}
});

/* 
	NOTE: 
	using sorted entitis despite of the component array for the y_pos sort
	because there's sprites and animations that need to be sorted along side
	by its y position, so its more efficient if sort the entity rather than
	component's array.
*/
function entities_y_sorted() {
	if (currScene.entityMap.size === 0) {
		return
	}
	const sortedEntities = new Map([...currScene.entityMap]
		.sort((e1, e2) => 
			(currScene.cTransforms[e1[1].transformIdx].pos.y + currScene.cSprites[e1[1].spriteIdx].halfSize) - 
			(currScene.cTransforms[e2[1].transformIdx].pos.y + currScene.cSprites[e2[1].spriteIdx].halfSize))
		);
	return sortedEntities;
}
