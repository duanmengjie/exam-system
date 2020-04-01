<template>
  <div class="candidate_page">
    
    <div class="break">
      <div class="info_head">考试管理系统</div>
      <a class="exit" @click="exitChange()"><img src="../../assets/exit.png" />退出</a>
      <a href="JavaScript:void(0)" class="addBtn" @click="dialogForm()">新增</a>
    </div>
    <div class="candidate_head">
      <div class="inpt">
        <div class="item">
          <span>姓名</span>
          <el-input
            placeholder="请输入"
            v-model="input1"
            >
          </el-input>
        </div>
        <div class="item">
          <span>身份证</span>
          <el-input
            placeholder="请输入"
            v-model="input2" minlength="18"
            >
          </el-input>
        </div>
        <div class="item">
          <span>准考证</span>
          <el-input
            placeholder="请输入"
            v-model="input3"
            >
          </el-input>
        </div>
        <div class="item">
          <span>作业类型</span>
          <el-select v-model="wokrTypeName" placeholder="请选择" style="width: 150px;" @change="wokrTypeValue(wokrTypeName)">
            <el-option
              v-for="item in workTypeList"
              :key="item.workTypeId"
              :label="item.wokrTypeName"
              :value="item.workTypeId">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <span>作业项目</span>
          <el-select v-model="wokrProjectName" placeholder="请选择" style="width: 150px;" @change="wokrProjectValue(wokrProjectName)">
            <el-option
              v-for="item in workProjectList"
              :key="item.workProjectId"
              :label="item.wokrProjectName"
              :value="item.workProjectId">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="inquerybtn"><el-button type="primary" @click="handleUserList()">查询</el-button></div>
    </div>
    <div style="min-height: 400px;">
      <el-table
        :data="tableData">
        <el-table-column
          label="考生姓名"
          width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="身份证号码"
          width="300" align="center"  minlength="18">
          <template slot-scope="scope">
            <span>{{ scope.row.userId}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="准考证号码"
          width="300" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.entranceCertificateNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="作业类型"
          width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.wokrTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="项目名称"
          width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.wokrProjectName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="10"
        layout="sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="考生信息" :visible.sync="dialogTableVisible" width="950px">
      <div style="width:100%; overflow: hidden;">
        <ul class="addInfo">
          <li>
            <span><em>*</em> 姓名：</span><p><el-input v-model="userInfo.userName" placeholder="请输入姓名"></el-input></p>
          </li>
          <li>
            <span><em>*</em> 身份证号码：</span>
            <p v-if="addSave"><el-input v-model="userInfo.userId" placeholder="请输入身份证号码"></el-input></p>
            <p v-if="editSave"><el-input v-model="userInfo.userId" placeholder="请输入身份证号码" disabled="disabled"></el-input></p>
          </li>
          <li>
            <span><em>*</em> 准考证号：</span><p><el-input v-model="userInfo.entranceCertificateNumber" placeholder="请输入准考证号"></el-input></p>
          </li>
          <li>
            <span><em>*</em> 作业类型：</span>
            <p>
              <el-select v-model="userInfo.wokrTypeName" placeholder="请选择" style="width: 100%;" @change="wokrTypeValue(userInfo.wokrTypeName)">
                <el-option
                  v-for="item in workTypeList"
                  :key="item.workTypeId"
                  :label="item.wokrTypeName"
                  :value="item.workTypeId">
                </el-option>
              </el-select>
            </p>
          </li>
          <li>
            <span><em>*</em> 作业项目：</span>
            <p>
              <el-select v-model="userInfo.wokrProjectName" placeholder="请选择" style="width: 100%;" @change="wokrProjectValue(userInfo.wokrProjectName)">
                <el-option
                  v-for="item in workProjectList"
                  :key="item.workProjectId"
                  :label="item.wokrProjectName"
                  :value="item.workProjectId">
                </el-option>
              </el-select>
            </p>
          </li>
          <li>
            <a class="save" v-if="addSave" @click="handleAdduser()">保存</a>
            <a class="save" v-if="editSave" @click="handleEdietuser()">保存</a>
          </li>
        </ul>
        <el-upload drag multiple name="multipartfile" ref="upload"
          class="avatar-uploader"
          :action="imageAction"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="userInfo.avatarFile" :src="userInfo.avatarFile" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      
    </el-dialog>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%">
    <span>确认删除吗？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleClose()">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import API from "../../api/api";
export default {
  data() {
    return {
      dialogTableVisible: false,
      total: 100,
      wokrTypeName: null,
      wokrProjectName: null,
      tableData: [],
      workTypeList: [],
      workProjectList: [],
      currentPage: 1,
      pageNum: 0,
      pageSize: 10,
      imageAction: "http://192.168.0.171:8080/api/management/uploadFile",
      input1: "",
      input2: "",
      input3: "",
      addSave: true,
      editSave: false,
      dialogVisible: false,
      useridd: "",
      userInfo: {
        userName: "", // 姓名
        userId: "", // 身份证
        workTypeId: "", // 作业类型
        workProjectId: "", // 项目名称
        entranceCertificateNumber: "", // 准考证
        wokrTypeName: null,
        wokrProjectName: null,
        avatarFile: "" // 图片
      }
    };
  },
  methods: {
    dialogForm() {
      this.dialogTableVisible = true;
      this.addSave = true;
      this.editSave = false;
      this.userInfo.userName = "";
      this.userInfo.userId = "";
      this.userInfo.entranceCertificateNumber = "";
      this.userInfo.workTypeId = "";
      this.userInfo.workProjectId = "";
      this.userInfo.wokrTypeName = "";
      this.userInfo.wokrProjectName = "";
      this.userInfo.avatarFile = "";
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.handleUserList()
    },
    handleCurrentChange(val) {
      this.pageNum = val-1;
      this.handleUserList()
    },
    // 查询考生信息列表
    handleUserList() {
      var url =
        API.getUserList +
        "?pageNum=" +
        this.pageNum +
        "&pageSize=" +
        this.pageSize;
      if (this.input1 != "" && this.input1 != null) {
        url += "&userName=" + this.input1;
      }
      if (this.input2 != "" && this.input2 != null) {
        url += "&userId=" + this.input2;
      }
      if (this.input3 != "" && this.input3 != null) {
        url += "&entranceCertificateNumber=" + this.input3;
      }
      if (this.workTypeId != "" && this.workTypeId != null) {
        url += "&workTypeId=" + this.workTypeId;
      }
      if (this.workProjectId != "" && this.workProjectId != null) {
        url += "&workProjectId=" + this.workProjectId;
      }
      this.$axios.get(url).then(res => {
        var result = res.data;
        if (result.result === "00000000") {
          this.tableData = result.data.content;
          this.total = result.data.total;
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    // 新增考生
    handleAdduser() {
      if (this.userInfo.userName == "") {
        this.$message.error("姓名不能为空");
      } else if (this.userInfo.userId == "") {
        this.$message.error("身份证号不能为空");
      } else if (this.userInfo.entranceCertificateNumber == "") {
        this.$message.error("准考证不能为空");
      } else if (this.userInfo.workTypeId == "") {
        this.$message.error("作业类型不能为空");
      } else if (this.userInfo.workProjectId == "") {
        this.$message.error("作业项目不能为空");
      } else {
        this.$axios
          .post(API.getAdduser, {
            userName: this.userInfo.userName,
            userId: this.userInfo.userId,
            entranceCertificateNumber: this.userInfo.entranceCertificateNumber,
            workTypeId: this.userInfo.workTypeId,
            workProjectId: this.userInfo.workProjectId,
            avatarFile: this.userInfo.avatarFile
          })
          .then(res => {
            var result = res.data;
            if (result.result === "00000000") {
              this.dialogTableVisible = false;
              this.handleUserList();
            } else {
              this.$message.error(result.msg);
            }
          });
      }
    },
    // 查询作业
    handleInquire() {
      this.$axios.get(API.getWorkType, {}).then(res => {
        var result = res.data;
        if (result.result === "00000000") {
          this.workTypeList = result.data;
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    // 作业类型赋值
    wokrTypeValue(val) {
      this.userInfo.workTypeId = val;
      this.handleWorkProject();
    },
    // 项目名称赋值
    wokrProjectValue(val) {
      this.userInfo.workProjectId = val;
    },
    // 查询作业项目
    handleWorkProject() {
      this.$axios
        .get(API.getWorkProject + "/" + this.userInfo.workTypeId)
        .then(res => {
          var result = res.data;
          if (result.result === "00000000") {
            this.workProjectList = result.data;
          } else {
            this.$message.error("操作失败");
          }
        });
    },
    // 上传照片
    handleAvatarSuccess(res, file) {
      if (res.result == "00000000") {
        this.userInfo.avatarFile = res.data;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 退出登录
    exitChange() {
      var token = localStorage.getItem("token");
      var userId = localStorage.getItem("userId");
      this.$axios.delete(API.getExit,{
        userId: userId,
        token: token
      }).then(res => {
        var result = res.data;
        if (result.result === "00000000") {
        this.$router.push({
          path:'/managelogin'
        });
        }
      });
    },
    // 编辑复制
    handleEdit(index, row) {
      this.dialogTableVisible = true;
      this.userInfo.userName = row.userName;
      this.userInfo.userId = row.userId;
      this.userInfo.entranceCertificateNumber = row.entranceCertificateNumber;
      this.userInfo.workTypeId = row.workTypeId;
      this.userInfo.wokrTypeName = row.wokrTypeName;
      this.userInfo.wokrProjectName = row.wokrProjectName;
      this.userInfo.workProjectId = row.workProjectId;
      this.userInfo.avatarFile = row.avatarFile;
      this.editSave = true;
      this.addSave = false;
    },// 编辑请求接口
    handleEdietuser() {
      this.$axios
        .post(API.getUpdate, {
          userName: this.userInfo.userName,
          userId: this.userInfo.userId,
          entranceCertificateNumber: this.userInfo.entranceCertificateNumber,
          workTypeId: this.userInfo.workTypeId,
          workProjectId: this.userInfo.workProjectId,
          avatarFile: this.userInfo.avatarFile
        })
        .then(res => {
          if(res.data.result === "00000000"){
            this.dialogTableVisible = false;
            this.handleUserList()          }
        });
    },
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.useridd = row.userId;
    },
    handleClose() {
      this.dialogVisible = false;
      this.$axios.delete(API.getDelete + this.useridd).then(res => {
        this.handleUserList();
      });
    }
  },
  mounted() {
    this.handleUserList();
    this.handleInquire();
    // window.location.reload();
  }
};
</script>

<style lang="less" scoped>
.candidate_page {
  width: 100%;
  margin: 0 auto;
  height: 100%;
  overflow-x: hidden;
  .break {
    background: #5b96fc;
    overflow: hidden;
    line-height:40px;
      width: 100%;
    .info_head {
      float: left;
      padding: 0 20px;
      color: #fff;
      font-size: 16px;
      line-height: 40px;
      border: solid 1px #5b96fc;
    }
    .exit{
      cursor: pointer;
      float: right;
      text-align: right;
      font-size: 14px;
      padding:10px 0 10px 20px;
      color: #fff;
      line-height:20px;
      padding-right: 10px;
      img{
        margin: 0 5px 0 0;
        vertical-align: middle;
        width:15px;
        height: 15px;
      }
    }
    .addBtn {
      display: block;
      float: right;
      width: 70px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin-top:6px;
      font-size: 14px;
      color: #000;
      background: #fff;
      border-radius: 4px;
      margin-right: 30px;
    }
  }
  .candidate_head {
    padding: 20px;
    border-bottom: solid 1px #dcdfe6;
    overflow: hidden;
    .inpt {
      float: left;
      overflow: hidden;
      .item {
        display: inline-block;
        margin-right: 10px;
        overflow: hidden;
        float: left;
        span {
          display: inline-block;
          float: left;
          line-height: 40px;
          font-size: 14px;
          padding-right: 10px;
          color: #666;
        }
        .el-input {
          width: 120px;
          float: left;
        }
      }
      .item:nth-child(1) {
        .el-input {
          width: 110px;
        }
      }
      .item:nth-child(2) {
        .el-input {
          width: 205px;
        }
      }
    }
    .inquerybtn {
      float: left;
      margin-left: 10px;
    }
  }
  .tabInfo {
    margin-top: 20px;
    border: solid 1px #ebebeb;
    border-right: 0;
    border-bottom: 0;
    tr {
      th {
        background: #ebebeb;
        padding: 10px 0;
        text-align: center;
        font-size: 14px;
        font-weight: 550;
      }
      td {
        border: solid 1px #ebebeb;
        border-left: 0;
        text-align: center;
        padding: 5px 0;
        line-height: 30px;
        font-size: 14px;
        a {
          padding: 0 10px;
        }
        :hover {
          color: #5b96fc;
        }
      }
    }
  }
  .block {
    text-align: center;
    padding: 30px 0;
  }
  .addInfo {
    float: left;
    width: 50%;
    margin-left: 90px;
    li {
      display: block;
      margin-bottom: 15px;
      span {
        float: left;
        width: 100px;
        line-height: 30px;
        font-size: 14px;
        em {
          color: #f56c6c;
          font-style: normal;
        }
      }
      p {
        display: inline-block;
        width: 300px;
      }
      .save {
        display: block;
        color: #fff;
        font-size: 16px;
        width: 100px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        background: #409eff;
        border-radius: 5px;
        margin: 20px 0 0 100px;
        cursor: pointer;
      }
    }
  }
  .avatar-uploader {
    float: left;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>

