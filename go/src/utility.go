package main

import (
	"fmt"
	"syscall/js"
)

type Utility struct {
	document js.Value
	canvas js.Value
	context js.Value
	onLoad	js.Func
}

type Color struct {
	red float64
	green float64
	blue float64
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

func (u *Utility) setCanvasSize(width, height float64) {
	u.canvas.Set("width", width)
	u.canvas.Set("height", height)
}

func (u *Utility) GetCanvasWidth() js.Value {
	return u.canvas.Get("width")
}
func (u *Utility) GetCanvasHeight() js.Value {
	return u.canvas.Get("height")
}

func (u *Utility) clearCanvasBackground(color *Color) {
	u.context.Call("clearRect", 0, 0, u.GetCanvasWidth(), u.GetCanvasHeight())
	u.context.Set("fillStyle", color.toString())
	// u.context.Set("fillStyle", "red")
	u.context.Call("fillRect", 0, 0, u.GetCanvasWidth(), u.GetCanvasHeight())
}
