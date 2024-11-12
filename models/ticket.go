package models

import "time"

/*
Ticket 车票信息

- StartStation：起始站点名

- EndStation：终点站点名

- DepartureTime： 出发时间

- ArrivalTime： 到达时间

- Carriage：座位所在车厢

- Row：座位所在行

- Seat：座位所在列（'A','B','C','E','F'）

- Status：车票状态

- Order：该票的订单

- UserID: 车票所属用户
*/
type Ticket struct {
	ID             uint32    `gorm:"type:int unsigned;auto_increment;"`
	Start_station  string    `gorm:"type:varchar(32);not null"`
	End_station    string    `gorm:"type:varchar(32);not null"`
	Departure_time time.Time `gorm:"not null"`
	Arrival_time   time.Time `gorm:"not null"`
	Carriage       uint8     `gorm:"type:tinyint unsigned;not null"`
	Row            uint8     `gorm:"type:tinyint unsigned;not null"`
	Seat           uint8     `gorm:"type:tinyint unsigned;not null"`
	Status         string    `gorm:"type:enum('Used', 'Unused', 'Refunded');not null"`
	Order          Order     `gorm:"foreignKey:TicketID"`
	User_ID        uint32    `grom:"not null"`
}
