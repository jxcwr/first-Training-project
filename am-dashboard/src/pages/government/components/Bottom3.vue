<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 22:02:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 11:46:09
-->
<template>
  <!-- 1. 容器 -->
  <div ref="right3_container" style="height:95%"> </div>
</template>

<script>
// 2. 导入图表构造函数
import { Line  } from '@antv/g2plot';
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
      let url = "/dashboard/querymonthCG"
      let resp = await get(url);
      this.dd = resp.data;
    },
    //3. 初始化图表
    initChart(){
      const data = this.dd;
      const line = new Line(this.$refs.right3_container, {
 
      data,
      xField: 'month',
      yField: 'value',
      seriesField: 'category',
      xAxis: {
        
      },
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
    });
      line.render();
    }
  }
}
</script>