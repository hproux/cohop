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
    idConversation : null,
    titreConversation : null,
  },
  mutations: {
    disconnect(state){
      state.id = null;
      state.token = null;
      state.isLogged = false;
    },
    setTitreConversation(state, param){
      state.titreConversation = param
    },
    setIdConv(state, param){
      state.idConversation = param
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
