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
const history = resolve => require(['@/page/history'], resolve);
const formjson = resolve => require(['@/page/formjson'], resolve);
const drag = resolve => require(['@/page/drag'], resolve);
const tree = resolve => require(['@/page/tree'], resolve);
const MapPage = resolve => require(['@/page/mapPage'], resolve);
// 引入次级页面路由
const Index = resolve => require(['@/page/index'], resolve);
const News = resolve => require(['@/page/news'], resolve);
const My = resolve => require(['@/page/my'], resolve);

Vue.use(Router)

export default new Router({
  // mode: 'history',//去除路径里面的#本地dist查看需要去掉
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
        auth: false,
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
            auth: true,
            title: '首页'
          },
        },
        {
          path: '/rou/news',
          component: News,
          meta: {
            index: 4,
            auth: true,
            title: '新闻'
          },
        },
        {
          path: '/rou/my',
          component: My,
          meta: {
            index: 5,
            auth: true,
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
        auth: true,
        title: '申请'
      },
    },
    {
      path: '/shenqing',
      component: Shenqing,
      meta: {
        auth: true,
        index: 11,
      },
    },
    {
      path: '/form',
      component: Form,
      meta: {
        index: 12,
        auth: true,
        title: '动态表单'
      },
    },
    {
      path: '/formjson',
      component: formjson,
      meta: {
        index: 12,
        auth: true,
        title: '生成动态表单'
      },
    },
    {
      path: '/history',
      component: history,
      meta: {
        index: 13,
        auth: true,
        title: '历史记录'
      },
    },
    {
      path: '/drag',
      component: drag,
      meta: {
        index: 14,
        auth: true,
        title: '拖拽页面'
      },
    },
    {
      path: '/tree',
      component: tree,
      meta: {
        index: 15,
        auth: true,
        title: '模板页面'
      },
    },
    {
      path: '/mapPage',
      component: MapPage,
      meta: {
        index: 16,
        auth: true,
        title: '地图页面'
      },
    },
  ],
  
})
