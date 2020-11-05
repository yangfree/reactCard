<template>
    <el-form ref="infoForm" :model="infoForm" :rules="rules"
            label-width="110px" label-position="left" class="mobile mobile-info">

      <el-form-item label="患者姓名" prop="patient_name">
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

      <el-form-item label="辅助医生" prop="owner">
        <el-select v-model="infoForm.area"
                  @change="getHospital"
                  :loading="loading"
                  placeholder="请选择地区">
          <template slot="prefix"><i class="fa fa-globe" aria-hidden="true"></i></template>
          <el-option v-for="item in area_options" :key="item" :value="item">
          </el-option>
        </el-select>
        <el-select v-model="infoForm.hospital2"
                  @change="getOwner"
                  :loading="loading"
                  placeholder="请选择医院">
          <template slot="prefix"><i class="fa fa-hospital-o" aria-hidden="true"></i></template>
          <el-option v-for="item in hospital_options" :key="item" :value="item">
          </el-option>
        </el-select>
        <el-select v-model="infoForm.owner" placeholder="请选择医生">
          <template slot="prefix"><i class="fa fa-user" aria-hidden="true"></i></template>
          <el-option v-for="item in owner_options" :key="item.id" :value="item.id" :label="item.user_name">
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

      <el-form-item label="填表专家邮箱"  prop="expert_email">
        <el-input v-model="infoForm.expert_email"></el-input>
      </el-form-item>

      <el-form-item label="填表专家职称">
        <el-select v-model="infoForm.expert_title" placeholder="请选择">
          <el-option v-for="item in experttitleSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>

</template>
<script>
import {apiMobileArea,apiMobileHospital,apiMobileOwner} from '@/api/api-prj003'
export default {
  name: "MobileInfoForm",
  data() {
    return {
      loading: true,
      infoForm: {
          owner:""
        },
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
          patient_date:  [{required: true, message: '一般信息: 请填写就诊日期'}],
          patient_name: [{required: true, message: '一般信息: 请输入姓名', trigger: 'blur' }],
          patient_phone: [{required: true, pattern: /^1\d{10}$/, message: '一般信息: 请输入11位手机号码',trigger: 'blur'}],
          patient_weight: [{pattern: /^\d{0,3}$/, message: '一般信息: 请填写整数。体重数值不是合理值',trigger: 'blur'}],
          patient_height: [{pattern: /^\d{0,3}$/, message: '一般信息: 请填写整数。身高数值不是合理值',trigger: 'blur'}],
          hospital_name:[{required: true, message: '一般信息: 请填写就诊医院名称'}],
          hospital_belong:[{required: true, message: '一般信息: 请填写就诊医院所属'}],
          owner:[{required: true, message: '一般信息: 辅助医生'}],
          expert_phone: [{pattern: /^1\d{10}$/, message: '一般信息: 请输入11位手机号码',trigger: 'blur'}],
          expert_email: [
            {type: 'email', message: '请输入正确的邮箱地址',trigger: ['blur','change']}
          ],
        },
      area_options:[],
      hospital_options:[],
      owner_options:[]
    }
  },
  computed:{

  },
  mounted () {
    /* 注释块 用来测试，加延时 */
    // var that  = this
    // that.loading = true
    // apiMobileArea()
    //   .then( (res) => {
    //     const area_data = res.data.area_data
    //     console.log('wait for 10 seconds . . . . ');
    //     return new Promise(function(resolve, reject) {
    //         setTimeout(() => {
    //             for(var i = 0, len = area_data.length; i < len; i++){that.area_options.push(area_data[i].area)}
    //             that.loading = false
    //             console.log('10 seconds Timer expired!!!');
    //             resolve();
    //         }, 3000)
    //     });
    //   }).catch()
    this.loading = true
    apiMobileArea()
      .then( (res) => {
        const area_data = res.data.area_data
        for(var i = 0, len = area_data.length; i < len; i++){this.area_options.push(area_data[i].area)}
        this.loading = false
      }).catch()
  },
  methods: {
    getHospital (area) {
      this.loading = true
      this.owner_options = []
      this.hospital_options = []
      this.infoForm.owner = ''
      this.infoForm.hospital2 = ''
      apiMobileHospital({area:area})
      .then( (res) => {
        const hospital_data = res.data.hospital_data
        // console.log("返回医院数据",hospital_data)
        for(var i = 0, len = hospital_data.length; i < len; i++){
          this.hospital_options.push(hospital_data[i].hospital)
        }
        this.loading = false

      }).catch()
    },
    getOwner (hospital) {
      this.loading = true
      this.owner_options = []
      this.infoForm.owner = ''
      apiMobileOwner({hospital:hospital})
      .then( (res) => {
        const owner_data = res.data.owner_data
        // console.log("返回医院数据console.log("返回医生数据",owner_data)
        for(var i = 0, len = owner_data.length; i < len; i++){
          this.owner_options.push(owner_data[i])
        }
        this.loading = false
      }).catch()
    }
  }
};
</script>
