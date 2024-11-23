package dto

import "time"

type User struct {
	ID          uint32    `json:"id"`
	Name        string    `json:"name"`
	Sex         string    `json:"sex"`
	Password    string    `json:"password"`
	Phone       string    `json:"phone"`
	Create_date time.Time `json:"create_date"`
	Id_number   string    `json:"id_number"`
}
