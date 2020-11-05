<template>
  <el-dialog title="病情概要" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="summaryForm" :model="summaryForm" label-width="140px" label-position="left">
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

      <h3>一、主症</h3>
      <el-form-item label="主诉:经行腹痛" >
          <el-col :span="6">
            <el-input v-model="summaryForm.zhusu" type="number" min="0">
              <template slot="append">个月</template>
            </el-input>
          </el-col>
      </el-form-item>

      <el-form-item label="疼痛程度（VAS评分）"  label-width="100%"></el-form-item>
        <label>说明：数字0—10代表痛经程度依次递增，0代表无痛经；10代表极度疼痛甚则晕厥</label>
        <p></p>
      <el-form-item label="">
        <el-radio-group v-model="summaryForm.pain_level">
          <el-radio-button  v-for="item in pain_level"  :key="item" :label="item">
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="疼痛性质">
        <el-checkbox v-for="(val, key) in pain_character" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-model="summaryForm.pain_character_qita"  placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="疼痛开始时间">
        <el-col :span="6">
          <el-radio v-model="summaryForm.pain_start_time"
                    v-for="item in radio_pain_start_time"
                    :key="item" :label="item">
          </el-radio>
        </el-col>
        <el-col :span="6">
          <el-input v-model="summaryForm.pain_start_time_day" type="number" min="0">
            <template slot="prepend">第</template>
            <template slot="append">天</template>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="疼痛结束时间">
        <el-col :span="6">
          <el-radio v-model="summaryForm.pain_end_time"
                    v-for="item in radio_pain_end_time"
                    :key="item" :label="item">
          </el-radio>
        </el-col>
        <el-col :span="6">
          <el-input v-model="summaryForm.pain_end_time_day" type="number" min="0">
            <template slot="prepend">第</template>
            <template slot="append">天</template>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="疼痛总发作时间">
        <el-radio v-model="summaryForm.pain_total_time"
                  v-for="item in radio_pain_total_time"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item label="疼痛喜恶">
        <el-checkbox v-for="(val, key) in pain_hobby" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
      </el-form-item>
      <el-form-item label="月经量">
        <el-radio v-model="summaryForm.menstruation"
                  v-for="item in radio_menstruation"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="summaryForm.menstruation_qita"  placeholder="其他" type="string" >
        </el-input>
      </el-form-item>
      <el-form-item label="经血颜色">
        <el-radio v-model="summaryForm.blood_color"
                  v-for="item in radio_blood_color"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="summaryForm.blood_color_qita"  placeholder="其他" type="string" >
        </el-input>
      </el-form-item>
      <el-form-item label="经血质地">
        <el-form-item label="(1)">
          <el-radio v-model="summaryForm.blood_quality_first"
                    v-for="item in radio_blood_quality_first"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
        <el-form-item label="(2)">
          <el-radio v-model="summaryForm.blood_quality_second"
                    v-for="item in radio_blood_quality_second"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
        <el-form-item label="(3)">
          <el-radio v-model="summaryForm.blood_quality_third"
                    v-for="item in radio_blood_quality_third"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
      </el-form-item>
      <template v-for="(q_val,q_key) in mydata">
        <el-form-item :label="q_val.name" label-width="100%"></el-form-item>
        <el-form-item label="" :key="q_key" :show-overflow-tooltip=true label-width="50px">
          <!--
          <el-switch v-model="summaryForm[q_key]" active-text="是" inactive-text="否"></el-switch>
          -->
          <el-radio-group v-model="summaryForm[q_key]">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
          <el-form-item v-show="summaryForm[q_key]" label="总发作时间">
            <el-radio-group v-model="summaryForm[q_val.para_time]">
                <el-radio label="<3小时"></el-radio>
                <el-radio label="3~7小时"></el-radio>
                <el-radio label="8~24小时"></el-radio>
                <el-radio label=">24小时"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-show="summaryForm[q_key]" label="平均强度">
            <el-radio-group v-model="summaryForm[q_val.para_average]">
              <el-radio label="轻度"></el-radio>
              <el-radio label="中度"></el-radio>
              <el-radio label="较显著"></el-radio>
              <el-radio label="剧烈"></el-radio>
            </el-radio-group>
          </el-form-item>
      </template>

      <el-form-item label="汗出" >
        <el-radio-group v-model="summaryForm.is_hanchu">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <!--
        <el-switch v-model="summaryForm.is_hanchu" active-text="是" inactive-text="否"></el-switch>
        -->
      </el-form-item>
      <el-form-item label="肛门坠胀" >
        <el-radio-group v-model="summaryForm.is_gangmen">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <!--
        <el-switch v-model="summaryForm.is_gangmen" active-text="是" inactive-text="否"></el-switch>
        -->
      </el-form-item>
      <el-form-item label="四肢厥冷" >
        <el-radio-group v-model="summaryForm.is_sizhi">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <!--
        <el-switch v-model="summaryForm.is_sizhi" active-text="是" inactive-text="否"></el-switch>
        -->
      </el-form-item>
      <el-form-item label="晕厥" >
        <el-radio-group v-model="summaryForm.is_yunjue">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
        <!--
        <el-switch v-model="summaryForm.is_yunjue" active-text="是" inactive-text="否"></el-switch>
        -->
        <el-form-item v-show="summaryForm.is_yunjue" label="晕厥频次">
           <el-radio-group v-model="summaryForm.is_yunjue_level">
             <el-radio label="偶尔"></el-radio>
             <el-radio label="经常"></el-radio>
           </el-radio-group>
        </el-form-item>
      </el-form-item>

      <el-form-item label="舌质">
        <el-radio v-model="summaryForm.texture"
                  v-for="item in texture_choise"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="summaryForm.texture_qita" placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="舌体">
        <el-checkbox  :label="tongue_body.tongue_zhengchang" v-model="summaryForm['tongue_zhengchang']"></el-checkbox>
        <el-checkbox v-show="!summaryForm['tongue_zhengchang']" :label="tongue_body.tongue_shouxiao" v-model="summaryForm['tongue_shouxiao']"></el-checkbox>
        <el-checkbox v-show="!summaryForm['tongue_zhengchang']" :label="tongue_body.tongue_pangda" v-model="summaryForm['tongue_pangda']"></el-checkbox>
        <el-checkbox v-show="!summaryForm['tongue_zhengchang']" :label="tongue_body.tongue_chihen" v-model="summaryForm['tongue_chihen']"></el-checkbox>
        <el-checkbox v-show="!summaryForm['tongue_zhengchang']" :label="tongue_body.tongue_liewen" v-model="summaryForm['tongue_liewen']"></el-checkbox>
        <el-input  v-show="!summaryForm['tongue_zhengchang']" v-model="summaryForm.tongue_qita"  placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="舌苔">
        <el-checkbox v-for="(val, key) in tongue_coating" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-model="summaryForm.coating_qita"  placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="脉象">
        <el-checkbox v-for="(val, key) in pulse" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-model="summaryForm.pulse_qita"  placeholder="其他"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer">
        <el-button type="primary" :disabled="check_status=='审核通过'" v-if="exist"  @click="updateSummaryForm">确定</el-button>
        <el-button type="primary" v-else  @click="createSummaryForm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj003'
export default {
  name:'SummaryForm',
  data() {
    return {
      mydata: {
        is_exin:{name:"经期恶心", para_time:"is_exin_total_time", para_average:"is_exin_average"},
        is_outu:{name:"经期呕吐", para_time:"is_outu_total_time", para_average:"is_outu_average"},
        is_shiyu:{name:"经期食欲不振", para_time:"is_shiyu_total_time", para_average:"is_shiyu_average"},
        is_toutong:{name:"经期头痛", para_time:"is_toutong_total_time", para_average:"is_toutong_average"},
        is_beitong:{name:"经期背（腰骶部）痛", para_time:"is_beitong_total_time", para_average:"is_beitong_average"},
        is_tuitong:{name:"经期腿痛", para_time:"is_tuitong_total_time", para_average:"is_tuitong_average"},
        is_fali:{name:"经期乏力", para_time:"is_fali_total_time", para_average:"is_fali_average"},
        is_xuanyun:{name:"经期眩晕", para_time:"is_xuanyun_total_time", para_average:"is_xuanyun_average"},
        is_fuxie:{name:"经期腹泻", para_time:"is_fuxie_total_time", para_average:"is_fuxie_average"},
        is_mianse:{name:"经期面色变化", para_time:"is_mianse_total_time", para_average:"is_mianse_average"},
        is_weitong:{name:"经期胃痛", para_time:"is_weitong_total_time", para_average:"is_weitong_average"},
        is_mianhong:{name:"经期面红", para_time:"is_mianhong_total_time", para_average:"is_mianhong_average"},
        is_shimian:{name:"经期失眠", para_time:"is_shimian_total_time", para_average:"is_shimian_average"},
        is_quanshen:{name:"经期全身疼痛", para_time:"is_quanshen_total_time", para_average:"is_quanshen_average"},
        is_yiyu:{name:"经期抑郁", para_time:"is_yiyu_total_time", para_average:"is_yiyu_average"},
        is_yiji:{name:"经期易激惹（烦恼、急躁或愤怒）", para_time:"is_yiji_total_time", para_average:"is_yiji_average"},
        is_shenjing:{name:"经期神经质（易紧张、好激动、多愁善感、敏感多疑、容易沮丧）", para_time:"is_shenjing_total_time", para_average:"is_shenjing_average"},
      },
      pain_level: [0,1,2,3,4,5,6,7,8,9,10],
      radio_pain_start_time:["经前","经期","经后"],
      radio_pain_end_time:["经前","经期","经后"],
      radio_pain_total_time:["<3小时","3~7小时","8~24小时",">24小时"],
      radio_menstruation:["量少(每天少于1片卫生巾)","量中等(每天约2-4片卫生巾)","量多(每天约5-10片卫生巾)"],
      radio_blood_color:["淡红","鲜红","暗红","紫红","紫黯","紫黑","褐色"],
      radio_blood_quality_first:["正常","粘稠","清稀"],
      radio_blood_quality_second:["无血块","偶有血块","经常出现血块"],
      radio_blood_quality_third:["小血块","大血块","夹有膜样物"],
      radio_total_time:["<3小时","3~7小时","8~24小时",">24小时"],
      radio_average:["轻度","中度","较显著","剧烈"],
      pain_character: {'pain_character_leng':'冷痛','pain_character_zhui':'坠痛','pain_character_zhang':'胀痛','pain_character_ci':'刺痛','pain_character_jiao':'绞痛','pain_character_che':'掣痛','pain_character_kong':'空痛','pain_character_zhuo':'灼痛','pain_character_yin':'隐痛'},
      pain_hobby: {'hobby_xian':'喜按','hobby_juan':'拒按','hobby_xiwen':'喜温','hobby_buxiwen':'不喜温','hobby_dewenjian':'得温痛减','hobby_dewenbu':'得温痛不减','hobby_kuaijian':'块下痛减','hobby_kuaibu':'块下痛不减'},
      texture_choise:['淡红','淡白','红','紫暗有瘀点或瘀斑'],
      tongue_coating: {'coating_bai':'白','coating_huang':'黄','coating_bo':'薄','coating_hou':'厚','coating_ni':'腻','coating_run':'润','coating_ganzao':'干燥','coating_shaotai':'少苔','coating_huabo':'花剥','coating_wutai':'无苔'},
      tongue_body:    {tongue_zhengchang:'正常',tongue_shouxiao:'瘦小',tongue_pangda:'胖大',tongue_chihen:'有齿痕',tongue_liewen:'有裂纹'},
      pulse:          {'pulse_fu':'浮','pulse_chen':'沉','pulse_hua':'滑','pulse_shu':'数','pulse_xian':'弦','pulse_xi':'细','pulse_ruo':'弱','pulse_huan':'缓','pulse_chi':'迟','pulse_se':'涩','pulse_jin':'紧'},
      summaryForm:{
      },
      dialogVisible: false,
      exist: true,
      formName:'',
      isOwnedByUser: true,
      check_status:''
    }
  },
  methods: {
    updateSummaryForm () {
      apiUpdatePatientDataForm({formData:this.summaryForm,formName:this.formName})
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
    createSummaryForm () {
      apiCreatePatientDataForm({formData:this.summaryForm,formName:this.formName})
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
      // 清空
      this.summaryForm = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      this.check_status = data.check_status
      this.isOwnedByUser = data.isOwnedByUser
      //如果summaryForm未创建,需要从infoForm取到url;如果summaryForm已创建,summaryForm都会被传入的summaryForm覆盖
      if (!data.exist) {
        //未创建,summaryForm的info接受data.url的值,其余字段初始化为空
        this.summaryForm.info = data.formData.info
      } else {
        //已创建(修改),summaryForm初始化为从api请求得到的数据
        this.summaryForm = data.formData
      }
    })
  }
}
</script>
<style lang="">
</style>
<style>
  .item-label-liudiao {
    color: cornflowerblue;
    font-weight: 600;
  }
</style>
