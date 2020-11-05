<template>
  <el-dialog title="专科病史" class="my-dialog history-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="historyForm" :model="historyForm" label-width="80px" label-position="left">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-alert v-if="check_status=='已提交'" effect="dark"
                  title="此条信息已经提交审核,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <p></p>
      <el-alert v-if="!isOwnedByUser" effect="dark"
                  title="此条信息为其他用户创建，您无法修改"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <p></p>

      <h4>1.多囊卵巢综合征病程</h4>
        <div class="history-input">
          <el-input v-model="historyForm.duonang_year" style="width:50px;"></el-input>年
          <el-input v-model="historyForm.duonang_month" style="width:50px;"></el-input>月
        </div>
      <h4>2.其他疾病史 <el-switch v-model="historyForm.other_disease" active-text="有" inactive-text="无"></el-switch></h4>
        <div v-show="historyForm.other_disease">
          <h5>生殖障碍</h5>
            <el-checkbox v-for="(val, key) in shengzhi" :key="key"
                        v-model="historyForm[key]" :label="val">
            </el-checkbox>
            <el-input v-model="historyForm.shengzhi_zi_juti" v-if="historyForm.shengzhi_zi" type="number" min="0" placeholder="自然流产-具体孕周"></el-input>
            <div class="history-input" v-if="historyForm.shengzhi_ti">
              胚胎移植
              <el-input v-model="historyForm.shengzhi_ti_pei" style="width:50px;"></el-input>
              次,着床
              <el-input v-model="historyForm.shengzhi_ti_zhuo" style="width:50px;"></el-input>次
            </div>
          <h5>代谢障碍</h5>
            <el-checkbox v-for="(val, key) in daixie" :key="key"
                        v-model="historyForm[key]" :label="val">
            </el-checkbox>
          <h5>孕产期并发症</h5>
            <el-checkbox v-for="(val, key) in yunchanqi" :key="key"
                        v-model="historyForm[key]" :label="val">
            </el-checkbox>
            <el-input v-model="historyForm.yunchan_qita" placeholder="其他"></el-input>
        </div>
      <h4>3.个人史</h4>
        <h5>(1)饮食习惯</h5>
          <el-checkbox v-for="(val, key) in yinshi" :key="key"
                      v-model="historyForm[key]" :label="val">
          </el-checkbox>
          <el-input v-model="historyForm.person_eat_qita"></el-input>
        <h5>(2)特殊嗜好</h5>
          <el-checkbox v-for="(val, key) in shihao" :key="key"
                      v-model="historyForm[key]" :label="val">
          </el-checkbox>
          <el-input v-model="historyForm.person_hobby_qita"></el-input>
        <h5>(3)患者出生状况</h5>
          <el-checkbox v-for="(val, key) in chusheng" :key="key"
                      v-model="historyForm[key]" :label="val">
          </el-checkbox>
        <h5>(4)对生活方式与本病的认知程度</h5>
          <el-radio v-model="historyForm.person_know"
                    v-for="item in renzhichengdu"
                    :key="item" :label="item">
          </el-radio>
        <h5>(5)对本病的认知来源</h5>
          <el-checkbox v-for="(val, key) in renzhilaiyuan" :key="key"
                      v-model="historyForm[key]" :label="val">
          </el-checkbox>

      <h4>4.月经史</h4>
        <h5>(1)月经初潮年龄</h5>
          <el-radio v-model="historyForm.first_time"
                    v-for="item in chuchao"
                    :key="item" :label="item">
          </el-radio>
          <el-input v-model="historyForm.first_time_qita"></el-input>
        <h5>(2)月经周期</h5>
          <el-radio v-model="historyForm.yuejing_zhouqi"
                    v-for="item in zhouqi"
                    :key="item" :label="item">
          </el-radio>
        <h5>(3)经量</h5>
          <el-radio v-model="historyForm.yuejing_liang"
                    v-for="item in jingliang"
                    :key="item+'1'" :label="item">
          </el-radio>
        <h5>(4)经期</h5>
          <el-radio v-model="historyForm.yuejing_time"
                    v-for="item in jingqi"
                    :key="item+'2'" :label="item">
          </el-radio>
        <h5>(5)LMP和PMP</h5>
          LMP
          <el-date-picker v-model="historyForm.yuejing_lmp"
                        type="date" placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
          </el-date-picker>
          PMP
          <el-date-picker v-model="historyForm.yuejing_pmp"
                        type="date" placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
          </el-date-picker>

      <h4>5.带下史</h4>
        <h5>(1)量
          <el-radio v-model="historyForm.daixia_history_liang"
                    v-for="item in daixia_liang"
                    :key="item+'3'" :label="item">
          </el-radio></h5>
        <h5>(2)色
          <el-radio v-model="historyForm.daixia_history_se"
                    v-for="item in daixia_se"
                    :key="item" :label="item">
          </el-radio></h5>
        <h5>(3)质
          <el-radio v-model="historyForm.daixia_history_zhi"
                    v-for="item in daixia_zhi"
                    :key="item" :label="item">
          </el-radio></h5>

      <h4>6.孕产史 <el-switch v-model="historyForm.yunchan_history" active-text="有" inactive-text="无"></el-switch></h4>
        <div class="history-input" v-show="historyForm.yunchan_history">
          孕<el-input v-model="historyForm.yunchan_history_yun" style="width:50px;"></el-input>次、
          顺产<el-input v-model="historyForm.yunchan_history_shun" style="width:50px;"></el-input>次、
          剖宫产<el-input v-model="historyForm.yunchan_history_pou" style="width:50px;"></el-input>次、
          足月产<el-input v-model="historyForm.yunchan_history_zu" style="width:50px;"></el-input>次、
          早产<el-input v-model="historyForm.yunchan_history_zao" style="width:50px;"></el-input>次、
          自然流产<el-input v-model="historyForm.yunchan_history_zi" style="width:50px;"></el-input>次、
          异位妊娠<el-input v-model="historyForm.yunchan_history_yi" style="width:50px;"></el-input>次、
          低体重儿<el-input v-model="historyForm.yunchan_history_di" style="width:50px;"></el-input>个、
          巨大儿<el-input v-model="historyForm.yunchan_history_ju" style="width:50px;"></el-input>个
          <el-input v-model="historyForm.yunchan_history_qita" placeholder="其他"></el-input>
        </div>

      <h4>7.避孕措施 <el-switch v-model="historyForm.biyun" active-text="有" inactive-text="无"></el-switch></h4>
        <div v-show="historyForm.biyun">
          <el-checkbox v-for="(val, key) in biyun" :key="key"
                      v-model="historyForm[key]" :label="val">
          </el-checkbox>
          <el-input v-model="historyForm.biyun_qita" placeholder="其他"></el-input>
        </div>

      <h4>8.家族史：一级亲属（父母、兄弟姐妹、子女）其他疾病史 <el-switch v-model="historyForm.family_history" active-text="有" inactive-text="无"></el-switch></h4>
        <div v-show="historyForm.family_history">
          <el-checkbox v-for="(val, key) in family_history" :key="key"
                      v-model="historyForm[key]" :label="val">
          </el-checkbox>
          <el-input v-model="historyForm.family_history_qita" placeholder="其他"></el-input>
        </div>
      <h4>9.过敏史 <el-switch v-model="historyForm.guomin_history" active-text="有" inactive-text="无"></el-switch></h4>
          <el-input v-model="historyForm.guomin_history_detail" v-show="historyForm.guomin_history" placeholder="请具体填写过敏史"></el-input>

    </el-form>

    <span slot="footer">
      <el-button type="primary" :disabled="check_status=='审核通过'" v-if="exist" @click="updateHistoryForm">确定</el-button>
      <el-button type="primary" v-else  @click="createHistoryForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj002'
export default {
  name:'HistoryForm',
  data() {
    return {
      hairy_table:{
        "shangchun":{name:"上唇",list:["无毛", "散在几根", "外侧1/4",      "全部上唇"]},
        "xiae":     {name:"下额",list:["无毛", "散在几根", "散在，较多",    "覆盖下额，密"]},
        "xiongbu":  {name:"胸部",list:["无毛", "乳晕周围", "乳晕，胸中线",  "覆盖前胸"]},
        "shangfu":  {name:"上腹",list:["无毛", "中线几根", "中线，较多",    "覆盖上腹全部"]},
        "xiafu":    {name:"下腹",list:["无毛", "中线几根", "中线，细带状",  "与阴毛相连，菱形"]},
        "shangtun": {name:"上臀",list:["无毛", "内侧几根", "覆盖内侧面1/2", "覆盖内侧面，密"]},
        "datui":    {name:"大腿",list:["无毛", "内侧几根", "覆盖内侧面1/3", "覆盖内侧面，密"]},
        "shangbei": {name:"上背",list:["无毛", "散在几根", "覆盖上背部1/2", "覆盖上背，密"]},
        "yaodi":    {name:"腰骶",list:["无毛", "骶部几根", "覆盖腰骶部1/2", "覆盖整个腰骶部"]},
      },
      shengzhi:{
        "shengzhi_qing":"青春期功血",
        "shengzhi_bi":"闭经",
        "shengzhi_yue":"月经失调",
        "shengzhi_bu":"不孕",
        "shengzhi_zi":"自然流产",
        "shengzhi_ti":"体外受精"
      },
      daixie:{
        "daixie_fei":"肥胖",
        "daixie_gao":"高血脂",
        "daixie_yi":"胰岛素抵抗",
        "daixie_tang":"糖尿病",
        "daixie_xin":"心血管疾病"
      },
      yunchanqi:{
        "yunchan_chen":"妊娠期糖尿病",
        "yunchan_gao":"妊娠期高血压疾病",
        "yunchan_ju":"巨大儿",
        "yunchan_di":"低体重儿",
        "yunchan_tai":"胎儿宫内发育迟缓",
        "yunchan_zao":"早产",
        "yunchan_xian":"子宫腺肌症",
        "yunchan_yi":"子宫内膜异位症",
        "yunchan_ji":"子宫肌瘤",
        "yunchan_luan":"卵巢囊肿",
        "yunchan_pen":"盆腔炎性疾病",
        "yunchan_yin":"阴道炎",
        "yunchan_jian":"甲减",
        "yunchan_kang":"甲亢",
        "yunchan_shen":"肾上腺相关疾病",
        "yunchan_xueye":"血液系统相关疾病",
        "yunchan_liu":"脑垂体瘤"
      },
      yinshi:{
        "person_eat_zc":"正常",
        "person_eat_bao":"过饱",
        "person_eat_ji":"过饥",
        "person_eat_xi":"喜甜",
        "person_eat_fei":"肥甘厚腻",
      },
      shihao:{
        "person_hobby_wu":"无",
        "person_hobby_xi":"吸烟",
        "person_hobby_yin":"饮酒",
        "person_hobby_ao":"熬夜(23：00以后睡)",
      },
      chusheng:{
        "person_born_zu":"足月产",
        "person_born_zao":"早产",
        "person_born_di":"低体重儿",
        "person_born_ju":"巨大儿 ",
        "person_born_bu":"不详"
      },
      renzhichengdu:["不了解","有一定了解","了解"],
      renzhilaiyuan:{
        "person_source_ke":"科普文章",
        "person_source_wang":"网络信息",
        "person_source_yi":"医护宣教",
      },
      chuchao:["＜10周岁","10≤年龄≤16周岁","≤16周岁"],
      zhouqi:["规律","稀发","频发","月经不规则"],
      jingliang:["正常","少","中","多"],
      jingqi:["正常","延长"],

      daixia_liang:["正常","少","多"],
      daixia_se:["白","黄","黄绿","赤"],
      daixia_zhi:["黏而不稠","清稀","稠"],

      biyun:{
        "biyun_jie":"输卵管结扎",
        "biyun_qi":"宫内节育器",
        "biyun_tao":"避孕套",
        "biyun_kou":"口服避孕药"
      },

      family_history:{
        "family_history_tang":"糖尿病",
        "family_history_fei":"肥胖",
        "family_history_gao":"高血压",
        "family_history_tiao":"母亲或姐妹月经不调",
        "family_history_tu":"父亲秃头",
        "family_history_liu":"妇科肿瘤"
      },
      historyForm:{},
      dialogVisible: false,
      exist: true,
      formName:'',
      isOwnedByUser: true,
      check_status:''
    }
  },
  methods: {
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
        this.$parent.searchPatient()
        // this.$parent.getPatients()
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
        this.$parent.getPatients()
      })
      .catch()
    },
    resetDialog () {
      this.historyForm = {}
    }
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
      }
    })
  }

};
</script>
<style lang="scss">
.history-dialog .el-input__inner {
  margin-top: 10px;
}
.history-input .el-input__inner {
  margin-top: 10px;
  padding:0 5px;
}
</style>