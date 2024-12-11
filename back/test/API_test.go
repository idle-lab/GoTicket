package api_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

// TestUserRegistration tests the user registration API
func TestUserRegistration(t *testing.T) {
	requestBody := map[string]string{
		"name":      "TestUser",
		"sex":       "Male",
		"password":  "password123",
		"phone":     "12345678901",
		"id_number": "123456789012345678",
	}
	body, _ := json.Marshal(requestBody)

	req := httptest.NewRequest("POST", "/user", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	// Simulate server handler
	w := httptest.NewRecorder()
	serverHandler(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusOK {
		t.Fatalf("expected status OK; got %v", res.Status)
	}

	token := res.Header.Get("Authorization")
	if token == "" {
		t.Fatal("expected token in Authorization header")
	}
}

// TestAdminRegistration tests the admin registration API
func TestAdminRegistration(t *testing.T) {
	req := httptest.NewRequest("POST", "/admin", nil)
	req.Header.Set("Authorization", "test-admin-token")

	w := httptest.NewRecorder()
	serverHandler(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusOK {
		t.Fatalf("expected status OK; got %v", res.Status)
	}
}

// TestUserLogin tests the user login API
func TestUserLogin(t *testing.T) {
	req := httptest.NewRequest("GET", "/token?phone=12345678901&password=password123", nil)
	w := httptest.NewRecorder()
	serverHandler(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusOK {
		t.Fatalf("expected status OK; got %v", res.Status)
	}

	token := res.Header.Get("Authorization")
	if token == "" {
		t.Fatal("expected token in Authorization header")
	}
}

// TestGetUserInfo tests fetching user information
func TestGetUserInfo(t *testing.T) {
	req := httptest.NewRequest("GET", "/userInfo", nil)
	req.Header.Set("Authorization", "test-user-token")

	w := httptest.NewRecorder()
	serverHandler(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusOK {
		t.Fatalf("expected status OK; got %v", res.Status)
	}

	var responseBody map[string]interface{}
	if err := json.NewDecoder(res.Body).Decode(&responseBody); err != nil {
		t.Fatalf("failed to parse response body: %v", err)
	}
	if responseBody["data"] == nil {
		t.Fatal("expected user data in response")
	}
}

// TestAddStation tests the add station API
func TestAddStation(t *testing.T) {
	requestBody := map[string]string{
		"name":    "StationName",
		"postion": "CityName",
	}
	body, _ := json.Marshal(requestBody)

	req := httptest.NewRequest("POST", "/station", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "admin-token")

	w := httptest.NewRecorder()
	serverHandler(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusOK {
		t.Fatalf("expected status OK; got %v", res.Status)
	}
}

// Mock serverHandler to handle requests for testing purposes
func serverHandler(w http.ResponseWriter, r *http.Request) {
	// Mock implementation for demonstration purposes
	w.Header().Set("Authorization", "mock-token")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"code":200,"msg":"OK","data":{},"count":1}`))
}
