export default async ({ $axios, store, route, redirect }) => {
  const res = await $axios.$get('api/v1/rooms')

  await store.dispatch('rooms/getRooms', res)
}
