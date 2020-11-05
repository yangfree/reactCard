<template>
  <el-dialog title="一般情况" class="my-dialog prj005-dialog" :rules="rules"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="90%" center>
    <el-form ref="infoForm" :model="infoForm" label-width="90px" label-position="right">
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

      <h4>病人现住址</h4>
        <el-input v-model="infoForm.address" placeholder="请按照 省、市、区/县、村 填写"></el-input>

      <h4>病人来源</h4>
        <el-radio v-model="infoForm.patient_source"
                  v-for="item in patient_source"
                  :key="item" :label="item">
        </el-radio>
      <h4>出生日期</h4>
        <el-date-picker v-model="infoForm.patient_birth"
                type="month" placeholder="选择日期"
                format="yyyy 年 MM 月"
                value-format="yyyy-MM">
        </el-date-picker>
      <h4>身高</h4>
        <el-input v-model="infoForm.patient_height" placeholder="身高">
          <span slot="append">cm</span>
        </el-input>
      <h4>体重</h4>
        <el-input v-model="infoForm.patient_weight" placeholder="体重">
          <span slot="append">kg</span>
        </el-input>
      <h4>民族</h4>
        <el-select v-model="infoForm.nation" placeholder="请选择">
          <el-option v-for="item in nationSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      <h4>职业</h4>
        <el-select v-model="infoForm.patient_career" placeholder="请选择">
          <el-option v-for="item in careerSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
        <p><el-input v-if="infoForm.patient_career=='其它'" v-model="infoForm.patient_career_qita" placeholder="其它职业"></el-input></p>
      <h4>文化程度</h4>
        <el-select v-model="infoForm.patient_culture" prop="culture" placeholder="请选择">
          <el-option v-for="item in cultureSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      <h4>配偶的受教育程度</h4>
        <el-select v-model="infoForm.patient_lover" prop="culture" placeholder="请选择">
          <el-option v-for="item in cultureSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      <h4>特殊接触环境</h4>
        <el-checkbox v-for="(val, key) in specialCheckbox" :key="key"
                      v-model="infoForm[key]" :label="val">
        </el-checkbox>
        <el-input v-model="infoForm.special_qita" placeholder="其他"></el-input>
      <h4>生活工作方式</h4>
        <el-checkbox v-for="(val, key) in workstyle" :key="key"
                      v-model="infoForm[key]" :label="val">
        </el-checkbox>
        <el-input v-model="infoForm.patient_workstyle_ao_times" placeholder="熬夜-次/周"></el-input>
      <h4>饮食偏好</h4>
        <el-checkbox v-for="(val, key) in dietCheckbox" :key="key"
                      v-model="infoForm[key]" :label="val">
        </el-checkbox>
        <el-input v-model="infoForm.eat_qita" placeholder="其他"></el-input>
      <h4>特殊嗜好</h4>
        <el-checkbox v-model="infoForm.hobby_wu" label="无特殊"></el-checkbox>
        <el-checkbox v-model="infoForm.hobby_xi" label="吸烟"></el-checkbox>
        <span v-show="infoForm.hobby_xi == true"><el-input v-model="infoForm.hobby_xi_num" style="width:50px;"></el-input>支/日</span>
        <el-checkbox v-model="infoForm.hobby_yin" label="饮酒"></el-checkbox>
        <span v-show="infoForm.hobby_yin == true"><el-input v-model="infoForm.hobby_yin_num" style="width:50px;"></el-input>ml/日</span>
        <el-checkbox v-model="infoForm.hobby_cha" label="饮茶"></el-checkbox>
        <el-checkbox v-model="infoForm.hobby_kafei" label="咖啡"></el-checkbox>
        <el-input v-model="infoForm.hobby_qita" placeholder="其他"></el-input>
      <h4>传染病史</h4>
        <el-switch v-model="infoForm.is_infection" active-text="有" inactive-text="无"></el-switch>
        <!-- <el-checkbox v-model="infoForm.is_infection">有</el-checkbox> -->
        <p v-show="infoForm.is_infection">
          <el-checkbox v-for="(val, key) in infection" :key="key"
                        v-model="infoForm[key]" :label="val">
          </el-checkbox>
          <el-input v-model="infoForm.infection_qita" placeholder="其他"></el-input>
        </p>
      <h4>其他病史</h4>
        <el-checkbox v-for="(val, key) in other" :key="key"
                      v-model="infoForm[key]" :label="val">
        </el-checkbox>
        <el-input v-model="infoForm.other_qita" placeholder="其他"></el-input>
      <h4>月经史</h4>
        <p>①初潮年龄：
          <el-input v-model="infoForm.first_time" style="width:50px;"></el-input>岁
        </p>
        <p>②月经周期：
          <el-radio v-model="infoForm.rule_normal" label="尚规律" style="width:50px;"></el-radio>
          <el-radio v-model="infoForm.rule_normal" label="不规律" style="width:50px;"></el-radio>
        </p>
        <p>③行经天数
          <el-input v-model="infoForm.duration_days" style="width:50px;"></el-input>天
        </p>
        <p>④月经量：
          <el-radio v-model="infoForm.blood_quantity" label="正常" style="width:50px;"></el-radio>
          <el-radio v-model="infoForm.blood_quantity" label="量多" style="width:50px;"></el-radio>
          <el-radio v-model="infoForm.blood_quantity" label="量少" style="width:50px;"></el-radio>
        </p>
        <p>⑤经血颜色：
          <el-radio v-model="infoForm.blood_color" label="正常" style="width:50px;"></el-radio>
          <el-radio v-model="infoForm.blood_color" label="异常" style="width:50px;"></el-radio>
        </p>
          <el-input v-if="infoForm.blood_color=='异常'" v-model="infoForm.blood_color_abnormal" style="width:200px;"></el-input>
        <p>⑥经血质地：
          <el-radio v-model="infoForm.blood_quality" label="正常" style="width:50px;"></el-radio>
          <el-radio v-model="infoForm.blood_quality" label="异常" style="width:50px;"></el-radio>
        </p>
          <el-input v-if="infoForm.blood_quality=='异常'" v-model="infoForm.blood_quality_abnormal" style="width:200px;"></el-input>
        <p>⑦经期伴随症状：</p>
          <p v-for="(val, key) in accompany" :key="val">
            {{val}}：
            <el-switch v-model="infoForm[key]" active-text="有" inactive-text="无"></el-switch>
            <span v-show="infoForm[key]">
              (
              <el-radio v-model="infoForm[key + '_exist']" label="偶尔"></el-radio>
              <el-radio v-model="infoForm[key + '_exist']" label="有时"></el-radio>
              <el-radio v-model="infoForm[key + '_exist']" label="经常"></el-radio>
              )
            </span>
          </p>
          <p>
            经行其他症状：
            <el-input v-model="infoForm.symptom_qita" style="width:100px;"></el-input>
            <span>
              (
              <el-radio v-model="infoForm.symptom_qita_exist" label="偶尔"></el-radio>
              <el-radio v-model="infoForm.symptom_qita_exist" label="有时"></el-radio>
              <el-radio v-model="infoForm.symptom_qita_exist" label="经常"></el-radio>
              )
            </span>
          </p>
      <h4>带下史</h4>
        <p>带下量：
          <el-radio v-model="infoForm.leukorrheal_quantity" label="正常" style="width:50px;"></el-radio>
          <el-radio v-model="infoForm.leukorrheal_quantity" label="异常" style="width:50px;"></el-radio>
          <span v-show="infoForm.leukorrheal_quantity == '异常'">
            （
            <el-radio v-model="infoForm.leukorrheal_quantity_more" label="量多" style="width:50px;"></el-radio>
            <el-radio v-model="infoForm.leukorrheal_quantity_more" label="量少" style="width:50px;"></el-radio>
            ）
          </span>
        </p>
        <p>带下颜色：
          <el-radio v-model="infoForm.leukorrheal_color" label="正常" style="width:50px;"></el-radio>
          <el-radio v-model="infoForm.leukorrheal_color" label="异常" style="width:50px;"></el-radio>
          <span v-show="infoForm.leukorrheal_color == '异常'">
            <el-input v-model="infoForm.leukorrheal_color_qita" style="width:150px;" placeholder="请具体描述"></el-input>
          </span>
        </p>
        <p>带下性状：
          <el-radio v-model="infoForm.leukorrheal_feature" label="正常" style="width:50px;"></el-radio>
          <el-radio v-model="infoForm.leukorrheal_feature" label="异常" style="width:50px;"></el-radio>
          <span v-show="infoForm.leukorrheal_feature == '异常'">
            <el-input v-model="infoForm.leukorrheal_feature_qita" style="width:150px;" placeholder="请具体描述"></el-input>
          </span>
        </p>
        <p>带下气味：
          <el-radio v-model="infoForm.leukorrheal_smell" label="正常" style="width:50px;"></el-radio>
          <el-radio v-model="infoForm.leukorrheal_smell" label="异常" style="width:50px;"></el-radio>
          <span v-show="infoForm.leukorrheal_smell == '异常'">
            <el-input v-model="infoForm.leukorrheal_smell_qita" style="width:150px;" placeholder="请具体描述"></el-input>
          </span>
        </p>
      <h4>婚姻状况</h4>
        1、
        <el-radio v-model="infoForm.marriage" label="未婚"></el-radio>
        <el-radio v-model="infoForm.marriage" label="已婚"></el-radio>
        <el-radio v-model="infoForm.marriage" label="离异"></el-radio>
        <el-radio v-model="infoForm.marriage" label="丧偶"></el-radio>
        <el-radio v-model="infoForm.marriage" label="再婚"></el-radio>
        <el-input v-model="infoForm.marriage_qita" style="width:150px;" placeholder="其他"></el-input>
        <p></p>
        2、初婚年龄（已婚填写）
        <el-input v-model="infoForm.first_marriage	" style="width:150px;"></el-input>

      <h4>孕产史</h4>
        <div>
          <p>
            孕<el-input v-model="infoForm.pregnancy_times" style="width:50px;"></el-input>次、
            顺产<el-input v-model="infoForm.pregnancy_shun" style="width:50px;"></el-input>次、
            剖宫产<el-input v-model="infoForm.pregnancy_pou" style="width:50px;"></el-input>次;
          </p>
            药物流产<el-input v-model="infoForm.pregnancy_yao" style="width:50px;"></el-input>次、
            人工流产<el-input v-model="infoForm.pregnancy_ren" style="width:50px;"></el-input>次、
            自然流产<el-input v-model="infoForm.pregnancy_zi" style="width:50px;"></el-input>次、
            异位妊娠<el-input v-model="infoForm.yunchan_history_yi" style="width:50px;"></el-input>次、
            清宫术<el-input v-model="infoForm.pregnancy_qing" style="width:50px;"></el-input>次、
          <el-input v-model="infoForm.pregnancy_qita" placeholder="其他"></el-input>
          <p class="prj005-info">
            不孕症者，未避孕未孕
            <el-input v-model="infoForm.pregnancy_nerver" style="width:250px;">
              <el-select v-model="infoForm.pregnancy_nerver_unit" slot="append">
                <el-option label="年" value="年"></el-option>
                <el-option label="月" value="月"></el-option>
              </el-select>
            </el-input>
          </p>
        </div>
      <h4>家族史</h4>
        <p>遗传病：
        <el-switch v-model="infoForm.is_history_disease" active-text="有" inactive-text="无"></el-switch>
        </p>
        <el-input v-if="infoForm.is_history_disease" v-model="infoForm.is_history_disease_qita" style="width:250px;"></el-input>

    </el-form>
    <span slot="footer">
        <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from '@/api/api-prj005'
export default {
  name: "InfoForm",
  data() {
    return {
      dialogVisible: false,
      infoForm: {},
      'patient_source':['门诊', '病房'],
      "nationSelection": ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族",
                        "瑶族","白族","土家族","哈尼族","哈萨克族","傣族","黎族","傈傈族","佤族","畲族","高山族","拉祜族",
                        "水族","东乡族","纳西族","景颇族","科尔克孜族","土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族",
                        "毛难族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族","乌孜别克族","俄罗斯族","鄂温克族",
                        "崩龙族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族","其它"],
      "careerSelection": ["学生","专业技术人员","机关、企业、单位负责人","农、林、牧、渔生产人员","军人","办事人员和有关人员",
                          "商业和服务业人员","生产运输、设备操作人员","无业","其它"],
      "cultureSelection": ["未接受国家教育","小学及以下","初中","高中/中专 ","大专","本科","研究生及以上"],
      "specialCheckbox":{"special_wu":"无","special_gao":"高温","special_di":"低温","special_chao":"潮湿",
                          "special_zao":"噪声","special_fu":"辐射","special_hua":"化工","special_xie":"鞋帽服装",
                          "special_qi":"汽油","special_kong":"高空","special_zhuang":"装修","special_tang":"烫发染发"},
      "workstyle":{
                  "patient_workstyle_julie":"剧烈运动(体育运动员)",
                  "patient_workstyle_jiuzuo":"久坐(文职人员)",
                  "patient_workstyle_jiuzhan":"久站(服务行业)",
                  "patient_workstyle_ao":"熬夜(零点以后睡觉)",
                  },
      "dietCheckbox":{"eat_wu":"无特殊","eat_suan":"酸","eat_tian":"甜","eat_xian":"咸",
                      "eat_la":"辛辣","eat_you":"油腻","eat_sheng":"生冷","eat_ka":"含咖啡因食物或饮品","eat_su":"素食"},
      "hobby":{"hobby_wu":"无特殊","hobby_xi":"吸烟","hobby_yin":"饮酒"},
      "infection":{"infection_bing":"病毒性肝炎","infection_jie":"结核","infection_lin":"淋病",
                    "infection_mei":"梅毒","infection_ai":"艾滋病"},
      "other":{"other_wu":"无","other_jiliu":"子宫肌瘤","other_yiwei":"子宫内膜异位症","other_xianji":"子宫腺肌病","other_yuxue":"盆腔淤血综合征",
                "other_chuxue":"异常子宫出血","other_kangjin":"甲状腺功能亢进","other_dixia":"甲状腺功能低下",
                "other_hongban":"系统性红斑狼疮","other_yiyu":"焦虑症/抑郁症"},
      "accompany":{"symptom_futong":"经行腹痛","symptom_yinu":"经行烦躁易怒","symptom_toutong":"经行头痛",
                    "symptom_suantong":"经行腰骶部胀痛或酸痛","symptom_zhangtong":"经行乳房胀痛",
                    "symptom_exin":"经行恶心呕吐","symptom_xiexie":"经行泄泻"},

      rules:{
          patient_name: [
            {required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          patient_date: [
            {required: true, message: '请输入就诊日期', trigger: 'blur' }
          ],
          hospital_name:[
            {required: true, message: '请填写就诊医院名称'}
          ],
          hospital_belong:  [
            {required: true, message: '请填写就诊医院所属级别'}
          ],
          patient_phone: [
            {required: true, pattern: /^1\d{10}$/, message: '请输入11位手机号码',trigger: 'blur'}
          ]
        },
      exist: true,
      formName:'',
      isOwnedByUser: true,
      check_status:''
    }
  },
  computed:{
  },
  methods: {
    showmsg(message){
      console.log(message)
    },
    updateInfoForm () {
      apiUpdatePatientDataForm({formData:this.infoForm,formName:this.formName})
      .then((res)=> {
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
  },
  created() {
      this.$on("openEvent", (data)=>{
        // console.log('一般情况获取到的数据',data)
        this.dialogVisible = true
        this.exist = data.exist
        this.formName = data.formName
        this.check_status = data.check_status
        this.isOwnedByUser = data.isOwnedByUser
        if (!data.exist) {
          //未创建
          this.infoForm.info = data.formData.info
        } else {
          //已创建(修改)
          this.infoForm = data.formData
        }
      });
    }
};
</script>
<style lang="scss">
.prj005-info {
  .el-input-group__append, .el-input-group__prepend {
    width: 50px;
  }
}
.prj005-dialog {
  h4 {
    color:cornflowerblue;
  }
}
</style>
