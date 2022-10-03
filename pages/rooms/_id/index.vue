<template>
  <v-container>
    <v-row dense>
      <v-col>
        <room-back-previous-page-button />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="6"
        xl="6"
      >
        <v-row dense>
          <v-col cols="12">
            <v-card id="host-profile">
              <v-container>
                <v-card-title>
                  {{ $t('room.host.title') }}
                </v-card-title>

                <v-divider />

                <v-list-item>
                  <div v-show="room.host.avatar_url">
                    <v-list-item-avatar size="70">
                      <v-img :src="room.host.avatar_url" />
                    </v-list-item-avatar>
                  </div>
                  <div v-show="!room.host.avatar_url">
                    <v-list-item-avatar size="70">
                      <v-img :src="defaultAvatarSrc" />
                    </v-list-item-avatar>
                  </div>

                  <v-list-item-content>
                    <v-list-item-title class="title">
                      {{ room.host.name }}
                    </v-list-item-title>

                    <v-list-item-title style="white-space: normal;">
                      {{ room.host.self_introduction }}
                    </v-list-item-title>

                    <v-list-item-title>
                      {{ $t(`gender.${room.host.sex}`) }}
                    </v-list-item-title>

                    <div v-show="room.host.date_of_birth">
                      <v-list-item-title>
                        {{ host.age }}歳
                      </v-list-item-title>
                    </div>
                    <div v-show="!room.host.date_of_birth">
                      <v-list-item-title>
                        {{ $t('Unregistered') }}
                      </v-list-item-title>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-container>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card
              :id="'room' + room.id"
            >
              <v-list-item>
                <div v-show="isRoomClosing(room.application_deadline)">
                  <v-overlay
                    absolute
                    opacity="0.9"
                  >
                    <v-card-text class="font-weight-bold">
                      {{ $t('message.now_closed') }}
                    </v-card-text>
                  </v-overlay>
                </div>

                <v-container>
                  <div class="text-right">
                    <v-chip
                      color="red"
                      dark
                    >
                      あと{{ room.recruitment_number }}人募集
                    </v-chip>
                  </div>

                  <v-card-title>
                    {{ room.title }}
                  </v-card-title>

                  <v-divider />

                  <v-card-text>
                    {{ $t('room.platform.title') }}：
                    <v-chip
                      color="indigo darken-3"
                      dark
                      outlined
                    >
                      {{ $t(`room.platform.${room.platform}`) }}
                    </v-chip>
                  </v-card-text>

                  <v-card-text>
                    {{ $t('room.game_mode.title') }}：
                    <v-chip
                      color="deep-orange darken-3"
                      dark
                      outlined
                    >
                      {{ $t(`room.game_mode.${room.game_mode}`) }}
                    </v-chip>
                  </v-card-text>

                  <v-card-text>
                    {{ $t('room.rank_tier.title') }}：
                    <v-chip
                      color="teal darken-3"
                      dark
                      outlined
                    >
                      {{ $t(`room.rank_tier.${room.rank_tier}`) }}
                    </v-chip>
                  </v-card-text>

                  <v-card-text>
                    {{ $t('room.application_deadline') }}：
                    <v-chip
                      color="pink darken-3"
                      dark
                      outlined
                    >
                      {{ timeToDeadline }}
                    </v-chip>
                  </v-card-text>

                  <v-card-actions>
                    <app-join-request-button
                      :room="room"
                      :auth-user="authUser"
                      :invalid="invalid"
                    />
                  </v-card-actions>
                </v-container>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="6"
        xl="6"
      >
        <v-row dense>
          <v-col cols="12">
            <v-card
              id="host-rank-stats"
              :loading="loading"
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

          <v-col cols="12">
            <v-card
              id="host-total-stats"
              :loading="loading"
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
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RoomIdIndex',
  async asyncData ({ $axios, params }) {
    const room = await $axios.$get(
      'api/v1/rooms/' + params.id
    )

    // console.log('部屋情報:', room)
    // console.log('募集主情報:', room.host)
    return { room }
  },
  data () {
    return {
      invalid: false,
      timeToDeadline: '',
      host: {
        age: ''
      },
      defaultAvatarSrc: this.$store.getters.defaultAvatarSrc
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
    isBreakPointImgWidth () {
      return this.$vuetify.breakpoint.xs ? 100 : 150
    }
  },
  created () {
    this.requestApi(this.room.host)
    this.changeDateFormat()
    this.host.age = this.getUserAge(this.room.host.date_of_birth)
  },
  methods: {
    async requestApi (host) {
      try {
        await this.$game.getStats(host.game_id, host.platform)
      } catch (error) {
        console.log(error)
      }
    },
    isDifferentGameId (data) {
      return !this.room.host.game_id === data.global.name
    },
    isRoomClosing (roomDeadline) {
      const now = new Date()
      const deadline = this.$dayjs(roomDeadline).$d
      return deadline < now
    },
    changeDateFormat () {
      const roomDeadline = this.room.application_deadline
      const minutesToDeadline = this.$dayjs(roomDeadline).fromNow()
      this.timeToDeadline = this.replaceFormat(minutesToDeadline)
      // console.log('締め切り', this.timeToDeadline)
    },
    replaceFormat (str) {
      // console.log('渡された文字列', str)
      if (str.includes('後')) {
        str = str.replace('後', 'で締め切り')
      } else {
        str = '締め切りました'
        this.isInvalid()
      }
      return str
    },
    isInvalid () {
      this.invalid = true
    },
    getUserAge (birthday) {
      if (!birthday) { return }
      const today = new Date()
      const ymd = birthday.split('-')
      const thisYearsBirthday = new Date(today.getFullYear(), ymd[1] - 1, ymd[2])
      const age = today.getFullYear() - ymd[0]

      return today < thisYearsBirthday ? age - 1 : age
    }
  }
}
</script>

<style scoped>
  .white-space {
    white-space: normal;
  }
</style>
