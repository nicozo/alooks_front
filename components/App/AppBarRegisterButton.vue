<template>
  <v-btn
    id="app-bar-register-button"
    outlined
    color="primary"
    class="mr-3"
    nuxt
    :to="{ name: 'register' }"
  >
    {{ $t('pages.register') }}
  </v-btn>
</template>
