package main

import (
	"syscall/js"
)

type ComponentType uint8
const (
	TRANSFORM ComponentType = iota
	BOUNDING_BOX
	SPRITE
)

// type ComponentBuilder struct {
// 	transfor *Transform
// 	boundingBox *BoundingBox
// }

type Component interface {
	// create() ComponentBuilder
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
	scale    Vec2
}

type BoundingBox struct {
	Property
	size     Vec2
	halfSize Vec2
}

type Sprite struct {
	Property
	image js.Value
	position Vec2
	size Vec2
	haflSize Vec2
	sourcePosition Vec2
	sourceSize Vec2
	flipHorizontal bool
	usedByAnimation bool
}

type Text struct {
	font string
	text string
	position Vec2
	tint Color
}


// func (t *Transform) create() ComponentBuilder {
// 	return
// }
// func (b *BoundingBox) create() ComponentBuilder {
// 	fmt.Println("HECK")
// }

func (bb *BoundingBox) getType() ComponentType {
	return BOUNDING_BOX
}
func (t *Transform) getType() ComponentType {
	return TRANSFORM
}

func (s *Sprite) getType() ComponentType {
	return SPRITE
}

func componentCreate(ct ComponentType) Component {
	switch ct {
		case TRANSFORM:
			return &Transform{}
		case BOUNDING_BOX:
			return &BoundingBox{}
		case SPRITE:
			sprite := Sprite{}
			// sprite.image =
			return &sprite
		default:
			panic("[ERROR] invalid component type")
	}
}


