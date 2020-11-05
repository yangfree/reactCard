<template>
  <el-dialog
    title="个人史"
    class="my-dialog prj009-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="200px" label-position="left">
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
      <p></p>
      <el-alert
        v-if="!isOwnedByUser"
        effect="dark"
        title="此条信息为其他用户创建，您无法修改"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>

      <!-- 表格开始 -->
      <el-form-item label="1.平素性格特点：">
        <el-radio v-model="infoForm.b01" label="1">平和开朗</el-radio>
        <el-radio v-model="infoForm.b01" label="2">内向沉静</el-radio>
        <el-radio v-model="infoForm.b01" label="3">急躁易怒</el-radio>
        <el-radio v-model="infoForm.b01" label="4">抑郁寡欢</el-radio>
        <el-radio v-model="infoForm.b01" label="5">悲伤欲哭</el-radio>
        <el-radio v-model="infoForm.b01" label="6">喜叹息</el-radio>
      </el-form-item>
      
      <h3>2.饮食习惯</h3>
      <el-form-item label="2a. 饮食平衡：">
        <el-radio v-model="infoForm.b0201" label="1">随意</el-radio>
        <el-radio v-model="infoForm.b0201" label="2">有意识注意</el-radio>
        <el-radio v-model="infoForm.b0201" label="3">在营养师指导下饮食</el-radio>
      </el-form-item>

      <el-form-item label="2b. 零食摄入情况：">
        <el-radio v-model="infoForm.b0202" label="1">无</el-radio>
        <el-radio v-model="infoForm.b0202" label="2">少</el-radio>
        <el-radio v-model="infoForm.b0202" label="3">中</el-radio>
        <el-radio v-model="infoForm.b0202" label="4">多</el-radio>
      </el-form-item>

<el-form-item label="2c. 饮食嗜好：">
 <el-radio v-model="infoForm.b0203" label="1">基本均衡</el-radio>
 <el-radio v-model="infoForm.b0203" label="2">主食为主</el-radio>
 <el-radio v-model="infoForm.b0203" label="3">肉类为主</el-radio>
 <el-radio v-model="infoForm.b0203" label="4">素食为主</el-radio>
 <el-radio v-model="infoForm.b0203" label="5">水产品为主</el-radio>
 <el-radio v-model="infoForm.b0203" label="6">脂类为主</el-radio>
</el-form-item>
<el-form-item label="2d. 饮食口味：">
 <el-radio v-model="infoForm.b0204" label="1">清淡</el-radio>
 <el-radio v-model="infoForm.b0204" label="2">辛辣</el-radio>
 <el-radio v-model="infoForm.b0204" label="3">生冷</el-radio>
 <el-radio v-model="infoForm.b0204" label="4">甜品</el-radio>
 <el-radio v-model="infoForm.b0204" label="5">煎炸</el-radio>
 <el-radio v-model="infoForm.b0204" label="6">腌制</el-radio>
 <el-radio v-model="infoForm.b0204" label="7">嗜咸</el-radio>
</el-form-item>
<el-form-item label="3. 饮酒：">
 <el-radio v-model="infoForm.b03" label="1">无</el-radio>
 <el-radio v-model="infoForm.b03" label="2">偶有</el-radio>
 <el-radio v-model="infoForm.b03" label="3">经常</el-radio>
</el-form-item>
<el-form-item label="4a. 吸烟：">
 <el-radio v-model="infoForm.b0401" label="1">无</el-radio>
 <el-radio v-model="infoForm.b0401" label="2">＜5支/日</el-radio>
 <el-radio v-model="infoForm.b0401" label="3">5-15支/日</el-radio>
 <el-radio v-model="infoForm.b0401" label="4">＞15支/日</el-radio>
</el-form-item>
<el-form-item label="4b. 烟龄：">
 <el-radio v-model="infoForm.b0402" label="1">无</el-radio>
 <el-radio v-model="infoForm.b0402" label="2">0-10年</el-radio>
 <el-radio v-model="infoForm.b0402" label="3">10-20年</el-radio>
 <el-radio v-model="infoForm.b0402" label="4">20年以上</el-radio>
</el-form-item>
<el-form-item label="4c. 被动吸烟：">
 <el-radio v-model="infoForm.b0403" label="1">无</el-radio>
 <el-radio v-model="infoForm.b0403" label="2">有</el-radio>
</el-form-item>
<el-form-item label="5. 过敏史：">
 <el-radio v-model="infoForm.b0501" label="1">无</el-radio>
 <el-radio v-model="infoForm.b0501" label="2">青霉素</el-radio>
 <el-radio v-model="infoForm.b0501" label="3">花粉</el-radio>
 <el-radio v-model="infoForm.b0501" label="4">鱼虾蟹</el-radio>
 <el-radio v-model="infoForm.b0501" label="5">酒精</el-radio>
 <el-radio v-model="infoForm.b0501" label="6">粉尘</el-radio>
 <el-radio v-model="infoForm.b0501" label="7">牛肉羊肉</el-radio>
 <el-radio v-model="infoForm.b0501" label="8">其他</el-radio>      
 <el-input v-model="infoForm.b0502" maxlength="50" show-word-limit placeholder="注明其他"/>  
</el-form-item>

<el-form-item label="6. 体力状况：">
 <el-radio v-model="infoForm.b06" label="1">好</el-radio>
 <el-radio v-model="infoForm.b06" label="2">一般</el-radio>
 <el-radio v-model="infoForm.b06" label="3">易疲倦</el-radio>
</el-form-item>


<el-form-item label="7.职业体力类型：">
 <el-radio v-model="infoForm.b07" label="1">重体力劳动（如：搬运工、清洁工、农场工人等）</el-radio> <br/>
 <el-radio v-model="infoForm.b07" label="2">中体力劳动（如：家政服务人员、服务生、厨师、医护等）</el-radio> <br/>
 <el-radio v-model="infoForm.b07" label="3">轻体力劳动（如：教师、美容美发师、批发商、职员等）</el-radio> <br/>
 <el-radio v-model="infoForm.b07" label="4">坐式的工作（如：收银员、出纳员、接线员、秘书等）</el-radio> <br/>
</el-form-item>

<h3>8.运动情况</h3>
<el-form-item label="8a.运动习惯：">
 <el-radio v-model="infoForm.b0801" label="1">不运动</el-radio>
 <el-radio v-model="infoForm.b0801" label="2">偶有运动</el-radio>
 <el-radio v-model="infoForm.b0801" label="3">经常运动</el-radio>
</el-form-item>
<el-form-item label="8b.自觉运动强度：">
 <el-radio v-model="infoForm.b0802" label="1">无</el-radio> <br/>
 <el-radio v-model="infoForm.b0802" label="2">轻(做操,气功,太极拳,散步)</el-radio>  <br/>
 <el-radio v-model="infoForm.b0802" label="3">中(游泳,骑自行车,快走慢跑,跳舞,高尔夫球,仰卧起坐)</el-radio>  <br/>
 <el-radio v-model="infoForm.b0802" label="4">重(登山,跳健美操,举杠铃等器械运动)</el-radio> 
</el-form-item>
<el-form-item label="8c.每周运动的次数：">
 <el-radio v-model="infoForm.b0803" label="1">小于3次/周</el-radio>
 <el-radio v-model="infoForm.b0803" label="2">≥3次/周</el-radio>
 <el-radio v-model="infoForm.b0803" label="3">不能规律</el-radio>
</el-form-item>
<el-form-item label="8d.每次运动持续的时间：">
 <el-radio v-model="infoForm.b0804" label="1">小于30分钟    b0804</el-radio>
 <el-radio v-model="infoForm.b0804" label="2">30分钟-1个小时</el-radio>
 <el-radio v-model="infoForm.b0804" label="3">大于1个小时</el-radio>
</el-form-item>


<h3>9.减肥情况</h3> 
      <el-form-item label="9a. 减肥时长（月）">
        <el-input-number v-model="infoForm.b0901"/> 
      </el-form-item>

      <el-form-item label="9b..减肥方式">      
        <el-radio v-model="infoForm.b0902" label="1">运动减肥</el-radio>
        <el-radio v-model="infoForm.b0902" label="2">节食减肥</el-radio>
        <el-radio v-model="infoForm.b0902" label="3">药物减肥</el-radio>
        <el-radio v-model="infoForm.b0902" label="4">其他</el-radio>
        <el-input v-model="infoForm.b0903" maxlength="50" show-word-limit placeholder="注明其他"/>  
      </el-form-item>

<el-form-item label="10.夫妻关系：">
 <el-radio v-model="infoForm.b10" label="1">和睦</el-radio>
 <el-radio v-model="infoForm.b10" label="2">一般</el-radio>
 <el-radio v-model="infoForm.b10" label="3">冷漠</el-radio>
</el-form-item>
<el-form-item label="11.性生活状态：">
 <el-radio v-model="infoForm.b11" label="1">和谐</el-radio>
 <el-radio v-model="infoForm.b11" label="2">欠佳</el-radio>
</el-form-item>
<el-form-item label="12.亲友关系：">
 <el-radio v-model="infoForm.b12" label="1">较好</el-radio>
 <el-radio v-model="infoForm.b12" label="2">一般</el-radio>
 <el-radio v-model="infoForm.b12" label="3">不关心</el-radio>
</el-form-item>

<h3>13.心理状况</h3>
<el-form-item label="13a. 情绪：">
 <el-radio v-model="infoForm.b1301" label="1">易紧张</el-radio>
 <el-radio v-model="infoForm.b1301" label="2">易生气</el-radio>
 <el-radio v-model="infoForm.b1301" label="3">平稳</el-radio>
 <el-radio v-model="infoForm.b1301" label="4">情绪起伏大</el-radio>
 <el-radio v-model="infoForm.b1301" label="5">易情绪低落</el-radio>
 <el-radio v-model="infoForm.b1301" label="6">抑郁焦虑</el-radio>
</el-form-item>
<el-form-item label="13b. 压力：">
 <el-radio v-model="infoForm.b1302" label="1">没有</el-radio>
 <el-radio v-model="infoForm.b1302" label="2">一般</el-radio>
 <el-radio v-model="infoForm.b1302" label="3">大</el-radio>
 <el-radio v-model="infoForm.b1302" label="4">非常大</el-radio>
</el-form-item>

<el-form-item label="14.">
  <br/>  
  <el-row :gutter="20">
    <el-col :span="8">您的居住场所有装潢史？</el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1401" label="1">有</el-radio> </el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1401" label="2">无</el-radio> </el-col>
  </el-row> 
   <el-row :gutter="20">
    <el-col :span="8">您的居住地周围化工厂？</el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1402" label="1">有</el-radio> </el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1402" label="2">无</el-radio> </el-col>
  </el-row> 
    <el-row :gutter="20">
    <el-col :span="8">您的生活环境噪音大吗？</el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1403" label="1">有</el-radio> </el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1403" label="2">无</el-radio> </el-col>
  </el-row> 
  <el-row :gutter="20">
    <el-col :span="8">您服用过紧急避孕药吗？</el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1404" label="1">有</el-radio> </el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1404" label="2">无</el-radio> </el-col>
  </el-row> 
  <el-row :gutter="20">
    <el-col :span="8">您有接触过有毒及化学物质吗？</el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1405" label="1">有</el-radio> </el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1405" label="2">无</el-radio> </el-col>
  </el-row> 
  <el-row :gutter="20">
    <el-col :span="8">您是否经常染发？</el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1406" label="1">是</el-radio> </el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1406" label="2">否</el-radio> </el-col>
  </el-row> 
  <el-row :gutter="20">
    <el-col :span="8">您是否经常值夜班？</el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1407" label="1">是</el-radio> </el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1407" label="2">否</el-radio> </el-col>
  </el-row> 
  <el-row :gutter="20">
    <el-col :span="8">您是否经常超过半夜11点睡觉？</el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1408" label="1">是</el-radio> </el-col>
    <el-col :span="2"> <el-radio v-model="infoForm.b1408" label="2">否</el-radio> </el-col>
  </el-row>    
</el-form-item>

    
    </el-form>

    <span slot="footer">
      <el-button
        type="primary"
        :disabled="check_status=='审核通过'"
        v-if="exist"
        @click="updateHistoryForm"
      >确定</el-button>
      <el-button type="primary" v-else @click="createHistoryForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj009";

export default {
  name: "PersonelLife",
  data() {
    return {
      infoForm: {
        b01: 0,
        b0201: 0,
        b0202: 0,
        b0203: 0,
        b0204: 0,
        b03:0,
        b0401:0,
        b0402:0,
        b0403:0,
        b0501:0,
        b0502:'',
        b06:0,
        b07:0,
        b0801:0,
        b0802:0,
        b0803:0,
        b0804:0,
        b0901:0,
        b0902:0,
        b0903:'',
        b10:0,
        b11:0,
        b12:0,
        b1301:0,
        b1302:0,
        b1401:0,
        b1402:0,
        b1403:0,
        b1404:0,
        b1405:0,
        b1406:0,
        b1407:0,
        b1408:0
      },
      dialogVisible: false,
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: ""
    };
  },
  created() {
    this.$on("openEvent", (data) => {
      console.log("个人史:", data);
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
   
    updateHistoryForm() {
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

.prj009-dialog {
  h3 {
    color: cornflowerblue;
  }
}
</style>