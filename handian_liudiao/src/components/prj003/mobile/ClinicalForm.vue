<template>
    <el-form ref="clinicalForm" :model="clinicalForm" :rules="rules"
            label-width="110px" label-position="left" class="mobile">

      <h3>中医诊断</h3>
      <el-form-item label="痛经" >
        <el-radio-group v-model="clinicalForm.zhong_tongjing">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <!--
          <el-switch v-model="clinicalForm.zhong_tongjing" active-text="是" inactive-text="否"></el-switch>
          -->
      </el-form-item>
      <el-form-item label="辨证分型">
        <el-radio-group v-model="bianzheng_result" @change="changebianzheng">
          <el-radio class="radio" label="实证">实证</el-radio>
          <el-radio class="radio" label="虚证">虚证</el-radio>
          <el-radio class="radio" label="虚实夹杂证">虚实夹杂证</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="result_shizheng" label="实证" >
        <el-radio v-model="clinicalForm.shizheng"
                  v-for="item in shizheng"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="clinicalForm.shizheng_qita"  placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item  v-show="result_xuzheng" label="虚证">
        <el-radio v-model="clinicalForm.xuzheng"
                  v-for="item in xuzheng"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="clinicalForm.xuzheng_qita"  placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item  v-show="result_xushi"  label="虚实夹杂证">
        <el-input v-model="clinicalForm.xushi" ></el-input>
      </el-form-item>

      <h3>西医诊断</h3>
      <el-form-item label="原发性痛经" >
        <el-radio-group v-model="clinicalForm.xi_tongjing">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <!--
          <el-switch v-model="clinicalForm.xi_tongjing" active-text="是" inactive-text="否"></el-switch>
          -->
      </el-form-item>
    </el-form>

</template>
<script>
export default {
  name:'ClinicalForm',
  data() {
    return {
      shizheng:["寒凝血瘀证","气滞血瘀证","湿热瘀阻证","肝郁化火证"],
      xuzheng:["肾虚证","肾气亏虚证","肝肾亏损证","阳虚内寒证","气血虚弱证"],
      clinicalForm: {
        zhong_tongjing:false,
        xi_tongjing:false,
      },
      rules:{},
      result_shizheng:false,
      result_xuzheng:false,
      result_xushi:false,
      bianzheng_result:"",
    }
  },
  methods: {
    changebianzheng(value) {
      if(value == "实证"){
        this.result_shizheng=true
        this.result_xuzheng=false
        this.result_xushi=false
        //this.clinicalForm.xuzheng=""
        //this.clinicalForm.xuzheng_qita=""
        //this.clinicalForm.xushi=""
      }else if(value == "虚证"){
        this.result_shizheng=false
        this.result_xuzheng=true
        this.result_xushi=false
        //this.clinicalForm.shizheng=""
        //this.clinicalForm.shizheng_qita=""
        //this.clinicalForm.xushi=""
      }else if(value == "虚实夹杂证"){
        this.result_shizheng=false
        this.result_xuzheng=false
        this.result_xushi=true
        //this.clinicalForm.shizheng=""
        //this.clinicalForm.shizheng_qita=""
       // this.clinicalForm.xuzheng=""
        //this.clinicalForm.xuzheng_qita=""
      }
    }
  },
};
</script>
<style lang="">
</style>
