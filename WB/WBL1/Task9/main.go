package main

import (
	"fmt"
)

// Разработать конвейер чисел. Даны два канала: в первый пишутся числа (x) из массива,
// во второй — результат операции x*2, после чего данные из второго канала должны выводиться в stdout.

func main() {
	intCh1 := make(chan int) // канал с x
	intCh2 := make(chan int) // канал  c x*2
	arr := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

	go func(intCh1 chan<- int) {
		for _, a := range arr {
			intCh1 <- a // читаем из массива и пишем в 1 канал
		}
		close(intCh1)
	}(intCh1)

	go func(intCh1 <-chan int, intCh2 chan<- int) {
		for v := range intCh1 {
			intCh2 <- v * v // читаем из 1 канала, возводим в степень, отправляем во 2 канал
		}
		close(intCh2)
	}(intCh1, intCh2)

	for v := range intCh2 {
		fmt.Println("Data from channel:", v) // печатаем в "stdout"
	}
}
