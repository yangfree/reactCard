<template>
  <el-dialog title="临床诊断" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="clinicalForm" :model="clinicalForm" label-width="140px" label-position="left">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-alert v-if="check_status=='已提交'" effect="dark"
                        title="此条信息已经提交审核,无法更改。如需修改, 请更改审核状态"
                        type="warning" :closable="false" show-icon>
      </el-alert>
      <el-alert v-if="!isOwnedByUser" effect="dark"
                  title="此条信息为其他用户创建，您无法修改"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-divider></el-divider>
      <h3>中医诊断</h3>
      <el-form-item label="痛经" >
        <el-radio-group v-model="clinicalForm.zhong_tongjing">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <!--
          <el-switch v-model="clinicalForm.zhong_tongjing" active-text="是" inactive-text="否"></el-switch>
          -->
      </el-form-item>
      <el-form-item label="辨证分型">
        <el-radio-group v-model="bianzheng_result" @change="changebianzheng">
          <el-radio class="radio" label="实证">实证</el-radio>
          <el-radio class="radio" label="虚证">虚证</el-radio>
          <el-radio class="radio" label="虚实夹杂证">虚实夹杂证</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="result_shizheng" label="实证" >
        <el-radio v-model="clinicalForm.shizheng"
                  v-for="item in shizheng"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="clinicalForm.shizheng_qita"  placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item  v-show="result_xuzheng" label="虚证">
        <el-radio v-model="clinicalForm.xuzheng"
                  v-for="item in xuzheng"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="clinicalForm.xuzheng_qita"  placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item  v-show="result_xushi"  label="虚实夹杂证">
        <el-input v-model="clinicalForm.xushi" ></el-input>
      </el-form-item>

      <h3>西医诊断</h3>
      <el-form-item label="原发性痛经" >
        <el-radio-group v-model="clinicalForm.xi_tongjing">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <!--
          <el-switch v-model="clinicalForm.xi_tongjing" active-text="是" inactive-text="否"></el-switch>
          -->
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button type="primary" :disabled="check_status=='审核通过'" v-if="exist"  @click="updateClinicalForm">确定</el-button>
      <el-button type="primary" v-else  @click="createClinicalForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj003'
export default {
  name:'ClinicalForm',
  data() {
    return {
      shizheng:["寒凝血瘀证","气滞血瘀证","湿热瘀阻证","肝郁化火证"],
      xuzheng:["肾虚证","肾气亏虚证","肝肾亏损证","阳虚内寒证","气血虚弱证"],
      clinicalForm: {
      },
      dialogVisible: false,
      exist: true,
      formName:'',
      isOwnedByUser: true,
      check_status:'',
      result_shizheng:false,
      result_xuzheng:false,
      result_xushi:false,
      bianzheng_result:"",
    }
  },
  methods: {
    updateClinicalForm () {
      apiUpdatePatientDataForm({formData:this.clinicalForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        if (res.data.detail) {
          this.$message({message: '对不起, 您没有对该记录操作的权限',type: 'error'})
        } else {
          this.$message({message: '提交成功',type: 'success'})
        }
        this.dialogVisible = false
        //this.$parent.getPatients()
        this.$parent.searchPatient()
      })
      .catch()
    },
    createClinicalForm () {
      apiCreatePatientDataForm({formData:this.clinicalForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        if (res.data.detail) {
          this.$message({message: '对不起, 您没有对该记录操作的权限',type: 'error'})
        } else {
          this.$message({message: '提交成功',type: 'success'})
        }
        this.dialogVisible = false
        //this.$parent.getPatients()
        this.$parent.searchPatient()
      })
      .catch()
    },
    resetDialog () {
      this.clinicalForm = {}
    },
    changebianzheng(value) {
      if(value == "实证"){
        this.result_shizheng=true
        this.result_xuzheng=false
        this.result_xushi=false
        this.clinicalForm.xuzheng=null
        this.clinicalForm.xuzheng_qita=null
        this.clinicalForm.xushi=null
      }else if(value == "虚证"){
        this.result_shizheng=false
        this.result_xuzheng=true
        this.result_xushi=false
        this.clinicalForm.shizheng=null
        this.clinicalForm.shizheng_qita=null
        this.clinicalForm.xushi=null
      }else if(value == "虚实夹杂证"){
        this.result_shizheng=false
        this.result_xuzheng=false
        this.result_xushi=true
        this.clinicalForm.shizheng=null
        this.clinicalForm.shizheng_qita=null
        this.clinicalForm.xuzheng=null
        this.clinicalForm.xuzheng_qita=null
      }
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      this.check_status = data.check_status
this.isOwnedByUser = data.isOwnedByUser
      if (!data.exist) {
        //未创建
        this.clinicalForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.clinicalForm = data.formData
        if((this.clinicalForm.shizheng)||(this.clinicalForm.shizheng_qita)){
          this.bianzheng_result = "实证"
          this.result_shizheng=true
          this.result_xuzheng=false
          this.result_xushi=false
        }else if((this.clinicalForm.xuzheng)||(this.clinicalForm.xuzheng_qita)){
          this.bianzheng_result = "虚证"
          this.result_shizheng=false
          this.result_xuzheng=true
          this.result_xushi=false
        }else if(this.clinicalForm.xushi){
          this.bianzheng_result = "虚实夹杂证"
          this.result_shizheng=false
          this.result_xuzheng=false
          this.result_xushi=true
        }else{
          this.bianzheng_result = ""
           this.result_shizheng=false
           this.result_xuzheng=false
           this.result_xushi=false
        }

      }

    })
  }

};
</script>
<style lang="">
</style>
