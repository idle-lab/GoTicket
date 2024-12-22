package controllers

import (
	"fmt"
	"net/http"
	"regexp"

	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/models"
	"github.com/2418071565/GoTicket/pkg/config"
	"github.com/2418071565/GoTicket/pkg/jwt"
	"github.com/2418071565/GoTicket/pkg/logger"
	"github.com/2418071565/GoTicket/services"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

// 鉴权中间件
func JWTAuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		token := ctx.GetHeader("Authorization")
		user, err := jwt.ParseToken(token)
		if err != nil {
			logger.Warnf("invail token %s", token)
			ReturnError(ctx, &dto.JsonErrorStruct{
				Code:    http.StatusUnauthorized,
				Message: fmt.Sprintf("parse token failed with err: %s", err),
			})
			ctx.Abort()
			return
		}
		ctx.Set("user", user)
	}
}

// 获取 User 所有信息
func GetUserInfo(ctx *gin.Context) {
	value, _ := ctx.Get("user")
	user := value.(*dto.User)
	user, err := models.User{}.GetUserById(user.ID)
	if err != nil {
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusInternalServerError,
			Message: fmt.Sprintf("get user from database failed with err: %s", err),
		})
		return
	}
	ReturnSuccess(ctx, &dto.JsonStruct{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    user,
		Count:   1,
	})
}

func Login(ctx *gin.Context) {
	// 获取识别用户的消息
	phone := ctx.Query("phone")
	if ok, err := regexp.MatchString(`^\d+$`, phone); (!ok || err != nil) && phone != config.DEFAULT_ADMIN {
		logger.Infof("login failed with invalid phone number: %s.\n", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: "invalid phone number",
		})
		return
	}
	password := ctx.Query("password")

	user, err := services.Authentication(ctx, phone, password)
	if err != nil {
		ReturnError(ctx, err)
	}
	ReturnSuccess(ctx, &dto.JsonStruct{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    map[string]interface{}{"role": user.Role},
		Count:   1,
	})
}

func Register(ctx *gin.Context) {
	user, err := services.GetUserInfoFromRequest(ctx)
	if err != nil {
		logger.Infof("register failed with invalid user info: %s\n", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
		return
	}

	// 判断用户是否已经存在
	ok, err := models.User{}.IsUserExists(user.Phone)
	if ok {
		logger.Infof("this phone has already been registered: %s.\n", user.Phone)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: "this phone has already been registered",
		})
		return
	} else if err != nil && !gorm.IsRecordNotFoundError(err) {
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
		return
	}

	// 将信息添加进用户表中
	err = models.User{}.AddUser(user)
	if err != nil {
		logger.Errorf("add user to database failed with err: %s", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusInternalServerError,
			Message: fmt.Sprintf("add user failed with err: %s", err),
		})
		return
	}

	// 生成 token
	if err := services.GenerateToken(ctx, user.ID, "admin"); err != nil {
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
		return
	}
	ReturnSuccess(ctx, &dto.JsonStruct{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    map[string]interface{}{"role": "user"},
		Count:   1,
	})
}

func AdminRegister(ctx *gin.Context) {
	// 判断调用 api 的用户是否为管理员，只要管理员可以添加管理员
	value, _ := ctx.Get("user")
	admin := value.(*dto.User)
	if admin.Role != "admin" {
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: "you are not an admin",
		})
		return
	}

	new_admin, err := services.GetUserInfoFromRequest(ctx)
	if err != nil {
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
		return
	}

	// 判断用户是否已经存在
	ok, err := models.User{}.IsUserExists(new_admin.Phone)
	if ok {
		// 已经是管理员了
		if new_admin.Role == "admin" {
			ReturnSuccess(ctx, &dto.JsonStruct{
				Code:    http.StatusOK,
				Message: "OK",
				Data:    map[string]interface{}{"role": "admin"},
				Count:   1,
			})
			return
		}
		err = models.Admin{}.ChangeToAdmin(new_admin)
		if err != nil {
			logger.Errorf("change user to admin failed with err: %s", err)
			ReturnError(ctx, &dto.JsonErrorStruct{
				Code:    http.StatusBadRequest,
				Message: "change user to admin failed",
			})
			return
		}
	} else {
		if err != nil && !gorm.IsRecordNotFoundError(err) {
			ReturnError(ctx, &dto.JsonErrorStruct{
				Code:    http.StatusBadRequest,
				Message: err.Error(),
			})
			return
		}
		// 将信息添加进管理员表中
		err = models.Admin{}.AddAdmin(new_admin)
		if err != nil {
			logger.Errorf("add admin to database failed with err: %s", err)
			ReturnError(ctx, &dto.JsonErrorStruct{
				Code:    http.StatusBadRequest,
				Message: "add admin failed",
			})
			return
		}
	}

	ReturnSuccess(ctx, &dto.JsonStruct{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    map[string]interface{}{"role": "admin"},
		Count:   1,
	})
}


func ChangeUserInfo(ctx *gin.Context) {
	user, err := services.GetUserInfoFromRequest(ctx)
	if err != nil {
		logger.Infof("invalid user info: %s\n", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
		return
	}

	err = models.User{}.GhangeUserInfo(user)
	if err != nil {
		logger.Infof("update user info failed with err: %s\n", err)
		ReturnError(ctx, &dto.JsonErrorStruct{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
		return
	}

	ReturnSuccess(ctx, &dto.JsonStruct{
		Code:    http.StatusOK,
		Message: "OK",
		Count:   0,
	})
}
