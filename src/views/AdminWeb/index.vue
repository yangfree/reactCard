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
        <el-form :label-position="labelPosition" label-width="120px" :model="formWebsiteInfo">
          <el-form-item label="网站名称">
            <el-input v-model="formWebsiteInfo.name"></el-input>
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
            <el-input v-model="formWebsiteInfo.update"></el-input>
          </el-form-item>
          <el-form-item label="备案号">
            <el-input v-model="formWebsiteInfo.icp"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 联系方式 -->
      <div class="web-connect" v-if="hideOrShow.websiteConnect">
        <el-form :label-position="labelPosition" label-width="120px" :model="formWebsiteConnect">
          <el-form-item label="邮箱">
            <el-input v-model="formWebsiteConnect.eamil"></el-input>
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
        </el-form>
      </div>
      <!-- 友情链接 -->
      <div class="web-friends" v-if="hideOrShow.websiteFriends">
        <el-form :label-position="labelPosition" label-width="120px" :model="formWebsiteFriends">
          <el-form-item label="名称">
            <el-input v-model="formWebsiteFriends.name"></el-input>
          </el-form-item>
          <el-form-item label="网址">
            <el-input v-model="formWebsiteFriends.website"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 文件协议 -->
      <div class="web-file" v-if="hideOrShow.websiteFile">
        <el-form :label-position="labelPosition" label-width="120px" :model="formWebsiteFile">
          <el-form-item label="邮箱">
            <el-input type="textarea" v-model="formWebsiteFile.protocol"></el-input>
          </el-form-item>
          <el-form-item label="微博">
            <el-input type="textarea" v-model="formWebsiteFile.privacy"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-container>
    <el-container>
      <div class="btn-submit">
        <el-button type="primary" :loading="submitAll.loading" @click="buttonStatus">{{submitAll.text}}</el-button>
      </div>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "AdminWeb",
  data() {
    return {
      labelPosition: "right",
      formWebsiteInfo: {
        name: "",
        description: "",
        keywords: "",
        version: "",
        update: "",
        icp: ""
      },
      formWebsiteConnect: {
        email: "",
        weibo: "",
        github: "",
        zhihu: ""
      },
      formWebsiteFriends: {
        name: "",
        website: ""
      },
      formWebsiteFile: {
        protocol: "",
        privacy: ""
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
  methods: {
    buttonStatus() {
      this.submitAll.loading = true;
      this.submitAll.text = "提交中";
      alert(1);
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
