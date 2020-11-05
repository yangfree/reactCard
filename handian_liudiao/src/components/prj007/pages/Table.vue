<template>
  <section>
    <!--上方工具条 搜索和新增-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="search">
        <el-row>
          <el-col>
            <el-form-item v-for="(val, key, index) in search" :key="index">
              <el-input v-model="search[key]" :placeholder="searchName[key]"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="search.check_status" placeholder="查询数据状态">
                <el-option value="未提交" label="未提交"></el-option>
                <el-option value="已提交" label="已提交"></el-option>
                <el-option value="审核通过" label="审核通过"></el-option>
                <el-option value="审核不通过" label="审核不通过"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="searchPatient">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-refresh-right"
              size="small"
              @click="getPatients"
            >重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" size="small" @click="addPatient">新增</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-download"
              size="small"
              @click="exportFile"
            >导出excel</el-button>
          </el-form-item>-->
        </el-row>
      </el-form>
    </el-col>

    <!--主要内容 列表-->
    <el-table
      :data="patientsList"
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;"
      height="500"
      :row-key="getRowKeys"
      :expand-row-keys="expands"
    >
      <!-- <el-table-column prop="index" width="40">
        <template slot="header">
          <el-button
            type="primary"
            size="mini"
            mini
            circle
            plain
            @click="expand"
            :class="expandFlag?'el-icon-caret-right':'el-icon-caret-bottom'"
          ></el-button>
        </template>
      </el-table-column>-->
      <el-table-column type="index" width="40"></el-table-column>
      <el-table-column prop="a001" label="姓名" width="120"></el-table-column>
      <el-table-column prop="serial" label="编码" width="150"></el-table-column>
      <el-table-column prop="a003" label="患者所属医院" width="200"></el-table-column>
      <el-table-column prop="owner_name" label="录入人" width="120"></el-table-column>
      <el-table-column prop="check_status" label="数据状态" fixed="right" width="450">
        <template v-slot="scope">
          <!-- <el-tag
            v-if="scope.row.check_status=='未提交'"
            type="warning"
            @click.stop="submitPatient(scope.$index, scope.row)"
          >{{scope.row.check_status}}</el-tag>
          <el-tag v-if="scope.row.check_status=='已提交'">{{scope.row.check_status}}</el-tag>
          <el-tag v-if="scope.row.check_status=='审核通过'" type="success">{{scope.row.check_status}}</el-tag>
          <el-tag
            v-if="scope.row.check_status=='审核不通过'"
            type="danger"
            @click.stop="showReason(scope.$index, scope.row)"
          >{{scope.row.check_status}}</el-tag>-->

          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="primary "
            size="mini"
          >开始答题</el-button>
          <el-button
            @click.native.prevent="updatePatient(scope.row)"
            type="primary "
            size="mini"
          >修改</el-button>
          <!-- 状态按钮始终显示一个 -->
          <template>
            <el-button
              v-if="scope.row.check_status=='未提交'"
              @click.stop="submitPatient(scope.$index, scope.row)"
              type="warning"
              size="mini"
            >{{scope.row.check_status}}</el-button>
            <el-button
              v-if="scope.row.check_status=='已提交'"
              type="primary "
              size="mini"
            >{{scope.row.check_status}}</el-button>
            <el-button
              v-if="scope.row.check_status=='审核通过'"
              type="success"
              size="mini"
            >{{scope.row.check_status}}</el-button>
            <el-button
              v-if="scope.row.check_status=='审核不通过'"
              @click.stop="showReason(scope.$index, scope.row)"
              type="danger"
              size="mini"
            >{{scope.row.check_status}}</el-button>
          </template>

          <el-button
            @click.native.prevent="checkPatient(scope.$index, scope.row)"
            type="primary "
            size="mini"
            :disabled="(scope.row.check_status ==='审核通过' || scope.row.check_status ==='未提交')"
          >审核</el-button>
          <el-button
            @click.native.prevent="delPatient(scope.$index, scope.row)"
            type="danger"
            size="mini"
          >删除</el-button>
        </template>
      </el-table-column>

      <!-- <el-table-column label="数据修改" type="expand">
        <template v-slot="scope">
          <el-button-group>
            <el-button
              v-for="(item, index) in btnGroup"
              :type="item.componentClass"
              size="small"
              @click="openDataForm(scope.$index, scope.row, item.componentName)"
              :key="index"
            >{{item.componentText}}</el-button>
          </el-button-group>
          <el-button
            type="danger"
            size="mini"
            style="margin-left:8px"
            v-show="!(scope.row.check_status ==='审核通过' || scope.row.check_status ==='未提交')"
            v-if="is_admin"
            @click="checkPatient(scope.$index, scope.row)"
            icon="el-icon-view"
            circle
          ></el-button>
          <el-button
            v-show="scope.row.check_status!='审核通过'"
            icon="el-icon-delete"
            circle
            type="danger"
            size="mini"
            style="margin-left:8px"
            @click="delPatient(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>-->
    </el-table>

    <!--翻页工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="total, prev, pager, next, jumper"
        background
        @current-change="pagination_flag ? handleListPagination($event,page) : handleSearchPagination($event,search_page)"
        :page-size="10"
        :total="totalNum"
        style="float:left;"
      ></el-pagination>
    </el-col>

    <!-- 新增信息 -->
    <AddPatient ref="addPatient"></AddPatient>
    <!-- 审查 -->
    <CheckPatient ref="checkPatient"></CheckPatient>
    <!-- 提交 -->
    <SubmitPatient ref="submitPatient"></SubmitPatient>
  </section>
</template>

<script>
// axios请求,向express做请求
// <!-- 基本信息 dialog -->
// <InfoForm ref="info"></InfoForm>
// <!-- 认知及治疗意愿调查 -->
// <SurveyForm ref="survey"></SurveyForm>
// <!-- 月经史 -->
// <MenstrualHistory ref="menstrual"></MenstrualHistory>
// <!-- 婚育史 -->
// <MarryHistory ref="marry"></MarryHistory>
// <!-- 既往史 -->
// <SummaryForm ref="history"></SummaryForm>
// <!-- 家族史 -->
// <FamilyHistory ref="family"></FamilyHistory>
// <!-- 个人生活习惯 -->
// <PersonelLife ref="habit"></PersonelLife>
// <!-- 临床症状 -->
// <RelevantForm ref="clinical"></RelevantForm>
// <!-- 诊断情况 -->
// <ClinicalForm ref="diagnosis"></ClinicalForm>
// <!-- 既往治疗情况 -->
// <CureForm ref="cure_history"></CureForm>
// <!-- 辅助检查 -->
// <ResultsForm ref="examination"></ResultsForm>
// <!-- 本次治疗情况 -->
// <CureStreatmentForm ref="cure"></CureStreatmentForm>
// <!-- 新增信息 -->
// <AddPatient ref="addPatient"></AddPatient>
// <!-- 审查 -->
// <CheckPatient ref="checkPatient"></CheckPatient>
// <!-- 提交 -->
// <SubmitPatient ref="submitPatient"></SubmitPatient>
import {
  apiCheckPatient,
  apiGetPatientsList,
  apiGetPatientDataForm,
  apiSearchPatient,
  apiRemovePatient,
  // apiExportFile,
} from "@/api/api-prj007";

// 导入功能组件
import {
  AddPatient,
  CheckPatient,
  SubmitPatient,
} from "@/components/prj007/forms";

// 导入表单组件
// import {
//   InfoForm,
//   MenstrualHistory,
//   MarryHistory,
//   SummaryForm,
//   PersonelLife,
//   RelevantForm,
//   ResultsForm,
//   ClinicalForm,
//   CureForm,
//   FamilyHistory,
//   CureStreatmentForm,
//   SurveyForm,
// } from "@/components/prj006/forms";

export default {
  name: "Table",
  components: {
    AddPatient,
    CheckPatient,
    SubmitPatient,
    // InfoForm,
    // SummaryForm,
    // PersonelLife,
    // RelevantForm,
    // ResultsForm,
    // ClinicalForm,
    // CureForm,
    // MenstrualHistory,
    // MarryHistory,
    // FamilyHistory,
    // CureStreatmentForm,
    // SurveyForm,
  },
  data() {
    return {
      expands: [],
      expandFlag: true,
      is_admin: true,
      search: {
        a001: "",
        a002: "",
        a003: "",
        a005: "",
        a006: "",
        a010: "",
        serial: "",
        check_status: "",
      },
      searchName: {
        a001: "姓名",
        a002: "患者就诊日期",
        a003: "患者所属医院",
        a005: "电话",
        a006: "专家姓名",
        a010: "出生年月",
        serial: "请输入问卷编码",
        check_status: "",
      },
      patientsList: [], // 数据列表
      totalNum: 0, // 数据总条数
      page: 1, //当前页码
      search_page: 1, //搜索结果的当前页码
      listLoading: false,
      pagination_flag: true, //true表示所有数据的分页,false表示搜索数据的分页
      // customColors: [
      //   { color: "#f56c6c", percentage: 20 },
      //   { color: "#e6a23c", percentage: 50 },
      //   { color: "#1989fa", percentage: 80 },
      //   { color: "#5cb87a", percentage: 100 },
      // ],
      // submitDialogVisible: false,
      // btnGroup: [
      //   {
      //     componentName: "info",
      //     componentClass: "btn-info",
      //     componentText: "一般资料",
      //   },
      //   {
      //     componentName: "survey",
      //     componentClass: "btn-survey",
      //     componentText: "认知及治疗意愿调查",
      //   },
      //   {
      //     componentName: "menstrual",
      //     componentClass: "btn-menstrual",
      //     componentText: "月经史",
      //   },
      //   {
      //     componentName: "marry",
      //     componentClass: "btn-married",
      //     componentText: "婚育史",
      //   },
      //   {
      //     componentName: "history",
      //     componentClass: "btn-summary",
      //     componentText: "既往史",
      //   },
      //   {
      //     componentName: "family",
      //     componentClass: "btn-family",
      //     componentText: "家族史",
      //   },
      //   {
      //     componentName: "habit",
      //     componentClass: "btn-history",
      //     componentText: "个人生活习惯",
      //   },
      //   {
      //     componentName: "clinical",
      //     componentClass: "btn-relevant",
      //     componentText: "临床症状",
      //   },
      //   {
      //     componentName: "diagnosis",
      //     componentClass: "btn-clinical",
      //     componentText: "诊断情况",
      //   },
      //   {
      //     componentName: "cure_history",
      //     componentClass: "btn-cure",
      //     componentText: "既往治疗情况",
      //   },
      //   {
      //     componentName: "examination",
      //     componentClass: "btn-results",
      //     componentText: "辅助检查",
      //   },
      //   {
      //     componentName: "cure",
      //     componentClass: "btn-cures",
      //     componentText: "本次治疗情况",
      //   },
      // ],
    };
  },
  mounted() {
    this.getPatients();
  },
  methods: {
    // 导出文件
    // exportFile() {
    //   this.pagination_flag = false;
    //   apiExportFile().then(res => {
    //     // console.log('导出路径',res.data.path)
    //     window.location.href = "http://" + res.data.path;
    //   });
    // },
    // 新增信息dialog
    addPatient() {
      this.$refs.addPatient.$emit("addEvent");
    },
    updatePatient(val) {
      this.$refs.addPatient.$emit("updateEvent", val)
    },
    // 提交
    submitPatient(index, row) {
      const checkData = {
        _id: row.id,
        check_status: row.check_status,
        reason_for_check: row.reason_for_check,
      };
      var userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
      var isOwnedByUser = userinfo.id == row.owner_id;
      if (isOwnedByUser) {
        this.$refs.submitPatient.$emit("submitEvent", checkData);
      } else {
        this.$message({
          message: "该数据不属于您，不能提交该条数据",
          type: "error",
        });
      }
    },
    // 审核
    checkPatient(index, row) {
      const checkData = {
        _id: row.id,
        check_status: row.check_status,
        reason_for_check: row.reason_for_check,
      };
      this.$refs.checkPatient.$emit("checkEvent", checkData);
    },
    // 审核不通过
    showReason(index, row) {
      this.$confirm(row.reason_for_check, "审核不通过原因", {
        cancelButtonText: "取消",
        confirmButtonText: "重新提交",
        type: "warning",
        center: true,
        callback: (action) => {
          if (action === "confirm") {
            var userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
            var isOwnedByUser = userinfo.id == row.owner_id;
            if (isOwnedByUser) {
              this.$confirm(
                "提交后,除非审核不通过,否则将无法再修改数据！",
                "提示",
                {
                  cancelButtonText: "取消",
                  confirmButtonText: "确定",
                  type: "warning",
                  center: true,
                  callback: (action) => {
                    if (action === "confirm") {
                      var checkData = {
                        _id: row.id,
                        check_status: "已提交",
                        reason_for_check: row.reason_for_check,
                      };
                      apiCheckPatient(checkData).then((res) => {
                        this.$message({ message: "提交成功", type: "success" });
                        this.getPatients();
                      });
                    }
                  },
                }
              );
            } else {
              this.$message({
                message: "该数据不属于您，不能提交该条数据",
                type: "error",
              });
            }
          } //if (action === 'confirm')
        },
      });
    },
    // 搜索功能
    searchPatient() {
      this.pagination_flag = false;
      apiSearchPatient({ page: this.search_page, ...this.search })
        .then((res) => {
          this.patientsList = res.searchResults;
          this.totalNum = res.searchResultsNum;
          this.listLoading = false;
        })
        .catch((error) => {
          if (error.response.status == 500) {
            this.$message({
              message: "登录信息已过期，请重新登录",
              type: "success",
              showClose: true,
            });
            this.$router.push({ path: "/login" });
          }
          console.log("错误3", error.response.status);
        });
    },
    // 点击分页
    handleListPagination(currentPage) {
      // console.log('分页',currentPage)
      (this.page = currentPage), this.getPatients();
    },
    // 搜索分页
    handleSearchPagination(currentPage) {
      // console.log('分页',currentPage)
      this.search_page = currentPage;
      this.searchPatient();
    },
    // 获取患者列表
    getPatients() {
      this.search = {
        a001: "",
        a002: "",
        a003: "",
        a005: "",
        a006: "",
        a010: "",
        serial: "",
        check_status: "",
      };
      let para = { page: this.page };
      this.listLoading = true;
      this.expandFlag = true;
      apiGetPatientsList(para)
        .then((res) => {
          this.patientsList = res.patientsList;
          this.is_admin = res.is_admin;
          this.totalNum = res.totalNum;
          this.listLoading = false;
          // console.log('prj007返回列表',res);
        })
        .catch((error) => {
          this.$message({
            message: "请求错误",
            showClose: true,
          });
          // this.$router.push({ path: "/login" });
          console.log("错误3", error);
        });
    },
    // 打开对应的表单页面
    // openDataForm(index, row, formName) {
    //   // console.log(index, row, formName);
    //   apiGetPatientDataForm({
    //     _id: row.id,
    //     formName,
    //   })
    //     .then((res) => {
    //       const userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    //       // console.log("userInfo", userinfo);
    //       const isOwnedByUser =
    //         userinfo.id == row.owner_id || row.owner_name === "项目六患者";
    //       this.$refs[formName].$emit("openEvent", {
    //         result: res,
    //         isOwnedByUser: isOwnedByUser,
    //         formName: formName,
    //         _id: row.id,
    //         check_status: row.check_status,
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // 删除问卷
    delPatient: function (index, row) {
      this.$confirm("此操作将永久删除该条记录, 是否继续", "提示", {
        type: "warning",
        center: true,
      })
        .then(() => {
          this.listLoading = true;
          let pid = {
            _id: row.id,
          };
          apiRemovePatient({ data: pid }).then((res) => {
            this.listLoading = false;
            if (res.status === 200) {
              this.$message({ message: "删除成功", type: "success" });
            } else {
              this.$message({ message: res.msg, type: "error" });
            }
            this.getPatients();
          });
        })
        .catch(() => {
          console.log("删除报错或者取消");
        });
    },
    // 绑定行数据的key,用来优化table的渲染
    getRowKeys(row) {
      return row.serial;
    },
    // // table每行点击触发的显示隐藏底下表单按钮
    // rowClick(row, column, event) {
    //   Array.prototype.remove = function (val) {
    //     var index = this.indexOf(val);
    //     if (index > -1) {
    //       this.splice(index, 1);
    //     }
    //   };
    //   // js判断元素在不在数组里，不能用item in array
    //   if (this.expands.indexOf(row.serial) < 0) {
    //     // this.expands=[];//只展开当前行，其他行收起
    //     this.expands.push(row.serial);
    //   } else {
    //     this.expands.remove(row.serial);
    //   }
    // },
    // //可以通过该属性设置Table目前的展开行，需要设置row-key属性才能使用，该属性为展开行的keys数组。
    // expand() {
    //   this.expands = [];
    //   if (this.expandFlag) {
    //     for (var i = 0; i < this.patientsList.length; i++) {
    //       this.expands.push(this.patientsList[i].serial);
    //     }
    //     this.expandFlag = !this.expandFlag;
    //   } else {
    //     this.expands = [];
    //     this.expandFlag = !this.expandFlag;
    //   }
    // },
  },
};
</script>
