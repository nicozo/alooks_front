export default async ({ $axios, store, route }) => {
  const res = await $axios.$get(`api/v1/rooms/${route.params.id}`)

  await store.dispatch('rooms/getRoom', res)
}
