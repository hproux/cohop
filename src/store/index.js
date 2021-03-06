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
    idMember : null,
    members: [],
  },
  mutations: {
    setIdMember(state, idMember){
      state.idMember = idMember;
    },
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
    },
    loadMembers(state){
      axios.get('members').then((response)=>{
        state.members = response.data;
      }).catch((error)=>{
        console.log(error);
      })
    },
    replaceMembers(state,members){
      state.members = members;
    }
  },
  actions: {
  },
  modules: {
  }
})
