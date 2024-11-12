package main

import (
	"github.com/2418071565/GoTicket/controllers"
	"github.com/gin-gonic/gin"
)

func CollectRoute(ser *gin.Engine) *gin.Engine {

	user_group := ser.Group("/user")
	user_group.GET("/:id", (&controllers.User{}).GetUser)
	user_group.POST("", (&controllers.User{}).AddUser)
	return ser
}
