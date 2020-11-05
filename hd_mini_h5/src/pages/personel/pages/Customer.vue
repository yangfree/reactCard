<template>
  <div class="customer">
    <van-image :src="require('@/assets/images/custorm_service.png')">
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
      <template v-slot:error>加载失败</template>
    </van-image>

    <div class="van-cell-group">
      <div class="cell">
        <span>{{ service.time }}</span>
        <span>{{ service.serviceTime }}</span>
      </div>
      <div class="cell">
        <span>{{ service.phone }}</span>
        <span>{{ service.servicePhone }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Customer",
  data() {
    return {
      service: {
        time: "服务时间",
        serviceTime: "09:00 - 17:00",
        servicePhone: "010-56903307 | 56903303",
        phone: "客服电话"
      }
    };
  }
};
</script>

<style lang="less" scoped>
.customer {
  .van-cell-group {
    .cell {
      padding: 8px 15px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;

      span:nth-child(2) {
        color: #999;
      }
    }
  }
}
</style>
