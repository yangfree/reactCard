<template>
    <el-form ref="diseaseForm" :model="diseaseForm" class="mobile"
              label-width="80px" label-position="left">

      <h4>1. 多毛评分</h4>
        <table border="1" cellspacing="0" cellpadding="3px" style="width: 85%" class="mytable">
          <caption>Feriman－Gallwey多毛症评分表</caption>
          <tr>
            <th>区域</th>
            <th>0分</th> <th>1分</th> <th>2分</th> <th>3分</th> <th>4分</th> <th>分数</th>
          </tr>
          <tr v-for="(val, key) in hairy_table" :key="key">
            <td style="text-align:center">{{val.name}}</td>
            <td v-for="(item, index) in val.list" :key="item">
              <el-radio v-model="diseaseForm[key]" :label="index"
              @change="getHairyValue($event,key)">{{item}}</el-radio>
            </td>
            <td>{{val.score}}</td>
          </tr>
          <tr style="height:50px;">
            <td style="color:cornflowerblue;font-weight:600">多毛评分</td>
            <td colspan="6" style="text-align:center;">{{hairy_score}}</td>
          </tr>
        </table>
        <p></p>
        <img src="@/assets/hair.png" width="90%" alt="多毛图片" />

      <h4>2. 女性型脱发Ludwig分型 <el-switch v-model="diseaseForm.tuofa" active-text="有" inactive-text="无"></el-switch></h4>
        <div v-show="diseaseForm.tuofa">
          <p><el-radio v-model="diseaseForm.is_tuofa" label="I">Ⅰ型：头顶部毛发弥漫性稀少，毛发变细，头皮稍暴露</el-radio></p>
          <p><el-radio v-model="diseaseForm.is_tuofa" label="II">Ⅱ型；头顶＋前头部毛发稀少，毛发变纤细，头皮裸露稍明显</el-radio></p>
          <p><el-radio v-model="diseaseForm.is_tuofa" label="III">Ⅲ型：前头部＋头顶部头发明显稀疏，头发纤细，但发际线仍保留</el-radio></p>
        </div>

      <h4>3. 痤疮 <el-switch v-model="diseaseForm.chuochuang" active-text="有" inactive-text="无"></el-switch></h4>
        <div v-show="diseaseForm.chuochuang">
          <p>如果有，请描述具体部位 <el-input v-model="diseaseForm.is_chuochuang_buwei"></el-input></p>
          <table border="1" cellspacing="0" cellpadding="3px" style="width: 70%;margin:auto">
            <caption>痤疮评分表</caption>
            <tr>
              <th>评分</th> <th>类型</th> <th>临床表现</th>
            </tr>
            <tr v-for="item in cuochuang_table" :key="item.symptom">
              <td style="text-align:center;">
                <el-radio v-model="diseaseForm.is_chuochuang_score" :label="item.score">{{item.score+'分'}}</el-radio>
              </td>
              <td style="text-align:center;">{{item.type}}</td>
              <td>{{item.symptom}}</td>
            </tr>
          </table>
          <p>注：脓疱:由死皮细胞和细菌组成的皮肤感染。这些损害在外观上呈球形，里面充满脓液。颜色偏红，脓疱可能很疼，并且如果划伤或碰撞会轻易破开。</p>
        </div>

      <h4>4. 黑棘皮症 <el-switch v-model="diseaseForm.heiji" active-text="有" inactive-text="无"></el-switch></h4>
        <p>注：黑色棘皮症简称黑棘皮症，是以皮肤角化过度、色素沉着及乳头瘤样增生为特征的一种少见的皮肤病。）</p>
        <div v-show="diseaseForm.heiji">
          <p>如果有，请描述具体部位 <el-input v-model="diseaseForm.is_heiji_buwei"></el-input></p>
        </div>

      <h4>5. 抑郁自评</h4>
        <table border="1" cellspacing="0" cellpadding="3px" style="width: 85%;margin:auto">
          <caption>
            抑郁自评量表
            <p style="color:black;font-size:14px">说明：根据你最近1周的实际情况在适当的方格里面进行选择</p>
          </caption>
          <tr>
            <th>问题</th> <th>没有或很少时候</th> <th>小部分时候</th> <th>相当多时候</th> <th>绝大部分或全部时候</th> <th>单项分数</th>
          <tr v-for="(val, key) in depression_table" :key="key">
            <td style="text-align:left">{{val.name}}</td>
            <td v-for="(item, index) in val.list" :key="index+20" style="text-align:center">
              <el-radio v-model="diseaseForm[key]" :label="item" @change="getDepressionValue($event,key,index)">&nbsp;</el-radio>
            </td>
            <td>{{val.score}}</td>
          </tr>
          <tr style="height:50px;">
            <td style="color:cornflowerblue;font-weight:600;text-align:center">自测评分</td>
            <td colspan="5" style="text-align:center;">{{depression_score}}</td>
          </tr>
          <tr>
            <td colspan="6">
              <p>没有或很少时候（过去1周内，出现这类情况的日子不超过1天）</p>
              <p>小部分时候（过去1周内，有1-2天有过这类情况）</p>
              <p>相当多时候（过去1周内，3-4天有过这类情况）</p>
              <p>绝大部分或全部时候（过去1周内，有5-7天有过这类情况）</p>
            </td>
          </tr>
        </table>

      <h4>6. 焦虑自评</h4>
        <table border="1" cellspacing="0" cellpadding="3px" style="width: 85%;margin:auto">
          <caption>
            焦虑自评量表
            <p style="color:black;font-size:14px">说明：根据你最近1周的实际情况在适当的方格里面进行选择</p>
          </caption>
          <tr>
            <th>问题</th> <th>没有或很少时候</th> <th>小部分时候</th> <th>相当多时候</th> <th>绝大部分或全部时候</th> <th>单项分数</th>
          <tr v-for="(val, key) in anxiety_table" :key="key">
            <td style="text-align:left">{{val.name}}</td>
            <td v-for="(item, index) in val.list" :key="index+20" style="text-align:center">
              <el-radio v-model="diseaseForm[key]" :label="item" @change="getAnxietyValue($event,key,index)">&nbsp;</el-radio>
            </td>
            <td>{{val.score}}</td>
          </tr>
          <tr style="height:50px;">
            <td style="color:cornflowerblue;font-weight:600;text-align:center">自测评分</td>
            <td colspan="5" style="text-align:center;">{{anxiety_score}}</td>
          </tr>
          <tr>
            <td colspan="6">
              <p>没有或很少时候（过去1周内，出现这类情况的日子不超过1天）</p>
              <p>小部分时候（过去1周内，有1-2天有过这类情况）</p>
              <p>相当多时候（过去1周内，3-4天有过这类情况）</p>
              <p>绝大部分或全部时候（过去1周内，有5-7天有过这类情况）</p>
            </td>
          </tr>
        </table>

    </el-form>

</template>
<script>
export default {
  name:'StandardForm',
  data() {
    var list = {"0":"没有或很少时候","1":"小部分时候","2":"相当多时候","3":"绝大部分或全部时候"};
    return {
      hairy_table:{
        "chun":     {name:"上唇",list:{"0":"无毛","1":"散在几根","2":"外侧1/4",     "3":"外侧1/2",      "4":"全部上唇"},score:0},
        "xiae":     {name:"下额",list:{"0":"无毛","1":"散在几根","2":"散在，较多",   "3":"覆盖下额，较多", "4":"覆盖下额，密"},score:0},
        "xiongbu":  {name:"胸部",list:{"0":"无毛","1":"乳晕周围","2":"乳晕，胸中线", "3":"胸中线与乳晕相连","4":"覆盖前胸"},score:0},
        "shangfu":  {name:"上腹",list:{"0":"无毛","1":"中线几根","2":"中线，较多",   "3":"覆盖上腹1/2",   "4":"覆盖上腹全部"},score:0},
        "xiafu":    {name:"下腹",list:{"0":"无毛","1":"中线几根","2":"中线，细带状", "3":"中线，粗带状",   "4":"与阴毛相连，菱形"},score:0},
        "shangtun": {name:"上臀",list:{"0":"无毛","1":"内侧几根","2":"覆盖内侧面1/2","3":"覆盖内侧面，稀", "4":"覆盖内侧面，密"},score:0},
        "datui":    {name:"大腿",list:{"0":"无毛","1":"内侧几根","2":"覆盖内侧面1/3","3":"覆盖内侧面，稀", "4":"覆盖内侧面，密"},score:0},
        "shangbei": {name:"上背",list:{"0":"无毛","1":"散在几根","2":"覆盖上背部1/2","3":"覆盖上背，稀",   "4":"覆盖上背，密"},score:0},
        "yao":      {name:"腰骶",list:{"0":"无毛","1":"骶部几根","2":"覆盖腰骶部1/2","3":"覆盖腰骶部3/4",  "4":"覆盖整个腰骶部"},score:0},
      },
      cuochuang_table:{
        "cuochuang 0":{score:"0",type:"无",symptom:"无"},
        "cuochuang 1":{score:"1",type:"轻微",symptom:"痤疮≥2mm，面部或躯干<10个"},
        "cuochuang 2":{score:"2",type:"轻",symptom:"痤疮10-20个"},
        "cuochuang 3":{score:"3",type:"中",symptom:"痤疮>20个或脓疱<20个"},
        "cuochuang 4":{score:"4",type:"重",symptom:"脓疱≥20个"},
        "cuochuang 5":{score:"5",type:"囊性",symptom:"炎性皮损≥5mm"}
      },
      depression_table:{
        "yiyu_bule":    {name:"1  我觉得闷闷不乐，情绪低沉", list,score:0},
        "yiyu_zao":     {name:"2  我觉得一天之中早晨最好", list,score:0},
        "yiyu_ku":      {name:"3  我一阵阵地哭出来或是想哭", list,score:0},
        "yiyu_shui":    {name:"4  我晚上睡眠不好", list,score:0},
        "yiyu_chi":     {name:"5  我吃的和平时一样多", list,score:0},
        "yiyu_yixing":  {name:"6  我与异性接触时和以往一样感到愉快", list,score:0},
        "yiyu_tizhong": {name:"7  我发觉我的体重在下降", list,score:0},
        "yiyu_bian":    {name:"8  我有便秘的苦恼", list,score:0},
        "yiyu_xin":     {name:"9  我心跳比平时快", list,score:0},
        "yiyu_pifa":    {name:"10 我无缘无故感到疲乏", list,score:0},
        "yiyu_nao":     {name:"11 我的头脑和平时一样清楚", list,score:0},
        "yiyu_kunnan":  {name:"12 我觉得经常做的事情并没有困难", list,score:0},
        "yiyu_buan":    {name:"13 我觉得不安而平静不下来", list,score:0},
        "yiyu_xiwang":  {name:"14 我对将来抱有希望", list,score:0},
        "yiyu_jidong":  {name:"15 我比平常容易激动", list,score:0},
        "yiyu_jueding": {name:"16 我觉得做出决定是容易的", list,score:0},
        "yiyu_yong":    {name:"17 我觉得自己是个有用的人，有人需要我", list,score:0},
        "yiyu_yisi":    {name:"18 我的生活过得很有意思", list,score:0},
        "yiyu_si":      {name:"19 我认为如果我死了别人会生活的更好些", list,score:0},
        "yiyu_xing":    {name:"20 平常感兴趣的事我仍然照样感兴趣", list,score:0},
      },
      anxiety_table:{
        "jiaolv_jin":   {name:"1  我觉得比平常容易紧张和着急",          list,score:0},
        "jiaolv_wu":    {name:"2  我无缘无故地感到害怕",               list,score:0},
        "jiaolv_jing":  {name:"3  我容易心里烦乱或觉得惊慌",            list,score:0},
        "jiaolv_feng":  {name:"4  我觉得我可能将要发疯",               list,score:0},
        "jiaolv_hao":   {name:"5  我觉得一切都很好，也不会发生什么不幸 ", list,score:0, reverse:true},
        "jiaolv_yi":    {name:"6  我与异性接触时和以往一样感到愉快",     list,score:0},
        "jiaolv_ku":    {name:"7  我因为头痛、头颈痛和背痛而苦恼",       list,score:0},
        "jiaolv_pi":    {name:"8  我感觉容易衰弱和疲乏",               list,score:0},
        "jiaolv_ping":  {name:"9  我觉得心平气和，并且容易安静地坐着  ", list,score:0, reverse:true},
        "jiaolv_kuai":  {name:"10 我觉得心跳得很快",                   list,score:0},
        "jiaolv_yun":   {name:"11 我因为一阵阵头晕而苦恼",              list,score:0},
        "jiaolv_fazuo": {name:"12 我有晕倒发作，或觉得要晕倒似的",       list,score:0},
        "jiaolv_huxi":  {name:"13 我有晕倒发作，或觉得要晕倒似的  ",     list,score:0, reverse:true},
        "jiaolv_ma":    {name:"14 我手脚麻木和刺痛",                   list,score:0},
        "jiaolv_wei":   {name:"15 我因为胃痛和消化不良而苦恼",          list,score:0},
        "jiaolv_xiao":  {name:"16 我常常要小便",                      list,score:0},
        "jiaolv_shou":  {name:"17 我的手常常是干燥温暖的  ",           list,score:0, reverse:true},
        "jiaolv_lian":  {name:"18 我脸红发热",                       list,score:0},
        "jiaolv_ru":    {name:"19 我容易入睡并且一夜睡得很好 ",         list,score:0, reverse:true},
        "jiaolv_e":     {name:"20 我作恶梦",                         list,score:0},
      },
      diseaseForm:{},
      dialogVisible: false,
      exist: true,
      formName:'',
      check_status:''
    }
  },
  computed:{
    hairy_score () {
      var score = 0
      for (var item in this.hairy_table) {
        score += Number(this.hairy_table[item].score)
      }
      this.diseaseForm.total_score = score
      return score
    },
    depression_score () {
      var score = 0
      for (var item in this.depression_table) {
        score += Number(this.depression_table[item].score)
      }
      this.diseaseForm.depression = score
      return  Math.floor(1.25*  score)
    },
    anxiety_score () {
      var score = 0
      for (var item in this.anxiety_table) {
        score += Number(this.anxiety_table[item].score)
      }
      this.diseaseForm.anxiety = score
      return  Math.floor(1.25*  score)
    }
  },
  methods: {
    getHairyValue (e,key) {
      this.hairy_table[key].score = e
    },
    getDepressionValue (e,key,index) {
      this.depression_table[key].score = index
    },
    getAnxietyValue (e,key,index) {
      if (['jiaolv_hao', 'jiaolv_ping', 'jiaolv_huxi', 'jiaolv_shou', 'jiaolv_ru'].indexOf(key) !== -1) {
          index = 3 - Number(index)
      }
      this.anxiety_table[key].score = index
    }
  }
};
</script>
<style lang="scss">
.mytable {
  .el-radio, .el-radio__input {
      white-space:normal
  }
}
</style>