import jwt_decode from "jwt-decode"

export const state = () => ({
  authUser: null,
  authToken: null,
  authExpires: 0,
  authPayload: {}
})

export const getters = () => ({
})

export const mutations = {
  setAuthUser (state, payload) {
    state.authUser = payload
  },
  setAuthToken (state, payload) {
    state.authToken = payload
  },
  setAuthExpires (state, payload) {
    state.authExpires = payload
  },
  setAuthPayload (state, payload) {
    state.authPayload = payload
  }
}

export const actions = {
  login ({ commit }, res) {
    console.log(res)
    let { token, expires, user } = res
    console.log(token, expires, user)
    const exp = expires * 1000
    const jwtPayload = (token) ? jwt_decode(token) : {}
    console.log(jwtPayload)
    commit('setAuthUser', user)
    commit('setAuthToken', token)
    commit('setAuthExpires', exp)
    commit('setAuthPayload', jwtPayload)
  }
}
