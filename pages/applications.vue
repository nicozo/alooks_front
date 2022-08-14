<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col>
        <template v-if="isApplicationExist">
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

                  <div
                    v-show="isUnread(application)"
                    class="ml-2"
                  >
                    <v-chip
                      color="red darken-3"
                      dark
                    >
                      New
                    </v-chip>
                  </div>
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
                          <template v-if="isRankedStatsExist">
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
        </template>

        <template v-else>
          <v-row
            justify="center"
            align-content="center"
          >
            <v-col>
              <v-card
                flat
                class="text-center"
              >
                <v-container>
                  <p>
                    {{ $t('message.no_requests') }}
                  </p>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SamplePage',
  layout: 'loggedIn',
  async fetch () {
    const res = await await this.$axios.$get('api/v1/applies')
    await this.$store.dispatch('applications/getApplications', res)
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
    applications () {
      return this.$store.getters['applications/applications']
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
    isRankedStatsExist () {
      return this.rankedStats.length !== 0
    },
    isPlayerTotalStatsExist () {
      return this.playerTotalStats.length !== 0
    },
    isApplicationExist () {
      return this.applications.length !== 0
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
    },
    isUnread () {
      return function (application) {
        return application.is_read === false
      }
    }
  },
  methods: {
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
    },
    async read (application) {
      console.log('既読')

      await this.$axios.$patch(
        `api/v1/applies/${application.id}/read`
      )
        .then(res => this.requestSuccessful(res))
        .catch(e => console.log(e))
    },
    requestSuccessful (res) {
      console.log(res)
      console.log(this.applications)
      this.$store.dispatch('applications/getReadApplication', res)
    },
    onExpansionPanelClick (application) {
      if (event.currentTarget.classList.contains('v-expansion-panel-header--active')) {
        console.log('Panel is closing/now closed.')
      } else {
        console.log('Panel is opening/now open.')
        if (this.dataNullOrCheckAnotherApplication(application)) {
          this.requestApi(application)
          console.log('未読？', this.isUnread(application))
          if (this.isUnread(application)) {
            this.read(application)
          }
        }
      }
    },
    dataNullOrCheckAnotherApplication (application) {
      return this.data === '' || application.applicant.game_id !== this.data.global.name
    }
  }
}
</script>
