export default async ({ $axios, store, route, redirect }) => {
  // console.log('middleware!!')
  // console.log(route)
  const res = await $axios.$get(`api/v1/clans/${route.params.id}/edit`)

  await store.dispatch('clans/getClan', res)
}
