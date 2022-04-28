<template>
  <div class="root">
    <div class="search">
      <el-input placeholder="请输入会议名称" v-model="keyword" clearable>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <el-table :data="meetingTable" style="width: 100%">
      <el-table-column width="200" prop="date_meeting" label="会议时间"></el-table-column>
      <el-table-column width="200" prop="title" label="会议主题"></el-table-column>
      <el-table-column width="200" prop="place" label="会议地点"></el-table-column>
      <!-- <el-table-column width="200" prop="deadline" label="最晚提交时间"></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="250">
      <template slot-scope="scope">
        <!-- <el-button @click="submit(scope.row)" type="text" size="small">提交</el-button> -->
        <uploadFile :path="path" :category="scope.row" :userid="userid" :url="url"></uploadFile>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import uploadFile  from './uploadFile.vue'
export default {
  data() {
    return {
      keyword: "",
      meetings: [],
      // 设置文件上传到服务器的位置，比如服务器下有 public 目录， 你可以在这里写 ./public/
      path:'./public/meeting/',
      url:'/api/submitMeeting',
      category: {},
      userid: ''
    };
  },
  mounted() {
    this.getMyMeeting();
    this.userid = localStorage.getItem('id')
  },
  computed: {
    meetingTable() {
      return this.meetings.filter((p) => {
          return p.title.indexOf(this.keyword) !== -1;
      })
    }
  },
  methods: {
    getMyMeeting() {
      axios(
      {
          url: 'api/getMyMeetingInfo',
          method: 'post',
          data: {
            id: localStorage.getItem('id')
          }
      }
      ).then((res) => {
          if (res.data.data) {
            this.meetings = res.data.data;
          }
      }).catch((err) => {
        console.log(err);
      })
    },
  },
  components:{
			uploadFile
		},
};
</script>

<style scoped>
.search {
  width: 50%;
}
</style>