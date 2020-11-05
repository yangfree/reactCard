<template>
  <el-dialog
    title="病史"
    class="my-dialog summary-dialog prj008-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="100%"
    center
  >
    <el-form
      ref="summaryForm"
      :model="infoForm"
      label-width="200px"
      label-position="left"
    >
      <!-- 提示信息 -->
      <el-alert
        v-if="check_status == '审核通过'"
        effect="dark"
        title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <el-alert
        v-if="check_status == '已提交'"
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

      <h3>一：既往史</h3>
      <!-- 表格内容开始 -->
      <el-divider content-position="left">1.孕产史</el-divider>
      <el-form-item label="1：孕产史：">
         <el-row  style="margin-bottom: 10px">
           <el-col :span="5">
              孕 &nbsp;<el-input-number v-model="infoForm.c0101" :min="0" :max="10" />&nbsp; 次、
           </el-col>
           <el-col :span="6">
             顺产  &nbsp;<el-input-number v-model="infoForm.c0102" :min="0" :max="10" />&nbsp;  次、
           </el-col>
           <el-col :span="6">
             剖宫产 &nbsp;<el-input-number v-model="infoForm.c0103" :min="0" :max="10" />&nbsp;  次、
           </el-col>
         </el-row>
          <el-row  style="margin-bottom: 10px">
           <el-col :span="6">
             早产 &nbsp; <el-input-number v-model="infoForm.c0104" :min="0" :max="10" /> &nbsp;次、
           </el-col>
           <el-col :span="6">
              药物流产&nbsp; <el-input-number v-model="infoForm.c0105" :min="0" :max="10" /> &nbsp;次、
           </el-col>
           <el-col :span="6">
             人工流产 &nbsp;<el-input-number v-model="infoForm.c0106" :min="0"  :max="10"  />&nbsp; 次、
          </el-col>
         </el-row> 

          <el-row  style="margin-bottom: 10px">
           <el-col :span="6">
             自然流产  &nbsp;<el-input-number v-model="infoForm.c0107" :min="0" :max="10"/> &nbsp;  次、
           </el-col>
           <el-col :span="6">
             异位妊娠  &nbsp;<el-input-number  v-model="infoForm.c0108" :min="0" :max="10"  />  &nbsp; 次、 
           </el-col>
           <el-col :span="6">
              清宫术  &nbsp;<el-input-number   v-model="infoForm.c0109" :min="0" :max="10" /> &nbsp; 次、
           </el-col>
         </el-row>        
         <el-row  style="margin-bottom: 10px">
           <el-col :span="2"> 其他: </el-col> 
           <el-col :span="16" >  
             <el-input  v-model="infoForm.c0110"  maxlength="50"  show-word-limit ></el-input>
           </el-col>   
         </el-row>
      </el-form-item>

      <el-form-item label="2.不良妊娠史">
        <el-row  style="margin-bottom: 10px">
           <el-col :span="6">
              孕6周以下：<el-input-number v-model="infoForm.c0201" :min="0"  :max="10" /> 次、 
           </el-col> 
           <el-col :span="6"> 
              孕6周至8周：<el-input-number v-model="infoForm.c0202" :min="0" :max="10"/> 次、 
          </el-col> 
          <el-col :span="6">
              孕8周至10周： <el-input-number v-model="infoForm.c0203" :min="0"  :max="10" /> 次、
          </el-col> 
        </el-row>
        <el-row  style="margin-bottom: 10px">
           <el-col :span="6">
             孕10周至12周：<el-input-number v-model="infoForm.c0204" :min="0" :max="10" /> 次、
           </el-col> 
           <el-col :span="6"> 
             孕12周至20周：<el-input-number v-model="infoForm.c0205" :min="0" :max="10"/>  次、
           </el-col> 
           <el-col :span="6">
             孕20周以上：<el-input-number v-model="infoForm.c0206" :min="0" :max="10"/>  次、
            </el-col> 
        </el-row>      
   
      </el-form-item>

      <el-form-item label="3、既往疾病史：">
        <el-checkbox v-model="infoForm.c0301[0]">无</el-checkbox>
        <el-checkbox v-model="infoForm.c0301[1]">多囊卵巢综合征</el-checkbox>
        <el-checkbox v-model="infoForm.c0301[2]">高泌乳素血症</el-checkbox>
        <el-checkbox v-model="infoForm.c0301[3]">异常子宫出血</el-checkbox>
        <el-checkbox v-model="infoForm.c0301[4]">盆腔炎性疾病</el-checkbox>
        <el-checkbox v-model="infoForm.c0301[5]">子宫腺肌症</el-checkbox>
        <el-checkbox v-model="infoForm.c0301[6]">子宫内膜异位症 </el-checkbox>
        <el-checkbox v-model="infoForm.c0301[7]">子宫平滑肌瘤 </el-checkbox>
        <el-checkbox v-model="infoForm.c0301[8]">子宫畸形 </el-checkbox>
        <el-checkbox v-model="infoForm.c0301[9]">子宫颈机能不全 </el-checkbox>
        <el-checkbox v-model="infoForm.c0301[10]">抗磷脂综合征 </el-checkbox>
        <el-checkbox v-model="infoForm.c0301[11]">甲减 </el-checkbox>
        <el-checkbox v-model="infoForm.c0301[12]">甲亢 </el-checkbox>
        <el-checkbox v-model="infoForm.c0301[13]">糖尿病 </el-checkbox>
        <el-checkbox v-model="infoForm.c0301[14]">子宫内膜炎 </el-checkbox>
        <el-checkbox v-model="infoForm.c0301[15]">其他 </el-checkbox>
        <el-input
          v-model="infoForm.c0302"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>

      <h3>二：个人史</h3>
      <el-form-item label="4.特殊嗜好：">
        <el-checkbox v-model="infoForm.c0401[0]">无</el-checkbox>
        <el-checkbox v-model="infoForm.c0401[1]">吸烟</el-checkbox>
        <el-checkbox v-model="infoForm.c0401[2]">饮酒</el-checkbox>
        <el-checkbox v-model="infoForm.c0401[3]"
          >熬夜（常23:00以后睡觉）</el-checkbox
        >
        <el-checkbox v-model="infoForm.c0401[4]">其他</el-checkbox>
        <el-input
          v-model="infoForm.c0402"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="5.体力状况：">
        <el-radio v-model="infoForm.c0501" label="1">好</el-radio>
        <el-radio v-model="infoForm.c0501" label="2">一般</el-radio>
        <el-radio v-model="infoForm.c0501" label="3">易疲倦</el-radio>
      </el-form-item>

      <el-form-item label="6.职业体力活动：">
        <el-radio v-model="infoForm.c0601" label="1">重体力劳动（如：搬运工、清洁工、农场工人、畜牧场工人等）</el-radio><br/>
        <el-radio v-model="infoForm.c0601" label="2">中体力劳动（如：家政服务人员、服务生、厨师、护士等）</el-radio><br/>
        <el-radio v-model="infoForm.c0601" label="3">轻体力劳动（如：教师、美容美发师、批发商、职员等）</el-radio><br/>
        <el-radio v-model="infoForm.c0601" label="4">久坐式的工作（如：收银员、出纳员、接线员、秘书等）</el-radio ><br/>
      </el-form-item>
      <el-form-item label="7.体育锻炼：：">
        <el-radio v-model="infoForm.c0701" label="1">无</el-radio>
        <el-radio v-model="infoForm.c0701" label="2">有</el-radio>
      </el-form-item>
      <el-form-item label="7-1.频次：：">
        <el-radio v-model="infoForm.c0702" label="1">很少（≤1次/周）</el-radio>
        <el-radio v-model="infoForm.c0702" label="2">偶尔（≤3次/周）</el-radio>
        <el-radio v-model="infoForm.c0702" label="3"
          >经常（≥4次/周）c0702 单选</el-radio
        >
      </el-form-item>
      <el-form-item label="7-2.强度：：">
        <el-radio v-model="infoForm.c0703" label="1"
          >一般(少量出汗，心率≤120次/分)</el-radio
        >
        <el-radio v-model="infoForm.c0703" label="2"
          >高强度(大汗淋漓，心率>120次/分)</el-radio
        >
      </el-form-item>
      <el-form-item label="7-3.减肥情况：">
        <el-radio v-model="infoForm.c0704" label="1">无</el-radio>
        <el-radio v-model="infoForm.c0704" label="2">运动减肥</el-radio>
        <el-radio v-model="infoForm.c0704" label="3">节食减肥</el-radio>
        <el-radio v-model="infoForm.c0704" label="4">药物减肥</el-radio>
        <el-radio v-model="infoForm.c0704" label="5">其他</el-radio>
      </el-form-item>

      <h3>三：月经带下史</h3>

      <el-form-item label="8.月经初潮年龄：">
        <el-radio v-model="infoForm.c08" label="1">&lt;11岁</el-radio>
        <el-radio v-model="infoForm.c08" label="2">11岁</el-radio>
        <el-radio v-model="infoForm.c08" label="3">12岁</el-radio>
        <el-radio v-model="infoForm.c08" label="4">13岁</el-radio>
        <el-radio v-model="infoForm.c08" label="5">14岁</el-radio>
        <el-radio v-model="infoForm.c08" label="6">15岁</el-radio>
        <el-radio v-model="infoForm.c08" label="7">16岁</el-radio>
        <el-radio v-model="infoForm.c08" label="8">&gt;16岁</el-radio>
      </el-form-item>
      <el-form-item label="9.月经周期：">
        <el-radio v-model="infoForm.c0901" label="1">&lt;20天</el-radio>
        <el-radio v-model="infoForm.c0901" label="2">21～25天</el-radio>
        <el-radio v-model="infoForm.c0901" label="3">26～30天</el-radio>
        <el-radio v-model="infoForm.c0901" label="4">31～35天</el-radio>
        <el-radio v-model="infoForm.c0901" label="5">36～60天</el-radio>
        <el-radio v-model="infoForm.c0901" label="6">61～90天</el-radio>
        <el-radio v-model="infoForm.c0901" label="7">其他</el-radio>
        <el-input
          v-model="infoForm.c0902"
          maxlength="20"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="10.月经经期：">
        <el-radio v-model="infoForm.c1001" label="1">1-2天</el-radio>
        <el-radio v-model="infoForm.c1001" label="2">3-7天</el-radio>
        <el-radio v-model="infoForm.c1001" label="3">7-15天</el-radio>
        <el-radio v-model="infoForm.c1001" label="4">其他</el-radio>
        <el-input
          v-model="infoForm.c1002"
          maxlength="20"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="11.总经血量：">
        <el-radio v-model="infoForm.c11" label="1">出血量中等,每天约需2-4张卫生巾</el-radio>  <br/>
        <el-radio v-model="infoForm.c11" label="2">出血量多,每天约需5-10张卫生巾</el-radio>  <br/>
        <el-radio v-model="infoForm.c11" label="3">出血量极多,每天多于10张卫生巾</el-radio>  <br/>
        <el-radio v-model="infoForm.c11" label="4">经量少,每天少于1张卫生巾</el-radio>  <br/>
        <el-radio v-model="infoForm.c11" label="5">经量极少,几乎不用卫生巾,用护垫即可</el-radio> <br/>
        <el-radio v-model="infoForm.c11" label="6">其他</el-radio> <br/>
      </el-form-item>
      <el-form-item label="12.岀血颜色：">
        <el-radio v-model="infoForm.c12" label="1">淡红</el-radio>
        <el-radio v-model="infoForm.c12" label="2">鲜红</el-radio>
        <el-radio v-model="infoForm.c12" label="3">暗红</el-radio>
        <el-radio v-model="infoForm.c12" label="4">紫红</el-radio>
        <el-radio v-model="infoForm.c12" label="5">紫黯</el-radio>
        <el-radio v-model="infoForm.c12" label="6">紫黑</el-radio>
        <el-radio v-model="infoForm.c12" label="7">褐色</el-radio>
        <el-radio v-model="infoForm.c12" label="8">其他</el-radio>
      </el-form-item>
      <el-form-item label="13.出血质地: （可多选）">
        <el-checkbox v-model="infoForm.c13[0]">正常</el-checkbox>
        <el-checkbox v-model="infoForm.c13[1]">粘稠</el-checkbox>
        <el-checkbox v-model="infoForm.c13[2]">清稀</el-checkbox>
        <el-checkbox v-model="infoForm.c13[3]">无血块</el-checkbox>
        <el-checkbox v-model="infoForm.c13[4]">经常出现血块</el-checkbox>
        <el-checkbox v-model="infoForm.c13[5]">偶有血块</el-checkbox>
        <el-checkbox v-model="infoForm.c13[6]">夹少量小血块</el-checkbox>
        <el-checkbox v-model="infoForm.c13[7]">夹较大血块</el-checkbox>
        <el-checkbox v-model="infoForm.c13[8]">其他</el-checkbox>
      </el-form-item>
      <el-form-item label="14.出血特点：">
        <el-radio v-model="infoForm.c14" label="1">顺畅</el-radio>
        <el-radio v-model="infoForm.c14" label="2">势急暴下</el-radio>
        <el-radio v-model="infoForm.c14" label="3">淋漓不断</el-radio>
        <el-radio v-model="infoForm.c14" label="4">点滴即净</el-radio>
        <el-radio v-model="infoForm.c14" label="5">其他</el-radio>
      </el-form-item>
      <el-form-item label="15,经期伴随症状:">
        <el-radio v-model="infoForm.c1501" label="1">无</el-radio>
        <el-radio v-model="infoForm.c1501" label="2">有</el-radio>
      </el-form-item>
      <el-form-item label="15-1.精神情绪:">
        <el-radio v-model="infoForm.c1502" label="1">正常</el-radio>
        <el-radio v-model="infoForm.c1502" label="2">神疲乏力</el-radio>
        <el-radio v-model="infoForm.c1502" label="3">紧张焦虑</el-radio>
        <el-radio v-model="infoForm.c1502" label="4">精神抑郁</el-radio>
        <el-radio v-model="infoForm.c1502" label="5">烦躁易怒</el-radio>
        <el-radio v-model="infoForm.c1502" label="6">时欲叹息</el-radio>
        <el-radio v-model="infoForm.c1502" label="7">其他</el-radio>
      </el-form-item>
      <el-form-item label="15-2.四肢:">
        <el-radio v-model="infoForm.c1503" label="1">正常</el-radio>
        <el-radio v-model="infoForm.c1503" label="2">畏寒肢冷</el-radio>
        <el-radio v-model="infoForm.c1503" label="3">手足心热</el-radio>
        <el-radio v-model="infoForm.c1503" label="4">腰膝酸软</el-radio>
        <el-radio v-model="infoForm.c1503" label="5">腰痛如折</el-radio>
        <el-radio v-model="infoForm.c1503" label="6">其他</el-radio>
      </el-form-item>
      <el-form-item label="15-3.头面:">
        <el-radio v-model="infoForm.c1504" label="1">正常</el-radio>
        <el-radio v-model="infoForm.c1504" label="2">面部痤疮</el-radio>
        <el-radio v-model="infoForm.c1504" label="3">面浮肢肿</el-radio>
        <el-radio v-model="infoForm.c1504" label="4">口苦</el-radio>
        <el-radio v-model="infoForm.c1504" label="5">口干</el-radio>
        <el-radio v-model="infoForm.c1504" label="6">头晕</el-radio>
        <el-radio v-model="infoForm.c1504" label="7">头痛</el-radio>
        <el-radio v-model="infoForm.c1504" label="8">头沉重</el-radio>
        <el-radio v-model="infoForm.c1504" label="9">其他</el-radio>
      </el-form-item>
      <el-form-item label="15-4.胸腹:">
        <el-radio v-model="infoForm.c1505" label="1">正常</el-radio>
        <el-radio v-model="infoForm.c1505" label="2">心胸烦闷</el-radio>
        <el-radio v-model="infoForm.c1505" label="3">乳房胀痛</el-radio>
        <el-radio v-model="infoForm.c1505" label="4">胸胁胀痛</el-radio>
        <el-radio v-model="infoForm.c1505" label="5">小腹坠胀</el-radio>  <br/>
        <el-radio v-model="infoForm.c1505" label="6">小腹刺痛</el-radio>
        <el-radio v-model="infoForm.c1505" label="7">小腹胀痛</el-radio>
        <el-radio v-model="infoForm.c1505" label="8">小腹冷痛</el-radio>
        <el-radio v-model="infoForm.c1505" label="9">小腹隐痛</el-radio>
        <el-radio v-model="infoForm.c1505" label="10">疼痛拒按</el-radio>  <br/>
        <el-radio v-model="infoForm.c1505" label="11">腹痛喜按</el-radio>
        <el-radio v-model="infoForm.c1505" label="12">腹痛得热痛减</el-radio>
        <el-radio v-model="infoForm.c1505" label="13">血块下痛减</el-radio>
        <el-radio v-model="infoForm.c1505" label="14">其他</el-radio>
      </el-form-item>
      <el-form-item label="15-5.饮食:">
        <el-radio v-model="infoForm.c1506" label="1">正常</el-radio>
        <el-radio v-model="infoForm.c1506" label="2">胸闷恶心</el-radio>
        <el-radio v-model="infoForm.c1506" label="3">脘腹胀满</el-radio>
        <el-radio v-model="infoForm.c1506" label="4">食欲不佳</el-radio>
        <el-radio v-model="infoForm.c1506" label="5">其他</el-radio>
      </el-form-item>
      <el-form-item label="15-6.睡眠:">
        <el-radio v-model="infoForm.c1507" label="1">正常</el-radio>
        <el-radio v-model="infoForm.c1507" label="2">多梦</el-radio>
        <el-radio v-model="infoForm.c1507" label="3">易醒</el-radio>
        <el-radio v-model="infoForm.c1507" label="4">难以入眠</el-radio>
        <el-radio v-model="infoForm.c1507" label="5">彻夜难眠</el-radio>
        <el-radio v-model="infoForm.c1507" label="6">其他</el-radio>
      </el-form-item>
      <el-form-item label="15-7.二便:">
        <el-radio v-model="infoForm.c1508" label="1">正常</el-radio>
        <el-radio v-model="infoForm.c1508" label="2">大便燥结</el-radio>
        <el-radio v-model="infoForm.c1508" label="3">大便溏薄</el-radio>
        <el-radio v-model="infoForm.c1508" label="4">时干时稀</el-radio>
        <el-radio v-model="infoForm.c1508" label="5">泄泻</el-radio>
        <el-radio v-model="infoForm.c1508" label="6">小便频数</el-radio>
        <el-radio v-model="infoForm.c1508" label="7">小便短赤</el-radio>
        <el-radio v-model="infoForm.c1508" label="8">小便清长</el-radio>
        <el-radio v-model="infoForm.c1508" label="9">其他</el-radio>
      </el-form-item>
      <el-form-item label="16.平素带下情况: （可多选）">
        <el-checkbox v-model="infoForm.c16[0]">带下量正常</el-checkbox>
        <el-checkbox v-model="infoForm.c16[1]">带下量少</el-checkbox>
        <el-checkbox v-model="infoForm.c16[2]">带下量多</el-checkbox>
        <el-checkbox v-model="infoForm.c16[3]">带下透明</el-checkbox>
        <el-checkbox v-model="infoForm.c16[4]">带下色黄</el-checkbox>
        <el-checkbox v-model="infoForm.c16[5]">带下色白</el-checkbox>  <br/>
        <el-checkbox v-model="infoForm.c16[6]">带下色黄绿:</el-checkbox>
        <el-checkbox v-model="infoForm.c16[7]">带下质黏而不稠</el-checkbox>
        <el-checkbox v-model="infoForm.c16[8]">带下质清稀</el-checkbox>
        <el-checkbox v-model="infoForm.c16[9]">带下质稠</el-checkbox>
        <el-checkbox v-model="infoForm.c16[10]">其他</el-checkbox>
      </el-form-item>
      <el-divider content-position="left">17.伴侣情况</el-divider>
      <el-form-item label="17-1.个人史:">
        <el-checkbox v-model="infoForm.c1701[0]">无特殊</el-checkbox>
        <el-checkbox v-model="infoForm.c1701[1]">吸烟</el-checkbox>
        <el-checkbox v-model="infoForm.c1701[2]">饮酒</el-checkbox>
        <el-checkbox v-model="infoForm.c1701[3]">其它</el-checkbox>
      </el-form-item>
      <el-form-item label="17-2.既往史: （可多选）">
        <el-checkbox v-model="infoForm.c1702[0]">无</el-checkbox>
        <el-checkbox v-model="infoForm.c1702[1]">附睾炎</el-checkbox>
        <el-checkbox v-model="infoForm.c1702[2]">精囊炎</el-checkbox>
        <el-checkbox v-model="infoForm.c1702[3]">前列腺炎</el-checkbox>
        <el-checkbox v-model="infoForm.c1702[4]">糖尿病</el-checkbox>
        <el-checkbox v-model="infoForm.c1702[5]">甲亢</el-checkbox>
        <el-checkbox v-model="infoForm.c1702[6]">甲减</el-checkbox>
        <el-checkbox v-model="infoForm.c1702[7]">其他</el-checkbox>
      </el-form-item>
      <el-form-item label="17-3.是否生育过:">
        <el-radio v-model="infoForm.c1703" label="1">否</el-radio>
        <el-radio v-model="infoForm.c1703" label="2">是</el-radio>
      </el-form-item>
      <el-form-item label="17-4.精液检査:">
        <el-radio v-model="infoForm.c1704" label="1">未做</el-radio>
        <el-radio v-model="infoForm.c1704" label="2">正常</el-radio>
        <el-radio v-model="infoForm.c1704" label="3"
          >异常(精子数目、精子活动力、畸形精子率)</el-radio
        >
      </el-form-item>
      <el-form-item label="17-5.精液异常治疗:">
        <el-radio v-model="infoForm.c1705" label="1">无</el-radio>
        <el-radio v-model="infoForm.c1705" label="2">中药治疗</el-radio>
        <el-radio v-model="infoForm.c1705" label="3">西药治疗</el-radio>
        <el-radio v-model="infoForm.c1705" label="4">手术治疗</el-radio>
        <el-input
          v-model="infoForm.c1706"
          maxlength="200"
          show-word-limit
          placeholder="请注明用药内容、疗程时间"
        ></el-input>
      </el-form-item>
      <el-divider content-position="left">18.平素带下情况</el-divider>
      <el-form-item label="18-1.量:">
        <el-radio v-model="infoForm.c1801" label="1">正常</el-radio>
        <el-radio v-model="infoForm.c1801" label="2">量少</el-radio>
        <el-radio v-model="infoForm.c1801" label="3">量多</el-radio>
      </el-form-item>
      <el-form-item label="18-2.色:">
        <el-radio v-model="infoForm.c1802" label="1">色白</el-radio>
        <el-radio v-model="infoForm.c1802" label="2">色黄</el-radio>
        <el-radio v-model="infoForm.c1802" label="3">透明</el-radio>
        <el-radio v-model="infoForm.c1802" label="4">色黄绿</el-radio>
        <el-radio v-model="infoForm.c1802" label="5">其它</el-radio>
        <el-input
          v-model="infoForm.c1803"
          maxlength="50"
          show-word-limit
          placeholder="其它说明"
        ></el-input>
      </el-form-item>
      <el-form-item label="18-3.质:">
        <el-radio v-model="infoForm.c1804" label="1">黏而不稠</el-radio>
        <el-radio v-model="infoForm.c1804" label="2">质清稀</el-radio>
        <el-radio v-model="infoForm.c1804" label="3">质稠</el-radio>
      </el-form-item>

      <h3>四：婚姻史及其他</h3>
      <el-form-item label="19.婚姻史:">
        <el-radio v-model="infoForm.c19" label="1">未婚有性生活</el-radio>
        <el-radio v-model="infoForm.c19" label="2">已婚同居</el-radio>
        <el-radio v-model="infoForm.c19" label="3">已婚分居</el-radio>
        <el-radio v-model="infoForm.c19" label="4">再婚</el-radio>
        <el-radio v-model="infoForm.c19" label="5">其它</el-radio>
      </el-form-item>
      <el-form-item label="20.既往避孕措施:">
        <el-radio v-model="infoForm.c2001" label="1">无</el-radio>
        <el-radio v-model="infoForm.c2001" label="2">结扎</el-radio>
        <el-radio v-model="infoForm.c2001" label="3">宫内节育器</el-radio>
        <el-radio v-model="infoForm.c2001" label="4">避孕套</el-radio>
        <el-radio v-model="infoForm.c2001" label="5">口服避孕药</el-radio>
        <el-radio v-model="infoForm.c2001" label="6">其他</el-radio>
        <el-input
          v-model="infoForm.c2002"
          maxlength="50"
          show-word-limit
          placeholder="其它说明"
        ></el-input>
      </el-form-item>
      <el-form-item label="21.一级亲属（母亲、姐妹）自然流产史:">
        <el-radio v-model="infoForm.c21" label="1">无</el-radio>
        <el-radio v-model="infoForm.c21" label="2">1次</el-radio>
        <el-radio v-model="infoForm.c21" label="3">2次</el-radio>
        <el-radio v-model="infoForm.c21" label="4">3次及以上</el-radio>
      </el-form-item>
      <el-form-item label="22.一级亲属（父母、兄弟姐妹、子女）其他疾病史:">
        <el-radio v-model="infoForm.c2201" label="1">无</el-radio>
        <el-radio v-model="infoForm.c2201" label="2">有</el-radio>
        <el-radio v-model="infoForm.c2201" label="3">不详</el-radio>
        <el-input
          v-model="infoForm.c2202"
          maxlength="50"
          show-word-limit
          placeholder="有，说明"
        ></el-input>
      </el-form-item>
      <h3>五：平素全身症状</h3>
      <el-form-item label="23.平素全身症状:">
        <el-radio v-model="infoForm.c2301" label="1">无</el-radio>
        <el-radio v-model="infoForm.c2301" label="2">有</el-radio>
      </el-form-item>
      <el-form-item label="23-1.精神情绪:">
        <el-radio v-model="infoForm.c2302" label="1">神疲肢倦</el-radio>
        <el-radio v-model="infoForm.c2302" label="2">气短懒言</el-radio>
        <el-radio v-model="infoForm.c2302" label="3">精神抑郁</el-radio>
        <el-radio v-model="infoForm.c2302" label="4">烦躁易怒</el-radio>
        <el-radio v-model="infoForm.c2302" label="5">时欲叹息</el-radio>
        <el-radio v-model="infoForm.c2302" label="6">其他</el-radio>
        <el-input
          v-model="infoForm.c2303"
          maxlength="50"
          show-word-limit
          placeholder="其他，说明"
        ></el-input>
      </el-form-item>
      <el-form-item label="23-2.头面:">
        <el-radio v-model="infoForm.c2304" label="1">面色萎黄</el-radio>
        <el-radio v-model="infoForm.c2304" label="2">面色晦暗</el-radio>
        <el-radio v-model="infoForm.c2304" label="3">面有黯斑</el-radio>
        <el-radio v-model="infoForm.c2304" label="4">面浮肢肿</el-radio>
        <el-radio v-model="infoForm.c2304" label="5">颧赤唇红</el-radio>
        <el-radio v-model="infoForm.c2304" label="6">口苦咽干</el-radio>
        <el-radio v-model="infoForm.c2304" label="7">头晕耳鸣</el-radio>
        <el-radio v-model="infoForm.c2304" label="8">眼花</el-radio>
        <el-radio v-model="infoForm.c2304" label="9">其他</el-radio>

        <el-input
          v-model="infoForm.c2305"
          maxlength="50"
          show-word-limit
          placeholder="其他，说明"
        ></el-input>
      </el-form-item>
      <el-form-item label="23-3.形体、四肢:">
        <el-radio v-model="infoForm.c2306" label="1">形体肥胖</el-radio>
        <el-radio v-model="infoForm.c2306" label="2">形体瘦小</el-radio>
        <el-radio v-model="infoForm.c2306" label="3">畏寒肢冷</el-radio>
        <el-radio v-model="infoForm.c2306" label="4">手足心热</el-radio>
        <el-radio v-model="infoForm.c2306" label="5">腰酸腿软</el-radio>
        <el-radio v-model="infoForm.c2306" label="6">腰痛如折</el-radio>
        <el-radio v-model="infoForm.c2306" label="7">其他</el-radio>
        <el-input
          v-model="infoForm.c2307"
          maxlength="50"
          show-word-limit
          placeholder="其他，说明"
        ></el-input>
      </el-form-item>
      <el-form-item label="23-4.胸腹部:">
        <el-radio v-model="infoForm.c2308" label="1">胸闷不舒</el-radio>
        <el-radio v-model="infoForm.c2308" label="2">经前乳房胀痛</el-radio>
        <el-radio v-model="infoForm.c2308" label="3">经前胸胁胀痛</el-radio>
        <el-radio v-model="infoForm.c2308" label="4">经前少腹胀痛</el-radio>
        <el-radio v-model="infoForm.c2308" label="5">腹空坠</el-radio>
        <el-radio v-model="infoForm.c2308" label="6">小腹空痛</el-radio>
        <el-radio v-model="infoForm.c2308" label="7">小腹刺痛</el-radio>
        <el-radio v-model="infoForm.c2308" label="8">小腹胀痛</el-radio>
        <el-radio v-model="infoForm.c2308" label="9">小腹冷痛</el-radio>
        <el-radio v-model="infoForm.c2308" label="10">小腹隐痛</el-radio>
        <el-radio v-model="infoForm.c2308" label="11">其他</el-radio>
        <el-input
          v-model="infoForm.c2309"
          maxlength="50"
          show-word-limit
          placeholder="其他，说明"
        ></el-input>
      </el-form-item>
      <el-form-item label="23-5.睡眠:">
        <el-radio v-model="infoForm.c2310" label="1">心悸失眠</el-radio>
        <el-radio v-model="infoForm.c2310" label="2">夜寐不宁</el-radio>
        <el-radio v-model="infoForm.c2310" label="3">夜寐梦多</el-radio>
        <el-radio v-model="infoForm.c2310" label="4">其他</el-radio>
        <el-input
          v-model="infoForm.c2311"
          maxlength="50"
          show-word-limit
          placeholder="其他，说明"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button
        type="primary"
        :disabled="check_status == '审核通过'"
        v-if="exist"
        @click="updateSummaryForm"
        >确定</el-button
      >
      <!-- <el-button type="primary" v-else @click="createSummaryForm" >确定</el-button> -->
      <el-button @click="dialogVisible = false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj008";
export default {
  name: "SummaryForm",
  data() {
    return {
      infoForm: {
        c0101:0,
        c0102:0,
        c0103:0,
        c0104:0,
        c0105:0,
        c0106:0,
        c0107:0,
        c0108:0,
        c0109:0,
        c0110:'',
        c0201:0,
        c0202:0,
        c0203:0,
        c0204:0,
        c0205:0,
        c0206:0,
        c0301:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
        c0302:'',
        c0401:[false,false,false,false,false],
        c0402:'',
        c0501:0,
        c0601:0,
        c0701:0,
        c0702:0,
        c0703:0,
        c0704:0,
        c08:0,
        c0901:0,
        c0902:'',
        c1001:0,
        c1002:'',
        c11:0,
        c12:0,
        c13:[false,false,false,false,false,  false,false,false,false],
        c14:0,
        c1501:0,
        c1502:0,
        c1503:0,
        c1504:0,
        c1505:0,
        c1506:0,
        c1507:0,
        c1508:0,
        c16:[false,false,false,false,false,  false,false,false,false,false,     false ],
        c1701:[false,false,false,false],
        c1702:[false,false,false,false ,false,false,false,false],
        c1703:0,
        c1704:0,
        c1705:0,
        c1706:'',
        c1801:0,
        c1802:0,
        c1803:'',
        c1804:0,
        c19:0,
        c2001:0,
        c2002:'',
        c21:0,
        c2201:0,
        c2202:'',     
        c2301:0,
        c2302:0,
        c2303:'',
        c2304:0, 
        c2305:'',
        c2306:0, 
        c2307:'',
        c2308:0, 
        c2309:'',
        c2310:0, 
        c2311:''
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
      console.log("既往史的数据:", data);
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
    updateSummaryForm() {
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
.prj008-summary {
  .el-input-group__append,
  .el-input-group__prepend {
    width: 35px;
  }
  .el-input-group > .el-input__inner {
    vertical-align: middle;
    display: initial;
  }
}

.prj008-dialog {
  h4 {
    color: cornflowerblue;
  }
}
</style>

