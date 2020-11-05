<template>
  <el-dialog
    title="诊断情况"
    class="my-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="100%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="160px" label-position="left">
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
      <div v-show="hideOrShow.h001_h005 === '1' ? true : false">
        <!-- <h4>若子宫内膜异位症：</h4> -->
        <el-form-item label="1.首次诊断为子宫内膜异位症的时间为">
          <el-date-picker
            v-model="infoForm.h001"
            type="month"
            placeholder="选择日期"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="诊断的医院为:">
          <el-input v-model="infoForm.h002"></el-input>
        </el-form-item>
        <el-form-item label="2.首次诊断方式为:">
          <el-radio v-model="infoForm.h003" label="1">手术＋病理诊断</el-radio>
          <el-radio v-model="infoForm.h003" label="2">临床诊断</el-radio>
        </el-form-item>
        <el-form-item label="3.子宫内膜异位症属于哪一种类型">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.h004[0]">卵巢型子宫内膜异位症</el-checkbox>
          <el-checkbox v-model="infoForm.h004[1]">深部浸润型子宫内膜异位症</el-checkbox>
          <el-checkbox v-model="infoForm.h004[2]">腹膜型子宫内膜异位症</el-checkbox>
          <el-checkbox v-model="infoForm.h004[3]">瘢痕处子宫内膜异位症</el-checkbox>
          <el-checkbox v-model="infoForm.h004[4]">远处子宫内膜异位症</el-checkbox>
          <el-input v-model="infoForm.h004a"></el-input>
        </el-form-item>
        <!--公用-->
        <el-form-item label="4.诊断时有哪些症状">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.h005[0]">痛经</el-checkbox>
          <el-checkbox v-model="infoForm.h005[1]">不孕</el-checkbox>
          <el-checkbox v-model="infoForm.h005[2]">非经期腹痛</el-checkbox>
          <el-checkbox v-model="infoForm.h005[3]">盆腔包块</el-checkbox>
          <el-checkbox v-model="infoForm.h005[4]">急性腹痛</el-checkbox>
          <el-checkbox v-model="infoForm.h005[5]">月经异常</el-checkbox>
          <el-checkbox v-model="infoForm.h005[6]">性交痛</el-checkbox>
          <el-checkbox v-model="infoForm.h005[7]">尿血</el-checkbox>
          <el-checkbox v-model="infoForm.h005[8]">便血</el-checkbox>
          <el-checkbox v-model="infoForm.h005[9]">咳血</el-checkbox>
          <el-checkbox v-model="infoForm.h005[10]">腹壁包块</el-checkbox>
          <el-checkbox v-model="infoForm.h005[11]">无明显症状</el-checkbox>
          <el-checkbox v-model="infoForm.h005[12]">其他</el-checkbox>
          <el-input v-model="infoForm.h005a"></el-input>
        </el-form-item>
      </div>

      <div v-show="hideOrShow.h006_h010 === '1' ? true : false">
        <!-- <h4>若是腺肌病：</h4> -->
        <el-form-item label="1.首次诊断为子宫腺肌病的时间为">
          <el-date-picker
            v-model="infoForm.h006"
            type="month"
            placeholder="选择日期"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="诊断的医院为">
          <el-input v-model="infoForm.h007"></el-input>
        </el-form-item>

        <el-form-item label="2.首次诊断方式为">
          <el-radio-group v-model="infoForm.h008" @change="getDiagnosisHideCodeOne">
            <el-radio label="1">手术＋病理诊断</el-radio>
            <el-radio label="2">临床诊断</el-radio>
          </el-radio-group>
          <span v-show="testOne.h0081 === '1' ? true : false">
            <el-radio-group v-model="infoForm.h0081">
              <el-radio label="1">B超</el-radio>
              <el-radio label="2">核磁</el-radio>
            </el-radio-group>
          </span>
        </el-form-item>

        <el-form-item label="3.子宫腺肌病属于哪种类型">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.h009[0]">弥漫性子宫腺肌病</el-checkbox>
          <el-checkbox v-model="infoForm.h009[1]">子宫腺肌瘤</el-checkbox>
        </el-form-item>

        <el-form-item label="4.诊断时有哪些症状">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.h010[0]">痛经</el-checkbox>
          <el-checkbox v-model="infoForm.h010[1]">不孕</el-checkbox>
          <el-checkbox v-model="infoForm.h010[2]">非经期腹痛</el-checkbox>
          <el-checkbox v-model="infoForm.h010[3]">月经量多</el-checkbox>
          <el-checkbox v-model="infoForm.h010[4]">经期延长</el-checkbox>
          <el-checkbox v-model="infoForm.h010[5]">盆腔包块</el-checkbox>
          <el-checkbox v-model="infoForm.h010[6]">急性腹痛</el-checkbox>
          <el-checkbox v-model="infoForm.h010[7]">无明显症状</el-checkbox>
          <el-checkbox v-model="infoForm.h010[8]">其他</el-checkbox>
          <el-input v-model="infoForm.h010a"></el-input>
        </el-form-item>
      </div>

      <div v-show="hideOrShow.h011_h019 === '1' ? true : false">
        <!-- <h4>若是均有：</h4> -->
        <el-form-item label="1.首次诊断为子宫内膜异位症的时间为">
          <el-date-picker
            v-model="infoForm.h011"
            type="month"
            placeholder="选择日期"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="诊断的医院为">
          <el-input v-model="infoForm.h012"></el-input>
        </el-form-item>

        <el-form-item label="2.首次诊断子宫内膜异位症的方式为">
          <el-radio v-model="infoForm.h013" label="1">手术＋病理诊断</el-radio>
          <el-radio v-model="infoForm.h013" label="2">临床诊断</el-radio>
        </el-form-item>

        <el-form-item label="3.首次诊断为子宫腺肌病的时间为">
          <el-date-picker
            v-model="infoForm.h014"
            type="month"
            placeholder="选择日期"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="诊断的医院为">
          <el-input v-model="infoForm.h015"></el-input>
        </el-form-item>

        <el-form-item label="4.首次诊断子宫腺肌病的方式为">
          <el-radio-group v-model="infoForm.h016" @change="getDiagnosisHideCodeTwo">
            <el-radio label="1">手术＋病理诊断</el-radio>
            <el-radio label="2">临床诊断</el-radio>
          </el-radio-group>

          <span v-show="testTwo.h0161 === '1' ? true : false">
            <el-radio-group v-model="infoForm.h0161">
              <el-radio label="1">B超</el-radio>
              <el-radio label="2">核磁</el-radio>
            </el-radio-group>
          </span>
        </el-form-item>

        <el-form-item label="5.子宫内膜异位症属于哪一种类型">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.h017[0]">卵巢型子宫内膜异位症</el-checkbox>
          <el-checkbox v-model="infoForm.h017[1]">深部浸润型子宫内膜异位症</el-checkbox>
          <el-checkbox v-model="infoForm.h017[2]">腹膜型子宫内膜异位症</el-checkbox>
          <el-checkbox v-model="infoForm.h017[3]">瘢痕处子宫内膜异位症</el-checkbox>
          <el-checkbox v-model="infoForm.h017[4]">远处子宫内膜异位症</el-checkbox>
          <el-input v-model="infoForm.h017a"></el-input>
        </el-form-item>

        <el-form-item label="6.子宫腺肌病属于哪种类型">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.h018[0]">弥漫性子宫腺肌病</el-checkbox>
          <el-checkbox v-model="infoForm.h018[1]">子宫腺肌瘤</el-checkbox>
        </el-form-item>

        <!--上面的题均做，但下面的题，选项合并 -->
        <el-form-item label="7.诊断时有哪些症状">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.h019[0]">痛经</el-checkbox>
          <el-checkbox v-model="infoForm.h019[1]">不孕</el-checkbox>
          <el-checkbox v-model="infoForm.h019[2]">非经期腹痛</el-checkbox>
          <el-checkbox v-model="infoForm.h019[3]">月经量多</el-checkbox>
          <el-checkbox v-model="infoForm.h019[4]">经期延长</el-checkbox>
          <el-checkbox v-model="infoForm.h019[5]">盆腔包块</el-checkbox>
          <el-checkbox v-model="infoForm.h019[6]">急性腹痛</el-checkbox>
          <el-checkbox v-model="infoForm.h019[7]">月经异常</el-checkbox>
          <el-checkbox v-model="infoForm.h019[8]">性交痛</el-checkbox>
          <el-checkbox v-model="infoForm.h019[9]">尿血</el-checkbox>
          <el-checkbox v-model="infoForm.h019[10]">便血</el-checkbox>
          <el-checkbox v-model="infoForm.h019[11]">咳血</el-checkbox>
          <el-checkbox v-model="infoForm.h019[12]">腹壁包块</el-checkbox>
          <el-checkbox v-model="infoForm.h019[13]">无明显症状</el-checkbox>
          <el-checkbox v-model="infoForm.h019[14]">其他</el-checkbox>
          <el-input v-model="infoForm.h019a"></el-input>
        </el-form-item>
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
  name: "ClinicalForm",
  data() {
    return {
      infoForm: {
        h001: "",
        h002: "",
        h003: "",
        h004: [false, false, false, false, false],
        h004a: "",
        h005: [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        h005a: "",
        h006: "",
        h007: "",
        h008: "",
        h0081: "",
        h009: [false, false],
        h010: [false, false, false, false, false, false, false, false, false],
        h010a: "",
        h011: "",
        h012: "",
        h013: "",
        h014: "",
        h015: "",
        h016: "",
        h0161: "",
        h017: [false, false, false, false, false],
        h017a: "",
        h018: [false, false],
        h019: [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        h019a: "",
      },
      dialogVisible: false,
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: "",
      hideOrShow: {
        h001_h005: "0",
        h006_h010: "0",
        h011_h019: "0",
      },
      testOne: {
        h0081: "0",
      },
      testTwo: {
        h0161: "0",
      },
    };
  },
  created() {
    this.$on("openEvent", (data) => {
      console.log("临床症状数据: ", data);
      this.dialogVisible = true;
      this.check_status = data.check_status;
      this.isOwnedByUser = data.isOwnedByUser;
      this.formName = data.formName;
      this._id = data._id;

      if ("id" in data.result) {
        this.infoForm = this.parseInfoForm(data.result);

        this.getDiagnosisHideCodeOne();
        this.getDiagnosisHideCodeTwo();
      }

      this.getHideCode(data.formName, data._id);
    });
  },
  methods: {
    getDiagnosisHideCodeTwo() {
      let params = {
        question: "h016",
        answer: this.infoForm.h016,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testTwo = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDiagnosisHideCodeOne() {
      let params = {
        question: "h008",
        answer: this.infoForm.h008,
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
    getHideCode(name, id) {
      let params = {
        formName: name,
        _id: id,
      };
      apiGetHideCode(params)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            this.hideOrShow = res.data;
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
