import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // apiBaseUrl: 'http://36.66.239.116:8080/rest',
        apiBaseUrl: 'http://localhost:8080/rest',
        // apiBaseUrl: 'http://192.168.1.39:8080/rest',
        counter: 0,
        isAuthenticated: false,
        fcompanyBean: 912345668,
        fdivisionBean: 0,
    },
    mutations: {
        increaseCounter(state) {
            state.counter++
        },
        decreaseCounter(state) {
            state.counter--
        },
        setAuthenticatedFalse(state) {
            state.isAuthenticated = false
        },
        setAuthenticatedTrue(state) {
            state.isAuthenticated = true
        }

    },
    actions: {
        increaseCounterDispatch() {
            this.commit('increaseCounter')
        },
        decreaseCounterDispatch() {
            this.commit('decreaseCounter')
        }
    },
    modules: {

    },
    getters: {
        getCurrentCounter(state) {
            return state.counter
        },
        getApiBaseUrl(state) {
            return state.apiBaseUrl
        },
        getIsAuthenticated(state) {
            return state.isAuthenticated
        },
        isAuthenticated: (state) => {
            console.log('state: ', state);
            return state.isAuthenticated;
        },
    }
})