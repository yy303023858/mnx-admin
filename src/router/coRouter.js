import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard/dashboard'
// 活动管理
import companyList from '@/module/company/company-list'
import companyApplication from '@/module/company/company-application'
// error
import Errors from '@/components/error/error'

Vue.use(Router)

const base = '迷你校'

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', component: dashboard},
        {path: '/company/list', component: companyList},
        {path: '/company/application/:recId', component: companyApplication},
        {path: '*', component: Errors, meta: {title: `${base}Error`}}
    ]
})