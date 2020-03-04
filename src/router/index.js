import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Members from '../components/Members.vue'
import Conversations from '../components/Conversations.vue'
import ConvDetail from '../components/ConvDetail.vue'
import MemberDetails from '../components/MemberDetails.vue'
import store from '../store'

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
    beforeEnter : function(to,from,next) {
      if(store.state.isLogged){
        next()
      }else{
        next({name : "login"})
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter : function(to,from,next) {
      if(!store.state.isLogged){
        next()
      }else{
        next({name : "login"})
      }
    }
  },
  {
    path: '/conversations',
    name: 'Conversations',
    component: Conversations,
    beforeEnter : function(to,from,next) {
      if(store.state.isLogged){
        next()
      }else{
        next({name : "login"})
      }
    }
  },
  {
    path: '/convdetail',
    name: 'ConvDetail',
    component: ConvDetail,
    beforeEnter : function(to,from,next) {
      if(store.state.isLogged){
        next()
      }else{
        next({name : "login"})
      }
    }
  },
  {
    path: '/members',
    name: 'members',
    component: Members,
    beforeEnter : function(to,from,next) {
      if(store.state.isLogged){
        next()
      }else{
        next({name : "login"})
      }
    }
  },
  {
    path: '/members/:id',
    name: 'member',
    component : MemberDetails,
    beforeEnter : function(to,from,next) {
      if(store.state.isLogged){
        next()
      }else{
        next({name : "login"})
      }
    }
  },


]

const router = new VueRouter({
  routes
})

export default router
