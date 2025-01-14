function asset_load_image(name, src, assImgMap) {
	let img = new Image();
	img.src = src;
	assImgMap.set(name, img);
	return img;
}

function input_create(name, key, type, inpMap) {
	let input = {
		key: key,
		type: (type === undefined) ? "NONE" : type,
	}
	inpMap.set(name, input);
}

function input_process(inpMap) {
	for (let inp of inpMap.values()) {	
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

function collision_rect_debug(id) {
	draw_stroke_rect(cTransforms[id].pos, cBoundingBoxes[id].size, "black");
}

function collision_rect_check(id1, id2) {
	let dpos = cTransfroms[id1].pos.delta(cTransfroms[id2].pos);
	let overlap = cBoundingBoxes[id2].halfSize.add(cBoundingBoxes[id2].halfSize).subtract(dpos);
	return (overlap.x > 0.0 && overlap.y > 0.0) ? true : false;
}

//TODO: implement camera movement e.g camera_trap