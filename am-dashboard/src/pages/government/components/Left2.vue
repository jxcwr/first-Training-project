<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 22:02:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-21 09:18:07
-->
<template>
  <!-- 1. 容器 -->
  <div ref="left2_container" style="height:95%"> </div>
</template>

<script>
// 2. 导入图表构造函数
import { Pie } from '@antv/g2plot';
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
      let url = "/dashboard/queryDeviceOnlineNumber"
      let resp = await get(url);
      this.dd = resp.data;
    },
    //3. 初始化图表
    initChart(){
      const data = this.dd;
      const piePlot = new Pie(this.$refs.left2_container, {
        appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.9,
      label: {
      type: 'inner',
      offset: '-30%',
     
      style: {
      fontSize: 14,
      textAlign: 'center',
    },
  },
  interactions: [{ type: 'element-active' }],
      });

      piePlot.render();
    }
  }
}
</script>