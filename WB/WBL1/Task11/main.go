package main

import (
	"fmt"
)

/*
	Реализовать пересечение двух неупорядоченных множеств
*/

func main() {
	set1 := []int{3, 4, 2, 7, 5, 10, 8, 9}
	set2 := []int{4, 5, 6, 8, 1, 10, 11, 0}

	map1 := make(map[int]bool, len(set1))
	map2 := make(map[int]bool, len(set2))

	var res []int // переменная результата

	for _, val := range set1 {
		map1[val] = true
	}

	for _, val := range set2 {
		map2[val] = true
	}

	// сохраняем ключи из первого множества, которые имеются во втором множестве
	for key := range map1 {
		if map2[key] {
			res = append(res, key) // группируем
		}
	}

	fmt.Println(res)
}
