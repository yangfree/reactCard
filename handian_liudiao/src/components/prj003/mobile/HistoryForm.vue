<template>
    <el-form ref="historyForm" :model="historyForm" :rules="rules"
            label-width="110px" label-position="left" class="mobile">

      <h3>（一）既往史</h3>
      <el-form-item label="既往史" >
        <el-radio-group v-model="historyForm.has_history">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <!--
          <el-switch v-model="historyForm.has_history" active-text="有" inactive-text="无"></el-switch>
          -->
          <el-input  v-show="historyForm.has_history" v-model="historyForm.history_content" ></el-input>
      </el-form-item>

      <h3>（二）个人史</h3>
      <el-form-item label="特殊嗜好">
        <el-checkbox  :label="mydata.hobbies.hobby_wu" v-model="historyForm['hobby_wu']"></el-checkbox>
        <el-checkbox v-show="!historyForm['hobby_wu']" :label="mydata.hobbies.hobby_xiyan" v-model="historyForm['hobby_xiyan']"></el-checkbox>
        <el-checkbox v-show="!historyForm['hobby_wu']" :label="mydata.hobbies.hobby_yinjiu" v-model="historyForm['hobby_yinjiu']"></el-checkbox>
        <el-input  v-show="!historyForm['hobby_wu']" v-model="historyForm.hobby_qita"  placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="体力状况">
        <el-radio v-model="historyForm.physical"
                  v-for="item in mydata.body_cond"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item label="职业体力活动">
        <el-radio v-model="historyForm.physical_career" style="width: 100%;text-overflow: ellipsis;white-space: normal"
                  v-for="item in mydata.career_labor"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item label="体育锻炼">
        <el-radio-group v-model="historyForm.is_exercise">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <!--
        <el-switch v-model="historyForm.is_exercise" active-text="有" inactive-text="无"></el-switch>
        -->
      </el-form-item>
      <el-form-item  v-show="historyForm.is_exercise" label="(1)频次">
        <el-radio v-model="historyForm.exercise_pinci"
                  v-for="item in mydata.physical_exercise"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item v-show="historyForm.is_exercise" label="(2)强度">
        <el-radio v-model="historyForm.exercise_qiangdu"
                  v-for="item in mydata.physical_intensity"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>

      <h3>（三）月经带下史</h3>
      <el-form-item label="月经初潮年龄">
        <el-radio v-model="historyForm.first_time"
                  v-for="item in mydata.first_time"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>

      <el-form-item label="月经周期是否规律" label-width="170px">
        <el-radio-group v-model="historyForm.is_normal">
          <el-radio v-bind:label="true">尚规律</el-radio>
          <el-radio v-bind:label="false">不规律</el-radio>
        </el-radio-group>
        <!--
        <el-switch v-model="historyForm.is_normal" active-text="尚规律" inactive-text="不规律"></el-switch>
        -->
      </el-form-item>
        <el-form-item v-show="historyForm.is_normal" label="尚规律">
          <el-radio v-model="historyForm.normal"
                    v-for="item in mydata.normal"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
        <el-form-item v-show="!historyForm.is_normal" label="不规律">
          <el-radio v-model="historyForm.not_normal"
                    v-for="item in mydata.abnormal"
                    :key="item" :label="item">
          </el-radio>
          <el-input v-model="historyForm.not_normal_qita"  placeholder="其他"></el-input>
        </el-form-item>
      <el-form-item label="月经经期">
        <el-radio v-model="historyForm.total_days"
                  v-for="item in mydata.cyclicity_sum"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.total_days_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="末次行经日期">
        <el-date-picker v-model="historyForm.last_time"
                        type="date" placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="平素带下情况">
      </el-form-item>
      <el-form-item label="量">
        <el-select v-model="historyForm.daixia_liang" placeholder="请选择">
          <el-option v-for="item in mydata.leucorrhea_quantity" :key="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="色">
        <el-select v-model="historyForm.daixia_se" placeholder="请选择">
          <el-option v-for="item in mydata.leucorrhea_color" :key="item" :value="item">
          </el-option>
        </el-select>
        <el-input v-model="historyForm.daixia_se_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="质">
        <el-select v-model="historyForm.daixia_zhi" placeholder="请选择">
          <el-option v-for="item in mydata.leucorrhea_feature" :key="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <h3>（四）平素全身症状</h3>
      <el-form-item label="平素全身症状" >
        <el-radio-group v-model="historyForm.body_all">
          <el-radio :label="true">有</el-radio>
          <el-radio :label="false">无</el-radio>
        </el-radio-group>
        <!--
          <el-switch v-model="historyForm.body_all" active-text="有" inactive-text="无"></el-switch>
          -->
      </el-form-item>
      <el-form-item v-show="historyForm.body_all" label="精神情绪">
        <el-checkbox v-for="(val, key) in mydata.body_spirit" :key="key" :label="val" v-model="historyForm[key]">
        </el-checkbox>
        <el-input v-model="historyForm.body_spirit_qita"  placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item v-show="historyForm.body_all" label="头面">
        <el-checkbox v-for="(val, key) in mydata.body_face_head" :key="key" :label="val" v-model="historyForm[key]">
        </el-checkbox>
        <el-input v-model="historyForm.body_face_head_qita"  placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item v-show="historyForm.body_all" label="形体、四肢">
        <el-checkbox v-for="(val, key) in mydata.body_limb" :key="key" :label="val" v-model="historyForm[key]">
        </el-checkbox>
        <el-input v-model="historyForm.body_limb_qita"  placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item v-show="historyForm.body_all" label="胸腹部">
        <el-checkbox v-for="(val, key) in mydata.body_belly" :key="key" :label="val" v-model="historyForm[key]">
        </el-checkbox>
        <el-input v-model="historyForm.body_belly_qita"  placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item v-show="historyForm.body_all" label="睡眠">
        <el-checkbox v-for="(val, key) in mydata.body_sleep" :key="key" :label="val" v-model="historyForm[key]">
        </el-checkbox>
        <el-input v-model="historyForm.body_sleep_qita"  placeholder="其他"></el-input>
      </el-form-item>

      <h3>（五）婚姻史</h3>
      <el-form-item label="婚姻史">
        <el-radio v-model="historyForm.marriage_history"
                  v-for="item in mydata.marriage"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>

      <h3>（六）孕产史（无性生活者无需填写）</h3>
      <el-form-item label="孕产史">
        <el-col :sm="24" :md="12" :lg="8" v-for="(val, key) in mydata.pastpreg" :key="key">
          <el-input type="number" min="0" v-model="historyForm[key]">
            <template slot="prepend">{{val}}</template>
            <template slot="append">次</template>
          </el-input>
        </el-col>
          <el-input v-model="historyForm.pregnancy_qita" placeholder="其他"></el-input>
      </el-form-item>

      <h3>（七）避孕措施（请有性生活者填写）</h3>
      <el-form-item label="避孕措施">
        <el-checkbox  :label="mydata.biyun.biyun_wu" v-model="historyForm['biyun_wu']"></el-checkbox>
        <el-checkbox v-show="!historyForm['biyun_wu']" :label="mydata.biyun.biyun_jiezha" v-model="historyForm['biyun_jiezha']"></el-checkbox>
        <el-checkbox v-show="!historyForm['biyun_wu']" :label="mydata.biyun.biyun_gongnei" v-model="historyForm['biyun_gongnei']"></el-checkbox>
        <el-checkbox v-show="!historyForm['biyun_wu']" :label="mydata.biyun.biyun_biyun" v-model="historyForm['biyun_biyun']"></el-checkbox>
        <el-checkbox v-show="!historyForm['biyun_wu']" :label="mydata.biyun.biyun_koufu" v-model="historyForm['biyun_koufu']"></el-checkbox>
        <el-input v-show="!historyForm['biyun_wu']" v-model="historyForm.biyun_qita"  placeholder="其他"></el-input>
      </el-form-item>

      <h3>（八）家族史</h3>
        <el-form-item label="一级亲属（母亲、姐妹、女儿）痛经史"  label-width="100%"></el-form-item>
        <el-form-item label="" >
          <el-radio v-model="historyForm.family_history" @change="changeHandler"
                    v-for="item in mydata.family_history"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
        <el-form-item v-show="is_family_history" label="是否为原发性" >
          <el-radio v-model="historyForm.family_history_is_origin"
                    v-for="item in mydata.family_history_is_origin"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
        <el-form-item label="一级亲属（父母、兄弟姐妹、子女）其他疾病史"  label-width="100%"></el-form-item>
        <el-form-item label="">
          <el-radio-group v-model="historyForm.relative_history" @change="changeqitajibing">
            <el-radio class="radio" label="无">无</el-radio>
            <el-radio class="radio" label="有">有</el-radio>
            <el-radio class="radio" label="不详">不详</el-radio>
          </el-radio-group>
          <el-input v-show="showqitajibinginput" v-model="historyForm.relative_history_you" ></el-input>
        </el-form-item>

    </el-form>
</template>
<script>
export default {
  name:'HistoryForm',
  data() {
    return {
      mydata:{
        hobbies:{hobby_wu:'无', hobby_xiyan:'吸烟', hobby_yinjiu:'饮酒'},
        'body_cond':['好','一般','易疲倦'],
        'career_labor':[
                "重体力劳动（如：搬运工、清洁工、农场工人、畜牧场工人等）",
                "中体力劳动（如：家政服务人员、服务生、厨师、护士等）",
                "轻体力劳动（如：教师、美容美发师、批发商、职员等）",
                "坐式的工作（如：收银员、出纳员、接线员、秘书等）"],
        'physical_exercise':["很少（≤1次/周）","偶尔（≤3次/周）","经常（≥4次/周）"],
        'physical_intensity':["一般(少量出汗，心率≤120次/分)","高强度(大汗淋漓，心率>120次/分)"],
        first_time:["<11岁","11岁","12岁","13岁","14岁","15岁","16岁",">16岁"],
        is_normal:true,
        normal:["21~25天","26~30天","31~35天"],
        abnormal:["36~60天","61~90天"],
        cyclicity_sum:["1天","2天","3天","4天","5天","6天","7天"],
        leucorrhea_quantity:["正常","量少","量多"],
        leucorrhea_color:["色白","色黄","透明","色黄绿"],
        leucorrhea_feature:["黏而不稠","质清稀","质稠"],
        body_spirit:{body_spirit_shenpi:'神疲肢倦',body_spirit_qiduan:'气短懒言',body_spirit_jingshen:'精神抑郁',body_spirit_fanzao:'烦躁易怒',body_spirit_shiyu:'时欲叹息'},
        body_face_head:{body_face_head_weihuang:"面色萎黄",body_face_head_huian:"面色晦暗",body_face_head_anban:"面有黯斑",body_face_head_zhizhong:"面浮肢肿",body_face_head_chunhong:"颧赤唇红",body_face_head_yangan:"口苦咽干",body_face_head_erming:"头晕耳鸣",body_face_head_yanhua:"眼花"},
        body_limb:{body_limb_feipang:"形体肥胖",body_limb_shouxiao:"形体瘦小",body_limb_zhileng:"畏寒肢冷",body_limb_xinre:"手足心热",body_limb_tuiruan:"腰酸腿软",body_limb_rushe:"腰痛如折"},
        body_belly:{body_belly_men:"胸闷不舒",body_belly_ruzhang:"经前乳房胀痛",body_belly_xiongzhang:"经前胸胁胀痛",body_belly_fuzhang:"经前少腹胀痛",body_belly_fukong:"腹空坠",body_belly_kong:"小腹空痛",body_belly_ci:"小腹刺痛",body_belly_zhang:"小腹胀痛",body_belly_leng:"小腹冷痛",body_belly_yin:"小腹隐痛"},
        body_sleep:{body_sleep_xinji:"心悸失眠",body_sleep_buning:"夜寐不宁",body_sleep_mengduo:"夜寐梦多"},
        marriage:["无性生活","未婚有性生活","已婚同居","已婚分居","离婚","丧偶"],
        pastpreg:{pregnancy_yun:'怀孕', pregnancy_shun:'顺产', pregnancy_pou:'剖宫产',
                  pregnancy_zao:'早产', pregnancy_yao:'药物流产', pregnancy_ren:'人工流产',
                  pregnancy_zi:'自然流产', pregnancy_yi:'异位妊娠',
                  pregnancy_qing:'清宫术'},
        biyun:{biyun_wu:"无",biyun_jiezha:"结扎",biyun_gongnei:"宫内节育器",biyun_biyun:"避孕套",biyun_koufu:"口服避孕药"},
        family_history:["无","有","不详"],
        family_history_is_origin:["是","否","不详"],
        relative_history:["无","有","不详"],
      },
      is_family_history:false,
      historyForm:{
        is_normal:false,
        has_history:false,
        is_exercise:false,
        body_all:false,
      },
      rules:{},
      showqitajibinginput:false
    }
  },
  methods: {
    changeHandler(value) {
      if(value == "无"){
        this.is_family_history=false
      }else if(value == "有"){
        this.is_family_history=true
      }else if(value == "不详"){
        this.is_family_history=false
      }
    },
    changeqitajibing(value){
      if(value=="有"){
        this.showqitajibinginput = true
      }else{
        this.showqitajibinginput = false
      }
    }
  },
};
</script>
<style scoped>
.el-input {
  margin-top: 10px;
}
</style>
