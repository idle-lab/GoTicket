package controllers

import (
	"fmt"
	"strconv"
	"time"

	"github.com/2418071565/GoTicket/models"
	"github.com/2418071565/GoTicket/pkg/logger"
	"github.com/gin-gonic/gin"
)

type User struct {
	ID           uint32
	Name         string
	Sex          string
	Password     string
	Phone_number string
	Create_date  time.Time
	ID_number    string
}

func (u User) GetUser(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ReturnError(ctx, -1, fmt.Sprintf("user id is not a int, which is %s", err))
		ctx.Abort()
		return
	}
	user, err := models.GetUser(uint32(id))
	if err != nil {
		ReturnError(ctx, -1, fmt.Sprintf("error with %s", err))
		ctx.Abort()
		return
	}
	ReturnSuccess(ctx, 0, "OK", user, 1)
}

func (u User) AddUser(ctx *gin.Context) {
	id, err := models.AddUser(&models.User{
		Name:         ctx.PostForm("name"),
		Sex:          ctx.PostForm("sex"),
		Password:     ctx.PostForm("password"),
		Phone_number: ctx.PostForm("phone_number"),
		Create_Date:  time.Now(),
		ID_number:    ctx.PostForm("ID_number"),
	})
	if err != nil {
		logger.Errorf("add user failed with err: %s", err)
		ReturnError(ctx, -1, fmt.Sprintf("add user failed with err: %s", err))
		return
	}
	ReturnSuccess(ctx, 0, "OK", map[string]interface{}{"id": id}, 1)
}
