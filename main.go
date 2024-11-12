package main

import (
	_ "github.com/2418071565/GoTicket/db"
	"github.com/2418071565/GoTicket/pkg/logger"
	"github.com/gin-gonic/gin"
)

func main() {
	ser := gin.Default()
	ser.Use(gin.LoggerWithConfig(logger.LogToFile()))
	ser.Use(logger.Recover)
	CollectRoute(ser)

	ser.Run(":8080")
}
