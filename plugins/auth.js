// front/plugins/auth.js
import jwtDecode from 'jwt-decode'

class Authentication {
  constructor (ctx) {
    this.store = ctx.store
    this.$axios = ctx.$axios
  }

  get user () {
    return this.store.getters.authUser || {}
  }

  get token () {
    return this.store.getters.authToken
  }

  get expires () {
    return this.store.getters.authExpires
  }

  get payload () {
    return this.store.getters.authPayload
  }

  // 認証情報をVuexに保存
  setAuth ({ token, expires, user }) {
    const exp = expires * 1000
    const jwtPayload = (token) ? jwtDecode(token) : {}

    this.store.dispatch('getAuthUser', user)
    this.store.dispatch('getAuthToken', token)
    this.store.dispatch('getAuthExpires', exp)
    this.store.dispatch('getAuthPayload', jwtPayload)
  }

  // ログイン
  login (data) {
    console.log(data)
    this.setAuth(data)
  }
}

// 共通化
export default ({ store, $axios }, inject) => {
  inject('auth', new Authentication({ store, $axios }))
}
