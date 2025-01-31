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

function span_create(parent, id, innerText) {
	const span = document.createElement('span');
	span.id = id;
	if (innerText !== undefined) {
		span.innerHTML = innerText;
	}
	parent.appendChild(span);
	return span
}

function label_create(parent, id, innerText) {
	const label = document.createElement('label');
	label.id = id;
	label.innerHTML = innerText;
	parent.appendChild(label);
	return label;
}

const sliderParent = div_create(leftPanel, "slider-container")
const slider = input_slider_create(sliderParent, "slider");
const span = span_create(sliderParent, "span", "FUCK YOU"); 