/*
Дано натуральное число A > 1. Определите,
каким по счету числом Фибоначчи оно является,
то есть выведите такое число n, что φn=A.
Если А не является числом Фибоначчи, выведите число -1.
*/
package main

import "fmt"

func main() {
	var A, i int
	fmt.Scan(&A)
	a, b := 0, 1
	for i = 0; a < A; i++ {
		a, b = b, a+b
	}
	if a == A {
		fmt.Println(i)
	} else {
		fmt.Println(-1)
	}
}
