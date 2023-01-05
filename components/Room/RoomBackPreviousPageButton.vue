<template>
  <v-btn
    id="back-previous-page-button"
    plain
    @click="$router.push(homePath)"
  >
    <v-icon>
      mdi-chevron-double-left
    </v-icon>
    {{ $t('btn.back_to_rooms_page') }}
  </v-btn>
</template>

<script>
export default {
  name: 'RoomBackPreviousButton',
  data () {
    return {
      homePath: this.$store.state.loggedIn.homePath.path
    }
  }
}
</script>
