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
          @child-delete-method="deletePlayer"
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
    },
    async deletePlayer (playerId) {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$delete(
        `api/v1/players/${playerId}`
      )
        .then(res => this.deleteSuccessful(res))
    },
    deleteSuccessful (res) {
      this.$store.dispatch('getBtnLoading', false)
      this.setToaster()
      this.$store.dispatch('players/deletePlayer', res)
      this.$router.push(this.redirectPath)
    },
    setToaster () {
      const msg = 'フレンド募集を削除しました'
      const color = 'success'

      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
