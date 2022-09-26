export default async ({ $axios, store, route, redirect }) => {
  // console.log('middleware!!')
  const res = await $axios.$get('api/v1/clans')

  await store.dispatch('clans/getClans', res)
}
