<template>
  <v-btn
    id="app-back-home-button"
    plain
    nuxt
    to="/"
  >
    <v-icon>
      mdi-chevron-double-left
    </v-icon>
    {{ $t('btn.to_top_page') }}
  </v-btn>
</template>
