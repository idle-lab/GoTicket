import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
  timeout: 5000, // 请求超时时间
  headers: {},
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error

    // 处理 401 未授权错误
    if (response?.status === 401) {
      // 处理未授权错误
    }

    // 处理后端返回的错误信息
    if (response?.data?.msg) {
      // 处理后端返回的错误信息
    }

    return Promise.reject(error.message || 'Network Error')
  },
)

// 封装 GET 请求
export const get = (url, params) => request.get(url, { params })

// 封装 POST 请求
export const post = (url, data, config) => request.post(url, data, config)

// 封装 PUT 请求
export const put = (url, data) => request.put(url, data)

// 封装 DELETE 请求
export const del = (url, params) => request.delete(url, { params })

export default request

