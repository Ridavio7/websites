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
*  +--- wifi
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
*        |     |
*        |     +--- start
*        |     |
*        |     +--- stop
*        |
*        +---- scan
*        |     |
*        |     +--- active
*        |     |
*        |     +--- passive
*        |
*        +--- connect
*        |
*        +--- disconnect
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


net wifi ip
net wifi dns
net wifi setdns
net wifi mac
net wifi dhcps stop
net wifi dhcps start
net wifi dhcpc start
net wifi dhcpc stop
net wifi hostname
net wifi prio
net wifi desc

net wifi scan
net wifi scan active
net wifi scan passive
net wifi connect
net wifi disconnect
```
