<template>
        <el-form ref="ccForm" :model="ccForm"
                class="mobile" label-width="auto" label-position="left">
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
</template>

<script>
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