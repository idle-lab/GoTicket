package dto

import "github.com/shopspring/decimal"

type JsonStruct struct {
	Code    int         `json:"code"`
	Message interface{} `json:"msg"`
	Data    interface{} `json:"data"`
	Count   int         `json:"count"`
}

type JsonErrorStruct struct {
	Code    int         `json:"code"`
	Message interface{} `json:"msg"`
}

type AddRouteRequest struct {
	Name                string          `json:"name"`
	Stations            []string        `json:"stations"`
	Price_pk            decimal.Decimal `json:"price_pk"`
	Distance_from_start []float64       `json:"distance_from_start"`
}

type AddTrainRequest struct {
	Name         string   `json:"name"`
	Train_type   string   `json:"train_type"`
	Max_capacity uint16   `json:"max_capacity"`
	Seats        [][]uint `json:"seats"`
	Avg_speed    float32  `json:"avg_speed"`
}

type AddStationRequest struct {
	Name    string `json:"name"`
	Postion string `json:"postion"`
}

type AddTrainNumberRequest struct {
	Code                string   `json:"code"`
	Status              string   `json:"status"`
	Start_time          string   `json:"start_time"`
	Dwell_time_per_stop []uint16 `json:"dwell_time_per_stop"`
	Train_name          string   `json:"train_name"`
	Route_name          string   `json:"route_name"`
}

type RouteRequest struct {
	Start_station    string      `json:"start_station"`
	End_station      string      `json:"end_station"`
	User_preferences Preferences `json:"preferences"`
}
