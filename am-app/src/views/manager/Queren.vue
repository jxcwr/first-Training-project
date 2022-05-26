<!--
 * @Author: your name
 * @Date: 2021-12-21 10:17:07
 * @LastEditTime: 2021-12-22 17:51:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \therealoneiscoming-1\am-app\src\views\manager\order\queren.vue
-->
<template>
  <div class="workorder">
    <van-nav-bar title="完成工单" />
    <van-cell-group>
            <van-field readonly v-model="orderData.type" label="工单类型" />
            <van-field readonly v-model="orderData.status" label="工单状态" />
            <van-field readonly v-model="orderData.engineer_name" label="项目名称" />
            <van-field readonly v-model="orderData.device_name" label="设备名称" />
            <van-field v-if="orderData.bill_why" readonly v-model="orderData.bill_why" label="申报原因" />
            <van-field v-else readonly label="申报原因" value="无" />
            <van-field readonly label="申报图片" :value="orderData.begin_photos && orderData.begin_photos.length > 0?'':'暂无图片'" />
            <div v-if="orderData.begin_photos && orderData.begin_photos.length > 0">
                <van-image style="padding:5px" @click="openPhoto(orderData.begin_photos)" v-for="(item,index) in orderData.begin_photos" :key="index" width="30%" height="100" :src="item" />
            </div>   
        </van-cell-group>
   <div  class="tishi" v-if="orderData.status == '进行中'">
     请上传完成的现场照片
   </div>
    <!-- 图片上传 -->
    <div style="margin-bottom:2em">
      <van-uploader v-if="orderData.status == '进行中'"
      multiple 
      :fileList="imgList"
      :max-count="3" 
      result-type="file"
      :after-read="afterRead" />
    </div>

    <van-button v-if="orderData.status == '进行中'" type="primary" block @click="submitHandler">完成工单</van-button>

  </div>
</template>
<script>
import {get} from '../../http/axios'
import axios from 'axios'
import {Toast} from 'vant'
export default {
  data(){
    return {
      order:{},
      imgList:[],
      orderData: {},
            userId: this.$store.state.user.info.id,
            fileList: [],
            photoList: [],
            form: {},
      
    },
    this.orderData = this.$route.query ? this.$route.query : {}
  },
  methods: {
    submitHandler(){
      let imgList = this.imgList;
      if(imgList.length < 3 ){
        Toast.fail('必须上传3张图片')
        return false;
      }
      let url = "/workorder/finishOrder"
       
      let params = {
        id:this.order.id,
        photo1:imgList[0].url,
        photo2:imgList[1].url,
        photo3:imgList[2].url,
        finish_time:new Date().getTime()
      }
      get(url,params).then(resp => {
        Toast.success(resp.message);
        this.$router.go(-1)
      })
    },
    // 上传图片
    afterRead(file){
      console.log(file);
      file.status = "uploading";
      file.message = "上传中...";
      // 将文件上传至服务器测试
      let url = "http://121.199.29.84:8001/file/upload";
      let params = new FormData();
      params.append("file", file.file);
      axios.post(url, params, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(response => {
        file.status = "success";
        let url = 'http://121.199.29.84:8888/group1/'+response.data.data.id;
        this.imgList.push({url});
      })
      .catch(error => {
        file.status = "failed";
        file.message = "上传失败";
        Toast("图片上传失败:" + error + " 请返回重新上传");
      });
      
    }
  },
  mounted() {
    this.order = this.$route.query;
  },
}
</script>
<style scoped>
.workorder {
  font-size: 12px;
  color: #666;
  padding-bottom: 50px;
  background-color: #f4f4f4
}


</style>
<style >
.van-uploader__wrapper {
  width:100%
}
.tishi{
  font-size: 25px;
  font-weight: bold;
  color: blue;
  text-align: center;
}
.van-uploader__wrapper > div {
  flex:1
}

.van-uploader__wrapper > div .van-uploader__preview-image {
  width:100%
}
</style>