import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'admin',
      component: () => import('./layout/admin.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('./views/home.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('./views/about.vue')
        }
      ]
    },
    {
      path: '/drag',
      component: () => import('./views/drag.vue'),
      meta: {
        index: 14,
        auth: true,
        title: '拖拽页面'
      },
    },
  ]
})
