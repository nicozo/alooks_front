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
        <v-card-text class="br pt-0">
          ここではフレンドを募集するための掲示板を作成できます。
          さっそく以下のフォームを記入して、フレンドを募集しよう！
        </v-card-text>

        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="post">
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
  name: 'PlayersCreatePage',
  middleware: [
    'authentication'
  ],
  data () {
    return {
      player: {
        body: ''
      },
      redirectPath: this.$store.state.loggedIn.playersPath
    }
  },
  computed: {
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  methods: {
    async post () {
      if (!this.invalid) {
        this.$store.dispatch('getBtnLoading', true)

        await this.$axios.$post(
          'api/v1/players',
          this.player
        )
          .then(res => this.postSuccessful(res))
          .catch(e => this.postFailure(e))
      }
    },
    postSuccessful (res) {
      this.$store.dispatch('players/addPlayer', res)
      this.setToaster()
      this.$store.dispatch('getBtnLoading', false)
      this.$router.push(this.redirectPath)
    },
    postFailure ({ response }) {
      this.$store.dispatch('getBtnLoading', false)
      if (response && response.status === 400) {
        const msg = '投稿に失敗しました'

        return this.$store.dispatch('getToast', { msg })
      }
    },
    setToaster () {
      const msg = 'フレンド募集を投稿しました'
      const color = 'success'

      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>

<style scoped>
  .br{
    white-space: pre-line;
  }
</style>
