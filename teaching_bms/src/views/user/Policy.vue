<template>
  <div class="root">
    <div class="search">
      <el-input placeholder="请输入会议名称" v-model="keyword" clearable>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="policyTable" style="width: 100%">
        <el-table-column label="政策发布时间" prop="date_publish"></el-table-column>
        <el-table-column label="政策文件标题" prop="title"></el-table-column>
        <el-table-column align="right">
        <!-- <template slot="header">
            <el-input v-model="keyword" size="mini" placeholder="输入关键字搜索"/>
        </template> -->
        <template slot-scope="scope">
            <el-button size="mini" @click="download(scope.$index, scope.row)">下载</el-button>
        </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      keyword: "",
      policys: [],
    };
  },
  computed: {
    policyTable() {
      return this.policys.filter((p) => {
          return p.title.indexOf(this.keyword) !== -1;
      })
    }
  },
  methods: {
    download(index, p) {
      console.log(index, p);
    },
    getPolicyList() {
      axios(
      {
          url: 'api/getPolicyInfo',
          method: 'get',
      }
      ).then((res) => {
          this.policys=res.data.data
      }).catch((err) => {
        console.log(err);
      })
    }
  },
  mounted() {
    this.getPolicyList();
  }
};
</script>

<style scoped>
.search {
  width: 50%;
}
</style>