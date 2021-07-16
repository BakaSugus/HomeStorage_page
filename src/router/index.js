import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/Login'
import register from '@/views/Register'
import main from '@/views/index'
import Setting from '@/views/Setting.vue'

import Other from '@/views/Other.vue'
import Picture from '@/views/Picture.vue'
import Document from '@/views/Doc.vue'
import Music from '@/views/Music.vue'
import Video from '@/views/VideoList.vue'

import TrashBin from '@/views/trashbin.vue'


import User from '@/views/UserData.vue'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: "history",
  routes: [{
      path: '/',
      name: 'main',
      component: main,
      meta: {
        hidden: true,
        title: "我的网盘"
      }
    }, {
      path: '/storage',
      name: 'main',
      component: main,
      meta: {
        hidden: true,
        title: "我的网盘"
      }
    },
    {
      path: '/storage/Music',
      name: 'Music',
      component: Music,
      meta: {
        hidden: true,
        title: "音乐"
      }
    },
    {
      path: '/storage/Video',
      name: 'Video',
      component: Video,
      meta: {
        hidden: true,
        title: "视频"
      }
    },
    {
      path: '/storage/Document',
      name: 'Document',
      component: Document,
      meta: {
        hidden: true,
        title: "文档"
      }
    }, {
      path: '/storage/Other',
      name: 'Other',
      component: Other,
      meta: {
        hidden: true,
        title: "其他"
      }
    },
    {
      path: '/storage/Picture',
      name: 'Picture',
      component: Picture,
      meta: {
        hidden: true,
        title: "图片"
      }
    }, {
      path: '/storage/TrashBin',
      name: 'TrashBin',
      component: TrashBin,
      meta: {
        hidden: true,
        title: "回收站"
      }
    },
    {
      path: '/User/login',
      name: login,
      component: login,
      meta: {
        hidden: true,
        title: "登陆"
      }
    },
    {
      path: '/User/register',
      name: register,
      component: register,
      meta: {
        hidden: true,
        title: "注册"
      }
    },
    {
      path: '/storage/admin',
      name: 'Setting',
      component: Setting,
      meta: {
        hidden: true,
        title: "设置"
      }
    },
    {
      path: '/storage/User/Data',
      name: 'User',
      component: User,
      meta: {
        hidden: true,
        title: "用户信息"
      }
    }
  ]
})
