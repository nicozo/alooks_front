export default async ({ $axios, store, route, redirect }) => {
  // console.log('middleware!!')
  const res = await $axios.$get('api/v1/rooms')

  await store.dispatch('rooms/getRooms', res)
}
