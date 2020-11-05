<template>
  <div class="personel">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "Personel",
  components: {},
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  }
};
</script>

<style lang="less">
.personel {
  display: flex;
  flex-direction: column;

  .change-router {
    display: flex;
    margin: 10px 16px 0 16px;
    justify-content: center;
  }
}
</style>
