package controllers

import (
	"fmt"
	"net/http"

	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/pkg/logger"
	"github.com/2418071565/GoTicket/services"
	"github.com/gin-gonic/gin"
)

func OneWayTicketsQuery(ctx *gin.Context) {
	req := dto.RouteRequest{}
	if err := ctx.ShouldBind(&req); err != nil {
		logger.Warnf("query falied with error: %s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Errorf("invalid request format").Error(),
		})
		return
	}
	routes, err := services.TrainsQuery(req.Start_station, req.End_station)
	if err != nil {
		logger.Warnf("routres query failed with error: %s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Errorf("routres query failed").Error(),
		})
		return
	}

	rv, err := services.HandkeRoutes(routes, &req.User_preferences)
	if err != nil {
		logger.Warnf("routres query failed with error: %s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Errorf("routres query failed").Error(),
		})
		return
	}

	ReturnSuccess(ctx, &dto.JsonStruct{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    rv,
		Count:   len(rv),
	})
}
