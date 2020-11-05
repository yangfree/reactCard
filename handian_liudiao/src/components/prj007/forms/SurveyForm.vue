<template>
  <el-dialog
    title="认知及治疗意愿调查"
    class="my-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    center
  >
    <el-form ref="surveyForm" :model="infoForm" label-width="250px" label-position="left">
      <!-- 提示信息 -->
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
      <!-- 表格内容开始 -->
      <!-- 若为内异症 -->
      <div v-if="hideOrShow.l001_l015==='0'? false: true">
        <el-form-item label="1、您认为母亲有子宫内膜异位症，女儿患子宫内膜异位症的风险会增加吗？">
          <el-radio v-model="infoForm.l001" label="1">会</el-radio>
          <el-radio v-model="infoForm.l001" label="2">不会</el-radio>
          <el-radio v-model="infoForm.l001" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="2、您认为子宫内膜异位症有转变成恶性肿瘤、癌症的可能吗？">
          <el-radio v-model="infoForm.l002" label="1">有</el-radio>
          <el-radio v-model="infoForm.l002" label="2">没有</el-radio>
          <el-radio v-model="infoForm.l002" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="3、您认为子宫内膜异位症属于一种慢性疾病吗？">
          <el-radio v-model="infoForm.l003" label="1">属于</el-radio>
          <el-radio v-model="infoForm.l003" label="2">不属于</el-radio>
          <el-radio v-model="infoForm.l003" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="4、您认为子宫内膜异位症需要定期复查，进行长期管理吗？">
          <el-radio v-model="infoForm.l004" label="1">需要</el-radio>
          <el-radio v-model="infoForm.l004" label="2">不需要</el-radio>
          <el-radio v-model="infoForm.l004" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="5、您认为子宫内膜异位症会影响生育功能吗？">
          <el-radio v-model="infoForm.l005" label="1">会</el-radio>
          <el-radio v-model="infoForm.l005" label="2">不会</el-radio>
          <el-radio v-model="infoForm.l005" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="6、您认为子宫内膜异位症保守手术治疗后会复发吗？">
          <el-radio v-model="infoForm.l006" label="1">会</el-radio>
          <el-radio v-model="infoForm.l006" label="2">不会</el-radio>
          <el-radio v-model="infoForm.l006" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="7、您认为子宫内膜异位症保守手术治疗后需要继续药物治疗吗？">
          <el-radio v-model="infoForm.l007" label="1">需要</el-radio>
          <el-radio v-model="infoForm.l007" label="2">不需要</el-radio>
          <el-radio v-model="infoForm.l007" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="8、您认为子宫内膜异位症患者需要多久进行一次复查？">
          <el-radio v-model="infoForm.l008" label="1">3-6个月1次</el-radio>
          <el-radio v-model="infoForm.l008" label="2">1年1次</el-radio>
          <el-radio v-model="infoForm.l008" label="3">2-3年1次</el-radio>
          <el-radio v-model="infoForm.l008" label="4">无需复查</el-radio>
        </el-form-item>

        <el-form-item label="9、您认为卵巢子宫内膜异位囊肿患者手术治疗会影响卵巢功能吗？">
          <el-radio v-model="infoForm.l009" label="1">有影响</el-radio>
          <el-radio v-model="infoForm.l009" label="2">没影响</el-radio>
          <el-radio v-model="infoForm.l009" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="10、您认为子宫内膜异位症患者不宜食用下列哪些食物或保健品？">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l010[0]">豆制品</el-checkbox>
          <el-checkbox v-model="infoForm.l010[1]">蜂王浆</el-checkbox>
          <el-checkbox v-model="infoForm.l010[2]">冷饮、雪糕</el-checkbox>
          <el-checkbox v-model="infoForm.l010[3]">胎盘类制品</el-checkbox>
          <el-checkbox v-model="infoForm.l010[4]">雪蛤油</el-checkbox>
          <el-checkbox v-model="infoForm.l010[5]">阿胶</el-checkbox>
          <el-checkbox v-model="infoForm.l010[6]">成分不明的保健品</el-checkbox>
          <el-checkbox v-model="infoForm.l010[7]">不知道</el-checkbox>
        </el-form-item>

        <el-form-item label="11、您认为子宫内膜异位症患者在生活中需要注意以下哪些方面？">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l011[0]">规律作息</el-checkbox>
          <el-checkbox v-model="infoForm.l011[1]">适当运动</el-checkbox>
          <el-checkbox v-model="infoForm.l011[2]">调整情绪，保持心态平和</el-checkbox>
          <el-checkbox v-model="infoForm.l011[3]">尽早生育</el-checkbox>
          <el-checkbox v-model="infoForm.l011[4]">忌食或少食生冷寒凉（水果、酸奶、凉菜、海鲜等）</el-checkbox>
          <el-checkbox v-model="infoForm.l011[5]">定期复查</el-checkbox>
          <el-checkbox v-model="infoForm.l011[6]">不知道</el-checkbox>
        </el-form-item>

        <el-form-item label="12、你都通过什么途径了解子宫内膜异位症？">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l012[0]">微信公众号、APP等新媒体</el-checkbox>
          <el-checkbox v-model="infoForm.l012[1]">搜索引擎、贴吧、知乎等门户网站</el-checkbox>
          <el-checkbox v-model="infoForm.l012[2]">科普书</el-checkbox>
          <el-checkbox v-model="infoForm.l012[3]">妇科教材、专业文献</el-checkbox>
          <el-checkbox v-model="infoForm.l012[4]">妇科医生的科普讲座</el-checkbox>
          <el-checkbox v-model="infoForm.l012[5]">广播、电视节目</el-checkbox>
          <el-checkbox v-model="infoForm.l012[6]">妇科专业医生面对面交流</el-checkbox>
          <el-checkbox v-model="infoForm.l012[7]">病友交流</el-checkbox>
        </el-form-item>

        <el-form-item label="13、您倾向于去什么级别的医疗保健机构治疗此病？">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l013[0]">综合性大医院</el-checkbox>
          <el-checkbox v-model="infoForm.l013[1]">妇幼保健院等专科医院</el-checkbox>
          <el-checkbox v-model="infoForm.l013[2]">中医院</el-checkbox>
          <el-checkbox v-model="infoForm.l013[3]">社区医院</el-checkbox>
          <el-checkbox v-model="infoForm.l013[4]">民营医院</el-checkbox>
          <el-checkbox v-model="infoForm.l013[5]">个体诊所</el-checkbox>
        </el-form-item>

        <el-form-item label="14、你倾向于接受以下哪些治疗？">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l014[0]">中医药治疗</el-checkbox>
          <el-checkbox v-model="infoForm.l014[1]">西药治疗</el-checkbox>
          <el-checkbox v-model="infoForm.l014[2]">手术治疗</el-checkbox>
          <el-checkbox v-model="infoForm.l014[3]">定期检查</el-checkbox>
          <el-checkbox v-model="infoForm.l014[4]">不治疗</el-checkbox>
        </el-form-item>

        <el-form-item label="15、若您愿意使用中医药治疗，您倾向于使用以下哪些治疗方式？">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l015[0]">中药汤剂</el-checkbox>
          <el-checkbox v-model="infoForm.l015[1]">中成药</el-checkbox>
          <el-checkbox v-model="infoForm.l015[2]">针刺</el-checkbox>
          <el-checkbox v-model="infoForm.l015[3]">艾灸</el-checkbox>
          <el-checkbox v-model="infoForm.l015[4]">灌肠</el-checkbox>
          <el-checkbox v-model="infoForm.l015[5]">中药外敷</el-checkbox>
          <el-checkbox v-model="infoForm.l015[6]">阴道上药</el-checkbox>
          <el-checkbox v-model="infoForm.l015[7]">其他</el-checkbox>
          <el-input v-model="infoForm.l015a"></el-input>
        </el-form-item>
      </div>

      <!-- <h4>若为腺肌病</h4> -->
      <div v-if="hideOrShow.l016_l027==='0'? false: true">
        <el-form-item label="1、您认为母亲有子宫腺肌病，女儿患子宫腺肌病的风险会增加吗? ">
          <el-radio v-model="infoForm.l016" label="1">会</el-radio>
          <el-radio v-model="infoForm.l016" label="2">不会</el-radio>
          <el-radio v-model="infoForm.l016" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="2、您认为子宫腺肌病有转变成恶性肿瘤、癌症的可能吗? ">
          <el-radio v-model="infoForm.l017" label="1">会</el-radio>
          <el-radio v-model="infoForm.l017" label="2">不会</el-radio>
          <el-radio v-model="infoForm.l017" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="3、您认为子宫腺肌病属于一种慢性疾病吗? ">
          <el-radio v-model="infoForm.l018" label="1">属于</el-radio>
          <el-radio v-model="infoForm.l018" label="2">不属于</el-radio>
          <el-radio v-model="infoForm.l018" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="4、您认为子宫腺肌病需要定期复查，进行长期管理吗? ">
          <el-radio v-model="infoForm.l019" label="1">需要</el-radio>
          <el-radio v-model="infoForm.l019" label="2">不需要</el-radio>
          <el-radio v-model="infoForm.l019" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="5、您认为子宫腺肌病会影响生育功能吗? ">
          <el-radio v-model="infoForm.l020" label="1">会</el-radio>
          <el-radio v-model="infoForm.l020" label="2">不会</el-radio>
          <el-radio v-model="infoForm.l020" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="6、您认为子宫腺肌病患者需要多久进行一次复查?">
          <el-radio v-model="infoForm.l021" label="1">3-6个月1次</el-radio>
          <el-radio v-model="infoForm.l021" label="2">1年1次</el-radio>
          <el-radio v-model="infoForm.l021" label="3">2-3年1次</el-radio>
          <el-radio v-model="infoForm.l021" label="3">无需复查</el-radio>
        </el-form-item>

        <el-form-item label="7、您认为子宫腺肌病患者不宜食用下列哪些食物或保健品?">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l022[0]">豆制品</el-checkbox>
          <el-checkbox v-model="infoForm.l022[1]">蜂王浆</el-checkbox>
          <el-checkbox v-model="infoForm.l022[2]">冷饮、雪糕</el-checkbox>
          <el-checkbox v-model="infoForm.l022[3]">胎盘类制品</el-checkbox>
          <el-checkbox v-model="infoForm.l022[4]">雪蛤油</el-checkbox>
          <el-checkbox v-model="infoForm.l022[5]">阿胶</el-checkbox>
          <el-checkbox v-model="infoForm.l022[6]">成分不明的保健品</el-checkbox>
          <el-checkbox v-model="infoForm.l022[7]">不知道</el-checkbox>
        </el-form-item>

        <el-form-item label="8、您认为子宫腺肌病患者在生活中需要注意以下哪些方面? ">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l023[0]">规律作息</el-checkbox>
          <el-checkbox v-model="infoForm.l023[1]">适当运动</el-checkbox>
          <el-checkbox v-model="infoForm.l023[2]">调整情绪，保持心态平和</el-checkbox>
          <el-checkbox v-model="infoForm.l023[3]">尽早生育</el-checkbox>
          <el-checkbox v-model="infoForm.l023[4]">忌食或少食生冷寒凉（水果、酸奶、凉菜、海鲜等）</el-checkbox>
          <el-checkbox v-model="infoForm.l023[5]">定期复查</el-checkbox>
          <el-checkbox v-model="infoForm.l023[6]">不知道</el-checkbox>
        </el-form-item>

        <el-form-item label="9、你都通过什么途径了解子宫腺肌病？ ">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l024[0]">微信公众号、APP等新媒体</el-checkbox>
          <el-checkbox v-model="infoForm.l024[1]">搜索引擎、贴吧、知乎等门户网站</el-checkbox>
          <el-checkbox v-model="infoForm.l024[2]">科普书</el-checkbox>
          <el-checkbox v-model="infoForm.l024[3]">妇科教材、专业文献</el-checkbox>
          <el-checkbox v-model="infoForm.l024[4]">妇科医生的科普讲座</el-checkbox>
          <el-checkbox v-model="infoForm.l024[5]">广播、电视节目</el-checkbox>
          <el-checkbox v-model="infoForm.l024[6]">妇科专业医生面对面交流</el-checkbox>
          <el-checkbox v-model="infoForm.l024[7]">病友交流</el-checkbox>
        </el-form-item>

        <el-form-item label="10、您倾向于去什么级别的医疗保健机构治疗此病？ ">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l025[0]">综合性大医院</el-checkbox>
          <el-checkbox v-model="infoForm.l025[1]">妇幼保健院等专科医院</el-checkbox>
          <el-checkbox v-model="infoForm.l025[2]">中医院</el-checkbox>
          <el-checkbox v-model="infoForm.l025[3]">社区医院</el-checkbox>
          <el-checkbox v-model="infoForm.l025[4]">民营医院</el-checkbox>
          <el-checkbox v-model="infoForm.l025[5]">个体诊所</el-checkbox>
        </el-form-item>

        <el-form-item label="11、你倾向于接受以下哪些治疗？ ">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l026[0]">中医药治疗</el-checkbox>
          <el-checkbox v-model="infoForm.l026[1]">西药治疗</el-checkbox>
          <el-checkbox v-model="infoForm.l026[2]">手术治疗</el-checkbox>
          <el-checkbox v-model="infoForm.l026[3]">定期检查</el-checkbox>
          <el-checkbox v-model="infoForm.l026[4]">不治疗</el-checkbox>
        </el-form-item>

        <el-form-item label="12、若您愿意使用中医药治疗，您倾向于使用以下哪些治疗方式？">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l027[0]">中药汤剂</el-checkbox>
          <el-checkbox v-model="infoForm.l027[1]">中成药</el-checkbox>
          <el-checkbox v-model="infoForm.l027[2]">针刺</el-checkbox>
          <el-checkbox v-model="infoForm.l027[3]">艾灸</el-checkbox>
          <el-checkbox v-model="infoForm.l027[4]">灌肠</el-checkbox>
          <el-checkbox v-model="infoForm.l027[5]">中药外敷</el-checkbox>
          <el-checkbox v-model="infoForm.l027[6]">阴道上药</el-checkbox>
          <el-checkbox v-model="infoForm.l027[7]">其他</el-checkbox>
          <el-input v-model="infoForm.l027a"></el-input>
        </el-form-item>
      </div>

      <!-- <h4>若均有</h4>Î -->
      <div v-if="hideOrShow.l028_l046==='0'? false: true">
        <el-form-item label="1、您认为母亲有子宫内膜异位症，女儿患子宫内膜异位症的风险会增加吗？ ">
          <el-radio v-model="infoForm.l028" label="1">会</el-radio>
          <el-radio v-model="infoForm.l028" label="2">不会</el-radio>
          <el-radio v-model="infoForm.l028" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="2、您认为母亲有子宫腺肌病，女儿患子宫腺肌病的风险会增加吗？ ">
          <el-radio v-model="infoForm.l029" label="1">会</el-radio>
          <el-radio v-model="infoForm.l029" label="2">不会</el-radio>
          <el-radio v-model="infoForm.l029" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="3、您认为子宫内膜异位症有转变成恶性肿瘤、癌症的可能吗？ ">
          <el-radio v-model="infoForm.l030" label="1">有</el-radio>
          <el-radio v-model="infoForm.l030" label="2">没有</el-radio>
          <el-radio v-model="infoForm.l030" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="4、您认为子宫腺肌病有转变成恶性肿瘤、癌症的可能吗？ ">
          <el-radio v-model="infoForm.l031" label="1">有</el-radio>
          <el-radio v-model="infoForm.l031" label="2">没有</el-radio>
          <el-radio v-model="infoForm.l031" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="5、您认为子宫内膜异位症属于一种慢性疾病吗？ ">
          <el-radio v-model="infoForm.l032" label="1">属于</el-radio>
          <el-radio v-model="infoForm.l032" label="2">不属于</el-radio>
          <el-radio v-model="infoForm.l032" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="6、您认为子宫腺肌病属于一种慢性疾病吗？ ">
          <el-radio v-model="infoForm.l033" label="1">属于</el-radio>
          <el-radio v-model="infoForm.l033" label="2">不属于</el-radio>
          <el-radio v-model="infoForm.l033" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="7、您认为子宫内膜异位症需要定期复查，进行长期管理吗? ">
          <el-radio v-model="infoForm.l034" label="1">需要</el-radio>
          <el-radio v-model="infoForm.l034" label="2">不需要</el-radio>
          <el-radio v-model="infoForm.l034" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="8、您认为子宫腺肌病需要定期复查，进行长期管理吗? ">
          <el-radio v-model="infoForm.l035" label="1">需要</el-radio>
          <el-radio v-model="infoForm.l035" label="2">不需要</el-radio>
          <el-radio v-model="infoForm.l035" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="9、您认为子宫内膜异位症会影响生育功能吗? ">
          <el-radio v-model="infoForm.l036" label="1">会</el-radio>
          <el-radio v-model="infoForm.l036" label="2">不会</el-radio>
          <el-radio v-model="infoForm.l036" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="10、您认为子宫腺肌病会影响生育功能吗? ">
          <el-radio v-model="infoForm.l037" label="1">会</el-radio>
          <el-radio v-model="infoForm.l037" label="2">不会</el-radio>
          <el-radio v-model="infoForm.l037" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="11、您认为子宫内膜异位症保守手术治疗后会复发吗? ">
          <el-radio v-model="infoForm.l038" label="1">会</el-radio>
          <el-radio v-model="infoForm.l038" label="2">不会</el-radio>
          <el-radio v-model="infoForm.l038" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="12、您认为子宫内膜异位症保守手术治疗后需要继续药物治疗吗? ">
          <el-radio v-model="infoForm.l039" label="1">需要</el-radio>
          <el-radio v-model="infoForm.l039" label="2">不需要</el-radio>
          <el-radio v-model="infoForm.l039" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="13、您认为卵巢子宫内膜异位囊肿患者手术治疗会影响卵巢功能吗? ">
          <el-radio v-model="infoForm.l040" label="1">有影响</el-radio>
          <el-radio v-model="infoForm.l040" label="2">没影响</el-radio>
          <el-radio v-model="infoForm.l040" label="3">不知道</el-radio>
        </el-form-item>

        <el-form-item label="14、您认为子宫内膜异位症患者不宜食用下列哪些食物或保健品? ">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l041[0]">豆制品</el-checkbox>
          <el-checkbox v-model="infoForm.l041[1]">蜂王浆</el-checkbox>
          <el-checkbox v-model="infoForm.l041[2]">冷饮、雪糕</el-checkbox>
          <el-checkbox v-model="infoForm.l041[3]">胎盘类制品</el-checkbox>
          <el-checkbox v-model="infoForm.l041[4]">雪蛤油</el-checkbox>
          <el-checkbox v-model="infoForm.l041[5]">阿胶</el-checkbox>
          <el-checkbox v-model="infoForm.l041[6]">成分不明的保健品</el-checkbox>
          <el-checkbox v-model="infoForm.l041[7]">不知道</el-checkbox>
        </el-form-item>

        <el-form-item label="15、您认为子宫内膜异位症患者在生活中需要注意以下哪些方面? ">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l042[0]">规律作息</el-checkbox>
          <el-checkbox v-model="infoForm.l042[1]">适当运动</el-checkbox>
          <el-checkbox v-model="infoForm.l042[2]">调整情绪，保持心态平和</el-checkbox>
          <el-checkbox v-model="infoForm.l042[3]">尽早生育</el-checkbox>
          <el-checkbox v-model="infoForm.l042[4]">忌食或少食生冷寒凉（水果、酸奶、凉菜、海鲜等）</el-checkbox>
          <el-checkbox v-model="infoForm.l042[5]">定期复查</el-checkbox>
          <el-checkbox v-model="infoForm.l042[6]">不知道</el-checkbox>
        </el-form-item>

        <el-form-item label="16、你都通过什么途径了解子宫内膜异位症或子宫腺肌病? ">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l043[0]">微信公众号、APP等新媒体</el-checkbox>
          <el-checkbox v-model="infoForm.l043[1]">搜索引擎、贴吧、知乎等门户网站</el-checkbox>
          <el-checkbox v-model="infoForm.l043[2]">科普书</el-checkbox>
          <el-checkbox v-model="infoForm.l043[3]">妇科教材、专业文献</el-checkbox>
          <el-checkbox v-model="infoForm.l043[4]">妇科医生的科普讲座</el-checkbox>
          <el-checkbox v-model="infoForm.l043[5]">广播、电视节目</el-checkbox>
          <el-checkbox v-model="infoForm.l043[6]">妇科专业医生面对面交流</el-checkbox>
          <el-checkbox v-model="infoForm.l043[7]">病友交流</el-checkbox>
        </el-form-item>

        <el-form-item label="17、您倾向于去什么级别的医疗保健机构治疗此病? ">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l044[0]">综合性大医院</el-checkbox>
          <el-checkbox v-model="infoForm.l044[1]">妇幼保健院等专科医院</el-checkbox>
          <el-checkbox v-model="infoForm.l044[2]">中医院</el-checkbox>
          <el-checkbox v-model="infoForm.l044[3]">社区医院</el-checkbox>
          <el-checkbox v-model="infoForm.l044[4]">民营医院</el-checkbox>
          <el-checkbox v-model="infoForm.l044[5]">个体诊所</el-checkbox>
        </el-form-item>

        <el-form-item label="18、你倾向于接受以下哪些治疗? ">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l045[0]">中医药治疗</el-checkbox>
          <el-checkbox v-model="infoForm.l045[1]">西药治疗</el-checkbox>
          <el-checkbox v-model="infoForm.l045[2]">手术治疗</el-checkbox>
          <el-checkbox v-model="infoForm.l045[3]">定期检查</el-checkbox>
          <el-checkbox v-model="infoForm.l045[4]">不治疗</el-checkbox>
        </el-form-item>

        <el-form-item label="19、若您愿意使用中医药治疗，您倾向于使用以下哪些治疗方式? ">
          <el-tag type="danger" size="mini">多选</el-tag>
          <el-checkbox v-model="infoForm.l046[0]">中药汤剂</el-checkbox>
          <el-checkbox v-model="infoForm.l046[1]">中成药</el-checkbox>
          <el-checkbox v-model="infoForm.l046[2]">针刺</el-checkbox>
          <el-checkbox v-model="infoForm.l046[3]">艾灸</el-checkbox>
          <el-checkbox v-model="infoForm.l046[4]">灌肠</el-checkbox>
          <el-checkbox v-model="infoForm.l046[5]">中药外敷</el-checkbox>
          <el-checkbox v-model="infoForm.l046[6]">阴道上药</el-checkbox>
          <el-checkbox v-model="infoForm.l046[7]">其他</el-checkbox>
          <el-input v-model="infoForm.l046a"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer">
      <el-button
        type="primary"
        :disabled="check_status=='审核通过'"
        v-if="exist"
        @click="updateSummaryForm"
      >确定</el-button>
      <el-button type="primary" v-else @click="createSummaryForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiGetHideCode } from "@/api/api-prj006";
export default {
  name: "SummaryForm",
  data() {
    return {
      infoForm: {
        l001: "",
        l002: "",
        l003: "",
        l004: "",
        l005: "",
        l006: "",
        l007: "",
        l008: "",
        l009: "",
        l010: [false, false, false, false, false, false, false, false],
        l011: [false, false, false, false, false, false, false],
        l012: [false, false, false, false, false, false, false, false],
        l013: [false, false, false, false, false, false],
        l014: [false, false, false, false, false],
        l015: [false, false, false, false, false, false, false, false],
        l015a: "",
        l016: "",
        l017: "",
        l018: "",
        l019: "",
        l020: "",
        l021: "",
        l022: [false, false, false, false, false, false, false, false],
        l023: [false, false, false, false, false, false, false],
        l024: [false, false, false, false, false, false, false, false],
        l025: [false, false, false, false, false, false],
        l026: [false, false, false, false, false],
        l027: [false, false, false, false, false, false, false, false],
        l027a: "",
        l028: "",
        l029: "",
        l030: "",
        l031: "",
        l032: "",
        l033: "",
        l034: "",
        l035: "",
        l036: "",
        l037: "",
        l038: "",
        l039: "",
        l040: "",
        l041: [false, false, false, false, false, false, false, false],
        l042: [false, false, false, false, false, false, false],
        l043: [false, false, false, false, false, false, false, false],
        l044: [false, false, false, false, false, false],
        l045: [false, false, false, false, false],
        l046: [false, false, false, false, false, false, false, false],
        l046a: "",
      },
      dialogVisible: false,
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: "",
      hideOrShow: {
        l001_l015: "0",
        l016_l027: "0",
        l028_l046: "0",
      },
    };
  },
  created() {
    this.$on("openEvent", (data) => {
      console.log("认知及治疗意愿调查:", data);
      this.dialogVisible = true;
      this.check_status = data.check_status;
      this.isOwnedByUser = data.isOwnedByUser;
      this.formName = data.formName;
      this._id = data._id;

      if ("id" in data.result) {
        this.infoForm = this.parseInfoForm(data.result);
      }

      this.getHideCode(data.formName, data._id);
    });
  },
  methods: {
    getHideCode(name, id) {
      let params = {
        formName: name,
        _id: id,
      };

      apiGetHideCode(params)
        .then((res) => {
          // console.log(res.data);
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

