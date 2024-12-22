
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

```json
{
    "name": string,  // 姓名
    "sex": string,  // 'Male', 'Female'
    "password": string, // 密码
    "phone": string,  // 手机号
    "id_number": string,  // 身份证号
}
```


**服务器响应：**

Header:

`Authorization`: token

返回 token ，有效期为 10 分钟。

Body:

```json
{
    "code": 200,  // http 状态码
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
    "code": 200,  // http 状态码
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

### 修改用户信息

该请求会修改用户的信息，需要给服务器传递要修改用户的id，以及修改后的用户的信息。

**请求：**

URL：`/user`

Method：`PUT`

需要登录时获得的 token

`Authorization`: token

Body：

```json
{
    "id": int, // 要求改用户的 id
    "name": string,  // 姓名
    "sex": string,  // 'Male', 'Female'
    "password": string, // 密码
    "phone": string,  // 手机号
    "id_number": string,  // 身份证号
}
```


**服务器响应：**

Header:

`Authorization`: token

返回 token ，有效期为 10 分钟。

Body:

```json
{
    "code": 200,  // http 状态码
    "msg": "OK",  // 状态信息
    "count": 0  // 返回的数据条数
}
```

## Train

一下这些 API 和 车票查询相关。

### 添加车站

这个 API 需要管理员权限，你需要提供车站所在的城市，以及车站的名字。

**请求：**

URL: `/admin/station`

Method：`POST`

Header:需要登录时获得的 token

`Authorization`: token

Body：以 json 格式给出路线名字，路线经过的车站

```json
{
    "name": string, // 车站名
    "postion": string // 车站所在城市
}
```

**服务器响应：**

```json
{
    "code": 200,  // http 状态码
    "msg": "OK",  // 状态信息
    "count": 0  // 返回的数据条数
}
```

### 查询所有车站

**请求：**

URL: `/station`


Method：`GET`

Header:需要登录时获得的 token

`Authorization`: token


**服务器响应：**

```json
{
    "code": 200,  // http 状态码
    "msg": "OK",  // 状态信息
    "data": [
        {
            "id": int,  // 车站 id
            "name": string,  // 车站名
            "postion": string,  // 车站所在城市
        },
        ...
    ],
    "count": 0  // 返回的数据条数
}
```

### 添加路线

这个 API 需要管理员权限，你需要提供路线的名字，路线所经过车站的车站名，该路线每km的价格，以及每站到起点站的距离。

**请求：**

URL: `/admin/route`

Method：`POST`

Header:需要登录时获得的 token

`Authorization`: token

Body：以 json 格式给出路线名字，路线经过的车站

```json
{
    "name": string, // 这条路线的名字，可以不提供
    "stations": [string...], // 经过的所有车站名
    "price_pk": float, // 单位：元/km
    "distance_from_start": [float...] // 每站到起点站的距离。
}
```

**服务器响应：**

```json
{
    "code": 200,  // http 状态码
    "msg": "OK",  // 状态信息
    "count": 0  // 返回的数据条数
}
```
### 查询所有路线

**请求：**


URL: `/route`

Method：`GET`

Header:需要登录时获得的 token

`Authorization`: token

**服务器响应：**

```json
{
    "code": 200,  // http 状态码
    "msg": "OK",  // 状态信息
    "data": [
        {
            "id": int,// 这条路线的id
            "name": string ,// 这条路线的名字
            "price_pk": float, // 单位：元/km
            "stations": [string...], // 经过的所有车站名,
            "distance_from_start": [float...] // 每站到起点站的距离。
        },
        ...
    ],
    "count": 0  // 返回的数据条数
}
```


### 添加列车

这个 API 需要管理员权限，你需要提供列车的类型（高铁、动车或普通火车），列车最大容量，座位布局，平局速度。

对于列车布局，这是一个二维数组，第一维表示车厢号，第二维表示座位列号，数字表示该列还剩几个座位，例如：`seats[6][2]`，表示 7 号车厢，第 3 列还剩下的座位数，因为数组下标从 0 开始，所以要 加一。

通常用户不会很在意自己所在行，更在意所在列，大部分喜欢坐窗边或过道，所以我们提供每个车厢每列的个数，方便运算。

**请求：**

URL: `/admin/train`

Method：`POST`

Header:需要登录时获得的 token

`Authorization`: token

Body：以 json 格式给出路线名字，路线经过的车站

```json
{
    "name": string, // 列车名，如：复兴号CR400
    "train_type": string, // 列车的类型，取值为（'G','D','K'）
    "max_capacity": int, // 列车最大容量
    "seats": [[int...]...], // 座位布局
    "avg_speed": float // 平均速度，单位 km/h
}
```



**服务器响应：**

```json
{
    "code": 200,  // http 状态码
    "msg": "OK",  // 状态信息
    "count": 0  // 返回的数据条数
}
```

### 查询所有列车

**请求：**

URL: `/train`

Method：`GET`

Header:需要登录时获得的 token

`Authorization`: token


**服务器响应：**

```json
{
    "code": 200,  // http 状态码
    "msg": "OK",  // 状态信息
    "data": [
        {
            "id": int,  // 车站 id
            "name": string,  // 列车名
            "train_type": string,  // 列车类型
            "max_capacity": string,  // 列车最大容量
            "seats": string,  // 列车座位数组，这里是序列化为字符串的格式
            "avg_speed": float,  // 平均速度
        },
        ...
    ],
    "count": 0  // 返回的数据条数
}
```


### 添加车次

这个 API 需要管理员权限，你需要提供车次的车次号，状态，车次执行时间，该车次每站的停留时间，车次开始时间，执行该车次的列车名，该车次执行的路线名。

**请求：**

URL: `/admin/trainNumber`

Method：`POST`

Header:需要登录时获得的 token

`Authorization`: token

Body：以 json 格式给出路线名字，路线经过的车站

```json
{
    "code": string, // 车次号
    "status": string, // 车次状态，enum('Online','Offline')
    "start_time": string, // 车次开始时间，格式：YYYY-MM-DD HH:mm
    "dwell_time_per_stop": [[int...]...], // 每站停留时间，单位 min
    "train_name": string, // 执行该车次的列车名
    "route_name": string, // 该车次执行的路线名
}
```



**服务器响应：**

```json
{
    "code": 200,  // http 状态码
    "msg": "OK",  // 状态信息
    "count": 0  // 返回的数据条数
}
```

### 查询所有车次

**请求：**

URL: `/trainNumber`

Method：`GET`

Header:需要登录时获得的 token

`Authorization`: token


**服务器响应：**

```json
{
    "code": 200,  // http 状态码
    "msg": "OK",  // 状态信息
    "data": [
        {
            "id": int, // 车次id
            "code": string, // 车次号
            "status": string, // 车次状态，enum('Online','Offline')
            "start_time": string, // 车次开始时间，格式：YYYY-MM-DD HH:mm
            "dwell_time_per_stop": [[int...]...], // 每站停留时间，单位 min
            "train_name": string, // 执行该车次的列车名
            "route_name": string, // 该车次执行的路线名
        },
        ...
    ],
    "count": 0  // 返回的数据条数
}
```

### 单程车票查询

你为服务器提供起点和终点（可以是城市名，或是车站名），服务器返回给你所有能到达目的地的车次信息。

**请求：**

URL：`/oneWayTickets`

Method：`POST`

Header:

需要登录时获得的 token

`Authorization`: token

起点和终点要以json格式在请求体中给出，并且给出对车票的要求。

目前可以指定出发时间和到达时间的范围，通过四个值 `departure_time_before``、departure_time_after`、`arrival_time_before`、`arrival_time_after`，列车的出发时间应该在 [departure_time_after, departure_time_before] 的范围内， 列车的到达时间应该在 [arrival_time_after, arrival_time_before] 的范围内。

时间格式为 `YYYY-MM-DD HH-mm`，精确到分钟。

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