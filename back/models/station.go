package models

import (
	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/storage/db"
)

type Station struct{}

func (Station) AddStation(station *dto.Station) error {
	if err := db.DB.Table("stations").Create(station).Error; err != nil {
		return err
	}
	return nil
}

func (Station) GetStationByName(name string) (*dto.Station, error) {
	var st dto.Station
	if err := db.DB.Table("stations").Where("name = ?", name).Find(&st).Error; err != nil {
		return nil, err
	}
	return &st, nil
}

func (Station) GetStationsByPosition(postion string) ([]dto.Station, error) {
	var sts []dto.Station
	if err := db.DB.Table("stations").Where("postion = ?", postion).Find(&sts).Error; err != nil {
		return nil, err
	}
	return sts, nil
}

func (Station) GetAllStations() ([]dto.Station, error) {
	var sts []dto.Station
	if err := db.DB.Table("stations").Scan(&sts).Error; err != nil {
		return nil, err
	}
	return sts, nil
}

func (Station) GetStationsByIds(station_ids []uint16) ([]dto.Station, error) {
	sts := make([]dto.Station, 0)
	if err := db.DB.Table("stations").
		Where("stations.id IN (?)", station_ids).
		Find(&sts).Error; err != nil {
		return nil, err
	}
	return sts, nil
}

func (Station) GetStationsById(station_id uint16) (*dto.Station, error) {
	st := dto.Station{}
	if err := db.DB.Table("stations").
		Where("stations.id = ? ", station_id).
		Find(&st).Error; err != nil {
		return nil, err
	}
	return &st, nil
}
