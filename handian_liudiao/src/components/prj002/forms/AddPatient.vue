<template>
  <el-dialog title="新增患者信息" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="85%" center>

    <el-form ref="patientInfo" :model="patientInfo" :rules="rules" label-width="130px" label-position="left">

      <el-form-item label="患者姓名" prop="patient_name">
        <el-input v-model="patientInfo.patient_name"></el-input>
      </el-form-item>

      <el-form-item label="就诊日期" prop="patient_date">
        <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
        <el-date-picker v-model="patientInfo.patient_date"
                        type="date" placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="医院名称" prop="hospital_name">
        <el-input v-model="patientInfo.hospital_name"></el-input>
      </el-form-item>
      <el-form-item label="医院所属" prop="hospital_belong">
        <el-radio v-model="patientInfo.hospital_belong" label="省级医院"></el-radio>
        <el-radio v-model="patientInfo.hospital_belong" label="市级医院"></el-radio>
        <el-radio v-model="patientInfo.hospital_belong" label="区/县级医院"></el-radio>
      </el-form-item>

      <el-form-item label="患者电话" prop="patient_phone">
        <el-input v-model="patientInfo.patient_phone"></el-input>
      </el-form-item>

      <el-form-item label="填表专家姓名" prop="expert_name">
        <el-input v-model="patientInfo.expert_name"></el-input>
      </el-form-item>
      <el-form-item label="填表专家单位" prop="expert_hospital">
        <el-input v-model="patientInfo.expert_hospital"></el-input>
      </el-form-item>
      <el-form-item label="填表专家电话" prop="expert_phone">
        <el-input v-model="patientInfo.expert_phone"></el-input>
      </el-form-item>
      <el-form-item label="填表专家邮箱" prop="expert_email">
        <el-input v-model="patientInfo.expert_email"></el-input>
      </el-form-item>
      <el-form-item label="填表专家职称" prop="title">
        <el-select v-model="patientInfo.title" placeholder="请选择">
          <el-option label="主任医师" value="主任医师"></el-option>
          <el-option label="副主任医师" value="副主任医师"></el-option>
          <el-option label="主治医师" value="主治医师"></el-option>
        </el-select>
      </el-form-item>

    </el-form>
      <span slot="footer">
        <el-button type="primary" @click="addPatient">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </span>
  </el-dialog>
</template>

<script>
import { apiAddPatient } from '@/api/api-prj002'
export default {
    name:'AddPatient',
    data () {
      return {
        patientInfo:{
          'patient_name':'',      //真多
          'patient_date':'',      //2000-01-01
          'hospital_name':'',     //汉典
          'hospital_belong':'',   //省级医院
          'patient_phone':'',     //12312312311
          'expert_name':'',
          'expert_hospital':'',
          'expert_phone':'',
          'expert_email':'',
          'expert_title':'',
        },
        dialogVisible: false,
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
        }
      }

    },
    methods: {
      addPatient () {
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
        this.patientInfo = {}
        this.dialogVisible = true;
      });
    }
}

</script>

<style lang="scss" scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width:190px
}
</style>
