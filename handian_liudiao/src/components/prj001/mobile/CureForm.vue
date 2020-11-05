<template>
    <el-form ref="cureForm" :model="cureForm" 
            class="mobile" label-width="120" label-position="left">

      <el-form-item label="中西医结合治疗">
        <el-radio v-model="cureForm.to_cure" label="是">是</el-radio>
        <el-radio v-model="cureForm.to_cure" label="否">否</el-radio>
      </el-form-item>

        <div>
          <h3>一、中医治疗</h3>
          <h4>1、治法</h4>
          <div>
            <el-form-item label="(1)虚证治法">
                <el-radio v-for="item in mydata.xuzhengRadio"
                        v-model="cureForm.xuzheng_one"
                        :key="item" :label="item">
                </el-radio>
              <el-input v-model="cureForm.xuzheng_qita"></el-input>
            </el-form-item>
            <el-form-item label="(2)实证治法">
                <el-radio v-for="item in mydata.shizhengRadio"
                        v-model="cureForm.shizheng_one"
                        :key="item" :label="item">
                </el-radio>
              <el-input v-model="cureForm.shizheng_qita"></el-input>
            </el-form-item>
            <el-form-item label="(3)虚实夹杂证">
                <el-radio v-for="item in mydata.xushiRadio"
                        v-model="cureForm.xushi_one"
                        :key="item" :label="item">
                </el-radio>
              <el-input v-model="cureForm.xushi_qita"></el-input>
            </el-form-item>
          </div>
          <h4>2、代表方</h4>
          <div>
            <el-form-item label="(1)虚证代表方">
              <el-checkbox v-for="(val, key) in mydata.xu_fangjiCheckbox"
                          v-model="cureForm[key]"
                          :key="key" :label="val">
              </el-checkbox>
              <el-input v-model="cureForm.pre_xu_qita"></el-input>
            </el-form-item>
            <el-form-item label="(2)实证代表方">
              <el-checkbox v-for="(val, key) in mydata.shi_fangjiCheckbox"
                          v-model="cureForm[key]"
                          :key="key" :label="val">
              </el-checkbox>
              <el-input v-model="cureForm.pre_shi_qita"></el-input>
            </el-form-item>
            <el-form-item label="(3)虚实夹杂证代表方">
              <el-checkbox v-for="(val, key) in mydata.xushi_fangjiCheckbox"
                          v-model="cureForm[key]"
                          :key="key" :label="val">
              </el-checkbox>
              <el-input v-model="cureForm.pre_xushi_qita"></el-input>
            </el-form-item>
          </div>
          <h4>3、中成药</h4>
          <div>
            <el-form-item label="(1)虚证中成药">
              <el-checkbox v-for="(val, key) in mydata.xu_zhongyaoCheckbox"
                          v-model="cureForm[key]"
                          :key="key" :label="val">
              </el-checkbox>
              <el-input v-model="cureForm.zhong_xu_qita"></el-input>
            </el-form-item>
            <el-form-item label="(2)实证中成药">
              <el-checkbox v-for="(val, key) in mydata.shi_zhongyaoCheckbox"
                          v-model="cureForm[key]"
                          :key="key" :label="val">
              </el-checkbox>
              <el-input v-model="cureForm.zhong_shi_qita"></el-input>
            </el-form-item>
            <el-form-item label="(3)虚实夹杂证中成药">
              <el-checkbox v-for="(val, key) in mydata.xushi_zhongyaoCheckbox"
                          v-model="cureForm[key]"
                          :key="key" :label="val">
              </el-checkbox>
              <el-input v-model="cureForm.zhong_xushi_qita"></el-input>
            </el-form-item>
            <el-form-item label="(4)中医其他治疗">
              <el-checkbox v-for="(val, key) in mydata.zhongyi_qitaCheckbox"
                          v-model="cureForm[key]"
                          :key="key" :label="val">
              </el-checkbox>
              <el-input v-model="cureForm.zhongyi_qita"></el-input>
            </el-form-item>
          </div>
        </div>

        <div>
          <h3>二、西医治疗</h3>
          <h4>1、止血治疗</h4>
            <h4>(1)性激素</h4>
              <el-form-item label="孕激素">
                  <el-checkbox v-for="(val, key) in mydata.yunjisu_Checkbox"
                                v-model="cureForm[key]"
                                :key="key" :label="val">
                  </el-checkbox>
                  <el-input v-model="cureForm.yun_qita"></el-input>
              </el-form-item>
              <el-form-item label="雌激素">
                  <el-checkbox v-for="(val, key) in mydata.cijisu_Checkbox"
                                v-model="cureForm[key]"
                                :key="key" :label="val">
                  </el-checkbox>
                  <el-input v-model="cureForm.ci_qita"></el-input>
              </el-form-item>
              <el-form-item label="复方短效口服避孕药">
                  <el-checkbox v-for="(val, key) in mydata.koufu_Checkbox"
                                v-model="cureForm[key]"
                                :key="key" :label="val">
                  </el-checkbox>
                  <el-input v-model="cureForm.kou_qita"></el-input>
              </el-form-item>
              <el-form-item label="雄激素">
                  <el-checkbox v-model="cureForm.hormone_xiong" label="雄激素"></el-checkbox>
              </el-form-item>
              <el-form-item label="GnRH-α">
                  <el-checkbox v-model="cureForm.hormone_gn" label="GnRH-α"></el-checkbox>
              </el-form-item>

            <h4>(2)刮宫术</h4>
              <el-radio v-model="cureForm.guagongshu" label="是"></el-radio>
              <el-radio v-model="cureForm.guagongshu" label="否"></el-radio>
          <h4>2、调周治疗</h4>
              <el-checkbox v-for="(val, key) in mydata.tiaozhou_Checkbox"
                            v-model="cureForm[key]"
                            :key="key" :label="val">
              </el-checkbox>
              <el-input v-model="cureForm.zhou_qita"></el-input>
          <h4>3、促排卵</h4>
              <el-checkbox v-for="(val, key) in mydata.cupailuan_Checkbox"
                            v-model="cureForm[key]"
                            :key="key" :label="val">
              </el-checkbox>
              <el-input v-model="cureForm.cu_qita"></el-input>
          <h4>4、手术治疗</h4>
              <el-checkbox v-for="(val, key) in mydata.shoushu_Checkbox"
                            v-model="cureForm[key]"
                            :key="key" :label="val">
              </el-checkbox>
              <el-input v-model="cureForm.shu_qita"></el-input>
          <h4>5、其他治疗</h4>
              <el-input v-model="cureForm.other_cure"></el-input>
        </div>

    </el-form>
</template>
<script>
export default {
  name:'CureForm',
  data() {
    return {
      mydata: {
        // 1、治法
        'xuzhengRadio':['补脾益气,养血固冲调经','补益肾气,养血固冲调经','补血养营,益气调经','补气升提,固冲止血调经','养阴清热,凉血调经','滋肾益阴,清热固冲止血','温肾助阳,固冲止血'],
        'shizhengRadio':['温经散寒,活血调经','清热降火,凉血调经','燥湿化痰,活血调经','清热凉血,固冲止血','疏肝理气,活血调经','活血化瘀,固冲止血调经','清热除湿,凉血止血','清肝解郁,凉血调经'],
        'xushiRadio':['养阴清热,凉血调经','清热降火,凉血调经'],
        'zhifa':[
          {value: '虚证治法',label: '虚证治法',children: [
                                            {value: '补脾益气,养血固冲调经',label: '补脾益气,养血固冲调经'}
                                                      ]
          },
          {value: '实证治法',label: '实证治法',children: [{value: '温经散寒,活血调经',label: '温经散寒,活血调经'}] },
          {value: '虚实夹杂证',label: '虚实夹杂证',children: [{value: '养阴清热,凉血调经',label: '养阴清热,凉血调经'}] },
        ],
        'value':[],
        // 2、代表方
        'xu_fangjiCheckbox':{'pre_xu_yiqi':'补中益气汤','pre_xu_guyin':'固阴煎','pre_xu_yuanjian':'大补元煎',
                            'pre_xu_yangrong':'人参养荣汤','pre_xu_guipi':'归脾汤','pre_xu_anchong':'安冲汤',
                            'pre_xu_jianyuan':'举元煎','pre_xu_qingxue':'清血养阴汤','pre_xu_liangdi':'两地汤合二至丸',
                            'pre_xu_jiajian':'加减一阴煎','pre_xu_liuwei':'二至丸合六味地黄丸','pre_xu_zuogui':'左归丸合二至丸',
                            'pre_xu_yougui':'右归丸','pre_xu_guchong':'固冲汤','pre_xu_guben':'固本止崩汤','pre_xu_baoyin':'保阴煎',
                            },
        'shi_fangjiCheckbox':{'pre_shi_xiaoyao':'逍遥散','pre_shi_qingjing':'清经散','pre_shi_wenjing':'温经汤(《妇人大全良方》)',
                              'pre_shi_taohong':'桃红四物汤','pre_shi_siwu':'四物汤合失笑散','pre_shi_cangfu':'苍附导痰丸',
                              'pre_shi_liangdi':'两地汤合二至丸','pre_shi_zongpu':'棕蒲散','pre_shi_qinggan':'清肝止淋汤',
                              'pre_shi_zuyu':'逐瘀止血汤','pre_shi_qingre':'清热固经汤','pre_shi_zhibeng':'逐瘀止崩汤',
                              'pre_shi_danzhi':'丹栀逍遥散','pre_shi_longdan':'龙胆泻肝汤',
                              },
        'xushi_fangjiCheckbox':{'pre_xushi_liangdi':'两地汤','pre_xushi_qingjing':'清经散'},
        // 3、中成药
        'xu_zhongyaoCheckbox':{'zhong_xu_buzhong':'补中益气丸/颗粒','zhong_xu_renshen':'人参归脾丸','zhong_xu_guipi':'归脾丸',
                              'zhong_xu_ankun':'安坤颗粒','zhong_xu_fufang':'复方阿胶浆','zhong_xu_gujing':'固经丸',
                              'zhong_xu_ejiao':'阿胶当归合剂','zhong_xu_lvjiao':'驴胶补血颗粒','zhong_xu_erzhi':'二至丸',
                              'zhong_xu_zaizao':'妇科再造丸/胶囊','zhong_xu_yougui':'右归丸','zhong_xu_bazhen':'八珍益母胶囊',
                              'zhong_xu_wujibai':'乌鸡白凤丸/颗粒',
                              },
        'shi_zhongyaoCheckbox':{'zhong_shi_xuening':'宫血宁胶囊','zhong_shi_duanxue':'断血流片','zhong_shi_qianzhi':'茜芷胶囊/片',
                                'zhong_shi_yunnan':'云南白药胶囊','zhong_shi_yunnanh':'云南红药胶囊','zhong_shi_kunning':'坤宁口服液/颗粒',
                                'zhong_shi_fuxue':'妇科断红饮胶囊','zhong_shi_duyi':'独一味胶囊/丸','zhong_shi_zhikang':'致康胶囊',
                                'zhong_shi_gongning':'宫宁颗粒',
                                },
        'xushi_zhongyaoCheckbox':{'zhong_xushi_zhixue':'葆宫止血颗粒','zhong_xushi_jiawei':'加味逍遥口服液/合剂','zhong_xushi_gujing':'固经丸',
                                  'zhong_xushi_nvjin':'女金丸/胶囊','zhong_xushi_dingkun':'定坤丹','zhong_xushi_xiaoyao':'丹栀逍遥丸',
                                  'zhong_xushi_shiwei':'妇科十味片','zhong_xushi_tiaojing':'妇科调经片',
        },
        // 4、其他
        'zhongyi_qitaCheckbox':{'zhongyi_body':'体针','zhongyi_ears':'耳针','zhongyi_belly':'腹针',
                                'zhongyi_ai':'艾灸','zhongyi_yadou':'耳穴压豆','zhongyi_zhushe':'穴位注射',
                                'zhongyi_futie':'穴位敷贴',
                                },
        // 西医治疗
        // 1、性激素
        'yunjisu_Checkbox':{'yun_jizhu':'肌注黄体酮','yun_diqu':'地屈孕酮','yun_weihua':'微粒化黄体酮胶囊胶囊','yun_yuntong':'甲羟孕酮'},
        'cijisu_Checkbox':{'ci_benjia':'苯甲酸雌二醇','ci_jieheji':'结合雌激素（针剂）','ci_jiehepian':'结合雌激素（片剂）'},
        'koufu_Checkbox':{'kou_chunhuan':'炔雌醇环丙孕酮片','kou_quluoo':'屈螺酮炔雌醇片','kou_quluot':'屈螺酮炔雌醇片Ⅱ','kou_quyang':'去氧孕烯炔雌醇片','kou_fufang':'复方孕二烯酮片'},
        // 2、调周治疗
        'tiaozhou_Checkbox':{'zhou_wu':'无','zhou_yun':'孕激素','zhou_kou':'口服避孕药','zhou_ci':'雌、孕激素序贯法','zhou_zuo':'左炔诺孕酮宫内缓释系统'},
        // 3、促排卵
        'cupailuan_Checkbox':{'cu_wu':'无','cu_mifen':'氯米芬','cu_rongmao':'人绒毛膜促性腺激素(hCG)','cu_niao':'尿促性素(hMG)','cu_luan':'卵泡期使用低剂量雌激素','cu_lai':'来曲唑','cu_cu':'促卵泡生成激素(FSH)'},
        // 4、手术治疗
        'shoushu_Checkbox':{'shu_wu':'无','shu_neimo':'子宫内膜去除术','shu_qiechu':'子宫切除术'},
        // 5、其他治疗
      },
      cureForm:{},
    }
  },
  methods: {
  },

};
</script>
<style lang="">
</style>