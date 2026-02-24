package main

import (
	"bufio"
	"fmt"
	"html/template"
	"log"
	"os"
	"slices"
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

func (pd *PageData) generateTag(flag Flag, indexes []int) string {
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

func (pd *PageData) ReadXDFileNative(path string) {
	file, err := os.Open(path)
	if err != nil {
		fmt.Println("Error when opening xd file : ", err)
		return
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	if err := scanner.Err(); err != nil {
		fmt.Println("Error reading xd file : ", err)
		return
	}

	for scanner.Scan() {
		line := scanner.Text()
		pd.texts = append(pd.texts, line)
	}

	for index, text := range pd.texts {
		if len(text) != 0 && text[0] == '[' {
			flag := text[1 : len(text)-1]
			pd.addData(flag)
		} else if len(text) == 0  {
			pd.newLineIndex = append(pd.newLineIndex, index)
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

func (pd *PageData) ReadXDFileWASM(path string) {
	file, err := os.Open(path)
	if err != nil {
		fmt.Println("Error when opening xd file : ", err)
		return
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	if err := scanner.Err(); err != nil {
		fmt.Println("Error reading xd file : ", err)
		return
	}

	for scanner.Scan() {
		line := scanner.Text()
		pd.texts = append(pd.texts, line)
	}

	for index, text := range pd.texts {
		if len(text) != 0 && text[0] == '[' {
			flag := text[1 : len(text)-1]
			pd.addData(flag)
		} else if len(text) == 0  {
			pd.newLineIndex = append(pd.newLineIndex, index)
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


func (pd *PageData) GenerateHTML() string {
	var result string
	for _, pageData := range pd.pageMapArray {
		for key, val:= range pageData {
			result += pd.generateTag(key, val)
		}
	}
	return result
}

func (pd *PageData) InsertGeneratedHTML(htmlFilePath string) {
	generated := pd.GenerateHTML()
	template, err := template.ParseFiles(htmlFilePath)
	if err != nil {
		log.Fatal(err)
	}
	err = template.Execute(os.Stdout, generated)
	if err != nil {
		log.Fatal(err)
	}
}
