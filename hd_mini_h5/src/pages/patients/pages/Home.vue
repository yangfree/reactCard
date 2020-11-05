<template>
  <div class="home">
    <UserHeader></UserHeader>
    <van-tabs>
      <van-tab title="订单列表">
        <AllList></AllList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UserHeader from "../components/UserHeader";
import AllList from "../components/AllList";

export default {
  name: "Personel",
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
