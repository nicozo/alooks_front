<template>
  <v-container>
    <v-row dense>
      <v-col>
        <clan-back-previous-button />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <clan-details :clan="clan" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ClanIdIndex',
  middleware: ['clan'],
  data () {
    return {
      clan: this.$store.getters['clans/clan']
    }
  }
}
</script>
