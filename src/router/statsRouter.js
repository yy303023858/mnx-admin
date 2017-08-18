import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard/dashboard'
// 统计模块
import statsRecruiters from '@/module/stats/stats-recruiters'
import statsIntentions from '@/module/stats/stats-intentions'
import statsSpecial from '@/module/stats/stats-special'
import statsDoc from '@/module/stats/stats-doc'
import statsJob from '@/module/stats/stats-job'
import statsStudents from '@/module/stats/stats-students'
import statsApplication from '@/module/stats/stats-application'
// import statsAu from '@/module/stats/components/stats-au/stats-au'

// error
import Errors from '@/components/error/error'

Vue.use(Router)

const base = '迷你校'

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', component: dashboard},
        {path: '/stats/recruiters', component: statsRecruiters},
        {path: '/stats/intentions', component: statsIntentions},
        {path: '/stats/special', component: statsSpecial},
        {path: '/stats/job', component: statsJob},
        {path: '/stats/students', component: statsStudents},
        {path: '/stats/application', component: statsApplication},
        // {path: '/stats/au', component: statsAu},
        {path: '/stats/doc', component: statsDoc},
        {path: '*', component: Errors, meta: {title: `${base}Error`}}
    ]
})