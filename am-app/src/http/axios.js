/*
 * @Description: 
 * @Author: charles
 * @Date: 2021-12-14 20:42:55
 * @LastEditors: charles
 * @LastEditTime: 2021-12-14 21:57:24
 */
import axios from 'axios';
import qs from 'qs'
import {Toast} from 'vant'
import router from '../router'
import {getToken} from '../utils/auth'
// 全局配置
const baseURL = 'http://localhost:7001';

const service = axios.create({
  baseURL,
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    let token = getToken();
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // res就是后端返回来的结果， { status,message,data,timestamp}
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 200) {
      // 消息弹框
      if(res.status === 500){
        Toast.fail(res.message);
      }
      if (res.status === 401) {
        logout()
      }
      // 返回承诺失败对象
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' , error) // for debug
    return Promise.reject(error)
  }
)
export function get(url, params) {
  return service.get(url, {
    params, // get 请求时带的参数
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}
export function del(url, params) {
  return service.delete(url, {
    params, // get 请求时带的参数
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}

// 自定义post
export function post(url, data) {
  return service.post(url, qs.stringify(data), {
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}
export function postJSON(url, data) {
  return service.post(url,data)
}

// 退出
async function logout() {
  router.push(`/login`)
}

export default service;

