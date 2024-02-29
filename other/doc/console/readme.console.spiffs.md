# Подменю spiffs

## Структура

```
******************************************
* spiffs
*  |
*  +--- list
*  |
*  +--- copy
*  |
*  +--- delete
*  |
*  +--- cat
*
******************************************
```

## Примеры

```
spiffs list
spiffs copy /spiffs/default.json /spiffs/network.json
spiffs delete /spiffs/todevice.json
spiffs delete /spiffs/upload.json
spiffs cat /spiffs/test.json
spiffs cat /spiffs/ping.json
spiffs cat /spiffs/device.json
spiffs cat /spiffs/todevice.json
spiffs cat /spiffs/upload.json
spiffs cat /spiffs/network.json
spiffs cat /spiffs/zzz2.txt
spiffs cat /spiffs/js/update.js
```
