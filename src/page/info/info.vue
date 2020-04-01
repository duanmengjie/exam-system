<template>
  <div class="info_page">
    <div class="info_main">
      <div class="info_head">
        考生信息
      </div>
      <table class="info_context" cellpadding="0" cellspacing="0">
        <tr>
          <td width="10%">
            <span class="tab_title">考生姓名</span>
          </td>
          <td width="15%">
            <span class="tab_info">{{user.userName}}</span>
          </td>
          <td width="10%">
            <span class="tab_title">身份证号</span>
          </td>
          <td width="15%">
            <span class="tab_info">{{user.userId}}</span>
          </td>
          <td width="10%">
            <span class="tab_title">准考证号</span>
          </td>
          <td width="15%">
            <span class="tab_info">{{user.entranceCertificateNumber}}</span>
          </td>
          <td width="10%" rowspan="3">
            <img :src="user.avatarUrl" v-if="user.avatarUrl==''" alt="" class="headimg">
            <img src="../../assets/touxiang.jpg" v-else-if="" alt="" class="headimg">
          </td>
        </tr>
        <tr>
          <td width="10%">
            <span class="tab_title">作业类型</span>
          </td>
          <td width="15%">
            <span class="tab_info">{{user.workTypeId}}</span>
          </td>
          <td width="10%">
            <span class="tab_title">作业项目</span>
          </td>
          <td colspan="3">
            <span class="tab_info">{{user.workProjectId}}</span>
          </td>
        </tr>
        <tr>
          <td width="10%">
            <span class="tab_title">考试时长</span>
          </td>
          <td width="15%">
            <span class="tab_info"><input type="text" class="times" v-model="totalTime" disabled="disabled" />分钟</span>
          </td>
          <td width="10%">
            <span class="tab_title">剩余时间</span>
          </td>
          <td colspan="3">
            <span class="tab_info">{{minutes}}:{{seconds}} 分钟</span>
          </td>
        </tr>
      </table>      
    </div>
    <div class="info_main" style="margin-top:20px;">
      <div class="subject_main">
        <div class="question_box">
          <div class="info_head" v-if="subject.type==1" style="border-left:0;border-right: 0;">单选题</div>
          <div class="info_head" v-else-if="subject.type==2">多选题</div>
          <div>
            <h3 class="subject_title">
              {{zindex+1}}、{{subject.description}}
            <img src="../../assets/grayflagl.gif" onclick="mycheck(this);" title="重点检查" id="check" name="check">
            </h3>
            <p v-for="(row, index) in subject.oplist" :key="row.index" v-if="subject.type==1">
              <input type="radio" name="1" :id="row.key" :value="row.key" v-model="answerlist" @change="outAnswer(subject.qid,$event,index)"/>
              <label :for="row.key">{{row.key}}、{{row.value}}</label> 
            </p>
            <p v-for="(row,index) in subject.oplist" :key="row.index" v-if="subject.type==2">
              <input type="checkbox" name="2" v-model="answerlist" :id="row.key" :value="row.key" @change="outAnswer(subject.qid,$event,index)"/> 
              <label :for="row.key">{{row.key}}、{{row.value}}</label>  
            </p>
          </div>
        </div>
        <div class="footer">
          <a class="pagenav" @click="getQuestion1()">第一题</a>
          <a class="pagenav" @click="getQuestion2()">上一题</a>
          <a class="pagenav" @click="getQuestion3()">下一题</a>
          <a class="pagenav" @click="getQuestion4()">最后一题</a>
        </div>
        <div class="block">
          <a href="javascript:void(0)" v-for="(item, index) in checkList" :class="{'blue-link':index===isActive}" :key="index" :id="index" @click="handlerNumber(index)" ref="check">{{index+1}}</a>
        </div>
        <div class="ks_shuoming02">
          <span class="cu">说明：</span><span class="red">题号为红色代表没做的题目；</span><span class="blue">题号为蓝色框代表已做的题目。</span><span class="red">题号打<img src="../../assets/redflagl.gif">标记的代表要重点检查的题目。</span>
        </div>
      </div>
    </div>
    <div class="footer-main">
      <a href="javascript:void(0)" class="submit-btn" @click="getCommit()">交卷</a>
    </div>
  </div>
</template>

<script>
import API from "../../api/api";
export default {
  data() {
    return {
      // answer: "",
      numbers: 0,
      totalTime: "60",
      radio: "0",
      checkList: [], // 题目总数数组
      user: {
        avatarUrl: "",
        userName: "", // 用户名
        userId: "132", // 用户身份证号码
        entranceCertificateNumber: "", // 准考证号码
        workProjectId: "", // 作业类型名称
        workTypeId: "", //  作业项目名称
        createTime: "" // 答题时间
      },
      qlist: [], // 题目
      subject: {},
      minutes: 60,
      seconds: 0,
      zindex: 0,
      inputName: "",
      answerlist: [], // 复选框双向绑定数据
      isseled: true, // 判断能不能提交
      isActive: "",
      allList: [] // 拼成所以题目的答案
    };
  },
  methods: {
    // 初始化获取题目list
    getCandidate() {
      if (this.userId == "000000000000000000") {
        this.$axios.get(API.getLogin + this.userId).then(res => {
          var res = res.data;
          if (res.result === "00000000") {
            this.user = res.data.user;
            this.qlist = res.data.qlist;
            this.totalPage = res.data.qlist.length;
            for (var i = 0; i < this.qlist.length; i++) {
              this.qlist[i].answerlist = [];
              this.qlist[i].answerInfo = [];
            }
            this.checkList = res.data.qlist.length;
            // 初始化
            this.getIndex(0);
          }
        });
      } else {
        this.$axios.get(API.getLogin + this.userId).then(res => {
          var res = res.data;
          var that = this;
          if (res.result === "00000000") {
            this.user = res.data.user;
            this.qlist = res.data.qlist;
            for (var i = 0; i < this.qlist.length; i++) {
              this.qlist[i].answerlist = [];
              this.qlist[i].answerInfo = [];
            }
            this.checkList = res.data.qlist.length;
            // 初始化
            this.getIndex(0);

            this.user.avatarUrl = res.data.user.avatarUrl;
          }
        });
      }
    },
    // 提交试卷
    getCommit() {
      var aEle = this.$refs.check; // 获取所以锚点按钮
      var that = this;
          this.numbers = 0;
      aEle.forEach(function(item) {
        // 如果这个样式是undefined，就不能提交
        if (item.attributes.style == undefined) {
          that.$alert('您还有试题未做完,请确定全部做完后才能交卷', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
          that.isseled = false;
        } else {
          that.numbers = that.numbers + 1;
        }
      });
      // 循环所以题目获取有关字段拼接成参数数组
      this.qlist.forEach(function(item, index) {
        var booleVal = item.answerlist instanceof Array;
        if (booleVal == false) {
          that.qlist[index].answerlist = item.answerlist.split("");
        }
        var subject = {};
        subject = {
          qid: item.qid,
          type: item.type,
          answerlist: item.answerlist
        };
        that.allList.push(subject);
      });
      // 全部打完可以提交
      if (that.numbers == this.qlist.length) {
        this.$axios
          .post(API.getCommit, {
            userId: this.userId,
            answerInfo: this.allList
          })
          .then(res => {
            if (res.data.result === "00000000") {
              var _score = res.data.data.pass;
              if (this.userId === "000000000000000000") {
                this.$router.push({
                  path: "/resulte?userId=" + this.userId + "&score=" + _score
                });
              } else {
                this.$router.push({
                  path: "/resulte?userId=" + this.userId
                });
              }
            }
          });
      }
    },
    // 获取参数方法
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    /*获取答案*/
    outAnswer(qid, $event) {
      this.qlist[this.zindex].answerlist = this.answerlist;
      if (this.qlist[this.zindex].answerlist.length > 0) {
        this.$refs.check[this.zindex].style.backgroundColor = "#5b96fc";
        this.$refs.check[this.zindex].style.color = "#fff";
      }
    },
    // 第一题
    getQuestion1() {
      this.getIndex(0);
      // this.answerlist = this.qlist[this.zindex].answerlist;
      if(this.qlist[this.zindex].type == 1) {
        this.answerlist = this.qlist[this.zindex].answerlist.toString();
      }
      if(this.qlist[this.zindex].type == 2) {
        this.answerlist = this.qlist[this.zindex].answerlist;
      }
    },
    // 上一题
    getQuestion2() {
      if(this.zindex == 0) {
        this.$message.error("已经是第一题了");
      } else {
        this.getIndex(this.zindex-1);
        // this.answerlist = this.qlist[this.zindex].answerlist;
        if(this.qlist[this.zindex].type == 1) {
          this.answerlist = this.qlist[this.zindex].answerlist.toString();
        }
        if(this.qlist[this.zindex].type == 2) {
          this.answerlist = this.qlist[this.zindex].answerlist;
        }
      }
    },
    // 下一题
    getQuestion3(){
      if(this.zindex == this.qlist.length-1) {
        this.$message.error("已经是最后一题了");
      } else {
        this.getIndex(this.zindex+1);
        // this.answerlist = this.qlist[this.zindex].answerlist;
        if(this.qlist[this.zindex].type == 1) {
          this.answerlist = this.qlist[this.zindex].answerlist.toString();
        }
        if(this.qlist[this.zindex].type == 2) {
          this.answerlist = this.qlist[this.zindex].answerlist;
        }
      }
    },
    // 最后一题
    getQuestion4() {
      this.getIndex(this.qlist.length-1);
      if(this.qlist[this.zindex].type == 1) {
        this.answerlist = this.qlist[this.zindex].answerlist.toString();
      }
      if(this.qlist[this.zindex].type == 2) {
        this.answerlist = this.qlist[this.zindex].answerlist;
      }
    },
    // 分页锚点
    handlerNumber(index) {
      var that = this;
      this.isActive = index;
      this.getIndex(index);
      if (this.qlist[index].answerlist.length == 0) {
        this.answerlist = [];
      } else {
        if(this.qlist[index].type == 1) {
          this.answerlist = this.qlist[index].answerlist.toString();
        }
        if(this.qlist[index].type == 2) {
          this.answerlist = this.qlist[index].answerlist;
        }
        this.$refs.check[index].style.backgroundColor = "#5b96fc";
        this.$refs.check[index].style.color = "#fff";
      }
    },
    //获取题目的index
    getIndex(index) {
      this.zindex = index;
      this.subject = this.qlist[this.zindex];
    },
    // 倒计时
    num(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    timer() {
      var _this = this;
      var time = window.setInterval(function() {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59;
          _this.minutes -= 1;
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0;
          window.clearInterval(time);
        } else {
          _this.seconds -= 1;
        }
      }, 1000);
    }
  },
  mounted() {
    var id = this.getQueryString("userId");
    this.userId = id;
    this.getCandidate();
    this.timer();
  },
  watch: {
    seconds: {
      handler(newVal) {
        this.num(newVal);
      }
    },
    minutes: {
      handler(newVal) {
       this.num(newVal);
      }
    }
  }
};
</script>

<style scope>
.info_page {
  width: 100%;
  overflow-x: hidden;
  height: 100%;
}
.info_main {
  margin: 10px auto 0;
  width: 1000px;
}
.info_head {
  /* padding: 0 20px;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  background: #5b96fc;
  border: solid 1px #5b96fc; */
  border: solid 1px #cbcbcb;
  border-top: 0;
  border-bottom: 0;
  border-radius: 10px 10px 0 0;
  padding: 0 20px;
  height: 26px;
  background: url(./../../assets/ks_tdbg.jpg) 0px -28px repeat-x;
  line-height: 26px;
  font-weight: bold;
  color: #333;
  font-size: 14px;
}
.info_context {
  border: solid 1px #dbdbdb;
  border-top: 0;
  border-bottom: 0;
  border-right: 0;
  width: 100%;
}
.info_context tr td {
  border-bottom: solid 1px #dbdbdb;
  border-right: solid 1px #dbdbdb;
  font-size: 14px;
}
.headimg {
  display: block;
  margin: 0 auto;
  width: 120px;
  height: 120px;
}
.info_context tr td .times {
  display: inline-block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  vertical-align: middle;
  margin-right: 10px;
  text-align: center;
  color: #666;
}
.question_box {
  width: 100%;
  min-height:300px;
  /*min-height: 300px;*/
  /* display: none; */
}
/* .question_box:nth-child(2){
  display: block;
} */
.tab_title {
  display: block;
  height: 40px;
  line-height: 40px;
  background: #dfe7f1;
  padding-left: 20px;
}
.tab_info {
  display: block;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
}
.subject_main {
  border: solid 1px #dbdbdb;
  border-top: 0;
  overflow-x: hidden;
  border-radius: 10px 10px 0 0;
}
.subject_title {
  display: block;
  line-height: 30px;
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 500;
  /* background: #f3f8fb; */
  background: url('./../../assets/ks_xiewen.jpg') repeat;
  padding: 10px 20px;
}
.subject_main p {
  display: block;
  font-size: 16px;
  line-height: 30px;
  color: #666666;
  padding: 5px 20px;
}
.subject_main p input {
  margin-right: 10px;
}
.footer {
  text-align: center;
  padding: 20px 0;
  border-top: solid 1px #dadadc;
  border-bottom: dashed 1px #dadadc;
  margin-bottom: 20px; 
}
.footer .pagenav {
  display: inline-block;
  width: 100px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: url('./../../assets/btn03_out.jpg') no-repeat;
  border-radius: 4px;
  margin: 0 10px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}
.footer-main {
  text-align: center;
  margin: 20px auto;
}
.footer-main a {
  display: inline-block;
  background: url('./../../assets/ks_jiaojuan_out.jpg') no-repeat;
  width: 194px;
  height: 50px;
  line-height: 50px;
  color: #333;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
}
.footer-main a:hover{
  background: url('./../../assets/ks_jiaojuan_on.jpg') no-repeat;
}
.morebox {
  padding: 10px 20px 5px;
}
.block {
  overflow: hidden;
  width: 980px;
  margin: 0 auto;
  padding-left: 20px;
}
.block a {
  margin: 5px 10px 5px 0;
  float: left;
  border: solid 1px #ccc;
  border-radius: 2px;
  color: #ff0000;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.block a:hover {
  color: #5b96fc;
  border: solid 1px #5b96fc;
}
.block a.blue-link {
  color: #5b96fc;
  border: solid 1px #5b96fc;
}
.ks_shuoming02{
  background: #f1f1f1;
  margin-top: 20px;
  padding: 10px;
}
.red {
    color: #ff0000;
}
</style>