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
	req := dto.Station{}
	if err := ctx.ShouldBind(req); err != nil {
		logger.Infof("parse station info failed with err:%s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Errorf("parse station info failed with err:%s", err),
		})
		return
	}
	err := models.Station{}.AddStation(&dto.Station{Name: req.Name, Postion: req.Postion})
	if err != nil {
		logger.Infof("add station failed with err:%s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Errorf("add station failed with err:%s", err),
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

}

func UpdateStations(ctx *gin.Context) {

}

func DeleteStation(ctx *gin.Context) {

}
