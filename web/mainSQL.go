package mainSQL

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func mainSQL() {
	db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/golang")
	if err != nil {
		panic(err)
	}

	defer db.Close()

	/*Установка новых пользователей*/
	//insert, err := db.Query("INSERT INTO `users` (`name`, `age`) VALUES('Bob', 22)")
	//if err != nil {
	//	panic(err)}
	//defer insert.Close()

	/*Выборка данных*/
	res, err := db.Query("SELECT `name`, `age` FROM `users`")
	if err != nil {
		panic(err)
	}

	/*Цикл перебора данных в таблице с выводом Имени и Возраста*/
	for res.Next() {
		var user User
		err = res.Scan(&user.Name, &user.Age)

		if err != nil {
			panic(err)
		}
		/*Println - выводит, Sprintf - форматирует*/
		fmt.Println(fmt.Sprintf("User: %s with age %d", user.Name, user.Age))
	}
}

type User struct {
	Name string `json:"name"`
	Age  uint16 `json:"age"`
}
