<template>
  <div class="home-infor">
    <div class="infor-nav">
      <div
        class="item status"
        :class="{ current: isCurrent == 'status' }"
        @click="setStatus()"
      >
        <span>仪器实时状态</span>
        <img src="../assets/images/top_nav1.png" />
      </div>
      <div
        class="item distribute"
        :class="{ current: isCurrent == 'distribute' }"
        @click="setDistribute()"
      >
        <span>设备分布</span>
        <img src="../assets/images/top_nav2.png" />
      </div>
      <div
        class="item statistics"
        :class="{ current: isCurrent == 'statistics' }"
        @click="setStatistics()"
      >
        <span>学院时段统计</span>
        <img src="../assets/images/top_nav3.png" />
      </div>
    </div>
    <div class="chart-container" :class="isCurrent">
      <div
        class="chart"
        id="chart_bar"
        :style="{ width: isCurrent == 'status' ? '70%' : '100%' }"
      ></div>
      <div class="legend" v-show="isCurrent == 'status'">
        <ul>
          <li>
            <img src="../assets/images/legend1.png" alt="" /><span
              >一共{{ ajaxData.totalNum ? ajaxData.totalNum : 0 }}台机器</span
            >
          </li>
          <li>
            <img src="../assets/images/legend2.png" /><span
              style="color:#6588C5"
              >{{ ajaxData.waitNum ? ajaxData.waitNum : 0 }}台待机</span
            >
          </li>
          <li>
            <img src="../assets/images/legend3.png" /><span
              style="color:#EA7C72"
              >{{ ajaxData.stopNum ? ajaxData.stopNum : 0 }}台断电</span
            >
          </li>
          <li>
            <img src="../assets/images/legend4.png" /><span
              style="color:#ECD476"
              >{{ ajaxData.runNum ? ajaxData.runNum : 0 }}台在运行</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import bar_status_config from "../chartconfig/bar_status_config";
import line_statistics_config from "../chartconfig/line_statitics_config";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isCurrent: "status",
      ajaxData: ""
    };
  },
  computed: {
    ...mapGetters({
      currentSchool: "school"
    })
  },
  created() {
    this.getStatusData();
  },
  methods: {
    setStatus() {
      this.isCurrent = "status";
    },
    setDistribute() {
      this.isCurrent = "distribute";
    },
    setStatistics() {
      this.isCurrent = "statistics";
    },
    getStatusData() {
      this.$http
        .get("/api/statis/asset/home", { school: this.currentSchool })
        .then(d => {
          this.ajaxData = d.data.data;
          const status_chart_box = this.$echarts.init(
            document.getElementById("chart_bar")
          );
          status_chart_box.resize();
          status_chart_box.clear();
          status_chart_box.setOption(bar_status_config);
        });
    },
    getDistributeData() {},
    getStatisticsData() {
      this.$http
        .get("/api/statis/asset/school", { school: this.currentSchool })
        .then(d => {
          this.ajaxData = d.data.data;
          this.$nextTick(() => {
            const statistics_chart_box = this.$echarts.init(
              document.getElementById("chart_bar")
            );
            statistics_chart_box.resize();
            statistics_chart_box.clear();
            statistics_chart_box.setOption(line_statistics_config);
          });
        });
    }
  },
  mounted() {},
  watch: {
    isCurrent(n, o) {
      n == "status" && this.getStatusData();
      n == "distribute" && this.getDistributeData();
      n == "statistics" && this.getStatisticsData();
    }
  }
};
</script>
<style lang="scss">
.home-infor {
  height: 100%;

  .infor-nav {
    display: flex;
    .item {
      flex: 1;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      font-size: 18px;
      cursor: pointer;
      span {
        margin-right: 10px;
      }
      img {
        height: 80px;
        width: 80px;
      }
    }
    .current {
      background-image: linear-gradient(
        -5deg,
        #26a3ed,
        rgba(192, 227, 248, 0.2)
      );
      color: #fff;
    }
    .distribute {
      margin: 0 20px;
    }
  }
  .chart-container {
    background-color: #fff;
    margin-top: 25px;
    height: calc(100% - 200px);
    position: relative;
    &::before {
      content: "";
      display: inline-block;
      height: 20px;
      width: 20px;
      position: absolute;
      transform: rotate(45deg);
      top: -10px;
      background-color: #fff;
    }
    &.status::before {
      left: 12%;
    }
    &.statistics::before {
      right: 12%;
    }
    .chart {
      height: 100%;
      width: 70%;
    }
    .legend {
      height: 100%;
      width: 30%;
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      li {
        display: flex;
        margin-top: 10px;
        img {
          height: 24px;
          width: 24px;
        }
        span {
          margin-left: 5px;
          height: 24px;
          line-height: 24px;
        }
      }
    }
  }
}
</style>
