<template>
  <el-dialog
    title="月经史"
    class="my-dialog prj006-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="120px" label-position="left">
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
      <el-form-item label="1.初潮年龄">
        <el-radio v-model="infoForm.b01" label="1">≤11岁</el-radio>
        <el-radio v-model="infoForm.b01" label="2">12-15岁</el-radio>
        <el-radio v-model="infoForm.b01" label="3">≥16岁</el-radio>
      </el-form-item>
      <el-form-item label="2.现是否绝经">
        <el-radio-group v-model="infoForm.b0201">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
        <el-row>
          绝经年龄：  <el-input-number v-model="infoForm.b0202"   controls-position="right"  :min="1" :max="100"></el-input-number>
        </el-row> 
      </el-form-item>


      <el-form-item label="3.您的月经周期为">
        <el-radio v-model="infoForm.b03" label="1">≤20天</el-radio>
        <el-radio v-model="infoForm.b03" label="2">21-28天</el-radio>
        <el-radio v-model="infoForm.b03" label="3">29-35天</el-radio>
        <el-radio v-model="infoForm.b03" label="4">≥36天</el-radio>
      </el-form-item>
      <el-form-item label="4.您的经期一般有几天">
        <el-radio v-model="infoForm.b04" label="1">1-2天</el-radio>
        <el-radio v-model="infoForm.b04" label="2">3-7天</el-radio>
        <el-radio v-model="infoForm.b04" label="3">8-14天</el-radio>
        <el-radio v-model="infoForm.b04" label="4">≥15天</el-radio>
      </el-form-item>
      <el-form-item label="5.您的经量有多少">
        <el-radio v-model="infoForm.b05" label="1">量少（＜20ml或一个月经周期所用卫生巾折满算少于等于2片）</el-radio>
        <el-radio v-model="infoForm.b05" label="2">量中（20-80ml或最多一天卫生巾折满算3-5片）</el-radio>
        <el-radio v-model="infoForm.b05" label="3">量多（＞80ml或最多一天卫生巾折满算5片以上）</el-radio>
      </el-form-item>
      <el-form-item label="6.是否经常痛经">
          <el-radio v-model="infoForm.b06" label="1">是</el-radio>
          <el-radio v-model="infoForm.b06" label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="7.经色">
          <el-radio v-model="infoForm.b0701" label="1">淡红</el-radio>
          <el-radio v-model="infoForm.b0701" label="2">鲜红</el-radio>
          <el-radio v-model="infoForm.b0701" label="3">深红</el-radio>
          <el-radio v-model="infoForm.b0701" label="4">黯红</el-radio>
          <el-radio v-model="infoForm.b0701" label="5">黯黑</el-radio>
          <el-radio v-model="infoForm.b0701" label="6">其他</el-radio>  
          <el-input v-model="infoForm.b0702" maxlength="50" show-word-limit placeholder="注明其他的颜色"></el-input>                 
      </el-form-item>
      <el-form-item label="8. 血块">
          <el-radio v-model="infoForm.b08" label="1">无</el-radio>
          <el-radio v-model="infoForm.b08" label="2">大血块（超过1元硬币大小为大血块）</el-radio>
          <el-radio v-model="infoForm.b08" label="3">小血块</el-radio>
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
  name: "MenstrualHistory",
  data() {
    return {
      infoForm: {
        b01: 0,
        b0201: 0,
        b0202: 0,
        b03: 0,
        b04: 0,
        b05: 0,
        b06: 0,
        b0701: 0,
        b0702:'',
        b08: 0
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
      console.log("月经史", data);
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
<style lang="scss" scoped>
.prj00g-info {
  .el-input-group__append,
  .el-input-group__prepend {
    width: 50px;
  }
}
.prj00g-dialog {
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
