package main

import (
	"bufio"
	"fmt"
	"net/http"
	"os"
	"slices"
	"io"
	"syscall/js"
)

type Flag uint8

const (
	TITLE Flag = iota
	CHAPTER
	SECTION
	BLOCKQUOTE
	CODE
	PARAGRAPH
	TASKTRUE
	TASKFALSE
	LIST
)

type PageMap map[Flag][]int //

type PageData struct {
	pageMapArray []PageMap
	texts []string
	keys []Flag
	newLineIndex []int // texts index to know add new line
}

type Tag struct {
	kind []string
	inner string
}

func (pd *PageData) addData(flag string) {
	var currentFlag Flag
	switch flag {
		case "title":
			currentFlag = TITLE
		case "chapter":
			currentFlag = CHAPTER
		case "section":
			currentFlag = SECTION
		case "paragraph":
			currentFlag = PARAGRAPH
		case "blockquote":
			currentFlag = BLOCKQUOTE
		case "tasktrue":
			currentFlag = TASKTRUE
		case "taskfalse":
			currentFlag = TASKFALSE
		case "list":
			currentFlag = LIST
		case "code":
			currentFlag = CODE
		default:
			panic("[ERROR] Flag is not valid: " + flag)
	}
	newPageMap := PageMap{}
	pd.keys = append(pd.keys, currentFlag)
	pd.pageMapArray = append(pd.pageMapArray, newPageMap)
}

func (pd *PageData) generateTagAsString(flag Flag, indexes []int) string {
	var openTag string
	var closeTag string
	switch flag {
		case TITLE:
			openTag = "<h1>"
			closeTag = "</h1>"
		case CHAPTER:
			openTag = "<h2>"
			closeTag = "</h2>"
		case SECTION:
			openTag = "<h3>"
			closeTag = "</h3>"
		case PARAGRAPH:
			openTag = "<p>"
			closeTag = "</p>"
		case BLOCKQUOTE:
			openTag = "<blockquote>"
			closeTag = "</blockquote>"
		case TASKTRUE:
			openTag = "<li><input disabled=\"\" type=\"checkbox\">"
			closeTag = "</li>"
		case TASKFALSE:
			openTag = "<li><input checked disabled=\"\" type=\"checkbox\">"
			closeTag = "</li>"
		case LIST:
			openTag = "<li>"
			closeTag = "</li>"
		case CODE:
			openTag = "<pre><code>"
			closeTag = "</pre></code>"
		default:
			panic("[ERROR] Flag is not valid")
	}
	var text string
	var lastDetectedIndex int
	if len(indexes) == 1 {
		textIndex := indexes[0]
		lastDetectedIndex = textIndex
		text = pd.texts[textIndex]
	} else {
		for _, textIndex:= range indexes {
			text += pd.texts[textIndex]
			lastDetectedIndex = textIndex
		}
	}
	if slices.Contains(pd.newLineIndex, lastDetectedIndex + 1) {
		closeTag += "\n"
	}
	return openTag + text + closeTag
}

func (pd *PageData) addTag(flag Flag, indexes []int) {
	var tag Tag
	switch flag {
		case TITLE:
			tag.kind = append(tag.kind, "h1")
		case CHAPTER:
			tag.kind = append(tag.kind, "h2")
		case SECTION:
			tag.kind = append(tag.kind, "h3")
		case PARAGRAPH:
			tag.kind = append(tag.kind, "p")
		case BLOCKQUOTE:
			tag.kind = append(tag.kind, "blockquote")
		case TASKTRUE:
			tag.kind = append(tag.kind, "li")
			tag.kind = append(tag.kind, "input")
		case TASKFALSE:
			tag.kind = append(tag.kind, "li")
			tag.kind = append(tag.kind, "input")
		case LIST:
			tag.kind = append(tag.kind, "li")
		case CODE:
			tag.kind = append(tag.kind, "pre")
			tag.kind = append(tag.kind, "code")
		default:
			panic("[ERROR] Flag is not valid")
	}
	var text string
	if len(indexes) == 1 {
		textIndex := indexes[0]
		text = pd.texts[textIndex]
	} else {
		for _, textIndex:= range indexes {
			text += pd.texts[textIndex]
		}
	}
	tag.inner = text

	doc := js.Global().Get("document")
	element := doc.Call("createElement", tag.kind[0])
	page := doc.Call("getElementById", "page")
	page.Call("appendChild", element)

	switch flag {
		case TASKTRUE:
			input := doc.Call("createElement", tag.kind[1])
			input.Set("type", "checkbox")
			input.Set("disabled", true)
			input.Set("checked", true)

			element.Call("appendChild", input)
			element.Call("appendChild", doc.Call("createTextNode", tag.inner))
		case TASKFALSE:
			input := doc.Call("createElement", tag.kind[1])
			input.Set("type", "checkbox")
			input.Set("disabled", true)
			input.Set("checked", false)

			element.Call("appendChild", input)
			element.Call("appendChild", doc.Call("createTextNode", tag.inner))
		case CODE:
			code := doc.Call("createElement", tag.kind[1])
			tag.kind = append(tag.kind, "pre")
			tag.kind = append(tag.kind, "code")
			code.Set("textContent", tag.inner)
			element.Call("appendChild", code)
		default:
			element.Set("textContent", tag.inner)

	}
}

func (pd *PageData) ReadXDFileWASM(path string) {
	response, err := http.Get(path)
	if err != nil {
		fmt.Println("Error when opening xd file : ", err)
		return
	}
	defer response.Body.Close()

	pd.readLine(response.Body)
}

func (pd *PageData) readLine(reader io.Reader) {
	scanner := bufio.NewScanner(reader)

	if err := scanner.Err(); err != nil {
		fmt.Println("Error reading xd file : ", err)
		return
	}

	for scanner.Scan() {
		line := scanner.Text()
		pd.texts = append(pd.texts, line)
	}

	for index, text := range pd.texts {
		// check for Tag
		if len(text) != 0 && text[0] == '[' {
			flag := text[1 : len(text)-1]
			pd.addData(flag)
		//check for new line
		} else if len(text) == 0  {
			pd.newLineIndex = append(pd.newLineIndex, index)
		// appending after tags
		} else {
			lastIndex := len(pd.pageMapArray) - 1
			lastKey := pd.keys[len(pd.keys) -1]
			pd.pageMapArray[lastIndex][lastKey] = append(pd.pageMapArray[lastIndex][lastKey], index)
		}
	}

	fmt.Println("[INFO] Total texts    line : ", len(pd.texts))
	fmt.Println("[INFO] Total pageData data : ", len(pd.pageMapArray))
	fmt.Println("[INFO] Total newlines      : ", len(pd.newLineIndex))
	fmt.Println("[INFO] Index to addnewlines: ", pd.newLineIndex)
}

func (pd *PageData) ReadXDFileNative(path string) {
	file, err := os.Open(path)
	if err != nil {
		fmt.Println("Error when opening xd file : ", err)
		return
	}
	defer file.Close()

	pd.readLine(file)
}


func (pd *PageData) GenerateHTML() string {
	var result string
	for _, pageData := range pd.pageMapArray {
		for key, val:= range pageData {
			result += pd.generateTagAsString(key, val)
		}
	}
	return result
}

func (pd *PageData) InsertGeneratedHTML() {
	// var result string

	for _, pageData := range pd.pageMapArray {
		for key, val:= range pageData {
			pd.addTag(key, val)
			// result += pd.generateTagAsString(key, val)

		}
	}
	// fmt.Println(result)
	// doc := js.Global().Get("document")
	// page := doc.Call("getElementById", "page")
	// page.Set("innerHTMl", result)
}
