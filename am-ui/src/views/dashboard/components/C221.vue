<!--
 * @Description:
 * @Author: charles
 * @Date: 2021-10-19 20:57:06
 * @LastEditors: charles
 * @LastEditTime: 2021-10-19 21:26:35
-->
<template>
  <div ref="root"></div>
</template>
<script>
import { Column } from "@antv/g2plot";
import { get } from "@/utils/request";
export default {
  data() {
    return {
      plot: null,
      sales: [],
    };
  },
  async mounted() {
    await this.loadSales();
    await this.initChart();
  },
  beforeDestroy() {
    if (this.plot) {
      this.plot.destroy();
    }
  },
  methods: {
    // 加载排名数据
    async loadSales() {
      let url = "/dashboard/queryEngineerBindDeviceNumber";
      let response = await get(url);
      this.sales = response.data.map((item) => {
        item.total = +parseInt(item.total);
        return item;
      });
    },
    initChart() {
      var i = -1;
      let container = this.$refs.root;
      container.style.height = "190px";
      this.plot = new Column(container, {
        data: this.sales,
        xField: "type",
        yField: "value",

        seriesField: "",
        color: ({ type }) => {
          i++;
          var color = [
            "#5b6bf6",
            "#cf726a",
            "#7d999f",
            "#89d7d7",
            "#ecd073",
            "#5caaf0",
            "#b4eb9b",
            "#f9d2b0",
            "#c098fa",
            "#9eb5fd",
            "#65d69b",
          ];
          return color[i];
        },

        legend: false,
        xAxis: {
          label: {
            // autoHide: true,
            // autoRotate: false,
            formatter(text) {
              // 字符太长添加省略号
              return text.length > 2 ? `${text.slice(0, 1)}...` : text;
            },
          },
        },
        yAxis: {
          label: {
            // autoHide: true,
            // autoRotate: false,
          },
        },
        meta: {
          type: {
            alias: "工程",
          },
          value: {
            alias: "设备数",
          },
        },
        columnStyle: {
          radius: [20, 20, 0, 0], //指定柱子圆角
        },
        tooltip: {
          showTitle: false,
        },
      });

      this.plot.render();
    },
  },
};
</script>
