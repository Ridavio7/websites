package main

import (
	"fmt"
	"html/template"
	"net/http"
)

func main() {

	main_page()
}

func main_page() {
	http.HandleFunc("/", home_page) /*отслеживание о пререходах на url адреса*/
	http.HandleFunc("/user/", user_page)
	http.ListenAndServe(":8080", nil) /*локальный сервер*/
}

func home_page(w http.ResponseWriter, r *http.Request) {
	/*w - песердача инф на странице, r - отслеживание подкл к стр*/
	bob := User{"Bob", 30, -10, 0.7}
	// fmt.Fprintf(w, `<b>Main text</b>`)
	tmpl, _ := template.ParseFiles("web/templates/home_page.html") /*tmpl - хренение данных страницы; r - подгрузка ошибок*/
	tmpl.Execute(w, bob)

}

func user_page(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, user")
}

type User struct {
	name      string
	age       uint16
	money     int16
	happiness float64
}

func (u User) AllInfoUser() string {
	return fmt.Sprintf("User is: %s. He is: %d. Cash: %d", u.name, u.age, u.money)
}
