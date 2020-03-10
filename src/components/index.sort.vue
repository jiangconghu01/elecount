<template>
  <div class="user-sort">
    <div class="title">
      <div class="text"><span>排行榜</span></div>
      <div class="icon">
        <img src="../assets/images/top_nav4.png" alt="" />
      </div>
    </div>
    <div class="button">
      <div class="most current">使用最多</div>
      <div class="least">使用最少</div>
    </div>
    <div class="sort-list">
      <ul class="list-title">
        <li>序号</li>
        <li>资产</li>
        <li>管理部门</li>
        <li>累计时长</li>
      </ul>
      <ul class="list-data">
        <li>
          <span class="number">
            <img src="../assets/images/sort1.png" alt="" />
          </span>
          <span class="text">总有机炭仪器分析仪</span>
          <span class="text">杭州电子科技大学材料工程学院</span>
          <span class="text">50000小时</span>
        </li>
        <li>
          <span class="number">
            4
          </span>
          <span class="text">总有机炭仪器分析仪</span>
          <span class="text">杭州电子科技大学材料工程学院</span>
          <span class="text">50000小时</span>
        </li>
      </ul>
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
    height: 140px;
    display: flex;
    & > div {
      height: 160px;
      height: 100%;
      width: 48%;
      position: relative;
    }
    .text {
      font-size: 20px;
      span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 15%;
      }
    }
    img {
      width: 80px;
      height: 80px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 15%;
    }
  }
  .button {
    display: flex;
    & > div {
      height: 100%;
      cursor: pointer;
      background: #dee0e2;
    }
    .most {
      width: 50%;
    }
    .least {
      flex: 1;
    }
    .current {
      background-color: rgba(44, 129, 221, 0.8);
    }
    height: 30px;
    line-height: 30px;
  }
  .sort-list {
    .list-title {
      display: flex;
      list-style: none;

      color: rgba(44, 129, 221, 0.8);
      li {
        flex: 1;
        height: 35px;
        line-height: 35px;
        font-weight: bold;
      }
    }
  }
  .list-data {
    font-size: 12px;
    li:nth-child(2n-1) {
      background-color: #eee;
    }
    li {
      display: flex;
      align-items: center;
      min-height: 38px;

      img {
        width: 38px;
        height: 38px;
      }
      .number {
        flex: 1;
      }
      .text {
        flex: 1;
      }
    }
  }
}
</style>
