<template>
  <div class="home-detail">
    <article class="center">
      <index-infor></index-infor>
    </article>
    <aside class="right">
      <user-sort></user-sort>
    </aside>
  </div>
</template>
<style lang="scss">
.home-detail {
  flex: 1;
  display: flex;
  height: 100%;
  & > aside {
    height: 100%;
    background: #f1f2f6;
  }
  .center {
    flex: 1;
    background-color: #f1f2f6;
    padding-right: 20px;
  }
  .right {
    width: 400px;
    padding-right: 30px;
    background: #f1f2f6;
  }
}
</style>
<script>
import userSort from '@/components/detail.sort.vue'
import indexInfor from '@/components/detail.infor.vue'

export default {
    'components': {
        userSort,
        indexInfor
    },
    'computed': {},
    'methods': {},
    mounted() {}
}
</script>
