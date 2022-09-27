<template>
  <v-container>
    clan: {{ clan }}
  </v-container>
</template>

<script>
export default {
  name: 'ClanUpdatePage',
  middleware: ['clan-edit'],
  data () {
    return {
      clan: this.$store.getters['clans/clan']
    }
  }
}
</script>
