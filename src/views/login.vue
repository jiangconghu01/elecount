// 登录页
<template>
  <div class="login">
    <!-- 粒子效果 -->
    <vue-particles
      color="#BACAD9"
      :particleOpacity="0.7"
      :particlesNumber="30"
      shapeType="circle"
      :particleSize="4"
      linesColor="#BACAD9"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="200"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    ></vue-particles>
    <!-- 主体内容 -->
    <div class="main_box">
      <!-- 公司logo及名称 -->
      <div class="companyInfo">
        <!-- <img src="../assets/img/login_logo.png" alt=""> -->
        <p>资产云</p>
      </div>
      <!-- 表单部分 -->
      <div class="formBox">
        <!--用户登录-->
        <el-form :model="ruleFormLogin" label-position="left" label-width="0px" class="loginForm">
          <!-- <h3 class="title">账户密码登录</h3> -->
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-user"
              type="text"
              v-model="ruleFormLogin.username"
              auto-complete="off"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              type="password"
              v-model="ruleFormLogin.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" round @click="userLandBt">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import utils from '../util/util.js';
import { mapMutations } from 'vuex';
export default {
    'name': 'login',
    data() {
        return {
            'ruleFormLogin': {
                'username': '',
                'password': ''
            }
        };
    },
    created() {},
    'methods': {
        ...mapMutations(['setSchool', 'setUserInfor']),
        'userLandBt': function() {
            if (!this.ruleFormLogin.username || this.ruleFormLogin.username === '') {
                this.$notify({
                    'title': '提示',
                    'message': '请输入用户名',
                    'type': 'warning'
                });
                return;
            }
            if (!this.ruleFormLogin.password || this.ruleFormLogin.password === '') {
                this.$notify({
                    'title': '提示',
                    'message': '请输入密码',
                    'type': 'warning'
                });
                return;
            }
            let paramObj = {
                'account': this.ruleFormLogin.username,
                'password': this.ruleFormLogin.password
            };
            // 登录
            this.loginFunc(paramObj);
        },
        loginFunc(paramObj) {
            this.$http
                .post('/api/user/login', paramObj)
                .then(res => {
                    const response = res.data;
                    if (response.data.roleId != 3) {
                        this.$notify({
                            'title': '错误提示',
                            'message': '账号没有登录权限！',
                            'type': 'error'
                        });
                        return;
                    }
                    utils.sessionSetStore('userId', response.data.id);
                    utils.sessionSetStore('schoolId', response.data.schoolId);
                    utils.sessionSetStore('userName', response.data.name);
                    this.$router.push({
                        'path': '/index'
                    });
                })
                .catch(function(err) {
                    console.log(err);
                    this.$notify({
                        'title': '错误提示',
                        'message': '用户名或密码错误，请重新登录',
                        'type': 'error'
                    });
                });
        }
    }
};
</script>
<style lang="scss" scoped>
.login {
  position: relative;
  height: 100%;
  overflow: hidden;
  .lizi {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #5a8acc;
    z-index: 1;
  }
  .main_box {
    position: absolute;
    width: 368px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // top: 100px;
    // transform: translateX(-50%);
    z-index: 2;
    .companyInfo {
      img {
        display: block;
        width: 240px;
        margin: 0 auto;
      }
      p {
        font-size: 18px;
        // font-weight: bold;
        text-align: center;
        line-height: 1;
        margin-top: 26px;
      }
    }
    .formBox {
      margin-top: 56px;
      .loginForm {
      }
      .title {
        font-size: 16px;
        line-height: 40px;
        font-weight: lighter;
        color: #43a5de;
        text-align: center;
        margin-bottom: 10px;
      }
      .submit_btn {
        width: 100%;
        background-color: #333c6a;
        margin-top: 20px;
      }
    }
  }
}
@media screen and (max-height: 750px) {
  .login {
    .main_box {
      top: 10vh;
      transform: translate(-50%, 0);
    }
  }
}
@media screen and (max-height: 650px) {
  .login {
    .main_box {
      top: 6vh;
    }
  }
}
@media screen and (max-height: 600px) {
  .login {
    .main_box {
      top: 5vh;
      .formBox {
        margin-top: 5vh;
      }
    }
  }
}
</style>
