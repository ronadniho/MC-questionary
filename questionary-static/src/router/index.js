import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Detail from '@/views/Detail'
import Info from '@/views/Info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
