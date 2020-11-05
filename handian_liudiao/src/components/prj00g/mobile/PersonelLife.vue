<template>
  <div>
    <el-form ref="infoForm" :model="infoForm" label-position="top">
      <!-- 表格开始 -->
      <el-form-item label="1.您经常吃下列哪类食物">
        <el-checkbox v-model="infoForm.f001[0]">牛羊肉</el-checkbox>
        <el-checkbox v-model="infoForm.f001[1]">猪肉</el-checkbox>
        <el-checkbox v-model="infoForm.f001[2]">家禽类（鸡、鸭、鹅等）</el-checkbox>
        <el-checkbox v-model="infoForm.f001[3]">水产类（鱼、虾蟹类）</el-checkbox>
        <el-checkbox v-model="infoForm.f001[4]">豆类及豆制品</el-checkbox>
        <el-checkbox v-model="infoForm.f001[5]">油炸、油腻食品</el-checkbox>
        <el-checkbox v-model="infoForm.f001[6]">甜食类</el-checkbox>
        <el-checkbox v-model="infoForm.f001[7]">辛辣食品</el-checkbox>
        <el-checkbox v-model="infoForm.f001[8]">咖啡</el-checkbox>
        <el-checkbox v-model="infoForm.f001[9]">奶茶</el-checkbox>
        <el-checkbox v-model="infoForm.f001[10]">冷饮</el-checkbox>
        <el-checkbox v-model="infoForm.f001[11]">水果</el-checkbox>
        <el-checkbox v-model="infoForm.f001[12]">以上食物均不常吃</el-checkbox>
      </el-form-item>
      <el-form-item label="2.您经常主动吸烟吗">
        <el-radio-group v-model="infoForm.f002" @change="getPersonelHideCodeOne">
          <el-radio v-model="infoForm.f002" label="1">是</el-radio>
          <el-radio v-model="infoForm.f002" label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <div v-show="testOne.f003 === '1' ? true : false">
        <el-form-item label="3.若经常主动吸烟，每日吸烟量有多少">
          <el-radio v-model="infoForm.f003" label="1">1-10支</el-radio>
          <el-radio v-model="infoForm.f003" label="2">10～20支</el-radio>
          <el-radio v-model="infoForm.f003" label="3">大于20支</el-radio>
        </el-form-item>
      </div>
      <el-form-item label="4.您经常被动吸烟吗">
        <el-radio v-model="infoForm.f004" label="1">是</el-radio>
        <el-radio v-model="infoForm.f004" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="5.您经常饮酒吗">
        <el-radio-group v-model="infoForm.f005" @change="getPersonelHideCodeTwo">
          <el-radio v-model="infoForm.f005" label="1">是</el-radio>
          <el-radio v-model="infoForm.f005" label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-show="testTwo.f006 === '1' ? true : false">
        <el-form-item label="6.若经常饮酒，每日饮酒量为多少">
          <el-radio v-model="infoForm.f006" label="1">少于1杯</el-radio>
          <el-radio v-model="infoForm.f006" label="2">1-2杯</el-radio>
          <el-radio v-model="infoForm.f006" label="3">3杯或以上</el-radio>[一个标准杯即约饮用250 ml啤酒，或25 ml白酒，或125 ml红酒]
        </el-form-item>
      </div>
      <el-form-item label="7.您经常值夜班吗">
        <el-radio v-model="infoForm.f007" label="1">是</el-radio>
        <el-radio v-model="infoForm.f007" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="8.您经常超过半夜11点睡觉吗">
        <el-radio v-model="infoForm.f008" label="1">是</el-radio>
        <el-radio v-model="infoForm.f008" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="9.您经常锻炼吗">
        <el-radio v-model="infoForm.f009" label="1">是</el-radio>
        <el-radio v-model="infoForm.f009" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="10.您是否使用保健品">
        <el-radio-group v-model="infoForm.f010" @change="getPersonelHideCodeThree">
          <el-radio v-model="infoForm.f010" label="1">是</el-radio>
          <el-radio v-model="infoForm.f010" label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <div v-show="testThree.f011 === '1' ? true : false">
        <el-form-item label="11.使用保健品的原因">
          <el-checkbox v-model="infoForm.f011[0]">美白护肤</el-checkbox>
          <el-checkbox v-model="infoForm.f011[1]">丰胸</el-checkbox>
          <el-checkbox v-model="infoForm.f011[2]">减肥</el-checkbox>
          <el-checkbox v-model="infoForm.f011[3]">提高性生活满意度</el-checkbox>
          <el-checkbox v-model="infoForm.f011[4]">改善更年期症状</el-checkbox>
          <el-checkbox v-model="infoForm.f011[5]">改善记忆力</el-checkbox>
          <el-checkbox v-model="infoForm.f011[6]">改善胃肠功能</el-checkbox>
          <el-checkbox v-model="infoForm.f011[7]">改善免疫力</el-checkbox>
          <el-checkbox v-model="infoForm.f011[8]">改善睡眠</el-checkbox>
          <el-checkbox v-model="infoForm.f011[9]">其他</el-checkbox>
          <el-input v-model="infoForm.f011a" placeholder="请填写"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="12.您在经期经常有以下哪些行为">
        <el-checkbox v-model="infoForm.f012[1]">性生活</el-checkbox>
        <el-checkbox v-model="infoForm.f012[2]">剧烈运动</el-checkbox>
        <el-checkbox v-model="infoForm.f012[3]">过度劳累</el-checkbox>
        <el-checkbox v-model="infoForm.f012[4]">遇寒受凉（冰雪运动、冒雨涉水、游泳、摄食生冷）</el-checkbox>
        <el-checkbox v-model="infoForm.f012[5]">饮食辛辣</el-checkbox>
        <el-checkbox v-model="infoForm.f012[6]">食凉</el-checkbox>
        <el-checkbox v-model="infoForm.f012[7]">无上述行为</el-checkbox>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button
        :disabled="check_status=='审核通过'"
        type="primary"
        @click="updateInfoForm"
        style="width:100%"
      >保存</el-button>
    </div>
  </div>
</template>
<script>
import {
  apiUpdatePatientDataForm,
  apiGetHideCode,
  apiGetPatientDataForm,
} from "@/api/api-prj006";

export default {
  name: "PersonelLife",
  data() {
    return {
      infoForm: {
        f001: [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        f002: "",
        f003: "",
        f004: "",
        f005: "",
        f006: "",
        f007: "",
        f008: "",
        f009: "",
        f010: "",
        f011: [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        f011a: "",
        f012: [false, false, false, false, false, false, false, false],
      },
      dialogVisible: false,
      exist: true,
      formName: "habit",
      isOwnedByUser: true,
      check_status: "",
      _id: "",
      testOne: {
        f003: "0",
      },
      testTwo: {
        f006: "0",
      },
      testThree: {
        f011: "0",
      },
    };
  },
  created() {
    this.haveSeeion();
    this.getSingleInfo();
  },
  methods: {
    haveSeeion() {
      sessionStorage.getItem("addinformation") !== null
        ? (this._id = JSON.parse(sessionStorage.getItem("addinformation")).id)
        : null;
    },
    getSingleInfo() {
      apiGetPatientDataForm({
        _id: this._id,
        formName: this.formName,
      })
        .then((res) => {
          if (Object.keys(res).length !== 0) {
            this.infoForm = this.parseInfoForm(res);

            this.getPersonelHideCodeOne();
            this.getPersonelHideCodeTwo();
            this.getPersonelHideCodeThree();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPersonelHideCodeThree() {
      let params = {
        question: "f010",
        answer: this.infoForm.f010,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testThree = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPersonelHideCodeTwo() {
      let params = {
        question: "f005",
        answer: this.infoForm.f005,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testTwo = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPersonelHideCodeOne() {
      let params = {
        question: "f002",
        answer: this.infoForm.f002,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testOne = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateInfoForm() {
      if (this._id) {
        apiUpdatePatientDataForm({
          infoForm: this.infoForm,
          _id: this._id,
          formName: this.formName,
        })
          .then((res) => {
            if (res.detail) {
              this.$message({
                message: res.detail,
                type: "error",
              });
            } else {
              this.$message({ message: "提交成功", type: "success" });
              this.getSingleInfo();
            }
          })
          .catch();
      } else {
        this.$message({ message: "请先创建表单", type: "warning" });
      }
    },
    parseInfoForm(stringifyParams) {
      for (let key in stringifyParams) {
        let reg = /^\[.+\]$/;
        stringifyParams[key] = reg.test(stringifyParams[key])
          ? JSON.parse(stringifyParams[key])
          : stringifyParams[key];
      }
      return stringifyParams;
    },
  },
};
</script>