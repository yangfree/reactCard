<template>
  <el-dialog
    title="辅助检查"
    class="my-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="100%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="auto" label-position="left">
      <el-alert
        v-if="check_status=='审核通过'"
        title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <el-divider v-if="check_status=='审核通过'"></el-divider>
      <!-- 表格开始 -->

        <el-form-item label="1、B超">
          <el-radio-group v-model="infoForm.j0101">
            <el-radio label="1">有</el-radio>
            <el-radio label="2">无</el-radio>
          </el-radio-group>
        </el-form-item>

      <el-form-item label="B超检查日期:">
        <el-date-picker v-model="infoForm.j0102"  type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" ></el-date-picker>
      </el-form-item>

       <el-form-item label="影像学提示:">
            <el-input v-model="infoForm.j0103" maxlength="50" show-word-limit placeholder="请填写"></el-input>   
       </el-form-item>

        <el-form-item label="2、核磁">
          <el-radio-group v-model="infoForm.j0201">
            <el-radio label="1">有</el-radio>
            <el-radio label="2">无</el-radio>
          </el-radio-group>
            <el-row>
            检查日期：<el-date-picker v-model="infoForm.j0202"  type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" ></el-date-picker>
            </el-row>
            <el-row>
            子宫大小： 
              <el-input-number v-model="infoForm.j0204"   controls-position="right"  :min="1" :max="100"/>  X 
              <el-input-number v-model="infoForm.j0205"   controls-position="right"  :min="1" :max="100"/>  X 
              <el-input-number v-model="infoForm.j0206"   controls-position="right"  :min="1" :max="100"/>
            </el-row>
        </el-form-item>

        <el-form-item label="有无有肌瘤">
          <el-radio-group v-model="infoForm.j0207">
            <el-radio label="1">有</el-radio>
            <el-radio label="2">无</el-radio>
          </el-radio-group>
            <el-row>
            肌瘤大小描述：<el-input v-model="infoForm.j0208" maxlength="50" show-word-limit placeholder="请填写"></el-input> 
            </el-row>
            <el-row>
            影像学提示： <el-input v-model="infoForm.j0209" maxlength="50" show-word-limit placeholder="请填写"></el-input> 
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
import { apiUpdatePatientDataForm } from "@/api/api-prj00g";

export default {
  name: "Relevant",
  data() {
    return {
      infoForm: {
        j0101: 0,
        j0102: "",
        j0103: "",
        j0201: 0,
        j0202: "",
        j0204: 0,
        j0205: 0,
        j0206: 0,
        j0207: 0,
        j0208: "",
        j0209: ""
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
      console.log("辅助检查数据: ", data);
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
<style lang="scss">
.prj00g-dialog {
  h4 {
    color: cornflowerblue;
  }
}
</style>
