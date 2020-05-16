<template>
  <div class="admin-article">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>杨洁个人网站管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{fromArticle.title}}</el-breadcrumb-item>
    </el-breadcrumb>
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
          <el-button type="primary" @click="onSubmit">更新</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { putArticle } from "@/api/api.js";

export default {
  name: "AdminArticle",
  components: {
    mavonEditor
  },
  data() {
    return {
      fromArticle: {
        id: this.$route.params._id,
        title: this.$route.params.title,
        directory: this.$route.params.directory,
        tags: this.$route.params.tags,
        content: this.$route.params.content,
        hot: this.$route.params.hot,
        createTime: this.$route.params.createTime,
        updateTime: new Date()
      }
    };
  },
  created() {

  },
  methods: {
    onSubmit() {
      putArticle('', this.fromArticle)
      .then(res=>{
        // console.log(res);
        this.$message({
          type: 'success',
          message: '提交成功',
          duration: 2000
        })
        this.fromArticle.title = '';
        this.fromArticle.directory = '';
        this.fromArticle.tags = '';
        this.fromArticle.content = '';
        this.fromArticle.hot = '';
        window.history.go(-1);
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
};
</script>
<style lang="less" scoped>
.admin-article {
  .article-content {
    margin-top: 35px;
  }
}
</style>
