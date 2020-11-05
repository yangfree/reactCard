<template>
  <el-dialog
    title="本次治疗情况"
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
      <el-form-item label="1、此病人辨证分型为">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.k01[0]">气滞</el-checkbox>
        <el-checkbox v-model="infoForm.k01[1]">血瘀</el-checkbox>
        <el-checkbox v-model="infoForm.k01[2]">寒凝</el-checkbox>
        <el-checkbox v-model="infoForm.k01[3]">痰湿</el-checkbox>
        <el-checkbox v-model="infoForm.k01[4]">湿热</el-checkbox>
        <el-checkbox v-model="infoForm.k01[5]">热郁</el-checkbox>
        <el-checkbox v-model="infoForm.k01[6]">气虚</el-checkbox>
        <el-checkbox v-model="infoForm.k01[7]">血虚</el-checkbox>
        <el-checkbox v-model="infoForm.k01[8]">肾虚</el-checkbox>
        <el-checkbox v-model="infoForm.k01[9]">脾虚</el-checkbox>
        <el-checkbox v-model="infoForm.k01[10]">阴虚</el-checkbox>
      </el-form-item>

      <el-form-item label="2. 此次治疗采取哪些治疗方式？ （可多选）">
        <el-checkbox v-model="infoForm.k0201[0]">西药治疗</el-checkbox>
        <el-checkbox v-model="infoForm.k0201[1]">建议手术</el-checkbox>
        <el-checkbox v-model="infoForm.k0201[2]">中药汤剂治疗</el-checkbox>
        <el-checkbox v-model="infoForm.k0201[3]">中成药治疗</el-checkbox>
        <el-checkbox v-model="infoForm.k0201[4]">其他</el-checkbox>
        <el-input v-model="infoForm.k0202" maxlength="50" show-word-limit placeholder="其他补充"/>   
      </el-form-item>

     <el-form-item label="3. 若有手术指征，建议采取哪种手术治疗？（可多选）">
        <el-checkbox v-model="infoForm.k0301[0]">肌瘤切除术</el-checkbox>
        <el-checkbox v-model="infoForm.k0301[1]">子宫楔形切除术</el-checkbox>
        <el-checkbox v-model="infoForm.k0301[2]">子宫动脉栓塞术</el-checkbox>
        <el-checkbox v-model="infoForm.k0301[3]">高强度聚焦超声（HIFU）</el-checkbox>
        <el-checkbox v-model="infoForm.k0301[4]">射频消融术</el-checkbox>
        <el-checkbox v-model="infoForm.k0301[5]">全子宫切除术</el-checkbox>
        <el-checkbox v-model="infoForm.k0301[6]">其他</el-checkbox>
        <el-input v-model="infoForm.k0302" maxlength="50" show-word-limit placeholder="其他补充"/>
      </el-form-item>

<h3>认知及治疗意愿调查</h3>
      
    <el-form-item label="4. 您认为">
      <el-row>
        母亲有子宫肌瘤，女儿患子宫肌瘤的风险会增加吗？
      </el-row>
      <el-row>
        <el-radio v-model="infoForm.k04" label="1">会</el-radio>
        <el-radio v-model="infoForm.k04" label="2">不会</el-radio>
        <el-radio v-model="infoForm.k04" label="3">不知道</el-radio>
      </el-row>
    </el-form-item>

     <el-form-item label="5. 您认为">
      <el-row>
        子宫肌瘤有转变成恶性肿瘤、癌症的可能吗？
      </el-row>
      <el-row>
        <el-radio v-model="infoForm.k05" label="1">有</el-radio>
        <el-radio v-model="infoForm.k05" label="2">没有</el-radio>
        <el-radio v-model="infoForm.k05" label="3">不知道</el-radio>
      </el-row>
    </el-form-item>

     <el-form-item label="6. 您认为">
      <el-row>
        子宫肌瘤属于一种慢性疾病吗？
      </el-row>
      <el-row>
        <el-radio v-model="infoForm.k06" label="1">有</el-radio>
        <el-radio v-model="infoForm.k06" label="2">没有</el-radio>
        <el-radio v-model="infoForm.k06" label="3">不知道</el-radio>
      </el-row>
    </el-form-item>
     <el-form-item label="7.您认为 ">
      <el-row>
        子宫肌瘤需要定期复查，进行长期管理吗？
      </el-row>
      <el-row>
        <el-radio v-model="infoForm.k07" label="1">需要</el-radio>
        <el-radio v-model="infoForm.k07" label="2">不需要</el-radio>
        <el-radio v-model="infoForm.k07" label="3">不知道</el-radio>
      </el-row>
    </el-form-item>
     <el-form-item label="8.您认为 ">
      <el-row>
        子宫肌瘤会影响生育功能吗？
      </el-row>
      <el-row>
        <el-radio v-model="infoForm.k08" label="1">会</el-radio>
        <el-radio v-model="infoForm.k08" label="2">不会</el-radio>
        <el-radio v-model="infoForm.k08" label="3">不知道</el-radio>
      </el-row>
    </el-form-item>
     <el-form-item label="9.您认为 ">
      <el-row>
        子宫肌瘤保守手术治疗后会复发吗？
      </el-row>
      <el-row>
        <el-radio v-model="infoForm.k09" label="1">会</el-radio>
        <el-radio v-model="infoForm.k09" label="2">不会</el-radio>
        <el-radio v-model="infoForm.k09" label="3">不知道</el-radio>
      </el-row>
    </el-form-item>
     <el-form-item label="10.您认为 ">
      <el-row>
        子宫肌瘤保守手术治疗后需要继续药物治疗吗？
      </el-row>
      <el-row>
        <el-radio v-model="infoForm.k10" label="1">需要</el-radio>
        <el-radio v-model="infoForm.k10" label="2">不需要</el-radio>
        <el-radio v-model="infoForm.k10" label="3">不知道</el-radio>
      </el-row>
    </el-form-item>
    <el-form-item label="11.您认为 ">
      <el-row>
        子宫肌瘤患者需要多久进行一次复查？
      </el-row>
      <el-row>
        <el-radio v-model="infoForm.k11" label="1">3-6个月1次</el-radio>
        <el-radio v-model="infoForm.k11" label="2">1年1次</el-radio>
        <el-radio v-model="infoForm.k11" label="3">2-3年1次</el-radio>
        <el-radio v-model="infoForm.k11" label="4">无需复查</el-radio>
      </el-row>
    </el-form-item>       
    <el-form-item label="12.您认为 ">
      <el-row>
        子宫肌瘤患者手术治疗会影响卵巢功能吗？
      </el-row>
      <el-row>
        <el-radio v-model="infoForm.k12" label="1">有影响</el-radio>
        <el-radio v-model="infoForm.k12" label="2">没影响</el-radio>
        <el-radio v-model="infoForm.k12" label="3">不知道</el-radio>
      </el-row>
    </el-form-item> 

    <el-form-item label="13. 您认为（可多选）">
       <el-row>
        子宫肌瘤患者不宜食用下列哪些食物或保健品？
       </el-row>
      <el-row>
        <el-checkbox v-model="infoForm.k13[0]">豆、豆制品</el-checkbox>
        <el-checkbox v-model="infoForm.k13[1]">蜂王浆</el-checkbox>
        <el-checkbox v-model="infoForm.k13[2]">冷饮</el-checkbox>
        <el-checkbox v-model="infoForm.k13[3]">胎盘类制品</el-checkbox>
        <el-checkbox v-model="infoForm.k13[4]">雪蛤油</el-checkbox>
        <el-checkbox v-model="infoForm.k13[5]">阿胶</el-checkbox>
        <el-checkbox v-model="infoForm.k13[6]">燕窝</el-checkbox>
        <el-checkbox v-model="infoForm.k13[7]">海鲜</el-checkbox>
        <el-checkbox v-model="infoForm.k13[8]">成分不明的保健品</el-checkbox>
        <el-checkbox v-model="infoForm.k13[9]">不知道</el-checkbox>
      </el-row>  
    </el-form-item>

    <el-form-item label="14. 您认为（可多选）">
       <el-row>
        子宫肌瘤患者在生活中需要注意以下哪些方面？
       </el-row>
      <el-row>
        <el-checkbox v-model="infoForm.k14[0]">规律作息</el-checkbox>
        <el-checkbox v-model="infoForm.k14[1]">适当运动</el-checkbox>
        <el-checkbox v-model="infoForm.k14[2]">调整情绪，保持心态平和</el-checkbox>
        <el-checkbox v-model="infoForm.k14[3]">尽早生育</el-checkbox>
        <el-checkbox v-model="infoForm.k14[4]">忌食或少食生冷寒凉（水果、酸奶、凉菜等）</el-checkbox>
        <el-checkbox v-model="infoForm.k14[5]">定期复查</el-checkbox>
        <el-checkbox v-model="infoForm.k14[6]">不知道</el-checkbox>
      </el-row>  
    </el-form-item>

    <el-form-item label="15. 您通过（可多选）">
       <el-row>
        什么途径了解子宫肌瘤？
       </el-row>
      <el-row>
        <el-checkbox v-model="infoForm.k15[0]">微信公众号、APP等新媒体</el-checkbox>
        <el-checkbox v-model="infoForm.k15[1]">搜索引擎、贴吧、知乎等门户网站</el-checkbox>
        <el-checkbox v-model="infoForm.k15[2]">科普书</el-checkbox>
        <el-checkbox v-model="infoForm.k15[3]">妇科教材、专业文献</el-checkbox>
        <el-checkbox v-model="infoForm.k15[4]">妇科医生的科普讲座</el-checkbox>
        <el-checkbox v-model="infoForm.k15[5]">广播、电视节目</el-checkbox>
        <el-checkbox v-model="infoForm.k15[6]">妇科专业医生面对面交流</el-checkbox>
        <el-checkbox v-model="infoForm.k15[7]">病友交流</el-checkbox>
      </el-row>  
    </el-form-item>

    <el-form-item label="16. 您倾向于（可多选）">
       <el-row>
        去什么级别的医疗保健机构治疗此病？
       </el-row>
      <el-row>
        <el-checkbox v-model="infoForm.k16[0]">综合性大医院</el-checkbox>
        <el-checkbox v-model="infoForm.k16[1]">妇幼保健院等专科医院</el-checkbox>
        <el-checkbox v-model="infoForm.k16[2]">中医院</el-checkbox>
        <el-checkbox v-model="infoForm.k16[3]">社区医院</el-checkbox>
        <el-checkbox v-model="infoForm.k16[4]">民营医院</el-checkbox>
        <el-checkbox v-model="infoForm.k16[5]">个体诊所</el-checkbox>
      </el-row>  
    </el-form-item>

    <el-form-item label="17. 您倾向于（可多选）">
       <el-row>
        接受以下哪些治疗？
       </el-row>
      <el-row>
        <el-checkbox v-model="infoForm.k17[0]">中医药治疗</el-checkbox>
        <el-checkbox v-model="infoForm.k17[1]">西药治疗</el-checkbox>
        <el-checkbox v-model="infoForm.k17[2]">手术治疗</el-checkbox>
        <el-checkbox v-model="infoForm.k17[3]">定期检查</el-checkbox>
        <el-checkbox v-model="infoForm.k17[4]">不治疗</el-checkbox>
      </el-row>  
    </el-form-item>

     <el-form-item label="18. 您倾向于（可多选）">
       <el-row>
        使用以下哪些治疗方式，若愿意使用中医药治疗？
       </el-row>
      <el-row>
        <el-checkbox v-model="infoForm.k1801[0]">中药汤剂</el-checkbox>
        <el-checkbox v-model="infoForm.k1801[1]">中成药</el-checkbox>
        <el-checkbox v-model="infoForm.k1801[2]">针刺</el-checkbox>
        <el-checkbox v-model="infoForm.k1801[3]">艾灸</el-checkbox>
        <el-checkbox v-model="infoForm.k1801[4]">其他</el-checkbox>
        <el-input v-model="infoForm.k1802" maxlength="50" show-word-limit placeholder="其他说明"/>   
      </el-row>  
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
import { apiUpdatePatientDataForm } from "@/api/api-prj00g";

export default {
  name: "CureStreatmentForm",
  data() {
    return {
      infoForm: {
        k01: [false, false, false, false, false,   false, false, false, false,false,    false],
        k0201:  [false, false, false, false, false],
        k0202: '',
        k0301:  [false, false, false, false, false,   false, false],
        k0302: '',
        k04: 0,
        k05: 0,
        k06: 0,
        k07: 0,
        k08: 0,
        k09: 0,
        k10: 0,
        k11: 0,
        k12: 0,       
        k13: [false, false, false, false, false,   false, false, false, false, false],
        k14: [false, false, false, false, false,   false, false],
        k15: [false, false, false, false, false,   false, false,false],
        k16: [false, false, false, false, false, false],
        k17: [false, false, false, false, false],
        k1801: [false, false, false, false, false],
        k1802:''      
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
