<template>
  <el-dialog :title="title" :visible="visible" @update:visible="handleVisibleChange" width="50%" center>
    <el-form ref="EditForm" :model="form" label-width="100px" style="width: 100%">
      <el-form-item label="会议时间">
        <el-input v-model="form.date"></el-input>
      </el-form-item>
      <el-form-item label="会议主题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="会议地点">
        <el-input v-model="form.place"></el-input>
      </el-form-item>
      <el-form-item label="最晚提交时间">
        <el-input v-model="form.deadline"></el-input>
      </el-form-item>
      <el-form-item label="提交状况">
        <el-input v-model="form.submissions"></el-input>
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
  name: "MeetingForm",
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
        date: "",
        title: "",
        place: "",
        deadline: "",
        submissions: "",
      },
    };
  },
  watch: {
    // 监听 编辑时回显表单
    model(meetingInfo) {
      this.form = { ...meetingInfo }; // 简单的浅克隆
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