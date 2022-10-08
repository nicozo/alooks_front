export default async ({ $axios, store, route, redirect }) => {
  const res = await $axios.$get(`api/v1/rooms/${route.params.id}/edit`)

  await store.dispatch('rooms/getRoom', res)
}
