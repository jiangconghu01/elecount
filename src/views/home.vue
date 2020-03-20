<template>
  <div class="home">
    <aside class="left">
      <mu-nav></mu-nav>
    </aside>
    <div class="top-nav">
      <span class="title">资产设备管理平台</span>
      <span class="layout"></span>
      <el-button type="primary" size="mini" @click="systemout">退出</el-button>
      <span class="name">{{userName}}</span>
      <img src="../assets/images/person.png" alt />
    </div>
    <div class="rigth-container">
      <router-view />
    </div>
  </div>
</template>
<style lang="scss">
.home {
  display: flex;
  height: 100%;
  .rigth-container {
    padding-top: 90px;
    background: #f1f2f6;
    display: flex;
    flex: 1;
  }
  .top-nav {
    height: 80px;
    position: fixed;
    right: 0;
    //width: calc(100% - 250px);
    width: 100%;
    display: flex;
    align-items: center;
    background-color: rgb(92, 138, 204);
    .layout {
      flex: 1;
    }
    .title {
      font-size: 20px;
      height: 80px;
      line-height: 80px;
      color: #fff;
      padding: 0 15px;
    }
    .name {
      padding: 0 10px;
      color: #fff;
    }
    img {
      width: 50px;
      height: 50px;
      margin: 0 20px;
    }
  }
  & > aside {
    height: 100%;
    background: #f1f2f6;
  }
  .left {
    width: 260px;
    padding-right: 15px;
  }
}
</style>
<script>
// @ is an alias to /src
import muNav from '@/components/detail.nav.vue';
import utils from '../util/util.js';
// import userSort from "@/components/index.sort.vue";
// import indexInfor from "@/components/index.infor.vue";
// import indexDetail from "./home.detail.vue";

export default {
    'name': 'Home',
    data() {
        return {
            'userName': ''
        };
    },
    'components': {
        muNav
    // userSort,
    // indexInfor,
    // indexDetail
    },
    'methods': {
        systemout() {
            utils.sessionClearStore();
            this.$router.push({ 'path': '/login' });
        }
    },
    mounted() {
        this.userName = utils.sessionGetStore('userName');
    }
};
</script>
