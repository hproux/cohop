import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'bulma/css/bulma.css'
import axios from 'axios'

window.axios = axios.create({
  baseURL: 'https://tools.sopress.net/iut/coop/api/',
  headers: {
    'Authorization' : '5a709f0b400a1a5b10c7bccfef6ea802a050d8d4'
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  beforeCreate(){
    window.axios.interceptors.request.use((config)=>{
      if(this.$store.state.token){
        config.url+='?token='+this.$store.state.token;
      }
      return config
    },error => {
      return console.log(error)
    })
  }
}).$mount('#app')
