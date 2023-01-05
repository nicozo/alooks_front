export default async ({ $axios, store }) => {
  const res = await $axios.$get('api/v1/rooms')

  await store.dispatch('rooms/getRooms', res)
}
