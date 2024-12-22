package main

import (
	"github.com/2418071565/GoTicket/controllers"
	"github.com/gin-gonic/gin"
)

func CollectRoute(ser *gin.Engine) *gin.Engine {
	// 需要 token 鉴权的 API
	auth_group := ser.Group("/", controllers.JWTAuthMiddleware())
	{
		auth_user_group := auth_group.Group("")
		{
			auth_user_group.GET("/userInfo", controllers.GetUserInfo)
			auth_user_group.GET("/station", controllers.GetAllStations)
			auth_user_group.GET("/route", controllers.GetAllRoutes)
			auth_user_group.GET("/train", controllers.GetAllTrains)
			auth_user_group.GET("/trainNumber", controllers.GetAllTrainNumbers)
			auth_user_group.PUT("/userInfo", controllers.ChangeUserInfo)
		}
		auth_admin_group := auth_group.Group("/admin", controllers.AdminAuthMiddleware())
		{
			auth_admin_group.GET("/userInfo", controllers.GetAllUserInfo)
			auth_admin_group.POST("", controllers.AdminRegister)
			auth_admin_group.POST("/route", controllers.AddRoute)
			auth_admin_group.POST("/train", controllers.AddTrain)
			auth_admin_group.POST("/station", controllers.AddStation)
			auth_admin_group.POST("/trainNumber", controllers.AddTrainNumber)
		}
	}

	// 普通 API
	ser.GET("/token", controllers.Login)
	ser.POST("/user", controllers.Register)
	ser.POST("/oneWayTickets", controllers.OneWayTicketsQuery)
	return ser
}
