<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(application, i) in applications"
      :id="`application-${application.id}`"
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
              {{ $t('application.unread') }}
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
            sm="5"
            md="5"
            lg="5"
            xl="5"
            align="center"
          >
            <application-applicant-profile :applicant="application.applicant" />
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xl="6"
          >
            <v-row>
              <v-col
                cols="12"
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
                                    <v-list-item-subtitle class="white-space">
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
            </v-row>
          </v-col>

          <v-col cols="12">
            <div align="end">
              <app-accept-request-button :application="application" />
            </div>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'ApplicationItem',
  props: {
    applications: {
      type: Array,
      default: () => [],
      required: true
    },
    authUser: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data () {
    return {
      minWidth: 200,
      defaultAvatarSrc: this.$store.getters.defaultAvatarSrc
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
    disabled () {
      return this.$game.disabled
    },
    isRankedStatsExist () {
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
    isUnread () {
      return function (application) {
        return application.is_read === false
      }
    }
  },
  methods: {
    onExpansionPanelClick (application) {
      if (event.currentTarget.classList.contains('v-expansion-panel-header--active')) {
        console.log('Panel is closing/now closed.')
      } else {
        console.log('Panel is opening/now open.')
        if (this.dataNullOrCheckAnotherApplication(application)) {
          this.$emit('child-request-method', application)
          if (this.isUnread(application)) {
            this.$emit('child-read-method', application)
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

<style scoped>
  .white-space {
    white-space: normal;
  }
</style>
