<template>
  <div>
    <el-row>
      <el-col :span="6" style="padding-right:.5em;border-right:2px solid #f4f4f4">
        <el-tree :data="eds" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="18">
        <div v-if="params.device_id">
          <div class="engineer">
            <h3><i class="el-icon-s-goods"></i>工程信息</h3>
            <el-row>
              <el-col :span="12">
                <span class="label">工程名称:</span>
                <span class="value">{{device.engineer.name}}</span>
              </el-col>
              <el-col :span="12" >
                <span class="label">工程编号</span>
                <span class="value">{{device.engineer.serial_number}}</span>
              </el-col>
              <el-col :span="12">
                <span class="label">工程类型:</span>
                <span class="value">{{device.engineer.type}}</span>
              </el-col>
              <el-col :span="12">
                <div v-if="device.engineer.status">
                  <el-tag type="success">
                    <span class="label">工程状态:</span>
                    <span class="value">{{device.engineer.status}}</span>
                  </el-tag>
                </div>
                <div v-else-if="device.engineer.status">
                  <el-tag type="danger">
                    <span class="label">工程状态:</span>
                    <span class="value">{{device.engineer.status}}</span>
                  </el-tag>
                </div>
                <div v-else>
                  <el-tag type="danger">
                    <span class="label">工程状态:</span>
                    <span class="value">{{device.engineer.status}}</span>
                  </el-tag>
                </div>
              </el-col>
              <el-col :span="12">
                <span class="label">地址:</span>
                <span class="value">{{device.engineer.address}}</span>
              </el-col>
              <el-col :span="12">
                <span class="label">负责人:</span>
                <span class="value">{{device.engineer.charge_id}}</span>
              </el-col>
            </el-row>
          </div>
          <div class="device">
            <h3><i class="el-icon-video-camera-solid"></i>设备信息</h3>
            <el-row>
              <el-col :span="12">
                <span class="label">工程设备:</span>
                <span class="value">{{device.serial_number}}</span>
              </el-col>
              <el-col :span="12">
                <span class="label">设备名称:</span>
                <span class="value">{{device.name}}</span>
              </el-col>
              <el-col :span="12">
                <el-tag type="success">
                  <span class="label">绑定状态:</span>
                  <span class="value">{{device.bind_status}}</span>
                </el-tag>
              </el-col>
              <el-col :span="12">
                <div v-if="device.online_status">
                <el-tag type="success">
                  <span class="label">在线状态:</span>
                  <span class="value">{{device.online_status}}</span>
                </el-tag>
                </div>
                <div v-else>
                  <el-tag type="danger">
                    <span class="label">在线状态:</span>
                    <span class="value">{{device.online_status}}</span>
                </el-tag>
                </div>
              </el-col>
            </el-row>
          </div>
          
        </div>
        <div v-else style="line-height:3em;color:red;text-align:center">请选择设备</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {get} from '@/utils/request'
export default {
  // 变量
  data(){
    return {
      defaultProps:{
        children: 'children',
        label: 'name'
      },
      eds:[],
      params:{},
      device:{}
    }
  },
  // 方法
  methods:{
    loadDeviceDetails(){
      let url = "/device/findDeviceDetail";
      get(url,{id:this.params.device_id}).then(resp => {
        this.device = resp.data;
      });
    },
    handleNodeClick(node){
      if(node.engineer_id ){
        // 点击了设备
        this.$set(this.params,'engineer_id',node.engineer_id)
        this.$set(this.params,'device_id',node.id)

        // 请求设备信息
        this.loadDeviceDetails();
      }
    },
    // 加载工程设备树
    loadEngineerDevices(){
      let url = "/engineer/findEngineerDeviceTree"
      get(url).then(resp => {
        this.eds = resp.data;
      })
    }
  },
  // 页面加载完毕后执行
  mounted() {
    this.loadEngineerDevices();
  },
}
</script>
<style>
.engineer
{
padding: 10px 10px 20px 20px;
}
.device
{
padding: 10px 10px 20px 20px;
}
</style>