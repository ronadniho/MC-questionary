<template>
  <div id="login">
    <!--logo-->
    <div class="logo">
      <div></div>
    </div>
    <!--form -->
    <div class="form">
      <div class="input-group">
        <input type="number" placeholder="请输入手机号" class="phone"/>
      </div>
      <div class="input-group flex">
        <input type="password" placeholder="请输入密码" class="pwd"/>
        <button>获取验证码</button>
      </div>
      <div class="btn-group">
        <button @click="jump">登录</button>
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

  export default {
    components: {VueLoading},
    name: "Login",
    data() {
      return {
        loading: false,

      }
    },
    methods: {
      jump() {
        this.loading = !this.loading;

        this.$router.push({path: '/info'})
      }
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
        .phone {
          background-image: url(../assets/user.png);
          width: @max;
          .inputCommon;
          background-size: 36px;
        }
        .pwd {
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
