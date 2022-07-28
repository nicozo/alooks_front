// Doc: https://axios.nuxtjs.org/extend/
// Doc: https://axios.nuxtjs.org/helpers
export default ({ $axios, $auth, isDev }) => {
  $axios.onRequest((config) => {
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    if ($auth.token) {
      $axios.defaults.headers.common.Authorization = `Baerer ${$auth.token}`
    }
    if (isDev) {
      console.log(config)
    }
    console.log(config)
  })
  $axios.onResponse((response) => {
    if (isDev) {
      console.log(response)
    }
    console.log(response)
  })
  $axios.onError((e) => {
    console.log(e.response)
  })
}
