<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 22:02:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 17:10:39
-->
<template>
  <!--2. 容器 -->
  <div ref="left1_container" style="height: 100%"></div>
</template>
<script>
// 4. 导入图表构造函数
import {  Column } from '@antv/g2plot';
import {get} from '../../../utils/request'
export default {
  data(){
    return {
      dd:[]
    }
  },
  async mounted() {
    // 4. 查询数据
    await this.loadData();
    // 5. 页面渲染的时候初始化图表
    this.initChart()
  },
  methods:{
     async loadData(){
      let url = "/dashboard/queryEngineerBindDeviceNumber"
      let resp = await get(url);
      this.dd = resp.data;
    },
    //3. 初始化图表
    initChart(){
      const data = this.dd;
      const column = new Column(this.$refs.left1_container, {
         data,
      xField: 'type',
      yField: 'value',

      xAxis: {
        label: {
          autoRotate: false,
        },
      },
      slider: {
        start: 0.1,
        end: 0.2,
      },
    });
      column.render();
    }
  }
}
</script>