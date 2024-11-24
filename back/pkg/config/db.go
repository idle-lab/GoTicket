package config

import "time"

// 数据库各种参数的默认值
var (
	DB_HOST               string        = "127.0.0.1"
	DB_PORT               string        = "3306"
	DB_DATABASE           string        = "goticket"
	DB_USERNAME           string        = "goticket"
	DB_PASSWORD           string        = "goticket"
	DB_MAX_OPEN_CONNS     int           = 100
	DB_MAX_IDLE_CONNS     int           = 10
	DB_CONN_MAX_LIFE_TIME time.Duration = time.Hour
	DB_CONN_MAX_IDLE_TIME time.Duration = time.Hour
)
