package logger

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"runtime/debug"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func init() {
	logrus.SetFormatter(&logrus.TextFormatter{
		FullTimestamp:   true,       // 显示完整时间戳
		TimestampFormat: "15:04:05", // 自定义时间格式
	})
	logrus.SetLevel(logrus.DebugLevel) // 默认等级为 Info
}

func SetLevel(level logrus.Level) {
	logrus.SetLevel(level)
}

func Debugf(format string, args ...interface{}) {
	SetOutputFile("Debug")
	logrus.Debugf(format, args...)
}

func Infof(format string, args ...interface{}) {
	SetOutputFile("Info")
	logrus.Infof(format, args...)
}

func Warnf(format string, args ...interface{}) {
	SetOutputFile("Warn")
	logrus.Warnf(format, args...)
}

func Errorf(format string, args ...interface{}) {
	SetOutputFile("Error")
	logrus.Errorf(format, args...)
}

// 输出 fatal 信息到日志，并终止系统
func Fatalf(format string, args ...interface{}) {
	SetOutputFile("Fatal")
	logrus.Fatalf(format, args...)
	os.Exit(-1)
}

// 检查日志目录是否存在，不存在就创建
func SetLogDir() {
	if _, err := os.Stat("./runtime/log"); os.IsNotExist(err) {
		err := os.MkdirAll("./runtime/log", 0777)
		if err != nil {
			panic(fmt.Errorf("create log dir ./runtime/log failed, error : %s", err))
		}
	}
}

// 设置输出到指定等级的 log 文件中
func SetOutputFile(level string) {
	SetLogDir()

	time_str := time.Now().Format("2006-01-02")
	var err error
	os.Stderr, err = os.OpenFile("./runtime/log/"+level+"_"+time_str+".log", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0777)
	if err != nil {
		panic(fmt.Errorf("create log dir %s, error : %s", level+"_"+time_str+".log", err))
	}

	logrus.SetOutput(os.Stderr)
}

func LogToFile() gin.LoggerConfig {
	SetLogDir()

	time_str := time.Now().Format("2006-01-02")
	var err error
	os.Stderr, err = os.OpenFile("./runtime/log/runtime_"+time_str+".log", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0777)
	if err != nil {
		panic(fmt.Errorf("create log dir %s, error : %s", "runtime_"+time_str+".log", err))
	}

	return gin.LoggerConfig{
		Formatter: func(params gin.LogFormatterParams) string {
			return fmt.Sprintf("[%s - %s] \"%s %s %d\" %s. %s\n",
				params.TimeStamp.Format("15:04:05"),
				params.ClientIP,
				params.Method,
				params.Path,
				params.StatusCode,
				params.Latency,
				params.ErrorMessage,
			)
		},
		Output: io.MultiWriter(os.Stdout, os.Stderr),
	}
}

func Recover(ctx *gin.Context) {
	defer func() {
		err := recover()
		if err == nil {
			return
		}
		SetLogDir()
		fmt.Println("111")
		time_str := time.Now().Format("2006-01-02")
		f, err_file := os.OpenFile("./runtime/log/runtime_fatal_"+time_str+".log", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0777)
		if err_file != nil {
			panic(fmt.Errorf("create log dir %s, error : %s", "runtime_fatal_"+time_str+".log", err))
		}
		defer f.Close()

		time_str = time.Now().Format("15:04:05")
		f.WriteString(fmt.Sprintf("panic error time: %s\n", time_str))
		f.WriteString(fmt.Sprintf("%s\n", err))
		f.WriteString(fmt.Sprintf("stack trace from panic: %s\n", debug.Stack()))
		ctx.JSON(http.StatusOK, struct {
			code    int
			message interface{}
		}{
			code:    -1,
			message: err,
		})
		// 停止执行当前接口的后续代码
		ctx.Abort()
	}()
	ctx.Next()
}
