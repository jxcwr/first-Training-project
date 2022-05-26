<!--
 * @Description:
 * @Author: charles
 * @Date: 2021-10-19 20:57:16
 * @LastEditors: charles
 * @LastEditTime: 2021-10-21 17:18:34
-->
<template>
  <div ref="root"></div>
</template>
<script>
import { Pie } from "@antv/g2plot";
import { get } from "@/utils/request";
export default {
  data() {
    return {
      plot: null,
      data: [],
    };
  },
  async mounted() {
    await this.loadOrderStatus();
    this.initChart();
  },
  beforeDestroy() {
    if (this.plot) {
      this.plot.destroy();
    }
  },
  methods: {
    async loadOrderStatus() {
      let url = "/dashboard/queryDeviceOnlineNumber";
      let resp = await get(url);
      this.data = resp.data;
      // for(let key in resp.data){
      //   let val = resp.data[key]
      //   let item = {year:key,value:val}
      //   this.data.push(item)
      // }
    },
    initChart() {
      const data = this.data;
      let container = this.$refs.root;
      container.style.height = "180px";
      this.plot = new Pie(container, {
        data,
        radius: 0.6, //饼图的半径，原点为画布中心。配置值域为 (0,1]，1 代表饼图撑满绘图区域。
        angleField: "value",
        colorField: "type",
        color: ["#5b6bf6", "#cf726a"],
        innerRadius: 0.6, // 设置为环形饼图
        statistic: {
          // 环形饼图内部title
          title: {
            style: {
              fontSize: 14,
              // color: "white",
            },
            content: "设备总数",
          },
          content: {
            style: {
              fontSize: 19,
              // color: "white",
            },
          },
        },
        label: {
          type: "spider",
          content: "{name}\n{value}台",
          style: {
            // fill: "white",
            opacity: 1,
            fontSize: 14,
          },
        },
        legend: false, // 关闭图例
      });

      this.plot.render();
    },
  },
};
</script>
