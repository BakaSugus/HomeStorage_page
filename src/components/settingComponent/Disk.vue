<template>
  <div>
    <div style="margin-bottom: 50px;">
      <el-table :data="DiskList">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="文件夹名" prop="folderPath"></el-table-column>
        <el-table-column label="映射路径" prop="mapperPath"></el-table-column>

        <el-table-column label="总量">
          <template slot-scope="scope">
            <span value="">{{bytesToSize(scope.row.total)}}</span>
          </template>
        </el-table-column>

        <el-table-column label="空闲">
          <template slot-scope="scope">
            <span value="">{{bytesToSize(scope.row.free)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="已占用">
          <template slot-scope="scope">
            <span value="">{{bytesToSize(scope.row.use)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="网盘使用">
          <template slot-scope="scope">
            <span value="">{{bytesToSize(scope.row.typeUse)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        DiskList: []
      }
    },
    mounted() {
      this.get();
    },
    methods: {
      get() {
        this.$axios.get('/api/v1/admin/hard_Devices').then(responese => {
          this.DiskList = (responese.data.result);
        });
      },
      bytesToSize(bytes) {
        if (bytes === 0) return '-';
        var k = 1024, // or 1024
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
    }
  }
</script>

<style>
</style>
