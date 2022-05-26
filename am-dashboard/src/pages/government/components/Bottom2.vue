<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 22:02:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 16:50:28
-->
<template>
  <!-- 1. 容器 -->
  <div ref="left3_container" style="height:95%"> </div>
</template>

<script>
// 2. 导入图表构造函数
import { Area} from '@antv/g2plot';
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
      let url = "/dashboard/queryMouthData"
      let resp = await get(url);
      this.dd = resp.data;
    },
    //3. 初始化图表
    initChart(){
      const data = this.dd;
      const area = new Area(this.$refs.left3_container, {
      data,
     xField: 'date',
      yField: 'value',
      seriesField: 'type',
      annotations: [
        {
          type: 'text',
          position: ['min', 'median'],
          content: '中位数',
          offsetY: -4,
          style: {
            textBaseline: 'bottom',
          },
        },
        {
          type: 'line',
          start: ['min', 'median'],
          end: ['max', 'median'],
          style: {
            stroke: 'red',
            lineDash: [2, 2],
          },
        },
      ],
    });

      area.render();
    }
  }
}
</script>