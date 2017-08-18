// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '../../router/recRouter.js'
import iView from 'iview';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'iview/dist/styles/iview.css';    // 使用 CSS
import '../../common/css/common.css';    // 使用 common CSS
import store from '../../store/recStore.js'

Vue.config.productionTip = false

Vue.use(iView);
Vue.use(VueAxios, axios);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
   	// 验证是否登录
    /*var user = localStorage.getItem('user')
	var password = localStorage.getItem('password')
    if (!user) {
    	if (to.path !== '/login') {
    		next('/login')
    	} else {
    		next()
    	}
    } else {
    	next()
    }*/
    next()
})


router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

router.push('/')