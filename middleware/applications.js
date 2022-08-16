export default async ({ $axios, store, route, redirect }) => {
  // console.log('middleware!!')
  const res = await $axios.$get('api/v1/applies')

  await store.dispatch('applications/getApplications', res)
}
