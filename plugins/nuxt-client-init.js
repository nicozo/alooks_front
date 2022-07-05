// リフレッシュトークンを使ってログイン機能を維持するプラグイン
export default async ({ $axios, $auth }) => {
  // console.log('nuxt-client-init発火（ログイン状態の維持）')
  await $axios.$post(
    '/api/v1/sessions/refresh',
    {},
    // ログインしていないユーザーがページを訪れた時404エラーを表示させない（404エラーを許容する）
    {
      validateStatus: status => $auth.allowUnauthorized(status)
    }
  ).then(res => $auth.login(res))
}
