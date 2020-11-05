<template>
  <div class="header">
    {{ this.$route.meta }}
  </div>
</template>

<script>
export default {
  name: "MyHeader"
};
</script>

<style lang="less" scoped>
.header {
  font-size: 25px;
  padding: 10px 0;
  border-bottom: 1px solid #1989fa;
  margin-bottom: 10px;
  text-align: center;
}
</style>
