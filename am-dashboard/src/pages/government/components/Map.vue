<!--
 * @Description: 地图
 * @Author: charles
 * @Date: 2021-05-05 23:34:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 09:36:08
-->
<template>
  <div ref="root" style="height: 100%"></div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  // 组件名称
  name: "demo",
  // 组件状态值
  setup() {
    const root = ref(null);
    let map = null;

    let data_column = ref([]);
    const loadData = async () => {
      map = new AMap.Map(root.value, {
        mapStyle:'amap://styles/519bc5be170415504fe23ba1a632d085',
        resizeEnable: true,
        zoom: 3
      });

      // 行政区轮廓
      let polygons=[];
      var opts = {
          subdistrict: 0,   //获取边界不需要返回下级行政区
          extensions: 'all',  //返回行政区边界坐标组等具体信息
          level: 'district'  //查询行政级别为 市
      };
      let district = new AMap.DistrictSearch(opts);
      district.setExtensions('all');
      district.search('昆山市', function(status, result) {
          map.remove(polygons)//清除上次结果
          polygons = [];
          var bounds = result.districtList[0].boundaries;
          if (bounds) {
              for (var i = 0, l = bounds.length; i < l; i++) {
                  //生成行政区划polygon
                  var polygon = new AMap.Polygon({
                      strokeWeight: 5,
                      path: bounds[i],
                      fillOpacity: 0.4,
                      fillColor: '#80d8ff',
                      strokeColor: '#0091ea'
                  });
                  polygons.push(polygon);
              }
          }
          map.add(polygons)
          map.setFitView(polygons);//视口自适应
      });
    };

    const initChart = () => {
      
    };

    onMounted(async () => {
      await loadData();
      initChart();
    });

    onUnmounted(() => {
      if (map != null) {
        // map.destroy();
      }
    });

    return {
      root,
    };
  },
};
</script>


<style scoped>
</style>
