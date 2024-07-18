# Конфигурационные файлы

**Примечание:**

* Конфигурационные фалйы хранятся в корне SPIFFS
* SPIFFS - файловая система в формате FAT находящаяся в одном из разделов Flash памяти подключенной к МК ESP32

## network.json

Содержимое:

```
{
  "wifi": {
    "mode": "ap",
    "wifi_auth": {
      "ssid": "ATS_v1",
      "pass": "mypassword",
      "ssid_mac": 1
    },
    "ip": {
      "mode": "static",
      "ip": "192.168.4.1",
      "mask": "255.255.255.0",
      "gateway": "192.168.4.254"
    },
    "dns": [
      "192.168.4.2",
      "192.168.4.3"
    ],
    "hidden": 0,
    "channel": 2,
    "maxconnection": 4,
    "dhcps": {
      "enable": 1,
      "startip": "192.168.4.30",
      "endip": "192.168.4.50"
    }
  },
  "ethernet": {
    "ip": {
      "mode": "dynamic",
      "ip": "192.168.10.30",
      "mask": "255.255.240.0"
    },
    "dhcps": {
      "enable": 1,
      "startip": "192.168.10.40",
      "endip": "192.168.10.50"
    }
  }
}
```
