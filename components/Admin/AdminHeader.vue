<template>
  <v-app-bar
    app
  >
    <v-app-bar-nav-icon @click="$emit('handle-toggle-drawer')" />

    <v-toolbar-title>
      エペスク管理画面
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AdminHeader',
  props: {
    drawer: {
      type: Boolean,
      require: true
    }
  }
}
</script>
