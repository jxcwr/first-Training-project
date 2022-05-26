<!--
  功能 地图
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
  <div ref="root" style="height: 100%"></div>
</template>

<script>
import { get } from "@/utils/request";
import { log } from "_@antv_g2plot@2.4.1@@antv/g2plot/lib/utils";
export default {
  data() {
    return {
      mapTree: [],
      map: null,
      data: [],
    };
  },
  async mounted() {
    await this.loadSales();
  },
  beforeDestroy() {
    if (this.plot) {
      this.plot.destroy();
    }
  },
  methods: {
    // 加载设备数据
    async loadSales() {
      let url = "/dashboard/findEngineerDeviceTree";
      let response = await get(url);
      this.mapTree = response.data;
      this.loadData();
    },
    loadData() {
      // 获取设备列表中的设备详情
      this.mapTree.forEach((element) => {
        if (element.children.length > 0) {
          element.children.forEach((item) => {
            // console.log('item', item);
            this.data.push(item);
          });
        }
      });
      this.initChart();
    },

    initChart() {
      let container = this.$refs.root;
      container.style.height = "400px";
      const map = new AMap.Map(container, {
        // mapStyle: "amap://styles/519bc5be170415504fe23ba1a632d085",
        resizeEnable: true,
        zoom: 10, //级别
        center: [120.838132, 31.472445], //中心点坐标
        viewMode: "3D", //使用3D视图
      });

      // 行政区轮廓

      AMap.service("AMap.DistrictSearch", function () {
        //回调函数
        let polygons = [];
        var opts = {
          subdistrict: 0, //获取边界不需要返回下级行政区
          extensions: "all", //返回行政区边界坐标组等具体信息
          level: "district", //查询行政级别为 市
        };

        let district = new AMap.DistrictSearch(opts);
        district.setExtensions("all");
        district.search("昆山市", function (status, result) {
          map.remove(polygons); //清除上次结果
          polygons = [];
          var bounds = result.districtList[0].boundaries;
          if (bounds) {
            for (var i = 0, l = bounds.length; i < l; i++) {
              //生成行政区划polygon
              var polygon = new AMap.Polygon({
                strokeWeight: 5,
                path: bounds[i],
                fillOpacity: 0.4,
                fillColor: "#80d8ff",
                strokeColor: "#0091ea",
              });
              // // 高亮行政区的鼠标单击事件
              // polygon.on("click", clickMap);
              // // 高亮行政区鼠标双击事件
              // polygon.on("dblclick", function () {
              //   map.setFitView(polygons); //视口自适应
              // });
              polygons.push(polygon);
            }
          }
          map.add(polygons);
          map.setFitView(polygons); //视口自适应
          // map的点击事件
          // map.on("click", clickMap);
        });
      });
      // 创建 AMap.Icon 实例：设备在线
      var icon = new AMap.Icon({
        // size: new AMap.Size(30, 30),    // 图标尺寸
        image: require("./icons/box_title_icon.png"), // Icon的图像
        // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new AMap.Size(25, 25), // 根据所设置的大小拉伸或压缩图片
      });
      // 创建 AMap.Icon 实例：设备离线
      var iconOutline = new AMap.Icon({
        // size: new AMap.Size(30, 30),    // 图标尺寸
        image: require("./icons/box_title_icon_outline.png"), // Icon的图像
        // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new AMap.Size(25, 25), // 根据所设置的大小拉伸或压缩图片
      });

      // 点聚合变量
      var cluster,
        markers = [];
      // 点聚合
      for (var i = 0; i < this.data.length; i += 1) {
        var marker = new AMap.Marker({
          id: this.data[i].id,
          videoUrl: this.data[i].video,
          position: this.data[i].position,
          icon: this.data[i].online_status == 1 ? icon : iconOutline, // 添加 Icon 为上面创建的icon实例
        });
        // 设置点标记的动画效果，AMAP_ANIMATION_BOUNCE为弹跳效果 AMAP_ANIMATION_DROP为掉落效果
        marker.setAnimation("AMAP_ANIMATION_DROP");
        //点标注的点击事件
        marker.on("click", function (e) {
          // 点击获取当前点的id或者经纬度
          let id = e.target.w.id;
          // 根据设备id查询设备数据
          store.dispatch("app/FIND_DEVICE_DATA", id);
          deviceData = store.getters.deviceData;
          console.log(222, deviceData);
          // console.log(e.target.w.position);
          // 当前点击点的dom元素
          var markerPoint = e.target.De.contentDom;
          // 创建视频节点
          var markerVideo = document.createElement("video");
          markerVideo.setAttribute("controls", "controls");
          markerVideo.setAttribute("id", "video_id");
          markerVideo.setAttribute("autoplay", "autoplay");
          markerVideo.setAttribute("width", "300");
          markerVideo.src = e.target.w.videoUrl;
          markerVideo.style.position = "absolute";
          markerVideo.style.zIndex = 1000;
          var markerVideoDiv = document.createElement("div");
          markerVideoDiv.setAttribute("id", "videoDiv_id");
          markerVideoDiv.innerText = "X";
          markerVideoDiv.style.color = "red";
          markerVideoDiv.style.zIndex = 1000;
          markerVideoDiv.style.textAlign = "right";
          markerVideoDiv.style.fontSize = "20px";
          markerVideoDiv.style.float = "right";
          markerPoint.parentElement.append(markerVideo); // 给设备节点的父节点追加视频节点
          markerPoint.parentElement.append(markerVideoDiv); // 给设备节点的父节点添加关闭视频按钮
        });
        markers.push(marker);
      }

      // 点聚合事件
      addCluster();
      function addCluster(tag) {
        if (cluster) {
          cluster.setMap(null);
        }
        // 聚合点的样式
        var sts = [
          {
            url: require("./icons/red_32.png"),
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-18, -18),
          },
          {
            url: require("./icons/green_32.png"),
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -16),
          },
          {
            url: require("./icons/orange_36.png"),
            size: new AMap.Size(36, 36),
            offset: new AMap.Pixel(-18, -18),
          },
          {
            url: require("./icons/red_48.png"),
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24),
          },
          {
            url: require("./icons/darkRed_48.png"),
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24),
          },
        ];
        map.plugin(["AMap.MarkerClusterer"], function () {
          cluster = new AMap.MarkerClusterer(map, markers, {
            styles: sts,
            gridSize: 80,
          });
        });
      }
    },
  },
};
</script>
<style>
</style>
