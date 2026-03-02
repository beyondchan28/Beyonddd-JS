package main

import (
	"fmt"
	"syscall/js"
)

type Blog struct {
	front       PageData
	pages       []PageData
	currentPage string
}

func (b *Blog) setup() {
	window := js.Global().Get("window")
	b.currentPage = (window.Get("location")).Get("pathname").String()
	fmt.Println("currentPage : ", b.currentPage)

	switch b.currentPage {
	case "/index.html":
		b.front.ReadXDFileWASM("./pages/front.xd")
		b.front.InsertGeneratedHTML()
		// case "/blog.html":
		// TODO: create list for blog page and it must be loaded up based on how much the pages currently are

	}
}

func (b *Blog) addPage(filename string) {
	blogDir := "./pages/blogs/"
	page := PageData{}
	page.ReadXDFileWASM(blogDir + filename + ".xd")
	b.pages = append(b.pages, page)
}

func main() {
	b := &Blog{}
	b.setup()

	// NOTE: Set new blog page here
	b.addPage("page")
	b.addPage("page")
	b.addPage("page")

	// go func() {
	// 	window := js.Global().Get("window")
	// 	loc := window.Get("location")
	// 	fmt.Println(loc.Get("pathname"))
	// 	setupBlog()
	// }()
	select {}
}
