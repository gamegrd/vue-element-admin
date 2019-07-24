<template>
  <el-card class="box-card" style="margin-top:20px;">
    <div slot="header" class="clearfix">
      订单发布指导价
    </div>

    <div class="app-container">
      <div class="filter-container">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh:" @click="handleRefresh">
          {{ $t('tagsView.refresh') }}
        </el-button>
      </div>

      <el-table
        :data="tableData"
        border
        :row-class-name="tableRowClassName"
        style="width: 100%"
      >
        <el-table-column prop="highest" label="最高出价" width="180">
          <template slot-scope="scope"> <span>{{ scope.row.highest }}</span> </template>
        </el-table-column>
        <el-table-column prop="average" label="平均出价" width="180">
          <template slot-scope="scope"> <span>{{ scope.row.average }}</span> </template>
        </el-table-column>
        <el-table-column prop="award" label="您的出价" width="180">
          <template slot-scope="scope"> <span>{{ scope.row.award }}</span> </template>
        </el-table-column>
      </el-table>

      <el-alert
        type="error"
        title="备注：系统根据发布价格排序订单，价格越高，排序越靠前，会员优先接单。订单特别多的时候低价单会沉到底部，辅助效率可能会变差。故建议爆单的时候，适当调高价格，可提升辅助效率"
        :closable="false"
        effect="dark"
      />
    </div></el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { setSetting } from '@/api/user'
export default {
  name: 'Setting',
  data() {
    return {
      tableData: [{
        highest: 8.8,
        average: 6.6,
        award: 7.7
      }
      ],
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
    // this.loadSetting()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'success-row'
      } else if (rowIndex === 3) {
        return 'warning-row'
      }
      return 'warning-row'
    },
    handleRefresh() {
      this.tableData = [{
        highest: 1.8,
        average: 1.6,
        award: 1.7
      }]
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
  .el-table .warning-row {
    color: #F56C6C;
  }

  .el-table .success-row {
    background: #F56C6C;
  }
  .item {
    padding: 18px 0;
  }
  .box-card {
    width: 100%;
    align-content: center;
    align-self: center;
  }
</style>
