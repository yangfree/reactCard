<template>
  <el-dialog
    title="提交"
    class="my-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="70%"
    center
  >
    <h3 style="text-align:center;color:#F56C6C;font-weight:600">
      <i class="fa fa-exclamation-circle fa-lg" aria-hidden="true"></i>
      是否提交此条信息审核？
    </h3>
    <p style="text-align:center;color:#E6A23C">注:请确保所有模块数据都已经完成再提交,</p>
    <p style="text-align:center;color:#E6A23C">提交后,除非审核不通过,否则将无法再修改数据！</p>
    <span slot="footer">
      <el-button type="primary" @click="submitPatient">提交</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { apiCheckPatient } from "@/api/api-prj00g";
export default {
  name: "SubmitPatient",
  data() {
    return {
      checkData: {},
      dialogVisible: false
    };
  },
  methods: {
    submitPatient() {
      this.checkData.check_status = "已提交";
      apiCheckPatient(this.checkData)
        .then(res => {
          if (res.status === 200) {
            this.$message({ message: "提交成功", type: "success" });
            this.dialogVisible = false;
            this.$parent.searchPatient();
            this.$parent.getPatients()
          } else {
            this.$message({ message: "提交失败", type: "error" });
            this.dialogVisible = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.$on("submitEvent", function(data) {
      this.dialogVisible = true;
      this.checkData = data;
    });
  }
};
</script>

<style scoped>
/* .el-dialog--center .el-dialog__body {
    text-align: initial;
    padding: 2px 2px 3px;
} */
</style>
