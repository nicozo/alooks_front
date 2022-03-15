// Doc: https://axios.nuxtjs.org/extend/
// Doc: https://axios.nuxtjs.org/helpers
export default ({ $axios }) => {
  $axios.onRequest((config) => {
    console.log(config)
  }),
  $axios.onResponse((response) => {
    console.log(response)
  }),
  $axios.onError((e) => {
    console.log(e.response)
  })
}
