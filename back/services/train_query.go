package services

import (
	"strconv"
	"strings"
	"time"

	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/models"
)

// 获取通过所有经过 start 和 end 的路线
func TrainsQuery(start string, end string) ([]dto.AvailableRoute, error) {
	start_ids, err := models.Station{}.GetStations(start)
	if err != nil {
		return nil, err
	}
	end_ids, err := models.Station{}.GetStations(end)
	if err != nil {
		return nil, err
	}
	result := make([]dto.AvailableRoute, 0)
	for _, start_id := range start_ids {
		for _, end_id := range end_ids {
			routes, err := models.Route{}.GetRoutesByStationId(start_id, end_id)
			if err != nil {
				return nil, err
			}
			result = append(result, routes...)
		}
	}
	return result, nil
}

// 过滤掉所有不符合用户偏好的车次
func TrainsFilter(routes []dto.AvailableRoute, pref *dto.Preferences) []dto.AvailableRoute {
	result := make([]dto.AvailableRoute, 0)

	for i := 0; i < len(routes); i++ {
		station_ids_str := routes[i].Station_ids.(string)
		station_ids := strings.Split(station_ids_str, ",")
		ids := make([]uint16, 0)
		for _, id_str := range station_ids {
			id, _ := strconv.Atoi(id_str)
			ids = append(ids, uint16(id))
		}

		station_distances_str := routes[i].Station_distances.(string)
		station_distances := strings.Split(station_distances_str, ",")
		distances := make([]float64, 0)
		for _, distance_str := range station_distances {
			distance, _ := strconv.ParseFloat(distance_str, 64)
			distances = append(distances, distance)
		}

		dwell_time_per_stop_str := routes[i].Dwell_time_per_stop.(string)
		dwell_time_per_stops := strings.Split(dwell_time_per_stop_str, ",")
		dwell_times := make([]time.Duration, 0)
		for _, time_str := range dwell_time_per_stops {
			dwell_time, _ := strconv.ParseInt(time_str, 10, 64)
			dwell_times = append(dwell_times, time.Duration(dwell_time))
		}

		routes[i].Station_ids = ids
		routes[i].Station_distances = distances
		routes[i].Dwell_time_per_stop = dwell_times

		routes[i].Station_expected_start_time = make([]time.Time, 0)
		routes[i].Station_expected_start_time = append(routes[i].Station_expected_start_time, routes[i].Start_time)
		for j := 1; j < len(distances); j++ {
			// 计算列车每站的预计到达时间，单位 min
			// m/s => m/min
			// m / (m/min) = min
			routes[i].Station_expected_start_time = append(routes[i].Station_expected_start_time,
				routes[i].Station_expected_start_time[j-1].Add(
					time.Duration((distances[i]-distances[i-1])*1000/(routes[i].Avg_speed*60)*float64(time.Minute))+dwell_times[i],
				),
			)
		}

		// 要保证`开始站`的发车时间要在 [Departure_time_after, Departure_time_before] 范围内 并且
		// 要保证`结束站`的到达时间要在 [Arrival_time_after, Arrival_time_before] 范围内
		start_offset, end_offset := routes[i].Start_station_offset, routes[i].End_station_offset
		departure_start_time := routes[i].Station_expected_start_time[start_offset]
		arrival_end_time := routes[i].Station_expected_start_time[end_offset].Add(-dwell_times[end_offset])
		if departure_start_time.After(pref.Departure_time_after) && departure_start_time.Before(pref.Departure_time_before) &&
			arrival_end_time.After(pref.Arrival_time_after) && arrival_end_time.Before(pref.Arrival_time_before) {
			result = append(result, routes[i])
		}
	}
	return result
}
