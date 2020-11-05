<template>
    <el-form ref="summaryForm" :model="summaryForm" :rules="rules"
            label-width="110px" label-position="left" class="mobile">
      <el-form-item label="1、主诉">
        <el-form-item v-for="(val, key) in mydata.zhusu"
                      class="summary-input"
                      :key="key" :prop="key">
            {{val}}<el-input v-model="summaryForm[key]" type="number" min="0"></el-input>
            {{(key=='owner_buguize')?'天':'月'}}
        </el-form-item>
        <el-input v-model="summaryForm.owner_qita" placeholder="其他情况"></el-input>
      </el-form-item>

      <el-form-item label="2、出血量">
        <el-radio v-for="item in mydata.blood_cond"
                  :key="item" :label="item"
                  v-model="summaryForm.blood_cond">
        </el-radio>
        <el-input v-model="summaryForm.ss_blood_cond_qita" placeholder="其他情况"></el-input>
      </el-form-item>

      <el-form-item label="3、出血颜色">
        <el-radio v-for="item in mydata.blood_color"
                  :key="item" :label="item"
                  v-model="summaryForm.blood_color">
        </el-radio>
        <el-input v-model="summaryForm.ss_blood_color_qita" placeholder="其他情况"></el-input>
      </el-form-item>

      <el-form-item label="4、出血质地">
        1、<el-radio v-for="item in mydata.blood_quality"
                  :key="item" :label="item"
                  v-model="summaryForm.blood_quality">
        </el-radio>
        <p></p>
        2、<el-radio v-for="item in mydata.blood_block"
                  :key="item" :label="item"
                  v-model="summaryForm.blood_block">
        </el-radio>
        <el-input v-model="summaryForm.ss_blood_block_qita" placeholder="其他情况"></el-input>
      </el-form-item>

      <el-form-item label="5、出血特点">
        <el-radio v-for="item in mydata.blood_character"
                  :key="item" :label="item"
                  v-model="summaryForm.blood_character">
        </el-radio>
      </el-form-item>

      <template v-for="(q_val,q_key,q_index) in mydata.for_loop">
        <el-form-item :label="q_key" :key="q_key">
          <el-checkbox v-for="(val, key) in q_val" :key="key" :label="val" v-model="summaryForm[key]">
          </el-checkbox>
          <el-input v-model="summaryForm[mydata.qita[q_index]]" v-if="mydata.qita[q_index]!='sex_qita'" placeholder="其他"></el-input>
        </el-form-item>
      </template>

      <el-divider content-position="center"><span style="color:red;font-size:13px">以下请在医生指导下填写</span></el-divider>
      <el-form-item label="19、舌质">
        <el-checkbox v-for="(val, key) in mydata.tongue_texture" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-model="summaryForm.texture_qita"></el-input>
      </el-form-item>
      <el-form-item label="20、舌苔">
        <el-checkbox v-for="(val, key) in mydata.tongue_coating" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-model="summaryForm.coating_qita"></el-input>
      </el-form-item>
      <el-form-item label="21、舌体">
        <el-checkbox v-for="(val, key) in mydata.tongue_body" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-model="summaryForm.tongue_qita"></el-input>
      </el-form-item>
      <el-form-item label="22、脉象">
        <el-checkbox v-for="(val, key) in mydata.pulse" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-model="summaryForm.pulse_qita"></el-input>
      </el-form-item>

    </el-form>

</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj001'
export default {
  name:'SummaryForm',
  data() {
    return {
      mydata: {
        for_loop:{
        '6、精神情绪':    {'spirit_jinglichongpei':'精力充沛','spirit_shenpifali':'神疲乏力','spirit_jianwang':'健忘','spirit_yalida':'压力大','spirit_jiaolv':'焦虑','spirit_yiyu':'抑郁','spirit_xinu':'喜怒无常','spirit_yinu':'烦躁易怒','spirit_beishangyuku':'悲伤欲哭'},
        '7、寒热及汗出':  {'sweat_zhengchang':'正常','sweat_weihan':'畏寒','sweat_weire':'畏热','sweat_wuxin':'五心烦热','sweat_chaore':'潮热','sweat_dire':'低热不退','sweat_dongze':'动则汗出','sweat_yewo':'夜卧汗出,醒后汗出','sweat_hongre':'烘热汗出'},
        '8、面色':       {'face_zhengchang':'正常','face_danbaiwuhua':'淡白无华','face_cangbai':'苍白','face_qingbai':'青白','face_baierfuzhong':'白而浮肿','face_weihuang':'萎黄','face_huangzhong':'黄肿','face_chaohong':'潮红','face_huian':'晦黯','face_mianmulihei':'面目黧黑'},
        '9、头面部':     {'head_zhengchang':'正常','head_touyun':'头晕','head_toutong':'头痛','head_touchenzhong':'头沉重','eyes_yanhua':'眼花','eyes_muxuan':'目眩','eyes_muse':'目涩','eyes_muyang':'目痒','eyes_chenqifz':'晨起眼睑浮肿','ear_erming':'耳鸣','ear_erlong':'耳聋','ear_xiajiang':'听力下降','ear_chongfu':'声音重复'},
        '10、口咽部':    {'breath_wuyiwei':'口中无异味','breath_kouku':'口苦','breath_kougan':'口干','breath_kounian':'口粘','breath_buyuyan':'口干不欲饮','throat_yantong':'咽痛','throat_yanyang':'咽痒','throat_yiwugan':'咽部异物感'},
        '11、胸胁及语音': {'sound_zhengchang':'正常','sound_xinhuang':'心慌','sound_qiduan':'气短','breast_zhangmen':'胸胁胀闷','breast_yintong':'胸胁隐痛','breast_citong':'胸胁刺痛','breast_biezhang':'乳房憋涨','bre_citong':'乳房刺痛','bre_zhangtong':'乳房胀痛','sound_xitanxi':'喜叹息','sound_shaoqi':'少气懒言'},
        '12、腹腰':      {'stomach_zhengchang':'正常','stomach_zhangtongjuan':'小腹胀痛拒按','stomach_yintongxian':'小腹隐痛喜按','stomach_xiaofuzhuizhang':'小腹下坠感','stomach_xiaofubiezhang':'小腹憋胀','stomach_xiaofulengtong':'小腹冷痛','stomach_zhuotong':'小腹灼痛','stomach_xiaofucitong':'小腹刺痛','stomach_yaosuan':'腰酸痛','stomach_yaoleng':'腰冷痛'},
        '13、四肢':      {'limb_zhengchang':'正常','limb_wuli':'无力','limb_mamu':'麻木','limb_kunzhong':'困重','limb_zhileng':'肢冷','limb_fuzhong':'浮肿','limb_szxinre':'手足心热'},
        '14、饮食':      {'diet_zhengchang':'正常','diet_nadaishishao':'食欲不振','diet_shiyuws':'多食易饥','diet_xireyin':'喜热饮','diet_xilengyin':'喜冷饮','diet_shixinla':'喜辛辣','diet_bushu':'食后胃脘不舒'},
        '15、睡眠':      {'sleep_zhengchang':'正常','sleep_duomeng':'多梦','sleep_yixing':'易醒','sleep_nanyirumian':'难以入眠','sleep_cheyebumian':'彻夜不眠','sleep_shishui':'嗜睡'},
        '16、性欲':      {'sex_zhengchang':'正常','sex_xywangsheng':'性欲旺盛','sex_xyjiantui':'性欲减退'},
        '17、大便':      {'stool_zhengchang':'正常','stool_biangan':'便干','stool_zhixi':'质稀','stool_sgsx':'时干时稀','stool_xiexie':'泄泻','stool_tlzqxiexie':'天亮前泄泻','stool_zhinian':'质黏，有排不尽','stool_weixiaohua':'夹杂未消化食物'},
        '18、小便':      {'urine_zhengchang':'正常','urine_duanhuang':'短黄','urine_qingchang':'清长','urine_xbpinshu':'频数','urine_niaoji':'尿急','urine_niaotong':'尿痛','urine_yulibujin':'余沥不尽','urine_shaoniao':'少尿','urine_yeniaopin':'夜尿频'},
        },
        'qita':           ['spirit_qita','sweat_qita','face_qita','e_qita','breath_qita','s_qita','stomach_qita','limb_qita','diet_qita','sleep_qita','sex_qita','stool_qita','urine_qita'],
        'zhusu':          {'owner_buguize':'(1)阴道不规则流血','owner_suoduan':'(2)月经周期缩短','owner_yanchang':'(3)行经时间延长','owner_liangduo':'(4)月经量多','owner_pailuan':'(5)排卵期出血'},
        'blood_cond':     ["出血量中等,每天约需2-4张卫生巾","出血量多,每天约需5-10张卫生巾","出血量极多,每天多于10张卫生巾","经量少,每天少于1张卫生巾","经量极少,几乎不用卫生巾,用护垫即可"],
        'blood_color':    ["淡红","鲜红","暗红","紫红","紫黯","紫黑","褐色",],
        'blood_quality':  ["正常","粘稠","清稀"],
        'blood_block':    ["无血块","经常出现血块","偶有血块","夹少量小血块","夹较大血块"],
        'blood_character':["不畅","势急暴下","淋漓不断","点滴即净"],

        'tongue_texture': {'texture_danhong':'淡红','texture_danbai':'淡白','texture_pianhong':'鲜红','texture_shenhong':'深红','texture_zihong':'紫红','texture_anhong':'黯红','texture_danan':'淡黯','texture_zian':'紫黯','texture_yudian':'有瘀点或瘀斑','texture_jianhong':'舌边尖红'},
        'texture_qita':   '其他',
        'tongue_coating': {'coating_bai':'白','coating_huang':'黄','coating_bo':'薄','coating_hou':'厚','coating_ni':'腻','coating_run':'润','coating_hua':'滑','coating_gan':'干','coating_shaotai':'少苔','coating_huabo':'花剥','coating_wutai':'无苔'},
        'coating_qita':   '其他',
        'tongue_body':    {'tongue_zhengchang':'正常','tongue_shouxiao':'瘦小','tongue_pangda':'胖大','tongue_youchihen':'有齿痕','tongue_youliewen':'有裂纹'},
        'tongue_qita':    '其他',
        'pulse':          {'pulse_fu':'浮','pulse_chen':'沉','pulse_hua':'滑','pulse_shu':'数','pulse_xian':'弦','pulse_xi':'细','pulse_ruo':'弱','pulse_huan':'缓','pulse_chi':'迟','pulse_se':'涩','pulse_jin':'紧'},
        'pulse_qita':     '其他',
      },

      summaryForm:{},
      rules:{
          owner_buguize: [{pattern: /^\d{0,4}$/, message: '病情概要: 请填写整数。数值不是合理值',trigger: 'blur'}],
          owner_suoduan: [{pattern: /^\d{0,4}$/, message: '病情概要: 请填写整数。数值不是合理值',trigger: 'blur'}],
          owner_yanchang: [{pattern: /^\d{0,4}$/, message: '病情概要: 请填写整数。数值不是合理值',trigger: 'blur'}],
          owner_liangduo: [{pattern: /^\d{0,4}$/, message: '病情概要: 请填写整数。数值不是合理值',trigger: 'blur'}],
          owner_pailuan: [{pattern: /^\d{0,4}$/, message: '病情概要: 请填写整数。数值不是合理值',trigger: 'blur'}],
        },
    }
  },
  methods: {
  },
}
</script>
<style lang="scss">
  .summary-input  {
    .el-input__inner {
        width: 80px;
        border-radius:1px;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
    }
    .el-form-item__error {
      position: relative;
    }
    .el-input {
        display: inline;
    }
  }

  .el-checkbox {
      margin-right: 10px
  }

  .el-input {
      margin-top: 10px;
  }
</style>

