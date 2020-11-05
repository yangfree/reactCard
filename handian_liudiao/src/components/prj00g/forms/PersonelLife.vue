<template>
  <el-dialog
    title="个人生活习惯"
    class="my-dialog history-dialog prj00g-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="100%"
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
      <el-form-item label="1.您经常吃下列哪类食物">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.f0101[0]">牛羊肉</el-checkbox>
        <el-checkbox v-model="infoForm.f0101[1]">猪肉</el-checkbox>
        <el-checkbox v-model="infoForm.f0101[2]">家禽类（鸡、鸭、鹅等）</el-checkbox>
        <el-checkbox v-model="infoForm.f0101[3]">水产类（鱼、虾蟹类）</el-checkbox>
        <el-checkbox v-model="infoForm.f0101[4]">豆类及豆制品</el-checkbox>
        <el-checkbox v-model="infoForm.f0101[5]">油炸、油腻食品</el-checkbox>
        <el-checkbox v-model="infoForm.f0101[6]">甜食类</el-checkbox>
        <el-checkbox v-model="infoForm.f0101[7]">辛辣食品</el-checkbox>
        <el-checkbox v-model="infoForm.f0101[8]">咖啡</el-checkbox>
        <el-checkbox v-model="infoForm.f0101[9]">奶茶</el-checkbox>
        <el-checkbox v-model="infoForm.f0101[10]">冷饮</el-checkbox>
        <el-checkbox v-model="infoForm.f0101[11]">水果</el-checkbox>
        <el-checkbox v-model="infoForm.f0101[12]">以上食物均不常吃</el-checkbox>
        <el-checkbox v-model="infoForm.f0101[13]">其他</el-checkbox>
        <el-input v-model="infoForm.f0102" maxlength="50" show-word-limit placeholder="注明其他"></el-input>  
      </el-form-item>
      <el-form-item label="1-2.您经常主动吸烟吗">      
          <el-radio v-model="infoForm.f0103" label="1">是</el-radio>
          <el-radio v-model="infoForm.f0103" label="0">否 （跳至3题）</el-radio>
      </el-form-item>

      <el-form-item label="2.若经常主动吸烟，每日吸烟量有多少">
        <el-radio v-model="infoForm.f02" label="1">1-10支</el-radio>
        <el-radio v-model="infoForm.f02" label="2">10～20支</el-radio>
        <el-radio v-model="infoForm.f02" label="3">大于20支</el-radio>
      </el-form-item>

      <el-form-item label="3.您经常被动吸烟吗">
        <el-radio v-model="infoForm.f03" label="1">是</el-radio>
        <el-radio v-model="infoForm.f03" label="0">否</el-radio>
      </el-form-item>

      <el-form-item label="4.您经常饮酒吗">
          <el-radio v-model="infoForm.f04" label="1">是</el-radio>
          <el-radio v-model="infoForm.f04" label="2">否 （跳至6题） </el-radio>
      </el-form-item>
       <el-form-item label="5.若经常饮酒，每日饮酒量为多少">
          <el-radio v-model="infoForm.f05" label="1">少于1杯</el-radio>
          <el-radio v-model="infoForm.f05" label="2">1-2杯</el-radio>
          <el-radio v-model="infoForm.f05" label="3">3杯或以上</el-radio>[一个标准杯即约饮用250 ml啤酒，或25 ml白酒，或125 ml红酒]
        </el-form-item>

      <el-form-item label="6.您经常值夜班吗">
        <el-radio v-model="infoForm.f06" label="1">是</el-radio>
        <el-radio v-model="infoForm.f06" label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="7.您经常超过半夜11点睡觉吗">
        <el-radio v-model="infoForm.f07" label="1">是</el-radio>
        <el-radio v-model="infoForm.f07" label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="8.您经常锻炼吗">
        <el-radio v-model="infoForm.f08" label="1">是</el-radio>
        <el-radio v-model="infoForm.f08" label="2">否</el-radio>
      </el-form-item>
        <el-form-item label="9. 您服用过减肥药吗?">
        <el-radio v-model="infoForm.f09" label="1">是</el-radio>
        <el-radio v-model="infoForm.f09" label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="10.您服用过避孕药吗">
        <el-radio v-model="infoForm.f10" label="1">是</el-radio>
        <el-radio v-model="infoForm.f10" label="2">否 （跳至12题）</el-radio>
      </el-form-item>
      <el-form-item label="11. 若您服用过避孕药，连续服用时间有多长？">
        <el-radio v-model="infoForm.f11" label="1">1至3个月</el-radio>
        <el-radio v-model="infoForm.f11" label="2">4至6个月 </el-radio>
        <el-radio v-model="infoForm.f11" label="3">6至12个月 </el-radio>
        <el-radio v-model="infoForm.f11" label="4">12个月以上 </el-radio>
      </el-form-item>            
      <el-form-item label="12.您是否使用保健品">
          <el-radio v-model="infoForm.f12" label="1">是</el-radio>
          <el-radio v-model="infoForm.f12" label="2">否 （跳至14题） </el-radio>
      </el-form-item>
        <el-form-item label="13.使用保健品的原因">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.f1301[0]">美白护肤</el-checkbox>
          <el-checkbox v-model="infoForm.f1301[1]">丰胸</el-checkbox>
          <el-checkbox v-model="infoForm.f1301[2]">减肥</el-checkbox>
          <el-checkbox v-model="infoForm.f1301[3]">提高性生活满意度</el-checkbox>
          <el-checkbox v-model="infoForm.f1301[4]">改善更年期症状</el-checkbox>
          <el-checkbox v-model="infoForm.f1301[5]">改善记忆力</el-checkbox>
          <el-checkbox v-model="infoForm.f1301[6]">改善胃肠功能</el-checkbox>
          <el-checkbox v-model="infoForm.f1301[7]">改善免疫力</el-checkbox>
          <el-checkbox v-model="infoForm.f1301[8]">改善睡眠</el-checkbox>
          <el-checkbox v-model="infoForm.f1301[9]">其他</el-checkbox>
          <el-input v-model="infoForm.f1302" maxlength="50" show-word-limit placeholder="注明其他"></el-input>
        </el-form-item>

      <el-form-item label="14.您是否经常感觉压力大？">
        <el-radio v-model="infoForm.f14" label="1">是</el-radio>
        <el-radio v-model="infoForm.f14" label="2">否</el-radio>
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
import { apiUpdatePatientDataForm, apiGetHideCode } from "@/api/api-prj00g";

export default {
  name: "PersonelLife",
  data() {
    return {
      infoForm: {
        f0101: [false,false,false,false,false,  false,false,false,false,false,  false,false,false,false  ],
        f0102: "",
        f0103: "",
        f02: 0,
        f03: 0,
        f04: 0,
        f05: 0,
        f06: 0,
        f07: 0,
        f08: 0,
        f09: 0,
        f10: 0,
        f11: 0,
        f12: 0,
        f1301: [false,false,false,false,false,  false,false,false,false,false  ],
        f1302: "",
        f14: ''
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
      console.log("个人生活习惯数据:", data);
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
.history-dialog .el-input__inner {
  margin-top: 10px;
}
.history-input .el-input__inner {
  margin-top: 10px;
  padding: 0 5px;
}
.prj00g-dialog {
  h4 {
    color: cornflowerblue;
  }
}
</style>