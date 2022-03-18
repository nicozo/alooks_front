<template>
  <v-app-bar
    app
    dark
    color="rgba(51, 51, 51, .7)"
    :height="headerHeight"
  >
    <v-app-bar-title>
      {{ appName }}
    </v-app-bar-title>

    <v-spacer />

    <app-bar-signup-button />
    <app-bar-login-button />
  </v-app-bar>
</template>

<script>
export default {
  name: 'HomeHeader',
  data ({ $config: { appName } }) {
    return {
      appName,
      headerHeight: 64
    }
  }
}
</script>
