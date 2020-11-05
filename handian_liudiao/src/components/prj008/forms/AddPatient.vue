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
      <el-form-item label="患者姓名1" prop="a02">
        <el-input v-model="patientInfo.a02"></el-input>
      </el-form-item>

      <el-form-item label="就诊日期" prop="a03">
        <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
        <el-date-picker
          v-model="patientInfo.a03"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="医院名称" prop="a0401">
        <el-input v-model="patientInfo.a0401"></el-input>
      </el-form-item>
      <el-form-item label="医院所属" prop="a0402">
        <el-radio v-model="patientInfo.a0402" label="1">省级医院</el-radio>
        <el-radio v-model="patientInfo.a0402" label="2">市级医院</el-radio>
        <el-radio v-model="patientInfo.a0402" label="3">区/县级医院</el-radio>
      </el-form-item>

      <el-form-item label="患者电话" prop="a05">
        <el-input v-model="patientInfo.a05"></el-input>
      </el-form-item>

      <el-form-item label="填表专家姓名" prop="a06">
        <el-input v-model="patientInfo.a06"></el-input>
      </el-form-item>

      <el-form-item label="填表专家电话" prop="a08">
        <el-input v-model="patientInfo.a08"></el-input>
      </el-form-item>

      <el-form-item label="填表专家邮箱" prop="a09">
        <el-input v-model="patientInfo.a09"></el-input>
      </el-form-item>

      <el-form-item label="填表专家职称" prop="a10">
        <el-select v-model="patientInfo.a10" placeholder="请选择">
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
import { apiAddPatient } from "@/api/api-prj008";
export default {
  name: "AddPatient",
  data() {
    return {
      patientInfo: {
        a01: "",
        a02: "",
        a03: "",
        a05: "",
        a06: "",
        a08: "",
        a09: "",
        a10: "",
        a0401: "",
        a0402: ""
      },
      dialogVisible: false,
      rules: {
        a02: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        a03: [{ required: true, message: "请输入就诊日期", trigger: "blur" }],
        a0401: [{ required: true, message: "请填写就诊医院名称" }],
        a0402: [{ required: true, message: "请填写就诊医院所属级别" }],
        a05: [
          {
            required: true,
            pattern: /^1\d{10}$/,
            message: "请输入11位手机号码",
            trigger: "blur",
          },
        ],
        a06: [{ required: true, message: "请填写专家姓名" }],
      },
    };
  },
  methods: {
    addPatient() {
      this.$refs.patientInfo.validate((valid) => {
        if (valid) {
          console.log(this.patientInfo);
          apiAddPatient(this.patientInfo)
            .then((res) => {
              console.log(res);
              if (res.statusCode == 201) {
                this.$message({ message: "提交成功", type: "success" });
                this.dialogVisible = false;
                this.$parent.getPatients();
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
            .catch();
        } else {
          this.$message({ message: "请填写完整信息", type: "warning" });
          return false;
        }
      });
    },
  },
  created() {
    this.$on("addEvent", function (data) {
      // this.patientInfo = {};
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
