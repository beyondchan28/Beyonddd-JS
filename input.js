
let inputs = new Array();

function input_setup() {
	let pressed_input = input_create("d", "down");
	inputs.push(pressed_input);
}

function input_create(key, type) {
	let input = {
		key: key,
		type: type,
		active: false
	}

	return input;
}

function input_process() {
	for (let inp of inputs) {
		switch (inp.type) {
			case "press":
				document.addEventListener("keypress", (event) => {
					if (!inp.active && event.key === inp.key) {
						inp.active = true
						// console.log("PRESSED");
					}
				});
				document.addEventListener("keyup", (event) => {
					if (inp.active && event.key === inp.key) {
						inp.active = false
					}
				});
				break;
			case "release":
				document.addEventListener("keyup", (event) => {
					if (!inp.active && event.key === inp.key) {
						inp.active = true;
						// console.log("RELEASED");
					}

				});
				inp.active = false;
				break;
			case "down":
				document.addEventListener("keydown", (event) => {
					if (!inp.active && event.key === inp.key) {
						console.log("DOWN");
					}
				});
				break;

		}		
	}
}
