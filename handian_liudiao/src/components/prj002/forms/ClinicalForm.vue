<template>
  <el-dialog title="临床诊断" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="clinicalForm" :model="clinicalForm" label-width="auto" label-position="left">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-alert v-if="check_status=='已提交'" effect="dark"
                  title="此条信息已经提交审核,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <p></p>
      <el-alert v-if="!isOwnedByUser" effect="dark"
                  title="此条信息为其他用户创建，您无法修改"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <p></p>

      <el-form-item label="1、中医诊断">
          <el-checkbox v-for="(val, key) in mydata.zhongyi" :key="key" :label="val" v-model="clinicalForm[key]"></el-checkbox>
          <el-input v-model="clinicalForm.zhong_qita" placeholder="其他"></el-input>
      </el-form-item>

      <h4 style="color:cornflowerblue">2、辨证分型</h4>
        <el-form-item label="虚证">
          <el-checkbox v-for="(val, key) in mydata.xuzheng" :key="key" :label="val" v-model="clinicalForm[key]"></el-checkbox>
          <el-input v-model="clinicalForm.bian_xu_qita" placeholder="其他" ></el-input>
        </el-form-item>
        <el-form-item label="实证">
          <el-checkbox v-for="(val, key) in mydata.shizheng" :key="key" :label="val" v-model="clinicalForm[key]"></el-checkbox>
          <el-input v-model="clinicalForm.bian_shi_qita" placeholder="其他"></el-input>
        </el-form-item>
        <el-form-item label="虚实夹杂证">
          <el-checkbox v-for="(val, key) in mydata.xushi" :key="key" :label="val" v-model="clinicalForm[key]"></el-checkbox>
          <el-input v-model="clinicalForm.bian_xushi_qita" placeholder="其他"></el-input>
        </el-form-item>

      <el-form-item label="3、西医诊断">
        <el-checkbox label="多囊卵巢综合征" v-model="clinicalForm.xi_duo"></el-checkbox>
        <el-input v-model="clinicalForm.xi_qita" placeholder="其他" ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" v-if="exist"  @click="updateClinicalForm">确定</el-button>
      <el-button type="primary" v-else  @click="createClinicalForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj002'
export default {
  name:'ClinicalForm',
  data() {
    return {
      mydata: {
        zhongyi:{"zhong_bi":"闭经", "zhong_bu":"不孕", "zhong_xia":"癥瘕", "zhong_beng":"崩漏", "zhong_yue":"月经失调"},
        xuzheng:{"bian_xu_piqi":"脾气虚证", "bian_xu_pishen":"脾肾阳虚证", "bian_xu_piyang":"脾阳虚证", "bian_xu_shenqi":"肾气虚证",
                "bian_xu_shenyin":"肾阴虚证", "bian_xu_shenyang":"肾阳虚证", "bian_xu_xue":"血虚证", "bian_xu_yin":"阴虚内热证"},
        shizheng:{"bian_shi_shire":"肝经湿热证", "bian_shi_qizhi":"肝郁气滞证", "bian_shi_yure":"肝经郁热证", "bian_shi_xueyu":"气滞血瘀证",
                  "bian_shi_tanshi":"痰湿证", "bian_shi_hujie":"痰瘀互结证"},
        xushi:{"bian_xushi_pixu":"脾虚痰湿证", "bian_xushi_ganyu":"肾虚肝郁证", "bian_xushi_tanshi":"肾虛痰湿证",
                "bian_xushi_xueyu":"肾虚血瘀证", "bian_xushi_neire":"肾虚内热证","bian_xushi_shenyin":"	肾（阴）虚湿热夹瘀证",
                "bian_xushi_shenqi":"肾（气）虚湿热夹瘀证"}
      },
      clinicalForm: {},
      dialogVisible: false,
      exist: true,
      formName:'',
      isOwnedByUser: true,
      check_status:''
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
        this.$parent.searchPatient()
        // this.$parent.getPatients()
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
        this.$parent.getPatients()
      })
      .catch()
    },
    resetDialog () {
      this.clinicalForm = {}
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
      }

    })
  }

};
</script>
<style lang="">
</style>