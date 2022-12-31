export default async ({ $auth, $axios, store, route, redirect }) => {
  if ($auth.loggedIn()) {
    const res = await $axios.$get('api/v1/applies')

    await store.dispatch('applications/getApplications', res)
  }
}
