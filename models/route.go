package models

import "github.com/shopspring/decimal"

/*
Route 铁路路线信息

- TrainNumbers：走这条路线的车次

- Stations：这条路线经过的站点

- Distance：每两个站点间的距离

- PricePK：每公里的价格
*/
type Route struct {
	ID            uint16          `gorm:"type:smallint unsigned;auto_increment"`
	Train_numbers []TrainNumber   `gorm:"foreignKey:RouteID"`
	Stations      []Station       `gorm:"many2many:route_station"`
	Distance      []float32       `gorm:"type:json"`
	PricePK       decimal.Decimal `gorm:"type:decimal(10,2);not null"`
}
