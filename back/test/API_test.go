package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"testing"

	"github.com/shopspring/decimal"
	"github.com/stretchr/testify/assert"
)

type Response struct {
	Code  int         `json:"code"`
	Msg   string      `json:"msg"`
	Data  interface{} `json:"data"`
	Count int         `json:"count"`
}

const baseURL = "http://127.0.0.1:8080"

var (
	baseAdmin         string = "goticket"
	baseAdminPassword string = "123456"
)

// Helper function to send POST requests
func sendPOST(t *testing.T, url string, body interface{}, token string) *http.Response {
	jsonBody, err := json.Marshal(body)
	if err != nil {
		t.Fatalf("Failed to marshal request body: %v", err)
	}
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonBody))
	if err != nil {
		t.Fatalf("Failed to create request: %v", err)
	}
	req.Header.Set("Content-Type", "application/json")
	if token != "" {
		req.Header.Set("Authorization", token)
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatalf("Request failed: %v", err)
	}
	return resp
}

// Helper function to send GET requests
func sendGET(t *testing.T, url string, token string) *http.Response {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		t.Fatalf("Failed to create request: %v", err)
	}
	if token != "" {
		req.Header.Set("Authorization", token)
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatalf("Request failed: %v", err)
	}
	return resp
}

var user = map[string]string{
	"name":      "John Doe",
	"sex":       "Male",
	"password":  "password123",
	"phone":     "33495678901",
	"id_number": "123456789012345678",
}

var admin = map[string]string{
	"name":      "proton",
	"sex":       "Female",
	"password":  "123456",
	"phone":     "12345678901",
	"id_number": "123456789012345678",
}

func Login(t *testing.T, phone string, password string) *http.Response {
	url := baseURL + fmt.Sprintf("/token?phone=%s&password=%s", phone, password)
	resp := sendGET(t, url, "")
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("Expected status 200, got %d", resp.StatusCode)
		return nil
	}
	var response Response
	json.NewDecoder(resp.Body).Decode(&response)
	if response.Code != 200 {
		t.Errorf("Expected response code 200, got %d", response.Code)
		return nil
	}
	return resp
}

// Test user registration
func TestRegisterUser(t *testing.T) {
	url := baseURL + "/user"
	resp := sendPOST(t, url, user, "")
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("Expected status 200, got %d", resp.StatusCode)
	}
	var response Response
	json.NewDecoder(resp.Body).Decode(&response)
	if response.Code != 200 {
		t.Errorf("Expected response code 200, got %d", response.Code)
	}
	resp = Login(t, user["phone"], user["password"])
	if resp == nil {
		return
	}
	if response.Code != 200 {
		t.Errorf("Expected response code 200, got %d", response.Code)
	}
	assert.NotEqual(t, "", resp.Header.Get("Authorization"))
}

// Test admin registration
func TestRegisterAdmin(t *testing.T) {
	resp := Login(t, baseAdmin, baseAdminPassword)
	if resp == nil {
		return
	}
	url := baseURL + "/admin"

	token := resp.Header.Get("Authorization")
	resp = sendPOST(t, url, admin, token)
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("Expected status 200, got %d", resp.StatusCode)
	}
	var response Response
	json.NewDecoder(resp.Body).Decode(&response)
	if response.Code != 200 {
		t.Errorf("Expected response code 200, got %d", response.Code)
	}
	resp = Login(t, admin["phone"], admin["password"])
	if resp == nil {
		return
	}
	if response.Code != 200 {
		t.Errorf("Expected response code 200, got %d", response.Code)
	}
	assert.NotEqual(t, "", resp.Header.Get("Authorization"))
}

// Test fetching user info
func TestFetchUserInfo(t *testing.T) {
	resp := Login(t, user["phone"], user["password"])
	if resp == nil {
		return
	}
	url := baseURL + "/userInfo"

	token := resp.Header.Get("Authorization")
	resp = sendGET(t, url, token)
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("Expected status 200, got %d", resp.StatusCode)
	}
	var response Response
	json.NewDecoder(resp.Body).Decode(&response)
	if response.Code != 200 {
		t.Errorf("Expected response code 200, got %d", response.Code)
	}
}

/// 铁路相关

type Station struct {
	Name    string `json:"name"`
	Postion string `json:"postion"`
}

type Route struct {
	Name                string          `json:"name"`
	Stations            []string        `json:"stations"`
	Price_pk            decimal.Decimal `json:"price_pk"`
	Distance_from_start []float64       `json:"distance_from_start"`
}

type Train struct {
	Name         string   `json:"name"`
	Train_type   string   `json:"train_type"`
	Max_capacity uint16   `json:"max_capacity"`
	Seats        [][]uint `json:"seats"`
	Avg_speed    float32  `json:"avg_speed"`
}

type TrainNumber struct {
	Code                string   `json:"code"`
	Status              string   `json:"status"`
	Start_time          string   `json:"start_time"`
	Dwell_time_per_stop []uint16 `json:"dwell_time_per_stop"`
	Train_name          string   `json:"train_name"`
	Route_name          string   `json:"route_name"`
}

var stations = []Station{
	{
		Name:    "Beijing Station",
		Postion: "Beijing",
	},
	{
		Name:    "Beijing West Station",
		Postion: "Beijing",
	},
	{
		Name:    "Shanghai Hongqiao Station",
		Postion: "Shanghai",
	},
	{
		Name:    "Shanghai Station",
		Postion: "Shanghai",
	},
	{
		Name:    "Guangzhou South Station",
		Postion: "Guangzhou",
	},
	{
		Name:    "Guangzhou Station",
		Postion: "Guangzhou",
	},
	{
		Name:    "Shenzhen North Station",
		Postion: "Shenzhen",
	},
	{
		Name:    "Shenzhen Station",
		Postion: "Shenzhen",
	},
	{
		Name:    "Hangzhou East Station",
		Postion: "Hangzhou",
	},
	{
		Name:    "Xi'an North Station",
		Postion: "Xi'an",
	},
	{
		Name:    "Chengdu East Station",
		Postion: "Chengdu",
	},
	{
		Name:    "Wuhan Station",
		Postion: "Wuhan",
	},
}

var routes = []Route{
	{
		Name: "Beijing - Shanghai High-Speed Line",
		Stations: []string{
			"Beijing Station",
			"Beijing West Station",
			"Shanghai Hongqiao Station",
			"Shanghai Station",
		},
		Price_pk:            decimal.NewFromFloat(0.5),
		Distance_from_start: []float64{0, 20, 1050, 1070},
	},
	{
		Name: "Guangzhou - Shenzhen Express Line",
		Stations: []string{
			"Guangzhou South Station",
			"Guangzhou Station",
			"Shenzhen North Station",
			"Shenzhen Station",
		},
		Price_pk:            decimal.NewFromFloat(0.4),
		Distance_from_start: []float64{0, 15, 30, 35},
	},
	{
		Name: "Xi'an - Chengdu Line",
		Stations: []string{
			"Xi'an North Station",
			"Chengdu East Station",
		},
		Price_pk:            decimal.NewFromFloat(0.6),
		Distance_from_start: []float64{0, 710},
	},
	{
		Name: "Wuhan - Hangzhou High-Speed Line",
		Stations: []string{
			"Wuhan Station",
			"Hangzhou East Station",
		},
		Price_pk:            decimal.NewFromFloat(0.55),
		Distance_from_start: []float64{0, 600},
	},
}

var trains = []Train{
	{
		Name:         "Fuxing CR400AF", // 列车名
		Train_type:   "G",              // 高铁
		Max_capacity: 578,              // 最大载客量
		Seats: [][]uint{ // 座位布局
			{100, 100, 78, 100, 100, 100}, // 6 列座位，每列剩余座位总和为 578
		},
		Avg_speed: 350.0, // 平均速度，单位 km/h
	},
	{
		Name:         "Hexie CRH380B", // 列车名
		Train_type:   "D",             // 动车
		Max_capacity: 610,             // 最大载客量
		Seats: [][]uint{ // 座位布局
			{110, 110, 100, 100, 90}, // 第一车厢，5 列座位
			{50, 50},                 // 第二车厢，2 列座位
		}, // 座位总和为 610
		Avg_speed: 250.0, // 平均速度
	},
	{
		Name:         "Green Train K598", // 列车名
		Train_type:   "K",                // 普通火车
		Max_capacity: 1180,               // 最大载客量
		Seats: [][]uint{ // 座位布局
			{150, 150, 150, 150, 150, 150}, // 1 号车厢，6 列座位
			{100, 100, 80, 50},             // 2 号车厢，4 列座位
		}, // 座位总和为 1180
		Avg_speed: 120.0, // 平均速度
	},
	{
		Name:         "Zhenghe D-series", // 列车名
		Train_type:   "D",                // 动车
		Max_capacity: 490,                // 最大载客量
		Seats: [][]uint{ // 座位布局
			{100, 100, 90, 100}, // 第一车厢，4 列座位
			{50, 50},            // 第二车厢，2 列座位
		}, // 座位总和为 490
		Avg_speed: 200.0, // 平均速度
	},
	{
		Name:         "Night Train T23", // 列车名
		Train_type:   "K",               // 普通火车（卧铺）
		Max_capacity: 800,               // 最大载客量
		Seats: [][]uint{ // 座位布局
			{200, 200, 200, 200}, // 第一车厢，4 列座位（卧铺）
		}, // 座位总和为 800
		Avg_speed: 90.0, // 平均速度
	},
}

var train_numbers = []TrainNumber{
	{
		Code:                "123",
		Status:              "Online",
		Start_time:          "2024-12-18 08:00",
		Dwell_time_per_stop: []uint16{5, 7, 10, 5},
		Train_name:          "Fuxing CR400AF",
		Route_name:          "Beijing - Shanghai High-Speed Line",
	},
	{
		Code:                "456",
		Status:              "Online",
		Start_time:          "2024-12-18 12:30",
		Dwell_time_per_stop: []uint16{3, 3, 5, 5},
		Train_name:          "Hexie CRH380B",
		Route_name:          "Guangzhou - Shenzhen Express Line",
	},
	{
		Code:                "789",
		Status:              "Offline",
		Start_time:          "2024-12-19 06:15",
		Dwell_time_per_stop: []uint16{15, 20},
		Train_name:          "Green Train K598",
		Route_name:          "Xi'an - Chengdu Line",
	},
	{
		Code:                "888",
		Status:              "Online",
		Start_time:          "2024-12-18 09:50",
		Dwell_time_per_stop: []uint16{8, 10},
		Train_name:          "Zhenghe D-series",
		Route_name:          "Wuhan - Hangzhou High-Speed Line",
	},
	{
		Code:                "1234",
		Status:              "Offline",
		Start_time:          "2024-12-20 14:00",
		Dwell_time_per_stop: []uint16{4, 5, 6, 4},
		Train_name:          "Night Train T23",
		Route_name:          "Guangzhou - Shenzhen Express Line",
	},
}

// 添加车站
func TestAddStation(t *testing.T) {
	// 登录并获取 token
	resp := Login(t, baseAdmin, baseAdminPassword)
	if resp == nil {
		return
	}

	// 添加车站
	url := baseURL + "/station"

	token := resp.Header.Get("Authorization")

	for _, station := range stations {
		resp = sendPOST(t, url, station, token)

		if resp.StatusCode != http.StatusOK {
			t.Fatalf("Expected status 200, got %d", resp.StatusCode)
		}

		var response Response
		json.NewDecoder(resp.Body).Decode(&response)
		if response.Code != 200 {
			t.Errorf("Expected response code 200, got %d", response.Code)
		}
	}
}

func TestGetStations(t *testing.T) {
	// 登录并获取 token
	resp := Login(t, baseAdmin, baseAdminPassword)
	if resp == nil {
		return
	}

	// 添加车站
	url := baseURL + "/station"

	token := resp.Header.Get("Authorization")

	resp = sendGET(t, url, token)

	if resp.StatusCode != http.StatusOK {
		t.Fatalf("Expected status 200, got %d", resp.StatusCode)
	}

	var response Response
	json.NewDecoder(resp.Body).Decode(&response)
	if response.Code != 200 {
		t.Errorf("Expected response code 200, got %d", response.Code)
	}
}

// 添加路线
func TestAddRoute(t *testing.T) {
	// 登录并获取 token
	resp := Login(t, baseAdmin, baseAdminPassword)
	if resp == nil {
		return
	}

	// 添加路线
	url := baseURL + "/route"

	token := resp.Header.Get("Authorization")
	for _, route := range routes {
		resp = sendPOST(t, url, route, token)

		if resp.StatusCode != http.StatusOK {
			t.Fatalf("Expected status 200, got %d", resp.StatusCode)
		}

		var response Response
		json.NewDecoder(resp.Body).Decode(&response)
		if response.Code != 200 {
			t.Errorf("Expected response code 200, got %d", response.Code)
		}
	}
}

func TestGetRoute(t *testing.T) {
	// 登录并获取 token
	resp := Login(t, baseAdmin, baseAdminPassword)
	if resp == nil {
		return
	}

	// 添加路线
	url := baseURL + "/route"

	token := resp.Header.Get("Authorization")

	resp = sendGET(t, url, token)

	if resp.StatusCode != http.StatusOK {
		t.Fatalf("Expected status 200, got %d", resp.StatusCode)
	}

	var response Response
	json.NewDecoder(resp.Body).Decode(&response)
	if response.Code != 200 {
		t.Errorf("Expected response code 200, got %d", response.Code)
	}
}

// 添加列车
func TestAddTrain(t *testing.T) {
	// 登录并获取 token
	resp := Login(t, baseAdmin, baseAdminPassword)
	if resp == nil {
		return
	}

	// 添加列车
	url := baseURL + "/train"
	token := resp.Header.Get("Authorization")
	for _, train := range trains {
		resp = sendPOST(t, url, train, token)

		if resp.StatusCode != http.StatusOK {
			t.Fatalf("Expected status 200, got %d", resp.StatusCode)
		}

		var response Response
		json.NewDecoder(resp.Body).Decode(&response)
		if response.Code != 200 {
			t.Errorf("Expected response code 200, got %d", response.Code)
		}
	}
}

func TestGetTrain(t *testing.T) {
	// 登录并获取 token
	resp := Login(t, baseAdmin, baseAdminPassword)
	if resp == nil {
		return
	}

	// 添加列车
	url := baseURL + "/train"
	token := resp.Header.Get("Authorization")

	resp = sendGET(t, url, token)

	if resp.StatusCode != http.StatusOK {
		t.Fatalf("Expected status 200, got %d", resp.StatusCode)
	}

	var response Response
	json.NewDecoder(resp.Body).Decode(&response)
	if response.Code != 200 {
		t.Errorf("Expected response code 200, got %d", response.Code)
	}

}

// 添加车次
func TestAddTrainNumber(t *testing.T) {
	// 登录并获取 token
	resp := Login(t, baseAdmin, baseAdminPassword)
	if resp == nil {
		return
	}

	// 添加车次
	url := baseURL + "/trainNumber"

	token := resp.Header.Get("Authorization")
	for _, train_number := range train_numbers {
		resp = sendPOST(t, url, train_number, token)

		if resp.StatusCode != http.StatusOK {
			t.Fatalf("Expected status 200, got %d", resp.StatusCode)
		}

		var response Response
		json.NewDecoder(resp.Body).Decode(&response)
		if response.Code != 200 {
			t.Errorf("Expected response code 200, got %d", response.Code)
		}
	}
}

func TestGetTrainNumber(t *testing.T) {
	// 登录并获取 token
	resp := Login(t, baseAdmin, baseAdminPassword)
	if resp == nil {
		return
	}

	// 添加车次
	url := baseURL + "/trainNumber"

	token := resp.Header.Get("Authorization")

	resp = sendGET(t, url, token)

	if resp.StatusCode != http.StatusOK {
		t.Fatalf("Expected status 200, got %d", resp.StatusCode)
	}

	var response Response
	json.NewDecoder(resp.Body).Decode(&response)
	if response.Code != 200 {
		t.Errorf("Expected response code 200, got %d", response.Code)
	}

}

// 查询单程车票
func TestOneWayTicketQuery(t *testing.T) {
	// 登录并获取 token
	resp := Login(t, user["phone"], user["password"])
	if resp == nil {
		return
	}

	// 查询单程车票
	url := baseURL + "/oneWayTickets"
	startStation := "Beijing"
	endStation := "Shanghai"
	// 假设你想设置时间范围
	preferences := map[string]string{
		"departure_time_after":  "2024-12-17 08:00",
		"departure_time_before": "2024-12-19 08:00",
		"arrival_time_before":   "2024-12-19 08:00",
		"arrival_time_after":    "2024-12-17 08:00",
	}
	requestBody := map[string]interface{}{
		"start_station": startStation,
		"end_station":   endStation,
		"preferences":   preferences,
	}

	resp = sendPOST(t, url, requestBody, "")

	if resp.StatusCode != http.StatusOK {
		t.Fatalf("Expected status 200, got %d", resp.StatusCode)
	}

	var response Response
	json.NewDecoder(resp.Body).Decode(&response)

	if response.Code != 200 {
		t.Errorf("Expected response code 200, got %d", response.Code)
	}

	// Ensure response contains data
	assert.NotNil(t, response.Data)
}
