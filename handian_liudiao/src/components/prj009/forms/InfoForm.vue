<template>
  <el-dialog
    title="一般资料"
    class="my-dialog prj009-dialog"
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
      <el-form-item label="患者姓名1" prop="a02">
        <el-input v-model="infoForm.a02"></el-input>
      </el-form-item>

      <el-form-item label="患者出生年月">
        <el-date-picker
          v-model="infoForm.a11"
          type="month"
          placeholder="选择日期"
          format="yyyy 年 MM 月"
          value-format="yyyy-MM"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="年龄">
         <el-input-number v-model="infoForm.a14"/>
      </el-form-item>

      <el-form-item label="民族">
         <el-select v-model="infoForm.a15" placeholder="请选择">
          <el-option v-for="item in nationSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="常住地(省市)">
        <el-input v-model="infoForm.a16" placeholder="请填写"></el-input>
      </el-form-item>
      
      <el-form-item label="患者电话" prop="a05">
        <el-input v-model="infoForm.a05"></el-input>
      </el-form-item>

      <el-form-item label="文化程度">
        <el-radio-group v-model="infoForm.a17">
          <el-radio label="3">初中及初中以下</el-radio>
          <el-radio label="4">高中</el-radio>
          <el-radio label="5">大中专</el-radio>
          <el-radio label="6">本科</el-radio>
          <el-radio label="7">硕士及以上</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="婚姻状况">
        <el-radio-group v-model="infoForm.a18">
          <el-radio label="1">未婚，有性生活</el-radio>
          <el-radio label="2">未婚，无性生活</el-radio>
          <el-radio label="3">已婚</el-radio>
          <el-radio label="4">离婚</el-radio>
          <el-radio label="5">丧偶</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="职业情况">
        <el-radio v-model="infoForm.a19" label="1">学生</el-radio>
        <el-radio v-model="infoForm.a19" label="2">个体</el-radio>
        <el-radio v-model="infoForm.a19" label="3">农民</el-radio>
        <el-radio v-model="infoForm.a19" label="4">军人</el-radio>
        <el-radio v-model="infoForm.a19" label="5">工人</el-radio>
        <el-radio v-model="infoForm.a19" label="6">财会</el-radio>
        <el-radio v-model="infoForm.a19" label="7">技术</el-radio>
        <el-radio v-model="infoForm.a19" label="8">服务业</el-radio>
        <el-radio v-model="infoForm.a19" label="9">科教文卫</el-radio>
        <el-radio v-model="infoForm.a19" label="10">行政</el-radio>
        <el-radio v-model="infoForm.a19" label="11">无业</el-radio>
        <el-radio v-model="infoForm.a19" label="12">其他</el-radio>
      </el-form-item>

      <el-form-item label="经济状况">
        <el-radio-group v-model="infoForm.a20">
          <el-radio label="1">较好</el-radio>
          <el-radio label="2">一般</el-radio>
          <el-radio label="3">差</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="身高">
        <el-input-number   v-model="infoForm.a12"  controls-position="right"  :min="1" :max="200" /> CM 
      </el-form-item>

      <el-form-item label="体重">
        <el-input-number v-model="infoForm.a13" controls-position="right"  :precision="1"  :min="1" :max="200"/> KG  (限一位小数)
      </el-form-item>

      <el-form-item label="BMI">
        <el-input-number v-model="infoForm.a21" controls-position="right"  :precision="2"  :min="1" :max="200"></el-input-number> 体重(kg)/身高（米）的平方 (限二位小数)
      </el-form-item>

      <el-form-item label="腰围">
        <el-input-number v-model="infoForm.a22" controls-position="right"  :precision="1"  :min="1" :max="100"/> cm (限一位小数)
      </el-form-item>

      <el-form-item label="臀围">
        <el-input-number v-model="infoForm.a23" controls-position="right"  :precision="1"  :min="1" :max="100"/> cm (限一位小数)
      </el-form-item>

      <el-form-item label="血压">
        <el-input-number v-model="infoForm.a24" controls-position="right" :min="1"  :max="300"/> mmHg
      </el-form-item>

      <el-form-item label="脉搏">
        <el-input-number v-model="infoForm.a25" controls-position="right" :min="1"  :max="300"/> 次/分
      </el-form-item>      
       
      <h3>基本信息</h3>

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

      <el-form-item label="填表专家姓名" prop="a06">
        <el-input v-model="infoForm.a06"></el-input>
      </el-form-item>

      <el-form-item label="填表专家电话" prop="a07">
        <el-input v-model="infoForm.a08"></el-input>
      </el-form-item>

      <el-form-item label="填表专家邮箱" prop="a08">
        <el-input v-model="infoForm.a09"></el-input>
      </el-form-item>

      <el-form-item label="填表专家职称" prop="a09">
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
import { apiUpdatePatientDataForm } from "@/api/api-prj009";
export default {
  name: "InfoForm",
  data() {
    return {
      dialogVisible: false,
      "nationSelection": ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族",
                        "瑶族","白族","土家族","哈尼族","哈萨克族","傣族","黎族","傈傈族","佤族","畲族","高山族","拉祜族",
                        "水族","东乡族","纳西族","景颇族","科尔克孜族","土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族",
                        "毛难族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族","乌孜别克族","俄罗斯族","鄂温克族",
                        "崩龙族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族","其它"],
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
        a12: 0.0,
        a13: 0.0,
        a14: 0,        
        a15: '',
        a16: '',
        a17: 0,
        a18: 0,
        a19: 0,
        a20: 0,
        a21: 0.00,
        a22: 0.0,
        a23: 0.0,
        a24: 0,
        a25: 0      
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
        this.infoForm = data.result;
      }
     
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
