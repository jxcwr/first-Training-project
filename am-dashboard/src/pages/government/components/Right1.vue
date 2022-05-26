<!--
 * @Author: your name
 * @Date: 2021-12-16 19:49:46
 * @LastEditTime: 2021-12-21 17:40:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \group5_am-master\am-dashboard\src\pages\government\components\Bottom1.vue
-->
<!--
  功能 左侧第一个图形
  作者：licy
  邮箱：licy@briup.com
  时间：2021年05月5日 20:21:48
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div ref="right1_container" style="height:95%">
  </div>
</template>
<script>
// 2. 导入图表构造函数
import { Column } from '@antv/g2plot';
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
      let url = "/dashboard/querycityPM"
      let resp = await get(url);
      this.dd = resp.data;
    },
    //3. 初始化图表
    initChart(){
      const data = this.dd;
      const plot = new Column(this.$refs.right1_container, {
      data,
      xField: 'city',
      yField: 'value',
      seriesField: 'type',
      isGroup: 'true',
      legend: {
        position: 'right-top',
        offsetX: 8,
        title: {
          text: '产品类别 (平均销售量）',
          spacing: 8,
        },
        itemValue: {
          formatter: (text, item) => {
            const items = data.filter((d) => d.type === item.value);
            return items.length ? items.reduce((a, b) => a + b.value, 0) / items.length : '-';
          },
          style: {
            opacity: 0.65,
          },
        },
      },
    });

    plot.render();
    }
   }
  }
</script>