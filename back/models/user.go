package models

import (
	"time"

	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/pkg/config"
	"github.com/2418071565/GoTicket/pkg/logger"
	"github.com/2418071565/GoTicket/storage/db"
)

type User struct{}

type Admin struct{}

func init() {
	var cnt int64
	if err := db.DB.Table("users").Where("phone = ?", "goticket").Count(&cnt).Error; err != nil {
		logger.Errorf("init admin `goticket` failed with err: %s", err)
	}
	if cnt == 0 {
		default_admin := &dto.User{
			Name:        "goticket",
			Sex:         "Male",
			Password:    config.DEFAULT_ADMIN_PASSWORD,
			Phone:       config.DEFAULT_ADMIN,
			Create_date: time.Now(),
			Id_number:   "",
			Role:        "admin",
		}
		db.DB.Table("users").Create(default_admin)
	}
}

// 通过手机号判断用户是否存在
func (User) IsUserExists(phone string) (bool, error) {
	var cnt int64 = 0
	if err := db.DB.Table("users").Select("id").Where("phone = ?", phone).Count(&cnt).Error; err != nil {
		return false, err
	}
	if cnt == 0 {
		return false, nil
	}
	return true, nil
}

func (User) GetUserByPhone(phone string) (*dto.User, error) {
	user := &dto.User{}
	if err := db.DB.Table("users").
		Where("phone = ?", phone).
		Scan(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func (User) GetUserById(id uint32) (*dto.User, error) {
	user := &dto.User{}
	if err := db.DB.Table("users").
		Where("id = ?", id).
		Scan(&user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func (User) AddUser(user *dto.User) error {
	user.Role = "user"
	return db.DB.Create(&user).Error
}

func (User) GhangeUserInfo(user *dto.User) error {
	return db.DB.Table("users").Where("id = ?", user.ID).Update(user).Error
}

func (Admin) AddAdmin(admin *dto.User) error {
	admin.Role = "Admin"
	return db.DB.Table("users").Create(admin).Error
}

func (Admin) ChangeToAdmin(user *dto.User) error {
	return db.DB.Table("users").Where("id = ?", user.ID).Update("role", "admin").Error
}
