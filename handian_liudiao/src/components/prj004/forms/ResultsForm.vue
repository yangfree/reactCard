<template>
  <el-dialog title="疗效" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="resultsForm" :model="resultsForm" label-width="auto" label-position="left">
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

      <el-form-item label="近期疗效">
        <label>再次妊娠超过既往流产最长孕周</label>
        <p></p>
        <el-switch v-model="resultsForm.jinqi_cure" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>

      <el-form-item label="远期疗效">
        <label>足月分娩（活婴获得）</label>
        <p></p>
        <el-switch v-model="resultsForm.yuanqi_zu" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
      <el-form-item v-show="resultsForm.yuanqi_zu" label="新生儿Apgar评分">
      <el-input v-model="resultsForm.yuanqi_apgar"  style="width:250px"  type="number" min="0">
        <template slot="append">分</template>
      </el-input>
      </el-form-item>

    </el-form>
    <span slot="footer">
      <el-button type="primary" :disabled="check_status=='审核通过'" v-if="exist"  @click="updateresultsForm">确定</el-button>
      <el-button type="primary" v-else  @click="createresultsForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj004'
export default {
  name:'resultsForm',
  data() {
    return {
      resultsForm:{
        },
      dialogVisible: false,
      exist: true,
      formName:'',
      isOwnedByUser: true,
      check_status:''
    }
  },

  methods: {
    updateresultsForm () {
      apiUpdatePatientDataForm({formData:this.resultsForm,formName:this.formName})
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
    createresultsForm () {
      console.log("result form = " + JSON.stringify(this.resultsForm))
      apiCreatePatientDataForm({formData:this.resultsForm,formName:this.formName})
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
      this.resultsForm = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      console.log('疗效获取到的数据',data)
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      this.check_status = data.check_status
this.isOwnedByUser = data.isOwnedByUser
      if (!data.exist) {
        //未创建
        this.resultsForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.resultsForm = data.formData
      }

    })
  }

}
</script>
<style lang="">
</style>
