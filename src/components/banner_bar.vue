<template>
  <div>
    <div class="status_bar">
      <el-menu :router="true" :default-active="name" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/storage">全部</el-menu-item>
        <el-menu-item index="/storage/Music">
          音乐
        </el-menu-item>
        <el-menu-item index="/storage/Video">
          视频
        </el-menu-item>
        <el-menu-item index="/storage/Document">
          文档
        </el-menu-item>
        <el-menu-item index="/storage/Picture">
          图片
        </el-menu-item>
        <el-menu-item index="/storage/Other">
          其他
        </el-menu-item>
        <el-menu-item index="/storage/TrashBin">
          回收站
        </el-menu-item>
        <el-submenu>
          <template slot="title">更多</template>
          <el-menu-item index="/storage?Driver=Default_Hidden">隐藏文件夹</el-menu-item>
          <el-menu-item index="/storage?Driver=Default_Share">共享文件夹</el-menu-item>
          <el-menu-item v-for="item in items" :index="'/storage?Driver='+item">{{item}}</el-menu-item>
        </el-submenu>
        <el-submenu style="float: right;padding: 0;margin: 0,5px,0,5px" index="User">
          <template slot="title">{{userName}}</template>
          <el-menu-item index="#" @click="driver=true"><i class="el-icon-s-flag"></i><span>添加驱动器</span>
          </el-menu-item>
          <el-menu-item v-if="isLogin" index="/User/logout"><i class="el-icon-s-flag"></i><span>退出</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

  
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userName: '',
        rememberme: '',
        name: window.location.pathname,
        items: [],
        isLogin: false,

        driver: false,
        
        driver_data:{
          
        }
      }
    },
    mounted() {
      this.getCookie();
      this.getBucketName();
    },
    methods: {
      getBucketName() {
        this.$axios.get("/api/driver/driver").then(response => {
          this.items = response.data.result;
        });
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getCookie: function() {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            if (arr2[0] == 'nickName') {
              this.userName = (arr2[1]); //cookie中的userName
              this.isLogin = true;
              return;
            }
          }
          this.$router.push("/User/login");
        } else {
          this.$router.push("/User/login");
        }
      }
    }
  }
</script>

<style>
  .status_bar {
    display: inline-block;
    width: 100%;
  }

  .status_bar i {
    margin: 0.3125rem;
  }
</style>
