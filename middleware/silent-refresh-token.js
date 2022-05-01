// アクセストークンを更新するサイレントリフレッシュ機能
export default async ({ $auth, $axios, store, route, redirect, isDev }) => {
  if ($auth.isExistUserAndAuthenticated()) {
    // コンソール確認用・削除予定
    if (isDev) {
      console.log('Execute silent refresh!!')
    }
    // サイレントリフレッシュ
    await $axios.$post('/api/v1/sessions/refresh')
      .then(res => $auth.login(res))
      // 「アクセストークンとリフレッシュトークンが無効」の場合
      .catch(() => {
        const msg = 'セッションの有効期限が切れました。' +
                    'もう一度ログインしてください'
        // TODO test
        console.log(msg)
        // TODO トースター出力
        // store.dispatch('getToast', { msg })
        // TODO アクセスルート記憶
        // store.dispatch('getRememberPath', route)
        // Vuexの初期化(セッションはサーバで削除済み)
        $auth.resetVuex()
        return redirect('/login')
      })
  }
}
