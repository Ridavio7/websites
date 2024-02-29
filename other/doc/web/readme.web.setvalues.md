# Установка значение внутренних переменных (общее)

Строка запроса:

`http://<ip>/api/setValues.api?id=<id>&value=<value>`

Метод:

`GET`

**Пример:**

* *request:*

`http://192.168.4.1/api/setValues.api?id=outputs.p1&value=1`

* *response:*

```
{
  "status": 0
}
```

status = 0 все хорошо, другое число код ошибки

## [Установка значений платы](readme.web.setvalues.current.md)
