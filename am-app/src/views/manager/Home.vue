<!--
 * @Author: your name
 * @Date: 2021-12-16 19:03:06
 * @LastEditTime: 2021-12-22 17:08:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \therealoneiscoming-1\am-app\src\views\manager\Home.vue
-->
<template>
  <div class="home">
    <van-nav-bar title="首页" />
    
    <div class="order_list">
      <div class="order" v-for="o in workOrderData.list" :key="o.id">
        <div class="time">{{o.create_time|datefmt('YYYY-MM-DD HH:mm:ss')}}</div>
        <van-row>
          <van-col span="6" style="text-align:center;font-size:48px">
            <van-icon  name="balance-list-o" />
          </van-col>
          <van-col span="18" >
            <div>类型： {{o.type}} </div>
            <div>状态： {{o.status}} </div>
            <div>设备： {{o.device_name}} </div>
            <div>工程： {{o.engineer_name}} </div>
            <div> 申报时间： {{o.create_time|datefmt('YYYY-MM-DD HH:mm:ss')}}</div>
            <div>报修原因： {{o.bill_why}} </div>
          </van-col>
        </van-row>
        <div class="btns">
          <van-button plain hairline size="large" type="primary" @click="toTakeOrderHandler(o.id)">接单</van-button>
        </div>
      </div>
    </div>
   
  </div>
</template>
<script>
import {get} from '../../http/axios'
import {mapState} from 'vuex'
import {Toast} from 'vant'
export default {
  data(){
    return {
      params:{
        page:1,
        pageSize:10,
        status:'待接单'
      },
      workOrderData:{list:[]}
    }
  },
  computed: {
    ...mapState('user',['info'])
  },
  mounted() {
    this.loadWorkOrder();
  },
  methods:{
    // 接单
    toTakeOrderHandler(id){
      // 1. 获取工单id和用户id
      let account_id = this.info.id;
      let params = {id,account_id}
      // 2. 调用接口完成接单
      let url = "/workorder/takeOrder"
      get(url,params).then(resp => {
        // 3. 提示
        Toast.success(resp.message)
        this.loadWorkOrder();
      })
    },
    loadWorkOrder(){
      let url = "/workorder/pageQuery"
      get(url,this.params).then(resp => {
        this.workOrderData = resp.data;
      })
    }
  }
}
</script>
<style scoped>
.home {
  font-size: 14px;
  color: #666;
  padding-bottom: 50px;
  background-color: #f4f4f4;
}
.home .order_list{
  padding: .5em;
}
.home .order_list > .order {
  background-color: #fff;
  margin-bottom: .5em;
  border-radius: 5px;
  padding:.5em
}
.home .order_list > .order > .time {
  line-height: 2.4em;
  border-bottom: 1px solid #f4f4f4;
}
.home .order_list > .order > .btns {
  padding: .5em;
  text-align: right;
}
</style>