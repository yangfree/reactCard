<template>
  <section>
    <!--上方工具条 搜索和新增-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="search">
        <el-row>
          <el-col>
            <el-form-item v-for="(val, key, index) in search" :key="index">
              <el-input v-if="key!='check_status' && key!='owner__user_name' && key!='owner__hospital'" v-model="search[key]" :placeholder="searchName[key]"></el-input>
            </el-form-item>
            <el-form-item v-for="(val, key, index) in search" :key="'user' + index">
              <el-input v-if="(key=='owner__user_name' && is_admin) || (key=='owner__hospital' && is_admin)"
                        v-model="search[key]" :placeholder="searchName[key]"></el-input>
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
            <el-button type="primary" icon="el-icon-refresh-right" size="small" @click="getPatients">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" size="small" @click="addPatient">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-download" size="small" @click="exportFile">导出excel</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-col>

    <!-- <el-button type="btn-info" size="small" @click.native="expands">一般情况</el-button> -->

    <!--主要内容 列表-->
    <el-table :data="patientsList"
              highlight-current-row v-loading="listLoading"
              style="width: 100%;" height="500"
              :row-key="getRowKeys"
              :expand-row-keys="expands"
              @row-click='rowClick'
              >
      <!-- <el-table-column type="selection" width="55">
      </el-table-column> -->
      <el-table-column prop="index" width="40">
        <template slot="header">
          <el-button type="primary" size="mini" mini circle plain
                    @click="expand"
                    :class="expandFlag?'el-icon-caret-right':'el-icon-caret-bottom'"></el-button>
        </template>
      </el-table-column>
      <el-table-column type="index" width="40">
      </el-table-column>
      <el-table-column prop="patient_name" label="姓名" width="85">
      </el-table-column>
      <el-table-column prop="serial" label="编码" width="125">
      </el-table-column>
      <el-table-column prop="hospital_name" label="患者所属医院" width="150">
      </el-table-column>
      <el-table-column prop="address" label="住址" width="150">
      </el-table-column>
      <el-table-column prop="owner_name" label="录入人" width="90">
      </el-table-column>
      <!-- <el-table-column prop="degree_of_completion" label="信息完整度" width="90">
        <template v-slot="scope">
          <el-progress type="circle"
                      :percentage="Math.round(Number(scope.row.degree_of_completion))"
                      :width="40" :color="customColors">
          </el-progress>
        </template>
      </el-table-column> -->
      <el-table-column prop="check_status" label="数据状态" width="110">
        <template v-slot="scope">
          <el-tag v-if="scope.row.check_status=='未提交'" type="warning"
                  @click.stop="submitPatient(scope.$index, scope.row)">
                  {{scope.row.check_status}}</el-tag>
          <el-tag v-if="scope.row.check_status=='已提交'">{{scope.row.check_status}}</el-tag>
          <el-tag v-if="scope.row.check_status=='审核通过'" type="success">{{scope.row.check_status}}</el-tag>
          <el-tag v-if="scope.row.check_status=='审核不通过'" type="danger"
                  @click.stop="showReason(scope.$index, scope.row)">
                  {{scope.row.check_status}}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="数据修改" width="650"> -->
      <el-table-column label="数据修改" type="expand" width="100">
        <template v-slot="scope">
          <el-button-group>
          <el-button type="btn-info" size="small" @click="openDataForm(scope.$index, scope.row, 'info')">一般情况</el-button>
          <el-button type="btn-summary" size="small" @click="openDataForm(scope.$index, scope.row, 'summary')">病情概要</el-button>
          <el-button type="btn-history"    size="small" @click="openDataForm(scope.$index, scope.row, 'history')">专科病史</el-button>
          <el-button type="btn-relevant" size="small" @click="openDataForm(scope.$index, scope.row, 'relevant')">相关检查</el-button>
          <el-button type="btn-clinical" size="small" @click="openDataForm(scope.$index, scope.row, 'clinical')">临床诊断</el-button>
          <el-button type="btn-cure" size="small" @click="openDataForm(scope.$index, scope.row, 'cure')">治疗</el-button>
          <el-button type="btn-results" size="small" @click="openDataForm(scope.$index, scope.row, 'result')">疗效</el-button>
          </el-button-group>
          <el-button type="danger" size="mini" style="margin-left:8px"
                    v-show="!(scope.row.check_status ==='审核通过' || scope.row.check_status ==='未提交')"
                    v-if="is_admin"
                    @click="checkPatient(scope.$index, scope.row)" icon="el-icon-view" circle>
                    </el-button>
          <el-button v-show="scope.row.check_status!='审核通过'" icon="el-icon-delete" circle
                      type="danger" size="mini" style="margin-left:8px"
                      @click="delPatient(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--下方工具条-->
    <el-col :span="24" class="toolbar">
      <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
      <!-- v-on绑定的函数加括号和不加括号有区别,如果加括号要达到和不加括号的效果,需要传$event参数,然后跟函数自定义的参数 -->
      <!-- v-on绑定的内容有两种Function | Inline Statement,一旦函数名跟了() 这时Function就变成了Inline Statement-->
      <el-pagination layout="total, prev, pager, next, jumper" background
                    @current-change="pagination_flag ? handleListPagination($event,page) : handleSearchPagination($event,search_page)"
                    :page-size="10" :total="totalNum"
                    style="float:left;">
      </el-pagination>
    </el-col>

    <!-- 基本信息 dialog -->
    <InfoForm ref="info"></InfoForm>
    <!-- 病情概要 dialog -->
    <SummaryForm ref="summary"></SummaryForm>
    <!-- 患者病史 dialog -->
    <HistoryForm ref="history"></HistoryForm>
    <!-- 相关检查 dialog -->
    <RelevantForm ref="relevant"></RelevantForm>
    <!-- 临床诊断dialog -->
    <ClinicalForm ref="clinical"></ClinicalForm>
    <!-- 中西治疗 dialog -->
    <CureForm ref="cure"></CureForm>
    <!-- 疗效 dialog -->
    <ResultsForm ref="result"></ResultsForm>

    <!-- 新增信息dialog -->
    <AddPatient ref="addPatient" ></AddPatient>
    <!-- 审查dialog -->
    <CheckPatient ref="checkPatient" ></CheckPatient>
    <!-- 提交dialog -->
    <SubmitPatient ref="submitPatient" ></SubmitPatient>

  </section>
</template>

<script>
// import util from '@/common/js/util'
import { apiCheckPatient } from '@/api/api-prj005'
// axios请求,向express做请求
import {apiGetPatientsList, apiSearchPatient, apiGetPatientDataForm, apiExportFile,apiRemovePatient} from '@/api/api-prj005'
// 批量导入子组件
import {AddPatient, CheckPatient, SubmitPatient} from '@/components/prj005/forms'
import {InfoForm,SummaryForm,HistoryForm,RelevantForm,ResultsForm,ClinicalForm,CureForm} from '@/components/prj005/forms'

export default {
  name:'Table',
  components:{AddPatient,CheckPatient,SubmitPatient,InfoForm,SummaryForm,
              HistoryForm,RelevantForm,ResultsForm,ClinicalForm,CureForm},
  data () {
    return {
      expands:[],
      expandFlag:true,
      is_admin:true,
      search: {
        patient_name: '', patient_phone:'', hospital_name:'', patient_birth:'',
        owner__user_name:'', owner__hospital:'',
        check_status:''
      },
      searchName: {patient_name:'姓名',patient_phone:'电话',hospital_name:'患者所属医院',patient_birth:'出生年月',
                  owner__user_name:'医生姓名', owner__hospital:'医生所在医院'},
      patientsList: [], // 数据列表
      totalNum: 0, // 数据总条数
      page: 1, //当前页码
      search_page: 1, //搜索结果的当前页码
      listLoading: false,
      pagination_flag: true, //true表示所有数据的分页,false表示搜索数据的分页
      customColors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 50},
          {color: '#1989fa', percentage: 80},
          {color: '#5cb87a', percentage: 100}
      ],
      submitDialogVisible:false
    }
  },
  methods: {
    // 导出文件
    exportFile () {
      this.pagination_flag = false
      apiExportFile( ).then( (res) => {
        // console.log('导出路径',res.data.path)
        window.location.href = "http://" + res.data.path
      })
    },
    // 新增信息dialog
    addPatient () {
      this.$refs.addPatient.$emit("addEvent")
    },

    // 提交
    submitPatient (index, row) {
      const checkData = {
        check:row.check,// check字段是一个url
        check_status:row.check_status,
        reason_for_check:row.reason_for_check
        }
      var userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
      var isOwnedByUser = (userinfo.id == row.owner_id)
      if (isOwnedByUser) {
        this.$refs.submitPatient.$emit("submitEvent",checkData)
      } else {
        this.$message({message: '该数据不属于您，不能提交该条数据',type: 'error'})
      }
    },
    // 审核
    checkPatient (index, row) {
      const checkData = {
        check:row.check,// check字段是一个url
        check_status:row.check_status,
        reason_for_check:row.reason_for_check
        }
      this.$refs.checkPatient.$emit("checkEvent",checkData)
    },
    showReason (index, row) {
        this.$confirm(row.reason_for_check, '审核不通过原因', {
          cancelButtonText: '取消',
          confirmButtonText: '重新提交',
          type: 'warning',
          center: true,
          callback: action => {
            if (action === 'confirm'){
              var userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
              var isOwnedByUser = (userinfo.id == row.owner_id)
              if (isOwnedByUser) {
                  this.$confirm('提交后,除非审核不通过,否则将无法再修改数据！','提示',{
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning',
                    center: true,
                    callback: action =>
                    {
                      if (action === 'confirm') {
                        var checkData ={
                          check:row.check,
                          check_status:'已提交',
                          reason_for_check:row.reason_for_check }
                        apiCheckPatient(checkData)
                        .then( (res)=> {
                          this.$message({message: '提交成功',type: 'success'})
                          this.getPatients()
                        })
                      }
                    }
                  })
              } else {
                this.$message({message: '该数据不属于您，不能提交该条数据',type: 'error'})
              }

            }//if (action === 'confirm')
          }
        });
    },
    // 搜索功能
    searchPatient () {
      // console.log('搜索字段',this.search)
      let para = {
        page: this.search_page,
        search: this.search
      }
      this.pagination_flag = false
      apiSearchPatient(para).then( (res) => {
        this.patientsList = res.data.searchResults
        this.totalNum = res.data.searchResultsNum
        this.listLoading = false
      }).catch( (error)=> {
        if (error.response.status == 500) {
          this.$message({message: '登录信息已过期，请重新登录',type: 'success',showClose:true})
          this.$router.push({ path: '/login' })
        }
          console.log("错误3",error.response.status)
      } )
    },
    handleListPagination (currentPage) {
      // console.log('分页',currentPage)
      this.page = currentPage,
      this.getPatients()
    },
    handleSearchPagination (currentPage) {
      // console.log('分页',currentPage)
      this.search_page = currentPage
      this.searchPatient()
    },
    // 获取患者列表
    getPatients () {
      this.search = {patient_name: '', patient_phone:'', hospital_name:'', patient_birth:'',
                    owner__user_name:'', owner__hospital:'', check_status:''}
      let para = {page: this.page}
      this.listLoading = true
      this.expandFlag = true
      apiGetPatientsList(para).then((res) => {
        // console.log(res.data)
        this.patientsList = res.data.patientsList
        this.is_admin = res.data.is_admin
        this.totalNum = res.data.totalNum
        this.listLoading = false
      }).catch( (error)=> {
        if (error.response.status == 500) {
          this.$message({message: '登录信息已过期，请重新登录',type: 'success',showClose:true})
          this.$router.push({ path: '/login' })
        }
          console.log("错误3",error.response.status)
      } )
    },

    //核心的Form表单
    openDataForm (index, row, formName) {
      var userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
      var isOwnedByUser = (userinfo.id == row.owner_id)
      // console.log('isOwnedByUser',isOwnedByUser)
      // console.log('formName',formName)
      // 如果DataForm表未创建,不需要请求后端,直接显示空表
      if (row[formName] == null) {
        // console.log('创建流程',formName)
        // 传一个创建此DataForm的url进去,这个url是info的url
        this.$refs[formName].$emit("openEvent",
        {exist:false,isOwnedByUser:isOwnedByUser,formData:{info:row.info}, formName:formName, check_status:row.check_status } )
      } else {
      // 如果DataForm表已创建,需要请求后端,拿到数据
        // console.log('修改流程',formName)
        // 此时当前患者的DataForm已经存在
        // console.log('row[formName]',row[formName])
        let para = {page: this.page, url: row[formName]}
        apiGetPatientDataForm(para)
        .then((res)=> {
          // console.log('拿到的已创建的DataForm表',res.data)
          this.$refs[formName].$emit("openEvent",
          {exist:true, isOwnedByUser:isOwnedByUser, formData:res.data, formName:formName, check_status:row.check_status})
        })
        .catch()
      }
    },
    delPatient: function (index, row) {
      this.$confirm('此操作将永久删除该条记录, 是否继续', '提示', {type: 'warning',center: true})
      .then(() => {
        this.listLoading = true
        let para = { url: row.url }
        apiRemovePatient(para).then((res) => {
          this.listLoading = false
          if (res.data.msg) {
            this.$message({message: '您没有执行该操作的权限', type: 'error'})
          } else {
            this.$message({message: '删除成功', type: 'success'})
          }
          this.getPatients()
        })
      }).catch()
    },
    getRowKeys(row) {
      return row.serial
    },
    rowClick(row, column, event){
        Array.prototype.remove = function(val) {
          var index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        }
        // js判断元素在不在数组里，不能用item in array
        if (this.expands.indexOf(row.serial) < 0) {
          // this.expands=[];//只展开当前行，其他行收起
          this.expands.push(row.serial);
        } else {
          this.expands.remove(row.serial);
        }
    },
    expand () {
      this.expands=[]
      if (this.expandFlag) {
        for(var i=0; i < this.patientsList.length;i++) {
          this.expands.push(this.patientsList[i].serial)
        }
        this.expandFlag = !this.expandFlag
      } else {
        this.expands=[]
        this.expandFlag = !this.expandFlag
      }
    },

  },
  mounted () {
    this.getPatients()
  }
}
</script>

<style scoped>
.el-button--btn-info {
  background:#a8d8ea;
  border:1px solid #a8d8ea
}
.el-button--btn-summary {
  background:#aa96da;
  border:1px solid #aa96da
}
.el-button--btn-history {
  background:#fcbad3;
  border:1px solid #fcbad3
}
.el-button--btn-relevant {
  background:#ffffd2;
  border:1px solid #ffffd2
}
.el-button--btn-bxray {
  background:#c7f0db;
  border:1px solid #c7f0db
}
.el-button--btn-clinical {
  background:#41b6e6;
  border:1px solid #41b6e6
}
.el-button--btn-cure {
  background:#d7d1c9;
  border:1px solid #d7d1c9
}
.el-button--btn-results {
  background:#d5a4cf;
  border:1px solid #d5a4cf
}
.el-button--myinfo {
background:red;
border:1px solid red;
}
.el-tag.el-tag--danger {
  cursor: pointer;
}
.el-tag.el-tag--warning {
  cursor: pointer;
}
</style>
