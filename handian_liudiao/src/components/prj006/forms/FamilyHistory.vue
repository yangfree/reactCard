<template>
  <el-dialog
    title="家族史"
    class="my-dialog prj006-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="200px" label-position="left">
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
      
      <!-- 表格开始 -->
      <el-form-item label="1.家族中是否有人患子宫内膜异位症">
        <el-radio-group v-model="infoForm.e001" @change="getFamilyHideCodeOne">
          <el-radio v-model="infoForm.e001" label="1">是</el-radio>
          <el-radio v-model="infoForm.e001" label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <div v-show="testOne.e002 === '1' ? true : false">
        <el-form-item label="2.哪位亲属患有子宫内膜异位症">
          <el-tag type="danger" size="mini">多选</el-tag>
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
          <el-tag type="danger" size="mini">多选</el-tag>
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
        <el-tag type="danger" size="mini">多选</el-tag>
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
        <el-tag type="danger" size="mini">多选</el-tag>
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
      <el-tag type="danger" size="mini">多选</el-tag>
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
    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiGetHideCode } from "@/api/api-prj006";
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
          false
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
          false
        ],
        e005: [false, false, false, false, false, false, false, false, false],
        e006: [false, false, false, false, false, false, false, false, false],
        e007: [false, false, false, false, false, false, false, false, false],
        e008: ""
      },
      dialogVisible: false,
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: "",
      testOne: {
        e002: "0"
      },
      testTwo: {
        e004: "1"
      }
    };
  },
  created() {
    this.$on("openEvent", data => {
      console.log("家族史数据:", data);
      this.dialogVisible = true;
      this.check_status = data.check_status;
      this.isOwnedByUser = data.isOwnedByUser;
      this.formName = data.formName;
      this._id = data._id;

      if ("id" in data.result) {
        this.infoForm = this.parseInfoForm(data.result);

        this.getFamilyHideCodeOne();
        this.getFamilyHideCodeTwo();
      }
    });
  },
  methods: {
    getFamilyHideCodeTwo() {
      let params = {
        question: "e003",
        answer: this.infoForm.e003
      };
      apiGetHideCode(params)
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            this.testTwo = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFamilyHideCodeOne() {
      let params = {
        question: "e001",
        answer: this.infoForm.e001
      };
      apiGetHideCode(params)
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            this.testOne = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateInfoForm() {
      apiUpdatePatientDataForm({
        _id: this._id,
        infoForm: this.infoForm,
        formName: this.formName
      })
        .then(res => {
          if (res.detail) {
            this.$message({
              message: res.detail,
              type: "error"
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
    }
  }
};
</script>
<style lang="scss">
.prj006-info {
  .el-input-group__append,
  .el-input-group__prepend {
    width: 50px;
  }
}
.prj006-dialog {
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
