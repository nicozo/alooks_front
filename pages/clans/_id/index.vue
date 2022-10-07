<template>
  <v-container>
    <v-row dense>
      <v-col>
        <clan-back-previous-button />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <clan-details
          :clan="clan"
          @child-delete-method="deleteClan"
        />
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
      clan: this.$store.getters['clans/clan'],
      redirectPath: this.$store.state.loggedIn.clansPath
    }
  },
  methods: {
    async deleteClan (clanId) {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$delete(
        `api/v1/clans/${clanId}`
      )
        .then(res => this.deleteSuccessful(res))
    },
    deleteSuccessful (res) {
      this.$store.dispatch('getBtnLoading', false)
      this.setToaster()
      this.$store.dispatch('clans/deleteClan', res)
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
