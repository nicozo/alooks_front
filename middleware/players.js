export default async ({ $axios, store }) => {
  const res = await $axios.$get('api/v1/players')

  await store.dispatch('players/getPlayers', res)
}
