<template>
  <div class="admin-article">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>杨洁个人网站管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 输入内容板块 -->
    <el-container class="article-content">
      <el-form ref="form" :model="fromArticle" style="width: 100%">
        <el-form-item>
          <el-input v-model="fromArticle.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="fromArticle.keywords" placeholder="请输入文章关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="fromArticle.directory" placeholder="请输入文章分类"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 富文本编辑器 -->
          <mavon-editor v-model="fromArticle.editorContent" ref="editor" placeholder="请输入文章内容" />
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

export default {
  name: "AdminArticle",
  components: {
    mavonEditor
  },
  data() {
    return {
      fromArticle: {
        title: "",
        directory: "",
        keywords: "",
        editorContent: ""
      }
    };
  },
  methods: {
    onSubmit() {}
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
