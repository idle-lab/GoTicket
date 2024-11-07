package db

import (
	"fmt"
	"os"

	models "github.com/2418071565/GoTicket/Models"
	"github.com/2418071565/GoTicket/config"
	"github.com/2418071565/GoTicket/pkg/logger"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func InitDB() {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/?charset=utf8mb4", config.DB_USERNAME, config.DB_PASSWORD, config.DB_HOST, config.DB_PORT)
	DB, err = gorm.Open("mysql", dsn)
	if err != nil {
		logger.Errorf("db open failed with error: %s", err)
		os.Exit(-1)
	}
	if DB.Error != nil {
		logger.Errorf("db error: %s", err)
		os.Exit(-1)
	}

	rv := DB.Exec(fmt.Sprintf("CREATE DATABASE IF NOT EXISTS %s", config.DB_DATABASE))
	if rv.Error != nil {
		logger.Errorf("create database failed with error: %s", rv.Error)
		os.Exit(-1)
	}
	rv = DB.Exec(fmt.Sprintf("USE %s", config.DB_DATABASE))
	if rv.Error != nil {
		logger.Errorf("create database failed with error: %s", rv.Error)
		os.Exit(-1)
	}

	DB.DB().SetMaxOpenConns(config.DB_MAX_OPEN_CONNS)
	DB.DB().SetMaxIdleConns(config.DB_MAX_IDLE_CONNS)
	DB.DB().SetConnMaxLifetime(config.DB_CONN_MAX_LIFE_TIME)
	DB.DB().SetConnMaxIdleTime(config.DB_CONN_MAX_IDLE_TIME)

	DB.AutoMigrate(
		&models.User{}, &models.Ticket{}, &models.Order{},
		&models.Route{}, &models.Station{}, &models.Train{}, &models.TrainNumber{},
	)
}

func GetDB() *gorm.DB {
	return DB
}
