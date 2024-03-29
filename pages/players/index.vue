<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(player, i) in displayPlayers"
        :key="i"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="4"
      >
        <PlayerItem
          :player="player"
          @child-delete-method="deletePlayer"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-tooltip
        left
        color="primary"
      >
        <template #activator="{ on, attrs }">
          <v-fab-transition>
            <v-btn
              color="primary"
              dark
              fixed
              bottom
              right
              fab
              style="z-index: 10;"
              nuxt
              :to="{ name: 'players-create' }"
              x-large
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-fab-transition>
        </template>

        <span>
          {{ $t('pages.players-create') }}
        </span>
      </v-tooltip>
    </v-row>

    <v-row dense>
      <v-col>
        <v-pagination
          v-model="page"
          :length="pageLength"
          @input="setPageNumber"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PlayersIndexPage',
  middleware: ['players'],
  data () {
    return {
      page: 1,
      pageSize: 12,
      pageNumber: 0
    }
  },
  computed: {
    players () {
      return this.$store.getters['players/players']
    },
    pageLength () {
      return Math.ceil(this.players.length / this.pageSize)
    },
    displayPlayers () {
      this.returnTop()

      return this.pageNumber !== 0 ? this.players.slice(this.pageSize * (this.pageNumber - 1), this.pageSize * this.pageNumber) : this.players.slice(0, this.pageSize)
    },
    displayPlayersExist () {
      return this.displayPlayers.length !== 0
    }
  },
  methods: {
    setPageNumber (number) {
      this.pageNumber = number
    },
    returnTop () {
      window.scroll({ top: 0, behavior: 'smooth' })
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
    },
    setToaster () {
      const msg = 'フレンド募集投稿を削除しました'
      const color = 'success'

      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
