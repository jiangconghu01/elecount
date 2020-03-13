<template>
  <div class="page1">
    <div class="worth-detail-text">
      <ul>
        <li>
          <span>资产名称：{{currentRow.name}}</span>
          <span>资产编码：{{currentRow.assetId}}</span>
          <span>大仪编码：{{currentRow.gs1Code}}</span>
        </li>
        <li>
          <span>IMEI编码：{{currentRow.imei}}</span>
          <span>管理部门：{{currentRow.department}}</span>
          <span>资产地址：{{currentRow.address}}</span>
        </li>
        <li>
          <span>资产价值：{{currentRow.worth}}</span>
          <span>故障状态：{{currentRow.isFault?'故障':'正常'}}</span>
          <span>运行状态：{{currentRow.isStart?'开机':'关机'}}</span>
        </li>
      </ul>
    </div>
    <div class="show-img">
      <ul>
        <li class="title">
          <span>大仪全貌照</span>
          <span>现场安装环境照</span>
          <span>实验室门头照</span>
          <span>设备与检测仪照</span>
        </li>
        <li class="img">
          <div>
            <el-image style="width: 140px;" :src="currentRow.devicePic" :preview-src-list="srcList"></el-image>
          </div>
          <div>
            <el-image style="width: 140px;" :src="currentRow.placePic" :preview-src-list="srcList"></el-image>
          </div>
          <div>
            <el-image style="width: 140px;" :src="currentRow.imeiPic" :preview-src-list="srcList"></el-image>
          </div>
          <div>
            <el-image style="width: 140px;" :src="currentRow.assetPic" :preview-src-list="srcList"></el-image>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    'props': {
        'rowdata': {
            'type': Object,
            'required': true
        }
    },
    data() {
        return {
            'currentRow': this.rowdata
        };
    },
    created() {},
    'components': {},
    'computed': {
        srcList() {
            return [
                this.currentRow.devicePic,
                this.currentRow.placePic,
                this.currentRow.imeiPic,
                this.currentRow.assetPic
            ];
        }
    },
    mounted() {},
    'methods': {}
};
</script>
<style lang="scss">
.page1 {
  .worth-detail-text {
    padding-top: 10px;
    ul {
      li {
        display: flex;
        span {
          text-align: left;
          padding: 15px;
          flex: 1;
        }
      }
    }
  }
  .show-img {
    outline: #eee dotted 2px;
    min-height: 150px;
    li {
      display: flex;
      span {
        flex: 1;
        text-align: center;
        padding: 5px 0px;
      }
    }
    .img {
      div {
        flex: 1;
      }
    }
  }
}
</style>