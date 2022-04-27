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
      <el-table-column width="200" prop="date_publish" label="政策发布时间" sortable></el-table-column>
      <el-table-column width="200" prop="title" label="政策文件标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
      <template slot-scope="scope">
        <el-button @click="deletePolicy(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>

    <PolicyForm title="新增政策" path="./public/policy/" :visible.sync="showAddForm" @save="handleAddPolicy"/>
  </div>
</template>

<script>
import PolicyForm from './PolicyForm.vue'
import axios from 'axios'
export default {
  components: { PolicyForm },
  data() {
    return {
      showAddForm: false, // 是否显示新增表单
      editFormData: {},
      keyword: "",  // 搜索时列表过滤
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
    addPolicy() {
      this.showAddForm = true;
    },
    deletePolicy(p) {
      console.log('deletePolicy', p);

      this.$confirm("删政策吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          axios({
            url: "api/deletePolicyInfo",
            method: "post",
            data: { id: p.id_policy, title: p.title },
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
    handleAddPolicy(policyInfo) {
      // do something
      axios({
        url: "api/addPolicyInfo",
        method: "post",
        data: policyInfo,
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
  display: inline-flex;
}
.add {
  width: 50%;
  float: right;
}
</style>