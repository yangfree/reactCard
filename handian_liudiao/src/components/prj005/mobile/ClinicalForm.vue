<template>
  <el-form
    ref="clinicalForm"
    :model="clinicalForm"
    class="mobile"
    label-width="110px"
    label-position="left"
  >
    <el-form-item label="中医诊断">
      <el-checkbox
        v-for="(val, key) in herbalist_Checkbox"
        :key="key"
        :label="val"
        v-model="clinicalForm[key]"
      ></el-checkbox>
    </el-form-item>
    <el-form-item v-show="clinicalForm.herbalist_bu" label="月经不调">
      <el-checkbox
        v-for="(val, key) in herbalist_bu_Checkbox"
        :key="key"
        :label="val"
        v-model="clinicalForm[key]"
      ></el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-input v-model="clinicalForm.herbalist_qita" placeholder="其他"></el-input>
    </el-form-item>

    <el-form-item label="辨证分型"></el-form-item>
    <el-form-item label="①实证">
      <el-radio
        v-model="clinicalForm.discriminate_shi"
        v-for="item in discriminate_shi_Radio"
        :key="item"
        :label="item"
      ></el-radio>
      <el-input v-model="clinicalForm.discriminate_shi_qita" placeholder="其他"></el-input>
    </el-form-item>
    <el-form-item label="②虚实夹杂证">
      <el-radio
        v-model="clinicalForm.discriminate_xushi"
        v-for="item in discriminate_xushi_Radio"
        :key="item"
        :label="item"
      ></el-radio>
      <el-input v-model="clinicalForm.discriminate_xushi_qita" placeholder="其他"></el-input>
    </el-form-item>

    <el-form-item label="西医诊断">
      <el-radio
        v-model="clinicalForm.western"
        v-for="item in western_Radio"
        :key="item"
        :label="item"
      ></el-radio>
      <el-input v-model="clinicalForm.western_qita" placeholder="其他"></el-input>
    </el-form-item>
    <el-form-item v-if="clinicalForm.western=='盆腔炎性疾病后遗症'" v-show="true" label="盆腔炎性疾病后遗症">
      <el-checkbox
        v-for="(val, key) in western_hou_Checkbox"
        :key="key"
        :label="val"
        v-model="clinicalForm[key]"
      ></el-checkbox>
    </el-form-item>
    <el-form-item label="盆腔炎性疾病反复发作的频率" label-width="100%"></el-form-item>
    <el-form-item label="1年内发作次数" label-width="100%"></el-form-item>
    <el-form-item label>
      <el-checkbox
        v-for="(val, key) in repeat_one_Checkbox"
        :key="key"
        :label="val"
        v-model="clinicalForm[key]"
      ></el-checkbox>
    </el-form-item>
    <el-form-item label="2年内发作次数" label-width="100%"></el-form-item>
    <el-form-item label>
      <el-checkbox
        v-for="(val, key) in repeat_two_Checkbox"
        :key="key"
        :label="val"
        v-model="clinicalForm[key]"
      ></el-checkbox>
    </el-form-item>
    <el-form-item label="发病以来共发作次数" label-width="100%"></el-form-item>
    <el-form-item label>
      <el-input v-model="clinicalForm.repeat_total">
        <template slot="append">次</template>
      </el-input>
    </el-form-item>
    <el-form-item label="盆腔炎病程">
      <!-- <el-input v-model="clinicalForm.western_how_long" >
            <template slot="append">月/年</template>
      </el-input>-->
      <el-input-number
        v-model="clinicalForm.western_how_long"
        :min="1"
        :precision="0"
        label="请输入整数类型的值"
      ></el-input-number>
      <el-select v-model="clinicalForm.western_how_long_unit" placeholder="请选择年月">
        <el-option label="年" value="年"></el-option>
        <el-option label="月" value="月"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="初次发病时间">
      <el-input v-model="clinicalForm.western_first_time" placeholder="年/月"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "ClinicalForm",
  data() {
    return {
      herbalist_Checkbox: {
        herbalist_pen: "盆腔炎",
        herbalist_fu: "妇人腹痛",
        herbalist_re: "热入血室",
        herbalist_jing: "痛经",
        herbalist_dai: "带下病",
        herbalist_xia: "癥瘕",
        herbalist_yun: "不孕症",
        herbalist_bu: "月经不调"
      },
      herbalist_bu_Checkbox: {
        herbalist_bu_xian: "月经先期",
        herbalist_bu_duo: "月经过多",
        herbalist_bu_yan: "经期延长",
        herbalist_bu_lou: "崩漏",
        herbalist_bu_hou: "月经后期",
        herbalist_bu_shao: "月经过少"
      },
      discriminate_shi_Radio: [
        "热毒炽盛证",
        "湿毒壅盛证",
        "湿热蕴结证",
        "瘀热内结证",
        "湿热瘀结证",
        "气滞血瘀证",
        "寒湿瘀阻证"
      ],
      discriminate_xushi_Radio: ["气虚血瘀证", "肾虚血瘀证"],
      western_Radio: ["盆腔炎性疾病", "盆腔炎性疾病后遗症"],
      western_hou_Checkbox: {
        western_houyi_man: "慢性盆腔痛",
        western_houyi_pen: "盆腔炎性疾病反复发作",
        western_houyi_bu: "不孕",
        western_houyi_yi: "异位妊娠"
      },
      repeat_one_Checkbox: {
        repeat_one_t: "≤2次",
        repeat_one_f: "3-5次",
        repeat_one_e: "疼痛持续存在3月以上",
        repeat_one_s: "疼痛持续存在6月以上"
      },
      repeat_two_Checkbox: { repeat_two_t: "3-5次", repeat_two_f: "大于5次" },

      clinicalForm: {},
      dialogVisible: false,
      exist: true,
      formName: "",
      check_status: ""
    };
  },
  methods: {}
};
</script>
<style lang="">
</style>
