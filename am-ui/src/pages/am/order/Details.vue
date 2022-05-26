<!--
 * @Description: 工单详情
 * @Author: charles
 * @Date: 2021-12-14 22:10:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 17:50:01
-->
<template>
  <div class="workorder_details">
    <el-button type="primary" size="small" @click="backhandler">返回</el-button>
    {{workorder}}
    <div class="workorder">
      <h3>工单信息</h3>
      <el-row>
        <el-col :span="12">
          <span class="label">工程名称</span>
          <span class="value">{{workorder.workorder_name}}</span>
        </el-col>       
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">设备名称</span>
          <span class="value">{{workorder.device_name}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">维修工</span>
          <span class="value">{{workorder.account_name}}</span>
        </el-col>        
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">报修原因</span>
          <span class="value">{{workorder.bill_why}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">完成记录</span>
          <span class="value">{{workorder.finish_note}}</span>
        </el-col>        
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">类型</span>
          <span class="value">{{workorder.type}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">状态</span>
          <span class="value">{{workorder.status}}</span>
        </el-col>
      </el-row>
    </div>  

  </div>
</template>
<script>
import {get} from '@/utils/request'
export default {
  data(){
    return {
      workorder:{},
     
    }
  },
  mounted() {
    this.workorder = this.$route.query;
  },
  methods:{
    backhandler(){
      this.$router.go(-1);
    }
  }
}
</script>
<style scoped>
.workorder_details .workorder .label{
  font-weight: bold;
  padding-right: 5px;
  line-height: 2.4em;
}
</style>