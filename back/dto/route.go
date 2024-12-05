package dto

import (
	"time"

	"github.com/shopspring/decimal"
)

/*
Station 站点信息

- Name： 站名

- Routes： 经过该站的路线

- Postion： 所在城市
*/
type Station struct {
	ID      uint16   `json:"station_id"`
	Name    string   `json:"station_name"`
	Postion string   `json:"station_postion"`
	Routes  []uint16 `json:"route_ids"`
}

/*
Route 路线信息
*/
type Route struct {
	ID       uint16          `json:"route_id"`
	Price_pk decimal.Decimal `json:"price_pk"`
}

type AvailableRoute struct {
	Route_id                    uint16      `json:"route_id"`
	Code                        string      `json:"code"`
	Station_ids                 interface{} `json:"station_ids"`
	Dwell_time_per_stop         interface{} `json:"dwell_time_per_stop"`
	Station_expected_start_time []time.Time `json:"station_expected_start_time"`
	Start_station_offset        uint16      `json:"start_station_offset"`
	End_station_offset          uint16      `json:"end_station_offset"`
	Available_seats             uint16      `json:"available_seats"`
	Seats                       interface{} `json:"seats"`
	Start_time                  time.Time   `json:"start_time"`
	// 列车平均速度，单位 m/s
	Avg_speed float64 `json:"avg_speed"`
	// 路线每公里的价格，单位 元/km
	Price_pk decimal.Decimal `json:"price_pk"`
	// 每站到起点站的距离，单位 km
	Station_distances interface{} `json:"station_distances"`
}

type Preferences struct {
	// 在 Departure_time_before 时间前出发
	// 在 Departure_time_after 时间后出发
	// 必须满足 Departure_time_before > Departure_time_after
	Departure_time_before time.Time `json:"departure_time_before"`
	Departure_time_after  time.Time `json:"departure_time_after"`

	// 在 Arrival_time_before 时间前到达
	// 在 Arrival_time_after 时间后到达
	// 必须满足 Departure_time_before > Departure_time_after
	Arrival_time_before time.Time `json:"arrival_time_before"`
	Arrival_time_after  time.Time `json:"arrival_time_after"`
}

const Day = 24 * time.Hour

func NewPreferences() *Preferences {
	pre := &Preferences{}
	pre.Arrival_time_after = time.Now()
	pre.Arrival_time_before = time.Now().Add(20 * Day)

	pre.Arrival_time_after = time.Now()
	pre.Arrival_time_before = time.Now().Add(22 * Day)
	return pre
}

type RouteRequest struct {
	Start_station    string      `json:"start_station"`
	End_station      string      `json:"end_station"`
	User_preferences Preferences `json:"preferences"`
}
