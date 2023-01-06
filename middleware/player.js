export default async ({ $axios, store, route }) => {
  const res = await $axios.$get(`api/v1/players/${route.params.id}`)

  await store.dispatch('players/getPlayer', res)
}
