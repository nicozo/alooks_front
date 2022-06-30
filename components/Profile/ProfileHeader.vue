<template>
  <v-app-bar
    id="profile-header"
    app
    flat
    class="px-2"
    :height="headerHeight"
    :color="appBarStyle.color"
    :elevation="appBarStyle.elevation"
  >
    <v-toolbar-title>
      {{ appName }}
    </v-toolbar-title>

    <v-spacer />

    <v-app-bar-nav-icon @click="$emit('handle-toggle-drawer')" />
  </v-app-bar>
</template>

<script>
export default {
  name: 'ProfileHeader',
  props: {
    drawer: {
      type: Boolean,
      require: true
    },
    appName: {
      type: String,
      require: true,
      default: ''
    }
  },
  data () {
    return {
      headerHeight: this.$store.getters.headerHeight
    }
  },
  computed: {
    appBarStyle () {
      const color = 'white'
      const elevation = 4
      return { color, elevation }
    }
  }
}
</script>
