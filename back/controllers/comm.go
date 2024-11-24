package controllers

import (
	"github.com/2418071565/GoTicket/dto"
	"github.com/gin-gonic/gin"
)

func ReturnSuccess(ctx *gin.Context, code int, message interface{}, data interface{}, count int64) {
	rv := &dto.JsonStruct{Code: code, Message: message, Data: data, Count: count}
	ctx.JSON(code, rv)
}

func ReturnError(ctx *gin.Context, code int, message interface{}) {
	rv := &dto.JsonErrorStruct{Code: code, Message: message}
	ctx.JSON(code, rv)
}
