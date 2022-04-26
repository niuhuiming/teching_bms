<template>
  <div>
    <el-upload :action="'none'" :auto-upload="false" ref='upload'  :on-change="onChange" :on-remove="onRemove" multiple show-file-list>
			<!-- <i class="el-icon-upload"></i> -->
			<!-- <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
      <el-button type="primary" size="medium">选择文件</el-button>
			<!-- <div class="el-upload__tip" slot="tip">只能上传doc/docx文件</div> -->
		</el-upload>
		<el-button icon="el-icon-upload" type="success" @click="submitUpload" size="medium">上传</el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    path: String,
    category: Object,
    userid: String
  },
  data() {
    return {
      //文件列表
      fileList: [],
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
      formData.append("path", this.path + this.category.title + '/');
      // 传递人员信息
      formData.append('userid', this.userid)
      formData.append('id_meeting', this.category.id_meeting)
      //url 是你提交服务器的接口
      // console.log('formData', formData);
      axios
        .post("/api/submitMeeting", formData)
        .then(() => {
          this.$message({
              showClose: true,
              message: "上传成功",
              type: "success",
            });
          // console.log("上传成功");
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
  },
  mounted() {},
};
</script>