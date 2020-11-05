<template>
    <el-form ref="experimentForm"
            class="mobile" :model="experimentForm"
            label-width="210px" label-position="left">
      <p>（说明：性激素测定抽血时间为：有周期者在月经周期的第2-4天进行；无周期者可在B超提示处于卵泡期或黄体酮撤退后出血的2-4天进行）</p>

      <!-- <el-form-item v-for="(val, key) in mydata" :key="key" :label="val[0]">
        <el-input v-model="experimentForm[key]" type="number" min="0">
          <template slot="append">{{val[1]}}</template>
        </el-input>
      </el-form-item> -->
      <div v-for="(val, key) in mydata" :key="key">
        <p style="color:cornflowerblue">{{val[0]}}</p>
        <el-input v-model="experimentForm[key]" type="number" min="0">
          <template slot="append">{{val[1]}}</template>
        </el-input>
      </div>

      <p></p>

      <el-form-item label="胰岛素抵抗指数(HOMA-IR)">
        <el-input type="number" min="0" v-model="HOMAIR" disabled></el-input>
      </el-form-item>
      <el-form-item label="胰岛素敏感指数(ISI)">
        <el-input type="number" min="0" v-model="ISI" disabled></el-input>
      </el-form-item>
    </el-form>

</template>
<script>
export default {
  name:'ExperimentForm',
  data() {
    return {
      experimentForm:{},
      mydata:{
          'check_luanpao': ["卵泡刺激素（FSH）", 'IU/l'],
          'check_huangti': ["黄体生成素（LH）", 'IU/ml'],
          'check_ci': ["雌二醇（E2）", 'pg/ml'],
          'check_yuntong': ["孕酮（P）", 'ng/dl'],
          'check_gaotong': ["睾酮（T）", 'ng/dl'],
          'check_xue': ["血清泌乳素（PRL）", 'ng/dl'],
          'check_kangmiao': ["抗苗勒氏测定（AMH）", 'ng/dl'],
          'check_xuetang': ["空腹血糖（FPG）", 'mmol/l'],
          'check_canxue': ["餐后30mins血糖（FPG）", 'mmol/l'],
          'check_cantang': ["餐后60mins血糖（FPG）", 'mmol/l'],
          'check_canxuetang': ["餐后120mins血糖（FPG）", 'mmol/l'],
          'check_yidaosu': ["空腹胰岛素（FINS）", 'ulu/ml'],
          'check_canyi': ["餐后30mins胰岛素（FINS）", 'ulu/ml'],
          'check_candao': ["餐后60mins胰岛素（FINS）", 'ulu/ml'],
          'check_canyidao': ["餐后120mins胰岛素（FINS）", 'ulu/ml'],
          'check_sanzhi': ["甘油三酯（TG）", 'mmol'],
          'check_guchun': ["血清总胆固醇（TC）", 'mmol'],
          'check_gaomizhi': ["空腹高密度脂蛋白", 'mmol'],
          'check_dimizhi': ["空腹低密度脂蛋白", 'mmol'],
          // 'yidaosu_dikang':["胰岛素抵抗指数（HOMA-IR", ''],          //胰岛素抵抗指数（HOMA-IR） （空腹血糖×空腹胰岛素）/22.5
          // 'yidaosu_mingan':["胰岛素敏感指数（ISI）", '']           //胰岛素敏感指数（ISI） 1/（空腹血糖×空腹胰岛素）
      },
      dialogVisible: false,
      exist: true,
      formName:'',
      check_status:''
    }
  },
  computed:{
    HOMAIR () {
      const ratio = Number(this.experimentForm.check_xuetang) * Number(this.experimentForm.check_yidaosu) / 22.5
      this.experimentForm.yidaosu_dikang = ratio.toFixed(2)
      return ratio.toFixed(2)
    },
    ISI () {
      const flag = (this.experimentForm.check_xuetang == undefined) || (this.experimentForm.check_yidaosu == undefined)
                || (this.experimentForm.check_xuetang == null) || (this.experimentForm.check_yidaosu == null)
                || Number(this.experimentForm.check_xuetang)== 0 || Number(this.experimentForm.check_yidaosu == 0)
      if (!flag) {
        const ratio = 1 / ( Number(this.experimentForm.check_xuetang) * Number(this.experimentForm.check_yidaosu) )
        this.experimentForm.yidaosu_mingan = ratio.toFixed(5)
        return ratio.toFixed(5)
      } else {
        this.experimentForm.yidaosu_mingan = 0
        return 0
      }
    }
  },
  methods: {
  }
};
</script>
<style lang="scss">

</style>