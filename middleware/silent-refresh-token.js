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
        // Vuexの初期化(セッションはサーバで削除済み)
        $auth.resetVuex()
        // セッション切れのままログアウトするとログイン後も一覧画面に遷移しないバグ対策
        if (route.path === '/logout') {
          return redirect('/login')
        } else {
          const msg = 'セッションの有効期限が切れました。' +
                      'もう一度ログインしてください'
          // トースター出力
          store.dispatch('getToast', { msg })
          // アクセスルート記憶
          store.dispatch('getRememberPath', route)
          return redirect('/login')
        }
      })
  }
}
