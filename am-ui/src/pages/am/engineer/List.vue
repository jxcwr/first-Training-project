<!--
 * @Description: 工程列表
 * @Author: charles
 * @Date: 2021-12-14 22:06:30
 * @LastEditors: Please set LastEditors

=======
 * @LastEditTime: 2021-12-22 17:49:24
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
   
    <el-table size="small" :data="engineerData.list">
       <el-table-column label="序号" type="index" :index="1" align="center"></el-table-column>
      <el-table-column type="expand">
      <template slot-scope="slot"><ul style="display:flex">
            <li style="height:200px; overflow:hidden" v-for="p in slot.row.end_photos" :key="p">
              <img style="width:100%" :src="p" alt="">
            </li>
          </ul></template></el-table-column>
     
      <el-table-column label="工程编号" prop="serial_number" width="100" align="center"></el-table-column>
      <el-table-column label="工程名称" prop="name" min-width="200" align="center"></el-table-column>
      <el-table-column label="工程类型" prop="type" width="100" align="center"></el-table-column>
      <el-table-column label="区域经理" prop="charge_name" width="100" align="center"></el-table-column>
      <el-table-column label="客户" prop="customer.realname" width="100" align="center"></el-table-column>
      <el-table-column label="联系方式" prop="customer.telephone" width="100" align="center"></el-table-column>
      <el-table-column label="工程状态"   prop="status" width="100" align="center" >
      <template slot-scope="scope">
          <el-tag type="success" size="mini" v-if="scope.row.status == '监测中'">{{scope.row.status}}</el-tag>
          <el-tag type="warning" size="mini" v-else-if="scope.row.status == '进行中'">{{scope.row.status}}</el-tag>
          <el-tag type="info" size="mini" v-else>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toEditHandler(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="toBindHandler(scope.row)">绑定</el-button>
          <el-button type="text" size="small" @click="toEndHandler(scope.row)">结束</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      hide-on-single-page
      :total="+engineerData.total"
      :current-page="+engineerData.page"
      :page-size="+engineerData.pageSize"
      @current-change="pageChangeHandler"
    ></el-pagination>

    <el-dialog :title="title" :visible.sync="visible">
      {{form}}
      <el-form :model="form" label-width="100px">
        <el-form-item label="区域经理" >
          <el-select v-model="form.charge_id">
            <el-option 
              v-for="c in charges" 
              :key="c.id" 
              :label="c.realname" 
              :value="c.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工程编号" >
          <el-input v-model="form.serial_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工程名称" >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工程类型" >
          <el-select v-model="form.type">
            <el-option label="建筑工地" value="建筑工地"></el-option>
            <el-option label="道路" value="道路"></el-option>
            <el-option label="公园" value="公园"></el-option>
            <el-option label="事业单位" value="事业单位"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工程地址" >
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="客户姓名" >
          <el-input v-model="form.customer_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户联系方式" >
          <el-input v-model="form.customer_telephone" autocomplete="off"></el-input>
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
      engineerData:{list:[]},
      charges:[],
    }
  },
  mounted() {
    this.loadEngineers();
    this.queryCharges();
  },
  methods:{
    // 绑定设备
    toBindHandler(row){
      this.$router.push({
        path:'/am/engineer/Details',
        query:row
      })
    },
    // 查询区域经理
    queryCharges(){
      let url = "/user/pageQuery"
      let params = {
        page:1,
        pageSize:100,
        role_id:3
      }
      get(url,params).then(resp => {
        this.charges = resp.data.list;
      })
    },
    queryHandler(){
      this.params.page = 1;
      this.loadEngineers();
    },
    submitHandler(){
      let url ="/engineer/saveOrUpdate"
      postJSON(url,this.form).then(resp => {
        this.$message({type:"success",message:resp.message})
        this.visible = false;
        this.loadEngineers();
      })
    },
     toEndHandler(row){
      let url="/engineer/finish"
      get(url,{id:row.id}).then(resp =>{
        this.$message({typr:"success",message:resp.message});
        this.loadEngineers();
      })
    },
    toEditHandler(row){
      this.form = row;
      this.title = "更改工程信息"
      this.visible = true;
    },
    // 加载工程数据
    loadEngineers(){
      let url = "/engineer/pageQuery";
      get(url,this.params).then(resp => {
        this.engineerData = resp.data;
      })
    },
    pageChangeHandler(page){
      this.params.page = page;
      this.loadEngineers();
    },
    toAddHandler(){
      this.visible = true;
      this.title = "录入工程";
      this.form = {}
    }
  }
}
</script>