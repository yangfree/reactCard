<template>
<div>
  <Header @headerEvent="ret=>(collapsed=ret)"></Header>
  <el-col :span="24">
    <el-form :model="changeForm" :rules="rules" ref="changeForm" label-position="left" label-width="0px"
            class="login-container">
      <h3 class="title">密码修改<i class="fa fa-key"></i></h3>
      <el-form-item prop="oldcode">
        <el-input type="password" v-model="changeForm.oldcode" auto-complete="off" placeholder="旧密码" suffix-icon="fa fa-lock"></el-input>
      </el-form-item>
      <el-form-item prop="newcode">
        <el-input type="password" v-model="changeForm.newcode" auto-complete="off" placeholder="新密码" suffix-icon="fa fa-lock"></el-input>
      </el-form-item>
      <el-form-item prop="affirmcode">
        <el-input type="password" v-model="changeForm.affirmcode" auto-complete="off" placeholder="确认密码" suffix-icon="fa fa-lock"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;border-radius:2px" @click.native.prevent="handleSubmit" :loading="logining">确认修改
        <!-- <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录 -->
        </el-button>
      </el-form-item>
      <el-divider content-position="center">
        <span style="color:rgb(94,143,189)">
          友情提示<i class="fa fa-lightbulb-o"></i>
        </span>
      </el-divider>
      <div>
          <ul>
              <li>
                  <i class="fa fa-hand-o-right" style="color:#5090C1"></i>
                  你的密码不能与其他个人信息太相似
              </li>
              <li>
                  <i class="fa fa-hand-o-right" style="color:#5090C1"></i>
                  你的密码必须包含至少 8 个字符。
              </li>
              <li>
                  <i class="fa fa-hand-o-right" style="color:#5090C1"></i>
                  你的密码不能是大家都爱用的常见密码。
              </li>
              <li>
                  <i class="fa fa-hand-o-right" style="color:#5090C1"></i>
                  你的密码不能全部为数字。
              </li>
          </ul>
      </div>
    </el-form>
  </el-col>
</div>
</template>

<script>
import Header from '@/components/common/Header'
import { apiChangePassword } from '@/api/api-common'

export default {
  name:'ChangePassword',
  components:{Header},
  data () {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (value.length < 8) {
            callback(new Error('密码必须包含至少8个字符'));
          } else {
            if ( /^[0-9]*$/.test(value) ) {
              callback(new Error('密码不能全部是数字'));
            } else {
              if (this.changeForm.affirmcode !== '') {
                this.$refs.changeForm.validateField('affirmcode');
              }
            }
          }
          callback();
        }
    };
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.changeForm.newcode) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      logining: false,
      changeForm: {
        oldcode: '',
        newcode: '',
        affirmcode:''
      },
      rules: {
        oldcode: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newcode: [
          { validator: validatePass, trigger: 'blur' }//required: true, message: '请输入新密码',
        ],
        affirmcode: [
          { validator: validatePass2, trigger: 'blur' } // required: true, message: '请重新输入新密码',
        ],
      },
    }
  },
  methods: {
    handleSubmit (ev) {
      this.$refs.changeForm.validate((valid) => {
        if (valid) {
          this.logining = true
          var params = this.changeForm
          apiChangePassword(params).then(res => {
            this.logining = false
            if (res.status !== "success") {
              const msg = res.old_password == undefined ? res : res.old_password[0]
              this.$message({message: msg,type: 'error'})
            } else {
              this.$message({message: '修改成功,请重新登录',type: 'success'})
              sessionStorage.removeItem('user')
              sessionStorage.removeItem('userinfo')
              this.$router.push({ path: '/login' })
            }
          })

        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 30px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #5090C1;
      font-weight:300;
      font-size: 20px
    }
    .footer {
      background: #5090C1;
      border-top: 2px solid #597597;
    }
  }
</style>
