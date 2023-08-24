# Подменю result

## Структура

```
******************************************
* result
*  |
*  +--- status
*  |
*  +--- debug
*  |     |
*  |     +--- all
*  |     |
*  |     +--- <n>
*  |
*  +--- reset
*
******************************************
```

## Примеры

```
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
```
