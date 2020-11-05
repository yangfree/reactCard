<template>
  <el-dialog
    title="全身症状"
    class="my-dialog prj009-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
    v-if="dialogVisible"
  >
    <el-form ref="infoForm" :model="infoForm" label-width="200px" label-position="left">
      <el-alert
        v-if="check_status=='审核通过'"
        title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <el-divider v-if="check_status=='审核通过'"></el-divider>
      <!-- 表格开始 -->
      <el-form-item label="1. 精神：">
 <el-radio v-model="infoForm.g01" label="1">神疲</el-radio>
 <el-radio v-model="infoForm.g01" label="2">倦怠</el-radio>
 <el-radio v-model="infoForm.g01" label="3">嗜睡</el-radio>
 <el-radio v-model="infoForm.g01" label="4">乏力</el-radio>
 <el-radio v-model="infoForm.g01" label="5">懒言</el-radio>
 <el-radio v-model="infoForm.g01" label="6">少气</el-radio>
 <el-radio v-model="infoForm.g01" label="7">短气</el-radio>
 <el-radio v-model="infoForm.g01" label="8">健忘或记忆力下降</el-radio>
 <el-radio v-model="infoForm.g01" label="9">正常</el-radio>
</el-form-item>
<el-form-item label="2. 情志：">
 <el-radio v-model="infoForm.g02" label="1">抑郁</el-radio>
 <el-radio v-model="infoForm.g02" label="2">焦虑</el-radio>
 <el-radio v-model="infoForm.g02" label="3">喜太息（叹息）</el-radio>
 <el-radio v-model="infoForm.g02" label="4">烦躁</el-radio>
 <el-radio v-model="infoForm.g02" label="5">易怒</el-radio>
 <el-radio v-model="infoForm.g02" label="6">正常</el-radio>
</el-form-item>
<el-form-item label="3. 形体：">
 <el-radio v-model="infoForm.g03" label="1">偏瘦</el-radio>
 <el-radio v-model="infoForm.g03" label="2">肥胖</el-radio>
 <el-radio v-model="infoForm.g03" label="3">正常</el-radio>
</el-form-item>
<el-form-item label="4. 易感冒：">
 <el-radio v-model="infoForm.g04" label="1">有</el-radio>
 <el-radio v-model="infoForm.g04" label="2">无</el-radio>
</el-form-item>
<el-form-item label="5. 面色：">
 <el-radio v-model="infoForm.g05" label="1">红润</el-radio>
 <el-radio v-model="infoForm.g05" label="2">萎黄</el-radio>
 <el-radio v-model="infoForm.g05" label="3">偏红</el-radio>
 <el-radio v-model="infoForm.g05" label="4">两颧潮红</el-radio>
 <el-radio v-model="infoForm.g05" label="5">淡白</el-radio>
 <el-radio v-model="infoForm.g05" label="6">苍白</el-radio>
 <el-radio v-model="infoForm.g05" label="7">晄白</el-radio>
 <el-radio v-model="infoForm.g05" label="8">颜面黑斑</el-radio>
 <el-radio v-model="infoForm.g05" label="9">晦暗或黧黑</el-radio>
 <el-radio v-model="infoForm.g05" label="10">眼周暗黑</el-radio>
</el-form-item>
<el-form-item label="6. 口唇：">
 <el-radio v-model="infoForm.g06" label="1">润泽</el-radio>
 <el-radio v-model="infoForm.g06" label="2">易干裂</el-radio>
 <el-radio v-model="infoForm.g06" label="3">唇色苍白</el-radio>
 <el-radio v-model="infoForm.g06" label="4">唇色淡红</el-radio>
 <el-radio v-model="infoForm.g06" label="5">唇色偏红</el-radio>
 <el-radio v-model="infoForm.g06" label="6">唇色紫滞</el-radio>
 <el-radio v-model="infoForm.g06" label="7">唇色晦暗</el-radio>
</el-form-item>
<el-form-item label="7. 寒热：">
 <el-radio v-model="infoForm.g07" label="1">潮热</el-radio>
 <el-radio v-model="infoForm.g07" label="2">低热</el-radio>
 <el-radio v-model="infoForm.g07" label="3">畏寒</el-radio>
 <el-radio v-model="infoForm.g07" label="4">正常</el-radio>
</el-form-item>
<el-form-item label="8. 汗出：">
 <el-radio v-model="infoForm.g08" label="1">盗汗（入睡后易出汗）</el-radio>
 <el-radio v-model="infoForm.g08" label="2">自汗（白天易汗出）</el-radio>
 <el-radio v-model="infoForm.g08" label="3">动则汗出</el-radio>
 <el-radio v-model="infoForm.g08" label="4">正常</el-radio>
</el-form-item>
<el-form-item label="9. 头目：">
 <el-radio v-model="infoForm.g09" label="1">头晕</el-radio>
 <el-radio v-model="infoForm.g09" label="2">眼花</el-radio>
 <el-radio v-model="infoForm.g09" label="3">头重如裹</el-radio>
 <el-radio v-model="infoForm.g09" label="4">头痛</el-radio>
 <el-radio v-model="infoForm.g09" label="5">两目干涩</el-radio>
 <el-radio v-model="infoForm.g09" label="6">耳鸣或听力下降</el-radio>
 <el-radio v-model="infoForm.g09" label="7">脱发</el-radio>
 <el-radio v-model="infoForm.g09" label="8">正常</el-radio>
</el-form-item>
<el-form-item label="10. 胸胁：">
 <el-radio v-model="infoForm.g10" label="1">胸闷</el-radio>
 <el-radio v-model="infoForm.g10" label="2">胸胀</el-radio>
 <el-radio v-model="infoForm.g10" label="3">胁胀</el-radio>
 <el-radio v-model="infoForm.g10" label="4">胁痛</el-radio>
 <el-radio v-model="infoForm.g10" label="5">心烦</el-radio>
 <el-radio v-model="infoForm.g10" label="6">心悸</el-radio>
 <el-radio v-model="infoForm.g10" label="7">怔忡</el-radio>
 <el-radio v-model="infoForm.g10" label="8">正常</el-radio>
</el-form-item>
<el-form-item label="11. 乳房：">
 <el-radio v-model="infoForm.g11" label="1">乳痛</el-radio>
 <el-radio v-model="infoForm.g11" label="2">乳胀</el-radio>
 <el-radio v-model="infoForm.g11" label="3">正常</el-radio>
</el-form-item>
<el-form-item label="12. 腰腹：">
 <el-radio v-model="infoForm.g1201" label="1">腰痛</el-radio>
 <el-radio v-model="infoForm.g1201" label="2">腰酸胀</el-radio>
 <el-radio v-model="infoForm.g1201" label="3">腰背发冷</el-radio>
 <el-radio v-model="infoForm.g1201" label="4">腰膝酸软</el-radio>
 <el-radio v-model="infoForm.g1201" label="5">腹部发冷</el-radio>
 <el-radio v-model="infoForm.g1201" label="6">腹部有包块</el-radio>
 <el-radio v-model="infoForm.g1201" label="7">正常</el-radio>
</el-form-item>
<el-form-item label="与月经的关系：">
 <el-radio v-model="infoForm.g1202" label="1">无关</el-radio>
 <el-radio v-model="infoForm.g1202" label="2">经前甚</el-radio>
 <el-radio v-model="infoForm.g1202" label="3">经期甚</el-radio>
 <el-radio v-model="infoForm.g1202" label="4">经后甚</el-radio>
 <el-radio v-model="infoForm.g1202" label="5">经间期明显</el-radio>
</el-form-item>
<el-form-item label="13. 腹痛：">
 <el-radio v-model="infoForm.g1301" label="1">无</el-radio>
 <el-radio v-model="infoForm.g1301" label="2">有</el-radio>
</el-form-item>
<div  v-show="infoForm.g1301==2">
    <el-form-item label="腹痛部位：">
    <el-radio v-model="infoForm.g1302" label="1">上腹</el-radio>
    <el-radio v-model="infoForm.g1302" label="2">小腹</el-radio>
    <el-radio v-model="infoForm.g1302" label="3">少腹</el-radio>
    </el-form-item>
    <el-form-item label="腹痛位置：">
    <el-radio v-model="infoForm.g1303" label="1">痛无定处</el-radio>
    <el-radio v-model="infoForm.g1303" label="2">痛有定处</el-radio>
    </el-form-item>
    <el-form-item label="腹痛性质：">
    <el-radio v-model="infoForm.g1304" label="1">胀痛</el-radio>
    <el-radio v-model="infoForm.g1304" label="2">坠痛</el-radio>
    <el-radio v-model="infoForm.g1304" label="3">冷痛</el-radio>
    <el-radio v-model="infoForm.g1304" label="4">刺痛</el-radio>
    <el-radio v-model="infoForm.g1304" label="5">隐痛</el-radio>
    <el-radio v-model="infoForm.g1304" label="6">灼痛</el-radio>
    <el-radio v-model="infoForm.g1304" label="7">掣痛</el-radio>
    <el-radio v-model="infoForm.g1304" label="8">闷痛</el-radio>
    </el-form-item>
    <el-form-item label="腹部感觉：">
    <el-radio v-model="infoForm.g1305" label="1">发凉</el-radio>
    <el-radio v-model="infoForm.g1305" label="2">下坠感</el-radio>
    <el-radio v-model="infoForm.g1305" label="3">灼热感</el-radio>
    <el-radio v-model="infoForm.g1305" label="4">喜按</el-radio>
    <el-radio v-model="infoForm.g1305" label="5">拒按</el-radio>
    <el-radio v-model="infoForm.g1305" label="6">喜温</el-radio>
    </el-form-item>
    <el-form-item label="与月经关系：">
    <el-radio v-model="infoForm.g1306" label="1">无关</el-radio>
    <el-radio v-model="infoForm.g1306" label="2">经前甚</el-radio>
    <el-radio v-model="infoForm.g1306" label="3">经期甚</el-radio>
    <el-radio v-model="infoForm.g1306" label="4">经后甚</el-radio>
    <el-radio v-model="infoForm.g1306" label="5">经间期明显</el-radio>
    </el-form-item>
</div>  


<el-form-item label="14. 肢体：">
 <el-radio v-model="infoForm.g14" label="1">怕冷或四肢不温</el-radio>
 <el-radio v-model="infoForm.g14" label="2">手足心热</el-radio>
 <el-radio v-model="infoForm.g14" label="3">身重</el-radio>
 <el-radio v-model="infoForm.g14" label="4">肢体浮肿</el-radio>
 <el-radio v-model="infoForm.g14" label="5">足跟痛</el-radio>
 <el-radio v-model="infoForm.g14" label="6">肌肤干燥</el-radio>
 <el-radio v-model="infoForm.g14" label="7">四肢麻木</el-radio>
 <el-radio v-model="infoForm.g14" label="8">瘙痒</el-radio>
 <el-radio v-model="infoForm.g14" label="9">正常</el-radio>
</el-form-item>
<el-form-item label="15. 性生活：">
 <el-radio v-model="infoForm.g15" label="1">性欲下降</el-radio>
 <el-radio v-model="infoForm.g15" label="2">性交不适</el-radio>
 <el-radio v-model="infoForm.g15" label="3">无性生活</el-radio>
 <el-radio v-model="infoForm.g15" label="4">正常</el-radio>
</el-form-item>
<el-form-item label="16. 外阴、阴道：">
 <el-radio v-model="infoForm.g16" label="1">瘙痒</el-radio>
 <el-radio v-model="infoForm.g16" label="2">干涩</el-radio>
 <el-radio v-model="infoForm.g16" label="3">灼痛</el-radio>
 <el-radio v-model="infoForm.g16" label="4">正常</el-radio>
</el-form-item>
<el-form-item label="17. 饮食：">
 <el-radio v-model="infoForm.g17" label="1">食欲减退</el-radio>
 <el-radio v-model="infoForm.g17" label="2">食后腹胀</el-radio>
 <el-radio v-model="infoForm.g17" label="3">喜热饮</el-radio>
 <el-radio v-model="infoForm.g17" label="4">喜冷饮</el-radio>
 <el-radio v-model="infoForm.g17" label="5">纳呆或厌油</el-radio>
 <el-radio v-model="infoForm.g17" label="6">嗳气或泛酸</el-radio>
 <el-radio v-model="infoForm.g17" label="7">恶心呕吐</el-radio>
 <el-radio v-model="infoForm.g17" label="8">正常</el-radio>
</el-form-item>
<el-form-item label="18. 口味：">
 <el-radio v-model="infoForm.g18" label="1">口干</el-radio>
 <el-radio v-model="infoForm.g18" label="2">口苦</el-radio>
 <el-radio v-model="infoForm.g18" label="3">咽躁或咽干</el-radio>
 <el-radio v-model="infoForm.g18" label="4">口粘腻</el-radio>
 <el-radio v-model="infoForm.g18" label="5">口舌生疮（口糜）</el-radio>
 <el-radio v-model="infoForm.g18" label="6">候中痰鸣</el-radio>
 <el-radio v-model="infoForm.g18" label="7">口不渴饮</el-radio>
 <el-radio v-model="infoForm.g18" label="8">渴不欲饮</el-radio>
 <el-radio v-model="infoForm.g18" label="9">正常</el-radio>
</el-form-item>
<el-form-item label="19. 睡眠：">
 <el-radio v-model="infoForm.g19" label="1">失眠</el-radio>
 <el-radio v-model="infoForm.g19" label="2">多梦</el-radio>
 <el-radio v-model="infoForm.g19" label="3">困倦易睡</el-radio>
 <el-radio v-model="infoForm.g19" label="4">嗜睡</el-radio>
 <el-radio v-model="infoForm.g19" label="5">早醒</el-radio>
 <el-radio v-model="infoForm.g19" label="6">正常</el-radio>
</el-form-item>

<el-form-item label="20a. 小便：">
 <el-radio v-model="infoForm.g2001" label="1">清长</el-radio>
 <el-radio v-model="infoForm.g2001" label="2">夜尿多</el-radio>
 <el-radio v-model="infoForm.g2001" label="3">尿频</el-radio>
 <el-radio v-model="infoForm.g2001" label="4">淋漓不尽</el-radio>
 <el-radio v-model="infoForm.g2001" label="5">色黄</el-radio>
 <el-radio v-model="infoForm.g2001" label="6">小便短</el-radio>
 <el-radio v-model="infoForm.g2001" label="7">尿痛</el-radio>
 <el-radio v-model="infoForm.g2001" label="8">正常</el-radio>
</el-form-item>
<el-form-item label="20b. 大便：">
 <el-radio v-model="infoForm.g2002" label="1">便秘</el-radio>
 <el-radio v-model="infoForm.g2002" label="2">便干（燥结）</el-radio>
 <el-radio v-model="infoForm.g2002" label="3">便溏</el-radio>
 <el-radio v-model="infoForm.g2002" label="4">粘滞不爽</el-radio>
 <el-radio v-model="infoForm.g2002" label="5">完谷不化</el-radio>
 <el-radio v-model="infoForm.g2002" label="6">肛门下坠</el-radio>
 <el-radio v-model="infoForm.g2002" label="7">五更泄泻</el-radio>
 <el-radio v-model="infoForm.g2002" label="8">正常</el-radio>
</el-form-item>

 <el-divider content-position="left">21. 舌脉：（以下由调查者填写）</el-divider>
<el-form-item label="21a. 舌色：">
 <el-radio v-model="infoForm.g2101" label="1">淡白</el-radio>
 <el-radio v-model="infoForm.g2101" label="2">淡红</el-radio>
 <el-radio v-model="infoForm.g2101" label="3">红</el-radio>
 <el-radio v-model="infoForm.g2101" label="4">绛</el-radio>
 <el-radio v-model="infoForm.g2101" label="5">紫黯</el-radio>
 <el-radio v-model="infoForm.g2101" label="6">淡黯</el-radio>
 <el-radio v-model="infoForm.g2101" label="7">瘀点瘀斑</el-radio>
</el-form-item>
<el-form-item label="21b. 舌体形质：">
 <el-radio v-model="infoForm.g2102" label="1">正常</el-radio>
 <el-radio v-model="infoForm.g2102" label="2">齿痕</el-radio>
 <el-radio v-model="infoForm.g2102" label="3">点刺</el-radio>
 <el-radio v-model="infoForm.g2102" label="4">裂纹</el-radio>
 <el-radio v-model="infoForm.g2102" label="5">胖大</el-radio>
 <el-radio v-model="infoForm.g2102" label="6">瘦薄</el-radio>
 <el-radio v-model="infoForm.g2102" label="7">老</el-radio>
 <el-radio v-model="infoForm.g2102" label="8">嫩</el-radio>
</el-form-item>
<el-form-item label="21c. 舌态：">
 <el-radio v-model="infoForm.g2103" label="1">正常</el-radio>
 <el-radio v-model="infoForm.g2103" label="2">歪斜舌</el-radio>
 <el-radio v-model="infoForm.g2103" label="3">萎软舌</el-radio>
 <el-radio v-model="infoForm.g2103" label="4">强硬舌</el-radio>
 <el-radio v-model="infoForm.g2103" label="5">颤动舌</el-radio>
 <el-radio v-model="infoForm.g2103" label="6">短缩舌</el-radio>
 <el-radio v-model="infoForm.g2103" label="7">吐弄舌</el-radio>
</el-form-item>
<el-form-item label="21d. 舌下脉络：">
 <el-radio v-model="infoForm.g2104" label="1">正常</el-radio>
 <el-radio v-model="infoForm.g2104" label="2">粗胀</el-radio>
 <el-radio v-model="infoForm.g2104" label="3">曲张</el-radio>
 <el-radio v-model="infoForm.g2104" label="4">绛紫</el-radio>
 <el-radio v-model="infoForm.g2104" label="5">紫红</el-radio>
 <el-radio v-model="infoForm.g2104" label="6">紫黑</el-radio>
</el-form-item>
<el-form-item label="21e. 舌苔苔色：">
 <el-radio v-model="infoForm.g2105" label="1">白</el-radio>
 <el-radio v-model="infoForm.g2105" label="2">黄</el-radio>
 <el-radio v-model="infoForm.g2105" label="3">灰黑</el-radio>
 <el-radio v-model="infoForm.g2105" label="4">其它</el-radio>
</el-form-item>
<el-form-item label="21f. 舌苔苔质：">
 <el-radio v-model="infoForm.g2106" label="1">薄</el-radio>
 <el-radio v-model="infoForm.g2106" label="2">厚</el-radio>
 <el-radio v-model="infoForm.g2106" label="3">润</el-radio>
 <el-radio v-model="infoForm.g2106" label="4">燥</el-radio>
 <el-radio v-model="infoForm.g2106" label="5">滑</el-radio>
 <el-radio v-model="infoForm.g2106" label="6">腻</el-radio>
 <el-radio v-model="infoForm.g2106" label="7">糙</el-radio>
 <el-radio v-model="infoForm.g2106" label="8">腐</el-radio>
 <el-radio v-model="infoForm.g2106" label="9">剥苔</el-radio>
 <el-radio v-model="infoForm.g2106" label="10">类剥苔</el-radio>
 <el-radio v-model="infoForm.g2106" label="11">少苔</el-radio>
 <el-radio v-model="infoForm.g2106" label="12">无苔</el-radio>
 <el-radio v-model="infoForm.g2106" label="13">假苔</el-radio>
 <el-radio v-model="infoForm.g2106" label="14">其它</el-radio>
</el-form-item>
<el-form-item label="21g. 脉象：">
 <el-radio v-model="infoForm.g2107" label="1">平脉</el-radio>
 <el-radio v-model="infoForm.g2107" label="2">沉</el-radio>
 <el-radio v-model="infoForm.g2107" label="3">浮</el-radio>
 <el-radio v-model="infoForm.g2107" label="4">紧</el-radio>
 <el-radio v-model="infoForm.g2107" label="5">迟</el-radio>
 <el-radio v-model="infoForm.g2107" label="6">数</el-radio>
 <el-radio v-model="infoForm.g2107" label="7">缓</el-radio>
 <el-radio v-model="infoForm.g2107" label="8">虚</el-radio>
 <el-radio v-model="infoForm.g2107" label="9">细</el-radio>
 <el-radio v-model="infoForm.g2107" label="10">弱</el-radio>
 <el-radio v-model="infoForm.g2107" label="11">弦</el-radio>
 <el-radio v-model="infoForm.g2107" label="12">滑</el-radio>
 <el-radio v-model="infoForm.g2107" label="13">涩</el-radio>
 <el-radio v-model="infoForm.g2107" label="14">濡</el-radio>
 <el-radio v-model="infoForm.g2107" label="15">结</el-radio>
 <el-radio v-model="infoForm.g2107" label="16">代</el-radio>
 <el-radio v-model="infoForm.g2107" label="17">其它</el-radio>
</el-form-item>

    </el-form>

    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj009";

export default {
  name: "Relevant",
  data() {
    return {
      infoForm: {
        g01:0,
        g02:0,
        g03:0,
        g04:0,
        g05:0,
        g06:0,
        g07:0,
        g08:0,
        g09:0,
        g10:0,
        g11:0,
        g1201:0,
        g1202:0,
        g1301:0,
        g1302:0,
        g1303:0,
        g1304:0,
        g1305:0,
        g1306:0,
        g14:0,
        g15:0,
        g16:0,
        g17:0,
        g18:0,
        g19:0,
        g2001:0,
        g2002:0,
        g2101:0,
        g2102:0,
        g2103:0,
        g2104:0,
        g2105:0,
        g2106:0,
        g2107:0
      },
      dialogVisible: false,
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: ""
    };
  },
  created() {
    this.$on("openEvent", data => {
      console.log("全身症状数据: ", data);
      this.dialogVisible = true;
      this.check_status = data.check_status;
      this.isOwnedByUser = data.isOwnedByUser;
      this.formName = data.formName;
      this._id = data._id;

      if ("id" in data.result) {
        this.infoForm = this.parseInfoForm(data.result);
      }
    });
  },
  methods: {
    updateInfoForm() {
      apiUpdatePatientDataForm({
        _id: this._id,
        infoForm: this.infoForm,
        formName: this.formName
      })
        .then(res => {
          if (res.detail) {
            this.$message({
              message: res.detail,
              type: "error"
            });
          } else {
            this.$message({ message: "提交成功", type: "success" });
          }
          this.dialogVisible = false;
          this.$parent.searchPatient();
          this.$parent.getPatients();
        })
        .catch();
    },
    parseInfoForm(stringifyParams) {
      for (let key in stringifyParams) {
        let reg = /^\[.+\]$/;
        stringifyParams[key] = reg.test(stringifyParams[key])
          ? JSON.parse(stringifyParams[key])
          : stringifyParams[key];
      }
      return stringifyParams;
    }
  }
};
</script>
