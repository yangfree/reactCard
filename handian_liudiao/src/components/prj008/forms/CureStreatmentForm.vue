<template>
  <el-dialog
    title="疗效"
    class="my-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="200px" label-position="left">
      <el-alert
        v-if="check_status=='审核通过'"
        title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <el-divider v-if="check_status=='审核通过'"></el-divider>

      <!-- 表格开始 -->
      <el-form-item label="1.结束就诊日期">
          <el-date-picker  v-model="infoForm.g0101" type="date" placeholder="选择日期">     </el-date-picker>        
          
            总疗程: &nbsp; <el-input-number v-model="infoForm.g0102" :min="1" :max="10" ></el-input-number> 天，
          
      </el-form-item>
      <el-form-item label="2.近期疗效">        
          <div>
            妊娠时间大于孕12周整:
            <el-radio v-model="infoForm.g0201" label="1">是</el-radio>
            <el-radio v-model="infoForm.g0201" label="2">否</el-radio>
          </div>
           <div>
            再次妊娠超过既往流产最长孕周:
            <el-radio v-model="infoForm.g0202" label="1">是</el-radio>
            <el-radio v-model="infoForm.g0202" label="2">否</el-radio>
          </div>    
      </el-form-item>
      <el-form-item label="3.远期疗效">        
          <div>
            足月分娩(活婴获得):&nbsp;
            <el-radio v-model="infoForm.g0301" label="1">否</el-radio>
            <el-radio v-model="infoForm.g0301" label="2">是</el-radio>
          </div>
           <div>
            分娩方式:&nbsp;
            <el-radio v-model="infoForm.g0302" label="1">剖宫产</el-radio>
            <el-radio v-model="infoForm.g0302" label="2">否</el-radio>
          </div>    
      </el-form-item>
      <el-form-item label="4.妊娠合并症:">
        <el-row>         
            <el-radio v-model="infoForm.g0401" label="1">无</el-radio>
            <el-radio v-model="infoForm.g0401" label="2">高血压</el-radio>
            <el-radio v-model="infoForm.g0401" label="3">糖尿病</el-radio>
            <el-radio v-model="infoForm.g0401" label="4">肝功能受损</el-radio>
            <el-radio v-model="infoForm.g0401" label="5">甲状腺功能减退</el-radio>
            <el-radio v-model="infoForm.g0401" label="6">其他</el-radio>
        </el-row>
        <el-row>
            <el-input v-model="infoForm.g0402" maxlength="50" show-word-limit placeholder="其他"></el-input>
        </el-row>      
      </el-form-item>
      <el-form-item label="5.新生儿Apgar评分：">
          <el-input-number v-model="infoForm.g05" :min="1" :max="100" ></el-input-number> 分
      </el-form-item>

    </el-form>
    <!-- <div class="alert-info" style="text-align:center;color: red;width: 100%;">*** 本表格所有选项均为必填信息 ***</div> -->
    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj008";

export default {
  name: "CureStreatmentForm",
  data() {
    return {
      infoForm: {
        g0101: '',
        g0201: 0,
        g0202:  0,
        g0301: 0,
        g0302: 0,
        g0401: 0,
        g0402: '',
        g05:0
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
      console.log("辅助检查数据: ", data);
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
    }
  }
};
</script>
