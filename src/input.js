const input_map = new Map();

function input_create(name, key, type) {
	let input = {
		key: key,
		type: (type === undefined) ? "NONE" : type,
	}
	input_map.set(name, input);
}

function input_process() {
	for (let inp of input_map.values()) {	
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
