<template>
  <div>
    <template v-if="loading">
      <v-row
        style="height: 100vh;"
        justify="center"
        align-content="center"
      >
        <v-col>
          <v-card
            flat
            class="text-center"
          >
            <v-container>
              <v-progress-circular
                indeterminate
                color="primary"
              />
              <p>
                {{ $t('message.loading') }}
              </p>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-else-if="!loading">
      <v-row
        align="center"
        justify="center"
        class="mb-4"
      >
        <v-col
          class="pa-0"
          align="center"
          cols="12"
        >
          <v-card
            id="profile-banner"
            flat
          >
            <template v-if="highestKillLegendStats">
              <v-img
                :src="highestKillLegendStats.ImgAssets.banner"
                :max-height="maxHeight"
                :min-height="minHeight"
              />
            </template>
            <template v-else>
              <v-img
                :src="commonImageSrc"
                :max-height="maxHeight"
                :min-height="minHeight"
              />
            </template>
          </v-card>
        </v-col>
      </v-row>

      <v-container>
        <v-row
          align="center"
          justify="center"
        >
          <!-- ログインユーザーブロック -->
          <v-col
            align="center"
            cols="12"
            sm="8"
            md="8"
            lg="8"
          >
            <profile-user-details
              :auth-user="authUser"
              :user-age="user.age"
            />
          </v-col>

          <!-- Apex Legendsランクブロック -->
          <v-col
            align="center"
            cols="12"
            sm="4"
            md="4"
            lg="4"
          >
            <v-card id="rank-stats">
              <v-container>
                <div class="text-h6 pa-3 text-center">
                  {{ $t('profile.ranked_stats.title.current_ranked_stats') }}
                </div>

                <v-divider />

                <template v-if="isRankedStatsExist">
                  <profile-ranked-stats :ranked-stats="rankedStats" />
                </template>

                <template v-else>
                  <div>
                    {{ $t('message.no_data') }}
                  </div>
                </template>
              </v-container>
            </v-card>
          </v-col>

          <!-- Apex Legends戦績ブロック -->
          <v-col
            align="center"
            cols="12"
          >
            <v-card id="player-stats">
              <v-container>
                <div class="text-h6 pa-3 text-center">
                  {{ $t('profile.total_stats.title.current_player_stats') }}
                </div>

                <v-divider />

                <template v-if="isPlayerTotalStatsExist">
                  <profile-total-stats
                    :player-total-stats="playerTotalStats"
                    :highest-kill-legend-stats="highestKillLegendStats"
                  />
                </template>
                <template v-else>
                  <div>
                    {{ $t('message.no_data') }}
                  </div>
                </template>
              </v-container>
            </v-card>
          </v-col>

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
                  to="/profile/edit"
                  x-large
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-fab-transition>
            </template>
            <span>{{ $t('pages.profile-edit') }}</span>
          </v-tooltip>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ProfileIndexPage',
  data () {
    return {
      user: {
        age: ''
      },
      maxHeight: 400,
      minHeight: 180
    }
  },
  computed: {
    authUser () {
      return this.$auth.user
    },
    data () {
      return this.$game.data
    },
    highestKillLegendStats () {
      return this.$game.highestKillLegendStats
    },
    rankedStats () {
      return this.$game.rankedStats
    },
    playerTotalStats () {
      console.log('playerTotalStats', this.$game.playerTotalStats)
      return this.$game.playerTotalStats
    },
    loading () {
      return this.$game.loading
    },
    isRankedStatsExist () {
      return this.rankedStats.length !== 0
    },
    isPlayerTotalStatsExist () {
      return this.playerTotalStats.length !== 0
    },
    defaultAvatarSrc () {
      return this.$store.getters.defaultAvatarSrc
    },
    commonImageSrc () {
      return this.$store.getters.commonImageSrc
    }
  },
  created () {
    this.user.age = this.getUserAge(this.authUser.date_of_birth)
    this.requestApi(this.authUser)
  },
  methods: {
    async requestApi (authUser) {
      await this.$game.getStats(authUser.game_id, authUser.platform)
    },
    getUserAge (birthday) {
      // console.log(birthday)
      if (!birthday) { return }
      const today = new Date()
      const ymd = birthday.split('-')
      const thisYearsBirthday = new Date(today.getFullYear(), ymd[1] - 1, ymd[2])
      const age = today.getFullYear() - ymd[0]

      return today < thisYearsBirthday ? age - 1 : age
    },
    isDifferentGameId (data) {
      return !this.authUser.game_id === data.global.name
    }
  }
}
</script>
