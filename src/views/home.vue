<template>
  <div class="home">
    <aside class="left">
      <mu-nav></mu-nav>
    </aside>
    <article class="center">
      <index-infor></index-infor>
    </article>
    <aside class="right">
      <user-sort></user-sort>
    </aside>
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
    width: 240px;
    padding-right: 15px;
  }
  .center {
    flex: 1;
    background-color: #f1f2f6;
    padding-right: 20px;
  }
  .right {
    width: 380px;
    padding-right: 30px;
    background: #f1f2f6;
  }
}
</style>
<script>
// @ is an alias to /src
import muNav from "@/components/index.nav.vue";
import userSort from "@/components/index.sort.vue";
import indexInfor from "@/components/index.infor.vue";

export default {
  name: "Home",
  components: {
    muNav,
    userSort,
    indexInfor
  }
};
</script>
