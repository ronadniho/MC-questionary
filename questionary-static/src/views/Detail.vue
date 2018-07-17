<template>
  <div id="detail">
    <Header/>
    <div class="container" :class="increment&&'container-incre'">
      <!--form1-->
      <div class="form-group">
        <div class="form-title">
          <span>发展详情</span>
        </div>
        <div class="form-content">
          <div class="input-group block">
            <label for="" class="">参加创业辅导详情：</label>
            <textarea placeholder="例如：2018年3月4日，参加XXX组织的XXX培训"></textarea>
          </div>
          <div class="input-group block">
            <label for="" class="">项目落地详情：</label>
            <textarea placeholder="例如：截至2018年4月,项目已落户在XXX园区"></textarea>
          </div>
          <div class="input-group flex">
            <label for="">希望获得融（投）资：</label>
            <input type="number" placeholder=""><span>万元</span>
          </div>
          <div class="input-group block">
            <label for="">希望合作单位：</label>
            <textarea placeholder="请填写您的希望合作单位"></textarea>
          </div>
        </div>
      </div>

      <!--form2-->
      <div class="form-group">
        <div class="form-content">
          <div class="input-group flex">
            <label for="">是否获得融投资</label>
            <div class="btn-group">
              <button :class="increment&&'active'" @click="tabbar(1)">是</button>
              <button :class="!increment&&'active'" @click="tabbar(0)">否</button>
            </div>
          </div>
        </div>
      </div>

      <!--form3-->
      <div class="form-group" v-if="increment">
        <div class="form-content">
          <div class="group flex">
            <label for="">投资方:</label>
            <input type="text" value="上海梦创双杨数据科技股份有限公司">
          </div>
          <div class="group flex num">
            <label for="">支持金额:</label>
            <input type="number" value="">
            <span>万元</span>
          </div>
          <div class="group flex num">
            <label for="">出让股权份额:</label>
            <input type="number" value="">
            <span>%</span>
          </div>
          <div class="group flex num">
            <label for="">获得累积融资额:</label>
            <input type="number" value="">
            <span>万元</span>
          </div>
        </div>
      </div>
      <div class="btn-group" :class="increment&&'btn-group-incre'">
        <button @click="jump">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header'

  export default {
    components: {Header},
    name: "Detail",
    data() {
      return {
        increment:false,//是否获得融投资

      }
    },
    methods:{
      tabbar(e){
        console.log(e)
        if(e==this.increment){
          return;
        }else{
          this.increment=!this.increment;
        }
      },
      jump(){

      }
    }
  }
</script>

<style scoped lang="less">
  @import '../variable';

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: @info-input-placeholder;
  }

  input::-moz-placeholder, textarea::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: @info-input-placeholder;
  }

  input:-moz-placeholder, textarea:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: @info-input-placeholder;
  }

  input:-ms-input-placeholder, textarea:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: @info-input-placeholder;
  }

  #detail {
    height: @max;
    position: relative;
    .container {
      width: @max;
      height: @max;
      position: absolute;
      padding-top: 86px;
      box-sizing: border-box;
      background-color: @info-bg-color;

      .form-group {
        box-shadow: 0 3px 3px 4px #e8e8e8;
        margin-bottom: 22px;
        .form-title {
          color: @info-title-color;
          font-size: @info-title-size;
          font-weight: 600;
          height: 78px;
          line-height: 78px;
          span {
            width: 6px;
            height: 36px;
            border-left: 6px solid @theme;
            padding-left: 19px;
            box-sizing: border-box;
          }
        }
        .form-content {
          background-color: @white;
          .LABLE {
            font-size: @info-input-size;
            color: @info-input-label;
          }
          .INPUT-GROUP {
            border-bottom: 1px solid @info-input-border; /*no*/
            padding: 0 36px;
            box-sizing: border-box;
          }
          .input-group:not(.block) {
            align-items: center;
            height: 100px;
            line-height: 100px;
            .INPUT-GROUP;
            label {
              .LABLE;
              width: 340px;
            }
            input, textarea, select {
              font-size: @info-input-size;
              color: @info-input-color;
              border: 0;
              width: 128px;
              height: 80px;
              padding: 0 10px;
              box-sizing: border-box;
            }
            .btn-group {
              width: 289px;
              button {
                width: 125px;
                height: 58px;
                border: 1px solid @info-input-border; /*no*/
                border-radius: 5px; /*no*/
                box-sizing: border-box;
                background-color: @white;
                color: #444;
              }
              .active {
                background-color: @theme;
                border: 1px solid @theme; /*no*/
                color: @white;
              }
            }
          }
          .block {
            height: 164px;
            .INPUT-GROUP;
            padding-top: 32px;
            box-sizing: border-box;
            label {
              .LABLE;
              display: block;
              width: @max;
            }
            input, textarea, select {
              width: @max;
              height: 88px;
              box-sizing: border-box;
            }
          }
          span{
            color:@info-input-label;
           }
        }
      }
      .form-group:nth-child(2){
        margin-bottom:0;
        label {
         flex-grow: 1;
        }
      }
      .form-group:nth-child(3) {
        background-color: #dfdfdf;
        padding: 13px 20px;
        box-shadow: 0 0 0 0 ;
        .form-content{
          background-color:#dfdfdf;
          .group {
            padding: 0 27px;
            margin: 13px 0;
            height: 88px;
            line-height: 88px;
            box-sizing: border-box;
            border: 1px dashed #d9d9d9; /*no*/
            background-color:@white;
            label {
              color:@info-input-label;
              font-size: @info-input-size;
              flex-grow: 1;
            }
            input {
              border: 0;
              height: 80px;
              color:#444;
              font-size: @info-input-size;

            }
          }
          .group.num{
            label{
              width: 340px;
            }
            input{
              width: 128px;
            }
          }
        }

      }
      >.btn-group {
        text-align: center;
        padding: 106px 0 0;
        box-sizing: border-box;
        background-color: #f2f2f2;
        button {
          width: 560px;
          height: 80px;
          background-color: @theme;
          color: @white;
          border: 0;
          border-radius: 3px;
        }

      }
    }
    .container.container-incre{
      height: auto;
      padding-bottom: 178px;
      >.btn-group.btn-group-incre{
         position: fixed;
        bottom: 0;
        width: @max;
        padding: 35px 0 63px;
      }
    }
  }
</style>
