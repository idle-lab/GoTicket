
API 遵循 RESTful 风格， URL 只用于标识资源，URL 内只能由名词组成。

对资源的操作使用 http method 表示，常用 method 如下：

|Method|描述|
|:-:|:-:|
|GET|获取资源（如：获取用户信息，获取车次信息等）|
|POST|创建资源（如：注册用户，创建车次等）|
|PUT|更新资源（如：修改用户信息，车次信息等）|
|DELETE|删除资源（如：注销用户，删除车次等）|

## User

### 注册

该请求会创建一个新用户，并返一个 token（有效期为 10 min）。后续其他通信会用到该 token。

**请求：**

URL：`/user`

Method：`POST`

Body：

|字段名|类型|要求|
|:-:|:-:|:-:|
|name|string|不超过 20 byte|
|sex|string|enum('Male', 'Female')|
|password|string||
|phone|string|合法手机号|
|id_number|string|合法身份证号|


**服务器响应：**

Header:

`Authorization`: token

返回 token ，有效期为 10 分钟。

Body:

```json
{
    "code": 0,  // http 状态码
    "msg": "OK",  // 状态信息
    "data": { 
        "role": ... // 用户的身份，admin/user
    },
    "count": 1  // 返回的数据条数
}
```

### 注册管理员

该请求会创建一个新管理员，并返一个 token（有效期为 10 min）。系统会默认自带一个管理员，可以通过配置文件设置。其他管理员只能通过已存在的管理员添加。

**请求：**

URL：`/admin`

Method：`POST`

Header:

需要登录时获得的 token，用于判别是否为管理员

`Authorization`: token

**服务器响应：**

Body:

```json
{
    "code": 200,  // http 状态码
    "msg": "OK",  // http 状态信息
    "data": { 
        "role": ... // 用户的身份，admin/user
    },
    "count": 1  // 返回的数据条数
}
```

### 登录

**请求：**

URL：`/token`

Method：`GET`

Parm：

|字段名|类型|要求|
|:-:|:-:|:-:|
|phone|string|合法手机号|
|password|string||

**服务器响应：**

Header:

`Authorization`: token

改 token 有效期为 10 分钟。

Body:

```json
{
    "code": 0,  // http 状态码
    "msg": "OK",  // 状态信息
    "data": { 
        "role": ... // 用户的身份，admin/user
    },
    "count": 1  // 返回的数据条数
}
```

### 获取用户信息

该请求会返回 token 对应用户的所有基本信息。

**请求：**

URL：`/userInfo`

Method：`GET`

Header:

需要登录时获得的 token

`Authorization`: token

**服务器响应：**

Body:

```json
{
    "code": 200,  // http 状态码
    "msg": "OK",  // http 状态信息
    "data": { 
        "id": ...,  // 用户 id
        "name": ...,
        "sex": ...,
        "password": ...,
        "phone": ...,
        "create_date": ...,
        "id_number": ...,
        "role": ... // 用户的身份，admin/user
    },
    "count": 1  // 返回的数据条数
}
```

## Train

一下这些 API 和 车票查询相关


### 单程车票查询

你为服务器提供起点和终点（可以是城市名，或是车站名），服务器返回给你所有能到达目的地的车次信息。

**请求：**

URL：`/oneWayTickets`

Method：`GET`

Header:

需要登录时获得的 token

`Authorization`: token

起点和终点要以json格式在请求体中给出，并且给出对车票的要求。

目前可以指定出发时间和到达时间的范围，通过四个值 `departure_time_before``、departure_time_after`、`arrival_time_before`、`arrival_time_after`，列车的出发时间应该在 [departure_time_after, departure_time_before] 的范围内， 列车的到达时间应该在 [arrival_time_after, arrival_time_before] 的范围内。

```json
{
    "start_station": string,
    "end_station": string,
    "preferences": {
        "departure_time_before": string,
        "departure_time_after": string,
        "arrival_time_before": string,
        "arrival_time_after": string,
    }
}
```

**服务器响应：**

服务器在响应体中，以 json 格式返回所有满足条件的车次信息：

```json
{
    "code": 200,  // http 状态码
    "msg": "OK",  // http 状态信息
    "data": [
        {
            "code": string, // 车次号
            "stations": [string...], // 路线中所有的车站名
            "dwell_time_per_stop": [int...], // 列车在每站的停靠时间，单位 min
            "station_expected_departure_times": [string...], // 列车在每站的出发时间
            "start_station_offset": int, // 起点在 stations 中的下标
            "end_station_offset": int, // 终点在 stations 中的下标
            "price": float, // 车票价格
            "available_seats": int, // 剩余座位数量
            "seats": [[int...]...] // 二维数组，表示列车每个座位的售出情况
        }，
        ... // 其他车次
    ],
    "count": int // 返回的车次数量
}
```