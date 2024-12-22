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
	Dwell_time_per_stop string
	Train_id            uint16
	Route_id            uint16
}

/*
Station 站点信息

- Name： 站名

- Routes： 经过该站的路线

- Postion： 所在城市
*/
type Station struct {
	ID      uint16 `json:"id"`
	Name    string `json:"name"`
	Postion string `json:"postion"`
}

/*
Route 路线信息
*/
type Route struct {
	ID       uint16          `json:"route_id"`
	Name     string          `json:"name"`
	Price_pk decimal.Decimal `json:"price_pk"`
}

type RouteStation struct {
	Route_id            uint16  `josn:"route_id"`
	Station_id          uint16  `json:"station_id"`
	Distance_from_start float64 `json:"distance_from_start"`
}

type RouteResponse struct {
	ID                  uint16          `json:"id"`
	Name                string          `json:"name"`
	Price_pk            decimal.Decimal `json:"price_pk"`
	Stations            []string        `json:"stations"`
	Distance_from_start []float64       `json:"distance_from_start"`
}

type TrainNumberResponse struct {
	ID                  uint32   `json:"id"`
	Code                string   `json:"code"`
	Status              string   `json:"status"`
	Start_time          string   `json:"start_time"`
	Dwell_time_per_stop []uint16 `json:"dwell_time_per_stop"`
	Train_name          string   `json:"train_name"`
	Route_name          string   `json:"route_name"`
}

type AvailableRoute struct {
	Route_id                         uint16      `json:"route_id"`
	Code                             string      `json:"code"`
	Station_ids                      string      `json:"stations"`
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
	Station_distances string `json:"station_distances"`
}

type OneWayRouteResponse struct {
	Code                             string          `json:"code"`
	Stations                         []string        `json:"stations"`
	Dwell_time_per_stop              []time.Duration `json:"dwell_time_per_stop"`
	Station_expected_departure_times []time.Time     `json:"station_expected_departure_times"`
	Start_station_offset             uint16          `json:"start_station_offset"`
	End_station_offset               uint16          `json:"end_station_offset"`
	Price                            float64         `json:"price"`
	Available_seats                  uint16          `json:"available_seats"`
	Seats                            string          `json:"seats"`
}

type TicketTime time.Time

func (c *TicketTime) UnmarshalJSON(b []byte) error {
	// 定义自定义的时间格式
	const timeFormat = `2006-01-02 15:04`
	// 去掉双引号
	str := string(b)
	str = str[1 : len(str)-1]
	parsedTime, err := time.Parse(timeFormat, str)
	if err != nil {
		return err
	}
	*c = TicketTime(parsedTime)
	return nil
}

type Preferences struct {
	// 在 Departure_time_before 时间前出发
	// 在 Departure_time_after 时间后出发
	// 必须满足 Departure_time_before > Departure_time_after
	Departure_time_before TicketTime `json:"departure_time_before"`
	Departure_time_after  TicketTime `json:"departure_time_after"`

	// 在 Arrival_time_before 时间前到达
	// 在 Arrival_time_after 时间后到达
	// 必须满足 Departure_time_before > Departure_time_after
	Arrival_time_before TicketTime `json:"arrival_time_before"`
	Arrival_time_after  TicketTime `json:"arrival_time_after"`
}

const Day = 24 * time.Hour

func NewPreferences() *Preferences {
	pre := &Preferences{}
	pre.Arrival_time_after = TicketTime(time.Now())
	pre.Arrival_time_before = TicketTime(time.Now().Add(20 * Day))

	pre.Arrival_time_after = TicketTime(time.Now())
	pre.Arrival_time_before = TicketTime(time.Now().Add(22 * Day))
	return pre
}
