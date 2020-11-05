<template>
  <el-dialog
    title="婚育史"
    class="my-dialog prj00g-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="120px" label-position="left">
      <!-- 提示信息 -->
      <el-alert
        v-if="check_status=='审核通过'"
        effect="dark"
        title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <el-alert
        v-if="check_status=='已提交'"
        effect="dark"
        title="此条信息已经提交审核,无法更改。如需修改, 请更改审核状态"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <el-alert
        v-if="!isOwnedByUser"
        effect="dark"
        title="此条信息为其他用户创建，您无法修改"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <!-- 表格开始 -->
      <el-form-item label="1.有无性生活史">      
          <el-radio v-model="infoForm.c01" label="1">有性生活</el-radio>
          <el-radio v-model="infoForm.c01" label="2">无性生活 （跳至四、既往史） </el-radio> 
      </el-form-item>
 
      <el-form-item label="2.现是否妊娠？">
        <el-radio v-model="infoForm.c02" label="1">是</el-radio>
        <el-radio v-model="infoForm.c02" label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="3. 是否曾怀孕？">
        <el-radio v-model="infoForm.c03" label="1">是</el-radio>
        <el-radio v-model="infoForm.c03" label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="4.是否生产过？">
        <el-radio v-model="infoForm.c04" label="1">是</el-radio>
        <el-radio v-model="infoForm.c04" label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="5.曾生育几胎">
        <el-radio  v-model="infoForm.c05" label="1">一胎</el-radio>
        <el-radio  v-model="infoForm.c05" label="2">二胎</el-radio>
        <el-radio  v-model="infoForm.c05" label="3">三胎及以上</el-radio>
        <el-radio  v-model="infoForm.c05" label="4">无</el-radio>
      </el-form-item>

       <el-form-item label="6.是否流产过？">              
            <el-radio v-model="infoForm.c0601" label="1">否</el-radio>
            <el-radio v-model="infoForm.c0601" label="2">是 (填写下表)</el-radio>
             <el-row>               
              <el-col :span="6">
                生化妊娠:  <el-input-number v-model="infoForm.c0602"></el-input-number> 次;
              </el-col> 
               <el-col :span="6">
                自然流产:  <el-input-number v-model="infoForm.c0603"></el-input-number> 次;
              </el-col> 
              <el-col :span="6">
                药物流产:  <el-input-number v-model="infoForm.c0604"></el-input-number> 次;
              </el-col>              
            </el-row>
            <el-row>               
              <el-col :span="6">
                人工流产:  <el-input-number v-model="infoForm.c0605"></el-input-number> 次;
              </el-col> 
               <el-col :span="6">
                胎停育:  <el-input-number v-model="infoForm.c0607"></el-input-number> 次;
              </el-col> 
              <el-col :span="6">
                行清宫术:  <el-input-number v-model="infoForm.c0608"></el-input-number> 次;
              </el-col>              
            </el-row>
             <el-row>               
              <el-col :span="6">
                异位妊娠:  <el-input-number v-model="infoForm.c0609"></el-input-number> 次;
              </el-col> 
               <el-col :span="6">
                手术治疗:  <el-input-number v-model="infoForm.c0610"></el-input-number> 次;
              </el-col> 
              <el-col :span="6">
                药物治疗:  <el-input-number v-model="infoForm.c0611"></el-input-number> 次;
              </el-col>              
            </el-row>
        </el-form-item>

        
        <el-form-item label="7.是否使用过促排卵治疗？">          
            <el-radio v-model="infoForm.c07" label="1">是</el-radio>
            <el-radio v-model="infoForm.c07" label="2">否 （跳至四、既往史)</el-radio>
        </el-form-item>

        <el-form-item label="8.采用促排卵治疗是否成功? ">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.c08[0]">未成功</el-checkbox>
          <el-checkbox v-model="infoForm.c08[1]">成功受孕，妊娠中</el-checkbox>
          <el-checkbox v-model="infoForm.c08[2]">已成功生产</el-checkbox>
        </el-form-item>

        <el-form-item label="9.是否进行过辅助生殖？">
            <el-radio v-model="infoForm.c09" label="1">是</el-radio>
            <el-radio v-model="infoForm.c09" label="0">否 （跳至四、既往史）</el-radio>
        </el-form-item>

        <el-form-item label="10.采用过下列哪项助孕方法？">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.c1001[0]">人工授精 </el-checkbox>
          <el-checkbox v-model="infoForm.c1001[1]">试管婴儿</el-checkbox>
          <el-checkbox v-model="infoForm.c1001[2]">其他</el-checkbox>
          <el-input v-model="infoForm.c1002" maxlength="50" show-word-limit placeholder="其他"></el-input>
        </el-form-item>

        <el-form-item label="11.采用辅助生殖的原因？">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.c1101[0]">男方因素</el-checkbox>
          <el-checkbox v-model="infoForm.c1101[1]">输卵管因素</el-checkbox>
          <el-checkbox v-model="infoForm.c1101[2]">排卵障碍</el-checkbox>
          <el-checkbox v-model="infoForm.c1101[3]">EFI评分低</el-checkbox>
          <el-checkbox v-model="infoForm.c1101[4]">宫腔因素</el-checkbox>
          <el-checkbox v-model="infoForm.c1101[5]">不孕病程较长</el-checkbox>
          <el-checkbox v-model="infoForm.c1101[6]">年龄因素</el-checkbox>
          <el-checkbox v-model="infoForm.c1101[7]">其他</el-checkbox>
          <el-input v-model="infoForm.c1102" maxlength="50" show-word-limit placeholder="其他"></el-input> 
        </el-form-item>

        <el-form-item label="12.采用人工授精是否成功?">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.c12[0]">未成功</el-checkbox>
          <el-checkbox v-model="infoForm.c12[1]">成功受孕，妊娠中</el-checkbox>
          <el-checkbox v-model="infoForm.c12[2]">已成功生产</el-checkbox>
        </el-form-item>

        <el-form-item label="13.采用试管婴儿是否成功?">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.c13[0]">未成功</el-checkbox>
          <el-checkbox v-model="infoForm.c13[1]">成功受孕，妊娠中</el-checkbox>
          <el-checkbox v-model="infoForm.c13[2]">已成功生产</el-checkbox>
        </el-form-item>

    </el-form>
    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiGetHideCode } from "@/api/api-prj00g";
export default {
  name: "MarryHistory",
  data() {
    return {
      dialogVisible: false,
      infoForm: {
        c01: 0,
        c02: 0,
        c03: 0,
        c04: 0,
        c05: 0,
        c0601: 0,
        c0602: 0,
        c0603: 0,
        c0604: 0,
        c0605: 0,
        c0607: 0,
        c0608: 0,
        c0609: 0,
        c0610: 0,
        c0611: 0,       
        c07: 0,
        c08:[false, false, false],
        c09:0,
        c1001:[false, false, false],
        c1002:'',
        c1101: [false, false, false, false, false,  false, false, false],
        c1102: "",
        c12:[false, false, false],
        c13:[false, false, false]       
      },
      _id: "",
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: ""     
    };
  },
  created() {
    this.$on("openEvent", (data) => {
      console.log("婚育史", data);
      this.dialogVisible = true;
      this.check_status = data.check_status;
      this.isOwnedByUser = data.isOwnedByUser;
      this.formName = data.formName;
      this._id = data._id;

      if ("id" in data.result) {
        this.infoForm = this.parseInfoForm(data.result);
      }
    });
  },
  methods: {  
    updateInfoForm() {
      apiUpdatePatientDataForm({
        _id: this._id,
        infoForm: this.infoForm,
        formName: this.formName,
      })
        .then((res) => {
          if (res.detail) {
            this.$message({
              message: res.detail,
              type: "error",
            });
          } else {
            this.$message({ message: "提交成功", type: "success" });
          }
          this.dialogVisible = false;
          this.$parent.searchPatient();
          this.$parent.getPatients();
        })
        .catch();
    },
    parseInfoForm(stringifyParams) {
      for (let key in stringifyParams) {
        let reg = /^\[.+\]$/;
        stringifyParams[key] = reg.test(stringifyParams[key])
          ? JSON.parse(stringifyParams[key])
          : stringifyParams[key];
      }
      return stringifyParams;
    },
  },
};
</script>
<style lang="scss">
.prj00g-info {
  .el-input-group__append,
  .el-input-group__prepend {
    width: 50px;
  }
}
.prj00g-dialog {
  h3 {
    background-color: cornflowerblue;
    font-size: 18px;
    line-height: 45px;
    text-align: center;
    color: #f2f2f2;
  }

  h4 {
    color: cornflowerblue;
  }
}
</style>
