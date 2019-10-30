import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: ''//token
    },
    getters: {
        token: state => state.token
    },
    mutations: {
        //设置token
        setToken (state, token) {
            if (token) {
                state.token = token
            } else {
                state.token = ''
            }
        }
    },
    actions: {
        commitToken: ({ commit }, token) => {
            commit('setToken', token)
        }
    },
    modules: {
    }
})
