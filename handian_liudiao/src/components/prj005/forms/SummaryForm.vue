<template>
  <el-dialog title="病情概要" class="my-dialog summary-dialog prj005-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="summaryForm" :model="summaryForm" label-width="70px" label-position="left">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-alert v-if="check_status=='已提交'" effect="dark"
                  title="此条信息已经提交审核,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <p></p>
      <el-alert v-if="!isOwnedByUser" effect="dark"
                  title="此条信息为其他用户创建，您无法修改"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <p></p>

      <h4>主诉</h4>
        <p class="prj005-summary">
          下腹部疼痛
          <el-input v-model="summaryForm.main_xiafu" style="width:250px;" type="number">
            <el-select v-model="summaryForm.main_xiafu_unit" slot="append" placeholder="单位">
              <el-option label="天" value="天"></el-option>
              <el-option label="月" value="月"></el-option>
              <el-option label="年" value="年"></el-option>
            </el-select>
          </el-input>
          ，加重
          <el-input v-model="summaryForm.main_xiafu_more" style="width:250px;" type="number">
            <span slot="append">天</span>
          </el-input>
        </p>
        <p class="prj005-summary">
          腰骶疼痛&nbsp;&nbsp;&nbsp;
          <el-input v-model="summaryForm.main_yao" style="width:250px;" type="number">
            <el-select v-model="summaryForm.main_yao_unit" slot="append" placeholder="单位">
              <el-option label="天" value="天"></el-option>
              <el-option label="月" value="月"></el-option>
              <el-option label="年" value="年"></el-option>
            </el-select>
          </el-input>
          ，加重
          <el-input v-model="summaryForm.main_yao_more" style="width:250px;" type="number">
            <span slot="append">天</span>
          </el-input>
        </p>
        <p class="prj005-summary">
          发热&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-input v-model="summaryForm.main_fare" style="width:250px;" type="number">
            <el-select v-model="summaryForm.main_fare_unit" slot="append" placeholder="单位">
              <el-option label="天" value="天"></el-option>
              <el-option label="月" value="月"></el-option>
              <el-option label="年" value="年"></el-option>
            </el-select>
          </el-input>
        </p>
        <p class="prj005-summary">
          白带异常&nbsp;&nbsp;&nbsp;
          <el-input v-model="summaryForm.main_baidai" style="width:250px;" type="number">
            <el-select v-model="summaryForm.main_baidai_unit" slot="append" placeholder="单位">
              <el-option label="天" value="天"></el-option>
              <el-option label="月" value="月"></el-option>
              <el-option label="年" value="年"></el-option>
            </el-select>
          </el-input>
        </p>
        <p class="prj005-summary">
          月经异常&nbsp;&nbsp;&nbsp;
          <el-input v-model="summaryForm.main_yuejing" style="width:250px;" type="number">
            <el-select v-model="summaryForm.main_yuejing_unit" slot="append" placeholder="单位">
              <el-option label="天" value="天"></el-option>
              <el-option label="月" value="月"></el-option>
              <el-option label="年" value="年"></el-option>
            </el-select>
          </el-input>
        </p>
        <p class="prj005-summary">
          其他&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-input v-model="summaryForm.main_qita" style="width:250px;" placeholder="其他">
            <!-- <el-select v-model="summaryForm.main_qita_unit" slot="append" placeholder="单位">
              <el-option label="天" value="天"></el-option>
              <el-option label="月" value="月"></el-option>
              <el-option label="年" value="年"></el-option>
            </el-select> -->
          </el-input>
        </p>

      <h4>疼痛部位</h4>
        <el-checkbox v-for="(val, key) in part"
                  v-model="summaryForm[key]"
                  :key="key" :label="val">
        </el-checkbox>
        <el-input v-model="summaryForm.part_qita" placeholder="其他"></el-input>
      <h4>疼痛持续时间</h4>
        <el-checkbox v-for="(val, key) in duration"
                  v-model="summaryForm[key]"
                  :key="key" :label="val">
        </el-checkbox>
      <h4>疼痛性质</h4>
        <el-checkbox v-for="(val, key) in pain"
                  v-model="summaryForm[key]"
                  :key="key" :label="val">
        </el-checkbox>
        <el-input v-model="summaryForm.pain_qita" placeholder="其他"></el-input>
      <h4>疼痛加重及缓解因素</h4>
        <el-checkbox v-for="(val, key) in pain_more"
                  v-model="summaryForm[key]"
                  :key="key" :label="val">
        </el-checkbox>
      <h4>疼痛与月经的关系</h4>
        <el-checkbox  v-model="summaryForm['pain_menses_wu']" label="与月经无关"></el-checkbox>
        <el-checkbox v-for="(val, key) in pain_menses"
                  v-model="summaryForm[key]"
                  :key="key" :label="val"
                  v-show="summaryForm.pain_menses_wu !== true">
        </el-checkbox>
      <h4>疼痛与季节、时间的关系</h4>
        <el-checkbox  v-model="summaryForm['pain_season_wu']" label="与季节无关"></el-checkbox>
        <el-checkbox v-for="(val, key) in pain_season"
                  v-model="summaryForm[key]"
                  :key="key" :label="val"
                  v-show="summaryForm.pain_season_wu !== true">
        </el-checkbox>
        <p></p>
        <el-checkbox  v-model="summaryForm['pain_time_wu']" label="与时辰无关 "></el-checkbox>
        <el-checkbox v-for="(val, key) in pain_time"
                  v-model="summaryForm[key]"
                  :key="key" :label="val"
                  v-show="summaryForm.pain_time_wu !== true">
        </el-checkbox>
      <h4>发热状态</h4>
        <el-radio v-model="summaryForm.fever_status"
                  v-for="item in fever_status"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="summaryForm.fever_status_qita" placeholder="其他"></el-input>
      <h4>带下异常情况</h4>
        <p>
          ①白带量：
          <el-radio v-model="summaryForm.leucorrhea_quantity"
                    v-for="item in leucorrhea_quantity"
                    :key="item" :label="item">
          </el-radio>
        </p>
        <p>
          ②白带颜色（可多选）：
          <el-checkbox v-for="(val, key) in leucorrhea_color"
                    v-model="summaryForm[key]"
                    :key="key" :label="val">
          </el-checkbox>
          <el-input v-model="summaryForm.leucorrhea_color_qita" placeholder="其他"></el-input>
        </p>
        <p>
          ③白带性状
          <el-radio v-model="summaryForm.leucorrhea_character"
                    v-for="item in leucorrhea_character"
                    :key="item" :label="item">
          </el-radio>
          <el-input v-model="summaryForm.leucorrhea_character_qita" placeholder="其他"></el-input>
        </p>
        <p>
          ④白带气味
          <el-radio v-model="summaryForm.leucorrhea_smell"
                    v-for="item in leucorrhea_smell"
                    :key="item" :label="item">
          </el-radio>
          <el-input v-model="summaryForm.leucorrhea_smell_qita" placeholder="其他"></el-input>
        </p>

      <h4>月经异常情况</h4>
        <p>
          ①末次月经行经天数
          <el-radio v-model="summaryForm.menses_days"
                    v-for="item in menses_days"
                    :key="item" :label="item">
          </el-radio>
        </p>
        <p>
          ②末次月经期出血量
          <el-radio v-model="summaryForm.menses_quantity" label="正常"></el-radio>
          <el-radio v-model="summaryForm.menses_quantity" label="增多"></el-radio>
            <span v-show="summaryForm.menses_quantity == '增多'">
              （<el-radio v-model="summaryForm.menses_quantity_more" label="1/3"></el-radio>
              <el-radio v-model="summaryForm.menses_quantity_more" label="1/2"></el-radio>
              <el-radio v-model="summaryForm.menses_quantity_more" label="1倍及以上"></el-radio>）
            </span>
          <el-radio v-model="summaryForm.menses_quantity" label="减少"></el-radio>
            <span v-show="summaryForm.menses_quantity == '减少'">
              （<el-radio v-model="summaryForm.menses_quantity_less" label="1/3"></el-radio>
              <el-radio v-model="summaryForm.menses_quantity_less" label="1/2"></el-radio>
              <el-radio v-model="summaryForm.menses_quantity_less" label="2/3"></el-radio>
              <el-radio v-model="summaryForm.menses_quantity_less" label="点滴即净"></el-radio>）
            </span>
          <el-input v-model="summaryForm.menses_quantity_qita" placeholder="其他"></el-input>
        </p>
        <p>
          ③末次月经颜色
          <el-radio v-model="summaryForm.menses_color"
                    v-for="item in menses_color"
                    :key="item" :label="item">
          </el-radio>
          <el-input v-model="summaryForm.menses_color_qita" placeholder="其他"></el-input>
        </p>
        <p>
          ④末次月经质地
          <el-checkbox v-for="(val, key) in menses_quality"
                    v-model="summaryForm[key]"
                    :key="key" :label="val">
          </el-checkbox>
        </p>
      <h4>主要症状出现的频率</h4>
          <p v-for="(val, key) in rate" :key="val">
            {{val}}：
            <el-switch v-model="summaryForm[key]" active-text="有" inactive-text="无"></el-switch>
            <span v-show="summaryForm[key]">
              (
              <el-radio v-model="summaryForm[key + '_exist']" label="偶尔"></el-radio>
              <el-radio v-model="summaryForm[key + '_exist']" label="有时"></el-radio>
              <el-radio v-model="summaryForm[key + '_exist']" label="经常"></el-radio>
              )
            </span>
          </p>
      <h4>精神情绪</h4>
        <el-checkbox v-for="(val, key) in spirit"
                  v-model="summaryForm[key]"
                  :key="key" :label="val">
        </el-checkbox>
        <el-input v-model="summaryForm.spirit_qita" placeholder="其他"></el-input>
      <h4>汗出</h4>
        <el-checkbox v-for="(val, key) in perspire"
                  v-model="summaryForm[key]"
                  :key="key" :label="val">
        </el-checkbox>
        <el-input v-model="summaryForm.perspire_qita" placeholder="其他"></el-input>
      <h4>面色</h4>
        <el-checkbox v-for="(val, key) in face"
                  v-model="summaryForm[key]"
                  :key="key" :label="val">
        </el-checkbox>
        <el-input v-model="summaryForm.face_qita" placeholder="其他"></el-input>

      <h4>头面部症状</h4>
        <el-checkbox v-for="(val, key) in head"
                  v-model="summaryForm[key]"
                  :key="key" :label="val">
        </el-checkbox>
        <el-input v-model="summaryForm.head_qita" placeholder="其他"></el-input>
      <h4>口咽部</h4>
        <el-checkbox v-for="(val, key) in mouth"
                  v-model="summaryForm[key]"
                  :key="key" :label="val">
        </el-checkbox>
        <el-input v-model="summaryForm.mouth_qita" placeholder="其他"></el-input>
      <h4>胸胁</h4>
        <el-checkbox v-for="(val, key) in chest"
                  v-model="summaryForm[key]"
                  :key="key" :label="val">
        </el-checkbox>
        <el-input v-model="summaryForm.chest_qita" placeholder="其他"></el-input>
      <h4>四肢</h4>
        <el-checkbox v-for="(val, key) in limbs"
                  v-model="summaryForm[key]"
                  :key="key" :label="val">
        </el-checkbox>
        <el-input v-model="summaryForm.limbs_qita" placeholder="其他"></el-input>
      <h4>饮食</h4>
        <el-checkbox v-for="(val, key) in diet"
                  v-model="summaryForm[key]"
                  :key="key" :label="val">
        </el-checkbox>
        <el-input v-model="summaryForm.diet_qita" placeholder="其他"></el-input>
      <h4>睡眠</h4>
        <el-checkbox v-for="(val, key) in sleep"
                  v-model="summaryForm[key]"
                  :key="key" :label="val">
        </el-checkbox>
        <el-input v-model="summaryForm.sleep_qita" placeholder="其他"></el-input>
      <h4>性欲</h4>
        <el-radio v-model="summaryForm.sexuality"
                  v-for="item in sexuality"
                  :key="item" :label="item">
        </el-radio>
      <h4>二便情况</h4>
        <p>
          ①大便：
          <el-checkbox v-model="summaryForm.feces_zc" label="正常"></el-checkbox>
          <el-checkbox v-model="summaryForm.feces_times" label="大便次数"></el-checkbox>
            <span v-show="summaryForm.feces_times == true">
              （<el-radio v-model="summaryForm.feces_times_choices" label="2-3日1次"></el-radio>
              <el-radio v-model="summaryForm.feces_times_choices" label="3日以上1次"></el-radio>
              <el-radio v-model="summaryForm.feces_times_choices" label="1日2-3次"></el-radio>
              <el-radio v-model="summaryForm.feces_times_choices" label="1日3次以上"></el-radio>）
            </span>
          <el-checkbox v-model="summaryForm.feces_gan" label="便干结"></el-checkbox>
          <el-checkbox v-model="summaryForm.feces_shi" label="时干时稀"></el-checkbox>
          <el-checkbox v-model="summaryForm.feces_bu" label="大便不成形"></el-checkbox>
          <el-checkbox v-model="summaryForm.feces_xie" label="溏泄"></el-checkbox>
          <el-checkbox v-model="summaryForm.feces_jin" label="质黏，排不尽"></el-checkbox>
          <el-checkbox v-model="summaryForm.feces_jia" label="夹杂未消化食物"></el-checkbox>

        </p>
        <p>
          ②小便：
          <el-checkbox v-for="(val, key) in pee"
                    v-model="summaryForm[key]"
                    :key="key" :label="val">
          </el-checkbox>
          <el-input v-model="summaryForm.pee_qita" placeholder="其他"></el-input>
        </p>
      <h4>舌象</h4>
        <p>
          ①舌质
          <el-checkbox v-for="(val, key) in texture"
                    v-model="summaryForm[key]"
                    :key="key" :label="val">
          </el-checkbox>
          <el-input v-model="summaryForm.texture_qita" placeholder="其他"></el-input>
        </p>
        <p>
          ②舌苔
          <el-checkbox v-for="(val, key) in coating"
                    v-model="summaryForm[key]"
                    :key="key" :label="val">
          </el-checkbox>
          <el-input v-model="summaryForm.coating_qita" placeholder="其他"></el-input>
        </p>
        <p>
          ③舌体
          <el-checkbox v-for="(val, key) in tongue"
                    v-model="summaryForm[key]"
                    :key="key" :label="val">
          </el-checkbox>
          <el-input v-model="summaryForm.tongue_qita" placeholder="其他"></el-input>
        </p>
      <h4>脉象</h4>
          <el-checkbox v-for="(val, key) in pulse"
                    v-model="summaryForm[key]"
                    :key="key" :label="val">
          </el-checkbox>
          <el-input v-model="summaryForm.pulse_qita" placeholder="其他"></el-input>


    </el-form>
    <span slot="footer">
        <el-button type="primary" :disabled="check_status=='审核通过'" v-if="exist"  @click="updateSummaryForm">确定</el-button>
        <el-button type="primary" v-else  @click="createSummaryForm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj005'
export default {
  name:'SummaryForm',
  data() {
    return {
      "part":{
            "part_xia":"下腹部正中",
            "part_zuo":"左侧少腹部",
            "part_you":"右侧少腹部",
            "part_liang":"两侧少腹部",
            "part_quan":"全下腹疼痛",
            "part_yao":"腰骶部疼痛",
        },
      "duration":{"duration_zhen":"阵发性","duration_chi":"持续性","duration_shi":"时痛时止"},
      "pain":{
            "pain_zhang":"胀痛",
            "pain_ci":"刺痛",
            "pain_yin":"隐痛",
            "pain_zhuo":"灼痛",
            "pain_leng":"冷痛",
            "pain_suan":"酸痛",
            "pain_kong":"空痛",
            "pain_zhui":"坠痛",
            "pain_jiao":"绞痛",
            "pain_che":"掣痛",
            "pain_tiao":"跳痛",
            "pain_chu":"触痛",
            "pain_zou":"走窜痛",
            "pain_gu":"固定痛",
      },
      "pain_more":{
            "pain_more_lao":"劳累后加重",
            "pain_more_tong":"同房后加重",
            "pain_more_xin":"食辛辣后加重",
            "pain_more_sheng":"食生冷后加重",
            "pain_more_shou":"受凉后加重",
            "pain_more_yin":"阴雨天加重",
            "pain_more_de":"得温则减",
            "pain_more_xi":"喜按",
            "pain_more_ju":"拒按",
      },
      "pain_menses":{
            "pain_menses_qi":"经期加重",
            "pain_menses_qian":"经前加重",
            "pain_menses_jian":"经间期加重",
            "pain_menses_jing":"经净后加重",
      },
      "pain_season":{
            "pain_season_chun":"春季加重",
            "pain_season_xia":"夏季加重",
            "pain_season_qiu":"秋季加重",
            "pain_season_dong":"冬季加重",
      },
      "pain_time":{
            "pain_time_shang":"上午加重",
            "pain_time_xia":"下午加重",
            "pain_time_ye":"夜间加重",
      },
      "fever_status":["无发热","寒战高热","壮热不退","发热恶寒","低热起伏","低热，日晡或入夜尤盛"],
      "leucorrhea_quantity":["适中","多","少"],
      "leucorrhea_color":{
            "leucorrhea_color_zc":"正常",
            "leucorrhea_color_huang":"黄色",
            "leucorrhea_color_bai":"白色",
            "leucorrhea_color_hui":"灰黄色",
            "leucorrhea_color_lv":"黄绿色",
            "leucorrhea_color_he":"褐色",
            "leucorrhea_color_jia":"夹血丝",
      },
      "leucorrhea_character":["正常","泡沫状","豆渣样","稀薄样","脓性","血性","脓血相间","质稠","质清稀"],
      "leucorrhea_smell":["无异味","气味腥","气味臭","气味秽臭"],
      "menses_days":["≤2天","3-7天","＞7日，甚至半月","半月以上"],
      "menses_color":["正常","淡红","鲜红","暗红","紫红","紫黯","紫黑","酱红色","褐色"],
      "menses_quality":{
              "menses_quality_zc":"正常",
              "menses_quality_chou":"粘稠",
              "menses_quality_qing":"清稀",
              "menses_quality_wu":"无血块",
              "menses_quality_xiao":"夹小血块",
              "menses_quality_da":"夹较大血块",
              "menses_quality_nian":"夹黏液"
        },
      "rate":{
              "rate_xia":"下腹部疼痛",
              "rate_yao":"腰骶疼痛",
              "rate_fa":"发热",
              "rate_bai":"白带异常",
              "rate_yue":"月经异常",
        },
      "spirit":{
            "spirit_jing":"精力充沛",
            "spirit_shen":"神疲乏力",
            "spirit_fan":"烦躁易怒",
            "spirit_ya":"压力大",
            "spirit_jiao":"焦虑或抑郁",
            "spirit_xi":"喜怒无常",
      },
      "cold":{
            "cold_zc":"正常",
            "cold_fa":"发热恶寒",
            "cold_han":"寒战高热",
            "cold_zhuang":"壮热不退",
            "cold_di":"低热起伏",
            "cold_ri":"日晡或入夜发热",
            "cold_wei":"畏寒",
            "cold_wu":"五心烦热",
      },
      "perspire":{
            "perspire_zc":"正常",
            "perspire_dong":"动则汗出",
            "perspire_ye":"夜卧汗出，醒后汗止",
            "perspire_hong":"烘热汗出",
      },
      "face":{
            "face_zc":"正常",
            "face_dan":"晄白无华",
            "face_cang":"苍白",
            "face_qing":"青白",
            "face_bai":"白而浮肿",
            "face_fu":"黄而浮肿",
            "face_wei":"萎黄",
            "face_hui":"晦黯",
            "face_hei":"面目黧黑",
            "face_chao":"潮红",
            "face_yan":"颜面痤疮",
            "face_huang":"黄褐斑",
      },
      "head":{
            "head_zc":"正常",
            "head_touyun":"头晕",
            "head_erming":"耳鸣",
            "head_tong":"头痛",
            "head_hua":"眼花",
            "head_se":"目涩",
            "head_yang":"目痒",
            "head_zhong":"晨起眼睑浮肿",
      },
      "mouth":{
            "mouth_zc":"正常",
            "mouth_kouku":"口苦",
            "mouth_kougan":"口干",
            "mouth_kouni":"口腻",
            "mouth_koudan":"口淡无味",
            "mouth_kouqi":"口气（口臭）",
            "mouth_yantong":"咽痛",
            "mouth_yanyang":"咽痒",
            "mouth_yiwu":"咽部异物感",
      },
      "chest":{
            "chest_zc":"正常",
            "chest_zhangmen":"胸胁胀闷",
            "chest_xiongyin":"胸胁隐痛",
            "chest_xiongci":"胸胁刺痛",
            "chest_ruci":"乳房刺痛",
            "chest_ruzhang":"乳房胀痛",
      },
      "limbs":{
            "limbs_zc":"正常",
            "limbs_kun":"困重",
            "limbs_juan":"肢倦",
            "limbs_leng":"肢冷",
            "limbs_zu":"手足心热",
            "limbs_fu":"下肢浮肿",
            "limbs_suan":"膝酸软",
            "limbs_xi":"膝痛",
            "limbs_gen":"足跟痛",
            "limbs_shang":"上肢关节疼痛",
            "limbs_xia":"下肢关节疼痛",
      },
      "diet":{
            "diet_zc":"正常",
            "diet_xinla":"喜辛辣",
            "diet_re":"喜热饮",
            "diet_leng":"喜冷饮",
            "diet_fu":"食后脘腹胀满",
            "diet_shao":"食少纳呆",
            "diet_hou":"食后胃脘不舒",
            "diet_yuyin":"口干欲饮",
            "diet_buyin":"口干不欲饮",
            "diet_fan":"烦渴欲饮",
      },
      "sleep":{
            "sleep_zc":"正常",
            "sleep_duo":"多梦",
            "sleep_yi":"易醒",
            "sleep_nan":"难以入眠",
            "sleep_bu":"彻夜不眠",
            "sleep_shi":"嗜睡",
      },
      "sexuality":["正常","性欲低下","性欲旺盛"],
      "feces":{
            "feces_zc":"正常",
            "feces_times":"大便次数",
            "feces_gan":"便干结",
            "feces_shi":"时干时稀",
            "feces_bu":"大便不成形",
            "feces_xie":"溏泄",
            "feces_jin":"质黏，排不尽",
            "feces_jia":"夹杂未消化食物",
      },
      "pee":{
            "pee_zc":"正常",
            "pee_duan":"短黄",
            "pee_chang":"清长",
            "pee_pin":"频数",
            "pee_ji":"尿急",
            "pee_tong":"尿痛",
            "pee_duo":"夜尿频多",
      },
      "texture":{
            "texture_danhong":"淡红",
            "texture_danbai":"淡白",
            "texture_hong":"红",
            "texture_shenhong":"深红",
            "texture_zihong":"紫红",
            "texture_anhong":"黯红",
            "texture_zian":"紫黯",
            "texture_danan":"淡黯",
            "texture_yudian":"有瘀点或瘀斑",
            "texture_jianhong":"边尖红",
      },
      "coating":{
              "coating_bai":"白",
              "coating_huang":"黄",
              "coating_bohuang":"薄黄",
              "coating_hui":"灰黑",
              "coating_bo":"薄",
              "coating_hou":"厚",
              "coating_ni":"腻",
              "coating_hua":"滑",
              "coating_run":"润",
              "coating_gan":"干",
              "coating_shaotai":"少苔",
              "coating_wutai":"无苔",
              "coating_huabo":"花剥",
              "coating_lie":"有裂纹",
      },
      "tongue":{
            "tongue_zc":"正常",
            "tongue_xiao":"瘦小",
            "tongue_da":"胖大",
            "tongue_chi":"边有齿痕",
      },
      "pulse":{
            "pulse_fu":"浮",
            "pulse_chen":"沉",
            "pulse_hua":"滑",
            "pulse_shu":"数",
            "pulse_xian":"弦",
            "pulse_xi":"细",
            "pulse_ruo":"弱",
            "pulse_huan":"缓",
            "pulse_chi":"迟",
            "pulse_se":"涩",
            "pulse_jin":"紧",
            "pulse_wuli":"无力",
      },
      summaryForm:{
      },
      dialogVisible: false,
      exist: true,
      formName:'',
      isOwnedByUser: true,
      check_status:''
    }
  },
  methods: {
    updateSummaryForm () {
      apiUpdatePatientDataForm({formData:this.summaryForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        if (res.data.detail) {
          this.$message({message: '对不起, 您没有对该记录操作的权限',type: 'error'})
        } else {
          this.$message({message: '提交成功',type: 'success'})
        }
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch()
    },
    createSummaryForm () {
      apiCreatePatientDataForm({formData:this.summaryForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        if (res.data.detail) {
          this.$message({message: '对不起, 您没有对该记录操作的权限',type: 'error'})
        } else {
          this.$message({message: '提交成功',type: 'success'})
        }
        this.dialogVisible = false
        this.$parent.searchPatient()
        // this.$parent.getPatients()
      })
      .catch()
    },
    resetDialog () {
      // 清空
      this.summaryForm = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      this.check_status = data.check_status
      this.isOwnedByUser = data.isOwnedByUser
      //如果summaryForm未创建,需要从infoForm取到url;如果summaryForm已创建,summaryForm都会被传入的summaryForm覆盖
      if (!data.exist) {
        //未创建,summaryForm的info接受data.url的值,其余字段初始化为空
        this.summaryForm.info = data.formData.info
      } else {
        //已创建(修改),summaryForm初始化为从api请求得到的数据
        this.summaryForm = data.formData
      }
    })
  }
}
</script>
<style lang="scss">
.prj005-summary {
  .el-input-group__append, .el-input-group__prepend {
    width: 35px;
  }
  .el-input-group>.el-input__inner{
    vertical-align: middle;
    display: initial;
  }
}

.prj005-dialog {
  h4 {
    color:cornflowerblue;
  }
}
</style>

