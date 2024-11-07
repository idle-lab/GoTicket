package models

import "time"

/*
User 用户信息

- Name：用户名字

- Sex：性别

- Password：密码

- PhoneNumber：电话号

- CreateDate：创建日期

- IDNumber：身份证号

- Orders：用户所有的订单

- Tickers：用户所有的车票
*/
type User struct {
	ID          uint32    `gorm:"type:int unsigned;autoIncrement"`
	Name        string    `gorm:"type:char(20);index:name_index;not null"`
	Sex         string    `gorm:"type:enum('Male','Famale');not null"`
	Password    string    `gorm:"type:varchar(20);not null"`
	PhoneNumber string    `gorm:"type:char(15);not null"`
	CreateDate  time.Time `gorm:"not null"`
	IDNumber    string    `gorm:"type:char(18);not null"`
	Orders      []Order   `gorm:"foreignKey:UserID"`
	Tickers     []Ticket  `gorm:"foreignKey:UserID"`
}
