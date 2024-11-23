package models

import (
	"time"

	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/storage/db"
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
	ID          uint32    `gorm:"primaryKey;type:int unsigned"`
	Name        string    `gorm:"type:char(20);index:name_index;not null"`
	Sex         string    `gorm:"type:enum('Male','Famale');not null"`
	Password    string    `gorm:"type:varchar(20);not null"`
	Phone       string    `gorm:"type:char(15);not null"`
	Create_Date time.Time `gorm:"type:datetime;not null"`
	Id_number   string    `gorm:"type:char(18);not null"`
	Orders      []Order   `gorm:"foreignKey:UserID"`
	Tickers     []Ticket  `gorm:"foreignKey:UserID"`
}

func GetUserByPhone(phone string) (*dto.User, error) {
	user := &User{Phone: phone}
	if err := db.DB.First(user).Error; err != nil {
		return nil, err
	}
	return &dto.User{
		ID:          user.ID,
		Name:        user.Name,
		Sex:         user.Sex,
		Password:    user.Password,
		Phone:       user.Phone,
		Create_date: user.Create_Date,
		Id_number:   user.Id_number,
	}, nil
}

func GetUser(id uint32) (*dto.User, error) {
	user := &User{ID: id}
	if err := db.DB.First(user).Error; err != nil {
		return nil, err
	}
	return &dto.User{
		ID:          user.ID,
		Name:        user.Name,
		Sex:         user.Sex,
		Password:    user.Password,
		Phone:       user.Phone,
		Create_date: user.Create_Date,
		Id_number:   user.Id_number,
	}, nil
}

func AddUser(user *dto.User) (uint32, error) {
	m_user := User{
		ID:          user.ID,
		Name:        user.Name,
		Sex:         user.Sex,
		Password:    user.Password,
		Phone:       user.Phone,
		Create_Date: user.Create_date,
		Id_number:   user.Id_number,
	}
	err := db.DB.Create(&m_user).Error
	return m_user.ID, err
}
