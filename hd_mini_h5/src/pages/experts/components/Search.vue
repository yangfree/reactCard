<template>
  <div class="search">
    <van-search
      v-model="value"
      show-action
      label="专家"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <!-- <div class="expert-todolist" v-if="role === 'expert'">
      <van-button block plain type="primary" @click="goTodoList"
        >代办事项</van-button
      >
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      value: "",
      role: ""
    };
  },
  created() {
    this.role = JSON.parse(localStorage.getItem("user")).role;
  },
  methods: {
    onSearch() {}
    // goTodoList() {
    //   this.$router.push({
    //     name: "TodoList"
    //   });
    // }
  }
};
</script>

<style lang="less" scoped>
.search {
  margin: 0 -12px;
}
</style>
