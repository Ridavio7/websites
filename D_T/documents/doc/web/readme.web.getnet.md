# Сеть

Строка запроса:

`http://<ip>/api/getNet.api?<parameters>`

`<parameters>`:

* info
* scan
* ethernet
* wifiap
* wifista

Метод:

`GET`

**Примечане:**
`"link"` - имеет разныйсмысл для Ethernet, WifiAP, WifiSTA:

| Интрефейс | Значение                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| Ethernet           | Наличие/отсутствие Link на интерфейсе Ethernet                     |
| WifiAP             | Количество подключенных WiFi клиентов (STA)                       |
| WifiSTA            | Наличие/отсутствие подключения к беспроводной сети |

**Пример 1:**

*request:*

`http://192.168.4.1/api/getNet.api?info`

* *response:*

```
{
  "ethernet": {
    "link": 0,
    "mac": "08:b6:1f:ee:9d:23",
    "ip": "0.0.0.0",
    "mask": "0.0.0.0",
    "gw": "0.0.0.0",
    "hostname": "espressif",
    "dns": [
      "192.168.100.254",
      "192.168.20.3"
    ]
  },
  "wifiap": {
    "link": 0,
    "ssid": "PING_v1",
    "mac": "08:b6:1f:ee:9d:21",
    "ip": "192.168.4.1",
    "mask": "255.255.255.0",
    "gw": "192.168.4.254",
    "hostname": "espressif",
    "dns": [
      "192.168.4.2",
      "192.168.4.2"
    ]
  },
  "wifista": {
    "link": 1,
    "ssid": "MGTS_GPON_7977",
    "mac": "08:b6:1f:ee:9d:20",
    "ip": "192.168.100.61",
    "mask": "255.255.255.0",
    "gw": "192.168.100.254",
    "hostname": "espressif",
    "dns": [
      "192.168.100.254",
      "192.168.20.3"
    ]
  }
}
```

**Пример 2:**

* *request:*

`http://192.168.4.1/api/getNet.api?ethernet`

* *response:*

```
{
  "ethernet": {
    "link": 0,
    "mac": "08:b6:1f:ee:9d:23",
    "ip": "0.0.0.0",
    "mask": "0.0.0.0",
    "gw": "0.0.0.0",
    "hostname": "espressif",
    "dns": [
      "192.168.100.254",
      "192.168.20.3"
    ]
  }
}
```

**Примечание:**

Данные запросы работают аналогично:

`http://192.168.4.1/api/getNet.api?ethernet`

`http://192.168.4.1/api/getNet.api?wifiap`

`http://192.168.4.1/api/getNet.api?wifista`

**Пример 3:**

* *request:*

`http://192.168.4.1/api/getNet.api?scan`

* *response:*

```
{
  "networks": [
    {
      "BSSID": "74:DA:88:C7:FC:3D",
      "SSID": "TP-Link_Extender",
      "channel": [
        6,
        0
      ],
      "rssi": -52,
      "authmode": 4,
      "phy_11b": 1,
      "phy_11g": 1,
      "phy_11n": 1,
      "wps": 0
    },
    {
      "BSSID": "C0:4A:00:F7:81:DC",
      "SSID": "MGTS_GPON_0483",
      "channel": [
        1,
        0
      ],
      "rssi": -59,
      "authmode": 4,
      "phy_11b": 1,
      "phy_11g": 1,
      "phy_11n": 1,
      "wps": 1
    }
  ]
}
```

Примечание:

* в случае ошибки возвращается:

```
{
  "status": <number>
}
```

* **ВАЖНО**: сканирование сетей занимает некоторое время (scan), во время сканирования сетей wifi не доступен
