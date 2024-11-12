package models

import (
	"time"

	"github.com/2418071565/GoTicket/db"
)

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
	ID           uint32    `gorm:"primaryKey;type:int unsigned"`
	Name         string    `gorm:"type:char(20);index:name_index;not null"`
	Sex          string    `gorm:"type:enum('Male','Famale');not null"`
	Password     string    `gorm:"type:varchar(20);not null"`
	Phone_number string    `gorm:"type:char(15);not null"`
	Create_Date  time.Time `gorm:"type:datetime;not null"`
	ID_number    string    `gorm:"type:char(18);not null"`
	Orders       []Order   `gorm:"foreignKey:UserID"`
	Tickers      []Ticket  `gorm:"foreignKey:UserID"`
}

func GetUser(id uint32) (User, error) {
	user := User{ID: id}
	err := db.DB.First(&user).Error
	return user, err
}

func AddUser(user *User) (uint32, error) {
	err := db.DB.Create(user).Error
	return user.ID, err
}
