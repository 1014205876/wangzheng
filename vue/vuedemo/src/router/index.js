import Vue from 'vue'
import Router from 'vue-router'
// 引入主级页面路由
import Login from '@/page/login'
import Rou from '@/page/rou'
import Apply from '@/page/apply'
import Shenqing from '@/page/shenqing'
// 引入次级页面路由
import Index from '@/page/index'
import News from '@/page/news'
import My from '@/page/my'

Vue.use(Router)

export default new Router({
  mode: 'history',//去除路径里面的#
  routes: [
    {
      path: '/',
      redirect: "/login",
      component: Login
    },
    {
      path: '/login',
      component: Login,
      meta: {
        index: 1
      },
    },
    {
      path: '/rou',
      component: Rou,
      meta: {
        index: 2
      },
      children: [
        {
          path: '/rou',
          redirect: "/rou/index",
          component: Login
        },
        {
          path: '/rou/index',
          component: Index,
          meta: {
            index: 3
          },
        },
        {
          path: '/rou/news',
          component: News,
          meta: {
            index: 4
          },
        },
        {
          path: '/rou/my',
          component: My,
          meta: {
            index: 5
          },
        },
      ],
    },
    {
      path: '/apply',
      component: Apply,
      meta: {
        index: 10
      },
    },
    {
      path: '/shenqing',
      component: Shenqing,
      meta: {
        index: 11
      },
    }
  ]
})
