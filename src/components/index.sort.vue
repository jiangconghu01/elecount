<template>
  <div class="user-sort">
    <div class="title">
      <div class="text">排行榜</div>
      <div class="icon"></div>
    </div>
    <div class="button">
      <div class="most"></div>
      <div class="least"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.user-sort {
  height: 100%;
  //   background-color: lightcyan;
  & > div {
    background-color: #fff;
  }
  .title {
    height: 160px;
  }
  .button {
    display: flex;
    & > div {
      height: 100%;
      cursor: pointer;
    }
    .most {
      background-color: #2c81dd;
      width: 50%;
    }
    .least {
      flex: 1;
    }
    height: 30px;
  }
}
</style>
