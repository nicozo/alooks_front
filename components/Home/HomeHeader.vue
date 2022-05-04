<template>
  <v-app-bar
    app
    color="rgba(255,255,255, 0)"
    flat
    class="px-2"
    :height="headerHeight"
  >
    <v-toolbar-title>
      {{ appName }}
    </v-toolbar-title>

    <v-spacer />

    <app-bar-register-button />
    <app-bar-login-button />

    <v-app-bar-nav-icon @click="$emit('handle-toggle-drawer')" />
  </v-app-bar>
</template>

<script>
export default {
  name: 'HomeHeader',
  props: {
    drawer: {
      type: Boolean,
      require: true
    },
    appName: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      headerHeight: this.$store.getters.headerHeight
    }
  }
}
</script>
