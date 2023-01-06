<template>
  <v-btn
    id="back-previous-page-button"
    plain
    @click="$router.push(clansPath)"
  >
    <v-icon>
      mdi-chevron-double-left
    </v-icon>
    {{ $t('btn.back_to_clans_page') }}
  </v-btn>
</template>

<script>
export default {
  name: 'ClanBackPreviousButton',
  data () {
    return {
      clansPath: this.$store.state.loggedIn.clansPath
    }
  }
}
</script>
