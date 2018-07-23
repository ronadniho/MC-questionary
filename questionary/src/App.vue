<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  @import 'variable';
  html,body{
    margin: 0;
    padding: 0;
    height: @max;
    #app{
      width: @max;
      height: @max;
    }
    textarea{
      resize:none;
      border:none;
    }

    .loading{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color:rgba(0,0,0,.3);
      .loading-postion{
        position: absolute;
        left:50%;
        top: 50%;
        margin-top: -30px;//main.js配置得初始值是60
        margin-left: -30px;//
      }
    }
  }
</style>
