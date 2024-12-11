package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/models"
	"github.com/2418071565/GoTicket/pkg/logger"
	"github.com/gin-gonic/gin"
)

func AddTrain(ctx *gin.Context) {
	train := dto.AddTrainRequest{}
	if err := ctx.ShouldBind(train); err != nil {
		logger.Infof("parse train info failed with err:%s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Errorf("parse train info failed with err:%s", err),
		})
		return
	}

	seat, err := json.Marshal(train.Seats)
	if err != nil {
		logger.Infof("dump seats failed with err:%s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Errorf("dump seats failed with err:%s", err),
		})
		return
	}
	models.Train{}.AddTrain(&dto.Train{
		Name:         train.Name,
		Train_type:   train.Train_type,
		Max_capacity: train.Max_capacity,
		Seats:        string(seat),
		Avg_speed:    train.Avg_speed,
	})
	ReturnSuccess(ctx, &dto.JsonStruct{
		Code:    http.StatusOK,
		Message: "OK",
		Count:   0,
	})
}

func GetAllTrains(ctx *gin.Context) {

}

func UpdateTrain(ctx *gin.Context) {

}

func DeleteTrain(ctx *gin.Context) {

}
