package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

var posts = []Article{}

var showPost = Article{} /*в объект помещаем статью, которую потом передаем в шаблон*/

type Article struct {
	Id                     uint16
	Title, Anons, FullText string
}

type User struct {
	Id              uint16
	Login, Password string
}

func main() {
	handleFunc()
}

func handleFunc() {

	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	/*отслеживание через gorilla mux*/
	rtr := mux.NewRouter()
	rtr.HandleFunc("/", demo_web).Methods("GET")
	rtr.HandleFunc("/main", index).Methods("GET")
	rtr.HandleFunc("/create", create).Methods("GET") /*форма добавления новых пользователей*/
	rtr.HandleFunc("/save_article", save_article).Methods("POST")
	rtr.HandleFunc("/save_user", save_user).Methods("POST")
	rtr.HandleFunc("/post/{id:[0-9]+}", show_post).Methods("GET") /*отслеживанеи уникального идентификатора*/
	rtr.HandleFunc("/authorization", authorization).Methods("GET")
	rtr.HandleFunc("/registration", registration).Methods("GET")
	rtr.HandleFunc("/error_input_text", error_input_text).Methods("GET")
	rtr.HandleFunc("/error_input_reg", error_input_reg).Methods("GET")

	/*обработка всех URL адресов через объект rtr*/
	http.Handle("/", rtr)

	/*получаем доступ к статическим файлам*/
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))

	infoLog.Println("Запуск веб-сервера на http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	errorLog.Fatal(err)
}

func show_post(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	t, err := template.ParseFiles("templates/show.html",
		"templates/header.html", "templates/footer.html")

	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/golang")
	if err != nil {
		panic(err)
	}

	defer db.Close()

	res, err := db.Query(fmt.Sprintf("SELECT * FROM `articles` WHERE `id` = '%s'", vars["id"]))
	if err != nil {
		panic(err)
	}

	/*обнуление списка, чтобы не пучковался каждый раз при обновлении*/
	showPost = Article{}

	/*Цикл перебора данных в таблице*/
	for res.Next() {
		var post Article
		err = res.Scan(&post.Id, &post.Title, &post.Anons, &post.FullText)

		if err != nil {
			panic(err)
		}
		showPost = post
	}

	t.ExecuteTemplate(w, "show", showPost)
}

func index(w http.ResponseWriter, r *http.Request) {

	t, err := template.ParseFiles("templates/index.html",
		"templates/header.html", "templates/footer.html")

	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/golang")

	if err != nil {
		panic(err)
	}

	defer db.Close()

	res, err := db.Query("SELECT * FROM `articles`")

	if err != nil {
		panic(err)
	}

	/*обнуление списка, чтобы не пучковался каждый раз при обновлении*/
	posts = []Article{}

	/*Цикл перебора данных в таблице*/
	for res.Next() {
		var post Article
		err = res.Scan(&post.Id, &post.Title, &post.Anons, &post.FullText)

		if err != nil {
			panic(err)
		}

		/*элемент вывода данных на главную страницу*/
		posts = append(posts, post)
	}

	t.ExecuteTemplate(w, "index", posts)
}

func create(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("templates/create.html",
		"templates/header.html", "templates/footer.html")

	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	t.ExecuteTemplate(w, "create", nil)
}

func error_input_text(w http.ResponseWriter, r *http.Request) {

	t, err := template.ParseFiles("templates/error_input_text.html",
		"templates/header.html", "templates/footer.html")

	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	t.ExecuteTemplate(w, "error_input_text", nil)
}

func error_input_reg(w http.ResponseWriter, r *http.Request) {

	t, err := template.ParseFiles("templates/error_input_reg.html",
		"templates/header_for_demo.html", "templates/footer.html")

	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	t.ExecuteTemplate(w, "error_input_reg", nil)
}

func save_article(w http.ResponseWriter, r *http.Request) {
	title := r.FormValue("title")
	anons := r.FormValue("anons")
	full_text := r.FormValue("full_text")

	if title == "" || anons == "" || full_text == "" {
		http.Redirect(w, r, "/error_input_text", http.StatusSeeOther)
	} else {
		db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/golang")
		if err != nil {
			panic(err)
		}
		defer db.Close()

		insert, err := db.Query(fmt.Sprintf("INSERT INTO `articles` (`title`, `anons`, `full_text`) VALUES('%s', '%s','%s')", title, anons, full_text))
		if err != nil {
			panic(err)
		}
		defer insert.Close()

		http.Redirect(w, r, "/main", http.StatusSeeOther)
	}
}

func save_user(w http.ResponseWriter, r *http.Request) {
	login := r.FormValue("login")
	password := r.FormValue("password")

	if login == "" || password == "" {
		http.Redirect(w, r, "/error_input_reg", http.StatusSeeOther)
	} else {
		db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/golang")
		if err != nil {
			panic(err)
		}
		defer db.Close()

		insert, err := db.Query(fmt.Sprintf("INSERT INTO `user` (`login`, `password`) VALUES('%s', '%s')", login, password))
		if err != nil {
			panic(err)
		}
		defer insert.Close()

		http.Redirect(w, r, "/main", http.StatusSeeOther)
	}
}

func demo_web(w http.ResponseWriter, r *http.Request) {

	t, err := template.ParseFiles("templates/demo_web.html",
		"templates/header_for_demo.html", "templates/footer.html")

	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/golang")

	if err != nil {
		panic(err)
	}

	defer db.Close()

	res, err := db.Query("SELECT * FROM `articles`")

	if err != nil {
		panic(err)
	}

	/*обнуление списка, чтобы не пучковался каждый раз при обновлении*/
	posts = []Article{}

	/*Цикл перебора данных в таблице*/
	for res.Next() {
		var post Article
		err = res.Scan(&post.Id, &post.Title, &post.Anons, &post.FullText)

		if err != nil {
			panic(err)
		}

		/*элемент вывода данных на главную страницу*/
		posts = append(posts, post)
	}

	t.ExecuteTemplate(w, "demo_web", posts)
}

func authorization(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("templates/authorization.html",
		"templates/header_for_demo.html", "templates/footer.html")

	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	t.ExecuteTemplate(w, "authorization", nil)
}

func registration(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("templates/registration.html",
		"templates/header_for_demo.html", "templates/footer.html")

	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	t.ExecuteTemplate(w, "registration", nil)
}
