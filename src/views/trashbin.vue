<template>
  <div>
    <bannerBar></bannerBar>
    <el-container>

      <el-table :data="table">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <img :src="chooseIcon(scope.row)" style="vertical-align: middle;" />
            <span style="margin-left: 10px;">{{scope.row.originDiskFileName}}</span>
            <el-button icon="el-icon-delete" @click="delete_(scope.row)" style="float: right;" size="mini"></el-button>
          </template></el-table-column>
        <el-table-column prop="size" label="大小" width="200px">
          <template slot-scope="scope">
            {{bytesToSize(scope.row.size)}}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="200px"></el-table-column>
        <el-table-column prop="date" label="日期" width="500px">
          <template slot-scope="scope">
            {{new Date(scope.row.date)}}
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<script>
  import bannerBar from "../components/banner_bar.vue"
  import contents from "../components/List.vue"
  import footers from "../components/footer.vue"
  import {
    byteToSize,
    checkType
  } from '../../static/Utils.js'
  export default {
    components: {
      contents,

      bannerBar,
      footers
    },
    data() {
      return {
        table: [],
        text: ''
      }
    },
    mounted() {
      this.$axios.get("/api/Deletes/Deletes").then(response => {
        console.log(response.data.result.list)
        this.table = response.data.result.list;
      });
    },
    methods: {
      delete_(row) {

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete("/api/Deletes/Delete", {
            params: { // 请求参数拼接在url上
              id: row.id
            }
          }).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        })
      },
      bytesToSize(size) {
        return byteToSize(size);
      },
      chooseIcon(row) {
        if (row.isDir == 1) {
          return require("../assets/icon/Folder.png");
        } else {
          switch (row.type) {
            case "Torrent":
              return require("../assets/icon/BT.png");
              break;
            case "Picture":
              return require("../assets/icon/Picture.png");
              break;
            case "Music":
              return require("../assets/icon/Music.png");
              break;
            case "Video":
              return require("../assets/icon/Video.png");
              break;
            case "Office":
              return require("../assets/icon/Text.png");
              break;
            case "PDF":
              return require("../assets/icon/PDF.png");
              break;
            case "Common":
              return require("../assets/icon/Text.png");
              break;
            case "Software":
              return require("../assets/icon/Software.png");
              break;
          }
          return require("../assets/icon/Other.png")
        }
      },
    }
  }
</script>
<style>
</style>
