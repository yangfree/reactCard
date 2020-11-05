<template>
  <div class="expert-editor">
    <van-form @submit="submitAppointment">
      <!-- 患者信息 -->
      <div class="form-item">
        <h3>患者信息</h3>
        <van-field
          v-model="formData.patient.username"
          name="用户名"
          label="用户名"
          placeholder="请输入您的用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
          readonly
        />
        <van-field
          v-model="formData.patient.phone"
          type="number"
          name="手机号"
          label="手机号"
          placeholder="请输入您的手机号"
          :rules="[{ required: true, message: '请填写您的手机号' }]"
          readonly
        />
        <van-field
          v-model="formData.patient.idCard"
          type="text"
          name="身份证号"
          label="身份证号"
          placeholder="请输入您的身份证号"
          :rules="[{ required: true, message: '请填写您的身份证号' }]"
          readonly
        />
      </div>
      <h3>患者图片</h3>
      <div class="form-item image-show">
        <div
          class="img"
          v-for="(item, index) in formData.fileList"
          :key="index"
          @click="clickImage"
        >
          <van-image :src="item.url" class="img-list">
            <template v-slot:error>加载失败</template>
          </van-image>
          <!-- <img :src="item.url" alt srcset /> -->
        </div>
        <van-image-preview
          v-model="imagesShow"
          :images="imagePreview"
          @change="imagesShowChange"
        >
          <template v-slot:imageIndex>第{{ imageIndex }}页</template>
        </van-image-preview>
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
          border
          readonly
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
          readonly
        />
      </div>
      <!-- 预约信息 -->
      <div class="form-item">
        <h3>预约信息</h3>
        <van-field
          v-model="formData.appointmentTime.day"
          name="选择日期"
          label="选择日期"
          readonly
          input-align="right"
          @click-input="showDatePopup"
          disabled
        />
        <van-popup
          v-model="showDatetime"
          position="bottom"
          :style="{ height: '30%' }"
        >
          <van-datetime-picker
            v-model="currentDate"
            type="month-day"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            :filter="formatData"
            @confirm="selectTime"
          />
        </van-popup>

        <van-cell title="选择时间" center>
          <van-dropdown-menu>
            <van-dropdown-item
              v-model="formData.appointmentTime.date"
              :options="dateOptions"
              disabled
            />
          </van-dropdown-menu>
        </van-cell>

        <van-field
          v-model="formData.appointmentTime.room"
          name="腾讯视频地址"
          label="腾讯视频地址"
          placeholder="请输入您的腾讯视频地址"
          input-align="right"
          readonly
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
      <!-- 专家确诊 -->
      <div class="form-item" v-if="hideElement">
        <h3>专家开方</h3>
        <van-field
          v-model="formData.expertInfo.expertBook"
          type="textarea"
          placeholder="请输入诊断方案"
          maxlength="500"
          show-word-limit
          :autosize="{ maxHeight: 250, minHeight: 120 }"
          border
        />
      </div>
      <!-- 医生信息 -->
      <div class="form-item">
        <h3>医生信息</h3>
        <van-field
          v-model="formData.doctorInfo.name"
          name="姓名"
          label="姓名"
          placeholder="请输入您的姓名"
          readonly
        />
        <van-field
          v-model="formData.doctorInfo.phone"
          name="手机号"
          label="手机号"
          placeholder="请输入您的手机号"
          readonly
        />
        <van-field
          v-model="formData.doctorInfo.hospital"
          name="诊所名称"
          label="诊所名称"
          placeholder="请输入您的诊所名称"
          readonly
        />
        <van-field
          v-model="formData.doctorInfo.address"
          name="诊所地址"
          label="诊所地址"
          placeholder="请输入您的诊所地址"
          readonly
        />
      </div>
      <!-- 医生确诊 -->
      <div class="form-item">
        <h3>诊疗过程</h3>
        <van-field
          v-model="formData.doctorInfo.doctorBook"
          type="textarea"
          placeholder="请输入诊断方案"
          maxlength="500"
          show-word-limit
          :autosize="{ maxHeight: 250, minHeight: 120 }"
          border
          readonly
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
/***
 * 患者字段:
 *  name
 *  id
 *  phone
 * 病症描述 textarea 500
 * 专家信息
 *  name
 *  price
 *  title
 *  擅长领域?
 * 医生信息
 *  phone
 *  name
 *  诊所
 * 预约信息
 *  天
 *  2个小时
 *
 */
import ajax from "@/api/ajaxRequest.js";

export default {
  name: "MedicalEditor",
  data() {
    return {
      hideElement: false,
      imageIndex: 0,
      imagePreview: [],
      imagesShow: false,
      orderNumber: "",
      orderId: "",
      formData: {
        // openid: "18732255820",
        openid: "",
        patient: {
          username: "",
          phone: "",
          idCard: ""
        },
        expertInfo: {
          username: "",
          title: "",
          referral: "",
          expertBook: ""
        },
        desription: "",
        diagnosis: "",
        doctorInfo: {
          name: "",
          phone: "",
          address: "",
          hospital: "",
          doctorBook: ""
        },
        appointmentTime: {
          day: this.formatTime(new Date()),
          date: "am1",
          room: ""
        }
      },
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2020, 12, 1),
      currentDate: new Date(),
      showDatetime: false,
      dateOptions: [
        {
          text: "08:00 - 10:00",
          value: "am1"
        },
        {
          text: "10:00 - 12:00",
          value: "am2"
        },
        {
          text: "12:00 - 14:00",
          value: "pm1"
        },
        {
          text: "14:00 - 16:00",
          value: "pm2"
        },
        {
          text: "16:00 - 18:00",
          value: "pm3"
        }
      ]
    };
  },
  mounted() {
    this.orderNumber = this.$route.params.orderinfo._id;
    this.formData = this.$route.params.orderinfo._source;
    this.imagePreview = this.$route.params.orderinfo._source.fileList;
    this.formData.openid = JSON.parse(localStorage.getItem("user")).openid;

    // console.log(this.$route.params.orderinfo);

    this.imagePreview = this.imagePreview.map(item => item.url);
  },
  methods: {
    clickImage() {
      this.imagesShow = true;
    },
    imagesShowChange(index) {
      console.log(index);
    },
    formatData(type, options) {
      //   console.log(type, options);
      return options;
    },
    formatter(type, val) {
      if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    },
    selectTime() {
      this.showDatetime = false;
      this.formData.appointmentTime.day = this.formatTime(this.currentDate);
      //   console.log(this.currentDate);
    },
    // 格式化时间
    formatTime(time) {
      let t = new Date(time);
      let year = t.getFullYear();
      let month =
        t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1;
      let day = t.getDate() < 10 ? "0" + t.getDate() : t.getDate();

      return `${year}-${month}-${day}`;
    },
    showDatePopup() {
      this.showDatetime = true;
    },
    // 提交
    submitAppointment() {
      ajax
        .request({
          url: "/record/_update/" + this.orderNumber,
          method: "POST",
          data: {
            doc: this.formData
          }
        })
        .then(res => {
          // console.log("更改后的数据:", res);
          this.orderId = res._id;
        })
        .then(() => {
          this.$dialog
            .alert({
              message: `订单更新成功,您的订单号是${this.orderId}`
            })
            .then(() => {
              this.$router.push("/");
            });
        })
        .catch(error => {
          console.log(error);
        });
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
.expert-editor {
  padding: 0 15px;
  box-sizing: border-box;

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

  .image-show {
    display: flex;
    // justify-content: space-between;
    .img {
      max-width: 25%;
      margin: 0.1rem;
      max-height: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      .img-list {
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
