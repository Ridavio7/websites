package main

import (
	"fmt"
	"html/template"
	"net/http"
)

/*Отслеживанеи главной страницы сайта*/
func handleFunc() {
	/*обращение к css файла путем поиска нужного файла в каталоге*/
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))
	http.HandleFunc("/", index)
	http.ListenAndServe(":8080", nil)
}

/*функция сраатывает при переходе на главную страницу*/
/*w - параметр записи на стр., r - получение данных о переходе на стр.*/
/*t - шаблон, err - ошибка*/
func index(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("templates/index.html",
		"templates/header.html", "templates/footer.html")

	if err != nil {
		fmt.Fprintf(w, err.Error())
	}
	/*испл. для динамического подключения частей html файла*/
	/*index показывает, увуой блок нужно выводить*/
	t.ExecuteTemplate(w, "index", nil)
}

func main() {
	handleFunc()
}
