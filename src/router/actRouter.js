import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard/dashboard'
// 活动管理
import actActivities from '@/module/act/act-activities'
import actCreateAct from '@/module/act/act-createAct'
// error
import Errors from '@/components/error/error'

Vue.use(Router)

const base = '迷你校'

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', component: dashboard},
        {path: '/act/activities', component: actActivities},
        {path: '/act/createAct/:actId', component: actCreateAct},
        {path: '*', component: Errors, meta: {title: `${base}Error`}}
    ]
})