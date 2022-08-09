<template>
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
                            <template v-if="hightestKillLegendStats">
                              <v-img :src="hightestKillLegendStats.ImgAssets.icon" :width="isBreakPointImgWidth" />
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
</template>

<script>
export default {
  name: 'ApplicationsPage',
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
      disabled: false,
      loading: false,
      minWidth: 200,
      data: '',
      allLegendStats: '',
      hightestKillLegendStats: '',
      playerTotalStats: [],
      rankedStats: [],
      defaultAvatarSrc: require('@/static/DefaultAvatar.png'),
      message: ''
    }
  },
  computed: {
    isRankedStatsExist () {
      return this.rankedStats.length !== 0
    },
    isPlayerTotalStatsExist () {
      return this.playerTotalStats.length !== 0
    },
    filteredPlayerTotalStats () {
      return this.playerTotalStats.filter((val) => {
        console.log(`${val.key}:${val.value.name}-${val.value.value}`)
        return val.key.includes('kills', 'damage', 'wins', 'headshots')
        // return val.key === 'specialEvent_kills' ||
        //        val.key === 'specialEvent_damage' ||
        //        val.key === 'specialEvent_wins' ||
        //        val.key === 'headshots'
      })
    },
    isBreakPointImgWidth () {
      return this.$vuetify.breakpoint.xs ? 150 : 200
    }
  },
  // created () {
  //   this.countNewRequest()
  // },
  methods: {
    // isRead (invitation) {
    //   if (invitation.is_new === true) {
    //     this.reduceNumber()
    //     invitation.is_new = false
    //   }
    // },
    // reduceNumber (data) {
    //   this.number--
    // },
    // countNewRequest () {
    //   this.number = 0
    //   for (let index = 0; index < this.invitations.length; index++) {
    //     const obj = this.invitations[index]
    //     if (obj.is_new === true) { this.number++ }
    //   }
    // },
    onExpansionPanelClick (application) {
      console.log(application.applicant.game_id)
      console.log(this.data.global)
      if (event.currentTarget.classList.contains('v-expansion-panel-header--active')) {
        console.log('Panel is closing/now closed.')
      } else {
        console.log('Panel is opening/now open.')
        if (this.data === '' || application.applicant.game_id !== this.data.global.name) {
          this.loading = true
          this.isDisabled()
          this.resetRankedStats()
          this.resetPlayerTotalStats()
          this.getGameData(application)
        }
      }
    },
    async getGameData (application) {
      await this.$axios.$get(
        'search',
        {
          params: {
            game_id: application.applicant.game_id,
            platform: application.applicant.platform
          }
        }
      )
        .then(res => this.requestSuccessful(res))
        .catch(e => this.requestFailure(e))
    },
    requestSuccessful (res) {
      console.log('リクエスト成功')
      console.log(res)
      if (!res.Error) {
        this.data = res
        this.setAllLegendStats()
        this.setRankedStats()
        this.setPlayerTotalStats()
      } else {
        this.message = res.Error
      }
      this.isLoading()
      this.isDisabled()
    },
    requestFailure (e) {
      console.log('リクエスト失敗')
      console.log(e)
      this.isLoading()
      this.isDisabled()
    },
    setAllLegendStats () {
      this.allLegendStats = this.data.legends.all
      this.getLegendStats()
    },
    getAllLegendKillStats () {
      const data = this.allLegendStats
      const allLegendKillData = []

      Object.keys(data).forEach((key) => {
        if (data[key].data !== undefined) {
          Object.values(data[key].data).forEach((value) => {
            if (value.key === 'specialEvent_kills' || value.key === 'kills') {
              const obj = {
                name: '',
                value: ''
              }
              obj.name = key
              obj.value = value.value
              allLegendKillData.push(obj)
            }
          })
        }
      })
      // console.log('allLegendKillData:', allLegendKillData)
      return allLegendKillData
    },
    getHighestKillLegendStats () {
      const data = this.getAllLegendKillStats()
      let hightestKillLegendData = ''
      data.forEach((el) => {
        if (!hightestKillLegendData || hightestKillLegendData.value < el.value) {
          hightestKillLegendData = el
        }
      })
      // console.log('hightestKillLegendData:', hightestKillLegendData)
      return hightestKillLegendData
    },
    getLegendStats () {
      const legend = this.getHighestKillLegendStats()
      if (legend.name in this.allLegendStats) {
        this.hightestKillLegendStats = this.allLegendStats[legend.name]
      }
      // console.log('hightestKillLegendStats:', this.hightestKillLegendStats)
    },
    setRankedStats () {
      this.rankedStats.push(this.data.global.arena)
      this.rankedStats.push(this.data.global.rank)
      console.log('rankedStats:', this.rankedStats)
    },
    resetRankedStats () {
      this.rankedStats = []
    },
    resetPlayerTotalStats () {
      this.playerTotalStats = []
    },
    setPlayerTotalStats () {
      for (const key in this.data.total) {
        const obj = {
          key: '',
          value: ''
        }
        obj.key = key
        obj.value = this.data.total[key]
        this.playerTotalStats.push(obj)
      }
      // console.log('total:', this.playerTotalStats)
    },
    isLoading () {
      this.loading = false
    },
    isArenaRankStats (data) {
      return data.rankedSeason.indexOf('arena')
    },
    isDisabled () {
      this.disabled = !this.disabled
    },
    accept () {
      alert('リクエスト承諾！')
    }
  }
}
</script>
