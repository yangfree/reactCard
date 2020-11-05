<template>
  <el-dialog
    title="家族史"
    class="my-dialog prj009-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="200px" label-position="left">
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
      <el-form-item label="1. 一级亲属中">
          <el-row>母女或姐妹:</el-row>
          <el-row>
            <el-col :span="8">有无月经紊乱史</el-col>
            <el-col :span="4">
              <el-radio v-model="infoForm.f0101" label="1">有</el-radio>
              <el-radio v-model="infoForm.f0101" label="2">无</el-radio>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">有无早绝经</el-col>            
            <el-col :span="4">
              <el-radio v-model="infoForm.f0102" label="1">有</el-radio>
              <el-radio v-model="infoForm.f0102" label="2">无</el-radio>
            </el-col>
          </el-row>          
      </el-form-item>

      <el-form-item label="2. 一级亲属中">
          <el-row>父母、兄弟姐妹其他病史:</el-row>
          <el-row>
            <el-col :span="8">糖尿病:</el-col>
            <el-col :span="4">
              <el-radio v-model="infoForm.f0201" label="1">有</el-radio>
              <el-radio v-model="infoForm.f0201" label="2">无</el-radio>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">高血压:</el-col>            
            <el-col :span="4">
              <el-radio v-model="infoForm.f0202" label="1">有</el-radio>
              <el-radio v-model="infoForm.f0202" label="2">无</el-radio>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">冠心病:</el-col>
            <el-col :span="4">
              <el-radio v-model="infoForm.f0203" label="1">有</el-radio>
              <el-radio v-model="infoForm.f0203" label="2">无</el-radio>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">脑血管病:</el-col>            
            <el-col :span="4">
              <el-radio v-model="infoForm.f0204" label="1">有</el-radio>
              <el-radio v-model="infoForm.f0204" label="2">无</el-radio>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">肿瘤:</el-col>
            <el-col :span="4">
              <el-radio v-model="infoForm.f0205" label="1">有</el-radio>
              <el-radio v-model="infoForm.f0205" label="2">无</el-radio>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">甲状腺疾病:</el-col>            
            <el-col :span="4">
              <el-radio v-model="infoForm.f0206" label="1">有</el-radio>
              <el-radio v-model="infoForm.f0206" label="2">无</el-radio>
            </el-col>
          </el-row>           
      </el-form-item>
      
    </el-form>
    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj009";
export default {
  name: "FamilyHistory",
  data() {
    return {
      infoForm: {
        f0101: 0,
        f0102: 0,
        f0201: 0,
        f0202: 0,
        f0203: 0,
        f0204: 0,
        f0205: 0,
        f0206: 0
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
    this.$on("openEvent", data => {
      console.log("家族史数据:", data);
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
        formName: this.formName
      })
        .then(res => {
          if (res.detail) {
            this.$message({
              message: res.detail,
              type: "error"
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
    }
  }
};
</script>
<style lang="scss">
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
}
</style>
