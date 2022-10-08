export default async ({ $axios, store, route, redirect }) => {
  const res = await $axios.$get(`api/v1/clans/${route.params.id}/edit`)

  await store.dispatch('clans/getClan', res)
}
