<template>
  <div>
    <vue-core-video-player :src="data"></vue-core-video-player>
  </div>
</template>

<script>
  import 'video.js/dist/video-js.css'
  import {
    videoPlayer
  } from 'vue-video-player'

  export default {
    data() {
      return {

      }
    },
    props: {
      data: ""
    },
    components: {
      videoPlayer
    },
    watch: {
      data: function(newV, oldV) {
        console.log("wathch:" + newV)
      }
    }
  }
</script>

<style>
</style>
