const es = new EngineSettings();
let currScene = es.get_current_scene();


function asset_load_image(name, src) {
	let img = new Image();
	img.src = src;
	es.assetImageMap.set(name, img);
	return img;
}

function asset_get_image(name) {
	return es.assetImageMap.get(name);
}

function input_create(name, key) {
	let input = {
		key: key,
		type: "NONE",
	}
	currScene.inputMap.set(name, input);
}

function input_process() {
	for (let inp of currScene.assetImageMap.values()) {	
		document.addEventListener("keydown", (event) => {
			if (event.key === inp.key) {
				inp.type = "START";
			}
		});
		document.addEventListener("keyup", (event) => {
			if (event.key === inp.key) {
				inp.type = "END";
			}
		});
	}
}

function animation_update(anim) {
	anim.currentFrame++;
	let animFrame = Math.floor((anim.currentFrame / anim.speed) % anim.frameCount);
	let spriteXSSize = anim.sprite.ssize.x;
	anim.sprite.spos.x = animFrame * spriteXSSize;	
	draw_image(anim.sprite);
}

function animation_set_sprite(animId, spriteId) {
	currScene.cAnimations[animId].sprite = currScene.cSprites[spriteId];
}

function animation_setup(animIdx, name, frameCount, speed) {
	currScene.cAnimations[animIdx].setup(name,frameCount, speed);
}

function collision_rect_debug(id) {
	draw_stroke_rect(currScene.cTransforms[id].pos, currScene.cBoundingBoxes[id].size, "black");
}

function collision_rect_check(id1, id2) {
	let dpos = currScene.cTransfroms[id1].pos.delta(currScene.cTransfroms[id2].pos);
	let overlap = currScene.cBoundingBoxes[id2].halfSize.add(currScene.cBoundingBoxes[id2].halfSize).subtract(dpos);
	return (overlap.x > 0.0 && overlap.y > 0.0) ? true : false;
}

function scene_create(name) {
	const newScene = new Scene();
	es.sceneMap.set(name, newScene);
	return newScene;
}

function scene_change(name) {
	es.currentScene = es.sceneMap.get(name);
	currScene = es.currentScene;
	console.log(currScene);
}

function entity_create(name) {
	let newEntity = new Entity(name);
	newEntity.id = currScene.entityCreatedCount;
	currScene.entityCreatedCount += 1;
	currScene.entityMap.set(name, newEntity);
	return newEntity;
}

function entity_remove(name) {
	currScene.entityMap.delete(name);
	entCount -= 1;
}

function component_add(ent, compType) {
	switch (compType) {
		case "t":
			let t = new Transform();
			currScene.cTransforms.push(t);
			ent.transformIdx = currScene.cTransforms.length - 1;
			t.set_user(ent.id);
			break;
		case "s":
			let s = new Sprite();
			currScene.cSprites.push(s);
			ent.spriteIdx = currScene.cSprites.length - 1;
			s.set_user(ent.id);
			break;
		case "a":
			let a = new Animation();
			currScene.cAnimations.push(a);
			ent.animationIdx = currScene.cAnimations.length - 1;
			a.set_user(ent.id);
			break;
		case "bb":
			let bb = new BoundingBox();
			currScene.cBoundingBoxes.push(bb);
			ent.boundingBoxIdx = currScene.cBoundingBoxes.length - 1;
			bb.set_user(ent.id);
			break;
		default:
			console.log("wrong component. typed the first letter on every word inserted.");
	}
}

function component_sprite_set(sprId, imgName) {
	currScene.cSprites[sprId].image = asset_get_image(imgName);
}
//TODO: implement camera movement e.g camera_trap