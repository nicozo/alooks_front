export default async ({ $axios, store, route, redirect }) => {
  const res = await $axios.$get('api/v1/applies')

  await store.dispatch('applications/getApplications', res)
}
