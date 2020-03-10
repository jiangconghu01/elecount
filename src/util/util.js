import axios from 'axios';
axios.defaults.timeout = 50000
axios.defaults.withCredentials = true
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
//全路径请求
let baseUrl = '';
if(process.env.NODE_ENV === 'development'){
  baseUrl = 'http://galv.test.thingcom.com'
}else{
  baseUrl = 'http://galv.test.thingcom.com'
}
const http = {
  get (url, params) {
    params = params || {}
    return new Promise((resolve, reject) => {
      axios.get(baseUrl+url, { params: params })
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  post (url, params) {
    params = params || {}
    return new Promise((resolve, reject) => {
      // axios.post(url, qs.stringify(params))
      axios.post(baseUrl+url, params)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
const axiosUtil = axios;
export {http,axiosUtil} 
