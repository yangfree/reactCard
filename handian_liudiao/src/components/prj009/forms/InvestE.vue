<template>
  <el-dialog
    title="改良Kupperman评分表"
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
        <el-col :span="8">1.潮热汗出</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.n01" label="1">无</el-radio>
          <el-radio v-model="infoForm.n01" label="2">&lt;3次/天</el-radio>
          <el-radio v-model="infoForm.n01" label="3">3-9次/天</el-radio>
          <el-radio v-model="infoForm.n01" label="4">≥10次/天</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">2.感觉异常</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.n02" label="1">无</el-radio>
          <el-radio v-model="infoForm.n02" label="2">有时</el-radio>
          <el-radio v-model="infoForm.n02" label="3">刺痛、麻木、耳鸣</el-radio>
          <el-radio v-model="infoForm.n02" label="4">经常且加重</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">3.失眠</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.n03" label="1">无</el-radio>
          <el-radio v-model="infoForm.n03" label="2">有时</el-radio>
          <el-radio v-model="infoForm.n03" label="3">经常</el-radio>
          <el-radio v-model="infoForm.n03" label="4">经常且需服安眠药</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">4.情绪激动</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.n04" label="1">无</el-radio>
          <el-radio v-model="infoForm.n04" label="2">有时</el-radio>
          <el-radio v-model="infoForm.n04" label="3">经常</el-radio>
          <el-radio v-model="infoForm.n04" label="4">不能自控</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">5.抑郁、疑心</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.n05" label="1">无</el-radio>
          <el-radio v-model="infoForm.n05" label="2">有时</el-radio>
          <el-radio v-model="infoForm.n05" label="3">经常、能自控</el-radio>
          <el-radio v-model="infoForm.n05" label="4">失去生活信心</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">6.眩晕</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.n06" label="1">无</el-radio>
          <el-radio v-model="infoForm.n06" label="2">有时</el-radio>
          <el-radio v-model="infoForm.n06" label="3">经常，不影响生活</el-radio>
          <el-radio v-model="infoForm.n06" label="4">影响生活与工作</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">7.疲乏</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.n07" label="1">无</el-radio>
          <el-radio v-model="infoForm.n07" label="2">有时</el-radio>
          <el-radio v-model="infoForm.n07" label="3">经常，不影响生活</el-radio>
          <el-radio v-model="infoForm.n07" label="4">日常生活受限</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">8.肌肉、关节痛</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.n08" label="1">无</el-radio>
          <el-radio v-model="infoForm.n08" label="2">有时</el-radio>
          <el-radio v-model="infoForm.n08" label="3">经常，不影响生活</el-radio>
          <el-radio v-model="infoForm.n08" label="4">功能障碍需服药</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">9.头痛</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.n09" label="1">无</el-radio>
          <el-radio v-model="infoForm.n09" label="2">有时</el-radio>
          <el-radio v-model="infoForm.n09" label="3">经常，能忍受</el-radio>
          <el-radio v-model="infoForm.n09" label="4">需治疗</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">10.心悸</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.n10" label="1">无</el-radio>
          <el-radio v-model="infoForm.n10" label="2">有时</el-radio>
          <el-radio v-model="infoForm.n10" label="3">经常，不影响生活</el-radio>
          <el-radio v-model="infoForm.n10" label="4">需治疗</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">11.皮肤蚁行感</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.n11" label="1">无</el-radio>
          <el-radio v-model="infoForm.n11" label="2">有时</el-radio>
          <el-radio v-model="infoForm.n11" label="3">经常，能忍受</el-radio>
          <el-radio v-model="infoForm.n11" label="4">需治疗</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">12.性交痛</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.n12" label="1">无</el-radio>
          <el-radio v-model="infoForm.n12" label="2">有时</el-radio>
          <el-radio v-model="infoForm.n12" label="3">经常，能忍受</el-radio>
          <el-radio v-model="infoForm.n12" label="4">影响生活</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">13.泌尿系症状</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.n13" label="1">无</el-radio>
          <el-radio v-model="infoForm.n13" label="2">有时</el-radio>
          <el-radio v-model="infoForm.n13" label="3">经常</el-radio>
          <el-radio v-model="infoForm.n13" label="4">影响生活与工作</el-radio>
        </el-col>
      </el-row>
      <el-divider content-position="left">总分： {{ myn14 }}</el-divider>
      <!-- 表格结束 -->
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
  name: "InvestE",
  data() {
    return {
      dialogVisible: false,

      infoForm: {
        n01: 0,
        n02: 0,
        n03: 0,
        n04: 0,
        n05: 0,
        n06: 0,
        n07: 0,
        n08: 0,
        n09: 0,
        n10: 0,
        n11: 0,
        n12: 0,
        n13: 0,
        n14: 0,
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
      this.infoForm.n14 = this.myn14;
      // console.log(this._id, this.infoForm);
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
          transformNum = 0;
          break;
        case 2:
          transformNum = 1;
          break;
        case 3:
          transformNum = 2;
          break;
        case 4:
          transformNum = 3;
          break;
        default:
          transformNum = 0;
      }

      return transformNum;
    },
  },
  computed: {
    myn14: function () {
      let {
        n01,
        n02,
        n03,
        n04,
        n05,
        n06,
        n07,
        n08,
        n09,
        n10,
        n11,
        n12,
        n13,
      } = this.infoForm;
      let resultNum = 0;

      resultNum =
        4 * this.conversionScore(n01) +
        2 * this.conversionScore(n02) +
        2 * this.conversionScore(n03) +
        2 * this.conversionScore(n04) +
        2 * this.conversionScore(n12) +
        2 * this.conversionScore(n13) +
        1 * this.conversionScore(n05) +
        1 * this.conversionScore(n06) +
        1 * this.conversionScore(n07) +
        1 * this.conversionScore(n08) +
        1 * this.conversionScore(n09) +
        1 * this.conversionScore(n10) +
        1 * this.conversionScore(n11);

      // console.log(resultNum);
      return resultNum.toFixed(1);
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
