<template>
  <div class="todo-list">
    <UserHeader></UserHeader>
    <van-tabs>
      <van-tab title="订单列表">
        <AllList></AllList>
      </van-tab>
    </van-tabs>
    <!-- 查看下是不是获取不到值产生的页面错误给老子不显示 -->
  </div>
</template>

<script>
import UserHeader from "../components/UserHeader";
import AllList from "../components/AllList";

export default {
  name: "TodoList",
  components: {
    UserHeader,
    AllList
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less"></style>
