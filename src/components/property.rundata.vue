<template>
    <div class="page2">
        <ul class="text">
            <li>
                <span> 电流计类型：<i>担心</i></span>
                <span> 电流计状态：<i>担心</i></span>
                <span> 资产当前电流<i>担心</i></span>
                <span> 总开机时长(分)：<i>担心</i></span>
                <span> 昨日开机时长(分)：<i>担心</i></span>
            </li>
            <li>
               <span> 近七天是否未运行：<i>是</i></span> 
               <span> 昨日非常规时间是否运行：<i>是</i></span> 
            </li>
        </ul>
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
                </div>
                <el-row class="buttons">
                <el-button size="mini" type="primary">查询</el-button>
                <el-button size="mini" type="primary">重置查询</el-button>
                <el-button size="mini" type="primary"  @click="toBigpage('rundataLine')">分页大图</el-button>
                </el-row>
                <div class="chart" id="rundata_history">

                </div>
            </div>
            <div class="start item">
                <div class="title">资产开机时长统计</div>
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
                </div>
                <el-row class="buttons">
                <el-button size="mini" type="primary">查询</el-button>
                <el-button size="mini" type="primary">重置查询</el-button>
                <el-button size="mini" type="primary" @click="toBigpage('startBar')">分页大图</el-button>
                </el-row>
                <div class="chart" id="start_time">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import line_config from '../chartconfig/lines.js';
import bar_config from '../chartconfig/bar.js';
export default {
  props:{
    rowdata: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
        currentRow:this.rowdata,
        value1:''
    }
  },
  created(){
  },
  components: {},
  computed: {    
  },
  mounted () {
      const line_box = this.$echarts.init(document.getElementById('rundata_history'));
      line_box.setOption(line_config);
      const bar_box = this.$echarts.init(document.getElementById('start_time'));
      bar_box.setOption(bar_config);

  },
  methods: {
      toBigpage(param){
          this.$emit('handleClick',param)
      }
  }
}
</script>
<style lang="scss" scoped>
.page2{
    background-color:#F7F5F6;
    .text{
        padding: 10px;
        li{
            margin-top: 10px;
            text-align:left;
            span{
                line-height: 28px;
                margin-left: 10px;
                i{
                    color:#2A82DD
                }
            }
        }
    }
    .chart-box{
        display: flex;
        .item{
            width: 49%;
            padding-left: 5px;
            .title{
                height: 40px;
                line-height: 40px;
                font-weight: bold;
            }
            .buttons{
                text-align: left;
            }
            .date{
                text-align: left;
                margin-bottom: 5px;
            }
            .chart{
                height: 250px;
            }
        }
        .start{
            margin-left: 2%;
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