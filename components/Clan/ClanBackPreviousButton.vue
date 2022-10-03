<template>
  <v-btn
    id="back-previous-page-button"
    plain
    @click="$router.push('/clans')"
  >
    <v-icon>
      mdi-chevron-double-left
    </v-icon>
    {{ $t('btn.back_to_clans_page') }}
  </v-btn>
</template>

<script>
export default {
  name: 'ClanBackPreviousButton'
}
</script>
