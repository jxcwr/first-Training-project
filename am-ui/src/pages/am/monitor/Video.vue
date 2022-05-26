<!--
 * @Author: your name
 * @Date: 2021-12-21 22:18:45
 * @LastEditTime: 2021-12-22 18:03:19
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \am\am-ui\src\pages\am\monitor\Video.vue
-->
<template>
  <div>
    <el-row>
      <el-col :span="6" style="padding-right:.5em;border-right:2px solid #f4f4f4">
        <el-tree :data="eds" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="18">
        <div v-if="params.device_id">
          <video :src="device.video" autoplay controls loop style="display:block;width:90%;margin:0 auto"></video>  
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