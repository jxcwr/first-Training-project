<!--
 * @Description: 我要报修
 * @Author: charles
 * @Date: 2021-12-14 22:09:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 17:50:09
-->
<template>
  <div>
    <el-form :model="form" size="small">
      <el-form-item label="工程设备">
        <el-cascader
          style="width:100%"
          v-model="form.engineer_device_id"
          :options="eds"
          :props="{ label:'name',value:'id',expandTrigger: 'hover' }"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="报修原因">
        <el-input type="textarea" v-model="form.bill_why"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="submitHandler">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {get,postJSON} from '@/utils/request'
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      form:{},
      eds:[]
    }
  },
  mounted() {
    this.loadEngineerDevices();
  },
  computed: {
     ...mapGetters(['user'])
  },
  methods:{
    // 加载工程设备树
    loadEngineerDevices(){
      let url = "/engineer/findEngineerDeviceTree"
      get(url).then(resp => {
        this.eds = resp.data;
      })
    },
    submitHandler(){
      let url = "/workorder/repairOrder"
      let form = {}
      form.engineer_id = this.form.engineer_device_id[0]
      form.device_id = this.form.engineer_device_id[1]
      form.bill_why = this.form.bill_why;
      form.account_id = this.user.id;
      postJSON(url,form).then(resp => {
        this.$message({type:"success",message:resp.message})
        this.$router.push("/am/order/List")
      })

    }
  }
}
</script>