import jwtDecode from 'jwt-decode'

export const state = () => ({
  authUser: null,
  authToken: null,
  authExpires: 0,
  authPayload: {}
})

export const getters = () => ({
})

export const mutations = {
  setAuthUser (state, user) {
    state.authUser = user
  },
  setAuthToken (state, token) {
    state.authToken = token
  },
  setAuthExpires (state, exp) {
    state.authExpires = exp
  },
  setAuthPayload (state, payload) {
    state.authPayload = payload
  }
}

export const actions = {
  async login ({ commit }, params) {
    const res = await this.$axios.$post('api/v1/sessions', params)
    const { token, expires, user } = res
    // console.log(token, expires, user)
    const exp = expires * 1000
    const jwtPayload = (token) ? jwtDecode(token) : {}
    // console.log(jwtPayload)
    commit('setAuthUser', user)
    commit('setAuthToken', token)
    commit('setAuthExpires', exp)
    commit('setAuthPayload', jwtPayload)
  }
}
