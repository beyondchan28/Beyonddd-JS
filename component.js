let cTransfroms = new Array(ENTITES_AMOUNT);

//component interface
class Transform {
	constructor(pos, rot, scale) {
		this.pos = (pos === undefined) ? new Vector2() : pos;
		this.rot = (rot === undefined) ? 0 : rot;
		this.scale = (scale === undefined) ? 1 : scale;
	}
}

//for setup its default values
function components_setup() {
	for (let i = 0; i < ENTITES_AMOUNT; i += 1) {
		cTransfroms[i] = new Transform();
	}

}