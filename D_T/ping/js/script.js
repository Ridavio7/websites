        // функция нахождения одного элемента с указанным селектором
        const findOne = (element, selector) => element.querySelector(selector)
        // функция нахождения всех элементов с указанным селектором
        const findAll = (element, selector) => element.querySelectorAll(selector)
        // функция добавления обработчика указанного события
        const addHandler = (element, event, callback) => element.addEventListener(event, callback)

        const findParent = (element, depth = 1) => {
            let parentEl = element.parentElement

            while (depth > 1) {
                parentEl = findParent(parentEl)
                depth--
            }
            return parentEl
        }

        // Находим основной контейнер и контейнер для вопросов, а также отключаем отправку формы:
        const C = findOne(document.body, ".container");
        const Q = findOne(C, "#pings-box");

        addHandler(Q, "submit", (ev) => ev.preventDefault());

        // Функция инициализации кнопок для удаления вопроса:
        const initRemovePingBtn = q => {
            const removePingBtn = findOne(q, '.remove-ping-btn')

            addHandler(removePingBtn, 'click', ev => {
                findParent(ev.target, 2).remove()
            }, {
                once: true
            })
        }

        const initBtns = (q) => {
          initRemovePingBtn(q);
        };

        //Функция добавления вопроса:
        const addPingBtn = findOne(C, '#add-ping-btn')

        addHandler(addPingBtn, 'click', ev => {
          // с помощью IIFE и async..await получаем данные посредством динамического импорта
          // помещаем их в контейнер для вопросов
          // находим добавленный вопрос
          // и инициализируем кнопки этого вопроса и все заголовки
            (async () => {
                const data = await import('../js/Ping.js')
                const template = await data.default()
                await Q.insertAdjacentHTML('beforeend', template)

                const ping = findOne(Q, '.ping-box:last-child')
                initBtns(ping)
                initTitles()
            })()
        })

        //Функция создания теста:
        addHandler(findOne(C, "#create-json-btn"), "click", () => createTest());

        const createTest = () => {
          // создаем пустой объект
          const ping = [];
          const obj = {ping};
          // находим все вопросы
          const pings = Array.from(findAll(Q, ".ping-box"));
          // валидации формы
          // поля не должы быть пустыми
          const isEmpty = (...args) => {
            // для каждого переданного аргумента
            args.map((arg) => {
              // заменяем два и более пробела на один
              // и удаляем пробелы в начале и конце строки
              arg = arg.replace(/\s+/g, "").trim();
              // если значением аргумента является пустая строка
              if (arg === "") {
                alert("Внимание! Не все поля заполнены!");
                throw new Error();
              }
            });
          };
          // для каждого вопроса
          pings.forEach((q) => {
            const hostText = findOne(q, ".host-text").value;
            const timeoutText = findOne(q, ".timeout-text").value;
            const periodText = findOne(q, ".period-text").value;

            //findAll(q, '.host-text', '.timeout-text', '.period-text').forEach(text => arr.push(text.value))
            // валидируем форму
            isEmpty(hostText, timeoutText, periodText);
            // помещаем значения в объект с ключом "индекс вопроса"
            ping[pings.indexOf(q)] = {
              host: hostText,
              timeout: timeoutText,
              period: periodText
            };
          });

          //TODO: GLEBOV:START
          var filePath = PATH_FOR_UPLOAD + UPLOAD_JSON_FILENAME;
          var file = new File([JSON.stringify(obj, null, 4)], UPLOAD_JSON_FILENAME, {
            type: "text/plain",
          });

          console.table(JSON.stringify(obj, null, 4));

          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4) {
              if (xhttp.status == 200) {
                //console.log(xhttp.responseText);
              } else if (xhttp.status == 0) {
                showModalRedBorder(ServerDiconn);					
              } else {
                showModalRedBorder("<p>xhttp.status: "+xhttp.status+"</p>"+"<p><b>ERROR: </b>" + xhttp.responseText + "<br></p><br>" + CloseBtn);
              }
              
            };
          }
          xhttp.open("POST", filePath, true);
          xhttp.send(file);

          // создаем файл
          const data = new Blob([JSON.stringify(obj, null, 4)], {
            type: "application/json"
          });
          //TODO: GLEBOV:END
        };