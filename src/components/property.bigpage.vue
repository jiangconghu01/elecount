<template>
      <div class="page3">
              <div class="page2">

        <div class="chart-box">
            <div class="history item">
                <div class="title">电流计历史数据</div>
                <div class="date">
                    <ul>
                        <li>
                            <span>开始时间:</span>
                            <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                            </el-date-picker>
                        </li>
                        <li>
                            <span>结束时间:</span>
                            <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                            </el-date-picker>   
                        </li>
                    </ul>
                    <el-row class="buttons">
                    <el-button size="mini" type="primary">查询</el-button>
                    </el-row>
                </div>

                <div class="chart" id="rundata_history">

                </div>
            </div>
        </div>
    </div>
      </div>
</template>

<script>
export default {
  props:{
    charttype: {
      type: String,
      required: false
    }
  },
  data () {
    return {
        value1:'',
        type:this.charttype
    }
  },
  created(){
  },
  components: {},
  computed: {   
  },
  mounted () {
      console.log(this.type)
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.page3{
      .chart-box{
        .item{
            width: 99%;
            padding-left: 5px;
            .title{
                height: 40px;
                line-height: 40px;
                font-weight: bold;
            }
            .buttons{
                text-align: left;
                padding-top: 3px;
                button{
                    margin-left: 10px;
                }
            }
            .date{
                text-align: left;
                margin-bottom: 5px;
                ul{
                    li{
                        float: left;
                        margin-left: 10px;
                    }
                }
            }
            .chart{
                height: 250px;
            }
        }
    }
}
</style>
<style >
.el-range-editor.el-input__inner{
    padding: 0;
}
.el-input__inner{
    height: 28px;
    line-height: 28px;
}
.el-button--mini{
    padding:4px 15px;
}
.el-input--prefix .el-input__inner{
    padding: 0 0 0 30px;
}
.el-input__icon{
    line-height: 28px;
}
</style>