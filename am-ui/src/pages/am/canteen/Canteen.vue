<!--
 * @Author: your name
 * @Date: 2021-12-22 13:47:40
 * @LastEditTime: 2021-12-23 09:29:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \therealoneiscoming\am-ui\src\pages\am\Food\OrderFood.vue
-->
<template>
<div>
{{deviceData}}
{{params}}
<el-form ref="form" :model="form" label-width="80px" >
   <el-form-item label="餐厅">
    <el-select v-model="form.region" placeholder="请选择餐厅"  >
      <el-option label="喜羊羊餐厅" prop="shanghai"></el-option>
      <el-option label="红太狼餐厅" prop="beijing"></el-option>
      <el-option label="迪迦奥特曼餐厅" prop="beijing"></el-option>
    </el-select>
    </el-form-item>
  <el-form-item label="菜品">
    <el-select v-model="form.region" placeholder="请选择菜品">
      <el-option label="" value=""></el-option>
      <el-option label="" value=""></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="配送区间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="即时配送">
    <el-switch v-model="form.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="选择服务">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="公益捐赠" name="type"></el-checkbox>
      <el-checkbox label="隐私保护" name="type"></el-checkbox>
      <el-checkbox label="环保餐具" name="type"></el-checkbox>
      <el-checkbox label="发票" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="食品包装">
    <el-radio-group v-model="form.resource">
      <el-radio label="即食包装"></el-radio>
      <el-radio label="保温包装"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="备注">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即下单</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
import {get,postJSON} from '@/utils/request'
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        params:{},
        deviceData:[]
      }
    },
     mounted() {;
    this.loadDevices();
  },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
    loadDevices(){
      let url = "/canteen​/findAll";
      get(url).then(resp => {
        this.deviceData = resp.data;
      })
    },
    }
  }
</script>