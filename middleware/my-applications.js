export default async ({ $axios, store, route, redirect }) => {
  // Todo ログインユーザー申請済みのリクエスト一覧の作成
  // console.log('middleware!!')
  const res = await $axios.$get('api/v1/applies/my_applications')

  await store.dispatch('applications/getMyApplications', res)
}
