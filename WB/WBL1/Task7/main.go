package main

import (
	"fmt"
	"sync"
)

// Реализовать конкурентную запись данных в map.

/*
	Решение делать или нет map потокобезопасным было непростым, но было принято не делать — эта безопасность не даётся бесплатно.
	Там где она не нужна, дополнительные средства синхронизации вроде мьютексов будут излишне замедлять программу, а там где она нужна —
	не составляет труда реализовать эту безопасность с помощью sync.Mutex.

	sync.Map решает совершенно конкретную проблему cache contention в стандартной библиотеке для таких случаев,
	когда ключи в map стабильны (не обновляются часто) и происходит намного больше чтений, чем записей.
*/

func main() {
	writeSyncMutex()

	writeSyncMap()
}

func writeSyncMutex() {
	fmt.Println("writeSyncMutex()")

	var wg sync.WaitGroup     // определяет группу горутин, которые должны выполняться вместе как одна группа
	var smux sync.Mutex       // разграничить доступ к некоторым общим ресурсам, гарантируя, что только одна горутина имеет к ним доступ
	wg.Add(1)                 // создаем горутины
	sMap := make(map[int]int) // создаем map

	// функция конкурентной записи данных в map
	addmap := func(k int, v int, mp map[int]int, mux *sync.Mutex) {
		mux.Lock()   // блокируем доступ к map
		mp[k] = v    // записываем значение
		mux.Unlock() // деблокируем доступ
	}

	go func(mp map[int]int, smux *sync.Mutex) {
		s1 := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9} // отправляем данные
		for _, v := range s1 {
			addmap(v, v, mp, smux) // функция конкурентной записи данных в map
		}

		wg.Done()
	}(sMap, &smux)

	wg.Wait()

	// Порядок вывода данных не определен
	for _, v := range sMap {
		fmt.Print(fmt.Sprintf("%v\t", v))
	}
}

func writeSyncMap() {
	fmt.Println("\nwriteSyncMap()")

	var wg sync.WaitGroup // определяет группу горутин, которые должны выполняться вместе как одна группа
	var sMap sync.Map     // объявляем map
	wg.Add(1)             // создаем горутины

	go func(sMap *sync.Map) {
		sl := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9} // отправляем данные
		for _, v := range sl {
			sMap.Store(v, v) // функция конкурентной записи данных в map
		}
		wg.Done()
	}(&sMap)

	wg.Wait()

	sMap.Range(func(k, v interface{}) bool {
		fmt.Print(fmt.Sprintf("%v\t", v)) // вывод
		return true                       // if false, Range stops
	})
}
