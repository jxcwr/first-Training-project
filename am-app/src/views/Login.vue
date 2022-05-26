<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-12-14 20:42:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 14:42:34
-->
<template>
  <div class="login">
    <div class="header">
      <div class="logo">环境</div>
      <div class="title">
        大气环境监测平台
      </div>
    </div>
    <div class="background">
    <img :src="imgSrc" width="100%" height="100%" alt="" />
</div>
    <van-notice-bar left-icon="volume-o" :scrollable="false">
  <van-swipe
    vertical
    class="notice-swipe"
    :autoplay="3000"
    :show-indicators="false"
  >
    <van-swipe-item>改善城区空气质量，创建生态宜居城镇。</van-swipe-item>
    <van-swipe-item>洁净的空气、幽雅的环境是我们共享的，每个人都应对环境保护尽一份义务。</van-swipe-item>
    <van-swipe-item>因为有你，地球才会如此美丽。</van-swipe-item>
    <van-swipe-item>改善空气质量，提高民众环保意识。</van-swipe-item>
    <van-swipe-item>坚定信心，狠抓源头，重拳出击，坚决打好大气污染治理攻坚战。</van-swipe-item>
    <van-swipe-item>治理大气污染，重现丽日蓝天。</van-swipe-item>
  </van-swipe>
</van-notice-bar>

    <div class="form">
      <van-cell-group>
        <van-field
          v-model="form.username"
          required
          clearable
          label="用户名"
          icon="question-o"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="form.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
      </van-cell-group>
      <div style="text-align:center;padding:1em" >
       <van-button 
        plain round 
        @click="loginHandler" 
        style="width:100%">登录</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      form:{
        type:'customer'
      },
      imgSrc:require('../assets/111.png')
    }
  },
  methods:{
    ...mapActions("user",["login"]),
    loginHandler(){
      this.login(this.form)
      .then(()=>{
        //跳转到首页
        this.$router.push({path:'/manager/home'})
      })
    }
  }
}
</script>
<style scoped>
.header {
  height: 140px;
  padding: 50px;
  color: #110e0e;
  background-color: #b6c963;
  text-align: center
}
.header .logo {
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  border: 1px solid #e9e2e2;
  margin: 0 auto;
  color:#eae9f3;
  font-weight: bold;
  margin-bottom: 1em;
  font-size: 1.5em
}
.background{
    width:100%;  
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
}
 
.front{
    z-index:1;
    position: absolute;
}
.header .title {
  font-size: 24px;
}
  .notice-swipe {
    height: 60px;
    line-height: 60px;
  }
</style>
