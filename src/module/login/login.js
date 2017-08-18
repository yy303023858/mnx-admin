// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import login from './login.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css';    // 使用 CSS

Vue.config.productionTip = false

Vue.use(iView);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<login/>',
    components: { login }
})

// router.push('/')