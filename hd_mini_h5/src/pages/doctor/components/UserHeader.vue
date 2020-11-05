<template>
  <div class="user-header">
    <div class="left">
      <div class="img">
        <van-image
          width="1rem"
          height="1rem"
          :src="
            userInfo.user_picture === null
              ? 'https://img.yzcdn.cn/vant/cat.jpeg'
              : userInfo.user_picture
          "
        />
      </div>
      <div class="word">
        <div class="username">
          {{ userInfo.username === null ? "--" : userInfo.username }}
        </div>
        <div class="phone">
          {{ userInfo.phone === null ? "--" : userInfo.phone }}
        </div>
        <template v-if="userInfo.level.text">
          <div class="level">
            <span>{{ userInfo.level.text }}</span>
            <van-icon
              name="award-o"
              :color="userInfo.level.color"
              size="0.15rem"
            />
          </div>
        </template>
      </div>
    </div>
    <div class="right">
      <span>{{ userInfo.role }}</span>
    </div>
  </div>
</template>

<script>
import ajax from "@/api/ajaxRequest.js";
import { getCodeFn, getUrlCode } from "@/api/getOpneid";

export default {
  name: "UserHeader",
  data() {
    return {
      userInfo: {
        username: "",
        role: "",
        open_id: "",
        iphone: "",
        user_picture: "",
        level: {
          status: 1,
          text: "",
          color: "yellowgreen"
        }
      }
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
          this.userInfo.open_id = res.openid;
          this.getRole();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      getCodeFn("https://hdmp.hdzyhosp.com/wechat/doctor.html");
    }
  },
  methods: {
    getRole() {
      ajax
        .request({
          url: "/openid/",
          method: "GET",
          params: {
            open_id: this.userInfo.open_id
            // open_id: "18732255806"
          }
        })
        .then(res => {
          this.userInfo.username = res.username;
          this.userInfo.role = res.login_role;
          this.userInfo.phone = res.phone;
          this.userInfo.level.text = res.ext.level_info;
          this.userInfo.user_picture = res.ext.user_picture;

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
    }
  }
};
</script>

<style lang="less" scoped>
.user-header {
  height: 1rem;
  background-color: rgb(252, 247, 177);
  display: flex;
  justify-content: space-between;
  padding: 0 0.15rem;
  box-sizing: border-box;

  .left {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      overflow: hidden;
      background-color: gray;
      margin-right: 0.1rem;
    }

    .word {
      .level {
        i {
          vertical-align: -3px;
        }
      }
    }
  }

  .right {
    span {
      padding: 0.05rem 0.1rem;
      background-color: #ff0000;
      color: #fff;
    }
  }
}
</style>
