package main

import (
	"fmt"
	"syscall/js"
)

type Engine struct {
	util Utility
	gameLoop js.Func
	deltaTime float64
	oldTimeStamp float64
}

func (e *Engine) ready() {
	e.util.setup()
	e.util.setCanvasSize(800, 600)

	e.gameLoop = js.FuncOf(func(this js.Value, args []js.Value) any {
		timeStamp := args[0].Float()
		e.deltaTime = (timeStamp - e.oldTimeStamp) / 1000
		e.oldTimeStamp = timeStamp

		e.update()

		js.Global().Call("requestAnimationFrame", e.gameLoop)
		return nil
	})
	js.Global().Call("requestAnimationFrame", e.gameLoop)
}


var x float64
func (e *Engine) update() {

	fmt.Println(e.util.canvas)
	e.util.clearCanvasBackground(&Color{0, 0, 0, 1})

	e.util.context.Set("fillStyle", "blue")
	e.util.context.Call("fillRect", x, 100, 50, 50)
	x += 1
}
