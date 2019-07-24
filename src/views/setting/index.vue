<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="24">
      <div>
        <el-card class="box-card" style="margin-top:20px;">
          <div slot="header" class="clearfix">
            API下单价设置
          </div>
          <div class="text item">
            <el-alert
              title="注意：（需要提升API辅助效率的可提高发布佣金）"
              type="error"
              effect="dark"
              :closable="false"
            />
            <div class="item">
              <el-form ref="brokerageForm" v-loading="listLoading" :model="brokerageForm" :inline="true" label-width="180px" class="demo-ruleForm">
                <el-form-item
                  label="API发布默认佣金(元)"
                  prop="award"
                  :rules="[
                    { required: true, message: '佣金不能为空'}
                  ]"
                >
                  <el-input v-model="brokerageForm.award" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('brokerageForm')">提交</el-button>
                  <el-button @click="resetForm('brokerageForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>

            <el-alert
              title="小技巧：系统根据发布价格排序订单，价格越高，排序越靠前，会员优先接单。订单特别多的时候低价单会沉到底部，辅助效率可能会变差。故建议爆单的时候，适当调高价格，可提升辅助效率"
              type="success"
              effect="dark"
              :closable="false"
            />
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import { mapGetters } from 'vuex'
import { getSetting, setSetting } from '@/api/user'
export default {
  name: 'Setting',
  data() {
    return {
      listLoading: true,
      brokerageForm: {
        award: ''
      },
      query: {
        key: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'brokerage.award'
    ])
  },
  created() {
    this.loadSetting()
  },
  methods: {
    loadSetting() {
      this.listLoading = true
      getSetting(this.listQuery).then(response => {
        this.brokerageForm.award = response.data.award
        this.listLoading = false
      }).catch(function(error) {
        console.log(error)
        this.listLoading = false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.listLoading = true
          setSetting(this.brokerageForm).then(response => {
            this.listLoading = false
            this.brokerageForm.award = response.data.award
            this.$message({
              message: '设置成功',
              type: 'success'
            })
          })
        } else {
          this.$message({
            message: '设置失败',
            type: 'error'
          })
          this.listLoading = false
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 666px;
    align-content: center;
    align-self: center;
  }
</style>
