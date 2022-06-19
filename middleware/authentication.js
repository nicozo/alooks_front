export default async ({ $auth, store, route, redirect }) => {
  // リダイレクトを必要としないパス
  // const notRedirectPaths = ['account', 'project']
  // if (notRedirectPaths.includes(route.name)) {
  //   return false
  // }

  console.log('authenticationミドルウェア発火')
  // console.log('ログインユーザー情報', $auth.user)
  // console.log('ユーザーのsub:', $auth.user.sub)
  // console.log('ユーザーのpayload:', $auth.payload.sub)
  // console.log('ユーザーは存在する？', $auth.isExistUser())
  // console.log('有効期限内？', $auth.isAuthenticated())
  // ログイン前ユーザー処理
  if (!$auth.loggedIn()) {
    // ユーザー以外の値が存在する可能性があるので全てを削除する
    await $auth.logout()

    const msg = 'ログインしてください'
    const color = 'info'
    // トースター出力
    store.dispatch('getToast', { msg, color })
    // アクセスルート記憶
    store.dispatch('getRememberPath', route)
    // console.log(route)
    return redirect('/login')
  }
}
