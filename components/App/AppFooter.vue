<template>
  <v-footer
    id="app-footer"
    app
  >
    <v-col
      cols="12"
      class="py-0"
    >
      <div class="text-center">
        &copy;2022
        <strong>{{ appName }}</strong>
      </div>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data ({ $config: { appName } }) {
    return {
      appName
    }
  }
}
</script>
