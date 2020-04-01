<template>
  <div class="login-page">
    <div style="background:url(./../../assets/ks_log_toppic.jpg) no-repeat; width:1000px; margin:0 auto;">
    <router-link tag="a" to="/managelogin" class="topnav"><img src="../../assets/icon5.png" />管理员登录</router-link>
    <div class="head"><img src="../../assets/ks.png" /></div>
    <div class="login-box">
      <div class="top-head">
        <router-link to="/">考生考试登录</router-link>|
        <router-link to="/info?userId=000000000000000000">考生练习</router-link>
      </div>
      <div class="login-main">
        <div class="login-border">
          <div class="top-head title">特种设备作业人员考试系统</div>
          <div class="candidate">
            <span>考生身份证号：</span>
            <div class="can_txt"><el-input placeholder="请输入身份证号" v-model="userId" class="number"></el-input></div>
          </div>
          <div class="canditate-box">
            <input type="button" class="canditate-number" value="1" @click="handleKey1()" ref="input1">
            <input type="button" class="canditate-number" value="2" @click="handleKey2()" ref="input2">
            <input type="button" class="canditate-number" value="3" @click="handleKey3()" ref="input3">
            <input type="button" class="canditate-number" value="4" @click="handleKey4()" ref="input4">
            <input type="button" class="canditate-number" value="5" @click="handleKey5()" ref="input5">
            <input type="button" class="canditate-number" value="6" @click="handleKey6()" ref="input6">
            <input type="button" class="canditate-number" value="7" @click="handleKey7()" ref="input7">
            <input type="button" class="canditate-number" value="8" @click="handleKey8()" ref="input8">
            <input type="button" class="canditate-number" value="9" @click="handleKey9()" ref="input9">
            <input type="button" class="canditate-number" value="0" @click="handleKey10()" ref="input10">
            <input type="button" class="canditate-number" value="X" @click="handleKey11()" ref="input11">
            <input type="button" class="canditate-number" value="清除" @click="handleClear()">
            <input type="button" class="canditate-number login" value="登录" @click="getLogin()">
          </div>
          <!-- <a href="javascript:void(0)" class="login-btn" @click="getLogin()">登 录</a> -->
        </div>
        <div class="tips">
          <div style="color: #ff0000">环境要求提示：</div>
          1、本系统建议使用IE8及以上版本，不支持360、火狐等浏览器。<br>
          2、浏览器安全级别为中，要允许弹出窗口，并允许运行控件。<br>
          3、屏幕分别率设为1024*768以上。<br>
          4、相关详细设置要求参考信息发布中考生使用说明。<br>
        </div>
      </div>
    </div>
    <div class="jsshfoot">
      <div class="jsshfoot_bg">
        <a href="#">关于我们</a>|<a href="#">版权声明</a>|<a href="#">投诉建议</a>|<a href="#">免责声明</a>|<a href="#">联系我们</a>
      </div>
      <div class="jsshfoot2">
        &nbsp;&nbsp;CopyRight&nbsp;&nbsp; All Right Served&nbsp;&nbsp;沪ICP备10010178号
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import API from "../../api/api";
  export default {
    data() {
      return {
        userId: '',
        result1: null
      }
    },
    methods: {
      /* 清除 */
      handleClear() {
        this.userId = ''
      },
      getLogin() {
        if(this.userId == "") {
          this.$alert('请输入身份证号!', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        } else {
          this.$axios.get(API.getLogin + this.userId).then(res => {
            if(res.data.result === "00000000") {
              this.$router.push({
                path:'/info?userId='+this.userId
              })
            }else if(res.data.result === "90000003"){
              this.$alert(res.data.msg, {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
            }
          })
        }
      },
      /** 键盘按钮赋值 */
      handleKey1() {
        this.userId = this.userId + this.$refs.input1.value;
      },
      handleKey2() {
        this.userId = this.userId + this.$refs.input2.value;
      },
      handleKey3() {
        this.userId = this.userId + this.$refs.input3.value;
      },
      handleKey4() {
        this.userId = this.userId + this.$refs.input4.value;
      },
      handleKey5() {
        this.userId = this.userId + this.$refs.input5.value;
      },
      handleKey6() {
        this.userId = this.userId + this.$refs.input6.value;
      },
      handleKey7() {
        this.userId = this.userId + this.$refs.input7.value;
      },
      handleKey8() {
        this.userId = this.userId + this.$refs.input8.value;
      },
      handleKey9() {
        this.userId = this.userId + this.$refs.input9.value;
      },
      handleKey10() {
        this.userId = this.userId + this.$refs.input10.value;
      },
      handleKey11() {
        this.userId = this.userId + this.$refs.input11.value;
      }
    }
  }
</script>

<style scoped lang="less">
  .login-page{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background: url(./../../assets/ks_log_topbg.jpg) repeat-x;
  }
  .topnav{
    display: block;
    width:1000px;
    margin: 0 auto;
    text-align: right;
    font-size: 16px;
    padding-top:10px;
    color:#000;
    img{
      margin: 0 5px 0 0;
      vertical-align: middle;
      width:25px;
      height: 25px;
    }
  }
  .topnav:hover{
    color: #337efe;
  }
  .login-border .title {
    line-height: 40px;
    font-size: 14px;
    font-size: 16px;
    background:url(./../../assets/line01.jpg) repeat-x;
  }
  .login-box{
    width: 1000px;
    margin: 0 auto;
  }
  .top-head{
    width: 100%;
    height: 40px;
    // background: #5b96fc;
    background: url(./../../assets/ksksbg2.jpg)repeat-x;
    border-radius: 10px 10px 0 0;
    text-align: center;
    color: #fff;
  }
  .top-head a{
    color: #fff;
    font-size: 16px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    padding: 0 10px;
  }
  .top-head a:hover{
    color: #e4f0f8;
  }
  .login-main{
    border-left: 1px solid #BBDCFF;
    border-right: 1px solid #BBDCFF;
    border-bottom: 1px solid #BBDCFF;
    padding: 20px;
  }
  .login-border {
    width: 600px;
    border: solid 1px #e3e3e3;
    border-radius: 10px 10px 0 0;
    margin: 0 auto;
    padding-bottom: 20px;
  }
  .candidate{
    overflow: hidden;
    margin-top: 20px;
    padding: 0 20px;
  }
  .candidate span{
    display: inline-block;
    color: #333;
    font-size: 14px;
    padding-right: 20px;
    width: 100px;
    line-height: 40px;
  }
  .candidate .can_txt{
    display: inline-block;
    width: 360px;
    height: 40px;
    line-height: 40px;
    .number{
    width: 360px;
    }
  }
  .canditate-box{
    padding-left: 142px;
    width: 363px;
    overflow: hidden;
  }
  .canditate-number{
    float: left;
    width: 120px;
    height: 58px;
    line-height: 58px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    // border: solid 1px #e3e3e3;
    border-left: 0;
    border-top: 0;
    border-bottom:0;
    background: #fff;
    cursor: pointer;
    text-indent: 200px;
  }
  .canditate-number:nth-child(1){
    background: url(./../../assets/1.gif) no-repeat center;
  }
  .canditate-number:nth-child(1):hover{
    background: url(./../../assets/1_1.gif) no-repeat center;
  }
  .canditate-number:nth-child(2){
    background: url(./../../assets/2.gif) no-repeat center;
  }
  .canditate-number:nth-child(2):hover{
    background: url(./../../assets/2_1.gif) no-repeat center;
  }
  .canditate-number:nth-child(3){
    background: url(./../../assets/3.gif) no-repeat center;
  }
  .canditate-number:nth-child(3):hover{
    background: url(./../../assets/3_1.gif) no-repeat center;
  }
  .canditate-number:nth-child(4){
    background: url(./../../assets/4.gif) no-repeat center;
  }
  .canditate-number:nth-child(4):hover{
    background: url(./../../assets/4_1.gif) no-repeat center;
  }
  .canditate-number:nth-child(5){
    background: url(./../../assets/5.gif) no-repeat center;
  }
  .canditate-number:nth-child(5):hover{
    background: url(./../../assets/5_1.gif) no-repeat center;
  }
  .canditate-number:nth-child(6){
    background: url(./../../assets/6.gif) no-repeat center;
  }
  .canditate-number:nth-child(6):hover{
    background: url(./../../assets/6_1.gif) no-repeat center;
  }
  .canditate-number:nth-child(7){
    background: url(./../../assets/7.gif) no-repeat center;
  }
  .canditate-number:nth-child(7):hover{
    background: url(./../../assets/7_1.gif) no-repeat center;
  }
  .canditate-number:nth-child(8){
    background: url(./../../assets/8.gif) no-repeat center;
  }
  .canditate-number:nth-child(8):hover{
    background: url(./../../assets/8_1.gif) no-repeat center;
  }
  .canditate-number:nth-child(9){
    background: url(./../../assets/9.gif) no-repeat center;
  }
  .canditate-number:nth-child(9):hover{
    background: url(./../../assets/9_1.gif) no-repeat center;
  }
  .canditate-number:nth-child(10){
    background: url(./../../assets/0.gif) no-repeat center;
  }
  .canditate-number:nth-child(10):hover{
    background: url(./../../assets/0_1.gif) no-repeat center;
  }
  .canditate-number:nth-child(11){
    background: url(./../../assets/X.gif) no-repeat center;
  }
  .canditate-number:nth-child(11):hover{
    background: url(./../../assets/X_1.gif) no-repeat center;
  }
  .canditate-number:nth-child(12){
    background: url(./../../assets/clear.gif) no-repeat center;
  }
  .canditate-number:nth-child(12):hover{
    background: url(./../../assets/clear_1.gif) no-repeat center;
  }
  .canditate-number:nth-child(13){
    background: url(./../../assets/dlks.gif) no-repeat center;
  }
  .canditate-number:nth-child(13):hover{
    background: url(./../../assets/dlks_1.gif) no-repeat center;
  }
  // .canditate-number:nth-child(3),.canditate-number:nth-child(6),.canditate-number:nth-child(9),.canditate-number:nth-child(12){
  //   border-right: 0;
  //   border-left: 0;
  // }
  // .canditate-number:nth-child(10),.canditate-number:nth-child(11),.canditate-number:nth-child(12){
  //   border-bottom: 0
  // }
  .login-btn{
    display: block;
    width: 360px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 20px 0 0 142px;
    background: #639dff;
    color: #fff;
    font-size: 18px;
    border-radius: 10px;
  }
  .login{
    margin-left: 120px;
  }

.head {
  color: #468cda;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  width: 1000px;
  height: 70px;
  line-height: 70px;
  padding: 35px 0;
  margin: 0 auto;
}
.tips {
  width: 600px;
  margin: 0 auto;
  padding: 20px 0 0;
  line-height: 20px;
  letter-spacing: 3px;
}
.jsshfoot {
  width: 1000px;
  margin: 20px auto;
}
.jsshfoot_bg {
  border: 1px solid #b7cbee;
  background: url(../../assets/footbg2.jpg);
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: #4087d2;
}
.jsshfoot_bg a {
  color: #4087d2;
  text-decoration: none;
  padding: 0px 10px;
}
.jsshfoot2 {
  padding: 8px;
  background: #f7fbfe;
  color: #767676;
  border: 1px solid #dee7f0;
  border-top: none;
  line-height: 18px;
  text-align: center;
}
</style>