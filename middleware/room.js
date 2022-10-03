export default async ({ $axios, store, route, redirect }) => {
  // console.log('middleware!!')
  // console.log(route)
  const res = await $axios.$get(`api/v1/rooms/${route.params.id}`)

  await store.dispatch('rooms/getRoom', res)
}
