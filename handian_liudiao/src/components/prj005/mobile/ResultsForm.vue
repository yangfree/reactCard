<template>
    <el-form ref="resultsForm" :model="resultsForm" :rules="rules"
            label-width="110px" label-position="left" class="mobile prj005-dialog">

      <h4>疗效评价</h4>
      <p style="color:red">经既往治疗方法治疗后，患者目前症状、体征改善情况。若患者为盆腔炎性疾病急性期或盆腔炎疾病反复发作加重期初次就诊，此项不填</p>
          <p>
              ①下腹疼痛缓解情况：
              <el-radio v-model="resultsForm.pain_xia"
                      v-for="item in radio1"
                      :key="item" :label="item">
              </el-radio>
          </p>
          <p>
              ②腰骶部疼痛缓解情况：
              <el-radio v-model="resultsForm.pain_yao"
                      v-for="item in radio1"
                      :key="item" :label="item">
              </el-radio>
          </p>
          <p>
              ③带下异常改善情况：
              <el-radio v-model="resultsForm.pain_dai"
                      v-for="item in radio2"
                      :key="item" :label="item">
              </el-radio>
          </p>
          <p>
              ④经期异常改善情况：
              <el-radio v-model="resultsForm.pain_qi"
                      v-for="item in radio3"
                      :key="item" :label="item">
              </el-radio>
          </p>
          <p>
              ⑤经量异常改善情况：
              <el-radio v-model="resultsForm.pain_liang"
                      v-for="item in radio5"
                      :key="item" :label="item">
              </el-radio>
          </p>
          <p>
              ⑥腹部体征改善情况：
              <el-radio v-model="resultsForm.pain_fu"
                      v-for="item in radio4"
                      :key="item" :label="item">
              </el-radio>
          </p>
          <p>
              ⑦盆腔体征（妇科检查）改善情况：
              <el-radio v-model="resultsForm.pain_pen"
                      v-for="item in radio4"
                      :key="item" :label="item">
              </el-radio>
          </p>

    </el-form>

</template>
<script>
export default {
  name:'resultsForm',
  data() {

    return {
      radio1:['疼痛消失','疼痛明显缓解','疼痛有所缓解','疼痛未缓解或有加重'],
      radio2:['恢复正常','明显改善','有所改善','无改善'],
      radio3:['经期恢复正常','明显改善','有所改善','无改善'],
      radio5:['经量恢复正常','明显改善','有所改善','无改善'],
      radio4:['体征消失','体征明显改善','体征有所改善','体征无改善或有加重'],

      resultsForm:{
        },
      rules:{},
    }
  },

  methods: {
    changeHandler(value) {
      if(value == "无效"){
        this.wuxiao=true
        this.jianqing=false
        this.quanyu=false
      }else if(value == "好转"){
        this.wuxiao=false
        this.jianqing=true
        this.quanyu=false
      }else if(value == "痊愈"){
        this.wuxiao=false
        this.jianqing=false
        this.quanyu=true
      }
    },
  },

}
</script>
<style lang="scss">
.prj005-dialog {
  h4 {
    color:cornflowerblue;
  }
}
</style>
