# Перезагрузка платы

## Строка запроса:

`http://<ip>/api/setValues.api?id=cmd.reboot&value=1`

Метод:

`GET`

**Пример:**

* *request:*

`http://192.168.4.1/api/setValues.api?setValues.api?id=cmd.reboot&value=1`

* *response:*

```
{
  "status": 0
}
```

status = 0 все хорошо, другое число код ошибки

Примечание: Перезашрузка произойдет только по значению поля value = 1
