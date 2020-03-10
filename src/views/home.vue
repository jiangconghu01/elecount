<template>
  <div class="home">
    <aside class="left">
      <mu-nav></mu-nav>
    </aside>
    <!-- <article class="center">
      <index-infor></index-infor>
    </article>
    <aside class="right">
      <user-sort></user-sort>
    </aside> -->
    <router-view />
    <!-- <index-detail></index-detail> -->
  </div>
</template>
<style lang="scss">
.home {
  display: flex;
  height: 100%;

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
import muNav from "@/components/index.nav.vue";
// import userSort from "@/components/index.sort.vue";
// import indexInfor from "@/components/index.infor.vue";
// import indexDetail from "./home.detail.vue";

export default {
  name: "Home",
  components: {
    muNav,
    // userSort,
    // indexInfor,
    // indexDetail
  }
};
</script>
