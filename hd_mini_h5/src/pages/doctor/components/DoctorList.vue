<template>
  <div class="doctor-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="--COMPLETE--"
      @load="onLoad"
    >
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      <div
        class="pedding-list"
        v-for="item in docotorList"
        :key="item._id"
        @click="orderEditor()"
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
              >去视频</van-button
            >
          </span>
        </div>
        <div class="pay-btn">
          <van-button
            plain
            block
            type="primary"
            size="small"
            @click="pay(item._id, item._source.expertInfo.referral)"
            >确定</van-button
          >
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import ajax from "@/api/ajaxRequest";

export default {
  name: "DoctorList",
  created() {
    this.openid = JSON.parse(localStorage.getItem("user")).openid;
    this.getDoctorList();
  },
  data() {
    return {
      docotorList: [],
      loading: true,
      finished: true,
      openid: ""
    };
  },
  methods: {
    pay(id, price) {
      ajax
        .request({
          url: "/record/pay",
          method: "POST",
          data: {
            openid: this.openid,
            record_id: id,
            num: price
          }
        })
        .then(res => {
          if (res._shards.successful === 1) {
            this.$dialog
              .alert({
                message: `成功`
              })
              .then(() => {
                this.getDoctorList();
              });
          } else {
            this.$dialog
              .alert({
                message: `失败`
              })
              .then(() => {
                // do something...
              });
          }
        })
        .catch(err => {
          console.log(err);
          this.$dialog
            .alert({
              message: `失败`
            })
            .then(() => {
              // do something...
            });
        });
    },
    orderEditor() {
      // console.log(item);
    },
    onLoad() {},
    getDoctorList() {
      //   console.log(this.openid);
      const searchParams = {
        query: {
          bool: {
            filter: [
              {
                term: {
                  "state.keyword": "02"
                }
              },
              {
                term: {
                  "doctorInfo.openid.keyword": this.openid
                }
              }
            ]
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
          // console.log(res);
          this.docotorList = res.hits.hits;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goVideo(val) {
      window.location.href = val;
    }
  },
  filters: {
    stateInit(val) {
      // console.log(val);
      if (val === "02") {
        return "待确认";
      } else {
        return val;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.doctor-list {
  padding: 15px;
  box-sizing: border-box;

  .pedding-list {
    padding-bottom: 0.1rem;
    margin-bottom: 0.15rem;
    border-bottom: 10px dashed #f5f5f5;
    .title {
      display: flex;
      justify-content: space-between;
      font-size: 0.12rem;
      padding-bottom: 5px;

      span:nth-child(2) {
        color: #ff0000;
      }
    }
    .words {
      display: flex;
      flex-direction: column;
      .video {
        display: flex;
        justify-content: space-between;
      }
    }
    .pay-btn {
      text-align: right;
      margin-top: 10px;
    }
  }
}
</style>
