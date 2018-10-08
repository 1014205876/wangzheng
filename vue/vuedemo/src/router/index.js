import Vue from 'vue'
import Router from 'vue-router'
// 非懒加载
// // 引入主级页面路由
// import Login from '@/page/login'
// import Rou from '@/page/rou'
// import Apply from '@/page/apply'
// import Shenqing from '@/page/shenqing'
// import Form from '@/page/form'
// // 引入次级页面路由
// import Index from '@/page/index'
// import News from '@/page/news'
// import My from '@/page/my'
// 懒加载
// 引入主级页面路由
const Login = resolve => require(['@/page/login'], resolve);
const Rou = resolve => require(['@/page/rou'], resolve);
const Apply = resolve => require(['@/page/apply'], resolve);
const Shenqing = resolve => require(['@/page/shenqing'], resolve);
const Form = resolve => require(['@/page/form'], resolve);
// 引入次级页面路由
const Index = resolve => require(['@/page/index'], resolve);
const News = resolve => require(['@/page/news'], resolve);
const My = resolve => require(['@/page/my'], resolve);

Vue.use(Router)

export default new Router({
  mode: 'history',//去除路径里面的#
  routes: [
    {
      path: '/',
      redirect: "/login",
      component: Login,
    },
    {
      path: '/login',
      component: Login,
      meta: {
        index: 1,
        title: '登录'
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
          component: Index,
        },
        {
          path: '/rou/index',
          component: Index,
          meta: {
            index: 3,
            title: '首页'
          },
        },
        {
          path: '/rou/news',
          component: News,
          meta: {
            index: 4,
            title: '新闻'
          },
        },
        {
          path: '/rou/my',
          component: My,
          meta: {
            index: 5,
            title: '我的'
          },
        },
      ],
    },
    {
      path: '/apply',
      component: Apply,
      meta: {
        index: 10,
        title: '申请'
      },
    },
    {
      path: '/shenqing',
      component: Shenqing,
      meta: {
        index: 11,
        title: '申请'
      },
    },
    {
      path: '/form',
      component: Form,
      meta: {
        index: 12,
        title: '动态表单'
      },
    }
  ],
  
})
