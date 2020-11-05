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

      <div v-show="hideOrShow.j001_j0058 === '0' ? false : true">
        <!-- <h4>若为內异症：</h4> -->

        <el-form-item label="1、最近一次B超">
          <el-radio-group v-model="infoForm.j001" @change="getExaminationHideCodeOne">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testOne.j002_j005 === '0' ? false : true">
          <el-form-item label="B超检查日期:">
            <el-date-picker
              v-model="infoForm.j002"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="左侧卵巢巧克力囊肿大小描述（cm）:">
            <el-input v-model="infoForm.j003"></el-input>
          </el-form-item>

          <el-form-item label="右侧卵巢巧克力囊肿大小描述（cm）:">
            <el-input v-model="infoForm.j004"></el-input>
          </el-form-item>

          <el-form-item label="影像学提示:">
            <el-input v-model="infoForm.j005"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="2、抗苗勒管激素">
          <el-radio-group v-model="infoForm.j0051" @change="getExaminationHideCodeTwo">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testTwo.j0052_j0054 === '0' ? false : true">
          <el-form-item label="检查日期:">
            <el-date-picker
              v-model="infoForm.j0052"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="AMH:">
            <el-input v-model="infoForm.j0053"></el-input>ng/ml
          </el-form-item>
          <el-form-item label="参考值:">
            <el-input v-model="infoForm.j0054"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="3、肿瘤标志物">
          <el-radio-group v-model="infoForm.j0055" @change="getExaminationHideCodeThree">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testThree.j0056_j0058 === '0' ? false : true">
          <el-form-item label="检查日期:">
            <el-date-picker
              v-model="infoForm.j0056"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="CA125__U/ml">
            <el-input-number v-model="infoForm.j0057"></el-input-number>U/ml
            <!-- <el-input style="width:150px" v-model="infoForm.j0057"></el-input>U/ml -->
          </el-form-item>
          <el-form-item label="CA199__U/ml">
            <el-input-number v-model="infoForm.j0058"></el-input-number>U/ml
            <!-- <el-input style="width:150px" v-model="infoForm.j0058"></el-input>U/ml -->
          </el-form-item>
        </div>
      </div>

      <div v-show="hideOrShow.j006_j0178 === '0' ? false : true">
        <!-- <h4>若为腺肌病：</h4> -->
        <el-form-item label="1、最近一次B超">
          <el-radio-group v-model="infoForm.j006" @change="getExaminationHideCodeFour">
            <el-radio v-model="infoForm.j006" label="1">有</el-radio>
            <el-radio v-model="infoForm.j006" label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testFour.j007_j011 === '0' ? false : true">
          <el-form-item label="B超检查日期:">
            <el-date-picker
              v-model="infoForm.j007"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="子宫大小(cm):">
            <el-input-number v-model="infoForm.j0081"></el-input-number>x
            <el-input-number v-model="infoForm.j0082"></el-input-number>x
            <el-input-number v-model="infoForm.j0083"></el-input-number>cm
            <!-- <el-input style="width:80px" v-model="infoForm.j0081"></el-input>x
            <el-input style="width:80px" v-model="infoForm.j0082"></el-input>x
            <el-input style="width:80px" v-model="infoForm.j0083"></el-input>cm-->
          </el-form-item>

          <el-form-item label="有无腺肌瘤？">
            <el-radio-group v-model="infoForm.j009" @change="getExaminationHideCodeFive">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </el-form-item>

          <div v-show="testFive.j010 === '0' ? false : true">
            <el-form-item label="腺肌瘤大小描述(cm):">
              <el-input v-model="infoForm.j010"></el-input>
            </el-form-item>
          </div>

          <el-form-item label="影像学提示:">
            <el-input v-model="infoForm.j011"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="2、最近一次核磁">
          <el-radio-group v-model="infoForm.j012" @change="getExaminationHideCodeSix">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testSix.j013_j017 === '0' ? false : true">
          <el-form-item label="核磁检查日期:">
            <el-date-picker
              v-model="infoForm.j013"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="子宫大小(cm):">
            <el-input-number v-model="infoForm.j0141"></el-input-number>x
            <el-input-number v-model="infoForm.j0142"></el-input-number>x
            <el-input-number v-model="infoForm.j0143"></el-input-number>cm
            <!-- <el-input style="width:80px" v-model="infoForm.j0141"></el-input>x
            <el-input style="width:80px" v-model="infoForm.j0142"></el-input>x
            <el-input style="width:80px" v-model="infoForm.j0143"></el-input>cm-->
          </el-form-item>

          <el-form-item label="有无腺肌瘤？">
            <el-radio-group v-model="infoForm.j015" @change="getExaminationHideCodeSeven">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </el-form-item>

          <div v-show="testSeven.j016 === '0' ? false : true">
            <el-form-item label="腺肌瘤大小描述(cm):">
              <el-input v-model="infoForm.j016"></el-input>
            </el-form-item>
          </div>

          <el-form-item label="影像学提示:">
            <el-input v-model="infoForm.j017"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="3、抗苗勒管激素">
          <el-radio-group v-model="infoForm.j0171" @change="getExaminationHideCodeEight">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testEight.j0172_j0174 === '0' ? false : true">
          <el-form-item label="检查日期:">
            <el-date-picker
              v-model="infoForm.j0172"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="AMH:">
            <el-input v-model="infoForm.j0173"></el-input>ng/ml
          </el-form-item>
          <el-form-item label="参考值:">
            <el-input v-model="infoForm.j0174"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="4、肿瘤标志物">
          <el-radio-group v-model="infoForm.j0175" @change="getExaminationHideCodeNine">
            <el-radio v-model="infoForm.j0175" label="1">有</el-radio>
            <el-radio v-model="infoForm.j0175" label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testNine.j0176_j0178 === '0' ? false : true">
          <el-form-item label="检查日期:">
            <el-date-picker
              v-model="infoForm.j0176"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="CA125__U/ml">
            <el-input-number v-model="infoForm.j0177"></el-input-number>U/ml
            <!-- <el-input style="width:150px" v-model="infoForm.j0177"></el-input>U/ml -->
          </el-form-item>
          <el-form-item label="CA199__U/ml">
            <el-input-number v-model="infoForm.j0178"></el-input-number>U/ml
            <!-- <el-input style="width:150px" v-model="infoForm.j0178"></el-input>U/ml -->
          </el-form-item>
        </div>
      </div>

      <div v-show="hideOrShow.j018_j041 === '0' ? false : true">
        <!-- <h4>若均有：</h4> -->
        <el-form-item label="1、最近一次B超">
          <el-radio-group v-model="infoForm.j018" @change="getExaminationHideCodeTen">
            <el-radio v-model="infoForm.j018" label="1">有</el-radio>
            <el-radio v-model="infoForm.j018" label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testTen.j019_j024 === '0' ? false : true">
          <el-form-item label="B超检查日期:">
            <el-date-picker
              v-model="infoForm.j019"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="子宫大小(cm):">
            <el-input-number v-model="infoForm.j0191"></el-input-number>x
            <el-input-number v-model="infoForm.j0192"></el-input-number>x
            <el-input-number v-model="infoForm.j0193"></el-input-number>cm
            <!-- <el-input style="width:80px" v-model="infoForm.j0191"></el-input>x
            <el-input style="width:80px" v-model="infoForm.j0192"></el-input>x
            <el-input style="width:80px" v-model="infoForm.j0193"></el-input>cm-->
          </el-form-item>

          <el-form-item label="有无腺肌瘤？">
            <el-radio-group v-model="infoForm.j020" @change="getExaminationHideCodeEleven">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </el-form-item>

          <div v-show="testEleven.j021 === '0' ? false : true">
            <el-form-item label="腺肌瘤大小描述(cm):">
              <el-input v-model="infoForm.j021"></el-input>
            </el-form-item>
          </div>

          <el-form-item label="左侧卵巢巧克力囊肿大小描述（cm）:">
            <el-input v-model="infoForm.j022"></el-input>
          </el-form-item>

          <el-form-item label="右侧卵巢巧克力囊肿大小描述（cm）:">
            <el-input v-model="infoForm.j023"></el-input>
          </el-form-item>

          <el-form-item label="影像学提示:">
            <el-input v-model="infoForm.j024"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="2、最近一次核磁">
          <el-radio-group v-model="infoForm.j025" @change="getExaminationHideCodeTwelve">
            <el-radio v-model="infoForm.j025" label="1">有</el-radio>
            <el-radio v-model="infoForm.j025" label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testTwelve.j026_j032 === '0' ? false : true">
          <el-form-item label="核磁检查日期:">
            <el-date-picker
              v-model="infoForm.j026"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="子宫大小(cm):">
            <el-input-number v-model="infoForm.j0271"></el-input-number>x
            <el-input-number v-model="infoForm.j0272"></el-input-number>x
            <el-input-number v-model="infoForm.j0273"></el-input-number>cm
            <!-- <el-input style="width:80px" v-model="infoForm.j0271"></el-input>x
            <el-input style="width:80px" v-model="infoForm.j0272"></el-input>x
            <el-input style="width:80px" v-model="infoForm.j0273"></el-input>cm-->
          </el-form-item>

          <el-form-item label="有无腺肌瘤？">
            <el-radio-group v-model="infoForm.j028" @change="getExaminationHideCodeThrteen">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </el-form-item>

          <div v-show="testThrteen.j029 === '0' ? false : true">
            <el-form-item label="腺肌瘤大小描述(cm):">
              <el-input v-model="infoForm.j029"></el-input>
            </el-form-item>
          </div>

          <el-form-item label="左侧卵巢巧克力囊肿大小描述（cm）:">
            <el-input v-model="infoForm.j030"></el-input>
          </el-form-item>

          <el-form-item label="右侧卵巢巧克力囊肿大小描述（cm）:">
            <el-input v-model="infoForm.j031"></el-input>
          </el-form-item>

          <el-form-item label="影像学提示:">
            <el-input v-model="infoForm.j032"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="3、抗苗勒管激素">
          <el-radio-group v-model="infoForm.j033" @change="getExaminationHideCodeFourteen">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testFourteen.j034_j037 === '0' ? false : true">
          <el-form-item label="检查日期:">
            <el-date-picker
              v-model="infoForm.j034"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="AMH:">
            <el-input v-model="infoForm.j035"></el-input>ng/ml
          </el-form-item>
          <el-form-item label="参考值:">
            <el-input v-model="infoForm.j036"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="4.肿瘤标志物">
          <el-radio-group v-model="infoForm.j038" @change="getExaminationHideCodeFifteen">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testFifteen.j039_j041 === '0' ? false : true">
          <el-form-item label="检查日期:">
            <el-date-picker
              v-model="infoForm.j039"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="CA125__U/ml:">
            <el-input-number v-model="infoForm.j040"></el-input-number>U/ml
            <!-- <el-input v-model="infoForm.j040"></el-input> -->
          </el-form-item>
          <el-form-item label="CA199__U/ml:">
            <el-input-number v-model="infoForm.j041"></el-input-number>U/ml
            <!-- <el-input v-model="infoForm.j041"></el-input> -->
          </el-form-item>
        </div>
      </div>
    </el-form>

    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { apiUpdatePatientDataForm, apiGetHideCode } from "@/api/api-prj006";

export default {
  name: "Relevant",
  data() {
    return {
      infoForm: {
        j001: "",
        j002: "",
        j003: "",
        j004: "",
        j005: "",
        j0051: "",
        j0052: "",
        j0053: "",
        j0054: "",
        j0055: "",
        j0056: "",
        j0057: "",
        j0058: "",
        j006: "",
        j007: "",
        // j008: "",
        j0081: "",
        j0082: "",
        j0083: "",
        j009: "",
        j010: "",
        j011: "",
        j012: "",
        j013: "",
        // j014: "",
        j0141: "",
        j0142: "",
        j0143: "",
        j015: "",
        j016: "",
        j017: "",
        j0171: "",
        j0172: "",
        j0173: "",
        j0174: "",
        j0175: "",
        j0176: "",
        j0177: "",
        j0178: "",
        j018: "",
        j019: "",
        j0191: "",
        j0192: "",
        j0193: "",
        j020: "",
        j021: "",
        j022: "",
        j023: "",
        j024: "",
        j025: "",
        j026: "",
        // j027: "",
        j0271: "",
        j0272: "",
        j0273: "",
        j028: "",
        j029: "",
        j030: "",
        j031: "",
        j032: "",
        j033: "",
        j034: "",
        j035: "",
        j036: "",
        // j037: "",
        j038: "",
        j039: "",
        j040: "",
        j041: "",
      },
      dialogVisible: false,
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: "",
      hideOrShow: {
        j001_j0058: "0",
        j006_j0178: "0",
        j018_j041: "0",
      },
      testOne: {
        j002_j005: "0",
      },
      testTwo: {
        j0052_j0054: "0",
      },
      testThree: {
        j0056_j0058: "0",
      },
      testFour: {
        j007_j011: "0",
      },
      testFive: {
        j010: "0",
      },
      testSix: {
        j013_j017: "0",
      },
      testSeven: {
        j016: "0",
      },
      testEight: {
        j0172_j0174: "0",
      },
      testNine: {
        j0176_j0178: "0",
      },
      testTen: {
        j019_j024: "0",
      },
      testEleven: {
        j021: "0",
      },
      testTwelve: {
        j026_j032: "0",
      },
      testThrteen: {
        j029: "0",
      },
      testFourteen: {
        j034_j037: "0",
      },
      testFifteen: {
        j039_j041: "0",
      },
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

      this.getHideCode(data.formName, data._id);
    });
  },
  methods: {
    getExaminationHideCodeFifteen() {
      let params = {
        question: "j038",
        answer: this.infoForm.j038,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testFifteen = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExaminationHideCodeFourteen() {
      let params = {
        question: "j033",
        answer: this.infoForm.j033,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testFourteen = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExaminationHideCodeThrteen() {
      let params = {
        question: "j028",
        answer: this.infoForm.j028,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testThrteen = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExaminationHideCodeTwelve() {
      let params = {
        question: "j025",
        answer: this.infoForm.j025,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testTwelve = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExaminationHideCodeEleven() {
      let params = {
        question: "j020",
        answer: this.infoForm.j020,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testEleven = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExaminationHideCodeTen() {
      let params = {
        question: "j018",
        answer: this.infoForm.j018,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testTen = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExaminationHideCodeNine() {
      let params = {
        question: "j0175",
        answer: this.infoForm.j0175,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testNine = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExaminationHideCodeEight() {
      let params = {
        question: "j0171",
        answer: this.infoForm.j0171,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testEight = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExaminationHideCodeSeven() {
      let params = {
        question: "j015",
        answer: this.infoForm.j015,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testSeven = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExaminationHideCodeSix() {
      let params = {
        question: "j012",
        answer: this.infoForm.j012,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testSix = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExaminationHideCodeFive() {
      let params = {
        question: "j009",
        answer: this.infoForm.j009,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testFive = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExaminationHideCodeFour() {
      let params = {
        question: "j006",
        answer: this.infoForm.j006,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testFour = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExaminationHideCodeThree() {
      let params = {
        question: "j0055",
        answer: this.infoForm.j0055,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testThree = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExaminationHideCodeOne() {
      let params = {
        question: "j001",
        answer: this.infoForm.j001,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testOne = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExaminationHideCodeTwo() {
      let params = {
        question: "j0051",
        answer: this.infoForm.j0051,
      };
      apiGetHideCode(params)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.testTwo = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHideCode(name, id) {
      let params = {
        formName: name,
        _id: id,
      };
      apiGetHideCode(params)
        .then((res) => {
          if (res.status === 200) {
            this.hideOrShow = res.data;
            const { j001_j0058, j006_j0178, j018_j041 } = res.data;
            if (j001_j0058 === "1") {
              this.getExaminationHideCodeOne();
              this.getExaminationHideCodeTwo();
              this.getExaminationHideCodeThree();
            } else if (j006_j0178 === "1") {
              this.getExaminationHideCodeFour();
              this.getExaminationHideCodeFive();
              this.getExaminationHideCodeSix();
              this.getExaminationHideCodeSeven();
              this.getExaminationHideCodeEight();
              this.getExaminationHideCodeNine();
            } else {
              this.getExaminationHideCodeTen();
              this.getExaminationHideCodeEleven();
              this.getExaminationHideCodeTwelve();
              this.getExaminationHideCodeThrteen();
              this.getExaminationHideCodeFourteen();
              this.getExaminationHideCodeFifteen();
            }
          } else {
            this.$message({ message: "请完善一般情况", type: "warning" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
.prj005-dialog {
  h4 {
    color: cornflowerblue;
  }
}
</style>
