<template>
  <el-dialog
    title="月经史"
    class="my-dialog prj009-dialog"
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

 <div>
    <span>若月经正常，则填写平素月经情况;若月经紊乱，则填写月经紊乱后月经情况。</span>
    <el-divider></el-divider>
  </div>
      <!-- 表格开始 -->
<el-form-item label="1.初潮年龄？：">
 <el-radio v-model="infoForm.c0101" label="1">10岁以前</el-radio>
 <el-radio v-model="infoForm.c0101" label="2">11岁以后</el-radio>
 <el-radio v-model="infoForm.c0101" label="3">14岁以后</el-radio>
 <el-radio v-model="infoForm.c0101" label="4">16岁以后</el-radio>
 <el-radio v-model="infoForm.c0101" label="5">其他</el-radio>
 <el-input v-model="infoForm.c0102" maxlength="50" show-word-limit placeholder="注明其他"></el-input>         
</el-form-item>
<el-form-item label="2.">
       最近三次自然月经的情况（自然月经是指不用药自己来的月经）     
  <el-row :gutter="20">
     （1）最后一次自然月经的日期：（指月经来潮的第一天）
      <el-date-picker  v-model="infoForm.c0201" type="date"  placeholder="选择日期"  format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"/>
  </el-row> 
  <el-row :gutter="20">
     （2）前一次自然月经的日期：（指月经来潮的第一天） 
      <el-date-picker  v-model="infoForm.c0202" type="date"  placeholder="选择日期"  format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"/>
  </el-row> 
   <el-row :gutter="20">
     （3）再前一次自然月经的日期：（指月经来潮的第一天） 
      <el-date-picker  v-model="infoForm.c0203" type="date"  placeholder="选择日期"  format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"/>
  </el-row>  
</el-form-item>  

<el-form-item label="3a.周期？：">
 <el-radio v-model="infoForm.c0301" label="1">少于21 天</el-radio>
 <el-radio v-model="infoForm.c0301" label="2">21-37 天</el-radio>
 <el-radio v-model="infoForm.c0301" label="3">多于37 天</el-radio>
 <el-radio v-model="infoForm.c0301" label="4">先后不定期</el-radio>
 <el-radio v-model="infoForm.c0301" label="5">闭经</el-radio>
 <el-input-number v-model="infoForm.c0302" :min="1"  :max="36"/> （月）
</el-form-item>

<el-form-item label="3b.经期？：">
 <el-radio v-model="infoForm.c0303" label="1"> 1-3 天</el-radio>
 <el-radio v-model="infoForm.c0303" label="2"> 3-7 天</el-radio>
 <el-radio v-model="infoForm.c0303" label="3"> 7-15 天</el-radio>
 <el-radio v-model="infoForm.c0303" label="4">崩漏</el-radio>
 <el-input-number v-model="infoForm.c0304" :min="1"  :max="360"/> （天）
</el-form-item>

<el-form-item label="3c.经量？：">
 <el-radio v-model="infoForm.c0305" label="1">极少，几乎不用卫生巾，护垫即可</el-radio> <br/>
 <el-radio v-model="infoForm.c0305" label="2">少，每天不超过1张卫生巾</el-radio> <br/>
 <el-radio v-model="infoForm.c0305" label="3">中等，每天约需2-4张卫生巾</el-radio> <br/>
 <el-radio v-model="infoForm.c0305" label="4">多，每天约需5-10张卫生巾</el-radio> <br/>
 <el-radio v-model="infoForm.c0305" label="5">极多，每天多于10张卫生巾</el-radio> <br/>
</el-form-item>

<el-form-item label="3d.经色？：">
 <el-radio v-model="infoForm.c0306" label="1">鲜红</el-radio>
 <el-radio v-model="infoForm.c0306" label="2">暗红</el-radio>
 <el-radio v-model="infoForm.c0306" label="3">淡红</el-radio>
 <el-radio v-model="infoForm.c0306" label="4">紫黯</el-radio>
 <el-radio v-model="infoForm.c0306" label="5">紫黑</el-radio>
 <el-radio v-model="infoForm.c0306" label="6">褐色</el-radio>
</el-form-item>

<el-form-item label="3e.经质？：">
 <el-radio v-model="infoForm.c0307" label="1">清稀</el-radio>
 <el-radio v-model="infoForm.c0307" label="2">粘稠</el-radio>
 <el-radio v-model="infoForm.c0307" label="3">正常</el-radio>
</el-form-item>
<el-form-item label="3e.血块？：">
 <el-radio v-model="infoForm.c0308" label="1">有</el-radio>
 <el-radio v-model="infoForm.c0308" label="2">无</el-radio>
</el-form-item>
<el-form-item label="3e.痛经？：">
 <el-radio v-model="infoForm.c0309" label="1">无</el-radio>
 <el-radio v-model="infoForm.c0309" label="2">有</el-radio> <br/>

 <div v-show="infoForm.c0309==2">
   <el-row> 疼痛性质: </el-row>
   <el-row>
      <el-radio v-model="infoForm.c0310" label="1">胀痛</el-radio>
      <el-radio v-model="infoForm.c0310" label="2">隐痛</el-radio>
      <el-radio v-model="infoForm.c0310" label="3">冷痛</el-radio>
      <el-radio v-model="infoForm.c0310" label="4">刺痛</el-radio>
      <el-radio v-model="infoForm.c0310" label="5">坠痛疼痛</el-radio>
   </el-row>
   
   <el-row> 是否喜按？</el-row>
   <el-row>
      <el-radio v-model="infoForm.c0311" label="1">否</el-radio>
      <el-radio v-model="infoForm.c0311" label="2">是</el-radio>
   </el-row>

   <el-row>是否需要止痛药？</el-row>
   <el-row>
     <el-radio v-model="infoForm.c0312" label="1">否</el-radio>
     <el-radio v-model="infoForm.c0312" label="2">是</el-radio>
    <el-input v-model="infoForm.c0313" maxlength="50" show-word-limit placeholder="注明止痛药"/> 
   </el-row>  
  </div> 
</el-form-item>

<el-form-item label="3f.伴随症状？">
 <el-radio v-model="infoForm.c0314" label="1">经前或经行乳房胀痛</el-radio>
 <el-radio v-model="infoForm.c0314" label="2">经前烦躁</el-radio>
 <el-radio v-model="infoForm.c0314" label="3">经行腰痛</el-radio>
 <el-radio v-model="infoForm.c0314" label="4">经行头痛</el-radio>
 <el-radio v-model="infoForm.c0314" label="5">经行腹泻</el-radio>
 <el-radio v-model="infoForm.c0314" label="6">经行不畅</el-radio>
 <el-radio v-model="infoForm.c0314" label="7">经行浮肿</el-radio>
 <el-radio v-model="infoForm.c0314" label="8">经期发热</el-radio>
 <el-radio v-model="infoForm.c0314" label="9">经行口糜</el-radio>
 <el-radio v-model="infoForm.c0314" label="10">经期恶心呕吐</el-radio>
</el-form-item>

<el-tag>白带情况</el-tag>
<el-form-item label="量？">
 <el-radio v-model="infoForm.c0315" label="1">少</el-radio>
 <el-radio v-model="infoForm.c0315" label="2">多</el-radio>
 <el-radio v-model="infoForm.c0315" label="3">适中</el-radio>
</el-form-item>

<el-form-item label="色？">
 <el-radio v-model="infoForm.c0316" label="1">透明</el-radio>
 <el-radio v-model="infoForm.c0316" label="2">黄</el-radio>
 <el-radio v-model="infoForm.c0316" label="3">白</el-radio>
 <el-radio v-model="infoForm.c0316" label="4">黄白相间</el-radio>
 <el-radio v-model="infoForm.c0316" label="5">黄绿</el-radio>
 <el-radio v-model="infoForm.c0316" label="6">夹血丝</el-radio>
</el-form-item>

<el-form-item label="质？">
 <el-radio v-model="infoForm.c0317" label="1">清稀</el-radio>
 <el-radio v-model="infoForm.c0317" label="2">粘稠</el-radio>
 <el-radio v-model="infoForm.c0317" label="3">脓样</el-radio>
 <el-radio v-model="infoForm.c0317" label="4">豆腐渣</el-radio>
</el-form-item>

<el-form-item label="伴随症状：">
 <el-radio v-model="infoForm.c0318" label="1">阴痒</el-radio>
 <el-radio v-model="infoForm.c0318" label="2">带下臭秽</el-radio>
 <el-radio v-model="infoForm.c0318" label="3">阴部坠胀</el-radio>
 <el-radio v-model="infoForm.c0318" label="4">阴部干涩</el-radio>
 <el-radio v-model="infoForm.c0318" label="5">阴部灼热</el-radio>
</el-form-item>

    </el-form>
    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj009";
export default {
  name: "MenstrualHistory",
  data() {
    return {
      infoForm: {
        c0101:0,
        c0102: '',
        c0201:'',
        c0202:'',
        c0203:'',
        c0301:0,
        c0302:'',
        c0303:0,
        c0304:'',
        c0305:0,
        c0306:0,
        c0307:0,
        c0308:0,
        c0309:0,
        c0310:0,
        c0311:0,
        c0312:'',
        c0314:0,
        c0315:0,
        c0316:0,
        c0317:0,
        c0318:0
      },
      dialogVisible: false,
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: "",
     
    };
  },
  created() {
    this.$on("openEvent", (data) => {
      console.log("月经带下史", data);
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
<style lang="scss" scoped>
.prj009-info {
  .el-input-group__append,
  .el-input-group__prepend {
    width: 50px;
  }
}
.prj009-dialog {
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
