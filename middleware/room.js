export default async ({ $axios, store, route, redirect }) => {
  const res = await $axios.$get(`api/v1/rooms/${route.params.id}`)

  await store.dispatch('rooms/getRoom', res)
}
