<template>
  <div>
    <bannerBar></bannerBar>
    <el-container>
      <div>
        <el-menu style="width: 300px;margin: 20px;height: 500px;" :default-active="active" class="el-menu-vertical-demo">
          <el-menu-item index="all">
            <i class="el-icon-s-unfold"></i>
            <span @click="getAllVideos()">全部视频</span>
          </el-menu-item>

          <el-submenu index="歌单">
          <template slot="title">
            <i class="el-icon-star-on"></i>
            <span>视频列表</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="item in videos">
              <i class="el-icon-headset"></i>
              <span slot="title" @click="getVideo(item)">{{item.name}}</span>
            </el-menu-item>
          </el-menu-item-group>

        </el-submenu>

          <el-menu-item index="createCollection">
            <i class="el-icon-circle-plus-outline"></i>
            <span @click="createCollection()">创建新视频合集</span>
          </el-menu-item>
          <el-menu-item index="createCollection">
            <i class="el-icon-download"></i>
            <!-- 使用you-get下载 下载完成后调用为插件准备的文件转移接口 -->
            <span @click="createCollection()">视频下载</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div style="width: 100%" >
        <el-table :data="video">
          <el-table-column width="100px" prop="id"></el-table-column>
          <el-table-column prop="title"></el-table-column>
        </el-table>
      </div>
    </el-container>
  </div>
</template>

<script>
  import bannerBar from "../components/banner_bar.vue"
  import contents from "../components/List.vue"
  import footers from "../components/footer.vue"
  export default {
    components:{
      contents,
      bannerBar,
      footers
    },
    data(){
      return{
         active:'all',
         videos:[],
         video:[]
      }
    },
    mounted() {
      this.getAllVideos();
    },
    methods:{
      getAllVideos(){
        this.$axios.get("/api/Video/videos").then(response=>{
          this.video=[];
          // this.videos=response.data.result;
          this.video=response.data.result;
        }).catch(response=>{

        });
      },
      getVideos(){
        this.$axios.get("/api/Video/Videos").then(response=>{
          console.log(response.data);
        }).catch(response=>{

        });
      },
      getVideo(item){

      },
      createCollection(){

      }
    }
  }
</script>

<style type="text/css">
  /*
	找到html标签、body标签，和挂载的标签
	都给他们统一设置样式
*/
  html,
  body,
  #app,
  .el-container {
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }

  .status_bar {}
</style>
