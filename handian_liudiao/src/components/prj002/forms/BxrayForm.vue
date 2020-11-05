<template>
  <el-dialog title="B超" class="my-dialog bxray-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'
            >
    <el-form ref="bxrayForm" :model="bxrayForm" label-width="140px" label-position="right">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-alert v-if="check_status=='已提交'" effect="dark"
                  title="此条信息已经提交审核,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <p></p>
      <el-alert v-if="!isOwnedByUser" effect="dark"
                  title="此条信息为其他用户创建，您无法修改"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <p></p>
      <!-- <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"> -->
      <div>
        <h3>1、子宫</h3>
          <h4 class="bxray-input">a.大小：
            <el-input v-model="bxrayForm.zigong_chang" style="width:50px;" type="number" min=0></el-input>mm×
            <el-input v-model="bxrayForm.zigong_kuan" style="width:50px;" type="number" min=0></el-input>mm×
            <el-input v-model="bxrayForm.zigong_gao" style="width:50px;" type="number" min=0></el-input>mm
          </h4>
          <h4>b.畸形:
            <el-switch v-model="bxrayForm.zigong_jixing" active-text="有" inactive-text="无"></el-switch>
            <p v-show="bxrayForm.zigong_jixing">
              <el-input v-model="bxrayForm.zigong_jixing_juti" placeholder="具体为"></el-input>
            </p>
          </h4>

          <h4>c.子宫内膜厚度:
            <el-input v-model="bxrayForm.zigong_neimo" type="number" min=0></el-input>
          </h4>

          <h4>d.是否有子宫肌瘤:
            <el-switch v-model="bxrayForm.zigong_is_jiliu" active-text="有" inactive-text="无"></el-switch>
            <h5 class="bxray-input" v-show="bxrayForm.zigong_is_jiliu">最大子宫肌瘤的大小：
              <el-input v-model="bxrayForm.zigong_daxiaochang" style="width:50px;" type="number" min=0></el-input>mm×
              <el-input v-model="bxrayForm.zigong_daxiaokuan" style="width:50px;" type="number" min=0></el-input>mm×
              <el-input v-model="bxrayForm.zigong_daxiaogao" style="width:50px;" type="number" min=0></el-input>mm
            </h5>
          </h4>

          <h4>e.是否有子宫腺肌症:
          <el-switch v-model="bxrayForm.zigong_xainji" active-text="是" inactive-text="否"></el-switch>
          </h4>
      </div>

      <div>
        <h3>2、左卵巢</h3>
          <h4 class="bxray-input">大小：
            <el-input v-model="bxrayForm.zuo_chang" style="width:50px;" type="number" min=0></el-input>mm×
            <el-input v-model="bxrayForm.zuo_kuan" style="width:50px;" type="number" min=0></el-input>mm×
            <el-input v-model="bxrayForm.zuo_qianhou" style="width:50px;" type="number" min=0></el-input>mm
          </h4>

        <el-form-item label="请选择">
          左卵巢是否有直径>10mm的囊肿:<el-switch v-model="bxrayForm.zuo_nangzhong" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <h4 class="bxray-input" v-show="bxrayForm.zuo_nangzhong">左卵巢最大囊肿大小：
          <el-input v-model="bxrayForm.zuo_daxiaochang" style="width:50px;" type="number" min=0></el-input>mm×
          <el-input v-model="bxrayForm.zuo_daxiaokuan" style="width:50px;" type="number" min=0></el-input>mm
        </h4>

        <el-form-item label="形态">
            <el-radio v-model="bxrayForm.zuo_xingtai" label="正常">正常</el-radio>
            <el-radio v-model="bxrayForm.zuo_xingtai" label="PCO （窦卵泡个数≥12个）">PCO （窦卵泡个数≥12个）</el-radio>
        </el-form-item>

        <el-form-item label="窦卵泡数">
          <el-input v-model="bxrayForm.zuo_paoshu" type="number" min=0>
            <template slot="append">个</template>
          </el-input>
        </el-form-item>

      </div>

      <div>
        <h3>3、右卵巢</h3>
          <h4 class="bxray-input">大小：
            <el-input v-model="bxrayForm.you_chang" style="width:50px;" type="number" min=0></el-input>mm×
            <el-input v-model="bxrayForm.you_kuan" style="width:50px;" type="number" min=0></el-input>mm×
            <el-input v-model="bxrayForm.you_qianhou" style="width:50px;" type="number" min=0></el-input>mm
          </h4>

        <el-form-item label="请选择">
          右卵巢是否有直径>10mm的囊肿:<el-switch v-model="bxrayForm.you_nangzhong" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <h4 class="bxray-input" v-show="bxrayForm.you_nangzhong">右卵巢最大囊肿大小：
          <el-input v-model="bxrayForm.you_daxiaochang" style="width:50px;" type="number" min=0></el-input>mm×
          <el-input v-model="bxrayForm.you_daxiaokuan" style="width:50px;" type="number" min=0></el-input>mm
        </h4>

        <el-form-item label="形态">
            <el-radio v-model="bxrayForm.you_xingtai" label="正常">正常</el-radio>
            <el-radio v-model="bxrayForm.you_xingtai" label="PCO （窦卵泡个数≥12个）">PCO （窦卵泡个数≥12个）</el-radio>
        </el-form-item>

        <el-form-item label="窦卵泡数">
          <el-input v-model="bxrayForm.you_paoshu" type="number" min=0>
            <template slot="append">个</template>
          </el-input>
        </el-form-item>

      </div>

    </el-form>

      <span slot="footer">
        <el-button :disabled="check_status=='审核通过'" type="primary" v-if="exist"  @click="updateBxrayForm">确定</el-button>
        <el-button type="primary" v-else  @click="createBxrayForm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj002'
export default {
  name:'BxrayForm',
  data() {
    return {
      bxrayForm:{
        zigong_chang: '', zigong_kuan: '', zigong_gao: '',
        zigong_xingtai: true, zigong_juti: '',
        zigong_neimo: '',
        zigong_is_jiliu: false, zigong_weizhi: '', zigong_geshu: '', zigong_daxiaochang: '', zigong_daxiaokuan: '', zigong_daxiaogao: '',
        zigong_xainji: false,
        zuo_chang: '', zuo_kuan: '', zuo_qianhou: '', zuo_tiji: '',
        zuo_nangzhong: false, zuo_daxiaochang: '', zuo_daxiaokuan: '',
        zuo_xingtai: '',
        zuo_paoshu: '',
        you_chang: '', you_kuan: '', you_qianhou: '', you_tiji: '',
        you_nangzhong: false, you_daxiaochang: '', you_daxiaokuan: '',
        you_xingtai: '',
        you_paoshu: '',
        },
      dialogVisible: false,
      exist: true,
      formName:'',
      isOwnedByUser: true,
      check_status:''
    }
  },
  methods: {
    updateBxrayForm () {
      apiUpdatePatientDataForm({formData:this.bxrayForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        if (res.data.detail) {
          this.$message({message: '对不起, 您没有对该记录操作的权限',type: 'error'})
        } else {
          this.$message({message: '提交成功',type: 'success'})
        }
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch()
    },
    createBxrayForm () {
      apiCreatePatientDataForm({formData:this.bxrayForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        if (res.data.detail) {
          this.$message({message: '对不起, 您没有对该记录操作的权限',type: 'error'})
        } else {
          this.$message({message: '提交成功',type: 'success'})
        }
        this.dialogVisible = false
        this.$parent.searchPatient()
        // this.$parent.getPatients()
      })
      .catch()
    },
    resetDialog () {
      this.bxrayForm = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      console.log('B超获取到的数据',data)
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      this.check_status = data.check_status
      this.isOwnedByUser = data.isOwnedByUser
      if (!data.exist) {
        //未创建
        this.bxrayForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.bxrayForm = data.formData
      }

    })
  }

}
</script>
<style lang="scss">
.bxray-dialog {
  h4 {
    color:cornflowerblue;
    h5 {
      color:black
    }
  }
}
.bxray-input .el-input__inner {
  // margin-top: 10px;
  padding:0 5px;
}
</style>