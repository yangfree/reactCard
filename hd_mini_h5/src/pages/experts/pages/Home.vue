<template>
  <div class="home">
    <Search></Search>
    <ExpertList></ExpertList>
  </div>
</template>

<script>
import ExpertList from "../components/ExpertList.vue";
import Search from "../components/Search.vue";

export default {
  name: "Home",
  components: {
    ExpertList,
    Search
  }
};
</script>

<style lang="less" scoped></style>
