<template>
  <el-dialog title="相关检查" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="relevantForm" :model="relevantForm" label-width="140px" label-position="left">
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

      <el-form-item label="体格检查" >
        <el-radio-group v-model="relevantForm.body_check_wu">
          <el-radio :label="true">有</el-radio>
          <el-radio :label="false">无</el-radio>
        </el-radio-group>
        <!--
        <el-switch v-model="relevantForm.body_check_wu" active-text="无" inactive-text="有"></el-switch>
        -->
      </el-form-item>
      <el-form-item v-show="relevantForm.body_check_wu" label="">
        <el-checkbox v-for="(val, key) in body_check" :key="key" :label="val" v-model="relevantForm[key]">
        </el-checkbox>
      </el-form-item>

      <el-form-item label="辅助检查" >
        <el-radio-group v-model="relevantForm.assist_check_wu">
          <el-radio :label="true">有</el-radio>
          <el-radio :label="false">无</el-radio>
        </el-radio-group>
        <!--
          <el-switch v-model="relevantForm.assist_check_wu" active-text="无" inactive-text="有"></el-switch>
          -->
      </el-form-item>
      <el-form-item  v-show="relevantForm.assist_check_wu" label="">
        <el-checkbox  :label="assist_check.assist_check_chao" v-model="relevantForm['assist_check_chao']"></el-checkbox>
        <el-checkbox  :label="assist_check.assist_check_mri" v-model="relevantForm['assist_check_mri']"></el-checkbox>
        <!--
        <el-checkbox  :label="assist_check.assist_check_gong" v-model="relevantForm['assist_check_gong']"></el-checkbox>
        <el-checkbox  :label="assist_check.assist_check_fu" v-model="relevantForm['assist_check_fu']"></el-checkbox>
        <el-checkbox  :label="assist_check.assist_check_zi" v-model="relevantForm['assist_check_zi']"></el-checkbox>
        <el-checkbox  :label="assist_check.assist_check_ji" v-model="relevantForm['assist_check_ji']"></el-checkbox>
        <el-checkbox v-show="relevantForm['assist_check_ji']" :label="assist_check.assist_check_ji_dan" v-model="relevantForm['assist_check_ji_dan']"></el-checkbox>
        <el-checkbox v-show="relevantForm['assist_check_ji']"  :label="assist_check.assist_check_ji_shuang" v-model="relevantForm['assist_check_ji_shuang']"></el-checkbox>
        -->
        <el-checkbox  :label="assist_check.assist_check_pen" v-model="relevantForm['assist_check_pen']"></el-checkbox>
        <el-checkbox  :label="assist_check.assist_check_jing" v-model="relevantForm['assist_check_jing']"></el-checkbox>

      </el-form-item>
      <el-form-item label="检查结果">
        <label>以上检查结果如有异常请输入检查结果</label>
        <el-input v-model="relevantForm.check_result"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button type="primary" :disabled="check_status=='审核通过'" v-if="exist"  @click="updaterelevantForm">确定</el-button>
      <el-button type="primary" v-else  @click="createrelevantForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj003'
export default {
  name:'relevantForm',
  data() {
    return {
      body_check:{body_check_fuke:"妇科检查",body_check_quan:"全身检查"},
      assist_check:{assist_check_chao:"超声",assist_check_mri:"盆腔MRI检查",assist_check_gong:"宫腔镜检查",assist_check_fu:"腹腔镜检查",assist_check_zi:"子宫输卵管造影",assist_check_ji:"基础体温测定",assist_check_ji_dan:"单相",assist_check_ji_shuang:"双相",assist_check_pen:"盆腔血流图检查",assist_check_jing:"经血前列腺素测定"},
      relevantForm:{
      },

      dialogVisible: false,
      exist: true,
      formName:'',
      isOwnedByUser: true,
      check_status:''
    }
  },
  computed:{
  },
  methods: {
    updaterelevantForm () {
      apiUpdatePatientDataForm({formData:this.relevantForm,formName:this.formName})
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
    createrelevantForm () {
      apiCreatePatientDataForm({formData:this.relevantForm,formName:this.formName})
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
      this.relevantForm = {}
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
        this.relevantForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.relevantForm = data.formData
      }
    })
  }

};
</script>
<style lang="">
</style>
