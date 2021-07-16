// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css' //element-ui的css
import uploader from 'vue-simple-uploader'
import Aplayer from 'vue-aplayer'

import VueHighlightJS from 'vue-highlightjs'

// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS)

// import Highlight from './assets/highlight.js'; // 这里是你项目highlight.js所在路径

// Vue.use(Highlight);
Vue.use(uploader)
import VueCoreVideoPlayer from 'vue-core-video-player'

Vue.use(VueCoreVideoPlayer)


Vue.use(ElementUI) //使用elementUI


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.directive('title', {
  inserted: function(el, binding) {
    document.title = el.dataset.title
  }
})

import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$axios = axios

//Vue.prototype.HOST = '/api'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
