<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col>
        <v-expansion-panels>
          <v-expansion-panel
            :id="`application-${application.id}`"
            v-for="(application, i) in applications"
            :key="i"
            class="mb-3"
            :disabled="disabled"
          >
            <v-expansion-panel-header
              @click="onExpansionPanelClick(application)"
            >
              <v-list-item>
                <div v-if="application.applicant.avatar_url">
                  <v-list-item-avatar size="70">
                    <v-img :src="application.applicant.avatar_url" />
                  </v-list-item-avatar>
                </div>
                <div v-else>
                  <v-list-item-avatar size="70">
                    <v-img :src="defaultAvatarSrc" />
                  </v-list-item-avatar>
                </div>

                <v-list-item-content>
                  <v-list-item-title class="text-h5">
                    {{ application.applicant.name }}
                  </v-list-item-title>
                  <div class="text-h6">
                    {{ application.body }}
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-row
                align="center"
                justify="center"
              >
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                  lg="4"
                  xl="4"
                  align="center"
                >
                  <v-card
                    id="request-user-ranked-stats"
                    :loading="loading"
                    :min-width="minWidth"
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
                        <template v-if="isArenaRankedStats">
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
                  sm="8"
                  md="8"
                  lg="8"
                  xl="8"
                  align="center"
                >
                  <v-card
                    id="request-user-total-stats"
                    :loading="loading"
                    :min-width="minWidth"
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
                        <template v-if="isPlayerTotalStatsExist">
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
                                  v-for="(data, i) in filteredPlayerTotalStats"
                                  :key="i"
                                  cols="6"
                                  md="4"
                                  lg="4"
                                >
                                  <v-list-item>
                                    <v-list-item-content>
                                      <v-list-item-subtitle>
                                        {{ data.value.name }}
                                      </v-list-item-subtitle>
                                      <v-list-item-title>
                                        {{ data.value.value }}
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

                <v-col cols="12">
                  <div align="end">
                    <v-btn
                      color="success"
                      @click.once="accept(application)"
                    >
                      {{ $t('btn.accept_request') }}
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SamplePage',
  layout: 'loggedIn',
  async asyncData ({ $axios }) {
    const applications = await $axios.$get(
      'api/v1/applies'
    )
    console.log('参加リクエスト一覧:', applications)
    return { applications }
  },
  data () {
    return {
      minWidth: 200
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
      return this.$game.playerTotalStats
    },
    loading () {
      return this.$game.loading
    },
    disabled () {
      return this.$game.disabled
    },
    isArenaRankedStats () {
      return this.rankedStats.length !== 0
    },
    isPlayerTotalStatsExist () {
      return this.playerTotalStats.length !== 0
    },
    isBreakPointImgWidth () {
      return this.$vuetify.breakpoint.xs ? 150 : 200
    },
    filteredPlayerTotalStats () {
      return this.playerTotalStats.filter((val) => {
        // console.log(`${val.key}:${val.value.name}-${val.value.value}`)
        return val.key.includes('kills', 'damage', 'wins', 'headshots')
        // return val.key === 'specialEvent_kills' ||
        //        val.key === 'specialEvent_damage' ||
        //        val.key === 'specialEvent_wins' ||
        //        val.key === 'headshots'
      })
    },
    defaultAvatarSrc () {
      return this.$store.getters.defaultAvatarSrc
    }
  },
  methods: {
    onExpansionPanelClick (application) {
      if (event.currentTarget.classList.contains('v-expansion-panel-header--active')) {
        console.log('Panel is closing/now closed.')
      } else {
        console.log('Panel is opening/now open.')
        if (this.data === '' || application.applicant.game_id !== this.data.global.name) {
          this.requestApi(application)
        }
      }
    },
    async requestApi (application) {
      try {
        await this.$game.getStats(application.applicant.game_id, application.applicant.platform)
      } catch (error) {
        console.log(error)
      }
    },
    accept (application) {
      console.log(application)
      alert('Accept!')
    }
  }
}
</script>
