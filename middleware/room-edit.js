export default async ({ $axios, store, route }) => {
  const res = await $axios.$get(`api/v1/rooms/${route.params.id}/edit`)

  await store.dispatch('rooms/getRoom', res)
}
