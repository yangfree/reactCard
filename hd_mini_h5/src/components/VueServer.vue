<template>
  <div class="vue-loading">
    <van-loading color="#1989fa" />
    <van-loading type="spinner" color="#1989fa" />
  </div>
</template>

<script>
export default {
  name: "VueServer"
};
</script>

<style lang="less" scoped>
.vue-loading {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
