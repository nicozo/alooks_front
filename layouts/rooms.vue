<template>
  <v-app>
    <logged-in-header />

    <logged-in-hero />

    <v-main>
      <Nuxt />
    </v-main>

    <app-footer />
  </v-app>
</template>

<script>
export default {
  name: 'RoomsLayout'
}
</script>
