<template>
  <el-dialog
    title="新增患者信息"
    class="my-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="85%"
    center
  >
    <el-form
      ref="patientInfo"
      :model="patientInfo"
      :rules="rules"
      label-width="130px"
      label-position="left"
    >
      <el-form-item label="患者姓名" prop="a001">
        <el-input v-model="patientInfo.a001"></el-input>
      </el-form-item>

      <el-form-item label="就诊日期" prop="a002">
        <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
        <el-date-picker
          v-model="patientInfo.a002"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="医院名称" prop="a003">
        <el-input v-model="patientInfo.a003"></el-input>
      </el-form-item>
      <el-form-item label="医院所属" prop="a004">
        <el-radio v-model="patientInfo.a004" label="1">省级医院</el-radio>
        <el-radio v-model="patientInfo.a004" label="2">市级医院</el-radio>
        <el-radio v-model="patientInfo.a004" label="3">区/县级医院</el-radio>
      </el-form-item>

      <el-form-item label="患者电话" prop="a005">
        <el-input v-model="patientInfo.a005"></el-input>
      </el-form-item>

      <el-form-item label="填表专家姓名" prop="expert_name">
        <el-input v-model="patientInfo.a006"></el-input>
      </el-form-item>

      <el-form-item label="填表专家单位" prop="expert_job">
        <el-input v-model="patientInfo.a007"></el-input>
      </el-form-item>

      <el-form-item label="填表专家电话" prop="expert_phone">
        <el-input v-model="patientInfo.a008"></el-input>
      </el-form-item>

      <el-form-item label="填表专家邮箱" prop="expert_email">
        <el-input v-model="patientInfo.a009"></el-input>
      </el-form-item>

      <el-form-item label="填表专家职称" prop="title">
        <el-select v-model="patientInfo.a010" placeholder="请选择">
          <el-option label="主任医师" value="1"></el-option>
          <el-option label="副主任医师" value="2"></el-option>
          <el-option label="主治医师" value="3"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button type="primary" @click="addPatient">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { apiAddPatient, apiUpdatePatientDataForm } from "@/api/api-prj007";
export default {
  name: "AddPatient",
  data() {
    return {
      patientInfo: {
        a001: "",
        a002: "",
        a003: "",
        a004: "",
        a005: "",
        a006: "",
        a007: "",
        a008: "",
        a009: "",
        a010: "",
      },
      dialogVisible: false,
      rules: {
        a001: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        a002: [{ required: true, message: "请输入就诊日期", trigger: "blur" }],
        a003: [{ required: true, message: "请填写就诊医院名称" }],
        a004: [{ required: true, message: "请填写就诊医院所属级别" }],
        a005: [
          {
            required: true,
            pattern: /^1\d{10}$/,
            message: "请输入11位手机号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    addPatient() {
      this.$refs.patientInfo.validate((valid) => {
        if (valid) {
          if (this.patientInfo.id) {
            const params = {
              _id: this.patientInfo.id,
              formName: "info",
              infoForm: this.patientInfo,
            };
            apiUpdatePatientDataForm(params)
              .then((res) => {
                if (res.detail) {
                  this.$message({
                    message: res.detail,
                    type: "error",
                  });
                } else {
                  this.$message({ message: "提交成功", type: "success" });
                  this.dialogVisible = false;
                  this.$parent.searchPatient();
                  this.$parent.getPatients();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            apiAddPatient(this.patientInfo)
              .then((res) => {
                if (res.statusCode == 201) {
                  this.$message({ message: "提交成功", type: "success" });
                  this.dialogVisible = false;
                  // this.$parent.getPatients();
                  window.location.reload();
                } else {
                  this.$message({
                    message: "您没有添加数据的权限",
                    type: "error",
                  });
                  this.dialogVisible = false;
                  this.$parent.getPatients();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else {
          this.$message({ message: "请填写完整信息", type: "warning" });
          return false;
        }
      });
    },
  },
  created() {
    this.$on("addEvent", function (data) {
      this.patientInfo = {};
      this.dialogVisible = true;
    });
    this.$on("updateEvent", (data) => {
      this.patientInfo = data;
      this.dialogVisible = true;
    });
  },
};
</script>

<style lang="scss" scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 190px;
}
</style>
