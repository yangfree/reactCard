<template>
  <el-dialog
    title="月经史"
    class="my-dialog prj006-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="120px" label-position="left">
      <!-- 提示信息 -->
      <el-alert
        v-if="check_status=='审核通过'"
        effect="dark"
        title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <el-alert
        v-if="check_status=='已提交'"
        effect="dark"
        title="此条信息已经提交审核,无法更改。如需修改, 请更改审核状态"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <el-alert
        v-if="!isOwnedByUser"
        effect="dark"
        title="此条信息为其他用户创建，您无法修改"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <!-- 表格开始 -->
      <el-form-item label="1.初潮年龄">
        <el-radio v-model="infoForm.b001" label="1">≤11岁</el-radio>
        <el-radio v-model="infoForm.b001" label="2">12-15岁</el-radio>
        <el-radio v-model="infoForm.b001" label="3">≥16岁</el-radio>
      </el-form-item>
      <el-form-item label="2.现是否绝经">
        <el-radio-group v-model="infoForm.b002" @change="getMenstrualHideCodeOne">
          <el-radio v-model="infoForm.b002" label="1">是</el-radio>
          <el-radio v-model="infoForm.b002" label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-show="testOne.b012 === '1' ? true : false">
        <el-form-item label="3.绝经年龄几岁(请按之前月经情况,填写下题)">
          <el-input v-model="infoForm.b012" placeholder="请填写绝经年龄"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="4.您的月经周期为">
        <el-radio v-model="infoForm.b003" label="1">≤20天</el-radio>
        <el-radio v-model="infoForm.b003" label="2">21-28天</el-radio>
        <el-radio v-model="infoForm.b003" label="3">29-35天</el-radio>
        <el-radio v-model="infoForm.b003" label="4">≥36天</el-radio>
      </el-form-item>
      <el-form-item label="5.您的经期一般有几天">
        <el-radio v-model="infoForm.b004" label="1">1-2天</el-radio>
        <el-radio v-model="infoForm.b004" label="2">3-7天</el-radio>
        <el-radio v-model="infoForm.b004" label="3">8-14天</el-radio>
        <el-radio v-model="infoForm.b004" label="4">≥15天</el-radio>
      </el-form-item>
      <el-form-item label="6.您的经量有多少">
        <el-radio v-model="infoForm.b005" label="1">量少（＜20ml或一个月经周期所用卫生巾折满算少于等于2片）</el-radio>
        <el-radio v-model="infoForm.b005" label="2">量中（20-80ml或最多一天卫生巾折满算3-5片）</el-radio>
        <el-radio v-model="infoForm.b005" label="3">量多（＞80ml或最多一天卫生巾折满算5片以上）</el-radio>
      </el-form-item>
      <el-form-item label="7.是否经常痛经">
        <el-radio-group v-model="infoForm.b006" @change="getMenstrualHideCodeTwo">
          <el-radio v-model="infoForm.b006" label="1">是</el-radio>
          <el-radio v-model="infoForm.b006" label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <div v-show="testtwo.b007_end === '1' ? true : false">
        <el-form-item label="8.是否需要使用止痛药">
          <el-radio-group v-model="infoForm.b007" @change="getMenstrualHideCodeThree">
            <el-radio v-model="infoForm.b007" label="1">是</el-radio>
            <el-radio v-model="infoForm.b007" label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testthree.b008_end === '1' ? true : false">
          <el-form-item label="9.若是，常使用下列哪种止痛药">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.b008[0]" @change="getMenstrualHideCodeFour">口服药</el-checkbox>
            <el-checkbox v-model="infoForm.b008[1]" @change="getMenstrualHideCodeFour">注射剂或针剂</el-checkbox>
            <el-checkbox v-model="infoForm.b008[2]" @change="getMenstrualHideCodeFour">外用药</el-checkbox>
          </el-form-item>
          <div v-show="testfour.b009 === '1' ? true : false">
            <el-form-item label="10.服用哪种口服药">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.b009[0]">布洛芬</el-checkbox>
              <el-checkbox v-model="infoForm.b009[1]">复方阿司匹林片</el-checkbox>
              <el-checkbox v-model="infoForm.b009[2]">去痛片</el-checkbox>
              <el-checkbox v-model="infoForm.b009[3]">消炎痛片</el-checkbox>
              <el-checkbox v-model="infoForm.b009[4]">尼美舒利颗粒</el-checkbox>
              <el-checkbox v-model="infoForm.b009[5]">萘普生片</el-checkbox>
              <el-checkbox v-model="infoForm.b009[6]">甲芬那酸片/胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.b009[7]">吡罗昔康（炎痛喜康片）</el-checkbox>
              <el-checkbox v-model="infoForm.b009[8]">酮洛芬片/胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.b009[9]">曲马多缓释片</el-checkbox>
              <el-checkbox v-model="infoForm.b009[10]">盐酸吗啡片/缓释片</el-checkbox>
              <el-checkbox v-model="infoForm.b009[11]">双氯芬酸缓释片/钾片</el-checkbox>
              <el-checkbox v-model="infoForm.b009[12]">其他</el-checkbox>
              <el-input v-model="infoForm.b009a"></el-input>
            </el-form-item>
          </div>
          <div v-show="testfour.b010 === '1' ? true : false">
            <el-form-item label="11.使用哪种注射剂">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.b010[0]">盐酸布桂嗪（强痛定）注射液</el-checkbox>
              <el-checkbox v-model="infoForm.b010[1]">盐酸哌替啶（杜冷丁）注射液</el-checkbox>
              <el-checkbox v-model="infoForm.b010[2]">盐酸吗啡注射液</el-checkbox>
              <el-checkbox v-model="infoForm.b010[3]">复方氨林巴比妥（安痛定）注射液</el-checkbox>
              <el-checkbox v-model="infoForm.b010[4]">其他</el-checkbox>
              <el-input v-model="infoForm.b010a"></el-input>
            </el-form-item>
          </div>
          <div v-show="testfour.b011 === '1' ? true : false">
            <el-form-item label="12.使用哪种外用药">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.b011[0]">吲哚美辛栓</el-checkbox>
              <el-checkbox v-model="infoForm.b011[1]">其他</el-checkbox>
              <el-input v-model="infoForm.b011a"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiGetHideCode } from "@/api/api-prj006";
export default {
  name: "MenstrualHistory",
  data() {
    return {
      infoForm: {
        b001: "",
        b002: "",
        b003: "",
        b004: "",
        b005: "",
        b006: "",
        b007: "",
        b008: [false, false, false],
        b009: [
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
        b009a: "",
        b010: [false, false, false, false, false],
        b010a: "",
        b011: [false, false],
        b011a: "",
        b012: "",
      },
      dialogVisible: false,
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: "",
      testOne: {
        b012: "0",
      },
      testtwo: {
        b007_end: "0",
      },
      testthree: {
        b008_end: "0",
      },
      testfour: {
        b009: "0",
        b010: "0",
        b011: "0",
      },
    };
  },
  created() {
    this.$on("openEvent", (data) => {
      console.log("月经史", data);
      this.dialogVisible = true;
      this.check_status = data.check_status;
      this.isOwnedByUser = data.isOwnedByUser;
      this.formName = data.formName;
      this._id = data._id;

      if ("id" in data.result) {
        this.infoForm = this.parseInfoForm(data.result);

        this.getMenstrualHideCodeThree();
        this.getMenstrualHideCodeTwo();
        this.getMenstrualHideCodeOne();
        this.getMenstrualHideCodeFour();
      }
    });
  },
  methods: {
    getMenstrualHideCodeFour() {
      let params = {
        question: "b008",
        answer: JSON.stringify(this.infoForm.b008),
      };
      apiGetHideCode(params)
        .then((res) => {
          if (res.status === 200) {
            this.testfour = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMenstrualHideCodeThree() {
      let params = {
        question: "b007",
        answer: this.infoForm.b007,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testthree = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMenstrualHideCodeTwo() {
      let params = {
        question: "b006",
        answer: this.infoForm.b006,
      };
      apiGetHideCode(params)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            this.testtwo = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMenstrualHideCodeOne() {
      let params = {
        question: "b002",
        answer: this.infoForm.b002,
      };
      apiGetHideCode(params)
        .then((res) => {
          if (res.status === 200) {
            this.testOne = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateInfoForm() {
      apiUpdatePatientDataForm({
        _id: this._id,
        infoForm: this.infoForm,
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
          }
          this.dialogVisible = false;
          this.$parent.searchPatient();
          this.$parent.getPatients();
        })
        .catch();
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
<style lang="scss" scoped>
.prj006-info {
  .el-input-group__append,
  .el-input-group__prepend {
    width: 50px;
  }
}
.prj006-dialog {
  h3 {
    background-color: cornflowerblue;
    font-size: 18px;
    line-height: 45px;
    text-align: center;
    color: #f2f2f2;
  }

  h4 {
    color: cornflowerblue;
  }
}
</style>
