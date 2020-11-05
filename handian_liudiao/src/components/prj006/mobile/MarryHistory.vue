<template>
  <div>
    <el-form ref="infoForm" :model="infoForm" label-position="top">
      <!-- 表格开始 -->
      <el-form-item label="1.有无性生活史">
        <el-radio-group v-model="infoForm.c001" @change="getMarryHideCodeOne">
          <el-radio v-model="infoForm.c001" label="1">有性生活</el-radio>
          <el-radio v-model="infoForm.c001" label="0">无性生活</el-radio>
        </el-radio-group>
      </el-form-item>

      <div v-show="testOne.c002_end === '1' ? true : false">
        <el-form-item label="2.现是否妊娠？">
          <el-radio v-model="infoForm.c002" label="1">是</el-radio>
          <el-radio v-model="infoForm.c002" label="0">否</el-radio>
        </el-form-item>

        <!-- <div v-show="testtwo.s23t27 === '1' ? true : false"> -->
        <el-form-item label="3.是否生产过？">
          <el-radio-group v-model="infoForm.c004" @change="getMarryHideCodeTwo">
            <el-radio v-model="infoForm.c004" label="1">是</el-radio>
            <el-radio v-model="infoForm.c004" label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testThree.c005_c009 === '1' ? true : false">
          <el-form-item label="4.曾生育几胎">
            <el-radio-group v-model="infoForm.c005" @change="getMarryHideCodeSeven">
              <el-radio label="1">一胎</el-radio>
              <el-radio label="2">二胎</el-radio>
              <el-radio label="3">三胎及以上</el-radio>
            </el-radio-group>
          </el-form-item>

          <div v-show="testThree.c005_c009 === '1' ? true : false">
            <el-form-item label="5.头胎">
              <el-row>
                <el-col :span="6">生产年龄</el-col>
                <el-col :span="6">
                  <el-input-number v-model="infoForm.c00601" :min="1" :max="150"></el-input-number>
                  <!-- <el-input v-model="infoForm.c00601"></el-input> -->
                </el-col>
                <el-col :span="2">岁</el-col>
              </el-row>

              <el-row>
                <el-col :span="6">生产方式:</el-col>
                <el-col :span="6">
                  <el-radio v-model="infoForm.c00602" label="1">顺产</el-radio>
                </el-col>
                <el-col :span="6">
                  <el-radio v-model="infoForm.c00602" label="2">剖腹</el-radio>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">哺乳时长：</el-col>
                <el-col :span="14">
                  <el-input-number v-model="infoForm.c00603"></el-input-number>
                </el-col>
                <el-col :span="4">个月</el-col>
              </el-row>
            </el-form-item>
          </div>

          <div v-show="testEight.two === '1' ? true : false">
            <el-form-item label="5.二胎">
              <el-row>
                <el-col :span="6">生产年龄</el-col>
                <el-col :span="6">
                  <el-input-number v-model="infoForm.c00701" :min="1" :max="150"></el-input-number>
                  <!-- <el-input v-model="infoForm.c00701"></el-input> -->
                </el-col>
                <el-col :span="2">岁</el-col>
              </el-row>

              <el-row>
                <el-col :span="6">生产方式:</el-col>
                <el-col :span="6">
                  <el-radio v-model="infoForm.c00702" label="1">顺产</el-radio>
                </el-col>
                <el-col :span="6">
                  <el-radio v-model="infoForm.c00702" label="2">剖腹</el-radio>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">哺乳时长：</el-col>
                <el-col :span="14">
                  <el-input-number v-model="infoForm.c00703"></el-input-number>
                </el-col>
                <el-col :span="4">个月</el-col>
              </el-row>
            </el-form-item>
          </div>

          <div v-show="testEight.three === '1' ? true : false">
            <el-form-item label="5.三胎">
              <el-row>
                <el-col :span="6">生产年龄</el-col>
                <el-col :span="6">
                  <el-input-number v-model="infoForm.c00801" :min="1" :max="150"></el-input-number>
                  <!-- <el-input v-model="infoForm.c00801"></el-input> -->
                </el-col>
                <el-col :span="2">岁</el-col>
              </el-row>

              <el-row>
                <el-col :span="6">生产方式:</el-col>
                <el-col :span="6">
                  <el-radio v-model="infoForm.c00802" label="1">顺产</el-radio>
                </el-col>
                <el-col :span="6">
                  <el-radio v-model="infoForm.c00802" label="2">剖腹</el-radio>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">哺乳时长：</el-col>
                <el-col :span="14">
                  <el-input-number v-model="infoForm.c00803"></el-input-number>
                </el-col>
                <el-col :span="4">个月</el-col>
              </el-row>
            </el-form-item>
          </div>

          <el-form-item label="6.是否有过以下妊娠期并发症：">
            <el-checkbox v-model="infoForm.c009[0]">早产</el-checkbox>
            <el-checkbox v-model="infoForm.c009[1]">妊娠期高血压疾病</el-checkbox>
            <el-checkbox v-model="infoForm.c009[2]">妊娠期糖尿病</el-checkbox>
            <el-checkbox v-model="infoForm.c009[3]">巨大儿</el-checkbox>
            <el-checkbox v-model="infoForm.c009[4]">低体重儿</el-checkbox>
            <el-checkbox v-model="infoForm.c009[5]">胎儿宫内发育迟缓</el-checkbox>
            <el-checkbox v-model="infoForm.c009[6]">产后大出血</el-checkbox>
            <el-checkbox v-model="infoForm.c009[7]">前置胎盘</el-checkbox>
            <el-checkbox v-model="infoForm.c009[8]">胎盘早剥</el-checkbox>
          </el-form-item>
        </div>

        <el-form-item label="7.是否流产过？">
          <el-radio-group v-model="infoForm.c010" @change="getMarryHideCodeThree">
            <el-radio v-model="infoForm.c010" label="1">是</el-radio>
            <el-radio v-model="infoForm.c010" label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-show="testFour.c012_c020 === '1' ? true : false">
          <el-form-item label="生化妊娠">
            <el-row>
              <el-col :span="4">
                <el-input-number v-model="infoForm.c012"></el-input-number>
              </el-col>
              <el-col :span="1">次;</el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="自然流产">
            <el-row>
              <el-col :span="4">
                <el-input-number v-model="infoForm.c013"></el-input-number>
              </el-col>
              <el-col :span="1">次;</el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="药物流产">
            <el-row>
              <el-col :span="4">
                <el-input-number v-model="infoForm.c014"></el-input-number>
              </el-col>
              <el-col :span="1">次;</el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="人工流产">
            <el-row>
              <el-col :span="4">
                <el-input-number v-model="infoForm.c015"></el-input-number>
              </el-col>
              <el-col :span="1">次;</el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="胎停育">
            <el-row>
              <el-col :span="4">
                <el-input-number v-model="infoForm.c016"></el-input-number>
              </el-col>
              <el-col :span="1">次;</el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="异位妊娠">
            <el-row>
              <el-col :span="4">
                <el-input-number v-model="infoForm.c018"></el-input-number>
              </el-col>
              <el-col :span="1">次;</el-col>
            </el-row>
          </el-form-item>
        </div>
        <el-form-item label="8.是否使用过促排卵治疗？">
          <el-radio-group v-model="infoForm.c021" @change="getMarryHideCodeFour">
            <el-radio v-model="infoForm.c021" label="1">是</el-radio>
            <el-radio v-model="infoForm.c021" label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testFive.c022 === '1' ? true : false">
          <el-form-item label="9.采用促排卵治疗是否成功? ">
            <el-checkbox v-model="infoForm.c022[0]">未成功</el-checkbox>
            <el-checkbox v-model="infoForm.c022[1]">成功受孕，妊娠中</el-checkbox>
            <el-checkbox v-model="infoForm.c022[2]">已成功生产</el-checkbox>
          </el-form-item>
        </div>
        <el-form-item label="10.是否进行过辅助生殖？">
          <el-radio-group v-model="infoForm.c023" @change="getMarryHideCodeFive">
            <el-radio v-model="infoForm.c023" label="1">是</el-radio>
            <el-radio v-model="infoForm.c023" label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testSix.c024_c027 === '1' ? true : false">
          <el-form-item label="11.采用过下列哪种辅助生殖">
            <el-checkbox v-model="infoForm.c024[0]" @change="getMarryHideCodeSix">人工授精</el-checkbox>
            <el-checkbox v-model="infoForm.c024[1]" @change="getMarryHideCodeSix">试管婴儿</el-checkbox>
            <el-checkbox v-model="infoForm.c024[2]" @change="getMarryHideCodeSix">其他</el-checkbox>
            <el-input v-model="infoForm.c024a"></el-input>
          </el-form-item>
          <el-form-item label="12.采用辅助生殖的原因？">
            <el-checkbox v-model="infoForm.c025[0]">男方因素</el-checkbox>
            <el-checkbox v-model="infoForm.c025[1]">输卵管因素</el-checkbox>
            <el-checkbox v-model="infoForm.c025[2]">排卵障碍</el-checkbox>
            <el-checkbox v-model="infoForm.c025[3]">内异症手术分期高</el-checkbox>
            <el-checkbox v-model="infoForm.c025[4]">宫腔因素</el-checkbox>
            <el-checkbox v-model="infoForm.c025[5]">不孕病程较长</el-checkbox>
            <el-checkbox v-model="infoForm.c025[6]">年龄因素</el-checkbox>
            <el-checkbox v-model="infoForm.c025[7]">其他</el-checkbox>
            <el-input v-model="infoForm.c025a"></el-input>
          </el-form-item>

          <div v-show="testSeven.c026 === '1' ? true : false">
            <el-form-item label="13.采用人工授精是否成功?">
              <el-checkbox v-model="infoForm.c026[0]">未成功</el-checkbox>
              <el-checkbox v-model="infoForm.c026[1]">成功受孕，妊娠中</el-checkbox>
              <el-checkbox v-model="infoForm.c026[2]">已成功生产</el-checkbox>
            </el-form-item>
          </div>

          <div v-show="testSeven.c027 === '1' ? true : false">
            <el-form-item label="14.采用试管婴儿是否成功?">
              <el-checkbox v-model="infoForm.c027[0]">未成功</el-checkbox>
              <el-checkbox v-model="infoForm.c027[1]">成功受孕，妊娠中</el-checkbox>
              <el-checkbox v-model="infoForm.c027[2]">已成功生产</el-checkbox>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <div slot="footer">
      <el-button
        :disabled="check_status=='审核通过'"
        type="primary"
        @click="updateInfoForm"
        style="width:100%"
      >保存</el-button>
    </div>
  </div>
</template>
<script>
import {
  apiUpdatePatientDataForm,
  apiGetHideCode,
  apiGetPatientDataForm,
} from "@/api/api-prj006";
export default {
  name: "MarryHistory",
  data() {
    return {
      infoForm: {
        c001: "",
        c002: "",
        // c003: "",
        c004: "",
        c005: "",
        c00601: "",
        c00602: "",
        c00603: "",
        c00701: "",
        c00702: "",
        c00703: "",
        c00801: "",
        c00802: "",
        c00803: "",
        c009: [false, false, false, false, false, false, false, false, false],
        c010: "",
        c012: "",
        c013: "",
        c014: "",
        c015: "",
        c016: "",
        // c017: "",
        c018: "",
        // c019: "",
        // c020: "",
        c021: "",
        c022: [false, false, false],
        c023: "",
        c024: [false, false, false],
        c024a: "",
        c025: [false, false, false, false, false, false, false, false],
        c025a: "",
        c026: [false, false, false],
        c027: [false, false, false],
      },
      _id: "",
      exist: true,
      formName: "marry",
      isOwnedByUser: true,
      check_status: "",
      testOne: {
        c002_end: "0",
      },
      testThree: {
        c005_c009: "0",
      },
      testFour: {
        c012_c020: "0",
      },
      testFive: {
        c022: "0",
      },
      testSix: {
        c024_c027: "0",
      },
      testSeven: {
        c026: "0",
        c027: "0",
      },
      testEight: {
        one: "0",
        two: "0",
        three: "0",
      },
    };
  },
  created() {
    this.haveSeeion();
    this.getSingleInfo();
  },
  methods: {
    haveSeeion() {
      sessionStorage.getItem("addinformation") !== null
        ? (this._id = JSON.parse(sessionStorage.getItem("addinformation")).id)
        : null;
    },
    getSingleInfo() {
      apiGetPatientDataForm({
        _id: this._id,
        formName: this.formName,
      })
        .then((res) => {
          if (Object.keys(res).length !== 0) {
            this.infoForm = this.parseInfoForm(res);
            this.getMarryHideCodeOne();
            this.getMarryHideCodeTwo();
            this.getMarryHideCodeThree();
            this.getMarryHideCodeFour();
            this.getMarryHideCodeFive();
            this.getMarryHideCodeSix();
            this.getMarryHideCodeSeven();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMarryHideCodeSeven(val) {
      switch (val) {
        case "1":
          this.testEight.one = "1";
          this.testEight.two = "0";
          this.testEight.three = "0";
          break;
        case "2":
          this.testEight.one = "0";
          this.testEight.two = "1";
          this.testEight.three = "0";
          break;
        case "3":
          this.testEight.one = "0";
          this.testEight.two = "0";
          this.testEight.three = "1";
      }
    },
    getMarryHideCodeSix() {
      let params = {
        question: "c024",
        answer: JSON.stringify(this.infoForm.c024),
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
    getMarryHideCodeFive() {
      let params = {
        question: "c023",
        answer: this.infoForm.c023,
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
    getMarryHideCodeFour() {
      let params = {
        question: "c021",
        answer: this.infoForm.c021,
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
    getMarryHideCodeThree() {
      let params = {
        question: "c010",
        answer: this.infoForm.c010,
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
    getMarryHideCodeTwo() {
      let params = {
        question: "c004",
        answer: this.infoForm.c004,
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
    getMarryHideCodeOne() {
      let params = {
        question: "c001",
        answer: this.infoForm.c001,
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
    updateInfoForm() {
      if (this._id) {
        apiUpdatePatientDataForm({
          infoForm: this.infoForm,
          _id: this._id,
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
              this.getSingleInfo();
            }
          })
          .catch();
      } else {
        this.$message({ message: "请先创建表单", type: "warning" });
      }
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
