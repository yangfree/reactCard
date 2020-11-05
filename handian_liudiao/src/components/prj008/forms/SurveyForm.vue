<template>
  <el-dialog
    title="就诊时病情概要"
    class="my-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form ref="surveyForm" :model="infoForm" label-width="250px" label-position="left">
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
      <p></p>
      <el-alert
        v-if="!isOwnedByUser"
        effect="dark"
        title="此条信息为其他用户创建，您无法修改"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <!-- 表格内容开始 -->
      <!-- 若为内异症 -->
        <h3>一：主症</h3>
        <el-form-item label="1、主诉：">
          <el-row  style="margin-bottom: 10px">
            <el-radio v-model="infoForm.b0101" label="1">停经</el-radio>
            <el-radio v-model="infoForm.b0101" label="2">胚胎移植术后</el-radio>
            <el-radio v-model="infoForm.b0101" label="3">人工授精术后</el-radio>  
          </el-row>
          <el-row style="margin-bottom: 10px">
             人工授精术后 &nbsp;<el-input-number v-model="infoForm.b0102" :min="0" :max="10" />&nbsp; 天，
            （和/或）阴道出血 &nbsp;<el-input-number v-model="infoForm.b0103" :min="0" :max="10" />&nbsp;天，
          </el-row>
          <el-row style="margin-bottom: 10px">            
            （和/或）腰酸&nbsp; <el-input-number v-model="infoForm.b0104" :min="0" :max="10" ></el-input-number>&nbsp;天，
            （和/或）小腹隐痛 &nbsp;<el-input-number v-model="infoForm.b0105" :min="0" :max="10" ></el-input-number>&nbsp; 天   
          </el-row>  
        </el-form-item>

        <el-form-item label="2、初诊日期:">
          <el-date-picker  v-model="infoForm.b0201" type="date" placeholder="选择日期">     </el-date-picker>
        </el-form-item>

        <el-form-item label="2-1、末次行经日期:">
          <el-date-picker  v-model="infoForm.b0202" type="date" placeholder="选择日期">     </el-date-picker>
        </el-form-item>

        <el-form-item label="2-2、若月经不规律,校正后约停经__天:">
          <el-input-number v-model="infoForm.b0203" :min="0" :max="36500" ></el-input-number>
        </el-form-item>

        <el-form-item label="3、阴道出血：">
          <el-radio v-model="infoForm.b0301" label="1">无</el-radio>
          <el-radio v-model="infoForm.b0301" label="2">有</el-radio>
        </el-form-item>

        <el-form-item label="3-1、阴道出血量：">
          <el-radio v-model="infoForm.b0302" label="1">量少（仅内裤可见，不需卫生护垫等） </el-radio>
          <el-radio v-model="infoForm.b0302" label="2">量中等（每天约1-2片卫生护垫）</el-radio>
          <el-radio v-model="infoForm.b0302" label="3">量多（每天约1-2片日用卫生巾）</el-radio>
          <el-radio v-model="infoForm.b0302" label="4">其他</el-radio>
          <el-input v-model="infoForm.b0303" maxlength="50" show-word-limit></el-input>
        </el-form-item>

        <el-form-item label="3-2、阴道出血血颜色：">
          <el-radio v-model="infoForm.b0304" label="1">淡红</el-radio>
          <el-radio v-model="infoForm.b0304" label="2">鲜红</el-radio>
          <el-radio v-model="infoForm.b0304" label="3">暗红</el-radio>
          <el-radio v-model="infoForm.b0304" label="4">紫红</el-radio>
          <el-radio v-model="infoForm.b0304" label="5">紫黯</el-radio>
          <el-radio v-model="infoForm.b0304" label="6">紫黑</el-radio>
          <el-radio v-model="infoForm.b0304" label="7">褐色</el-radio>
          <el-radio v-model="infoForm.b0304" label="8">其他</el-radio>
          <el-input v-model="infoForm.b0305" maxlength="50" show-word-limit></el-input>
        </el-form-item>

        <el-form-item label="3-3、阴道血质地：">
          <el-radio v-model="infoForm.b0306" label="1">正常 </el-radio>
          <el-radio v-model="infoForm.b0306" label="2">粘稠</el-radio>
          <el-radio v-model="infoForm.b0306" label="3">清稀</el-radio>
          <el-radio v-model="infoForm.b0306" label="4">无血块</el-radio>
          <el-radio v-model="infoForm.b0306" label="5">偶有血块 </el-radio>
          <el-radio v-model="infoForm.b0306" label="6">经常出现血块</el-radio>
          <el-radio v-model="infoForm.b0306" label="7">夹有组织物</el-radio>
        </el-form-item>

        <el-form-item label="3-4、子宫附件超声宫腔积液：">
          <el-radio v-model="infoForm.b0307" label="1">无 </el-radio>
          <el-radio v-model="infoForm.b0307" label="2">有:具体积液情况</el-radio>
          <el-input v-model="infoForm.b0308" maxlength="50" show-word-limit placeholder="具体积液情况"></el-input>
        </el-form-item>

        <el-form-item label="4、腰酸:">
          <el-radio v-model="infoForm.b0401" label="1">无</el-radio>
          <el-radio v-model="infoForm.b0401" label="2">腰酸痛</el-radio>
          <el-radio v-model="infoForm.b0401" label="3">腰冷痛</el-radio>
          <el-radio v-model="infoForm.b0401" label="4">腰痛伴下坠感</el-radio>
          <el-radio v-model="infoForm.b0401" label="5">其他</el-radio>         
        </el-form-item>

        <el-form-item label="5、小腹隐痛:">
          <el-radio v-model="infoForm.b0501" label="1">无</el-radio>
          <el-radio v-model="infoForm.b0501" label="2">小腹坠胀</el-radio>
          <el-radio v-model="infoForm.b0501" label="3">小腹隐痛</el-radio>
          <el-radio v-model="infoForm.b0501" label="4">小腹胀痛</el-radio>
          <el-radio v-model="infoForm.b0501" label="5">小腹冷痛</el-radio>
          <el-radio v-model="infoForm.b0501" label="6">小腹刺痛</el-radio>
          <el-radio v-model="infoForm.b0501" label="7">疼痛拒按</el-radio>
          <el-radio v-model="infoForm.b0501" label="8">疼痛喜按</el-radio>
          <el-radio v-model="infoForm.b0501" label="9">腹痛得热痛减</el-radio>
          <el-radio v-model="infoForm.b0501" label="10">其他</el-radio>
          <el-input v-model="infoForm.b0502" maxlength="50" show-word-limit placeholder="其他"></el-input>                     
        </el-form-item>


        <h3>二：就诊时全伴随症状</h3>
        <el-form-item label="6、寒热及汗出:">
          <el-radio v-model="infoForm.b06" label="1">正常</el-radio>
          <el-radio v-model="infoForm.b06" label="2">畏寒</el-radio>
          <el-radio v-model="infoForm.b06" label="3">畏热</el-radio>
          <el-radio v-model="infoForm.b06" label="4">五心烦热</el-radio>
          <el-radio v-model="infoForm.b06" label="5">潮热</el-radio>
          <el-radio v-model="infoForm.b06" label="6">低热不退</el-radio>
          <el-radio v-model="infoForm.b06" label="7">动则汗出</el-radio>
          <el-radio v-model="infoForm.b06" label="8">夜卧汗出,醒后汗止</el-radio>
          <el-radio v-model="infoForm.b06" label="9">烘热汗出</el-radio>
          <el-radio v-model="infoForm.b06" label="10">其他</el-radio>
        </el-form-item>

        <el-form-item label="7.面色:">
          <el-radio v-model="infoForm.b07" label="1">正常</el-radio>
          <el-radio v-model="infoForm.b07" label="2">淡白无华</el-radio>
          <el-radio v-model="infoForm.b07" label="3">苍白</el-radio>
          <el-radio v-model="infoForm.b07" label="4">青白</el-radio>
          <el-radio v-model="infoForm.b07" label="5">白而浮肿</el-radio>
          <el-radio v-model="infoForm.b07" label="6">萎黄</el-radio>
          <el-radio v-model="infoForm.b07" label="7">黄肿</el-radio>
          <el-radio v-model="infoForm.b07" label="8">潮红</el-radio>
          <el-radio v-model="infoForm.b07" label="9">酶黯</el-radio>
          <el-radio v-model="infoForm.b07" label="10">面有黯斑</el-radio>
          <el-radio v-model="infoForm.b07" label="11">其他</el-radio>
        </el-form-item>

        <el-form-item label="8.头面部:">
          <el-radio v-model="infoForm.b08" label="1">正常</el-radio>
          <el-radio v-model="infoForm.b08" label="2">头晕</el-radio>
          <el-radio v-model="infoForm.b08" label="3">头痛</el-radio>
          <el-radio v-model="infoForm.b08" label="4">头沉重</el-radio>
          <el-radio v-model="infoForm.b08" label="5">眼花</el-radio>
          <el-radio v-model="infoForm.b08" label="6">目眩</el-radio>
          <el-radio v-model="infoForm.b08" label="7">目涩</el-radio>
          <el-radio v-model="infoForm.b08" label="8">目痒</el-radio>
          <el-radio v-model="infoForm.b08" label="9">耳鸣</el-radio>
          <el-radio v-model="infoForm.b08" label="10">耳聋</el-radio>
          <el-radio v-model="infoForm.b08" label="11">听力下降</el-radio>
          <el-radio v-model="infoForm.b08" label="12">晨起眼睑浮肿</el-radio>
          <el-radio v-model="infoForm.b08" label="13">其他</el-radio>
        </el-form-item>

        <el-form-item label="9.口咽部:">
          <el-radio v-model="infoForm.b09" label="1">正常</el-radio>
          <el-radio v-model="infoForm.b09" label="2">口苦</el-radio>
          <el-radio v-model="infoForm.b09" label="3">口干</el-radio>
          <el-radio v-model="infoForm.b09" label="4">口臭</el-radio>
          <el-radio v-model="infoForm.b09" label="5">口粘</el-radio>
          <el-radio v-model="infoForm.b09" label="6">口干不欲饮</el-radio>
          <el-radio v-model="infoForm.b09" label="7">咽痛</el-radio>
          <el-radio v-model="infoForm.b09" label="8">咽痒</el-radio>
          <el-radio v-model="infoForm.b09" label="9">咽部异物感</el-radio>
          <el-radio v-model="infoForm.b09" label="10">其他</el-radio>
        </el-form-item>

        <el-form-item label="10.胸胁及语音:">
          <el-radio v-model="infoForm.b10" label="1">正常</el-radio>
          <el-radio v-model="infoForm.b10" label="2">心慌</el-radio>
          <el-radio v-model="infoForm.b10" label="3">气短</el-radio>
          <el-radio v-model="infoForm.b10" label="4">心胸烦闷</el-radio>
          <el-radio v-model="infoForm.b10" label="5">胸胁胀痛</el-radio>
          <el-radio v-model="infoForm.b10" label="6">胸胁刺痛</el-radio>
          <el-radio v-model="infoForm.b10" label="7">乳房胀痛</el-radio>
          <el-radio v-model="infoForm.b10" label="8">乳房刺痛</el-radio>
          <el-radio v-model="infoForm.b10" label="9">喜叹息</el-radio>
          <el-radio v-model="infoForm.b10" label="10">少气懒言</el-radio>
          <el-radio v-model="infoForm.b10" label="11">其他</el-radio>
        </el-form-item>

        <el-form-item label="11.四肢: ">
          <el-radio v-model="infoForm.b11" label="1">正常</el-radio>
          <el-radio v-model="infoForm.b11" label="2">乏力</el-radio>
          <el-radio v-model="infoForm.b11" label="3">麻木</el-radio>
          <el-radio v-model="infoForm.b11" label="4">酸软</el-radio>
          <el-radio v-model="infoForm.b11" label="5">困重</el-radio>
          <el-radio v-model="infoForm.b11" label="6">肢冷</el-radio>
          <el-radio v-model="infoForm.b11" label="7">浮肿</el-radio>
          <el-radio v-model="infoForm.b11" label="8">手足心热</el-radio>
          <el-radio v-model="infoForm.b11" label="9">其他</el-radio>
        </el-form-item>

        <el-form-item label="12.饮食: ">
          <el-radio v-model="infoForm.b12" label="1">正常</el-radio>
          <el-radio v-model="infoForm.b12" label="2">食欲不振</el-radio>
          <el-radio v-model="infoForm.b12" label="3">多食易饥</el-radio>
          <el-radio v-model="infoForm.b12" label="4">偏食或挑食</el-radio>
          <el-radio v-model="infoForm.b12" label="5">食后胃脘不舒</el-radio>
          <el-radio v-model="infoForm.b12" label="6">恶心欲呕</el-radio>
          <el-radio v-model="infoForm.b12" label="7">嗳气反酸</el-radio>
          <el-radio v-model="infoForm.b12" label="8">其他</el-radio>
        </el-form-item>

        <el-form-item label="13-1.睡眠,每日睡眠时间: ">
          <el-radio v-model="infoForm.b1301" label="1">小于4小时</el-radio>
          <el-radio v-model="infoForm.b1301" label="2">4-6小时</el-radio>
          <el-radio v-model="infoForm.b1301" label="3">7-8小时</el-radio>
          <el-radio v-model="infoForm.b1301" label="4">>8小时</el-radio>
        </el-form-item>

        <el-form-item label="13-2.睡眠,伴随症状: ">
          <el-radio v-model="infoForm.b1302" label="1">无</el-radio>
          <el-radio v-model="infoForm.b1302" label="2">多梦</el-radio>
          <el-radio v-model="infoForm.b1302" label="3">性梦</el-radio>
          <el-radio v-model="infoForm.b1302" label="4">易醒</el-radio>
          <el-radio v-model="infoForm.b1302" label="5">入睡困难</el-radio>
          <el-radio v-model="infoForm.b1302" label="6">其他</el-radio>
          <el-input v-model="infoForm.b1303" maxlength="50" show-word-limit placeholder="其他"></el-input> 
        </el-form-item>

        <el-form-item label="14.性欲: ">
          <el-radio v-model="infoForm.b14" label="1">正常</el-radio>
          <el-radio v-model="infoForm.b14" label="2">性欲旺盛</el-radio>
          <el-radio v-model="infoForm.b14" label="3">性欲减退</el-radio>
        </el-form-item>

        <el-form-item label="15.大便: ">
          <el-radio v-model="infoForm.b15" label="1">正常</el-radio>
          <el-radio v-model="infoForm.b15" label="2">便干</el-radio>
          <el-radio v-model="infoForm.b15" label="3">质稀</el-radio>
          <el-radio v-model="infoForm.b15" label="4">时干时稀</el-radio>
          <el-radio v-model="infoForm.b15" label="5">泄泻</el-radio>
          <el-radio v-model="infoForm.b15" label="6">天亮前泄泻</el-radio>
          <el-radio v-model="infoForm.b15" label="7">质黏,排不尽</el-radio>
          <el-radio v-model="infoForm.b15" label="8">夹杂未消化食物</el-radio>
          <el-radio v-model="infoForm.b15" label="9">其他</el-radio>
        </el-form-item>

        <el-form-item label="16.小便:">
          <el-radio v-model="infoForm.b16" label="1">正常</el-radio>
          <el-radio v-model="infoForm.b16" label="2">短黄</el-radio>
          <el-radio v-model="infoForm.b16" label="3">清长</el-radio>
          <el-radio v-model="infoForm.b16" label="4">频数</el-radio>
          <el-radio v-model="infoForm.b16" label="5">尿急</el-radio>
          <el-radio v-model="infoForm.b16" label="6">尿痛</el-radio>
          <el-radio v-model="infoForm.b16" label="7">余沥不尽</el-radio>
          <el-radio v-model="infoForm.b16" label="8">少尿</el-radio>
          <el-radio v-model="infoForm.b16" label="9">夜尿频</el-radio>
          <el-radio v-model="infoForm.b16" label="10">其他</el-radio>
        </el-form-item>

        <h3>三: 以下在医生指导下填写</h3>

        <el-form-item label="17.舌质：">
          <el-radio v-model="infoForm.b1701" label="1">淡红</el-radio>
          <el-radio v-model="infoForm.b1701" label="2">淡白</el-radio>
          <el-radio v-model="infoForm.b1701" label="3">红</el-radio>
          <el-radio v-model="infoForm.b1701" label="4">紫暗有瘀点或瘀斑</el-radio>
          <el-radio v-model="infoForm.b1701" label="5">其他</el-radio>
          <el-input v-model="infoForm.b1702" maxlength="50" show-word-limit placeholder="其他"></el-input> 
        </el-form-item> 

        <el-form-item label="18.舌体：">
          <el-radio v-model="infoForm.b1801" label="1">正常</el-radio>
          <el-radio v-model="infoForm.b1801" label="2">瘦小</el-radio>
          <el-radio v-model="infoForm.b1801" label="3">胖大</el-radio>
          <el-radio v-model="infoForm.b1801" label="4">有齿痕</el-radio>
          <el-radio v-model="infoForm.b1801" label="5">有裂纹</el-radio>
          <el-radio v-model="infoForm.b1801" label="6">其他</el-radio>
          <el-input v-model="infoForm.b1802" maxlength="50" show-word-limit placeholder="其他"></el-input> 
        </el-form-item>    

        <el-form-item label="19.舌苔：">
          <el-radio v-model="infoForm.b1901" label="1">白</el-radio>
          <el-radio v-model="infoForm.b1901" label="2">黄</el-radio>
          <el-radio v-model="infoForm.b1901" label="3">薄</el-radio>
          <el-radio v-model="infoForm.b1901" label="4">厚</el-radio>
          <el-radio v-model="infoForm.b1901" label="5">腻</el-radio>
          <el-radio v-model="infoForm.b1901" label="6">润</el-radio>
          <el-radio v-model="infoForm.b1901" label="7">干燥</el-radio>
          <el-radio v-model="infoForm.b1901" label="8">少苔</el-radio>
          <el-radio v-model="infoForm.b1901" label="9">花剥</el-radio>
          <el-radio v-model="infoForm.b1901" label="10">无苔</el-radio>
          <el-radio v-model="infoForm.b1901" label="11">其他</el-radio>
          <el-input v-model="infoForm.b1902" maxlength="50" show-word-limit placeholder="其他"></el-input> 
        </el-form-item>

        <el-form-item label="20.脉象：">
          <el-radio v-model="infoForm.b2001" label="1">浮</el-radio>
          <el-radio v-model="infoForm.b2001" label="2">沉</el-radio>
          <el-radio v-model="infoForm.b2001" label="3">滑</el-radio>
          <el-radio v-model="infoForm.b2001" label="4">数</el-radio>
          <el-radio v-model="infoForm.b2001" label="5">弦</el-radio>
          <el-radio v-model="infoForm.b2001" label="6">细</el-radio>
          <el-radio v-model="infoForm.b2001" label="7">弱</el-radio>
          <el-radio v-model="infoForm.b2001" label="8">缓</el-radio>
          <el-radio v-model="infoForm.b2001" label="9">迟</el-radio>
          <el-radio v-model="infoForm.b2001" label="10">涩</el-radio>
          <el-radio v-model="infoForm.b2001" label="11">紧</el-radio>
          <el-radio v-model="infoForm.b2001" label="12">其他</el-radio>
          <el-input v-model="infoForm.b2002" maxlength="50" show-word-limit placeholder="其他"></el-input> 
        </el-form-item>

    </el-form>
    <span slot="footer">
      <el-button
        type="primary"
        :disabled="check_status=='审核通过'"
        v-if="exist"
        @click="updateSummaryForm"
      >确定</el-button>
      <el-button type="primary" v-else @click="createSummaryForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiGetHideCode } from "@/api/api-prj008";
export default {
  name: "SummaryForm",
  data() {
    return {
      infoForm: {
        b0101: "",
        b0102: 0,
        b0103: 0,
        b0104: 0,
        b0105: 0,
        b0201: "",
        b0202: "",
        b0203: 0,

        b0301: 0,
        b0302: 0,
        b0303: "",
        b0304: 0,
        b0305: "",
        b0306: 0,
        b0307: 0,
        b0308: "",        
        b0401: 0,
        b0501: 0,
        b0502: "",
        b06: 0,
        b07: 0,
        b08: 0,
        b09: 0,
        b10: 0,
        b11: 0,
        b12: 0,
        b1301: 0,
        b1302: 0,
        b1303: "",
        b14: 0,   
        b15: 0,    
        b16: 0,        
        b1701: 0,
        b1702: "",
        b1801: 0,
        b1802: "",
        b1901: 0,
        b1902: "",
        b2001: 0,
        b2002: ""
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
      console.log("chapter 02 :", data);
      this.dialogVisible = true;
      this.check_status = data.check_status;
      this.isOwnedByUser = data.isOwnedByUser;
      this.formName = data.formName;
      this._id = data._id;
      if ("id" in data.result) {
        this.infoForm = data.result;
      }
    });
  },
  methods: {
      updateSummaryForm() {
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

  },
};
</script>
