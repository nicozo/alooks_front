// リフレッシュトークンを使ってログイン機能を維持するプラグイン
export default async ({ $axios, store }) => {
  await $axios.$post(
    '/api/v1/sessions/refresh',
    {},
    // ログインしていないユーザーがページを訪れた時404エラーを表示させない（404エラーを許容する）
    { validateStatus: status => (status >= 200 && status < 300) || (status === 401) }
  ).then(res => store.dispatch('login', res))
}
