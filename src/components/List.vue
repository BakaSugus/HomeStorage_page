<template>
  <div>
    <el-header style="height: 40px;margin: 0 0 0px 0;">
      <div style="float: left;">
        <el-breadcrumb style="padding: 5px;" separator="/">
          <div>
            <el-breadcrumb-item :to="{ path: '/storage?Driver='+Driver }">全部文件</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in list" :to="{path:'/storage?parentName='+pathList[index]+'&Driver='+Driver}">{{item}}</el-breadcrumb-item>
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

    <el-main style="padding-left: 10px;padding-top: 0rem;width: 100%;">
      <el-table :data="data">
        <el-table-column label="文件名" min-width="70%">
          <template slot-scope="scope" @mousemove="">
            <img :src="getIcon(scope.row.type)" style="vertical-align: middle;" />
            <a style="color: #000000;margin-left: 5px;" @click="Open(scope.row)">{{scope.row.selfName}}</a>
          </template>
        </el-table-column>

        <el-table-column prop="size" label="大小" align="center" width="200px">
          <template slot-scope="scope">
            {{bytesToSize(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column label="创建日期" fit align="center" width="300px" max-width="300px">
          <template slot-scope="scope">
            <span value="">{{new Date(scope.row.createDate).toLocaleString()}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fit align="left" width="500" max-width="750">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button @click="deleteFile(scope.row)" size="mini" type="primary" icon="el-icon-delete"></el-button>

            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="移动" placement="top">
              <el-button v-if="(Driver=='Default'||Driver=='Default_Hidden'||Driver=='Default_Share')&&scope.row.type!='Folder'"
                @click="moveFile(scope.row)" size="mini" type="primary" icon="el-icon-position"></el-button>

            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="重命名" placement="top">
              <el-button @click="renameFile(scope.row)" size="mini" type="primary" icon="el-icon-crop"></el-button>

            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="下载" placement="top">
              <el-button v-if="scope.row.type!='Folder'" @click="Download(scope.row)" size="mini" type="primary" icon="el-icon-link"></el-button>

            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="属性" placement="top">
              <el-button v-if="Driver=='Default'||Driver=='Default_Hidden'||Driver=='Default_Share'" @click="infoFile(scope.row)"
                size="mini" type="primary" icon="el-icon-info"></el-button>

            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog :visible.sync="treeDialog">
      <el-tree :data="zip_tree"></el-tree>
    </el-dialog>
    <el-dialog width="80%" :visible.sync="textDialog">
      <TextViewer v-if="textDialog" :url="href"></TextViewer>
    </el-dialog>
    <el-dialog width="80%" :visible.sync="VideoDialog">
      <videoPlayer v-if="VideoDialog" :data="href"></videoPlayer>
    </el-dialog>
    <el-dialog width="80%" :visible.sync="OfficeDialog"></el-dialog>
    <el-dialog width="80%" :visible.sync="PDFDialog">
      <embed :src="href" type="application/pdf" internalinstanceid="81" /></el-dialog>
    <el-image-viewer v-if="image" :on-close="onClose" :url-list="[href]" />
  </div>
</template>

<script>
  import aplayer from 'vue-aplayer'
  import videoPlayer from './preview/VideoPlayer.vue'
  import ZipViewer from './preview/ZipViewer.vue'
  import TextViewer from './preview/TextViewer.vue'
  import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

  export default {
    data() {
      return {
        data: [],
        Path: "/",
        Driver: "Default",
        treeDialog: false,
        textDialog: false,
        VideoDialog: false,
        OfficeDialog: false,
        PDFDialog: false,
        image: false,

        BT: require('../assets/icon/BT.png'),
        Folder: require('../assets/icon/Folder.png'),
        Music: require('../assets/icon/Music.png'),
        Other: require('../assets/icon/Other.png'),
        Picture: require('../assets/icon/Picture.png'),
        Software: require('../assets/icon/Software.png'),
        Text: require('../assets/icon/Text.png'),
        Excel: require('../assets/icon/Excel_24_aa33358.png'),
        PDF: require('../assets/icon/PDF.png'),
        Video: require('../assets/icon/Video.png'),


        href: "",
        text_content: "",
        zip_tree: [],
        pic: '',


        list: [],
        pathList: [],
        imgUrl: require("../assets/logo_1.png"),
        options: {
          target: '/api/upload/uploadSlice',
          testChunks: true,
          query: {
            path: '',
            driver: ''
          }
        }
      }
    },
    components: {
      aplayer,
      videoPlayer,
      ZipViewer,
      TextViewer,
      ElImageViewer
    },
    created() {

    },
    props: {
      type: ""
    },
    mounted() {
      this.CheckDriver();
      this.CheckPath();
      this.CheckPassword();
      this.setConfig();
      this.get();
    },
    watch: {
      '$route'(to, from) {
        this.$router.go(0);
      }
    },
    methods: {
      setConfig() {
        this.options.query.path = this.Path;
        this.list = this.Path.split("/").filter(item => item != '');
        this.pathList[0] = "/" + this.list[0] + "/";

        for (var i = 1; i < this.list.length; i++) {
          this.pathList[i] = this.pathList[i - 1] + this.list[i] + "/";
        }
        if (this.Driver != 'Default' & this.Driver != 'Default_Hidden' & this.Driver != 'Default_Share') {
          this.options.target = this.options.target + "?Driver=" + this.Driver;
        }
        console.log(this.options.target)
      },
      deleteFile(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let form = new FormData();
          var arr = new Array();
          arr[0] = row.fid;
          form.append("id", arr);
          this.$axios.put('/api/Deletes/Delete?driver=' + this.Driver, form).then(responese => {
            if (responese.data.code == 20000) {
              this.$notify({
                title: '成功',
                message: '删除成功!',
                type: 'success'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      renameFile(row) {
        this.$prompt('请输入名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({
          value
        }) => {
          let form = new FormData();
          form.append("targetName", value);
          this.$axios.put('/api/disk/Rename/' + row.fid, form).then(responese => {
            if (responese.data.code === 20000) {
              this.reload();
            }
          });
        });
      },
      moveFile(row) {

      },
      infoFile(row) {

      },
      onClose() {
        this.image = false
      },
      bytesToSize(row) {
        if (row.type == "Folder") return "-";
        var bytes = row.size;
        if (bytes === 0) return '0 B';
        var k = 1024, // or 1024
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
      get() {

        if (this.type != "all") {
          this.$axios.get("/api/Type/" + this.type).then(response => {
            this.data = response.data.result;
          });
        } else {
          this.$axios.get('/api/disk/fileList', {
            params: {
              parentName: this.Path,
              Driver: this.Driver
            }
          }).then(response => {
            this.data = response.data.result;
          })
        }

      },
      CheckPath() {
        if (typeof this.$route.query.parentName != "undefined") {
          this.Path = this.$route.query.parentName
        } else if (typeof this.$route.query.parentName != "undefined" && this.Path != "/") {
          this.Path = this.Path + "/";
        }
      },
      CheckDriver() {
        if (typeof this.$route.query.Driver != "undefined") {
          this.Driver = this.$route.query.Driver
        }
      },
      CheckPassword(Path) {
        console.log(this.options.target)
      },
      OpenFolder(row) {
        this.$router.push({
          path: "storage",
          query: {
            parentName: row.parentName + "" + row.selfName + "/",
            Driver: this.Driver
          }
        });
      },
      getIcon(type) {
        switch (type) {
          case "Folder":
            return this.Folder;
            break;
          case "Music":
            return this.Music;
            break;
          case "Video":
            return this.Video;
            break;
          case "PDF":
            return this.PDF;
            break;
          case "Excel":
            return this.Excel;
            break;
          case "Common":
            return this.Text;
            break;
          case "Software":
            return this.Software;
            break;
          case "Picture":
            return this.Picture;
            break;
        }
      },
      OpenVideo(row) {
        this.getFile(row);
        this.VideoDialog = true;
      },
      getFile(row) {
        this.$axios.get('/api/disk/getFile', {
          params: {
            pathName: encodeURIComponent(row.parentName),
            fileName: encodeURIComponent(row.selfName),
            driver: this.Driver
          }
        }).then(responese => {
          if (responese.data.code == 20000) {
            if (responese.data.result.remote == true) {
              this.href = responese.data.result.path;
              console.log(responese.data.result.path)
            } else {
              this.href = "/api/" + responese.data.result.path;
            }
          }
        });
      },
      OpenZip(row) {

      },
      OpenText(row) {
        this.getFile(row);
        this.textDialog = true;
      },
      OpenPDF(row) {
        this.getFile(row);
        this.PDFDialog = true;
      },
      OpenPic(row) {
        this.getFile(row);
        this.image = true;
      },
      Download(row) {
        this.$axios.get('/api/disk/getFile', {
          params: {
            pathName: encodeURIComponent(row.parentName),
            fileName: encodeURIComponent(row.selfName),
            driver: this.Driver
          }
        }).then(responese => {
          if (responese.data.code == 20000) {
            if (responese.data.result.remote == true) {
              window.open(responese.data.result.path);
            } else {
              this.href = "/api/" + responese.data.result.path;
              window.open(this.href);
            }
          }
        });
      },
      Open(row) {
        switch (row.type) {
          case "Folder":
            this.OpenFolder(row);
            break;
          case "Video":
            this.OpenVideo(row);
            break;
          case "Common":
            this.OpenText(row);
            break;
          case "Picture":
            this.OpenPic(row);
            break;
          case "PDF":
            this.OpenPDF(row);
            break;
          case "RAR":
            this.OpenZip(row);
            break;
        }
      },
      onFileSuccess(rootFile, file, response, chunk) {
        let form = new FormData();
        form.append("size", chunk.offset + 1);
        form.append("fileName", chunk.file.name);
        form.append("parentName", this.Path);
        form.append("Driver", this.Driver);
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
