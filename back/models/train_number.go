package models

import "time"

/*
TrainNumber 车次信息

- Status：车次状态

- AvailableSeats：剩余的座位数

- StartTime：列车开始时间

- TrainID：外键，该车次的列车

- RouteID：外键，改车次走的路线
*/
type TrainNumber struct {
	ID              uint32    `gorm:"type:int unsigned;auto_increment"`
	Status          string    `gorm:"enum('Online','Offline');not null"`
	Available_seats uint16    `gorm:"type:smallint unsigned;not null"`
	Start_time      time.Time `gorm:"not null"`
	Train_ID        uint16    `gorm:"type:smallint unsigned;not null"`
	Route_ID        uint16    `gorm:"type:smallint unsigned;not null"`
}
