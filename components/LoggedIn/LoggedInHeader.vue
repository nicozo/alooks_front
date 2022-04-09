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

    <!-- <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn> -->
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
