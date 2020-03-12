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
          const source =  d.data.data
          this.ajaxData = source;
          const status_chart_box = this.$echarts.init(
            document.getElementById("chart_bar")
          );
          status_chart_box.resize();
          status_chart_box.clear();
          const max = source.totalNum;
          bar_status_config.angleAxis.max = max;
          const colors = ['#E8E5E9','#6588C5','#EA7C72','#ECD476','#E8E5E9']
          const bar_data = [
                {name: "", value: max},
                {name: "待电", value: source.waitNum},
                {name: "断电", value: source.stopNum},
                {name: "运行", value: source.waitNum},
                {name: "装饰", value: max},
          ].map((val,i) => {
              val.itemStyle = {
                  color:colors[i]
              }
              i == 4 && (val.itemStyle.barWidth = 5);
              return val;
          });
          bar_status_config.series[0].data = bar_data;
          status_chart_box.setOption(bar_status_config);
        });
    },
    getDistributeData() {
          const distribute_chart_box = this.$echarts.init(
            document.getElementById("chart_bar")
          );
          distribute_chart_box.resize();
          distribute_chart_box.clear();
    },
    getStatisticsData() {
      this.$http
        .get("/api/statis/asset/school", { school: this.currentSchool })
        .then(d => {

          const source = d.data.data;
          if(source.length){
            const xaxis = source[0]['hourList'].map(val => val['hour'])
            line_statistics_config.xAxis.data = xaxis;
            
            const colors = ["#FFB43F","#1058E6", "#EC511A"];
            const series = [];
            source.forEach((ele,index) => { 
              const seriesdata = {
                type: "line",
                data: ele['hourList'].map(val => val['num']),
                // name:"school",
                symbol: "circle",
                symbolSize: 5,
                areaStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color:colors[index%3]
                        },
                        {
                          offset: 0.8,
                          color: "#fff"
                        }
                      ],
                      false
                    ),
                    shadowColor: "rgba(200, 200, 200, 0.1)",
                    shadowBlur: 10
                  }
                }
              }
              series.push(seriesdata)
            });
            
            line_statistics_config.series = series;
          }
          
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
    isCurrent(n) {
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
