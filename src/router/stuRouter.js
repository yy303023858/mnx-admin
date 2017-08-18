import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard/dashboard'
// 学生管理
import stuStudents from '@/module/stu/stu-students'
import stuApplication from '@/module/stu/stu-application'
// error
import Errors from '@/components/error/error'

Vue.use(Router)

const base = '迷你校'

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', component: dashboard},
        {path: '/stu/students', component: stuStudents, name: 'stuStudents'},
        {path: '/stu/applicationRecord/:stuId', component: stuApplication},
        {path: '*', component: Errors, meta: {title: `${base}Error`}}
    ]
})