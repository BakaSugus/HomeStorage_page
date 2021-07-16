<template>
  <pre class='hljs' v-highlightjs="content"><code class="java"></code></pre>
</template>

<script>
  import 'highlight.js/styles/atom-one-dark.css';
  export default {
    data() {
      return {
        content: ''
      }
    },
    props: {
      url: ''
    },
    watch: {
      url: function(newV, oldV) {
        this.$axios.get(newV).then(response => {
          this.content = response.data;
        })
      }
    }
  }
</script>

<style>
</style>
