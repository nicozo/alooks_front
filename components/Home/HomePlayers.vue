<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      v-for="(player, i) in recent_players"
      :key="i"
      cols="12"
      lg="6"
      xl="6"
    >
      <v-card>
        <v-container>
          <v-list-item>
            <template v-if="player.host.avatar_url">
              <v-list-item-avatar>
                <v-img :src="player.host.avatar_url" alt="プロフィール画像です" />
              </v-list-item-avatar>
            </template>

            <template v-else>
              <v-list-item-avatar>
                <v-img :src="defaultAvatarSrc" alt="プロフィール画像です" />
              </v-list-item-avatar>
            </template>

            <v-list-item-content>
              <v-list-item-subtitle>
                {{ player.body }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-container>
      </v-card>
    </v-col>

    <v-col cols="12">
      <div
        align="center"
        class="mt-5"
      >
        <v-btn
          color="success"
          class="pa-5"
          nuxt
          :to="{ name: 'players' }"
        >
          {{ $t('btn.to_players_page') }}
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HomePlayers',
  data () {
    return {
      recent_players: [],
      defaultAvatarSrc: this.$store.getters.defaultAvatarSrc
    }
  },
  created () {
    this.getRecentPlayers()
  },
  methods: {
    async getRecentPlayers () {
      await this.$axios.$get(
        'api/v1/players/recent'
      )
        .then(res => this.requestSuccessful(res))
    },
    requestSuccessful (res) {
      this.recent_players = res
    }
  }
}
</script>
