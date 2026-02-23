package main

import (
	"fmt"
)

// func init() {
//
// }

func main() {
	engine := Engine{}
	engine.ready()

	pos1 := Vec2{x: 10.0, y: 10.0}
	pos2 := Vec2{x: 20.0, y: 20.0}

	dot := pos1.dot(&pos2)

	fmt.Println(dot)
	fmt.Println(pos1)
	fmt.Println(pos2)

	c1 := componentCreate(TRANSFORM)
	c2 := componentCreate(BOUNDING_BOX)

	t := Transform{}
	t.position = Vec2{10, 10}
	fmt.Println(t.position)
	fmt.Printf("type: %v\n", c1.getType())
	fmt.Printf("type: %v\n", c2.getType())
	select {}
}
