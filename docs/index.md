
## 规范

### 命名

类名和函数名采用驼峰命名法，一些专有名词应全部大写，变量应采用蛇形命名法。如要控制包外的可见性，函数的首字母小写，其余按驼峰命名法命名，专有名词开头的单词应全部小写：

```go
// 包外可见
// 函数名
LogToFile()
POSTUser()
// 变量名
var Time_str
var DB

// 包内可见
// 函数名
logToFile()
postUser()
// 变量名
var time_str
var db
```

宏、全局常量、配置信息名字的单词间要用 `_` 分隔，且全部大写：

```go
DB_HOST
DB_MAX_IDLE_CONNS
```

目录及文件名要遵循蛇形命名法。

### API

遵循 RESTful 风格，URI 只标识资源，如：用户，订单，车票等等，使用 HTTP 做动词标识对资源的各种操作，对资源的增删查改，分别对应 POST、DELETE、GET、PUT。

如：添加一个用户，AIP 应为

```
Method: POST
URI: /user/:id
```

### 其他

字符串应使用双引号 `""` 括起来而非 \``。 \`` 只应出现在类的成员变量的 comments 中。

```go
// 字符串
"Hello GoTicket"

// comments
type Ticket struct {
  name string `This is a exmaple`
}
```