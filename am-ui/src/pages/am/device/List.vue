<!--
 * @Description: 设备列表
 * @Author: charles
 * @Date: 2021-12-14 22:07:02
 * @LastEditors: Please set LastEditors

<template>
  <div>
    设备列表zxczx
    大萨达撒
=======
 * @LastEditTime: 2021-12-22 17:48:18
-->
<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-form :model="params" inline size="small">
          <el-form-item>
            <el-input v-model="params.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryHandler">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" style="text-align:right">
        <el-button type="primary" size="small" @click="toAddHandler">录入</el-button>
      </el-col>
    </el-row>
   
    <el-table size="small" :data="deviceData.list">
      <el-table-column label="设备编号" prop="serial_number" width="100" align="center"></el-table-column>
      <el-table-column label="设备名称" prop="name" width="200" align="center"></el-table-column>
      <el-table-column label="经度" prop="longitude" width="150" align="center"></el-table-column>
      <el-table-column label="纬度" prop="latitude" width="150" align="center"></el-table-column>
      <el-table-column label="视频地址" prop="video" align="center"></el-table-column>
      <el-table-column label="在线状态" prop="online_status" width="100" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" type="success" v-if="scope.row.online_status == 1">在线</el-tag>
          <el-tag size="mini" type="danger" v-else>离线</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="绑定状态" prop="bind_status" width="100" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" type="success" v-if="scope.row.bind_status == 1">已绑定</el-tag>
          <el-tag size="mini" type="danger" v-else>未绑定</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toEditHandler(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      hide-on-single-page
      :total="+deviceData.total"
      :current-page="+deviceData.page"
      :page-size="+deviceData.pageSize"
      @current-change="pageChangeHandler"
    ></el-pagination>

    <el-dialog :title="title" :visible.sync="visible">
      {{form}}
      <el-form :model="form" label-width="80px">
        <el-form-item label="设备编号" >
          <el-input v-model="form.serial_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {get,postJSON} from '@/utils/request'
export default {
  data(){
    return {
      params:{
        page:1,
        pageSize:10
      },
      title:"",
      visible:false,
      form:{},
      deviceData:{list:[]}
    }
  },
  mounted() {
    this.loadDevices();
  },
  methods:{
    queryHandler(){
      this.params.page = 1;
      this.loadDevices();
    },
    submitHandler(){
      let url ="/device/saveOrUpdate"
      postJSON(url,this.form).then(resp => {
        this.$message({type:"success",message:resp.message})
        this.visible = false;
        this.loadDevices();
      })
    },
    toEditHandler(row){
      this.form = row;
      this.title = "更改设备信息"
      this.visible = true;
    },
    // 加载设备数据
    loadDevices(){
      let url = "/device/pageQuery";
      get(url,this.params).then(resp => {
        this.deviceData = resp.data;
      })
    },
    pageChangeHandler(page){
      this.params.page = page;
      this.loadDevices();
    },
    toAddHandler(){
      this.visible = true;
      this.title = "录入设备";
      this.form = {}
    }
  }
}
</script>