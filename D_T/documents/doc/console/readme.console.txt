******************************************
* Structure of console menu
******************************************
* system
*  |
*  +--- heap
*  |
*  +--- tasks
*  |
*  +--- times
*
******************************************
* rmii
*  |
*  +--- write
*  |     |
*  |     +--- reg
*  |     |
*  |     +--- bit
*  |
*  +--- read
*  |     |
*  |     +--- reg
*  |
*  +--- hwreset
*
******************************************
* leds
*  |
*  +--- write
*        |
*        +--- reg
*        |
*        +--- digits
*
******************************************
* tcp [DISABLED]
*  |
*  +--- server
*  |
*  +--- client
*
******************************************
* raw
*  |
*  +--- send
*
******************************************


******************************************
* MODES:
*  > MODE1: ping fixed range
*  > MODE2: ping not limited range (1..254)
*  > MODE3: multi ping withour change of LCD information
*  > MODE4: multi ping with change of LCD information
******************************************


******************************************
* EXAMPLES
******************************************

******************************************
* EXAMPLES: SYSTEM
******************************************
system heap
system tasks
system times
system reboot

******************************************
* EXAMPLES: HELP
******************************************
help

******************************************
* EXAMPLES: STATUS
******************************************
result status all
result status 0
result status 1
result status 2
result debug all 1
result debug all 0
result debug 2 1
result debug 1 1
result debug 0 1
result debug 0 0
result debug 0

result reset


******************************************
* EXAMPLES: PING
******************************************
ping ya.ru
ping mopkobka.ru
ping 12.12.12.12
ping 192.168.4.2
ping 192.168.100.80
ping 192.168.100.80
ping 192.168.100.254

******************************************
* EXAMPLES: SPIFFS
******************************************
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

******************************************
* EXAMPLES: NET
******************************************
net ethernet ip
net ethernet dns
net ethernet mac
net ethernet dhcps stop
net ethernet dhcps start
net ethernet hostname
net ethernet prio
net ethernet desc


net wifi ip
net wifi dns
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

# net wifi autoreconnect 1
# net wifi autoreconnect 0

