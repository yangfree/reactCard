<template>
  <div class="all-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="--COMPLETE--"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <div
          class="pedding-list"
          v-for="item in penddingList"
          :key="item._id"
          @click="lookOrder(item)"
        >
          <div class="title">
            <span>订单编号: {{ item._id }}</span>
            <span>状态: {{ item._source.state | filterState }}</span>
          </div>
          <div class="words">
            <span>预约医生: {{ item._source.doctorInfo.name }}</span>
            <span>患者名字: {{ item._source.patient.username }}</span>
            <span>诊断结果: {{ item._source.diagnosis }}</span>
            <span>房间号: {{ item._source.appointmentTime.roomNum }}</span>
            <span class="video" v-if="item._source.state !== '10'">
              <span>视频地址:</span>
              <van-button
                plain
                hairline
                type="primary"
                size="mini"
                @click.self.stop="goVideo(item._source.appointmentTime.room)"
                >去视频</van-button
              >
            </span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ajax from "@/api/ajaxRequest.js";

export default {
  name: "Pendding",
  data() {
    return {
      penddingList: [],
      loading: true,
      finished: true,
      phone: "",
      refreshing: true
    };
  },
  mounted() {
    this.phone = JSON.parse(localStorage.getItem("user")).phone;
    // console.log(this.phone);

    this.getList();
  },
  methods: {
    onRefresh() {
      this.getList();
      this.refreshing = false;
      this.loading = false;
      this.finished = true;
    },
    onLoad() {},
    getList() {
      /**
       * 01: 预约中
       * 02: 待确认
       * 03: 待会诊
       * 04: 待开方
       */
      const searchParams = {
        query: {
          match: {
            "patient.phone.keyword": this.phone
          }
        }
      };

      ajax
        .request({
          url: "/record/_search",
          method: "POST",
          data: searchParams
        })
        .then(res => {
          this.penddingList = res.hits.hits;
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    lookOrder(val) {
      this.$router.push({
        name: "PatientOrder",
        params: {
          orderinfo: val
        }
      });
    },
    goVideo(val) {
      window.location.href = val;
    }
  },
  filters: {
    filterState(val) {
      switch (val) {
        case "01":
          return "预约中";
          break;
        case "02":
          return "待确认";
          break;
        case "03":
          return "待会诊";
          break;
        case "04":
          return "待开方";
          break;
        case "10":
          return "已结束";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.all-list {
  margin: 0.15rem;

  .pedding-list {
    margin-bottom: 0.15rem;
    padding: 0.15rem 0;
    box-sizing: border-box;
    border-bottom: 10px dashed #f5f5f5;

    .title {
      display: flex;
      justify-content: space-between;
    }
    .words {
      display: flex;
      flex-direction: column;
      .video {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
