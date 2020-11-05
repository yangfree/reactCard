<template>
  <el-dialog
    title="焦虑自评量表（SAS）"
    class="my-dialog prj009-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form
      ref="infoForm"
      :model="infoForm"
      label-width="180px"
      label-position="left"
    >
      <!-- 提示信息 -->
      <el-alert
        v-if="check_status == '审核通过'"
        effect="dark"
        title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <el-alert
        v-if="check_status == '已提交'"
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
      <el-row :gutter="20" class="el-row">
        <el-col :span="8">1.我觉得比平常容易紧张和着急</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m01" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m01" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m01" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m01" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">2.我无缘无故地感到害怕</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m02" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m02" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m02" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m02" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">3.我容易心里烦乱或觉得惊恐</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m03" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m03" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m03" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m03" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">4.我觉得我可能将要发疯</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m04" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m04" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m04" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m04" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">5.我觉得一切都很好，也不会发生什么不幸</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m05" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m05" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m05" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m05" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">6.我手脚发抖打颤</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m06" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m06" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m06" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m06" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">7.我因为头痛、颈痛和背痛而苦恼</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m07" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m07" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m07" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m07" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">8.我感觉容易衰弱和疲乏</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m08" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m08" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m08" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m08" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">9.我觉得心平气和，而且容易安静坐着</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m09" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m09" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m09" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m09" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">10.我觉得心跳很快</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m10" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m10" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m10" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m10" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">11.我因为一阵阵头晕而苦恼</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m11" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m11" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m11" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m11" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">12.我有晕倒发作或觉得要晕倒似的</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m12" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m12" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m12" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m12" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">13.我呼气吸气都感到很容易</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m13" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m13" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m13" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m13" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">14.我手脚麻木和刺痛</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m14" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m14" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m14" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m14" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">15.我因为胃痛和消化不良而苦恼</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m15" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m15" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m15" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m15" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">16.我常常要小便</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m16" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m16" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m16" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m16" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">17.我的手常常是干燥温暖的</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m17" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m17" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m17" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m17" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">18.我脸红发热</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m18" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m18" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m18" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m18" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">19.我容易入睡并且一夜睡得很好</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m19" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m19" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m19" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m19" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">20.我做噩梦</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.m20" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.m20" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.m20" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.m20" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">结果</el-col>
        {{ resultText }}
      </el-row>
    </el-form>
    <span slot="footer">
      <el-button
        :disabled="check_status == '审核通过'"
        type="primary"
        @click="updateInfoForm"
        >确定</el-button
      >
      <el-button @click="dialogVisible = false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj009";
export default {
  name: "InvestD",
  data() {
    return {
      dialogVisible: false,

      infoForm: {
        m01: 0,
        m02: 0,
        m03: 0,
        m04: 0,
        m05: 0,
        m06: 0,
        m07: 0,
        m08: 0,
        m09: 0,
        m10: 0,
        m11: 0,
        m12: 0,
        m13: 0,
        m14: 0,
        m15: 0,
        m16: 0,
        m17: 0,
        m18: 0,
        m19: 0,
        m20: 0,
      },
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: "",
    };
  },
  created() {
    this.$on("openEvent", (data) => {
      console.log("抑郁自评量表", data);

      this.dialogVisible = true;
      this.check_status = data.check_status;
      this.isOwnedByUser = data.isOwnedByUser;
      this.formName = data.formName;
      this._id = data._id;
      console.log(this._id);
      if ("id" in data.result) {
        this.infoForm = this.parseInfoForm(data.result);
      }
    });
  },
  methods: {
    updateInfoForm() {
      console.log(this._id);
      this.$refs.infoForm.validate((valid) => {
        if (valid) {
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
        } else {
          this.$message({ message: "请填写必填项目", type: "warning" });
          return false;
        }
      });
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
    conversionScore(item) {
      let transformNum;

      switch (Number(item)) {
        case 1:
          transformNum = 4;
          break;
        case 2:
          transformNum = 3;
          break;
        case 3:
          transformNum = 2;
          break;
        case 4:
          transformNum = 1;
          break;
        default:
          transformNum = 0;
      }

      return transformNum;
    },
  },
  computed: {
    resultText: function () {
      let {
        m01,
        m02,
        m03,
        m04,
        m05,
        m06,
        m07,
        m08,
        m09,
        m10,
        m11,
        m12,
        m13,
        m14,
        m15,
        m16,
        m17,
        m18,
        m19,
        m20,
      } = this.infoForm;
      let arr = [m05, m09, m13, m17, m19];
      let resultNum = 0;

      arr.forEach((item) => {
        resultNum += this.conversionScore(item);
      });

      let results =
        Number(m01) +
        Number(m02) +
        Number(m03) +
        Number(m04) +
        Number(m05) +
        Number(m06) +
        Number(m07) +
        Number(m08) +
        Number(m10) +
        Number(m11) +
        Number(m12) +
        Number(m14) +
        Number(m15) +
        Number(m16) +
        Number(m17) +
        Number(m18) +
        Number(m20);

      let lastResult = Math.floor((resultNum + results) * 1.25);
      let resultText = "";

      if (lastResult < 50) {
        resultText = "正常";
      } else if (lastResult > 69) {
        resultText = "重度焦虑";
      } else if (lastResult >= 50 && lastResult <= 59) {
        resultText = "轻度焦虑";
      } else {
        resultText = "中度焦虑";
      }

      return resultText;
    },
  },
};
</script>
<style lang="scss" scoped>
.prj009-info {
  .el-input-group__append,
  .el-input-group__prepend {
    width: 50px;
  }
}
.prj009-dialog {
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

  .el-row {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
