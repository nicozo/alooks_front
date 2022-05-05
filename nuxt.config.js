import { EnvironmentPlugin } from 'webpack'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'apex_app_front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Railsアプリのポート番号との重複を避ける
  server: {
    port: process.env.FRONT_PORT
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    'plugins/auth',
    'plugins/axios',
    'plugins/vee-validate',
    'plugins/nuxt-client-init'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://www.npmjs.com/package/@nuxtjs/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // proxyの設定いらないかも
    // axiosのbaseURLを環境変数API_URLで振り分けるためにモジュールを導入
    // proxy: trueとするとbaseURLを明記する必要がある
    '@nuxtjs/proxy',
    // https://i18n.nuxtjs.org/setup
    '@nuxtjs/i18n'
  ],

  publicRuntimeConfig: {
    appName: process.env.APP_NAME
  },

  router: {
    // 全てのページでサイレントリフレッシュを最初に実行する（グローバルミドルウェア）
    middleware: [
      'silent-refresh-token'
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // クロスオリジンでCookieを共有する
    credentials: true
  },

  // いらないかも
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      pathRewrite: {
        '^/api': '/v1'
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  vuetify: {
  },

  // Doc: https://i18n.nuxtjs.org/basic-usage
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    // Doc: https://kazupon.github.io/vue-i18n/api/#properties
    vueI18n: {
      // silentTranslationWarn: true,
      silentFallbackWarn: true,
      messages: {
        ja: require('./locales/ja.json'),
        en: require('./locales/en.json')
      }
    }
  }
}
