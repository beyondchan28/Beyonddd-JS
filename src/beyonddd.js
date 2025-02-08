/*
	This script includes all the APIs for the engine.
*/

import * as util from "./utility.js";
import * as type from "./type.js";

const settings = new type.EngineSettings();
let currScene = settings.currentScene;

export const KEY = {
	SPACE : " ",
	TAB : "Tab",
	ENTER : "Enter",
	SHIFT : "Shift",
	CONTROL : "Control",
	ALT : "Alt",
	CAPSLOCK : "CapsLock",
	ESCAPE : "Escape",
	ARROW_LEFT : "ArrowLeft",
	ARROW_RIGHT : "ArrowRight",
	ARROW_UP : "ArrowUp",
	ARROW_DOWN : "ArrowDown",
	A : "a",
	B : "b",
	C : "c",
	D : "d", 
	E : "e",
	F : "f",
	G : "g",
	H : "h",
	I : "i",
	J : "j",
	K : "k",
	L : "l",
	M : "m",
	N : "n",
	O : "o",
	P : "p",
	Q : "q",
	R : "r",
	S : "s",
	T : "t",
	U : "u",
	V : "v",
	W : "w",
	X : "x",
	Y : "y",
	Z : "z",
	ONE : "1",
	TWO : "2",
	THREE : "3",
	FOUR : "4",
	FIVE : "5",
	SIX : "6",
	SEVEN : "7",
	EIGHT : "8",
	NINE : "9",
	ZERO : "0",
	COMA : ",",
	DOT : ".",
	SLASH : "/",
	BACKSLASH : "\\",
	COLON : ":",
	SEMI_COLON : "\;",
	QUOTE : "\"",
	EXCLAMATION : "\!",

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



export function collision_rect_debug(id) {
	util.draw_stroke_rect(currScene.cTransforms[id].pos, currScene.cBoundingBoxes[id].size, "black");
}

export function collision_rect_check(id1, id2) {
	let dpos = currScene.cTransfroms[id1].pos.delta(currScene.cTransfroms[id2].pos);
	let overlap = currScene.cBoundingBoxes[id2].halfSize.add(currScene.cBoundingBoxes[id2].halfSize).subtract(dpos);
	return (overlap.x > 0.0 && overlap.y > 0.0) ? overlap : null;
}


export function component_add(ent, compType) {
	switch (compType) {
		case "t":
			let t = new type.Transform();
			currScene.cTransforms.push(t);
			ent.transformIdx = currScene.cTransforms.length - 1;
			t.set_user(ent.id);
			break;
		case "s":
			let s = new type.Sprite();
			s.pos = currScene.cTransforms[ent.id].pos;
			currScene.cSprites.push(s);
			ent.spriteIdx = currScene.cSprites.length - 1;
			s.set_user(ent.id);
			break;
		case "a":
			let a = new type.Animation();
			currScene.cAnimations.push(a);
			ent.animationIdx = currScene.cAnimations.length - 1;
			a.set_user(ent.id);
			break;
		case "bb":
			let bb = new type.BoundingBox();
			currScene.cBoundingBoxes.push(bb);
			ent.boundingBoxIdx = currScene.cBoundingBoxes.length - 1;
			bb.set_user(ent.id);
			break;
		default:
			console.log("wrong component. typed the first letter on every word inserted.");
	}
}

export function component_get(compId, type) {
	switch (type) {
		case "a":
			return currScene.cAnimations[compId];
			break;
		case "t":
			return currScene.cTransforms[compId];
			break;
		case "s":
			return currScene.cSprites[compId];
			break;
		case "bb":
			return currScene.cBoundingBoxes[compId];
			break;
		default:
			console.log("wrong component type passed.");
			break;
	}
}


export function component_sprite_set(sprId, imgName) {
	currScene.cSprites[sprId].image = asset_get_image(imgName);
	currScene.cSprites[sprId].set_size();
	// currScene.cSprites[sprId].set_origin();
}



export function entity_create(name) {
	let newEntity = new type.Entity(type.ENTITY_TYPE.GAMEPLAY_OBJECT);
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
/* 
	NOTE: 
	using sorted entitis despite of the component array for the y_pos sort
	because there's sprites and animations that need to be sorted along side
	by its y position, so its more efficient if sort the entity rather than
	component's array.
*/
export function entities_y_sorted() {
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



export function entity_gui_create(name) {
	const guiEntity = new type.Entity(type.ENTITY_TYPE.GUI);
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
	const inputKey = new type.InputKey(name, key, type.INPUT_TYPE.PRESS);
	settings.inputMap.set(name, inputKey);
}
export function input_release_create(name, key) {
	const inputKey = new type.InputKey(name, key, type.INPUT_TYPE.RELEASE);
	settings.inputMap.set(name, inputKey);
}
export function input_down_create(name, key) {
	const inputKey = new type.InputKey(name, key, type.INPUT_TYPE.DOWN);
	settings.inputMap.set(name, inputKey);
}

export function is_key_pressed(name) {
	const input = settings.inputMap.get(name);
	if (input.type === type.INPUT_TYPE.PRESS && 
		input.state === type.INPUT_STATE.PRESSED) 
	{
		input.state = type.INPUT_STATE.NONE
		return true;
	}
	return false;
}

export function is_key_down(name) {
	const input = settings.inputMap.get(name);
	return (input.type === type.INPUT_TYPE.DOWN && 
			input.state === type.INPUT_STATE.PRESSED) ? true : false;
}

export function is_key_released(name) {
	const input = settings.inputMap.get(name);
	if (input.type === type.INPUT_TYPE.RELEASE && 
		input.state === type.INPUT_STATE.RELEASED)
	{
		input.state = type.INPUT_STATE.NONE;
		return true; 
	}
	return false;
}

//NOTE: might had weird behaviour if there is same name
document.addEventListener("keydown", (event) => {
	for (let inp of settings.inputMap.values()) {
		if (inp.key === event.key) {
			inp.state = type.INPUT_STATE.PRESSED;
		} 
	}
});

document.addEventListener("keyup", (event) => {
	for (let inp of settings.inputMap.values()) {
		if (inp.key === event.key) {
			inp.state = type.INPUT_STATE.RELEASED;
		}		
	}
});

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
	const newScene = new type.Scene(type.SCENE_TYPE.DEFAULT);
	settings.sceneMap.set(name, newScene);
	return newScene;
}

export function scene_gui_create(name) {
	const newScene = new type.Scene(type.SCENE_TYPE.GUI_ONLY);
	settings.sceneMap.set(name, newScene);
	return newScene;
}

export function scene_gameplay_create(name) {
	const newScene = new type.Scene(type.SCENE_TYPE.GAMEPLAY_ONLY);
	settings.sceneMap.set(name, newScene);
	return newScene;
}

export function scene_is_gui_only() {
	return scene_get_type() === type.SCENE_TYPE.GUI_ONLY;
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
	
	scene_get_current().setup();
	window.requestAnimationFrame(update);
}


function update(timeStamp) {
	if (!is_paused()) {
		scene_get_current().input();
		scene_get_current().update();
	}
	
	if (is_draw_image()) {
		util.clear_background("lightblue");
		scene_get_current().draw();
	}
	
	if (is_show_fps()) {
		util.calculate_FPS(timeStamp);
	}

	window.requestAnimationFrame(update);
}