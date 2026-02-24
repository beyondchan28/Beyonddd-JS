package main

import (
	"fmt"
	"syscall/js"
	"math"
)

type Utility struct {
	document js.Value
	canvas   js.Value
	context  js.Value
	onLoad   js.Func
}

type Color struct {
	red   float64
	green float64
	blue  float64
	alpha float64
}

func (c *Color) toString() string {
	colString := fmt.Sprintf("rgba(%v, %v, %v, %v)", c.red, c.green, c.blue, c.alpha)
	return colString
}

func (u *Utility) setup() {
	u.document = js.Global().Get("document")
	u.canvas = u.document.Call("getElementById", "canvas")
	u.context = u.canvas.Call("getContext", "2d")
}

func (u *Utility) calculateFPS(deltaTime float64) {
	fps := math.Round(1/deltaTime)
	font := "25px Arial"
	text := fmt.Sprintf("FPS: %.2f", fps)
	u.context.Set("font", font)
	u.context.Set("fillStyle", "black")
	u.context.Call("fillText", text, u.GetCanvasWidth() - 100.0, 30.0)
}

func (u *Utility) setCanvasSize(width, height float64) {
	u.canvas.Set("width", width)
	u.canvas.Set("height", height)
}

func (u *Utility) GetCanvasWidth() float64 {
	return u.canvas.Get("width").Float()
}
func (u *Utility) GetCanvasHeight() float64 {
	return u.canvas.Get("height").Float()
}

func (u *Utility) clearCanvasBackground(color *Color) {
	u.context.Call("clearRect", 0, 0, u.GetCanvasWidth(), u.GetCanvasHeight())
	u.context.Set("fillStyle", color.toString())
	u.context.Call("fillRect", 0, 0, u.GetCanvasWidth(), u.GetCanvasHeight())
}

func (u *Utility) drawLine(startPos, endPos Vec2, lineWidth float64) {
	u.context.Call("beginPath")
	u.context.Call("moveTo", startPos.x, startPos.y)
	u.context.Call("lineTo", endPos.x, endPos.y)
	u.context.Set("lineWidth", lineWidth)
}

func (u *Utility) drawCircle(center Vec2, radius float64, outlineCol, fillcol Color) {
	u.context.Call("beginPath")
	u.context.Call("arc", center.x, center.y, radius, 0, 2.0 * math.Pi)
	u.context.Call("stroke")
	olc := outlineCol.toString()
	u.context.Set("fillStyle", olc)
	u.context.Call("fill")
}

func (u *Utility) drawText(text Text) {
	u.context.Set("font", text.font)
	u.context.Set("fillStyle", text.tint.toString())
	u.context.Set("textBaseline", "middle")

	// TODO: support for multiline text
	u.context.Call("fillText", text.text, text.position.x, text.position.y)
}

func (u * Utility) drawRectangle(position, size Vec2, color Color) {
	u.context.Set("fillStyle", color.toString())
	u.context.Call("fillRect", position.x, position.y, size.x, size.y)
}

func (u *Utility) drawStrokeRectangle(position, size Vec2, color Color) {
	u.context.Set("strokeStyle", color.toString())
	u.context.Call("strokeRect", position.x, position.y, size.x, size.y)
}

func (u *Utility) drawImage(sprite Sprite) {
	if sprite.flipHorizontal {
		u.context.Call("save")
		u.context.Call("translate", sprite.position.x, sprite.position.y)
		u.context.Call(
			"drawImage",
			sprite.image,
			sprite.sourcePosition.x, sprite.sourcePosition.y,
			sprite.sourceSize.x, sprite.sourceSize.y,
			0, 0,
			-sprite.size.x, sprite.size.y,
		)
		u.context.Call("restore")
	} else {
		u.context.Call(
			"drawImage",
			sprite.image,
			sprite.sourcePosition.x, sprite.sourcePosition.y,
			sprite.sourceSize.x, sprite.sourceSize.y,
			sprite.position.x, sprite.position.y,
			sprite.size.x, sprite.size.y,
		)
	}
}
