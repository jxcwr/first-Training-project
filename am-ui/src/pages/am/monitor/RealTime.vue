<!--
 * @Author: your name
 * @Date: 2021-12-21 22:18:45
 * @LastEditTime: 2021-12-22 18:03:39
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \am\am-ui\src\pages\am\monitor\RealTime.vue
-->
<template>
  <div>
    <el-row>
      <el-col :span="6" style="padding-right:.5em;border-right:2px solid #f4f4f4">
        <el-tree :data="eds" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="18">
        <div v-if="params.device_id">
          <el-table :data="monitorData.list" size="small">
            <el-table-column label="tsp" prop="tsp" width="80" align="center"></el-table-column>
            <el-table-column label="pm1.0" prop="pm10" width="80" align="center"></el-table-column>
            <el-table-column label="pm2.5" prop="pm25" width="100" align="center"></el-table-column>
            <el-table-column label="噪音" prop="noise" align="center"></el-table-column>
            <el-table-column label="温度" prop="temperature" width="80" align="center"></el-table-column>
            <el-table-column label="湿度" prop="humidity"  width="80" align="center"></el-table-column>
            <el-table-column label="风速" prop="wind_speed" align="center"></el-table-column>
            <el-table-column label="风向" prop="wind_direction" align="center"></el-table-column>
          </el-table>  
          <el-pagination
            :current-page="+monitorData.page"
            :page-size="+monitorData.pageSize"
            :total="+monitorData.total"
            @current-change="pageChangeHandler"
          ></el-pagination>
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
      params:{
        page:1,
        pageSize:10
      },
      monitorData:{list:[]}
    }
  },
  // 监听器
  watch:{
    params:{
      handler(){
        this.loadMonitor()
      },
      deep:true
    }
  },
  // 方法
  methods:{
    // 加载数据
    loadMonitor(){
      let url = "/monitor/pageQueryTodayData"
      get(url,this.params).then(resp => {
        this.monitorData = resp.data;
      })
    },
    handleNodeClick(node){
      if(node.engineer_id ){
        // 点击了设备
        this.$set(this.params,'engineer_id',node.engineer_id)
        this.$set(this.params,'device_id',node.id)
      }
    },
    // 加载工程设备树
    loadEngineerDevices(){
      let url = "/engineer/findEngineerDeviceTree"
      get(url).then(resp => {
        this.eds = resp.data;
      })
    },
    pageChangeHandler(page){
      this.params.page = page;
    }
  },
  // 页面加载完毕后执行
  mounted() {
    this.loadEngineerDevices();
  },
}
</script>