<template>
    <el-form ref="relevantForm" :model="relevantForm" :rules="rules"
            label-width="100px" label-position="left" class="mobile">
            <h4>1、体格检查（就诊时的检查情况）</h4>

            <el-form-item label="①腹部检查">
              <el-checkbox v-for="(val, key) in belly_Checkbox"
                         v-model="relevantForm[key]"
                         :key="key" :label="val">
              </el-checkbox>
              <el-input v-model="relevantForm.belly_qita"  placeholder="其他"></el-input>
            </el-form-item>

            <el-form-item label="②妇科检查">
            </el-form-item>
            <el-form-item label="外阴">
                <el-checkbox v-for="(val, key) in gynaecology_wai_Checkbox"
                         v-model="relevantForm[key]"
                         :key="key" :label="val">
                </el-checkbox>
                <el-input v-show="relevantForm.gynaecology_wai_abnormal" v-model="relevantForm.gynaecology_wai_abnormal_qita"  placeholder="异常描述"></el-input>
            </el-form-item>
            <el-form-item label="阴道">
                <el-checkbox v-for="(val, key) in gynaecology_yin_Checkbox"
                         v-model="relevantForm[key]"
                         :key="key" :label="val">
                </el-checkbox>
                <el-checkbox v-show="relevantForm.gynaecology_yin_abnormal"
                            v-model="relevantForm.gynaecology_yin_abnormal_chong"
                            label="粘膜充血">
                </el-checkbox>
                <el-checkbox v-show="relevantForm.gynaecology_yin_abnormal"
                            v-model="relevantForm.gynaecology_yin_abnormal_nong"
                            label="分泌物增多">
                </el-checkbox>
                  <div v-show="relevantForm.gynaecology_yin_abnormal_nong">
                      （ <el-checkbox  v-for="(val, key) in gynaecology_gong_abnormal_fenmiwu"
                          v-model="relevantForm[key]"
                          :key="key" :label="val">
                      </el-checkbox>）
                  </div>
                <el-checkbox v-show="relevantForm.gynaecology_yin_abnormal"
                            v-model="relevantForm.gynaecology_yin_abnormal_hou"
                            label="后穹隆饱满触痛">
                </el-checkbox>
                <el-input v-show="relevantForm.gynaecology_yin_abnormal" v-model="relevantForm.gynaecology_yin_abnormal_qita"  placeholder="其他"></el-input>
            </el-form-item>
            <el-form-item label="宫颈">
              <el-checkbox v-for="(val, key) in gynaecology_gong_Checkbox"
                       v-model="relevantForm[key]"
                       :key="key" :label="val">
              </el-checkbox>
              <el-checkbox v-show="relevantForm.gynaecology_gong_abnormal"
                          v-model="relevantForm.gynaecology_gong_abnormal_shui" label="水肿">
              </el-checkbox>
              <el-checkbox v-show="relevantForm.gynaecology_gong_abnormal"
                          v-model="relevantForm.gynaecology_gong_abnormal_mi" label="宫颈糜烂样改变">
              </el-checkbox>
                  <div v-show="relevantForm.gynaecology_gong_abnormal_mi">
                    （<el-radio v-model="relevantForm.gynaecology_gong_abnormal_mi_level" label="轻"></el-radio>
                    <el-radio v-model="relevantForm.gynaecology_gong_abnormal_mi_level" label="中"></el-radio>
                    <el-radio v-model="relevantForm.gynaecology_gong_abnormal_mi_level" label="重"></el-radio>）
                  </div>
              <el-checkbox v-show="relevantForm.gynaecology_gong_abnormal" v-for="(val, key) in gynaecology_gong_abnormal_Checkbox"
                       v-model="relevantForm[key]"
                       :key="key" :label="val">
              </el-checkbox>
              <el-input v-show="relevantForm.gynaecology_gong_abnormal" v-model="relevantForm.gynaecology_gong_abnormal_qita"  placeholder="其他"></el-input>
            </el-form-item>
            <el-form-item label="子宫体">
              <el-checkbox v-for="(val, key) in gynaecology_zi_Checkbox"
                       v-model="relevantForm[key]"
                       :key="key" :label="val">
              </el-checkbox>
              <el-checkbox v-show="relevantForm.gynaecology_zi_abnormal" v-for="(val, key) in gynaecology_zi_abnorma_Checkbox"
                       v-model="relevantForm[key]"
                       :key="key" :label="val">
              </el-checkbox>
              <el-input v-show="relevantForm.gynaecology_zi_abnormal" v-model="relevantForm.gynaecology_zi_abnormal_qita"  placeholder="其他"></el-input>
            </el-form-item>
            <el-form-item v-show="relevantForm.gynaecology_zi_abnormal_da" label="子宫体增大" >
              <el-radio v-model="relevantForm.gynaecology_zi_abnormal_zeng"
                        v-for="item in gynaecology_zi_abnormal_zeng_Radio"
                        :key="item" :label="item">
              </el-radio>
            </el-form-item>
            <el-form-item label="骶韧带">
              <el-checkbox v-for="(val, key) in gynaecology_ren_Checkbox"
                        v-model="relevantForm[key]"
                        :key="key" :label="val">
              </el-checkbox>
                <div v-show="relevantForm.gynaecology_ren_abnormal">
                  （<el-checkbox v-model="relevantForm.gynaecology_ren_abnormal_zuo"
                                  label="左侧增粗/触痛"></el-checkbox>
                    <el-checkbox v-model="relevantForm.gynaecology_ren_abnormal_you"
                                  label="右侧增粗/触痛"></el-checkbox>）
                </div>
              <el-input v-show="relevantForm.gynaecology_ren_abnormal" v-model="relevantForm.gynaecology_ren_abnormal_qita"  placeholder="其他"></el-input>
            </el-form-item>
            <el-form-item label="左附件">
              <el-checkbox v-for="(val, key) in gynaecology_zuo_Checkbox"
                        v-model="relevantForm[key]"
                        :key="key" :label="val">
              </el-checkbox>
              <el-checkbox v-show="relevantForm.gynaecology_zuo_abnormal" v-for="(val, key) in gynaecology_zuo_abnorma_Checkbox"
                        v-model="relevantForm[key]"
                        :key="key" :label="val">
              </el-checkbox>
              <el-input v-show="relevantForm.gynaecology_zuo_abnormal" v-model="relevantForm.gynaecology_zuo_abnormal_qita"  placeholder="其他"></el-input>
            </el-form-item>
            <el-form-item label="右附件">
              <el-checkbox v-for="(val, key) in gynaecology_you_Checkbox"
                        v-model="relevantForm[key]"
                        :key="key" :label="val">
              </el-checkbox>
              <el-checkbox v-show="relevantForm.gynaecology_you_abnormal" v-for="(val, key) in gynaecology_you_abnorma_Checkbox"
                        v-model="relevantForm[key]"
                        :key="key" :label="val">
              </el-checkbox>
              <el-input v-show="relevantForm.gynaecology_you_abnormal" v-model="relevantForm.gynaecology_you_abnormal_qita"  placeholder="其他"></el-input>
            </el-form-item>

            <h3>2、辅助检查（若检查结果异常，请填写具体数值）</h3>
              <el-form-item label="①血细胞分析">
                <el-checkbox v-for="(val, key) in hemocyte_Checkbox"
                          v-model="relevantForm[key]"
                          :key="key" :label="val">
                </el-checkbox>
              </el-form-item>
              <el-form-item v-show="relevantForm.hemocyte_yes" label="白细胞总数">
                <el-checkbox v-for="(val, key) in leucocyte_Checkbox"
                          v-model="relevantForm[key]"
                          :key="key" :label="val">
                </el-checkbox>
                <el-input v-model="relevantForm.leucocyte_abnormal_detail"  placeholder="异常描述"></el-input>
              </el-form-item>
              <el-form-item v-show="relevantForm.hemocyte_yes" label="中性粒细胞百分比">
                <el-checkbox v-for="(val, key) in neutrophil_Checkbox"
                          v-model="relevantForm[key]"
                          :key="key" :label="val">
                </el-checkbox>
                <el-input v-model="relevantForm.neutrophil_abnormal_detail"  placeholder="异常描述"></el-input>
              </el-form-item>
              <el-form-item v-show="relevantForm.hemocyte_yes" label="其他">
                <el-input v-model="relevantForm.hemocyte_yes_qita"  placeholder="其他"></el-input>
              </el-form-item>

              <el-form-item label="②全血C反应蛋白">
                <el-checkbox v-for="(val, key) in protein_Checkbox"
                          v-model="relevantForm[key]"
                          :key="key" :label="val">
                </el-checkbox>
              </el-form-item>
              <el-form-item v-show="relevantForm.protein_yes" label="检查结果">
                <el-checkbox v-for="(val, key) in protein_yes_Checkbox"
                          v-model="relevantForm[key]"
                          :key="key" :label="val">
                </el-checkbox>
                <el-input v-model="relevantForm.protein_yes_abnormal_detail"  placeholder="异常描述"></el-input>
              </el-form-item>
              <el-form-item label="③红细胞沉降率">
                <el-checkbox v-for="(val, key) in erythrocyte_Checkbox"
                           v-model="relevantForm[key]"
                           :key="key" :label="val">
                </el-checkbox>
              </el-form-item>
              <el-form-item v-show="relevantForm.erythrocyte_yes" label="检查结果">
                <el-checkbox v-for="(val, key) in erythrocyte_yes_Checkbox"
                           v-model="relevantForm[key]"
                           :key="key" :label="val">
                </el-checkbox>
                <el-input v-model="relevantForm.erythrocyte_yes_abnormal_detail"  placeholder="异常描述"></el-input>
              </el-form-item>
              <el-form-item label="④阴道分泌物常规检查">
                <el-checkbox v-for="(val, key) in check_vagina_Checkbox"
                           v-model="relevantForm[key]"
                           :key="key" :label="val">
                </el-checkbox>
              </el-form-item>
                <el-form-item v-show="relevantForm.check_vagina_yes" label="清洁度">
                  <el-input v-model="relevantForm.check_vagina_qing" ></el-input>
                </el-form-item>
                <el-form-item v-show="relevantForm.check_vagina_yes" label="PH值">
                  <el-input v-model="relevantForm.check_vagina_ph" ></el-input>
                </el-form-item>
                <el-form-item v-show="relevantForm.check_vagina_yes" label="线索细胞">
                  <el-radio v-model="relevantForm.check_vagina_xian"
                            v-for="item in check_vagina_xian_Radio"
                            :key="item" :label="item">
                  </el-radio>
                </el-form-item>
                <el-form-item v-show="relevantForm.check_vagina_yes" label="真菌">
                  <el-radio v-model="relevantForm.check_vagina_zhen"
                            v-for="item in check_vagina_zhen_Radio"
                            :key="item" :label="item">
                  </el-radio>
                </el-form-item>
                <el-form-item v-show="relevantForm.check_vagina_yes" label="滴虫">
                  <el-radio v-model="relevantForm.check_vagina_di"
                            v-for="item in check_vagina_di_Radio"
                            :key="item" :label="item">
                  </el-radio>
                </el-form-item>
                <el-form-item v-show="relevantForm.check_vagina_yes" label="白细胞计数">
                  <el-input v-model="relevantForm.check_vagina_bai" >
                  </el-input>
                </el-form-item>
                <el-form-item v-show="relevantForm.check_vagina_yes" label="乳杆菌">
                  <el-input v-model="relevantForm.check_vagina_ru" >
                  </el-input>
                </el-form-item>
                <el-form-item v-show="relevantForm.check_vagina_yes" label="杂菌">
                  <el-input v-model="relevantForm.check_vagina_za" >
                  </el-input>
                </el-form-item>
                <el-form-item v-show="relevantForm.check_vagina_yes" label="白细胞脂酶">
                  <el-input v-model="relevantForm.check_vagina_za" >
                  </el-input>
                </el-form-item>
                <el-form-item v-show="relevantForm.check_vagina_yes" label="唾液酸苷酶">
                  <el-input v-model="relevantForm.check_vagina_za" >
                  </el-input>
                </el-form-item>
                <el-form-item v-show="relevantForm.check_vagina_yes" label="其他">
                  <el-input v-model="relevantForm.check_vagina_qita" placeholder="其他">
                  </el-input>
                </el-form-item>

              <el-form-item label="⑤宫颈管分泌物检测">
                <el-checkbox v-for="(val, key) in check_cervix_Checkbox"
                            v-model="relevantForm[key]"
                            :key="key" :label="val">
                </el-checkbox>
              </el-form-item>
              <el-form-item v-show="relevantForm.check_cervix_yes" label="检查结果">
                <el-checkbox v-for="(val, key) in check_cervix_yes_Checkbox"
                            v-model="relevantForm[key]"
                            :key="key" :label="val">
                </el-checkbox>
              </el-form-item>
              <el-form-item v-show="relevantForm.check_cervix_lin" label="淋病奈瑟菌">
                <el-radio v-model="relevantForm.check_cervix_lin_type"
                          v-for="item in check_cervix_lin_type_Radio"
                          :key="item" :label="item">
                </el-radio>
              </el-form-item>
              <el-form-item v-show="relevantForm.check_cervix_sha" label="沙眼衣原体">
                <el-radio v-model="relevantForm.check_cervix_sha_type"
                          v-for="item in check_cervix_sha_type_Radio"
                          :key="item" :label="item">
                </el-radio>
              </el-form-item>
              <el-form-item v-show="relevantForm.check_cervix_jie" label="解脲支原体">
                <el-radio v-model="relevantForm.check_cervix_jie_type"
                          v-for="item in check_cervix_jie_type_Radio"
                          :key="item" :label="item">
                </el-radio>
              </el-form-item>
              <el-form-item v-show="relevantForm.check_cervix_ren" label="人型支原体">
                <el-radio v-model="relevantForm.check_cervix_ren_type"
                          v-for="item in check_cervix_ren_type_Radio"
                          :key="item" :label="item">
                </el-radio>
              </el-form-item>
              <el-form-item v-show="relevantForm.check_cervix_sheng" label="生殖支原体">
                <el-radio v-model="relevantForm.check_cervix_sheng_type"
                          v-for="item in check_cervix_sheng_type_Radio"
                          :key="item" :label="item">
                </el-radio>
              </el-form-item>
                <el-input v-show="relevantForm.check_cervix_yes"
                          v-model="relevantForm.check_cervix_qita"  placeholder="其他"></el-input>

              <el-form-item label="⑥HPV检测">
                <el-checkbox v-for="(val, key) in check_hpv_Checkbox"
                            v-model="relevantForm[key]"
                            :key="key" :label="val">
                </el-checkbox>
              </el-form-item>
              <el-form-item v-show="relevantForm.check_hpv_yes" label="检查结果">
                <el-radio v-model="relevantForm.check_hpv_character"
                          v-for="item in check_hpv_character_Radio"
                          :key="item" :label="item">
                </el-radio>
              </el-form-item>
              <el-form-item v-if="relevantForm.check_hpv_character=='阳性'" v-show="true" label="阳性">
                <el-input v-model="relevantForm.check_hpv_character_yang">
                  <template slot="append">型</template>
                </el-input>
              </el-form-item>

              <el-form-item label="人乳头瘤病毒核酸检测杂交二代（HC2）检测">
                <el-checkbox v-for="(val, key) in check_hc_Checkbox"
                            v-model="relevantForm[key]"
                            :key="key" :label="val">
                </el-checkbox>
              </el-form-item>
              <el-form-item v-show="relevantForm.check_hc_yes" label="检查结果">
                <el-radio v-model="relevantForm.check_hc_character"
                          v-for="item in check_hc_character_Radio"
                          :key="item" :label="item">
                </el-radio>
              </el-form-item>
              <el-form-item v-if="relevantForm.check_hc_character=='阳性'" v-show="true" label="阳性">
                <el-input v-model="relevantForm.check_hc_character_yang">
                  <template slot="append">型</template>
                </el-input>
              </el-form-item>

              <el-form-item label="⑦盆腔超声检查">
                <el-checkbox v-for="(val, key) in check_ultrasound_Checkbox"
                            v-model="relevantForm[key]"
                            :key="key" :label="val">
                </el-checkbox>
              </el-form-item>
              <el-form-item v-show="relevantForm.check_ultrasound_zuoji" label="左侧输卵管积液">
                <el-input v-model="relevantForm.check_ultrasound_zuoji_v">
                  <span slot="append">cm</span>
                </el-input>
              </el-form-item>
              <el-form-item v-show="relevantForm.check_ultrasound_youji" label="右侧输卵管积液">
                  <span slot="append">cm</span>
                <el-input v-model="relevantForm.check_ultrasound_youji_v">
                </el-input>
              </el-form-item>
              <el-form-item v-show="relevantForm.check_ultrasound_bao_bool" label="盆腔炎性包块">
                <el-radio v-model="relevantForm.check_ultrasound_bao"
                          v-for="item in check_ultrasound_bao_Radio"
                          :key="item" :label="item">
                </el-radio>
              </el-form-item>
              <el-form-item v-show="relevantForm.check_ultrasound_ji_bool" label="盆腔积液">
                <el-radio v-model="relevantForm.check_ultrasound_ji"
                          v-for="item in check_ultrasound_ji_Radio"
                          :key="item" :label="item">
                </el-radio>
              </el-form-item>

              <el-form-item label="⑧子宫输卵管造影">
                <el-checkbox v-for="(val, key) in check_contrast_Checkbox"
                            v-model="relevantForm[key]"
                            :key="key" :label="val">
                </el-checkbox>
              </el-form-item>
              <el-form-item v-show="relevantForm.check_contrast_yes" label="检查结果">
                <el-input v-model="relevantForm.check_contrast_yes_qita" placeholder="详情">
                </el-input>
              </el-form-item>


              <el-form-item label="⑨其他检查">
              </el-form-item>
              <el-form-item label="阴道后穹隆穿刺">
                <el-checkbox v-model="relevantForm.wu_check_others_yin" label="无"></el-checkbox>
                <el-checkbox v-model="relevantForm.check_others_yin" label="有"></el-checkbox>
                <el-input v-show="relevantForm.check_others_yin"
                          v-model="relevantForm.check_others_yin_detail" placeholder="详情">
                </el-input>
              </el-form-item>
              <el-form-item label="子宫内膜活组织检查">
                <el-checkbox v-model="relevantForm.wu_check_others_zi" label="无"></el-checkbox>
                <el-checkbox v-model="relevantForm.check_others_zi" label="有">
                </el-checkbox>
                <el-input v-show="relevantForm.check_others_zi"
                          v-model="relevantForm.check_others_zi_detail" placeholder="详情">
                </el-input>
              </el-form-item>
              <el-form-item label="腹腔镜检查">
                <el-checkbox v-model="relevantForm.wu_check_others_fu" label="无"></el-checkbox>
               <el-checkbox v-model="relevantForm.check_others_fu" label="有">
               </el-checkbox>
               <el-input v-show="relevantForm.check_others_fu"
                          v-model="relevantForm.check_others_fu_detail" placeholder="详情">
               </el-input>
              </el-form-item>
              <el-form-item label="MRI检查">
                <el-checkbox v-model="relevantForm.wu_check_others_mri" label="无"></el-checkbox>
                <el-checkbox v-model="relevantForm.check_others_mri" label="有">
               </el-checkbox>
               <el-input v-show="relevantForm.check_others_mri"
                          v-model="relevantForm.check_others_mri_detail" placeholder="详情">
               </el-input>
              </el-form-item>

    </el-form>

</template>
<script>
export default {
  name:'relevantForm',
  data() {
    return {
            gynaecology_wai_Checkbox:{gynaecology_wai_normal:"正常",gynaecology_wai_abnormal:"异常"},
            gynaecology_yin_Checkbox:{gynaecology_yin_normal:"正常",gynaecology_yin_abnormal:"异常"},
            gynaecology_gong_abnormal_fenmiwu:{
                      "gynaecology_yin_abnormal_nong_huang":"黄色",
                      "gynaecology_yin_abnormal_nong_hui":"灰白色",
                      "gynaecology_yin_abnormal_nong_nong":"脓性",
                      "gynaecology_yin_abnormal_nong_xue":"血性",
                      "gynaecology_yin_abnormal_nong_nx":"脓血相间",
            },
            gynaecology_gong_Checkbox:{gynaecology_gong_normal:"正常",gynaecology_gong_abnormal:"异常"},
            gynaecology_gong_abnormal_Checkbox:{
                      // gynaecology_gong_abnormal_xue:"充血",
                      // gynaecology_gong_abnormal_shui:"水肿",
                      // gynaecology_gong_abnormal_mi:"宫颈糜烂样改变",
                      gynaecology_gong_abnormal_xi:"宫颈息肉",
                      gynaecology_gong_abnormal_fei:"宫颈肥大",
                      gynaecology_gong_abnormal_ju:"举痛"},
            gynaecology_zi_Checkbox:{gynaecology_zi_normal:"正常", gynaecology_zi_abnormal:"异常"},
            gynaecology_zi_abnorma_Checkbox:{gynaecology_zi_abnormal_da:"增大", gynaecology_zi_abnormal_ya:"压痛", gynaecology_zi_abnormal_huo:"活动受限"},
            gynaecology_zi_abnormal_zeng_Radio:["40天孕大", "50天孕大", "60天孕大", "90天孕大"],
            gynaecology_ren_Checkbox:{gynaecology_ren_normal:"正常", gynaecology_ren_abnormal:"异常"},
            gynaecology_ren_abnorma_Checkbox:{gynaecology_ren_abnormal_zeng:"增粗", gynaecology_ren_abnormal_chu:"触痛"},
            gynaecology_zuo_Checkbox:{gynaecology_zuo_normal:"正常", gynaecology_zuo_abnormal:"异常"},
            gynaecology_zuo_abnorma_Checkbox:{gynaecology_zuo_abnormal_pian:"片状增厚", gynaecology_zuo_abnormal_tiao:"条索增粗", gynaecology_zuo_abnormal_bao:"包块", gynaecology_zuo_abnormal_ya:"压痛"},
            gynaecology_you_Checkbox:{gynaecology_you_normal:"正常", gynaecology_you_abnormal:"异常"},
            gynaecology_you_abnorma_Checkbox:{gynaecology_you_abnormal_pian:"片状增厚", gynaecology_you_abnormal_tiao:"条索增粗", gynaecology_you_abnormal_bao:"包块", gynaecology_you_abnormal_ya:"压痛"},
            belly_Checkbox:{belly_zc:"正常",belly_xiaya:"下腹正中压痛", belly_xiafan:"下腹正中反跳痛", belly_zuoya:"左下腹压痛", belly_zuofan:"左下腹反跳痛", belly_youya:"右下腹压痛", belly_youfan:"右下腹反跳痛", belly_ji:"肌紧张"},
            hemocyte_Checkbox:{hemocyte_no:"未查", hemocyte_yes:"已查"},
            leucocyte_Checkbox:{leucocyte_normal:"正常", leucocyte_abnormal:"异常"},
            neutrophil_Checkbox:{neutrophil_normal:"正常", neutrophil_abnormal:"异常"},
            protein_Checkbox:{protein_no:"未查", protein_yes:"已查"},
            protein_yes_Checkbox:{protein_yes_normal:"正常", protein_yes_abnormal:"异常"},
            erythrocyte_Checkbox:{erythrocyte_no:"未查", erythrocyte_yes:"已查"},
            erythrocyte_yes_Checkbox:{erythrocyte_yes_normal:"正常", erythrocyte_yes_abnormal:"异常"},
            check_vagina_Checkbox:{check_vagina_no:"未查", check_vagina_yes:"已查"},
            check_vagina_xian_Radio:["阴性", "阳性"],
            check_vagina_zhen_Radio:["阴性", "阳性"],
            check_vagina_di_Radio:["阴性", "阳性"],
            check_vagina_item_Checkbox:{check_vagina_bai_bool:"白细胞计数", check_vagina_ru_bool:"乳杆菌", check_vagina_za_bool:"乳杆菌"},
            check_cervix_Checkbox:{check_cervix_no:"未作", check_cervix_yes:"已作"},
            check_cervix_yes_Checkbox:{check_cervix_lin:"淋病奈瑟菌", check_cervix_sha:"沙眼衣原体", check_cervix_jie:"解脲支原体", check_cervix_ren:"人型支原体", check_cervix_sheng:"生殖支原体"},
            check_cervix_lin_type_Radio:["阴性", "阳性"],
            check_cervix_sha_type_Radio:["阴性", "阳性"],
            check_cervix_jie_type_Radio:["阴性", "阳性"],
            check_cervix_ren_type_Radio:["阴性", "阳性"],
            check_cervix_sheng_type_Radio:["阴性", "阳性"],
            check_hpv_Checkbox:{check_hpv_no:"未作", check_hpv_yes:"已作"},
            check_hpv_character_Radio:["阴性", "阳性"],
            check_hc_Checkbox:{check_hc_no:"未作", check_hc_yes:"已作"},
            check_hc_character_Radio:["阴性", "阳性"],
            check_ultrasound_Checkbox:{check_ultrasound_zuocu:"左侧输卵管增粗", check_ultrasound_youcu:"右侧输卵管增粗", check_ultrasound_zuoji:"左侧输卵管积液", check_ultrasound_youji:"右侧输卵管积液", check_ultrasound_bao_bool:"盆腔炎性包块", check_ultrasound_ji_bool:"盆腔积液"},
            check_ultrasound_bao_Radio:["最大直径<3cm", "3cm≤最大直径≤6cm", "最大直径>6cm"],
            check_ultrasound_ji_Radio:["深度<2mm", "深度2-3mm", "深度>3mm"],
            check_contrast_Checkbox:{check_contrast_no:"无", check_contrast_yes:"有"},

      relevantForm:{
      },
      rules:{},
    }
  },
  methods: {
  },
};
</script>
<style lang="">
</style>
