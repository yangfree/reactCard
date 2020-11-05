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

    <h4>疗效评价</h4>
    <p style="color:red">经既往治疗方法治疗后，患者目前症状、体征改善情况。若患者为盆腔炎性疾病急性期或盆腔炎疾病反复发作加重期初次就诊，此项不填</p>
        <p>
            ①下腹疼痛缓解情况：
            <el-radio v-model="resultsForm.pain_xia"
                    v-for="item in radio1"
                    :key="item" :label="item">
            </el-radio>
        </p>
        <p>
            ②腰骶部疼痛缓解情况：
            <el-radio v-model="resultsForm.pain_yao"
                    v-for="item in radio1"
                    :key="item" :label="item">
            </el-radio>
        </p>
        <p>
            ③带下异常改善情况：
            <el-radio v-model="resultsForm.pain_dai"
                    v-for="item in radio2"
                    :key="item" :label="item">
            </el-radio>
        </p>
        <p>
            ④经期异常改善情况：
            <el-radio v-model="resultsForm.pain_qi"
                    v-for="item in radio3"
                    :key="item" :label="item">
            </el-radio>
        </p>
        <p>
            ⑤经量异常改善情况：
            <el-radio v-model="resultsForm.pain_liang"
                    v-for="item in radio5"
                    :key="item" :label="item">
            </el-radio>
        </p>
        <p>
            ⑥腹部体征改善情况：
            <el-radio v-model="resultsForm.pain_fu"
                    v-for="item in radio4"
                    :key="item" :label="item">
            </el-radio>
        </p>
        <p>
            ⑦盆腔体征（妇科检查）改善情况：
            <el-radio v-model="resultsForm.pain_pen"
                    v-for="item in radio4"
                    :key="item" :label="item">
            </el-radio>
        </p>

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
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj005'

export default {
    name:'Relevant',
    data () {
        return {
            radio1:['疼痛消失','疼痛明显缓解','疼痛有所缓解','疼痛未缓解或有加重'],
            radio2:['恢复正常','明显改善','有所改善','无改善'],
            radio3:['经期恢复正常','明显改善','有所改善','无改善'],
            radio5:['经量恢复正常','明显改善','有所改善','无改善'],
            radio4:['体征消失','体征明显改善','体征有所改善','体征无改善或有加重'],

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
                this.$parent.getPatients()
            })
            .catch()
        },
        createDataForm () {
            apiCreatePatientDataForm({formData:this.resultsForm,formName:this.formName})
            .then((res)=> {
                this.resetDialog()
                this.$message({message: '提交成功',type: 'success'})
                this.dialogVisible = false
                this.$parent.getPatients()
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
.prj005-dialog {
    h4 {
        color:cornflowerblue;
    }
}
</style>
