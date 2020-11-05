<template>
    <el-dialog title="临床诊断" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            v-if='dialogVisible'
            @close='resetDialog'>
        <el-form ref="ccForm" :model="ccForm" label-width="auto" label-position="left">
            <el-alert v-if="is_checked=='审核通过'"
                    title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                    type="warning" :closable="false" show-icon>
            </el-alert>
            <el-divider v-if="is_checked=='审核通过'"></el-divider>

            <h3>一、中医诊断</h3>
            <h4>1、诊断结果</h4>
                <el-form-item>
                    <el-checkbox v-for="(val, key) in mydata.yuejingCheckbox"
                                v-model="ccForm[key]"
                                :key="key" :label="val">
                    </el-checkbox>
                    <el-input v-model="ccForm.yuejing_qita"></el-input>
                </el-form-item>
            <h4>2、虚证诊断</h4>
                <el-form-item>
                    <el-radio v-for="item in mydata.xuzhengRadio"
                            v-model="ccForm.xuzheng"
                            :key="item" :label="item">
                    </el-radio>
                </el-form-item>
                <el-input v-model="ccForm.qita_asthenic"></el-input>
            <h4>3、实证诊断</h4>
                <el-form-item>
                    <el-radio v-for="item in mydata.shizhengRadio"
                            v-model="ccForm.shizheng"
                            :key="item" :label="item">
                    </el-radio>
                </el-form-item>
                <el-input v-model="ccForm.qita_demonstration"></el-input>
            <h4>4、虚实夹杂诊断</h4>
                <el-form-item>
                    <el-radio v-for="item in mydata.xushiRadio"
                            v-model="ccForm.xushi"
                            :key="item" :label="item">
                    </el-radio>
                </el-form-item>
                <el-input v-model="ccForm.qita_def_ex"></el-input>
            <h3>二、西医诊断</h3>
                <el-checkbox v-model="ccForm.zigongchuxue" label="排卵障碍性异常子宫出血"></el-checkbox>
                <el-input v-model="ccForm.qita_west"></el-input>

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
            mydata:{
                'yuejingCheckbox':{
                    'yuejing_xian':'月经先期','yuejing_duo':'月经过多','yuejing_yan':'经期延长','yuejing_chu':'经间期出血','yuejing_beng':'崩漏',
                },
                'xuzhengRadio':['肾气虚证','肾阴虚证','肾阳虚证','气虚证','血虚证','虚热证','脾气虚证'],
                'shizhengRadio':['肝郁血热证','阳盛血热证','湿热证','痰湿证','肝郁气滞证','血瘀证','血寒证','实热证'],
                'xushiRadio':['阴虚血热证'],
            },
            ccForm:{},//修改
            dialogVisible: false,
            exist: true,
            formName:'',
            is_checked:'',
        }
    },
    methods: {
        updateDataForm () {
            apiUpdatePatientDataForm({formData:this.ccForm,formName:this.formName})
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
            apiCreatePatientDataForm({formData:this.ccForm,formName:this.formName})
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
            this.ccForm = {}
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
                this.ccForm.person = data.formData.info
                /* ********* */
                this.ccForm.info = data.formData.info
            } else {
                //已创建(修改)
                this.ccForm = data.formData
            }
        })
    }
}
</script>
<style scoped lang="scss">
.el-checkbox {
    margin-right: 10px
}
.el-radio {
    margin-right: 10px
}
.el-input {
    margin-top: 8px;
}
</style>