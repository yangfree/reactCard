<template>
  <div class="expert-list">
    <!-- 骨架屏 -->
    <van-skeleton
      title
      avatar
      :row="3"
      v-for="item in 6"
      :key="item"
      v-show="showList"
    />
    <!-- 专家列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="--COMPLETE--"
        @load="onLoad"
      >
        <div class="expert-item" v-for="item in expertList" :key="item.id">
          <van-row gutter="20">
            <van-col span="6" class="avatar">
              <van-icon
                class="online"
                :class="item.is_online == '1' ? 'online-green' : 'online-grey'"
                name="certificate"
              />
              <van-image
                width="0.8rem"
                height="0.8rem"
                round
                lazy-load
                :src="item.user_picture"
              />
            </van-col>
            <van-col span="18" class="info">
              <div class="name">
                <h3>{{ item.username }}</h3>
                <span>{{ item.title }}</span>
              </div>
              <div class="hospital">
                <span>所属医院:</span>
                <span>{{ item.hospital }}</span>
              </div>
              <div class="attending">
                <span>主治:</span>
                <span class="van-multi-ellipsis--l2">{{ item.good_at }}</span>
              </div>
              <div class="tags">
                <van-tag type="primary">{{ item.field }}</van-tag>
              </div>
              <div class="price">
                <span>{{ item.referral | initPrice }}</span>
              </div>
              <div class="btn-group">
                <!-- <van-button type="primary" size="mini" plain square disabled
                  >查看在线时间</van-button
                > -->
                <van-button
                  type="info"
                  size="mini"
                  plain
                  square
                  @click="takeAppointment(item)"
                  :disabled="
                    role === 'expert' ||
                      role === 'assistant' ||
                      role === 'patient'
                  "
                  >预约</van-button
                >
              </div>
            </van-col>
          </van-row>
        </div>
      </van-list>
    </van-pull-refresh>
    <!-- 弹出层 -->
    <van-popup v-model="popupShow" class="popup-class">
      <van-radio-group v-model="patientRadio" class="radio-group">
        <template v-if="role === 'doctor'">
          <van-radio name="1">会诊</van-radio>
        </template>
        <template v-if="role === 'patient'">
          <van-radio name="2">复诊</van-radio>
          <!-- <van-radio name="3">个人问诊</van-radio> -->
        </template>
      </van-radio-group>
      <van-button type="info" square block size="mini" @click="nextStep"
        >下一步</van-button
      >
    </van-popup>
  </div>
</template>

<script>
import ajax from "@/api/ajaxRequest";
import { getCodeFn, getUrlCode } from "@/api/getOpneid";

export default {
  name: "ExpertList",
  data() {
    return {
      expertList: [],
      loading: false,
      finished: false,
      refreshing: false,
      popupShow: false,
      patientRadio: "1",
      nextPage: "",
      // pageNum: "",
      showList: true,
      role: "",
      expertInfo: {},
      open_id: ""
    };
  },
  created() {
    let code = getUrlCode("code");
    if (code) {
      ajax
        .request({
          url: "/wechat/openid/",
          methods: "GET",
          params: {
            code: code
          }
        })
        .then(res => {
          this.open_id = res.openid;
          this.getRole();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      getCodeFn("https://hdmp.hdzyhosp.com/wechat/experts.html");
    }
  },
  methods: {
    // 下一步
    nextStep() {
      this.$router.push({
        path: "/consultation",
        name: "Consultation",
        params: {
          info: this.expertInfo
        }
      });
    },
    // 预约
    takeAppointment(info) {
      // console.log(price);
      this.expertInfo = info;
      this.popupShow = true;
    },
    // 获取医生列表
    getExpertList() {
      ajax
        .request({
          url: "/expert/?page=1&page_size=100",
          method: "get"
        })
        .then(res => {
          this.nextPage = res.next;
          this.showList = false;
          this.expertList = res.results.sort((a, b) => {
            return b.is_online - a.is_online;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRole() {
      ajax
        .request({
          url: "/openid/",
          method: "GET",
          params: {
            open_id: this.open_id
            // open_id: "18732255806"
          }
        })
        .then(res => {
          this.role = res.login_role;
          const userRole = {
            openid: res.open_id,
            role: res.login_role,
            phone: res.phone
          };
          localStorage.setItem("user", JSON.stringify(userRole));
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 上拉
    onLoad() {
      this.getExpertList();
      this.finished = true;
      this.loading = false;
      this.refreshing = false;
    },
    // 下拉
    onRefresh() {
      this.getExpertList();
      this.finished = true;
      this.loading = false;
      this.refreshing = false;
    }
  },
  filters: {
    initPrice(val) {
      return `¥ ${val}`;
    }
  }
};
</script>

<style lang="less" scoped>
.expert-list {
  padding: 0.15rem 0;
  box-sizing: border-box;

  .expert-item {
    margin-bottom: 0.15rem;
    padding-bottom: 0.05rem;
    font-size: 0.1rem;
    border-bottom: 1px solid #eee;

    .avatar {
      text-align: center;
      position: relative;

      .online {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 0.14rem;
      }

      .online-grey {
        color: #999;
      }

      .online-green {
        color: green;
      }
    }

    .info {
      div {
        margin-bottom: 5px;
      }
      .name {
        display: flex;
        justify-content: space-between;

        h3 {
          margin: 0;
          font-size: 0.12rem;
          color: #444;
        }
        span {
          color: brown;
        }
      }
      .hospital {
        span:nth-child(1) {
          margin-right: 5px;
        }
        span:nth-child(2) {
          color: #777;
        }
      }
      .attending {
        display: flex;

        span:nth-child(1) {
          flex: 1;
        }
        span:nth-child(2) {
          flex: 7;
          color: #777;
        }
      }
      .tags {
        span {
          margin-right: 10px;
        }
      }
      .price {
        span {
          color: #ff0000;
          font-weight: bold;
        }
      }
      .btn-group {
        text-align: right;
      }
    }
  }

  .popup-class {
    width: 60%;
    padding: 0.25rem;
    box-sizing: border-box;
    border-radius: 0.05px;

    .radio-group {
      margin-bottom: 0.15rem;
      .van-radio {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
