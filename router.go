package main

import (
	"github.com/2418071565/GoTicket/controllers"
	"github.com/gin-gonic/gin"
)

func CollectRoute(ser *gin.Engine) *gin.Engine {
	user_group := ser.Group("/user")
	user_group.GET("/token", controllers.Login)
	user_group.GET("/:token", controllers.GetInfo)
	user_group.POST("", controllers.Register)
	return ser
}
