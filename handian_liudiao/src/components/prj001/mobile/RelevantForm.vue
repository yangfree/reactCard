<template>
        <el-form ref="relevantForm" :model="relevantForm" label-width="100px" label-position="left">

            <p class="form-label">1、体格检查</p>
                <el-checkbox v-for="(val, key) in mydata.bodyCheckbox"
                            v-model="relevantForm[key]"
                            :key="key" :label="val">
                </el-checkbox>

            <p class="form-label">2、辅助检查</p>
                <p>(1)辅助检查</p>
                    <el-checkbox v-for="(val, key) in mydata.accessoryCheckbox"
                                v-model="relevantForm[key]"
                                :key="key" :label="val">
                    </el-checkbox>
                    <el-input v-model="relevantForm.accessory_qita"></el-input>
                <p>(2)血红蛋白值</p>
                    <el-radio v-for="item in mydata.accessory_hgbRadio"
                            v-model="relevantForm.accessory_hgb_value"
                            :key="item" :label="item">
                    </el-radio>
        </el-form>
</template>

<script>

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
        }
    },
    methods: {
    },
}
</script>
<style lang="scss" scoped>
.form-label {
    margin-block-start: 0.5em;
    color:cornflowerblue;
    font-weight: 600;
}
.el-radio, .el-radio__input {
    white-space:normal
}
</style>