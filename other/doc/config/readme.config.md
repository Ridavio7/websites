# Конфигурационные файлы для платы DT_ETH_TEST_01

## [Файл network.ethernet.json](network.ethernet.json)

## [Файл network.wifiap.json](network.wifiap.json)

## [Файл network.wifista.json](network.wifista.json)

## [Файл ping.json](ping.json)

**Примечание:**

* Если файл `network.wifiap.json` отсутствует на SPIFFS, то точка доступа будет включаться автоматически с настройками по умолчанию.

  SSID: PING_v1_XXXX
  PASS: 12345678
  IP  : 192.168.4.1 / 24
* Для получения IP динамически в поле ip.mode укажите `dynamic`, если хотите также получать динамический DNS, то в поле `dns[0]` укажите `dynamic` (при этом в поле `dns[1]` можно указать статический DNS серевер)
* При использовани статического IP в поле ip.mode укажите `static`
* Максимальное количество элементов в ping равно 20, остальные будут игнорироваться
