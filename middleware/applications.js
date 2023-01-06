export default async ({ $auth, $axios, store }) => {
  if ($auth.loggedIn()) {
    const res = await $axios.$get('api/v1/applies')

    await store.dispatch('applications/getApplications', res)
  }
}
