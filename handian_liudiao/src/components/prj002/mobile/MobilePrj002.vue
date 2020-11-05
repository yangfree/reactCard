<template>
  <div>
    <h1 class="main-title">
      <i class="fa fa-envira" style="color:green"></i>
      多囊卵巢综合征调查
    </h1>
  <el-tabs type="border-card">
    <el-tab-pane label="一般情况">
      <InfoForm ref="info"></InfoForm>
    </el-tab-pane>
    <el-tab-pane label="诊断标准">
      <StandardForm ref="standard"></StandardForm>
    </el-tab-pane>
    <el-tab-pane label="病情概要">
      <SummaryForm ref="summary"></SummaryForm>
    </el-tab-pane>
    <el-tab-pane label="专病情况">
      <DiseaseForm ref="disease"></DiseaseForm>
    </el-tab-pane>
    <el-tab-pane label="专科病史">
      <HistoryForm ref="history"></HistoryForm>
    </el-tab-pane>
    <el-tab-pane label="实验室检查">
      <ExperimentForm ref="experiment"></ExperimentForm>
    </el-tab-pane>
    <el-tab-pane label="B超">
      <BxrayForm ref="bxray"></BxrayForm>
    </el-tab-pane>
    <el-tab-pane label="临床诊断">
      <ClinicalForm ref="clinical"></ClinicalForm>
    </el-tab-pane>
    <el-tab-pane label="治疗">
      <CureForm ref="cure"></CureForm>
    </el-tab-pane>
    <el-tab-pane label="提交">
      <span>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import {InfoForm,StandardForm,SummaryForm,DiseaseForm,HistoryForm,ExperimentForm,BxrayForm,ClinicalForm,CureForm} from '@/components/prj002/mobile'
import { apiMobileForm,apiMobileLogin } from '@/api/api-prj002'

export default {
  name:'MobilePrj002',
  components:{InfoForm,StandardForm,SummaryForm,DiseaseForm,HistoryForm,ExperimentForm,BxrayForm,ClinicalForm,CureForm},
  computed: {

  },
  methods: {
    submit () {
      // 汇总所有信息表
      const data = {
        "info":this.$refs.info.$data.infoForm,
        "standard":this.$refs.standard.$data.form,
        "summary":this.$refs.summary.$data.summaryForm,
        "disease":this.$refs.disease.$data.diseaseForm,
        "history":this.$refs.history.$data.historyForm,
        "experiment":this.$refs.experiment.$data.experimentForm,
        "bxray":this.$refs.bxray.$data.bxrayForm,
        "clinical":this.$refs.clinical.$data.clinicalForm,
        "cure":this.$refs.cure.$data.cureForm,
      }
      console.log("看一下",data)
      this.$refs.info.$refs.infoForm.validate( (valid1, fields1) => {
        // 提示第一条错误信息
        if (valid1) {

          this.$refs.summary.$refs.summaryForm.validate( (valid2, fields2) => {
            if (valid2) {

              apiMobileForm({data:data})
              .then((res)=> {
                if (res.data.status == 200) {
                  this.$message({message: '提交成功',type: 'success'})
                  this.$router.push({path:'/login'})
                } else if (res.data.status == 400) {
                  console.log(res.data.msg)
                  this.$message({message: '提交失败 ' + res.data.msg, type: 'error'})
                }
              }).catch()

            } else {
              const warnMessage = fields2[Object.keys(fields2)[0]][0].message
              this.$message({message: warnMessage, type: 'warning', showClose:true})
              return false
            }
          })

        } else {
          const warnMessage = fields1[Object.keys(fields1)[0]][0].message
          this.$message({message: warnMessage,type: 'warning',showClose:true})
          return false
        }
      } )

    },
  },
  created () {
    apiMobileLogin()
      .then((res)=> {
        // this.$message({message: '登录成功',type: 'success'})
        // this.$parent.getPatients()
      })
      .catch()
  }
}
</script>
<style lang="scss">
  .mobile {
    .el-form-item__label {
      color: cornflowerblue;
      font-weight: 600;
    }
  }
  .el-tabs__nav-next, .el-tabs__nav-prev {
    font-size: 18px;
    color:black
  }
  .main-title {
    text-align: center;
    margin: 0px auto;
    // margin: 150px 20px 20px 20px;
    // font-family: Helvetica, Tahoma, Arial, "Heiti SC", "Microsoft YaHei", sans-serif;
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 28px;
    font-weight: lighter;
    color:black;
    background-color:aliceblue
  }
</style>
