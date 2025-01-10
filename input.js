
let inputs = new Array();

function input_setup() {
	let pressed_input = input_create("UP", "w");
	inputs.push(pressed_input);
}


// this is some kind of component, but using Struct-like Object than Class
function input_create(name, key, type) {
	let input = {
		name: name,
		key: key,
		type: type,
	}

	return input;
}

function input_process() {
	for (let inp of inputs) {
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
