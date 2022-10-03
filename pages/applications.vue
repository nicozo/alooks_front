<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col>
        <template v-if="isApplicationExist">
          <!-- <v-expansion-panels>
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
                  <v-col cols="12">
                    <v-card>
                      <v-container>
                        <v-card-title>
                          {{ $t('pages.profile') }}
                        </v-card-title>

                        <v-divider />

                        <v-card-subtitle class="pb-1">
                          -{{ $t('user.self_introduction') }}-
                        </v-card-subtitle>
                        <v-card-text>
                          {{ application.applicant.self_introduction }}
                        </v-card-text>

                        <v-card-subtitle class="pb-1 pt-0">
                          -{{ $t('user.sex') }}-
                        </v-card-subtitle>
                        <v-card-text>
                          {{ $t(`gender.${application.applicant.sex}`) }}
                        </v-card-text>

                        <v-card-subtitle class="pb-1 pt-0">
                          -{{ $t('user.date_of_birth') }}-
                        </v-card-subtitle>
                        <v-card-text>
                          {{ getUserAge(application.applicant.date_of_birth) }}歳
                        </v-card-text>

                        <v-card-subtitle class="pb-1 pt-0">
                          -{{ $t('user.kd') }}-
                        </v-card-subtitle>
                        <v-card-text>
                          {{ application.applicant.kd }}
                        </v-card-text>

                        <v-card-subtitle class="pb-1 pt-0">
                          -{{ $t('user.highest_damage') }}-
                        </v-card-subtitle>
                        <v-card-text>
                          {{ application.applicant.highest_damage }}
                        </v-card-text>

                        <v-card-subtitle class="pb-1 pt-0">
                          -{{ $t('user.favorite_weapons') }}-
                        </v-card-subtitle>
                        <v-card-text>
                          {{ application.applicant.favorite_weapons }}
                        </v-card-text>
                      </v-container>
                    </v-card>
                  </v-col>

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

                  <v-col cols="12">
                    <div align="end">
                      <app-accept-request-button :application="application" />
                    </div>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels> -->
          <application-item
            :applications="applications"
            :auth-user="authUser"
            @child-request-method="requestApi"
            @child-read-method="read"
          />
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
  data () {
    return {
      authUser: this.$auth.user
    }
  },
  computed: {
    applications () {
      return this.$store.getters['applications/applications']
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
    async read (application) {
      // console.log('既読')

      await this.$axios.$patch(
        `api/v1/applies/${application.id}/read`
      )
        .then(res => this.requestSuccessful(res))
        .catch(e => console.log(e))
    },
    requestSuccessful (res) {
      // console.log(res)
      // console.log(this.applications)
      this.$store.dispatch('applications/getReadApplication', res)
    },
    isApplicationExist () {
      return this.applications.length !== 0
    }
  }
}
</script>
