<template>
    <div class="page2">
        <ul class="text">
            <li>
                <span> 电流计类型：<i>{{titleData.deviceType}}</i></span>
                <span> 电流计状态：<i>{{titleData.isOnline == 1 ? '在线' : '离线'}}</i></span>
                <span> 资产当前电流<i>{{titleData.electricValue+'/A'}}</i></span>
                <span> 总开机时长(分)：<i>{{titleData.totalStartTime}}</i></span>
                <span> 昨日开机时长(分)：<i>{{titleData.yesterdayStartTime}}</i></span>
            </li>
            <li>
               <span> 近七天是否运行：<i>{{titleData.isWeekStart == 1 ? '是' : '否'}}</i></span> 
               <span> 昨日非常规时间是否运行：<i>{{titleData.isExceptStart == 1 ? '是' : '否'}}</i></span> 
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
                            v-model="begin1"
                            type="datetime" 
                            value-format="yyyy-MM-dd HH"
                            placeholder="选择日期时间">
                            </el-date-picker>
                        </li>
                        <li>
                            <span>结束时间:</span>
                            <el-date-picker
                            v-model="end1"
                            type="datetime" 
                            value-format="yyyy-MM-dd HH"
                            placeholder="选择日期时间">
                            </el-date-picker>   
                        </li>
                    </ul>
                </div>
                <el-row class="buttons">
                <el-button size="mini" type="primary"  @click="searchImei()">查询</el-button>
                <el-button size="mini" type="primary"  @click="resetImeiSearch()">重置查询</el-button>
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
                            v-model="begin2"
                            type="datetime" 
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期时间">
                            </el-date-picker>
                        </li>
                        <li>
                            <span>结束时间:</span>
                            <el-date-picker
                            v-model="end2"
                            type="datetime" 
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期时间">
                            </el-date-picker>   
                        </li>
                    </ul>
                </div>
                <el-row class="buttons">
                <el-button size="mini" type="primary" @click="searchStart()">查询</el-button>
                <el-button size="mini" type="primary" @click="resetStartSearch()">重置查询</el-button>
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
        begin1:this.getCurrentDate(),
        end1:this.getCurrentDate(),
        begin2:'',
        end2:'',
        titleData:{
            deviceType:'',
            electricValue:'',
            isOnline:'',
            totalStartTime:'',
            yesterdayStartTime:'',
            isWeekStart:'',
            isExceptStart:''
        }
    }
  },
  created(){
      this.getRundata();
      this.getStartdata();
      this.getTitleData();
  },
  components: {},
  computed: {    
  },
  mounted () {
 
      const bar_box = this.$echarts.init(document.getElementById('start_time'));
      bar_box.setOption(bar_config);

  },
  methods: {
      searchImei(){
          this.getRundata();
      },
      resetImeiSearch(){
          this.begin1 = '';
          this.end1 = '';
      },
      searchStart(){
          this.getStartdata();
      },
      resetStartSearch(){
          this.begin2 = '';
          this.end2 = '';
      },
      toBigpage(param){
          this.$emit('handleClick',param)
      },
      getCurrentDate(){
        var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
      },
      getTitleData(){
        this.$http.get("/api/asset/data/"+this.currentRow.id).then((d) => {
            const source  = d.data.data;
            this.titleData = source;
        })
      },
      getStartdata(){
        const data = {
            imei:this.currentRow.imei,
            beginTime:this.begin2,
            endTime:this.end2
        }
        this.$http.get("/api/data/startTimeLength", data).then((d) => {
            const source  = d.data.data;
            const x = source.map(val=>{
                const dstr = val.date.split('-');
                return dstr[1]+'-'+dstr[2];
            })
            const s_data = source.map(val=>{
                return val.length;
            })
            bar_config.xAxis.data = x;
            bar_config.series[0].data = s_data;
            bar_config.series[0].name = data.imei;
            const bar_box = this.$echarts.init(document.getElementById('start_time'));
            bar_box.setOption(bar_config);
        })
      },
      getRundata(){
        const data = {
            imei:this.currentRow.imei,
            beginTime:this.begin1,
            endTime:this.end1
        }
        this.$http.get("/api/data/electricData", data).then((d) => {
            const source  = d.data.data;
            let x = [];
            let s_data = [];
            if(Object.prototype.toString.call(source) === "[object Array]"){
                 x = source.map(val=>{
                    const date = new Date(val.time);
                    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    const day = date.getDate();
                    const hour = date.getHours();
                    return  M + (day>9?day:'0'+day) + ' '+ (hour>9?hour:'0'+hour);
                })
                s_data = source.map(val=>{
                    return val.value;
                })
            }
            line_config.xAxis.data = x;
            line_config.series[0].data = s_data;
            line_config.series[0].name = data.imei;
            const line_box = this.$echarts.init(document.getElementById('rundata_history'));
            line_box.setOption(line_config);
        })
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