<template>
  <div>
    <bannerBar></bannerBar>
    <el-container>
      <contents></contents>
    </el-container>
  </div>
</template>

<script>
  import bannerBar from "../components/banner_bar.vue"
  import contents from "../components/User/UserData.vue"
  export default {
    components: {
      contents,
      bannerBar
    },
    data() {
      return {

      }
    },
    mounted() {

    }
  }
</script>
