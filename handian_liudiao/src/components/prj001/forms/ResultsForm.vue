<template>
    <el-dialog title="疗效" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="resultsForm" :model="resultsForm" label-width="auto" label-position="left">
        <el-alert v-if="is_checked=='审核通过'"
                title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                type="warning" :closable="false" show-icon>
        </el-alert>
        <el-divider v-if="is_checked=='审核通过'"></el-divider>

        <h3>近期治疗</h3>
        <el-form-item class="results-input">
            经治疗
            <el-input v-model="resultsForm.last_result" type="number" min="0"></el-input>
            天后，阴道流血停止
        </el-form-item>
        <h3>远期治疗</h3>
        <el-form-item class="results-input">
            经治疗
            <el-input v-model="resultsForm.far_result" type="number" min="0"></el-input>
            天后，月经周期恢复正常.
        </el-form-item>

    </el-form>
    <span slot="footer">
        <el-button :disabled="is_checked=='审核通过'"
                    type="primary"
                    @click="exist?updateDataForm():createDataForm()">确定</el-button>
        <el-button @click="resetDialog">取消</el-button>
    </span>

    </el-dialog>
</template>

<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj001'

export default {
    name:'Relevant',
    data () {
        return {
            resultsForm:{},//修改
            dialogVisible: false,
            exist: true,
            formName:'',
            is_checked:'',
        }
    },
    methods: {
        updateDataForm () {
            apiUpdatePatientDataForm({formData:this.resultsForm,formName:this.formName})
            .then((res)=> {
                this.resetDialog()
                this.$message({message: '提交成功',type: 'success'})
                this.dialogVisible = false
                this.$parent.searchPatient()
                // this.$parent.getPatients()
            })
            .catch()
        },
        createDataForm () {
            apiCreatePatientDataForm({formData:this.resultsForm,formName:this.formName})
            .then((res)=> {
                this.resetDialog()
                this.$message({message: '提交成功',type: 'success'})
                this.dialogVisible = false
                this.$parent.searchPatient()
                // this.$parent.getPatients()
            })
            .catch()
    },
        resetDialog () {
            this.resultsForm = {}
            return this.dialogVisible=false
        }
    },
    created() {
        this.$on("openEvent", (data)=>{
            this.dialogVisible = true
            this.exist = data.exist
            this.formName = data.formName
            this.is_checked = data.is_checked
            if (!data.exist) {
                //未创建
                /* 遗留问题 需要传person字段*/
                this.resultsForm.person = data.formData.info
                /* ********* */
                this.resultsForm.info = data.formData.info
            } else {
                //已创建(修改)
                this.resultsForm = data.formData
            }
        })
    }
}
</script>
<style lang="scss">
  .results-input  {
    .el-input__inner {
        width: 60px;
        border-radius:1px;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
    }
    .el-input {
        display: inline;
    }
  }

</style>
