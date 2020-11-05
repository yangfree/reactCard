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
      <el-form-item label="滑胎" >
          <el-switch v-model="clinicalForm.zhong_hua" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
      <el-form-item label="合并疾病" >
          <el-switch v-model="clinicalForm.zhong_hebing" active-text="有" inactive-text="无"></el-switch>
      </el-form-item>
      <el-form-item v-show="clinicalForm.zhong_hebing" label="" >
        <el-checkbox v-for="(val, key) in zhong_hebing_choises" :key="key" :label="val" v-model="clinicalForm[key]">
        </el-checkbox>
        <el-input v-model="clinicalForm.zhong_hebing_qita" placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="辨证分型">
        <el-radio-group v-model="bianzheng_result" @change="changebianzheng">
          <el-radio class="radio" label="虚证">虚证</el-radio>
          <el-radio class="radio" label="实证">实证</el-radio>
          <el-radio class="radio" label="虚实夹杂证">虚实夹杂证</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item  v-show="result_xuzheng" label="虚证">
        <el-radio v-model="clinicalForm.zhong_xu"
                  v-for="item in zhong_xu_radio"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="clinicalForm.zhong_xu_qita"  placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item v-show="result_shizheng" label="实证" >
        <el-radio v-model="clinicalForm.zhong_shi"
                  v-for="item in zhong_shi_radio"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="clinicalForm.zhong_shi_qita"  placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item  v-show="result_xushi"  label="虚实夹杂证">
        <el-radio v-model="clinicalForm.zhong_xushi"
                  v-for="item in zhong_xushi_radio"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="clinicalForm.zhong_xushi_qita" ></el-input>
      </el-form-item>

      <h3>西医诊断</h3>
      <el-form-item label="复发性流产" >
          <el-switch v-model="clinicalForm.xi_fufa" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
      <el-form-item label="合并疾病" >
          <el-switch v-model="clinicalForm.xi_hebing" active-text="有" inactive-text="无"></el-switch>
      </el-form-item>
      <el-form-item v-show="clinicalForm.xi_hebing" label="" >
        <el-checkbox v-for="(val, key) in xi_hebing_choises" :key="key" :label="val" v-model="clinicalForm[key]">
        </el-checkbox>
        <el-input v-model="clinicalForm.xi_hebing_qita" placeholder="其他"></el-input>
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
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj004'
export default {
  name:'ClinicalForm',
  data() {
    return {
      zhong_hebing_choises:{zhong_hebing_yue:"月经病", zhong_hebing_dai:"带下病", zhong_hebing_xia:"癥瘕", zhong_hebing_fu:"妇科杂病"},
      zhong_xu_radio:["肾气虚证","肾阴虚证","肾阳虚证","肾阴阳两虚证","脾肾不足证","气血两虚证","气阴不足证"],
      zhong_shi_radio:["痰湿证","血瘀证","肝郁气滞证"],
      zhong_xushi_radio:["肾虚血瘀证","肝郁肾虚证","气虚血瘀证"],
      xi_hebing_choises:{xi_hebing_pen:"盆腔炎性疾病", xi_hebing_yiwei:"子宫内膜异位症", xi_hebing_xianji:"子宫腺肌症", xi_hebing_duo:"多囊卵巢综合征", xi_hebing_jiliu:"子宫肌瘤"},
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
      if(value == "虚证"){
        this.result_xuzheng=true
        this.result_shizheng=false
        this.result_xushi=false
        this.clinicalForm.zhong_shi=null
        this.clinicalForm.zhong_shi_qita=null
        this.clinicalForm.zhong_xushi=null
        this.clinicalForm.zhong_xushi_qita=null
      }else if(value == "实证"){
        this.result_xuzheng=false
        this.result_shizheng=true
        this.result_xushi=false
        this.clinicalForm.zhong_xu=null
        this.clinicalForm.zhong_xu_qita=null
        this.clinicalForm.zhong_xushi=null
        this.clinicalForm.zhong_xushi_qita=null
      }else if(value == "虚实夹杂证"){
        this.result_xuzheng=false
        this.result_shizheng=false
        this.result_xushi=true
        this.clinicalForm.zhong_xu=null
        this.clinicalForm.zhong_xu_qita=null
        this.clinicalForm.zhong_shi=null
        this.clinicalForm.zhong_shi_qita=null
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
        if((this.clinicalForm.zhong_shi)||(this.clinicalForm.zhong_shi_qita)){
          this.bianzheng_result = "实证"
          this.result_shizheng=true
          this.result_xuzheng=false
          this.result_xushi=false
        }else if((this.clinicalForm.zhong_xu)||(this.clinicalForm.zhong_xu_qita)){
          this.bianzheng_result = "虚证"
          this.result_shizheng=false
          this.result_xuzheng=true
          this.result_xushi=false
        }else if((this.clinicalForm.zhong_xushi)||(this.clinicalForm.zhong_xushi_qita)){
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
