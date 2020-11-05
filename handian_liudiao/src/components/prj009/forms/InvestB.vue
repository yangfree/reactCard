<template>
  <el-dialog
    title="SF-36健康调查量表"
    class="my-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form
      ref="infoForm"
      :model="infoForm"
      label-width="200"
      label-position="left"
    >
      <el-alert
        v-if="check_status == '审核通过'"
        title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <el-divider v-if="check_status == '审核通过'"></el-divider>
      <!-- 表格开始 -->
      <el-form-item label="1.	总体来讲，您的健康状况是">
        <el-radio-group v-model="infoForm.j01">
          <el-radio label="1">非常好（5）</el-radio>
          <el-radio label="2">很好（4.4）</el-radio>
          <el-radio label="3">好（3.4）</el-radio>
          <el-radio label="4">一般（2）</el-radio>
          <el-radio label="5">差（1）</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="2.	跟1年前比您觉得自己当前的健康状况是">
        <el-radio-group v-model="infoForm.j02">
          <el-radio label="1">好多了（5）</el-radio>
          <el-radio label="2">好一些（4.4）</el-radio>
          <el-radio label="3">差不多（3.4）</el-radio>
          <el-radio label="4">差一些（2）</el-radio>
          <el-radio label="5">差多了（1）</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-divider content-position="left"
        >3.
        请您想一想，您的健康状况是否限制了以下这些活动？如果有限制，程度如何？（限制很大1分
        有些限制2分 亳无限制3分）</el-divider
      >
      <el-form-item label="3-1.重体力活动：如跑步举重、参加剧烈运动等">
        <el-radio-group v-model="infoForm.j0301">
          <el-radio label="1">限制很大</el-radio>
          <el-radio label="2">有些限制</el-radio>
          <el-radio label="3">亳无限制</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-2.适度的活动：如扫地、太极拳、简单体操等">
        <el-radio-group v-model="infoForm.j0302">
          <el-radio label="1">限制很大</el-radio>
          <el-radio label="2">有些限制</el-radio>
          <el-radio label="3">亳无限制</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-3.手提日用品：如买菜、购物等">
        <el-radio-group v-model="infoForm.j0303">
          <el-radio label="1">限制很大</el-radio>
          <el-radio label="2">有些限制</el-radio>
          <el-radio label="3">亳无限制</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-4.上几层楼梯">
        <el-radio-group v-model="infoForm.j0304">
          <el-radio label="1">限制很大</el-radio>
          <el-radio label="2">有些限制</el-radio>
          <el-radio label="3">亳无限制</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-5.上一层楼梯">
        <el-radio-group v-model="infoForm.j0305">
          <el-radio label="1">限制很大</el-radio>
          <el-radio label="2">有些限制</el-radio>
          <el-radio label="3">亳无限制</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-6.弯腰、屈膝、下蹲">
        <el-radio-group v-model="infoForm.j0306">
          <el-radio label="1">限制很大</el-radio>
          <el-radio label="2">有些限制</el-radio>
          <el-radio label="3">亳无限制</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-7.步行1500米以上的路程">
        <el-radio-group v-model="infoForm.j0307">
          <el-radio label="1">限制很大</el-radio>
          <el-radio label="2">有些限制</el-radio>
          <el-radio label="3">亳无限制</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-8.步行1000米的路程">
        <el-radio-group v-model="infoForm.j0308">
          <el-radio label="1">限制很大</el-radio>
          <el-radio label="2">有些限制</el-radio>
          <el-radio label="3">亳无限制</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-9.步行100米的路程">
        <el-radio-group v-model="infoForm.j0309">
          <el-radio label="1">限制很大</el-radio>
          <el-radio label="2">有些限制</el-radio>
          <el-radio label="3">亳无限制</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-10.自己洗澡、穿衣">
        <el-radio-group v-model="infoForm.j0310">
          <el-radio label="1">限制很大</el-radio>
          <el-radio label="2">有些限制</el-radio>
          <el-radio label="3">亳无限制</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-divider content-position="left"
        >4.在过去4
        个星期里，您的工作和日常活动有无因为身体健康的原因而出现以下这些问题？
      </el-divider>
      <el-form-item label="4-1.减少了工作或其他活动时间">
        <el-radio-group v-model="infoForm.j0401">
          <el-radio label="1">是</el-radio>
          <el-radio label="2">不是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="4-2.本来想要做的事情只能完成一部分">
        <el-radio-group v-model="infoForm.j0402">
          <el-radio label="1">是</el-radio>
          <el-radio label="2">不是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="4-3.想要干的工作和活动的种类受到限制">
        <el-radio-group v-model="infoForm.j0403">
          <el-radio label="1">是</el-radio>
          <el-radio label="2">不是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="4-4.完成工作或其他活动困难增多（比如需要额外的努力）"
      >
        <el-radio-group v-model="infoForm.j0404">
          <el-radio label="1">是</el-radio>
          <el-radio label="2">不是</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-divider content-position="left"
        >5.在过去的4个星期里，您有无因为情绪的原因（如压抑或忧虑）
        而出现以下问题
      </el-divider>
      <el-form-item label="5-1.减少了工作或活动时间">
        <el-radio-group v-model="infoForm.j0501">
          <el-radio label="1">是</el-radio>
          <el-radio label="2">不是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="5-2.本来想要做的事情只能完成一部分">
        <el-radio-group v-model="infoForm.j0502">
          <el-radio label="1">是</el-radio>
          <el-radio label="2">不是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="5-3.干事情不如平时仔细">
        <el-radio-group v-model="infoForm.j0503">
          <el-radio label="1">是</el-radio>
          <el-radio label="2">不是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="6.	在过去的4个星期里，您的健康或情绪不好，在多大程度上影响了您与家人、朋友、邻居或集体的正常社会交往？"
      >
        <el-radio-group v-model="infoForm.j06">
          <el-radio label="1">完全没有影响</el-radio>
          <el-radio label="2">有一点影响</el-radio>
          <el-radio label="3">中等影响</el-radio>
          <el-radio label="4">影响很大</el-radio>
          <el-radio label="5">影响非常大</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="7.  在过去4个星期里，您有身体疼痛吗？">
        <el-radio-group v-model="infoForm.j07">
          <el-radio label="1">完全没有疼痛</el-radio>
          <el-radio label="2">稍微有一点疼痛</el-radio>
          <el-radio label="3">有一点疼痛 </el-radio>
          <el-radio label="4">中等疼痛 </el-radio>
          <el-radio label="5">严重疼痛</el-radio>
          <el-radio label="6">很严重疼痛</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="8.  在过去4个星期里，您的身体疼痛影响了您的工作和家务吗？"
      >
        <el-radio-group v-model="infoForm.j08">
          <el-radio label="1">完全没有影响</el-radio>
          <el-radio label="2">有一点影响</el-radio>
          <el-radio label="3">中等影响</el-radio>
          <el-radio label="4">影响很大</el-radio>
          <el-radio label="5">影响非常大</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-divider content-position="left"
        >9.以下这些问题是有关于过去1
        个月里您自己的感觉，对每一条问题所说的事情，您的情况是什么样的？
      </el-divider>
      <el-form-item label="9-1.您觉得生活充实">
        <el-radio-group v-model="infoForm.j0901">
          <el-radio label="1">所有的时间</el-radio>
          <el-radio label="2">大部分时间</el-radio>
          <el-radio label="3">比较多时间</el-radio>
          <el-radio label="4">一部分时间</el-radio>
          <el-radio label="5">小部分时间</el-radio>
          <el-radio label="6">没有这种感觉</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="9-2.您是一个敏感的人">
        <el-radio-group v-model="infoForm.j0902">
          <el-radio label="1">所有的时间</el-radio>
          <el-radio label="2">大部分时间</el-radio>
          <el-radio label="3">比较多时间</el-radio>
          <el-radio label="4">一部分时间</el-radio>
          <el-radio label="5">小部分时间</el-radio>
          <el-radio label="6">没有这种感觉</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="9-3.您的情绪非常不好， 什么事都不能使您高兴起来">
        <el-radio-group v-model="infoForm.j0903">
          <el-radio label="1">所有的时间</el-radio>
          <el-radio label="2">大部分时间</el-radio>
          <el-radio label="3">比较多时间</el-radio>
          <el-radio label="4">一部分时间</el-radio>
          <el-radio label="5">小部分时间</el-radio>
          <el-radio label="6">没有这种感觉</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="9-4.您的心理很平静">
        <el-radio-group v-model="infoForm.j0904">
          <el-radio label="1">所有的时间</el-radio>
          <el-radio label="2">大部分时间</el-radio>
          <el-radio label="3">比较多时间</el-radio>
          <el-radio label="4">一部分时间</el-radio>
          <el-radio label="5">小部分时间</el-radio>
          <el-radio label="6">没有这种感觉</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="9-5.您做事精力充沛">
        <el-radio-group v-model="infoForm.j0905">
          <el-radio label="1">所有的时间</el-radio>
          <el-radio label="2">大部分时间</el-radio>
          <el-radio label="3">比较多时间</el-radio>
          <el-radio label="4">一部分时间</el-radio>
          <el-radio label="5">小部分时间</el-radio>
          <el-radio label="6">没有这种感觉</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="9-6.您的情绪低落">
        <el-radio-group v-model="infoForm.j0906">
          <el-radio label="1">所有的时间</el-radio>
          <el-radio label="2">大部分时间</el-radio>
          <el-radio label="3">比较多时间</el-radio>
          <el-radio label="4">一部分时间</el-radio>
          <el-radio label="5">小部分时间</el-radio>
          <el-radio label="6">没有这种感觉</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="9-7.您觉得筋疲力尽">
        <el-radio-group v-model="infoForm.j0907">
          <el-radio label="1">所有的时间</el-radio>
          <el-radio label="2">大部分时间</el-radio>
          <el-radio label="3">比较多时间</el-radio>
          <el-radio label="4">一部分时间</el-radio>
          <el-radio label="5">小部分时间</el-radio>
          <el-radio label="6">没有这种感觉</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="9-8.您是个快乐的人">
        <el-radio-group v-model="infoForm.j0908">
          <el-radio label="1">所有的时间</el-radio>
          <el-radio label="2">大部分时间</el-radio>
          <el-radio label="3">比较多时间</el-radio>
          <el-radio label="4">一部分时间</el-radio>
          <el-radio label="5">小部分时间</el-radio>
          <el-radio label="6">没有这种感觉</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="9-9.您感觉厌烦">
        <el-radio-group v-model="infoForm.j0909">
          <el-radio label="1">所有的时间</el-radio>
          <el-radio label="2">大部分时间</el-radio>
          <el-radio label="3">比较多时间</el-radio>
          <el-radio label="4">一部分时间</el-radio>
          <el-radio label="5">小部分时间</el-radio>
          <el-radio label="6">没有这种感觉</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="10. 不健康影响了您的社会活动（如走亲访友）">
        <el-radio-group v-model="infoForm.j10">
          <el-radio label="1">所有的时间</el-radio>
          <el-radio label="2">大部分时间</el-radio>
          <el-radio label="3">比较多时间</el-radio>
          <el-radio label="4">一部分时间</el-radio>
          <el-radio label="5">小部分时间</el-radio>
          <el-radio label="6">没有这种感觉</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-divider content-position="left"
        >11.请看下列每一条问题，哪一种答案最符合您的情况？
      </el-divider>
      <el-form-item label="11-1.我好像比别人容易生病">
        <el-radio-group v-model="infoForm.j1101">
          <el-radio label="1">绝对正确</el-radio>
          <el-radio label="2">大部分正确</el-radio>
          <el-radio label="3">不能肯定</el-radio>
          <el-radio label="4">大部分错误</el-radio>
          <el-radio label="5">绝对错误</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="11-2.我跟周围人一样健康">
        <el-radio-group v-model="infoForm.j1102">
          <el-radio label="1">绝对正确</el-radio>
          <el-radio label="2">大部分正确</el-radio>
          <el-radio label="3">不能肯定</el-radio>
          <el-radio label="4">大部分错误</el-radio>
          <el-radio label="5">绝对错误</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="11-3.我认为我的健康状况在变坏">
        <el-radio-group v-model="infoForm.j1103">
          <el-radio label="1">绝对正确</el-radio>
          <el-radio label="2">大部分正确</el-radio>
          <el-radio label="3">不能肯定</el-radio>
          <el-radio label="4">大部分错误</el-radio>
          <el-radio label="5">绝对错误</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="11-4.我的健康状况非常好">
        <el-radio-group v-model="infoForm.j1104">
          <el-radio label="1">绝对正确</el-radio>
          <el-radio label="2">大部分正确</el-radio>
          <el-radio label="3">不能肯定</el-radio>
          <el-radio label="4">大部分错误</el-radio>
          <el-radio label="5">绝对错误</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="12.生理机能">
        <el-input v-model="myj12" readonly />
      </el-form-item>
      <el-form-item label="13.生理职能">
        <el-input v-model="myj13" readonly />
      </el-form-item>
      <el-form-item label="14.躯体疼痛">
        <el-input v-model="myj14" readonly />
      </el-form-item>
      <el-form-item label="15.一般健康状况">
        <el-input v-model="myj15" readonly />
      </el-form-item>
      <el-form-item label="16.精力">
        <el-input v-model="myj16" readonly />
      </el-form-item>
      <el-form-item label="17.社会功能">
        <el-input v-model="myj17" readonly />
      </el-form-item>
      <el-form-item label="18.情感职能">
        <el-input v-model="myj18" readonly />
      </el-form-item>
      <el-form-item label="19.精神健康">
        <el-input v-model="myj19" readonly />
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button
        :disabled="check_status == '审核通过'"
        type="primary"
        @click="updateInfoForm"
        >确定</el-button
      >
      <el-button @click="dialogVisible = false">取消</el-button>
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
        j01: 0,
        j02: 0,
        j0301: 0,
        j0302: 0,
        j0303: 0,
        j0304: 0,
        j0305: 0,
        j0306: 0,
        j0307: 0,
        j0308: 0,
        j0309: 0,
        j0310: 0,
        j0401: 0,
        j0402: 0,
        j0403: 0,
        j0404: 0,
        j0501: 0,
        j0502: 0,
        j0503: 0,
        j06: 0,
        j07: 0,
        j08: 0,
        j0901: 0,
        j0902: 0,
        j0903: 0,
        j0904: 0,
        j0905: 0,
        j0906: 0,
        j0907: 0,
        j0908: 0,
        j0909: 0,
        j10: 0,
        j1101: 0,
        j1102: 0,
        j1103: 0,
        j1104: 0,
        j12: "",
        j13: "",
        j14: "",
        j15: "",
        j16: "",
        j17: "",
        j18: "",
        j19: "",
      },
      dialogVisible: false,
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: "",
      // editd0401RowText: "编辑",
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
      // 提交给后台 计算属性的值赋给真实的值传递给后台
      this.infoForm.j12 = this.myj12;
      this.infoForm.j13 = this.myj13;
      this.infoForm.j14 = this.myj14;
      this.infoForm.j15 = this.myj15;
      this.infoForm.j16 = this.myj16;
      this.infoForm.j17 = this.myj17;
      this.infoForm.j18 = this.myj18;
      this.infoForm.j19 = this.myj19;

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
        .catch((err) => {
          console.log(err);
        });
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
  computed: {
    myj12: function () {
      let {
        j0301,
        j0302,
        j0303,
        j0304,
        j0305,
        j0306,
        j0307,
        j0308,
        j0309,
        j0310,
      } = this.infoForm;

      let number =
        ((Number(j0301) +
          Number(j0302) +
          Number(j0303) +
          Number(j0304) +
          Number(j0305) +
          Number(j0306) +
          Number(j0307) +
          Number(j0308) +
          Number(j0309) +
          Number(j0310) -
          10) /
          20) *
        100;

      return number.toFixed(1);
    },
    myj13: function () {
      let { j0401, j0402, j0403, j0404 } = this.infoForm;
      let number =
        ((Number(j0401) + Number(j0402) + Number(j0403) + Number(j0404) - 4) /
          4) *
        100;

      return number.toFixed(1);
    },
    myj14: function () {
      let { j07, j08 } = this.infoForm;
      let num7, num8;

      switch (Number(j07)) {
        case 1:
          num7 = 6;
          break;
        case 2:
          num7 = 5.4;
          break;
        case 3:
          num7 = 4.2;
          break;
        case 4:
          num7 = 3.1;
          break;
        case 5:
          num7 = 2.2;
          break;
        case 6:
          num7 = 1;
          break;
        default:
          num7 = 0;
      }

      switch (Number(j08)) {
        case 1:
          num8 = 5;
          break;
        case 2:
          num8 = 4;
          break;
        case 3:
          num8 = 3;
          break;
        case 4:
          num8 = 2;
          break;
        case 5:
          num8 = 1;
          break;
        default:
          num8 = 0;
      }

      let resultNum = ((num7 + num8 - 2) / 10) * 100;
      return resultNum.toFixed(1);
    },
    myj15: function () {
      let { j01, j1101, j1102, j1103, j1104 } = this.infoForm;
      let num1, num1102, num1104;

      switch (Number(j01)) {
        case 1:
          num1 = 5;
          break;
        case 2:
          num1 = 4.4;
          break;
        case 3:
          num1 = 3.4;
          break;
        case 4:
          num1 = 2;
          break;
        case 5:
          num1 = 1;
          break;
        default:
          num1 = 0;
      }

      switch (Number(j1102)) {
        case 1:
          num1102 = 5;
          break;
        case 2:
          num1102 = 4;
          break;
        case 3:
          num1102 = 3;
          break;
        case 4:
          num1102 = 2;
          break;
        case 5:
          num1102 = 1;
          break;
        default:
          num1102 = 0;
      }

      switch (Number(j1104)) {
        case 1:
          num1104 = 5;
          break;
        case 2:
          num1104 = 4;
          break;
        case 3:
          num1104 = 3;
          break;
        case 4:
          num1104 = 2;
          break;
        case 5:
          num1104 = 1;
          break;
        default:
          num1104 = 0;
      }

      let resultNum =
        ((num1 + Number(j1101) + num1102 + Number(j1103) + num1104 - 5) / 20) *
        100;
      return resultNum.toFixed(1);
    },
    myj16: function () {
      let { j0901, j0905, j0907, j0909 } = this.infoForm;
      let num0901, num0905;

      switch (Number(j0901)) {
        case 1:
          num0901 = 6;
          break;
        case 2:
          num0901 = 5;
          break;
        case 3:
          num0901 = 4;
          break;
        case 4:
          num0901 = 3;
          break;
        case 5:
          num0901 = 2;
          break;
        case 6:
          num0901 = 1;
          break;
        default:
          num0901 = 0;
      }

      switch (Number(j0905)) {
        case 1:
          num0905 = 6;
          break;
        case 2:
          num0905 = 5;
          break;
        case 3:
          num0905 = 4;
          break;
        case 4:
          num0905 = 3;
          break;
        case 5:
          num0905 = 2;
          break;
        case 6:
          num0905 = 1;
          break;
        default:
          num0905 = 0;
      }

      let resultNum =
        ((num0901 + Number(j0907) + num0905 + Number(j0909) - 4) / 20) * 100;
      return resultNum.toFixed(1);
    },
    myj17: function () {
      let { j06, j10 } = this.infoForm;
      let num06, num10;

      switch (Number(j06)) {
        case 1:
          num06 = 6;
          break;
        case 2:
          num06 = 5;
          break;
        case 3:
          num06 = 4;
          break;
        case 4:
          num06 = 3;
          break;
        case 5:
          num06 = 2;
          break;
        default:
          num06 = 0;
      }

      switch (Number(j10)) {
        case 1:
          num10 = 1;
          break;
        case 2:
          num10 = 2;
          break;
        case 3:
          num10 = 3;
          break;
        case 4:
          num10 = 3;
          break;
        case 5:
          num10 = 4;
          break;
        case 6:
          num10 = 5;
          break;
        default:
          num10 = 0;
      }

      let resultNum = ((num06 + num10 - 2) / 8) * 100;
      return resultNum.toFixed(1);
    },
    myj18: function () {
      let { j0501, j0502, j0503 } = this.infoForm;

      let resultNum =
        ((Number(j0501) + Number(j0502) + Number(j0503) - 3) / 3) * 100;
      return resultNum.toFixed(1);
    },
    myj19: function () {
      let { j0902, j0903, j0904, j0906, j0908 } = this.infoForm;
      let num0904, num0908;

      switch (Number(j0904)) {
        case 1:
          num0904 = 6;
          break;
        case 2:
          num0904 = 5;
          break;
        case 3:
          num0904 = 4;
          break;
        case 4:
          num0904 = 3;
          break;
        case 5:
          num0904 = 2;
          break;
        case 6:
          num0904 = 1;
          break;
        default:
          num0904 = 0;
      }

      switch (Number(j0908)) {
        case 1:
          num0908 = 6;
          break;
        case 2:
          num0908 = 5;
          break;
        case 3:
          num0908 = 4;
          break;
        case 4:
          num0908 = 3;
          break;
        case 5:
          num0908 = 2;
          break;
        case 6:
          num0908 = 1;
          break;
        default:
          num0908 = 0;
      }

      let resultNum =
        ((num0904 +
          Number(j0902) +
          num0908 +
          Number(j0903) +
          Number(j0906) -
          5) /
          25) *
        100;
      return resultNum.toFixed(1);
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
