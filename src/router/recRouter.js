import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard/dashboard'
// 客户公司模块
import recAdd from '@/module/rec/rec-add'
import recList from '@/module/rec/rec-list'
import recIntention from '@/module/rec/rec-intention'
import recDownloadSetting from '@/module/rec/rec-download-setting'

// error
import Errors from '@/components/error/error'

Vue.use(Router)

const base = '迷你校'

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', component: dashboard},
        {path: '/rec/add', component: recAdd},
        {path: '/rec/list', component: recList},
        {path: '/rec/intention', component: recIntention},
        {path: '/rec/downloadSetting', component: recDownloadSetting},        
        {path: '*', component: Errors, meta: {title: `${base}Error`}}
    ]
})