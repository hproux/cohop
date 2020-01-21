import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vp = new VuexPersist({
  key: 'store',
  storage: window.localStorage
});

Vue.use(Vuex)
Vue.prototype.$bus = new Vue()

export default new Vuex.Store({
  plugins : [vp.plugin],
  state: {
    id : null,
    token : null,
    isLogged : false,
  },
  mutations: {
    disconnect(state){
      state.id = null;
      state.token = null;
      state.isLogged = false;
    },
    setToken(state, token){
      state.token = token;
    },
    setId(state, id){
      state.id = id;
    },
    changeConnectionState(state){
      state.isLogged = !state.isLogged
    }
  },
  actions: {
  },
  modules: {
  }
})
