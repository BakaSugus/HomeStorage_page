<template>
  <el-image-viewer v-if="show" :on-close="show=false" :url-list="[data]" />
</template>

<script>
  import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

  export default {
    data() {
      return {

      }
    },
    props: {
      data: '',
      show: false
    },
    watch: {
      show: function(newV, oldV) {
        
        // console.log(newV)
      },
    },
    components: {
      ElImageViewer
    }
  }
</script>

<style>
</style>
