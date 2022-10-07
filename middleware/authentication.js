export default async ({ $auth, store, route, redirect }) => {
  // リダイレクトを必要としないパス
  // const notRedirectPaths = ['account', 'project']
  // if (notRedirectPaths.includes(route.name)) {
  //   return false
  // }

  // ログイン前ユーザー処理
  if (!$auth.loggedIn()) {
    // ユーザー以外の値が存在する可能性があるので全てを削除する
    await $auth.logout()

    const msg = 'ログインしてください'
    const color = 'info'

    store.dispatch('getToast', { msg, color })
    store.dispatch('getRememberPath', route)
    return redirect('/login')
  }
}
