(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-170a0b18"],{"39e1":function(e,t,r){"use strict";r("6ef8")},"6ef8":function(e,t,r){},"9ed6":function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login-container"},[e._m(0),r("div",{staticClass:"center"},[r("div",{staticClass:"form"},[r("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,autocomplete:"on","label-position":"left"}},[r("div",{staticStyle:{"text-align":"center",height:"60px","line-height":"60px","font-weight":"bold"}},[e._v("用户名密码登录")]),r("el-form-item",{attrs:{prop:"username"}},[r("el-input",{ref:"username",attrs:{placeholder:"Username",type:"text"},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}})],1),r("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:e.capsTooltip,callback:function(t){e.capsTooltip=t},expression:"capsTooltip"}},[r("el-form-item",{attrs:{prop:"password"}},[r("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"Password"},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}})],1)],1),r("div",{staticClass:"loginRegister"},[r("el-button",{staticStyle:{width:"100%"},attrs:{loading:e.loading},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)}}},[e._v("登录")]),r("span",{staticClass:"text",staticStyle:{"margin-left":"315px"}},[e._v("新用户?点击")]),r("el-button",{staticStyle:{"text-align":"right"},attrs:{type:"text"},on:{click:function(t){e.visible=!0}}},[e._v("注册")])],1)],1)],1)]),r("div",{staticClass:"footer"},[e._v("杰普软件前端开发团队")]),r("el-dialog",{staticClass:"customer_modal",attrs:{title:"用户注册",visible:e.visible,width:"40%"},on:{"update:visible":function(t){e.visible=t},close:e.clearValidate}},[r("div",[r("el-form",{ref:"registerForm",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[r("el-input",{model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),r("el-form-item",{attrs:{label:"姓名",prop:"realname"}},[r("el-input",{model:{value:e.form.realname,callback:function(t){e.$set(e.form,"realname",t)},expression:"form.realname"}})],1),r("el-form-item",{attrs:{label:"密码",prop:"password"}},[r("el-input",{attrs:{type:"password"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1)],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(t){e.visible=!1}}},[e._v("取消")]),r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.submitHandler}},[e._v("确定")])],1)])],1)},i=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"header"},[r("div",{staticClass:"title"},[e._v("智慧城市环境监测系统")])])}],o=(r("e18c"),r("fe8a"),r("b775")),a={name:"Login",data:function(){var e=function(e,t,r){r()},t=function(e,t,r){r()};return{visible:!1,form:{},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],realname:[{required:!0,message:"请输入姓名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},loginForm:{username:"",password:""},loginRules:{username:[{required:!0,trigger:"blur",validator:e}],password:[{required:!0,trigger:"blur",validator:t}]},passwordType:"password",capsTooltip:!1,loading:!1,showDialog:!1,redirect:void 0,otherQuery:{}}},watch:{$route:{handler:function(e){var t=e.query;t&&(this.redirect=t.redirect,this.otherQuery=this.getOtherQuery(t))},immediate:!0}},mounted:function(){""===this.loginForm.username?this.$refs.username.focus():""===this.loginForm.password&&this.$refs.password.focus()},methods:{submitHandler:function(){var e=this;this.$refs["registerForm"].validate((function(t){if(!t)return!1;var r="/user/register";Object(o["d"])(r,e.form).then((function(t){e.$message({type:"success",message:t.message}),e.visible=!1}))}))},clearValidate:function(){this.$refs["registerForm"].clearValidate()},toRegisterHandler:function(){this.form={},this.visible=!0},showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},handleLogin:function(){var e=this;this.$refs.loginForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;e.loading=!0,e.$store.dispatch("user/login",e.loginForm).then((function(){e.$router.push({path:e.redirect||"/",query:e.otherQuery}),e.loading=!1})).catch((function(){e.loading=!1}))}))},getOtherQuery:function(e){return Object.keys(e).reduce((function(t,r){return"redirect"!==r&&(t[r]=e[r]),t}),{})}}},l=a,n=(r("39e1"),r("cba8")),u=Object(n["a"])(l,s,i,!1,null,"2951b2cd",null);t["default"]=u.exports}}]);