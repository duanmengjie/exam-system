import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/login'
import Info from '@/page/info/info'
import Resulte from '@/page/resulte/resulte'
import ManageLogin from '@/management/manageLogin/manageLogin'
import CandidateInfo from '@/management/candidateInfo/candidateInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/info',
      component: Info
    },
    {
      path: '/resulte',
      component: Resulte
    },
    {
      path: '/managelogin',
      component: ManageLogin
    },
    {
      path: '/candidateInfo',
      component: CandidateInfo
    }
  ]
})
