<template>
  <el-dialog
    title="既往史"
    class="my-dialog summary-dialog prj00g-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="100%"
    center
  >
    <el-form ref="summaryForm" :model="infoForm" label-width="200px" label-position="left">
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
      <p></p>
      <el-alert
        v-if="!isOwnedByUser"
        effect="dark"
        title="此条信息为其他用户创建，您无法修改"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>

      <!-- 表格内容开始 -->
      <el-form-item label="1. 是否患有妇科疾病">
        <el-radio v-model="infoForm.d01" label="1">是</el-radio>
        <el-radio v-model="infoForm.d01" label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="2.患有以下哪种妇科疾病">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.d0201[0]">子宫肌瘤</el-checkbox>
        <el-checkbox v-model="infoForm.d0201[1]">子宫内膜息肉</el-checkbox>
        <el-checkbox v-model="infoForm.d0201[2]">子宫内膜增生</el-checkbox>
        <el-checkbox v-model="infoForm.d0201[3]">子宫内膜炎</el-checkbox> <br/>
        <el-checkbox v-model="infoForm.d0201[4]">子宫内膜癌</el-checkbox>
        <el-checkbox v-model="infoForm.d0201[5]">多囊卵巢综合征</el-checkbox>
        <el-checkbox v-model="infoForm.d0201[6]">高泌乳素血症</el-checkbox>
        <el-checkbox v-model="infoForm.d0201[7]">其他卵巢良性囊肿</el-checkbox>  <br/>
        <el-checkbox v-model="infoForm.d0201[8]">卵巢早衰</el-checkbox>
        <el-checkbox v-model="infoForm.d0201[9]">卵巢恶性肿瘤</el-checkbox>
        <el-checkbox v-model="infoForm.d0201[10]">盆腔炎</el-checkbox>
        <el-checkbox v-model="infoForm.d0201[11]">盆腔结核</el-checkbox> 
        <el-checkbox v-model="infoForm.d0201[12]">其他</el-checkbox>
        <el-input v-model="infoForm.d0202" maxlength="50" show-word-limit placeholder="其他"></el-input> 
      </el-form-item>

      <el-form-item label="3. 否贫血">
        <el-radio v-model="infoForm.d03" label="1">是</el-radio>
        <el-radio v-model="infoForm.d03" label="2">否</el-radio>
      </el-form-item>
            
      <el-form-item label="4. 是否有肥胖史">
        <el-radio v-model="infoForm.d04" label="1">是</el-radio>
        <el-radio v-model="infoForm.d04" label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="5. 是否有高血压史">
        <el-radio v-model="infoForm.d05" label="1">是</el-radio>
        <el-radio v-model="infoForm.d05" label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="6. 是否有高血脂">
        <el-radio v-model="infoForm.d06" label="1">是</el-radio>
        <el-radio v-model="infoForm.d06" label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="7. 是否有脂肪肝">
        <el-radio v-model="infoForm.d07" label="1">是</el-radio>
        <el-radio v-model="infoForm.d07" label="2">否</el-radio>
      </el-form-item>
            
      <el-form-item label="8. 是否有冠心病">
        <el-radio v-model="infoForm.d08" label="1">是</el-radio>
        <el-radio v-model="infoForm.d08" label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="9. 是否有糖尿病">
        <el-radio v-model="infoForm.d09" label="1">是</el-radio>
        <el-radio v-model="infoForm.d09" label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="10. 是否有肝炎">
        <el-radio v-model="infoForm.d10" label="1">是</el-radio>
        <el-radio v-model="infoForm.d10" label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="11. 是否有结核">
        <el-radio v-model="infoForm.d11" label="1">是</el-radio>
        <el-radio v-model="infoForm.d11" label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="12. 是否有甲状腺疾病">
        <el-radio v-model="infoForm.d12" label="1">是</el-radio>
        <el-radio v-model="infoForm.d12" label="2">否</el-radio>
      </el-form-item>

       <el-form-item label="13.患有哪种甲状腺疾病">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.d13[0]">甲状腺功能亢进</el-checkbox>
          <el-checkbox v-model="infoForm.d13[1]">甲状腺功能减退</el-checkbox>
          <el-checkbox v-model="infoForm.d13[2]">甲状腺结节</el-checkbox>
          <el-checkbox v-model="infoForm.d13[3]">桥本氏甲状腺炎</el-checkbox>
          <el-checkbox v-model="infoForm.d13[4]">甲状腺癌</el-checkbox>
          <el-checkbox v-model="infoForm.d13[5]">无</el-checkbox>
        </el-form-item>

      <el-form-item label="14. 是否有乳腺疾病">
        <el-radio v-model="infoForm.d14" label="1">是</el-radio>
        <el-radio v-model="infoForm.d14" label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="15.患有哪种乳腺疾病">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.d15[0]">乳腺结节</el-checkbox>
        <el-checkbox v-model="infoForm.d15[1]">乳腺增生</el-checkbox>
        <el-checkbox v-model="infoForm.d15[2]">乳腺癌</el-checkbox>
      </el-form-item>

      <el-form-item label="16.患有下列哪种疾病">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.d1601[0]">抑郁状态</el-checkbox>
        <el-checkbox v-model="infoForm.d1601[1]">焦虑状态</el-checkbox>
        <el-checkbox v-model="infoForm.d1601[2]">血液系统相关疾病</el-checkbox>
        <el-checkbox v-model="infoForm.d1601[3]">其他</el-checkbox>
        <el-input v-model="infoForm.d1602" maxlength="50" show-word-limit placeholder="其他"></el-input> 
      </el-form-item>

      <el-form-item label="17.手术史">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.d1701[0]">子宫肌瘤剔除术</el-checkbox>
        <el-checkbox v-model="infoForm.d1701[1]">其他卵巢囊肿剥除术</el-checkbox>
        <el-checkbox v-model="infoForm.d1701[2]">子宫内膜息肉切除术</el-checkbox>
        <el-checkbox v-model="infoForm.d1701[3]">子宫内膜诊刮术</el-checkbox>
        <el-checkbox v-model="infoForm.d1701[4]">输卵管通液、造影术</el-checkbox>
        <el-checkbox v-model="infoForm.d1701[5]">其他</el-checkbox>
        <el-checkbox v-model="infoForm.d1701[6]">无</el-checkbox>
        <el-input v-model="infoForm.d1702" maxlength="50" show-word-limit placeholder="其他"></el-input> 
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button
        type="primary"
        :disabled="check_status=='审核通过'"
        v-if="exist"
        @click="updateSummaryForm"
      >确定</el-button>
      <el-button type="primary" v-else @click="createSummaryForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiGetHideCode } from "@/api/api-prj00g";
export default {
  name: "SummaryForm",
  data() {
    return {
      infoForm: {
        d01: 0,
        d0201: [
          false,          false,          false,          false,
          false,          false,          false,          false,
          false,          false,          false,          false,
          false
        ],
        d0202: "",
        d03: 0,
        d04: 0,
        d05: 0,
        d06: 0,
        d07: 0,
        d08: 0,
        d09: 0,
        d10: 0,
        d11: 0,
        d12: 0,      
        d13: [false, false, false, false, false, false],        
        d14: 0,
        d15: [false, false, false],
        d1601: [false, false, false,false],
        d1602: '',
        d1701:[false, false, false,false,false, false, false],
        d1702:''
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
      console.log("既往史的数据:", data);
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
    updateSummaryForm() {
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
.prj00g-summary {
  .el-input-group__append,
  .el-input-group__prepend {
    width: 35px;
  }
  .el-input-group > .el-input__inner {
    vertical-align: middle;
    display: initial;
  }
}

.prj00g-dialog {
  h4 {
    color: cornflowerblue;
  }
}
</style>

