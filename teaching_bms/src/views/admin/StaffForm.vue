<template>
  <el-dialog :title="title" :visible="visible" @update:visible="handleVisibleChange" width="50%" center>
    <el-form ref="EditForm" :model="form" label-width="60px" style="width: 100%">
      <el-form-item label="工号">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-col :span="8">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option value="男">男</el-option>
            <el-option value="女">女</el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleVisibleChange(false)">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "StaffForm",
  props: {
    // 是否显示表单
    visible: {
      type: Boolean,
      default: false,
    },
    // 弹窗的title
    title: String,
    // 回显数据
    model: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        id: "",
        name: "",
        gender: "",
        age: "",
        phone: "",
        password: "",
      },
    };
  },
  watch: {
    // 监听 编辑时回显表单
    model(staffInfo) {
      this.form = { ...staffInfo }; // 简单的浅克隆
    },
  },
  methods: {
    handleSave() {
      // 自定义事件 save
      this.$emit("save", this.form);
      this.handleVisibleChange(false);
    },
    handleVisibleChange(value) {
      this.$emit("update:visible", value);
    },
  },
};
</script>