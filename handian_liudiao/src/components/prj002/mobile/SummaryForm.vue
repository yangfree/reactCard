<template>
    <el-form ref="summaryForm" :model="summaryForm"
            class="mobile" label-width="60px" label-position="left">


      <h4>1.月经情况</h4>
        <h5>(1)周期 <el-switch v-model="summaryForm.is_normal" active-text="规律" inactive-text="不规律"></el-switch></h5>
          <div v-show="summaryForm.is_normal">
            <el-radio v-model="summaryForm.normal"
                      v-for="item in normal"
                      :key="item" :label="item">
            </el-radio>
          </div>
          <div v-show="!summaryForm.is_normal">
            <el-radio v-model="summaryForm.abnormal"
                      v-for="item in abnormal"
                      :key="item" :label="item">
            </el-radio>
          </div>
        <h5>(2)经期</h5>
          <el-radio v-model="summaryForm.jingqi"
                  v-for="item in jingqi"
                  :key="item" :label="item">
          </el-radio>
        <h5>(3)血量</h5>
          <el-radio v-model="summaryForm.xueliang"
                    v-for="item in xueliang"
                    :key="item" :label="item">
          </el-radio>
        <h5>(4)颜色</h5>
          <el-radio v-model="summaryForm.yanse"
                    v-for="item in yanse"
                    :key="item" :label="item">
          </el-radio>
        <h5>(5)质地</h5>
          <el-radio v-model="summaryForm.zhidi"
                    v-for="item in zhidi"
                    :key="item+'1'" :label="item">
          </el-radio>
        <h5>(6)出血特点</h5>
          <el-radio v-model="summaryForm.tedian"
                    v-for="item in tedian"
                    :key="item" :label="item">
          </el-radio>
        <h5>(7)月经前后伴随症状 <el-switch v-model="summaryForm.menstruation_accompany" active-text="有" inactive-text="无"></el-switch></h5>
          <div v-show="summaryForm.menstruation_accompany">
            <el-checkbox v-for="(val, key) in accompany_symptom"
                      v-model="summaryForm[key]"
                      :key="key" :label="val">
            </el-checkbox>
          </div>
        <h5>(8)月经近期异常持续时间 <el-input v-model="summaryForm.yichang_chixu"></el-input></h5>

      <h4>2.带下情况</h4>
        <h5>(1)带下量</h5>
          <el-radio v-model="summaryForm.daixia_liang"
                    v-for="item in daixia_liang"
                    :key="item" :label="item">
          </el-radio>
        <h5>(2)颜色</h5>
          <el-radio v-model="summaryForm.daixia_se"
                    v-for="item in daixia_se"
                    :key="item" :label="item">
          </el-radio>
        <h5>(3)质地</h5>
          <el-radio v-model="summaryForm.daixia_zhi"
                    v-for="item in daixia_zhi"
                    :key="item" :label="item">
          </el-radio>

      <h4>3.全身症状</h4>
        <h5></h5>

      <table border="1" cellspacing="0">
        <tr>
          <th>头面部</th>
          <th v-for="item in list_head" :key="item">{{item}}</th>
        </tr>
        <tr v-for="(val, key) in mydata.face_head" :key="key">
          <td>{{val}}</td>
          <td v-for="item in list" :key="item"><el-radio v-model="summaryForm[key]" :label="item"></el-radio></td>
        </tr>
        <tr>
          <td>面色</td>
          <td colspan="4">
            <el-checkbox v-for="(val, key) in mydata.face_color" :key="key"
                        v-model="summaryForm[key]" :label="val">
            </el-checkbox>
          </td>
        </tr>
        <tr>
          <td>口咽部</td>
          <td colspan="4">
            <el-checkbox v-for="(val, key) in mydata.mouth" :key="key"
                        v-model="summaryForm[key]" :label="val">
            </el-checkbox>
          </td>
        </tr>

        <tr>
          <th>精神情绪</th>
          <th v-for="item in list_head" :key="item">{{item}}</th>
        </tr>
        <tr v-for="(val, key) in mydata.spirit" :key="key">
          <td>{{val}}</td>
          <td v-for="item in list" :key="item"><el-radio v-model="summaryForm[key]" :label="item"></el-radio></td>
        </tr>
        <tr>
          <td><strong>四肢</strong></td>
          <td colspan="4">
            <el-checkbox v-for="(val, key) in mydata.limbs" :key="key"
                        v-model="summaryForm[key]" :label="val">
            </el-checkbox>
          </td>
        </tr>
        <tr>
          <td><strong>形体</strong></td>
          <td colspan="4">
            <el-checkbox v-for="(val, key) in mydata.body" :key="key"
                        v-model="summaryForm[key]" :label="val">
            </el-checkbox>
          </td>
        </tr>

        <tr>
          <th>胸胁</th>
          <th v-for="item in list_head" :key="item">{{item}}</th>
        </tr>
        <tr v-for="(val, key) in mydata.chest" :key="key">
          <td>{{val}}</td>
          <td v-for="item in list" :key="item"><el-radio v-model="summaryForm[key]" :label="item"></el-radio></td>
        </tr>
        <tr>
          <td><strong>寒热及汗出</strong></td>
          <td colspan="4">
            <el-checkbox v-for="(val, key) in mydata.cold_hot" :key="key"
                        v-model="summaryForm[key]" :label="val">
            </el-checkbox>
          </td>
        </tr>

        <tr>
          <th>腹腰</th>
          <th v-for="item in list_head" :key="item">{{item}}</th>
        </tr>
        <tr v-for="(val, key) in mydata.waist" :key="key">
          <td>{{val}}</td>
          <td v-for="item in list" :key="item"><el-radio v-model="summaryForm[key]" :label="item"></el-radio></td>
        </tr>
        <tr>
          <td><strong>睡眠</strong></td>
          <td colspan="4">
            <el-checkbox v-for="(val, key) in mydata.sleep" :key="key"
                        v-model="summaryForm[key]" :label="val">
            </el-checkbox>
          </td>
        </tr>

        <tr>
          <th>饮食</th>
          <th v-for="item in list_head" :key="item">{{item}}</th>
        </tr>
        <tr v-for="(val, key) in mydata.diet" :key="key">
          <td>{{val}}</td>
          <td v-for="item in list" :key="item"><el-radio v-model="summaryForm[key]" :label="item"></el-radio></td>
        </tr>
        <tr>
          <td><strong>皮肤</strong></td>
          <td colspan="4">
            <el-checkbox v-for="(val, key) in mydata.skin" :key="key"
                        v-model="summaryForm[key]" :label="val">
            </el-checkbox>
          </td>
        </tr>
        <tr>
          <td><strong>小便</strong></td>
          <td colspan="4">
            <el-checkbox v-for="(val, key) in mydata.pee" :key="key"
                        v-model="summaryForm[key]" :label="val">
            </el-checkbox>
          </td>
        </tr>

        <tr>
          <th>大便</th>
          <th v-for="item in list_head" :key="item">{{item}}</th>
        </tr>
        <tr v-for="(val, key) in mydata.feces" :key="key">
          <td>{{val}}</td>
          <td v-for="item in list" :key="item"><el-radio v-model="summaryForm[key]" :label="item"></el-radio></td>
        </tr>
        <tr>
          <td>其他</td>
          <td colspan="4">
            <el-checkbox v-for="(val, key) in mydata.qita" :key="key"
                        v-model="summaryForm[key]" :label="val">
            </el-checkbox>
          </td>
        </tr>
      </table>

      <el-form-item label="舌质">
        <el-checkbox v-for="(val, key) in tongue_texture" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-model="summaryForm.texture_qita"></el-input>
      </el-form-item>
      <el-form-item label="舌苔">
        <el-checkbox v-for="(val, key) in tongue_coating" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-model="summaryForm.coating_qita"></el-input>
      </el-form-item>
      <el-form-item label="舌体">
        <el-checkbox v-for="(val, key) in tongue_body" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-model="summaryForm.tongue_qita"></el-input>
      </el-form-item>
      <el-form-item label="脉象">
        <el-checkbox v-for="(val, key) in pulse" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-model="summaryForm.pulse_qita"></el-input>
      </el-form-item>

      </el-form-item>

    </el-form>
</template>
<script>
export default {
  name:'SummaryForm',
  data() {
    return {
      "normal":["21-25天","26-30天","31-35天"],
      "abnormal":["1月多次","1＜周期≤2个月1行","2＜周期≤3个月1行","3＜周期≤6个月1行","周期＞6个月1行"],
      "jingqi":["≤2天","3≤天数≤7天","7＜天数≤15天"],
      "xueliang":["≤5张卫生巾(日用)","6-10张卫生巾(日用)","11-19张卫生巾(日用)","≥20张卫生巾(日用或夜用)","几乎不用卫生巾,用护垫即可"],
      "yanse":["淡红","鲜红","暗红","深红","淡黯","紫黯","紫黑","褐色",],
      "zhidi":["正常","粘稠","清稀","经常出现血块","偶有血块"],
      "tedian":["顺畅","不顺畅","血崩（出血量多，势急）","淋漓不断","点滴即净"],
      "accompany_symptom":{
          "accompany_rufang":"乳房胀痛",
          "accompany_toutong":"头痛",
          "accompany_touyun":"头晕",
          "accompany_fare":"发热",
          "accompany_koushe":"口舌糜烂",
          "accompany_zhiti":"肢体浮肿",
          "accompany_xiexie":"泄泻",
          "accompany_saoyang":"疹块瘙痒",
          "accompany_yichang":"情志异常",
          "accompany_futong":"腹痛",
          "accompany_juan":"腹疼痛拒按",
          "accompany_xian":"腹痛喜按",
          "accompany_dere":"腹痛得热痛减",
          "accompany_xuekuai":"血块下痛减",
          "accompany_gangmen":"肛门坠胀"
        },
      "daixia_liang":["正常","少","多"],
      "daixia_se":["透明","黄","白","黄绿","赤"],
      "daixia_zhi":["黏而不稠","稀薄","稠"],
      "list":["无","轻","中","重"],
      "list_head":["无","轻(偶尔或不舒影响轻)","中(多时或不舒但能忍受)","重(绝大部分或全部时间或不舒难以忍受)"],

      mydata: {
        'face_head': {'body_touyun':'头晕','body_erming':'耳鸣','body_touzhang':'头胀','body_touzhong':'头重如裹','body_yanhua':'目眩眼花','body_ganyang':'目涩干痒','body_fuzhong':'晨起眼睑浮肿'},
        'face_color':{"body_face_zc":"正常",'body_face_fu':'面白浮肿','body_face_hui':'面色晦暗','body_face_wei':'面色萎黄','body_face_dan':'面色淡白无华','body_face_chao':'面色潮红','body_face_hei':'面目黧黑','body_face_hong':'面红唇赤'},
        'mouth':     {'body_kou_zc':'正常','body_kou_chi':'齿松发脱','body_kou_gan':'口干不欲饮','body_kou_ke':'口渴欲饮','body_kou_nian':'口黏腻','body_kou_dan':'口淡','body_kou_ku':'口苦','body_kou_suan':'口酸','body_kou_tian':'口甜','body_kou_xian':'口咸','body_kou_yan':'咽干','body_kou_tong':'咽痛','body_kou_yang':'咽痒','body_kou_yiwu':'咽部异物感','body_kou_duotan':'喉间多痰'},

        'spirit':    {'body_chongpei':'精力充沛','body_shishui':'嗜睡','body_fali':'神疲乏力','body_yiyu':'精神抑郁','body_jiaolv':'焦虑','body_jianwang':'健忘','body_fanzao':'烦躁易怒','body_kangfen':'亢奋'},
        'limbs':     {'body_sizhi_zc':'正常','body_sizhi_mamu':'麻木','body_sizhi_shouzu':'手足心热','body_sizhi_zhiti':'肢体困重','body_sizhi_yaoxi':'腰膝酸软','body_sizhi_weihan':'畏寒肢冷','body_sizhi_zugen':'足跟痛'},
        'body':      {'body_xing_zc':'正常','body_xing_fuzhong':'肢体浮肿','body_xing_fei':'形体肥胖','body_xing_shou':'形体瘦弱'},

        'chest':     {'body_xinji':'心慌心悸','body_xiongmen':'胸闷','body_qiduan':'气短','body_taixi':'善太息','body_exin':'恶心','body_outu':'呕吐','body_zhang':'胸胁胀满','body_ci':'胸胁刺痛','body_ruzhang':'乳房胀痛','body_ruci':'乳房刺痛','body_yiru':'溢乳'},
        'cold_hot':  {'body_han_zc':'正常','body_han_re':'畏热','body_han_weihan':'畏寒','body_han_han':'烘热汗出','body_han_fan':'五心烦热','body_han_wu':'午后发热','body_han_shen':'身热不扬','body_han_di':'低热不退','body_han_chao':'潮热颧红','body_han_dong':'动则汗出','body_han_zi':'自汗','body_han_dao':'盗汗'},

        'waist':     {'body_fuzhang':'脘腹胀满','body_zhangtong':'腹部胀痛','body_yintong':'腹部隐痛','body_zhuitong':'腹部坠痛','body_kongtong':'腹部空痛','body_zhuotong':'腹部灼痛','body_citong':'腹部刺痛','body_suantong':'腰部酸痛','body_lengtong':'腰部冷痛'},
        'sleep':     {'body_sleep_yixing':'易醒','body_sleep_shishui':'嗜睡','body_sleep_duomeng':'多梦','body_sleep_shimian':'失眠'},

        'diet':      {'body_shiyu':'食欲不振','body_duoshi':'多食易饥','body_xire':'喜热饮','body_xileng':'喜冷饮','body_xixin':'喜辛辣','body_shihou':'食后腹胀','body_shishao':'食少纳呆','body_fansuan':'嗳气反酸','body_baoyin':'暴饮暴食'},
        'skin':      {'body_skin_zc':'正常','body_skin_cucao':'皮肤粗糙','body_skin_youzhi':'汗粘油脂多','body_skin_jifu':'肌肤甲错'},
        'pee':       {'body_xiao_zc':'正常','body_xiao_shu':'频数','body_xiao_ji':'尿急','body_xiao_tong':'尿痛','body_xiao_duo':'夜尿频多','body_xiao_bujin':'余沥不尽','body_xiao_qing':'小便清长','body_xiao_huang':'小便黄','body_xiao_chi':'小便赤'},

        'feces':     {'body_xitang':'大便稀溏','body_mijie':'大便秘结','body_ganxi':'时干时稀','body_qianxie':'天亮前泄泻','body_nianni':'大便黏腻','body_jia':'夹未消化食物'},
        'qita':      {'body_qita_xing':'性欲减退','body_qita_yin':'阴道干涩','body_qita_chen':'唇甲青紫','body_qita_xiong':'胸腹满闷'}
      },
      tongue_texture: {'texture_danhong':'淡红','texture_danbai':'淡白','texture_xianhong':'鲜红','texture_shenhong':'深红','texture_zihong':'紫红','texture_anhong':'黯红','texture_danan':'淡黯','texture_zian':'紫黯','texture_yudian':'有瘀点或瘀斑','texture_jianhong':'舌边尖红'},
      texture_qita:   '其他',
      tongue_coating: {'coating_bai':'白','coating_huang':'黄','coating_bo':'薄','coating_hou':'厚','coating_ni':'腻','coating_run':'润','coating_hua':'滑','coating_gan':'干','coating_shaotai':'少苔','coating_huabo':'花剥','coating_wutai':'无苔'},
      coating_qita:   '其他',
      tongue_body:    {'tongue_zhengchang':'正常','tongue_shouxiao':'瘦小','tongue_pangda':'胖大','tongue_youchihen':'有齿痕','tongue_youliewen':'有裂纹'},
      tongue_qita:    '其他',
      pulse:          {'pulse_fu':'浮','pulse_chen':'沉','pulse_hua':'滑','pulse_shu':'数','pulse_xian':'弦','pulse_xi':'细','pulse_ruo':'弱','pulse_huan':'缓','pulse_chi':'迟','pulse_se':'涩','pulse_jin':'紧'},
      pulse_qita:     '其他',
      summaryForm:{
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

