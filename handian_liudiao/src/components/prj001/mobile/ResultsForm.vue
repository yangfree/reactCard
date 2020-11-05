<template>

    <el-form ref="resultsForm" :model="resultsForm" label-width="auto" label-position="left">
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
</template>

<script>

export default {
    name:'Relevant',
    data () {
        return {
            resultsForm:{},
        }
    },
    methods: {

    },

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
