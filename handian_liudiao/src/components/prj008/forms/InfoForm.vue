<template>
  <el-dialog
    title="一般资料"
    class="my-dialog prj008-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form
      ref="infoForm"
      :model="infoForm"
      label-width="180px"
      label-position="left"
    >
      <!-- 提示信息 -->
      <el-alert
        v-if="check_status == '审核通过'"
        effect="dark"
        title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <el-alert
        v-if="check_status == '已提交'"
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
      <el-form-item label="1.患者出生出年月">
        <el-date-picker
          v-model="infoForm.a11"
          type="month"
          placeholder="选择日期"
          format="yyyy 年 MM 月"
          value-format="yyyy-MM"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="2.身高">
        <el-input-number
          v-model="infoForm.a12"
          controls-position="right"
          :min="1"
          :max="200"
        ></el-input-number
        >CM
      </el-form-item>

      <el-form-item label="3.体重">
        <el-input-number
          v-model="infoForm.a13"
          controls-position="right"
          :min="1"
          :max="200"
        ></el-input-number
        >KG
      </el-form-item>

      <el-form-item label="4.民族">
        <el-radio-group v-model="infoForm.a1401">
          <el-radio label="1">汉族</el-radio>
          <el-radio label="2">其他</el-radio>
        </el-radio-group>
        <el-input v-model="infoForm.a1402" style="width: 100px"></el-input>
      </el-form-item>

      <el-form-item label="5.职业">
        <el-radio-group v-model="infoForm.a1501">
          <el-radio label="1">学生</el-radio>
          <el-radio label="2">个体</el-radio>
          <el-radio label="3">农民</el-radio>
          <el-radio label="4">军人</el-radio>
          <el-radio label="5">工人</el-radio>
          <el-radio label="6">财会人员</el-radio>
          <el-radio label="7">技术人员</el-radio>
          <el-radio label="8">服务业</el-radio>
          <el-radio label="9">科教文卫</el-radio>
          <el-radio label="10">行政管理</el-radio>
          <el-radio label="11">无业</el-radio>
          <el-radio label="12">其他</el-radio>
        </el-radio-group>
        <el-input v-model="infoForm.a1502" style="width: 100px"></el-input>
      </el-form-item>

      <el-form-item label="6.特殊工作环境">
        <el-radio-group v-model="infoForm.a16">
          <el-radio label="1">湿冷</el-radio>
          <el-radio label="2">夜班/熬夜</el-radio>
          <el-radio label="3">高温</el-radio>
          <el-radio label="4">低温</el-radio>
          <el-radio label="5">噪声</el-radio>
          <el-radio label="6">辐射</el-radio>
          <el-radio label="7">化工印染</el-radio>
          <el-radio label="8">剧烈运动</el-radio>
          <el-radio label="9">汽油</el-radio>
          <el-radio label="10">高空</el-radio>
          <el-radio label="11">无</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="7.病人现住址">
        <el-input v-model="infoForm.a17" placeholder="请填写"></el-input>
      </el-form-item>

      <el-form-item label="8.病人来源">
        <el-radio-group v-model="infoForm.a1801">
          <el-radio label="1">门诊</el-radio>
          <el-radio label="2">病房</el-radio>
          <el-radio label="3">其他</el-radio>
        </el-radio-group>
        <el-input v-model="infoForm.a1802" style="width: 100px"></el-input>
      </el-form-item>

      <el-form-item label="9.文化程度">
        <el-radio-group v-model="infoForm.a19">
          <el-radio label="1">未接受国家教育（文盲）</el-radio>
          <el-radio label="2">小学</el-radio>
          <el-radio label="3">初中</el-radio>
          <el-radio label="4">高中/中专</el-radio>
          <el-radio label="5">大专</el-radio>
          <el-radio label="6">本科</el-radio>
          <el-radio label="7">研究生及以上</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="10.饮食偏好">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.a2001[0]">无特殊</el-checkbox>
        <el-checkbox v-model="infoForm.a2001[1]">生冷</el-checkbox>
        <el-checkbox v-model="infoForm.a2001[2]">辛辣</el-checkbox>
        <el-checkbox v-model="infoForm.a2001[3]">素食</el-checkbox>
        <el-checkbox v-model="infoForm.a2001[4]"
          >含咖啡因食物或饮品</el-checkbox
        >
        <el-checkbox v-model="infoForm.a2001[5]">酸</el-checkbox>
        <el-checkbox v-model="infoForm.a2001[6]">甜</el-checkbox>
        <el-checkbox v-model="infoForm.a2001[7]">咸</el-checkbox>
        <el-checkbox v-model="infoForm.a2001[8]">油</el-checkbox>
        <el-checkbox v-model="infoForm.a2001[9]">其他</el-checkbox>
        <el-input v-model="infoForm.a2002"></el-input>
      </el-form-item>
      
      <h3>基本信息</h3>
      <el-form-item label="患者姓名1" prop="a02">
        <el-input v-model="infoForm.a02"></el-input>
      </el-form-item>

      <el-form-item label="就诊日期" prop="a03">
        <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
        <el-date-picker
          v-model="infoForm.a03"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="医院名称" prop="a0401">
        <el-input v-model="infoForm.a0401"></el-input>
      </el-form-item>
      <el-form-item label="医院所属" prop="a0402">
        <el-radio v-model="infoForm.a0402" label="1">省级医院</el-radio>
        <el-radio v-model="infoForm.a0402" label="2">市级医院</el-radio>
        <el-radio v-model="infoForm.a0402" label="3">区/县级医院</el-radio>
      </el-form-item>

      <el-form-item label="患者电话" prop="a05">
        <el-input v-model="infoForm.a05"></el-input>
      </el-form-item>

      <el-form-item label="填表专家姓名" prop="a06">
        <el-input v-model="infoForm.a06"></el-input>
      </el-form-item>

      <el-form-item label="填表专家电话" prop="a08">
        <el-input v-model="infoForm.a08"></el-input>
      </el-form-item>

      <el-form-item label="填表专家邮箱" prop="a09">
        <el-input v-model="infoForm.a09"></el-input>
      </el-form-item>

      <el-form-item label="填表专家职称" prop="a10">
        <el-select v-model="infoForm.a10" placeholder="请选择">
          <el-option label="主任医师" value="1"></el-option>
          <el-option label="副主任医师" value="2"></el-option>
          <el-option label="主治医师" value="3"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button
        :disabled="check_status == '审核通过'"
        type="primary"
        @click="updateInfoForm"
        >确定</el-button
      >
      <el-button @click="dialogVisible = false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj008";
export default {
  name: "InfoForm",
  data() {
    return {
      dialogVisible: false,
      infoForm: {
        a01: "",
        a02: "",
        a03: "",
        a0401: "",
        a0402: "",
        a05: "",
        a06: "",
        a07: "",
        a08: "",
        a09: "",
        a11: "",
        a12: "",
        a13: "",
        a1401: "",
        a1402: "",
        a1501: "",
        a1502: "",
        a16: "",
        a17: "",
        a1801: "",
        a1802: "",
        a19: "",
        a2001: [false,false,false,false,false,false,false,false,false,false],
        a2002: "",
      },
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      // rules: {
      //   a001: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      //   a002: [{ required: true, message: "请输入就诊日期", trigger: "blur" }],
      //   a003: [{ required: true, message: "请填写就诊医院名称" }],
      //   a004: [{ required: true, message: "请填写就诊医院所属级别" }],
      //   a005: [
      //     {
      //       required: true,
      //       pattern: /^1\d{10}$/,
      //       message: "请输入11位手机号码",
      //       trigger: "blur",
      //     },
      //   ],
      //   a006: [{ required: true, message: "请填写专家姓名" }],
      //   a017: [{ required: true, message: "请填写必填项" }],
      // },
    };
  },
  created() {
    this.$on("openEvent", (data) => {
      console.log("一般情况获取到的数据", data);



      this.dialogVisible = true;
      this.check_status = data.check_status;
      this.isOwnedByUser = data.isOwnedByUser;
      this.formName = data.formName;

      if ("id" in data.result) {
        this.infoForm = this.parseInfoForm(data.result);
      }
     
    });
  },
  methods: {
    //多选题的数组回显转换
    parseInfoForm(stringifyParams) {
      for (let key in stringifyParams) {
        let reg = /^\[.+\]$/;
        stringifyParams[key] = reg.test(stringifyParams[key])
          ? JSON.parse(stringifyParams[key])
          : stringifyParams[key];
      }
      return stringifyParams;
    },
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
.prj008-info {
  .el-input-group__append,
  .el-input-group__prepend {
    width: 50px;
  }
}
.prj008-dialog {
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
