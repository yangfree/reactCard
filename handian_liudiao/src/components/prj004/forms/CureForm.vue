<template>
  <el-dialog title="治疗" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="80%" center
            @close='resetDialog'>
    <el-form ref="cureForm" :model="cureForm" label-width="140px" label-position="left">
        <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
        </el-alert>
        <el-alert v-if="!isOwnedByUser" effect="dark"
                    title="此条信息为其他用户创建，您无法修改"
                    type="warning" :closable="false" show-icon>
        </el-alert>
        <el-divider></el-divider>

        <el-form-item label="中西医结合治疗">
            <el-switch v-model="cureForm.is_jiehe" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>

        <h3>中医治疗</h3>
        <el-form-item label="(1) 治法">
          <el-radio-group v-model="zhifa_result" @change="changezhifa">
            <el-radio class="radio" label="虚证治法">虚证治法</el-radio>
            <el-radio class="radio" label="实证治法">实证治法</el-radio>
            <el-radio class="radio" label="虚实夹杂证治法">虚实夹杂证治法</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="zhifa_xuzheng"  label="虚证治法">
          <el-radio v-model="cureForm.zhi_xu"
                    v-for="item in zhi_xu_choices"
                    :key="item" :label="item">
          </el-radio>
          <el-input v-model="cureForm.zhi_xu_qita"  placeholder="其他"></el-input>
        </el-form-item>
        <el-form-item  v-show="zhifa_shizheng" label="实证治法">
          <el-radio v-model="cureForm.zhi_shi"
                    v-for="item in zhi_shi_choices"
                    :key="item" :label="item">
          </el-radio>
          <el-input v-model="cureForm.zhi_shi_qita" placeholder="其他"></el-input>
        </el-form-item>
        <el-form-item  v-show="zhifa_xushi" label="虚实夹杂治法">
          <el-radio v-model="cureForm.zhi_xushi"
                    v-for="item in zhi_xushi_choices"
                    :key="item" :label="item">
          </el-radio>
          <el-input v-model="cureForm.zhi_xushi_qita" placeholder="其他"></el-input>
        </el-form-item>

        <el-form-item label="(2) 代表方">
          <el-radio-group v-model="daibiaofang_result" @change="changedaibiaofang">
            <el-radio class="radio" label="虚证代表方">虚证代表方</el-radio>
            <el-radio class="radio" label="实证代表方">实证代表方</el-radio>
            <el-radio class="radio" label="虚实夹杂证代表方">虚实夹杂证代表方</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="daibiaofang_xuzheng" label="虚证代表方">
            <el-checkbox v-for="(val, key) in dai_xu_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.dai_xu_qita" placeholder="其他"></el-input>
        </el-form-item>
        <el-form-item v-show="daibiaofang_shizheng" label="实证代表方">
            <el-checkbox v-for="(val, key) in dai_shi_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.dai_shi_qita" placeholder="其他"></el-input>
        </el-form-item>
        <el-form-item v-show="daibiaofang_xushi" label="虚实夹杂证代表方">
            <el-checkbox v-for="(val, key) in dai_xushi_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.dai_xushi_qita" placeholder="其他"></el-input>
        </el-form-item>

        <el-form-item label="(3) 中成药">
          <el-radio-group v-model="zhongchengyao_result" @change="changezhongchengyao">
            <el-radio class="radio" label="无">无</el-radio>
            <el-radio class="radio" label="虚证中成药">虚证中成药</el-radio>
            <el-radio class="radio" label="实证中成药">实证中成药</el-radio>
            <el-radio class="radio" label="虚实夹杂证中成药">虚实夹杂证中成药</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="zhongchengyao_xuzheng" label="虚证中成药">
            <el-checkbox v-for="(val, key) in zcy_xu_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.zcy_xu_qita"  placeholder="其他"></el-input>
        </el-form-item>
        <el-form-item v-show="zhongchengyao_shizheng" label="实证中成药">
            <el-checkbox v-for="(val, key) in zcy_shi_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.zcy_shi_qita"  placeholder="其他"></el-input>
        </el-form-item>
        <el-form-item v-show="zhongchengyao_xushi" label="虚实夹杂证中成药">
            <el-checkbox v-for="(val, key) in zcy_xushi_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.zcy_xushi_qita"  placeholder="其他"></el-input>
        </el-form-item>

        <el-form-item label="(4) 中医其他治疗">
            <el-checkbox label="无" v-model="cureForm.zhong_qita_wu">
            </el-checkbox>
            <el-checkbox v-show="!(cureForm.zhong_qita_wu)" v-for="(val, key) in zhongyi_qita_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-show="!(cureForm.zhong_qita_wu)" v-model="cureForm.zhong_qita_qita" placeholder="其他"></el-input>
        </el-form-item>

        <h3>西医治疗</h3>
        <el-form-item label="(1) 孕前治疗">
        </el-form-item>
        <el-form-item label="①性激素">
            <el-switch v-model="cureForm.xingjisu" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item  v-show="cureForm.xingjisu" label="">
            <el-checkbox v-for="(val, key) in xing_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
        </el-form-item>
        <el-form-item v-show="cureForm.xing_yun" label="孕激素">
            <el-checkbox v-for="(val, key) in xing_yun_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.xing_yun_qita"  placeholder="其他"></el-input>
        </el-form-item>
        <el-form-item v-show="cureForm.xing_ci" label="雌激素">
            <el-checkbox v-for="(val, key) in xing_ci_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.xing_ci_qita"  placeholder="其他"></el-input>
        </el-form-item>
        <el-form-item v-show="cureForm.xing_fu" label="雌孕激素复合制剂">
            <el-checkbox v-for="(val, key) in xing_fu_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.xing_fu_qita"  placeholder="其他"></el-input>
        </el-form-item>

        <el-form-item label="②免疫治疗">
            <el-switch v-model="cureForm.mianyi" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item v-show="cureForm.mianyi"  label="">
            <el-checkbox v-for="(val, key) in mianyi_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
        </el-form-item>
        <el-form-item v-show="cureForm.mian_zhu" label="主动免疫治疗">
            <el-checkbox v-for="(val, key) in mian_zhu_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.mian_zhu_qita"  placeholder="其他"></el-input>
        </el-form-item>
        <el-form-item v-show="cureForm.mian_bei" label="被动免疫治疗">
            <el-checkbox v-for="(val, key) in mian_bei_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.mian_bei_qita"  placeholder="其他"></el-input>
        </el-form-item>

        <el-form-item label="③抗凝治疗">
            <el-switch v-model="cureForm.kangning" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item v-show="cureForm.kangning" label="">
            <el-checkbox v-for="(val, key) in kangning_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.kangning_qita"  placeholder="其他"></el-input>
        </el-form-item>

        <el-form-item label="④促排卵">
            <el-switch v-model="cureForm.cupailuan" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item v-show="cureForm.cupailuan" label="">
            <el-checkbox v-for="(val, key) in cu_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.cu_qita"  placeholder="其他"></el-input>
        </el-form-item>

        <el-form-item label="⑤辅助生殖技术">
            <el-switch v-model="cureForm.fuzhu_shengzhi" active-text="有" inactive-text="无"></el-switch>
        </el-form-item>

        <el-form-item label="(1) 孕后治疗">
            <el-checkbox label="无" v-model="cureForm.yunhou_wu">
            </el-checkbox>
            <el-checkbox v-show="!cureForm.yunhou_wu" v-for="(val, key) in yunhou_choises" :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-show="!cureForm.yunhou_wu"  v-model="cureForm.yunhou_qita" placeholder="其他"></el-input>
        </el-form-item>

        <el-form-item label="(3) 手术治疗">
            <el-switch v-model="cureForm.shoushu" active-text="有" inactive-text="无"></el-switch>
        </el-form-item>

        <el-form-item label="(4) 其他治疗">
            <el-input v-model="cureForm.other_cure" placeholder="具体描述"></el-input>
        </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button type="primary" :disabled="check_status=='审核通过'" v-if="exist"  @click="updateCureForm">确定</el-button>
      <el-button type="primary" v-else  @click="createCureForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj004'
export default {
  name:'CureForm',
  data() {
    return {
      zhi_xu_choices:["补肾气","滋肾阴","温肾阳","阴阳双补","肾脾双补","补气养血","补气养血"],
      zhi_shi_choices:["燥湿化痰","活血祛瘀","疏肝解郁"],
      zhi_xushi_choices:["补肾活血","疏肝补肾","补气活血"],
      dai_xu_choises:{dai_xu_wen:"温胞饮", dai_xu_shen:"归肾丸", dai_xu_zhu:"毓麟珠", dai_xu_you:"右归丸", dai_xu_da:"大补元煎", dai_xu_gu:"固阴煎", dai_xu_yang:"养精种玉汤", dai_xu_liang:"两地汤合二至丸", dai_xu_zuo:"左归丸合二至丸", dai_xu_ju:"举元煎", dai_xu_gui:"归脾汤", dai_xu_ren:"人参养荣汤", dai_xu_er:"二仙汤合二至丸", dai_xu_bu:"补肾固冲丸", dai_xu_shan:"泰山磐石散", dai_xu_shou:"寿胎丸", dai_xu_tai:"胎元饮"},
      dai_shi_choises:{dai_shi_xiao:"逍遥散", dai_shi_chai:"柴胡疏肝散", dai_shi_kai:"开郁种玉汤", dai_shi_tao:"桃红四物汤", dai_shi_xue:"血府逐瘀汤", dai_shi_ge:"膈下逐瘀汤", dai_shi_shao:"少腹逐瘀汤", dai_shi_zu:"逐瘀止血汤", dai_shi_wen:"温经汤", dai_shi_dang:"当归芍药散", dai_shi_cang:"苍附导痰丸", dai_shi_liu:"六君子加归芎汤", dai_shi_dan:"温胆汤", dai_shi_gui:"桂枝茯苓丸"},
      dai_xushi_choises:{dai_xushi_jing:"定经汤", dai_xushi_tai:"寿胎丸合四物汤", dai_xushi_huo:"补肾活血汤", dai_xushi_qu:"补肾祛瘀方", dai_xushi_yi:"补中益气汤"},
      zcy_xu_choises:{zcy_xu_zi:"滋肾育胎丸", zcy_xu_bu:"补中益气丸/颗粒", zcy_xu_ren:"人参归脾丸", zcy_xu_gui:"归脾丸", zcy_xu_an:"安坤颗粒", zcy_xu_fu:"复方阿胶浆", zcy_xu_ke:"妇科再造丸/胶囊", zcy_xu_gu:"固经丸", zcy_xu_a:"阿胶当归合剂", zcy_xu_er:"二至丸", zcy_xu_lv:"驴胶补血颗粒", zcy_xu_ba:"八珍益母胶囊", zcy_xu_you:"右归丸", zcy_xu_wu:"乌鸡白凤丸/片/颗粒"},
      zcy_shi_choises:{zcy_shi_gui:"桂枝茯苓丸", zcy_shi_xue:"血府逐瘀颗粒", zcy_shi_wen:"温胆片"},
      zcy_xushi_choises:{zcy_xushi_jia:"加味逍遥口服液/合剂", zcy_xushi_ding:"定坤丹", zcy_xushi_nv:"女金丸/胶囊", zcy_xushi_dan:"丹栀逍遥丸", zcy_xushi_tiao:"妇科调经片", zcy_xushi_shi:"妇科十味片", zcy_xushi_gu:"固经丸"},
      zhongyi_qita_choises:{zhong_qita_ti:"体针", zhong_qita_er:"耳针", zhong_qita_fu:"腹针", zhong_qita_ai:"艾灸", zhong_qita_dou:"耳穴压豆", zhong_qita_zhu:"穴位注射", zhong_qita_tie:"穴位敷贴"},
      xing_choises:{xing_yun:"孕激素", xing_ci:"雌激素", xing_fu:"雌孕激素复合制剂"},
      xing_yun_choises:{xing_yun_ji:"肌注黄体酮",xing_yun_di:"地屈孕酮",xing_yun_jia:"甲羟孕酮",xing_yun_wei:"微粒化黄体酮胶囊"},
      xing_ci_choises:{xing_ci_ben:"苯甲酸雌二醇",xing_ci_wu:"戊酸雌二醇",xing_ci_zhen:"结合雌激素（针剂）",xing_ci_pian:"结合雌激素（片剂）"},
      xing_fu_choises:{xing_fu_di:"雌二醇地屈孕酮片",xing_fu_bing:"炔雌醇环丙孕酮片",xing_fu_chun:"屈螺酮炔雌醇片",xing_fu_chuner:"屈螺酮炔雌醇片Ⅱ",xing_fu_qu:"去氧孕烯炔雌醇片",xing_fu_fu:"复方孕二烯酮片"},
      mianyi_choises:{mian_zhu:"主动免疫治疗", mian_bei:"被动免疫治疗"},
      mian_zhu_choises:{mian_zhu_pei:"配偶外周血淋巴细胞",mian_zhu_di:"第三方外周血淋巴细胞"},
      mian_bei_choises:{mian_bei_dan:"免疫球蛋白注射"},
      kangning_choises:{kangning_a:"阿司匹林",kangning_di:"低分子肝素"},
      cu_choises:{cu_lv:"氯米芬",cu_lai:"来曲唑",cu_chong:"重组促卵泡生成激素（FSH）",cu_niao:"尿促性素（hMG）",cu_ren:"人绒毛膜促性腺激素（hCG）",cu_luan:"卵泡期使用低剂量雌激素"},
      yunhou_choises:{yunhou_hcg:"肌注HCG",yunhou_ji:"肌注黄体酮",yunhou_di:"地屈孕酮"},

      cureForm:{
        },
      dialogVisible: false,
      exist: true,
      formName:'',
      isOwnedByUser: true,
      check_status:'',
      zhifa_result:"",
      zhifa_shizheng:false,
      zhifa_xuzheng:false,
      zhifa_xushi:false,
      daibiaofang_result:"",
      daibiaofang_shizheng:false,
      daibiaofang_xuzheng:false,
      daibiaofang_xushi:false,
      zhongchengyao_result:"",
      zhongchengyao_shizheng:false,
      zhongchengyao_xuzheng:false,
      zhongchengyao_xushi:false,
    }
  },
  methods: {
    updateCureForm () {
      apiUpdatePatientDataForm({formData:this.cureForm,formName:this.formName})
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
    createCureForm () {
      apiCreatePatientDataForm({formData:this.cureForm,formName:this.formName})
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
      this.cureForm = {}
    },
    changezhifa(value) {
      if(value == "虚证治法"){
        this.zhifa_shizheng=false
        this.zhifa_xuzheng=true
        this.zhifa_xushi=false
        this.cureForm.zhi_shi=null
        this.cureForm.zhi_shi_qita=null
        this.cureForm.zhi_xushi=null
        this.cureForm.zhi_xushi_qita=null
      }else if(value == "实证治法"){
        this.zhifa_shizheng=true
        this.zhifa_xuzheng=false
        this.zhifa_xushi=false
        this.cureForm.zhi_xu=null
        this.cureForm.zhi_xu_qita=null
        this.cureForm.zhi_xushi=null
        this.cureForm.zhi_xushi_qita=null
      }else if(value == "虚实夹杂证治法"){
        this.zhifa_shizheng=false
        this.zhifa_xuzheng=false
        this.zhifa_xushi=true
        this.cureForm.zhi_xu=null
        this.cureForm.zhi_xu_qita=null
        this.cureForm.zhi_shi=null
        this.cureForm.zhi_shi_qita=null
      }
    },

    changedaibiaofang(value){
      if(value == "虚证代表方"){
        this.daibiaofang_xuzheng=true
        this.daibiaofang_shizheng=false
        this.daibiaofang_xushi=false
        this.cureForm.dai_shi_qita = null
        this.cureForm.dai_xushi_qita = null
        for (var x in this.dai_shi_choises)
        {
          this.cureForm[x] = false
        }
        for (var x in this.dai_xushi_choises)
        {
          this.cureForm[x] = false
        }
      }else if(value == "实证代表方"){
        this.daibiaofang_xuzheng=false
        this.daibiaofang_shizheng=true
        this.daibiaofang_xushi=false
        this.cureForm.dai_xu_qita = null
        this.cureForm.dai_xushi_qita = null
        for (var x in this.dai_xu_choises)
        {
          this.cureForm[x] = false
        }
        for (var x in this.dai_xushi_choises)
        {
          this.cureForm[x] = false
        }
      }else if(value == "虚实夹杂证代表方"){
        this.daibiaofang_xuzheng=false
        this.daibiaofang_shizheng=false
        this.daibiaofang_xushi=true
        this.cureForm.dai_xu_qita = null
        this.cureForm.dai_shi_qita = null
        for (var x in this.dai_xu_choises)
        {
          this.cureForm[x] = false
        }
        for (var x in this.dai_shi_choises)
        {
          this.cureForm[x] = false
        }
      }
    },

    changezhongchengyao(value){
      if(value == "无"){
        this.zhongchengyao_xuzheng=false
        this.zhongchengyao_shizheng=false
        this.zhongchengyao_xushi=false
        this.cureForm.zcy_xu_qita = null
        this.cureForm.zcy_shi_qita = null
        this.cureForm.zcy_xushi_qita = null
        for (var x in this.zcy_xu_choises)
        {
          this.cureForm[x] = false
        }
        for (var x in this.zcy_shi_choises)
        {
          this.cureForm[x] = false
        }
        for (var x in this.zcy_xushi_choises)
        {
          this.cureForm[x] = false
        }
      }else if(value == "虚证中成药"){
        this.zhongchengyao_xuzheng=true
        this.zhongchengyao_shizheng=false
        this.zhongchengyao_xushi=false
        this.cureForm.zcy_shi_qita = null
        this.cureForm.zcy_xushi_qita = null
        for (var x in this.zcy_shi_choises)
        {
          this.cureForm[x] = false
        }
        for (var x in this.zcy_xushi_choises)
        {
          this.cureForm[x] = false
        }
      }else if(value == "实证中成药"){
        this.zhongchengyao_xuzheng=false
        this.zhongchengyao_shizheng=true
        this.zhongchengyao_xushi=false
        this.cureForm.zcy_xu_qita = null
        this.cureForm.zcy_xushi_qita = null
        for (var x in this.zcy_xu_choises)
        {
          this.cureForm[x] = false
        }
        for (var x in this.zcy_xushi_choises)
        {
          this.cureForm[x] = false
        }
      }else if(value == "虚实夹杂证中成药"){
        this.zhongchengyao_xuzheng=false
        this.zhongchengyao_shizheng=false
        this.zhongchengyao_xushi=true
        this.cureForm.zcy_xu_qita = null
        this.cureForm.zcy_shi_qita = null
        for (var x in this.zcy_xu_choises)
        {
          this.cureForm[x] = false
        }
        for (var x in this.zcy_shi_choises)
        {
          this.cureForm[x] = false
        }
      }
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
        this.cureForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.cureForm = data.formData
        if((this.cureForm.zhi_xu)||(this.cureForm.zhi_xu_qita)){
          this.zhifa_result = "虚证治法"
          this.zhifa_shizheng=false
          this.zhifa_xuzheng=true
          this.zhifa_xushi=false
        }else if((this.cureForm.zhi_shi)||(this.cureForm.zhi_shi_qita)){
          this.zhifa_result = "实证治法"
          this.zhifa_shizheng=true
          this.zhifa_xuzheng=false
          this.zhifa_xushi=false
        }else if((this.cureForm.zhi_xushi)||(this.cureForm.zhi_xushi_qita)){
          this.zhifa_result = "虚实夹杂证治法"
          this.zhifa_shizheng=false
          this.zhifa_xuzheng=false
          this.zhifa_xushi=true
        }else{
          this.zhifa_result = ""
           this.zhifa_shizheng=false
           this.zhifa_xuzheng=false
           this.zhifa_xushi=false
        }

        if((this.cureForm.dai_xu_wen)||(this.cureForm.dai_xu_shen)||(this.cureForm.dai_xu_zhu)||(this.cureForm.dai_xu_you)||(this.cureForm.dai_xu_da)||(this.cureForm.dai_xu_gu)||(this.cureForm.dai_xu_yang)||(this.cureForm.dai_xu_liang)||(this.cureForm.dai_xu_zuo)||(this.cureForm.dai_xu_ju)||(this.cureForm.dai_xu_gui)||(this.cureForm.dai_xu_ren)||(this.cureForm.dai_xu_er)||(this.cureForm.dai_xu_bu)||(this.cureForm.dai_xu_shan)||(this.cureForm.dai_xu_shou)||(this.cureForm.dai_xu_tai)||(this.cureForm.dai_xu_qita)){
          this.daibiaofang_result = "虚证代表方"
          this.daibiaofang_shizheng=false
          this.daibiaofang_xuzheng=true
          this.daibiaofang_xushi=false
        }
        else if((this.cureForm.dai_shi_xiao)||(this.cureForm.dai_shi_chai)||(this.cureForm.dai_shi_kai)||(this.cureForm.dai_shi_tao)||(this.cureForm.dai_shi_xue)||(this.cureForm.dai_shi_ge)||(this.cureForm.dai_shi_shao)||(this.cureForm.dai_shi_zu)||(this.cureForm.dai_shi_wen)||(this.cureForm.dai_shi_dang)||(this.cureForm.dai_shi_cang)||(this.cureForm.dai_shi_liu)||(this.cureForm.dai_shi_dan)||(this.cureForm.dai_shi_gui)||(this.cureForm.dai_shi_qita)){
          this.daibiaofang_result = "实证代表方"
          this.daibiaofang_shizheng=true
          this.daibiaofang_xuzheng=false
          this.daibiaofang_xushi=false
        }
        else if((this.cureForm.dai_xushi_jing)||(this.cureForm.dai_xushi_tai)||(this.cureForm.dai_xushi_huo)||(this.cureForm.dai_xushi_qu)||(this.cureForm.dai_xushi_yi)||(this.cureForm.dai_xushi_qita)){
          this.daibiaofang_result = "虚实夹杂证代表方"
          this.daibiaofang_shizheng=false
          this.daibiaofang_xuzheng=false
          this.daibiaofang_xushi=true
        }else{
          this.daibiaofang_result = ""
          this.daibiaofang_shizheng=false
          this.daibiaofang_xuzheng=false
          this.daibiaofang_xushi=false
        }

        if((this.cureForm.zcy_xu_zi)||(this.cureForm.zcy_xu_bu)||(this.cureForm.zcy_xu_ren)||(this.cureForm.zcy_xu_gui)||(this.cureForm.zcy_xu_an)||(this.cureForm.zcy_xu_fu)||(this.cureForm.zcy_xu_ke)||(this.cureForm.zcy_xu_gu)||(this.cureForm.zcy_xu_a)||(this.cureForm.zcy_xu_er)||(this.cureForm.zcy_xu_lv)||(this.cureForm.zcy_xu_ba)||(this.cureForm.zcy_xu_you)||(this.cureForm.zcy_xu_wu)||(this.cureForm.zcy_xu_qita)){
          this.zhongchengyao_result = "虚证中成药"
          this.zhongchengyao_shizheng=false
          this.zhongchengyao_xuzheng=true
          this.zhongchengyao_xushi=false
        }
        else if((this.cureForm.zcy_shi_gui)||(this.cureForm.zcy_shi_xue)||(this.cureForm.zcy_shi_wen)||(this.cureForm.zcy_shi_qita)){
          this.zhongchengyao_result = "实证中成药"
          this.zhongchengyao_shizheng=true
          this.zhongchengyao_xuzheng=false
          this.zhongchengyao_xushi=false
        }
        else if((this.cureForm.zcy_xushi_jia)||(this.cureForm.zcy_xushi_ding)||(this.cureForm.zcy_xushi_nv)||(this.cureForm.zcy_xushi_dan)||(this.cureForm.zcy_xushi_tiao)||(this.cureForm.zcy_xushi_shi)||(this.cureForm.zcy_xushi_gu)||(this.cureForm.zcy_xushi_qita)){
          this.zhongchengyao_result = "虚实夹杂证中成药"
          this.zhongchengyao_shizheng=false
          this.zhongchengyao_xuzheng=false
          this.zhongchengyao_xushi=true
        }else{
          this.zhongchengyao_result = "无"
          this.zhongchengyao_shizheng=false
          this.zhongchengyao_xuzheng=false
          this.zhongchengyao_xushi=false
        }

      }
    })
  }

};
</script>
<style lang="">
</style>
