package controllers

import (
	"fmt"
	"net/http"

	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/models"
	"github.com/2418071565/GoTicket/pkg/logger"
	"github.com/gin-gonic/gin"
)

func AddRoute(ctx *gin.Context) {
	req := dto.AddRouteRequest{}
	err := ctx.ShouldBind(&req)
	if err != nil {
		logger.Infof("parse route info failed with err:%s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: fmt.Errorf("parse route info failed with err:%s", err),
		})
		return
	}
	route := dto.Route{
		Name:     req.Name,
		Price_pk: req.Price_pk,
	}
	station_ids := make([]uint16, 0)
	for i := 0; i < len(req.Stations); i++ {
		st, err := models.Station{}.GetStationByName(req.Stations[i])
		if err != nil {
			logger.Warnf("get station falied with err: %s", err)
			ReturnError(ctx, &dto.JsonErrorStruct{
				Code:    http.StatusBadRequest,
				Message: fmt.Errorf("get station falied with err: %s", err),
			})
			return
		}

		station_ids = append(station_ids, st.ID)
	}
	models.Route{}.AddRoute(&route)

	for i := 0; i < len(station_ids); i++ {
		models.Route{}.AddRouteStation(&dto.RouteStation{
			Route_id:            route.ID,
			Station_id:          station_ids[i],
			Distance_from_start: req.Distance_from_start[i],
		})
	}
	ReturnSuccess(ctx, &dto.JsonStruct{
		Code:    http.StatusOK,
		Message: "ok",
		Count:   0,
	})
}

func GetAllRoutes(ctx *gin.Context) {

}

func UpdateRoute(ctx *gin.Context) {

}

func DeleteRoute(ctx *gin.Context) {

}
