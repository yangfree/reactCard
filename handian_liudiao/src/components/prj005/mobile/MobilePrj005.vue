<template>
  <div>
    <h1 class="main-title">
      <i class="fa fa-envira" style="color:green"></i>
      盆腔炎性疾病及其后遗症
    </h1>
  <el-tabs type="border-card">
    <el-tab-pane label="一般信息">
      <InfoForm ref="info"></InfoForm>
    </el-tab-pane>
    <el-tab-pane label="病情概要">
      <SummaryForm ref="summary"></SummaryForm>
    </el-tab-pane>
    <el-tab-pane label="患者病史">
      <HistoryForm ref="history"></HistoryForm>
    </el-tab-pane>
    <el-tab-pane label="相关检查">
      <RelevantForm ref="relevant"></RelevantForm>
    </el-tab-pane>
    <el-tab-pane label="临床诊断">
      <ClinicalForm ref="clinical"></ClinicalForm>
    </el-tab-pane>
    <el-tab-pane label="中西治疗">
      <CureForm ref="cure"></CureForm>
    </el-tab-pane>
    <el-tab-pane label="疗效">
      <ResultsForm ref="results"></ResultsForm>
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
import {InfoForm,SummaryForm,HistoryForm,RelevantForm,ClinicalForm,CureForm,ResultsForm} from '@/components/prj005/mobile'
import { apiMobileForm,apiMobileLogin } from '@/api/api-prj005'

export default {
  name:'MobilePrj005',
  components:{InfoForm,SummaryForm,HistoryForm,RelevantForm,ClinicalForm,CureForm,ResultsForm},
  computed: {

  },
  methods: {
    submit () {
      // 汇总所有信息表
      const data = {
        "info":this.$refs.info.$data.infoForm,
        "summary":this.$refs.summary.$data.summaryForm,
        "history":this.$refs.history.$data.historyForm,
        "relevant":this.$refs.relevant.$data.relevantForm,
        "clinical":this.$refs.clinical.$data.clinicalForm,
        "cure":this.$refs.cure.$data.cureForm,
        "result":this.$refs.results.$data.resultsForm,
      }
      console.log("第五个",data)
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
