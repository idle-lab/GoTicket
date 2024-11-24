package db

import (
	"bufio"
	"database/sql"
	"fmt"
	"os"

	"github.com/2418071565/GoTicket/pkg/config"
	"github.com/2418071565/GoTicket/pkg/logger"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

var (
	DB  *gorm.DB
	err error
)

// 创建所需数据库
func prepareDatabase() {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/?charset=utf8mb4", config.DB_USERNAME, config.DB_PASSWORD, config.DB_HOST, config.DB_PORT)
	DB, err := sql.Open("mysql", dsn)
	if err != nil {
		logger.Errorf("db open failed with error: %s", err)
		os.Exit(-1)
	}
	defer DB.Close()

	// 打开 .sql 文件
	file, err := os.Open("storage/db/init.sql")
	if err != nil {
		logger.Fatalf("failed to open SQL file: %v\n", err)
	}
	defer file.Close()

	// 读取并逐行执行 SQL 语句
	scanner := bufio.NewScanner(file)
	var statement string
	for scanner.Scan() {
		line := scanner.Text()
		// 跳过空行或注释行（以 `--` 开头）
		if len(line) == 0 || line[0:2] == "--" {
			continue
		}
		statement += line
		if line[len(line)-1] == ';' { // 以分号结束的语句表示一个完整的 SQL 语句
			_, err = DB.Exec(statement)
			if err != nil {
				logger.Infof("failed to execute statement %q: %v\n", statement, err)
			}
			statement = "" // 重置语句
		}
	}
	if err = scanner.Err(); err != nil {
		logger.Fatalf("error reading file: %v\n", err)
	}
}

func init() {
	prepareDatabase()
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&&parseTime=true", config.DB_USERNAME, config.DB_PASSWORD, config.DB_HOST, config.DB_PORT, config.DB_DATABASE)
	DB, err = gorm.Open("mysql", dsn)
	if err != nil {
		logger.Errorf("db open failed with error: %s", err)
		os.Exit(-1)
	}
	DB.DB().SetMaxOpenConns(config.DB_MAX_OPEN_CONNS)
	DB.DB().SetMaxIdleConns(config.DB_MAX_IDLE_CONNS)
	DB.DB().SetConnMaxLifetime(config.DB_CONN_MAX_LIFE_TIME)
	DB.DB().SetConnMaxIdleTime(config.DB_CONN_MAX_IDLE_TIME)
}
