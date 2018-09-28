// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入rem
// import 'lib-flexible/flexible'//540rem
//引入css文件
import '../static/css/reset.css'
import '../static/css/transition.css'
// 引入外部js文件
import '../static/js/rem750.js'//750rem
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
