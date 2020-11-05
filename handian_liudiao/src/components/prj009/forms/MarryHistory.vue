<template>
  <el-dialog
    title="婚育史"
    class="my-dialog prj009-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="120px" label-position="left">
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
      
      <h3>婚姻史</h3>

      <el-row :gutter="20">
        <el-radio v-model="infoForm.d01" label="1">未婚无性生活</el-radio>
        <el-radio v-model="infoForm.d01" label="2">未婚有性生活</el-radio>
        <el-radio v-model="infoForm.d01" label="3">已婚同居</el-radio>
        <el-radio v-model="infoForm.d01" label="4">已婚分居</el-radio>
        <el-radio v-model="infoForm.d01" label="5">离婚</el-radio>
      </el-row>  

      <div v-show="infoForm.d01 !=1">
        <h3>孕产史</h3>
       
     
      <el-form-item label="1.生育史">      
         <el-row>
           <el-col :span="6">妊娠次数:</el-col>
           <el-col :span="6"> <el-input-number   v-model="infoForm.d0201"  :min="0" :max="200" /> 次 </el-col>
         </el-row>

          <el-row>
            <el-col :span="6">生产次数: </el-col>
            <el-col :span="6"><el-input-number   v-model="infoForm.d0202"  :min="0" :max="200" /> 次 </el-col>
         </el-row>
         
          <el-row>
            <el-col :span="6">剖腹产: </el-col>
            <el-col :span="6"><el-input-number   v-model="infoForm.d0203"  :min="0" :max="200" /> 次 </el-col>
         </el-row>

          <el-row>
            <el-col :span="6">顺产: </el-col>
            <el-col :span="6"><el-input-number   v-model="infoForm.d0204"  :min="0" :max="200" /> 次 </el-col>
         </el-row>

          <el-row>
            <el-col :span="6">人流次数: </el-col>
            <el-col :span="6"><el-input-number   v-model="infoForm.d0205"  :min="0" :max="200" /> 次 </el-col>
         </el-row>

          <el-row>
            <el-col :span="6">药流次数: </el-col>
            <el-col :span="6"><el-input-number   v-model="infoForm.d0206"  :min="0" :max="200" /> 次 </el-col>
         </el-row>
      </el-form-item>
 
      <el-form-item label="2.避孕方式">
        <el-radio v-model="infoForm.d03" label="1">避孕套</el-radio>
        <el-radio v-model="infoForm.d03" label="2">避孕药</el-radio>
        <el-radio v-model="infoForm.d03" label="3">上环</el-radio>
        <el-radio v-model="infoForm.d03" label="4">结扎</el-radio>
        <el-radio v-model="infoForm.d03" label="5">体外射精</el-radio>
        <el-radio v-model="infoForm.d03" label="6">安全期</el-radio>
        <el-radio v-model="infoForm.d03" label="7">现未避孕</el-radio>
        <el-radio v-model="infoForm.d03" label="8">近期无性生活史</el-radio>
      </el-form-item>

      <el-form-item label="3.促排卵治疗 ">
        <el-row>是否应用过？</el-row> 
        <el-radio v-model="infoForm.d04" label="1">否</el-radio> <br/>
        <el-tag>是</el-tag>
        <el-radio v-model="infoForm.d04" label="2">未成功</el-radio>
        <el-radio v-model="infoForm.d04" label="3">已成功受孕</el-radio>
        <el-radio v-model="infoForm.d04" label="4">已成功生产</el-radio>
      </el-form-item>

      <el-form-item label="4.是否生产过？">
        <el-radio v-model="infoForm.d0501" label="1">否</el-radio>
        <el-radio v-model="infoForm.d0501" label="2">人工授精</el-radio>
        <el-radio v-model="infoForm.d0501" label="3">试管婴儿</el-radio>
        <el-radio v-model="infoForm.d0501" label="4">其他</el-radio>
        <el-input v-model="infoForm.d0502" maxlength="50" show-word-limit placeholder="注明其他"/> 
      </el-form-item>

      <div v-show="infoForm.d0501 ==2">
        <el-form-item label="5.人工授精">
          <el-radio v-model="infoForm.d0503" label="1">未成功</el-radio>
          <el-radio v-model="infoForm.d0503" label="2">已成功受孕</el-radio>
          <el-radio v-model="infoForm.d0503" label="3">已成功生产</el-radio>
        </el-form-item>
      </div>
      <div  v-show="infoForm.d0501 ==3">
      <el-form-item label="6.试管婴儿">              
        <el-radio v-model="infoForm.d0504" label="1">未成功</el-radio>
        <el-radio v-model="infoForm.d0504" label="2">已成功受孕</el-radio>
        <el-radio v-model="infoForm.d0504" label="3">已成功生产</el-radio>
      </el-form-item>
      </div>      



     </div> 
    </el-form>
    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiGetHideCode } from "@/api/api-prj009";
export default {
  name: "MarryHistory",
  data() {
    return {
      dialogVisible: false,
      infoForm: {
        c01: 0,
        c02: 0,
        c03: 0,
        c04: 0,
        c05: 0,
        c0601: 0,
        c0602: 0,
        c0603: 0,
        c0604: 0,
        c0605: 0,
        c0607: 0,
        c0608: 0,
        c0609: 0,
        c0610: 0,
        c0611: 0,       
        c07: 0,
        c08:[false, false, false],
        c09:0,
        c1001:[false, false, false],
        c1002:'',
        c1101: [false, false, false, false, false,  false, false, false],
        c1102: "",
        c12:[false, false, false],
        c13:[false, false, false]       
      },
      _id: "",
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: ""     
    };
  },
  created() {
    this.$on("openEvent", (data) => {
      console.log("婚育史", data);
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
