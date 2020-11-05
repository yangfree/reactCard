<template>
  <el-dialog
    title="临床症状"
    class="my-dialog prj00g-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="100%"
    center
    v-if="dialogVisible"
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
      <el-form-item label="1.经期是否有小腹疼痛">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g01[0]">经期小腹隐痛</el-checkbox>
        <el-checkbox v-model="infoForm.g01[1]">经期小腹刺痛</el-checkbox>
        <el-checkbox v-model="infoForm.g01[2]">经期小腹冷痛</el-checkbox>
        <el-checkbox v-model="infoForm.g01[3]">经期小腹胀痛</el-checkbox>
        <el-checkbox v-model="infoForm.g01[4]">经期小腹灼热痛</el-checkbox>
        <el-checkbox v-model="infoForm.g01[5]">无经期小腹疼痛</el-checkbox>
      </el-form-item>

      <el-form-item label="2.经期其他伴随症状">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g02[0]">经行夹血块</el-checkbox>
        <el-checkbox v-model="infoForm.g02[1]">经行不畅</el-checkbox>
        <el-checkbox v-model="infoForm.g02[2]">经期腰痛</el-checkbox>
        <el-checkbox v-model="infoForm.g02[3]">经行泄泻</el-checkbox>
        <el-checkbox v-model="infoForm.g02[4]">经行头痛</el-checkbox>
        <el-checkbox v-model="infoForm.g02[5]">经行头晕</el-checkbox>
        <el-checkbox v-model="infoForm.g02[6]">经行或经前乳房胀痛</el-checkbox>
        <el-checkbox v-model="infoForm.g02[7]">经前烦躁易怒</el-checkbox>
        <el-checkbox v-model="infoForm.g02[8]">经行感冒</el-checkbox>
        <el-checkbox v-model="infoForm.g02[9]">经行身痛</el-checkbox>
        <el-checkbox v-model="infoForm.g02[10]">无经期不适</el-checkbox>
      </el-form-item>

      <el-form-item label="3.非经期是否有小腹及前后二阴不适">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g03[0]">小腹隐痛</el-checkbox>
        <el-checkbox v-model="infoForm.g03[1]">腰酸痛</el-checkbox>
        <el-checkbox v-model="infoForm.g03[2]">肛门坠胀</el-checkbox>
        <el-checkbox v-model="infoForm.g03[3]">性交痛</el-checkbox>
        <el-checkbox v-model="infoForm.g03[4]">小腹冷痛</el-checkbox>
        <el-checkbox v-model="infoForm.g03[5]">小腹刺痛</el-checkbox>
        <el-checkbox v-model="infoForm.g03[6]">小腹胀痛</el-checkbox>
        <el-checkbox v-model="infoForm.g03[7]">小腹空痛</el-checkbox>
        <el-checkbox v-model="infoForm.g03[8]">小腹空坠</el-checkbox>
        <el-checkbox v-model="infoForm.g03[9]">阴部坠胀</el-checkbox>
        <el-checkbox v-model="infoForm.g03[10]">无不适</el-checkbox>
      </el-form-item>

      <el-form-item label="4.精神情绪">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g04[0]">神疲肢倦(乏力)</el-checkbox>
        <el-checkbox v-model="infoForm.g04[1]">精神抑郁</el-checkbox>
        <el-checkbox v-model="infoForm.g04[2]">烦躁易怒</el-checkbox>
        <el-checkbox v-model="infoForm.g04[3]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="5.面部">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g05[0]">面色萎黄</el-checkbox>
        <el-checkbox v-model="infoForm.g05[1]">面色苍白</el-checkbox>
        <el-checkbox v-model="infoForm.g05[2]">面色晦暗</el-checkbox>
        <el-checkbox v-model="infoForm.g05[3]">面部黄褐斑</el-checkbox>
        <el-checkbox v-model="infoForm.g05[4]">眼睑浮肿</el-checkbox>
        <el-checkbox v-model="infoForm.g05[5]">面部痤疮</el-checkbox>
        <el-checkbox v-model="infoForm.g05[6]">颧赤唇红</el-checkbox>
        <el-checkbox v-model="infoForm.g05[7]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="6.头项部">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g06[0]">头晕</el-checkbox>
        <el-checkbox v-model="infoForm.g06[1]">头痛</el-checkbox>
        <el-checkbox v-model="infoForm.g06[2]">头沉</el-checkbox>
        <el-checkbox v-model="infoForm.g06[3]">眼花</el-checkbox>
        <el-checkbox v-model="infoForm.g06[4]">目涩（眼干）</el-checkbox>
        <el-checkbox v-model="infoForm.g06[5]">目酸胀</el-checkbox>
        <el-checkbox v-model="infoForm.g06[6]">耳鸣</el-checkbox>
        <el-checkbox v-model="infoForm.g06[7]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="7.口咽部">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g07[0]">口苦</el-checkbox>
        <el-checkbox v-model="infoForm.g07[1]">口渴多饮</el-checkbox>
        <el-checkbox v-model="infoForm.g07[2]">口干不欲饮</el-checkbox>
        <el-checkbox v-model="infoForm.g07[3]">口黏</el-checkbox>
        <el-checkbox v-model="infoForm.g07[4]">咽干</el-checkbox>
        <el-checkbox v-model="infoForm.g07[5]">咽痛</el-checkbox>
        <el-checkbox v-model="infoForm.g07[6]">咽痒</el-checkbox>
        <el-checkbox v-model="infoForm.g07[7]">咽部异物感</el-checkbox>
        <el-checkbox v-model="infoForm.g07[8]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="8.胸胁部">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g08[0]">胸闷</el-checkbox>
        <el-checkbox v-model="infoForm.g08[1]">心慌</el-checkbox>
        <el-checkbox v-model="infoForm.g08[2]">气短</el-checkbox>
        <el-checkbox v-model="infoForm.g08[3]">乳房胀痛</el-checkbox>
        <el-checkbox v-model="infoForm.g08[4]">胸胁胀痛</el-checkbox>
        <el-checkbox v-model="infoForm.g08[5]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="9.形体、四肢 ">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g09[0]">形体肥胖</el-checkbox>
        <el-checkbox v-model="infoForm.g09[1]">形体偏瘦</el-checkbox>
        <el-checkbox v-model="infoForm.g09[2]">手足凉</el-checkbox>
        <el-checkbox v-model="infoForm.g09[3]">五心烦热（手足心热）</el-checkbox>
        <el-checkbox v-model="infoForm.g09[4]">腰酸</el-checkbox>
        <el-checkbox v-model="infoForm.g09[5]">腿软</el-checkbox>
        <el-checkbox v-model="infoForm.g09[6]">肢体麻木</el-checkbox>
        <el-checkbox v-model="infoForm.g09[7]">四肢发沉</el-checkbox>
        <el-checkbox v-model="infoForm.g09[8]">四肢浮肿</el-checkbox>
        <el-checkbox v-model="infoForm.g09[9]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="10.饮食口味">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g10[0]">食欲不振</el-checkbox>
        <el-checkbox v-model="infoForm.g10[1]">多食易饥</el-checkbox>
        <el-checkbox v-model="infoForm.g10[2]">喜热饮</el-checkbox>
        <el-checkbox v-model="infoForm.g10[3]">喜冷饮</el-checkbox>
        <el-checkbox v-model="infoForm.g10[4]">喜甜食</el-checkbox>
        <el-checkbox v-model="infoForm.g10[5]">喜辛辣</el-checkbox>
        <el-checkbox v-model="infoForm.g10[6]">食后胃胀</el-checkbox>
        <el-checkbox v-model="infoForm.g10[7]">反酸烧心</el-checkbox>
        <el-checkbox v-model="infoForm.g10[8]">呃逆（打嗝）</el-checkbox>
        <el-checkbox v-model="infoForm.g10[9]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="11.睡眠">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g11[0]">眠浅</el-checkbox>
        <el-checkbox v-model="infoForm.g11[1]">多梦</el-checkbox>
        <el-checkbox v-model="infoForm.g11[2]">难以入眠</el-checkbox>
        <el-checkbox v-model="infoForm.g11[3]">嗜睡</el-checkbox>
        <el-checkbox v-model="infoForm.g11[4]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="12.大便">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g12[0]">便干</el-checkbox>
        <el-checkbox v-model="infoForm.g12[1]">质稀</el-checkbox>
        <el-checkbox v-model="infoForm.g12[2]">时干时稀</el-checkbox>
        <el-checkbox v-model="infoForm.g12[3]">质黏</el-checkbox>
        <el-checkbox v-model="infoForm.g12[4]">夹杂未消化食物</el-checkbox>
        <el-checkbox v-model="infoForm.g12[5]">排便不畅</el-checkbox>
        <el-checkbox v-model="infoForm.g12[6]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="13.小便">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g13[0]">黄</el-checkbox>
        <el-checkbox v-model="infoForm.g13[1]">多尿</el-checkbox>
        <el-checkbox v-model="infoForm.g13[2]">少尿</el-checkbox>
        <el-checkbox v-model="infoForm.g13[3]">尿频</el-checkbox>
        <el-checkbox v-model="infoForm.g13[4]">尿不尽</el-checkbox>
        <el-checkbox v-model="infoForm.g13[5]">排尿不畅</el-checkbox>
        <el-checkbox v-model="infoForm.g13[6]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="14.平素带下情况">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g14[0]">量少</el-checkbox>
        <el-checkbox v-model="infoForm.g14[1]">量多</el-checkbox>
        <el-checkbox v-model="infoForm.g14[2]">色黄</el-checkbox>
        <el-checkbox v-model="infoForm.g14[3]">质稀</el-checkbox>
        <el-checkbox v-model="infoForm.g14[4]">质稠</el-checkbox>
        <el-checkbox v-model="infoForm.g14[5]">异味</el-checkbox>
        <el-checkbox v-model="infoForm.g14[6]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="15.舌质">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g15[0]">舌淡红</el-checkbox>
        <el-checkbox v-model="infoForm.g15[1]">舌红</el-checkbox>
        <el-checkbox v-model="infoForm.g15[2]">舌暗</el-checkbox>
        <el-checkbox v-model="infoForm.g15[3]">舌淡</el-checkbox>
        <el-checkbox v-model="infoForm.g15[4]">舌有瘀斑或瘀点</el-checkbox>
        <el-checkbox v-model="infoForm.g15[5]">舌体胖大</el-checkbox>
        <el-checkbox v-model="infoForm.g15[6]">舌体瘦小</el-checkbox>
        <el-checkbox v-model="infoForm.g15[7]">舌有齿痕</el-checkbox>
        <el-checkbox v-model="infoForm.g15[8]">舌有裂纹</el-checkbox>
      </el-form-item>

      <el-form-item label="16.舌苔">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g16[0]">苔白</el-checkbox>
        <el-checkbox v-model="infoForm.g16[1]">苔黄</el-checkbox>
        <el-checkbox v-model="infoForm.g16[2]">苔厚</el-checkbox>
        <el-checkbox v-model="infoForm.g16[3]">苔腻</el-checkbox>
        <el-checkbox v-model="infoForm.g16[4]">苔薄</el-checkbox>
        <el-checkbox v-model="infoForm.g16[5]">少苔</el-checkbox>
        <el-checkbox v-model="infoForm.g16[6]">苔剥脱</el-checkbox>
      </el-form-item>

      <el-form-item label="17.脉象">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.g17[0]">弦</el-checkbox>
        <el-checkbox v-model="infoForm.g17[1]">滑</el-checkbox>
        <el-checkbox v-model="infoForm.g17[2]">细</el-checkbox>
        <el-checkbox v-model="infoForm.g17[3]">数</el-checkbox>
        <el-checkbox v-model="infoForm.g17[4]">浮</el-checkbox>
        <el-checkbox v-model="infoForm.g17[5]">沉</el-checkbox>
        <el-checkbox v-model="infoForm.g17[6]">迟</el-checkbox>
        <el-checkbox v-model="infoForm.g17[7]">结</el-checkbox>
        <el-checkbox v-model="infoForm.g17[8]">代</el-checkbox>
        <el-checkbox v-model="infoForm.g17[9]">涩</el-checkbox>
        <el-checkbox v-model="infoForm.g17[10]">缓</el-checkbox>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj00g";

export default {
  name: "Relevant",
  data() {
    return {
      infoForm: {
        g01: [false, false, false, false, false, false],
        g02: [false, false, false, false, false, false,  false, false, false, false, false],
        g03:[false, false, false, false, false, false,  false, false, false, false, false],
        g04: [false, false, false, false],
        g05: [false, false, false, false, false, false, false, false],
        g06: [false, false, false, false, false, false, false, false],
        g07: [false, false, false, false, false, false, false, false, false],
        g08: [false, false, false, false, false, false],
        g09: [
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
        g10: [
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
        g11: [false, false, false, false, false],
        g12: [false, false, false, false, false, false, false],
        g13: [false, false, false, false, false, false, false],
        g14: [false, false, false, false, false, false, false],
        g15: [false, false, false, false, false, false, false, false, false],
        g16: [false, false, false, false, false, false, false],
        g17: [
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
        ]
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
    this.$on("openEvent", data => {
      console.log("临床症状数据: ", data);
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
