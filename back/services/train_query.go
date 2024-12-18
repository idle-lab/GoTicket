package services

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/models"
)

func parpareTime(after *dto.TicketTime, before *dto.TicketTime) {
	if (*after == dto.TicketTime{}) {
		if (*before == dto.TicketTime{}) {
			*before = dto.TicketTime(time.Now().Add(24 * time.Hour))
		}
		*after = dto.TicketTime(time.Time(*before).Add(-24 * time.Hour))
	} else {
		if (*before == dto.TicketTime{}) {
			*before = dto.TicketTime(time.Time(*before).Add(24 * time.Hour))
		}
	}
}

func CheckPreference(req *dto.RouteRequest) error {
	if (req.User_preferences == dto.Preferences{}) {
		req.User_preferences = *dto.NewPreferences()
		return nil
	}
	pref := &req.User_preferences
	parpareTime(&pref.Departure_time_after, &pref.Departure_time_before)
	parpareTime(&pref.Arrival_time_after, &pref.Arrival_time_before)

	if time.Time(pref.Arrival_time_before).After(time.Time(pref.Arrival_time_after)) ||
		time.Time(pref.Departure_time_before).After(time.Time(pref.Departure_time_before)) {
		return fmt.Errorf("invalid user preferences")
	}
	return nil
}

// 获取通过所有经过 start 和 end 的路线
func TrainsQuery(start string, end string) ([]dto.AvailableRoute, error) {
	start_ids, err := models.Station{}.GetStationsByPosition(start)
	if err != nil {
		return nil, err
	}
	end_ids, err := models.Station{}.GetStationsByPosition(end)
	if err != nil {
		return nil, err
	}
	result := make([]dto.AvailableRoute, 0)
	code_map := make(map[string]struct{})
	for _, start := range start_ids {
		for _, end := range end_ids {
			routes, err := models.Route{}.GetRoutesByStationId(start.ID, end.ID)
			if err != nil {
				return nil, err
			}
			for i := 0; i < len(routes); i++ {
				if _, ok := code_map[routes[i].Code]; !ok {
					result = append(result, routes[i])
					code_map[routes[i].Code] = struct{}{}
				}
			}
		}
	}
	return result, nil
}

// 处理并过滤掉所有不符合用户偏好的车次
func HandkeRoutes(routes []dto.AvailableRoute, pref *dto.Preferences) ([]dto.RouteResponse, error) {
	result := make([]dto.RouteResponse, 0)

	for i := 0; i < len(routes); i++ {
		station_distances_str := routes[i].Station_distances
		station_distances := strings.Split(station_distances_str, ",")
		distances := make([]float64, 0)
		for _, distance_str := range station_distances {
			distance, _ := strconv.ParseFloat(distance_str, 64)
			distances = append(distances, distance)
		}

		dwell_time_per_stop_str := routes[i].Dwell_time_per_stop
		dwell_time_per_stops := strings.Split(dwell_time_per_stop_str, ",")
		dwell_times := make([]time.Duration, 0)
		for _, time_str := range dwell_time_per_stops {
			dwell_time, _ := strconv.ParseInt(time_str, 10, 64)
			dwell_times = append(dwell_times, time.Duration(dwell_time))
		}

		routes[i].Station_expected_departure_times = make([]time.Time, 0)
		routes[i].Station_expected_departure_times = append(routes[i].Station_expected_departure_times, routes[i].Start_time)
		for j := 1; j < len(distances); j++ {
			// 计算列车每站的预计到达时间，单位 min
			// m/s => m/min
			// m / (m/min) = min
			routes[i].Station_expected_departure_times = append(routes[i].Station_expected_departure_times,
				routes[i].Station_expected_departure_times[j-1].Add(
					time.Duration((distances[j]-distances[j-1])/routes[i].Avg_speed*60*float64(time.Minute))+dwell_times[j]*time.Minute,
				),
			)
		}

		start_offset, end_offset := routes[i].Start_station_offset, routes[i].End_station_offset

		departure_start_time := routes[i].Station_expected_departure_times[start_offset]
		arrival_end_time := routes[i].Station_expected_departure_times[end_offset].Add(-dwell_times[end_offset])
		// 要保证`开始站`的发车时间要在 [Departure_time_after, Departure_time_before] 范围内 并且
		//   保证`结束站`的到达时间要在 [Arrival_time_after, Arrival_time_before] 范围内
		if departure_start_time.After(time.Time(pref.Departure_time_after)) && departure_start_time.Before(time.Time(pref.Departure_time_before)) &&
			arrival_end_time.After(time.Time(pref.Arrival_time_after)) && arrival_end_time.Before(time.Time(pref.Arrival_time_before)) {
			// 将车站 id 转化为车站名
			station_ids_str := routes[i].Station_ids
			station_ids := strings.Split(station_ids_str, ",")
			ids := make([]uint16, 0)
			for _, id_str := range station_ids {
				id, _ := strconv.Atoi(id_str)
				ids = append(ids, uint16(id))
			}

			stations, err := models.Station{}.GetStationsByIds(ids)
			if err != nil {
				return nil, err
			}
			id_to_station := make(map[uint16]string)
			for j := 0; j < len(stations); j++ {
				id_to_station[stations[j].ID] = stations[j].Name
			}
			station_names := make([]string, 0, len(ids))
			for _, id := range ids {
				station_names = append(station_names, id_to_station[id])
			}

			result = append(result, dto.RouteResponse{
				Code:                             routes[i].Code,
				Stations:                         station_names,
				Dwell_time_per_stop:              dwell_times,
				Station_expected_departure_times: routes[i].Station_expected_departure_times,
				Start_station_offset:             routes[i].Start_station_offset,
				End_station_offset:               routes[i].End_station_offset,
				Available_seats:                  routes[i].Available_seats,
				Seats:                            routes[i].Seats,
				// (km - km) * 元/km => 元
				Price: ((distances[end_offset] - distances[start_offset]) * routes[i].Price_pk),
			})
		}
	}

	return result, nil
}
