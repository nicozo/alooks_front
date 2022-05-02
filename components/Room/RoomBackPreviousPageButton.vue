<template>
  <v-btn
    plain
    @click="$router.push(homePath)"
  >
    <v-icon>
      mdi-chevron-double-left
    </v-icon>
    戻る
  </v-btn>
</template>

<script>
export default {
  data () {
    return {
      homePath: this.$store.state.loggedIn.homePath.path
    }
  }
}
</script>
