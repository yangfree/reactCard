<template>
  <div class="processed-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="--COMPLETE--"
        @load="onLoad"
      >
        <div
          class="pedding-list"
          v-for="item in processedList"
          :key="item._id"
          @click="orderEditor(item._id)"
        >
          <div class="title">
            <span>订单编号: {{ item._id }}</span>
            <span>{{ item._source.state | stateInit }}</span>
          </div>
          <div class="words">
            <span>预约医生: {{ item._source.doctorInfo.name }}</span>
            <span>患者名字: {{ item._source.patient.username }}</span>
            <span>诊断结果: {{ item._source.diagnosis }}</span>
            <span>房间号: {{ item._source.appointmentTime.roomNum }}</span>
            <span class="video">
              <span>视频地址:</span>
              <van-button
                plain
                hairline
                type="primary"
                size="mini"
                @click.self.stop="goVideo(item._source.appointmentTime.room)"
                v-if="item._source.appointmentTime.room"
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
  name: "ProcessedList",
  data() {
    return {
      processedList: [],
      loading: true,
      finished: true,
      refreshing: true,
      role: ""
    };
  },
  created() {
    this.role = JSON.parse(localStorage.getItem("user")).role;
    this.getList();
    // console.log(JSON.parse(localStorage.getItem("user")).role);
  },
  methods: {
    onRefresh() {
      this.getList();
      this.finished = true;
      this.refreshing = false;
      this.loading = false;
    },
    onLoad() {},
    getList() {
      const searchParams = {
        query: {
          bool: {
            must_not: [
              {
                match: {
                  "state.keyword": "10"
                }
              }
            ],
            should: [
              {
                match: {
                  "state.keyword": "01"
                }
              },
              {
                match: {
                  "state.keyword": "03"
                }
              },
              {
                match: {
                  "state.keyword": "04"
                }
              }
            ]
          }
        },
        from: 0,
        size: 100,
        sort: [{ "license.keyword": "asc" }]
      };
      ajax
        .request({
          url: "/record/_search",
          method: "POST",
          data: searchParams
        })
        .then(res => {
          this.processedList = res.hits.hits;
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳转到医护编辑页面
    orderEditor(val) {
      this.$router.push({
        path: "/medicaleditor",
        name: "MedicalEditor",
        query: {
          _id: val,
          role: this.role
        }
      });
    },
    goVideo(val) {
      window.location.href = val;
    }
  },
  filters: {
    stateInit(val) {
      switch (val) {
        case "01":
          return "预约中";
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
.processed-list {
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
