export default async ({ $axios, store, route, redirect }) => {
  const res = await $axios.$get('api/v1/clans/my_clan')

  await store.dispatch('clans/getMyClan', res)
}
