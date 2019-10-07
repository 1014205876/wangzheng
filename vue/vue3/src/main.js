import Vue from 'vue';
import router from './router';
// 引入插件
import '../theme/index.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import axios from 'axios';
Vue.prototype.$axios = axios;
// 引入页面
import App from './App.vue';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
