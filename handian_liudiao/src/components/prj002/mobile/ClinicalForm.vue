<template>
    <el-form ref="clinicalForm" :model="clinicalForm"
            class="mobile" label-width="100px" label-position="left">


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

</template>
<script>
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
      check_status:''
    }
  },
  methods: {
  },

};
</script>
<style lang="">
</style>