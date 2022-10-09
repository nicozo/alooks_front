// ログイン機能をまとめたプラグイン
import jwtDecode from 'jwt-decode'

class Authentication {
  constructor (ctx) {
    this.store = ctx.store
    this.$axios = ctx.$axios
  }

  get user () {
    return this.store.getters['auth-user/authUser'] || {}
  }

  get token () {
    return this.store.getters['auth-user/authToken']
  }

  get expires () {
    return this.store.getters['auth-user/authExpires']
  }

  get payload () {
    return this.store.getters['auth-user/authPayload']
  }

  // 認証情報をVuexに保存
  setAuth ({ token, expires, user }) {
    const exp = expires * 1000
    const jwtPayload = (token) ? jwtDecode(token) : {}

    this.store.dispatch('auth-user/getAuthUser', user)
    this.store.dispatch('auth-user/getAuthToken', token)
    this.store.dispatch('auth-user/getAuthExpires', exp)
    this.store.dispatch('auth-user/getAuthPayload', jwtPayload)
  }

  login (data) {
    this.setAuth(data)
  }

  // Vuex初期化
  resetVuex () {
    this.setAuth({ token: null, expires: 0, user: null })
  }

  // 401エラーを許容する
  // https://github.com/axios/axios#request-config
  allowUnauthorized (status) {
    return (status >= 200 && status < 300) || (status === 401)
  }

  async logout () {
    await this.$axios.delete(
      '/api/v1/sessions',
      {
        validateStatus: status => this.allowUnauthorized(status)
      }
    )
    this.resetVuex()
  }

  async adminLogout () {
    await this.$axios.delete(
      '/api/v1/admin/sessions',
      {
        validateStatus: status => this.allowUnauthorized(status)
      }
    )
    this.resetVuex()
  }

  // ユーザーが存在する場合にtrueを返す
  isExistUser () {
    return this.user.sub &&
           this.payload.sub &&
           this.user.sub === this.payload.sub
  }

  // 有効期限内にtrueを返す
  isAuthenticated () {
    return new Date().getTime() < this.expires
  }

  // ユーザーが存在かつ有効期限切れの場合trueを返す
  isExistUserAndAuthenticated () {
    return this.isExistUser() && !this.isAuthenticated()
  }

  // ユーザーが存在かつ有効期限内の場合にtrueを返す
  loggedIn () {
    return this.isExistUser() && this.isAuthenticated()
  }

  profileCompleted () {
    return this.user.game_id
  }

  isAdmin () {
    return this.user.role === 'admin'
  }
}

export default ({ store, $axios }, inject) => {
  inject('auth', new Authentication({ store, $axios }))
}
