import axios from 'axios'
// import qs from 'query-string'
import { Toast } from 'vant'
import { devURL, proURL } from './const'

let service = axios.create({
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

service.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) config.headers['Authorization'] = token
    return config
  }, error => {
    // Do something with request error
    Toast.fail('发起请求异常，请稍候重试', '提示')
    console.log(error) // for debug
    Promise.reject(error)
})

export default function request(url, options) {
    const baseURL = process.env.NODE_ENV === 'development' ? devURL : proURL
    options.method = options.method ? options.method.toUpperCase() : 'GET'
    // if (options.method === 'GET' && options.params) {
    //   url = url + '?' + qs.stringify(options.params)
    // }
    // if (options.method === 'POST' && options.body) {
    //     options.body = JSON.stringify(options.body)
    // }
    return service({
        baseURL,
        url,
        ...options
    }).then(data => {
        return data.data
    })
    .catch(err => {
        const { status, data } = err.response
        if (status === 401) {
            return Promise.resolve(data)
        }
        Toast.fail(JSON.stringify(err))
    })
  }