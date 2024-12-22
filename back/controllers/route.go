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
			Message: fmt.Sprintf("parse route info failed with err:%s", err),
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
				Message: fmt.Sprintf("get station falied with err: %s", err),
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
	routes, err := models.Route{}.GetRoutes()
	if err != nil {
		logger.Infof("get routes failed with err:%s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusInternalServerError,
			Message: "get routes failed with some server internal error.",
		})
		return
	}
	rv := make([]dto.RouteResponse, 0)
	for _, route := range routes {
		rss, err := models.Route{}.GetRouteStationsByRouteId(route.ID)
		if err != nil {
			logger.Infof("get routes failed with err:%s", err)
			ReturnError(ctx, &dto.JsonErrorStruct{
				Code:    http.StatusInternalServerError,
				Message: "get routes failed with some server internal error.",
			})
			return
		}
		stations := make([]string, len(rss))
		distance_from_start := make([]float64, len(rss))
		for i, rs := range rss {
			st, err := models.Station{}.GetStationsById(rs.Station_id)
			if err != nil {
				logger.Infof("get routes failed with err:%s", err)
				ReturnError(ctx, &dto.JsonErrorStruct{
					Code:    http.StatusInternalServerError,
					Message: "get routes failed with some server internal error.",
				})
				return
			}
			stations[i] = st.Name
			distance_from_start[i] = rs.Distance_from_start
		}
		rv = append(rv, dto.RouteResponse{
			ID:                  route.ID,
			Name:                route.Name,
			Price_pk:            route.Price_pk,
			Stations:            stations,
			Distance_from_start: distance_from_start,
		})
	}
	ReturnSuccess(ctx, &dto.JsonStruct{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    rv,
		Count:   len(rv),
	})
}

func UpdateRoute(ctx *gin.Context) {

}

func DeleteRoute(ctx *gin.Context) {

}
