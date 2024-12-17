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

type station struct {
	Name    string `json:"name"`
	Postion string `json:"position"`
}

type route struct {
	Name                string          `json:"name"`
	Stations            []string        `json:"stations"`
	Price_pk            decimal.Decimal `json:"price_pk"`
	Distance_from_start []float64       `json:"distance_from_start"`
}

var stations = []station{
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

var routes = []route{
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

// 添加列车
func TestAddTrain(t *testing.T) {
	// 登录并获取 token
	resp := Login(t, baseAdmin, baseAdminPassword)
	if resp == nil {
		return
	}

	// 添加列车
	url := baseURL + "/train"
	train := map[string]interface{}{
		"name":         "CRH380A",
		"train_type":   "G",
		"max_capacity": 500,
		"seats":        [][]int{{5, 4}, {10, 5}},
		"avg_speed":    300,
	}

	token := resp.Header.Get("Authorization")
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

// 添加车次
func TestAddTrainNumber(t *testing.T) {
	// 登录并获取 token
	resp := Login(t, baseAdmin, baseAdminPassword)
	if resp == nil {
		return
	}

	// 添加车次
	url := baseURL + "/trainNumber"
	trainNumber := map[string]interface{}{
		"code":                "G101",
		"status":              "Online",
		"start_time":          "2024-12-20 08:00",
		"dwell_time_per_stop": []int{5, 6, 7},
		"train_name":          "CRH380A",
		"route_name":          "Route A",
	}

	token := resp.Header.Get("Authorization")
	resp = sendPOST(t, url, trainNumber, token)

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
		"departure_time_after":  "2024-12-20 00:00",
		"departure_time_before": "2024-12-25 23:59",
		"arrival_time_after":    "2024-12-20 00:00",
		"arrival_time_before":   "2024-12-25 23:59",
	}
	requestBody := map[string]interface{}{
		"start_station": startStation,
		"end_station":   endStation,
		"preferences":   preferences,
	}

	token := resp.Header.Get("Authorization")
	resp = sendPOST(t, url, requestBody, token)

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

func TestMain(m *testing.M) {
	m.Run()
}
