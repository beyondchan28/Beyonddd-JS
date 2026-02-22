package main

import (
	"fmt"
)

type ComponentType uint8
const (
	TRANSFORM ComponentType = iota
	BOUNDING_BOX
)

type Component interface {
	getType() ComponentType
}

type Property struct {
	userId uint64
	active bool
}

type Transform struct {
	Property
	position Vec2
	rotation float64
	scale Vec2
}

type BoundingBox struct {
	Property
	size Vec2
	halfSize Vec2
}


// func (t *Transform) create() {
// 	fmt.Println("Transform created")
// }
// func (b *BoundingBox) create() {
// 	fmt.Println("BoundingBox created")
// }

func (bb *BoundingBox) getType() ComponentType {
	return BOUNDING_BOX
}
func (t *Transform) getType() ComponentType {
	return TRANSFORM
}

func componentCreate(ct ComponentType) Component {
	switch ct {
		case TRANSFORM:
			return &Transform{}
		case BOUNDING_BOX:
			return &BoundingBox{}
		default:
			panic("[ERROR] invalid component type")
	}
}


func printPos(t Transform) {
	t.position.x += 1
	fmt.Println("Fuck : ",t.position)
}

func main() {
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
	printPos(t)
	fmt.Println(t.position)
	fmt.Printf("type: %v\n", c1.getType())
	fmt.Printf("type: %v\n", c2.getType())
}


