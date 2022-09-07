import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    userIsLoggedIn: false
  },
  getters: {
    user (state) {
      return state.user
    },
    userIsLoggedIn (state) {
      return state.userIsLoggedIn
    }
  },
  mutations: {
    SET_USER (state, data) {
      state.user = data
    },
    SET_USER_IS_LOGGED_IN (state, bool) {
      state.userIsLoggedIn = bool
    }
  },
  actions: {
    setUser ({ commit }, data) {
      commit('SET_USER', data)
    },
    setUserIsLoggedIn ({ commit }, bool) {
      commit('SET_USER_IS_LOGGED_IN', bool)
    }
  }
})
