<template>
    <el-form ref="infoForm" :model="infoForm" :rules="rules"
            label-width="110px" label-position="left" class="mobile mobile-info">
      <el-form-item label="就诊日期">
        <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
        <el-date-picker v-model="infoForm.recdate"
                        type="date" placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
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

      <el-form-item label="医院名称" prop="hospital">
        <el-input v-model="infoForm.hospital"></el-input>
      </el-form-item>
      <el-form-item label="填表专家姓名" prop="expert">
        <el-input v-model="infoForm.expert"></el-input>
      </el-form-item>
      <el-form-item label="职称" prop="title">
        <el-select v-model="infoForm.title" placeholder="请选择">
          <el-option v-for="item in titleSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="患者姓名" prop="name">
        <el-input v-model="infoForm.name"></el-input>
      </el-form-item>
      <el-form-item label="电话(手机)" prop="telephone">
        <el-input v-model="infoForm.telephone"></el-input>
      </el-form-item>
      <el-form-item label="患者现住址" prop="address">
        <el-input v-model="infoForm.address"></el-input>
      </el-form-item>
      <el-form-item label="患者来源" prop="entrance">
        <el-select v-model="infoForm.entrance" placeholder="请选择">
          <el-option v-for="item in entranceSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="患者出生年月" prop="birth">
        <el-date-picker v-model="infoForm.birth"
                        type="month" placeholder="选择日期"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="身高" prop="height">
        <el-input v-model="infoForm.height" type="number" min="0" max="999">
            <template slot="append">cm</template>
        </el-input>
      </el-form-item>
      <el-form-item label="体重" prop="weight">
        <el-input v-model="infoForm.weight" type="number" min="0" max="999">
          <template slot="append">kg</template>
        </el-input>
      </el-form-item>

      <el-form-item label="民族" prop="nation">
        <el-select v-model="infoForm.nation" placeholder="请选择">
          <el-option v-for="item in nationSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="职业" prop="career">
        <el-select v-model="infoForm.career" placeholder="请选择">
          <el-option v-for="item in careerSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文化程度" prop="culture">
        <el-select v-model="infoForm.culture" placeholder="请选择">
          <el-option v-for="item in cultureSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="特殊工作环境">
        <!-- <el-checkbox v-for="(val, key) in specialCheckbox" :key="key" :label="val" v-model="infoForm[key]"> -->
        <el-checkbox v-for="(val, key) in specialCheckbox" :key="key" :label="val" v-model="infoForm[key]">
        </el-checkbox>
      </el-form-item>

      <el-form-item label="饮食偏好">
        <el-checkbox v-for="(val, key) in dietCheckbox" :key="key" :label="val" v-model="infoForm[key]">
        </el-checkbox>
        <el-input v-model="infoForm.qita" placeholder="其他"></el-input>
      </el-form-item>
    </el-form>
</template>
<script>
import {apiMobileArea,apiMobileHospital,apiMobileOwner} from '@/api/api-prj001'
export default {
  name: "MobileInfoForm",
  data() {
    var birthAlert = (rule, value, callback) => {
      var selectYear = Number(this.infoForm.birth.split('-')[0]);
      var thisYear = new Date().getFullYear();
      if (selectYear >= thisYear) {
        return callback(new Error('您选择的出生日期超出了范围'))
      }
      callback();
    };
    return {
      // infoForm: {
      //   "recdate": "",
      //   "owner":"",
      //   "hospital":"汉典医院",
      //   "expert":"专家",
      //   "title":"主任医师",
      //   "name":"患者姓名",
      //   "telephone":"13112345678",
      //   "address":"北京",
      //   "entrance":"门诊",
      //   "birth_year":"",
      //   "birth_month":"",
      //   "birth":"",
      //   "height":"171",
      //   "weight":"55",
      //   "nation":"汉族",
      //   "career":"个体",
      //   "culture":"初中"
      //   },
      loading: true,
      infoForm: {
        "recdate": "",
        "owner":"",
        "hospital":"",
        "expert":"",
        "title":"",
        "name":"",
        "telephone":"",
        "address":"",
        "entrance":"",
        "birth_year":"",
        "birth_month":"",
        "birth":"",
        "height":"",
        "weight":"",
        "nation":"",
        "career":"",
        "culture":""
        },
      entranceSelection:["门诊","病房"],
      titleSelection: ["主任医师","副主任医师","主治医师"],
      nationSelection: ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族",
                        "瑶族","白族","土家族","哈尼族","哈萨克族","傣族","黎族","傈傈族","佤族","畲族","高山族","拉祜族",
                        "水族","东乡族","纳西族","景颇族","科尔克孜族","土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族",
                        "毛难族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族","乌孜别克族","俄罗斯族","鄂温克族",
                        "崩龙族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族","其它"],
      careerSelection: ["学生","个体","农民","军人","工人","财会人员","技术人员","服务业","科教文卫","行政管理","无业","其它"],
      cultureSelection: ["未接受国家教育","小学及以下","初中","高中/中专","大专","本科","研究生及以上"],
      specialCheckbox: {"gaowen":"高温","diwen":"低温","yeban":"夜班","zaosheng":"噪声","fushe":"辐射","huagongyinran":"化工污染","julieyundong":"剧烈运动","qiyou":"汽油","gaokong":"高空","wu":"无"},
      dietCheckbox:    {"wuteshu":"无特殊","sushi":"素食","suan":"酸","xian":"咸","xinla":"辛辣","you":"油","shengleng":"生冷","cafei":"含咖啡因食物或饮品"},
      rules:{
          recdate:  [{required: true, message: '一般信息: 请填写就诊日期'}],
          name: [{required: true, message: '一般信息: 请输入姓名', trigger: 'blur' }],
          telephone: [{required: true, pattern: /^1\d{10}$/, message: '一般信息: 请输入11位手机号码',trigger: 'blur'}],
          weight: [{pattern: /^\d{0,3}$/, message: '一般信息: 请填写整数。体重数值不是合理值',trigger: 'blur'}],
          height: [{pattern: /^\d{0,3}$/, message: '一般信息: 请填写整数。身高数值不是合理值',trigger: 'blur'}],
          hospital:[{required: true, message: '一般信息: 请填写就诊医院名称'}],
          career:  [{required: true, message: '一般信息: 请填写职业'}],
          address:  [{required: true, message: '一般信息: 请填写住址'}],
          entrance:  [{required: true, message: '一般信息: 请填写就诊机构'}],
          nation:  [{required: true, message: '一般信息: 请填写民族'}],
          culture:  [{required: true, message: '一般信息: 请填写最高学历'}],
          birth:  [{required: true, message: '请填写出生年月'},
                    {validator:birthAlert,trigger: 'blur' }],
          title:  [{required: true, message: '一般信息: 请填写专家职称'}],
          expert:  [{required: true, message: '一般信息: 请填写专家姓名'}],
          owner:  [{required: true, message: '一般信息: 请填写辅助医生信息'}],
        },
      area_options:[],
      hospital_options:[],
      owner_options:[]
    }

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
<style lang="scss">
.mobile-info {
  .el-form-item__label {
    line-height:55px;
  }

  .el-input__prefix {
    left: 8px
  }
}

</style>
