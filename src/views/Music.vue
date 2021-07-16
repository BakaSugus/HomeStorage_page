<template>
  <div>
    <bannerBar></bannerBar>
    <el-container>
      <div>
        <el-menu style="width: 300px;margin: 20px;text-align: left;" :default-active="active" class="el-menu-vertical-demo">
          <el-menu-item index="all">
            <i class="el-icon-s-unfold"></i>
            <span @click="getAllSongs()">全部歌曲</span>
          </el-menu-item>

          <el-submenu index="歌单">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>歌单</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="item in songs">
                <i class="el-icon-headset"></i>
                <span slot="title" @click="getSong(item)">{{item.name}}</span>
              </el-menu-item>
            </el-menu-item-group>

          </el-submenu>

          <el-menu-item index="createCollection">
            <i class="el-icon-circle-plus-outline"></i>
            <span @click="createCollection()">创建新歌单</span>
          </el-menu-item>
          <el-menu-item index="import">
            <i class="el-icon-coordinate"></i>
            <span @click="">导入</span>
          </el-menu-item>
          <el-menu-item index="search">
            <i class="el-icon-search"></i>
            <span @click="">搜索音乐</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div style="width: 100%;">
        <div v-if="song.length != 0&&active!='all'&&active!='import'" style="text-align: right; margin: 20px;">
          <el-button type="primary" icon="el-icon-share" size="medium">导出</el-button>
          <el-button type="primary" icon="el-icon-download" size="medium">下载</el-button>
          <el-button type="primary" icon="el-icon-delete" size="medium">删除</el-button>
        </div>

        <div>
          <aplayer style="width: 74%; margin: 0 auto;" :list="song" :music="currentMusic"></aplayer>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
  import bannerBar from "../components/banner_bar.vue"
  import footers from "../components/footer.vue"
  import aplayer from 'vue-aplayer'
  import eventHub from '../assets/EventBus.js'

  import {
    byteToSize,
    checkType
  } from '../../static/Utils.js'
  export default {
    components:{
      bannerBar,
      footers,
      aplayer
    },
    data(){
      return{
        songs:[],
        song:[],
        active:'all',
        currentMusic:{src:''},
        music:[]
      }
    },
    mounted() {
      this.getSongs();

      this.getAllSongs();

    },
    methods:{

      getAllSongs(){
        this.active='all';
        this.$axios.get("/api/Music/Music").then(response=>{
          this.song=[];
          this.song=response.data.result;
          this.currentMusic=this.song[0];
        });
      },

      getSongs(){
        this.$axios.get("/api/Music/MusicCollection").then(response=>{
          this.songs=[];
          this.songs=response.data.result;
        });
      },

      getSong(item){
        this.active=item.name;
        this.song=[];
        this.song=item.filesDTOS;
        if(this.song.length!=0){
            this.currentMusic=this.song[0];
        }
      },
      download(){

      },
      exportSongs(){

      },
      createCollection(){
        this.$prompt('请输入歌单名称', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消'
                }).then(({ value }) => {
                  let form =new FormData();
                  form.append("collectionName",value)
                  this.$axios.put("/api/Music/MusicCollection",form).then(response=>{
                    console.log(response.data.result)
                  }).catch(response=>{

                  });
                }).catch(() => {})
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

  el-menu-item{
    padding-left: 20px;
  }
</style>
