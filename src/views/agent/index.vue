<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-alert
        v-for="(item) in tips"
        :key="item"
        :title="item"
        type="success"
        effect="dark"
        :closable="false"
      />
      <el-alert
        :title="shareCode | shareCodeFilter "
        type="error"
        effect="dark"
        :closable="false"
      />
    </el-card>

    <div class="filter-container">
      <el-input v-model="listQuery.username" :placeholder="$t('user.name')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.level" :placeholder="$t('user.level')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.user__is_active" :placeholder="$t('user.is_active')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.ordering" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        {{ $t('table.export') }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.name')" width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user.username }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.level')" width="50px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.level" class="link-type" @click="handleFetchPoint(row.pageviews)">{{ row.level }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.date')" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user.date_joined }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.sharecode')" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sharecode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.is_active')" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.user.is_active | activeFilter ">
            {{ row.user.is_active | boolFilter }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { getChildren, getParent } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'true', display_name: '已激活' },
  { key: 'false', display_name: '未激活' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ChildrenTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    activeFilter(active) {
      const activeMap = {
        'true': 'success',
        'false': 'danger'
      }
      return activeMap[active]
    },
    shareCodeFilter: function(value) {
      return '我的推荐码: ' + value
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    },
    boolFilter(active) {
      if (active) {
        return '已激活'
      }
      return '未激活'
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      shareCode: '',
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        level: undefined,
        username: undefined,
        user__is_active: undefined,
        ordering: '-id'
      },
      importanceOptions: [1, 2, 3],
      tips: [
        '推荐好友注册并下单成功后，返平台利润的10%-50%/单！ ',
        '推荐好友下单数大于一万单，可联系客服申请合伙人，享受平台最高级别奖励分润特权以及全网最低下单价。',
        '平台长期招募推广代理，欢迎有志之士加入。有疑问请联系客户经理微信：Debug_Man'
      ],
      calendarTypeOptions,
      sortOptions: [{ label: '编号排序', key: 'id' }, { label: '编号倒序', key: '-id' }],
      statusOptions: ['true', 'false'],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getChildren(this.listQuery).then(response => {
        this.list = response.items
        this.total = response.total
        this.listLoading = false
      })
      getParent().then(response => {
        this.shareCode = response.sharecode
      })

      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
    },

    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.ordering = 'id'
      } else {
        this.listQuery.ordering = '-id'
      }
      this.handleFilter()
    },
    handleFetchPoint(row) {
      this.$notify({
        title: '提示',
        message: '暂时还无法升级',
        type: 'warning',
        duration: 2000
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style>
.text-danger {
    margin: 20px 0;
    color: #ed5565;
}
</style>
