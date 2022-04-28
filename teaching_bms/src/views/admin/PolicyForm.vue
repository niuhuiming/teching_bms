<template>
  <el-dialog :title="title" :visible="visible" @update:visible="handleVisibleChange" width="50%" center>
    <el-form ref="EditForm" :model="form" label-width="100px" style="width: 100%">
      <el-form-item label="政策发布时间">
        <el-date-picker v-model="form.date_publish" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="政策文件标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <template>
        <el-upload :action="'none'" :auto-upload="false" ref='upload' :on-change="onChange" :on-remove="onRemove" multiple show-file-list>
          <el-button type="primary" size="medium">选择文件</el-button>
        </el-upload>
      </template>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleVisibleChange(false)">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  name: "PolicyForm",
  props: {
    // 是否显示表单
    visible: {
      type: Boolean,
      default: false,
    },
    // 弹窗的title
    title: String,
    path: String
  },
  data() {
    return {
      // 表单数据
      form: {
        date_publish: "",
        title: ""
      },
      //文件列表
      fileList: [],
      // 日期组件
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    };
  },
  methods: {
    //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange(file, filelist) {
      //file.raw 才是真实的 file 对象
      this.fileList.push(file.raw);
    },
    //文件列表移除文件时的钩子
    onRemove(file, fileList) {
      //file.raw 才是真实的 file 对象
      this.fileList.splice(this.fileList.indexOf(file.raw), 1);
    },
    //上传文件
    submitUpload() {
      let formData = new FormData();
      // 向 formData 对象中添加文件
      this.fileList.forEach((file) => {
        formData.append("file", file);
      });
      //设置文件保存路径
      formData.append("path", this.path  + '/');
      // 传递人员信息
      formData.append('policy_title', this.form.title)
      //url 是你提交服务器的接口
      axios
        .post("/api/addPolicyFile", formData)
        .then(() => {
          console.log("上传成功");
        })
        .catch((e) => {
          this.$message({
              showClose: true,
              message: "上传失败",
              type: "danger",
            });
          console.log("上传失败", e.message);
        });
    },
    handleSave() {
      // 自定义事件 save
      this.$emit("save", this.form);
      // 上传文件
      this.submitUpload()
      this.handleVisibleChange(false);
    },
    handleVisibleChange(value) {
      this.$emit("update:visible", value);
    },
  },
};
</script>