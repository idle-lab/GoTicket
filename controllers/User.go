package controllers

import (
	"time"

	"github.com/gin-gonic/gin"
)

type User struct {
	ID          uint32
	Name        string
	Sex         string
	Password    string
	PhoneNumber string
	CreateDate  time.Time
	IDNumber    string
}

func (u User) GetInfo(ctx *gin.Context) {
	n1 := 0
	n2 := 1
	n3 := n2 / n1
	ReturnSuccess(ctx, 0, "111", n3, 1)
}
