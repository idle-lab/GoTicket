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
	if err := ctx.ShouldBind(&tn); err != nil {
		logger.Infof("parse train number info failed with err:%s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Errorf("parse train number info failed with err:%s", err).Error(),
		})
		return
	}

	start_time, err := time.Parse("2006-01-02 15:04", tn.Start_time)
	if err != nil {
		logger.Infof("invlid time format:%s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Errorf("invlid time format:%s", err).Error(),
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
			Message: fmt.Errorf("get train failed with error: %s", err).Error(),
		})
		return
	}

	route, err := models.Route{}.GetRoute("id", "name = ?", tn.Route_name)
	if err != nil {
		logger.Infof("get route failed with error: %s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Errorf("get route failed with error: %s", err).Error(),
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
	rawTn, err := models.TrainNumber{}.GetAllTrainNumbers()
	if err != nil {
		logger.Infof("get train number failed with err: %s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusInternalServerError,
			Message: "get train number failed with some server internal error.",
		})
		return
	}
	res := make([]dto.TrainNumberResponse, len(rawTn))
	for i, raw := range rawTn {
		route, err := models.Route{}.GetRouteById(raw.Route_id)
		train, err := models.Train{}.GetTrainById(raw.Train_id)
		if err != nil {
			logger.Infof("get train number failed with err: %s", err)
			ReturnError(ctx, &dto.JsonErrorStruct{
				Code:    http.StatusInternalServerError,
				Message: "get train number failed with some server internal error.",
			})
			return
		}
		dwell_time_per_stop_str := strings.Split(raw.Dwell_time_per_stop, ",")
		dwell_time_per_stop := make([]uint16, len(dwell_time_per_stop_str))
		for i, d := range dwell_time_per_stop_str {
			dd, _ := strconv.Atoi(d)
			dwell_time_per_stop[i] = uint16(dd)
		}
		res[i] = dto.TrainNumberResponse{
			ID:                  raw.ID,
			Code:                raw.Code,
			Status:              raw.Status,
			Start_time:          raw.Start_time.Format("2006-01-02 15:04"),
			Dwell_time_per_stop: dwell_time_per_stop,
			Train_name:          train.Name,
			Route_name:          route.Name,
		}
	}
	ReturnSuccess(ctx, &dto.JsonStruct{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    res,
		Count:   len(res),
	})
}

func UpdateTrainNumber(ctx *gin.Context) {

}

func DeleteTrainNumber(ctx *gin.Context) {

}
