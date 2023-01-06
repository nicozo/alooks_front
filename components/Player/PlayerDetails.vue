<template>
  <v-card id="player-details">
    <v-tabs v-model="tab">
      <v-tabs-slider color="success" />

      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <div v-show="item === '詳細'">
          <v-card
            id="friend-recruit-details"
            max-width="600"
            flat
          >
            <v-container>
              <v-layout justify-center>
                <div v-show="player.host.avatar_url">
                  <v-avatar size="150">
                    <v-img :src="player.host.avatar_url" />
                  </v-avatar>
                </div>
                <div v-show="!player.host.avatar_url">
                  <v-avatar size="150">
                    <v-img :src="defaultAvatarSrc" />
                  </v-avatar>
                </div>
              </v-layout>

              <v-card-subtitle class="pa-1 font-weight-bold">
                -{{ $t('player.body') }}-
              </v-card-subtitle>
              <v-card-text>
                {{ player.body }}
              </v-card-text>

              <v-card-subtitle class="pa-1 font-weight-bold">
                -{{ $t('user.name') }}-
              </v-card-subtitle>
              <v-card-text class="pa-1">
                {{ player.host.name }}
              </v-card-text>

              <v-card-subtitle class="pb-0 pa-1 font-weight-bold">
                -{{ $t('user.self_introduction') }}-
              </v-card-subtitle>
              <v-card-text class="white-space pa-1">
                {{ player.host.self_introduction }}
              </v-card-text>

              <v-card-subtitle class="pa-1 font-weight-bold">
                -{{ $t('user.sex') }}-
              </v-card-subtitle>
              <v-card-text class="pa-1">
                {{ $t(`gender.${player.host.sex}`) }}
              </v-card-text>

              <v-card-subtitle class="pa-1 font-weight-bold">
                -{{ $t('user.age') }}-
              </v-card-subtitle>
              <div v-show="player.host.date_of_birth">
                <v-card-text class="pa-1">
                  {{ host.age }}歳
                </v-card-text>
              </div>
              <div v-show="!player.host.date_of_birth">
                <v-card-text class="pa-1">
                  {{ $t('Unregistered') }}
                </v-card-text>
              </div>

              <v-card-subtitle class="pa-1 font-weight-bold">
                -{{ $t('user.platform') }}-
              </v-card-subtitle>
              <v-card-text class="pa-1">
                {{ player.host.platform }}
              </v-card-text>

              <v-card-subtitle class="pa-1 font-weight-bold">
                -{{ $t('user.kd') }}-
              </v-card-subtitle>
              <div v-show="player.host.kd">
                <v-card-text class="pa-1">
                  {{ player.host.kd }}
                </v-card-text>
              </div>
              <div v-show="!player.host.kd">
                <v-card-text class="pa-1">
                  {{ $t('Unregistered') }}
                </v-card-text>
              </div>

              <v-card-subtitle class="pa-1 font-weight-bold">
                -{{ $t('user.highest_damage') }}-
              </v-card-subtitle>
              <div v-show="player.host.highest_damage">
                <v-card-text class="pa-1">
                  {{ player.host.highest_damage }}
                </v-card-text>
              </div>
              <div v-show="!player.host.highest_damage">
                <v-card-text class="pa-1">
                  {{ $t('Unregistered') }}
                </v-card-text>
              </div>

              <v-card-subtitle class="pa-1 font-weight-bold">
                -{{ $t('user.favorite_weapons') }}-
              </v-card-subtitle>
              <div v-show="player.host.favorite_weapons">
                <v-card-text class="pa-1">
                  {{ player.host.favorite_weapons }}
                </v-card-text>
              </div>
              <div v-show="!player.host.favorite_weapons">
                <v-card-text class="pa-1">
                  {{ $t('Unregistered') }}
                </v-card-text>
              </div>
            </v-container>
          </v-card>
        </div>

        <div v-show="item === 'ステータス'">
          <v-card flat>
            <v-container>
              <v-row dense>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="6"
                >
                  <v-card
                    id="host-rank-stats"
                    :loading="loading"
                    flat
                  >
                    <v-container>
                      <v-card-title>
                        {{ $t('profile.ranked_stats.title.current_ranked_stats') }}
                      </v-card-title>

                      <v-divider />

                      <template v-if="loading">
                        <app-loading />
                      </template>

                      <template v-else>
                        <template v-if="$game.isRankedStatsExist()">
                          <profile-ranked-stats :ranked-stats="rankedStats" />
                        </template>

                        <template v-else>
                          <div>
                            {{ $t('message.no_data') }}
                          </div>
                        </template>
                      </template>
                    </v-container>
                  </v-card>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="6"
                >
                  <v-card
                    id="host-total-stats"
                    :loading="loading"
                    flat
                  >
                    <v-container>
                      <v-card-title>
                        {{ $t('profile.total_stats.title.current_player_stats') }}
                      </v-card-title>

                      <v-divider />

                      <template v-if="loading">
                        <app-loading />
                      </template>

                      <template v-else>
                        <template v-if="$game.isPlayerTotalStatsExist()">
                          <v-row dense>
                            <v-col
                              cols="12"
                              sm="5"
                              md="5"
                            >
                              <template v-if="highestKillLegendStats">
                                <v-img :src="highestKillLegendStats.ImgAssets.icon" :width="isBreakPointImgWidth" />
                              </template>
                            </v-col>

                            <v-col
                              cols="12"
                              sm="7"
                              md="7"
                            >
                              <v-row
                                dense
                                align="center"
                                justify="center"
                              >
                                <v-col
                                  v-for="(stats, i) in filteredPlayerTotalStats"
                                  :key="i"
                                  cols="6"
                                >
                                  <v-list-item>
                                    <v-list-item-content>
                                      <v-list-item-subtitle class="white-space">
                                        {{ stats.value.name }}
                                      </v-list-item-subtitle>
                                      <v-list-item-title class="white-space">
                                        {{ stats.value.value }}
                                      </v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </template>

                        <template v-else>
                          <div>
                            {{ $t('message.no_data') }}
                          </div>
                        </template>
                      </template>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </div>
      </v-tab-item>
    </v-tabs-items>

    <v-row
      v-show="playerIsOwn()"
      dense
    >
      <v-col
        cols="12"
        align="center"
      >
        <v-btn
          dark
          color="#1d9bf0"
          width="250"
          @click="twitterShare"
        >
          <v-icon left>
            mdi-twitter
          </v-icon>
          {{ $t('btn.twitter_share') }}
        </v-btn>
      </v-col>
    </v-row>

    <player-edit-and-delete-button
      :id="player.id"
      :user-id="player.user_id"
      @child-delete-method="childDeleteMethod"
    />
  </v-card>
</template>

<script>
export default {
  name: 'PlayerDetails',
  props: {
    player: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data ({ $config: { appFrontUrl } }) {
    return {
      items: [
        '詳細',
        'ステータス'
      ],
      host: {
        age: ''
      },
      tab: null,
      defaultAvatarSrc: this.$store.getters.defaultAvatarSrc,
      appFrontUrl
    }
  },
  computed: {
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
      return this.$game.playerTotalStats
    },
    loading () {
      return this.$game.loading
    },
    filteredPlayerTotalStats () {
      return this.playerTotalStats.filter((val) => {
        return val.key.includes('kills') ||
               val.key.includes('damage') ||
               val.key.includes('wins') ||
               val.key.includes('headshots')
      })
    },
    isBreakPointImgWidth () {
      return this.$vuetify.breakpoint.xs ? 100 : 150
    }
  },
  created () {
    this.setUserAge()
    this.childRequestApi()
  },
  methods: {
    setUserAge () {
      this.host.age = this.getUserAge(this.player.host.date_of_birth)
    },
    getUserAge (birthday) {
      if (!birthday) { return }
      const today = new Date()
      const ymd = birthday.split('-')
      const thisYearsBirthday = new Date(today.getFullYear(), ymd[1] - 1, ymd[2])
      const age = today.getFullYear() - ymd[0]

      return today < thisYearsBirthday ? age - 1 : age
    },
    childRequestApi () {
      this.$emit('child-request-api', this.player.host)
    },
    childDeleteMethod (playerId) {
      this.$emit('child-delete-method', playerId)
    },
    twitterShare () {
      const shareURL =
        'https://twitter.com/intent/tweet?text=' +
        'Apex Legendsで一緒に遊べる方を募集しています！' +
        `%0A${this.appFrontUrl}/players/${this.$route.params.id}` +
        '%20%23apex' + '%20%23apex募集' + '%20%23エペスク' + '%20%23apexフレンド募集'

      location.href = shareURL
    },
    playerIsOwn () {
      return this.$auth.user.id === this.player.user_id
    }
  }
}
</script>

<style scoped>
  .white-space {
    white-space: normal;
  }
</style>
