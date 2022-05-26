<!--
 * @Description: 
 * @Author: charles
 * @Date: 2020-08-04 16:47:38
 * @LastEditors: charles
 * @LastEditTime: 2021-12-16 14:51:59
-->
<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="config.logo" :src="config.logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ config.name }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="config.logo" :src="config.logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ config.name }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  computed:{
    ...mapGetters(['config'])
  },
  methods:{
    ...mapActions('app',['loadConfig'])
  },
  mounted(){
    this.loadConfig();
  },
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #4fbc8d;
  text-align: center;
  overflow: hidden;
  margin-bottom: .5em;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #ffffff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
