export default ({ $auth, store, route, redirect }) => {
  // ログインユーザーの管理画面遷移前処理
  // 通常ログイン後、管理者でないユーザーが管理画面に遷移するとエラー画面が表示される為元々のページへリダイレクトさせる
  if ($auth.loggedIn() && !$auth.isAdmin()) {
    const msg = '権限がありません'
    const color = 'info'

    store.dispatch('getToast', { msg, color })
    return redirect('/rooms')
  }
}
