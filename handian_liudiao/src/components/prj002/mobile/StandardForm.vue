<template>
    <el-form ref="form" :model="form" label-width="130px" label-position="left">

      <h2>1.诊断标准</h2>
      <h3>
        <el-radio v-model="form.clinical_standard" label="1" class="h3-radio" border>
        Rotterdam的诊断标准
        </el-radio>
      </h3>
        <div v-show="form.clinical_standard == '1'">
          <el-checkbox v-model="form.rotterdam_one" label="稀发排卵或无排卵"></el-checkbox>
          <p></p>
          <el-checkbox v-model="form.rotterdam_two" label="高雄激素血症或高雄激素的临床表现（如：多毛、痤疮等）"></el-checkbox>
          <p></p>
          <el-checkbox v-model="form.rotterdam_three" label="卵巢多囊样改变：在月经周期或黄体酮撤退后出血的3-5天进行，超声提示一侧或双侧卵巢直径2-9mm的卵泡≥12个，和（或）卵巢体积≥10ml"></el-checkbox>
          <p></p>
          同时，排除其他导致雄激素过多的疾病如先天性肾上腺皮质增生、库欣综合征、分泌雄激素的肿瘤、大剂量外源性雄激素作用、严重的胰岛素抵抗综合征、甲状腺功能异常、并排除低促性腺激素性无排卵和卵巢早衰等。
        </div>

      <h3>
        <el-radio v-model="form.clinical_standard" label="2" class="h3-radio" border>
          2018年多囊卵巢综合征中国诊疗指南的诊断标准
          </el-radio>
      </h3>
        <div v-show="form.clinical_standard == '2'">
          <h4><el-radio v-model="form.china_standard" label="1" border>(1)育龄期PCOS的诊断</el-radio></h4>
            <div v-show="form.china_standard == '1'">
              <el-checkbox v-model="form.pcos_one" label="月经稀发或闭经或不规则子宫出血是诊断的必需条件"></el-checkbox>
              <p>符合下列 2 项中的1项</p>
              <el-checkbox v-model="form.pcos_two_a	" label="高雄激素临床表现或高雄激素血症；"></el-checkbox>
              <el-checkbox v-model="form.pcos_two_b" label="超声下表现为PCOM。"></el-checkbox>
              <p></p>
              同时，排除其他可能引起高雄激素的疾病和引起排卵异常的疾病。（库欣综合征、非经典型先天性肾上腺皮质增生、卵巢或肾上腺分泌雄激素的肿瘤、药物性高雄激素血症、功能性下丘脑性闭经、甲状腺疾病、高PRL血症、早发性卵巢功能不全等。）
            </div>

          <h4><el-radio v-model="form.china_standard" label="2" border>(2)青春期PCOS的诊断</el-radio>(必须同时符合以下3个指标)</h4>
            <div v-show="form.china_standard == '2'">
              <ul style="list-style-type:none;">
                <li>①初潮后月经稀发持续至少2年或闭经</li>
                <li>②高雄激素临床表现或高雄激素血症</li>
                <li>③超声下卵巢PCOM表现</li>
              </ul>
              同时，排除其他可能引起高雄激素的疾病和引起排卵异常的疾病。（库欣综合征、非经典型先天性肾上腺皮质增生、卵巢或肾上腺分泌雄激素的肿瘤、药物性高雄激素血症、功能性下丘脑性闭经、甲状腺疾病、高PRL血症、早发性卵巢功能不全等。）
            </div>
        </div>

      <h2>2.鉴别诊断</h2>
          <p>（1）库欣综合征：根据测定血皮质醇水平的昼夜节律、24 h尿游离皮质醇、小剂量地塞米松抑制试验可确诊库欣综合征。</p>
          <p>（2）非经典型先天性肾上腺皮质增生（NCCAH）：根据血基础17α羟孕酮水平{≥6.06 nmol/L(即2 ng/ml)}和ACTH刺激60 min后17α羟孕酮反应{≥30.3 nmol/L（即10ng/ml)}诊断。</p>
          <p>（3）卵巢或肾上腺分泌雄激素的肿瘤：血清睾酮水平高于 5.21～6.94 nmol/L（即150～200ng/dl）或高于检测实验室上限的2-2.5倍。可通过超声、MRI等影像学检查协助鉴别诊断。</p>
          <p>（4）药物性高雄激素血症。</p>
          <p>（5）功能性下丘脑性闭经：通常血清FSH、LH水平低或正常、FSH水平高于LH水平，雌二醇相当于或低于早卵泡期水平，无高雄激素血症，在闭经前常有快速体质量减轻或精神心理障碍、压力大等。</p>
          <p>（6）甲状腺疾病：根据甲状腺功能测定和抗甲状腺抗体测定可诊断。</p>
          <p>（7）高PRL血症：连续2次间隔1周以上血清PRL水平升高，而LH、FSH水平偏低，有雌激素水平下降或缺乏的表现，垂体MRI检查可能显示垂体占位性病变。 </p>
          <p>（8）早发性卵巢功能不全（POI）：主要表现为40岁之前出现月经异常（闭经或月经稀发）、促性腺激素水平升高(FSH＞25 U/L)、雌激素缺乏。</p>
      <h2>3.纳入标准</h2>
          <p>（1）确诊为PCOS患者。</p>
          <p>（2）愿意参加本调查问卷访问的患者。</p>
      <h2>4.鉴别诊断</h2>
          <p>（1）非为PCOS患者。</p>
          <p>（2）不接受本调查问卷访问的患者。</p>
    </el-form>

</template>
<script>
export default {
  name:'StandardForm',
  data() {
    return {
      form: {
      },
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