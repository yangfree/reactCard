<template>
  <el-dialog
    title="辅助检查"
    class="my-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="100%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="auto" label-position="left">
      <el-alert
        v-if="check_status=='审核通过'"
        title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <el-divider v-if="check_status=='审核通过'"></el-divider>
      <!-- 表格开始 -->

        <el-form-item label="1、生化">
          <el-switch v-model="infoForm.h0101" active-text="有" inactive-text="无" active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.h0101==1">

            <el-row :gutter="20">
              <el-col :span="4">TC（总胆固醇） </el-col>
              <el-col :span="4"><el-input-number   v-model="infoForm.h0102" :precision=2  :min="0" :max="200" /> &nbsp;</el-col>
              <el-col :span="4"> LDL（低密度脂蛋白） </el-col>
              <el-col :span="4"><el-input-number   v-model="infoForm.h0103" :precision=2  :min="0" :max="200" />  </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="4">FINS（空腹胰岛素）</el-col>
              <el-col :span="4"><el-input-number   v-model="infoForm.h0104" :precision=2  :min="0" :max="200" />  &nbsp;</el-col>
              <el-col :span="4"> ALT（谷丙转氨酶）</el-col>
              <el-col :span="4"><el-input-number   v-model="infoForm.h0105" :precision=2  :min="0" :max="200" /> </el-col>
            </el-row>
             <el-row :gutter="20">
              <el-col :span="4">FBG（空腹血糖） </el-col>
              <el-col :span="4"><el-input-number   v-model="infoForm.h0106" :precision=2  :min="0" :max="200" /> &nbsp; </el-col>
              <el-col :span="4">Cr（尿肌酐） </el-col>
              <el-col :span="4"><el-input-number   v-model="infoForm.h0107" :precision=2  :min="0" :max="200" /> &nbsp; </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="4">HDL（高密度脂蛋白） </el-col>
              <el-col :span="4"><el-input-number   v-model="infoForm.h0108" :precision=2  :min="0" :max="200" />&nbsp; </el-col>
              <el-col :span="4">UA（尿酸）</el-col>
              <el-col :span="4"><el-input-number   v-model="infoForm.h0109" :precision=2  :min="0" :max="200" /> &nbsp; </el-col>
            </el-row>
            <el-row :gutter="20">              
              <el-col :span="4">Tba（总胆汁酸） </el-col>
              <el-col :span="4"><el-input-number   v-model="infoForm.h0111" :precision=2  :min="0" :max="200" /> &nbsp; </el-col>
              <el-col :span="4">ALP（碱性磷酸酶） </el-col>
              <el-col :span="4"><el-input-number   v-model="infoForm.h0113" :precision=2  :min="0" :max="200" /> &nbsp;  </el-col>
            </el-row>
            <el-row :gutter="20">              
              <el-col :span="4">Ca（钙）</el-col>
              <el-col :span="4"> <el-input-number   v-model="infoForm.h0115" :precision=2  :min="0" :max="200" /> &nbsp; </el-col>
              <el-col :span="4"> P（磷）</el-col>
              <el-col :span="4"> <el-input-number   v-model="infoForm.h0117" :precision=2  :min="0" :max="200" /> &nbsp;  </el-col>
            </el-row>
                        
            </span>
        </el-form-item>

        <el-form-item label="2、甲功">
            <el-switch v-model="infoForm.h0201" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.h0201==1">
              <el-row>
                <el-col :span="6">TSH（促甲状腺激素）</el-col>
                <el-col :span="4"><el-input-number   v-model="infoForm.h0202" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6">FT3（血清游离三碘甲状腺原氨酸）</el-col>
                <el-col :span="4"><el-input-number   v-model="infoForm.h0203" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6">FT4（血清游离甲状腺素）</el-col>
                <el-col :span="4"><el-input-number   v-model="infoForm.h0204" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>              
            </span>
        </el-form-item>
    
        <el-form-item label="3、血常规">
            <el-switch v-model="infoForm.h0301" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.h0301==1">
              <el-row>
                <el-col :span="6">Hg（血红蛋白）</el-col>
                <el-col :span="4"><el-input-number   v-model="infoForm.h0302" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6">MPV（平均血小板体积）</el-col>
                <el-col :span="4"><el-input-number   v-model="infoForm.h0303" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6">PDW（血小板分布宽度）</el-col>
                <el-col :span="4"><el-input-number   v-model="infoForm.h0304" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>              
            </span>
        </el-form-item>

        <el-form-item label="4、性激素">
            <el-switch v-model="infoForm.h0401" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.h0401==1">
              <el-row>
                <el-col :span="6">FSH </el-col>
                <el-col :span="4"><el-input-number   v-model="infoForm.h0402" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6">P </el-col>
                <el-col :span="4"><el-input-number   v-model="infoForm.h0403" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6">LH</el-col>
                <el-col :span="4"><el-input-number   v-model="infoForm.h0404" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>  
              <el-row>
                <el-col :span="6">PRL</el-col>
                <el-col :span="4"><el-input-number   v-model="infoForm.h0405" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6">E2</el-col>
                <el-col :span="4"><el-input-number   v-model="infoForm.h0406" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6">TSTO</el-col>
                <el-col :span="4"><el-input-number   v-model="infoForm.h0407" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>               
            </span>
        </el-form-item>

        <el-form-item label="5、AMH">
            <el-switch v-model="infoForm.h0501" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.h0501==1">
              <el-row>                
                <el-col :span="4"><el-input-number  v-model="infoForm.h0502" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>            
            </span>
        </el-form-item>

        <el-form-item label="6、盆腔超声">
            <el-switch v-model="infoForm.h0601" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.h0601==1">
              <el-row>
                <el-col :span="6">子宫内膜 </el-col>
                <el-col :span="4"><el-input-number v-model="infoForm.h0602" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6">间质血流</el-col>
                <el-col :span="4"><el-input-number  v-model="infoForm.h0603" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6">卵巢体积</el-col>
                <el-col :span="4"><el-input-number  v-model="infoForm.h0604" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>  
              <el-row>
                <el-col :span="6">窦卵泡数</el-col>
                <el-col :span="4"><el-input-number  v-model="infoForm.h0605" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>            
            </span>
        </el-form-item>

        <el-form-item label="7、骨成分">
            <el-switch v-model="infoForm.h0701" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.h0701==1">
              <el-row>
                <el-col :span="6">BMD（骨密度） </el-col>                 
                <el-col :span="4"><el-input-number  v-model="infoForm.h0702" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>            
            </span>
        </el-form-item>

        <el-form-item label="8、阴道分泌物检查">
            <el-switch v-model="infoForm.h0801" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.h0801==1">
              <el-row>
                <el-col :span="6">菌群密集度 </el-col>
                <el-col :span="4"><el-input-number v-model="infoForm.h0802" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6">菌群多样性</el-col>
                <el-col :span="4"><el-input-number  v-model="infoForm.h0803" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6">优势菌</el-col>
                <el-col :span="4"><el-input-number  v-model="infoForm.h0804" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>  
              <el-row>
                <el-col :span="6">病原体</el-col>
                <el-col :span="4"><el-input-number  v-model="infoForm.h0805" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6">真菌感染</el-col>
                <el-col :span="4"><el-input-number  v-model="infoForm.h0806" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6">PH</el-col>
                <el-col :span="4"><el-input-number  v-model="infoForm.h0807" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>  
              <el-row>
                <el-col :span="6">微生物态分析</el-col>
                <el-col :span="4"><el-input-number  v-model="infoForm.h0808" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>              
            </span>
        </el-form-item>

        <el-form-item label="9、解脲支原体培养">
            <el-switch v-model="infoForm.h0901" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.h0901==1">
              <el-row>                
                <el-col :span="4"><el-input-number  v-model="infoForm.h0902" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>            
            </span>
        </el-form-item>

        <el-form-item label="10、一般细菌培养及鉴定">
            <el-switch v-model="infoForm.h1001" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.h1001==1">
              <el-row>                
                <el-col :span="4"><el-input-number  v-model="infoForm.h1002" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>            
            </span>
        </el-form-item>

        <el-form-item label="11、各类病原体DNA测定">
            <el-switch v-model="infoForm.h1101" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.h1101==1">
              <el-row>   
                <el-col :span="6">沙眼衣原体</el-col>         
                <el-col :span="4"><el-input-number  v-model="infoForm.h1102" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>            
            </span>
        </el-form-item>

        <el-form-item label="12、宫颈癌筛查">
            <el-switch v-model="infoForm.h1201" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.h1201==1">
              <el-row>
                <el-col :span="6">脱落细胞检查与诊断（HC2） </el-col>                 
                <el-col :span="4"><el-input-number  v-model="infoForm.h1202" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6">液基薄层细胞检测（TCT）</el-col>                 
                <el-col :span="4"><el-input-number  v-model="infoForm.h1203" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>            
            </span>
        </el-form-item>

        <el-form-item label="13、尿常规">
            <el-switch v-model="infoForm.h1301" active-text="有" inactive-text="无"  active-value=1 inactive-value=0></el-switch>
            <span v-show="infoForm.h1301==1">
              <el-row>
                <el-col :span="6">亚硝酸盐 </el-col>                 
                <el-col :span="4"><el-input-number  v-model="infoForm.h1302" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>
              <el-row>
                <el-col :span="6"> 尿白细胞</el-col>                 
                <el-col :span="4"><el-input-number  v-model="infoForm.h1303" :precision=2  :min="0" :max="200" />  </el-col>        
              </el-row>            
            </span>
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
  name: "Relevant",
  data() {
    return {
      infoForm: {
        h0101:0,
        h0102:0,
        h0103:0,
        h0104:0,
        h0105:0,
        h0106:0,
        h0107:0,
        h0108:0,
        h0109:0,
        h0110:0,
        h0111:0,
        h0112:0,
        h0113:0,
        h0114:0,
        h0115:0,
        h0116:0,
        h0117:0,
        h0201:0,
        h0202:0,
        h0203:0,
        h0204:0,
        h0301:0,
        h0302:0,
        h0303:0,
        h0304:0,
        h0401:0,
        h0402:0,
        h0403:0,
        h0404:0,
        h0405:0,
        h0406:0,
        h0407:0,

        h0501:0,
        h0502:0,

        h0601:0,
        h0602:0,
        h0603:0,
        h0604:0,
        h0605:0,
        h0701:0,
        h0702:0,
        h0801:0,
        h0802:0,
        h0803:0,
        h0804:0,
        h0805:0,
        h0806:0,
        h0807:0,
        h0808:0,
        h0901:0,
        h0902:0,
        h1001:0,
        h1002:0,
        h1101:0,
        h1102:0,
        h1201:0,
        h1202:0,
        h1203:0,
        h1301:0,        
        h1302:0,        
        h1303:0
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
      console.log("辅助检查数据: ", data);
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
.prj009-dialog {
  h4 {
    color: cornflowerblue;
  }
}
</style>
