package main

// TODO: create list for blog page and it must be loaded up based on how much the pages currently are

import (
	"fmt"
)

type Blog struct {
	front       PageData
	pages       []PageData
	currentPage string
}

var blog Blog

func setupBlog() {
	blog = Blog{}
	blog.front.ReadXDFileWASM("./src/pages/front.xd")
	blog.front.InsertGeneratedHTML()

	// NOTE: Set new blog page here
	addNewBlogPage("page")
	addNewBlogPage("page")
	addNewBlogPage("page")
}

func addNewBlogPage(filename string) {
	blogDir := "./src/pages/blogs/"
	page := PageData{}
	page.ReadXDFileWASM(blogDir + filename + ".xd")
	blog.pages = append(blog.pages, page)
}

func main() {
	go func() {
		setupBlog()
	}()
	select {}
	// go func() {
	// 	pd := PageData{}
	// 	pd.ReadXDFileWASM("./src/pages/page.xd")
	// 	pd.InsertGeneratedHTML()
	// }()
	// select {}
	// engine := Engine{}
	// engine.ready()
	//
	// pos1 := Vec2{x: 10.0, y: 10.0}
	// pos2 := Vec2{x: 20.0, y: 20.0}
	//
	// dot := pos1.dot(&pos2)
	//
	// fmt.Println(dot)
	// fmt.Println(pos1)
	// fmt.Println(pos2)
	//
	// c1 := componentCreate(TRANSFORM)
	// c2 := componentCreate(BOUNDING_BOX)
	//
	// t := Transform{}
	// t.position = Vec2{10, 10}
	// fmt.Println(t.position)
	// fmt.Printf("type: %v\n", c1.getType())
	// fmt.Printf("type: %v\n", c2.getType())
	// select {}
}
