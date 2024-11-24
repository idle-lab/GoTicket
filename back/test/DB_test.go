package GoTicket_test

import (
	"database/sql"
	"fmt"
	"os"
	"testing"

	"github.com/go-sql-driver/mysql"
)

func TestDbConnect(t *testing.T) {
	conn, err := mysql.NewConnector(&mysql.Config{
		User:                 "goticket",
		Passwd:               "cyb15540932948",
		DBName:               "goticket",
		Addr:                 "111.229.35.8:3306",
		AllowNativePasswords: true,
	})
	if err != nil {
		fmt.Println(err)
		return
	}
	db := sql.OpenDB(conn)
	if res, err := db.Query("SELECT 1"); err != nil {
		fmt.Println(err)
		return
	} else {
		for res.Next() {
			var ans int
			if err := res.Scan(&ans); err != nil {
				fmt.Println(err)
				return
			}
			if ans != 1 {
				t.Error("error")
			}
		}
	}
}

func TestMain(m *testing.M) {
	code := m.Run()

	os.Exit(code)
}
