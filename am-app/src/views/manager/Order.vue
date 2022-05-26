<!--
 * @Description: 订单tab
 * @Author: charles
 * @Date: 2021-12-14 20:42:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 17:47:42
-->
<template>
    <div class="order">
        <van-nav-bar title="我的工单" />
        <van-tabs @change="changeActiveType" v-model="statusType" color="green" title-active-color='#69f06999'>
            <van-tab  background='green' title="进行中" ></van-tab>
            <van-tab title="已完成"></van-tab>
        </van-tabs>
    
    
       
            <!-- 订单列表 -->
            <van-list v-if="workOrderList.length" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="order_o"  v-for="o in workOrderList" :key="o.id">
                    <van-row>
                        <van-col span="6" style="text-align:center;font-size:48px">
                        <van-icon  name="balance-list-o" />
                        </van-col>
                        <van-col span=18>
                             <div>类型： {{o.type}} </div>
                             <div>状态： {{o.status}} </div>
                             <div>设备： {{o.device_name}} </div>
                             <div>工程： {{o.engineer_name}} </div>
                            <div> 申报时间： {{o.create_time|datefmt('YYYY-MM-DD HH:mm:ss')}}</div>
                            <div v-if="o.status=='已完成'"> 
                                完成时间：{{o.create_time|datefmt('YYYY-MM-DD HH:mm:ss')}}
                                </div>
                        </van-col>
                    </van-row>
          <div class="btns">
          <van-button v-if="o.status === '进行中'" color=green type="primary" size="large" @click="toCompeleteOrderHandler(o)" >完成</van-button>
        </div>
         <div class="btns">
          <van-button v-if="o.status === '已完成'" color=green type="primary" size="large" @click="toCompeleteOrderHandler(o)" >查看</van-button>
        </div>
                </div>
            </van-list>
            <div v-else class="noDataClass">
                暂无数据
            </div>
    </div>
</template>

<script>
import { get } from '../../http/axios'
export default {
    data() {
        return {
            workOrderList: [],
            statusType: 0,
            currentPage: 1,
            pageSize: 10,
            userId: this.$store.state.user.info.id,
            refreshing: false,
            loading: false,
            finished: false,
        }
    },

    created() {
        this.queryAllWorkOrder()
        // refreshInfo
    },
    methods: {

        changeActiveType() {
            this.workOrderList = []
            this.currentPage = 1
            this.finished = false
            this.refreshing = false
            this.loading = false
            this.queryAllWorkOrder()
           
        },

        // 多条件查询所有工单列表
        queryAllWorkOrder() {
            let param = {
                page: this.currentPage,
                pageSize: this.pageSize,
                status: this.statusType == 1 ? '已完成' : '进行中',
                account_id: this.userId
            }
            get('workorder/pageQuery', param).then(res => {
                if (res && res.status == 200 && res.data && res.data.list) {
                    if (res.data.list.length === 0) {
                        this.finished = true
                        return
                    }
                    if (res.data.list.length < this.pageSize) {
                        this.finished = true
                    }
                    if (this.currentPage == 1) {
                        this.workOrderList = res.data.list
                    } else {
                        this.workOrderList = this.workOrderList.concat(res.data.list)
                    }
                }
            }).finally(() => {
                this.refreshing = false
                this.loading = false
            })
        },

        // 下拉刷新
        onRefresh() {
            this.currentPage = 1
            this.finished = false
            this.queryAllWorkOrder()

        },
        onLoad() {
            this.currentPage++;
            this.queryAllWorkOrder()
        },

        // 跳转到订单详情页面  进行完成确认
        toCompeleteOrderHandler(row){
      this.$router.push({
        path:'/manager/Queren',
        query:row
      })
    },
        // 点击tab的时候执行的回调函数
        tabClickHandler(name, title) {
            // 修改当前data中status的值； 重新加载订单
            this.status = title === "全部" ? null : title;
            this.loadOrders();
        },
        // 加载我的订单
        loadOrders() {
            let url = "/order/query";
            let params = {
                customerId: this.info.id,
                status: this.status
            }
            get(url, params).then((response) => {
                this.orders = response.data;
            })
        }
    }
}
</script>

<style scoped>
.order {
    padding-bottom: 60px;
}

.order_o {
    margin: .5em 1em;
    padding: .5em;
    border-radius: 5px;
    height: 180px;
    border: 1px dotted #ccc;
    overflow: hidden;
}

.order_o img {
    width: 100%;
    border-radius: 3px;
}

.noDataClass {
    text-align: center;
    margin-top: 30px;
    color: rgba(105, 240, 105, 0.6);
}
 .btns {
  padding: .10em;
  text-align: center;
  margin-left: 500px;
  margin-right: 500px;
  
}
</style>