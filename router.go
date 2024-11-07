package main

import (
	"github.com/2418071565/GoTicket/controllers"
	"github.com/gin-gonic/gin"
)

func CollectRoute(ser *gin.Engine) *gin.Engine {
	ser.GET("/test", controllers.User{}.GetInfo)
	// user := ser.Group("/user")
	// user.GET("/:id", )
	return ser
}
