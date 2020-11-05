<template>
  <el-dialog
    title="既往史"
    class="my-dialog summary-dialog prj009-dialog"
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
      <el-form-item label="1. 妇科疾病病史（可多选）">
        <el-checkbox v-model="infoForm.e0101[0]">未曾患有以下妇科疾病</el-checkbox>
        <el-checkbox v-model="infoForm.e0101[1]">子宫肌瘤</el-checkbox>
        <el-checkbox v-model="infoForm.e0101[2]">多囊卵巢综合征</el-checkbox>
        <el-checkbox v-model="infoForm.e0101[3]">子宫内膜息肉</el-checkbox>
        <el-checkbox v-model="infoForm.e0101[4]">其他卵巢良性囊肿</el-checkbox>
        <el-checkbox v-model="infoForm.e0101[5]">盆腔炎</el-checkbox>
        <el-checkbox v-model="infoForm.e0101[6]">卵巢恶性肿瘤</el-checkbox>
        <el-checkbox v-model="infoForm.e0101[7]">子宫内膜癌</el-checkbox>
        <el-checkbox v-model="infoForm.e0101[8]">下丘脑性闭经</el-checkbox>
        <el-checkbox v-model="infoForm.e0101[9]">空蝶鞍综合征</el-checkbox>
        <el-checkbox v-model="infoForm.e0101[10]">盆腔结核</el-checkbox>
        <el-checkbox v-model="infoForm.e0101[11]">其他</el-checkbox>
        <el-input v-model="infoForm.e0102" maxlength="50" show-word-limit placeholder="其他"></el-input> 
      </el-form-item>

      <el-form-item label="2. 腮腺炎病史：">
      <el-radio v-model="infoForm.e02" label="1">无</el-radio>
      <el-radio v-model="infoForm.e02" label="2">有</el-radio>
      </el-form-item>

      <el-form-item label="3. 阴道炎病史：">
      <el-radio v-model="infoForm.e03" label="1">无</el-radio>
      <el-radio v-model="infoForm.e03" label="2">细菌性阴道炎</el-radio>
      <el-radio v-model="infoForm.e03" label="3">霉菌性阴道炎</el-radio>
      <el-radio v-model="infoForm.e03" label="4">滴虫性阴道炎</el-radio>
      <el-radio v-model="infoForm.e03" label="5">萎缩性阴道炎</el-radio>
      </el-form-item>

      <el-form-item label="4. 自身免疫系统疾病：">
      <el-checkbox v-model="infoForm.e0401[0]">无</el-checkbox>
      <el-checkbox v-model="infoForm.e0401[1]">红斑狼疮</el-checkbox>
      <el-checkbox v-model="infoForm.e0401[2]">类风湿关节炎</el-checkbox>
      <el-checkbox v-model="infoForm.e0401[3]">雷诺病</el-checkbox>
      <el-checkbox v-model="infoForm.e0401[4]">血液系统相关疾病</el-checkbox>
      <el-checkbox v-model="infoForm.e0401[5]">其他</el-checkbox>
      <el-input v-model="infoForm.e0402" maxlength="50" show-word-limit placeholder="其他"></el-input> 
      </el-form-item>

      <el-form-item label="5.甲状腺疾病：">
        <el-checkbox v-model="infoForm.e05[0]">无</el-checkbox>
        <el-checkbox v-model="infoForm.e05[1]">甲状腺功能亢进</el-checkbox>
        <el-checkbox v-model="infoForm.e05[2]">甲状腺功能减退</el-checkbox>
        <el-checkbox v-model="infoForm.e05[3]">甲状腺结节</el-checkbox>
        <el-checkbox v-model="infoForm.e05[4]">桥本氏甲状腺炎</el-checkbox>
        <el-checkbox v-model="infoForm.e05[5]">甲状腺癌</el-checkbox>
      </el-form-item>

      <el-form-item label="6.乳腺疾病: ">
        <el-radio v-model="infoForm.e06" label="1">无</el-radio>
        <el-radio v-model="infoForm.e06" label="2">乳腺结节</el-radio>
        <el-radio v-model="infoForm.e06" label="3">乳腺增生</el-radio>
        <el-radio v-model="infoForm.e06" label="4">乳腺癌</el-radio>
      </el-form-item>

      <el-form-item label="7.患有其他疾病：">
      <el-checkbox v-model="infoForm.e07[0]">无 </el-checkbox>
      <el-checkbox v-model="infoForm.e07[1]">高血压</el-checkbox>
      <el-checkbox v-model="infoForm.e07[2]">糖尿病</el-checkbox>
      <el-checkbox v-model="infoForm.e07[3]">高脂血症</el-checkbox>
      <el-checkbox v-model="infoForm.e07[4]">反复泌尿系感染</el-checkbox>
      <el-checkbox v-model="infoForm.e07[5]">抑郁状态</el-checkbox>
      <el-checkbox v-model="infoForm.e07[6]">焦虑状态</el-checkbox>
      </el-form-item>

      <el-form-item label="8. 手术史（可多选）：">
      <el-checkbox v-model="infoForm.e0801[0]">无</el-checkbox>
      <el-checkbox v-model="infoForm.e0801[1]">单侧输卵管切除术</el-checkbox>
      <el-checkbox v-model="infoForm.e0801[2]">双侧输卵管切除术</el-checkbox>
      <el-checkbox v-model="infoForm.e0801[3]">其他卵巢囊肿剥除术</el-checkbox>
      <el-checkbox v-model="infoForm.e0801[4]">输卵管整形术</el-checkbox>
      <el-checkbox v-model="infoForm.e0801[5]">输卵管通液、造影术</el-checkbox>
      <el-checkbox v-model="infoForm.e0801[6]">子宫肌瘤剔除术</el-checkbox>
      <el-checkbox v-model="infoForm.e0801[7]">子宫内膜诊刮术</el-checkbox>
      <el-checkbox v-model="infoForm.e0801[8]">子宫内膜息肉切除术</el-checkbox>
      <el-checkbox v-model="infoForm.e0801[9]">清宫术</el-checkbox>
      <el-checkbox v-model="infoForm.e0801[10]">其他</el-checkbox>
      <el-input v-model="infoForm.e0802" maxlength="50" show-word-limit placeholder="其他"></el-input>
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
import { apiUpdatePatientDataForm } from "@/api/api-prj009";
export default {
  name: "SummaryForm",
  data() {
    return {
      infoForm: {
        e0101: [
          false,          false,          false,          false,
          false,          false,          false,          false,
          false,          false,          false,          false
        ],
        e0102: "",
        e02: 0,
        e03: 0,
        e0401: [false, false, false,  false,  false, false  ],
        e0402:'',
        e05:  [false, false, false,  false,  false, false  ],
        e06: 0,
        e07: [false, false, false,  false,  false, false ,false  ],
        e0801:  [
          false,          false,          false,          false,
          false,          false,          false,          false,
          false,          false,          false        
        ],
        e0802:''
      },
      dialogVisible: false,
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: "",

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
      }
    });
  },
  methods: {
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
.prj009-summary {
  .el-input-group__append,
  .el-input-group__prepend {
    width: 35px;
  }
  .el-input-group > .el-input__inner {
    vertical-align: middle;
    display: initial;
  }
}

.prj009-dialog {
  h4 {
    color: cornflowerblue;
  }
}
</style>

