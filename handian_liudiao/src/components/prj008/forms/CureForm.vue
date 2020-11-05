<template>
  <el-dialog
    title="治疗"
    class="my-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="100%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="250px" label-position="left">
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
      <p></p>

<el-form-item label="1.中西医结合治疗:">
 <el-radio v-model="infoForm.f01" label="1">是</el-radio>
 <el-radio v-model="infoForm.f01" label="2">否</el-radio>
</el-form-item>
      <el-form-item label="2.中医治疗:">
        <el-radio v-model="infoForm.f02" label="1">补肾安胎</el-radio>
        <el-radio v-model="infoForm.f02" label="2">补肾健脾安胎</el-radio>
        <el-radio v-model="infoForm.f02" label="3">益气养血安胎</el-radio>
        <el-radio v-model="infoForm.f02" label="4">活血祛瘀安胎</el-radio>
        <el-radio v-model="infoForm.f02" label="5">清热凉血安胎</el-radio>
        <el-radio v-model="infoForm.f02" label="6">补肾活血安胎</el-radio>
        <el-radio v-model="infoForm.f02" label="7">滋阴凉血安胎</el-radio>
        <el-radio v-model="infoForm.f02" label="8">补气活血安胎</el-radio>
        <el-radio v-model="infoForm.f02" label="9">其他</el-radio>
      </el-form-item>

      <el-form-item label="3.代表方:">
        <el-radio v-model="infoForm.f03" label="1">寿胎丸</el-radio>
        <el-radio v-model="infoForm.f03" label="2">泰山磐石散</el-radio>
        <el-radio v-model="infoForm.f03" label="3">胎元饮</el-radio>
        <el-radio v-model="infoForm.f03" label="4">少腹逐瘀汤或桂枝茯苓丸</el-radio>
        <el-radio v-model="infoForm.f03" label="5">保阴煎</el-radio>
        <el-radio v-model="infoForm.f03" label="6">寿胎丸合四物汤</el-radio>
        <el-radio v-model="infoForm.f03" label="7">寿胎丸合保阴煎</el-radio>
        <el-radio v-model="infoForm.f03" label="8">加味圣愈汤</el-radio>
        <el-radio v-model="infoForm.f03" label="9">其他</el-radio>
      </el-form-item>

      <el-form-item label="4.成药:">
        <el-radio v-model="infoForm.f0401" label="1">否</el-radio>
        <el-radio v-model="infoForm.f0401" label="2">滋肾育胎丸</el-radio>
        <el-radio v-model="infoForm.f0401" label="3">乐孕宁口服液</el-radio>
        <el-radio v-model="infoForm.f0401" label="4">保灵孕宝口服液</el-radio>
        <el-radio v-model="infoForm.f0401" label="5">人胎盘片</el-radio>
        <el-radio v-model="infoForm.f0401" label="6">胚宝胶囊</el-radio>
        <el-radio v-model="infoForm.f0401" label="7">孕康口服液</el-radio>
        <el-radio v-model="infoForm.f0401" label="8">其他</el-radio>
        <el-input v-model="infoForm.f0402" maxlength="50" show-word-limit placeholder="其他"></el-input> 
      </el-form-item>

      <el-form-item label="5.中医其他治疗:">
        <el-radio v-model="infoForm.f0501" label="1">否</el-radio>
        <el-radio v-model="infoForm.f0501" label="2">滋肾育胎丸</el-radio>
        <el-radio v-model="infoForm.f0501" label="3">乐孕宁口服液</el-radio>
        <el-radio v-model="infoForm.f0501" label="4">保灵孕宝口服液</el-radio>
        <el-radio v-model="infoForm.f0501" label="5">人胎盘片</el-radio>
        <el-radio v-model="infoForm.f0501" label="6">胚宝胶囊</el-radio>
        <el-radio v-model="infoForm.f0501" label="7">孕康口服液</el-radio>
        <el-radio v-model="infoForm.f0501" label="8">其他</el-radio>
        <el-input v-model="infoForm.f0502" maxlength="50" show-word-limit placeholder="其他"></el-input> 
      </el-form-item>

      <el-form-item label="6.西医治疗:">
        <el-radio v-model="infoForm.f0601" label="1">否</el-radio>
        <el-radio v-model="infoForm.f0601" label="2">是</el-radio>
        <el-input v-model="infoForm.f0602" maxlength="200" show-word-limit placeholder="如有使用药物，请标明药物剂量，用量，疗程，有无不良反应"></el-input> 
      </el-form-item>
      
      <el-form-item label="6-1.性激素:">
        <el-radio v-model="infoForm.f0603" label="1">否</el-radio>
        <el-radio v-model="infoForm.f0603" label="2">肌注黄体酮</el-radio>
        <el-radio v-model="infoForm.f0603" label="3">地屈孕酮</el-radio>
        <el-radio v-model="infoForm.f0603" label="4">微粒化黄体酮胶囊</el-radio>
        <el-radio v-model="infoForm.f0603" label="5">阴道用黄体酮凝胶</el-radio>
        <el-radio v-model="infoForm.f0603" label="6">其他</el-radio>
        <el-radio v-model="infoForm.f0603" label="7">戊酸雌二醇</el-radio>
        <el-radio v-model="infoForm.f0603" label="8">雌孕激素复合制剂:</el-radio>
        <el-radio v-model="infoForm.f0603" label="9">雌二醇地屈孕酮片</el-radio>
        <el-radio v-model="infoForm.f0603" label="10">绒促性素针</el-radio>
        <el-radio v-model="infoForm.f0603" label="11">其他</el-radio>
      </el-form-item>


      <el-divider content-position="left">6-2：免疫治疗</el-divider>
        <el-form-item label="6-2-1.调节免疫药物:">
        <el-radio v-model="infoForm.f0604" label="1">无</el-radio>
        <el-radio v-model="infoForm.f0604" label="2">泼尼松</el-radio>
        <el-radio v-model="infoForm.f0604" label="3">美卓乐</el-radio>
        <el-radio v-model="infoForm.f0604" label="4">羟氯喹</el-radio>
        <el-radio v-model="infoForm.f0604" label="5">环孢素</el-radio>
        <el-radio v-model="infoForm.f0604" label="6">其他</el-radio>
      </el-form-item>

      <el-form-item label="6-2-2.主动免疫治疗:">
        <el-radio v-model="infoForm.f0605" label="1">无</el-radio>
        <el-radio v-model="infoForm.f0605" label="2">配偶外周血淋巴细胞</el-radio>
        <el-radio v-model="infoForm.f0605" label="3">第三方外周血淋巴细胞</el-radio>
        <el-radio v-model="infoForm.f0605" label="4">其他</el-radio>
      </el-form-item>

      <el-form-item label="6-2-3.被动免疫治疗:">
        <el-radio v-model="infoForm.f0606" label="1">无</el-radio>
        <el-radio v-model="infoForm.f0606" label="2">免疫球蛋白注射</el-radio>
        <el-radio v-model="infoForm.f0606" label="3">其他</el-radio>
      </el-form-item>

      <el-form-item label="6-3.抗凝治疗:">
        <el-radio v-model="infoForm.f0607" label="1">无</el-radio>
        <el-radio v-model="infoForm.f0607" label="2">阿司匹林</el-radio>
        <el-radio v-model="infoForm.f0607" label="3">低分子肝素</el-radio>
        <el-radio v-model="infoForm.f0607" label="4">其他</el-radio>
      </el-form-item>

      <el-form-item label="6-4.辅助生殖技术:">
        <el-radio v-model="infoForm.f0608" label="1">无</el-radio>
        <el-radio v-model="infoForm.f0608" label="2">有</el-radio>
      </el-form-item>

      <el-form-item label="6-5.孕前有无手术治疗:">
        <el-radio v-model="infoForm.f0609" label="1">无 </el-radio>
        <el-radio v-model="infoForm.f0609" label="2">宫腔镜粘连分离术</el-radio>         
        <el-radio v-model="infoForm.f0609" label="3">宫腔镜息肉摘除术</el-radio>
        <el-radio v-model="infoForm.f0609" label="4">宫腹腔镜手术</el-radio>
        <el-radio v-model="infoForm.f0609" label="5">其他</el-radio>
      </el-form-item>

      <el-divider content-position="left">7.其他治疗</el-divider>

      <el-form-item label="各种具体用药情况:">
        <el-input v-model="infoForm.f07" maxlength="200" show-word-limit placeholder="如有使用药物，请标明药物剂量，用量，疗程，有无不良反应"></el-input> 
      </el-form-item>

    </el-form>

    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj008";

export default {
  name: "CureForm",
  data() {
    return {
      infoForm: {
        f01: 0,
        f02: 0,
        f03: 0,
        f0401: 0,
        f0402: '',
        f0501: 0,
        f0502: '',     
        f0601: 0,
        f0602: '',
        f0603: 0,
        f0604: 0,      
        f0605: 0,
        f0606: 0,       
        f0607: 0,      
        f0608: 0,
        f0609: 0, 
        f07: ''
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
      console.log("既往治疗情况数据: ", data);
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
<style lang="">
</style>
