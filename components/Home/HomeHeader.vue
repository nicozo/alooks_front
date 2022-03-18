<template>
  <v-app-bar
    app
    dark
    color="rgba(51, 51, 51, .7)"
  >
  <Nuxtlink to="/">
    <v-app-bar-title>
      {{ appName }}
    </v-app-bar-title>
  </Nuxtlink>

    <v-spacer />

    <app-bar-signup-button />
    <app-bar-login-button />
  </v-app-bar>
</template>

<script>
export default {
  name: 'HomeHeader',
  props: {
    appName: {
      type: String,
      required: true
    }
  }
}
</script>
