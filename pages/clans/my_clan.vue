<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <clan-details :clan="clan" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MyClanPage',
  middleware: ['my-clan'],
  data () {
    return {
      clan: this.$store.getters['clans/clan']
    }
  }
}
</script>
