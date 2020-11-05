<template>
    <el-dialog title="相关检查" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            v-if='dialogVisible'
            @close='resetDialog'>
            <!-- 这里改 -->
        <el-form ref="relevantForm" :model="relevantForm" label-width="100px" label-position="left">
            <el-alert v-if="is_checked=='审核通过'"
                    title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                    type="warning" :closable="false" show-icon>
            </el-alert>
            <el-divider v-if="is_checked=='审核通过'"></el-divider>

            <h4>1、体格检查 &nbsp;&nbsp;&nbsp;
                <el-checkbox v-for="(val, key) in mydata.bodyCheckbox"
                            v-model="relevantForm[key]"
                            :key="key" :label="val">
                </el-checkbox>
            </h4>

            <h4>2、辅助检查</h4>
                <el-form-item label="(1)辅助检查">
                    <el-checkbox v-for="(val, key) in mydata.accessoryCheckbox"
                                v-model="relevantForm[key]"
                                :key="key" :label="val">
                    </el-checkbox>
                    <el-input v-model="relevantForm.accessory_qita"></el-input>
                </el-form-item>
                <el-form-item label="(2)血红蛋白值">
                    <el-radio v-for="item in mydata.accessory_hgbRadio"
                            v-model="relevantForm.accessory_hgb_value"
                            :key="item" :label="item">
                    </el-radio>
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
            mydata:{
                'bodyCheckbox':{'body_wu':'无','menstruation_check':'妇科检查','body_check':'全身检查'},
                'accessoryCheckbox':{
                    'accessory_wu':'无',
                    'accessory_chaosheng':'超声检查',
                    'accessory_quanxuexibaojishu':'全血细胞计数',
                    'accessory_ningxue':'凝血功能检查',
                    'accessory_niaorenshen':'尿妊娠试验或血hCG检测',
                    'accessory_jichutiwen':'基础体温测定(BBT)',
                    'accessory_neifenmi':'生殖内分泌测定(激素六项、促甲状腺素水平)',
                    'accessory_zuzhi':'刮宫或子宫内膜活组织检查',
                    'accessory_gongqiangjing':'宫腔镜检查',
                    'accessory_jiejing':'宫颈粘液结晶检查',
                    },
                'accessory_hgbRadio':['>110','91-110','61-90','30-60']
            },
            relevantForm:{},
            dialogVisible: false,
            exist: true,
            formName:'',
            is_checked:'',
        }
    },
    methods: {
        updateDataForm () {
            apiUpdatePatientDataForm({formData:this.relevantForm,formName:this.formName})
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
            apiCreatePatientDataForm({formData:this.relevantForm,formName:this.formName})
            .then((res)=> {
                this.resetDialog()
                this.$message({message: '提交成功',type: 'success'})
                this.dialogVisible = false
                this.$parent.getPatients()
            })
            .catch()
    },
        resetDialog () {
            this.relevantForm = {}
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
                //创建
                /* 遗留问题 需要传person字段*/
                this.relevantForm.person = data.formData.info
                /* ********* */
                this.relevantForm.info = data.formData.info
            } else {
                //修改
                this.relevantForm = data.formData
            }
        })
    }
}
</script>
