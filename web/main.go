package main

import (
	"fmt"
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
	fmt.Fprintf(w, "Hello!!!")
}

func user_page(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, user")
}

type User struct {
}
