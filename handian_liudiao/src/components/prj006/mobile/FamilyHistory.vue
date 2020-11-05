<template>
  <div>
    <el-form ref="infoForm" :model="infoForm" label-position="top">
      <!-- 表格开始 -->
      <el-form-item label="1.家族中是否有人患子宫内膜异位症">
        <el-radio-group v-model="infoForm.e001" @change="getFamilyHideCodeOne">
          <el-radio v-model="infoForm.e001" label="1">是</el-radio>
          <el-radio v-model="infoForm.e001" label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <div v-show="testOne.e002 === '1' ? true : false">
        <el-form-item label="2.哪位亲属患有子宫内膜异位症">
          一级亲属
          <el-checkbox v-model="infoForm.e002[0]">母亲</el-checkbox>
          <el-checkbox v-model="infoForm.e002[1]">姐姐</el-checkbox>
          <el-checkbox v-model="infoForm.e002[2]">妹妹</el-checkbox>
          <el-checkbox v-model="infoForm.e002[3]">女儿</el-checkbox>
          <br />二级亲属
          <el-checkbox v-model="infoForm.e002[4]">姑</el-checkbox>
          <el-checkbox v-model="infoForm.e002[5]">姨</el-checkbox>
          <el-checkbox v-model="infoForm.e002[6]">祖母</el-checkbox>
          <el-checkbox v-model="infoForm.e002[7]">外祖母</el-checkbox>
          <br />三级亲属
          <el-checkbox v-model="infoForm.e002[8]">堂姐</el-checkbox>
          <el-checkbox v-model="infoForm.e002[9]">堂妹</el-checkbox>
          <el-checkbox v-model="infoForm.e002[10]">表姐</el-checkbox>
          <el-checkbox v-model="infoForm.e002[11]">表妹</el-checkbox>
        </el-form-item>
      </div>
      <el-form-item label="3.家族中是否有人患子宫腺肌病">
        <el-radio-group v-model="infoForm.e003" @change="getFamilyHideCodeTwo">
          <el-radio v-model="infoForm.e003" label="1">是</el-radio>
          <el-radio v-model="infoForm.e003" label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <div v-show="testTwo.e004 === '1' ? true : false">
        <el-form-item label="4.哪位亲属患有子宫腺肌病">
          一级亲属
          <el-checkbox v-model="infoForm.e004[0]">母亲</el-checkbox>
          <el-checkbox v-model="infoForm.e004[1]">姐姐</el-checkbox>
          <el-checkbox v-model="infoForm.e004[2]">妹妹</el-checkbox>
          <el-checkbox v-model="infoForm.e004[3]">女儿</el-checkbox>
          <br />二级亲属
          <el-checkbox v-model="infoForm.e004[4]">姑</el-checkbox>
          <el-checkbox v-model="infoForm.e004[5]">姨</el-checkbox>
          <el-checkbox v-model="infoForm.e004[6]">祖母</el-checkbox>
          <el-checkbox v-model="infoForm.e004[7]">外祖母</el-checkbox>
          <br />三级亲属
          <el-checkbox v-model="infoForm.e004[8]">堂姐</el-checkbox>
          <el-checkbox v-model="infoForm.e004[9]">堂妹</el-checkbox>
          <el-checkbox v-model="infoForm.e004[10]">表姐</el-checkbox>
          <el-checkbox v-model="infoForm.e004[11]">表妹</el-checkbox>
        </el-form-item>
      </div>
      <el-form-item label="5.一级亲属（父母、兄弟姐妹、儿女）是否有以下疾病">
        <el-checkbox v-model="infoForm.e005[0]">子宫内膜息肉</el-checkbox>
        <el-checkbox v-model="infoForm.e005[1]">子宫肌瘤</el-checkbox>
        <el-checkbox v-model="infoForm.e005[2]">痛经史</el-checkbox>
        <el-checkbox v-model="infoForm.e005[3]">卵巢癌</el-checkbox>
        <el-checkbox v-model="infoForm.e005[4]">子宫内膜癌</el-checkbox>
        <el-checkbox v-model="infoForm.e005[5]">乳腺疾病</el-checkbox>
        <el-checkbox v-model="infoForm.e005[6]">甲状腺疾病</el-checkbox>
        <el-checkbox v-model="infoForm.e005[7]">无</el-checkbox>
        <el-checkbox v-model="infoForm.e005[8]">不详</el-checkbox>
      </el-form-item>
      <el-form-item label="6.二级亲属（姑叔、姨舅、祖父母、外祖父母）是否有以下疾病">
        <el-checkbox v-model="infoForm.e006[0]">子宫内膜息肉</el-checkbox>
        <el-checkbox v-model="infoForm.e006[1]">子宫肌瘤</el-checkbox>
        <el-checkbox v-model="infoForm.e006[2]">痛经史</el-checkbox>
        <el-checkbox v-model="infoForm.e006[3]">卵巢癌</el-checkbox>
        <el-checkbox v-model="infoForm.e006[4]">子宫内膜癌</el-checkbox>
        <el-checkbox v-model="infoForm.e006[5]">乳腺疾病</el-checkbox>
        <el-checkbox v-model="infoForm.e006[6]">甲状腺疾病</el-checkbox>
        <el-checkbox v-model="infoForm.e006[7]">无</el-checkbox>
        <el-checkbox v-model="infoForm.e006[8]">不详</el-checkbox>
      </el-form-item>
      <el-form-item label="7.三级亲属（堂/表兄弟姐妹）是否有以下疾病？">
        <el-checkbox v-model="infoForm.e007[0]">子宫内膜息肉</el-checkbox>
        <el-checkbox v-model="infoForm.e007[1]">子宫肌瘤</el-checkbox>
        <el-checkbox v-model="infoForm.e007[2]">痛经史</el-checkbox>
        <el-checkbox v-model="infoForm.e007[3]">卵巢癌</el-checkbox>
        <el-checkbox v-model="infoForm.e007[4]">子宫内膜癌</el-checkbox>
        <el-checkbox v-model="infoForm.e007[5]">乳腺疾病</el-checkbox>
        <el-checkbox v-model="infoForm.e007[6]">甲状腺疾病</el-checkbox>
        <el-checkbox v-model="infoForm.e007[7]">无</el-checkbox>
        <el-checkbox v-model="infoForm.e007[8]">不详</el-checkbox>
      </el-form-item>
      <el-form-item label="8.其他重要家族史">
        <el-input v-model="infoForm.e008" placeholder="请填写"></el-input>
      </el-form-item>
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
  name: "FamilyHistory",
  data() {
    return {
      infoForm: {
        e001: "",
        e002: [
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
        e003: "",
        e004: [
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
        e005: [false, false, false, false, false, false, false, false, false],
        e006: [false, false, false, false, false, false, false, false, false],
        e007: [false, false, false, false, false, false, false, false, false],
        e008: "",
      },
      dialogVisible: false,
      exist: true,
      formName: "family",
      isOwnedByUser: true,
      check_status: "",
      _id: "",
      testOne: {
        e002: "0",
      },
      testTwo: {
        e004: "1",
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
            this.getFamilyHideCodeOne();
            this.getFamilyHideCodeTwo();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFamilyHideCodeTwo() {
      let params = {
        question: "e003",
        answer: this.infoForm.e003,
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
    getFamilyHideCodeOne() {
      let params = {
        question: "e001",
        answer: this.infoForm.e001,
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