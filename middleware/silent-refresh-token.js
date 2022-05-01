// アクセストークンを更新するサイレントリフレッシュ機能
export default async ({ $axios, store, route, redirect, isDev }) => {
  // 「アクセストークンが無効」「Vuexにユーザーが存在する(subがあるかどうか)」「ユーザーのsub(user.id)とペイロードのsubが一致する」場合、リフレッシュを行う
  console.log(store.state.authExpires)
  console.log(new Date().getTime())
  console.log(new Date().getTime() > store.state.authExpires)
  console.log('サイレントリフレッシュの読み込み')
  if (
    new Date().getTime() > store.state.authExpires &&
    store.state.authUser.sub &&
    store.state.authPayload.sub &&
    store.state.authUser.sub === store.state.authPayload.sub
  ) {
    // コンソール確認用・削除予定
    if (isDev) {
      console.log('Execute silent refresh!!')
    }
    // サイレントリフレッシュ
    await $axios.$post('/api/v1/sessions/refresh')
      .then(res => store.dispatch('login', res))
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
        store.dispatch('logout')
        return redirect('/login')
      })
  }
}
