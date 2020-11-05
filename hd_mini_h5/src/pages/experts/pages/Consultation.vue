<template>
  <div class="consultation">
    <van-form @submit="submitConsultation">
      <!-- 患者信息 -->
      <div class="form-item">
        <h3>患者信息</h3>
        <van-field
          v-model="formData.patient.username"
          name="用户名"
          label="用户名"
          placeholder="请输入您的用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="formData.patient.phone"
          type="number"
          name="手机号"
          label="手机号"
          placeholder="请输入您的手机号"
          :rules="[{ required: true, message: '请填写您的手机号' }]"
        />
        <van-field
          v-model="formData.patient.idCard"
          type="text"
          name="身份证号"
          label="身份证号"
          placeholder="请输入您的身份证号"
          :rules="[{ required: true, message: '请填写您的身份证号' }]"
        />
      </div>
      <!-- 图片上传 -->
      <div class="form-item">
        <h3>图片信息</h3>
        <van-uploader
          accept="image/*"
          v-model="formData.fileList"
          :after-read="uploadimage"
          @delete="deleteImage"
          multiple
          :max-count="4"
          result-type="file"
        />
      </div>
      <!-- 症状描述 -->
      <div class="form-item">
        <h3>症状描述</h3>
        <van-field
          v-model="formData.desription"
          type="textarea"
          placeholder="请输入症状描述"
          maxlength="500"
          show-word-limit
          :autosize="{ maxHeight: 250, minHeight: 120 }"
          class="text-des"
        />
      </div>
      <div class="form-item">
        <h3>初诊结果</h3>
        <van-field
          v-model="formData.diagnosis"
          type="textarea"
          placeholder="请输入症状结果"
          maxlength="15"
          show-word-limit
          :autosize="{ maxHeight: 80, minHeight: 40 }"
          border
        />
      </div>
      <!-- 专家信息 -->
      <div class="form-item">
        <h3>专家信息</h3>
        <van-field
          v-model="formData.expertInfo.username"
          type="text"
          name="姓名"
          label="姓名"
          readonly
          input-align="right"
        />
        <van-field
          v-model="formData.expertInfo.title"
          type="text"
          name="头衔"
          label="头衔"
          readonly
          input-align="right"
        />
      </div>
      <div class="pay-btn">
        <div class="referral">
          服务费用:
          <i>{{ formData.expertInfo.referral | initReferral }}</i>
        </div>
        <van-button type="info" class="btn" plain native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import ajax from "@/api/ajaxRequest.js";

export default {
  name: "Consultation",
  data() {
    return {
      formData: {
        // openid: "18732255806",
        openid: "",
        patient: {
          username: "",
          phone: "",
          idCard: ""
        },
        desription: "",
        diagnosis: "",
        doctorInfo: {
          name: "",
          phone: "",
          address: "",
          hospital: ""
        },
        appointmentTime: {
          day: "2020-01-02",
          date: "0"
        },
        expertInfo: {
          username: "",
          title: "",
          referral: ""
        },
        fileList: []
      }
    };
  },
  mounted() {
    this.formData.openid = JSON.parse(localStorage.getItem("user")).openid;
    this.formData.expertInfo.username = this.$route.params.info.username;
    this.formData.expertInfo.title = this.$route.params.info.title;
    this.formData.expertInfo.referral = this.$route.params.info.referral;
    // console.log(this.formData);
  },
  methods: {
    // beforeRead(file) {
    //   console.log(file);
    // },
    deleteImage(file) {
      ajax
        .request({
          url: "/image/",
          method: "DELETE",
          data: {
            image_url: file.url
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    uploadimage(file) {
      // 此时可以自行将文件上传至服务器
      const params = new FormData();
      params.append("image", file.file);
      // console.log("上传成功后的file对象:", file);

      ajax
        .request({
          url: "/uploadimage/",
          method: "POST",
          data: params,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          // let { id, image_url } = res;
          let len = this.formData.fileList.length;
          let imageList = this.formData.fileList;
          if (len === 0) {
            imageList[0].url = res.image_url;
          } else {
            imageList[len - 1].url = res.image_url;
          }

          // console.log(imageList);
        })
        .catch(err => {
          console.log(err);
          file.status = "failed";
          file.message = "上传失败";
        });
    },
    submitConsultation() {
      ajax
        .request({
          url: "/record/_doc",
          method: "POST",
          data: this.formData
        })
        .then(res => {
          // console.log(res);
          this.orderId = res._id;
        })
        .then(() => {
          this.$dialog
            .alert({
              message: `订单创建成功,您的订单号是${this.orderId}`
            })
            .then(() => {
              this.$router.push("/");
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    formatter(type, val) {
      if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    },
    showDatePopup() {
      this.showDatetime = true;
    }
  },
  filters: {
    initReferral(val) {
      return `¥ ${val}元`;
    }
  }
};
</script>

<style lang="less" scoped>
.consultation {
  .form-item {
    .text-des {
      border: 1px solid #ededed;
    }
  }

  .pay-btn {
    margin: 16px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .referral {
      font-size: 0.14rem;
      i {
        color: #ff0000;
      }
    }
    .btn {
      width: 1.2rem;
      height: 0.35rem;
      line-height: 0.35rem;
    }
  }
}
</style>
