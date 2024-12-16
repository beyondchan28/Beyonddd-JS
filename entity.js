let entities = new Array(ENTITES_AMOUNT);

function entities_setup() {
	for (let i = 0; i < ENTITES_AMOUNT; i += 1) {
		let entity = {
			id: i,
			name: "",
			active: true,
			transform : cTransfroms[i],
			sprite : null,
		}
		entities[i] = entity;
	}
}