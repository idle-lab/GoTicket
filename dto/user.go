package dto

import "time"

type User struct {
	ID          uint32
	Name        string
	Sex         string
	Password    string
	Phone       string
	Create_date time.Time
	Id_number   string
}
