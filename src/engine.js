import * as type from "./type.js";
import * as util from "./utility.js";

export const settings = new type.EngineSettings();
export let currScene = settings.get_current_scene();


export function asset_load_image(name, src) {
	let img = new Image();
	img.src = src;
	settings.assetImageMap.set(name, img);
	return img;
}

export function asset_get_image(name) {
	return settings.assetImageMap.get(name);
}

export function input_create(name, code) {
	const input = {
		name: name,
		active: true,
		code: code,
		type: "NONE",
	}
	settings.inputArr.push(input);
}

export function input_process() {
	document.addEventListener("keydown", (event) => {
		for (let inp of settings.inputArr) {	
			if (event.code === inp.code) {
				inp.type = "START";
				break;
			}
		}
	});
	document.addEventListener("keyup", (event) => {
		for (let inp of settings.inputArr) {	
			if (event.code === inp.code) {
				inp.type = "END";
				break;
			}
		}
	});
	
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

export function collision_rect_debug(id) {
	util.draw_stroke_rect(currScene.cTransforms[id].pos, currScene.cBoundingBoxes[id].size, "black");
}

export function collision_rect_check(id1, id2) {
	let dpos = currScene.cTransfroms[id1].pos.delta(currScene.cTransfroms[id2].pos);
	let overlap = currScene.cBoundingBoxes[id2].halfSize.add(currScene.cBoundingBoxes[id2].halfSize).subtract(dpos);
	return (overlap.x > 0.0 && overlap.y > 0.0) ? true : false;
}

export function scene_create(name) {
	const newScene = new type.Scene();
	settings.sceneMap.set(name, newScene);
	return newScene;
}

export function scene_change(name) {
	settings.currentScene = settings.sceneMap.get(name);
	currScene = settings.currentScene;
	console.log(currScene);
}

export function entity_create(name) {
	let newEntity = new type.Entity(name);
	newEntity.id = currScene.entityCreatedCount;
	newEntity.name = name;
	currScene.entityCreatedCount += 1;
	currScene.entityMap.set(name, newEntity);
	return newEntity;
}

export function entity_get(name) {
	return currScene.entityMap.get(name);
}

export function entity_remove(name) {
	currScene.entityMap.delete(name);
	entCount -= 1;
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

export function sprite_set(sprId, imgName) {
	currScene.cSprites[sprId].image = asset_get_image(imgName);
	currScene.cSprites[sprId].set_size();
	// currScene.cSprites[sprId].set_origin();
	console.log(currScene.cSprites[sprId]);
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