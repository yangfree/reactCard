<template>
  <el-dialog
    title="匹兹堡睡眠质量量表"
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
      <div>
        指导语：下面的一些问题是关于您最近1个月的睡眠状况，请选择或填写最符合您近1个月实际情况的答案，请回答下列问题：
      </div>
      <el-divider></el-divider>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">1.近1个月，晚上睡觉通常是__ 点</el-col>
        <el-col :span="8">
          <el-input-number v-model="infoForm.i01" :min="0" :max="23"
        /></el-col>
      </el-row>
      <el-row :gutter="20" class="el-row">
        <el-col :span="8">2.近1个月，每晚入睡通常需多少分钟</el-col>
        <el-col :span="8">
          <el-input-number v-model="infoForm.i02" :min="0" :max="300"
        /></el-col>
      </el-row>
      <el-row :gutter="20" class="el-row">
        <el-col :span="8">3.近1个月，通常早上几点起床</el-col>
        <el-col :span="8">
          <el-input-number v-model="infoForm.i03" :min="0" :max="12"
        /></el-col>
      </el-row>
      <el-row :gutter="20" class="el-row">
        <el-col :span="8">4.近1个月，每晚通常睡眠多少小时</el-col>
        <el-col :span="8">
          <el-input-number
            v-model="infoForm.i04"
            :min="0"
            :max="12"
          />（不等于卧床时间）</el-col
        >
      </el-row>

      <el-divider content-position="left"
        >5.近1个月，因下列情况影响睡眠而烦恼：</el-divider
      >

      <el-form-item label="a.入睡困难" prop="i0501">
        <el-radio v-model="infoForm.i0501" label="1">没有</el-radio>
        <el-radio v-model="infoForm.i0501" label="2">少于1次/周</el-radio>
        <el-radio v-model="infoForm.i0501" label="3">1-2次/周</el-radio>
        <el-radio v-model="infoForm.i0501" label="4">3次/周以上</el-radio>
        &nbsp; （30分钟内不能入睡）
      </el-form-item>
      <el-form-item label="b.夜间易醒或早醒：">
        <el-radio v-model="infoForm.i0502" label="1">没有</el-radio>
        <el-radio v-model="infoForm.i0502" label="2">少于1次/周</el-radio>
        <el-radio v-model="infoForm.i0502" label="3">1-2次/周</el-radio>
        <el-radio v-model="infoForm.i0502" label="4">3次/周以上</el-radio>
      </el-form-item>
      <el-form-item label="c.夜间去厕所：">
        <el-radio v-model="infoForm.i0503" label="1">没有</el-radio>
        <el-radio v-model="infoForm.i0503" label="2">少于1次/周</el-radio>
        <el-radio v-model="infoForm.i0503" label="3">1-2次/周</el-radio>
        <el-radio v-model="infoForm.i0503" label="4">3次/周以上</el-radio>
      </el-form-item>
      <el-form-item label="d.呼吸不畅：">
        <el-radio v-model="infoForm.i0504" label="1">没有</el-radio>
        <el-radio v-model="infoForm.i0504" label="2">少于1次/周</el-radio>
        <el-radio v-model="infoForm.i0504" label="3">1-2次/周</el-radio>
        <el-radio v-model="infoForm.i0504" label="4">3次/周以上</el-radio>
      </el-form-item>
      <el-form-item label="e.咳嗽或鼾声高：">
        <el-radio v-model="infoForm.i0505" label="1">没有</el-radio>
        <el-radio v-model="infoForm.i0505" label="2">少于1次/周</el-radio>
        <el-radio v-model="infoForm.i0505" label="3">1-2次/周</el-radio>
        <el-radio v-model="infoForm.i0505" label="4">3次/周以上</el-radio>
      </el-form-item>
      <el-form-item label="f.感觉冷：">
        <el-radio v-model="infoForm.i0506" label="1">没有</el-radio>
        <el-radio v-model="infoForm.i0506" label="2">少于1次/周</el-radio>
        <el-radio v-model="infoForm.i0506" label="3">1-2次/周</el-radio>
        <el-radio v-model="infoForm.i0506" label="4">3次/周以上</el-radio>
      </el-form-item>
      <el-form-item label="g.感觉热：">
        <el-radio v-model="infoForm.i0507" label="1">没有</el-radio>
        <el-radio v-model="infoForm.i0507" label="2">少于1次/周</el-radio>
        <el-radio v-model="infoForm.i0507" label="3">1-2次/周</el-radio>
        <el-radio v-model="infoForm.i0507" label="4">3次/周以上</el-radio>
      </el-form-item>
      <el-form-item label="h做噩梦：">
        <el-radio v-model="infoForm.i0508" label="1">没有</el-radio>
        <el-radio v-model="infoForm.i0508" label="2">少于1次/周</el-radio>
        <el-radio v-model="infoForm.i0508" label="3">1-2次/周</el-radio>
        <el-radio v-model="infoForm.i0508" label="4">3次/周以上</el-radio>
      </el-form-item>
      <el-form-item label="i.疼痛不适：">
        <el-radio v-model="infoForm.i0509" label="1">没有</el-radio>
        <el-radio v-model="infoForm.i0509" label="2">少于1次/周</el-radio>
        <el-radio v-model="infoForm.i0509" label="3">1-2次/周</el-radio>
        <el-radio v-model="infoForm.i0509" label="4">3次/周以上</el-radio>
      </el-form-item>
      <el-form-item label="j.其他影响睡眠的事情：">
        <el-radio v-model="infoForm.i0510" label="1">没有</el-radio>
        <el-radio v-model="infoForm.i0510" label="2">少于1次/周</el-radio>
        <el-radio v-model="infoForm.i0510" label="3">1-2次/周</el-radio>
        <el-radio v-model="infoForm.i0510" label="4">3次/周以上</el-radio>
      </el-form-item>
      <el-form-item label="如有：">
        <el-input
          v-model="infoForm.d0511"
          maxlength="50"
          show-word-limit
          placeholder="请说明"
        />
      </el-form-item>

      <el-form-item label="6. 近1个月，总的来说，您认为自己的睡眠">
        <el-radio v-model="infoForm.i06" label="1">很好</el-radio>
        <el-radio v-model="infoForm.i06" label="2">较好</el-radio>
        <el-radio v-model="infoForm.i06" label="3">较差</el-radio>
        <el-radio v-model="infoForm.i06" label="4">很差</el-radio>
      </el-form-item>
      <el-form-item label="7. 近1个月，您用药物催眠的情况">
        <el-radio v-model="infoForm.i07" label="1">没有</el-radio>
        <el-radio v-model="infoForm.i07" label="2">少于1次/周</el-radio>
        <el-radio v-model="infoForm.i07" label="3">1-2次/周</el-radio>
        <el-radio v-model="infoForm.i07" label="4">3次/周以上</el-radio>
      </el-form-item>
      <el-form-item label="8. 近1个月，您常感到困倦吗？">
        <el-radio v-model="infoForm.i08" label="1">没有</el-radio>
        <el-radio v-model="infoForm.i08" label="2">少于1次/周</el-radio>
        <el-radio v-model="infoForm.i08" label="3">1-2次/周</el-radio>
        <el-radio v-model="infoForm.i08" label="4">3次/周以上</el-radio>
      </el-form-item>
      <el-form-item label="9.近1个月，您做事精力不足吗？">
        <el-radio v-model="infoForm.i09" label="1">没有</el-radio>
        <el-radio v-model="infoForm.i09" label="2">少于1次/周</el-radio>
        <el-radio v-model="infoForm.i09" label="3">1-2次/周</el-radio>
        <el-radio v-model="infoForm.i09" label="4">3次/周以上</el-radio>
      </el-form-item>

      <el-divider content-position="left">以下为得分：</el-divider>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">A.睡眠质量得分：</el-col>
        <el-col :span="8">
          <el-input :value="myi10" readonly />
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">B.入睡时间得分：</el-col>
        <el-col :span="8">
          <el-input :value="myi11" readonly />
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">C.睡眠时间：</el-col>
        <el-col :span="8">
          <el-input :value="myi12" readonly />
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">D.睡眠效率：</el-col>
        <el-col :span="8">
          <el-input :value="myi13" readonly />
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">E.睡眠障碍：</el-col>
        <el-col :span="8">
          <el-input :value="myi14" readonly />
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">F.催眠药物：</el-col>
        <el-col :span="8">
          <el-input :value="myi15" readonly />
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">G.日间功能障碍</el-col>
        <el-col :span="8">
          <el-input :value="myi16" readonly />
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">PSQI总分</el-col>
        <el-col :span="8">
          <el-input :value="myi17" readonly />
        </el-col>
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
  name: "InvestA",
  data() {
    return {
      dialogVisible: false,

      infoForm: {
        i01: 0,
        i02: 0,
        i03: 0,
        i04: 0,
        i0501: 0,
        i0502: 0,
        i0503: 0,
        i0504: 0,
        i0505: 0,
        i0506: 0,
        i0507: 0,
        i0508: 0,
        i0509: 0,
        i0510: 0,
        i0511: "",

        i06: 0,
        i07: 0,
        i08: 0,
        i09: 0,
        i10: 0,
        i11: 0,
        i12: 0,
        i13: 0,
        i14: 0,
        i15: 0,
        i16: 0,
        i17: 0,
      },
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: "",
    };
  },
  created() {
    this.$on("openEvent", (data) => {
      console.log("睡眠数据", data);

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
      this.infoForm.i10 = this.myi10;
      this.infoForm.i11 = this.myi11;
      this.infoForm.i12 = this.myi12;
      this.infoForm.i13 = this.myi13;
      this.infoForm.i14 = this.myi14;
      this.infoForm.i15 = this.myi15;
      this.infoForm.i16 = this.myi16;
      this.infoForm.i17 = this.myi17;
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
    myi10: function () {
      let resultNum = null;

      switch (Number(this.infoForm.i06)) {
        case 1:
          resultNum = 0;
          break;
        case 2:
          resultNum = 1;
          break;
        case 3:
          resultNum = 2;
          break;
        case 4:
          resultNum = 3;
          break;
        default:
          resultNum = 0;
      }
      // console.log(resultNum);
      return resultNum;
    },
    myi11: function () {
      let { i02, i0501 } = this.infoForm;
      let result1 = null;
      let result2 = null;
      let numi02 = Number(i02);

      if (numi02 <= 15) {
        result1 = 0;
      } else if (numi02 > 15 && numi02 <= 30) {
        result1 = 1;
      } else if (numi02 >= 60) {
        result1 = 3;
      } else {
        result1 = 2;
      }

      switch (Number(i0501)) {
        case 1:
          result2 = 0;
          break;
        case 2:
          result2 = 1;
          break;
        case 3:
          result2 = 2;
          break;
        case 4:
          result2 = 3;
          break;
        default:
          result2 = 0;
      }

      let resultNum = result1 + result2;
      let totalNum = null;
      if (resultNum === 0) {
        totalNum = 0;
      } else if (resultNum >= 1 && resultNum <= 2) {
        totalNum = 1;
      } else if (resultNum >= 3 && resultNum <= 4) {
        totalNum = 2;
      } else {
        totalNum = 3;
      }

      return totalNum;
    },
    myi12: function () {
      let resultNum = null;
      let numi04 = Number(this.infoForm.i04);

      if (numi04 > 7) {
        resultNum = 0;
      } else if (numi04 >= 6 && numi04 <= 7) {
        resultNum = 1;
      } else if (numi04 >= 5 && numi04 <= 6) {
        resultNum = 2;
      } else {
        resultNum = 3;
      }

      return resultNum;
    },
    myi13: function () {
      let { i01, i03, i04 } = this.infoForm;
      let resultNum = (i04 / (i03 - i01)).toFixed(1);
      let totalNum = null;

      if (resultNum > 0.85) {
        totalNum = 0;
      } else if (resultNum >= 0.75 && resultNum <= 0.84) {
        totalNum = 1;
      } else if (resultNum >= 0.65 && resultNum <= 0.74) {
        totalNum = 2;
      } else {
        totalNum = 3;
      }

      return totalNum;
    },
    myi14: function () {
      let {
        i0502,
        i0503,
        i0504,
        i0505,
        i0506,
        i0507,
        i0508,
        i0509,
        i0510,
      } = this.infoForm;
      let resultNum = null;
      let totalNum = null;

      resultNum =
        this.conversionScore(i0502) +
        this.conversionScore(i0503) +
        this.conversionScore(i0504) +
        this.conversionScore(i0505) +
        this.conversionScore(i0506) +
        this.conversionScore(i0507) +
        this.conversionScore(i0508) +
        this.conversionScore(i0509) +
        this.conversionScore(i0510);

      if (resultNum === 0) {
        totalNum = 0;
      } else if (resultNum >= 1 && resultNum <= 9) {
        totalNum = 1;
      } else if (resultNum >= 10 && resultNum <= 18) {
        totalNum = 2;
      } else {
        totalNum = 3;
      }

      return totalNum;
    },
    myi15: function () {
      let totalNum = null;
      totalNum = this.conversionScore(this.infoForm.i07);
      return totalNum;
    },
    myi16: function () {
      let result1 = null;
      let result2 = null;
      let totalNum = null;
      let resultNum = null;

      result1 = this.conversionScore(this.infoForm.i08);
      result2 = this.conversionScore(this.infoForm.i09);
      resultNum = result1 + result2;

      if (resultNum === 0) {
        totalNum = 0;
      } else if (resultNum >= 1 && resultNum <= 2) {
        totalNum = 1;
      } else if (resultNum >= 3 && resultNum <= 4) {
        totalNum = 2;
      } else {
        totalNum = 3;
      }

      return totalNum;
    },
    myi17: function () {
      let totalNum = null;
      totalNum =
        this.myi10 +
        this.myi11 +
        this.myi12 +
        this.myi13 +
        this.myi14 +
        this.myi15 +
        this.myi16;

      return totalNum;
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
