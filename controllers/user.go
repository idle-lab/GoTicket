package controllers

import (
	"fmt"
	"regexp"
	"time"

	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/models"
	"github.com/2418071565/GoTicket/pkg/logger"
	"github.com/gin-gonic/gin"
)

func GetInfo(ctx *gin.Context) {

}

func Login(ctx *gin.Context) {
	phone := ctx.Query("phone")
	if ok, err := regexp.MatchString(`^\d+$`, phone); !ok || err != nil {
		ReturnError(ctx, -1, "invalid phone number")
		return
	}
	password := ctx.Query("password")
	user, err := models.GetUserByPhone(phone)
	if err != nil {
		ReturnError(ctx, -1, fmt.Sprintf("login failed with err: %s", err))
		return
	}
	if user.Password != password {
		ReturnError(ctx, -1, "phone or password is incorrect")
		return
	}
	ReturnSuccess(ctx, 0, "OK", *user, 1)
}

func Register(ctx *gin.Context) {
	name := ctx.PostForm("name")
	if len(name) > 20 {
		ReturnError(ctx, -1, "name cannot exceed 20 characters")
		return
	}
	sex := ctx.PostForm("sex")
	if sex != "Male" && sex != "Female" {
		ReturnError(ctx, -1, "invalid sex")
		return
	}
	password := ctx.PostForm("password")
	if len(password) > 20 {
		ReturnError(ctx, -1, "name cannot exceed 20 characters")
		return
	}
	phone := ctx.PostForm("phone")
	if ok, err := regexp.MatchString(`^\d+$`, phone); !ok || err != nil {
		ReturnError(ctx, -1, "invalid phone number")
		return
	}
	id_number := ctx.PostForm("id_number")
	if ok, err := regexp.MatchString(`^\d{15}$|^\d{17}(\d|X|x)$`, id_number); !ok || err != nil {
		ReturnError(ctx, -1, "invalid id_number")
		return
	}

	id, err := models.AddUser(&dto.User{
		Name:        name,
		Sex:         sex,
		Password:    password,
		Phone:       phone,
		Create_date: time.Now(),
		Id_number:   id_number,
	})
	if err != nil {
		logger.Errorf("add user failed with err: %s", err)
		ReturnError(ctx, -1, fmt.Sprintf("add user failed with err: %s", err))
		return
	}
	ReturnSuccess(ctx, 0, "OK", map[string]interface{}{"id": id}, 1)
}
