import * as engine from './beyonddd.js';

document.body.style.backgroundColor = '#454545';

const allElements = document.querySelectorAll("*");

allElements.forEach( (element) => {
	element.style.color = "white";
});
// these 3 are the main editor layout
const leftPanel = document.getElementById("left-panel");
const centerPanel = document.getElementById("left-panel");
const rightPanel = document.getElementById("right-panel");

function div_create(parent, className, id) {
	const div = document.createElement('div');
	div.classList.add(className);
	if (id !== undefined) {
		div.id = id;
	}
	parent.appendChild(div);
	return div;
}

function input_slider_create(parent, id) {
	const slider = document.createElement('input');
	slider.id = id;
	slider.type = "range";
	slider.min = "0";
	slider.value = "50";
	parent.appendChild(slider);
	return slider;
}

function span_create(parent, id, text) {
	const span = document.createElement('span');
	span.id = id;
	if (text !== undefined) {
		span.textContent = text;
	}
	parent.appendChild(span);
	return span
}

function label_create(parent, id, text) {
	const label = document.createElement('label');
	label.id = id;
	label.textContent = text;
	label.style.display = 'flex';
	label.style.justifyContent = 'center';
	parent.appendChild(label);
	return label;
}

function button_create(parent, className, text, clickHandler, id) {
	const button = document.createElement('button');
	button.classList.add(className);
	button.textContent = text;
	if (clickHandler !== undefined) {
		button.addEventListener('click', clickHandler)
	}
	if (id !== undefined) {
		button.id = id;
	}
	parent.appendChild(button);
	return button;
}

function button_add_handler(button, clickHandler) {
	button.addEventListener('click', clickHandler);
}

function horizontal_box_create(parent, className, id) {
	const hBox = document.createElement('div');
	hBox.classList.add(className);
	if (id !== undefined) {
		hBox.id = id;
	}
	hBox.style.display = "flex";
	hBox.style.justifyContent = 'space-between';
	hBox.style.flexDirection = 'row';
	hBox.style.gap = "10px";
	hBox.style.padding = "10px";
	hBox.style.border = "1px solid white";
	parent.appendChild(hBox);
	return hBox;
}

function box_create(parent, className, id) {
	const box = document.createElement('div');
	box.style.display = "flex";
	box.style.justifyContent = 'space-between';
	box.style.gap = "10px";
	box.style.padding = "10px";
	box.style.border = "1px solid black";
	parent.appendChild(box);
	return box;
}

function vertical_box_create(parent, className, id) {
	const vBox = div_create(parent, className, id);
	vBox.classList.add(className);
	if (id !== undefined) {
		vBox.id = id;
	}
	vBox.style.display = "flex";
	// vBox.style.justifyContent = 'center';
	// vBox.style.alignItems = 'center';
	vBox.style.flexDirection = 'column';
	vBox.style.gap = "10px";
	vBox.style.padding = "10px";
	vBox.style.border = "1px solid white";
	vBox.style.marginBottom = '20px';
	parent.appendChild(vBox);
	return vBox;
}

function horizontal_button_label_group(hBoxParent, hBoxName, labelText, buttonText, buttonHandler) {
	const hBox = horizontal_box_create(hBoxParent, hBoxName);
	const label = label_create(hBox, "label", labelText);
	const button = button_create(hBox, "button", buttonText);
	button.addEventListener('click', buttonHandler);
	return hBox;
}

function box_label_group(parent, labelText, detailText) {
	const box = horizontal_box_create(parent, "label-box");
	const label = label_create(box, "engine-label", labelText);
	const detail = label_create(box, "engine-detail", detailText);
	detail.style.fontWeight = '900';
	return box;
}

function dropdown_create(parent, options) {
	const dropdown = document.createElement("select");
	options.forEach( opt => {
		const option = document.createElement("option");
		option.value = opt.value;
		option.textContent = opt.text;
		dropdown.appendChild(option);
	});
	parent.appendChild(dropdown);
}

function collapse_group(parent, buttonName, contents) {
	const container = div_create(parent, "collapse-container");
	const content = horizontal_box_create(container, "collapse-content");
	const button = document.createElement("button");
	button.textContent = buttonName;
	button.classList.add("collapse-button");
	button.style.padding = "10px 20px";
	button.addEventListener("click", () => {
		if (content.style.display === "none") {
			content.style.display = "block";
		} else {
			content.style.display = 'none';
		}
	});

	content.style.display = 'none';
	console.log(content.style);
	contents.forEach(cont => {
		content.appendChild(cont);
	});
	container.appendChild(button);
	container.appendChild(content);
}

const sliderParent = div_create(leftPanel, "slider-container")
const slider = input_slider_create(sliderParent, "slider");
const span = span_create(sliderParent, "span", "FUCK YOU"); 


// Engine states
const engineStatesV = vertical_box_create(leftPanel, "engine-states");
const labelName = label_create(engineStatesV,  "engine-states-title","Engine States ⚙️");
const labelBox = box_label_group(engineStatesV, "Paused", engine.is_paused());


// Game tools
const gameToolsV = vertical_box_create(leftPanel, "game-tools");
const label = label_create(gameToolsV, "left-panel-title", "Game Tools 🧰");
const sceneHGroup = horizontal_button_label_group(gameToolsV, "scene-add-group", "Create Scene", "🏞️", () => {
	console.log("Create Scene...")
});
const entityHGroup = horizontal_button_label_group(gameToolsV, "entity-add-group", "Add Entity", "📦", () => {
	console.log("Adding Entity...")
});


const dropdown = dropdown_create(leftPanel, [
	{value: "opt-1", text: "another detail 1"},
	{value: "opt-2", text: "another detail 2"},
	{value: "opt-3", text: "another detail 3"}
]);
const label1 = document.createElement("label");
label1.textContent = "FUCK 1";
const label2 = document.createElement("label")
label2.textContent = "FUCK 2";
const collapseGroup = collapse_group(leftPanel, "Collapse Button", [
	label1, label2,
]);


