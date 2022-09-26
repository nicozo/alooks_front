<template>
  <v-btn
    id="app-bar-login-button"
    color="success"
    class="mr-2"
    nuxt
    :to="{ name: 'login' }"
  >
    {{ $t('pages.login') }}
  </v-btn>
</template>
