package jwt

import (
	"fmt"
	"time"

	"github.com/2418071565/GoTicket/dto"
	"github.com/golang-jwt/jwt/v5"
)

var jwt_key = []byte("goticket")

type Claims struct {
	id uint32
	jwt.RegisteredClaims
}

func GenerateToken(user_id uint32) (string, error) {
	claims := &Claims{
		id: user_id,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(10 * time.Minute)),
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
		return &dto.User{ID: claims.id}, nil
	}
	return nil, fmt.Errorf("token is invalid")
}
