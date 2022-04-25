<template>
  <div class="root">
    <div class="search">
      <el-input placeholder="请输入会议名称" v-model="keyword" clearable>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <el-table :data="meetingTable" style="width: 100%">
      <el-table-column width="200" prop="date" label="会议时间"></el-table-column>
      <el-table-column width="200" prop="title" label="会议主题"></el-table-column>
      <el-table-column width="200" prop="place" label="会议地点"></el-table-column>
      <el-table-column width="200" prop="deadline" label="最晚提交时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
      <template slot-scope="scope">
        <el-button @click="submit(scope.row)" type="text" size="small">提交</el-button>
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
      meetings: []
    };
  },
  mounted() {
    this.getMeetingInfo();
  },
  computed: {
    meetingTable() {
      return this.meetings.filter((p) => {
          return p.title.indexOf(this.keyword) !== -1;
      })
    }
  },
  methods: {
    getMeetingInfo() {
      // this.req({
      //   url: "/meeting", // 此处写不同业务对应的url，框架会自动与baseURL拼接
      //   data: {},
      //   method: "GET"
      // }).then(
      //   res => {
      //     // 请求成功后的处理
      //     console.log("res :", res);
      //   },
      //   err => {
      //     // 请求失败后的处理
      //     console.log("err :", err);
      //   }
      // );
    },
    submit(p) {
      console.log(p);
    }
  }
};
</script>

<style scoped>
.search {
  width: 50%;
}
</style>