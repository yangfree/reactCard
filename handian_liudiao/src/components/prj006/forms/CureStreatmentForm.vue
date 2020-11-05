<template>
  <el-dialog
    title="本次治疗情况"
    class="my-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
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
      <el-form-item label="1、本次诊疗目标">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.k001[0]">辅助怀孕</el-checkbox>
        <el-checkbox v-model="infoForm.k001[1]">控制包块或病灶</el-checkbox>
        <el-checkbox v-model="infoForm.k001[2]">缓解疼痛</el-checkbox>
        <el-checkbox v-model="infoForm.k001[3]">抑制复发</el-checkbox>
        <el-checkbox v-model="infoForm.k001[4]">调整月经周期</el-checkbox>
        <el-checkbox v-model="infoForm.k001[5]">减少经量</el-checkbox>
        <el-checkbox v-model="infoForm.k001[6]">增加经量</el-checkbox>
        <el-checkbox v-model="infoForm.k001[7]">复查</el-checkbox>
        <el-checkbox v-model="infoForm.k001[8]">其他</el-checkbox>
        <el-input v-model="infoForm.k001a"></el-input>
      </el-form-item>

      <el-form-item label="2、此病人辨证分型为">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.k002[0]">气滞</el-checkbox>
        <el-checkbox v-model="infoForm.k002[1]">血瘀</el-checkbox>
        <el-checkbox v-model="infoForm.k002[2]">寒凝</el-checkbox>
        <el-checkbox v-model="infoForm.k002[3]">痰湿</el-checkbox>
        <el-checkbox v-model="infoForm.k002[4]">湿热</el-checkbox>
        <el-checkbox v-model="infoForm.k002[5]">热郁</el-checkbox>
        <el-checkbox v-model="infoForm.k002[6]">气虚</el-checkbox>
        <el-checkbox v-model="infoForm.k002[7]">血虚</el-checkbox>
        <el-checkbox v-model="infoForm.k002[8]">肾虚</el-checkbox>
        <el-checkbox v-model="infoForm.k002[9]">脾虚</el-checkbox>
        <el-checkbox v-model="infoForm.k002[10]">阴虚</el-checkbox>
      </el-form-item>

      <el-form-item label="3、此次治疗采取哪些治疗方式?">
        <el-tag type="danger" size="mini">多选</el-tag>
        <el-checkbox v-model="infoForm.k003[0]" @change="getCureHideCodeOne">止痛药</el-checkbox>
        <el-checkbox v-model="infoForm.k003[1]" @change="getCureHideCodeOne">其他西药治疗</el-checkbox>
        <el-checkbox v-model="infoForm.k003[2]" @change="getCureHideCodeOne">建议手术</el-checkbox>
        <el-checkbox v-model="infoForm.k003[3]" @change="getCureHideCodeOne">助孕治疗</el-checkbox>
        <el-checkbox v-model="infoForm.k003[4]" @change="getCureHideCodeOne">中药汤剂治疗</el-checkbox>
        <el-checkbox v-model="infoForm.k003[5]" @change="getCureHideCodeOne">中成药治疗</el-checkbox>
        <el-checkbox v-model="infoForm.k003[6]" @change="getCureHideCodeOne">中医外治</el-checkbox>
        <el-checkbox v-model="infoForm.k003[7]" @change="getCureHideCodeOne">其他</el-checkbox>
        <el-input v-model="infoForm.k003a"></el-input>
      </el-form-item>

      <div v-show="testOne.k004_k007 === '0' ? false : true">
        <el-form-item label="4、采用哪些止痛药治疗?">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.k004[0]" @change="getCureHideCodeTwo">口服药</el-checkbox>
          <el-checkbox v-model="infoForm.k004[1]" @change="getCureHideCodeTwo">注射剂或针剂</el-checkbox>
          <el-checkbox v-model="infoForm.k004[2]" @change="getCureHideCodeTwo">外用药</el-checkbox>
        </el-form-item>

        <div v-show="testTwo.k005 === '0' ? false : true">
          <el-form-item label="5、采用哪种口服止痛药治疗?">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.k005[0]">布洛芬</el-checkbox>
            <el-checkbox v-model="infoForm.k005[1]">复方阿司匹林片</el-checkbox>
            <el-checkbox v-model="infoForm.k005[2]">去痛片</el-checkbox>
            <el-checkbox v-model="infoForm.k005[3]">消炎痛片</el-checkbox>
            <el-checkbox v-model="infoForm.k005[4]">尼美舒利颗粒</el-checkbox>
            <el-checkbox v-model="infoForm.k005[5]">萘普生片</el-checkbox>
            <el-checkbox v-model="infoForm.k005[6]">甲芬那酸片/胶囊</el-checkbox>
            <el-checkbox v-model="infoForm.k005[7]">吡罗昔康（炎痛喜康片）</el-checkbox>
            <el-checkbox v-model="infoForm.k005[8]">酮洛芬片/胶囊</el-checkbox>
            <el-checkbox v-model="infoForm.k005[9]">曲马多缓释片</el-checkbox>
            <el-checkbox v-model="infoForm.k005[10]">盐酸吗啡片/缓释片</el-checkbox>
            <el-checkbox v-model="infoForm.k005[11]">双氯芬酸缓释片/钾片</el-checkbox>
          </el-form-item>
        </div>

        <div v-show="testTwo.k006 === '0' ? false : true">
          <el-form-item label="6、使用哪种注射剂止痛药治疗？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.k006[0]">盐酸布桂嗪（强痛定）注射液</el-checkbox>
            <el-checkbox v-model="infoForm.k006[1]">盐酸哌替啶（杜冷丁）注射液</el-checkbox>
            <el-checkbox v-model="infoForm.k006[2]">盐酸吗啡注射液</el-checkbox>
            <el-checkbox v-model="infoForm.k006[3]">复方氨林巴比妥（安痛定）注射液</el-checkbox>
            <el-checkbox v-model="infoForm.k006[4]">其他</el-checkbox>
            <el-input v-model="infoForm.k006a"></el-input>
          </el-form-item>
        </div>

        <div v-show="testTwo.k007 === '0' ? false : true">
          <el-form-item label="7、使用哪种外用止痛药治疗？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.k007[0]">吲哚美辛栓</el-checkbox>
            <el-checkbox v-model="infoForm.k007[1]">其他</el-checkbox>
            <el-input v-model="infoForm.k007a"></el-input>
          </el-form-item>
        </div>
      </div>

      <div v-show="testOne.k008 === '0' ? false : true">
        <el-form-item label="8、采用哪种其他西药治疗？">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.k008[0]">亮丙瑞林</el-checkbox>
          <el-checkbox v-model="infoForm.k008[1]">戈舍瑞林</el-checkbox>
          <el-checkbox v-model="infoForm.k008[2]">曲普瑞林</el-checkbox>
          <el-checkbox v-model="infoForm.k008[3]">抑那通</el-checkbox>
          <el-checkbox v-model="infoForm.k008[4]">曼月乐环</el-checkbox>
          <el-checkbox v-model="infoForm.k008[5]">地诺孕素</el-checkbox>
          <el-checkbox v-model="infoForm.k008[6]">妈富隆</el-checkbox>
          <el-checkbox v-model="infoForm.k008[7]">优思明</el-checkbox>
          <el-checkbox v-model="infoForm.k008[8]">优思悦</el-checkbox>
          <el-checkbox v-model="infoForm.k008[9]">达英-35</el-checkbox>
          <el-checkbox v-model="infoForm.k008[10]">米非司酮</el-checkbox>
          <el-checkbox v-model="infoForm.k008[11]">达那唑</el-checkbox>
          <el-checkbox v-model="infoForm.k008[12]">孕三烯酮</el-checkbox>
          <el-checkbox v-model="infoForm.k008[13]">醋酸甲羟孕酮</el-checkbox>
          <el-checkbox v-model="infoForm.k008[14]">醋酸甲地孕酮</el-checkbox>
          <el-checkbox v-model="infoForm.k008[15]">其他</el-checkbox>
          <el-input v-model="infoForm.k008a"></el-input>
        </el-form-item>
      </div>

      <!-- <h4>若为内异症</h4> -->
      <div v-show="testOne.k009_k011 === '0' ? false : true">
        <div v-if="hideOrShow.k009==='0'? false: true">
          <el-form-item label="9、建议采取哪种手术治疗？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.k009[0]">巧囊剥除术</el-checkbox>
            <el-checkbox v-model="infoForm.k009[1]">巧囊穿刺术</el-checkbox>
            <el-checkbox v-model="infoForm.k009[2]">单侧附件切除术</el-checkbox>
            <el-checkbox v-model="infoForm.k009[3]">双侧附件切除术</el-checkbox>
            <el-checkbox v-model="infoForm.k009[4]">全子宫切除术</el-checkbox>
            <el-checkbox v-model="infoForm.k009[5]">神经阻断手术</el-checkbox>
            <el-checkbox v-model="infoForm.k009[6]">其他</el-checkbox>
            <el-input v-model="infoForm.k009a"></el-input>
          </el-form-item>
        </div>

        <!-- <h4>若为腺肌病</h4> -->
        <div v-if="hideOrShow.k010==='0'? false: true">
          <el-form-item label="10、建议采取哪种手术治疗？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.k010[0]">腺肌瘤切除术</el-checkbox>
            <el-checkbox v-model="infoForm.k010[1]">子宫楔形切除术</el-checkbox>
            <el-checkbox v-model="infoForm.k010[2]">内膜切除术</el-checkbox>
            <el-checkbox v-model="infoForm.k010[3]">子宫动脉栓塞术</el-checkbox>
            <el-checkbox v-model="infoForm.k010[4]">高强度聚焦超声（HIFU）</el-checkbox>
            <el-checkbox v-model="infoForm.k010[5]">射频消融术</el-checkbox>
            <el-checkbox v-model="infoForm.k010[6]">微波消融术</el-checkbox>
            <el-checkbox v-model="infoForm.k010[7]">诊刮术</el-checkbox>
            <el-checkbox v-model="infoForm.k010[8]">全子宫切除术</el-checkbox>
            <el-checkbox v-model="infoForm.k010[9]">神经阻断手术</el-checkbox>
            <el-checkbox v-model="infoForm.k010[10]">其他</el-checkbox>
            <el-input v-model="infoForm.k010a"></el-input>
          </el-form-item>
        </div>

        <!-- <h4>若为均有</h4> -->
        <div v-if="hideOrShow.k011==='0'? false: true">
          <el-form-item label="11、建议采取哪种手术治疗？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.k011[0]">巧囊剥除术</el-checkbox>
            <el-checkbox v-model="infoForm.k011[1]">B超引导下巧囊穿刺</el-checkbox>
            <el-checkbox v-model="infoForm.k011[2]">全子宫切除术</el-checkbox>
            <el-checkbox v-model="infoForm.k011[3]">单侧附件切除术</el-checkbox>
            <el-checkbox v-model="infoForm.k011[4]">双侧附件切除术</el-checkbox>
            <el-checkbox v-model="infoForm.k011[5]">腺肌瘤切除术</el-checkbox>
            <el-checkbox v-model="infoForm.k011[6]">子宫楔形切除术</el-checkbox>
            <el-checkbox v-model="infoForm.k011[7]">内膜切除术</el-checkbox>
            <el-checkbox v-model="infoForm.k011[8]">诊刮术</el-checkbox>
            <el-checkbox v-model="infoForm.k011[9]">高强度聚焦超声（HIFU）</el-checkbox>
            <el-checkbox v-model="infoForm.k011[10]">射频消融术</el-checkbox>
            <el-checkbox v-model="infoForm.k011[11]">微波消融术</el-checkbox>
            <el-checkbox v-model="infoForm.k011[12]">神经阻断手术</el-checkbox>
            <el-checkbox v-model="infoForm.k011[13]">其他</el-checkbox>
            <el-input v-model="infoForm.k011a"></el-input>
          </el-form-item>
        </div>
      </div>

      <div v-show="testOne.k012_k013 === '0' ? false : true">
        <el-form-item label="12、建议采取哪种助孕手段？">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox
            v-model="infoForm.k012[0]"
            @change="getCureHideCodeThree"
          >生育指导（使用BBT、试纸、超声监测排卵）</el-checkbox>
          <el-checkbox v-model="infoForm.k012[1]" @change="getCureHideCodeThree">促排卵治疗</el-checkbox>
          <el-checkbox v-model="infoForm.k012[2]" @change="getCureHideCodeThree">人工授精</el-checkbox>
          <el-checkbox v-model="infoForm.k012[3]" @change="getCureHideCodeThree">试管婴儿</el-checkbox>
        </el-form-item>

        <div v-show="testTree.k013 === '0' ? false : true">
          <el-form-item label="13、建议辅助生殖（人工授精或试管婴儿）的原因？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.k013[0]">男方因素</el-checkbox>
            <el-checkbox v-model="infoForm.k013[1]">输卵管因素</el-checkbox>
            <el-checkbox v-model="infoForm.k013[2]">排卵障碍</el-checkbox>
            <span v-if="hideOrShow.k013_4==='0'? false: true">
              <el-checkbox v-model="infoForm.k013[3]">内异症手术分期高</el-checkbox>
            </span>
            <el-checkbox v-model="infoForm.k013[4]">宫腔因素</el-checkbox>
            <el-checkbox v-model="infoForm.k013[5]">不孕病程较长</el-checkbox>
            <el-checkbox v-model="infoForm.k013[6]">年龄因素</el-checkbox>
            <el-checkbox v-model="infoForm.k013[7]">其他</el-checkbox>
            <el-input v-model="infoForm.k013a"></el-input>
          </el-form-item>
        </div>
      </div>

      <div v-show="testOne.k014 === '0' ? false : true">
        <el-form-item label="14、采用下列哪些中药汤剂治疗">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.k014[0]">少腹逐瘀汤</el-checkbox>
          <el-checkbox v-model="infoForm.k014[1]">膈下逐瘀汤</el-checkbox>
          <el-checkbox v-model="infoForm.k014[2]">归肾丸</el-checkbox>
          <el-checkbox v-model="infoForm.k014[3]">失笑散</el-checkbox>
          <el-checkbox v-model="infoForm.k014[4]">橘核丸</el-checkbox>
          <el-checkbox v-model="infoForm.k014[5]">清热调血汤</el-checkbox>
          <el-checkbox v-model="infoForm.k014[6]">桃红四物汤</el-checkbox>
          <el-checkbox v-model="infoForm.k014[7]">苍附导痰丸</el-checkbox>
          <el-checkbox v-model="infoForm.k014[8]">自拟方组成及剂量</el-checkbox>
          <el-input v-model="infoForm.k014a"></el-input>
        </el-form-item>
      </div>

      <div v-show="testOne.k015 === '0' ? false : true">
        <el-form-item label="15、采用哪种中成药治疗">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.k015[0]">丹莪妇康煎膏</el-checkbox>
          <el-checkbox v-model="infoForm.k015[1]">桂枝茯苓胶囊</el-checkbox>
          <el-checkbox v-model="infoForm.k015[2]">散结镇痛胶囊</el-checkbox>
          <el-checkbox v-model="infoForm.k015[3]">葆宫止血颗粒</el-checkbox>
          <el-checkbox v-model="infoForm.k015[4]">宫血宁胶囊</el-checkbox>
          <el-checkbox v-model="infoForm.k015[5]">茜芷片</el-checkbox>
          <el-checkbox v-model="infoForm.k015[6]">云南白药</el-checkbox>
          <el-checkbox v-model="infoForm.k015[7]">当归补血口服液</el-checkbox>
          <el-checkbox v-model="infoForm.k015[8]">复方阿胶浆</el-checkbox>
          <el-checkbox v-model="infoForm.k015[9]">益气维血胶囊</el-checkbox>
          <el-checkbox v-model="infoForm.k015[10]">生血宝合剂</el-checkbox>
          <el-checkbox v-model="infoForm.k015[11]">其他</el-checkbox>
          <el-input v-model="infoForm.k015a"></el-input>
        </el-form-item>
      </div>

      <div v-show="testOne.k016_k022 === '0' ? false : true">
        <el-form-item label="16、采用哪种中医外治技术？">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.k016[0]" @change="getCureHideCodeFour">中药灌肠</el-checkbox>
          <el-checkbox v-model="infoForm.k016[1]" @change="getCureHideCodeFour">中药阴道上药</el-checkbox>
          <el-checkbox v-model="infoForm.k016[2]" @change="getCureHideCodeFour">中药外敷</el-checkbox>
          <el-checkbox v-model="infoForm.k016[3]" @change="getCureHideCodeFour">针灸</el-checkbox>
          <el-checkbox v-model="infoForm.k016[4]" @change="getCureHideCodeFour">理疗</el-checkbox>
          <el-checkbox v-model="infoForm.k016[5]" @change="getCureHideCodeFour">其他</el-checkbox>
          <el-input v-model="infoForm.k016a"></el-input>
        </el-form-item>

        <div v-show="testFour.k017 === '0' ? false : true">
          <el-form-item label="17、中药灌肠方组成及剂量">
            <el-input v-model="infoForm.k017"></el-input>
          </el-form-item>
        </div>

        <div v-show="testFour.k018 === '0' ? false : true">
          <el-form-item label="18、中药阴道上药方组成及剂量">
            <el-input v-model="infoForm.k018"></el-input>
          </el-form-item>
        </div>

        <div v-show="testFour.k019 === '0' ? false : true">
          <el-form-item label="19、中药外敷方药物组成及剂量">
            <el-input v-model="infoForm.k019"></el-input>
          </el-form-item>
        </div>

        <div v-show="testFour.k020_k021 === '0' ? false : true">
          <el-form-item label="20、采用下列哪种针灸疗法">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.k020[0]">普通针刺</el-checkbox>
            <el-checkbox v-model="infoForm.k020[1]">电针</el-checkbox>
            <el-checkbox v-model="infoForm.k020[2]">穴位注射</el-checkbox>
            <el-checkbox v-model="infoForm.k020[3]">耳针</el-checkbox>
            <el-checkbox v-model="infoForm.k020[4]">埋线</el-checkbox>
            <el-checkbox v-model="infoForm.k020[5]">普通艾灸</el-checkbox>
            <el-checkbox v-model="infoForm.k020[6]">隔药灸</el-checkbox>
          </el-form-item>

          <el-form-item label="21、针灸穴位处方：">
            <el-input v-model="infoForm.k021"></el-input>
          </el-form-item>
        </div>

        <div v-show="testFour.k022 === '0' ? false : true">
          <el-form-item label="22、采用下列哪组理疗方法">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.k022[0]">TDP灯</el-checkbox>
            <el-checkbox v-model="infoForm.k022[1]">红外线</el-checkbox>
            <el-checkbox v-model="infoForm.k022[2]">微波</el-checkbox>
            <el-checkbox v-model="infoForm.k022[3]">周林频谱仪</el-checkbox>
            <el-checkbox v-model="infoForm.k022[4]">中药离子导入</el-checkbox>
            <el-checkbox v-model="infoForm.k022[5]">其他</el-checkbox>
            <el-input v-model="infoForm.k022a"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="alert-info" style="text-align:center;color: red;width: 100%;">*** 本表格所有选项均为必填信息 ***</div>
    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { apiUpdatePatientDataForm, apiGetHideCode } from "@/api/api-prj006";

export default {
  name: "CureStreatmentForm",
  data() {
    return {
      infoForm: {
        k001: [false, false, false, false, false, false, false, false, false],
        k001a: "",
        k002: [
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
        k003: [false, false, false, false, false, false, false, false],
        k003a: "",
        k004: [false, false, false],
        k005: [
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
        k006: [false, false, false, false, false],
        k006a: "",
        k007: [false, false],
        k007a: "",
        k008: [
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
          false,
        ],
        k008a: "",
        k009: [false, false, false, false, false, false, false],
        k009a: "",
        k010: [
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
        k010a: "",
        k011: [
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
        k011a: "",
        k012: [false, false, false, false],
        k013: [false, false, false, false, false, false, false, false],
        k013a: "",
        k014: [false, false, false, false, false, false, false, false, false],
        k014a: "",
        k015: [
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
        k015a: "",
        k016: [false, false, false, false, false, false],
        k016a: "",
        k017: "",
        k018: "",
        k019: "",
        k020: [false, false, false, false, false, false, false],
        k021: "",
        k022: [false, false, false, false, false, false],
        k022a: "",
        // k023: "",
        // k024: "",
        // k025: "",
        // k026: "",
        // k027: "",
        // k028: "",
        // k029: "",
        // k030: "",
        // k031: "",
        // k032: [false, false, false, false, false, false, false, false],
        // k033: [false, false, false, false, false, false, false],
        // k034: [false, false, false, false, false, false, false],
        // k035: [false, false, false, false, false, false],
        // k036: [false, false, false, false, false],
        // k037: [false, false, false, false, false, false, false, false],
        // k037a: "",
        // k038: "",
        // k039: "",
        // k040: "",
        // k041: "",
        // k042: "",
        // k043: "",
        // k044: [false, false, false, false, false, false, false, false],
        // k045: [false, false, false, false, false, false, false],
        // k046: [false, false, false, false, false, false, false, false],
        // k047: [false, false, false, false, false, false],
        // k048: [false, false, false, false, false],
        // k049: [false, false, false, false, false, false, false, false],
        // k049a: "",
        // k050: "",
        // k051: "",
        // k052: "",
        // k053: "",
        // k054: "",
        // k055: "",
        // k056: "",
        // k057: "",
        // k058: "",
        // k059: "",
        // k060: "",
        // k061: "",
        // k062: "",
        // k063: [false, false, false, false, false, false, false, false],
        // k064: [false, false, false, false, false, false, false],
        // k065: [false, false, false, false, false, false, false, false],
        // k066: [false, false, false, false, false, false],
        // k067: [false, false, false, false, false],
        // k068: [false, false, false, false, false, false, false, false],
        // k068a: ""
      },
      dialogVisible: false,
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: "",
      hideOrShow: {
        k009: "0",
        k010: "0",
        k011: "0",
        k013_4: "0",
      },
      testOne: {
        k004_k007: "0",
        k008: "0",
        k009_k011: "0",
        k012_k013: "0",
        k014: "0",
        k015: "0",
        k016_k022: "0",
      },
      testTwo: {
        k005: "0",
        k006: "0",
        k007: "0",
      },
      testTree: {
        k013: "0",
      },
      testFour: {
        k017: "0",
        k018: "0",
        k019: "0",
        k020_k021: "0",
        k022: "0",
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

        this.getCureHideCodeOne();
        this.getCureHideCodeTwo();
        this.getCureHideCodeThree();
        this.getCureHideCodeFour();
      }

      this.getHideCode(data.formName, data._id);
    });
  },
  methods: {
    getCureHideCodeFour() {
      let params = {
        question: "k016",
        answer: JSON.stringify(this.infoForm.k016),
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
    getCureHideCodeThree() {
      let params = {
        question: "k012",
        answer: JSON.stringify(this.infoForm.k012),
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testTree = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHideCodeTwo() {
      let params = {
        question: "k004",
        answer: JSON.stringify(this.infoForm.k004),
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
    getCureHideCodeOne() {
      let params = {
        question: "k003",
        answer: JSON.stringify(this.infoForm.k003),
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
