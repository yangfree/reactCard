<template>
    <el-form ref="resultsForm" :model="resultsForm" :rules="rules"
            label-width="110px" label-position="left" class="mobile">
            
      <el-alert  title="没有治疗者不填"
                        type="info" :closable="false" show-icon>
      </el-alert>
      <el-form-item label="VAS评分（与治疗前比较）" label-width="100%"></el-form-item>
        <label>说明：数字0—10代表痛经程度依次递增，0代表无痛经；10代表极度疼痛甚则晕厥</label>
        <p></p>
      <el-form-item label="">
        <el-radio v-model="resultsForm.vas"
                  v-for="item in radio_pain_level"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>

      <el-form-item label="自评">
        <el-radio-group v-model="resultsForm.result" @change="changeHandler">
          <el-radio class="radio" label="无效">无效</el-radio>
          <el-radio class="radio" label="好转">好转</el-radio>
          <el-radio class="radio" label="痊愈">痊愈</el-radio>
        </el-radio-group>
        <el-form-item v-show="wuxiao">
          <label>经治疗</label>
          <el-input v-model="resultsForm.result_days" style="width:100px" type="number" min="0">
          </el-input>
          <label>个周期后，痛经症状未减轻。</label>
        </el-form-item>
        <el-form-item v-show="jianqing">
          <label>经治疗</label>
          <el-input v-model="resultsForm.result_days" style="width:100px" type="number" min="0">
          </el-input>
          <label>个周期后，痛经症状减轻，减轻</label>
          <el-input v-model="resultsForm.result_reduce" style="width:100px" type="number" min="0">
          </el-input>
          <label>％（百分数）</label>
        </el-form-item>
        <el-form-item v-show="quanyu">
          <label>经治疗</label>
          <el-input v-model="resultsForm.result_days" style="width:100px" type="number" min="0">
          </el-input>
          <label>个周期后，痛经症状消失。</label>
        </el-form-item>
      </el-form-item>
      <el-form-item label="停药3个月经周期后复发" label-width="100%"></el-form-item>
      <el-form-item label="">
          <el-radio v-model="resultsForm.stop_medicine"
                    v-for="item in radio_stop_medicine"
                    :key="item" :label="item">
          </el-radio>
      </el-form-item>
    </el-form>

</template>
<script>
export default {
  name:'resultsForm',
  data() {

    return {
      radio_pain_level: [0,1,2,3,4,5,6,7,8,9,10],
      radio_stop_medicine:["否","是"],
      wuxiao:false,
      jianqing:false,
      quanyu:false,
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
<style lang="">
</style>
