<template>
  <div>
    <h1 class="main-title">
      <i class="fa fa-envira" style="color:green"></i>
      <span>子宫内膜异位症及子宫腺肌病诊疗现状流行病学调查</span>
      <i
        class="show-icon"
        :class="navShow === true ? 'el-icon-upload2' : 'el-icon-download'"
        @click="hideNav"
      ></i>
    </h1>
    <!-- 添加更改的导航 -->
    <div class="mobile-content">
      <ul class="nav-title" v-show="navShow">
        <li
          v-for="(item,index) in navList"
          :key="index"
          @click="changeComponent(item.ref, index)"
          :class="{active: index === isActive}"
        >
          <span>{{item.label}}</span>
        </li>
      </ul>
      <!-- 将组件缓存起来提高性能 -->
      <component :is="componentName"></component>
    </div>

    <el-dialog
      title="新增患者信息"
      :visible.sync="dialogVisible"
      width="80%"
      fullscreen
      :show-close="false"
    >
      <!-- :show-close="false" -->
      <el-form
        ref="patientInfo"
        :model="patientInfo"
        :rules="rules"
        label-width="auto"
        label-position="left"
      >
        <el-form-item label="患者姓名" prop="a001">
          <el-input v-model="patientInfo.a001"></el-input>
        </el-form-item>

        <el-form-item label="就诊日期" prop="a002">
          <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
          <el-date-picker
            v-model="patientInfo.a002"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="医院名称" prop="a003">
          <el-input v-model="patientInfo.a003"></el-input>
        </el-form-item>
        <el-form-item label="医院所属" prop="a004">
          <el-radio v-model="patientInfo.a004" label="1">省级医院</el-radio>
          <el-radio v-model="patientInfo.a004" label="2">市级医院</el-radio>
          <el-radio v-model="patientInfo.a004" label="3">区/县级医院</el-radio>
        </el-form-item>

        <el-form-item label="患者电话" prop="a005">
          <el-input v-model="patientInfo.a005"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addPatient" style="width: 100%">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  ClinicalForm,
  CureForm,
  InfoForm,
  PersonelLife,
  RelevantForm,
  ResultsForm,
  SummaryForm,
  MarryHistory,
  MenstrualHistory,
  FamilyHistory,
  CureStreatmentForm,
  SurveyForm,
} from "@/components/prj006/mobile";

import { apiAddPatient, apiMobileLogin } from "@/api/api-prj006";

export default {
  name: "MobilePrj006",
  data() {
    return {
      navList: [
        {
          label: "一般资料",
          ref: "info",
          componentName: "InfoForm",
        },
        {
          label: "认知及治疗意愿调查",
          ref: "survey",
          componentName: "SurveyForm",
        },
        {
          label: "月经史",
          ref: "menstrual",
          componentName: "MenstrualHistory",
        },
        {
          label: "婚育史",
          ref: "marry",
          componentName: "MarryHistory",
        },
        {
          label: "既往史",
          ref: "history",
          componentName: "SummaryForm",
        },
        {
          label: "家族史",
          ref: "family",
          componentName: "FamilyHistory",
        },
        {
          label: "个人生活习惯",
          ref: "habit",
          componentName: "PersonelLife",
        },
        {
          label: "临床症状",
          ref: "clinical",
          componentName: "RelevantForm",
        },
        {
          label: "诊断情况",
          ref: "diagnosis",
          componentName: "ClinicalForm",
        },
        {
          label: "既往治疗情况",
          ref: "cure_history",
          componentName: "CureForm",
        },
        {
          label: "辅助检查",
          ref: "examination",
          componentName: "ResultsForm",
        },
        {
          label: "本次治疗情况",
          ref: "cure",
          componentName: "CureStreatmentForm",
        },
      ],
      componentName: "",
      isActive: 0,
      navShow: true,
      iconSHow: "",
      patientInfo: {
        a001: "",
        a002: "",
        a003: "",
        a004: "",
        a005: "",
      },
      dialogVisible: true,
      rules: {
        a001: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        a002: [{ required: true, message: "请输入就诊日期", trigger: "blur" }],
        a003: [{ required: true, message: "请填写就诊医院名称" }],
        a004: [{ required: true, message: "请填写就诊医院所属级别" }],
        a005: [
          {
            required: true,
            pattern: /^1\d{10}$/,
            message: "请输入11位手机号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    ClinicalForm,
    CureForm,
    InfoForm,
    PersonelLife,
    RelevantForm,
    ResultsForm,
    SummaryForm,
    MarryHistory,
    MenstrualHistory,
    FamilyHistory,
    CureStreatmentForm,
    SurveyForm,
  },
  created() {
    if (sessionStorage.getItem("addinformation") !== null) {
      this.dialogVisible = false;
      this.componentName = "InfoForm";
      return false;
    } else {
      this.dialogVisible = true;
    }

    apiMobileLogin()
      .then((res) => {
        if (res.status === 200) {
          this.$message({
            message: "登录成功",
            type: "success",
            duration: 1500,
          });
        } else {
          this.$message.error("登录失败");
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        this.$message.error(`${err}`);
        return false;
      });
  },
  methods: {
    hideNav() {
      this.navShow = !this.navShow;
    },
    changeComponent(val, index) {
      this.navList.forEach((item) => {
        if (item.ref === val) {
          this.componentName = item.componentName;
        }
      });
      this.isActive = index;
    },
    addPatient() {
      this.$refs.patientInfo.validate((valid) => {
        if (valid) {
          apiAddPatient(this.patientInfo)
            .then((res) => {
              if (res.statusCode == 201) {
                this.$message({
                  message: "增加成功",
                  type: "success",
                  duration: 1500,
                });
                sessionStorage.setItem("addinformation", res.msg);
                this.dialogVisible = false;
                this.componentName = "InfoForm";
              } else {
                this.$message({
                  message: "您没有添加数据的权限",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$message({ message: "请填写完整信息", type: "warning" });
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.main-title {
  position: relative;
  text-align: center;
  padding: 0 16px;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1rem;
  font-weight: lighter;
  color: black;
  background-color: aliceblue;

  .show-icon {
    position: absolute;
    right: 10px;
    top: 0;
    color: #777;
    font-size: 1.2rem;
  }
}
.mobile-content {
  padding: 0 15px 5%;
  box-sizing: border-box;
  max-width: 100%;
  overflow: hidden;

  .nav-title {
    list-style: none;
    padding: 0;
    padding-bottom: 0.5rem;
    margin: 1rem 0 0.5rem;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 5px dashed #ccc;

    li {
      width: 25%;
      padding: 8px;
      box-sizing: border-box;
      text-align: center;

      span {
        font-size: 0.8rem;
        font-weight: bold;
        color: #777;
      }
    }
    li.active {
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
      border: 1px solid #008126;
      border-radius: 0 75%;
    }
  }
}
</style>