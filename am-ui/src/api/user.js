/*
 * @Description: 
 * @Author: charles
 * @Date: 2021-12-16 09:39:13
 * @LastEditors: charles
 * @LastEditTime: 2021-12-16 13:00:42
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/getInfo',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}
