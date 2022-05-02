const homePath = '/rooms'

export const state = () => ({
  authUser: null,
  authToken: null,
  authExpires: 0,
  authPayload: {},
  toast: {
    msg: null,
    color: 'error',
    timeout: 4000
  },
  loggedIn: {
    homePath: {
      path: homePath
    },
    rememberPath: {
      path: homePath,
      params: {}
    },
    redirectPaths: [
      '/',
      '/register',
      '/login'
    ]
  },
  commonStyle: {
    headerHeight: 64
  }
})

export const getters = {
  authUser: state => state.authUser,
  authToken: state => state.authToken,
  authExpires: state => state.authExpires,
  authPayload: state => state.authPayload,
  headerHeight: state => state.commonStyle.headerHeight
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
  },
  setToast (state, payload) {
    state.toast = payload
  },
  setRememberPath (state, payload) {
    state.loggedIn.rememberPath = payload
  }
}

export const actions = {
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
  },
  getToast ({ commit }, { msg, color, timeout }) {
    color = color || 'error'
    timeout = timeout || 4000
    commit('setToast', { msg, color, timeout })
  },
  getRememberPath ({ state, commit }, { path, params }) {
    // ログイン前パスが渡された場合はloggedIn.homepathに書き換える
    console.log(state.loggedIn.redirectPaths.includes(path))
    if (state.loggedIn.redirectPaths.includes(path)) {
      path = state.loggedIn.homePath.path
    }
    params = params || {}
    commit('setRememberPath', { path, params })
  }
}
