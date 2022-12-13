package main

import (
	"fmt"
)

func main() {
	var i int
	fmt.Scan(&i)

	i6 := i % 10
	i5 := (i / 10) % 10
	i4 := (i / 100) % 10
	i3 := (i / 1000) % 10
	i2 := (i / 10000) % 10
	i1 := i / 100000

	if (i1 + i2 + i3) == (i4 + i5 + i6) {
		fmt.Println("YES")
	} else {
		fmt.Println("NO")
	}
}
