<template>
  <el-dialog
    title="既往治疗情况"
    class="my-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="100%"
    center
  >
    <el-form ref="infoForm" :model="infoForm" label-width="250px" label-position="left">
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
      <p></p>

      <div v-show="hideOrShow.i001_i022 === '1' ? true : false">
        <!-- <h4>若为內异症：</h4> -->
        <el-form-item label="1、是否做过内异症手术？">
          <el-radio-group v-model="infoForm.i001" @change="getCureHistoryHideCodeOne">
            <el-radio v-model="infoForm.i001" label="1">是</el-radio>
            <el-radio v-model="infoForm.i001" label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testOne.i002_i018 === '1' ? true : false">
          <el-form-item label="2、做过_______次手术">
            <el-input-number v-model="infoForm.i002" :min="0" :max="10"></el-input-number>
          </el-form-item>

          <el-form-item label="3、手术的原因">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i003[0]">包块过大</el-checkbox>
            <el-checkbox v-model="infoForm.i003[1]">包块增长过快</el-checkbox>
            <el-checkbox v-model="infoForm.i003[2]">包块破裂</el-checkbox>
            <el-checkbox v-model="infoForm.i003[3]">不孕</el-checkbox>
            <el-checkbox v-model="infoForm.i003[4]">痛经</el-checkbox>
            <el-checkbox v-model="infoForm.i003[5]">慢性盆腔痛</el-checkbox>
            <el-checkbox v-model="infoForm.i003[6]">性交痛</el-checkbox>
            <el-checkbox v-model="infoForm.i003[7]">肿瘤标志物数值过高</el-checkbox>
            <el-checkbox v-model="infoForm.i003[8]">侵犯肠管、输尿管等器官造成梗阻或功能障碍</el-checkbox>
            <el-checkbox v-model="infoForm.i003[10]">其他</el-checkbox>
            <el-input v-model="infoForm.i003a"></el-input>
          </el-form-item>

          <el-form-item label="4、手术方式">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i004[0]">开腹</el-checkbox>
            <el-checkbox v-model="infoForm.i004[1]">腹腔镜</el-checkbox>
            <el-checkbox v-model="infoForm.i004[2]">宫腹腔镜联合手术</el-checkbox>
            <el-checkbox v-model="infoForm.i004[3]">B超引导下巧囊穿刺</el-checkbox>
          </el-form-item>

          <el-form-item label="5、手术名称为">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i005[0]">巧囊剥除术</el-checkbox>
            <el-checkbox v-model="infoForm.i005[1]">巧囊穿刺术</el-checkbox>
            <el-checkbox v-model="infoForm.i005[2]">单侧附件切除术</el-checkbox>
            <el-checkbox v-model="infoForm.i005[3]">双侧附件切除术</el-checkbox>
            <el-checkbox v-model="infoForm.i005[4]">全子宫切除术</el-checkbox>
            <el-checkbox v-model="infoForm.i005[5]">盆腔病灶切除术\电凝术</el-checkbox>
            <el-checkbox v-model="infoForm.i005[6]">神经阻断手术</el-checkbox>
            <el-checkbox v-model="infoForm.i005[7]">盆腔粘连松解术</el-checkbox>
            <el-checkbox v-model="infoForm.i005[8]">其他</el-checkbox>
            <el-input v-model="infoForm.i005a"></el-input>
          </el-form-item>

          <el-form-item label="6、术前曾使用过哪些治疗手段">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i006[0]" @change="getCureHistoryHideCodeTwo">未治疗</el-checkbox>
            <el-checkbox v-model="infoForm.i006[1]" @change="getCureHistoryHideCodeTwo">西药</el-checkbox>
            <el-checkbox v-model="infoForm.i006[2]" @change="getCureHistoryHideCodeTwo">中药汤剂</el-checkbox>
            <el-checkbox v-model="infoForm.i006[3]" @change="getCureHistoryHideCodeTwo">中成药</el-checkbox>
            <el-checkbox v-model="infoForm.i006[4]" @change="getCureHistoryHideCodeTwo">中医外治</el-checkbox>
            <el-checkbox v-model="infoForm.i006[5]" @change="getCureHistoryHideCodeTwo">其他</el-checkbox>
            <el-input v-model="infoForm.i006a"></el-input>
          </el-form-item>

          <div v-show="testTwo.i007 === '1' ? true : false">
            <el-form-item label="7、术前曾使用过哪些西药？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i007[0]">亮丙瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i007[1]">戈舍瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i007[2]">曲普瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i007[3]">抑那通</el-checkbox>
              <el-checkbox v-model="infoForm.i007[4]">曼月乐环</el-checkbox>
              <el-checkbox v-model="infoForm.i007[5]">地诺孕素</el-checkbox>
              <el-checkbox v-model="infoForm.i007[6]">妈富隆</el-checkbox>
              <el-checkbox v-model="infoForm.i007[7]">优思明</el-checkbox>
              <el-checkbox v-model="infoForm.i007[8]">优思悦</el-checkbox>
              <el-checkbox v-model="infoForm.i007[9]">达英-35</el-checkbox>
              <el-checkbox v-model="infoForm.i007[10]">米非司酮</el-checkbox>
              <el-checkbox v-model="infoForm.i007[11]">达那唑</el-checkbox>
              <el-checkbox v-model="infoForm.i007[12]">孕三烯酮</el-checkbox>
              <el-checkbox v-model="infoForm.i007[13]">醋酸甲羟孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i007[14]">醋酸甲地孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i007[15]">其他</el-checkbox>
              <el-input v-model="infoForm.i007a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testTwo.i008 === '1' ? true : false">
            <el-form-item label="8、术前使用过哪些中成药治疗？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i008[0]">丹莪妇康煎膏</el-checkbox>
              <el-checkbox v-model="infoForm.i008[1]">桂枝茯苓胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i008[2]">散结镇痛胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i008[3]">其他</el-checkbox>
              <el-input v-model="infoForm.i008a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testTwo.i009 === '1' ? true : false">
            <el-form-item label="9、术前使用过哪些中医外治治疗？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i009[0]">中药灌肠</el-checkbox>
              <el-checkbox v-model="infoForm.i009[1]">中药阴道上药</el-checkbox>
              <el-checkbox v-model="infoForm.i009[2]">针刺</el-checkbox>
              <el-checkbox v-model="infoForm.i009[3]">艾灸</el-checkbox>
              <el-checkbox v-model="infoForm.i009[4]">中药外敷</el-checkbox>
              <el-checkbox v-model="infoForm.i009[5]">其他</el-checkbox>
              <el-input v-model="infoForm.i009a"></el-input>
            </el-form-item>
          </div>

          <el-form-item label="10、术后曾使用过哪些治疗手段？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i010[0]" @change="getCureHistoryHideCodeThree">未治疗</el-checkbox>
            <el-checkbox v-model="infoForm.i010[1]" @change="getCureHistoryHideCodeThree">西药</el-checkbox>
            <el-checkbox v-model="infoForm.i010[2]" @change="getCureHistoryHideCodeThree">中药汤剂</el-checkbox>
            <el-checkbox v-model="infoForm.i010[3]" @change="getCureHistoryHideCodeThree">中成药</el-checkbox>
            <el-checkbox v-model="infoForm.i010[4]" @change="getCureHistoryHideCodeThree">中医外治</el-checkbox>
            <el-checkbox v-model="infoForm.i010[5]" @change="getCureHistoryHideCodeThree">其他</el-checkbox>
            <el-input v-model="infoForm.i010a"></el-input>
          </el-form-item>

          <div v-show="testEight.i011 === '1' ? true : false">
            <el-form-item label="11、术后曾使用过哪些西药？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i011[0]">亮丙瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i011[1]">戈舍瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i011[2]">曲普瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i011[3]">抑那通</el-checkbox>
              <el-checkbox v-model="infoForm.i011[4]">曼月乐环</el-checkbox>
              <el-checkbox v-model="infoForm.i011[5]">地诺孕素</el-checkbox>
              <el-checkbox v-model="infoForm.i011[6]">妈富隆</el-checkbox>
              <el-checkbox v-model="infoForm.i011[7]">优思明</el-checkbox>
              <el-checkbox v-model="infoForm.i011[8]">优思悦</el-checkbox>
              <el-checkbox v-model="infoForm.i011[9]">达英-35</el-checkbox>
              <el-checkbox v-model="infoForm.i011[10]">米非司酮</el-checkbox>
              <el-checkbox v-model="infoForm.i011[11]">达那唑</el-checkbox>
              <el-checkbox v-model="infoForm.i011[12]">孕三烯酮</el-checkbox>
              <el-checkbox v-model="infoForm.i011[13]">醋酸甲羟孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i011[14]">醋酸甲地孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i011[15]">其他</el-checkbox>
              <el-input v-model="infoForm.i011a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testEight.i012 === '1' ? true : false">
            <el-form-item label="12、术后使用过哪些中成药治疗？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i012[0]">丹莪妇康煎膏</el-checkbox>
              <el-checkbox v-model="infoForm.i012[1]">桂枝茯苓胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i012[2]">散结镇痛胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i012[3]">其他</el-checkbox>
              <el-input v-model="infoForm.i012a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testEight.i013 === '1' ? true : false">
            <el-form-item label="13、术后使用过哪些中医外治治疗">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i013[0]">中药灌肠</el-checkbox>
              <el-checkbox v-model="infoForm.i013[1]">中药阴道上药</el-checkbox>
              <el-checkbox v-model="infoForm.i013[2]">针刺</el-checkbox>
              <el-checkbox v-model="infoForm.i013[3]">艾灸</el-checkbox>
              <el-checkbox v-model="infoForm.i013[4]">中药外敷</el-checkbox>
              <el-checkbox v-model="infoForm.i013[5]">其他</el-checkbox>
              <el-input v-model="infoForm.i013a"></el-input>
            </el-form-item>
          </div>

          <el-form-item label="14、术后是否复发？">
            <el-radio-group v-model="infoForm.i014" @change="getCureHistoryHideCodeFour">
              <el-radio v-model="infoForm.i014" label="1">是</el-radio>
              <el-radio v-model="infoForm.i014" label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <div v-show="testThree.i015_i018 === '1' ? true : false">
            <el-form-item label="15、复发后治疗方式">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i015[0]" @change="getCureHistoryHideCodeFive">未治疗</el-checkbox>
              <el-checkbox v-model="infoForm.i015[1]" @change="getCureHistoryHideCodeFive">西药</el-checkbox>
              <el-checkbox v-model="infoForm.i015[2]" @change="getCureHistoryHideCodeFive">巧囊剥除手术</el-checkbox>
              <el-checkbox
                v-model="infoForm.i015[3]"
                @change="getCureHistoryHideCodeFive"
              >子宫及双附件切除手术</el-checkbox>
              <el-checkbox v-model="infoForm.i015[4]" @change="getCureHistoryHideCodeFive">巧囊穿刺术</el-checkbox>
              <el-checkbox v-model="infoForm.i015[5]" @change="getCureHistoryHideCodeFive">中药汤剂</el-checkbox>
              <el-checkbox v-model="infoForm.i015[6]" @change="getCureHistoryHideCodeFive">中成药</el-checkbox>
              <el-checkbox v-model="infoForm.i015[7]" @change="getCureHistoryHideCodeFive">中医外治</el-checkbox>
              <el-checkbox v-model="infoForm.i015[8]" @change="getCureHistoryHideCodeFive">其他</el-checkbox>
              <el-input v-model="infoForm.i015a"></el-input>
            </el-form-item>

            <div v-show="testNine.i016 === '1' ? true : false">
              <el-form-item label="16、复发后使用过哪些西药">
                <el-tag type="danger" size="mini">多选</el-tag>
                <el-checkbox v-model="infoForm.i016[0]">亮丙瑞林</el-checkbox>
                <el-checkbox v-model="infoForm.i016[1]">戈舍瑞林</el-checkbox>
                <el-checkbox v-model="infoForm.i016[2]">曲普瑞林</el-checkbox>
                <el-checkbox v-model="infoForm.i016[3]">抑那通</el-checkbox>
                <el-checkbox v-model="infoForm.i016[4]">曼月乐环</el-checkbox>
                <el-checkbox v-model="infoForm.i016[5]">地诺孕素</el-checkbox>
                <el-checkbox v-model="infoForm.i016[6]">妈富隆</el-checkbox>
                <el-checkbox v-model="infoForm.i016[7]">优思明</el-checkbox>
                <el-checkbox v-model="infoForm.i016[8]">优思悦</el-checkbox>
                <el-checkbox v-model="infoForm.i016[9]">达英-35</el-checkbox>
                <el-checkbox v-model="infoForm.i016[10]">米非司酮</el-checkbox>
                <el-checkbox v-model="infoForm.i016[11]">达那唑</el-checkbox>
                <el-checkbox v-model="infoForm.i016[12]">孕三烯酮</el-checkbox>
                <el-checkbox v-model="infoForm.i016[13]">醋酸甲羟孕酮</el-checkbox>
                <el-checkbox v-model="infoForm.i016[14]">醋酸甲地孕酮</el-checkbox>
                <el-checkbox v-model="infoForm.i016[15]">其他</el-checkbox>
                <el-input v-model="infoForm.i016a"></el-input>
              </el-form-item>
            </div>

            <div v-show="testNine.i017 === '1' ? true : false">
              <el-form-item label="17、复发后使用过哪些中成药治疗">
                <el-tag type="danger" size="mini">多选</el-tag>
                <el-checkbox v-model="infoForm.i017[0]">丹莪妇康煎膏</el-checkbox>
                <el-checkbox v-model="infoForm.i017[1]">桂枝茯苓胶囊</el-checkbox>
                <el-checkbox v-model="infoForm.i017[2]">散结镇痛胶囊</el-checkbox>
                <el-checkbox v-model="infoForm.i017[3]">其他</el-checkbox>
                <el-input v-model="infoForm.i017a"></el-input>
              </el-form-item>
            </div>

            <div v-show="testNine.i018 === '1' ? true : false">
              <el-form-item label="18、复发后使用过哪些中医外治治疗">
                <el-tag type="danger" size="mini">多选</el-tag>
                <el-checkbox v-model="infoForm.i018[0]">中药灌肠</el-checkbox>
                <el-checkbox v-model="infoForm.i018[1]">中药阴道上药</el-checkbox>
                <el-checkbox v-model="infoForm.i018[2]">针刺</el-checkbox>
                <el-checkbox v-model="infoForm.i018[3]">艾灸</el-checkbox>
                <el-checkbox v-model="infoForm.i018[4]">中药外敷</el-checkbox>
                <el-checkbox v-model="infoForm.i018[5]">其他</el-checkbox>
                <el-input v-model="infoForm.i018a"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div v-show="testOne.i019_end === '1' ? true : false">
          <el-form-item label="19、曾使用过哪些治疗方式？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i019[0]" @change="getCureHistoryHideCodeSix">未治疗</el-checkbox>
            <el-checkbox v-model="infoForm.i019[1]" @change="getCureHistoryHideCodeSix">西药</el-checkbox>
            <el-checkbox v-model="infoForm.i019[2]" @change="getCureHistoryHideCodeSix">中药汤剂</el-checkbox>
            <el-checkbox v-model="infoForm.i019[3]" @change="getCureHistoryHideCodeSix">中成药</el-checkbox>
            <el-checkbox v-model="infoForm.i019[4]" @change="getCureHistoryHideCodeSix">中医外治</el-checkbox>
            <el-checkbox v-model="infoForm.i019[5]" @change="getCureHistoryHideCodeSix">其他</el-checkbox>
            <el-input v-model="infoForm.i019a"></el-input>
          </el-form-item>

          <div v-show="testTen.i020 === '1' ? true : false">
            <el-form-item label="20、曾使用过哪些西药">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i020[0]">亮丙瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i020[1]">戈舍瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i020[2]">曲普瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i020[3]">抑那通</el-checkbox>
              <el-checkbox v-model="infoForm.i020[4]">戴曼月乐环</el-checkbox>
              <el-checkbox v-model="infoForm.i020[5]">地诺孕素</el-checkbox>
              <el-checkbox v-model="infoForm.i020[6]">妈富隆</el-checkbox>
              <el-checkbox v-model="infoForm.i020[7]">优思明</el-checkbox>
              <el-checkbox v-model="infoForm.i020[8]">优思悦</el-checkbox>
              <el-checkbox v-model="infoForm.i020[9]">达英-35</el-checkbox>
              <el-checkbox v-model="infoForm.i020[10]">米非司酮</el-checkbox>
              <el-checkbox v-model="infoForm.i020[11]">达那唑</el-checkbox>
              <el-checkbox v-model="infoForm.i020[12]">孕三烯酮</el-checkbox>
              <el-checkbox v-model="infoForm.i020[13]">醋酸甲羟孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i020[14]">醋酸甲地孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i020[15]">其他</el-checkbox>
              <el-input v-model="infoForm.i020a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testTen.i021 === '1' ? true : false">
            <el-form-item label="21、曾使用过哪些中成药治疗？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i021[0]">丹莪妇康煎膏</el-checkbox>
              <el-checkbox v-model="infoForm.i021[1]">桂枝茯苓胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i021[2]">散结镇痛胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i021[3]">其他</el-checkbox>
              <el-input v-model="infoForm.i021a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testTen.i022 === '1' ? true : false">
            <el-form-item label="22、曾使用过哪些中医外治治疗？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i022[0]">中药灌肠</el-checkbox>
              <el-checkbox v-model="infoForm.i022[1]">中药阴道上药</el-checkbox>
              <el-checkbox v-model="infoForm.i022[2]">针刺</el-checkbox>
              <el-checkbox v-model="infoForm.i022[3]">艾灸</el-checkbox>
              <el-checkbox v-model="infoForm.i022[4]">中药外敷</el-checkbox>
              <el-checkbox v-model="infoForm.i022[5]">其他</el-checkbox>
              <el-input v-model="infoForm.i022a"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>

      <div v-show="hideOrShow.i023_i043 === '1' ? true : false">
        <!-- <h4>若为腺肌病：</h4> -->
        <el-form-item label="1、是否做过腺肌病手术？">
          <el-radio-group v-model="infoForm.i023" @change="getCureHistoryHideCodeSeven">
            <el-radio v-model="infoForm.i023" label="1">是</el-radio>
            <el-radio v-model="infoForm.i023" label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testFour.i024_i039 === '1' ? true : false">
          <el-form-item label="2、做过_______次手术">
            <el-input-number v-model="infoForm.i024" :min="0" :max="10"></el-input-number>
          </el-form-item>

          <el-form-item label="3、手术的原因">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i025[0]">子宫体积过大</el-checkbox>
            <el-checkbox v-model="infoForm.i025[1]">月经量过多</el-checkbox>
            <el-checkbox v-model="infoForm.i025[2]">不孕</el-checkbox>
            <el-checkbox v-model="infoForm.i025[3]">贫血</el-checkbox>
            <el-checkbox v-model="infoForm.i025[4]">痛经</el-checkbox>
            <el-checkbox v-model="infoForm.i025[5]">慢性盆腔痛</el-checkbox>
            <el-checkbox v-model="infoForm.i025[6]">性交痛</el-checkbox>
            <el-checkbox v-model="infoForm.i025[7]">肿瘤标志物数值过高</el-checkbox>
            <el-checkbox v-model="infoForm.i025[8]">其他</el-checkbox>
            <el-input v-model="infoForm.i025a"></el-input>
          </el-form-item>

          <el-form-item label="4、手术名称为：">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i026[0]">腺肌瘤切除术</el-checkbox>
            <el-checkbox v-model="infoForm.i026[1]">子宫楔形切除术</el-checkbox>
            <el-checkbox v-model="infoForm.i026[2]">内膜切除术</el-checkbox>
            <el-checkbox v-model="infoForm.i026[3]">子宫动脉栓塞术</el-checkbox>
            <el-checkbox v-model="infoForm.i026[4]">高强度聚焦超声（HIFU）</el-checkbox>
            <el-checkbox v-model="infoForm.i026[5]">射频消融术</el-checkbox>
            <el-checkbox v-model="infoForm.i026[6]">微波消融术</el-checkbox>
            <el-checkbox v-model="infoForm.i026[7]">诊刮术</el-checkbox>
            <el-checkbox v-model="infoForm.i026[8]">全子宫切除术</el-checkbox>
            <el-checkbox v-model="infoForm.i026[9]">神经阻断手术</el-checkbox>
            <el-checkbox v-model="infoForm.i026[10]">其他</el-checkbox>
            <el-input v-model="infoForm.i026a"></el-input>
          </el-form-item>

          <el-form-item label="5、术前曾使用过哪些治疗手段：">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i027[0]" @change="getCureHistoryHideCodeEight">未治疗</el-checkbox>
            <el-checkbox v-model="infoForm.i027[1]" @change="getCureHistoryHideCodeEight">西药</el-checkbox>
            <el-checkbox v-model="infoForm.i027[2]" @change="getCureHistoryHideCodeEight">中药汤剂</el-checkbox>
            <el-checkbox v-model="infoForm.i027[3]" @change="getCureHistoryHideCodeEight">中成药</el-checkbox>
            <el-checkbox v-model="infoForm.i027[4]" @change="getCureHistoryHideCodeEight">中医外治</el-checkbox>
            <el-checkbox v-model="infoForm.i027[5]" @change="getCureHistoryHideCodeEight">其他</el-checkbox>
            <el-input v-model="infoForm.i027a"></el-input>
          </el-form-item>

          <div v-show="testEleven.i028 === '1' ? true : false">
            <el-form-item label="6、术前曾使用过哪些西药？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i028[0]">亮丙瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i028[1]">戈舍瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i028[2]">曲普瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i028[3]">抑那通</el-checkbox>
              <el-checkbox v-model="infoForm.i028[4]">曼月乐环</el-checkbox>
              <el-checkbox v-model="infoForm.i028[5]">地诺孕素</el-checkbox>
              <el-checkbox v-model="infoForm.i028[6]">妈富隆</el-checkbox>
              <el-checkbox v-model="infoForm.i028[7]">优思明</el-checkbox>
              <el-checkbox v-model="infoForm.i028[8]">优思悦</el-checkbox>
              <el-checkbox v-model="infoForm.i028[9]">达英-35</el-checkbox>
              <el-checkbox v-model="infoForm.i028[10]">米非司酮</el-checkbox>
              <el-checkbox v-model="infoForm.i028[11]">达那唑</el-checkbox>
              <el-checkbox v-model="infoForm.i028[12]">孕三烯酮</el-checkbox>
              <el-checkbox v-model="infoForm.i028[13]">醋酸甲羟孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i028[14]">醋酸甲地孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i028[15]">其他</el-checkbox>
              <el-input v-model="infoForm.i028a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testEleven.i029 === '1' ? true : false">
            <el-form-item label="7、术前使用过哪些中成药治疗？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i029[0]">丹莪妇康煎膏</el-checkbox>
              <el-checkbox v-model="infoForm.i029[1]">桂枝茯苓胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i029[2]">散结镇痛胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i029[3]">其他</el-checkbox>
              <el-input v-model="infoForm.i029a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testEleven.i030 === '1' ? true : false">
            <el-form-item label="8、术前使用过哪些中医外治治疗？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i030[0]">中药灌肠</el-checkbox>
              <el-checkbox v-model="infoForm.i030[1]">中药阴道上药</el-checkbox>
              <el-checkbox v-model="infoForm.i030[2]">针刺</el-checkbox>
              <el-checkbox v-model="infoForm.i030[3]">艾灸</el-checkbox>
              <el-checkbox v-model="infoForm.i030[4]">中药外敷</el-checkbox>
              <el-checkbox v-model="infoForm.i030[5]">其他</el-checkbox>
              <el-input v-model="infoForm.i030a"></el-input>
            </el-form-item>
          </div>

          <el-form-item label="9、术后曾使用过哪些治疗手段？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i031[0]" @change="getCureHistoryHideCodeNine">未治疗</el-checkbox>
            <el-checkbox v-model="infoForm.i031[1]" @change="getCureHistoryHideCodeNine">西药</el-checkbox>
            <el-checkbox v-model="infoForm.i031[2]" @change="getCureHistoryHideCodeNine">中药汤剂</el-checkbox>
            <el-checkbox v-model="infoForm.i031[3]" @change="getCureHistoryHideCodeNine">中成药</el-checkbox>
            <el-checkbox v-model="infoForm.i031[4]" @change="getCureHistoryHideCodeNine">中医外治</el-checkbox>
            <el-checkbox v-model="infoForm.i031[5]" @change="getCureHistoryHideCodeNine">其他</el-checkbox>
            <el-input v-model="infoForm.i031a"></el-input>
          </el-form-item>

          <div v-show="testTwelve.i032 === '1' ? true : false">
            <el-form-item label="10、术后曾使用过哪些西药？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i032[0]">亮丙瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i032[1]">戈舍瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i032[2]">曲普瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i032[3]">抑那通</el-checkbox>
              <el-checkbox v-model="infoForm.i032[4]">曼月乐环</el-checkbox>
              <el-checkbox v-model="infoForm.i032[5]">地诺孕素</el-checkbox>
              <el-checkbox v-model="infoForm.i032[6]">妈富隆</el-checkbox>
              <el-checkbox v-model="infoForm.i032[7]">优思明</el-checkbox>
              <el-checkbox v-model="infoForm.i032[8]">优思悦</el-checkbox>
              <el-checkbox v-model="infoForm.i032[9]">达英-35</el-checkbox>
              <el-checkbox v-model="infoForm.i032[10]">米非司酮</el-checkbox>
              <el-checkbox v-model="infoForm.i032[11]">达那唑</el-checkbox>
              <el-checkbox v-model="infoForm.i032[12]">孕三烯酮</el-checkbox>
              <el-checkbox v-model="infoForm.i032[13]">醋酸甲羟孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i032[14]">醋酸甲地孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i032[15]">其他</el-checkbox>
              <el-input v-model="infoForm.i032a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testTwelve.i033 === '1' ? true : false">
            <el-form-item label="11、术后使用过哪些中成药治疗？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i033[0]">丹莪妇康煎膏</el-checkbox>
              <el-checkbox v-model="infoForm.i033[1]">桂枝茯苓胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i033[2]">散结镇痛胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i033[3]">其他</el-checkbox>
              <el-input v-model="infoForm.i033a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testTwelve.i034 === '1' ? true : false">
            <el-form-item label="12、术后使用过哪些中医外治治疗？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i034[0]">中药灌肠</el-checkbox>
              <el-checkbox v-model="infoForm.i034[1]">中药阴道上药</el-checkbox>
              <el-checkbox v-model="infoForm.i034[2]">针刺</el-checkbox>
              <el-checkbox v-model="infoForm.i034[3]">艾灸</el-checkbox>
              <el-checkbox v-model="infoForm.i034[4]">中药外敷</el-checkbox>
              <el-checkbox v-model="infoForm.i034[5]">其他</el-checkbox>
              <el-input v-model="infoForm.i034a"></el-input>
            </el-form-item>
          </div>

          <el-form-item label="13、术后是否复发？">
            <el-radio-group v-model="infoForm.i035" @change="getCureHistoryHideCodeTen">
              <el-radio v-model="infoForm.i035" label="1">是</el-radio>
              <el-radio v-model="infoForm.i035" label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <div v-show="testFive.i036_i039 === '1' ? true : false">
            <el-form-item label="14、复发后治疗方式？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i036[0]" @change="getCureHistoryHideCodeEleven">未治疗</el-checkbox>
              <el-checkbox v-model="infoForm.i036[1]" @change="getCureHistoryHideCodeEleven">西药</el-checkbox>
              <el-checkbox v-model="infoForm.i036[2]" @change="getCureHistoryHideCodeEleven">再次手术</el-checkbox>
              <el-checkbox v-model="infoForm.i036[3]" @change="getCureHistoryHideCodeEleven">中药汤剂</el-checkbox>
              <el-checkbox v-model="infoForm.i036[4]" @change="getCureHistoryHideCodeEleven">中成药</el-checkbox>
              <el-checkbox v-model="infoForm.i036[5]" @change="getCureHistoryHideCodeEleven">中医外治</el-checkbox>
              <el-checkbox v-model="infoForm.i036[6]" @change="getCureHistoryHideCodeEleven">其他</el-checkbox>
              <el-input v-model="infoForm.i036a"></el-input>
            </el-form-item>

            <div v-show="testThirteen.i037 === '1' ? true : false">
              <el-form-item label="15、复发后使用过哪些西药 ？">
                <el-tag type="danger" size="mini">多选</el-tag>
                <el-checkbox v-model="infoForm.i037[0]">亮丙瑞林</el-checkbox>
                <el-checkbox v-model="infoForm.i037[1]">戈舍瑞林</el-checkbox>
                <el-checkbox v-model="infoForm.i037[2]">曲普瑞林</el-checkbox>
                <el-checkbox v-model="infoForm.i037[3]">抑那通</el-checkbox>
                <el-checkbox v-model="infoForm.i037[4]">曼月乐环</el-checkbox>
                <el-checkbox v-model="infoForm.i037[5]">地诺孕素</el-checkbox>
                <el-checkbox v-model="infoForm.i037[6]">妈富隆</el-checkbox>
                <el-checkbox v-model="infoForm.i037[7]">优思明</el-checkbox>
                <el-checkbox v-model="infoForm.i037[8]">优思悦</el-checkbox>
                <el-checkbox v-model="infoForm.i037[9]">达英-35</el-checkbox>
                <el-checkbox v-model="infoForm.i037[10]">米非司酮</el-checkbox>
                <el-checkbox v-model="infoForm.i037[11]">达那唑</el-checkbox>
                <el-checkbox v-model="infoForm.i037[12]">孕三烯酮</el-checkbox>
                <el-checkbox v-model="infoForm.i037[13]">醋酸甲羟孕酮</el-checkbox>
                <el-checkbox v-model="infoForm.i037[14]">醋酸甲地孕酮</el-checkbox>
                <el-checkbox v-model="infoForm.i037[15]">其他</el-checkbox>
                <el-input v-model="infoForm.i037a"></el-input>
              </el-form-item>
            </div>

            <div v-show="testThirteen.i0371 === '1' ? true : false">
              <el-form-item label="16、再次手术名称为">
                <el-tag type="danger" size="mini">多选</el-tag>
                <el-checkbox v-model="infoForm.i0371[0]">腺肌瘤切除术</el-checkbox>
                <el-checkbox v-model="infoForm.i0371[1]">子宫楔形切除术</el-checkbox>
                <el-checkbox v-model="infoForm.i0371[2]">内膜切除术</el-checkbox>
                <el-checkbox v-model="infoForm.i0371[3]">子宫动脉栓塞术</el-checkbox>
                <el-checkbox v-model="infoForm.i0371[4]">高强度聚焦超声（HIFU）</el-checkbox>
                <el-checkbox v-model="infoForm.i0371[5]">射频消融术</el-checkbox>
                <el-checkbox v-model="infoForm.i0371[6]">微波消融术</el-checkbox>
                <el-checkbox v-model="infoForm.i0371[7]">诊刮术</el-checkbox>
                <el-checkbox v-model="infoForm.i0371[8]">全子宫切除术</el-checkbox>
                <el-checkbox v-model="infoForm.i0371[9]">神经阻断手术</el-checkbox>
                <el-checkbox v-model="infoForm.i0371[10]">其他</el-checkbox>
                <el-input v-model="infoForm.i0371a"></el-input>
              </el-form-item>
            </div>

            <div v-show="testThirteen.i038 === '1' ? true : false">
              <el-form-item label="17、复发后使用过哪些中成药治疗？">
                <el-tag type="danger" size="mini">多选</el-tag>
                <el-checkbox v-model="infoForm.i038[0]">丹莪妇康煎膏</el-checkbox>
                <el-checkbox v-model="infoForm.i038[1]">桂枝茯苓胶囊</el-checkbox>
                <el-checkbox v-model="infoForm.i038[2]">散结镇痛胶囊</el-checkbox>
                <el-checkbox v-model="infoForm.i038[3]">其他</el-checkbox>
                <el-input v-model="infoForm.i038a"></el-input>
              </el-form-item>
            </div>

            <div v-show="testThirteen.i039 === '1' ? true : false">
              <el-form-item label="18、复发后使用过哪些中医外治治疗？">
                <el-tag type="danger" size="mini">多选</el-tag>
                <el-checkbox v-model="infoForm.i039[0]">中药灌肠</el-checkbox>
                <el-checkbox v-model="infoForm.i039[1]">中药阴道上药</el-checkbox>
                <el-checkbox v-model="infoForm.i039[2]">针刺</el-checkbox>
                <el-checkbox v-model="infoForm.i039[3]">艾灸</el-checkbox>
                <el-checkbox v-model="infoForm.i039[4]">中药外敷</el-checkbox>
                <el-checkbox v-model="infoForm.i039[5]">其他</el-checkbox>
                <el-input v-model="infoForm.i039a"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>

        <div v-show="testFour.i040_end === '1' ? true : false">
          <el-form-item label="19、曾使用过哪些治疗方式？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i040[0]" @change="getCureHistoryHideCodeTwelve">未治疗</el-checkbox>
            <el-checkbox v-model="infoForm.i040[1]" @change="getCureHistoryHideCodeTwelve">西药</el-checkbox>
            <el-checkbox v-model="infoForm.i040[2]" @change="getCureHistoryHideCodeTwelve">中药汤剂</el-checkbox>
            <el-checkbox v-model="infoForm.i040[3]" @change="getCureHistoryHideCodeTwelve">中成药</el-checkbox>
            <el-checkbox v-model="infoForm.i040[4]" @change="getCureHistoryHideCodeTwelve">中医外治</el-checkbox>
            <el-checkbox v-model="infoForm.i040[5]" @change="getCureHistoryHideCodeTwelve">其他</el-checkbox>
            <el-input v-model="infoForm.i040a"></el-input>
          </el-form-item>

          <div v-show="testFourteen.i041 === '1' ? true : false">
            <el-form-item label="20、曾使用过哪些西药 ？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i041[0]">亮丙瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i041[1]">戈舍瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i041[2]">曲普瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i041[3]">抑那通</el-checkbox>
              <el-checkbox v-model="infoForm.i041[4]">戴曼月乐环</el-checkbox>
              <el-checkbox v-model="infoForm.i041[5]">地诺孕素</el-checkbox>
              <el-checkbox v-model="infoForm.i041[6]">妈富隆</el-checkbox>
              <el-checkbox v-model="infoForm.i041[7]">优思明</el-checkbox>
              <el-checkbox v-model="infoForm.i041[8]">优思悦</el-checkbox>
              <el-checkbox v-model="infoForm.i041[9]">达英-35</el-checkbox>
              <el-checkbox v-model="infoForm.i041[10]">米非司酮</el-checkbox>
              <el-checkbox v-model="infoForm.i041[11]">达那唑</el-checkbox>
              <el-checkbox v-model="infoForm.i041[12]">孕三烯酮</el-checkbox>
              <el-checkbox v-model="infoForm.i041[13]">醋酸甲羟孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i041[14]">醋酸甲地孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i041[15]">其他</el-checkbox>
              <el-input v-model="infoForm.i041a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testFourteen.i042 === '1' ? true : false">
            <el-form-item label="21、曾使用过哪些中成药治疗？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i042[0]">丹莪妇康煎膏</el-checkbox>
              <el-checkbox v-model="infoForm.i042[1]">桂枝茯苓胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i042[2]">散结镇痛胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i042[3]">其他</el-checkbox>
              <el-input v-model="infoForm.i042a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testFourteen.i043 === '1' ? true : false">
            <el-form-item label="22、曾使用过哪些中医外治治疗？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i043[0]">中药灌肠</el-checkbox>
              <el-checkbox v-model="infoForm.i043[1]">中药阴道上药</el-checkbox>
              <el-checkbox v-model="infoForm.i043[2]">针刺</el-checkbox>
              <el-checkbox v-model="infoForm.i043[3]">艾灸</el-checkbox>
              <el-checkbox v-model="infoForm.i043[4]">中药外敷</el-checkbox>
              <el-checkbox v-model="infoForm.i043[5]">其他</el-checkbox>
              <el-input v-model="infoForm.i043a"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>

      <div v-show="hideOrShow.i044_i064 === '1' ? true : false">
        <!-- <h4>若均有：</h4> -->

        <el-form-item label="1、是否做过子宫内膜异位症或子宫腺肌病（子宫腺肌瘤）手术？">
          <el-radio-group v-model="infoForm.i044" @change="getCureHistoryHideCodeThirteen">
            <el-radio v-model="infoForm.i044" label="1">是</el-radio>
            <el-radio v-model="infoForm.i044" label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="testSix.i045_i060 === '1' ? true : false">
          <el-form-item label="2、做过_______次手术">
            <el-input-number v-model="infoForm.i045" :min="0" :max="10"></el-input-number>
          </el-form-item>

          <el-form-item label="3、手术的原因">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i046[0]">包块过大</el-checkbox>
            <el-checkbox v-model="infoForm.i046[1]">包块增长过快</el-checkbox>
            <el-checkbox v-model="infoForm.i046[2]">包块破裂</el-checkbox>
            <el-checkbox v-model="infoForm.i046[3]">子宫体积过大</el-checkbox>
            <el-checkbox v-model="infoForm.i046[4]">不孕</el-checkbox>
            <el-checkbox v-model="infoForm.i046[5]">月经量过多</el-checkbox>
            <el-checkbox v-model="infoForm.i046[6]">贫血</el-checkbox>
            <el-checkbox v-model="infoForm.i046[7]">痛经</el-checkbox>
            <el-checkbox v-model="infoForm.i046[8]">慢性盆腔痛</el-checkbox>
            <el-checkbox v-model="infoForm.i046[9]">性交痛</el-checkbox>
            <el-checkbox v-model="infoForm.i046[10]">肿瘤标志物数值过高</el-checkbox>
            <el-checkbox v-model="infoForm.i046[11]">侵犯肠管、输尿管等器官梗阻或功能障碍</el-checkbox>
            <el-checkbox v-model="infoForm.i046[12]">其他</el-checkbox>
            <el-input v-model="infoForm.i046a"></el-input>
          </el-form-item>

          <el-form-item label="4、手术名称为">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i047[0]">巧囊剥除术</el-checkbox>
            <el-checkbox v-model="infoForm.i047[1]">B超引导下巧囊穿刺</el-checkbox>
            <el-checkbox v-model="infoForm.i047[2]">全子宫切除术</el-checkbox>
            <el-checkbox v-model="infoForm.i047[3]">单侧附件切除术</el-checkbox>
            <el-checkbox v-model="infoForm.i047[4]">双侧附件切除术</el-checkbox>
            <el-checkbox v-model="infoForm.i047[5]">盆腔病灶切除术\电凝术</el-checkbox>
            <el-checkbox v-model="infoForm.i047[6]">盆腔粘连松解术</el-checkbox>
            <el-checkbox v-model="infoForm.i047[7]">腺肌瘤切除术</el-checkbox>
            <el-checkbox v-model="infoForm.i047[8]">子宫楔形切除术</el-checkbox>
            <el-checkbox v-model="infoForm.i047[9]">内膜切除术</el-checkbox>
            <el-checkbox v-model="infoForm.i047[10]">诊刮术</el-checkbox>
            <el-checkbox v-model="infoForm.i047[11]">高强度聚焦超声（HIFU）</el-checkbox>
            <el-checkbox v-model="infoForm.i047[12]">射频消融术</el-checkbox>
            <el-checkbox v-model="infoForm.i047[13]">微波消融术</el-checkbox>
            <el-checkbox v-model="infoForm.i047[14]">神经阻断手术</el-checkbox>
            <el-checkbox v-model="infoForm.i047[15]">其他</el-checkbox>
            <el-input v-model="infoForm.i047a"></el-input>
          </el-form-item>

          <el-form-item label="5、术前曾使用过哪些治疗手段">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i048[0]" @change="getCureHistoryHideCodeFourteen">未治疗</el-checkbox>
            <el-checkbox v-model="infoForm.i048[1]" @change="getCureHistoryHideCodeFourteen">西药</el-checkbox>
            <el-checkbox v-model="infoForm.i048[2]" @change="getCureHistoryHideCodeFourteen">中药汤剂</el-checkbox>
            <el-checkbox v-model="infoForm.i048[3]" @change="getCureHistoryHideCodeFourteen">中成药</el-checkbox>
            <el-checkbox v-model="infoForm.i048[4]" @change="getCureHistoryHideCodeFourteen">中医外治</el-checkbox>
            <el-checkbox v-model="infoForm.i048[5]" @change="getCureHistoryHideCodeFourteen">其他</el-checkbox>
            <el-input v-model="infoForm.i048a"></el-input>
          </el-form-item>

          <div v-show="testFifteen.i049 === '1' ? true : false">
            <el-form-item label="6、术前曾使用过哪些西药">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i049[0]">亮丙瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i049[1]">戈舍瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i049[2]">曲普瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i049[3]">抑那通</el-checkbox>
              <el-checkbox v-model="infoForm.i049[4]">曼月乐环</el-checkbox>
              <el-checkbox v-model="infoForm.i049[5]">地诺孕素</el-checkbox>
              <el-checkbox v-model="infoForm.i049[6]">妈富隆</el-checkbox>
              <el-checkbox v-model="infoForm.i049[7]">优思明</el-checkbox>
              <el-checkbox v-model="infoForm.i049[8]">优思悦</el-checkbox>
              <el-checkbox v-model="infoForm.i049[9]">达英-35</el-checkbox>
              <el-checkbox v-model="infoForm.i049[10]">米非司酮</el-checkbox>
              <el-checkbox v-model="infoForm.i049[11]">达那唑</el-checkbox>
              <el-checkbox v-model="infoForm.i049[12]">孕三烯酮</el-checkbox>
              <el-checkbox v-model="infoForm.i049[13]">醋酸甲羟孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i049[14]">醋酸甲地孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i049[15]">其他</el-checkbox>
              <el-input v-model="infoForm.i049a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testFifteen.i050 === '1' ? true : false">
            <el-form-item label="7、术前使用过哪些中成药治疗？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i050[0]">丹莪妇康煎膏</el-checkbox>
              <el-checkbox v-model="infoForm.i050[1]">桂枝茯苓胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i050[2]">散结镇痛胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i050[3]">其他</el-checkbox>
              <el-input v-model="infoForm.i050a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testFifteen.i051 === '1' ? true : false">
            <el-form-item label="8、术前使用过哪些中医外治治疗？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i051[0]">中药灌肠</el-checkbox>
              <el-checkbox v-model="infoForm.i051[1]">中药阴道上药</el-checkbox>
              <el-checkbox v-model="infoForm.i051[2]">针刺</el-checkbox>
              <el-checkbox v-model="infoForm.i051[3]">艾灸</el-checkbox>
              <el-checkbox v-model="infoForm.i051[4]">中药外敷</el-checkbox>
              <el-checkbox v-model="infoForm.i051[5]">其他</el-checkbox>
              <el-input v-model="infoForm.i051a"></el-input>
            </el-form-item>
          </div>

          <el-form-item label="9、术后曾使用过哪些治疗手段？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i052[0]" @change="getCureHistoryHideCodeFifteen">未治疗</el-checkbox>
            <el-checkbox v-model="infoForm.i052[1]" @change="getCureHistoryHideCodeFifteen">西药</el-checkbox>
            <el-checkbox v-model="infoForm.i052[2]" @change="getCureHistoryHideCodeFifteen">中药汤剂</el-checkbox>
            <el-checkbox v-model="infoForm.i052[3]" @change="getCureHistoryHideCodeFifteen">中成药</el-checkbox>
            <el-checkbox v-model="infoForm.i052[4]" @change="getCureHistoryHideCodeFifteen">中医外治</el-checkbox>
            <el-checkbox v-model="infoForm.i052[5]" @change="getCureHistoryHideCodeFifteen">其他</el-checkbox>
            <el-input v-model="infoForm.i052a"></el-input>
          </el-form-item>

          <div v-show="testSixteen.i053 === '1' ? true : false">
            <el-form-item label="10、术后曾使用过哪些西药？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i053[0]">亮丙瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i053[1]">戈舍瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i053[2]">曲普瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i053[3]">抑那通</el-checkbox>
              <el-checkbox v-model="infoForm.i053[4]">曼月乐环</el-checkbox>
              <el-checkbox v-model="infoForm.i053[5]">地诺孕素</el-checkbox>
              <el-checkbox v-model="infoForm.i053[6]">妈富隆</el-checkbox>
              <el-checkbox v-model="infoForm.i053[7]">优思明</el-checkbox>
              <el-checkbox v-model="infoForm.i053[8]">优思悦</el-checkbox>
              <el-checkbox v-model="infoForm.i053[9]">达英-35</el-checkbox>
              <el-checkbox v-model="infoForm.i053[10]">米非司酮</el-checkbox>
              <el-checkbox v-model="infoForm.i053[11]">达那唑</el-checkbox>
              <el-checkbox v-model="infoForm.i053[12]">孕三烯酮</el-checkbox>
              <el-checkbox v-model="infoForm.i053[13]">醋酸甲羟孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i053[14]">醋酸甲地孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i053[15]">其他</el-checkbox>
              <el-input v-model="infoForm.i053a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testSixteen.i054 === '1' ? true : false">
            <el-form-item label="11、术后使用过哪些中成药治疗？ ">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i054[0]">丹莪妇康煎膏</el-checkbox>
              <el-checkbox v-model="infoForm.i054[1]">桂枝茯苓胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i054[2]">散结镇痛胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i054[3]">其他</el-checkbox>
              <el-input v-model="infoForm.i054a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testSixteen.i055 === '1' ? true : false">
            <el-form-item label="12、术后使用过哪些中医外治治疗？ ">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i055[0]">中药灌肠</el-checkbox>
              <el-checkbox v-model="infoForm.i055[1]">中药阴道上药</el-checkbox>
              <el-checkbox v-model="infoForm.i055[2]">针刺</el-checkbox>
              <el-checkbox v-model="infoForm.i055[3]">艾灸</el-checkbox>
              <el-checkbox v-model="infoForm.i055[4]">中药外敷</el-checkbox>
              <el-checkbox v-model="infoForm.i055[5]">其他</el-checkbox>
              <el-input v-model="infoForm.i055a"></el-input>
            </el-form-item>
          </div>

          <el-form-item label="13、术后是否复发？">
            <el-radio-group v-model="infoForm.i056" @change="getCureHistoryHideCodeSixteen">
              <el-radio v-model="infoForm.i056" label="1">是</el-radio>
              <el-radio v-model="infoForm.i056" label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <div v-show="testSeven.i057_i060 === '1' ? true : false">
            <el-form-item label="14、复发后治疗方式？ ">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i057[0]" @change="getCureHistoryHideCodeSeventeen">未治疗</el-checkbox>
              <el-checkbox v-model="infoForm.i057[1]" @change="getCureHistoryHideCodeSeventeen">西药</el-checkbox>
              <el-checkbox v-model="infoForm.i057[2]" @change="getCureHistoryHideCodeSeventeen">再次手术</el-checkbox>
              <el-checkbox v-model="infoForm.i057[3]" @change="getCureHistoryHideCodeSeventeen">中药汤剂</el-checkbox>
              <el-checkbox v-model="infoForm.i057[4]" @change="getCureHistoryHideCodeSeventeen">中成药</el-checkbox>
              <el-checkbox v-model="infoForm.i057[5]" @change="getCureHistoryHideCodeSeventeen">中医外治</el-checkbox>
              <el-checkbox v-model="infoForm.i057[6]" @change="getCureHistoryHideCodeSeventeen">其他</el-checkbox>
              <el-input v-model="infoForm.i057a"></el-input>
            </el-form-item>

            <div v-show="testSeventeen.i058 === '1' ? true : false">
              <el-form-item label="15、复发后使用过哪些西药？ ">
                <el-tag type="danger" size="mini">多选</el-tag>
                <el-checkbox v-model="infoForm.i058[0]">亮丙瑞林</el-checkbox>
                <el-checkbox v-model="infoForm.i058[1]">戈舍瑞林</el-checkbox>
                <el-checkbox v-model="infoForm.i058[2]">曲普瑞林</el-checkbox>
                <el-checkbox v-model="infoForm.i058[3]">抑那通</el-checkbox>
                <el-checkbox v-model="infoForm.i058[4]">曼月乐环</el-checkbox>
                <el-checkbox v-model="infoForm.i058[5]">地诺孕素</el-checkbox>
                <el-checkbox v-model="infoForm.i058[6]">妈富隆</el-checkbox>
                <el-checkbox v-model="infoForm.i058[7]">优思明</el-checkbox>
                <el-checkbox v-model="infoForm.i058[8]">优思悦</el-checkbox>
                <el-checkbox v-model="infoForm.i058[9]">达英-35</el-checkbox>
                <el-checkbox v-model="infoForm.i058[10]">米非司酮</el-checkbox>
                <el-checkbox v-model="infoForm.i058[11]">达那唑</el-checkbox>
                <el-checkbox v-model="infoForm.i058[12]">孕三烯酮</el-checkbox>
                <el-checkbox v-model="infoForm.i058[13]">醋酸甲羟孕酮</el-checkbox>
                <el-checkbox v-model="infoForm.i058[14]">醋酸甲地孕酮</el-checkbox>
                <el-checkbox v-model="infoForm.i058[15]">其他</el-checkbox>
                <el-input v-model="infoForm.i058a"></el-input>
              </el-form-item>
            </div>

            <div v-show="testSeventeen.i0581 === '1' ? true : false">
              <el-form-item label="16、再次手术名称为">
                <el-tag type="danger" size="mini">多选</el-tag>
                <el-checkbox v-model="infoForm.i0581[0]">巧囊剥除术</el-checkbox>
                <el-checkbox v-model="infoForm.i0581[1]">B超引导下巧囊穿刺</el-checkbox>
                <el-checkbox v-model="infoForm.i0581[2]">全子宫切除术</el-checkbox>
                <el-checkbox v-model="infoForm.i0581[3]">单侧附件切除术</el-checkbox>
                <el-checkbox v-model="infoForm.i0581[4]">双侧附件切除术</el-checkbox>
                <el-checkbox v-model="infoForm.i0581[5]">盆腔病灶切除术\电凝术</el-checkbox>
                <el-checkbox v-model="infoForm.i0581[6]">盆腔粘连松解术</el-checkbox>
                <el-checkbox v-model="infoForm.i0581[7]">腺肌瘤切除术</el-checkbox>
                <el-checkbox v-model="infoForm.i0581[8]">子宫楔形切除术</el-checkbox>
                <el-checkbox v-model="infoForm.i0581[9]">内膜切除术</el-checkbox>
                <el-checkbox v-model="infoForm.i0581[10]">诊刮术</el-checkbox>
                <el-checkbox v-model="infoForm.i0581[11]">高强度聚焦超声（HIFU）</el-checkbox>
                <el-checkbox v-model="infoForm.i0581[12]">射频消融术</el-checkbox>
                <el-checkbox v-model="infoForm.i0581[13]">微波消融术</el-checkbox>
                <el-checkbox v-model="infoForm.i0581[14]">神经阻断手术</el-checkbox>
                <el-checkbox v-model="infoForm.i0581[15]">其他</el-checkbox>
                <el-input v-model="infoForm.i0581a"></el-input>
              </el-form-item>
            </div>

            <div v-show="testSeventeen.i059 === '1' ? true : false">
              <el-form-item label="17、复发后使用过哪些中成药治疗？ ">
                <el-tag type="danger" size="mini">多选</el-tag>
                <el-checkbox v-model="infoForm.i059[0]">丹莪妇康煎膏</el-checkbox>
                <el-checkbox v-model="infoForm.i059[1]">桂枝茯苓胶囊</el-checkbox>
                <el-checkbox v-model="infoForm.i059[2]">散结镇痛胶囊</el-checkbox>
                <el-checkbox v-model="infoForm.i059[3]">其他</el-checkbox>
                <el-input v-model="infoForm.i059a"></el-input>
              </el-form-item>
            </div>

            <div v-show="testSeventeen.i060 === '1' ? true : false">
              <el-form-item label="18、复发后使用过哪些中医外治治疗？ ">
                <el-tag type="danger" size="mini">多选</el-tag>
                <el-checkbox v-model="infoForm.i060[0]">中药灌肠</el-checkbox>
                <el-checkbox v-model="infoForm.i060[1]">中药阴道上药</el-checkbox>
                <el-checkbox v-model="infoForm.i060[2]">针刺</el-checkbox>
                <el-checkbox v-model="infoForm.i060[3]">艾灸</el-checkbox>
                <el-checkbox v-model="infoForm.i060[4]">中药外敷</el-checkbox>
                <el-checkbox v-model="infoForm.i060[5]">其他</el-checkbox>
                <el-input v-model="infoForm.i060a"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>

        <div v-show="testSix.i061_end === '1' ? true : false">
          <el-form-item label="19、曾使用过哪些治疗方式？ ">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i061[0]" @change="getCureHistoryHideCodeEighteen">未治疗</el-checkbox>
            <el-checkbox v-model="infoForm.i061[1]" @change="getCureHistoryHideCodeEighteen">西药</el-checkbox>
            <el-checkbox v-model="infoForm.i061[2]" @change="getCureHistoryHideCodeEighteen">中药汤剂</el-checkbox>
            <el-checkbox v-model="infoForm.i061[3]" @change="getCureHistoryHideCodeEighteen">中成药</el-checkbox>
            <el-checkbox v-model="infoForm.i061[4]" @change="getCureHistoryHideCodeEighteen">中医外治</el-checkbox>
            <el-checkbox v-model="infoForm.i061[5]" @change="getCureHistoryHideCodeEighteen">其他</el-checkbox>
            <el-input v-model="infoForm.i061a"></el-input>
          </el-form-item>

          <div v-show="testEighteen.i062 === '1' ? true : false">
            <el-form-item label="20、曾使用过哪些西药？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i062[0]">亮丙瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i062[1]">戈舍瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i062[2]">曲普瑞林</el-checkbox>
              <el-checkbox v-model="infoForm.i062[3]">抑那通</el-checkbox>
              <el-checkbox v-model="infoForm.i062[4]">戴曼月乐环</el-checkbox>
              <el-checkbox v-model="infoForm.i062[5]">地诺孕素</el-checkbox>
              <el-checkbox v-model="infoForm.i062[6]">妈富隆</el-checkbox>
              <el-checkbox v-model="infoForm.i062[7]">优思明</el-checkbox>
              <el-checkbox v-model="infoForm.i062[8]">优思悦</el-checkbox>
              <el-checkbox v-model="infoForm.i062[9]">达英-35</el-checkbox>
              <el-checkbox v-model="infoForm.i062[10]">米非司酮</el-checkbox>
              <el-checkbox v-model="infoForm.i062[11]">达那唑</el-checkbox>
              <el-checkbox v-model="infoForm.i062[12]">孕三烯酮</el-checkbox>
              <el-checkbox v-model="infoForm.i062[13]">醋酸甲羟孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i062[14]">醋酸甲地孕酮</el-checkbox>
              <el-checkbox v-model="infoForm.i062[15]">其他</el-checkbox>
              <el-input v-model="infoForm.i062a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testEighteen.i063 === '1' ? true : false">
            <el-form-item label="21、曾使用过哪些中成药治疗？ ">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i063[0]">丹莪妇康煎膏</el-checkbox>
              <el-checkbox v-model="infoForm.i063[1]">桂枝茯苓胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i063[2]">散结镇痛胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i063[3]">其他</el-checkbox>
              <el-input v-model="infoForm.i063a"></el-input>
            </el-form-item>
          </div>

          <div v-show="testEighteen.i064 === '1' ? true : false">
            <el-form-item label="22、曾使用过哪些中医外治治疗？ ">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i064[0]">中药灌肠</el-checkbox>
              <el-checkbox v-model="infoForm.i064[1]">中药阴道上药</el-checkbox>
              <el-checkbox v-model="infoForm.i064[2]">针刺</el-checkbox>
              <el-checkbox v-model="infoForm.i064[3]">艾灸</el-checkbox>
              <el-checkbox v-model="infoForm.i064[4]">中药外敷</el-checkbox>
              <el-checkbox v-model="infoForm.i064[5]">其他</el-checkbox>
              <el-input v-model="infoForm.i064a"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>

    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiGetHideCode } from "@/api/api-prj006";

export default {
  name: "CureForm",
  data() {
    return {
      infoForm: {
        i001: "",
        i002: "",
        i003: [
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
        i003a: "",
        i004: [false, false, false, false],
        i005: [false, false, false, false, false, false, false, false, false],
        i005a: "",
        i006: [false, false, false, false, false, false],
        i006a: "",
        i007: [
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
        i007a: "",
        i008: [false, false, false, false],
        i008a: "",
        i009: [false, false, false, false, false, false],
        i009a: "",
        i010: [false, false, false, false, false, false],
        i010a: "",
        i011: [
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
        i011a: "",
        i012: [false, false, false, false],
        i012a: "",
        i013: [false, false, false, false, false, false],
        io13a: "",
        i014: "",
        i015: [false, false, false, false, false, false, false, false, false],
        i015a: "",
        i016: [
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
        i016a: "",
        i017: [false, false, false, false],
        i017a: "",
        i018: [false, false, false, false, false, false],
        i018a: "",
        i019: [false, false, false, false, false, false],
        i019a: "",
        i020: [
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
        i020a: "",
        i021: [false, false, false, false],
        i021a: "",
        i022: [false, false, false, false, false, false],
        i022a: "",
        i023: "",
        i024: "",
        i025: [false, false, false, false, false, false, false, false, false],
        i025a: "",
        i026: [
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
        i026a: "",
        i027: [false, false, false, false, false, false],
        i027a: "",
        i028: [
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
        i028a: "",
        i029: [false, false, false, false],
        i029a: "",
        i030: [false, false, false, false, false, false],
        i030a: "",
        i031: [false, false, false, false, false, false],
        i031a: "",
        i032: [
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
        i032a: "",
        i033: [false, false, false, false],
        i033a: "",
        i034: [false, false, false, false, false, false],
        i034a: "",
        i035: "",
        i036: [false, false, false, false, false, false, false],
        i036a: "",
        i037: [
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
        i037a: "",
        i0371: [
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
        i0371a: "",
        i038: [false, false, false, false],
        i038a: "",
        i039: [false, false, false, false, false, false],
        i039a: "",
        i040: [false, false, false, false, false, false],
        i040a: "",
        i041: [
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
        i041a: "",
        i042: [false, false, false, false],
        i042a: "",
        i043: [false, false, false, false, false, false],
        i043a: "",
        i044: "",
        i045: "",
        i046: [
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
        i046a: "",
        i047: [
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
        i047a: "",
        i048: [false, false, false, false, false, false],
        i048a: "",
        i049: [
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
        i049a: "",
        i050: [false, false, false, false],
        i050a: "",
        i051: [false, false, false, false, false, false],
        i051a: "",
        i052: [false, false, false, false, false, false],
        i052a: "",
        i053: [
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
        i053a: "",
        i054: [false, false, false, false],
        i054a: "",
        i055: [false, false, false, false, false, false],
        i055a: "",
        i056: "",
        i057: [false, false, false, false, false, false, false],
        i057a: "",
        i058: [
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
        i058a: "",
        i0581: [
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
        i0581a: "",
        i059: [false, false, false, false],
        i059a: "",
        i060: [false, false, false, false, false, false],
        i060a: "",
        i061: [false, false, false, false, false, false],
        i061a: "",
        i062: [
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
        i062a: "",
        i063: [false, false, false, false],
        i063a: "",
        i064: [false, false, false, false, false, false],
        i064a: "",
      },
      dialogVisible: false,
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: "",
      hideOrShow: {
        i001_i022: "0",
        i023_i043: "0",
        i044_i064: "0",
      },
      testOne: {
        i002_i018: "0",
        i019_end: "0",
      },
      testTwo: {
        i007: "0",
        i008: "0",
        i009: "0",
      },
      testThree: {
        i015_i018: "0",
      },
      testFour: {
        i024_i039: "0",
        i040_end: "0",
      },
      testFive: {
        i036_i039: "1",
      },
      testSix: {
        i045_i060: "0",
        i061_end: "0",
      },
      testSeven: {
        i057_i060: "1",
      },
      testEight: {
        i011: "0",
        i012: "0",
        i013: "0",
      },
      testNine: {
        i016: "0",
        i017: "0",
        i018: "0",
      },
      testTen: {
        i020: "0",
        i021: "0",
        i022: "0",
      },
      testEleven: {
        i028: "0",
        i029: "0",
        i030: "0",
      },
      testTwelve: {
        i032: "0",
        i033: "0",
        i034: "0",
      },
      testThirteen: {
        i037: "0",
        i038: "0",
        i039: "0",
        i0371: "0",
      },
      testFourteen: {
        i041: "0",
        i042: "0",
        i043: "0",
      },
      testFifteen: {
        i049: "0",
        i050: "0",
        i051: "0",
      },
      testSixteen: {
        i053: "0",
        i054: "0",
        i055: "0",
      },
      testSeventeen: {
        i058: "0",
        i059: "0",
        i060: "0",
        i0581: "0",
      },
      testEighteen: {
        i062: "0",
        i063: "0",
        i064: "0",
      },
    };
  },
  created() {
    this.$on("openEvent", (data) => {
      console.log("既往治疗情况数据: ", data);
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
    getCureHistoryHideCodeEighteen() {
      let params = {
        question: "i061",
        answer: JSON.stringify(this.infoForm.i061),
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testEighteen = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHistoryHideCodeSeventeen() {
      let params = {
        question: "i057",
        answer: JSON.stringify(this.infoForm.i057),
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testSeventeen = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHistoryHideCodeFifteen() {
      let params = {
        question: "i052",
        answer: JSON.stringify(this.infoForm.i052),
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testSixteen = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHistoryHideCodeFourteen() {
      let params = {
        question: "i048",
        answer: JSON.stringify(this.infoForm.i048),
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testFifteen = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHistoryHideCodeTwelve() {
      let params = {
        question: "i040",
        answer: JSON.stringify(this.infoForm.i040),
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testFourteen = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHistoryHideCodeEleven() {
      let params = {
        question: "i036",
        answer: JSON.stringify(this.infoForm.i036),
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testThirteen = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHistoryHideCodeNine() {
      let params = {
        question: "i031",
        answer: JSON.stringify(this.infoForm.i031),
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testTwelve = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHistoryHideCodeEight() {
      let params = {
        question: "i027",
        answer: JSON.stringify(this.infoForm.i027),
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testEleven = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHistoryHideCodeSix() {
      let params = {
        question: "i019",
        answer: JSON.stringify(this.infoForm.i019),
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testTen = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHistoryHideCodeFive() {
      let params = {
        question: "i015",
        answer: JSON.stringify(this.infoForm.i015),
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testNine = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHistoryHideCodeThree() {
      let params = {
        question: "i010",
        answer: JSON.stringify(this.infoForm.i010),
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testEight = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHistoryHideCodeSixteen() {
      let params = {
        question: "i056",
        answer: this.infoForm.i056,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testSeven = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHistoryHideCodeThirteen() {
      let params = {
        question: "i044",
        answer: this.infoForm.i044,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testSix = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHistoryHideCodeTen() {
      let params = {
        question: "i035",
        answer: this.infoForm.i035,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testFive = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHistoryHideCodeSeven() {
      let params = {
        question: "i023",
        answer: this.infoForm.i023,
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
    getCureHistoryHideCodeFour() {
      let params = {
        question: "i014",
        answer: this.infoForm.i014,
      };
      apiGetHideCode(params)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.testThree = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCureHistoryHideCodeTwo() {
      let params = {
        question: "i006",
        answer: JSON.stringify(this.infoForm.i006),
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
    getCureHistoryHideCodeOne() {
      let params = {
        question: "i001",
        answer: this.infoForm.i001,
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
            // console.log(res);
            this.hideOrShow = res.data;
            const { i001_i022, i023_i043, i044_i064 } = res.data;
            if (i001_i022 === "1") {
              // 子宫内膜异位症模块
              this.getCureHistoryHideCodeOne();
              this.getCureHistoryHideCodeTwo();
              this.getCureHistoryHideCodeThree();
              this.getCureHistoryHideCodeFour();
              this.getCureHistoryHideCodeFive();
              this.getCureHistoryHideCodeSix();
            } else if (i023_i043 === "1") {
              // 若为腺肌病模块
              this.getCureHistoryHideCodeSeven();
              this.getCureHistoryHideCodeEight();
              this.getCureHistoryHideCodeNine();
              this.getCureHistoryHideCodeTen();
              this.getCureHistoryHideCodeEleven();
              this.getCureHistoryHideCodeTwelve();
            } else {
              // 若均有模块
              this.getCureHistoryHideCodeThirteen();
              this.getCureHistoryHideCodeSixteen();
              this.getCureHistoryHideCodeFourteen();
              this.getCureHistoryHideCodeFifteen();
              this.getCureHistoryHideCodeSeventeen();
              this.getCureHistoryHideCodeEighteen();
            }
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
<style lang="">
</style>
