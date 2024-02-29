package main

import (
	"fmt"
)

/*
	Дана структура Human (с произвольным набором полей и методов).
	Реализовать встраивание методов в структуре Action от родительской
	структуры Human (аналог наследования).
*/

type Human struct {
	Name    string
	Surname string
	Sex     string
	Age     int
}

type Action struct {
	Human //встраивание Human в Action
	// все поля и методы Human доступны через Action
}

func (h *Human) Person() string {
	return fmt.Sprintf("%s %s, %s, %v years old", h.Name, h.Surname, h.Sex, h.Age)
}

func main() {
	action := Action{
		Human{Name: "Ivan", Surname: "Ivanov", Sex: "male", Age: 30},
	}
	// вызов метода
	fmt.Printf("Information about a person: %s \n", action.Person())
}
