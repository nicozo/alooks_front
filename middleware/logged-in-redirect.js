// ログイン済ユーザーをリダイレクトさせる機能
export default ({ $auth, store, route, redirect }) => {
  const redirectPaths = store.state.loggedIn.redirectPaths
  if ($auth.loggedIn() && redirectPaths.includes(route.path)) {
    return redirect(store.state.loggedIn.homePath)
  }
}
