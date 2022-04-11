// Doc: https://axios.nuxtjs.org/extend/
// Doc: https://axios.nuxtjs.org/helpers
export default ({ $axios, store }) => {
  $axios.onRequest((config) => {
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    if (store.getters.authToken) {
      $axios.defaults.headers.common.Authorization = `Baerer ${store.getters.authToken}`
    }
    console.log(config)
  })
  $axios.onResponse((response) => {
    console.log(response)
  })
  $axios.onError((e) => {
    console.log(e.response)
  })
}
