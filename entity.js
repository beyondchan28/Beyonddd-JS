let entities = new Array(ENTITES_AMOUNT);

function entities_setup() {
	for (let i = 0; i < ENTITES_AMOUNT; i += 1) {
		let entity = {
			id: i,
			name: "Player",
			active: true,
		}
		entities[i] = entity;
	}
}