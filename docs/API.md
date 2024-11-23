
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

请求：

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


响应：

Header:

`Authorization`: token

该 token 有效期为 10 分钟。

Body:

```json
{
    "code": 0,  // http 状态码
    "msg": "OK",  // 状态信息
    "data": { 
        "id": ... // 注册用户的 id
    },
    "count": 1  // 返回的数据条数
}
```

### 登录

请求：

URL：`/token`

Method：`GET`

Parm：

|字段名|类型|要求|
|:-:|:-:|:-:|
|phone|string|合法手机号|
|password|string||

响应：

Header:

`Authorization`: token

改 token 有效期为 10 分钟。

Body:

```json
{
    "code": 0,  // http 状态码
    "msg": "OK",  // 状态信息
    "data": { 
        "id": ... // 用户 id
    },
    "count": 1  // 返回的数据条数
}
```

### 获取用户信息


请求：

URL：`/user`

Method：`GET`

Header:

`Authorization`: token

响应：

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
        "id_number": ...
    },
    "count": 1  // 返回的数据条数
}
```