<template>
  <div class="admin-web">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>杨洁个人网站管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>网站管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <!-- Tags标签 -->
      <div class="tag-group">
        <el-tag
          v-for="item in items"
          :key="item.label"
          :type="item.type"
          effect="dark"
          @click="changeTag(item.label)"
        >{{item.label}}</el-tag>
      </div>
    </el-container>
    <el-container>
      <!-- 基本信息填写 -->
      <div class="web-info" v-if="hideOrShow.websiteInfo">
        <el-form label-position="left" label-width="120px" :model="formWebsiteInfo">
          <el-form-item label="网站名称">
            <el-input v-model="formWebsiteInfo.title"></el-input>
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="formWebsiteInfo.description"></el-input>
          </el-form-item>
          <el-form-item label="关键词">
            <el-input v-model="formWebsiteInfo.keywords"></el-input>
          </el-form-item>
          <el-form-item label="版本号">
            <el-input v-model="formWebsiteInfo.version"></el-input>
          </el-form-item>
          <el-form-item label="更新时间">
            <el-input v-model="formWebsiteInfo.updateTime"></el-input>
          </el-form-item>
          <el-form-item label="备案号">
            <el-input v-model="formWebsiteInfo.icp" disabled></el-input>
          </el-form-item>
          <el-form-item>
            <div class="btn-submit">
              <el-button
                type="primary"
                :loading="submitAll.loading"
                @click="bascisSubmit"
              >{{submitAll.text}}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!-- 联系方式 -->
      <div class="web-connect" v-if="hideOrShow.websiteConnect">
        <el-form :label-position="labelPosition" label-width="120px" :model="formWebsiteConnect">
          <el-form-item label="邮箱">
            <el-input v-model="formWebsiteConnect.email"></el-input>
          </el-form-item>
          <el-form-item label="微博">
            <el-input v-model="formWebsiteConnect.weibo"></el-input>
          </el-form-item>
          <el-form-item label="知乎">
            <el-input v-model="formWebsiteConnect.zhihu"></el-input>
          </el-form-item>
          <el-form-item label="Github">
            <el-input v-model="formWebsiteConnect.github"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="btn-submit">
              <el-button
                type="primary"
                :loading="submitAll.loading"
                @click="buttonStatus"
              >{{submitAll.text}}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!-- 友情链接 -->
      <div class="web-friends" v-if="hideOrShow.websiteFriends">
        <template>
          <el-table :data="websiteFriendsList" style="width: 80%; margin:0 auto 25px;">
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="webLink" label="网址"></el-table-column>
          </el-table>
        </template>
        <el-form :label-position="labelPosition" label-width="120px" :model="formWebsiteFriends">
          <el-form-item label="名称">
            <el-input v-model="formWebsiteFriends.name"></el-input>
          </el-form-item>
          <el-form-item label="网址">
            <el-input v-model="formWebsiteFriends.webLink"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="btn-submit">
              <el-button
                type="primary"
                :loading="submitAll.loading"
                @click="buttonStatus"
              >{{submitAll.text}}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!-- 文件协议 -->
      <div class="web-file" v-if="hideOrShow.websiteFile">
        <el-form :label-position="labelPosition" label-width="120px" :model="formWebsiteFile">
          <el-form-item v-for="(item,index) in formWebsiteFile.files" :key="index">
            <el-input type="text" v-model="item.title"></el-input>
            <el-input type="textarea" v-model="item.content"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="btn-submit">
              <el-button
                type="primary"
                :loading="submitAll.loading"
                @click="bascisSubmit"
              >{{submitAll.text}}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-container>
    <!-- <template>
      <el-button :plain="true" @click="openMsg1">成功</el-button>
      <el-button :plain="true" @click="openMsg2">警告</el-button>
      <el-button :plain="true" @click="openMsg3">消息</el-button>
      <el-button :plain="true" @click="openMsg4">错误</el-button>
    </template> -->
  </div>
</template>
  </div>
</template>
<script>
import {
  getBasics,
  getConnects,
  getFriendsList,
  getFilesList,
  updateBasics
} from "@/api/api.js";

export default {
  name: "AdminWeb",
  data() {
    return {
      labelPosition: "right",
      formWebsiteInfo: {
        title: "",
        description: "",
        keywords: "",
        version: "",
        updateTime: "",
        icp: ""
      },
      formWebsiteConnect: {
        // email: "",
        // weibo: "",
        // github: "",
        // zhihu: ""
      },
      websiteFriendsList: [],
      formWebsiteFriends: {
        // name: "",
        // webLink: ""
      },
      formWebsiteFile: {
        // protocol: "",
        // privacy: ""
      },
      // 控制盒子切换
      hideOrShow: {
        websiteInfo: true,
        websiteConnect: false,
        websiteFriends: false,
        websiteFile: false
      },
      items: [
        {
          type: "",
          label: "基本信息"
        },
        {
          type: "success",
          label: "联系方式"
        },
        {
          type: "warning",
          label: "友情链接"
        },
        {
          type: "danger",
          label: "文件协议"
        }
      ],
      //提交按钮的状态
      submitAll: {
        loading: false,
        text: "提交"
      }
    };
  },
  created() {
    // 获取网站信息
    this.getFilesInfo();
    this.getBasicsInfo();
    this.getConnectsInfo();
    this.getFriendsInfo();
  },
  methods: {
    bascisSubmit() {
      this.submitAll.loading = true;
      this.submitAll.text = "提交中";
      updateBasics("", this.formWebsiteInfo)
        .then(res => {
          // console.log(res);
          this.submitAll.loading = false;
          this.submitAll.text = "提交";
          this.$message({
            message: "提交成功",
            type: "success",
            duration: 1500,
          });
          this.getFilesInfo();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFilesInfo() {
      getFilesList()
        .then(res => {
          this.formWebsiteFile = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFriendsInfo() {
      getFriendsList()
        .then(res => {
          // console.log(res);
          this.websiteFriendsList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getConnectsInfo() {
      getConnects()
        .then(res => {
          this.formWebsiteConnect = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBasicsInfo() {
      getBasics()
        .then(res => {
          this.formWebsiteInfo = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    buttonStatus() {
      // this.submitAll.loading = true;
      // this.submitAll.text = "提交中";
      // alert(1);
    },
    changeTag(label) {
      if (label) {
        switch (label) {
          case "基本信息":
            this.hideOrShow.websiteInfo = true;
            this.hideOrShow.websiteConnect = false;
            this.hideOrShow.websiteFriends = false;
            this.hideOrShow.websiteFile = false;
            break;
          case "联系方式":
            this.hideOrShow.websiteInfo = false;
            this.hideOrShow.websiteConnect = true;
            this.hideOrShow.websiteFriends = false;
            this.hideOrShow.websiteFile = false;
            break;
          case "友情链接":
            this.hideOrShow.websiteInfo = false;
            this.hideOrShow.websiteConnect = false;
            this.hideOrShow.websiteFriends = true;
            this.hideOrShow.websiteFile = false;
            break;
          case "文件协议":
            this.hideOrShow.websiteInfo = false;
            this.hideOrShow.websiteConnect = false;
            this.hideOrShow.websiteFriends = false;
            this.hideOrShow.websiteFile = true;
            break;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.admin-web {
  .tag-group {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 25px 0;
    .el-tag {
      cursor: pointer;
    }
  }
  .web-info,
  .web-connect,
  .web-friends,
  .web-file {
    width: 100%;
  }
  .btn-submit {
    width: 100%;
    text-align: right;
    .el-button {
      padding: 12px 35px;
    }
  }
}
</style>
