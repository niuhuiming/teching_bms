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
import StaffForm from './StaffForm.vue'
export default {
  components: { StaffForm },
  data() {
    return {
      showEditForm: false, // 是否显示编辑表单
      showAddForm: false, // 是否显示新增表单
      editFormData: {},
      keyword: "",  // 搜索时列表过滤
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
      })
    }
  },
  methods: {
    getStaffInfo() {
      // this.req({
      //   url: "/admin/staff", // 此处写不同业务对应的url，框架会自动与baseURL拼接
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
    addStaff() {
      this.showEditForm = false;
      this.showAddForm = true;
    },
    editStaff(p) {
      // 编辑时填充表单
      this.editFormData = p;
      this.showEditForm = true;
      this.showAddForm = false;
    },
    deleteStaff(p) {
      console.log('deleteStaff', p);
    },
    // 添加一个员工
    handleAddStaff(staffInfo) {
      // do something
      console.log('handleAddStaff', staffInfo);
    },
    // 编辑一个员工
    handleEditStaff(staffInfo) {
      // do something
      console.log('handleEditStaff', staffInfo);
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