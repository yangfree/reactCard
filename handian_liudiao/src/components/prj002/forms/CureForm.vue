<template>
  <el-dialog title="治疗" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="cureForm" :model="cureForm" label-width="auto" label-position="left">
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

      <h4>1.生活方式干预</h4>
        <h5>（1）饮食控制: <el-switch v-model="cureForm.shenghuo_eat" active-text="有" inactive-text="无"></el-switch></h5>
        <h5>（2）运动: </h5>
          <el-radio v-model="cureForm.shenghuo_sport"
                    v-for="item in shenghuo_sport"
                    :key="item" :label="item">
          </el-radio>
        <h5>（3）行为干预:</h5>
          <el-checkbox v-for="(val, key) in shenghuo_xingwei" :key="key"
                      v-model="cureForm[key]" :label="val">
          </el-checkbox>

      <h4>2.治疗模式</h4>
          <el-checkbox v-model="cureForm.cure_zhong" label="中医治疗">中医治疗（非规律使用或偶尔使用孕激素可归为此类）</el-checkbox>
          <el-checkbox v-model="cureForm.cure_xi" label="西医治疗"></el-checkbox>
          <el-checkbox v-model="cureForm.cure_jiehe" label="中西医结合治疗"></el-checkbox>

      <h4>3.（单纯中医治疗者请填写）已就诊时间是否≥3个月
        <el-switch v-model="cureForm.is_cure_zhong_time" active-text="有" inactive-text="无"></el-switch>
      </h4>
        <div v-show="cureForm.is_cure_zhong_time">
          <p>已就诊时间：<el-input v-model="cureForm.cure_zhong_time" style="width:60px;" type="number" min=0></el-input>月</p>
          <p>自主排卵月经次数：<el-input v-model="cureForm.cure_zhong_pailuan" style="width:70px;" type="number" min=0></el-input>次</p>
          自主排卵月经诊断依据：
            <el-checkbox v-model="cureForm.cure_zhong_pailuan_bxray" label="B超"></el-checkbox>
            <el-checkbox v-model="cureForm.cure_zhong_pailuan_yuntong" label="孕酮"></el-checkbox>
            <el-checkbox v-model="cureForm.cure_zhong_pailuan_tiwen" label="基础体温"></el-checkbox>
            <el-input v-model="cureForm.cure_zhong_time_qita" placeholder="其他"></el-input>
        </div>

      <h4>4.中医治疗</h4>
        <h5>（1）治法:</h5>
          <p>①虚证:</p>
          <el-checkbox v-for="(val, key) in zhong_xu" :key="key"
                      v-model="cureForm[key]" :label="val">
          </el-checkbox>
          <el-input v-model="cureForm.zhong_xu_qita" placeholder="其他"></el-input>
          <p>②实证:</p>
          <el-checkbox v-for="(val, key) in zhong_shi" :key="key"
                      v-model="cureForm[key]" :label="val">
          </el-checkbox>
          <el-input v-model="cureForm.zhong_shi_qita" placeholder="其他"></el-input>
          <p>③虚实夹杂证:</p>
          <el-checkbox v-for="(val, key) in zhong_xushi" :key="key"
                      v-model="cureForm[key]" :label="val">
          </el-checkbox>
          <el-input v-model="cureForm.zhong_xushi_qita" placeholder="其他"></el-input>
        <h5>（2）选用方药及剂量:</h5>
          <el-input type="textarea" :rows="2" v-model="cureForm.fangyao"></el-input>
        <h5>（3）中成药: <el-switch v-model="cureForm.zhongchengyao" active-text="有" inactive-text="无"></el-switch></h5>
          <el-input v-show="cureForm.zhongchengyao" v-model="cureForm.zhongchengyao_detail" placeholder="具体药物"></el-input>
        <h5>（4）调周法: <el-switch v-model="cureForm.tiaozhou" active-text="有" inactive-text="无"></el-switch></h5>
          <div v-show="cureForm.tiaozhou">
            <p>①分期:<el-input v-model="cureForm.tiaozhou_qi" style="width:50px"></el-input>期</p>
            <p>②各期治法与方药:</p>
              <el-input v-model="cureForm.tiaozhou_detail" type="textarea" :rows="2"></el-input>
          </div>
        <h5>（5）针刺: <el-switch v-model="cureForm.zhenci" active-text="有" inactive-text="无"></el-switch></h5>
          <div v-show="cureForm.zhenci">
            <p>①具体穴位:</p>
              <el-input v-model="cureForm.zhenci_xuewei" type="textarea" :rows="2"></el-input>
            <p>②针刺手法:</p>
              <el-input v-model="cureForm.zhenci_shoufa" type="textarea" :rows="2"></el-input>
          </div>
      <h4>5.西医治疗</h4>
        <h5>（1）调整月经周期治疗: <el-switch v-model="cureForm.xi_yuejing" active-text="有" inactive-text="无"></el-switch></h5>
          <div v-show="cureForm.xi_yuejing">
            <p>避孕药类</p>
            <el-checkbox v-for="(val, key) in xi_yuejing_biyun" :key="key"
                        v-model="cureForm[key]" :label="val">
            </el-checkbox>
            <el-input v-model="cureForm.xi_yuejing_biyun_qita" placeholder="其他"></el-input>
            <p>孕激素类</p>
            <el-checkbox v-for="(val, key) in xi_yuejing_jisu" :key="key"
                        v-model="cureForm[key]" :label="val">
            </el-checkbox>
            <el-input v-model="cureForm.xi_yuejing_jisu_qita" placeholder="其他"></el-input>
            <p>雌孕激素周期序贯治疗</p>
            <el-input v-model="cureForm.xi_ciyunjisu" placeholder="其他"></el-input>
          </div>
        <h5>（2）降低血雄激素水平治疗: <el-switch v-model="cureForm.xuexiong_shui" active-text="有" inactive-text="无"></el-switch></h5>
          <div v-show="cureForm.xuexiong_shui">
            <el-checkbox v-for="(val, key) in xuexiong_shui" :key="key"
                      v-model="cureForm[key]" :label="val">
            </el-checkbox>
            <el-input v-model="cureForm.xuexiong_qita" placeholder="其他"></el-input>
          </div>
        <h5>（3）改善胰岛素抵抗治疗: <el-switch v-model="cureForm.yidaosu" active-text="有" inactive-text="无"></el-switch></h5>
          <div v-show="cureForm.yidaosu">
            <el-checkbox v-for="(val, key) in yidaosu" :key="key"
                      v-model="cureForm[key]" :label="val">
            </el-checkbox>
            <el-input v-model="cureForm.yidaosu_qita" placeholder="其他"></el-input>
          </div>
        <h5>（4）诱发排卵治疗: <el-switch v-model="cureForm.youfa" active-text="有" inactive-text="无"></el-switch></h5>
          <div v-show="cureForm.youfa">
            <el-checkbox v-for="(val, key) in youfa" :key="key"
                        v-model="cureForm[key]" :label="val">
            </el-checkbox>
            <el-input v-model="cureForm.youfa_qita" placeholder="其他"></el-input>
          </div>
        <h5>（5）促进生育: <el-switch v-model="cureForm.shengyu" active-text="有" inactive-text="无"></el-switch></h5>
          <div v-show="cureForm.shengyu">
            <el-checkbox v-for="(val, key) in shengyu" :key="key"
                        v-model="cureForm[key]" :label="val">
            </el-checkbox>
            <el-input v-model="cureForm.shengyu_qita" placeholder="其他"></el-input>
          </div>

      <h4>6.是否接受心理治疗: <el-switch v-model="cureForm.xi_xinli" active-text="有" inactive-text="无"></el-switch></h4>

      <h4>7.其他治疗: <el-switch v-model="cureForm.xi_other" active-text="有" inactive-text="无"></el-switch></h4>
          <el-input v-model="cureForm.xi_other_qita" placeholder="其他"></el-input>



    </el-form>

    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" v-if="exist"  @click="updateCureForm">确定</el-button>
      <el-button :disabled="check_status=='审核通过'" type="primary" v-else  @click="createCureForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj002'
export default {
  name:'CureForm',
  data() {
    return {
      'shenghuo_sport':['无', '偶尔', '一周1-2次', '一周3-5次', '每天'],
      'shenghuo_xingwei':{
          'shenghuo_xingwei_wu':'无',
          'shenghuo_xingwei_xinli':'接受心理疏导',
          'shenghuo_xingwei_qingxu':'改善情绪，保持乐观心态',
          'shenghuo_xingwei_yanjiu':'戒烟戒酒',
          'shenghuo_xingwei_shuimian':'有增加睡眠时间，提高睡眠质量',
      },
      'zhong_xu':{
          'zhong_xu_yiqi':'益气健脾养血',
          'zhong_xu_shen':'补肾助阳，温中健脾',
          'zhong_xu_jianpi':'健脾温阳',
          'zhong_xu_bushen':'补肾益气',
          'zhong_xu_ziyin':'滋阴补肾',
          'zhong_xu_wenshen':'温肾助阳，调补冲任',
          'zhong_xu_buxue':'补血益气',
          'zhong_xu_yangyin':'养阴清热',
      },
      'zhong_shi':{
          'zhong_shi_xiegan':'泻肝清热除湿',
          'zhong_shi_jieyu':'疏肝解郁理气调冲',
          'zhong_shi_shugan':'疏肝解郁清热',
          'zhong_shi_liqi':'理气化瘀活血',
          'zhong_shi_zaoshi':'燥湿化痰',
          'zhong_shi_huatan':'化痰祛瘀活血',
      },
      'zhong_xushi':{
          'zhong_xushi_huatan':'健脾祛湿化痰',
          'zhong_xushi_liqi':'补肾益精，疏肝理气',
          'zhong_xushi_zaoshi':'补肾益精，化痰燥湿',
          'zhong_xushi_yijing':'补肾益精，活血化痰',
          'zhong_xushi_tiaojing':'滋肾清热调经',
          'zhong_xushi_qingre':'滋肾清热，化瘀利湿',
          'zhong_xushi_bushen':'补肾清热，化瘀利湿',
      },

      'xi_yuejing_biyun':{
          'xi_yuejing_biyun_da':'达英35',
          'xi_yuejing_biyun_ma':'妈富隆',
      },
      'xi_yuejing_jisu':{
          'xi_yuejing_jisu_diqu':'地屈孕酮',
          'xi_yuejing_jisu_weili':'微粒化黄体酮',
          'xi_yuejing_jisu_huangti':'黄体酮',
          'xi_yuejing_jisu_cusuan':'醋酸甲羟孕酮',
      },

      'xuexiong_shui':{
          'xuexiong_tang':'糖皮质激素类',
          'xuexiong_huan':'环丙孕酮',
          'xuexiong_luo':'螺内酯',
      },
      'yidaosu':{
          'yidaosu_erjia':'二甲双胍类',
          'yidaosu_gelie':'吡格列酮',
          'yidaosu_aka':'阿卡波糖',
      },
      'youfa':{
          'youfa_mi':'氯米芬',
          'youfa_lai':'来曲唑',
          'youfa_cu':'促性腺激素',
          'youfa_hm':'hMG',
          'youfa_hp':'HP-FSH',
          'youfa_rf':'rFSH',
      },
      'shengyu':{
          'shengyu_fu':'腹腔镜下卵巢打孔术',
          'shengyu_iv':'IVF-ET',
          'shengyu_tiwai':'体外成熟培养',
          'shengyu_yidao':'胰岛素增敏剂',
      },
      cureForm:{
      },
      dialogVisible: false,
      exist: true,
      formName:'',
      check_status:'',
      isOwnedByUser: true,
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
        this.$parent.searchPatient()
        // this.$parent.getPatients()
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
        this.$parent.getPatients()
      })
      .catch()
    },
    resetDialog () {
      this.cureForm = {}
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
        this.cureForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.cureForm = data.formData
      }

    })
  }

};
</script>
<style lang="">
</style>