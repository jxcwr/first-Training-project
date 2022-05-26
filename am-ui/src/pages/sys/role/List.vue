<template>
  <!-- 角色管理 -->
  <div class="role_list">
    <div class="btns">
      <el-button type="primary" size="small" @click="toAdd">添加</el-button>
    </div>
    <!-- {{options}} -->
    <el-table :data="roles" size="small">
      <el-table-column type="index" :index="1" label="序号" />
      <el-table-column prop="name" label="角色名称" />
      <el-table-column label="操作" fixed="right" align="center" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click.prevent="toAuthorization(scope.row)">授权</el-button>
          <el-button type="text" @click.prevent="toUpdate(scope.row)">修改</el-button>
          <el-button type="text" class="delete" @click.prevent="deleteHandler(scope.row.id)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible" @closed='dialogCloseHandler'>
      <el-form ref="role_form" :model="form" :rules="rules">
        <el-form-item label="角色名称" label-width="80px" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="saveRoleHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
    <!-- 授权模态框 -->
    <el-dialog title="授权" :visible.sync="authorization_visible" width="80%">
      <el-form :model="role">
        <!-- {{role}} -->
        <el-form-item label="角色名称" label-width="80px">{{ role.name }}</el-form-item>
        <el-form-item label="权限" label-width="80px">
          <el-cascader-panel
            v-model="role.privileges"
            :options="options"
            :props="{ multiple: true, checkStrictly: true ,emitPath:false}"
            clearable
            @change="handler"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="authorization_visible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="authorizationHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>
<script>
import request, { get, post, del } from "@/utils/request";
import qs from "querystring";
import { log } from "util";
export default {
  data() {
    return {
      form: {},
      // loading:false,
      visible: false,
      authorization_visible: false,
      title: "添加角色",
      role: {}, // 当前角色
      roles: [], // 角色列表
      result: [],
      ps: [],
      props: {
        multiple: true,
        value: "id",
        label: "name",
        emitPath: false,
        checkStrictly: true
      },
      options: [],
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "change" }]
      }
    };
  },
  created() {
    // 加载角色
    this.loadRoles();
    // 加载权限
    this.loadPrivileges();
  },
 
  methods: {
     dialogCloseHandler(){
      this.$refs['role_form'].resetFields();
    },
    handler(value) {
      // console.log(value);
      this.role.privileges = value;
      // console.log(this.role.privileges);
    },
    // 去修改
    toUpdate(row) {
      this.form = row;
      this.visible = true;
      this.title = "修改角色";
    },
    // 保存角色权限信息
    authorizationHandler() {
      if (this.role.privileges.length == 0) {
        this.role.privileges = "";
      }
      let temp = { ...this.role };
      temp.role_id=temp.id;
      let temp1 = temp.privileges.join().split(",");
      let temp2 = Array.from(new Set(temp1));
      temp.privileges = temp2;
      post("/role/setPrivilege", temp).then(res => {
        this.$message({
          type: "success",
          message: res.message
        });
        this.authorization_visible = false;
        this.loadRoles();
      });
    },
    // 保存角色信息
    saveRoleHandler() {
      this.$refs["role_form"].validate(valid => {
        if (valid) {
          request
            .request({
              url: "/role/saveOrUpdate",
              method: "post",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: qs.stringify(this.form)
            })
            .then(response => {
              this.visible = false;
              this.$message({ message: response.message, type: "success" });
              this.loadRoles();
            });
        } else {
          return false;
        }
      });
    },
    // 获取权限树
    loadPrivileges() {
      // this.loading = true;
      get("/privilege/findPrivilegeTree").then(res => {
        // this.foo(res.data);
        // console.log(res.data,'-3213213123')
        let arr = res.data;
        let options = [];
        res.data.forEach(item => {
          let obj = {};
          obj.value = item.id;
          obj.label = item.name;
          obj.children = item.children.map(i => {
            return {
              value: i.id,
              label: i.name
            };
          });
          options.push(obj);
        });
        this.options = options;
        // for(var i=0;i<arr.length;i++){
        //   // console.log(arr[i]);
        //   for(let key in this.options){
        //     this.options[key].value=arr[i].id;
        //     this.options[key].name=arr[i].name;
        //   }
        //   // const result1=result.forEach(item=>{
        //   //   item.value=arr[i].id;
        //   //   item.lable=arr[i].name;
        //   // })
        //   // return result
        // }

        this.loading = false;
      });
    },
    // 递归去除权限中的空children
    foo(privileges) {
      for (const p of privileges) {
        if (p.children && p.children.length === 0) {
          delete p.children;
        } else {
          this.foo(p.children);
        }
      }
    },
    // 去添加
    toAdd() {
      this.form = {};
      this.visible = true;
    },
    // 去请求所有角色
    loadRoles() {
      get("/role/findAll").then(res => {
        // console.log(res);
        this.roles = res.data;
        // 将权限转换为id的数组
        this.result = this.roles.map(item => {
          return item.id;
        });
      });
    },
    // 去删除
    deleteHandler(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        del("/role/deleteById",{id}).then(response => {
          this.$message({ type: "success", message: response.message });
          this.loadRoles();
        });
      });
    },
    // 去授权
    toAuthorization(record) {
      get("/role/findPrivilegesById", { id: record.id }).then(res => {
        let result = [];
        res.data.forEach(item => {
          let obj = {};
          obj.value = item.id;
          obj.label = item.name;
          result.push(obj);
        });
        let result1 = result.map(item => {
          return item.value;
        });
        record.privileges = result1;
        this.role = record;
      });
      
      this.authorization_visible = true;
    }
  }
};
</script>
