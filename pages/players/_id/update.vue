<template>
  <v-container>
    <v-row>
      <v-col>
        <player-back-previous-button />
      </v-col>
    </v-row>

    <v-row
      align="center"
      justify="center"
    >
      <v-card
        flat
        width="80%"
        max-width="900"
      >
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="updatePlayer">
            <v-container>
              <player-form-body :body.sync="player.body" />

              <v-row>
                <v-col>
                  <v-btn
                    type="submit"
                    block
                    color="primary"
                    :disabled="invalid"
                    :loading="btnLoading"
                  >
                    {{ $t('btn.create') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </form>
        </validation-observer>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PlayersUpdatePage',
  middleware: [
    'authentication',
    'player-edit'
  ],
  data () {
    return {
      player: {
        body: ''
      },
      storePlayer: this.$store.getters['players/player'],
      redirectPath: this.$store.state.loggedIn.playersPath
    }
  },
  computed: {
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  created () {
    this.copyPlayer()
  },
  methods: {
    async updatePlayer () {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$patch(
        `api/v1/players/${this.player.id}`,
        this.player
      )
        .then(res => this.updateSuccessful(res))
        .catch(e => this.updateFailure(e))
    },
    updateSuccessful (res) {
      this.$store.dispatch('players/updatePlayer', res)
      this.$store.dispatch('getBtnLoading', false)
      this.setToaster()
      this.$router.push(this.redirectPath)
    },
    updateFailure ({ response }) {
      this.$store.dispatch('getBtnLoading', false)
      if (response && response.status === 400) {
        const msg = '編集できませんでした。入力間違いがないか確認してください。'

        return this.$store.dispatch('getToast', { msg })
      }
    },
    setToaster () {
      const msg = 'フレンド募集を編集しました'
      const color = 'success'

      return this.$store.dispatch('getToast', { msg, color })
    },
    copyPlayer () {
      this.player = Object.assign({}, this.storePlayer)
    }
  }
}
</script>
