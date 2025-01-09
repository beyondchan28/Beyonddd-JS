//setup bounding box here
function collision_rect_setup() {
	console.log(collision_rect_check(0, 1));
}

function collision_rect_debug(id1, id2) {
	draw_stroke_rect(cTransforms[id1].pos, cBoundingBoxes[id1].size, "black");
	draw_stroke_rect(cTransforms[id2].pos, cBoundingBoxes[id2].size, "brown");
}

function collision_rect_check(id1, id2) {
	let dpos = cTransforms[id1].pos.delta(cTransforms[id2].pos);
	let overlap = cBoundingBoxes[id1].halfSize.add(cBoundingBoxes[id2].halfSize).subtract(dpos);
	return (overlap.x > 0.0 && overlap.y > 0.0) ? true : false;
}

