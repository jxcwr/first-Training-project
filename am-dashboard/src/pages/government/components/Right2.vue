<!--
 * @Author: your name
 * @Date: 2021-12-22 11:22:44
 * @LastEditTime: 2021-12-22 16:57:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \therealoneiscoming\am-dashboard\src\pages\government\components\Right2.vue
-->

<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 22:02:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 12:52:38
-->
<template>
  <div ref="right2_container" style="height:85%">
  </div>
</template>
<script>
// 2. 导入图表构造函数
import { Gauge } from '@antv/g2plot';
export default {
  mounted() {
    // 4. 页面渲染的时候初始化图表
    this.initChart()
  },
  methods:{
    //3. 初始化图表
    initChart(){
     const ticks = [0, 1 / 3, 2 / 3, 1];
     const color = ['#F4664A', '#FAAD14', '#30BF78'];
     const gauge = new Gauge(this.$refs.right2_container, {
  percent: 0,
  range: {
    ticks: [0, 1],
    color: ['l(0) 0:#F4664A 0.5:#FAAD14 1:#30BF78'],
  },
  indicator: {
    pointer: {
      style: {
        stroke: '#D0D0D0',
      },
    },
    pin: {
      style: {
        stroke: '#D0D0D0',
      },
    },
  },
  statistic: {
    title: {
      formatter: ({ percent }) => {
        if (percent < ticks[1]) {
          return '差';
        }
        if (percent < ticks[2]) {
          return '中';
        }
        return '优';
      },
      style: ({ percent }) => {
        return {
          fontSize: '20px',
          lineHeight: 1,
          color: percent < ticks[1] ? color[0] : percent < ticks[2] ? color[1] : color[2],
        };
      },
    },
    content: {
      offsetY: 36,
      style: {
        fontSize: '18px',
        color: '#30BF78',
      },
      formatter: () => '空气质量  ',
    },
  },
});
let data = 0.7;
const interval = setInterval(() => {
  if (data >= 1.5) {
    clearInterval(interval);
  }
  data += 0.005;
  gauge.changeData(data > 1 ? data - 1 : data);
}, 100);
gauge.render();
    }
  }
}
</script>