package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/models"
	"github.com/2418071565/GoTicket/pkg/logger"
	"github.com/gin-gonic/gin"
)

func AddTrainNumber(ctx *gin.Context) {
	tn := dto.AddTrainNumberRequest{}
	if err := ctx.ShouldBind(tn); err != nil {
		logger.Infof("parse train number info failed with err:%s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Errorf("parse train number info failed with err:%s", err),
		})
		return
	}

	start_time, err := time.Parse("2006-01-02 15:04", tn.Start_time)
	if err != nil {
		logger.Infof("invlid time format:%s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Errorf("invlid time format:%s", err),
		})
		return
	}

	dwell_time := make([]string, 0, len(tn.Dwell_time_per_stop))
	for _, time := range tn.Dwell_time_per_stop {
		dwell_time = append(dwell_time, strconv.Itoa(int(time)))
	}
	dwell_time_str := strings.Join(dwell_time, ",")

	train, err := models.Train{}.GetTrainByName(tn.Train_name)
	if err != nil {
		logger.Infof("get train failed with error: %s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Errorf("get train failed with error: %s", err),
		})
		return
	}

	route, err := models.Route{}.GetRoute("id", "name = ?", tn.Route_name)
	if err != nil {
		logger.Infof("get route failed with error: %s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Errorf("get route failed with error: %s", err),
		})
		return
	}
	models.TrainNumber{}.AddTrainNumber(&dto.TrainNumber{
		Code:                tn.Code,
		Status:              tn.Status,
		Available_seats:     train.Max_capacity,
		Start_time:          start_time,
		Dwell_time_per_stop: dwell_time_str,
		Train_id:            train.ID,
		Route_id:            route.ID,
	})
	ReturnSuccess(ctx, &dto.JsonStruct{
		Code:    http.StatusOK,
		Message: "OK",
		Count:   0,
	})
}

func GetAllTrainNumbers(ctx *gin.Context) {

}

func UpdateTrainNumber(ctx *gin.Context) {

}

func DeleteTrainNumber(ctx *gin.Context) {

}
