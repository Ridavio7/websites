# Web интерфейс (API) для платы DT_ATS_01

**Примечание:**

* `DEBUG `- все разделы данного документа с пометкой DEBUG доступны только на этапе разработки ПО (нужны для отладки, в последствие будут удалены)
* `<ip>`- вместо `<ip>` укажите IP платы (Ethernet/Wifi)

## Чтение файлов в файловую систему (SPIFFS)

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

## Обновление прошивки (firmware) и файловой системы (SPIFFS)

Строка запроса:

 `http://<ip>/api/update.api`

Метод:

`POST`

**Пример:**

* *request:*

`http://192.168.4.1/api/update.api`

прошивка или образ файловой системы передаются в поле данных запроса, перед данными файла необходимо добавить 25 байт, бинарный заголовок описывающий передаваемые данные:

0..19	- имя файла (строка заканчивающаяся '\0')

20		- тип 0xAA - прошивка, 0xBB - образ файловой системы

21..24	- исходный размер файла (без добавления заголовка 25 байт)


* *response:*

```

```



/api/update.api

## Установка значение внутренних переменных

Строка запроса:

`http://<ip>/api/setValues.api?id=<id>&value=<value>`

Метод:

`POST`

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

### Power relay control (DEBUG)

id: `outputs.p1 ... outputs.p8`  - соответствует реле ламп 1 .. 8

value: `0/1`

**Пример:**

* *request:*

`http://192.168.4.1/api/setValues.api?id=outputs.p2&value=0`

### Lamp relay control (DEBUG)

id: `outputs.l1 ... outputs.l8`  - соответствует силовым реле 1 .. 8

value: `0/1`

**Пример:**

* *request:*

`http://192.168.4.1/api/setValues.api?id=outputs.l4&value=1`

## SPI GOWIN HEX (DEBUG):

Строка запроса:

`http://<ip>/api/getHex.api`

Метод:

`GET`

**Пример:**

* *request:*

`http://192.168.4.1/api/getHex.api`

* *response:*

```
HEX data:

 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00
 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00
 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00
 ...
 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00
```

## SPI GOWIN DATA (DEBUG):

Строка запроса:

`http://192.168.4.1/api/getData.api`

Метод:

**Пример:**

* *request:*

`http://192.168.4.1/api/getData.api`

* *response:*

```
{
  "Count": 785677,
  "OK": 30215,
  "END": 28653,
  "ERR_OVL": 2,
  "ERR_SIZE": 0,
  "ERR_START": 2,
  "ERR_ORDER": 1,
  "Samples": [
    "2877 0200 0300 0400 0500 0600 0700 0800 0900 0A00 0B00 0C00 0D00 0E00 0F00 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 ",
    "2777 0200 0300 0400 0500 0600 0700 0800 0900 0A00 0B00 0C00 0D00 0E00 0F00 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 ",
    "2677 0200 0300 0400 0500 0600 0700 0800 0900 0A00 0B00 0C00 0D00 0E00 0F00 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 "
  ],
  "Dump": "0700 0800 0900 0A00 0B00 0C00 0D00 0E00 0F00 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 0080 0280 2677 0200 0300 0400 0500 0600 0700 0800 0900 0A00 0B00 0C00 0D00 0E00 0F00 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 0080 0280 2777 0200 0300 0400 0500 0600 0700 0800 0900 0A00 0B00 0C00 0D00 0E00 0F00 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 0080 0280 2877 0200 0300 0400 0500 0600 0700 0800 0900 0A00 0B00 0C00 0D00 0E00 0F00 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 0080 0280 2977 0200 0300 0400 0500 0600 0700 0800 0900 0A00 0B00 0C00 0D00 0E00 0F00 1000 1100 1200 "
}
```