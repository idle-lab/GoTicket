package models

import (
	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/storage/db"
)

type Route struct{}

const routeQuerySQL = `
SELECT
    accessible_routes.route_id as route_id,
    CONCAT(trains.train_type, train_numbers.code) as code,
    accessible_routes.station_ids as station_ids,
    accessible_routes.station_distances as station_distances,
    accessible_routes.price_pk as price_pk,
    train_numbers.available_seats as available_seats,
    train_numbers.dwell_time_per_stop as dwell_time_per_stop,
    train_numbers.start_time as start_time,
    trains.avg_speed as avg_speed,
    trains.seats as seats,
    rank_s1.start_offset - 1 as start_station_offset,
    rank_s2.end_offset - 1 as end_station_offset
FROM
    train_numbers
    INNER JOIN
        trains
        ON train_numbers.train_id = trains.id
    INNER JOIN 
    (
        SELECT 
            rs.route_id as route_id,
            GROUP_CONCAT(station_id ORDER BY distance_from_start) AS station_ids,
            GROUP_CONCAT(distance_from_start ORDER BY distance_from_start) AS station_distances,
            r.price_pk as price_pk
        FROM
            route_station AS rs
        INNER JOIN
            routes AS r
            ON r.id = rs.route_id
        WHERE 
            rs.route_id IN (
                SELECT s1.route_id
                FROM 
                    (SELECT route_id FROM route_station WHERE station_id = ?) AS s1
                INNER JOIN 
                    (SELECT route_id FROM route_station WHERE station_id = ?) AS s2
                ON s1.route_id = s2.route_id
            ) 
        GROUP BY rs.route_id
    ) AS accessible_routes
        ON train_numbers.route_id = accessible_routes.route_id
    INNER JOIN
    (
        SELECT 
            start_offset,
            route_id
        FROM
        (
            SELECT
                route_id,
                ROW_NUMBER() OVER (PARTITION BY route_id ORDER BY distance_from_start ASC) AS start_offset,
                station_id
            FROM
                route_station
        ) AS s1
        WHERE
            s1.station_id = ?
    ) AS rank_s1
        ON rank_s1.route_id = train_numbers.route_id
    INNER JOIN
    (
        SELECT 
            end_offset,
            route_id
        FROM
        (
            SELECT
                route_id,
                ROW_NUMBER() OVER (PARTITION BY route_id ORDER BY distance_from_start ASC) AS end_offset,
                station_id
            FROM
                route_station
        ) AS s2
        WHERE
            s2.station_id = ?
    ) AS rank_s2
        ON rank_s2.route_id = train_numbers.route_id
WHERE
    train_numbers.status = 1;
`

func (Route) AddRoute(route *dto.Route) error {
	if err := db.DB.Table("routes").Create(route).Error; err != nil {
		return err
	}
	return nil
}

func (Route) AddRouteStation(route_station *dto.RouteStation) error {
	if err := db.DB.Table("route_station").Create(route_station).Error; err != nil {
		return err
	}
	return nil
}

func (Route) GetRoutesByStationId(start uint16, end uint16) ([]dto.AvailableRoute, error) {
	routes := make([]dto.AvailableRoute, 0)
	if err := db.DB.Raw(routeQuerySQL, start, end, start, end).Scan(&routes).Error; err != nil {
		return nil, err
	}
	return routes, nil
}

func (Route) GetRoute(cols string, where string, args ...interface{}) (*dto.Route, error) {
	route := &dto.Route{}
	if err := db.DB.Table("routes").
		Select(cols).
		Where(where, args).
		Scan(route).Error; err != nil {
		return nil, err
	}
	return route, nil
}
