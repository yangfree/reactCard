<template>
  <div>
多囊卵巢综合征调查问卷纳入标准与排除标准
1.纳入标准：
（1）确诊为PCOS患者。
（2）愿意参加本调查问卷访问的患者。
2.排除标准：
（1）库欣综合征：根据测定血皮质醇水平的昼夜节律、24 h尿游离皮质醇、小剂量地塞米松抑制试验可确诊库欣综合征。
（2）非经典型先天性肾上腺皮质增生（NCCAH）：根据血基础17α羟孕酮水平{≥6.06 nmol/L(即2 ng/ml)}和ACTH刺激60 min后17α羟孕酮反应{≥30.3 nmol/L（即10ng/ml)}诊断。
（3）卵巢或肾上腺分泌雄激素的肿瘤：血清睾酮水平高于 5.21～6.94 nmol/L（即150～200ng/dl）或高于检测实验室上限的2-2.5倍。可通过超声、MRI等影像学检查协助鉴别诊断。
（4）药物性高雄激素血症。
（5）功能性下丘脑性闭经：通常血清FSH、LH水平低或正常、FSH水平高于LH水平，雌二醇相当于或低于早卵泡期水平，无高雄激素血症，在闭经前常有快速体质量减轻或精神心理障碍、压力大等。
（6）甲状腺疾病：根据甲状腺功能测定和抗甲状腺抗体测定可诊断。
（7）高PRL血症：连续2次间隔1周以上血清PRL水平升高，而LH、FSH水平偏低，有雌激素水平下降或缺乏的表现，垂体MRI检查可能显示垂体占位性病变。 
（8）早发性卵巢功能不全（POI）：主要表现为40岁之前出现月经异常（闭经或月经稀发）、促性腺激素水平升高(FSH＞25 U/L)、雌激素缺乏。
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  computed: {
    // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount'
      // ...
    ])
  },
  methods: {
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
      'decrement'
    ])
    // ...mapActions({
    //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    // })
  }
}

</script>
