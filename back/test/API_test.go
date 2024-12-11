package test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

type Response struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
	Data struct {
		Role string `json:"role"`
	} `json:"data"`
	Count int `json:"count"`
}

func TestCreateUser(t *testing.T) {
	// 构建请求体
	user := map[string]interface{}{
		"name":      "John Doe",
		"sex":       "Male",
		"password":  "Password123",
		"phone":     "13812345678",
		"id_number": "123456789012345678",
	}

	// 将请求体转换为 JSON 格式
	userJSON, err := json.Marshal(user)
	if err != nil {
		t.Fatalf("Error marshalling user data: %v", err)
	}

	// 发送 POST 请求创建用户
	req, err := http.NewRequest("POST", "http://localhost:8080/user", bytes.NewBuffer(userJSON))
	if err != nil {
		t.Fatalf("Error creating request: %v", err)
	}

	// 设置请求头
	req.Header.Set("Content-Type", "application/json")

	// 发送请求并获取响应
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		t.Fatalf("Error sending request: %v", err)
	}
	defer resp.Body.Close()
	// 检查 HTTP 状态码是否为 200 (OK)
	assert.Equal(t, http.StatusOK, resp.StatusCode, "Expected HTTP status code 200")

	// 检查响应的 Authorization 头是否存在
	authHeader := resp.Header.Get("Authorization")
	assert.NotEmpty(t, authHeader, "Authorization header should not be empty")

	// 解析响应体
	var apiResponse Response
	err = json.NewDecoder(resp.Body).Decode(&apiResponse)
	if err != nil {
		t.Fatalf("Error decoding response body: %v", err)
	}

	// 验证响应中的 code 和 msg
	assert.Equal(t, 200, apiResponse.Code, "Expected response code to be 0")
	assert.Equal(t, "OK", apiResponse.Msg, "Expected message to be OK")

	// 验证返回的用户角色
	assert.Contains(t, []string{"admin", "user"}, apiResponse.Data.Role, "Expected role to be 'admin' or 'user'")

	// 验证 count 是否为 1
	assert.Equal(t, 1, apiResponse.Count, "Expected count to be 1")
}

func TestCreateUser_InvalidPhone(t *testing.T) {
	// 构建请求体，使用无效的手机号
	user := map[string]interface{}{
		"name":      "John Doe",
		"sex":       "Male",
		"password":  "Password123",
		"phone":     "1234", // Invalid phone
		"id_number": "123456789012345678",
	}

	// 将请求体转换为 JSON 格式
	userJSON, err := json.Marshal(user)
	if err != nil {
		t.Fatalf("Error marshalling user data: %v", err)
	}

	// 发送 POST 请求创建用户
	req, err := http.NewRequest("POST", "http://localhost:8080/user", bytes.NewBuffer(userJSON))
	if err != nil {
		t.Fatalf("Error creating request: %v", err)
	}

	// 设置请求头
	req.Header.Set("Content-Type", "application/json")

	// 发送请求并获取响应
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		t.Fatalf("Error sending request: %v", err)
	}
	defer resp.Body.Close()

	// 检查 HTTP 状态码是否为 400 (Bad Request) 或 422（Unprocessable Entity）
	assert.Contains(t, []int{http.StatusBadRequest, http.StatusUnprocessableEntity}, resp.StatusCode, "Expected status code to be 400 or 422")

	// 解析响应体
	var apiResponse Response
	err = json.NewDecoder(resp.Body).Decode(&apiResponse)
	if err != nil {
		t.Fatalf("Error decoding response body: %v", err)
	}

	// 验证响应中的 code 和 msg
	assert.NotEqual(t, 0, apiResponse.Code, "Expected response code to be non-zero for invalid phone")
}
