function update() {
	player_input();
}

function player_input() {
	for (let i of inputs) {
		if (i.type === "START") {
			if (i.name == "UP") {
				console.log("pressed");
			}
		}

		else if (i.type === "END") {
			if (i.name == "UP") {
				console.log("release");
			}
		}
	}
}