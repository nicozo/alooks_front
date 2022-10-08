<template>
  <v-container>
    <v-row dense>
      <v-col>
        <room-back-previous-page-button />
      </v-col>
    </v-row>

    <room-details
      :room="room"
      :auth-user="authUser"
      @child-request-api="requestApi"
      @child-delete-method="deleteRoom"
    />
  </v-container>
</template>

<script>
export default {
  name: 'RoomIdIndex',
  middleware: ['room'],
  data () {
    return {
      authUser: this.$auth.user,
      room: this.$store.getters['rooms/room'],
      redirectPath: this.$store.state.loggedIn.homePath
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
    async deleteRoom (roomId) {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$delete(
        `api/v1/rooms/${roomId}`
      )
        .then(res => this.deleteSuccessful(res))
    },
    deleteSuccessful (res) {
      this.$store.dispatch('rooms/deleteRoom', res)
      this.$store.dispatch('getBtnLoading', false)
      this.setToaster()
      this.$router.push(this.redirectPath)
    },
    setToaster () {
      const msg = 'クランを削除しました'
      const color = 'success'

      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
