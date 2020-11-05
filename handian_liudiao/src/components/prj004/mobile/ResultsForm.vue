<template>
    <el-form ref="resultsForm" :model="resultsForm" :rules="rules"
            label-width="110px" label-position="left" class="mobile">

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
      <el-form-item v-show="resultsForm.yuanqi_zu" label-width="100%" label="新生儿Apgar评分">
      </el-form-item>
      <el-form-item v-show="resultsForm.yuanqi_zu" label="">
      <el-input v-model="resultsForm.yuanqi_apgar" type="number" min="0">
        <template slot="append">分</template>
      </el-input>
      </el-form-item>
    </el-form>

</template>
<script>
export default {
  name:'resultsForm',
  data() {
    return {
      resultsForm:{
        },
      rules:{},
    }
  },

  methods: {},

}
</script>
<style lang="">
</style>
