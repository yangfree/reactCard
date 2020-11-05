<template>
  <el-form
    ref="cureForm"
    :model="cureForm"
    class="mobile"
    label-width="110px"
    label-position="left"
  >
    <el-form-item label="治疗方式">
      <el-checkbox
        v-for="(val, key) in cure_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
    </el-form-item>

    <h4>（一）中医治疗</h4>
    <el-form-item label="中医治疗方式">
      <el-checkbox
        v-for="(val, key) in zhong_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
    </el-form-item>
    <el-form-item label="中医治法"></el-form-item>
    <el-form-item label="①实证治法">
      <el-checkbox
        v-for="(val, key) in zhong_shi_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
      <el-input v-model="cureForm.zhong_shi_qita" placeholder="其他"></el-input>
    </el-form-item>
    <el-form-item label="②虚实夹杂证治法">
      <el-checkbox
        v-for="(val, key) in zhong_jia_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
      <el-input v-model="cureForm.zhong_jia_qita" placeholder="其他"></el-input>
    </el-form-item>

    <el-form-item label="中药汤药治疗">
      <span style="color:red">（此题为患者既往及现在使用中药汤药情况，凡应用过以下中药汤药治疗盆腔炎性疾病及其后遗症均可勾选，可多选）</span>
    </el-form-item>
    <el-form-item label="①实证代表方">
      <el-checkbox
        v-for="(val, key) in zhong_tang_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
      <el-input v-model="cureForm.zhong_tang_qita" placeholder="其他"></el-input>
    </el-form-item>
    <el-form-item label="②虚实夹杂证代表方">
      <el-checkbox
        v-for="(val, key) in zhong_tang_za_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
      <el-input v-model="cureForm.zhong_tang_za_qita" placeholder="其他"></el-input>
    </el-form-item>

    <el-form-item label="中药汤药服用疗程">
      <label>共服用</label>
      <!-- <el-input v-model="cureForm.drink_total" >
            <template slot="append">天/月/年</template>
      </el-input>-->
      <el-input-number v-model="cureForm.drink_total" :min="1" :precision="0" label="请输入整数类型的值"></el-input-number>
      <el-select v-model="cureForm.drink_total_unit" placeholder="请选择年月天">
        <el-option label="天" value="天"></el-option>
        <el-option label="月" value="月"></el-option>
        <el-option label="年" value="年"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label>
      <label>若现在正在服用，使用方剂名称</label>
      <el-input v-model="cureForm.drink_name"></el-input>
    </el-form-item>
    <el-form-item label>
      <label>已服用</label>
      <!-- <el-input v-model="cureForm.drink_already">
        <template slot="append">天/月</template>
      </el-input>-->
      <el-input-number v-model="cureForm.drink_already" :min="1" :precision="0" label="请输入整数类型的值"></el-input-number>
      <el-select v-model="cureForm.drink_already_unit" placeholder="请选择月天">
        <el-option label="天" value="天"></el-option>
        <el-option label="月" value="月"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="中成药治疗"></el-form-item>
    <el-form-item label="①实证中成药">
      <el-checkbox
        v-for="(val, key) in medicine_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
      <el-input v-model="cureForm.medicine_qita" placeholder="其他"></el-input>
    </el-form-item>
    <el-form-item label="②虚实夹杂证中成药">
      <el-checkbox
        v-for="(val, key) in medicine_za_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
      <el-input v-model="cureForm.medicine_za_qita" placeholder="其他"></el-input>
    </el-form-item>
    <el-form-item label="③直肠导入中成药">
      <el-checkbox
        v-for="(val, key) in medicine_zhi_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
      <el-input v-model="cureForm.medicine_zhi_qita" placeholder="其他"></el-input>
    </el-form-item>

    <el-form-item label="中成药服用疗程">
      <label>共服用</label>
      <!-- <el-input v-model="cureForm.drink_zc_total">
        <template slot="append">天/月/年</template>
      </el-input>-->
      <el-input-number v-model="cureForm.drink_zc_total" :min="1" :precision="0" label="请输入整数类型的值"></el-input-number>
      <el-select v-model="cureForm.drink_zc_total_unit" placeholder="请选择年月天">
        <el-option label="天" value="天"></el-option>
        <el-option label="月" value="月"></el-option>
        <el-option label="年" value="年"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label>
      <label>共服用中成药</label>
      <el-input v-model="cureForm.drink_zc_zhong">
        <template slot="append">种</template>
      </el-input>
    </el-form-item>
    <el-form-item label>
      <label>若现在正在服用，服用中成药名称</label>
      <el-input v-model="cureForm.drink_zc_name"></el-input>
    </el-form-item>
    <el-form-item label>
      <label>已服用</label>
      <!-- <el-input v-model="cureForm.drink_zc_already">
        <template slot="append">天/月</template>
      </el-input>-->
      <el-input-number
        v-model="cureForm.drink_zc_already"
        :min="1"
        :precision="0"
        label="请输入整数类型的值"
      ></el-input-number>
      <el-select v-model="cureForm.drink_zc_already_unit" placeholder="请选择月天">
        <el-option label="天" value="天"></el-option>
        <el-option label="月" value="月"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="中医特色治疗">
      <el-checkbox
        v-for="(val, key) in character_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
      <el-input v-model="cureForm.character_qita" placeholder="其他"></el-input>
    </el-form-item>

    <el-form-item label="中医特色治疗疗程">
      <el-form-item label>
        <label>共使用中医特色疗法</label>
        <el-input v-model="cureForm.character_zc_zhong">
          <template slot="append">种</template>
        </el-input>
      </el-form-item>
      <el-form-item label>
        <label>若现在正在使用中医特色治疗，治疗项目名称</label>
        <el-input v-model="cureForm.character_zc_name"></el-input>
      </el-form-item>
      <el-form-item label>
        <label>已治疗</label>
        <!-- <el-input v-model="cureForm.character_zc_already">
          <template slot="append">天/月</template>
        </el-input> -->
        <el-input-number
          v-model="cureForm.character_zc_already"
          :min="1"
          :precision="0"
          label="请输入整数类型的值"
        ></el-input-number>
        <el-select v-model="cureForm.character_zc_already_unit" placeholder="请选择月天">
          <el-option label="天" value="天"></el-option>
          <el-option label="月" value="月"></el-option>
        </el-select>
      </el-form-item>
    </el-form-item>

    <h4>（二）西医治疗</h4>
    <el-form-item label="治疗途径">
      <el-checkbox
        v-for="(val, key) in xi_cure_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
    </el-form-item>
    <el-form-item label="抗生素治疗">
      <el-radio-group v-model="cureForm.xi_kangsheng">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="抗生素给药方式">
      <el-checkbox
        v-for="(val, key) in xi_way_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
    </el-form-item>

    <el-form-item label="抗生素静脉给药具体药物">
      <p>
        <el-checkbox label="①头孢菌素类" v-model="cureForm['xi_tou']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['xi_tou']"
          v-for="(val, key) in xi_kang_toubao_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input v-show="cureForm['xi_tou']" v-model="cureForm.xi_tou_qita" placeholder="其他"></el-input>
      </p>
      <p>
        <el-checkbox label="②青霉素类" v-model="cureForm['xi_mei']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['xi_mei']"
          v-for="(val, key) in xi_kang_qingmeisu_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input v-show="cureForm['xi_mei']" v-model="cureForm.xi_mei_qita" placeholder="其他"></el-input>
      </p>
      <p>
        <el-checkbox label="③氟喹诺酮类" v-model="cureForm['xi_sha']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['xi_sha']"
          v-for="(val, key) in xi_kang_shaxing_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input v-show="cureForm['xi_sha']" v-model="cureForm.xi_sha_qita" placeholder="其他"></el-input>
      </p>
      <p>
        <el-checkbox label="④四环素类" v-model="cureForm['xi_si']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['xi_si']"
          v-for="(val, key) in xi_kang_sihuansu_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input v-show="cureForm['xi_si']" v-model="cureForm.xi_si_qita" placeholder="其他"></el-input>
      </p>
      <p>
        <el-checkbox label="⑤林可霉素类" v-model="cureForm['xi_lin']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['xi_lin']"
          v-for="(val, key) in xi_kang_lingkemeisu_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input v-show="cureForm['xi_lin']" v-model="cureForm.xi_lin_qita" placeholder="其他"></el-input>
      </p>
      <p>
        <el-checkbox label="⑥大环内脂类" v-model="cureForm['xi_huan']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['xi_huan']"
          v-for="(val, key) in xi_kang_dahuanneizhi_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input v-show="cureForm['xi_huan']" v-model="cureForm.xi_huan_qita" placeholder="其他"></el-input>
      </p>
      <p>
        <el-checkbox label="⑦氨基糖苷类" v-model="cureForm['xi_an']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['xi_an']"
          v-for="(val, key) in xi_kang_anjitanggan_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input v-show="cureForm['xi_an']" v-model="cureForm.xi_an_qita" placeholder="其他"></el-input>
      </p>
      <p>
        <el-checkbox label="⑧硝咪唑类" v-model="cureForm['xi_xiao']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['xi_xiao']"
          v-for="(val, key) in xi_kang_xiaozuo_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input v-show="cureForm['xi_xiao']" v-model="cureForm.xi_xiao_qita" placeholder="其他"></el-input>
      </p>
      <p>
        <el-checkbox label="⑨其他类" v-model="cureForm['bool_xi_kang_qita']"></el-checkbox>
        <el-input
          v-show="cureForm['bool_xi_kang_qita']"
          v-model="cureForm.xi_kang_qita"
          placeholder="其他"
        ></el-input>
      </p>
    </el-form-item>

    <el-form-item label="抗生素静脉给药疗程">
      <label>既往用药情况</label>
      <el-input v-model="cureForm.xi_kang_lc">
        <template slot="append">个疗程</template>
      </el-input>
    </el-form-item>
    <el-form-item label>
      <label>共使用</label>
      <el-input v-model="cureForm.xi_kang_lc_total">
        <template slot="append">天</template>
      </el-input>
    </el-form-item>
    <el-form-item label>
      <label>若现在正在使用，其药名或种类是</label>
      <el-input v-model="cureForm.xi_kang_lc_type"></el-input>
    </el-form-item>
    <el-form-item label>
      <label>预计给药</label>
      <el-input v-model="cureForm.xi_kang_lc_yu">
        <template slot="append">天</template>
      </el-input>
    </el-form-item>

    <el-form-item label="抗生素肌注给药具体药物">
      <p>
        <el-checkbox label="①头孢菌素类" v-model="cureForm['injection_tou']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['injection_tou']"
          v-for="(val, key) in injection_toubao_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input
          v-show="cureForm['injection_tou']"
          v-model="cureForm.injection_tou_qita"
          placeholder="其他"
        ></el-input>
      </p>
      <p>
        <el-checkbox label="②氨基糖苷类" v-model="cureForm['injection_an']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['injection_an']"
          v-for="(val, key) in injection_anji_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input
          v-show="cureForm['injection_an']"
          v-model="cureForm.injection_an_qita"
          placeholder="其他"
        ></el-input>
      </p>
      <p>
        <el-checkbox label="③其他类" v-model="cureForm['bool_injection_qita']"></el-checkbox>
        <el-input
          v-show="cureForm['bool_injection_qita']"
          v-model="cureForm.injection_qita"
          placeholder="其他"
        ></el-input>
      </p>
    </el-form-item>

    <el-form-item label="抗生素肌注给药疗程">
      <label>既往用药情况</label>
      <el-input v-model="cureForm.injection_lc">
        <template slot="append">个疗程</template>
      </el-input>
    </el-form-item>
    <el-form-item label>
      <label>共使用</label>
      <el-input v-model="cureForm.injection_lc_total">
        <template slot="append">天</template>
      </el-input>
    </el-form-item>
    <el-form-item label>
      <label>若现在仍在使用，使用抗生素的种类是</label>
      <el-input v-model="cureForm.injection_lc_kang"></el-input>
    </el-form-item>
    <el-form-item label>
      <label>预计给药</label>
      <el-input v-model="cureForm.injection_lc_yu">
        <template slot="append">天</template>
      </el-input>
    </el-form-item>

    <el-form-item label="抗生素口服给药具体药物">
      <p>
        <el-checkbox label="①头孢菌素类" v-model="cureForm['m_eat_tou']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['m_eat_tou']"
          v-for="(val, key) in eat_toubao_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input
          v-show="cureForm['m_eat_tou']"
          v-model="cureForm.m_eat_toubao_nam"
          placeholder="请写出具体名称"
        ></el-input>
      </p>
      <p>
        <el-checkbox label="②氟喹诺酮类" v-model="cureForm['m_eat_fu']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['m_eat_fu']"
          v-for="(val, key) in eat_shaxing_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input v-show="cureForm['m_eat_fu']" v-model="cureForm.m_eat_fu_qita" placeholder="其他"></el-input>
      </p>
      <p>
        <el-checkbox label="③四环素类" v-model="cureForm['m_eat_si']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['m_eat_si']"
          v-for="(val, key) in eat_sihuansu_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input v-show="cureForm['m_eat_si']" v-model="cureForm.m_eat_si_qita" placeholder="其他"></el-input>
      </p>
      <p>
        <el-checkbox label="④硝咪唑类" v-model="cureForm['m_eat_xiao']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['m_eat_xiao']"
          v-for="(val, key) in eat_xiaomizuo_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input
          v-show="cureForm['m_eat_xiao']"
          v-model="cureForm.m_eat_xiao_qita"
          placeholder="其他"
        ></el-input>
      </p>
      <p>
        <el-checkbox label="⑤林可霉素类" v-model="cureForm['m_eat_mei']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['m_eat_mei']"
          v-for="(val, key) in eat_linkemeisu_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input v-show="cureForm['m_eat_mei']" v-model="cureForm.m_eat_mei_qita" placeholder="其他"></el-input>
      </p>
      <p>
        <el-checkbox label="⑥大环内脂类" v-model="cureForm['m_eat_nei']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['m_eat_nei']"
          v-for="(val, key) in eat_dahuanneizhi_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input v-show="cureForm['m_eat_nei']" v-model="cureForm.m_eat_nei_qita" placeholder="其他"></el-input>
      </p>
      <p>
        <el-checkbox label="⑦其他类" v-model="cureForm['bool_m_eat_qita']"></el-checkbox>
        <el-checkbox
          v-show="cureForm['bool_m_eat_qita']"
          v-for="(val, key) in eat_qita_Checkbox"
          :key="key"
          :label="val"
          v-model="cureForm[key]"
        ></el-checkbox>
        <el-input
          v-show="cureForm['bool_m_eat_qita']"
          v-model="cureForm.m_eat_qita"
          placeholder="其他"
        ></el-input>
      </p>
    </el-form-item>
    <el-form-item label="抗生素口服给药疗程">
      <label>既往用药情况</label>
      <el-input v-model="cureForm.m_eat_lc_kou">
        <template slot="append">个疗程</template>
      </el-input>
    </el-form-item>
    <el-form-item label>
      <label>共使用</label>
      <el-input v-model="cureForm.m_eat_lc_total">
        <template slot="append">天</template>
      </el-input>
    </el-form-item>
    <el-form-item label>
      <label>若现在正在使用抗生素，其药名或种类是</label>
      <el-input v-model="cureForm.m_eat_lc_type"></el-input>
    </el-form-item>
    <el-form-item label>
      <label>预计给药</label>
      <el-input v-model="cureForm.m_eat_lc_yu">
        <template slot="append">天</template>
      </el-input>
    </el-form-item>

    <el-form-item label="既往抗生素使用频次">
      <el-radio-group v-model="cureForm.use_times_yes">
        <el-radio :label="true">使用</el-radio>
        <el-radio :label="false">未使用</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item v-show="cureForm.use_times_yes" label>
      <el-radio
        v-model="cureForm.use_times_yes_num"
        v-for="item in use_times_yes_num_Radio"
        :key="item"
        :label="item"
      ></el-radio>
    </el-form-item>

    <el-form-item label="因盆腔炎性疾病及其后遗症进行手术治疗" label-width="100%"></el-form-item>
    <el-form-item label>
      <el-radio-group v-model="cureForm.op_after">
        <el-radio :label="true">有</el-radio>
        <el-radio :label="false">无</el-radio>
      </el-radio-group>
    </el-form-item>
    <h4 v-show="cureForm.op_after">请填患者因以下哪种情况行手术治疗</h4>
    <el-form-item v-show="cureForm.op_after" label="①手术原因">
      <el-checkbox
        v-for="(val, key) in op_reason_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
    </el-form-item>
    <el-form-item v-show="cureForm.op_after" label="②手术方式">
      <el-checkbox
        v-for="(val, key) in op_way_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
      <el-input v-model="cureForm.op_way_qita" placeholder="其他"></el-input>
    </el-form-item>

    <el-form-item label="物理治疗">
      <el-checkbox
        v-for="(val, key) in xi_others_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
      <el-input v-model="cureForm.xi_others_qita" placeholder="具体治疗方法"></el-input>
    </el-form-item>

    <el-form-item label="对患者的依从性总体评价" label-width="100%"></el-form-item>
    <el-form-item label>
      <el-radio
        v-model="cureForm.infection_all"
        v-for="item in infection_all_Radio"
        :key="item"
        :label="item"
      ></el-radio>
    </el-form-item>
    <el-form-item label="①对抗生素治疗的依从性" label-width="100%"></el-form-item>
    <el-form-item label>
      <el-radio
        v-model="cureForm.infection_kang"
        v-for="item in infection_kang_Radio"
        :key="item"
        :label="item"
      ></el-radio>
    </el-form-item>
    <el-form-item label="②患者对物理治疗的依从性" label-width="100%"></el-form-item>
    <el-form-item label>
      <el-radio
        v-model="cureForm.infection_xi"
        v-for="item in infection_xi_Radio"
        :key="item"
        :label="item"
      ></el-radio>
    </el-form-item>
    <el-form-item label="③患者对中医汤药治疗的依从性" label-width="100%"></el-form-item>
    <el-form-item label>
      <el-radio
        v-model="cureForm.infection_tang"
        v-for="item in infection_tang_Radio"
        :key="item"
        :label="item"
      ></el-radio>
    </el-form-item>
    <el-form-item label="④患者对中成药治疗的依从性" label-width="100%"></el-form-item>
    <el-form-item label>
      <el-radio
        v-model="cureForm.infection_cheng"
        v-for="item in infection_cheng_Radio"
        :key="item"
        :label="item"
      ></el-radio>
    </el-form-item>
    <el-form-item label="⑤患者对中医特色疗法的依从性" label-width="100%"></el-form-item>
    <el-form-item label>
      <el-radio
        v-model="cureForm.infection_wai"
        v-for="item in infection_wai_Radio"
        :key="item"
        :label="item"
      ></el-radio>
    </el-form-item>

    <el-form-item label="影响治疗依从性的原因" label-width="100%"></el-form-item>
    <el-form-item label>
      <el-checkbox
        v-for="(val, key) in infection_reason_Checkbox"
        :key="key"
        :label="val"
        v-model="cureForm[key]"
      ></el-checkbox>
      <el-input v-model="cureForm.infection_reason_qita" placeholder="其他原因"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "CureForm",
  data() {
    return {
      cure_Checkbox: {
        cure_zhong: "中医治疗",
        cure_xi: "西医治疗",
        cure_zhongxi: "中西医结合治疗"
      },
      zhong_Checkbox: { zhong_zhu: "住院治疗", zhong_men: "门诊治疗" },
      zhong_shi_Checkbox: {
        zhong_shi_tui: "清热解毒，凉血退热",
        zhong_shi_huo: "清热解毒，利湿活血",
        zhong_shi_shi: "清热利湿，活血止痛",
        zhong_shi_liang: "清热凉血，化瘀止痛",
        zhong_shi_chu: "清热除湿，化瘀止痛",
        zhong_shi_shu: "疏肝行气，化瘀止痛",
        zhong_shi_han: "祛寒除湿，化瘀止痛"
      },
      zhong_jia_Checkbox: {
        zhong_jia_yi: "益气健脾，化瘀止痛",
        zhong_jia_bu: "补肾活血，化瘀止痛"
      },
      zhong_tang_Checkbox: {
        zhong_tang_wu: "五味消毒饮合大黄牡丹皮汤",
        zhong_tang_yin: "银翘红酱解毒汤",
        zhong_tang_xian: "仙方活命饮加减",
        zhong_tang_chai: "柴枳败酱散",
        zhong_tang_jia: "银甲丸",
        zhong_tang_pen: "盆炎汤",
        zhong_tang_miao: "四逆散合四妙散合失笑散",
        zhong_tang_xue: "血府逐瘀汤",
        zhong_tang_ge: "膈下逐瘀汤",
        zhong_tang_qi: "丹芍活血行气汤",
        zhong_tang_fu: "少腹逐瘀汤",
        zhong_tang_ding: "暖宫定痛汤",
        zhong_tang_ling: "桂枝茯苓丸"
      },
      zhong_tang_za_Checkbox: {
        zhong_tang_za_li: "理冲汤",
        zhong_tang_za_ju: "举元煎合失笑散",
        zhong_tang_za_wen: "温胞饮合失笑散",
        zhong_tang_za_du: "杜断桑寄失笑散"
      },
      medicine_Checkbox: {
        medicine_qianjin: "妇科千金片/胶囊",
        medicine_jingang: "金刚藤胶囊/片/颗粒/糖浆",
        medicine_fuyan: "康妇炎胶囊",
        medicine_jinying: "金英胶囊",
        medicine_fujiao: "妇炎康复胶囊/片",
        medicine_kunfu: "坤复康胶囊",
        medicine_honghua: "红花如意丸",
        medicine_penyan: "盆炎净颗粒",
        medicine_yanshu: "妇炎舒胶囊/片",
        medicine_kangfu: "抗妇炎胶囊",
        medicine_huahong: "花红胶囊/片/颗粒",
        medicine_fule: "妇乐颗粒",
        medicine_gongyan: "宫炎平片/滴丸/胶囊",
        medicine_fukang: "妇康口服液",
        medicine_fuping: "妇平胶囊",
        medicine_huangteng: "黄藤素片",
        medicine_puling: "蒲苓盆炎康颗粒",
        medicine_jing: "妇炎净胶囊",
        medicine_jinxiang: "金香胶囊",
        medicine_xiao: "妇炎消胶囊",
        medicine_yankang: "妇炎康片",
        medicine_fu: "妇乐片",
        medicine_jinji: "金鸡胶囊",
        medicine_tai: "妇炎泰颗粒",
        medicine_yan: "金丹附延颗粒",
        medicine_jiao: "宫炎康胶囊",
        medicine_ying: "英花片",
        medicine_jin: "妇可靖胶囊",
        medicine_huayu: "金鸡化瘀颗粒",
        medicine_sheng: "胜红清热胶囊",
        medicine_guizhi: "桂枝茯苓胶囊/丸",
        medicine_shaofu: "少腹逐瘀胶囊/丸"
      },
      medicine_za_Checkbox: {
        medicine_za_fu: "妇宝颗粒",
        medicine_za_nv: "女金胶囊",
        medicine_za_dan: "丹黄祛瘀胶囊",
        medicine_za_zhi: "止痛化癥胶囊/片/颗粒"
      },
      medicine_zhi_Checkbox: {
        medicine_zhi_fu: "康妇消炎栓",
        medicine_zhi_hua: "化瘀散结灌肠液",
        medicine_zhi_hong: "红虎灌肠液",
        medicine_zhi_ye: "野菊花栓",
        medicine_zhi_yan: "盆炎清栓"
      },
      character_Checkbox: {
        character_guan: "中药保留灌肠",
        character_men: "中药栓剂肛门导入",
        character_wai: "中药外敷",
        character_li: "中药离子导入",
        character_xun: "中药熏蒸",
        character_zhen: "针刺",
        character_ai: "艾灸",
        character_wenzhen: "温针灸",
        character_re: "热敏灸",
        character_ge: "隔药灸（隔姜灸、隔附子灸等）",
        character_tui: "推拿",
        character_dou: "耳穴压豆",
        character_er: "耳针",
        character_she: "穴位注射",
        character_tie: "穴位敷贴",
        character_xian: "穴位埋线",
        character_mai: "穴位埋针"
      },
      xi_cure_Checkbox: { xi_cure_yuan: "住院治疗", xi_cure_zhen: "门诊治疗" },
      xi_way_Checkbox: {
        xi_way_jing: "静脉",
        xi_way_ji: "肌肉注射",
        xi_way_kou: "口服"
      },

      xi_kang_toubao_Checkbox: {
        xi_kang_ti: "头孢替坦",
        xi_kang_xi: "头孢西丁",
        xi_kang_qu: "头孢曲松",
        xi_kang_chuo: "头孢唑肟",
        xi_kang_sai: "头孢噻肟"
      },
      xi_kang_qingmeisu_Checkbox: {
        xi_kang_ba: "氨苄西林舒巴坦钠",
        xi_kang_ke: "阿莫西林克拉维酸钾"
      },
      xi_kang_shaxing_Checkbox: {
        xi_kang_sha: "氧氟沙星",
        xi_kang_zuo: "左氧氟沙星",
        xi_kang_huan: "环丙沙星"
      },
      xi_kang_sihuansu_Checkbox: {
        xi_kang_duo: "多西环素",
        xi_kang_mi: "米诺环素",
        xi_kang_li: "强力霉素"
      },
      xi_kang_lingkemeisu_Checkbox: {
        xi_kang_lin: "林可霉素",
        xi_kang_mei: "克林霉素",
        xi_kang_lv: "氯洁霉素"
      },
      xi_kang_dahuanneizhi_Checkbox: { xi_kang_aqi: "阿奇霉素" },
      xi_kang_anjitanggan_Checkbox: { xi_kang_qing: "庆大霉素" },
      xi_kang_xiaozuo_Checkbox: {
        xi_kang_jia: "甲硝唑",
        xi_kang_xiao: "替硝唑",
        xi_kang_ao: "奥硝唑"
      },

      injection_toubao_Checkbox: {
        injection_xi: "头孢西丁",
        injection_qu: "头孢曲松",
        injection_chuo: "头孢唑肟",
        injection_kui: "头孢噻肟"
      },
      injection_anji_Checkbox: { injection_da: "庆大霉素" },

      eat_toubao_Checkbox: { m_eat_toubao: "二/三代头孢" },
      eat_shaxing_Checkbox: {
        m_eat_zuo: "左氧氟沙星",
        m_eat_yang: "氧氟沙星",
        m_eat_mo: "莫西沙星"
      },
      eat_sihuansu_Checkbox: {
        m_eat_duo: "多西环素",
        m_eat_mi: "米诺环素",
        m_eat_qiang: "强力霉素"
      },
      eat_xiaomizuo_Checkbox: { m_eat_jia: "甲硝唑", m_eat_ao: "奥硝唑" },
      eat_linkemeisu_Checkbox: { m_eat_lv: "氯洁霉素" },
      eat_dahuanneizhi_Checkbox: { m_eat_a: "阿奇霉素" },
      eat_qita_Checkbox: { m_eat_bing: "丙磺舒" },

      use_times_yes_num_Radio: ["1次", "2次", "3次", "4次", "5次及以上"],
      op_reason_Checkbox: {
        op_reason_shu: "因盆腔炎性疾病及其后遗症进行手术治疗",
        op_reason_du: "脓肿破裂，出现腹膜炎或有中毒休克",
        op_reason_shi: "脓肿经药物治疗后病情好转，脓肿包块仍未消失但已局限化",
        op_reason_ji: "输卵管积水",
        op_reason_yun: "输卵管粘连或盆腔粘连影响生育导致不孕者"
      },
      op_way_Checkbox: {
        op_way_fu: "腹腔镜手术",
        op_way_chuan: "传统开腹手术",
        op_way_yin: "穿刺引流术",
        op_way_nong: "经阴道盆腔脓肿切开引流术",
        op_way_nian: "盆腔分粘术",
        op_way_qie: "输卵管切除术",
        op_way_huan: "附件切除术",
        op_way_zi: "子宫及双附件切除术",
        op_way_shu: "输卵管妊娠保守性手术"
      },
      xi_others_Checkbox: {
        xi_others_duan: "超短波理疗",
        xi_others_wei: "微波理疗",
        xi_others_ti: "体外冲击波治疗",
        xi_others_tdp: "TDP",
        xi_others_wai: "体外电场热疗",
        xi_others_ji: "盆底肌肉电刺激",
        xi_others_te: "特定电磁波"
      },
      infection_all_Radio: ["好", "较好", "较差", "差"],
      infection_kang_Radio: ["好", "较好", "较差", "差", "未使用抗生素"],
      infection_xi_Radio: ["好", "较好", "较差", "差", "未使用理疗"],
      infection_tang_Radio: ["好", "较好", "较差", "差", "未使用中医汤药"],
      infection_cheng_Radio: ["好", "较好", "较差", "差", "未使用中成药"],
      infection_wai_Radio: ["好", "较好", "较差", "差", "未使用中医特色疗法"],
      infection_reason_Checkbox: {
        infection_reason_yao: "	对病情未重视，不愿意坚持用药",
        infection_reason_fu: "对抗生素的副作用心存顾虑",
        infection_reason_kou: "药物口感影响服药",
        infection_reason_jian: "煎药不方便",
        infection_reason_zhi: "到医院做治疗不方便",
        infection_reason_zuo: "工作原因影响治疗",
        infection_reason_ji: "因经济原因影响治疗",
        infection_reason_gai: "用药后症状未改善",
        infection_reason_liao: "用药后症状改善，但未坚持完成疗程",
        infection_reason_shu: "不愿手术治疗"
      },

      cureForm: {}
    };
  },
  methods: {}
};
</script>
<style lang="">
</style>
