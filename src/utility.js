//For calculating FPS
let secondsPassed = 0;
let oldTimeStamp = 0;
let fps = 0;

function calculate_FPS(ts) {
	secondsPassed = (ts - oldTimeStamp) / 1000;
	oldTimeStamp = ts;

	fps = Math.round(1 / secondsPassed);
	ctx.fillStyle = "white";
	ctx.fillRect(0, canvas.height, 200, 100);
	ctx.font = "25px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("FPS: " + fps, canvas.width - 100, 30);
}

function clear_background(col) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = col;
	ctx.fillRect(0, 0, canvas.width, canvas.height); //background
}

function draw_line(start, end) {
	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.lineTo(end.x, end.y);
	ctx.lineWidth = 2;
	ctx.stroke();
}

function draw_circle(center, radius, outlineTint, fillTint) {
	ctx.beginPath();
	ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
	ctx.strokeStyle = outlineTint;
	ctx.stroke();
	ctx.fillStyle = fillTint;
	ctx.fill();
}

function draw_text(font, text, pos, tint) {
	ctx.font = font;
	ctx.fillStyle = tint;
	ctx.fillText(text, pos.x, pos.y);
}

function draw_rect(pos, size, fillTint) {
	ctx.fillStyle = fillTint;
	ctx.fillRect(pos.x, pos.y, size.x, size.y);
}

function draw_stroke_rect(pos, size, strokeTint) {
	ctx.strokeStyle = strokeTint;
	ctx.strokeRect(pos.x, pos.y, size.x, size.y);
}

function draw_image(sprite) {
	ctx.drawImage(sprite.img, sprite.spos.x, sprite.spos.y, sprite.ssize.x, sprite.ssize.y, sprite.pos.x, sprite.pos.y, sprite.size.x, sprite.size.y);
}

class Vector2 {
	constructor(x, y) {
		this.x = (x === undefined) ? 0 : x;
		this.y = (y === undefined) ? 0 : y;
	}
	set(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}
	clone() {
		return new Vector2(this.x, this.y)
	}
	add(vector) {
		return new Vector2(this.x + vector.x, this.y + vector.y);
	}
	subtract(vector) {
		return new Vector2(this.x - vector.x, this.y - vector.y);
	}
	scale(scalar) {
		return new Vector2(this.x * scalar, this.y * scalar);
	}
	dot(vector) {
		return (this.x * vector.x + this.y + vector.y);
	}
	delta(vector) {
		return new Vector2(Math.abs(this.x - vector.x), Math.abs(this.y - vector.y));
	}
	moveTowards(vector, t) {
		// Linearly interpolates between vectors A and B by t.
		// t = 0 returns A, t = 1 returns B
		t = Math.min(t, 1); // still allow negative t
		var diff = vector.subtract(this);
		return this.add(diff.scale(t));
	}
	magnitude() {
		return Math.sqrt(this.magnitudeSqr());
	}
	magnitudeSqr() {
		return (this.x * this.x + this.y * this.y);
	}
	distance(vector) {
		return Math.sqrt(this.distanceSqr(vector));
	}
	distanceSqr(vector) {
		var deltaX = this.x - vector.x;
		var deltaY = this.y - vector.y;
		return (deltaX * deltaX + deltaY * deltaY);
	}
	normalize() {
		var mag = this.magnitude();
		var vector = this.clone();
		if(Math.abs(mag) < 1e-9) {
			vector.x = 0;
			vector.y = 0;
		} else {
			vector.x /= mag;
			vector.y /= mag;
		}
		return vector;
	}
	angle() {
		return Math.atan2(this.y, this.x);
	}
	rotate(alpha) {
		var cos = Math.cos(alpha);
		var sin = Math.sin(alpha);
		var vector = new Vector2();
		vector.x = this.x * cos - this.y * sin;
		vector.y = this.x * sin + this.y * cos;
		return vector;
	}
	toPrecision(precision) {
		var vector = this.clone();
		vector.x = vector.x.toFixed(precision);
		vector.y = vector.y.toFixed(precision);
		return vector;
	}
	toString() {
		var vector = this.toPrecision(1);
		return ("[" + vector.x + "; " + vector.y + "]");
	}

}
