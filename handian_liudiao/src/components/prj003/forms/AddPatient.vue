<template>
  <el-dialog title="新增患者信息" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="85%" center>

    <el-form ref="patientInfo" :model="patientInfo" :rules="rules" label-width="100px" label-position="left">

      <el-form-item label="姓名" prop="patient_name">
        <el-input v-model="patientInfo.patient_name"></el-input>
      </el-form-item>

      <el-form-item label="手机号码" prop="patient_phone">
        <el-input v-model="patientInfo.patient_phone"></el-input>
      </el-form-item>

      <el-form-item label="就诊医院" prop="hospital_name">
        <el-input v-model="patientInfo.hospital_name"></el-input>
      </el-form-item>

      <el-form-item label="医院所属" prop="hospital_belong">
        <el-select v-model="patientInfo.hospital_belong" placeholder="请选择">
          <el-option v-for="item in hospital_belongSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="就诊日期" prop="patient_date">
        <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
        <el-date-picker v-model="patientInfo.patient_date"
                        type="date" placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

    </el-form>
      <span slot="footer">
        <el-button type="primary" @click="addPatient">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </span>
  </el-dialog>
</template>

<script>
import { apiAddPatient } from '@/api/api-prj003'
export default {
    name:'AddPatient',
    data () {
      return {
        hospital_belongSelection: ["省级医院","市级医院","区/县级医院"],
        patientInfo: {},
        // patientInfo: {name:'', phone:'', hospital:'', birth:'', career:''},

        dialogVisible: false,
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

    // // 新增
    // addSubmit: function () {
    //   this.$refs.addForm.validate((valid) => {
    //     if (valid) {
    //       this.$confirm('确认提交吗？', '提示', {}).then(() => {
    //         this.addLoading = true
    //         // NProgress.start();
    //         let para = Object.assign({}, this.addForm)
    //         para.birth = (!para.birth || para.birth === '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
    //         addUser(para).then((res) => {
    //           this.addLoading = false
    //           // NProgress.done();
    //           this.$message({
    //             message: '提交成功',
    //             type: 'success'
    //           })
    //           this.$refs['addForm'].resetFields()
    //           this.addFormVisible = false
    //           this.getPatients()
    //         })
    //       })
    //     }
    //   })
    // },
</script>

<style lang="scss" scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width:200px
}
</style>
