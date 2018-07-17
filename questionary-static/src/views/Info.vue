<template>
  <div id="info" @click="init">
    <Header/>
    <div class="container">
      <!--form1-->
      <div class="form-group">
        <div class="form-title">
          <span>联系人信息</span>
        </div>
        <div class="form-content">
          <div class="input-group flex">
            <label for="">姓名：</label>
            <input type="text" placeholder="请填写您的姓名">
          </div>
          <div class="input-group flex">
            <label for="">电话：</label>
            <input type="number" placeholder="请填写您的电话">
          </div>
          <div class="input-group flex">
            <label for="">邮箱：</label>
            <input type="number" placeholder="请填写您的邮箱">
          </div>
        </div>
      </div>
      <!--form2-->
      <div class="form-group">
        <div class="form-title">
          <span>项目信息</span>
        </div>
        <div class="form-content">
          <div class="input-group flex">
            <label for="">项目名称：</label>
            <input type="text" placeholder="请填写所参赛项目">
          </div>
          <div class="input-group flex">
            <label for="">赛事名称：</label>
            <input type="text" placeholder="请填写所参赛赛事">
          </div>
          <div class="input-group flex">
            <label for="">所在地区：</label>
            <area-select
              :data="pca"
              v-model="selected"
              :placeholders="['省','市']"></area-select>
          </div>

          <div class="input-group flex">
            <label for="">参赛年份：</label>
            <!--<select name="" id="">-->
            <!--<option></option>-->
            <!--</select>-->
            <div class="area-select mysel" @click.stop="sel">
            <!--<div class="area-select medium mysel" @click.stop="sel">-->
              <span class="area-selected-trigger">{{year}}</span>
              <i
                class="area-select-icon"
                :class="selStatus&&'active'"></i>
              <div class="area-selectable-list-wrap" style="top: 35.9531px; display: none;" ref="mysel">
                <ul class="area-selectable-list" v-model="year">
                  <li :value="index"
                      class="area-select-option"
                      :class="'201'+index==year&&'selected'"
                      v-for="(item,index) in 10"
                      @click="select(item)">
                    201{{index}}
                  </li>
                  <!--<li value="120000" class="area-select-option">
                    天津市
                  </li>
                  <li value="130000" class="area-select-option selected">
                    河北省
                  </li>
                  <li value="140000" class="area-select-option">
                    山西省
                  </li>
                  <li value="150000" class="area-select-option">
                    内蒙古自治区
                  </li>
                  <li value="210000" class="area-select-option">
                    辽宁省
                  </li>
                  <li value="220000" class="area-select-option">
                    吉林省
                  </li>
                  <li value="230000" class="area-select-option">
                    黑龙江省
                  </li>
                  <li value="310000" class="area-select-option">
                    上海市
                  </li>
                  <li value="320000" class="area-select-option">
                    江苏省
                  </li>
                  <li value="330000" class="area-select-option">
                    浙江省
                  </li>
                  <li value="340000" class="area-select-option">
                    安徽省
                  </li>
                  <li value="350000" class="area-select-option">
                    福建省
                  </li>
                  <li value="360000" class="area-select-option">
                    江西省
                  </li>
                  <li value="370000" class="area-select-option">
                    山东省
                  </li>
                  <li value="410000" class="area-select-option">
                    河南省
                  </li>
                  <li value="420000" class="area-select-option">
                    湖北省
                  </li>
                  <li value="430000" class="area-select-option">
                    湖南省
                  </li>
                  <li value="440000" class="area-select-option">
                    广东省
                  </li>
                  <li value="450000" class="area-select-option">
                    广西壮族自治区
                  </li>
                  <li value="460000" class="area-select-option">
                    海南省
                  </li>
                  <li value="500000" class="area-select-option">
                    重庆市
                  </li>
                  <li value="510000" class="area-select-option">
                    四川省
                  </li>
                  <li value="520000" class="area-select-option">
                    贵州省
                  </li>
                  <li value="530000" class="area-select-option">
                    云南省
                  </li>
                  <li value="540000" class="area-select-option">
                    西藏自治区
                  </li>
                  <li value="610000" class="area-select-option">
                    陕西省
                  </li>
                  <li value="620000" class="area-select-option">
                    甘肃省
                  </li>
                  <li value="630000" class="area-select-option">
                    青海省
                  </li>
                  <li value="640000" class="area-select-option">
                    宁夏回族自治区
                  </li>
                  <li value="650000" class="area-select-option">
                    新疆维吾尔自治区
                  </li>
                  <li value="710000" class="area-select-option">
                    台湾省
                  </li>
                  <li value="810000" class="area-select-option">
                    香港特别行政区
                  </li>
                  <li value="820000" class="area-select-option">
                    澳门特别行政区
                  </li>-->
                </ul>
              </div>
            </div>
          </div>
          <div class="input-group flex">
            <label for="">获奖情况：</label>
            <textarea placeholder="例如:专题赛X奖，全国总决赛X奖"></textarea>
          </div>
        </div>
      </div>

      <div class="btn-group">
        <button @click="jump">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import {pca, pcaa} from 'area-data';

  export default {
    components: {Header,},
    name: "Info",
    data() {
      return {
        pca: pca,
        selected: [],
        selStatus: false,

        year: '',
      }
    },
    methods: {
      jump() {
        this.$router.push({path: '/detail'})
      },
      init() {
        /*this.$refs.mysel为dom树*/
        if (this.selStatus) {
          this.selStatus = !this.selStatus;
          this.$refs.mysel.style.display = 'none';
        }
      },
      sel() {
        if (this.selStatus) {
          this.selStatus = !this.selStatus
          this.$refs.mysel.style.display = 'none';
        } else {
          this.selStatus = !this.selStatus
          // this.$refs.mysel.setAttribute('class','area-zoom-in-top-enter-active')
          this.$refs.mysel.style.display = 'block';
        };
      },
      select(val){
        console.log(val)
        this.year = '201'+(val-1);
      },
    }
  }
</script>

<style scoped lang="less">
  @import '../variable';

  input::-webkit-input-placeholder {
    color: @info-input-placeholder;
  }

  input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: @info-input-placeholder;
  }

  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: @info-input-placeholder;
  }

  input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: @info-input-placeholder;
  }

  #info {
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
          .input-group {
            align-items: center;
            height: 100px;
            line-height: 100px;
            border-bottom: 1px solid @info-input-border; /*no*/
            padding: 0 36px;
            box-sizing: border-box;
            label {
              font-size: @info-input-size;
              color: @info-input-label;
              width: 200px;
              flex-grow: 1;
            }
            input, textarea {
              font-size: @info-input-size;
              color: @info-input-color;
              border: 0;
              width: 460px;
              height: 80px;
              padding: 0 10px;
              box-sizing: border-box;
            }
          }
        }
      }
      .btn-group {
        text-align: center;
        padding-top: 84px;
        box-sizing: border-box;
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
  }

  .area-select-wrap, .mysel {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: 70px;
    width: 460px;
    span {
      background-color: @white;
    }
  }

</style>
