import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Channels from '../components/Channels.vue'
import Register from '../components/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'home',
    component: Channels,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },

]

const router = new VueRouter({
  routes
})

export default router
