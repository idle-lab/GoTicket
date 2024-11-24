package controllers

import (
	"fmt"
	"net/http"
	"regexp"

	"github.com/2418071565/GoTicket/dto"
	"github.com/2418071565/GoTicket/models"
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
			ReturnError(ctx, http.StatusUnauthorized, fmt.Sprintf("parse token failed with err: %s", err))
			logger.Warnf("invail token %s", token)
			ctx.Abort()
			return
		}
		ctx.Set("user", user)
	}
}

// 获取 User 所有信息
func GetInfo(ctx *gin.Context) {
	value, _ := ctx.Get("user")
	user := value.(*dto.User)
	user, err := models.GetUserById(user.ID)
	if err != nil {
		ReturnError(ctx, http.StatusInternalServerError, fmt.Sprintf("get user from database failed with err: %s", err))
		return
	}
	ReturnSuccess(ctx, http.StatusOK, "OK", user, 1)
}

func Login(ctx *gin.Context) {
	// 获取识别用户的消息
	phone := ctx.Query("phone")
	if ok, err := regexp.MatchString(`^\d+$`, phone); !ok || err != nil {
		ReturnError(ctx, http.StatusBadRequest, "invalid phone number")
		return
	}
	password := ctx.Query("password")

	// 判断是否存在该用户，如果存在判断密码是否正确
	user, err := models.GetUserByPhone(phone)
	if err != nil {
		ReturnError(ctx, http.StatusBadRequest, fmt.Sprintf("login failed with err: %s", err))
		return
	}
	if user.Password != password {
		ReturnError(ctx, http.StatusOK, "phone or password is incorrect")
		return
	}

	// 生成 token，返回给用户
	if err := services.GenerateToken(ctx, user.ID, user.Is_admin); err != nil {
		ReturnError(ctx, http.StatusBadRequest, err)
		return
	}
	ReturnSuccess(ctx, 0, "OK", map[string]interface{}{"is_admin": user.Is_admin}, 1)
}

func Register(ctx *gin.Context) {
	user, err := services.GetUserInfoFromPostBody(ctx)
	if err != nil {
		ReturnError(ctx, http.StatusBadRequest, err)
		return
	}
	// 判断用户是否已经存在
	if ok, err := models.IsUserExists(user.Phone); ok {
		ReturnError(ctx, http.StatusBadRequest, "this phone has already been registered")
		return
	} else if err != nil && !gorm.IsRecordNotFoundError(err) {
		ReturnError(ctx, http.StatusBadRequest, err)
		return
	}

	// 将信息添加进用户表中
	id, err := models.AddUser(user)
	if err != nil {
		logger.Errorf("add user to database failed with err: %s", err)
		ReturnError(ctx, http.StatusInternalServerError, fmt.Sprintf("add user failed with err: %s", err))
		return
	}

	// 生成 token
	if err := services.GenerateToken(ctx, id, false); err != nil {
		ReturnError(ctx, http.StatusBadRequest, err)
		return
	}
	ReturnSuccess(ctx, http.StatusOK, "OK", map[string]interface{}{"is_admin": false}, 1)
}

func AdminRegister(ctx *gin.Context) {
	// 判断调用 api 的用户是否为管理员，只要管理员可以添加管理员
	value, _ := ctx.Get("user")
	admin := value.(*dto.User)
	if !admin.Is_admin {
		ReturnError(ctx, http.StatusBadRequest, "you are not an admin")
		return
	}

	new_admin, err := services.GetUserInfoFromPostBody(ctx)
	if err != nil {
		ReturnError(ctx, http.StatusBadRequest, fmt.Sprintf("%s", err))
		return
	}

	// 判断用户是否已经存在
	if ok, err := models.IsUserExists(new_admin.Phone); !ok {
		if err != nil && !gorm.IsRecordNotFoundError(err) {
			ReturnError(ctx, http.StatusBadRequest, err)
			return
		}
		// 如果用户不存在，先创建一个用户再将其添加进管理员表中
		id, err := models.AddUser(new_admin)
		if err != nil {
			logger.Errorf("add user to database failed with err: %s", err)
			ReturnError(ctx, http.StatusInternalServerError, fmt.Sprintf("add user failed with err: %s", err))
			return
		}
		new_admin.ID = id
	}

	// 将信息添加进管理员表中
	if err := models.AddAdmin(new_admin); err != nil {
		logger.Errorf("add user to database failed with err: %s", err)
		ReturnError(ctx, http.StatusInternalServerError, fmt.Sprintf("add user failed with err: %s", err))
		return
	}
	ReturnSuccess(ctx, http.StatusOK, "OK", map[string]interface{}{"is_admin": true}, 0)
}
