<template>
  <el-dialog
    title="一般资料"
    class="my-dialog prj006-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form
      ref="infoForm"
      :model="infoForm"
      :rules="rules"
      label-width="180px"
      label-position="left"
    >
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
      <el-form-item label="1.你患有以下哪种疾病?" prop="a017">
        <el-radio v-model="infoForm.a017" label="1">子宫内膜异位症</el-radio>
        <el-radio v-model="infoForm.a017" label="2">子宫腺肌病或子宫腺肌瘤</el-radio>
        <el-radio v-model="infoForm.a017" label="3">同时患有子宫内膜异位症与子宫腺肌病或子宫腺肌瘤</el-radio>
      </el-form-item>
      <el-form-item label="2.姓名">
        <el-input v-model="infoForm.a001" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="infoForm.a010"
          type="month"
          placeholder="选择日期"
          format="yyyy 年 MM 月"
          value-format="yyyy-MM"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="3.常住地">
        <el-input v-model="infoForm.a011" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="4.身高">
        <el-input-number v-model="infoForm.a012" controls-position="right" :min="1" :max="200"></el-input-number>CM
        <span style="margin-left: 10%">体重</span>
        <el-input-number v-model="infoForm.a013" controls-position="right" :min="1" :max="300"></el-input-number>KG
      </el-form-item>

      <el-form-item label="5.文化程度">
        <el-radio v-model="infoForm.a014" label="1">小学及以下</el-radio>
        <el-radio v-model="infoForm.a014" label="2">初中</el-radio>
        <el-radio v-model="infoForm.a014" label="3">高中或中专</el-radio>
        <el-radio v-model="infoForm.a014" label="4">大专</el-radio>
        <el-radio v-model="infoForm.a014" label="5">本科</el-radio>
        <el-radio v-model="infoForm.a014" label="6">硕士</el-radio>
        <el-radio v-model="infoForm.a014" label="7">博士及以上</el-radio>
      </el-form-item>
      <el-form-item label="6.职业劳动类型">
        <el-radio v-model="infoForm.a015" label="1">重体力劳动(如:搬运工、清洁工、农场工人、畜牧场工人等)</el-radio>
        <el-radio v-model="infoForm.a015" label="2">中体力劳动(如:家政服务人员、服务生、厨师、护士等)</el-radio>
        <el-radio v-model="infoForm.a015" label="3">轻体力劳动(如:教师、美容美发师、批发商、职员等)</el-radio>
        <el-radio v-model="infoForm.a015" label="4">坐式的工作(如:收银员、出纳员、接线员、秘书等)</el-radio>
      </el-form-item>
      <el-form-item label="7.个人月收入">
        <el-radio v-model="infoForm.a016" label="1">少于2千元</el-radio>
        <el-radio v-model="infoForm.a016" label="2">2千到5千元</el-radio>
        <el-radio v-model="infoForm.a016" label="3">5千到1万之间</el-radio>
        <el-radio v-model="infoForm.a016" label="4">1万到2万之间</el-radio>
        <el-radio v-model="infoForm.a016" label="5">2万到4万之间</el-radio>
        <el-radio v-model="infoForm.a016" label="6">4万以上</el-radio>
      </el-form-item>

      <!-- 信息展示 -->
      <h3 style="backgroundColor: #eee; color: #777">基本信息</h3>
      <el-form-item label="患者姓名" prop="a001">
        <el-input v-model="infoForm.a001" readonly></el-input>
      </el-form-item>

      <el-form-item label="就诊日期" prop="a002">
        <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
        <el-date-picker
          v-model="infoForm.a002"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="医院名称" prop="a003">
        <el-input v-model="infoForm.a003"></el-input>
      </el-form-item>
      <el-form-item label="医院所属" prop="a004">
        <el-radio v-model="infoForm.a004" label="1">省级医院</el-radio>
        <el-radio v-model="infoForm.a004" label="2">市级医院</el-radio>
        <el-radio v-model="infoForm.a004" label="3">区/县级医院</el-radio>
      </el-form-item>

      <el-form-item label="患者电话" prop="a005">
        <el-input v-model="infoForm.a005"></el-input>
      </el-form-item>

      <el-form-item label="填表专家姓名" prop="a006">
        <el-input v-model="infoForm.a006"></el-input>
      </el-form-item>

      <el-form-item label="填表专家电话" prop="expert_phone">
        <el-input v-model="infoForm.a007"></el-input>
      </el-form-item>

      <el-form-item label="填表专家邮箱" prop="expert_email">
        <el-input v-model="infoForm.a008"></el-input>
      </el-form-item>

      <el-form-item label="填表专家职称" prop="title">
        <el-select v-model="infoForm.a009" placeholder="请选择">
          <el-option label="主任医师" value="1"></el-option>
          <el-option label="副主任医师" value="2"></el-option>
          <el-option label="主治医师" value="3"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj006";
export default {
  name: "InfoForm",
  data() {
    return {
      dialogVisible: false,
      infoForm: {
        a017: "",
        a010: "",
        a011: "",
        a012: "",
        a013: "",
        a014: "",
        a015: "",
        a016: "",
        a001: "",
        a002: "",
        a003: "",
        a004: "",
        a005: "",
        a006: "",
        a007: "",
        a008: "",
        a009: "",
      },
      formName: "",
      isOwnedByUser: true,
      check_status: "",
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
        a006: [{ required: true, message: "请填写专家姓名" }],
        a017: [{ required: true, message: "请填写必填项" }],
      },
    };
  },
  created() {
    this.$on("openEvent", (data) => {
      console.log("一般情况获取到的数据", data);
      this.dialogVisible = true;
      this.check_status = data.check_status;
      this.isOwnedByUser = data.isOwnedByUser;
      this.formName = data.formName;
      this.infoForm = data.result;
    });
  },
  methods: {
    updateInfoForm() {
      // console.log(this.infoForm, this.formName);
      this.$refs.infoForm.validate((valid) => {
        if (valid) {
          apiUpdatePatientDataForm({
            infoForm: this.infoForm,
            _id: this.infoForm.id,
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
        } else {
          this.$message({ message: "请填写必填项目", type: "warning" });
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.prj006-info {
  .el-input-group__append,
  .el-input-group__prepend {
    width: 50px;
  }
}
.prj006-dialog {
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
