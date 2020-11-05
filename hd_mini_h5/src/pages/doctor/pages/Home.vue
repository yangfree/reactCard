<template>
  <div class="home">
    <UserHeader></UserHeader>
    <van-tabs v-model="active">
      <van-tab title="待确认">
        <DoctorList></DoctorList>
      </van-tab>
      <van-tab title="待开方">
        <MakePrescription></MakePrescription>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import DoctorList from "../components/DoctorList";
import UserHeader from "../components/UserHeader.vue";
import MakePrescription from "../components/MakePrescription.vue";

export default {
  name: "Home",
  components: {
    DoctorList,
    UserHeader,
    MakePrescription
  },
  data() {
    return {
      active: ""
    };
  }
};
</script>

<style lang="less" scoped></style>
