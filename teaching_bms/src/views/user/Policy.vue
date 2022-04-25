<template>
  <div class="root">
    <div class="search">
      <el-input placeholder="请输入会议名称" v-model="keyword" clearable>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="policyTable" style="width: 100%">
        <el-table-column label="政策发布时间" prop="date"></el-table-column>
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
export default {
  data() {
    return {
      keyword: "",
      policys: [{
          date: "2016-05-02",
          title: "王小虎",
        }, {
          date: "2016-05-04",
          title: "王小",
        }, {
          date: "2016-05-01",
          title: "王",
        }, {
          date: "2016-05-03",
          title: "虎",
        },
      ],
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
    }
  },
};
</script>

<style scoped>
.search {
  width: 50%;
}
</style>