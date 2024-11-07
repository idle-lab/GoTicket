package models

/*
Train 列车信息

- TrainType：列车类型（高铁、动车和绿皮）

- MaxCapacity：列车最大载客量

- Seats：列车座位表，[车厢][行][列]

- AvgSpeed：列车平均速度，用于预测到站时间

- TrainNumbers：该列车所有的车次
*/
type Train struct {
	ID           uint16        `gorm:"type:smallint unsigned;autoIncrement"`
	TrainType    string        `gorm:"type:enum('G','D','K');not null"`
	MaxCapacity  uint16        `gorm:"type:smallint unsigned;not null"`
	Seats        [][][]int     `gorm:"type:json;not null"`
	AvgSpeed     float32       `gorm:"not null"`
	TrainNumbers []TrainNumber `gorm:"foreignKey:TrainID"`
}
