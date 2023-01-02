<template>
  <v-container>
    <v-row dense>
      <v-col>
        <player-back-previous-button />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <player-details
          :player="player"
          @child-request-api="requestApi"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PlayerIdIndex',
  middleware: ['player'],
  data () {
    return {
      player: this.$store.getters['players/player'],
      redirectPath: this.$store.state.loggedIn.clansPath
    }
  },
  methods: {
    async requestApi (host) {
      try {
        await this.$game.getStats(host.game_id, host.platform)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
