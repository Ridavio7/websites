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
	Id                               uint16
	Title, Anons, FullText, Username string
}

type User struct {
	Id              uint16
	Login, Password string
}

func main() {
	handleFunc()
}

/*обработчик адресов*/
func handleFunc() {

	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	rtr := mux.NewRouter()
	rtr.HandleFunc("/", demo_web).Methods("GET")
	rtr.HandleFunc("/main", index).Methods("GET")
	rtr.HandleFunc("/create", create).Methods("GET")
	rtr.HandleFunc("/post/{id:[0-9]+}", show_post).Methods("GET")
	rtr.HandleFunc("/authorization", authorization).Methods("GET")
	rtr.HandleFunc("/registration", registration).Methods("GET")
	rtr.HandleFunc("/rules", rules).Methods("GET")
	rtr.HandleFunc("/error_input_text", error_input_text).Methods("GET")
	rtr.HandleFunc("/error_input_reg", error_input_reg).Methods("GET")
	rtr.HandleFunc("/save_article", save_article).Methods("POST")
	rtr.HandleFunc("/save_user", save_user).Methods("POST")
	rtr.HandleFunc("/check_user", check_user).Methods("POST")

	http.Handle("/", rtr)

	//http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))
	rtr.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))

	infoLog.Println("Запуск веб-сервера на http://localhost:8888")
	err := http.ListenAndServe(":8888", nil)
	errorLog.Fatal(err)
}

/*функция показ постов в отдельном окне*/
func show_post(w http.ResponseWriter, r *http.Request) {
	/*использование gorilla mux для динамических страниц*/
	vars := mux.Vars(r)

	t, err := template.ParseFiles("templates/show.html", "templates/header.html", "templates/footer.html")

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
		err = res.Scan(&post.Id, &post.Title, &post.Anons, &post.FullText, &post.Username)

		if err != nil {
			panic(err)
		}

		showPost = post
	}

	t.ExecuteTemplate(w, "show", showPost)
}

/*функция добавления статьи*/
func save_article(w http.ResponseWriter, r *http.Request) {

	title := r.FormValue("title")
	anons := r.FormValue("anons")
	full_text := r.FormValue("full_text")
	username := r.FormValue("username")

	if title == "" || anons == "" || full_text == "" || username == "" {
		http.Redirect(w, r, "/error_input_text", http.StatusSeeOther)
	} else {
		db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/golang")

		if err != nil {
			panic(err)
		}

		defer db.Close()

		insert, err := db.Query(fmt.Sprintf("INSERT INTO `articles` (`title`, `anons`, `full_text`, `username`) VALUES('%s', '%s','%s','%s')", title, anons, full_text, username))

		if err != nil {
			panic(err)
		}

		defer insert.Close()

		http.Redirect(w, r, "/main", http.StatusSeeOther)
	}
}

/*функция регистрации/проверки на наличие пользователя*/
func save_user(w http.ResponseWriter, r *http.Request) {

	login := r.FormValue("login")
	password := r.FormValue("password")

	db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/golang")

	if err != nil {
		panic(err)
	}

	defer db.Close()

	res, err := db.Query("SELECT login, password FROM user")

	if err != nil {
		panic(err)
	}

	var u User
	for res.Next() {
		err = res.Scan(&u.Login, &u.Password)
		if err != nil {
			panic(err)
		}
	}

	if login == "" || password == "" {
		http.Redirect(w, r, "/error_input_reg", http.StatusSeeOther)
	} else if login == u.Login && password == u.Password {
		http.Redirect(w, r, "/error_input_reg", http.StatusSeeOther)
	} else {
		insert, err := db.Query(fmt.Sprintf("INSERT INTO user (login, password) VALUES('%s', '%s')", login, password))

		if err != nil {
			panic(err)
		}

		defer insert.Close()

		http.Redirect(w, r, "/main", http.StatusSeeOther)
	}
}

/*функция авторизации*/
func check_user(w http.ResponseWriter, r *http.Request) {

	login := r.FormValue("login")
	password := r.FormValue("password")

	db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/golang")

	if err != nil {
		panic(err)
	}

	defer db.Close()

	res, err := db.Query("SELECT login, password FROM user")

	if err != nil {
		panic(err)
	}

	var u User
	for res.Next() {
		err = res.Scan(&u.Login, &u.Password)
		if err != nil {
			panic(err)
		}
	}

	if login == "" || password == "" {
		http.Redirect(w, r, "/error_input_reg", http.StatusSeeOther)
	} else if login == u.Login && password == u.Password {
		http.Redirect(w, r, "/main", http.StatusSeeOther)
	} else {
		http.Redirect(w, r, "/error_input_reg", http.StatusSeeOther)
	}
}

/*главная страница*/
func index(w http.ResponseWriter, r *http.Request) {

	t, err := template.ParseFiles("templates/index.html", "templates/header.html", "templates/footer.html")

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

	for res.Next() {
		var post Article
		err = res.Scan(&post.Id, &post.Title, &post.Anons, &post.FullText, &post.Username)

		if err != nil {
			panic(err)
		}

		posts = append(posts, post)
	}

	t.ExecuteTemplate(w, "index", posts)
}

/*странице добавления статьи*/
func create(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("templates/create.html", "templates/header.html", "templates/footer.html")

	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	t.ExecuteTemplate(w, "create", nil)
}

/*страница вывода ошибки заполнения при добавлении страницы*/
func error_input_text(w http.ResponseWriter, r *http.Request) {

	t, err := template.ParseFiles("templates/error_input_text.html", "templates/header.html", "templates/footer.html")

	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	t.ExecuteTemplate(w, "error_input_text", nil)
}

/*страница вывода ошибки заполнения при регистрации/авторизации*/
func error_input_reg(w http.ResponseWriter, r *http.Request) {

	t, err := template.ParseFiles("templates/error_input_reg.html", "templates/header_for_demo.html", "templates/footer.html")

	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	t.ExecuteTemplate(w, "error_input_reg", nil)
}

/*страница демо-версия главной до авторизации*/
func demo_web(w http.ResponseWriter, r *http.Request) {

	t, err := template.ParseFiles("templates/demo_web.html", "templates/header_for_demo.html", "templates/footer.html")

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
		err = res.Scan(&post.Id, &post.Title, &post.Anons, &post.FullText, &post.Username)

		if err != nil {
			panic(err)
		}

		/*элемент вывода данных на главную страницу*/
		posts = append(posts, post)
	}

	t.ExecuteTemplate(w, "demo_web", posts)
}

/*страница авторизации*/
func authorization(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("templates/authorization.html", "templates/header_for_demo.html", "templates/footer.html")

	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	t.ExecuteTemplate(w, "authorization", nil)
}

/*страница регистрации*/
func registration(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("templates/registration.html", "templates/header_for_demo.html", "templates/footer.html")

	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	t.ExecuteTemplate(w, "registration", nil)
}

func rules(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("templates/rules.html", "templates/header.html", "templates/footer.html")

	if err != nil {
		fmt.Fprintf(w, err.Error())
	}

	t.ExecuteTemplate(w, "rules", nil)
}
