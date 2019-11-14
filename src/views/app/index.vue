<template>
  <div class="downcontaner">
    <el-row :gutter="20">
      <div class="app-download">
        <el-col :span="12">
          <a class="iphone" href="http://xz.zn2c7.cn/Hp_yishaoerguo/index.html"><span />iOS版下载</a>
        </el-col>
        <el-col :span="12">
          <a class="android" href="/down/app-release.apk" target="_blank"> <span />安卓版下载 </a>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      message: ''
    }
  },

  created() {
    console.log('app created')
  },
  mounted() {
    console.log('app mounted')
  },
  destroyed() {
    console.log('app destroyed')
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
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

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

</style>
