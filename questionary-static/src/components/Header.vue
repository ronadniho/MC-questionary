<template>
  <header>
    <a @click="jump"></a>
    <span>“创客中国”参赛项目发展情况调查表</span>
  </header>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {}
    },
    methods:{
      jump(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../variable';
  header {
    text-align: center;
    font-size: 32px;
    color: @white;
    background-color:@theme;
    width: @max;
    height: 86px;
    line-height: 86px;
    position: fixed;
    z-index: 1000;
    a {
      display: inline-block;
      background: url(../assets/back.png) no-repeat;
      background-size: 20px 35px;
      width: 20px;
      height: 35px;
      position: absolute;
      left: 20px;
      top: 50%;
      margin-top: -17.5px;
    }
  }
</style>
