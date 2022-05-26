<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-12-14 22:17:25
 * @LastEditors: Please set LastEditors

=======
 * @LastEditTime: 2021-12-22 17:48:42
-->
<template>
  <div class="engineer_details">
    <el-button type="text" size="small" @click="backhandler">返回</el-button>
    <div class="engineer">
      <h3>工程信息</h3>
      <el-row>
        <el-col :span="12">
          <span class="label">工程名称</span>
          <span class="value">{{engineer.name}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">工程编号</span>
          <span class="value">{{engineer.serial_number}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">工程状态</span>
          <span class="value">{{engineer.status}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">工程类型</span>
          <span class="value">{{engineer.type}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">工程地址</span>
          <span class="value">{{engineer.address}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">创建时间</span>
          <span class="value">{{engineer.create_time}}</span>
        </el-col>
      </el-row>
      <el-row v-if="engineer.customer">
        <el-col :span="12">
          <span class="label">客户姓名</span>
          <span class="value">{{engineer.customer.realname}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">客户手机</span>
          <span class="value">{{engineer.customer.telephone}}</span>
        </el-col>
      </el-row>
    </div>
    <div>
      <h3>已绑设备</h3>
      <el-button size="small" type="primary" @click="toBindHandler">绑定</el-button>
      <el-table size="small" :data="bindedDevices">
        <el-table-column label="设备编号" prop="serial_number"></el-table-column>
        <el-table-column label="设备名称" prop="name"></el-table-column>
        <el-table-column label="设备在线状态" prop="online_status">
          <template slot-scope="scope">
            <el-tag size="mini" type="success" v-if="scope.row.online_status == 1">在线</el-tag>
            <el-tag size="mini" type="danger" v-else>离线</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="toOnlineHandler(scope.row)" v-if="scope.row.online_status == 0" >上线</el-button>
            <el-button type="text" size="small" @click="toOfflineHandler(scope.row)" v-else>下线</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 模态框 -->
    <el-dialog title="绑定设备" :visible.sync="visible">
      <el-form :model="form" label-width="100px">
        <el-form-item label="设备" >
          <el-select v-model="form.device_id">
            <el-option 
              v-for="c in devices" 
              :key="c.id" 
              :label="c.name" 
              :value="c.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经度" >
          <el-input v-model="form.latitude" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="纬度" >
          <el-input v-model="form.longitude" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="监控视频" >
          <el-input v-model="form.video" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>    

  </div>
</template>
<script>
import {get} from '@/utils/request'
export default {
  data(){
    return {
      engineer:{},
      visible:false,
      form:{},
      devices:[],
      bindedDevices:[]
    }
  },
  mounted() {
    this.engineer = this.$route.query;
    // 查询所有未绑定的设备
    this.loadUnbindDevices();
    // 查询该工程上绑定的所有设备
    this.loadEngineerDevices();
  },
  methods:{
    toOnlineHandler(row){
      let url = "/device/openDevice"
      get(url,{id:row.id}).then(resp =>{
        this.$message({type:"success",message:resp.message});
        this.loadEngineerDevices();
      })
    },
    toOfflineHandler(row){

    },
    // 加载该工程绑定的设备信息
    loadEngineerDevices(){
      let url = "/device/pageQuery"
      let params = {page:1,pageSize:1000,engineer_id:this.engineer.id}
      get(url,params).then(resp => {
        this.bindedDevices = resp.data.list;
      })
    },
    loadUnbindDevices(){
      let url = "/device/pageQuery";
      let params = {page:1,pageSize:1000,bind_status:0}
      get(url,params).then(resp => {
        this.devices = resp.data.list;
      })
    },
    toBindHandler(){
      this.visible = true;
      this.form = {
        engineer_id:this.engineer.id
      }
    },
    submitHandler(){
      let url = "/engineer/bindService"
      get(url,this.form).then(resp => {
        this.$message({type:"success",message:resp.message});
        this.visible = false;
        this.loadEngineerDevices();
        this.loadUnbindDevices();
      })
    },
    backhandler(){
      this.$router.go(-1);
    }
  }
}
</script>
<style scoped>
.engineer_details .engineer .label{
  font-weight: bold;
  padding-right: 5px;
  line-height: 2.4em;
}
</style>