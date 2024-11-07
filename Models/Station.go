package models

/*
Station 站点信息

- Name： 站名

- Routes： 经过该站的路线

- Postion： 位置描述，可空
*/
type Station struct {
	ID      uint16  `gorm:"type:smallint unsigned;autoIncrement"`
	Name    string  `gorm:"type:varchar(32);index:station_index;not null"`
	Routes  []Route `gorm:"many2many:route_station"`
	Postion string
}
