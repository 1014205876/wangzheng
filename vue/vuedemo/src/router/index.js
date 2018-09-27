import Vue from 'vue'
import Router from 'vue-router'
// 引入页面路由
import Login from '@/page/login'
import Index from '@/page/index'
import News from '@/page/news'
import My from '@/page/my'

Vue.use(Router)

export default new Router({
  mode: 'history',//去除路径里面的#
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/news',
      component: News
    },
    {
      path: '/my',
      component: My
    },
  ]
})
