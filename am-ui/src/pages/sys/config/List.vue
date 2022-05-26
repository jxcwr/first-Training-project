<!--
 * @Description: 系统配置
 * @Author: charles
 * @Date: 2021-12-08 12:47:07
 * @LastEditors: charles
 * @LastEditTime: 2021-12-09 15:22:05
-->
<template>
  <div class="">
    <!-- 按钮 -->
    <el-button type="primary" size="small" @click="toAdd">新增</el-button>
    <!-- /按钮 -->
    <!-- 表格 -->
    <el-table v-loading="loading" :data="config" size="mini">
      <el-table-column type="index" :index="1" label="序号" width="55" align="center" />
      <el-table-column prop="name" label="名称" align="center" width="100"/>
      <el-table-column prop="value" label="值" align="center">
        <template slot-scope="scope">
          <el-image v-if="judgeHandler(scope.row.value)" style="height:100px" :src="scope.row.value" fit="contain" />
          <span v-else>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="introduce" label="介绍" align="center" />
      <el-table-column fixed="right" label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.prevent="toEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click.prevent="toDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible" class="customer_modal" @close="dialogCloseHandler">
      <el-form ref="config_form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="类型" >
          <el-select v-model="type" placeholder="请选择">
            <el-option label="文字" value="文字" />
            <el-option label="图片" value="图片" />
          </el-select>
        </el-form-item>
        <el-form-item label="名称"  prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="type === '文字'" label="值"  prop="value">
          <el-input v-model="form.value" />
        </el-form-item>
        <el-form-item v-else label="图片上传" prop="val">
          <el-upload
            class="avatar-uploader"
            action="http://121.199.29.84:8001/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.value" :src="form.value" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
         <el-form-item label="介绍" prop="introduce">
          <el-input type="textarea" v-model="form.introduce" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>

<script>
import {get,post} from '@/utils/request'
import qs from 'querystring'
import _ from 'lodash'
import { mapActions } from 'vuex'
export default {
  // 组件名称
  name: 'Demo',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {
      config: [],
      loading: false,
      title: '',
      rules: {
        name: [{ required: true, message: '请输轮播图名称', trigger: 'blur' }],
        introduce: [{ required: true, message: '请输入轮播图介绍信息', trigger: 'blur' }],
        value: [{ required: true, message: '请输入值', trigger: 'change' }]
      },
      visible: false,
      form: {},
      type: '文字'
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 以下是生命周期钩子
  /**
  * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
  * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
  */
  mounted() {
    this.findAllBaseConfig()
  },
  // 组件方法
  methods: {
    ...mapActions('app',['loadConfig']),
    dialogCloseHandler(){
      this.$refs.config_form.clearValidate();
    },
    // 查询所有基础配置信息
    findAllBaseConfig() {
      this.loadConfig();
      this.loading = true
      get('/config/findAll').then(res => {
        this.config = res.data
        this.loading = false
      })
    },
    // 新增按钮
    toAdd() {
      this.form = {}
      this.title = '新增基础配置'
      this.visible = true
    },
    // 编辑按钮
    toEdit(row) {
      this.title = '修改基础配置'
      var sub = row.value.substring(row.value.lastIndexOf('.') + 1, row.value.length)
      if (sub === 'jpg' || sub === 'jpeg' || sub === 'png') {
        this.type = '图片'
      } else {
        this.type = '文字'
      }
      this.form = _.clone(row)
      this.visible = true
    },
    // 删除按钮
    toDelete(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        get('/config/deleteById', { id }).then(response => {
          this.$message({ type: 'success', message: response.message })
          this.findAllBaseConfig() // 重载数据
        })
      })
    },
    // 图片成功上传回调
    handleAvatarSuccess(res, file) {
      if (res.status === 200) {
        this.$set(this.form, 'value', 'http://121.199.29.84:8888/group1/' + res.data.id)
      } else {
        this.$message({ type: 'error', message: '附件服务器异常！' })
      }
    },
    // 表单提交按钮
    submitForm() {
      this.$refs['config_form'].validate((valid) => {
        if (valid) {
          let url = '/config/saveOrUpdate';
          post(url,this.form).then(res => {
            this.findAllBaseConfig() // 重载数据
            this.visible = false // 关闭模态框
            this.$message.success(res.message) // 提示成功信息
          })
        } else {
          return false
        }
      })
    },
    // 判断val值
    judgeHandler(val) {
      var bool
      var sub = val.substring(val.lastIndexOf('.') + 1, val.length)
      if (sub === 'jpg' || sub === 'jpeg' || sub === 'png') {
        bool = true
      } else {
        bool = false
      }
      return bool
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
