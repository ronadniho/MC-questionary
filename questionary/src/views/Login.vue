<template>
  <div id="login">
    <!--logo-->
    <div class="logo">
      <div></div>
    </div>
    <!--form -->
    <div class="form">
      <div class="input-group">
        <input type="number" placeholder="请输入手机号" class="mobile" v-model="mobile"/>
      </div>
      <div class="input-group flex">
        <input type="password" placeholder="请输入验证码" class="yzm" v-model="yzm"/>
        <button @click="fsyzm" :disabled="disabled">{{yzmBtn}}{{disabled?'秒':''}}</button>
      </div>
      <div class="btn-group">
        <button @click="userlogincheck">登录</button>
      </div>
    </div>
    <div v-if="loading" class="loading">
      <div class="loading-postion">
        <vue-loading></vue-loading>
      </div>
    </div>
  </div>
</template>

<script>
  import {VueLoading} from 'vue-loading-template'
  import {request} from '@/common/common'
  import $ from 'jquery'

  export default {
    components: {VueLoading},
    name: "Login",
    data() {
      return {
        loading: false,
        mobile: '',//手机号
        yzm: '',//密码
        yzmnum: 0,//验证码

        disabled: false,
        yzmBtn: '获取验证码',
      }
    },
    methods: {
      userlogincheck() {//手机号登录检验
        // this.loading = !this.loading;
        if (this.checkmobile()) {
          // if (this.checkmobiluser()) {
          this.checkyzm();
          // }
        }
      },//手机号登录检验
      userlogin() {//手机号登录
        let query = {};
        query.mobile = this.mobile;

        request.getServerData(
          query,
          "ds_bm/actions/loginmobilefb.xml",
          true,
          (result) => {
            if (result && result.result.status == "1") {
              // window.location.href = "register_success.html";
              // this.loading = !this.loading;
              console.log(result)
              console.log(result.login_info)
              sessionStorage.setItem('ckzgquestionary', JSON.stringify(result.login_info));
              this.$router.push({path: '/info'});
            } else {
              this.$alert('用户名或验证码错误');
            }
          })
      },//手机号登录

      checkmobiluser() {//判断该手机号的用户是否存在
        let res = false;
        let query = {};
        query.mobile = $.trim(this.mobile);
        console.log(query.mobile)
        request.getServerData(
          query,
          "ds_bm/actions/checkmobile.xml",
          true,
          (result) => {
            console.log(result);
            if (result && result.login_info && result.login_info.cnt > 0) {
              res = true;
            }
            else {
              this.$alert('该手机未注册');
              res = false;
            }
            return res;
          });
      },//判断该手机号的用户是否存在


      checkmobile() {//检测手机号是否符合规则
        if (!this.mobile) {
          this.$alert('手机号不能为空');
          return false;
        }
        if (!(/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(this.mobile))) {
          this.$alert('手机号格式不符合');
          return false;
        }
        return true;
      },//检测手机号是否符合规则


      checkyzm() {//判断验证码
        let yzm = this.yzm;
        if (yzm) {
          let query = {};
          query.yzm = yzm;
          query.mobile = this.mobile;
          request.getServerData(
            query,
            "ds_bm/actions/checkMobileCode.xml",
            true,
            (result) => {
              console.log(result);
              console.log(result.result.status);
              if (result && result.result.status == "1") {
                this.userlogin();
              } else {
                this.$alert('手机验证码不正确');
              }
            });
        }
        else {
          this.$alert('手机验证码不能为空');
          return false;
        }
      },//判断验证码


      fsyzm() {//发送验证码
        if (this.checkmobile()) {
          // if (this.checkmobiluser()) {
          // $("#btnfsyzm").attr("disabled", "disabled");
          var query = {};
          query.mobile = this.mobile;
          query.yzm_des = "登录系统";
          console.log(query)
          request.getServerData(
            query,
            "ds_bm/actions/login_sendVeriCode.xml",
            true,
            (result) => {
              console.log(result);

              if (result) {
                this.$alert('发送成功');
                this.yzmBtn = 60;
                let timer = setInterval(() => {
                  if (this.yzmBtn < 1) {
                    this.yzmBtn = '获取验证码';
                    this.disabled = false;
                    clearInterval(timer);
                  }
                  else {
                    this.disabled = true;
                    this.yzmBtn -= 1;
                  }
                }, 1000);

              } else {
                this.$alert('发送失败');
              }
            });
        }
        // }
      }//发送验证码

    }
  }
</script>

<style scoped lang="less">
  @import '../variable';

  input::-webkit-input-placeholder {
    color: @login-input-placeholder;
  }

  input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: @login-input-placeholder;
  }

  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: @login-input-placeholder;
  }

  input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: @login-input-placeholder;
  }

  #login {
    width: @max;
    height: @max;
    background: url(../assets/login-bg.png) no-repeat;
    background-size: cover;
    padding: 0 30px;
    box-sizing: border-box;
    .logo {
      height: 113px;
      padding: 160px 0 134px;
      div {
        height: 113px;
        background: url(../assets/logo.png) no-repeat;
        background-size: 418px 113px;
      }
    }
    .form {
      padding: 0 45px;
      box-sizing: border-box;
      .input-group {
        padding-bottom: 75px;
        .inputCommon {
          height: 62px;
          line-height: 62px;
          padding: 0 30px 0 60px;
          color: @login-input-color;
          box-sizing: border-box;
          border: 0;
          border-bottom: 1px solid @login-input-border; /*no*/
          background-color: transparent;
          background-repeat: no-repeat;
          background-position: 0 center;
        }
        .mobile {
          background-image: url(../assets/user.png);
          width: @max;
          .inputCommon;
          background-size: 36px;
        }
        .yzm {
          background-image: url(../assets/pwd.png);
          width: 381px;
          .inputCommon;
          background-size: 35px 40px;
          flex-grow: 1;
        }
        button {
          width: 200px;
          height: 62px;
          line-height: 62px;
          background-color: @theme;
          color: @white;
          font-size: 30px;
          border-radius: 28px;
          border: 0;
          text-align: center;
        }
        button:disabled {
          background-color: #999;
        }
      }
      .btn-group {
        button {
          width: @max;
          height: 70px;
          line-height: 70px;
          background-color: @theme;
          color: @white;
          font-size: 30px;
          border: 0;
          border-radius: 30px;
          box-shadow: 0 10px 20px 3px @login-button-shadow;
        }
      }
    }

  }
</style>
