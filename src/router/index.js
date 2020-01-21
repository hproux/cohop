import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Members from '../components/Members.vue'
import Conversations from '../components/Conversations.vue'
import ConvDetail from '../components/ConvDetail.vue'

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
    component: Conversations,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/conversations',
    name: 'Conversations',
    component: Conversations,
  },
  {
    path: '/convdetail',
    name: 'ConvDetail',
    component: ConvDetail,
  },
  {
    path: '/members',
    name: 'members',
    component: Members
  },

]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
