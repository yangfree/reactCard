<template>
  <el-dialog title="患者病史" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            v-if='dialogVisible'
            @close='resetDialog'>
    <el-form ref="historyForm" :model="historyForm" label-width="95px" label-position="left">
      <el-alert v-if="is_checked=='审核通过'"
                title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                type="warning" :closable="false" show-icon>
      </el-alert>
      <el-divider v-if="is_checked=='审核通过'"></el-divider>

    <h3>一、既往史</h3>
      <p class="form-label">既往史</p>
        <el-checkbox v-for="(val, key) in mydata.pasthistory" :key="key" :label="val" v-model="historyForm[key]">
        </el-checkbox>

    <h3>二、个人史</h3>
      <p class="form-label">1、特殊嗜好</p>
        <el-checkbox v-for="(val, key) in mydata.hobbies" :key="key" :label="val" v-model="historyForm[key]">
        </el-checkbox>

      <el-form-item label="2、体力状况">
        <el-radio v-model="historyForm.body_cond"
                  v-for="item in mydata.body_cond"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <p class="form-label">3、职业体力活动</p>
        <el-radio v-model="historyForm.career_labor"
                  v-for="item in mydata.career_labor"
                  :key="item" :label="item">
        </el-radio>
      <p class="form-label">4、体育锻炼</p>
        <p>(1)频率</p>
          <el-radio v-model="historyForm.physical_exercise"
                    v-for="item in mydata.physical_exercise"
                    :key="item" :label="item">
          </el-radio>
        <p>(2)强度</p>
          <el-radio v-model="historyForm.physical_intensity"
                    v-for="item in mydata.physical_intensity"
                    :key="item" :label="item">
          </el-radio>
      <p class="form-label">5、减肥情况</p>
        <el-form-item label="(1)减肥时长">
          <el-input v-model="historyForm.reducefat_persist" type="number" min="0">
            <template slot="append">月</template>
          </el-input>
        </el-form-item>
        <el-form-item label="(2)减肥方式">
          <el-checkbox v-for="(val, key) in mydata.reducefat_methdod" :key="key" :label="val" v-model="historyForm[key]">
          </el-checkbox>
          <el-input v-model="historyForm.reducefat_qita" placeholder="其他"></el-input>
        </el-form-item>

    <h3>三、月经带下史</h3>
      <p class="form-label">1、月经初潮年龄</p>
        <el-radio v-model="historyForm.first_time"
                  v-for="item in mydata.first_time"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.first_time_qita" placeholder="其他情况"></el-input>
      <p></p>

      <span class="form-label">2、月经周期是否规律</span>
        <el-switch v-model="historyForm.is_normal" active-text="尚规律" inactive-text="不规律" @change="cycle"></el-switch>
        <p></p>
        <el-radio v-show="historyForm.is_normal" v-model="historyForm.normal"
                  v-for="item in mydata.normal"
                  :key="item" :label="item">
        </el-radio>
        <el-radio v-show="!historyForm.is_normal" v-model="historyForm.abnormal"
                  v-for="item in mydata.abnormal"
                  :key="item" :label="item">
        </el-radio>

      <el-form-item label="3、行经天数">
        <el-radio v-model="historyForm.cyclicity_sum"
                  v-for="item in mydata.cyclicity_sum"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.cyclicity_sum_qita" placeholder="其他情况"></el-input>
      </el-form-item>

      <p class="form-label">4、出血所需卫生巾数</p>
        <el-radio v-model="historyForm.blood_cond"
                  v-for="item in mydata.blood_cond"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.mm_blood_cond_qita" placeholder="其他情况"></el-input>

      <p class="form-label">5、出血颜色</p>
        <el-radio v-model="historyForm.blood_color"
                  v-for="item in mydata.blood_color"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.mm_blood_color_qita" placeholder="其他情况"></el-input>

      <p class="form-label">6、出血质地</p>
        1、<el-radio v-model="historyForm.blood_quality"
                  v-for="item in mydata.blood_quality"
                  :key="item" :label="item">
        </el-radio>
        <p></p>
        2、<el-radio v-model="historyForm.blood_block"
                  v-for="item in mydata.blood_block"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.mm_blood_block_qita" placeholder="其他情况"></el-input>

      <p class="form-label">7、出血特点</p>
        <el-radio v-model="historyForm.blood_character"
                  v-for="item in mydata.blood_character"
                  :key="item" :label="item">
        </el-radio>

      <p></p>

      <span class="form-label">8、经期伴随症状</span>
        <el-switch v-model="historyForm.menstruation_is_accompany" active-text="是" inactive-text="否"></el-switch>
      <div v-show="historyForm.menstruation_is_accompany">
        <h4>(1)精神情绪</h4>
          <el-form-item v-for="(val, key) in mydata.spirit" :key="key" :label="val">
            <el-select v-model="historyForm[key]">
              <el-option v-for="item in mydata.my_selection" :key="item" :value="item" :label="item">
              </el-option>
            </el-select>
            <!-- <el-radio v-for="item in mydata.my_selection" :key="item" :label="item"></el-radio> -->
          </el-form-item>
          <el-input v-model="historyForm.spirit_qita" placeholder="其他"></el-input>
        <h4>(2)形体四肢</h4>
          <el-checkbox v-for="(val, key) in mydata.body_checkbox" :label="val" :key="key" v-model="historyForm[key]"></el-checkbox>
          <el-input v-model="historyForm.body_qita" placeholder="其他"></el-input>
        <h4>(3)头面</h4>
          <el-checkbox v-for="(val, key) in mydata.face_head_checkbox" :label="val" :key="key" v-model="historyForm[key]"></el-checkbox>
          <p></p>
          <el-form-item v-for="(val, key) in mydata.face_head" :key="key" :label="val">
            <el-select v-model="historyForm[key]">
              <el-option v-for="item in mydata.my_selection" :key="item" :value="item" :label="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-input v-model="historyForm.face_head_qita" placeholder="其他"></el-input>
        <h4>(4)胸腹</h4>
          <el-checkbox v-for="(val, key) in mydata.belly_checkbox" :label="val" :key="key" v-model="historyForm[key]"></el-checkbox>
          <p></p>
          <el-form-item v-for="(val, key) in mydata.belly" :key="key" :label="val">
            <el-select v-model="historyForm[key]">
              <el-option v-for="item in mydata.my_selection" :key="item" :value="item" :label="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-input v-model="historyForm.belly_qita" placeholder="其他"></el-input>
        <h4>(5)饮食</h4>
          <el-form-item v-for="(val, key) in mydata.diet" :key="key" :label="val">
            <el-select v-model="historyForm[key]">
              <el-option v-for="item in mydata.my_selection" :key="item" :value="item" :label="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-input v-model="historyForm.diet_qita" placeholder="其他"></el-input>
        <h4>(6)睡眠</h4>
          <el-form-item v-for="(val, key) in mydata.sleep" :key="key" :label="val">
            <el-select v-model="historyForm[key]">
              <el-option v-for="item in mydata.my_selection" :key="item" :value="item" :label="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-input v-model="historyForm.sleep_qita" placeholder="其他"></el-input>
        <h4>(7)二便</h4>
          <el-checkbox v-for="(val, key) in mydata.erbian_checkbox" :label="val" :key="key" v-model="historyForm[key]"></el-checkbox>
          <el-input v-model="historyForm.erbian_qita" placeholder="其他"></el-input>
      </div>

      <p class="form-label">9、经期情况</p>
        <el-form-item v-for="(val, key) in mydata.jingqi" :key='key' :label="val">
          <el-radio v-model="historyForm[key]" label="无"></el-radio>
          <el-radio v-model="historyForm[key]" label="有"></el-radio>
          <el-radio v-model="historyForm[key]" label="偶尔"></el-radio>
          <el-radio v-model="historyForm[key]" label="经常"></el-radio>
        </el-form-item>

      <p class="form-label">10、末次行经日期</p>
        <el-date-picker v-model="historyForm.last_time"
                        type="date" placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
        </el-date-picker>

      <p class="form-label">11、平素带下情况</p>
        <el-select v-model="historyForm.leucorrhea_quantity" placeholder="请选择">
          <template slot="prefix">量</template>
          <el-option v-for="item in mydata.leucorrhea_quantity" :key="item" :value="item">
          </el-option>
        </el-select>
        <el-select v-model="historyForm.leucorrhea_color" placeholder="请选择">
          <template slot="prefix">色</template>
          <el-option v-for="item in mydata.leucorrhea_color" :key="item" :value="item">
          </el-option>
        </el-select>
        <el-select v-model="historyForm.leucorrhea_feature" placeholder="请选择">
          <template slot="prefix">质</template>
          <el-option v-for="item in mydata.leucorrhea_feature" :key="item" :value="item">
          </el-option>
        </el-select>

    <h3>四、婚姻史</h3>
      <p class="form-label">婚姻史</p>
        <el-radio v-model="historyForm.marriage"
                  v-for="item in mydata.marriage"
                  :key="item" :label="item">
        </el-radio>

    <h3>五、孕产史</h3>
        <el-col :sm="24" :md="12" :lg="8" v-for="(val, key) in mydata.pastpreg" :key="key">
          <el-input type="number" min="0" v-model="historyForm[key]">
            <template slot="prepend">{{val}}</template>
            <template slot="append">次</template>
          </el-input>
        </el-col>
          <el-input v-model="historyForm.pastpreg_qita" placeholder="其他情况"></el-input>

    <h3>六、避孕措施</h3>
      <el-form-item label="避孕措施">
        <el-switch v-model="historyForm.prevent_wu" active-text="有" inactive-text="无"></el-switch>
        <div v-show="historyForm.prevent_wu">
          <el-checkbox v-model="historyForm.prevent_jieza" label="结扎" ></el-checkbox>
          <el-checkbox v-model="historyForm.prevent_jieyuqi" label="宫内节育器" ></el-checkbox>
          <el-checkbox v-model="historyForm.prevent_biyuntao" label="避孕套" ></el-checkbox>
          <el-checkbox v-model="historyForm.prevent_biyunyao" label="口服避孕药" ></el-checkbox>
        </div>
      </el-form-item>

    <h3>七、家族史</h3>
      <p class="form-label">一级亲属（母亲、姐妹、女儿）异常子宫出血史</p>
        <el-radio v-model="historyForm.pastfamily_ovulation" label="是"></el-radio>
        <el-radio v-model="historyForm.pastfamily_ovulation" label="否"></el-radio>
        <el-radio v-model="historyForm.pastfamily_ovulation" label="不详"></el-radio>
      <p class="form-label">一级亲属（父母、兄弟姐妹、子女）其他疾病史</p>
        <!-- <el-switch v-model="historyForm.is_pastfamily_womb" active-text="有" inactive-text="无"></el-switch> -->
        <div>
          <el-checkbox v-model="historyForm.pastfamily_minus"  label="甲减" ></el-checkbox>
          <el-checkbox v-model="historyForm.pastfamily_plus"  label="甲亢" ></el-checkbox>
          <el-checkbox v-model="historyForm.pastfamily_duonangluanchao"  label="多囊卵巢综合征" ></el-checkbox>
          <el-checkbox v-model="historyForm.pastfamily_tangniaobing"  label="糖尿病" ></el-checkbox>
          <el-checkbox v-model="historyForm.pastfamily_buxiang"  label="不详" ></el-checkbox>
          <el-input v-model="historyForm.pastfamily_qita"></el-input>
        </div>

    </el-form>

    <span slot="footer">
        <el-button :disabled="is_checked=='审核通过'"
                    type="primary"
                    @click="exist?updateDataForm():createDataForm()">确定</el-button>
        <el-button @click="resetDialog">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj001'
export default {
  name:'HistoryForm',
  data() {
    return {
      mydata:{
        'my_selection':["没有","很少","有时","经常","总是"],
        'pasthistory':{
            'pasthistory_wu':'无',
            'pasthistory_zigongxianjizheng':'子宫腺肌症',
            'pasthistory_zigongneimoyiwei':'子宫内膜异位症',
            'pasthistory_zigongjiliu':'子宫肌瘤',
            'pasthistory_luancaonangzhong':'卵巢囊肿',
            'pasthistory_zigongneimoyan':'子宫内膜炎',
            'pasthistory_penqiangyan':'盆腔炎性疾病',
            'pasthistory_yindaoyan':'阴道炎',
            'pasthistory_ruxianzengsheng':'乳腺增生',
            'pasthistory_shengzhiyichang':'生殖器官发育异常',
            'pasthistory_minus':'甲减',
            'pasthistory_plus':'甲亢',
            'pasthistory_shenshangxian':'肾上腺相关疾病',
            'pasthistory_xueye':'血液系统相关疾病',
            'pasthistory_naochuitiliu':'脑垂体瘤',
            'pasthistory_tangniaobing':'糖尿病',
            'pasthistory_feipang':'肥胖',
            'pasthistory_ganyan':'肝炎',
            'pasthistory_jiehe':'结核',
        },
        'hobbies':{'hobbies_wu':'无', 'hobbies_xiyan':'吸烟', 'hobbies_yinjiu':'饮酒', 'hobbies_aoye':'熬夜(23:00以后睡)'},
        'body_cond':['好','一般','易疲倦'],
        'career_labor':[
                "重体力劳动(如:搬运工、清洁工、农场工人、畜牧场工人等)",
                "中体力劳动(如:家政服务人员、服务生、厨师、护士等)",
                "轻体力劳动(如:教师、美容美发师、批发商、职员等)",
                "坐式的工作(如:收银员、出纳员、接线员、秘书等)"],
        'physical_exercise':["很少(≤1次/周)","偶尔(≤3次/周)","经常(≥4次/周)"],
        'physical_intensity':["一般(少量出汗,心率≤120次/分)","高强度(大汗淋漓,心率>120次/分)"],
        'reducefat_persist':[],
        'reducefat_methdod':{'reducefat_yundong':'运动减肥','reducefat_jieshi':'节食减肥','reducefat_yaowu':'药物减肥'},
        'first_time':["10岁以前","11岁以后","14岁以后","16岁以后"],
        is_normal:true,
        'normal':["21-25天","26-30天","31-35天"],
        'abnormal':["或1月多次","1-2个月1行","2-3个月1行","3-4个月1行","4-6个月1行",">6个月1行"],
        'cyclicity_sum':["≤2天","3-7天","7天以上甚至半月"],
        'blood_cond':["≤5张卫生巾(日用)","6-10张卫生巾(日用)","11-19张卫生巾(日用)","≥20张卫生巾(日用或夜用)","几乎不用卫生巾,用护垫即可"],
        'blood_color':["淡红","鲜红","暗红","紫红","紫黯","紫黑","褐色",],
        'blood_quality':["正常","粘稠","清稀"],
        'blood_block':["无血块","经常出现血块","偶有血块","夹少量小血块","夹较大血块","其他"],
        'blood_character':["顺畅","势急暴下","淋漓不断","点滴即净"],
        // 经期伴随症状
        'spirit':{'spirit_shenpi':"神疲肢倦",'spirit_qiduan':"气短懒言",'spirit_yiyu_m':"精神抑郁",'spirit_tanxi':"时欲叹息",'spirit_yinu':"烦躁易怒"},
        'body_checkbox':{'body_normal':"正常",'body_fat':"形体肥胖",'body_thin':"形体瘦小",'body_skin':"皮肤不润",'body_cold':"畏寒肢冷",'body_hot':"手足心热",'body_leg':"腰酸腿软",'body_waist':"腰痛如折"},
        'face_head_checkbox':{'face_head_normal':"正常",'face_head_cangbai':"面色苍白",'face_head_huangbai':"面色晄白",
                    'face_head_weihuang':"面色萎黄",'face_head_huian':"面色晦暗",'face_head_anban':"面色黯斑",
                    'face_head_zhizhong':"面浮肢肿",'face_head_chunhong':"颧赤唇红"},
        'face_head':{'face_head_kouku':"口苦咽干",'face_head_erming':"头晕耳鸣",'face_head_yanghua':"眼花"},
        'belly':{ 'belly_fanmen':"心胸烦闷",'belly_rufangzhangtong':"经前乳房胀痛",'belly_xiongxiezhangtong':"经前胸胁胀痛",
                  'belly_shaofuzhangtong':"经前少腹胀痛",'belly_kongzhui':"小腹空坠",'belly_kongtong':"小腹空痛",
                  'belly_citong':"小腹刺痛",'belly_zhangtong':"小腹胀痛",'belly_lengtong':"小腹冷痛",'belly_yintong':"小腹隐痛"},
        'belly_checkbox': {'belly_juan':'疼痛拒按','belly_xian':'腹痛喜按','belly_deretongjian':'腹痛得热痛减','belly_tongjian':'血块下痛减'},
        'diet':{'diet_exin':'脘闷恶心','diet_shishao':'嗳气食少','diet_zhangman':'脘腹胀满','diet_bujia':'食欲不佳','diet_lengyin':'渴喜冷饮','diet_kouzao':'咽干口燥'},
        'sleep':{'sleep_shimian':'心悸失眠','sleep_buning':'夜寐不宁','sleep_mengduo':'夜寐梦多'},
        'erbian_checkbox':{'erbian_normal':'正常','erbian_zaojie':'大便燥结','erbian_tangbo':'大便溏薄','erbian_pinshu':'小便频数','erbian_duanchi':'小便短赤','erbian_qingchang':'小便清长'},


        'jingqi':{'jingqi_yundong':'(1)经期运动','jingqi_ganmao':'(2)经期感冒','jingqi_tongfang':'(3)经期同房','jingqi_zhaoliang':'(4)经期着凉'},
        'leucorrhea_quantity':["带下量正常","带下量少","带下量多"],
        'leucorrhea_color':["带下透明","带下色黄","带下色白","带下色黄绿"],
        'leucorrhea_feature':["带下质黏而不稠","带下质清稀","带下质稠"],
        'marriage':["未婚无性生活","未婚有性生活","已婚同居","已婚分居","离婚","丧偶"],
        'pastpreg':{pastpreg_yuncount:'怀孕', pastpreg_shunchan:'顺产', pastpreg_pougong:'剖宫产',
                  pastpreg_zaochan:'早产', pastpreg_yaoliu:'药物流产', pastpreg_renliu:'人工流产',
                  pastpreg_ziranliu:'自然流产', pastpreg_yiweirenshen:'异位妊娠',
                  pastpreg_qinggongshu:'清宫术'},
      },
      historyForm:{
        info:'',
      },
      dialogVisible: false,
      exist: true,
      formName:'',
      is_checked:'',
    }
  },
  methods: {
    updateDataForm () {
      /* 遗留问题 */
      var face_head = ['face_head_cangbai','face_head_huangbai','face_head_weihuang',
      'face_head_huian','face_head_anban','face_head_zhizhong','face_head_chunhong']
      var belly = ['belly_juan','belly_xian','belly_deretongjian','belly_tongjian']
      for (var i in face_head) {
        (this.historyForm[face_head[i]] === true) ? this.historyForm[face_head[i]]='true': this.historyForm[face_head[i]]='';
      }
      for (var i in belly) {
        (this.historyForm[belly[i]] === true) ? this.historyForm[belly[i]]='true': this.historyForm[belly[i]]='';
      }
      /* ******* */
      apiUpdatePatientDataForm({formData:this.historyForm, formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.searchPatient()
        // this.$parent.getPatients()
      })
      .catch(
      )
    },
    createDataForm () {
      /* 遗留问题 */
      var face_head = ['face_head_cangbai','face_head_huangbai','face_head_weihuang','face_head_huian',
                      'face_head_zhizhong','face_head_chunhong','face_head_anban']
      var belly = ['belly_juan','belly_xian','belly_deretongjian','belly_tongjian']
      for (var i in face_head) {
        (this.historyForm[face_head[i]] === true) ? this.historyForm[face_head[i]]='true': this.historyForm[face_head[i]]='';
      }
      for (var i in belly) {
        (this.historyForm[belly[i]] === true) ? this.historyForm[belly[i]]='true': this.historyForm[belly[i]]='';
      }
      /* *
      /* ******* */
      apiCreatePatientDataForm({formData:this.historyForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.searchPatient()
        // this.$parent.getPatients()
      })
      .catch(
      )
    },
    resetDialog () {
      this.historyForm = {}
      return this.dialogVisible=false
    },
    cycle (e) {
      e ? this.historyForm.abnormal = '': this.historyForm.normal = ''
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      // this.historyForm = {}
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      this.is_checked = data.is_checked
      if (!data.exist) {
        //未创建
        this.historyForm.info = data.formData.info
        /* 遗留问题 需要传person字段*/
        this.historyForm.person = data.formData.info
        /* ********* */
      } else {
        //已创建(修改)
        this.historyForm = data.formData
      }
    })
  }

};
</script>
<style scoped lang="scss">
.form-label {
    margin-block-start: 0.5em;
    color:cornflowerblue;
    font-weight: 600;
  }
.el-radio, .el-radio__input {
      white-space:normal
  }

</style>