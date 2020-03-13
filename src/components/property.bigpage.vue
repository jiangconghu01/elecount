<template>
  <div class="page3">
    <div class="chart-box">
      <div class="history item">
        <div class="title">{{type == 'rundataLine' ?'电流计历史数据' : '资产开机时长统计'}}</div>
        <div class="date">
          <ul>
            <li>
              <span>开始时间:</span>
              <el-date-picker
                v-model="begin"
                type="datetime"
                value-format="yyyy-MM-dd HH"
                placeholder="选择日期时间"
              ></el-date-picker>
            </li>
            <li>
              <span>结束时间:</span>
              <el-date-picker
                v-model="end"
                type="datetime"
                value-format="yyyy-MM-dd HH"
                placeholder="选择日期时间"
              ></el-date-picker>
            </li>
          </ul>
          <el-row class="buttons">
            <el-button size="mini" type="primary" @click="searchPageBoxdata()">查询</el-button>
          </el-row>
        </div>

        <div class="chart" id="big_charts_box"></div>
      </div>
    </div>
  </div>
</template>

<script>
import line_config from '../chartconfig/lines.js';
import bar_config from '../chartconfig/bar.js';
export default {
    'props': {
        'charttype': {
            'type': String,
            'required': false
        },
        'rowdata': {
            'type': Object,
            'required': true
        }
    },
    data() {
        return {
            'begin': this.getCurrentDate(),
            'end': this.getCurrentDate(),
            'type': this.charttype,
            'currentRow': this.rowdata
        };
    },
    created() {},
    'components': {},
    'computed': {},
    mounted() {
        const chart_box = this.$echarts.init(
            document.getElementById('big_charts_box')
        );
        if (this.type === 'startBar') {
            chart_box.setOption(bar_config);
        }
        if (this.type === 'rundataLine') {
            chart_box.setOption(line_config);
        }
    },
    'methods': {
        getCurrentDate() {
            var date = new Date();
            var Y = date.getFullYear() + '-';
            var M =
        (date.getMonth() + 1 < 10 ?
            '0' + (date.getMonth() + 1) :
            date.getMonth() + 1) + '-';
            var D =
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
        ':';
            var s =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        },
        searchPageBoxdata() {
            if (this.type === 'startBar') {
                this.getStartdata();
            }
            if (this.type === 'rundataLine') {
                this.getRundata();
            }
        },
        getStartdata() {
            const data = {
                'imei': this.currentRow.imei,
                'beginTime': this.begin.split(' ')[0],
                'endTime': this.end.split(' ')[0]
            };
            this.$http.get('/api/data/startTimeLength', data).then(d => {
                const source = d.data.data;
                const x = source.map(val => {
                    const dstr = val.date.split('-');
                    return dstr[1] + '-' + dstr[2];
                });
                const s_data = source.map(val => {
                    return val.length;
                });
                bar_config.xAxis.data = x;
                bar_config.series[0].data = s_data;
                bar_config.series[0].name = data.imei;
                const bar_box = this.$echarts.init(
                    document.getElementById('big_charts_box')
                );
                bar_box.setOption(bar_config);
            });
        },
        getRundata() {
            const data = {
                'imei': this.currentRow.imei,
                'beginTime': this.begin,
                'endTime': this.end
            };
            this.$http.get('/api/data/electricData', data).then(d => {
                const source = d.data.data;

                let x = [];
                let s_data = [];
                if (Object.prototype.toString.call(source) === '[object Array]') {
                    x = source.map(val => {
                        const date = new Date(val.time);
                        const M =
              (date.getMonth() + 1 < 10 ?
                  '0' + (date.getMonth() + 1) :
                  date.getMonth() + 1) + '-';
                        const day = date.getDate();
                        const hour = date.getHours();
                        return (
                            M +
              (day > 9 ? day : '0' + day) +
              ' ' +
              (hour > 9 ? hour : '0' + hour)
                        );
                    });
                    s_data = source.map(val => {
                        return val.value;
                    });
                }
                line_config.xAxis.data = x;
                line_config.series[0].data = s_data;
                line_config.series[0].name = data.imei;
                const line_box = this.$echarts.init(
                    document.getElementById('big_charts_box')
                );
                line_box.setOption(line_config);
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.page3 {
  .chart-box {
    .item {
      width: 99%;
      padding-left: 5px;
      .title {
        height: 40px;
        line-height: 40px;
        font-weight: bold;
      }
      .buttons {
        text-align: left;
        padding-top: 3px;
        button {
          margin-left: 10px;
        }
      }
      .date {
        display: flex;
        text-align: left;
        margin-bottom: 5px;
        ul {
          li {
            display: inline-block;
            margin-left: 10px;
          }
        }
      }
      .chart {
        height: 380px;
      }
    }
  }
}
</style>
<style >
.el-range-editor.el-input__inner {
  padding: 0;
}
.el-input__inner {
  height: 28px;
  line-height: 28px;
}
.el-button--mini {
  padding: 4px 15px;
}
.el-input--prefix .el-input__inner {
  padding: 0 0 0 30px;
}
.el-input__icon {
  line-height: 28px;
}
</style>