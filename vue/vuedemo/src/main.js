// 引入vue
import Vue from 'vue'
// 引入app.vue
import App from './App'
//引入路由
import router from './router'

// 引入swiper
import Swiper from "swiper";
Vue.prototype.$swiper = Swiper
import "swiper/dist/css/swiper.min.css";
// import Swiper from "swiper/dist/js/swiper.min.js";

//引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入$http
import VResource from 'vue-resource'
Vue.use(VResource)
// 引入vux
// import { Actionsheet } from 'vux'
// Vue.component('actionsheet', Actionsheet)

//引入css文件
import '../static/css/reset.css'
import '../static/css/transition.css'
// 引入外部js文件
import '../static/js/rem750.js'//750rem
// 引入bootstrap
// import "bootstrap/dist/css/bootstrap.min.css";
// 引入滚动选择器
import picker from 'vue-3d-picker';
Vue.component(picker.name, picker);
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//引入修改页面title
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {//路由跳转之前执行
    if (to.meta.title) {//修改页面title
        document.title = to.meta.title;
    }
    let logingwangzheng = sessionStorage.getItem('logingwangzheng');
    let indexUrlwangzheng = localStorage.getItem('indexUrlwangzheng');
    if (logingwangzheng != null) {
        console.log('本次登陆过')
        next()
    } else {
        console.log('本次未登陆过')
        if (to.matched.some(m => m.meta.auth)) {
            console.log('需要判定登录')
            if (indexUrlwangzheng == 'false') {
                console.log('记住登录状态，不需要跳转')
                next()
            } else {
                console.log('未记住登录状态，需要跳转')
                next({ path: '/login' })
            }
        } else {
            console.log('不需要判定登录')
            next()
        }
    }
});

new Vue({
    el: '#app',
    router,
    render: h => h(App),
    components: { App },
    template: '<App/>'
})