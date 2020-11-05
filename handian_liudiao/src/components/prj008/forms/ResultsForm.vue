<template>
  <el-dialog
    title="相关检查"
    class="my-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="100%"
    center
  >
    <el-form
      ref="infoForm"
      :model="infoForm"
      label-width="200"
      label-position="left"
    >
      <el-alert
        v-if="check_status == '审核通过'"
        title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <el-divider v-if="check_status == '审核通过'"></el-divider>
      <!-- 表格开始 -->
      <el-form-item label="1.体格检查">
        <el-radio-group v-model="infoForm.d01">
          <el-radio label="1">无</el-radio>
          <el-radio label="2">妇科检查</el-radio>
          <el-radio label="3">全身检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="2.辅助检查">
        <el-radio-group v-model="infoForm.d02">
          <el-radio label="1">无</el-radio>
          <el-radio label="2">有</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-divider content-position="left">3.病因相关检查 </el-divider>
      <el-form-item label="3-1.白带常规:">
        <el-radio-group v-model="infoForm.d0301">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-2.生殖道拭子支原体:">
        <el-radio-group v-model="infoForm.d0302">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-3.生殖道拭子衣原体:">
        <el-radio-group v-model="infoForm.d0303">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-4.生殖道拭子一般细菌:">
        <el-radio-group v-model="infoForm.d0304">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-5.甲状腺功能测定:">
        <el-radio-group v-model="infoForm.d0305">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-6.抗甲状腺球蛋白抗体:">
        <el-radio-group v-model="infoForm.d0306">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-7.抗甲状腺炎过氧化物酶抗体:">
        <el-radio-group v-model="infoForm.d0307">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-8.抗核抗体:">
        <el-radio-group v-model="infoForm.d0308">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-9.抗磷脂抗体:">
        <el-radio-group v-model="infoForm.d0309">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-10.抗双链DNA抗体:">
        <el-radio-group v-model="infoForm.d0310">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-11.封闭抗体:">
        <el-radio-group v-model="infoForm.d0311">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-12.TBNK淋巴细胞亚群:">
        <el-radio-group v-model="infoForm.d0312">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-13.全血细胞计数:">
        <el-radio-group v-model="infoForm.d0313">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-14.凝血功能检查:">
        <el-radio-group v-model="infoForm.d0314">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-15.D-二聚体:">
        <el-radio-group v-model="infoForm.d0315">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-16.血小板聚集:">
        <el-radio-group v-model="infoForm.d0316">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-17.夫妻双方染色体检查:">
        <el-radio-group v-model="infoForm.d0317">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-18.胚胎染色体检查:">
        <el-radio-group v-model="infoForm.d0318">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="3-19.男方精液检查:">
        <el-radio-group v-model="infoForm.d0319">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
          <el-radio label="4">未检查</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-divider content-position="left"
        >4.胚胎发育相关检查（一般有数次复查，了解胚胎发育趋势）
      </el-divider>
      <h4>子宫附件超声</h4>
      <el-table :data="infoForm.d0401" stripe style="width: 100%">
        <el-table-column prop="d04011" label="孕_天时超声情况">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04011"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04011 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="d04012" label="孕囊大小">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04012"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04012 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="d04013" label="卵黄囊胚芽">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04013"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04013 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="d04014" label="心搏">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04014"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04014 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="d04015" label="其他">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04015"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04015 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="addd0401Row(scope.row)"
              >添加</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="editd0401Row(scope.row)"
              >{{ scope.row.editText }}</el-button
            >
            <el-button size="mini" type="danger" @click="deld0401Row(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <h4>子宫动脉血流超声</h4>
      <el-table :data="infoForm.d0402" stripe style="width: 100%">
        <el-table-column prop="d04021" label="孕_天时超声情况">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04021"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04021 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="d04022" label="RI">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04022"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04022 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="d04023" label="PI">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04023"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04023 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="d04024" label="S/D">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04024"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04024 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="d04025" label="其他">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04025"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04025 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="addd0402Row(scope.row)"
              >添加</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="editd0402Row(scope.row)"
              >{{ scope.row.editText }}</el-button
            >
            <el-button size="mini" type="danger" @click="deld0402Row(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <h4>血HCG</h4>
      <el-table :data="infoForm.d0403" stripe style="width: 100%">
        <el-table-column prop="d04031" label="孕_天时">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04031"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04031 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="d04032" label="HCG:_IU/L">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04032"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04032 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="addd0403Row(scope.row)"
              >添加</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="editd0403Row(scope.row)"
              >{{ scope.row.editText }}</el-button
            >
            <el-button size="mini" type="danger" @click="deld0403Row(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <h4>血雌二醇</h4>
      <el-table :data="infoForm.d0404" stripe style="width: 100%">
        <el-table-column prop="d04041" label="孕_天时">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04041"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04041 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="d04042" label="血雌二醇:_pg/mL">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04042"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04042 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="addd0404Row(scope.row)"
              >添加</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="editd0404Row(scope.row)"
              >{{ scope.row.editText }}</el-button
            >
            <el-button size="mini" type="danger" @click="deld0404Row(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <h4>血孕酮</h4>
      <el-table :data="infoForm.d0405" stripe style="width: 100%">
        <el-table-column prop="d04051" label="孕_天时">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04051"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04051 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="d04052" label="血孕酮:_nmol/L">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              <el-input
                v-model="scope.row.d04052"
                placeholder="请输入内容"
              ></el-input>
            </span>
            <span v-else>{{ scope.row.d04052 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="addd0405Row(scope.row)"
              >添加</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="editd0405Row(scope.row)"
              >{{ scope.row.editText }}</el-button
            >
            <el-button size="mini" type="danger" @click="deld0405Row(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <h4>5.其他异常指标</h4>
      <el-form-item label="4-1.肝功能">
        <el-radio-group v-model="infoForm.d0501">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="4-2.肾功能">
        <el-radio-group v-model="infoForm.d0502">
          <el-radio label="1">不详</el-radio>
          <el-radio label="2">正常</el-radio>
          <el-radio label="3">异常</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="4-3.其他">
        <el-radio-group v-model="infoForm.d0503">
          <el-radio label="1">抗心磷抗体</el-radio>
          <el-radio label="2">狼疮抗体</el-radio>
          <el-radio label="3">抗b2糖蛋白</el-radio>
          <el-radio label="4">抗核抗体</el-radio>
          <el-radio label="5">D二聚体</el-radio>
          <el-radio label="6">血小板聚集</el-radio>
        </el-radio-group>
        <el-input
          v-model="infoForm.d0504"
          placeholder="若有异常请填写具体数值"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button
        :disabled="check_status == '审核通过'"
        type="primary"
        @click="updateInfoForm"
        >确定</el-button
      >
      <el-button @click="dialogVisible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { apiUpdatePatientDataForm } from "@/api/api-prj008";

export default {
  name: "Relevant",
  data() {
    return {
      infoForm: {
        d01: "",
        d02: "",
        d0301: "",
        d0302: "",
        d0303: "",
        d0304: "",
        d0305: "",
        d0306: "",
        d0307: "",
        d0308: "",
        d0309: "",
        d0310: "",
        d0311: "",
        d0312: "",
        d0313: "",
        d0314: "",
        d0315: "",
        d0316: "",
        d0317: "",
        d0318: "",
        d0319: "",
        d0401: [
          {
            d04011: "",
            d04012: "",
            d04013: "",
            d04014: "",
            d04015: "",
            status: 0,
            editText: "编辑",
          },
        ],
        d0402: [
          {
            d04021: "",
            d04022: "",
            d04023: "",
            d04024: "",
            d04025: "",
            status: 0,
            editText: "编辑",
          },
        ],
        d0403: [
          {
            d04031: "",
            d04032: "",
            status: 0,
            editText: "编辑",
          },
        ],
        d0404: [
          {
            d04041: "",
            d04042: "",
            status: 0,
            editText: "编辑",
          },
        ],
        d0405: [
          {
            d04051: "",
            d04052: "",
            status: 0,
            editText: "编辑",
          },
        ],
        d0501: "",
        d0502: "",
        d0503: "",
        d0504: "",
      },
      dialogVisible: false,
      exist: true,
      formName: "",
      isOwnedByUser: true,
      check_status: "",
      _id: "",
      // editd0401RowText: "编辑",
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
      }
    });
  },
  methods: {
    addd0405Row() {
      // status: 1代表编辑态 0代表保存态
      this.infoForm.d0405.push({
        d04051: "",
        d04052: "",
        status: 1,
        editText: "完成",
      });
    },
    editd0405Row(val) {
      val.status = !val.status;
      val.editText === "编辑"
        ? (val.editText = "完成")
        : (val.editText = "编辑");
    },
    deld0405Row(val) {
      this.infoForm.d0405 = this.infoForm.d0405.filter(
        (item, index) => index != val.$index
      );
    },
    addd0404Row() {
      // status: 1代表编辑态 0代表保存态
      this.infoForm.d0404.push({
        d04041: "",
        d04042: "",
        status: 1,
        editText: "完成",
      });
    },
    editd0404Row(val) {
      val.status = !val.status;
      val.editText === "编辑"
        ? (val.editText = "完成")
        : (val.editText = "编辑");
    },
    deld0404Row(val) {
      this.infoForm.d0404 = this.infoForm.d0404.filter(
        (item, index) => index != val.$index
      );
    },
    addd0403Row() {
      // status: 1代表编辑态 0代表保存态
      this.infoForm.d0403.push({
        d04031: "",
        d04032: "",
        status: 1,
        editText: "完成",
      });
    },
    editd0403Row(val) {
      val.status = !val.status;
      val.editText === "编辑"
        ? (val.editText = "完成")
        : (val.editText = "编辑");
    },
    deld0403Row(val) {
      this.infoForm.d0403 = this.infoForm.d0403.filter(
        (item, index) => index != val.$index
      );
    },
    addd0402Row() {
      // status: 1代表编辑态 0代表保存态
      this.infoForm.d0402.push({
        d04021: "",
        d04022: "",
        d04023: "",
        d04024: "",
        d04025: "",
        status: 1,
        editText: "完成",
      });
    },
    editd0402Row(val) {
      val.status = !val.status;
      val.editText === "编辑"
        ? (val.editText = "完成")
        : (val.editText = "编辑");
    },
    deld0402Row(val) {
      this.infoForm.d0402 = this.infoForm.d0402.filter(
        (item, index) => index != val.$index
      );
    },
    addd0401Row() {
      // status: 1代表编辑态 0代表保存态
      this.infoForm.d0401.push({
        d04011: "",
        d04012: "",
        d04013: "",
        d04014: "",
        d04015: "",
        status: 1,
        editText: "完成",
      });
      this.editd0401RowText = "完成";
    },
    editd0401Row(val) {
      val.status = !val.status;
      val.editText === "编辑"
        ? (val.editText = "完成")
        : (val.editText = "编辑");
    },
    deld0401Row(val) {
      this.infoForm.d0401 = this.infoForm.d0401.filter(
        (item, index) => index != val.$index
      );
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
        .catch(err=>{
          console.log(err)
        });
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
.prj005-dialog {
  h4 {
    color: cornflowerblue;
  }
}
</style>
