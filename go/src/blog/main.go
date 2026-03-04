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

	// NOTE: Set new blog page here
	b.addPage("page")
	b.addPage("page")
	b.addPage("page")

	switch b.currentPage {
	case "/":
		b.front.ReadXDFileWASM("./pages/front.xd")
		b.front.InsertGeneratedHTML()
	case "/blog.html":
		for _, pageData := range b.pages {
			var titleId int
			var dateId int
			for _, pageMap := range pageData.pageMapArray {
				if v, ok := pageMap[TITLE]; ok {
					titleId = v[0]
					fmt.Println("v is: ", v)
				} else if v, ok := pageMap[DATE]; ok {
					dateId = v[0]
				}
			}
			b.generateBlogList(pageData.texts[titleId], pageData.texts[dateId])
		}
		// TODO: create list for blog page and it must be loaded up based on how much the pages currently are

	}
}

func (b *Blog) generateBlogList(title, date string) {
	fmt.Println(title)
	fmt.Println(date)
	doc := js.Global().Get("document")
	blogList := doc.Call("getElementById", "blog-list")
	blogItem := doc.Call("createElement", "li")
	blogItem.Set("className", "blog-item")

	link := doc.Call("createElement", "a")
	link.Set("href", "/")
	link.Set("textContent", title)

	blogTitle := doc.Call("createElement", "div")
	blogTitle.Set("className", "blog-title")
	blogTitle.Call("appendChild", link)

	blogDate := doc.Call("createElement", "div")
	blogDate.Set("className", "published-date")
	blogDate.Set("textContent", date)

	blogItem.Call("appendChild", blogTitle)
	blogItem.Call("appendChild", blogDate)

	blogList.Call("appendChild", blogItem)

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

	// go func() {
	// 	window := js.Global().Get("window")
	// 	loc := window.Get("location")
	// 	fmt.Println(loc.Get("pathname"))
	// 	setupBlog()
	// }()
	select {}
}
