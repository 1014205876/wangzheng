import Vue from 'vue'
import Router from 'vue-router'
// 引入主级页面路由
import Login from '@/page/login'
import Rou from '@/page/rou'
import Apply from '@/page/apply'
import Shenqing from '@/page/shenqing'
import Form from '@/page/form'
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
      component: Login,
      // component: (resolve) => require(['@/page/login'], resolve)
    },
    {
      path: '/login',
      component: Login,
      // component: (resolve) => require(['@/page/login'], resolve),
      meta: {
        index: 1,
        title: '登录'
      },
    },
    {
      path: '/rou',
      component: Rou,
      // component: (resolve) => require(['@/page/login'], resolve),
      meta: {
        index: 2
      },
      children: [
        {
          path: '/rou',
          redirect: "/rou/index",
          component: Index
        },
        {
          path: '/rou/index',
          component: Index,
          // component: (resolve) => require(['@/page/index'], resolve),
          meta: {
            index: 3,
            title: '首页'
          },
        },
        {
          path: '/rou/news',
          component: News,
          // component: (resolve) => require(['@/page/news'], resolve),
          meta: {
            index: 4,
            title: '新闻'
          },
        },
        {
          path: '/rou/my',
          component: My,
          // component: (resolve) => require(['@/page/my'], resolve),
          meta: {
            index: 5,
            title: '我的'
          },
        },
      ],
    },
    {
      path: '/apply',
      // component: Apply,
      component: (resolve) => require(['@/page/apply'], resolve),
      meta: {
        index: 10,
        title: '申请'
      },
    },
    {
      path: '/shenqing',
      // component: Shenqing,
      component: (resolve) => require(['@/page/shenqing'], resolve),
      meta: {
        index: 11,
        title: '申请'
      },
    },
    {
      path: '/form',
      // component: Form,
      component: (resolve) => require(['@/page/form'], resolve),
      meta: {
        index: 12,
        title: '动态表单'
      },
    }
  ],
  
})
