<template>
  <div id="context">
    <!--联系人信息和项目信息-->
    <div id="info" v-if="!current" @click="init">
      <Header/>
      <div class="container">
        <!--form1-->
        <div class="form-group">
          <div class="form-title">
            <span>联系人信息</span>
          </div>
          <div class="form-content">
            <div class="input-group flex">
              <label>姓名：</label>
              <input
                type="text"
                placeholder="请填写您的姓名"
                v-model="username"
                disabled>
            </div>
            <div class="input-group flex">
              <label>电话：</label>
              <input
                type="number"
                placeholder="请填写您的电话"
                v-model="mobile1"
                disabled>
            </div>
            <div class="input-group flex">
              <label>邮箱：</label>
              <input
                type="text"
                placeholder="请填写您的邮箱"
                v-model="email"
                disabled>
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
              <label>项目名称：</label>
              <input type="text" placeholder="请填写所参赛项目" v-model="proname">
            </div>
            <div class="input-group flex">
              <label>赛事名称：</label>
              <input type="text" placeholder="请填写所参赛赛事" v-model="compename">
            </div>
            <div class="input-group flex">
              <label>所在地区：</label>
              <area-select
                v-model="selected"
                :level="2"
              ></area-select>
            </div>

            <div class="input-group flex">
              <label>参赛年份：</label>
              <!--<select name="" id="">-->
              <!--<option></option>-->
              <!--</select>-->
              <div class="area-select mysel" @click.stop="sel">
                <!--<div class="area-select medium mysel" @click.stop="sel">-->
                <span class="area-selected-trigger">{{compeyear}}</span>
                <i
                  class="area-select-icon"
                  :class="selStatus&&'active'"></i>
                <div class="area-selectable-list-wrap" style="top: 35.9531px; display: none;" ref="mysel">
                  <ul class="area-selectable-list" v-model="compeyear">
                    <li class="area-select-option"
                        :class="item==compeyear&&'selected'"
                        v-for="(item,index) in yearData"
                        @click="select(item)">
                      {{item}}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="input-group flex">
              <label>获奖情况：</label>
              <textarea
                placeholder="例如:专题赛X奖，全国总决赛X奖"
                v-model="awardwinning"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="btn-group">
          <button @click="next">下一步</button>
        </div>
      </div>
    </div>
    <!--发展详情-->
    <div id="detail" v-if="current">
      <Header
        :current-status="currentStatus"
        @emitCurrent="emitCurrent"/>
      <div class="container" :class="isgetfinanc&&'container-incre'">
        <!--form1-->
        <div class="form-group">
          <div class="form-title">
            <span>发展详情</span>
          </div>
          <div class="form-content">
            <div class="input-group block">
              <label class="">参加创业辅导详情：</label>
              <textarea
                placeholder="例如：2018年3月4日，参加XXX组织的XXX培训"
                v-model="tutordetail"
              ></textarea>
            </div>
            <div class="input-group block">
              <label class="">项目落地详情：</label>
              <textarea
                placeholder="例如：截至2018年4月,项目已落户在XXX园区"
                v-model="landdetail"
              ></textarea>
            </div>
            <div class="input-group flex">
              <label>希望获得融（投）资：</label>
              <input
                type="number"
                placeholder=""
                v-model="hopefinanc"
              ><span>万元</span>
            </div>
            <div class="input-group block">
              <label>希望合作单位：</label>
              <textarea placeholder="请填写您的希望合作单位" v-model="hopecopunit"></textarea>
            </div>
          </div>
        </div>

        <!--form2-->
        <div class="form-group">
          <div class="form-content">
            <div class="input-group flex">
              <label>是否获得融投资</label>
              <div class="btn-group">
                <button :class="isgetfinanc&&'active'" @click="tabbar(1)">是</button>
                <button :class="!isgetfinanc&&'active'" @click="tabbar(0)">否</button>
              </div>
            </div>
          </div>
        </div>

        <!--form3-->
        <div class="form-group" v-if="isgetfinanc">
          <div class="form-content">
            <div class="group flex">
              <label>投资方:</label>
              <input
                type="text"
                v-model="investor">
            </div>
            <div class="group flex num">
              <label>支持金额:</label>
              <input
                type="number"
                v-model="suppfinanc">
              <span>万元</span>
            </div>
            <div class="group flex num">
              <label>出让股权份额:</label>
              <input
                type="number"
                v-model="share">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;%</span>
            </div>
            <div class="group flex num">
              <label>获得累积融资金额:</label>
              <input
                type="number"
                v-model="amountfinanc">
              <span>万元</span>
            </div>
          </div>
        </div>
        <div class="btn-group" :class="isgetfinanc&&'btn-group-incre'">
          <button @click="submit">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import areaData from 'vue-area-linkage/node_modules/area-data/data'
  import getSession from '@/common/sessionHelper';
  import {request, getUrlParam} from "../common/common";
  import $ from 'jquery';

  export default {
    components: {Header,},
    name: "Info",
    data() {
      return {
        current: 0,
        selStatus: false,
        areaData: {},//二联菜单数据
        currentStatus: true,

        yearData: ['2016', '2017', '2018'],
        username: '',
        mobile1: '',
        email: '',

        data: {},//提交表单数据集合
        /*表单字段绑定*///TODO:都是必填 table1
        userid: '',
        proname: '',//TODO:项目名称
        compename: '',//TODO:赛事名称
        compeyear: '',//用户选中的参赛年份
        awardwinning: '',//获奖情况
        selected: [],//用户选中的所在地区集合
        province: '',//所在地区-市,省
        cityz: '',//所在地区-城
        dlist: '',//所在地区-区


        /*表单字段绑定*///TODO:都是必填 table2
        tutordetail: '',//参加创业辅导详情
        landdetail: '',//项目落地详情
        hopefinanc: '',//TODO:希望获得融资
        hopecopunit: '',//TODO:希望合作单位
        isgetfinanc: 1,//是否获得融投资
        investor: '',//投资方
        suppfinanc: '',//支持金额
        share: '',//出让股权份额
        amountfinanc: '',//获得累积融资金额
      }
    },
    created: function () {
      this.areaData = areaData;

      console.log(this.areaData)


      //显示登录信息
      let login_info = JSON.parse(sessionStorage.getItem('ckzgquestionary'));
      console.log(login_info)

      if (login_info) {
        this.username = login_info.username;
        this.mobile1 = login_info.mobile;
        this.email = login_info.email;
        this.userid = login_info.user_id;
      } else {
        // this.$router.push({path:'/login'})
      }


      // let usernameObj = getSession(["username"]);
      // let useridObj = getSession(["userid"]);
      //
      // this.userid = useridObj.userid;

      // if (useridObj && useridObj.userid && useridObj.userid != '') {
      let query = {};
      query.userid = login_info.user_id;
      request.getServerData(
        query,
        "questionnaire/actions/getsingleuserinfo.xml",
        true,
        (result) => {
          console.log(result);
          if (result && result.singleuinfo) {
            this.mobile1 = result.singleuinfo.mobile1;
            this.email = result.singleuinfo.email;
            this.paramid = result.singleuinfo.qid;
            if (result.singleuinfo.qid && result.singleuinfo.qid != '') {//提交过表单读数据进行修改
              this.loadData();
            }
          }
        });
      // }

      /*let table1 = JSON.parse(sessionStorage.getItem('ckzgInfo'));
      if (table1) {
        this.proname = table1.proname;
        this.compename = table1.compename;
        this.compeyear = table1.compeyear;
        this.awardwinning = table1.awardwinning;
        this.province = table1.province;
        this.cityz = table1.cityz;
        this.dlist = table1.dlist;
        this.selected = table1.selected;
      }*/
    },
    mounted: function () {
      $('.area-select-wrap .area-select').css('marginLeft', '0px');
    },
    methods: {
      checkValidata() {//TODO:校验必填项返回true可以下一步
        if (!$.trim(this.proname)) {
          this.$alert('请填写项目名称。');
          return false;
        }
        if (!$.trim(this.compename)) {
          this.$alert('请填写赛事名称。');
          return false;
        }
        return true;
      },
      loadData() {//TODO:有数据


        // for (let parent in this.areaData) {
        //   // console.log(this.areaData[parent])
        //   for(let child in this.areaData[parent]){
        //     console.log(this.areaData[parent][child])
        //     if(this.areaData[parent][child]=='上海市'){
        //       alert(child)
        //       this.selected[0]=child;
        //       if(this.dlist){
        //
        //       }
        //     }
        //   }
        // }


        let obj = {};
        obj.qid = this.paramid;
        obj.actionType = 'query_questionnaire_detail';
        let data = request.getServerData(
          obj,
          "questionnaire/actions/questionnaire.xml"
        );

        if (data && data.questionnaire_detail) {
          let orgs = data.questionnaire_detail;
          this.proname = orgs.proname;
          this.compename = orgs.compename;
          this.compeyear = orgs.compeyear;
          this.awardwinning = orgs.awardwinning;
          this.tutordetail = orgs.tutordetail;
          this.landdetail = orgs.landdetail;
          this.hopefinanc = orgs.hopefinanc;
          this.hopecopunit = orgs.hopecopunit;
          this.isgetfinanc = orgs.isgetfinanc;

          this.province = orgs.province
          this.city = orgs.city;
        }
      },
      next() {//TODO:下一步 事件
        if (this.selected.length) {//处理所在地区数据结构
          for (let i = 0, selected = this.selected; i < selected.length; i++) {
            if (i == 0) {
              this.province = this.areaData['86'][selected[i]];
            } else if (i == 1) {
              this.cityz = this.areaData[selected[i - 1]][selected[i]];
            } else {
              //看  this.cityz是否为市辖区  判定   ztype的值
              if (this.cityz === '市辖区') {
                this.cityz = this.areaData[selected[i - 1]][selected[i]];
                this.dlist = '';
                this.data.ztype = 1;
              } else {
                this.dlist = this.areaData[selected[i - 1]][selected[i]];
                this.data.ztype = 0;
              }
            }
          }
        }//处理所在地区数据结构

        if (this.checkValidata()) {
          this.data = Object.assign(this.data, {
            userid: this.userid,
            proname: this.proname,
            compename: this.compename,
            province: this.province,
            cityz: this.cityz,
            dlist: this.dlist,
            compeyear: this.compeyear,
            awardwinning: this.awardwinning,
            selected: this.selected,
          })
          console.log(this.data)

          // sessionStorage.setItem('ckzgInfo', JSON.stringify(data));
          // this.$router.push({path: '/detail'});
          this.current = 1;
        }
      },
      init() {
        /*this.$refs.mysel为dom树*/
        if (this.selStatus) {
          this.selStatus = !this.selStatus;
          this.$refs.mysel.style.display = 'none';
        }
      },
      sel() {
        $('.area-select-wrap .area-select-icon').removeClass('active');
        $('.area-select-wrap .area-selectable-list-wrap').css('display', 'none');


        if (this.selStatus) {
          this.selStatus = !this.selStatus
          this.$refs.mysel.style.display = 'none';
        } else {
          this.selStatus = !this.selStatus
          // this.$refs.mysel.setAttribute('class','area-zoom-in-top-enter-active')
          this.$refs.mysel.style.display = 'block';
        }
        ;
      },
      select(val) {
        console.log(val)
        this.compeyear = val;
      },


      checkValidata2() {//TODO:校验必填项返回true可以提交
        if (!$.trim(this.hopefinanc)) {
          this.$alert('请填写希望获得融资金额。');
          return false;
        }
        if (!$.trim(this.hopecopunit)) {
          this.$alert('请填写希望合作单位。');
          return false;
        }
        return true;
      },
      tabbar(e) {
        console.log(e)
        if (e == this.isgetfinanc) {
          return;
        } else {
          if (e == 0) {
            this.investor = '';
            this.suppfinanc = '';
            this.share = '';
            this.amountfinanc = '';
          }
          this.isgetfinanc = e;
        }
      },
      submit() {
        if (this.checkValidata2()) {
          this.data.isgetfinanc = this.isgetfinanc;
          if (this.isgetfinanc) {//TODO:如果获取融投资表单显示将字段塞进请求参数内
            this.data = Object.assign(this.data, {
              investor: this.investor,
              suppfinanc: this.suppfinanc,
              share: this.share,
              amountfinanc: this.amountfinanc,
              userid: this.userid,
            });
          }
          else {//TODO:如果获取融投资表单不显示将请求参数内的字段删除
            let deleteKey = ['investor', 'suppfinanc', 'share', 'amountfinanc'];
            let dataKey = Object.keys(this.data);
            for (let i = 0; i < dataKey.length; i++) {
              for (let j = 0; j < deleteKey.length; j++) {
                if (dataKey[i] == deleteKey[j]) {
                  delete this.data[deleteKey[j]];
                }
              }
            }
          }
          console.log(this.data)


          this.data.actionType = (this.paramid && this.paramid != '') ? 'update_questionnaire' : 'create_questionnaire';
          if ((this.paramid && this.paramid != '')) {
            this.data.id = this.paramid;
          }


          var xmlPath = "questionnaire/actions/questionnaire.xml";
          // var orgData = getServerData(data, xmlPath);
          console.log(this.data)
          debugger
          request.getServerData(
            this.data,
            xmlPath,
            true,
            (result) => {
              console.log(result);

              if (result.isexist && result.isexist == "数据存在不再插入数据") {
                this.$alert("该数据已存在。");
                return;
              }
              this.$alert((this.paramid && this.paramid != '') ? '修改成功' : '提交成功。');
              this.paramid = result.questionnid;
            }
          );
        }
      },
      emitCurrent(val) {
        this.current = val;
        setTimeout(() => {
          $('.area-select-wrap .area-select').css('marginLeft', '0px');
        }, 20)
      }
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

  input:disabled {
    background-color: @info-input-border;
  }

  #context {
    width: @max;
    height: @max;
  }

  #info {
    width: @max;
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
          span {
            color: @info-input-label;
          }
        }
      }
      .form-group:nth-child(2) {
        margin-bottom: 0;
        label {
          flex-grow: 1;
        }
      }
      .form-group:nth-child(3) {
        background-color: #dfdfdf;
        padding: 13px 20px;
        box-shadow: 0 0 0 0;
        .form-content {
          background-color: #dfdfdf;
          .group {
            padding: 0 27px;
            margin: 13px 0;
            height: 88px;
            line-height: 88px;
            box-sizing: border-box;
            border: 1px dashed #d9d9d9; /*no*/
            background-color: @white;
            label {
              color: @info-input-label;
              font-size: @info-input-size;
              flex-grow: 1;
            }
            input {
              border: 0;
              height: 80px;
              color: #444;
              font-size: @info-input-size;

            }
          }
          .group.num {
            label {
              width: 340px;
            }
            input {
              width: 128px;
            }
          }
        }

      }
      > .btn-group {
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
    .container.container-incre {
      height: auto;
      padding-bottom: 178px;
      > .btn-group.btn-group-incre {
        position: fixed;
        bottom: 0;
        width: @max;
        padding: 35px 0 63px;
      }
    }
  }
</style>
