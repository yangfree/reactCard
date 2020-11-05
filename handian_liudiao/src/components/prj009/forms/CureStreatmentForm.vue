<template>
  <el-dialog
    title="治疗(此部分须由医师填写)"
    class="my-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="200px" label-position="left">
      <el-alert
        v-if="check_status=='审核通过'"
        title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <el-divider v-if="check_status=='审核通过'"></el-divider>

      <!-- 表格开始 -->
        <el-form-item label="1、肝肾阴虚证">
            <el-switch v-model="infoForm.p0101" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.p0101==1">
              <el-row>
                <el-col :span="6">A.方药：</el-col>
                <el-col :span="4">
                   <el-radio v-model="infoForm.p0102" label="1">左归丸加减</el-radio>
                   <el-radio v-model="infoForm.p0102" label="2">育阴汤加减  </el-radio>
                   <el-radio v-model="infoForm.p0102" label="3">其他 </el-radio>                        
                 </el-col>        
                 <el-col :span="4">
                    <el-input v-model="infoForm.p0103" maxlength="50" show-word-limit placeholder="以上没有可补充"/> 
                 </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">B.中成药：</el-col>
                <el-col :span="4">
                   <el-radio v-model="infoForm.p0104" label="1">坤宝丸</el-radio>
                   <el-radio v-model="infoForm.p0104" label="2">杞菊地黄丸 </el-radio>  
                   <el-radio v-model="infoForm.p0104" label="3">其他</el-radio>                  
                 </el-col>        
                 <el-col :span="4">
                    <el-input v-model="infoForm.p0105" maxlength="50" show-word-limit placeholder="以上没有可补充"/> 
                 </el-col>     
              </el-row>            
            </span>
        </el-form-item>

     
        <el-form-item label="2、肾阴虚证">
            <el-switch v-model="infoForm.p0201" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.p0201==1">
              <el-row>
                <el-col :span="6">A.方药：</el-col>
                <el-col :span="4">
                   <el-radio v-model="infoForm.p0202" label="1">左归丸加减</el-radio>
                   <el-radio v-model="infoForm.p0202" label="2">其他</el-radio>    
                 </el-col>        
                 <el-col :span="4">
                    <el-input v-model="infoForm.p0203" maxlength="50" show-word-limit placeholder="以上没有可补充"/> 
                 </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">B.中成药：</el-col>
                <el-col :span="4">
                   <el-radio v-model="infoForm.p0204" label="1">左归丸</el-radio>
                   <el-radio v-model="infoForm.p0204" label="2">六味地黄丸  </el-radio> 
                   <el-radio v-model="infoForm.p0204" label="3">其他 </el-radio>                   
                 </el-col>        
                 <el-col :span="4">
                    <el-input v-model="infoForm.p0205" maxlength="50" show-word-limit placeholder="以上没有可补充"/> 
                 </el-col>     
              </el-row>            
            </span>
        </el-form-item>

        <el-form-item label="3、肾阳虚证">
            <el-switch v-model="infoForm.p0301" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.p0301==1">
              <el-row>
                <el-col :span="6">A.方药：</el-col>
                <el-col :span="4">
                   <el-radio v-model="infoForm.p0302" label="1">右归丸加减</el-radio>
                   <el-radio v-model="infoForm.p0302" label="2">其他</el-radio>     
                 </el-col>        
                 <el-col :span="4">
                    <el-input v-model="infoForm.p0303" maxlength="50" show-word-limit placeholder="以上没有可补充"/> 
                 </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">B.中成药：</el-col>
                <el-col :span="4">
                   <el-radio v-model="infoForm.p0304" label="1">右归丸</el-radio>
                   <el-radio v-model="infoForm.p0304" label="2">金匱肾气丸  </el-radio>    
                   <el-radio v-model="infoForm.p0304" label="3">其他  </el-radio>               
                 </el-col>        
                 <el-col :span="4">
                    <el-input v-model="infoForm.p0305" maxlength="50" show-word-limit placeholder="以上没有可补充"/> 
                 </el-col>     
              </el-row>            
            </span>
        </el-form-item>

        <el-form-item label="4、肾虚血瘀证">
            <el-switch v-model="infoForm.p0401" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.p0401==1">
              <el-row>
                <el-col :span="6">A.方药：</el-col>
                <el-col :span="4">
                   <el-radio v-model="infoForm.p0402" label="1">补肾活血方</el-radio>
                   <el-radio v-model="infoForm.p0402" label="2">肾气丸合失效散</el-radio>  
                   <el-radio v-model="infoForm.p0402" label="3">其他</el-radio>     
                 </el-col>        
                 <el-col :span="4">
                    <el-input v-model="infoForm.p0403" maxlength="50" show-word-limit placeholder="以上没有可补充"/> 
                 </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">B.中成药：</el-col>
                <el-col :span="4">
                   <el-radio v-model="infoForm.p0404" label="1">定坤丸</el-radio>
                   <el-radio v-model="infoForm.p0404" label="2">其他 </el-radio>                   
                 </el-col>        
                 <el-col :span="4">
                    <el-input v-model="infoForm.p0405" maxlength="50" show-word-limit placeholder="以上没有可补充"/> 
                 </el-col>     
              </el-row>            
            </span>
        </el-form-item>      
     <el-form-item label="5、肾虚肝郁证">
            <el-switch v-model="infoForm.p0501" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.p0501==1">
              <el-row>
                <el-col :span="6">A.方药：</el-col>
                <el-col :span="4">
                   <el-radio v-model="infoForm.p0502" label="1">滋水清肝饮</el-radio>
                   <el-radio v-model="infoForm.p0502" label="2">其他</el-radio>     
                 </el-col>        
                 <el-col :span="4">
                    <el-input v-model="infoForm.p0503" maxlength="50" show-word-limit placeholder="以上没有可补充"/> 
                 </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">B.中成药：</el-col>
                <el-col :span="4">
                   <el-radio v-model="infoForm.p0504" label="1">妇科养荣丸</el-radio>                   
                   <el-radio v-model="infoForm.p0504" label="2">妇科调经片</el-radio> 
                   <el-radio v-model="infoForm.p0504" label="3">其他 </el-radio>                   
                 </el-col>        
                 <el-col :span="4">
                    <el-input v-model="infoForm.p0505" maxlength="50" show-word-limit placeholder="以上没有可补充"/> 
                 </el-col>     
              </el-row>            
            </span>
        </el-form-item>   
         <el-form-item label="6、心肾不交证">
            <el-switch v-model="infoForm.p0601" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.p0601==1">
              <el-row>
                <el-col :span="6">A.方药：</el-col>
                <el-col :span="4">
                   <el-radio v-model="infoForm.p0602" label="1">天王补心丹</el-radio>
                   <el-radio v-model="infoForm.p0602" label="2">黄连阿胶汤</el-radio>  
                   <el-radio v-model="infoForm.p0602" label="3">其他</el-radio>     
                 </el-col>        
                 <el-col :span="4">
                    <el-input v-model="infoForm.p0603" maxlength="50" show-word-limit placeholder="以上没有可补充"/> 
                 </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">B.中成药：</el-col>
                <el-col :span="4">
                   <el-radio v-model="infoForm.p0604" label="1">天王补心丸</el-radio>
                   <el-radio v-model="infoForm.p0604" label="2">坤泰胶囊 </el-radio>
                   <el-radio v-model="infoForm.p0604" label="3">其他 </el-radio>                   
                 </el-col>        
                 <el-col :span="4">
                    <el-input v-model="infoForm.p0605" maxlength="50" show-word-limit placeholder="以上没有可补充"/> 
                 </el-col>     
              </el-row>            
            </span>
        </el-form-item>   
         <el-form-item label="7、气血虚弱证">
            <el-switch v-model="infoForm.p0701" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.p0701==1">
              <el-row>
                <el-col :span="6">A.方药：</el-col>
                <el-col :span="4">
                   <el-radio v-model="infoForm.p0702" label="1">人参养荣汤</el-radio>
                   <el-radio v-model="infoForm.p0702" label="2">归脾汤</el-radio>  
                   <el-radio v-model="infoForm.p0702" label="3">其他</el-radio>     
                 </el-col>        
                 <el-col :span="4">
                    <el-input v-model="infoForm.p0703" maxlength="50" show-word-limit placeholder="以上没有可补充"/> 
                 </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">B.中成药</el-col>
                <el-col :span="4">
                   <el-radio v-model="infoForm.p0704" label="1">人参养荣丸</el-radio>
                   <el-radio v-model="infoForm.p0704" label="2">定坤丹 </el-radio>
                   <el-radio v-model="infoForm.p0704" label="3">其他 </el-radio>                   
                 </el-col>        
                 <el-col :span="4">
                    <el-input v-model="infoForm.p0705" maxlength="50" show-word-limit placeholder="以上没有可补充"/> 
                 </el-col>     
              </el-row>            
            </span>
        </el-form-item>   
    </el-form>
    <!-- <div class="alert-info" style="text-align:center;color: red;width: 100%;">*** 本表格所有选项均为必填信息 ***</div> -->
    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj009";

export default {
  name: "CureStreatmentForm",
  data() {
    return {
      infoForm: {
        p0101:0,
        p0102:0,
        p0103: '',
        p0104:0,
        p0105: '',

        p0201:0,
        p0202:0,
        p0203: '',
        p0204:0,
        p0205: '',

        p0301:0,
        p0302:0,
        p0303: '',
        p0304:0,
        p0305: '',  

        p0401:0,
        p0402:0,
        p0403: '',
        p0404:0,
        p0405: '',

        p0501:0,
        p0502:0,
        p0503: '',
        p0504:0,
        p0505: '',

        p0601:0,
        p0602:0,
        p0603: '',
        p0604:0,
        p0605: '',

        p0701:0,
        p0702:0,
        p0703: '',
        p0704:0,
        p0705: '',
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
      console.log("治疗: ", data);
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
