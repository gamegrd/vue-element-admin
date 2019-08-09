<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh:" @click="handleRefresh">
        {{ $t('tagsView.refresh') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh:" @click="handleRefresh">
        一键接单
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh:" @click="handleRefresh">
        自动抢单
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="赏金" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="有效期截止" width="160" align="center">
        <template slot-scope="scope">
          {{ scope.row.deadline }}
        </template>
      </el-table-column>
      <el-table-column label="事件" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getActiveOrderList } from '@/api/order'
//  导入变量不用括号

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getActiveOrderList().then(response => {
        var arr = []
        response.items.forEach(element => {
          // element['time'] = element.addtime
          arr.push(element)
        })
        this.list = arr
        this.listLoading = false
      })
    }
  },
  handleRefresh() {
    this.fetchData()
  }
}
</script>
