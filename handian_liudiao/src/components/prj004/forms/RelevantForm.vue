<template>
  <el-dialog title="相关检查" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="relevantForm" :model="relevantForm" label-width="150px" label-position="left">
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

      <el-form-item label="体格检查" >
        <el-checkbox label="无" v-model="relevantForm.tige_check_wu">
        </el-checkbox>
        <el-checkbox v-show="!relevantForm.tige_check_wu" v-for="(val, key) in tige_check_choises" :key="key" :label="val" v-model="relevantForm[key]">
        </el-checkbox>
      </el-form-item>

      <el-form-item label="辅助检查" >
        <el-checkbox label="无" v-model="relevantForm.fuzhu_wu">
        </el-checkbox>
        <el-checkbox v-show="!relevantForm.fuzhu_wu" v-for="(val, key) in fuzhu_check_choises" :key="key" :label="val" v-model="relevantForm[key]">
        </el-checkbox>
        <el-input v-show="!relevantForm.fuzhu_wu"  v-model="relevantForm.fuzhu_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item v-show="relevantForm.fuzhu_fuqi" label="夫妻双方染色体检查" >
        <el-radio v-show="relevantForm.fuzhu_fuqi" v-model="relevantForm.is_fuzhu_fuqi"
                  @change="changefuqi"
                  v-for="item in fuzhu_fuqi_radio"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-show="is_show_fuqi"  v-model="relevantForm.fuzhu_fuqi_yichang"  placeholder="异常"></el-input>
      </el-form-item>
      <el-form-item v-show="relevantForm.fuzhu_nanfang" label="男方精液检查" >
        <el-radio v-show="relevantForm.fuzhu_nanfang" v-model="relevantForm.is_fuzhu_nanfang"
                  @change="changenanfang"
                  v-for="item in fuzhu_nanfang_radio"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-show="is_show_nanfang"  v-model="relevantForm.fuzhu_nanfang_yichang"  placeholder="异常"></el-input>
      </el-form-item>

    </el-form>

    <span slot="footer">
      <el-button type="primary" :disabled="check_status=='审核通过'" v-if="exist"  @click="updaterelevantForm">确定</el-button>
      <el-button type="primary" v-else  @click="createrelevantForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj004'
export default {
  name:'relevantForm',
  data() {
    return {
      tige_check_choises:{tige_check_fu:"妇科检查",tige_check_quan:"全身检查"},
      fuzhu_check_choises:{fuzhu_chaosheng:"超声检查", fuzhu_baidai:"白带常规", fuzhu_tiwen:"基础体温测定（BBT)", fuzhu_hcg:"尿妊娠试验或血hCG检测", fuzhu_jisu:"性激素六项（FSH、LH、E2、PRL、T、P）", fuzhu_amh:"AMH", fuzhu_guagong:"刮宫或子宫内膜活组织检查", fuzhu_gongqiang:"宫腔镜检查", fuzhu_jiazhuang:"甲状腺功能测定（TSH、FT3、FT4、T3、T4）", fuzhu_danbai:"抗甲状腺球蛋白抗体（anti-Tg）", fuzhu_yanghua:"抗甲状腺炎过氧化物酶抗体（anti-TPO）", fuzhu_kanghe:"抗核抗体", fuzhu_kanglin:"抗磷脂抗体", fuzhu_dna:"抗双链DNA抗体", fuzhu_fengbi:"封闭抗体", fuzhu_xibao:"全血细胞计数", fuzhu_ningxue:"凝血功能检查", fuzhu_erju:"D-二聚体", fuzhu_xuejiang:"血浆同型半胱氨酸", fuzhu_huohua:"活化蛋白C抵抗试验",fuzhu_fuqi:"夫妻双方染色体检查",fuzhu_nanfang:"男方精液检查"},
      fuzhu_fuqi_radio:["不详","正常","异常"],
      fuzhu_nanfang_radio:["不详","正常","异常"],
      is_show_fuqi:false,
      is_show_nanfang:false,
      relevantForm:{
      },

      dialogVisible: false,
      exist: true,
      formName:'',
      isOwnedByUser: true,
      check_status:''
    }
  },
  computed:{
  },
  methods: {
    changefuqi(value){
      if(value == "不详"){
        this.is_show_fuqi=false
      }else if(value == "正常"){
        this.is_show_fuqi=false
      }else if(value == "异常"){
        this.is_show_fuqi=true
      }
    },
    changenanfang(value){
      if(value == "不详"){
        this.is_show_nanfang=false
      }else if(value == "正常"){
        this.is_show_nanfang=false
      }else if(value == "异常"){
        this.is_show_nanfang=true
      }
    },
    updaterelevantForm () {
      apiUpdatePatientDataForm({formData:this.relevantForm,formName:this.formName})
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
    createrelevantForm () {
      apiCreatePatientDataForm({formData:this.relevantForm,formName:this.formName})
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
      this.relevantForm = {}
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
        this.relevantForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.relevantForm = data.formData
      }
    })
  }

};
</script>
<style lang="">
</style>
