<template>
  <v-btn
    id="back-previous-page-button"
    plain
    @click="$router.push(playersPath)"
  >
    <v-icon>
      mdi-chevron-double-left
    </v-icon>
    {{ $t('btn.back_to_players_page') }}
  </v-btn>
</template>

<script>
export default {
  name: 'PlayerBackPreviousButton',
  data () {
    return {
      playersPath: this.$store.state.loggedIn.playersPath
    }
  }
}
</script>
