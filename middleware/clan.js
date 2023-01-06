export default async ({ $axios, store, route }) => {
  const res = await $axios.$get(`api/v1/clans/${route.params.id}`)

  await store.dispatch('clans/getClan', res)
}
