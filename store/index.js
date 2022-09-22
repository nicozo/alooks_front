const homePath = '/rooms'

export const state = () => ({
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
  },
  defaultAvatarSrc: require('@/static/DefaultAvatar.png'),
  commonImageSrc: require('@/static/CommonImage.jpg'),
  btnLoading: false
})

export const getters = {
  headerHeight: state => state.commonStyle.headerHeight,
  defaultAvatarSrc: state => state.defaultAvatarSrc,
  commonImageSrc: state => state.commonImageSrc,
  btnLoading: state => state.btnLoading
}

export const mutations = {
  setToast (state, payload) {
    state.toast = payload
  },
  setRememberPath (state, payload) {
    state.loggedIn.rememberPath = payload
  },
  setBtnLoading (state, boolean) {
    state.btnLoading = boolean
  }
}

export const actions = {
  getToast ({ commit }, { msg, color, timeout }) {
    color = color || 'error'
    timeout = timeout || 4000
    commit('setToast', { msg, color, timeout })
  },
  getRememberPath ({ state, commit }, { path, params }) {
    // ログイン前パスが渡された場合はloggedIn.homepathに書き換える
    // console.log(state.loggedIn.redirectPaths.includes(path))
    if (state.loggedIn.redirectPaths.includes(path)) {
      path = state.loggedIn.homePath.path
    }
    params = params || {}
    commit('setRememberPath', { path, params })
  },
  getBtnLoading ({ commit }, boolean) {
    commit('setBtnLoading', boolean)
  }
}
