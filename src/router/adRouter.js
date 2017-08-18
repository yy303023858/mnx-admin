import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard/dashboard'
// 活动管理
import adRec from '@/module/ad/ad-rec'
import adHot from '@/module/ad/ad-hot'


// error
import Errors from '@/components/error/error'

Vue.use(Router)

const base = '迷你校'

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', component: dashboard},
        {path: '/ad/rec', component: adRec},
        {path: '/ad/hot', component: adHot},
        {path: '*', component: Errors, meta: {title: `${base}Error`}}
    ]
})