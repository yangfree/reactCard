<template>
  <div class="pendding">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="--COMPLETE--"
      @load="onLoad"
    >
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      <div class="pedding-list" v-for="item in penddingList" :key="item._id">
        <div class="title">
          <span>订单编号: {{ item._id }}</span>
          <span>状态: {{ item._source.state === "02" ? "待确认" : "--" }}</span>
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
      finished: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1);
      //     }
      //     // 加载状态结束
      //     this.loading = false;
      //     // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true;
      //     }
      //   }, 1000);
    },
    getList() {
      /**
       * 01: 预约中
       * 02: 待确认
       * 03: 待会诊
       * 04: 待开方
       */
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
                  "state.keyword": "02"
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
          // console.log(res);
          this.penddingList = res.hits.hits;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goVideo(val) {
      window.location.href = val;
    }
  }
};
</script>

<style lang="less" scoped>
.pendding {
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
