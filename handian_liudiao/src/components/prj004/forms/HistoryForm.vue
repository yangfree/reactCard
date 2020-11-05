<template>
  <el-dialog title="专科病史" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="historyForm" :model="historyForm" label-width="140px" label-position="left">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-alert v-if="check_status=='已提交'" effect="dark"
                  title="此条信息已经提交审核,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-alert v-if="!isOwnedByUser" effect="dark"
                  title="此条信息为其他用户创建，您无法修改"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-divider></el-divider>

      <h3>（一）既往史</h3>
      <el-form-item label="既往史" >
        <el-checkbox label="无" v-model="historyForm.history_wu"></el-checkbox>
        <el-checkbox v-show="!historyForm.history_wu" v-for="(val, key) in history_choises" :key="key" :label="val" v-model="historyForm[key]">
        </el-checkbox>
        <el-input  v-show="!historyForm.history_wu" v-model="historyForm.history_qita" placeholder="其他"></el-input>
      </el-form-item>

      <h3>（二）个人史</h3>
      <el-form-item label="特殊嗜好">
        <el-checkbox label="无" v-model="historyForm.hobby_wu"></el-checkbox>
        <el-checkbox v-show="!historyForm.hobby_wu" v-for="(val, key) in hobby_choises" :key="key" :label="val" v-model="historyForm[key]">
        </el-checkbox>
        <el-input  v-show="!historyForm.hobby_wu" v-model="historyForm.hobby_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="体力状况">
        <el-radio v-model="historyForm.tili"
                  v-for="item in tili_radio"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item label="职业体力活动">
        <el-radio v-model="historyForm.zhiye_tili"
                  v-for="item in zhiye_tili_radio"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item label="体育锻炼">
        <el-switch v-model="historyForm.is_duanlian" active-text="有" inactive-text="无"></el-switch>
        <el-form-item  v-show="historyForm.is_duanlian" label="(1)频次">
          <el-radio v-model="historyForm.is_duanlian_pin"
                    v-for="item in is_duanlian_pin_radio"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
        <el-form-item v-show="historyForm.is_duanlian" label="(2)强度">
          <el-radio v-model="historyForm.is_duanlian_qiang"
                    v-for="item in is_duanlian_qiang_radio"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
      </el-form-item>

      <el-form-item label="减肥情况">
        <el-switch v-model="historyForm.is_jianfei" active-text="有" inactive-text="无"></el-switch>
        <el-form-item v-show="historyForm.is_jianfei" label="减肥时长">
          <el-input v-model="historyForm.is_jianfei_time" style="width:250px" type="number" min="0">
            <template slot="append">月</template>
          </el-input>
        </el-form-item>
        <el-form-item v-show="historyForm.is_jianfei" label="减肥方式">
          <el-checkbox v-for="(val, key) in is_jianfei_way_choises" :key="key" :label="val" v-model="historyForm[key]">
          </el-checkbox>
          <el-input v-model="historyForm.is_jianfei_way_qita" placeholder="其他"></el-input>
        </el-form-item>
      </el-form-item>

      <h3>（三）月经带下史</h3>
      <el-form-item label="月经初潮年龄">
        <el-radio v-model="historyForm.first_time"
                  v-for="item in first_time_radio"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.first_time_qita" placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="月经周期">
        <label>（注：本次月经开始至下次月经开始之间的时间）</label>
        <p></p>
        <el-switch v-model="historyForm.is_guilv" active-text="尚规律" inactive-text="不规律"></el-switch>
      </el-form-item>
      <el-form-item v-show="historyForm.is_guilv" label="尚规律">
        <el-radio v-model="historyForm.guilv_right"
                  v-for="item in guilv_right_radio"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item v-show="!historyForm.is_guilv" label="不规律">
        <el-radio v-model="historyForm.guilv_wrong"
                  v-for="item in guilv_wrong_radio"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item label="行经天数">
        <el-radio v-model="historyForm.total_days"
                  v-for="item in total_days_radio"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.total_days_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="出血量（24h）">
        <el-radio v-model="historyForm.quantity"
                  v-for="item in quantity_radio"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.quantity_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="出血颜色">
        <el-radio v-model="historyForm.blood"
                  v-for="item in blood_radio"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.blood_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="出血质地(1)">
        <el-radio v-model="historyForm.block_one"
                  v-for="item in block1_radio"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item label="出血质地(2)">
        <el-radio v-model="historyForm.block_two"
                  v-for="item in block2_radio"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.block_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="出血特点">
        <el-radio v-model="historyForm.character"
                  v-for="item in character_radio"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.character_qita" placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="经期伴随症状" >
          <el-switch v-model="historyForm.menstruation_is_accompany" active-text="有" inactive-text="无"></el-switch>
      </el-form-item>
      <template v-for="(q_val,q_key) in zhengzhuang">
        <el-form-item  v-show="historyForm.menstruation_is_accompany"  :label="q_val.name">
          <el-checkbox :label="q_val.zc_label" v-model="historyForm[q_val.zc_para]">
          </el-checkbox>
          <el-checkbox v-show="!historyForm[q_val.zc_para]" v-for="(val, key) in q_val.choises" :key="key" :label="val" v-model="historyForm[key]">
          </el-checkbox>
          <el-input v-show="!historyForm[q_val.zc_para]"  v-model="historyForm[q_val.qita]" placeholder="其他"></el-input>
        </el-form-item>
      </template>

      <el-form-item label="平素带下情况" >
        <el-form-item label="量">
          <el-radio v-model="historyForm.daixia_liang"
                    v-for="item in daixia_liang_radio"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
        <el-form-item label="色">
          <el-radio v-model="historyForm.daixia_se"
                    v-for="item in daixia_se_radio"
                    :key="item" :label="item">
          </el-radio>
          <el-input v-model="historyForm.daixia_se_qita" placeholder="其他"></el-input>
        </el-form-item>
        <el-form-item label="质">
          <el-radio v-model="historyForm.daixia_zhi"
                    v-for="item in daixia_zhi_radio"
                    :key="item" :label="item">
          </el-radio>
          <el-input v-model="historyForm.daixia_zhi_qita" placeholder="其他"></el-input>
        </el-form-item>
      </el-form-item>

      <h3>（四）婚姻史</h3>
      <el-form-item label="婚姻史">
        <el-radio v-model="historyForm.marriage"
                  v-for="item in marriage_radio"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.marriage_qita" placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="伴侣情况">
        <el-form-item label="个人史">
          <el-checkbox label="无特殊" v-model="historyForm.person_history_wu">
          </el-checkbox>
          <el-checkbox v-show="!historyForm.person_history_wu" v-for="(val, key) in person_history_choises" :key="key" :label="val" v-model="historyForm[key]">
          </el-checkbox>
          <el-input v-show="!historyForm.person_history_wu"  v-model="historyForm.person_history_qita" placeholder="其他"></el-input>
        </el-form-item>
        <el-form-item label="既往史">
          <el-checkbox label="无" v-model="historyForm.person_ji_wu">
          </el-checkbox>
          <el-checkbox v-show="!historyForm.person_ji_wu" v-for="(val, key) in person_ji_choises" :key="key" :label="val" v-model="historyForm[key]">
          </el-checkbox>
          <el-input v-show="!historyForm.person_ji_wu"  v-model="historyForm.person_ji_qita" placeholder="其他"></el-input>
        </el-form-item>
        <el-form-item label="是否生育过">
          <el-switch v-model="historyForm.person_has_born" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item label="精液检查">
          <el-radio v-model="historyForm.person_check"
                    v-for="item in person_check_radio"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
      </el-form-item>

      <h3>（五）孕产史</h3>
      <el-form-item label="孕产史">
        <el-col :sm="24" :md="12" :lg="8" v-for="(val, key) in pastpreg" :key="key">
          <el-input type="number" min="0" v-model="historyForm[key]">
            <template slot="prepend">{{val}}</template>
            <template slot="append">次</template>
          </el-input>
        </el-col>
      </el-form-item>

        <el-form-item label="常用避孕措施">
          <el-checkbox label="无" v-model="historyForm.biyun_wu">
          </el-checkbox>
          <el-checkbox v-show="!historyForm.biyun_wu" v-for="(val, key) in biyun_choises" :key="key" :label="val" v-model="historyForm[key]">
          </el-checkbox>
        </el-form-item>

      <h3>（六）家族史</h3>
        <el-form-item label="家族内（外/祖母、母亲、姐妹）自然流产史"  label-width="100%"></el-form-item>
        <el-form-item label="" >
          <el-radio v-model="historyForm.family_ziran" @change="changeliuchanshi"
                    v-for="item in family_history_radio"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
        <el-form-item v-show="is_family_history" label="次数" >
          <el-radio v-model="historyForm.is_family_ziran"
                    v-for="item in is_family_ziran_radio"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>

        <el-form-item label="直系亲属（外/祖父母、父母、兄弟姐妹）其他疾病史"  label-width="100%"></el-form-item>
        <el-form-item label="" >
          <el-radio v-model="historyForm.family_qita" @change="changeqitashi"
                    v-for="item in family_qita_radio"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
        <el-form-item v-show="is_family_qita" label="" >
          <el-checkbox v-for="(val, key) in qita_choises" :key="key" :label="val" v-model="historyForm[key]">
          </el-checkbox>
          <el-input v-model="historyForm.family_qita_qita" placeholder="其他"></el-input>
        </el-form-item>

    </el-form>

    <span slot="footer">
      <el-button type="primary" :disabled="check_status=='审核通过'" v-if="exist"  @click="updateHistoryForm">确定</el-button>
      <el-button type="primary" v-else  @click="createHistoryForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj004'
export default {
  name:'HistoryForm',
  data() {
    return {
      history_choises:{history_duonang:"多囊卵巢综合征",history_gaomi:"高泌乳素血症",history_yichang:"异常子宫出血",history_penqiang:"盆腔炎性疾病",history_xianji:"子宫腺肌症",history_yiwei:"子宫内膜异位症",history_jiliu:"子宫肌瘤",history_jixing:"子宫畸形",history_jineng:"宫颈机能不全",history_zonghe:"干燥综合征",history_langchuang:"系统性红斑狼疮",history_guanjie:"类风湿性关节炎",history_jizhu:"强直性脊柱炎",history_zuzhi:"未分化结缔组织病",history_kanglin:"抗磷脂抗体综合征",history_jiajian:"甲减",history_jiakang:"甲亢",history_tangniao:"糖尿病"},
      hobby_choises:{ hobby_xiyan:'主动/被动吸烟', hobby_yinjiu:'饮酒',hobby_aoye:'熬夜（23：00以后睡）'},
      tili_radio:['好','一般','易疲倦'],
      zhiye_tili_radio:[
              "重体力劳动（如：搬运工、清洁工、农场工人、畜牧场工人等）",
              "中体力劳动（如：家政服务人员、服务生、厨师、护士等）",
              "轻体力劳动（如：教师、美容美发师、批发商、职员等）",
              "久坐式的工作（如：收银员、出纳员、接线员、秘书等）"],
      is_duanlian_pin_radio:["很少（≤1次/周）","偶尔（≤3次/周）","经常（≥4次/周）"],
      is_duanlian_qiang_radio:["一般(少量出汗，心率≤120次/分)","高强度(大汗淋漓，心率>120次/分)"],
      is_jianfei_way_choises:{is_jianfei_way_yun:"运动减肥", is_jianfei_way_jie:"节食减肥",is_jianfei_way_yao:"药物减肥"},
      first_time_radio:["10岁以前","11岁以后","14岁以后","16岁以后"],
      guilv_right_radio:["21-25天","26-30天","31-35天"],
      guilv_wrong_radio:["或1月多次","1-2个月1行","2-3个月1行","3-4个月1行","4-6个月1行","＞6个月1行"],
      total_days_radio:["≤2天","3-7天","7日以上甚至半月"],
      quantity_radio:["出血量中等，每天约需2-4张卫生巾","出血量多，每天约需5-10张卫生巾","出血量极多，每天多于10张卫生巾","经量少，每天少于1张卫生巾","经量极少，几乎不用卫生巾，用护垫即可"],
      blood_radio:["淡红","鲜红","暗红","紫红","紫黯","紫黑","褐色"],
      block1_radio:["正常","粘稠","清稀"],
      block2_radio:["无血块","经常出现血块","偶有血块","夹少量小血块","夹较大血块"],
      character_radio:["顺畅","势急暴下","淋漓不断","点滴即净"],
      zhengzhuang:{
        jingshen:{
          name:"精神情绪",
          zc_para:"menstruation_spirit_zc",
          zc_label:"正常",
          choises:{menstruation_spirit_fali:"神疲乏力",menstruation_spirit_jiao:"紧张焦虑",menstruation_spirit_yiyu:"精神抑郁",menstruation_spirit_yinu:"烦躁易怒",menstruation_spirit_tanxi:"时欲叹息"},
          qita:"menstruation_spirit_qita",
        },
        sizhi:{
          name:"四肢",
          zc_para:"menstruation_sizhi_zc",
          zc_label:"正常",
          choises:{menstruation_sizhi_weihan:"畏寒肢冷",menstruation_sizhi_shouzu:"手足心热",menstruation_sizhi_suan:"腰膝酸软",menstruation_sizhi_tong:"腰痛如折"},
          qita:"menstruation_sizhi_qita",
        },
        toumian:{
          name:"头面",
          zc_para:"menstruation_head_zc",
          zc_label:"正常",
          choises:{menstruation_head_chuo:"面部痤疮",menstruation_head_zhong:"面浮肢肿",menstruation_head_kouku:"口苦",menstruation_head_kougan:"口干",menstruation_head_touyun:"头晕",menstruation_head_toutong:"头痛",menstruation_head_touchen:"头沉重"},
          qita:"menstruation_head_qita",
        },
        xiongfu:{
          name:"胸腹",
          zc_para:"menstruation_fu_zc",
          zc_label:"正常",
          choises:{menstruation_fu_fanmen:"心胸烦闷",menstruation_fu_ruzhang:"乳房胀痛",menstruation_fu_xiongzhang:"胸胁胀痛",menstruation_fu_zhui:"小腹坠胀",menstruation_fu_ci:"小腹刺痛",menstruation_fu_zhang:"小腹胀痛",menstruation_fu_leng:"小腹冷痛",menstruation_fu_yin:"小腹隐痛",menstruation_fu_ju:"疼痛拒按",menstruation_fu_xi:"腹痛喜按",menstruation_fu_dere:"腹痛得热痛减",menstruation_fu_jian:"血块下痛减"},
          qita:"menstruation_fu_qita",
        },
        yinshi:{
          name:"饮食",
          zc_para:"menstruation_shi_zc",
          zc_label:"正常",
          choises:{menstruation_shi_exin:"脘闷恶心",menstruation_shi_fuzhang:"脘腹胀满",menstruation_shi_shiyu:"食欲不佳"},
          qita:"menstruation_shi_qita",
        },
        shuimian:{
          name:"睡眠",
          zc_para:"menstruation_sleep_zc",
          zc_label:"正常",
          choises:{menstruation_sleep_duo:"多梦",menstruation_sleep_yi:"易醒",menstruation_sleep_nan:"难以入眠",menstruation_sleep_che:"彻夜难眠"},
          qita:"menstruation_sleep_qita",
        },
        erbian:{
          name:"二便",
          zc_para:"menstruation_bian_zc",
          zc_label:"正常",
          choises:{menstruation_bian_zao:"大便燥结",menstruation_bian_tang:"大便溏薄",menstruation_bian_gan:"时干时稀",menstruation_bian_xie:"泄泻",menstruation_bian_pin:"小便频数",menstruation_bian_duan:"小便短赤",menstruation_bian_qing:"小便清长"},
          qita:"menstruation_bian_qita",
        },
      },
      daixia_liang_radio:["带下量正常","带下量少","带下量多"],
      daixia_se_radio:["带下透明","带下色黄","带下色白","带下色黄绿"],
      daixia_zhi_radio:["带下质黏而不稠","带下质清稀","带下质稠"],
      marriage_radio:["未婚有性生活","已婚同居","已婚分居","再婚"],
      person_history_choises:{person_history_xi:"吸烟",person_history_yin:"饮酒"},
      person_ji_choises:{person_ji_fu:"附睾炎",person_ji_jing:"精囊炎",person_ji_qian:"前列腺炎",person_ji_tang:"糖尿病",person_ji_kang:"甲亢",person_ji_jian:"甲减"},
      person_check_radio:["未做","正常","异常（精子数目、精子活动力、畸形精子率）"],
      pastpreg:{total_times:'怀孕', times_shun:'顺产', times_pou:'剖宫产',
                times_zao:'早产', times_yao:'药物流产', times_ren:'人工流产',
                times_zi:'自然流产', times_qing:'清宫术', times_yi:'异位妊娠',
                },
      biyun_choises:{biyun_an:"安全期",biyun_bi:"避孕套",biyun_kou:"口服避孕药",biyun_gong:"宫内节育器"},
      family_history_radio:["无","有","不详"],
      is_family_ziran_radio:["1次","2次","≥3次","不详"],
      family_qita_radio:["无","有","不详"],
      qita_choises:{family_qita_duo:"多囊卵巢综合征", family_qita_gao:"高泌乳素血症", family_qita_zi:"子宫畸形", family_qita_jin:"宫颈机能不全", family_qita_gan:"干燥综合征", family_qita_xi:"系统性红斑狼疮", family_qita_feng:"类风湿性关节炎", family_qita_qiang:"强直性脊柱炎", family_qita_wei:"未分化结缔组织病", family_qita_kang:"抗磷脂抗体综合征", family_qita_jiakang:"甲亢", family_qita_jiajian:"甲减", family_qita_tang:"糖尿病"},
      is_family_history:false,
      is_family_qita:false,
      historyForm:{
      },
      dialogVisible: false,
      exist: true,
      formName:'',
      isOwnedByUser: true,
      check_status:'',
    }
  },
  methods: {
    changeliuchanshi(value) {
      if(value == "无"){
        this.is_family_history=false
      }else if(value == "有"){
        this.is_family_history=true
      }else if(value == "不详"){
        this.is_family_history=false
      }
    },
    changeqitashi(value) {
      if(value == "无"){
        this.is_family_qita=false
      }else if(value == "有"){
        this.is_family_qita=true
      }else if(value == "不详"){
        this.is_family_qita=false
      }
    },
    updateHistoryForm () {
      apiUpdatePatientDataForm({formData:this.historyForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        if (res.data.detail) {
          this.$message({message: '对不起, 您没有对该记录操作的权限',type: 'error'})
        } else {
          this.$message({message: '提交成功',type: 'success'})
        }
        this.dialogVisible = false
        //this.$parent.getPatients()
        this.$parent.searchPatient()
      })
      .catch()
    },
    createHistoryForm () {
      apiCreatePatientDataForm({formData:this.historyForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        if (res.data.detail) {
          this.$message({message: '对不起, 您没有对该记录操作的权限',type: 'error'})
        } else {
          this.$message({message: '提交成功',type: 'success'})
        }
        this.dialogVisible = false
        //this.$parent.getPatients()
        this.$parent.searchPatient()
      })
      .catch()
    },
    resetDialog () {
      this.historyForm = {}
    },
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      this.check_status = data.check_status
this.isOwnedByUser = data.isOwnedByUser
      if (!data.exist) {
        //未创建
        this.historyForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.historyForm = data.formData
        if(this.historyForm.is_family_ziran == "无"){
          this.is_family_history=false
        }else if(this.historyForm.is_family_ziran == "有"){
          this.is_family_history=true
        }else if(this.historyForm.is_family_ziran == "不详"){
          this.is_family_history=false
        }
        if(this.historyForm.family_qita == "无"){
          this.is_family_qita=false
        }else if(this.historyForm.family_qita == "有"){
          this.is_family_qita=true
        }else if(this.historyForm.family_qita == "不详"){
          this.is_family_qita=false
        }
      }
    })
  }

};
</script>
<style scoped>
.el-input {
  margin-top: 10px;
}
</style>
