<template>
  <el-dialog title="一般情况" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="90%" center>
    <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="140px" label-position="left">
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

      <el-form-item label="患者姓名"  prop="patient_name">
        <el-input v-model="infoForm.patient_name"></el-input>
        <!-- <el-input v-model="infoForm.name"><template slot="prepend">患者姓名</template></el-input> -->
      </el-form-item>

      <el-form-item label="手机号码"  prop="patient_phone">
        <el-input v-model="infoForm.patient_phone"></el-input>
      </el-form-item>

      <el-form-item label="就诊日期"  prop="patient_date">
        <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
        <el-date-picker v-model="infoForm.patient_date"
                        type="date" placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="就诊医院"  prop="hospital_name">
        <el-input v-model="infoForm.hospital_name"></el-input>
      </el-form-item>

      <el-form-item label="医院所属"  prop="hospital_belong">
        <el-select v-model="infoForm.hospital_belong" placeholder="请选择">
          <el-option v-for="item in hospital_belongSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="出生年月" >
        <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
        <el-date-picker v-model="infoForm.patient_birth"
                        type="month" placeholder="选择日期"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="身高">
        <el-input v-model="infoForm.patient_height" type="number" min="0">
            <template slot="append">cm</template>
        </el-input>
      </el-form-item>

      <el-form-item label="体重">
        <el-input v-model="infoForm.patient_weight" type="number" min="0">
          <template slot="append">kg</template>
        </el-input>
      </el-form-item>

      <el-form-item label="民族">
        <el-select v-model="infoForm.nation" placeholder="请选择">
          <el-option v-for="item in nationSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="职业">
        <el-select v-model="infoForm.career" placeholder="请选择">
          <el-option v-for="item in careerSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="特殊工作环境">
        <el-checkbox v-for="(val, key) in specialCheckbox" :key="key" :label="val" v-model="infoForm[key]">
        </el-checkbox>
      </el-form-item>

      <el-form-item label="病人现住址">
        <el-input v-model="infoForm.patient_address"></el-input>
      </el-form-item>

      <el-form-item label="病人来源">
        <el-radio v-for="item in entranceSelection"
                  :key="item" :label="item"
                  v-model="infoForm.entrance">
        </el-radio>
        <el-input v-model="infoForm.entrance_qita" placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="文化程度">
        <el-select v-model="infoForm.culture_level" placeholder="请选择">
          <el-option v-for="item in cultureSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="饮食偏好">
        <el-checkbox  label="无特殊" v-model="infoForm['yinshi_wuteshu']">
        </el-checkbox>
        <el-checkbox v-show="!infoForm['yinshi_wuteshu']" v-for="(val, key) in dietCheckbox" :key="key" :label="val" v-model="infoForm[key]">
        </el-checkbox>
        <el-input v-show="!infoForm['yinshi_wuteshu']" v-model="infoForm.yinshi_qita" placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="填表专家姓名">
        <el-input v-model="infoForm.expert_name"></el-input>
      </el-form-item>

      <el-form-item label="填表专家单位">
        <el-input v-model="infoForm.expert_hospital"></el-input>
      </el-form-item>

      <el-form-item label="填表专家电话" prop="expert_phone">
        <el-input v-model="infoForm.expert_phone"></el-input>
      </el-form-item>

      <el-form-item label="填表专家邮箱" prop="expert_email">
        <el-input v-model="infoForm.expert_email"></el-input>
      </el-form-item>

      <el-form-item label="填表专家职称">
        <el-select v-model="infoForm.expert_title" placeholder="请选择">
          <el-option v-for="item in experttitleSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>
    <span slot="footer">
        <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
    </span>


  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from '@/api/api-prj003'
export default {
  name: "InfoForm",
  data() {
    return {
      dialogVisible: false,
      infoForm: {},
      hospital_belongSelection: ["省级医院","市级医院","区/县级医院"],
      nationSelection: ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族",
                        "瑶族","白族","土家族","哈尼族","哈萨克族","傣族","黎族","傈傈族","佤族","畲族","高山族","拉祜族",
                        "水族","东乡族","纳西族","景颇族","科尔克孜族","土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族",
                        "毛难族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族","乌孜别克族","俄罗斯族","鄂温克族",
                        "崩龙族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族","其它"],
      careerSelection: ["学生","个体","农民","军人","工人","财会人员","技术人员","服务业","科教文卫","行政管理","无业","其它"],
      entranceSelection: ["门诊","学校"],
      cultureSelection:["小学","初中","高中/中专","大专","本科","研究生及以上","未接受国家教育(文盲)"],
      experttitleSelection:["主任医师","副主任医师","主治医师"],
      specialCheckbox: {"environment_gaowen":"高温","environment_diwen":"低温","environment_yeban":"夜班/熬夜","environment_zaosheng":"噪声","environment_fushe":"辐射","environment_huagong":"化工印染","environment_julie":"剧烈运动","environment_qiyou":"汽油","environment_gaokong":"高空","environment_shileng":"湿冷","environment_wu":"无"},
      dietCheckbox:    {"yinshi_sushi":"素食","yinshi_suan":"酸","yinshi_tian":"甜","yinshi_xian":"咸","yinshi_xinla":"辛辣","yinshi_you":"油","yinshi_shengleng":"生冷","yinshi_cafei":"含咖啡因食物或饮品"},
        rules:{
          patient_name: [
            {required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          patient_phone: [
            {required: true, pattern: /^1\d{10}$/, message: '请输入11位手机号码',trigger: 'blur'}
          ],
          hospital_name:[{required: true, message: '请填写就诊医院名称'}],
          hospital_belong:[{required: true, message: '请选择就诊医院所属'}],
          patient_date:   [{required: true, message: '请填写就诊日期'}],
          expert_phone: [
            {pattern: /^1\d{10}$/, message: '请输入11位手机号码',trigger: 'blur'}
          ],
          expert_email: [
            {type: 'email', message: '请输入正确的邮箱地址',trigger: ['blur','change']}
          ],
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
        //this.$parent.getPatients()
        this.$parent.searchPatient()
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
