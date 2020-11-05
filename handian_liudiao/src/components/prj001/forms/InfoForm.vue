<template>
  <el-dialog title="一般情况" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="90%" center>
    <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="auto" label-position="left">
      <el-alert v-if="is_checked=='审核通过'"
                title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                type="warning" :closable="false" show-icon>
      </el-alert>
      <el-divider v-if="is_checked=='审核通过'"></el-divider>

      <el-form-item label="就诊日期" prop="recdate">
        <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
        <el-date-picker v-model="infoForm.recdate"
                        type="date" placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="问卷编码">
        <el-input v-model="infoForm.serial" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="辅助医生邮箱">
        <el-input v-model="infoForm.owner"></el-input>
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
      <el-form-item label="身高">
        <el-input v-model="infoForm.height" type="number" min="0">
            <template slot="append">cm</template>
        </el-input>
      </el-form-item>
      <el-form-item label="体重">
        <el-input v-model="infoForm.weight" type="number" min="0">
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

      <el-form-item label="文化程度">
        <el-select v-model="infoForm.culture" prop="culture" placeholder="请选择">
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
    <span slot="footer">
        <el-button type="primary" :disabled="is_checked=='审核通过'" @click="updateInfoForm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from '@/api/api-prj001'
export default {
  name: "InfoForm",
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
      dialogVisible: false,
      infoForm: {},
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
      exist: true,
      formName:'',
      is_checked:'',

      rules:{
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          telephone: [
            {required: true, pattern: /^1\d{10}$/, message: '请输入11位手机号码',trigger: 'blur'}
          ],
          hospital:[{required: true, message: '请填写就诊医院名称'}],
          career:  [{required: true, message: '请填写职业'}],
          address:  [{required: true, message: '请填写住址'}],
          entrance:  [{required: true, message: '请填写就诊机构'}],
          nation:  [{required: true, message: '请填写民族'}],
          culture:  [{required: true, message: '请填写最高学历'}],
          birth:  [{required: true, message: '请填写出生年月'},
                    {validator:birthAlert,trigger: 'blur' }],
          title:  [{required: true, message: '请填写专家职称'}],
          expert:  [{required: true, message: '请填写专家姓名'}],
        }
    }
  },
  computed:{
  },
  methods: {
    updateInfoForm () {
      /* 遗留问题,要把出生年月拆分成两个字段 */
      const str = this.infoForm.birth
      const year_month = str.split("-")
      this.infoForm.birth_year = year_month[0]
      this.infoForm.birth_month = year_month[1]
      /* **************************** */
      this.$refs.infoForm.validate( (valid) => {
        if (valid) {
          apiUpdatePatientDataForm({formData:this.infoForm,formName:this.formName})
            .then((res)=> {
              // this.resetDialog()
              this.$message({message: '提交成功',type: 'success'})
              this.dialogVisible = false
              this.$parent.searchPatient()
              // this.$parent.getPatients()
            }).catch()
        } else {
          this.$message({message: '请填写完整信息',type: 'warning'})
          return false
        }
      } )

    },

  },
  created() {
      this.$on("openEvent", (data)=>{
        // console.log('一般情况获取到的数据',data)
        this.dialogVisible = true
        this.exist = data.exist
        this.is_checked = data.is_checked
        this.formName = data.formName
        this.infoForm = data.formData
      });
  },

};
</script>
