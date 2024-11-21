package controllers

import (
	"fmt"
	"net/http"
	"regexp"
	"time"

	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/models"
	"github.com/2418071565/GoTicket/pkg/jwt"
	"github.com/2418071565/GoTicket/pkg/logger"
	"github.com/gin-gonic/gin"
)

func JWTAuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		token := ctx.GetHeader("Authorization")
		user, err := jwt.ParseToken(token)
		if err != nil {
			ReturnError(ctx, http.StatusUnauthorized, fmt.Sprintf("parse token failed with err: %s", err))
			logger.Warnf("invail token %s", token)
			ctx.Abort()
			return
		}
		ctx.Set("user", user)
	}
}

func GetInfo(ctx *gin.Context) {
	value, _ := ctx.Get("user")
	user, _ := value.(*dto.User)
	user, err := models.GetUser(user.ID)
	if err != nil {
		ReturnError(ctx, http.StatusInternalServerError, fmt.Sprintf("get user from database failed with err: %s", err))
		return
	}
	ReturnSuccess(ctx, http.StatusOK, "OK", user, 1)
}

func Login(ctx *gin.Context) {
	phone := ctx.Query("phone")
	if ok, err := regexp.MatchString(`^\d+$`, phone); !ok || err != nil {
		ReturnError(ctx, http.StatusBadRequest, "invalid phone number")
		return
	}
	password := ctx.Query("password")
	user, err := models.GetUserByPhone(phone)
	if err != nil {
		ReturnError(ctx, http.StatusBadRequest, fmt.Sprintf("login failed with err: %s", err))
		return
	}
	if user.Password != password {
		ReturnError(ctx, http.StatusOK, "phone or password is incorrect")
		return
	}
	token, err := jwt.GenerateToken(user.ID)
	if err != nil {
		ReturnError(ctx, http.StatusForbidden, fmt.Sprintf("generate token failed with err: %s", err))
		return
	}
	ctx.Header("Authorization", token)
	ReturnSuccess(ctx, 0, "OK", map[string]interface{}{"id": user.ID}, 1)
}

func Register(ctx *gin.Context) {
	name := ctx.PostForm("name")
	if len(name) > 20 {
		ReturnError(ctx, http.StatusBadRequest, "name cannot exceed 20 characters")
		return
	}
	sex := ctx.PostForm("sex")
	if sex != "Male" && sex != "Female" {
		ReturnError(ctx, http.StatusBadRequest, "invalid sex")
		return
	}
	password := ctx.PostForm("password")
	if len(password) > 20 {
		ReturnError(ctx, http.StatusBadRequest, "name cannot exceed 20 characters")
		return
	}
	phone := ctx.PostForm("phone")
	if ok, err := regexp.MatchString(`^\d+$`, phone); !ok || err != nil {
		ReturnError(ctx, http.StatusBadRequest, "invalid phone number")
		return
	}
	id_number := ctx.PostForm("id_number")
	if ok, err := regexp.MatchString(`^\d{15}$|^\d{17}(\d|X|x)$`, id_number); !ok || err != nil {
		ReturnError(ctx, http.StatusBadRequest, "invalid id_number")
		return
	}

	id, err := models.AddUser(&dto.User{
		Name:        name,
		Sex:         sex,
		Password:    password,
		Phone:       phone,
		Create_date: time.Now(),
		Id_number:   id_number,
	})
	if err != nil {
		logger.Errorf("add user to database failed with err: %s", err)
		ReturnError(ctx, http.StatusInternalServerError, fmt.Sprintf("add user failed with err: %s", err))
		return
	}
	token, err := jwt.GenerateToken(id)
	if err != nil {
		ReturnError(ctx, http.StatusForbidden, fmt.Sprintf("generate token failed with err: %s", err))
		return
	}
	ctx.Header("Authorization", token)
	ReturnSuccess(ctx, http.StatusOK, "OK", map[string]interface{}{"id": id}, 1)
}
