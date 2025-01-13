function collision_rect_debug(id) {
	draw_stroke_rect(cTransforms[id].pos, cBoundingBoxes[id].size, "black");
}

function collision_rect_check(id1, id2) {
	let dpos = cTransfroms[id1].pos.delta(cTransfroms[id2].pos);
	let overlap = cBoundingBoxes[id2].halfSize.add(cBoundingBoxes[id2].halfSize).subtract(dpos);
	return (overlap.x > 0.0 && overlap.y > 0.0) ? true : false;
}

