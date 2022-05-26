<!--
 * @Description: 我的tab
 * @Author: charles
 * @Date: 2021-12-14 20:42:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 17:14:09
-->
<template>
  <div class="user">
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
    <div class="header">
      <div class="photo">
        <img src="../../assets/user.png" alt=""/>
      </div>
      <div class="name">{{info.name}}</div>
    </div>
    
   <van-card
  
  desc="联系电话：13466779980"
  title="姓名：张明"
  thumb="https://img0.baidu.com/it/u=3705666842,2065486013&fm=26&fmt=auto"
  /> 
  <van-icon name="point-gift"size="50" />
  <van-cell is-link @click="showPopup" >积分商城</van-cell>
  <van-popup v-model="show"position="top" :style="{ height: '30%' }" >商品推荐</van-popup>
  
  <!-- 优惠券单元格 -->
<van-icon name="vip-card"size="50" />
<van-coupon-cell
  :coupons="coupons"
  :chosen-coupon="chosenCoupon"
  @click="showList = true"
/>
<!-- 优惠券列表 -->
<van-popup
  v-model="showList"
  round
  position="bottom"
  style="height: 90%; padding-top: 4px;"
>
  <van-coupon-list
    :coupons="coupons"
    :chosen-coupon="chosenCoupon"
    :disabled-coupons="disabledCoupons"
    @change="onChange"
    @exchange="onExchange"
  />
</van-popup>
   <van-icon name="balance-list"size="50" />
   <van-panel title="每日任务" desc="任务内容" status="状态">
  <template #footer>
    
    <van-button plain hairline size="mini" type="primary" @click="toTakeOrderHandler(o.id)">完成</van-button>
  </template>
</van-panel>

  
  

  
  <van-cell title="所有订单" is-link to="/manager/order" />
    
  <van-cell title="客户评价" is-link to="/manager/pj" />

   
    <div class="btn" @click="logoutHandler"> 退出 </div>
  </div>
</template>
<script>

import {mapState, mapActions} from 'vuex'
import Vue from 'vue';
import { Popup } from 'vant';
import { CouponCell, CouponList } from 'vant';
Vue.use(CouponCell);
Vue.use(CouponList);
Vue.use(Popup);
export default {
  data() {
    return {
      
      show: false,
      imgSrc:require('../../assets/222.png')
    };
  },
 
methods:{
      showPopup() {
      this.show = true;
    },
    
    
    ...mapActions('user',['logout']),
    logoutHandler(){
      this.logout();
    }
  },
  
  computed:{
    ...mapState("user",["info"])
  }
}
</script>

<style scoped>
.header {
  padding-top: 46px;
  text-align: center;
  background-image: "https://img2.baidu.com/it/u=1743823583,3125439648&fm=253&fmt=auto&app=138&f=PNG?w=311&h=231";
  margin-bottom: 2em;
}

.header .photo {
  margin: 0 auto;
  width: 10em;
  height: 10em;
  border-radius: 10%;
  box-sizing: border-box;
  border:1px solid #a74c54;
  overflow:hidden;
  padding: 1em;
}
.header .name {
  line-height: 3em;
  font-size: 16px;
  color: #e6dfdf;

}
.header .photo img {
 width: 100%;
 border-radius: 50%;
}

.btn {
  width: 90%;
  margin: 1em auto;
  line-height: 3em;
  text-align: center;
  border: 1px solid #110303;
  border-radius: 1.5em;
}
.background{
    width:1870px;  
    height:210px;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
}
 
.front{
    z-index:1;
    position: absolute;
}
.van-popup{
  font-size: 40px;
}
</style>
