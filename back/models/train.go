package models

import (
	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/storage/db"
)

type Train struct{}

func (Train) AddTrain(train *dto.Train) error {
	if err := db.DB.Table("trains").Create(train).Error; err != nil {
		return err
	}
	return nil
}

func (Train) GetTrainByName(name string) (*dto.Train, error) {
	train := dto.Train{}
	if err := db.DB.Table("trains").
		Where("name = ?", name).
		Scan(&train).
		Error; err != nil {
		return nil, err
	}
	return &train, nil
}
