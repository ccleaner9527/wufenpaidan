import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.getItem('token'),
    role:2,
    userUuid:''
  },
  mutations: {
    login:(state,data)=>{
      state.token=data;
      localStorage.setItem('token',data);
    },
    setRole(state,data){
      state.role=data;
    },
    setUserUuid(state,data){
      state.userUuid=data;
    }
  },
  actions: {
  },
  modules: {
  }
})
