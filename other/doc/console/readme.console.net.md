# Подменю net

## Структура

```
******************************************
* net
*  |
*  +--- ethternet
*  |     |
*  |     +--- ip
*  |     |
*  |     +--- dns
*  |     |
*  |     +--- mac
*  |     |
*  |     +--- hostname
*  |     |
*  |     +--- prio
*  |     |
*  |     +--- desc
*  |     |
*  |     +--- dhcpc
*  |     |     |
*  |     |     +--- start
*  |     |     |
*  |     |     +--- stop
*  |     |
*  |     +--- dhcps
*  |           |
*  |           +--- start
*  |           |
*  |           +--- stop
*  |
*  +--- wifista
*  |     |
*  |     +--- ip
*  |     |
*  |     +--- dns
*  |     |
*  |     +--- mac
*  |     |
*  |     +--- hostname
*  |     |
*  |     +--- prio
*  |     |
*  |     +--- desc
*  |     |
*  |     +--- dhcpc
*  |     |     |
*  |     |     +--- start
*  |     |     |
*  |     |     +--- stop
*  |     |
*  |     +--- dhcps
*  |     |     |
*  |     |     +--- start
*  |     |     |
*  |     |     +--- stop
*  |     |
*  |     +---- scan
*  |     |     |
*  |     |     +--- active
*  |     |     |
*  |     |     +--- passive
*  |     |
*  |     +--- connect
*  |     |
*  |     +--- disconnect
*  |
*  +--- wifiap
*        |
*        +--- ip
*        |
*        +--- dns
*        |
*        +--- mac
*        |
*        +--- hostname
*        |
*        +--- prio
*        |
*        +--- desc
*        |
*        +--- dhcpc
*        |     |
*        |     +--- start
*        |     |
*        |     +--- stop
*        |
*        +--- dhcps
*              |
*              +--- start
*              |
*              +--- stop
*         
*
******************************************
```

## Примеры

```
net ethernet ip
net ethernet dns
net ethernet setdns
net ethernet mac
net ethernet dhcps stop
net ethernet dhcps start
net ethernet hostname
net ethernet prio
net ethernet desc


net wifiap ip
net wifiap dns
net wifiap setdns
net wifiap mac
net wifiap dhcps stop
net wifiap dhcps start
net wifiap dhcpc start
net wifiap dhcpc stop
net wifiap hostname
net wifiap prio
net wifiap desc

net wifiap list

net wifista ip
net wifista dns
net wifista setdns
net wifista mac
net wifista dhcps stop
net wifista dhcps start
net wifista dhcpc start
net wifista dhcpc stop
net wifista hostname
net wifista prio
net wifista desc

net wifista scan
net wifista scan channel 6
net wifista scan ssid MGTS_GPON_7977
net wifista scan active
net wifista scan passive
net wifista connect
net wifista disconnect
```
