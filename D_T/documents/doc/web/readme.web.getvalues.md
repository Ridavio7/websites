# Чтение значение внутренних переменных (общее)

Строка запроса:

`http://<ip>/api/<apiName.api>?<parameters>`

Метод:

`GET`

**Пример:**

* *request:*

`http://192.168.4.1/api/getValues.api`

* *response:*

```
{
  "status": 0
}
```

status = 0 все хорошо, другое число код ошибки

## [Чтение значений платы](readme.web.getvalues.current.md)
