<template>
  <div class="admin-article">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>杨洁个人网站管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容展示区域 -->
    <el-container class="article-list">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>文章列表</span>
        </div>
        <div
          v-for="(item,index) in articleList"
          :key="index"
          @click="jumpArticle(item)"
          class="text item"
        >{{item.title}}</div>
      </el-card>
    </el-container>
    <!-- 输入内容板块 -->
    <el-container class="article-content">
      <el-form ref="form" :model="fromArticle" style="width: 100%">
        <el-form-item>
          <el-input v-model="fromArticle.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="fromArticle.tags" placeholder="请输入文章关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="fromArticle.directory" placeholder="请输入文章分类"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="fromArticle.hot" placeholder="是否热门推荐0代表不是1代表是"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 富文本编辑器 -->
          <mavon-editor v-model="fromArticle.content" ref="editor" placeholder="请输入文章内容" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发表</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { getArticles, postArticle } from "@/api/api.js";

export default {
  name: "AdminArticle",
  components: {
    mavonEditor
  },
  data() {
    return {
      articleList: [],
      fromArticle: {
        title: "",
        directory: "",
        tags: "",
        content: "",
        hot: "",
        createTime: new Date(),
        updateTime: ""
      }
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    jumpArticle(val) {
      // console.log(val);
      this.$router.push({
        name: "ArticleOne",
        params: val
      });
    },
    getArticleList() {
      getArticles()
        .then(res => {
          // console.log(res);
          this.articleList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      // console.log(this.fromArticle);
      postArticle("", this.fromArticle)
        .then(res => {
          // console.log(res);
          this.$message({
            type: "success",
            message: "提交成功",
            duration: 2000
          });
          this.fromArticle.title = "";
          this.fromArticle.directory = "";
          this.fromArticle.tags = "";
          this.fromArticle.content = "";
          this.fromArticle.hot = '';
          this.getArticleList();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.admin-article {
  .article-content {
    margin-top: 35px;
  }
  .article-list {
    .box-card {
      width: 100%;
      margin: 35px 0 0;
      .item {
        font-size: 14px;
        padding: 5px 0;
        text-indent: 2em;
        margin-bottom: 10px;
        cursor: pointer;
        color: #777;
      }
      .item:nth-child(odd) {
        background-color: #ffffcc;
      }
      .item:nth-child(even) {
        background-color: #99ffcc;
      }
    }
  }
}
</style>
