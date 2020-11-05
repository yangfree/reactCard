<template>
  <div class="home">
    <UserHeader></UserHeader>
    <van-tabs>
      <van-tab title="待处理">
        <div class="card-list">
          <ProcessedList></ProcessedList>
        </div>
      </van-tab>
      <van-tab title="进行中">
        <div class="card-list">
          <Pendding></Pendding>
        </div>
      </van-tab>
      <van-tab title="订单列表">
        <AllList></AllList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UserHeader from "../components/UserHeader";
import ProcessedList from "../components/ProcessedList";
import Pendding from "../components/Pendding";
import AllList from "../components/AllList";

export default {
  name: "Home",
  components: {
    UserHeader,
    ProcessedList,
    Pendding,
    AllList
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.home {
  .card-list {
    padding: 0 15px;
  }
}
</style>
