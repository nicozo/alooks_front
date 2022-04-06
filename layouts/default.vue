<template>
  <v-app>
    <home-header />

    <home-hero />

    <v-main>
      <Nuxt />
    </v-main>

    <app-footer />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
