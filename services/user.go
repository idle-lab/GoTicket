package services

import (
	"fmt"
	"regexp"
	"time"

	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/pkg/jwt"
	"github.com/2418071565/GoTicket/pkg/logger"
	"github.com/gin-gonic/gin"
)

// 从请求体中获取用户信息
func GetUserInfoFromPostBody(ctx *gin.Context) (*dto.User, error) {
	name := ctx.PostForm("name")
	if len(name) > 20 {
		logger.Infof("name cannot exceed 20 characters")
		return nil, fmt.Errorf("name cannot exceed 20 characters")
	}
	sex := ctx.PostForm("sex")
	if sex != "Male" && sex != "Female" {
		logger.Infof("invalid sex: %s", sex)
		return nil, fmt.Errorf("invalid sex: %s", sex)
	}
	password := ctx.PostForm("password")
	if len(password) > 20 {
		logger.Infof("password cannot exceed 20 characters")
		return nil, fmt.Errorf("password cannot exceed 20 characters")
	}
	phone := ctx.PostForm("phone")
	if ok, err := regexp.MatchString(`^\d+$`, phone); !ok || err != nil {
		logger.Infof("invalid phone number: %s", phone)
		return nil, fmt.Errorf("invalid phone number: %s", phone)
	}
	id_number := ctx.PostForm("id_number")
	if ok, err := regexp.MatchString(`^\d{15}$|^\d{17}(\d|X|x)$`, id_number); !ok || err != nil {
		logger.Infof("invalid id_number: %s", id_number)
		return nil, fmt.Errorf("invalid id_number: %s", id_number)
	}

	return &dto.User{
		Name:        name,
		Sex:         sex,
		Password:    password,
		Phone:       phone,
		Create_date: time.Now(),
		Id_number:   id_number,
	}, nil
}

func GenerateToken(ctx *gin.Context, id uint32, is_admin bool) error {
	token, err := jwt.GenerateToken(id, is_admin)
	if err != nil {
		logger.Errorf("generate token failed with err: %s", err)
		return fmt.Errorf("generate token failed with err: %s", err)
	}
	ctx.Header("Authorization", token)
	return nil
}
