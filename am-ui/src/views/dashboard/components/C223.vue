<!--
 * @Description:
 * @Author: charles
 * @Date: 2021-10-19 20:57:16
 * @LastEditors: charles
 * @LastEditTime: 2021-10-21 17:21:35
-->
<template>
  <div ref="root"></div>
</template>
<script>
import { Line } from "@antv/g2plot";
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
      let url = "/dashboard/queryMouthData";
      let resp = await get(url);
      this.data = resp.data;
      this.data = this.data.filter((item) => {
        return (
          item.type.includes("humidity") || item.type.includes("temperature")
        );
      });
    },
    initChart() {
      const data = this.data;
      let container = this.$refs.root;
      container.style.height = "180px";
      this.plot = new Line(container, {
        data,
        xField: "date",
        yField: "value",
        seriesField: "type",
        xAxis: {},
        yAxis: {},
        legend: false,
        smooth: true,
        // 配置折线趋势填充
        area: {
          style: {
            fillOpacity: 0.15,
          },
        },
        animation: {
          appear: {
            animation: "wave-in",
            duration: 3000,
          },
        },
      });

      this.plot.render();
    },
  },
};
</script>
