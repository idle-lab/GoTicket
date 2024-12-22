package controllers

import (
	"fmt"
	"net/http"

	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/models"
	"github.com/2418071565/GoTicket/pkg/logger"
	"github.com/gin-gonic/gin"
)

func AddStation(ctx *gin.Context) {
	req := dto.AddStationRequest{}
	if err := ctx.ShouldBind(&req); err != nil {
		logger.Infof("parse station info failed with err:%s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Sprintf("parse station info failed with err:%s", err),
		})
		return
	}
	err := models.Station{}.AddStation(&dto.Station{Name: req.Name, Postion: req.Postion})
	if err != nil {
		logger.Infof("add station failed with err:%s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Sprintf("add station failed with err:%s", err),
		})
		return
	}
	ReturnSuccess(ctx, &dto.JsonStruct{
		Code:    http.StatusOK,
		Message: "OK",
		Count:   0,
	})
}

func GetAllStations(ctx *gin.Context) {
	stations, err := models.Station{}.GetAllStations()
	if err != nil {
		logger.Infof("add station failed with err:%s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusInternalServerError,
			Message: "get station failed with some server internal error.",
		})
		return
	}
	ReturnSuccess(ctx, &dto.JsonStruct{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    stations,
		Count:   len(stations),
	})
}

func UpdateStations(ctx *gin.Context) {
	// new_station := dto.Station{}
	// if err := ctx.ShouldBind(&new_station); err != nil {
	// 	logger.Infof("update station failed with err:%s", err)
	// 	ReturnError(ctx, &dto.JsonErrorStruct{
	// 		Code:    http.StatusInternalServerError,
	// 		Message: fmt.Sprintf("update station failed with err: %s", err),
	// 	})
	// 	return
	// }

	// if err := models.Station{}.UpdateStation(&new_station);err != nil {

	// }
}

func DeleteStation(ctx *gin.Context) {

}
