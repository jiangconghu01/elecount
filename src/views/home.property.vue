 <template>
  <div class="detail">
    <div class="form">
      <el-form :inline="true" :model="formInput" class="form-inline" label-width="70px" size="mini">
        <el-form-item label="大仪编码">
          <el-input v-model="formInput.gs1Code" placeholder="大仪编码"></el-input>
        </el-form-item>
        <el-form-item label="资产编码">
          <el-input v-model="formInput.assetId" placeholder="大仪编码"></el-input>
        </el-form-item>
        <el-form-item label="资产名称">
          <el-input v-model="formInput.name" placeholder="大仪编码"></el-input>
        </el-form-item>
        <el-form-item label="IMEI编码">
          <el-input v-model="formInput.imei" placeholder="大仪编码"></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        :model="formSelect"
        class="form-inline"
        label-width="70px"
        size="mini"
      >
        <el-form-item label="场地">
          <el-select v-model="formSelect.site" placeholder="产地">
            <!-- <el-option label="区域一" value="0"></el-option> -->
            <el-option v-for="(item,index) in siteArr" :label="item" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运动状态">
          <el-select v-model="formSelect.isStart" placeholder="运动状态">
            <el-option label="关机" value="0"></el-option>
            <el-option label="开机" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="在线状态">
          <el-select v-model="formSelect.isOnline" placeholder="在线状态">
            <el-option label="离线" value="0"></el-option>
            <el-option label="在线" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="故障状态">
          <el-select v-model="formSelect.isFault" placeholder="故障状态">
            <el-option label="正常" value="0"></el-option>
            <el-option label="故障" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="button-box">
          <el-button type="primary" @click="search()">查询</el-button>
        </el-form-item>
        <el-form-item class="button-box">
          <el-button type="primary" @click="resetSearch()">重置查询</el-button>
        </el-form-item>
        <el-form-item class="button-box">
          <el-button type="primary" @click="exportExcel()">导出表格</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        height="calc(100% - 60px)"
        style="width: 100%"
        size="mini"
        :row-class-name="tableRowClassName"
        id="data_table"
      >
        <el-table-column prop="name" label="资产名称"></el-table-column>
        <el-table-column prop="assetId" label="编码信息" :formatter="formatCodeInfor"></el-table-column>
        <el-table-column prop="department" label="管理部门"></el-table-column>
        <el-table-column prop="address" label="资产地址"></el-table-column>
        <el-table-column prop="worth" label="资产价值" min-width="120"></el-table-column>
        <el-table-column prop="isOnline" label="运行监控" :formatter="formatRunStatus"></el-table-column>
        <el-table-column
          prop="isFault"
          label="故障状态"
          min-width="80"
          :formatter="(row)=>{return row.isFault?'故障':row.isFault == 0?'正常':'无数据'}"
        ></el-table-column>
        <el-table-column label="操作" min-width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            <!-- <el-button size="mini" type="primary" @click="handleRun(scope.$index, scope.row)">巡检</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40,50]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      ></el-pagination>
    </div>
    <el-dialog title :visible.sync="dialogFormVisible" width="68%">
      <div class="dialog-title">
        <div class="dialog-nav" v-show="dialogCurrent != 'big-page'">
          <div
            class="worth-detail"
            :class="{current:dialogCurrent == 'detail'}"
            @click="handleSelectDetail"
          >资产详情</div>
          <div
            class="run-data"
            :class="{current:dialogCurrent == 'rundata'}"
            @click="handleSelectRunda"
          >运行数据</div>
        </div>
        <div class="big-page" v-show="dialogCurrent == 'big-page'">分页大图</div>
      </div>
      <component
        :is="currentComponent"
        :rowdata="currentRow"
        :charttype="bigtype"
        @handleClick="changeType"
      ></component>
    </el-dialog>
  </div>
</template>

<script>
import worthDetail from '@/components/property.detail.vue'
import worthRundata from '@/components/property.rundata.vue'
import bigChart from '@/components/property.bigpage.vue'
import { mapGetters } from 'vuex'
import U from '../util/util.js'
export default {
    data() {
        return {
            'dialogFormVisible': false,
            'currentComponent': 'worthDetail',
            'formLabelWidth': '120px',
            'formInput': {
                'gs1Code': '',
                'assetId': '',
                'name': '',
                'imei': ''
            },
            'formSelect': {
                'site': '',
                'isStart': '',
                'isOnline': '',
                'isFault': ''
            },
            'tableData': [],
            'totalNum': 0,
            'currentPage': 1,
            'pageSize': 20,
            'dialogCurrent': 'detail',
            'bigtype': '',
            'currentRow': {},
            'siteArr': []
        }
    },
    created() {
        this.getWorthData()
        this.getSiteData()
    },
    'components': {
        worthDetail,
        worthRundata,
        bigChart
    },

    'computed': {
        ...mapGetters({
            'currentSchool': 'school'
        })
    },

    mounted() {
        console.log(this.currentSchool)
    },

    'methods': {
        formatDate(timestamp){
            const date = new Date(timestamp);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate();
            D= (D>9?D:'0'+D)+' '
            let h = date.getHours()
            h= (h>9?h:'0'+h)+ ':';
            let m = date.getMinutes();
            m = (m>9?m:'0'+m)+ ':';
            let s = date.getSeconds();
            s = s>9?s:'0'+s;
            return Y+M+D+h+m+s;
        },
        formatCodeInfor(row) {
            return `
      资产编码：${row.assetId}
      大仪编码：${row.gs1Code}
      IMEI编码：${row.imei}
      `
        },
        formatRunStatus(row) {
            return `
      运行状态：${row.isStart == 1 ? '开机' : '关机'}
      在线状态：${row.isOnline == 1 ? '在线' : '离线'}
      最近上报：${row.lastReportTime == 0 ? '0':this.formatDate(row.lastReportTime)}
      `
        },
        getSiteData() {
            this.$http.get('/api/asset/' + U.sessionGetStore('schoolId')).then(d => {
                const source = d.data.data
                this.siteArr = source
            })
        },
        getWorthData() {
            const param = {
                'pageNo': this.currentPage,
                'pageSize': this.pageSize,
                'school':  U.sessionGetStore('schoolId')
            }
            this.$http
                .get('/api/asset/page', {
                    ...param,
                    ...this.formInput,
                    ...this.formSelect
                })
                .then(d => {
                    const source = d.data.data
                    this.tableData = source.records
                    this.totalNum = source.total
                })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.getWorthData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getWorthData()
        },
        tableRowClassName({ rowIndex }) {
            if (rowIndex % 2 == 0) {
                return 'warning-row'
            }
            return 'success-row'

        },
        handleEdit(index, row) {
            this.dialogFormVisible = true
            this.currentRow = row
            this.dialogCurrent = 'detail'
            this.currentComponent = 'worthDetail'
        },
        // handleRun(index, row) {
        //   console.log(index, row);
        // },
        handleSelectDetail() {
            this.dialogCurrent = 'detail'
            this.currentComponent = 'worthDetail'
        },
        handleSelectRunda() {
            this.dialogCurrent = 'rundata'
            this.currentComponent = 'worthRundata'
        },
        changeType(val) {
            this.bigtype = val
            this.dialogCurrent = 'bigpage'
            this.currentComponent = 'bigChart'
        },
        search() {
            this.getWorthData()
        },
        resetSearch() {
            this.formInput = {
                'gs1Code': '',
                'assetId': '',
                'name': '',
                'imei': ''
            }
            this.formSelect = {
                'site': '',
                'isStart': '',
                'isOnline': '',
                'isFault': ''
            }
        },
        exportExcel() {
            U.xlsxExport.exportXlsx(
                [{ 'name': 'xxx', 'data': this.tableData }],
                '表格数据'
            )
        }
    }
}
</script>
<style lang="scss" scoped>
.detail {
  flex: 1;
  height: 100%;
  background-color: #f1f2f6;
      display: flex;
    flex-direction: column;
    height: calc(100% - 30px);
  .form {
    // height: 170px;
    padding-top: 20px;
    width: 98%;
    background-color: #fff;
  }
  .form-inline {
    text-align: left;
    padding-left: 20px;
  }
  .table {
    width: 98%;
    padding-top: 20px;
    flex: 1;
    overflow-y: auto;
    thead {
      th {
        background-color: #2a82db;
      }
    }
  }
  .dialog-title {
    background-color: #2a83d9;
    color: rgba(255, 255, 255, 0.5);
  }
  .dialog-nav {
    display: flex;
    width: 180px;
    & > div {
      width: 90px;
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      font-weight: bold;
    }
    .current {
      color: #fff;
    }
  }
  .big-page {
    height: 36px;
    line-height: 36px;
    color: #fff;
  }
}
</style>
<style>
.el-form-item--mini .el-form-item__content {
  width: 120px;
}
.button-box.el-form-item--mini .el-form-item__content {
  width: auto;
}
.el-table .warning-row {
  background: #ebeef3;
}

.el-table .success-row {
  background: #fff;
}
.el-table th {
  background-color: #2a82db;
  color: #fff;
}
.el-pagination {
  text-align: left;
}
.el-table .cell {
  text-align: center;
}
.el-table th > .cell {
  text-align: center;
}
.el-dialog__header {
  padding: 0;
}
.el-dialog__headerbtn {
  top: 10px;
}
.el-table .cell {
  white-space: pre-line;
}
</style>
