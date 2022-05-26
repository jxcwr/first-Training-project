<!--
 * @Author: your name
 * @Date: 2021-12-21 11:36:59
 * @LastEditTime: 2021-12-22 14:18:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \eight-master111\am-app\src\views\manager\wodeziliao.vue
-->
<template>
  <div>
    <van-nav-bar title="客户评价" />
<van-tabs @click="tabClickHandler" v-model="active" color="#1659a0">
      <van-tab title="优质好评"></van-tab>
      <van-tab title="整改意见"></van-tab> 
      
      <van-cell center title="客户1" value="评价内容" label="xxx工程"icon="friends"size="large"/> 
      <van-cell center title="客户2" value="评价内容" label="xxx工程"icon="friends" size="large"/>
      <van-cell center title="客户3" value="评价内容" label="xxx工程"icon="friends" size="large"/>
      <van-cell center title="客户4" value="评价内容" label="xxx工程"icon="friends" size="large"/>
      <van-cell center title="客户5" value="评价内容" label="xxx工程"icon="friends" size="large"/>
      <van-cell center title="客户6" value="评价内容" label="xxx工程"icon="friends" size="large"/>
      <van-cell center title="客户7" value="评价内容" label="xxx工程"icon="friends" size="large"/>
      <van-cell center title="客户8" value="评价内容" label="xxx工程"icon="friends" size="large"/>
      <van-cell center title="客户9" value="评价内容" label="xxx工程"icon="friends" size="large"/>
      <van-cell center title="客户10" value="评价内容" label="xxx工程"icon="friends" size="large"/>
      <van-cell center title="客户11" value="评价内容" label="xxx工程"icon="friends" size="large"/>
      <van-cell center title="客户12" value="评价内容" label="xxx工程"icon="friends" size="large"/>
      </van-tabs>
  </div>
</template>
 