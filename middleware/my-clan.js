export default async ({ $axios, store, route, redirect }) => {
  // console.log('middleware!!')
  // console.log(route)
  const res = await $axios.$get('api/v1/clans/my_clan')

  await store.dispatch('clans/getMyClan', res)
}
