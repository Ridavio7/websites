package main

import (
	"fmt"
)

func main() {
	var i, r int
	sum := 0
	fmt.Scan(&i, &r)
	for ; i < 100 && r < 100 && i <= r; i++ {
		sum += i
	}
	fmt.Println(sum)
}
