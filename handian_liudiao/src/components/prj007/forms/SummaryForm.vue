<template>
  <el-dialog
    title="既往史"
    class="my-dialog summary-dialog prj005-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="100%"
    center
  >
    <el-form ref="summaryForm" :model="infoForm" label-width="200px" label-position="left">
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
      <p></p>
      <el-alert
        v-if="!isOwnedByUser"
        effect="dark"
        title="此条信息为其他用户创建，您无法修改"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>

      <!-- 表格内容开始 -->
      <el-form-item label="1.是否患有其他妇科疾病">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.d002[0]">子宫肌瘤</el-checkbox>
        <el-checkbox v-model="infoForm.d002[1]">子宫内膜息肉</el-checkbox>
        <el-checkbox v-model="infoForm.d002[2]">子宫内膜增生</el-checkbox>
        <el-checkbox v-model="infoForm.d002[3]">子宫内膜炎</el-checkbox>
        <el-checkbox v-model="infoForm.d002[4]">子宫内膜癌</el-checkbox>
        <el-checkbox v-model="infoForm.d002[5]">多囊卵巢综合征</el-checkbox>
        <el-checkbox v-model="infoForm.d002[6]">高泌乳素血症</el-checkbox>
        <el-checkbox v-model="infoForm.d002[7]">其他卵巢良性囊肿</el-checkbox>
        <el-checkbox v-model="infoForm.d002[8]">卵巢早衰</el-checkbox>
        <el-checkbox v-model="infoForm.d002[9]">卵巢恶性肿瘤</el-checkbox>
        <el-checkbox v-model="infoForm.d002[10]">盆腔炎</el-checkbox>
        <el-checkbox v-model="infoForm.d002[11]">盆腔结核</el-checkbox>
        <el-checkbox v-model="infoForm.d002[13]">未曾患有以上妇科疾病</el-checkbox>
        <el-checkbox v-model="infoForm.d002[12]">其他</el-checkbox>
        <el-input v-model="infoForm.d002a" style="width:100px;"></el-input>
      </el-form-item>
      <el-form-item label="2.患有以下哪种疾病">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.d004[0]" @change="getSummaryHideCodeOne">甲状腺疾病</el-checkbox>
        <el-checkbox v-model="infoForm.d004[1]" @change="getSummaryHideCodeOne">乳腺疾病</el-checkbox>
        <el-checkbox v-model="infoForm.d004[2]" @change="getSummaryHideCodeOne">其他疾病</el-checkbox>
        <el-checkbox v-model="infoForm.d004[3]" @change="getSummaryHideCodeOne">未患有其他疾病</el-checkbox>
      </el-form-item>

      <div v-show="testOne.d005 === '1' ? true : false">
        <el-form-item label="3.患有哪种甲状腺疾病">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.d005[0]">甲状腺功能亢进</el-checkbox>
          <el-checkbox v-model="infoForm.d005[1]">甲状腺功能减退</el-checkbox>
          <el-checkbox v-model="infoForm.d005[2]">甲状腺结节</el-checkbox>
          <el-checkbox v-model="infoForm.d005[3]">桥本氏甲状腺炎</el-checkbox>
          <el-checkbox v-model="infoForm.d005[4]">甲状腺癌</el-checkbox>
        </el-form-item>
      </div>

      <div v-show="testOne.d006 === '1' ? true : false">
        <el-form-item label="4.患有哪种乳腺疾病">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.d006[0]">乳腺结节</el-checkbox>
          <el-checkbox v-model="infoForm.d006[1]">乳腺增生</el-checkbox>
          <el-checkbox v-model="infoForm.d006[2]">乳腺癌</el-checkbox>
        </el-form-item>
      </div>

      <div v-show="testOne.d007 === '1' ? true : false">
        <el-form-item label="5.患有下列哪种疾病">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.d007[1]">红斑狼疮</el-checkbox>
          <el-checkbox v-model="infoForm.d007[2]">类风湿关节炎</el-checkbox>
          <el-checkbox v-model="infoForm.d007[3]">雷诺病</el-checkbox>
          <el-checkbox v-model="infoForm.d007[4]">高血压</el-checkbox>
          <el-checkbox v-model="infoForm.d007[5]">高脂血症</el-checkbox>
          <el-checkbox v-model="infoForm.d007[6]">糖尿病</el-checkbox>
          <el-checkbox v-model="infoForm.d007[7]">抑郁状态</el-checkbox>
          <el-checkbox v-model="infoForm.d007[8]">焦虑状态</el-checkbox>
          <el-checkbox v-model="infoForm.d007[9]">反复泌尿系感染</el-checkbox>
          <el-checkbox v-model="infoForm.d007[10]">血液系统相关疾病</el-checkbox>
          <el-checkbox v-model="infoForm.d007[11]">其他</el-checkbox>
          <el-input v-model="infoForm.d007a" style="width:100px;"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="6.手术史">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.d008[0]">子宫肌瘤剔除术</el-checkbox>
        <el-checkbox v-model="infoForm.d008[1]">其他卵巢囊肿剥除术</el-checkbox>
        <el-checkbox v-model="infoForm.d008[2]">子宫内膜息肉切除术</el-checkbox>
        <el-checkbox v-model="infoForm.d008[3]">子宫内膜诊刮术</el-checkbox>
        <el-checkbox v-model="infoForm.d008[4]">输卵管通液、造影术</el-checkbox>
        <el-checkbox v-model="infoForm.d008[7]">输卵管整形术</el-checkbox>
        <el-checkbox v-model="infoForm.d008[8]">单侧输卵管切除术</el-checkbox>
        <el-checkbox v-model="infoForm.d008[9]">双侧输卵管切除术</el-checkbox>
        <el-checkbox v-model="infoForm.d008[10]">清宫术</el-checkbox>
        <el-checkbox v-model="infoForm.d008[6]">无</el-checkbox>
        <el-checkbox v-model="infoForm.d008[5]">其他</el-checkbox>
        <el-input v-model="infoForm.d008a" style="width:100px;"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button
        type="primary"
        :disabled="check_status=='审核通过'"
        v-if="exist"
        @click="updateSummaryForm"
      >确定</el-button>
      <el-button type="primary" v-else @click="createSummaryForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiGetHideCode } from "@/api/api-prj006";
export default {
  name: "SummaryForm",
  data() {
    return {
      infoForm: {
        // d001: "",
        d002: [
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
          false,
        ],
        d002a: "",
        // d003: "",
        d004: [false, false, false, false],
        d005: [false, false, false, false, false],
        d006: [false, false, false],
        d007: [
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
        d007a: "",
        d008: [
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
        d008a: "",
      },
      dialogVisible: false,
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: "",
      testOne: {
        d005: "0",
        d006: "0",
        d007: "0",
      },
    };
  },
  created() {
    this.$on("openEvent", (data) => {
      console.log("既往史的数据:", data);
      this.dialogVisible = true;
      this.check_status = data.check_status;
      this.isOwnedByUser = data.isOwnedByUser;
      this.formName = data.formName;
      this._id = data._id;

      if ("id" in data.result) {
        this.infoForm = this.parseInfoForm(data.result);

        this.getSummaryHideCodeOne();
      }
    });
  },
  methods: {
    getSummaryHideCodeOne() {
      let params = {
        question: "d004",
        answer: JSON.stringify(this.infoForm.d004),
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
    updateSummaryForm() {
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
<style lang="scss">
.prj005-summary {
  .el-input-group__append,
  .el-input-group__prepend {
    width: 35px;
  }
  .el-input-group > .el-input__inner {
    vertical-align: middle;
    display: initial;
  }
}

.prj005-dialog {
  h4 {
    color: cornflowerblue;
  }
}
</style>

