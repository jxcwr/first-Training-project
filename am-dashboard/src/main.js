/*
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 16:39:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 16:59:08
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/layout.scss'
import {createStore} from 'vuex'

const store = createStore({
  state(){
    return {
      ed:{
        engineer_id:0,
        device_id:0
      }
    }
  },
  mutations:{
    SET_ED(state,ed){
      state.ed = ed;
    }
  }
})

createApp(App).use(router).use(store).mount('#app')
