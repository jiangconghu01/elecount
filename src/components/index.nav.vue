<template>
  <div class="mu-container">
    <el-menu
      :default-active="indexNav"
      class="el-menu-nav"
      @open="handleOpen"
      @close="handleClose"
      background-color="#5c8acc"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item index="1" class="log">
        <span slot="title">资产设备管理平台</span>
      </el-menu-item>
      <el-menu-item index="2" style="padding-left:30px;" @click="toHome()">
        <i
          class="icon"
          :style="
            'background: url(' +
              require('../assets/images/sideNav1.png') +
              ') no-repeat left center;background-position-y:17px;'
          "
        ></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="3" style="padding-left:30px;" @click="toProperty()">
        <i
          class="icon"
          :style="
            'background: url(' +
              require('../assets/images/sideNav2.png') +
              ') no-repeat left center;'
          "
        ></i>
        <span slot="title">资产管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import utils from '../util/util.js';
export default {
    data() {
        return {
            'indexNav': '2'
        };
    },
    created() {
        const routerMap = {
            '/index/detail': '2',
            '/index/property': '3'
        };
        this.indexNav = routerMap[this.$router.history.current.path];
    },
    'methods': {
        handleOpen() {},
        handleClose() {},
        toHome() {
            this.$router.push('/index/detail');
        },
        toProperty() {
            this.$router.push('/index/property');
        }
    },
    'watch': {
        indexNav(ind) {
            utils.sessionSetStore('routerindex', ind);
        }
    },
    mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.mu-container {
  height: 100%;
  .el-menu-nav {
    // height: calc(100% - 120px);
    height: 100%;
    .log {
      font-size: 20px;
      height: 80px;
      display: flex;
      align-items: center;
      // justify-content: center;
      padding: 0 10px;
    }
    .icon {
      display: inline-block;
      width: 20px;
      height: 56px;
      margin-right: 10px;
    }
  }
}
</style>
<style>
.el-menu-item {
  padding: 0 10px 0 35px;
  text-align: left;
}
.el-menu-item.is-active {
  background-color: #4075c5 !important;
}
</style>
