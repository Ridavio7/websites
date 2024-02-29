package main

import (
	"context"
	"fmt"
	"math/rand"
	"time"
)

/*
	Реализовать все возможные способы остановки выполнения горутины
*/

func main() {
	ch1 := make(chan string)
	run := true

	go func(run *bool) {
		for {
			select {
			// 1 способ: дождаться закрытия канала
			case <-ch1:
				fmt.Println("Goroutine 1 done!")
				return
			default:
				fmt.Println("Goroutine 1 working...")
				time.Sleep(100 * time.Millisecond)
			}
		}
	}(&run)

	time.Sleep(150 * time.Millisecond)
	run = false
	time.Sleep(350 * time.Millisecond)
	// остановка горутины по закрытию канала. Через этот же канал можно получать данные из горутины, но
	// в таком случае нужно синхронизировать момент после закрытия канала и работы горутины с каналом:
	// чтобы горутина не писала в закрытый канал (panic)
	close(ch1)

	// завершение работы горутины с каналом
	ch2 := make(chan int)
	go func() {
		for {
			// 2 способ: используем второе возвращаемое каналом значение
			// value - значение из канала, а ok - bool переменная, равная false, если канал закрыт
			value, ok := <-ch2
			if !ok {
				fmt.Println("Goroutine 2 done!")
				return
			}
			fmt.Printf("Goroutine 2 get value %d\n", value)
		}
	}()

	ch2 <- rand.Intn(1000) // посылаем рандомное число
	ch2 <- rand.Intn(1000) // посылаем рандомное число
	ch2 <- rand.Intn(1000) // посылаем рандомное число
	close(ch2)

	time.Sleep(350 * time.Millisecond)

	// 3 способ: канал таймера time.NewTimer
	// у таймера есть канал, и в случае если мы будем использовать мультиплексор select, то мы можем поставить на
	// чтение с этого канала, и как только наступит нужное время, там появится событие, и он сработает

	// пример с бесконечным циклом в горутине
	timer := time.NewTimer(500 * time.Millisecond)
	timeout := time.After(300 * time.Millisecond)
	go func() {
		for {
			select {
			case <-timer.C: // канал таймера
				fmt.Println("Goroutine 3: timer.C timeout happened")
				return
				// 4 способ: time.After
				/*
					After ожидает истечения времени, а затем отправляет текущее время по возвращенному каналу.
					Это эквивалентно NewTimer(d).C. Базовый таймер не восстанавливается сборщиком мусора до тех пор,
					пока таймер не сработает. Если эффективность имеет значение, используйте вместо него NewTimer и
					вызовите Timer.Stop, если таймер больше не нужен.
				*/
			case <-timeout:
				// пока не сработает - не соберется сборщиком мусора
				fmt.Println("Goroutine 3: timer.After timeout happened")
				return
			}
		}
	}()

	time.Sleep(650 * time.Millisecond)

	// пример без бесконечного цикла в горутине
	timer1 := time.NewTimer(300 * time.Millisecond)
	go func() {
		select {
		case <-timer1.C: // канал таймера
			fmt.Println("Goroutine 4: timer.C timeout happened")
			return

		case <-time.After(400 * time.Millisecond): // пока не сработает - не соберется сборщиком мусора
			fmt.Println("Goroutine 4: timer.After timeout happened")
			return

			// 5 способ: канал из отдельной функции
		case result := <-myFunc():
			fmt.Println("Goroutine 4: myFunc() result:", result)
			// освобождает ресурс, если myFunc() выполнится раньше
			if !timer1.Stop() {
				<-timer.C
			}
		}
	}()

	time.Sleep(650 * time.Millisecond)

	// 6 способ: использование пакета context
	// функция создает новый контекст из переданного ей родительского

	intCh := make(chan int, 1)
	ctx, cancel := context.WithCancel(context.Background())

	go func(ctx context.Context) {
		for {
			select {
			case <-ctx.Done(): // если cancel() сработает
				intCh <- 100
				return
			default:
				fmt.Println("Goroutine 5: working...")
			}

			time.Sleep(100 * time.Millisecond)
		}
	}(ctx)

	// работаем 3 секунды и завершаем работу
	go func() {
		time.Sleep(300 * time.Millisecond)
		cancel()
	}()

	// завершаем работу горутин
	<-intCh
	fmt.Println("Goroutine 5 done!")
}

func myFunc() chan int {
	// созаем буферизированный канал, чтобы положить в буфер значение и вернуться в основную горутину
	// иначе если использовать небуферизированный канал, то он примет значение, которое никто не читает (panic)
	out := make(chan int, 1)
	time.Sleep(150 * time.Millisecond)
	out <- rand.Intn(1000) // посылаем рандомное число
	return out
}
