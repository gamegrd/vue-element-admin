<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">
          {{ $t('register.title') }}
        </h3>
        <lang-select class="set-language" />
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          :placeholder="$t('register.username')"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="registerForm.password"
            :type="passwordType"
            :placeholder="$t('register.password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="repassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="repassword"
            v-model="repassword"
            :type="passwordType"
            :placeholder="$t('register.repassword')"
            name="repassword"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleRegister"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRegister">
              {{ $t('register.register') }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>

      <div class="title-container">
        <p class="title"> 请点击右上角 ... 选择浏览器中打开,然后点击下载按钮</p>
      </div>

    </el-form>

    <el-dialog :title="$t('register.thirdparty')" :visible.sync="showDialog">
      {{ $t('register.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>

    <div class="downcontaner">
      <el-row :gutter="20">
        <div class="app-download">
          <el-col :span="12">
            <a class="iphone" href="https://abobov.cn/E0Zx2m"><span />iOS版下载</a>
          </el-col>
          <el-col :span="12">
            <a class="android" href="/down/app-release.apk" target="_blank"> <span />安卓版下载 </a>
          </el-col>
        </div>
      </el-row>
    </div>

  </div>

</template>

<script>
import {
  validNumber
} from '@/utils/validate'
import LangSelect from '@/components/LangSelect'

import { Message } from 'element-ui'

export default {
  name: 'Register',
  components: {
    LangSelect
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validNumber(value) || (value.length < 11)) {
        callback(new Error('只能手机号注册'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('兄弟,男人怎么可以短!密码最少8位!!'))
      } else {
        callback()
      }
    }

    return {
      registerForm: {
        sharecode: '',
        username: '',
        password: ''
      },
      registerRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }]
      },
      repassword: '',
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    console.log('register created')
  },
  mounted() {
    if (this.registerForm.username === '') {
      this.$refs.username.focus()
    } else if (this.registerForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({
      shiftKey,
      key
    } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    handleLogin() {
      this.$router.push({ path: this.redirect || '/login', query: this.otherQuery })
      return true
    },
    downloadApp(device) {
      if (device === 1) {
        window.open('/down/app-release.apk')
      } else {
        window.open('/down/app-release.apk')
      }
    },
    handleRegister() {
      if (this.repassword !== this.registerForm.password) {
        Message({
          message: '两次输入密码不一样',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }

      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (undefined !== this.$route.query.sharecode) {
            this.registerForm.sharecode = this.$route.query.sharecode
          }
          this.$store.dispatch('user/register', this.registerForm)
            .then(() => {
              Message({
                message: '注册成功',
                type: 'success',
                duration: 30 * 1000
              })
              // this.$router.push({ path: this.redirect || '/login', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */

  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

        /* reset element-ui css */

        .register-container {
          .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
              background: transparent;
              border: 0px;
              -webkit-appearance: none;
              border-radius: 0px;
              padding: 12px 5px 12px 15px;
              color: $light_gray;
              height: 47px;
              caret-color: $cursor;

              &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
              }
            }
          }

          .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
          }
        }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .register-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .register-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 60px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      .set-language {
        color: #fff;
        position: absolute;
        top: 3px;
        font-size: 18px;
        right: 0px;
        cursor: pointer;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }

  .downcontaner {
      margin: 10px auto 40px auto;
      width: 400px;
      height: 400px;
      .app-download {
          margin: 40px 40px 40px 0px;
          width: 100%;
          padding: 1px;
          a.android {
              background-color: #9C0;
              color: #fff;
              span{
                background-position:0 -32px;
                }
          }
          a.iphone {
            background-color:#298cda;
            color:#fff;
          }
          a {
            line-height: 50px;
            height: 50px;
            display: block;
            padding-left: 62px;
            margin-bottom: 15px;
            background-color: #fff;
            font-size: 18px;
            border-radius: 4px;
            position: relative;
            i {font-size:14px;padding-left:10px; display:none;}
            span {
              display: block;
              height: 32px;
              width: 32px;
              position: absolute;
              left: 15px;
              top: 9px;
              background: url(https://app.fanjian.net/res/images/app/downspan.png) 0 0 no-repeat;
            }
          }
          a:hover {
              background-color: rgb(209, 241, 24)
          }
        }
    }

</style>
