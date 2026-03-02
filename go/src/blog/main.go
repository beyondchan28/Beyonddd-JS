package main

// TODO: create list for blog page and it must be loaded up based on how much the pages currently are

type Blog struct {
	front       PageData
	pages       []PageData
	currentPage string
}

var blog Blog

func setupBlog() {
	blog = Blog{}
	blog.front.ReadXDFileWASM("./pages/front.xd")
	blog.front.InsertGeneratedHTML()

	// NOTE: Set new blog page here
	addNewBlogPage("page")
	addNewBlogPage("page")
	addNewBlogPage("page")
}

func addNewBlogPage(filename string) {
	blogDir := "./pages/blogs/"
	page := PageData{}
	page.ReadXDFileWASM(blogDir + filename + ".xd")
	blog.pages = append(blog.pages, page)
}

func main() {
	go func() {
		setupBlog()
	}()
	select {}
}
