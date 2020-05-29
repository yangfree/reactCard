import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 常量代表事件类型 便于管理
const SET_NAME = 'SET_NAME';
const SET_TOKEN = 'SET_TOKEN';

const store = new Vuex.Store({
  state: {
    name: '',
    token: '',
  },
  mutations: {
    [SET_NAME](state, name) {
      sessionStorage.setItem("name", name);
      state.name = name;
    },
    [SET_TOKEN](state, token) {
      sessionStorage.setItem("token", token);
      state.token = token;
    }
  },
  actions: {
    setName(context, name) {
      context.commit('SET_NAME', name)
    },
    setToken(context, token) {
      context.commit('SET_TOKEN', token)
    }
  }
})

export default store;