<template>
  <div>
    <el-form ref="infoForm" :model="infoForm" label-position="top">
      <!-- 表格开始 -->
      <el-form-item label="1.经期是否有小腹疼痛">
        <el-checkbox v-model="infoForm.g001[0]">经期小腹隐痛</el-checkbox>
        <el-checkbox v-model="infoForm.g001[1]">经期小腹刺痛</el-checkbox>
        <el-checkbox v-model="infoForm.g001[2]">经期小腹冷痛</el-checkbox>
        <el-checkbox v-model="infoForm.g001[3]">经期小腹胀痛</el-checkbox>
        <el-checkbox v-model="infoForm.g001[4]">经期小腹灼热痛</el-checkbox>
        <el-checkbox v-model="infoForm.g001[5]">无经期小腹疼痛</el-checkbox>
      </el-form-item>

      <el-form-item label="2.经期其他伴随症状">
        <el-checkbox v-model="infoForm.g002[0]">经行夹血块</el-checkbox>
        <el-checkbox v-model="infoForm.g002[1]">经行不畅</el-checkbox>
        <el-checkbox v-model="infoForm.g002[2]">经期腰痛</el-checkbox>
        <el-checkbox v-model="infoForm.g002[3]">经行泄泻</el-checkbox>
        <el-checkbox v-model="infoForm.g002[4]">经行头痛</el-checkbox>
        <el-checkbox v-model="infoForm.g002[5]">经行头晕</el-checkbox>
        <el-checkbox v-model="infoForm.g002[6]">经行或经前乳房胀痛</el-checkbox>
        <el-checkbox v-model="infoForm.g002[7]">经前烦躁易怒</el-checkbox>
        <el-checkbox v-model="infoForm.g002[8]">经行感冒</el-checkbox>
        <el-checkbox v-model="infoForm.g002[9]">经行身痛</el-checkbox>
        <el-checkbox v-model="infoForm.g002[10]">无经期不适</el-checkbox>
      </el-form-item>

      <el-form-item label="3.非经期是否有小腹及前后二阴不适">
        <el-checkbox v-model="infoForm.g003[0]">小腹隐痛</el-checkbox>
        <el-checkbox v-model="infoForm.g003[1]">腰酸痛</el-checkbox>
        <el-checkbox v-model="infoForm.g003[2]">肛门坠胀</el-checkbox>
        <el-checkbox v-model="infoForm.g003[3]">性交痛</el-checkbox>
        <el-checkbox v-model="infoForm.g003[4]">小腹冷痛</el-checkbox>
        <el-checkbox v-model="infoForm.g003[5]">小腹刺痛</el-checkbox>
        <el-checkbox v-model="infoForm.g003[6]">小腹胀痛</el-checkbox>
        <el-checkbox v-model="infoForm.g003[7]">小腹空痛</el-checkbox>
        <el-checkbox v-model="infoForm.g003[8]">小腹空坠</el-checkbox>
        <el-checkbox v-model="infoForm.g003[9]">阴部坠胀</el-checkbox>
        <el-checkbox v-model="infoForm.g003[10]">无不适</el-checkbox>
      </el-form-item>

      <el-form-item label="4.平时是否有怕冷或发热的情况">
        <el-checkbox v-model="infoForm.g004[0]">畏寒</el-checkbox>
        <el-checkbox v-model="infoForm.g004[1]">畏热</el-checkbox>
        <el-checkbox v-model="infoForm.g004[2]">潮热</el-checkbox>
        <el-checkbox v-model="infoForm.g004[3]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="5.平时是否容易出汗">
        <el-checkbox v-model="infoForm.g005[0]">动则汗出</el-checkbox>
        <el-checkbox v-model="infoForm.g005[1]">夜卧汗出</el-checkbox>
        <el-checkbox v-model="infoForm.g005[2]">手足心易汗出</el-checkbox>
        <el-checkbox v-model="infoForm.g005[3]">头部汗出多</el-checkbox>
        <el-checkbox v-model="infoForm.g005[4]">烘热汗出</el-checkbox>
        <el-checkbox v-model="infoForm.g005[5]">不易出汗</el-checkbox>
        <el-checkbox v-model="infoForm.g005[6]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="6.精神情绪">
        <el-checkbox v-model="infoForm.g006[0]">神疲肢倦(乏力)</el-checkbox>
        <el-checkbox v-model="infoForm.g006[1]">精神抑郁</el-checkbox>
        <el-checkbox v-model="infoForm.g006[2]">烦躁易怒</el-checkbox>
        <el-checkbox v-model="infoForm.g006[3]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="7.面部">
        <el-checkbox v-model="infoForm.g007[0]">面色萎黄</el-checkbox>
        <el-checkbox v-model="infoForm.g007[1]">面色苍白</el-checkbox>
        <el-checkbox v-model="infoForm.g007[2]">面色晦暗</el-checkbox>
        <el-checkbox v-model="infoForm.g007[3]">面部黄褐斑</el-checkbox>
        <el-checkbox v-model="infoForm.g007[4]">眼睑浮肿</el-checkbox>
        <el-checkbox v-model="infoForm.g007[5]">面部痤疮</el-checkbox>
        <el-checkbox v-model="infoForm.g007[6]">颧赤唇红</el-checkbox>
        <el-checkbox v-model="infoForm.g007[7]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="8.头项部">
        <el-checkbox v-model="infoForm.g008[0]">头晕</el-checkbox>
        <el-checkbox v-model="infoForm.g008[1]">头痛</el-checkbox>
        <el-checkbox v-model="infoForm.g008[2]">头沉</el-checkbox>
        <el-checkbox v-model="infoForm.g008[3]">眼花</el-checkbox>
        <el-checkbox v-model="infoForm.g008[4]">目涩（眼干）</el-checkbox>
        <el-checkbox v-model="infoForm.g008[5]">目酸胀</el-checkbox>
        <el-checkbox v-model="infoForm.g008[6]">耳鸣</el-checkbox>
        <el-checkbox v-model="infoForm.g008[7]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="9.口咽部">
        <el-checkbox v-model="infoForm.g009[0]">口苦</el-checkbox>
        <el-checkbox v-model="infoForm.g009[1]">口渴多饮</el-checkbox>
        <el-checkbox v-model="infoForm.g009[2]">口干不欲饮</el-checkbox>
        <el-checkbox v-model="infoForm.g009[3]">口黏</el-checkbox>
        <el-checkbox v-model="infoForm.g009[4]">咽干</el-checkbox>
        <el-checkbox v-model="infoForm.g009[5]">咽痛</el-checkbox>
        <el-checkbox v-model="infoForm.g009[6]">咽痒</el-checkbox>
        <el-checkbox v-model="infoForm.g009[7]">咽部异物感</el-checkbox>
        <el-checkbox v-model="infoForm.g009[8]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="10.胸胁部">
        <el-checkbox v-model="infoForm.g010[0]">胸闷</el-checkbox>
        <el-checkbox v-model="infoForm.g010[1]">心慌</el-checkbox>
        <el-checkbox v-model="infoForm.g010[2]">气短</el-checkbox>
        <el-checkbox v-model="infoForm.g010[3]">乳房胀痛</el-checkbox>
        <el-checkbox v-model="infoForm.g010[4]">胸胁胀痛</el-checkbox>
        <el-checkbox v-model="infoForm.g010[5]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="11.形体、四肢 ">
        <el-checkbox v-model="infoForm.g011[0]">形体肥胖</el-checkbox>
        <el-checkbox v-model="infoForm.g011[1]">形体偏瘦</el-checkbox>
        <el-checkbox v-model="infoForm.g011[2]">手足凉</el-checkbox>
        <el-checkbox v-model="infoForm.g011[3]">五心烦热（手足心热）</el-checkbox>
        <el-checkbox v-model="infoForm.g011[4]">腰酸</el-checkbox>
        <el-checkbox v-model="infoForm.g011[5]">腿软</el-checkbox>
        <el-checkbox v-model="infoForm.g011[6]">肢体麻木</el-checkbox>
        <el-checkbox v-model="infoForm.g011[7]">四肢发沉</el-checkbox>
        <el-checkbox v-model="infoForm.g011[8]">四肢浮肿</el-checkbox>
        <el-checkbox v-model="infoForm.g011[9]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="12.饮食口味">
        <el-checkbox v-model="infoForm.g012[0]">食欲不振</el-checkbox>
        <el-checkbox v-model="infoForm.g012[1]">多食易饥</el-checkbox>
        <el-checkbox v-model="infoForm.g012[2]">喜热饮</el-checkbox>
        <el-checkbox v-model="infoForm.g012[3]">喜冷饮</el-checkbox>
        <el-checkbox v-model="infoForm.g012[4]">喜甜食</el-checkbox>
        <el-checkbox v-model="infoForm.g012[5]">喜辛辣</el-checkbox>
        <el-checkbox v-model="infoForm.g012[6]">食后胃胀</el-checkbox>
        <el-checkbox v-model="infoForm.g012[7]">反酸烧心</el-checkbox>
        <el-checkbox v-model="infoForm.g012[8]">呃逆（打嗝）</el-checkbox>
        <el-checkbox v-model="infoForm.g012[9]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="13.睡眠">
        <el-checkbox v-model="infoForm.g013[0]">眠浅</el-checkbox>
        <el-checkbox v-model="infoForm.g013[1]">多梦</el-checkbox>
        <el-checkbox v-model="infoForm.g013[2]">难以入眠</el-checkbox>
        <el-checkbox v-model="infoForm.g013[3]">嗜睡</el-checkbox>
        <el-checkbox v-model="infoForm.g013[4]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="14.大便">
        <el-checkbox v-model="infoForm.g014[0]">便干</el-checkbox>
        <el-checkbox v-model="infoForm.g014[1]">质稀</el-checkbox>
        <el-checkbox v-model="infoForm.g014[2]">时干时稀</el-checkbox>
        <el-checkbox v-model="infoForm.g014[3]">质黏</el-checkbox>
        <el-checkbox v-model="infoForm.g014[4]">夹杂未消化食物</el-checkbox>
        <el-checkbox v-model="infoForm.g014[5]">排便不畅</el-checkbox>
        <el-checkbox v-model="infoForm.g014[6]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="15.小便">
        <el-checkbox v-model="infoForm.g015[0]">黄</el-checkbox>
        <el-checkbox v-model="infoForm.g015[1]">多尿</el-checkbox>
        <el-checkbox v-model="infoForm.g015[2]">少尿</el-checkbox>
        <el-checkbox v-model="infoForm.g015[3]">尿频</el-checkbox>
        <el-checkbox v-model="infoForm.g015[4]">尿不尽</el-checkbox>
        <el-checkbox v-model="infoForm.g015[5]">排尿不畅</el-checkbox>
        <el-checkbox v-model="infoForm.g015[6]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="16.平素带下情况">
        <el-checkbox v-model="infoForm.g016[0]">量少</el-checkbox>
        <el-checkbox v-model="infoForm.g016[1]">量多</el-checkbox>
        <el-checkbox v-model="infoForm.g016[2]">色黄</el-checkbox>
        <el-checkbox v-model="infoForm.g016[3]">质稀</el-checkbox>
        <el-checkbox v-model="infoForm.g016[4]">质稠</el-checkbox>
        <el-checkbox v-model="infoForm.g016[5]">异味</el-checkbox>
        <el-checkbox v-model="infoForm.g016[6]">正常</el-checkbox>
      </el-form-item>

      <el-form-item label="17.舌质">
        <el-checkbox v-model="infoForm.g017[0]">舌淡红</el-checkbox>
        <el-checkbox v-model="infoForm.g017[1]">舌红</el-checkbox>
        <el-checkbox v-model="infoForm.g017[2]">舌暗</el-checkbox>
        <el-checkbox v-model="infoForm.g017[3]">舌淡</el-checkbox>
        <el-checkbox v-model="infoForm.g017[4]">舌有瘀斑或瘀点</el-checkbox>
        <el-checkbox v-model="infoForm.g017[5]">舌体胖大</el-checkbox>
        <el-checkbox v-model="infoForm.g017[6]">舌体瘦小</el-checkbox>
        <el-checkbox v-model="infoForm.g017[7]">舌有齿痕</el-checkbox>
        <el-checkbox v-model="infoForm.g017[8]">舌有裂纹</el-checkbox>
      </el-form-item>

      <el-form-item label="18.舌苔">
        <el-checkbox v-model="infoForm.g018[0]">苔白</el-checkbox>
        <el-checkbox v-model="infoForm.g018[1]">苔黄</el-checkbox>
        <el-checkbox v-model="infoForm.g018[2]">苔厚</el-checkbox>
        <el-checkbox v-model="infoForm.g018[3]">苔腻</el-checkbox>
        <el-checkbox v-model="infoForm.g018[4]">苔薄</el-checkbox>
        <el-checkbox v-model="infoForm.g018[5]">少苔</el-checkbox>
        <el-checkbox v-model="infoForm.g018[6]">苔剥脱</el-checkbox>
      </el-form-item>

      <el-form-item label="19.脉象">
        <el-checkbox v-model="infoForm.g019[0]">弦</el-checkbox>
        <el-checkbox v-model="infoForm.g019[1]">滑</el-checkbox>
        <el-checkbox v-model="infoForm.g019[2]">细</el-checkbox>
        <el-checkbox v-model="infoForm.g019[3]">数</el-checkbox>
        <el-checkbox v-model="infoForm.g019[4]">浮</el-checkbox>
        <el-checkbox v-model="infoForm.g019[5]">沉</el-checkbox>
        <el-checkbox v-model="infoForm.g019[6]">迟</el-checkbox>
        <el-checkbox v-model="infoForm.g019[7]">结</el-checkbox>
        <el-checkbox v-model="infoForm.g019[8]">代</el-checkbox>
        <el-checkbox v-model="infoForm.g019[9]">涩</el-checkbox>
        <el-checkbox v-model="infoForm.g019[10]">缓</el-checkbox>
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
  apiGetPatientDataForm
} from "@/api/api-prj006";

export default {
  name: "Relevant",
  data() {
    return {
      infoForm: {
        g001: [false, false, false, false, false, false],
        g002: [
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
        g003: [
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
        g004: [false, false, false, false],
        g005: [false, false, false, false, false, false, false],
        g006: [false, false, false, false],
        g007: [false, false, false, false, false, false, false, false],
        g008: [false, false, false, false, false, false, false, false],
        g009: [false, false, false, false, false, false, false, false, false],
        g010: [false, false, false, false, false, false],
        g011: [
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
        g012: [
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
        g013: [false, false, false, false, false],
        g014: [false, false, false, false, false, false, false],
        g015: [false, false, false, false, false, false, false],
        g016: [false, false, false, false, false, false, false],
        g017: [false, false, false, false, false, false, false, false, false],
        g018: [false, false, false, false, false, false, false],
        g019: [
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
      formName: "clinical",
      isOwnedByUser: true,
      check_status: "",
      _id: ""
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
        formName: this.formName
      })
        .then(res => {
          if (Object.keys(res).length != 0) {
            this.infoForm = this.parseInfoForm(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateInfoForm() {
      if (this._id) {
        apiUpdatePatientDataForm({
          infoForm: this.infoForm,
          _id: this._id,
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
    }
  }
};
</script>
