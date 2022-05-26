<!--
  功能：功能描述
  作者：kangjie
  邮箱：kangjie@briup.com
  时间：2021年12月10日 16:09:03
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class="statistics">
    <!-- <iframe src="http://10.0.1.58:8080/am/am-dashboard" frameborder="0"  scrolling="no" hspace="0" width="100%" height="100%"></iframe> -->
    <!-- 第一行 -->
    <div class="box_1" v-if="nums.length !== 0">
      <div class="box_info" v-for="(item, index) in nums" :key="index">
        <div class="title">{{ item.type }}</div>
        <div class="val">
          <span>{{ item.value }}</span>
          <span class="unit">个</span>
        </div>
      </div>
    </div>

    <!-- 第二行 -->
    <div class="box_2">
      <div class="left">
        <C21></C21>
      </div>
      <div class="right">
        <div class="pies">
          <div><C222></C222></div>
          <div><C223></C223></div>
        </div>
        <div class="line">
          <!-- <div style="margin-bottom: 0.3em; font-size: 15px">设备分布</div> -->
          <C221></C221>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "@/utils/request";
import C21 from "./components/C21.vue";
import C221 from "./components/C221.vue";
import C222 from "./components/C222.vue";
import C223 from "./components/C223.vue";
export default {
  components: {
    C21,
    C221,
    C222,
    C223,
  },
  data() {
    return {
      nums: [],
    };
  },
  mounted() {
    this.loadNums();
  },
  methods: {
    loadNums() {
      let url = "/count/countAll";
      get(url).then((resp) => {
        this.nums = resp.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.statistics {
  margin-top: 2em;
  .box_info {
    box-sizing: border-box;
    padding: 1em;
    color: #fff;
    .title {
      line-height: 3em;
      font-size: 18px;
      font-weight: bold;
    }
    .val {
      font-size: 14px;
      text-align: right;
    }
  }
  .box_1 {
    display: flex;
    margin-bottom: 1em;
    & > div {
      flex: 1;
      height: 120px;
      margin-right: 0.5em;
      background: lightblue;
    }
    & > div:nth-child(1) {
      background-color: #fdc660;
    }
    & > div:nth-child(2) {
      background-color: #fda065;
    }
    & > div:nth-child(3) {
      background-color: #f86b66;
    }
    & > div:nth-child(4) {
      background-color: #e6003b;
    }
    & > div:nth-child(5) {
      background-color: #8774f2;
    }
  }
  // 第二行
  .box_2 {
    display: flex;
    margin-top: 3em;
    margin-bottom: 1em;
    height: 400px;
    & > div {
      margin-right: 0.5em;
    }
    .left {
      flex: 2;
    }
    .right {
      flex: 3;
      display: flex;
      flex-direction: column;
      & > div {
        flex: 1;
      }
      .pies {
        display: flex;
        & > div {
          flex: 1;
          padding: 0.5em;
        }
      }
    }
  }
  // .box_3 {
  //   display: flex;
  //   & > div {
  //     flex:1;
  //     height: 120px;
  //     margin-right: .5em;
  //     background: lightblue;
  //   }
  //    & > div:nth-child(1){
  //     background-color: #58e0ad;
  //   }
  //   & > div:nth-child(2){
  //     background-color: #52bdc3;
  //   }
  //   & > div:nth-child(3){
  //     background-color: #51b6fe;
  //   }
  //   & > div:nth-child(4){
  //     background-color: #2e82f3;
  //   }
  //   & > div:nth-child(5){
  //     background-color: #3342b5;
  //   }
  // }
}
</style>
