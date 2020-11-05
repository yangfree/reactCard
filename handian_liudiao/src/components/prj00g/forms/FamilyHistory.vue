<template>
  <el-dialog
    title="家族史"
    class="my-dialog prj00g-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="200px" label-position="left">
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
      <el-form-item label="1. 家族中是否有人患子宫肌瘤">
          <el-radio v-model="infoForm.e01" label="1">是</el-radio>
          <el-radio v-model="infoForm.e01" label="2">否（跳至3题）</el-radio>
      </el-form-item>


        <el-form-item label="2.哪位亲属患有子宫肌瘤">
          <el-tag type="danger" size="mini">多选</el-tag>
          一级亲属
          <el-checkbox v-model="infoForm.e02[0]">母亲</el-checkbox>
          <el-checkbox v-model="infoForm.e02[1]">姐姐</el-checkbox>
          <el-checkbox v-model="infoForm.e02[2]">妹妹</el-checkbox>
          <el-checkbox v-model="infoForm.e02[3]">女儿</el-checkbox>
          <br />二级亲属
          <el-checkbox v-model="infoForm.e02[4]">姑</el-checkbox>
          <el-checkbox v-model="infoForm.e02[5]">姨</el-checkbox>
          <el-checkbox v-model="infoForm.e02[6]">祖母</el-checkbox>
          <el-checkbox v-model="infoForm.e02[7]">外祖母</el-checkbox>
          <br />三级亲属
          <el-checkbox v-model="infoForm.e02[8]">堂姐</el-checkbox>
          <el-checkbox v-model="infoForm.e02[9]">堂妹</el-checkbox>
          <el-checkbox v-model="infoForm.e02[10]">表姐</el-checkbox>
          <el-checkbox v-model="infoForm.e02[11]">表妹</el-checkbox>
        </el-form-item>

    <el-form-item label="3. 一级亲属">
       <el-row>
        （母亲、姐妹、女儿）是否有以下疾病？
       </el-row>
      <el-row>
        <el-checkbox v-model="infoForm.e03[0]">子宫内膜息肉</el-checkbox>
        <el-checkbox v-model="infoForm.e03[1]">子宫肌瘤</el-checkbox>
        <el-checkbox v-model="infoForm.e03[2]">痛经史</el-checkbox>
        <el-checkbox v-model="infoForm.e03[3]">多囊卵巢综合征</el-checkbox>
        <el-checkbox v-model="infoForm.e03[4]">子宫内膜异位症</el-checkbox>
        <el-checkbox v-model="infoForm.e03[5]">乳腺疾病</el-checkbox>
        <el-checkbox v-model="infoForm.e03[6]">甲状腺疾病</el-checkbox>
        <el-checkbox v-model="infoForm.e03[7]">无</el-checkbox>
        <el-checkbox v-model="infoForm.e03[8]">不详</el-checkbox>   
      </el-row>  
    </el-form-item>   

     <el-form-item label="4. 二级亲属">
       <el-row>
        （姑、姨、祖母、外祖母）是否有以下疾病？
       </el-row>
      <el-row>
        <el-checkbox v-model="infoForm.e04[0]">子宫内膜息肉</el-checkbox>
        <el-checkbox v-model="infoForm.e04[1]">子宫肌瘤</el-checkbox>
        <el-checkbox v-model="infoForm.e04[2]">痛经史</el-checkbox>
        <el-checkbox v-model="infoForm.e04[3]">多囊卵巢综合征</el-checkbox>
        <el-checkbox v-model="infoForm.e04[4]">子宫内膜异位症</el-checkbox>
        <el-checkbox v-model="infoForm.e04[5]">乳腺疾病</el-checkbox>
        <el-checkbox v-model="infoForm.e04[6]">甲状腺疾病</el-checkbox>
        <el-checkbox v-model="infoForm.e04[7]">无</el-checkbox>
        <el-checkbox v-model="infoForm.e04[8]">不详</el-checkbox> 
      </el-row>  
    </el-form-item>   

     <el-form-item label="5. 三级亲属">
       <el-row>
        （堂/表姐妹）是否有以下疾病？
       </el-row>
      <el-row>
        <el-checkbox v-model="infoForm.e05[0]">子宫内膜息肉</el-checkbox>
        <el-checkbox v-model="infoForm.e05[1]">子宫肌瘤</el-checkbox>
        <el-checkbox v-model="infoForm.e05[2]">痛经史</el-checkbox>
        <el-checkbox v-model="infoForm.e05[3]">多囊卵巢综合征</el-checkbox>
        <el-checkbox v-model="infoForm.e05[4]">子宫内膜异位症</el-checkbox>
        <el-checkbox v-model="infoForm.e05[5]">乳腺疾病</el-checkbox>
        <el-checkbox v-model="infoForm.e05[6]">甲状腺疾病</el-checkbox>
        <el-checkbox v-model="infoForm.e05[7]">无</el-checkbox>
        <el-checkbox v-model="infoForm.e05[8]">不详</el-checkbox>  
      </el-row>  
    </el-form-item>   

      <el-form-item label="6.其他重要家族史">
        <el-input v-model="infoForm.e06" maxlength="100" show-word-limit placeholder="请填写"/>
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
  name: "FamilyHistory",
  data() {
    return {
      infoForm: {
        e01: 0,
        e02: [false,false,false,false,false,  false,false,false,false,false,    false,false],
        e03: [false,false,false,false,false,  false,false,false,false],
        e04: [false,false,false,false,false,  false,false,false,false],
        e05: [false,false,false,false,false,  false,false,false,false],
        e06: ''
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
    this.$on("openEvent", data => {
      console.log("家族史数据:", data);
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
        formName: this.formName
      })
        .then(res => {
          if (res.detail) {
            this.$message({
              message: res.detail,
              type: "error"
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
    }
  }
};
</script>
<style lang="scss">
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
