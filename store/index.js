export const state = () => ({
  authUser: null,
  authToken: null,
  authExpires: 0,
  authPayload: {}
})

export const getters = {
  authUser: state => state.authUser,
  authToken: state => state.authToken,
  authExpires: state => state.authExpires,
  authPayload: state => state.authPayload
}

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
  logout ({ commit }) {
    commit('setAuthUser', null)
    commit('setAuthToken', null)
    commit('setAuthExpires', 0)
  },
  getAuthUser ({ commit }, user) {
    commit('setAuthUser', user)
  },
  getAuthToken ({ commit }, token) {
    commit('setAuthToken', token)
  },
  getAuthExpires ({ commit }, exp) {
    exp = exp || 0
    commit('setAuthExpires', exp)
  },
  getAuthPayload ({ commit }, jwtPayload) {
    jwtPayload = jwtPayload || {}
    commit('setAuthPayload', jwtPayload)
  }
}
