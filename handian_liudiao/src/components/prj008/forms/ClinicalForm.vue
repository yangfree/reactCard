<template>
  <el-dialog
    title="临床诊断"
    class="my-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="100%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="160px" label-position="left">
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

      <!-- 表格开始 -->

    <el-form-item label="1.中医诊断::">
      <el-radio v-model="infoForm.e01" label="1">胎漏</el-radio>
      <el-radio v-model="infoForm.e01" label="2">胎动不安</el-radio>
    </el-form-item>
    <el-form-item label="2.中医合并疾病:">
      <el-radio v-model="infoForm.e02" label="1">无</el-radio>
      <el-radio v-model="infoForm.e02" label="2">月经病</el-radio>
      <el-radio v-model="infoForm.e02" label="3">带下病</el-radio>
      <el-radio v-model="infoForm.e02" label="4">癥瘕</el-radio>
      <el-radio v-model="infoForm.e02" label="5">妇科杂病</el-radio>
      <el-radio v-model="infoForm.e02" label="6">其他</el-radio>
    </el-form-item>
    <el-form-item label="3.辨证分型:">
      <el-radio v-model="infoForm.e03" label="1">肾虚证</el-radio>
      <el-radio v-model="infoForm.e03" label="2">脾肾两虚证</el-radio>
      <el-radio v-model="infoForm.e03" label="3">气血虚弱证</el-radio>
      <el-radio v-model="infoForm.e03" label="4">血瘀证</el-radio>
      <el-radio v-model="infoForm.e03" label="5">血热证</el-radio>
      <el-radio v-model="infoForm.e03" label="6">肾虚血瘀证</el-radio>
      <el-radio v-model="infoForm.e03" label="7">肾虚血热证</el-radio>
      <el-radio v-model="infoForm.e03" label="8">气虚血瘀证</el-radio>
      <el-radio v-model="infoForm.e03" label="9">其他</el-radio>
    </el-form-item>
    <el-form-item label="4.西医合并疾病: （可多选）">
      <el-checkbox v-model="infoForm.e04[0]">无</el-checkbox>
      <el-checkbox v-model="infoForm.e04[1]">习惯性流产</el-checkbox>
      <el-checkbox v-model="infoForm.e04[2]">复发性流产</el-checkbox>
      <el-checkbox v-model="infoForm.e04[3]">甲状腺功能减退</el-checkbox>
      <el-checkbox v-model="infoForm.e04[4]">糖尿病</el-checkbox>
      <el-checkbox v-model="infoForm.e04[5]">胰岛素抵抗</el-checkbox>
      <el-checkbox v-model="infoForm.e04[6]">盆腔炎性疾病</el-checkbox>
      <el-checkbox v-model="infoForm.e04[7]">子宫内膜异位症</el-checkbox>
      <el-checkbox v-model="infoForm.e04[8]">子宫腺肌症</el-checkbox>
      <el-checkbox v-model="infoForm.e04[9]">多囊卵巢综合征</el-checkbox>
      <el-checkbox v-model="infoForm.e04[10]">子宫肌瘤</el-checkbox>
      <el-checkbox v-model="infoForm.e04[11]">其他</el-checkbox>
    </el-form-item>

    </el-form>

    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj008";
export default {
  name: "ClinicalForm",
  data() {
    return {
      infoForm: {
        e01: 0,
        e02: 0,
        e03: 0,
        e04: [false, false, false, false, false,  false, false, false, false, false, false, false]        
      },
      dialogVisible: false,
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: ""
    };
  },
  created() {
    this.$on("openEvent", (data) => {
      console.log("临床症状数据: ", data);
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
