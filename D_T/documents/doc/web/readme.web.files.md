## Чтение файлов из файловой системы (SPIFFS)

Строка запроса:

 `http://<ip>/<file.ext>`

Метод:

`GET`

**Пример:**

* *request:*

`http://192.168.4.1/network.json`

* *response:*

```
{
  "wifi": {
    ...
  }
}
```

## Запись файлов в файловую систему (SPIFFS)

Строка запроса:

 `http://<ip>/api/upload.api/<file.ext>`

Метод:

`POST`

**Пример:**

* *request:*

`http://192.168.4.1/api/upload.api/network.json`

содержимое файла передается в поле данных запроса

* *response:*

```
{
  "wifi": {
    ...
  }
}
```
