<template>
  <el-dialog title="新增患者信息" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="90%" center>

    <el-form ref="patientInfo" :model="patientInfo" :rules="rules" label-width="130px" label-position="left">

      <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
      <el-form-item label="就诊日期"  prop="recdate">
        <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
        <el-date-picker v-model="patientInfo.recdate"
                        type="date" placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="医院名称" prop="hospital">
        <el-input v-model="patientInfo.hospital"></el-input>
      </el-form-item>
      <el-form-item label="填表专家姓名" prop="expert">
        <el-input v-model="patientInfo.expert"></el-input>
      </el-form-item>
      <el-form-item label="职称" prop="title">
        <el-select v-model="patientInfo.title" placeholder="请选择">
          <el-option v-for="item in mydata.titleSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="患者姓名" prop="name">
        <el-input v-model="patientInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="电话(手机)" prop="telephone">
        <el-input v-model="patientInfo.telephone"></el-input>
      </el-form-item>
      <el-form-item label="患者现住址" prop="address">
        <el-input v-model="patientInfo.address"></el-input>
      </el-form-item>
      <el-form-item label="患者来源" prop="entrance">
        <el-select v-model="patientInfo.entrance" placeholder="请选择">
          <el-option v-for="item in mydata.entranceSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="患者出生年月" prop="birth">
        <el-date-picker v-model="patientInfo.birth"
                        type="month" placeholder="选择日期"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="身高">
        <el-input v-model="patientInfo.height" type="number" min="0">
            <template slot="append">cm</template>
        </el-input>
      </el-form-item>

      <el-form-item label="体重">
        <el-input v-model="patientInfo.weight" type="number" min="0">
          <template slot="append">kg</template>
        </el-input>
      </el-form-item>

      <el-form-item label="民族" prop="nation">
        <el-select v-model="patientInfo.nation" placeholder="请选择">
          <el-option v-for="item in mydata.nationSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="职业" prop="career">
        <el-select v-model="patientInfo.career" placeholder="请选择">
          <el-option v-for="item in mydata.careerSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文化程度" prop="culture">
        <el-select v-model="patientInfo.culture" placeholder="请选择">
          <el-option v-for="item in mydata.cultureSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="特殊工作环境">
        <el-checkbox v-for="(val, key) in mydata.specialCheckbox" :key="key" :label="val" v-model="patientInfo[key]">
        </el-checkbox>
      </el-form-item>

      <el-form-item label="饮食偏好">
        <el-checkbox v-for="(val, key) in mydata.dietCheckbox" :key="key" :label="val" v-model="patientInfo[key]">
        </el-checkbox>
        <el-input v-model="patientInfo.qita" placeholder="其他"></el-input>
      </el-form-item>

    </el-form>
      <span slot="footer">
        <el-button type="primary" @click="addPatient">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </span>
  </el-dialog>
</template>

<script>
import { apiAddPatient } from '@/api/api-prj001'
export default {
    name:'AddPatient',
    data () {
      var birthAlert = (rule, value, callback) => {
        var selectYear = Number(this.patientInfo.birth.split('-')[0]);
        var thisYear = new Date().getFullYear();
        if (selectYear >= thisYear) {
          return callback(new Error('您选择的出生日期超出了范围'))
        }
        callback();
      };
      return {
        mydata:{
            entranceSelection:["门诊","病房"],
            titleSelection: ["主任医师","副主任医师","主治医师"],
            nationSelection: ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族",
                        "瑶族","白族","土家族","哈尼族","哈萨克族","傣族","黎族","傈傈族","佤族","畲族","高山族","拉祜族",
                        "水族","东乡族","纳西族","景颇族","科尔克孜族","土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族",
                        "毛难族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族","乌孜别克族","俄罗斯族","鄂温克族",
                        "崩龙族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族","其它"],
            careerSelection: ["学生","个体","农民","军人","工人","财会人员","技术人员","服务业","科教文卫","行政管理","无业","其它"],
            cultureSelection: ["未接受国家教育(文盲)","小学及以下","初中","高中/中专","大专","本科","研究生及以上"],
            specialCheckbox: {"gaowen":"高温","diwen":"低温","yeban":"夜班","zaosheng":"噪声","fushe":"辐射","huagongyinran":"化工污染","julieyundong":"剧烈运动","qiyou":"汽油","gaokong":"高空","wu":"无"},
            dietCheckbox:    {"wuteshu":"无特殊","sushi":"素食","suan":"酸","xian":"咸","xinla":"辛辣","you":"油","shengleng":"生冷","cafei":"含咖啡因食物或饮品"},
        },
        dialogVisible: false,
        // patientInfo: {
        //     'owner':'',
        //     'hospital':'汉典医院',
        //     'expert':'专家',
        //     'title':'主任医师',
        //     'name':'测试用',
        //     'telephone':'13519871654',
        //     'address':'上海浦东',
        //     'entrance':'门诊',
        //     'nation':'汉族',
        //     'career':'学生',
        //     'culture':'大专',
        //     'birth_year':'',
        //     'birth_month':'',
        //     'birth': '2000-01'
        // },
        patientInfo: {
            'recdate':'',
            'owner':'',
            'hospital':'',
            'expert':'',
            'title':'',
            'name':'',
            'telephone':'',
            'address':'',
            'entrance':'',
            'nation':'',
            'career':'',
            'culture':'',
            'birth_year':'',
            'birth_month':'',
            'birth': ''
        },
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
    methods: {
      addPatient () {
        /* 遗留问题,要把出生年月拆分成两个字段 */
        const str = this.patientInfo.birth
        const year_month = str.split("-")
        this.patientInfo.birth_year = year_month[0]
        this.patientInfo.birth_month = year_month[1]
        /* **************************** */
        this.$refs.patientInfo.validate( (valid) => {
          if (valid) {
            let para = {
              patientInfo: this.patientInfo
            }
            apiAddPatient(para)
            .then( (res)=> {
                if (res.data.statusCode == 201) {
                  this.$message({message: '提交成功',type: 'success'})
                  this.dialogVisible = false
                  this.$parent.getPatients()
                } else {
                  this.$message({message: '您没有添加数据的权限',type: 'error'})
                  this.dialogVisible = false
                  this.$parent.getPatients()
                }
              }
            )
            .catch()
          } else {
            this.$message({message: '请填写完整信息',type: 'warning'})
            return false;
          }
        })

      }
    },
    created() {
      this.$on("addEvent", function(data) {
        this.patientInfo = {
          "gaowen":false,"diwen":false,"yeban":false,"zaosheng":false,"fushe":false,"huagongyinran":false,"julieyundong":false,"qiyou":false,"gaokong":false,"wu":false,
          "wuteshu":false,"sushi":false,"suan":false,"xian":false,"xinla":false,"you":false,"shengleng":false,"cafei":false,
        }
        this.dialogVisible = true;
      });
    }
}

</script>

<style lang="scss" scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width:180px
}
</style>
