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
                    <span>时间范围：</span>
                    <el-date-picker
                        v-model="value1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <el-row class="buttons">
                <el-button size="mini" type="primary">查询</el-button>
                <el-button size="mini" type="primary">重置查询</el-button>
                <el-button size="mini" type="primary">分页大图</el-button>
                </el-row>
                <div class="chart">

                </div>
            </div>
            <div class="start item">

            </div>
        </div>
    </div>
</template>

<script>
export default {
  props:{
    rowdata: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
        currentRow:this.rowdata
    }
  },
  created(){
  },
  components: {},
  computed: {    
  },
  mounted () {
  },
  methods: {
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
        height: 400px;
        .item{
            width: 50%;
            background-color: cyan;
            .title{
                height: 40px;
                line-height: 40px;
                font-weight: bold;
            }
            .buttons{
                text-align: left;
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
</style>