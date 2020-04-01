<template>
  <div class="login_home">
    <div class="content">
      <div class="login_title">考试管理系统</div>
      <div class="from_main">
        <div class="from_bg"></div>
        <ul class="from_cont">
          <li class="row_item">
            <span>用户名：</span>
            <input type="text" class="txt" placeholder="请输入用户名" v-model="username">
          </li>
          <li class="row_item">
            <span>密码：</span>
            <input type="password" class="txt" placeholder="请输入密码" v-model="password">
          </li>
          <li>
            <a href="javascript:void(0)" class="login_btn" @click="handleLogin()">登录</a>
          </li>
        </ul>
      </div>
    </div>
</div>
</template>

<script>
import API from '../../api/api'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      if(this.username == "") {
        // this.$message.error('请输入用户名');
        this.$alert('请输入用户名!', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      } else if(this.password== "") {
        // this.$message.error('请输入密码');
        this.$alert('请输入密码!', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      } else {
        this.$axios.post(API.getManageLogin,{
          username: this.username,
          password: this.password
        })
        .then((res) => {
          var res = res.data;
          if(res.result === "00000000"){
            this.token = res.data.token;
            this.id = res.data.id;
            this.userId = res.data.userId;
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            this.$router.push({
              path:'/candidateInfo'
            });
            window.location.reload();
          } else{
            // this.$message.error(res.msg);
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          }
        })
      }
    }
  },
  mounted() {

  }
};
</script>

<style lang="less" scoped>

.login_home {
  width: 100%;
  height: 100%;
  background: url(../../assets/login_bg.jpg) no-repeat center;
  .content{
    width: 100%;
    height: 100%;
    .login_title {
      text-align: center;
      font-size: 30px;
      color: #fff;
      padding-top: 100px;
      height: 40px;
      width: 100%;
    }
    .from_main {
      width: 500px;
      height: 288px;
      margin: 60px auto 100px;
      position: fixed;
      left: 50%;
      top: 50%;
      margin-left: -250px;
      margin-top: -144px;
      .from_bg {
        width: 100%;
        height: 288px;
        position: absolute;
        left: 0;
        top: 0;
        background: #fff;
      }
      .from_cont {
        display: block;
        padding: 60px 0 0 40px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        .row_item {
          display: block;
          overflow: hidden;
          margin-bottom: 30px;
          span {
            display: inline-block;
            width: 60px;
            line-height: 40px;
            padding-right: 5px;
            color: #333;
            font-size: 14px;
            text-align: right;
          }
          .txt {
            display: inline-block;
            width: 360px;
            height: 38px;
            line-height: 38px;
            border: solid 1px #e2e2e2;
            border-radius: 3px;
            text-indent: 10px;
            color: #333;
            background: #fff;
          }
        }
        
        .login_btn {
          display: block;
          text-align: center;
          height: 45px;
          line-height: 45px;
          color: #fff;
          border-radius: 3px;
          background: #337eff;
          font-size: 16px;
        } 
      }
    }
  }
}
</style>

