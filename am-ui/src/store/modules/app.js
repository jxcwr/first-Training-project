/*
 * @Description: 
 * @Author: charles
 * @Date: 2021-12-16 09:39:13
 * @LastEditors: charles
 * @LastEditTime: 2021-12-16 12:42:53
 */
import Cookies from 'js-cookie'
import {get} from '@/utils/request'
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  config:{}
}

const mutations = {
  SET_CONFIG:(state,config)=>{
    state.config = config;
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  loadConfig({commit}){
    // 查询所有基础配置信息
    get('/config/findAll').then(res => {
      let config = {};
      res.data.forEach(item => {
        config[item.name] = item.value
      })
      commit('SET_CONFIG',config)
    })
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
