<template>
  <div class="root">
    <div class="search">
      <el-input placeholder="输入标题进行搜索" v-model="keyword" clearable>
        <el-button slot="append" icon="el-icon-search" ></el-button>
      </el-input>
    </div>
    <div class="add">
      <el-button @click="addPolicy" type="primary">发布文件</el-button>
    </div>

    <el-table :data="policyTable" style="width: 100%">
      <el-table-column width="200" prop="date" label="政策发布时间" sortable></el-table-column>
      <el-table-column width="200" prop="title" label="政策文件标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
      <template slot-scope="scope">
        <el-button @click="editPolicy(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="deletePolicy(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>

    <PolicyForm title="新增政策" :visible.sync="showAddForm" @save="handleAddPolicy"/>
    <PolicyForm title="编辑政策" :visible.sync="showEditForm" @save="handleEditPolicy" :model="editFormData"/>
  </div>
</template>

<script>
import PolicyForm from './PolicyForm.vue'
export default {
  components: { PolicyForm },
  data() {
    return {
      showEditForm: false, // 是否显示编辑表单
      showAddForm: false, // 是否显示新增表单
      editFormData: {},
      keyword: "",  // 搜索时列表过滤
      policys: [{
          date: "2016-05-02",
          title: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        }, {
          date: "2016-05-04",
          title: "王虎",
          address: "上海市普陀区金沙江路 1517 弄",
        }, {
          date: "2016-05-01",
          title: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        }, {
          date: "2016-05-03",
          title: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
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
    addPolicy() {
      this.showEditForm = false;
      this.showAddForm = true;
    },
    editPolicy(p) {
      // 编辑时填充表单
      this.editFormData = p;
      this.showEditForm = true;
      this.showAddForm = false;
    },
    deletePolicy(p) {
      console.log('deletePolicy', p);
    },
    // 添加一个员工
    handleAddPolicy(policyInfo) {
      // do something
      console.log('handleAddPolicy', policyInfo);
    },
    // 编辑一个员工
    handleEditPolicy(policyInfo) {
      // do something
      console.log('handleEditPolicy', policyInfo);
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