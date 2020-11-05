<template>
  <el-dialog
    title="抑郁自评量表（SDS）"
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
      <div>按照您最近1周以来的实际感受，请回答下列问题：</div>
      <el-divider></el-divider>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">1.我觉得闷闷不乐，情绪低沉</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.k01" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.k01" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.k01" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.k01" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">2.我觉得一天之中早晨最好</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.k02" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.k02" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.k02" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.k02" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">3.我一阵阵哭出来或想哭</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.k03" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.k03" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.k03" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.k03" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="el-row">
        <el-col :span="8">4.我晚上睡眠不好</el-col>
        <el-col :span="12">
          <el-radio v-model="infoForm.k04" label="1">没有或很少时间</el-radio>
          <el-radio v-model="infoForm.k04" label="2">少部分时间</el-radio>
          <el-radio v-model="infoForm.k04" label="3">相当多时间</el-radio>
          <el-radio v-model="infoForm.k04" label="4">绝大多数时间</el-radio>
        </el-col>
      </el-row>
    </el-form>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">5.我吃得跟平常一样多</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k05" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k05" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k05" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k05" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">6.我与异性密切接触时和以往一样愉快</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k06" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k06" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k06" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k06" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">7.我发觉我的体重在下降</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k07" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k07" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k07" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k07" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">8.我有便秘的苦恼</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k08" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k08" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k08" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k08" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">9.我心跳比平时快</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k09" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k09" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k09" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k09" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">10.我无缘无故地感到疲乏</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k10" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k10" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k10" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k10" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">11.我的头脑跟平常一样清楚</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k11" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k11" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k11" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k11" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">12.我觉得经常做的事情并没困难</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k12" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k12" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k12" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k12" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">13.我觉得不安而平静不下来</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k13" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k13" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k13" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k13" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">14.我对将来抱有希望</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k14" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k14" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k14" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k14" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">15.我比平常容易生气激动</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k15" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k15" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k15" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k15" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">16.我觉得做出决定是容易的</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k16" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k16" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k16" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k16" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">17.我觉得自己是个有用的人，有人需要我</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k17" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k17" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k17" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k17" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">18.我的生活过得很有意思</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k18" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k18" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k18" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k18" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">19.我认为如果我死了别人会生活得更好些</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k19" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k19" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k19" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k19" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">20.平常感兴趣的事我仍然照样感兴趣</el-col>
      <el-col :span="12">
        <el-radio v-model="infoForm.k20" label="1">没有或很少时间</el-radio>
        <el-radio v-model="infoForm.k20" label="2">少部分时间</el-radio>
        <el-radio v-model="infoForm.k20" label="3">相当多时间</el-radio>
        <el-radio v-model="infoForm.k20" label="4">绝大多数时间</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">结果</el-col>
      {{ resultText }}
    </el-row>

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
        k01: 0,
        k02: 0,
        k03: 0,
        k04: 0,
        k05: 0,
        k06: 0,
        k07: 0,
        k08: 0,
        k09: 0,
        k10: 0,
        k11: 0,
        k12: 0,
        k13: 0,
        k14: 0,
        k15: 0,
        k16: 0,
        k17: 0,
        k18: 0,
        k19: 0,
        k20: 0,
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
        k01,
        k02,
        k03,
        k04,
        k05,
        k06,
        k07,
        k08,
        k09,
        k10,
        k11,
        k12,
        k13,
        k14,
        k15,
        k16,
        k17,
        k18,
        k19,
        k20,
      } = this.infoForm;
      let arr = [k02, k05, k06, k11, k12, k14, k16, k17, k18, k20];
      let resultNum = 0;

      arr.forEach((item) => {
        resultNum += this.conversionScore(item);
      });

      let results =
        Number(k01) +
        Number(k03) +
        Number(k04) +
        Number(k07) +
        Number(k08) +
        Number(k09) +
        Number(k10) +
        Number(k13) +
        Number(k15) +
        Number(k19);

      let lastResult = Math.floor((resultNum + results) * 1.25);
      let resultText = "";

      if (lastResult < 53) {
        resultText = "正常";
      } else if (lastResult > 72) {
        resultText = "重度抑郁";
      } else if (lastResult >= 53 && lastResult <= 62) {
        resultText = "轻度抑郁";
      } else {
        resultText = "中度抑郁";
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
