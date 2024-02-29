package main

import (
	"fmt"
	"math"
	"sync"
)

/*
	Дана последовательность температурных колебаний: -25.4, -27.0 13.0, 19.0, 15.5, 24.5, -21.0, 32.5.
	Объединить данные значения в группы с шагом в 10 градусов. Последовательность в подмножноствах не важна.
	Пример: -20:{-25.0, -27.0, -21.0}, 10:{13.0, 19.0, 15.5}, 20: {24.5}, etc.
*/

func main() {
	tmp := []float64{-25.4, -27.0, 13.0, 19.0, 15.5, 24.5, -21.0, 32.5}

	groupFirst(tmp)
	groupSecond(tmp)
}

func groupFirst(tmp []float64) map[float64][]float64 {
	groups := make(map[float64][]float64) // создаем карту для хранения групп

	for _, temp := range tmp {
		// число делим на 10
		// с помощью функции Trunc получаем целочисленно значение
		// умножаем на 10
		// получаем ключ map
		key := math.Trunc(temp/10.0) * 10.0
		groups[key] = append(groups[key], temp) // группируем
	}

	// вывод данных
	for key, value := range groups {
		fmt.Printf("%.0f:%v\n", key, value)
	}

	return groups
}

func groupSecond(tmp []float64) map[float64][]float64 {
	var wg sync.WaitGroup                 // определяет группу горутин, которые должны выполняться вместе как одна группа
	var mux sync.Mutex                    // разграничить доступ к некоторым общим ресурсам, гарантируя, что только одна горутина имеет к ним доступ
	groups := make(map[float64][]float64) // создаем карту для хранения групп

	for _, value := range tmp {
		wg.Add(1) // создаем горутины
		go func(value float64) {
			defer wg.Done() // сигнал, что элемент группы завершил свое выполнение
			if value > 0 {  // проверяем темпр. болье 0
				for i := float64(0); i < 100; i += 10 {
					if i <= value && value < i+10 {
						mux.Lock()                                             // блокируем доступ
						groups[float64(i)] = append(groups[float64(i)], value) // группируем
						mux.Unlock()                                           // деблокируем доступ
						break
					}
				}
			} else { // проверяем темпр. меньше 0
				for i := float64(0); i > -100; i -= 10 {
					if i >= value && value > i-10 {
						mux.Lock()                                             // блокируем доступ
						groups[float64(i)] = append(groups[float64(i)], value) // группируем
						mux.Unlock()                                           // деблокируем доступ
						break
					}
				}
			}
		}(value)
	}
	wg.Wait() // ожидаем завершения

	// вывод данных
	fmt.Printf("\n")
	for key, value := range groups {
		fmt.Printf("%.0f:%v\n", key, value)
	}
	return groups
}
