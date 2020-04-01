<template>
  <div class="resulter_page">
    <div class="score">
      <div class="sc_titbg03"></div>  
      <div class="sc_titbg01"></div>  
    </div>
    <div v-if="userId == lianxi && !score" class="cray"></div>
    <div v-else-if="userId != lianxi || score" class="smile"></div>
    <div class="resulter-box">您本次理论成绩<span v-if="userId == lianxi && !score" class="failed">不合格</span>
    <span v-else-if="userId != lianxi || score" class="failed">合格</span>
    </div>
    <div v-if="score">a</div>
    <div class="footer">
      <a href="/" class="back_btn">返回登录页</a>
      <a href="/" class="back_btn">本次考试结束</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
      lianxi: '000000000000000000',
      score: null
    }
  },
  methods: {
    // 获取参数方法
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    }
  },
  mounted() {
    var id = this.getQueryString("userId");
    this.userId = id;
    var score = this.getQueryString("score");
    this.score = score;
  }
}
</script>


<style lang="less" scoped>
.resulter_page {
  width: 1000px;
  height: 500px;
  margin: 40px auto 0;
  padding-top: 50px;
  position: relative;
  border: solid 1px #dbdbdb;
  .score {
    display: block;
    width: 1041px;
    height: 70px;
    text-align: center;
    font-size: 30px;
    background: url(../../assets/ks_titbg2.jpg) repeat-x;
    overflow: hidden;
    position: absolute;
    left: -21px;
    top: -10px;
    .sc_titbg03 {
      background: url(../../assets/ks_titbg1.jpg) no-repeat;
      width: 459px;
      height: 70px;
      float: left;
    }
    .sc_titbg01 {
      background: url(../../assets/ks_titbg3.jpg) no-repeat;
      width: 59px;
      height: 70px;
      float: right;
    }
  }
  .cray {
    width: 150px;
    height: 150px;
    background: url("../../assets/cry.png") no-repeat;
    margin: 30px auto;
  }
  .smile {
    width: 150px;
    height: 150px;
    background: url("../../assets/smile.png") no-repeat;
    margin: 30px auto;
  }
  .resulter-box {
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    padding: 20px 0;
    span {
      font-size: 26px;
      font-weight: 700;
      padding: 0 8px;
      display: inline-block;
    }
    .failed {
      color: #ff0000;
    }
    .qualified {
      color: #10bc48;
      display: none;
    }
  }
  .footer {
    width: 100%;
    text-align: center;
    padding: 20px 0 0;
    a {
      display: inline-block;
      text-align: center;
      width: 100px;
      height: 35px;
      line-height: 35px;
      border-radius: 8px;
      padding: 0 10px;
      background: #f4f4f4;
      margin: 20px auto;
      font-size: 16px;
      color: #333;
      margin: 0 10px;
    }
  }
}
</style>