package dto

import (
	"time"

	"github.com/shopspring/decimal"
)

/*
TrainNumber 车次信息

- Status：车次状态

- AvailableSeats：剩余的座位数

- StartTime：列车开始时间
*/
type TrainNumber struct {
	ID                  uint32
	Code                string
	Status              string
	Available_seats     uint16
	Start_time          time.Time
	dwell_time_per_stop string
	train_id            uint16
	route_id            uint16
}

/*
Station 站点信息

- Name： 站名

- Routes： 经过该站的路线

- Postion： 所在城市
*/
type Station struct {
	ID      uint16 `json:"station_id"`
	Name    string `json:"station_name"`
	Postion string `json:"station_postion"`
}

/*
Route 路线信息
*/
type Route struct {
	ID       uint16          `json:"route_id"`
	Price_pk decimal.Decimal `json:"price_pk"`
}

type AvailableRoute struct {
	Route_id                         uint16      `json:"route_id"`
	Code                             string      `json:"code"`
	Station_ids                      string      `json:"station_ids"`
	Dwell_time_per_stop              string      `json:"dwell_time_per_stop"`
	Station_expected_departure_times []time.Time `json:"station_expected_departure_times"`
	Start_station_offset             uint16      `json:"start_station_offset"`
	End_station_offset               uint16      `json:"end_station_offset"`
	Available_seats                  uint16      `json:"available_seats"`
	Seats                            string      `json:"seats"`
	Start_time                       time.Time
	// 列车平均速度，单位 m/s
	Avg_speed float64 `json:"avg_speed"`
	// 路线每公里的价格，单位 元/km
	Price_pk float64 `json:"price_pk"`
	// 每站到起点站的距离，单位 km
	Station_distances interface{} `json:"station_distances"`
}

type RouteResponse struct {
	Code                             string          `json:"code"`
	Stations                         []string        `json:"station_ids"`
	Dwell_time_per_stop              []time.Duration `json:"dwell_time_per_stop"`
	Station_expected_departure_times []time.Time     `json:"station_expected_departure_times"`
	Start_station_offset             uint16          `json:"start_station_offset"`
	End_station_offset               uint16          `json:"end_station_offset"`
	Price                            float64         `json:"price"`
	Available_seats                  uint16          `json:"available_seats"`
	Seats                            string          `json:"seats"`
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

type TrainNumberInfo struct {
	Route_id        uint16   `json:"route_id"`
	Train_number    string   `json:"train_number"`
	Start_station   string   `json:"start_station"`
	End_station     string   `json:"end_station"`
	Departure_time  string   `json:"departure_time"`
	Arrival_time    string   `json:"arrival_time"`
	Available_seats uint16   `json:"available_seats"`
	Price           float32  `json:"price"`
	All_station     []string `json:"all_station"`
}
