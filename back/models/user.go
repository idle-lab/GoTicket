package models

import (
	"time"

	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/pkg/config"
	"github.com/2418071565/GoTicket/pkg/logger"
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
	Sex         string    `gorm:"type:enum('Male','Female');not null"`
	Password    string    `gorm:"type:varchar(20);not null"`
	Phone       string    `gorm:"type:char(15);not null"`
	Create_date time.Time `gorm:"type:datetime;not null"`
	Id_number   string    `gorm:"type:char(18);not null"`
	Orders      []Order   `gorm:"foreignKey:user_id"`
	Tickers     []Ticket  `gorm:"foreignKey:user_id"`
	Admin       Admin     `gorm:"foreignKey:ID"`
}

type Admin struct {
	ID uint32 `gorm:"type:int unsigned"`
}

func init() {
	var cnt int64
	if err := db.DB.Table("users").Where("phone = ?", "goticket").Count(&cnt).Error; err != nil {
		logger.Errorf("init admin `goticket` failed with err: %s", err)
	}
	if cnt == 0 {
		default_admin := &User{
			Name:        "goticket",
			Sex:         "Male",
			Password:    config.DEFAULT_ADMIN_PASSWORD,
			Phone:       config.DEFAULT_ADMIN,
			Create_date: time.Now(),
			Id_number:   "",
		}
		db.DB.Create(default_admin)
		db.DB.Create(&Admin{ID: default_admin.ID})
	}
}

// 通过手机号判断用户是否存在
func IsUserExists(phone string) (bool, error) {
	var cnt int64
	if err := db.DB.Table("users").Select("id").Where("phone = ?", phone).Count(&cnt).Error; err != nil {
		return false, err
	}
	if cnt == 0 {
		return false, nil
	}
	return true, nil
}

func GetUserByPhone(phone string) (*dto.User, error) {
	user := &dto.User{}
	if err := db.DB.Table("users").
		Select("users.id, users.name, users.sex, users.password, users.phone, users.create_date, users.id_number, admins.id IS NOT NULL AS is_admin").
		Joins("LEFT JOIN admins ON users.id = admins.id").
		Where("users.phone = ?", phone).
		Scan(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func GetUserById(id uint32) (*dto.User, error) {
	user := &dto.User{}
	if err := db.DB.Table("users").
		Select("users.id, users.name, users.sex, users.password, users.phone, users.create_date, users.id_number, admins.id IS NOT NULL AS is_admin").
		Joins("LEFT JOIN admins ON users.id = admins.id").
		Where("users.id = ?", id).
		Scan(&user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func AddUser(user *dto.User) (uint32, error) {
	new_user := User{
		ID:          user.ID,
		Name:        user.Name,
		Sex:         user.Sex,
		Password:    user.Password,
		Phone:       user.Phone,
		Create_date: user.Create_date,
		Id_number:   user.Id_number,
	}
	err := db.DB.Create(&new_user).Error
	return new_user.ID, err
}

func AddAdmin(user *dto.User) error {
	admin := &Admin{ID: user.ID}
	err := db.DB.Create(admin).Error
	return err
}
