package jwt

import (
	"fmt"
	"time"

	"github.com/2418071565/GoTicket/dto"
	"github.com/golang-jwt/jwt/v5"
)

var jwt_key = []byte("goticket")

type Claims struct {
	Id   uint32
	Role string
	jwt.RegisteredClaims
}

func GenerateToken(user_id uint32, role string) (string, error) {
	claims := &Claims{
		Id:   user_id,
		Role: role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(2 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "goticket",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwt_key)
}

func ParseToken(token_str string) (*dto.User, error) {
	token, err := jwt.ParseWithClaims(token_str, &Claims{}, func(t *jwt.Token) (interface{}, error) {
		return jwt_key, nil
	})
	if err != nil {
		return nil, err
	}
	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return &dto.User{ID: claims.Id, Role: claims.Role}, nil
	}
	return nil, fmt.Errorf("token is invalid")
}
