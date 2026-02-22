package main

import (
	"math"
)

type Vec2 struct {
	x, y float64
}


func (v1 *Vec2) add(v2 *Vec2) {
	v1.x += v2.x
	v1.y += v2.y
}

func (v1 *Vec2) subtract(v2 *Vec2) {
	v1.x -= v2.x
	v1.y -= v2.y
}

func (v1 *Vec2) subtractAndCopy(v2 *Vec2) Vec2 {
	v1.subtract(v2)
	return Vec2{x: v1.x, y: v1.y}
}


func (v *Vec2) scale(scalar float64) Vec2 {
	v.x *= scalar
	v.y *= scalar
	return Vec2{x: v.x, y: v.y}
}

func (v1 *Vec2) multiply(v2 *Vec2) Vec2 {
	return Vec2{x: v1.x * v2.x, y: v1.y * v2.y}
}

func (v1 *Vec2) delta(v2 *Vec2) Vec2 {
	return Vec2{x: math.Abs(v1.x - v2.x), y: math.Abs(v1.y - v2.y)}
}

func (v1 *Vec2) dot(v2 *Vec2) float64 {
	return v1.x * v2.x + v1.y * v2.y
}

func (v1 *Vec2) addAndCopy(v2 *Vec2) Vec2 {
	return Vec2{x: v1.x + v2.x, y: v1.y + v2.y}
}

func (v *Vec2) clone() Vec2 {
	return Vec2{x: v.x, y: v.y}
}

func (v1 *Vec2) isEqual(v2 *Vec2) bool {
	return v1.x == v2.y && v1.y == v2.y
}

func (v1 *Vec2) moveTowards(v2 *Vec2, t float64) {
	t = math.Min(t, 1)
	diff := v1.subtractAndCopy(v2)
	scaled := diff.scale(t)
	v1.add(&scaled)
}


func (v1 *Vec2) distance(v2 *Vec2) float64 {
	return math.Sqrt(v1.distanceSqrt(v2)) 
}

func (v1 *Vec2) distanceSqrt(v2 *Vec2) float64 {
	deltaX := v1.x - v2.x
	deltaY := v1.y - v2.y
	return deltaX * deltaX + deltaY * deltaY
}


func (v *Vec2) magnitude() float64 {
	return math.Sqrt(v.magnitudeSqrt())
}

func (v *Vec2) magnitudeSqrt() float64 {
	return v.x * v.x + v.y * v.y
}

func (v *Vec2) normalizeAndCopy() Vec2 {
	mag := v.magnitude()
	clone := v.clone()
	if(math.Abs(mag) < 1e-9) {
		clone.x = 0
		clone.y = 0
	} else {
		clone.x /= mag
		clone.y /= mag
	}

	return clone
}


func (v *Vec2) angle() float64 {
	return math.Atan2(v.y, v.x)
}


func (v *Vec2) rotateAndCopy(alpha float64) Vec2 {
	cos := math.Cos(alpha)
	sin := math.Sin(alpha)
	var vec Vec2
	vec.x = v.x * cos - v.y * sin 
	vec.y = v.x * sin - v.y * cos 
	return vec
} 