<template>
  <el-dialog
    title="诊断情况"
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

      
        <el-form-item label="1.首次发现子宫肌瘤的时间为">
          <el-date-picker
            v-model="infoForm.h0101"
            type="month"
            placeholder="选择日期"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="诊断的医院为">
          <el-input v-model="infoForm.h0102"></el-input>
        </el-form-item>

        <el-form-item label="2. 子宫肌瘤属于哪种类型">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.h0201[0]">肌壁间肌瘤</el-checkbox>
          <el-checkbox v-model="infoForm.h0201[1]">粘膜下肌瘤</el-checkbox>
          <el-checkbox v-model="infoForm.h0201[2]">浆膜下肌瘤</el-checkbox>
          <el-checkbox v-model="infoForm.h0201[3]">阔韧带肌瘤</el-checkbox>
          <el-checkbox v-model="infoForm.h0201[4]">其他</el-checkbox> 
          <el-input v-model="infoForm.h0202" maxlength="50" show-word-limit placeholder="注明其他"></el-input> 
        </el-form-item>

        <el-form-item label="3. 发现时有哪些症状">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.h0301[0]">痛经</el-checkbox>
          <el-checkbox v-model="infoForm.h0301[1]">不孕</el-checkbox>
          <el-checkbox v-model="infoForm.h0301[2]">非经期腹痛</el-checkbox>
          <el-checkbox v-model="infoForm.h0301[3]">盆腔包块</el-checkbox>
          <el-checkbox v-model="infoForm.h0301[4]">月经异常</el-checkbox>
          <el-checkbox v-model="infoForm.h0301[5]">性交痛</el-checkbox>
          <el-checkbox v-model="infoForm.h0301[6]">腹壁包块</el-checkbox>
          <el-checkbox v-model="infoForm.h0301[7]">体检</el-checkbox>
          <el-checkbox v-model="infoForm.h0301[8]">无明显症状</el-checkbox>
          <el-checkbox v-model="infoForm.h0301[9]">其他</el-checkbox>
          <el-input v-model="infoForm.h0302" maxlength="50" show-word-limit placeholder="注明其他"/>
        </el-form-item>
  
    </el-form>

    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj00g";
export default {
  name: "ClinicalForm",
  data() {
    return {
      infoForm: {
        h0101: "",
        h0102: "",
  
        h0201: [false, false, false, false, false],
        h0202: "",

        h0301: [false, false, false, false, false, false, false, false, false, false],
        h0302: ""
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
