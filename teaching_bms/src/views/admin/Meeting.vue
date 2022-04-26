<template>
  <div class="root">
    <div class="search">
      <el-input placeholder="输入名称进行搜索" v-model="keyword" clearable>
        <el-button slot="append" icon="el-icon-search" ></el-button>
      </el-input>
    </div>
    <div class="add">
      <el-button @click="addMeeting" type="primary">新增会议</el-button>
    </div>

    <el-table :data="meetingTable" style="width: 100%">
      <el-table-column width="300" prop="date_meeting" label="会议时间"  sortable></el-table-column>
      <el-table-column width="200" prop="title" label="会议主题"></el-table-column>
      <el-table-column width="200" prop="place" label="会议地点"></el-table-column>
      <!-- <el-table-column width="200" prop="deadline" label="最晚提交时间"></el-table-column>
      <el-table-column width="200" prop="submissions" label="提交状况"></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="200">
      <template slot-scope="scope">
        <el-button @click="editMeeting(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="deleteMeeting(scope.row)" type="text" size="small">删除</el-button>
        <!-- <el-button @click="editMeeting(scope.row)" type="text" size="small">发布提醒</el-button>
        <el-button @click="editMeeting(scope.row)" type="text" size="small">未提交</el-button> -->
      </template>
    </el-table-column>
    </el-table>

    <MeetingForm title="新增会议" :visible.sync="showAddForm" @save="handleAddMeeting"/>
    <MeetingForm title="编辑会议" :visible.sync="showEditForm" @save="handleEditMeeting" :model="editFormData"/>
  </div>
</template>

<script>
import MeetingForm from './MeetingForm.vue'
import axios from 'axios'
export default {
  components: { MeetingForm },
  data() {
    return {
      showEditForm: false, // 是否显示编辑表单
      showAddForm: false, // 是否显示新增表单
      editFormData: {},
      keyword: "",
      meetings: [],
    };
  },
  computed: {
    meetingTable() {
      return this.meetings.filter((p) => {
          return p.title.indexOf(this.keyword) !== -1;
      })
    }
  },
  methods: {
    addMeeting() {
      this.showEditForm = false;
      this.showAddForm = true;
    },
    editMeeting(p) {
      // 编辑时填充表单
      this.editFormData = p;
      this.showEditForm = true;
      this.showAddForm = false;
    },
    deleteMeeting(p) {
      // console.log('deleteMeeting', p);
      this.$confirm("删会议吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          axios({
            url: "api/deleteMettingInfo",
            method: "post",
            data: { id: p.id_meeting, title: p.title },
          }).then(() => {
              this.$message({
                type: "success",
                message: "已删除",
              });
              // this.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加一个员工
    handleAddMeeting(meetingInfo) {
      // console.log('handleAddMeeting', meetingInfo);
      // do something
      axios({
        url: "api/addMettingInfo",
        method: "post",
        data: meetingInfo,
      }).then((res) => {
          if (res.data.code) {
            this.$message({
              showClose: true,
              message: "插入成功",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 编辑一个员工
    handleEditMeeting(meetingInfo) {
      // do something
      // console.log("handleEditStaff", staffInfo);
      axios({
        url: "api/editMettingInfo",
        method: "post",
        data: meetingInfo,
      }).then((e) => {
          if (e.data.code) {
            this.$message({
              type: "success",
              message: "已修改",
            });
          } else {
            this.$message({
              type: "error",
              message: "修改未完成",
            });
          }
          // 重新加载页面
          // this.reload()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMeetingList() {
      axios(
      {
          url: 'api/getMettingInfo',
          method: 'get',
      }
      ).then((res) => {
          // console.log(res.data.data)
          this.meetings=res.data.data
      }).catch((err) => {
        console.log(err);
      })
    }
  },
  mounted() {
    this.getMeetingList();
  }
};
</script>

<style scoped>
.search {
  width: 50%;
  display: inline-flex;
}
.add {
  width: 50%;
  float: right;
}
</style>