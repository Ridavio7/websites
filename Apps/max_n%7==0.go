/*
Найдите самое большее число на отрезке от a до b
(отрезок включает в себя числа a и b), кратное 7 ,
или выведите "NO" - если таковых нет.
*/
package main

import "fmt"

func main() {
	var A int
	var B int
	var max int

	fmt.Scan(&A)
	fmt.Scan(&B)

	for i := B; i >= A; i-- {
		if i%7 == 0 {
			max = i
			break
		}
	}
	if max >= A && max <= B {
		fmt.Print(max)
	} else {
		fmt.Print("NO")
	}
}
