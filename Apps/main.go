package main

import (
	"fmt"
)

func main() {
	//*ch := make(chan int)

	/*wg := &sync.WaitGroup{}
	wg.Add(3)
	for i := 0; i < 3; i++ {
		go func(idx int, wG *sync.WaitGroup) {
			ch <- (idx + 1) * 2
			wg.Done()
		}(i, wg)
	}
	fmt.Printf("result: %d\n", <-ch)
	wg.Wait()

	/*a := []string{"a", "b", "c"}
	b := a[1:2]
	b[0] = "q"
	fmt.Println(a)*/

	/*ch := make(chan string)
	go func() {
		for m := range ch {
			fmt.Printf("proc: %s\n", m)

		}
	}()
	ch <- "cmd.1"
	ch <- "cmd.2"*/
	var num int
	for i := 0; i < 1000; i++ {
		go func() {
			num = 1
		}()
	}
	fmt.Printf("%d", num)
}
