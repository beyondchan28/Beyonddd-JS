let grid_data = {
	horizontal: new Array(),
	vertical: new Array(),
	size: 0
}

function grid_coordinate() {
	for (let x = 0; x < canvas.width; x += grid_data.size) {
		for (let y = 0; y < canvas.height; y += grid_data.size) {
			draw_text("10px Arial", `(${x},${y})`, new Vector2(x, y), "red");
		}
	}
}

function grid_draw() {
	for (let grid of grid_data.horizontal) {
		draw_line(grid.start_point, grid.end_point);
	}
	for (let grid of grid_data.vertical) {
		draw_line(grid.start_point, grid.end_point);
	}

	grid_coordinate();
}

function grid_generate_data(size) {
	grid_data.size = (size === undefined) ? 32 : size;

	// horizontal line
	for (let y = 0; y < canvas.height; y += grid_data.size) {
		let grid = {
			start_point: new Vector2(0, y),
			end_point: new Vector2(canvas.width, y)
		}
		grid_data.horizontal.push(grid);
	}
	// vertical line
	for (let x = 0; x < canvas.width; x += grid_data.size) {
		let grid = {
			start_point: new Vector2(x, 0),
			end_point: new Vector2(x, canvas.height)
		}
		grid_data.vertical.push(grid);
	}
}
