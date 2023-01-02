<template>
  <v-btn
    id="back-previous-page-button"
    plain
    @click="$router.push('/players')"
  >
    <v-icon>
      mdi-chevron-double-left
    </v-icon>
    {{ $t('btn.back_to_players_page') }}
  </v-btn>
</template>

<script>
export default {
  name: 'PlayerBackPreviousButton'
}
</script>
