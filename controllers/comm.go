package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type JsonStruct struct {
	Code    int         `json:"code"`
	Message interface{} `json:"msg"`
	Data    interface{} `json:"data"`
	Count   int64       `json:"count"`
}

type JsonErrorStruct struct {
	Code    int         `json:"code"`
	Message interface{} `json:"msg"`
}

func ReturnSuccess(ctx *gin.Context, code int, message interface{}, data interface{}, count int64) {
	rv := &JsonStruct{Code: code, Message: message, Data: data, Count: count}
	ctx.JSON(http.StatusOK, rv)
}

func ReturnError(ctx *gin.Context, code int, message interface{}) {
	rv := &JsonErrorStruct{Code: code, Message: message}
	ctx.JSON(http.StatusForbidden, rv)
}
