<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-12-20 10:05:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 17:37:06
-->
<template>
  <div ref="map_container" style="height:100%"></div>
</template>
<script>
import {get} from '../../../utils/request'
import {mapMutations} from 'vuex'
export default {
  data(){
    return {
      map:null,
    }
  },
  mounted() {
    // 1. 初始化
    this.initMap();
  },
  methods:{
    ...mapMutations(['SET_ED']),
    initMap(){
      let vm = this;
      let container = this.$refs.map_container;
      // 1.初始化地图
      var map = new AMap.Map(container, {
          mapStyle:'amap://styles/519bc5be170415504fe23ba1a632d085',
          zoom:22,//级别
          center: [103.834228,36.060798],//中心点坐标
          viewMode:'3D'//使用3D视图
      });
      // 将map保存为一个全局变量
      this.map = map;
      // 2.行政区轮廓
      let polygons=[];
      var opts = {
          subdistrict: 0,   //获取边界不需要返回下级行政区
          extensions: 'all',  //返回行政区边界坐标组等具体信息
          level: 'district'  //查询行政级别为 市
      };
      let district = new AMap.DistrictSearch(opts);
      district.setExtensions('all');
      district.search('兰州市', function(status, result) {
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
      // 3. 打点 查找到所有的工程设备
      let url = "/dashboard/findEngineerDeviceTree"
      get(url).then(resp => {
        let eds = resp.data;
        // 所有设备
        let devices = [];
        eds.forEach(item => {
          // 缓存工程，将工程绑定到
          
          devices.push(...item.children)
        })
        // 将设备转换为点位
        console.log(devices)
        if(devices.length>0){
          let defaultDevice = devices[0];
          let ed = {
            engineer_id : defaultDevice.engineer_id,
            device_id : defaultDevice.id
          }
          this.SET_ED(ed)
        }
       

        devices.forEach(d => {
           // 1. 创建点
          let marker = new AMap.Marker({
            position:[103.834228,36.0607998],//位置
            title:d.name,
            extData:d
          })
          // 2. 为点绑定事件
          marker.on('click',function(){
            console.log(this.getExtData());
            let device_id = this.getExtData().id;
            let engineer_id = this.getExtData().engineer_id;
            // 将当前设备设置到状态机中
            let ed = {
              device_id,
              engineer_id
            }
            vm.SET_ED(ed)
          })
          // 3. 确认打点
          map.add(marker);
        })
      })
  
    }
  }
}
</script>
