<template>
  <div class="user-sort">
    <div class="title">
      <div class="text">
        <span>排行榜</span>
      </div>
      <div class="icon">
        <img src="../assets/images/top_nav4.png" alt />
      </div>
    </div>
    <div class="button">
      <div class="most" :class="{current: current == 'most'}" @click="useMost()">使用最多</div>
      <div class="least" :class="{current: current == 'least'}" @click="useLeast()">使用最少</div>
    </div>
    <div class="sort-list">
      <ul class="list-title">
        <li>序号</li>
        <li>资产</li>
        <li>管理部门</li>
        <li>累计时长</li>
      </ul>
      <ul class="list-data">
        <li v-for="(item,index) of top3" :key="index+'top3'">
          <span class="number">
            <img :src="require('../assets/images/sort'+(index+1)+'.png')" alt />
          </span>
          <span class="text">{{item.name}}</span>
          <span class="text">{{item.department}}}</span>
          <span class="text">{{item.runLength}}</span>
        </li>
        <li v-for="(item,index) of topother" :key="index+'topoth'">
          <span class="number">{{index + 4}}</span>
          <span class="text">{{item.name}}</span>
          <span class="text">{{item.department}}}</span>
          <span class="text">{{item.runLength}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import U from '../util/util.js';
export default {
    data() {
        return {
            'sortdata': [],
            'current': 'most'
        };
    },
    created() {
        this.getSortData();
    },
    'components': {},
    'computed': {
        ...mapGetters({
            'currentSchool': 'school'
        }),
        top3() {
            return this.sortdata.length > 3 ?
                this.sortdata.slice(0, 3) :
                this.sortdata;
        },
        topother() {
            return this.sortdata.length > 3 ? this.sortdata.slice(3) : [];
        }
    },
    mounted() {},
    'methods': {
        useMost() {
            this.current = 'most';
            this.getSortData();
        },
        useLeast() {
            this.current = 'least';
            this.getSortData();
        },
        getSortData() {
            const data = {
                'school':  U.sessionGetStore('schoolId'),
                'date': '2020-03-01',
                'orderBy': 1, //排序类型 1-运行时长 2-待机时长 3-断电时长
                'isDesc': this.current == 'most' ? 1 : 0, //是否倒序 0-正序 1-倒序
                'limit': 30
            };
            this.$http.get('/api/statis/asset/use', data).then(d => {
                const source = d.data.data;
                this.sortdata = source;
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.user-sort {
  height: 100%;
  //   background-color: lightcyan;
  & > div {
    background-color: #fff;
  }
  .title {
    height: 140px;
    display: flex;
    & > div {
      height: 160px;
      height: 100%;
      width: 48%;
      position: relative;
    }
    .text {
      font-size: 20px;
      span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 15%;
      }
    }
    img {
      width: 80px;
      height: 80px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 15%;
    }
  }
  .button {
    display: flex;
    & > div {
      height: 100%;
      cursor: pointer;
      background: #dee0e2;
    }
    .most {
      width: 50%;
    }
    .least {
      flex: 1;
    }
    .current {
      background-color: rgba(44, 129, 221, 0.8);
    }
    height: 30px;
    line-height: 30px;
  }
  .sort-list {
    height: calc(100% - 200px);
    overflow-y: auto;
    .list-title {
      display: flex;
      list-style: none;

      color: rgba(44, 129, 221, 0.8);
      li {
        flex: 1;
        height: 35px;
        line-height: 35px;
        font-weight: bold;
      }
    }
  }
  .list-data {
    font-size: 12px;
    li:nth-child(2n-1) {
      background-color: #eee;
    }
    li {
      display: flex;
      align-items: center;
      min-height: 38px;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }
      img {
        width: 38px;
        height: 38px;
      }
      .number {
        flex: 1;
      }
      .text {
        flex: 1;
      }
    }
  }
}
</style>
