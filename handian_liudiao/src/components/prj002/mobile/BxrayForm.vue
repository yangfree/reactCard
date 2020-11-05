<template>
    <el-form ref="bxrayForm" :model="bxrayForm" 
            class="mobile" label-width="140px" label-position="right">

      <div>
        <h3>1、子宫</h3>
          <h4 class="bxray-input">a.大小：
            <el-input v-model="bxrayForm.zigong_chang" style="width:50px;" type="number" min=0></el-input>mm×
            <el-input v-model="bxrayForm.zigong_kuan" style="width:50px;" type="number" min=0></el-input>mm×
            <el-input v-model="bxrayForm.zigong_gao" style="width:50px;" type="number" min=0></el-input>mm
          </h4>
          <h4>b.畸形:
            <el-switch v-model="bxrayForm.zigong_jixing" active-text="有" inactive-text="无"></el-switch>
            <p v-show="bxrayForm.zigong_jixing">
              <el-input v-model="bxrayForm.zigong_jixing_juti" placeholder="具体为"></el-input>
            </p>
          </h4>

          <h4>c.子宫内膜厚度:
            <el-input v-model="bxrayForm.zigong_neimo" type="number" min=0></el-input>
          </h4>

          <h4>d.是否有子宫肌瘤:
            <el-switch v-model="bxrayForm.zigong_is_jiliu" active-text="有" inactive-text="无"></el-switch>
            <h5 class="bxray-input" v-show="bxrayForm.zigong_is_jiliu">最大子宫肌瘤的大小：
              <el-input v-model="bxrayForm.zigong_daxiaochang" style="width:50px;" type="number" min=0></el-input>mm×
              <el-input v-model="bxrayForm.zigong_daxiaokuan" style="width:50px;" type="number" min=0></el-input>mm×
              <el-input v-model="bxrayForm.zigong_daxiaogao" style="width:50px;" type="number" min=0></el-input>mm
            </h5>
          </h4>

          <h4>e.是否有子宫腺肌症:
          <el-switch v-model="bxrayForm.zigong_xainji" active-text="是" inactive-text="否"></el-switch>
          </h4>
      </div>

      <div>
        <h3>2、左卵巢</h3>
          <h4 class="bxray-input">大小：
            <el-input v-model="bxrayForm.zuo_chang" style="width:50px;" type="number" min=0></el-input>mm×
            <el-input v-model="bxrayForm.zuo_kuan" style="width:50px;" type="number" min=0></el-input>mm×
            <el-input v-model="bxrayForm.zuo_qianhou" style="width:50px;" type="number" min=0></el-input>mm
          </h4>

        <el-form-item label="请选择">
          左卵巢是否有直径>10mm的囊肿:<el-switch v-model="bxrayForm.zuo_nangzhong" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <h4 class="bxray-input" v-show="bxrayForm.zuo_nangzhong">左卵巢最大囊肿大小：
          <el-input v-model="bxrayForm.zuo_daxiaochang" style="width:50px;" type="number" min=0></el-input>mm×
          <el-input v-model="bxrayForm.zuo_daxiaokuan" style="width:50px;" type="number" min=0></el-input>mm
        </h4>

        <el-form-item label="形态">
            <el-radio v-model="bxrayForm.zuo_xingtai" label="正常">正常</el-radio>
            <el-radio v-model="bxrayForm.zuo_xingtai" label="PCO （窦卵泡个数≥12个）">PCO （窦卵泡个数≥12个）</el-radio>
        </el-form-item>

        <el-form-item label="窦卵泡数">
          <el-input v-model="bxrayForm.zuo_paoshu" type="number" min=0>
            <template slot="append">个</template>
          </el-input>
        </el-form-item>

      </div>

      <div>
        <h3>3、右卵巢</h3>
          <h4 class="bxray-input">大小：
            <el-input v-model="bxrayForm.you_chang" style="width:50px;" type="number" min=0></el-input>mm×
            <el-input v-model="bxrayForm.you_kuan" style="width:50px;" type="number" min=0></el-input>mm×
            <el-input v-model="bxrayForm.you_qianhou" style="width:50px;" type="number" min=0></el-input>mm
          </h4>

        <el-form-item label="请选择">
          右卵巢是否有直径>10mm的囊肿:<el-switch v-model="bxrayForm.you_nangzhong" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <h4 class="bxray-input" v-show="bxrayForm.you_nangzhong">右卵巢最大囊肿大小：
          <el-input v-model="bxrayForm.you_daxiaochang" style="width:50px;" type="number" min=0></el-input>mm×
          <el-input v-model="bxrayForm.you_daxiaokuan" style="width:50px;" type="number" min=0></el-input>mm
        </h4>

        <el-form-item label="形态">
            <el-radio v-model="bxrayForm.you_xingtai" label="正常">正常</el-radio>
            <el-radio v-model="bxrayForm.you_xingtai" label="PCO （窦卵泡个数≥12个）">PCO （窦卵泡个数≥12个）</el-radio>
        </el-form-item>

        <el-form-item label="窦卵泡数">
          <el-input v-model="bxrayForm.you_paoshu" type="number" min=0>
            <template slot="append">个</template>
          </el-input>
        </el-form-item>

      </div>

    </el-form>
</template>
<script>
export default {
  name:'BxrayForm',
  data() {
    return {
      bxrayForm:{
        zigong_chang: '', zigong_kuan: '', zigong_gao: '',
        zigong_xingtai: true, zigong_juti: '',
        zigong_neimo: '',
        zigong_is_jiliu: false, zigong_weizhi: '', zigong_geshu: '', zigong_daxiaochang: '', zigong_daxiaokuan: '', zigong_daxiaogao: '',
        zigong_xainji: false,
        zuo_chang: '', zuo_kuan: '', zuo_qianhou: '', zuo_tiji: '',
        zuo_nangzhong: false, zuo_daxiaochang: '', zuo_daxiaokuan: '',
        zuo_xingtai: '',
        zuo_paoshu: '',
        you_chang: '', you_kuan: '', you_qianhou: '', you_tiji: '',
        you_nangzhong: false, you_daxiaochang: '', you_daxiaokuan: '',
        you_xingtai: '',
        you_paoshu: '',
        },
      dialogVisible: false,
      exist: true,
      formName:'',
      check_status:''
    }
  },
  methods: {
  },

}
</script>
<style lang="">
</style>