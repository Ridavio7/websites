/*Из натурального числа удалить заданную цифру.*/
package main

import "fmt"

func main() {
	var num, n int
	fmt.Scan(&num, &n)
	for ; num > 0; num /= 10 {
		if num%10 != n {
			defer fmt.Print(num % 10)
		}
	}
}
