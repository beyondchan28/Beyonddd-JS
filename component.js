let cTransfroms = new Array(ENTITES_AMOUNT);

//component interface
class Transform {
	constructor(pos, rot) {
		this.pos = (pos === undefined) ? new Vector2() : pos;
		this.rot = (rot === undefined) ? 0 : rot; 
	}
}

//for setup its default values
function components_setup() {
	for (let i = 0; i < ENTITES_AMOUNT; i += 1) {
		cTransfroms[i] = new Transform();
	}

}