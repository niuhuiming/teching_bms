<template>
  <div class="root">
    <div class="search">
      <el-input placeholder="输入姓名进行搜索" v-model="keyword" clearable>
        <el-button slot="append" icon="el-icon-search" ></el-button>
      </el-input>
    </div>
    <div class="add">
      <el-button @click="addStaff" type="primary">新增人员</el-button>
    </div>

    <el-table :data="staffTable" style="width: 100%">
      <el-table-column width="200" prop="id" label="工号" sortable></el-table-column>
      <el-table-column width="200" prop="name" label="姓名"></el-table-column>
      <el-table-column width="200" prop="gender" label="性别"></el-table-column>
      <el-table-column width="200" prop="age" label="年龄"></el-table-column>
      <el-table-column width="200" prop="phone" label="电话"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
      <template slot-scope="scope">
        <el-button @click="editStaff(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="deleteStaff(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>

    <StaffForm title="新增员工" :visible.sync="showAddForm" @save="handleAddStaff"/>
    <StaffForm title="编辑员工" :visible.sync="showEditForm" @save="handleEditStaff" :model="editFormData"/>
  </div>
</template>

<script>
import StaffForm from "./StaffForm.vue";
import axios from "axios";
export default {
  components: { StaffForm },
  data() {
    return {
      showEditForm: false, // 是否显示编辑表单
      showAddForm: false, // 是否显示新增表单
      editFormData: {},
      keyword: "", // 搜索时列表过滤
      staffs: [],
    };
  },
  mounted() {
    this.getStaffInfo();
  },
  computed: {
    staffTable() {
      return this.staffs.filter((p) => {
        return p.name.indexOf(this.keyword) !== -1;
      });
    },
  },
  methods: {
    // 控制编辑和新增时表单的显示
    addStaff() {
      this.showEditForm = false;
      this.showAddForm = true;
    },
    editStaff(p) {
      this.editFormData = p;
      this.showEditForm = true;
      this.showAddForm = false;
    },
    // 获取员工列表
    getStaffInfo() {
      axios({
        url: "api/getStaffList",
        method: "get",
      }).then((res) => {
          // console.log(res.data.data);
          this.staffs = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除一个员工
    deleteStaff(p) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          axios({
            url: "api/deleteStaffInfo",
            method: "post",
            data: { id: p.id },
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
          // this.$message({
          //   type: "info",
          //   message: "已取消删除",
          // });
        });
    },
    // 添加一个员工
    handleAddStaff(staffInfo) {
      // do something
      axios({
        url: "api/addStaffInfo",
        method: "post",
        data: staffInfo,
      }).then((res) => {
          if (res.data.code) {
            this.$message({
              showClose: true,
              message: "添加完成",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 编辑一个员工
    handleEditStaff(staffInfo) {
      // do something
      // console.log("handleEditStaff", staffInfo);
      axios({
        url: "api/editStaffInfo",
        method: "post",
        data: staffInfo,
      }).then(() => {
          this.$message({
            type: "success",
            message: "已修改",
          });
          // 重新加载页面
          // this.reload()
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
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