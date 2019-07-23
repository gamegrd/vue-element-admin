<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">
          {{ $t('register.title') }}
        </h3>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="nickname">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="nickname"
          v-model="registerForm.nickname"
          :placeholder="$t('register.nickname')"
          name="nickname"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="qq">
        <span class="svg-container">
          <svg-icon icon-class="qq" />
        </span>
        <el-input
          ref="qq"
          v-model="registerForm.qq"
          :placeholder="$t('register.qq')"
          name="qq"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="wechat">
        <span class="svg-container">
          <svg-icon icon-class="wechat" />
        </span>
        <el-input
          ref="wechat"
          v-model="registerForm.wechat"
          :placeholder="$t('register.wechat')"
          name="wechat"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="province">
        <span class="svg-container">
          <svg-icon icon-class="edit" />
        </span>
        <el-select v-model="registerForm.province" :placeholder="$t('register.province')">
          <el-option
            v-for="item in provinces"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="paymentchannel">
        <span class="svg-container">
          <svg-icon icon-class="edit" />
        </span>
        <el-select v-model="registerForm.paymentchannel" :placeholder="$t('register.paymentchannel')">
          <el-option
            v-for="item in paymentchannels"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="paymentnumber">
        <span class="svg-container">
          <svg-icon icon-class="edit" />
        </span>
        <el-input
          ref="paymentnumber"
          v-model="registerForm.paymentnumber"
          :placeholder="$t('register.paymentnumber')"
          name="paymentnumber"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="paymentname">
        <span class="svg-container">
          <svg-icon icon-class="edit" />
        </span>
        <el-input
          ref="paymentusername"
          v-model="registerForm.paymentusername"
          :placeholder="$t('register.paymentusername')"
          name="paymentusername"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="realname">
        <span class="svg-container">
          <svg-icon icon-class="edit" />
        </span>
        <el-input
          ref="realname"
          v-model="registerForm.realname"
          :placeholder="$t('register.realname')"
          name="realname"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="invitecode">
        <span class="svg-container">
          <svg-icon icon-class="edit" />
        </span>
        <el-input
          ref="invitecode"
          v-model="registerForm.invitecode"
          :placeholder="$t('register.invitecode')"
          name="invitecode"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

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
            @keyup.enter.native="handleRegister"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRegister">
            {{ $t('register.register') }}
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
            {{ $t('register.login') }}
          </el-button>
        </el-col>
      </el-row>

    </el-form>

    <el-dialog :title="$t('register.thirdparty')" :visible.sync="showDialog">
      {{ $t('register.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import {
  validUsername, validNumber
} from '@/utils/validate'
import LangSelect from '@/components/LangSelect'

export default {
  name: 'Register',
  components: {
    LangSelect
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('老哥,输入不正确哦'))
      } else {
        callback()
      }
    }
    const validateSelect = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('至少选一个吧'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('兄弟,男人怎么可以短!!!'))
      } else {
        callback()
      }
    }
    const validateNumber = (rule, value, callback) => {
      if (!validNumber(value)) {
        callback(new Error('QQ必须为数字'))
      } else {
        callback()
      }
    }

    return {
      paymentchannels: [{
        value: 1,
        label: '支付宝'
      }, {
        value: 2,
        label: '微信'
      }],
      provinces: [{
        value: 1,
        label: '天津市'
      },
      {
        value: 2,
        label: '上海市'
      },
      {
        value: 3,
        label: '重庆市'
      },
      {
        value: 4,
        label: '河北省'
      },
      {
        value: 5,
        label: '山西省'
      },
      {
        value: 6,
        label: '辽宁省'
      },
      {
        value: 7,
        label: '吉林省'
      },
      {
        value: 8,
        label: '黑龙江省'
      },
      {
        value: 9,
        label: '江苏省'
      },
      {
        value: 10,
        label: '浙江省'
      },
      {
        value: 11,
        label: '安徽省'
      },
      {
        value: 12,
        label: '福建省'
      },
      {
        value: 13,
        label: '江西省'
      },
      {
        value: 14,
        label: '山东省'
      },
      {
        value: 15,
        label: '河南省'
      },
      {
        value: 16,
        label: '湖北省'
      },
      {
        value: 17,
        label: '湖南省'
      },
      {
        value: 18,
        label: '广东省'
      },
      {
        value: 19,
        label: '海南省'
      },
      {
        value: 20,
        label: '四川省'
      },
      {
        value: 21,
        label: '贵州省'
      },
      {
        value: 22,
        label: '云南省'
      },
      {
        value: 23,
        label: '陕西省'
      },
      {
        value: 24,
        label: '甘肃省'
      },
      {
        value: 25,
        label: '青海省'
      },
      {
        value: 26,
        label: '台湾省'
      },
      {
        value: 27,
        label: '内蒙古自治区'
      },
      {
        value: 28,
        label: '广西壮族自治区'
      },
      {
        value: 29,
        label: '西藏自治区'
      },
      {
        value: 30,
        label: '宁夏回族自治区'
      },
      {
        value: 31,
        label: '新疆维吾尔自治区'
      },
      {
        value: 32,
        label: '香港特别行政区'
      },
      {
        value: 33,
        label: '澳门特别行政区'
      },
      {
        value: 34,
        label: '北京市'
      }
      ],
      registerForm: {
        username: '',
        nickname: '',
        qq: '',
        wechat: '',
        province: '',
        paymentchannel: '',
        paymentnumber: '',
        paymentusername: '',
        realname: '',
        invitecode: '',
        password: ''
      },
      registerRules: {
        qq: [{
          required: true,
          trigger: 'blur',
          validator: validateNumber
        }],
        wechat: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        nickname: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        province: [{
          required: true,
          trigger: 'blur',
          validator: validateSelect
        }],
        paymentchannel: [{
          required: true,
          trigger: 'blur',
          validator: validateSelect
        }],
        paymentnumber: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        paymentusername: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        invitecode: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        realname: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
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
      this.$router.push({
        path: '/login'
      })
      return true
    },

    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/register', this.registerForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
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
</style>
