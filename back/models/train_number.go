package models

import (
	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/storage/db"
)

type TrainNumber struct{}

func (TrainNumber) AddTrainNumber(train_number *dto.TrainNumber) error {
	if err := db.DB.Table("train_numbers").Create(train_number).Error; err != nil {
		return err
	}
	return nil
}
