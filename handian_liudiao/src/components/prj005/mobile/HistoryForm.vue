<template>
    <el-form ref="historyForm" :model="historyForm"
            class="mobile prj005-dialog" label-width="80px" label-position="left">

      <h4>感染性疾病史</h4>
        <p>
          ①阴道炎：
          <el-checkbox v-for="(val, key) in vagina"
                    v-model="historyForm[key]"
                    :key="key" :label="val">
          </el-checkbox>
        </p>
        <p>
          ②性传播疾病：
          <el-checkbox v-for="(val, key) in sex"
                    v-model="historyForm[key]"
                    :key="key" :label="val">
          </el-checkbox>
        </p>
        <p>
          ③泌尿道感染：
          <el-checkbox v-for="(val, key) in urinary"
                    v-model="historyForm[key]"
                    :key="key" :label="val">
          </el-checkbox>
        </p>
        <p>
          ④其他感染：
          <el-checkbox v-for="(val, key) in others"
                    v-model="historyForm[key]"
                    :key="key" :label="val">
          </el-checkbox>
        </p>
      <h4>既往手术史</h4>
        <p>
          ①宫腔手术操作史：<el-switch v-model="historyForm.operation_gong" active-text="有" inactive-text="无"></el-switch>
          <el-checkbox v-for="(val, key) in operation_gong"
                    v-model="historyForm[key]"
                    :key="key" :label="val"
                    v-show="historyForm.operation_gong">
          </el-checkbox>
          <el-input v-show="historyForm.operation_gong" v-model="historyForm.operation_gong_qita" placeholder="其他"></el-input>
        </p>
        <p>
          ②盆腔手术史：<el-switch v-model="historyForm.operation_pen" active-text="有" inactive-text="无"></el-switch>
          <el-checkbox v-for="(val, key) in operation_pen"
                    v-model="historyForm[key]"
                    :key="key" :label="val"
                    v-show="historyForm.operation_pen">
          </el-checkbox>
          <el-input v-show="historyForm.operation_pen" v-model="historyForm.operation_pen_qita" placeholder="其他"></el-input>
        </p>
      <h4>性活动</h4>
        <p>
          ①性生活：<el-switch v-model="historyForm.sex_life" active-text="有" inactive-text="无"></el-switch>
        </p>
        <p>
          ②初次性生活年龄：
          <el-radio v-model="historyForm.sex_life_first_time" label="＜18岁"></el-radio>
          <el-radio v-model="historyForm.sex_life_first_time" label="≥18岁"></el-radio>
        </p>
        <p>
          ③性伴侣：
          <el-radio v-model="historyForm.sex_lover" label="固定"></el-radio>
          <el-radio v-model="historyForm.sex_lover" label="不固定"></el-radio>
        </p>
        <p>
          ④性伴侣个数（个）：
          <el-radio v-model="historyForm.sex_lover_number" label="1"></el-radio>
          <el-radio v-model="historyForm.sex_lover_number" label="2"></el-radio>
          <el-radio v-model="historyForm.sex_lover_number" label="≥3"></el-radio>
        </p>
        <p>
          ⑤性生活频次：
          <el-radio v-model="historyForm.sex_life_times" label="＜1次/周"></el-radio>
          <el-radio v-model="historyForm.sex_life_times" label="1-3次/周"></el-radio>
          <el-radio v-model="historyForm.sex_life_times" label="＞3次/周"></el-radio>
        </p>
        <p>
          ⑥性伴侣是否伴有性传播疾病：
          <el-switch v-model="historyForm.sex_lover_disease" active-text="有" inactive-text="无"></el-switch>
        </p>
      <h4>避孕措施</h4>
        <el-checkbox v-for="(val, key) in contraception"
                  v-model="historyForm[key]"
                  :key="key" :label="val">
        </el-checkbox>
        <el-input v-model="historyForm.contraception_qita" placeholder="其他"></el-input>
      <h4>性卫生不良</h4>
          <p>
            ①经期同房：
            <el-switch v-model="historyForm.bad_jingqi" active-text="有" inactive-text="无"></el-switch>
            <span v-show="historyForm.bad_jingqi">
              (
              <el-radio v-model="historyForm['bad_jingqi' + '_exist']" label="偶尔"></el-radio>
              <el-radio v-model="historyForm['bad_jingqi' + '_exist']" label="有时"></el-radio>
              <el-radio v-model="historyForm['bad_jingqi' + '_exist']" label="经常"></el-radio>
              )
            </span>
          </p>
          <p>
            ②产褥期（产后42天内）同房：
            <el-switch v-model="historyForm.bad_chanru" active-text="有" inactive-text="无"></el-switch>
            <span v-show="historyForm.bad_chanru">
              (
              <el-radio v-model="historyForm['bad_chanru' + '_exist']" label="偶尔"></el-radio>
              <el-radio v-model="historyForm['bad_chanru' + '_exist']" label="有时"></el-radio>
              <el-radio v-model="historyForm['bad_chanru' + '_exist']" label="经常"></el-radio>
              )
            </span>
          </p>
          <p>
            ③流产后同房（流产1月内）：
            <el-switch v-model="historyForm.bad_liuchan" active-text="有" inactive-text="无"></el-switch>
            <span v-show="historyForm.bad_liuchan">
              (
              <el-radio v-model="historyForm['bad_liuchan' + '_exist']" label="偶尔"></el-radio>
              <el-radio v-model="historyForm['bad_liuchan' + '_exist']" label="有时"></el-radio>
              <el-radio v-model="historyForm['bad_liuchan' + '_exist']" label="经常"></el-radio>
              )
            </span>
          </p>
          <p>
            ④经期使用不洁卫生巾
            <el-switch v-model="historyForm.bad_bujie" active-text="有" inactive-text="无"></el-switch>
          </p>
          <p>
            ⑤阴道冲洗器使用
            <el-switch v-model="historyForm.bad_yindao" active-text="有" inactive-text="无"></el-switch>
            <span v-show="historyForm.bad_yindao">
              (
              <el-radio v-model="historyForm['bad_yindao' + '_exist']" label="偶尔"></el-radio>
              <el-radio v-model="historyForm['bad_yindao' + '_exist']" label="有时"></el-radio>
              <el-radio v-model="historyForm['bad_yindao' + '_exist']" label="经常"></el-radio>
              )
            </span>
            <el-input v-model="historyForm.bad_yindao_exist_times"
                      style="width:100px;"
                      type='number' placeholder="单位:次/周"></el-input>
          </p>


    </el-form>

</template>
<script>
export default {
  name:'HistoryForm',
  data() {
    return {
      "vagina":{
          "vagina_wai":"外阴阴道假丝酵母菌病",
          "vagina_xi":"细菌性阴道病",
          "vagina_hun":"混合性阴道炎",
          "vagina_di":"滴虫性阴道炎",
          "vagina_lao":"老年性阴道炎",
      },
      "sex":{
          "sex_lin":"淋球菌感染",
          "sex_sha":"沙眼衣原体感染",
          "sex_jie":"解脲支原体感染",
          "sex_sheng":"生殖支原体感染",
          "sex_ren":"人型支原体感染",
          "sex_hpv":"HPV感染",
          "sex_zhi":"生殖器疱疹",
      },
      "urinary":{
          "urinary_niao":"尿道炎",
          "urinary_pang":"膀胱炎",
          "urinary_shen":"肾盂肾炎",
      },
      "others":{
          "others_lan":"阑尾炎",
          "others_ji":"急性腹膜炎",
          "others_pen":"盆腔结核",
          "others_jie":"结肠憩室炎",
      },
      "operation_gong":{
          "operation_gong_ren":"人工流产术",
          "operation_gong_qing":"清宫术",
          "operation_gong_gua":"诊断性刮宫术",
          "operation_gong_zhi":"节育器置入术",
          "operation_gong_qu":"节育器取出术",
          "operation_gong_tong":"子宫输卵管通液术",
          "operation_gong_zao":"子宫输卵管造影术",
          "operation_gong_gong":"宫腔镜检查",
      },
      "operation_pen":{
          "operation_pen_fujian":"附件切除术",
          "operation_pen_chu":"子宫切除术",
          "operation_pen_jia":"全子宫加双附件切除术",
          "operation_pen_wa":"子宫肌瘤挖除术",
          "operation_pen_jie":"输卵管结扎术",
          "operation_pen_luan":"卵巢囊肿剥除术",
          "operation_pen_fennian":"盆腔分粘术",
          "operation_pen_lawei":"阑尾切除术",
      },
      "contraception":{
          "contraception_tao":"避孕套",
          "contraception_qi":"宫内节育器",
          "contraception_shuan":"避孕栓",
          "contraception_mo":"阴道隔膜",
          "contraception_an":"安全期避孕",
          "contraception_wai":"体外射精",
          "contraception_ji":"激素避孕药",
          "contraception_kou":"口服短效避孕药",
          "contraception_chang":"长效避孕药",
          "contraception_jin":"紧急避孕药",
          "contraception_zhen":"避孕针",
          "contraception_pi":"皮下埋植入剂",
          "contraception_yin":"阴道药环",
          "contraception_pian":"避孕贴片",
          "contraception_han":"含药的宫内节育器",
      },
      historyForm:{},
    }
  },
  methods: {

  }

};
</script>
<style scoped lang="scss">
.form-label {
    margin-block-start: 0.5em;
    color:cornflowerblue;
    font-weight: 600;
  }
.el-input {
  margin-top: 10px;
}
.prj005-dialog {
  h4 {
    color:cornflowerblue;
  }
}
</style>