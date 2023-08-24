# Сеть

Строка запроса:

`http://<ip>/api/getNet.api?<parameters>`

`<parameters>`:

* info
* scan

Метод:

`GET`

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
  "wifi": {
    "link": 0,
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
