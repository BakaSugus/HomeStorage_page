<template>
  <el-header style="height: 40px;margin: 0 0 0px 0;">
    <div style="float: left;">
      <el-breadcrumb style="padding: 5px;" separator="/">
        <div v-if="type=='all'">
          <el-breadcrumb-item :to="{ path: '/storage' }">全部文件</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item,index) in list" :to="{path:'/storage?parentName='+pathList[index]+''}">{{item}}</el-breadcrumb-item>
        </div>
      </el-breadcrumb>
    </div>

    <div style="margin-bottom: 10px;float: right;margin-right: 1.25rem;display: -webkit-box;">
      <div>
        <uploader :options="options" @file-success="onFileSuccess">
          <el-tooltip effect="dark" content="上传" placement="bottom">
            <uploader-btn><i class="el-icon-upload"></i></uploader-btn>
          </el-tooltip>
          <uploader-list style="z-index: 10000;position:fixed; bottom:0; right:0;border: #000000 1px;"></uploader-list>
        </uploader>
      </div>
      <el-tooltip effect="dark" content="新增文件夹" placement="bottom">
        <button @click="createFolder" style="margin-left: 10px;" class="createFolder"><i class="el-icon-folder-add"></i></button>
      </el-tooltip>
    </div>
  </el-header>
</template>
<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        list: [],
        pathList: [],
        imgUrl: require("../assets/logo_1.png"),
        options: {
          target: '/api/upload/uploadSlice',
          testChunks: true,
          query: {
            path: ''
          }
        }
      }
    },
    computed: {
      // 这里定义上传文件时携带的参数，即表单数据
      upData: function() {
        return {
          body: this.form
        }
      }
    },
    mounted() {
      if (typeof this.$route.query.parentName != "undefined") {
        this.parentName = this.$route.query.parentName
      }
      this.options.query.path = this.parentName;
      this.list = this.parentName.split("/").filter(item => item != '');
      this.pathList[0] = "/" + this.list[0] + "/";

      for (var i = 1; i < this.list.length; i++) {
        this.pathList[i] = this.pathList[i - 1] + this.list[i] + "/";
      }
    },
    methods: {
      onFileSuccess(rootFile, file, response, chunk) {

        let form = new FormData();
        form.append("size", chunk.offset + 1);
        form.append("fileName", chunk.file.name);
        form.append("parentName", this.parentName);
        this.$axios.post("/api/upload/uploadMerge", form).then(response => {
          console.log(response);
        });
      },
      createFolder() {
        this.$prompt('请输入文件夹名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^((?!\\|\/|:|\*|\?|<|>|\||'|%).){1,8}$/,
          inputErrorMessage: '文件夹名格式不正确'
        }).then(({
          value
        }) => {
          var name;
          name = this.parentName;
          this.$axios.post('/api/disk/uploadFolder', {
            selfName: value,
            parentName: name
          }).then(responese => {
            console.log(responese)
            if (responese.data.code === 20000) {
              this.reload();
            }
          });
        });
      }
    }
  }
</script>

<style>
  .header button {
    text-align: left;
  }

  el-upload-list el-upload-list--text {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }

  .createFolder {
    display: inline-block;
    position: relative;
    padding: 4px 8px;
    font-size: 100%;
    line-height: 1.4;
    color: #666;
    border: 1px solid #666;
    cursor: pointer;
    border-radius: 2px;
    background: none;
    outline: none;
  }
</style>
