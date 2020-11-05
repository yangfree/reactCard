<template>
    <el-form ref="summaryForm" :model="summaryForm" :rules="rules"
            label-width="110px" label-position="left" class="mobile">


      <el-form-item label="主诉">
        <label>反复自然流产</label>
        <el-input v-model="summaryForm.zhusu" type="number" min="0">
          <template slot="append">次</template>
        </el-input>
      </el-form-item>


      <el-form-item label="既往自然流产孕周及次数"  label-width="100%"></el-form-item>
      <el-form-item label="">
        <template v-for="(q_val,q_key) in liuchan_time_choises">
          <el-checkbox  :label="q_val.name" v-model="summaryForm[q_val.para]">
          </el-checkbox>
          <el-input v-model="summaryForm[q_val.times]" type="number" min="0">
            <template slot="append">次</template>
          </el-input>
          </template>
      </el-form-item>

      <el-form-item  label-width="100%" label="最近一次流产时间">
      </el-form-item>
      <el-form-item label="">
        <el-date-picker v-model="summaryForm.liuchan_last_time"
                        type="month" placeholder="选择日期"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="是否活产过" >
        <el-switch v-model="summaryForm.live_is_checked" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
      <el-form-item v-show="summaryForm.live_is_checked"  label-width="100%" label="活产次数及方式">
      </el-form-item>
      <el-form-item v-show="summaryForm.live_is_checked" label="">
          <el-checkbox  label="顺产" v-model="summaryForm.shunchan">
          </el-checkbox>
          <el-input v-model="summaryForm.shunchan_times"  type="number" min="0">
            <template slot="append">次</template>
          </el-input>
          <el-checkbox  label="剖腹产" v-model="summaryForm.poufu">
          </el-checkbox>
          <el-input v-model="summaryForm.poufu_times"  type="number" min="0">
            <template slot="append">次</template>
          </el-input>
      </el-form-item>
      <el-form-item v-show="summaryForm.live_is_checked" label-width="100%" label="最近一次活产时间">
      </el-form-item>
      <el-form-item v-show="summaryForm.live_is_checked"  label="">
        <el-date-picker v-model="summaryForm.last_live"
                        type="month" placeholder="选择日期"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="末次月经时间">
        <el-date-picker v-model="summaryForm.last_time"
                        type="date" placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item label-width="100%" label="目前是否妊娠中">
      </el-form-item>
      <el-form-item label="">
        <el-radio v-model="summaryForm.renchen"
                  v-for="item in radio_renchen"
                  :key="item" :label="item" @change="choose_is_renshen">
        </el-radio>
      </el-form-item>
      <el-form-item v-show="is_renchen" label="孕周">
        <el-input v-model="summaryForm.renchen_ing" type="number" min="0">
          <template slot="append">周</template>
        </el-input>
      </el-form-item>

      <el-form-item label="就诊时全身伴随症状" label-width="100%">
      </el-form-item>
      <el-form-item :label="sprite.name">
        <el-checkbox v-for="(val, key) in sprite.choises" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input  v-model="summaryForm[sprite.qita]" placeholder="其他"></el-input>
      </el-form-item>
      <template v-for="(q_val,q_key) in quanshen">
      <el-form-item :label="q_val.name">
        <el-checkbox :label="q_val.zc_label" v-model="summaryForm[q_val.zc_para]">
        </el-checkbox>
        <el-checkbox v-show="!summaryForm[q_val.zc_para]" v-for="(val, key) in q_val.choises" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-show="!summaryForm[q_val.zc_para]"  v-model="summaryForm[q_val.qita]" placeholder="其他"></el-input>
      </el-form-item>
      </template>

      <el-form-item label="(10) 睡眠">
      </el-form-item>
        <el-form-item label="每日睡眠时间">
          <el-radio v-model="summaryForm.shui_time"
                    v-for="item in shui_time_radio"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
        <el-form-item label="伴随症状">
          <el-checkbox label="无" v-model="summaryForm.shui_wu">
          </el-checkbox>
          <el-checkbox v-show="!summaryForm.shui_wu" v-for="(val, key) in shui_choises" :key="key" :label="val" v-model="summaryForm[key]">
          </el-checkbox>
          <el-input v-show="!summaryForm.shui_wu"  v-model="summaryForm.shui_qita"  placeholder="其他"></el-input>
        </el-form-item>

      <el-form-item label="(11) 性欲">
        <el-checkbox label="正常" v-model="summaryForm.sex_zc">
        </el-checkbox>
        <el-checkbox v-show="!summaryForm.sex_zc" v-for="(val, key) in sex_choises" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
      </el-form-item>
      <el-form-item label="(12) 大便">
        <el-checkbox label="正常" v-model="summaryForm.da_zc">
        </el-checkbox>
        <el-checkbox v-show="!summaryForm.da_zc" v-for="(val, key) in dabian_choises" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-show="!summaryForm.da_zc"  v-model="summaryForm.da_qita"  placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="(13) 小便">
        <el-checkbox label="正常" v-model="summaryForm.xiao_zc">
        </el-checkbox>
        <el-checkbox v-show="!summaryForm.xiao_zc" v-for="(val, key) in xiaobian_choises" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-show="!summaryForm.xiao_zc" v-model="summaryForm.xiao_qita"  placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item  v-show="is_renchen" label="(14) 阴道流血" >
        <el-switch v-model="summaryForm.yin_xue" active-text="有" inactive-text="无"></el-switch>
      </el-form-item>
      <el-form-item  v-show="is_renchen" label="" >
        <el-radio v-show="summaryForm.yin_xue" v-model="summaryForm.has_xue"
                  v-for="item in yinxue"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>

      <h4>请在医生指导下填写</h4>

      <el-form-item label="舌质">
        <el-checkbox v-for="(val, key) in shezhi_choises" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input  v-model="summaryForm.shezhi_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="舌苔">
        <el-checkbox v-for="(val, key) in shetai_choises" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input  v-model="summaryForm.shetai_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="舌体">
        <el-checkbox label="正常" v-model="summaryForm.sheti_zc">
        </el-checkbox>
        <el-checkbox v-show="!summaryForm.sheti_zc" v-for="(val, key) in sheti_choises" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-show="!summaryForm.sheti_zc" v-model="summaryForm.sheti_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="脉象">
        <el-checkbox v-for="(val, key) in mai_choises" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input  v-model="summaryForm.mai_qita" placeholder="其他"></el-input>
      </el-form-item>


    </el-form>
</template>
<script>
export default {
  name:'SummaryForm',
  data() {
    return {
       liuchan_time_choises:{
        first:{name:"<6周", para:"liuchan_six", times:"liuchan_six_times"},
        second:{name:"≥6周<8周", para:"liuchan_eight", times:"liuchan_eight_times"},
        third:{name:"≥8周<10周", para:"liuchan_ten", times:"liuchan_ten_times"},
        fourth:{name:"≥10周<12周", para:"liuchan_twelve", times:"liuchan_twelve_times"},
        fifth:{name:"≥12周＜20周", para:"liuchan_twenty", times:"liuchan_twenty_times"},
        sixth:{name:"≥20周", para:"liuchan_most", times:"liuchan_most_times"},
      },
      radio_renchen:["是","否","不详"],
      sprite:{
        name:"(1) 精神情绪",
        choises:{spirit_chongpei:"精力充沛",spirit_yiban:"精神一般",spirit_fali:"神疲乏力",spirit_jianwang:"健忘",spirit_yalida:"压力大",spirit_jinzhang:"紧张焦虑",spirit_haipa:"害怕不安",spirit_yiyu:"抑郁",spirit_xinu:"喜怒无常",spirit_fanzao:"烦躁易怒",spirit_beishang:"悲伤欲哭"},
        qita:"spirit_qita",
      },
      quanshen:{
        hanre:{
          name:"(2) 寒热及汗出",
          zc_para:"han_zc",
          zc_label:"正常",
          choises:{han_weihan:"畏寒",han_wweire:"畏热",han_wuxin:"五心烦热",han_chaore:"潮热",han_dire:"低热不退",han_dongze:"动则汗出",han_yewo:"夜卧汗出，醒后汗止",han_hongre:"烘热汗出"},
          qita:"han_qita",
        },
        face:{
          name:"(3) 面色",
          zc_para:"face_zc",
          zc_label:"正常",
          choises:{face_danbai:"淡白无华",face_cangbai:"苍白",face_qingbai:"青白",face_fuzhong:"白而浮肿",face_weihuang:"萎黄",face_huangzhong:"黄肿",face_chaohong:"潮红",face_huian:"晦黯",face_anban:"面有黯斑"},
          qita:"face_qita",
        },
        face_head:{
          name:"(4) 头面部",
          zc_para:"face_head_zc",
          zc_label:"正常",
          choises:{face_head_touyun:"头晕",face_head_toutong:"头痛",face_head_touchen:"头沉重",face_head_yanhua:"眼花",face_head_muxuan:"目眩",face_head_muse:"目涩",face_head_muyang:"目痒",face_head_erming:"耳鸣",face_head_erlong:"耳聋",face_head_xiajiang:"听力下降",face_head_cq:"晨起眼睑浮肿"},
          qita:"face_head_qita",
        },
        kou:{
          name:"(5) 口咽部",
          zc_para:"kou_zc",
          zc_label:"正常",
          choises:{kou_kouku:"口苦",kou_kougan:"口干",kou_kouchou:"口臭",kou_kounian:"口粘",kou_buyuyin:"口干不欲饮",kou_yantong:"咽痛",kou_yanyang:"咽痒",kou_yiwu:"咽部异物感"},
          qita:"kou_qita",
        },
        xiong:{
          name:"(6) 胸胁及语音",
          zc_para:"xiong_zc",
          zc_label:"正常",
          choises:{xiong_xinhuang:"心慌",xiong_qiduan:"气短",xiong_fanmen:"心胸烦闷",xiong_xiongzhang:"胸胁胀痛",xiong_xiongci:"胸胁刺痛",xiong_ruzhang:"乳房胀痛",xiong_ruci:"乳房刺痛",xiong_xitan:"喜叹息",xiong_shaoqi:"少气懒言"},
          qita:"xiong_qita",
        },
        fu:{
          name:"(7) 腹腰",
          zc_para:"fu_zc",
          zc_label:"正常",
          choises:{fu_zhui:"小腹坠胀",fu_yin:"小腹隐痛",fu_zhang:"小腹胀痛",fu_leng:"小腹冷痛",fu_citong:"小腹刺痛",fu_juan:"疼痛拒按",fu_xian:"疼痛喜按",fu_dere:"腹痛得热痛减",fu_suantong:"腰酸痛",fu_lengtong:"腰冷痛"},
          qita:"fu_qita",
        },
        si:{
          name:"(8) 四肢",
          zc_para:"si_zc",
          zc_label:"正常",
          choises:{si_fa:"乏力",si_ma:"麻木",si_suan:"酸软",si_kun:"困重",si_zhi:"肢冷",si_fu:"浮肿",si_shouzu:"手足心热"},
          qita:"si_qita",
        },
        yin:{
          name:"(9) 饮食",
          zc_para:"yin_zc",
          zc_label:"正常",
          choises:{yin_buzhen:"食欲不振",yin_duoshi:"多食易饥",yin_pianshi:"偏食或挑食",yin_shihou:"食后胃脘不舒",yin_exin:"恶心欲呕",yin_fansuan:"嗳气反酸"},
          qita:"yin_qita",
        },
      },
      shui_time_radio:["<4小时","4-6小时","7-8小时",">8 小时"],
      shui_choises:{shui_duo:"多梦",shui_xing:"性梦",shui_yi:"易醒",shui_kunnan:"入睡困难"},
      sex_choises:{sex_xingwang:"性欲旺盛",sex_xingtui:"性欲减退"},
      dabian_choises:{da_biangan:"便干",da_zhixi:"质稀",da_shigan:"时干时稀",da_xiexie:"泄泻",da_tianliang:"天亮前泄泻",da_zhinian:"质黏，排不尽",da_jiaza:"夹杂未消化食物"},
      xiaobian_choises:{xiao_duanhuang:"短黄",xiao_qingchang:"清长",xiao_pinshu:"频数",xiao_niaoji:"尿急",xiao_niaotong:"尿痛",xiao_yuli:"余沥不尽",xiao_shaoniao:"少尿",xiao_yeniao:"夜尿频"},
      yinxue:["很少(护垫即可)","中等(卫生巾,与月经量相似)","大量(多于月经量)"],
      shezhi_choises:{shezhi_danhong:"淡红",shezhi_danbai:"淡白",shezhi_xianhong:"鲜红",shezhi_shenhong:"深红",shezhi_zihong:"紫红",shezhi_anhong:"黯红",shezhi_andan:"淡黯",shezhi_zian:"紫黯",shezhi_youyudian:"有瘀点或瘀斑",shezhi_jianhong:"舌边尖红"},
      shetai_choises:{shetai_bai:"白",shetai_huang:"黄",shetai_bo:"薄",shetai_hou:"厚",shetai_ni:"腻",shetai_run:"润",shetai_hua:"滑",shetai_gan:"干",shetai_shaotai:"少苔",shetai_huabao:"花剥",shetai_wutai:"无苔"},
      sheti_choises:{sheti_shou:"瘦小",sheti_pang:"胖大",sheti_chi:"有齿痕",sheti_lie:"有裂纹"},
      mai_choises:{mai_fu:"浮",mai_chen:"沉",mai_hua:"滑",mai_shu:"数",mai_xuan:"弦",mai_xi:"细",mai_ruo:"弱",mai_huan:"缓",mai_chi:"迟",mai_se:"涩",mai_jin:"紧"},

      summaryForm:{
      },
      rules:{},
      is_renchen:false,
    }
  },
  methods: {
    choose_is_renshen(value){
      if(value == "是"){
        this.is_renchen=true
      }else if(value == "否"){
        this.is_renchen=false
      }else if(value == "不详"){
        this.is_renchen=false
      }
    },
  },

}
</script>
<style lang="">
</style>
