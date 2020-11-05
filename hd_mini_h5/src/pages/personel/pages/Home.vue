<template>
  <div class="home">
    <UserHeader></UserHeader>
    <UserList></UserList>
  </div>
</template>

<script>
import UserHeader from "../components/UserHeader.vue";
import UserList from "../components/UserList.vue";

export default {
  name: "Personel",
  inject: ["reload"],
  components: {
    UserHeader,
    UserList
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less"></style>
