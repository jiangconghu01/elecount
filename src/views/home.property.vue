<template>
  <div class="detail">
    <div class="form">
      <el-form :inline="true" :model="formInline" class="form-inline" label-width="70px" size="mini">
        <el-form-item label="大仪编码">
          <el-input v-model="formInline.user" placeholder="大仪编码"></el-input>
        </el-form-item>
        <el-form-item label="资产编码">
          <el-input v-model="formInline.user" placeholder="大仪编码"></el-input>
        </el-form-item>
        <el-form-item label="资产名称">
          <el-input v-model="formInline.user" placeholder="大仪编码"></el-input>
        </el-form-item>
        <el-form-item label="IMEI编码">
          <el-input v-model="formInline.user" placeholder="大仪编码"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="formInline2" class="form-inline" label-width="70px" size="mini">
        <el-form-item label="场地">
          <el-select v-model="formInline.region" placeholder="产地">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运动状态">
          <el-select v-model="formInline.region" placeholder="产地">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="在线状态">
          <el-select v-model="formInline.region" placeholder="产地">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="场地">
          <el-select v-model="formInline.region" placeholder="产地">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item class="button-box">
            <el-button  type="primary">查询</el-button>
          </el-form-item>
          <el-form-item class="button-box">
            <el-button type="primary">重置查询</el-button>
          </el-form-item>
          <el-form-item class="button-box">
            <el-button type="primary">导出表格</el-button>
          </el-form-item>
      </el-form>
    </div>
    <div class="table">
        <el-table
          :data="tableData"
          height="150" 
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">巡检</el-button>
              </template>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formInline: {
        user: '',
      },
      formInline2: {
        region: ''
      },
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  components: {},

  computed: {},

  mounted () {
  },

  methods: {
      tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 == 0) {
        return 'warning-row';
      } else  {
        return 'success-row';
      }
      return '';
    },
    handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }  
  }
}
</script>
<style lang="scss" scoped>
.detail{
  flex: 1;
  height: 100%;
  background-color:#f1f2f6;
  .form{
    // height: 170px;
    padding-top:20px;
    width: 98%;
    background-color:#fff;
  }
  .form-inline{
    text-align: left;
    padding-left: 20px;
  }
  .table{
    width: 98%;
    padding-top:20px;
    thead{
      th{
        background-color:#2A82DB;
      }
    }
  }
}
</style>
<style>
.el-form-item--mini .el-form-item__content{
  width: 120px;
}
.button-box.el-form-item--mini .el-form-item__content{
  width: auto;
}
.el-table .warning-row {
  background: #EBEEF3;
}

.el-table .success-row {
  background: #fff;
}
.el-table th{
  background-color:#2A82DB;
  color:#fff;
}
</style>