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


        <el-form-item label="1、是否做过子宫肌瘤手术？">       
            <el-radio v-model="infoForm.i01" label="1">是</el-radio>
            <el-radio v-model="infoForm.i01" label="0">否 （跳至16题）</el-radio>
        </el-form-item>

        <el-form-item label="2、做过几次手术">
            <el-input-number v-model="infoForm.i02" :min="0" :max="10"></el-input-number>
        </el-form-item>

          <el-form-item label="3、手术的原因">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i0301[0]">包块过大</el-checkbox>
            <el-checkbox v-model="infoForm.i0301[1]">包块增长过快</el-checkbox>
            <el-checkbox v-model="infoForm.i0301[2]">包块破裂</el-checkbox>
            <el-checkbox v-model="infoForm.i0301[3]">不孕</el-checkbox>
            <el-checkbox v-model="infoForm.i0301[4]">痛经</el-checkbox>
            <el-checkbox v-model="infoForm.i0301[5]">慢性盆腔痛</el-checkbox>
            <el-checkbox v-model="infoForm.i0301[6]">肿瘤标志物数值过高</el-checkbox>
            <el-checkbox v-model="infoForm.i0301[7]">排尿、排便异常</el-checkbox>
            <el-checkbox v-model="infoForm.i0301[8]">其他</el-checkbox>
            <el-input v-model="infoForm.i0302"></el-input>
          </el-form-item>

          <el-form-item label="4、手术方式">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i04[0]">开腹</el-checkbox>
            <el-checkbox v-model="infoForm.i04[1]">腹腔镜</el-checkbox>
            <el-checkbox v-model="infoForm.i04[2]">宫腔镜</el-checkbox>
          </el-form-item>

          <el-form-item label="5、手术名称为">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i0501[0]">子宫肌瘤剥除术</el-checkbox>
            <el-checkbox v-model="infoForm.i0501[1]">次全子宫切除术</el-checkbox>
            <el-checkbox v-model="infoForm.i0501[2]">全子宫切除术</el-checkbox>
            <el-checkbox v-model="infoForm.i0501[3]">经导管子宫动脉栓塞术（UAE）</el-checkbox>
            <el-checkbox v-model="infoForm.i0501[4]">高强度超声聚焦消融（HIFUA）</el-checkbox>
            <el-checkbox v-model="infoForm.i0501[5]">其他</el-checkbox>
            <el-input v-model="infoForm.i0502"></el-input>
          </el-form-item>

          <el-form-item label="6、术前曾使用过哪些治疗手段">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i0601[0]">未治疗 （跳至9题）</el-checkbox>
            <el-checkbox v-model="infoForm.i0601[1]">西药</el-checkbox>
            <el-checkbox v-model="infoForm.i0601[2]">中药汤剂 （跳至9题） </el-checkbox>
            <el-checkbox v-model="infoForm.i0601[3]">中成药 </el-checkbox>
            <el-checkbox v-model="infoForm.i0601[4]">其他 （跳至9题）</el-checkbox>
            <el-input v-model="infoForm.i0602"></el-input>
          </el-form-item>

          <el-form-item label="7、术前曾使用过哪些西药？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i0701[0]">亮丙瑞林</el-checkbox>
            <el-checkbox v-model="infoForm.i0701[1]">戈舍瑞林</el-checkbox>
            <el-checkbox v-model="infoForm.i0701[2]">曲普瑞林</el-checkbox>
            <el-checkbox v-model="infoForm.i0701[3]">抑那通</el-checkbox>
            <el-checkbox v-model="infoForm.i0701[4]">米非司酮</el-checkbox>
            <el-checkbox v-model="infoForm.i0701[5]">达那唑</el-checkbox>
            <el-checkbox v-model="infoForm.i0701[6]">孕三烯酮</el-checkbox>
            <el-checkbox v-model="infoForm.i0701[7]">醋酸甲羟孕酮</el-checkbox>
            <el-checkbox v-model="infoForm.i0701[8]">醋酸甲地孕酮</el-checkbox>
            <el-checkbox v-model="infoForm.i0701[9]">NSAID</el-checkbox>
            <el-checkbox v-model="infoForm.i0701[10]">氨甲环酸</el-checkbox>
            <el-checkbox v-model="infoForm.i0701[11]">复方口服避孕药（COC）</el-checkbox>
            <el-checkbox v-model="infoForm.i0701[12]">左炔诺孕酮宫内缓释系统（LNG-IUS）</el-checkbox>
            <el-checkbox v-model="infoForm.i0701[13]">其他</el-checkbox>
            <el-input v-model="infoForm.i0702"></el-input>
          </el-form-item>

            <el-form-item label="8、术前使用过哪些中成药治疗？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i0801[0]">宫瘤宁</el-checkbox>
              <el-checkbox v-model="infoForm.i0801[1]">桂枝茯苓胶囊</el-checkbox>
              <el-checkbox v-model="infoForm.i0801[2]">小金丸</el-checkbox>
              <el-checkbox v-model="infoForm.i0801[3]">其他</el-checkbox>
              <el-input v-model="infoForm.i0802"></el-input>
            </el-form-item>

            <el-form-item label="9、术前使用过哪些中医外治治疗？">
              <el-tag type="danger" size="mini">多选</el-tag>
              <el-checkbox v-model="infoForm.i0901[0]">未治疗 （跳至12题）</el-checkbox>
              <el-checkbox v-model="infoForm.i0901[1]">西药</el-checkbox>
              <el-checkbox v-model="infoForm.i0901[2]">中药汤剂 （跳至12题）</el-checkbox>
              <el-checkbox v-model="infoForm.i0901[3]">中成药</el-checkbox>
              <el-checkbox v-model="infoForm.i0901[4]">中医外治</el-checkbox>
              <el-checkbox v-model="infoForm.i0901[5]">其他 （跳至12题）</el-checkbox>
              <el-input v-model="infoForm.i0902"></el-input>
            </el-form-item>
          
          <el-form-item label="10. 术后曾使用过哪些西药？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i1001[0]"></el-checkbox>
            <el-checkbox v-model="infoForm.i1001[1]">亮丙瑞林</el-checkbox>
            <el-checkbox v-model="infoForm.i1001[2]">戈舍瑞林</el-checkbox>
            <el-checkbox v-model="infoForm.i1001[3]">曲普瑞林</el-checkbox>
            <el-checkbox v-model="infoForm.i1001[4]">抑那通</el-checkbox>
            <el-checkbox v-model="infoForm.i1001[5]">米非司酮</el-checkbox>
            <el-checkbox v-model="infoForm.i1001[6]">达那唑</el-checkbox>
            <el-checkbox v-model="infoForm.i1001[7]">孕三烯酮</el-checkbox>
            <el-checkbox v-model="infoForm.i1001[8]">醋酸甲羟孕酮</el-checkbox>
            <el-checkbox v-model="infoForm.i1001[9]">醋酸甲地孕酮</el-checkbox>
            <el-checkbox v-model="infoForm.i1001[10]">其他</el-checkbox>
          </el-form-item>

          <el-form-item label="11、术后使用过哪些中成药治疗？">
            <el-checkbox v-model="infoForm.i1101[0]">宫瘤宁</el-checkbox>
            <el-checkbox v-model="infoForm.i1101[1]">桂枝茯苓胶囊</el-checkbox>
            <el-checkbox v-model="infoForm.i1101[2]">小金丸</el-checkbox>
            <el-checkbox v-model="infoForm.i1101[3]">其他</el-checkbox>
            <el-input v-model="infoForm.i1102"></el-input>
          </el-form-item>

          <el-form-item label="12、术后是否复发？">
              <el-radio v-model="infoForm.i12" label="1">是</el-radio>
              <el-radio v-model="infoForm.i12" label="0">否 （跳至十、辅助检查） </el-radio>
          </el-form-item>

          <el-form-item label="13、复发后治疗方式">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i1301[0]">未治疗（跳至十、辅助检查）</el-checkbox>
            <el-checkbox v-model="infoForm.i1301[1]">西药</el-checkbox>
            <el-checkbox v-model="infoForm.i1301[2]">再次手术（跳至十、辅助检查）</el-checkbox>
            <el-checkbox v-model="infoForm.i1301[3]">中药汤剂（跳至十、辅助检查）</el-checkbox>
            <el-checkbox v-model="infoForm.i1301[4]">中成药</el-checkbox>
            <el-checkbox v-model="infoForm.i1301[5]">其他</el-checkbox>
            <el-input v-model="infoForm.i1302"></el-input>
          </el-form-item>

          <el-form-item label="14、复发后使用过哪些西药">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i1401[0]">亮丙瑞林</el-checkbox>
            <el-checkbox v-model="infoForm.i1401[1]">戈舍瑞林</el-checkbox>
            <el-checkbox v-model="infoForm.i1401[2]">曲普瑞林</el-checkbox>
            <el-checkbox v-model="infoForm.i1401[3]">抑那通</el-checkbox>
            <el-checkbox v-model="infoForm.i1401[4]">米非司酮</el-checkbox>
            <el-checkbox v-model="infoForm.i1401[5]">达那唑</el-checkbox>
            <el-checkbox v-model="infoForm.i1401[6]">孕三烯酮</el-checkbox>
            <el-checkbox v-model="infoForm.i1401[7]">醋酸甲羟孕酮</el-checkbox>
            <el-checkbox v-model="infoForm.i1401[8]">醋酸甲地孕酮</el-checkbox>
            <el-checkbox v-model="infoForm.i1401[9]">NSAID</el-checkbox>
            <el-checkbox v-model="infoForm.i1401[10]">氨甲环酸</el-checkbox>
            <el-checkbox v-model="infoForm.i1401[11]">复方口服避孕药（COC）</el-checkbox>
            <el-checkbox v-model="infoForm.i1401[12]">左炔诺孕酮宫内缓释系统（LNG-IUS）</el-checkbox>
            <el-checkbox v-model="infoForm.i1401[13]">其他</el-checkbox>
            <el-input v-model="infoForm.i1402"></el-input>
          </el-form-item>


          <el-form-item label="15、复发后使用过哪些中成药治疗">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i1501[0]">宫瘤宁</el-checkbox>
            <el-checkbox v-model="infoForm.i1501[1]">桂枝茯苓胶囊</el-checkbox>
            <el-checkbox v-model="infoForm.i1501[2]">小金丸</el-checkbox>
            <el-checkbox v-model="infoForm.i1501[3]">其他</el-checkbox>
            <el-input v-model="infoForm.i1502"></el-input>
          </el-form-item>

          <el-form-item label="16、曾使用过哪些治疗方式？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i1601[0]">未治疗 （跳至十、辅助检查）</el-checkbox>
            <el-checkbox v-model="infoForm.i1601[1]">西药</el-checkbox>
            <el-checkbox v-model="infoForm.i1601[2]">中药汤剂 （跳至十、辅助检查）</el-checkbox>
            <el-checkbox v-model="infoForm.i1601[3]">中成药</el-checkbox>
            <el-checkbox v-model="infoForm.i1601[4]">其他 （跳至十、辅助检查）</el-checkbox>
            <el-input v-model="infoForm.i1602"></el-input>
          </el-form-item>

          <el-form-item label="17. 曾使用过哪些西药？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i1701[0]">亮丙瑞林</el-checkbox>
            <el-checkbox v-model="infoForm.i1701[1]">戈舍瑞林</el-checkbox>
            <el-checkbox v-model="infoForm.i1701[2]">曲普瑞林</el-checkbox>
            <el-checkbox v-model="infoForm.i1701[3]">抑那通</el-checkbox>
            <el-checkbox v-model="infoForm.i1701[4]">米非司酮</el-checkbox>
            <el-checkbox v-model="infoForm.i1701[5]">达那唑</el-checkbox>
            <el-checkbox v-model="infoForm.i1701[6]">孕三烯酮</el-checkbox>
            <el-checkbox v-model="infoForm.i1701[7]">醋酸甲羟孕酮</el-checkbox>
            <el-checkbox v-model="infoForm.i1701[8]">醋酸甲地孕酮</el-checkbox>
            <el-checkbox v-model="infoForm.i1701[9]">其他</el-checkbox>
            <el-input v-model="infoForm.i1702"></el-input>
          </el-form-item>

          <el-form-item label="18. 曾使用过哪些中成药治疗？">
            <el-tag type="danger" size="mini">多选</el-tag>
            <el-checkbox v-model="infoForm.i1801[0]">宫瘤宁</el-checkbox>
            <el-checkbox v-model="infoForm.i1801[1]">桂枝茯苓胶囊</el-checkbox>
            <el-checkbox v-model="infoForm.i1801[2]">小金丸</el-checkbox>
            <el-checkbox v-model="infoForm.i1801[3]">其他</el-checkbox>
            <el-input v-model="infoForm.i1802"></el-input>
          </el-form-item>
     
    </el-form>

    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj009";

export default {
  name: "CureForm",
  data() {
    return {
      infoForm: {
        i01: 0,
        i02: 0,
        i0301: [ false,false,false,false,false,  false,false,false],
        i0302: "",
        i04: [false, false, false],
        i0501: [false, false, false, false, false, false],
        i0502: "",
        i0601: [false, false, false, false, false],
        i0602: "",
        i0701: [ false,false,false,false,false,  false,false,false,false,false,   false,false,false,false],
        i0702: "",
        i0801: [false, false, false, false],
        i0802: "",
        i0901: [false, false, false, false, false, false],
        i0902: "",
        i1001: [false,false,false,false,false,   false,false,false,false,false,   false],
        
        i1101: [false,false,false,false],
        i1102: "",
        i12: 0,

        i1301: [false, false, false, false, false, false],
        i1302: "",
        i1401:[ false,false,false,false,false,  false,false,false,false,false,   false,false,false,false],
        i1402: "",
        i1501: [false, false, false, false],
        i1502: "",

        i1601: [false, false, false, false, false],
        i1602: "",

        i1701: [false,false,false,false,false,   false,false,false,false,false],
        i1702: "",

        i1801: [false, false, false, false],
        i1802: ""
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
      console.log("既往治疗情况数据: ", data);
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
