
let inputs = new Array();

function input_setup() {
	let pressed_input = input_create("d", "press");
	let release_input = input_create("d", "release");
	inputs.push(pressed_input, release_input);
}

function input_create(key, type) {
	let input = {
		key: key,
		type: type,
		active: true
	}

	return input;
}

function input_process() {
	for (let inp of inputs) {
		switch (inp.type) {
			case "press":
				document.addEventListener("keypress", (event) => {
					if (inp.active && event.key === inp.key) {
						entities[0].transform.pos.x += 1;
						inp.active = false
						// console.log("PRESSED");
					}
				});
				document.addEventListener("keyup", (event) => {
					if (!inp.active && event.key === inp.key) {
						inp.active = true
					}
				});
				break;
			case "release":
				document.addEventListener("keyup", (event) => {
					if (inp.active && event.key === inp.key) {
						inp.active = false;
						// console.log("RELEASED");
					}

				});
				inp.active = true;
				break;
			case "down":
				document.addEventListener("keydown", (event) => {
					if (inp.active && event.key === inp.key) {
						// console.log("DOWN");
					}
				});
				break;

		}		
	}
}
