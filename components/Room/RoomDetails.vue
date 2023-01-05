<template>
  <v-card>
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
        <div v-show="item === 'プロフィール'">
          <v-card
            id="host-profile"
            max-width="600"
            flat
          >
            <v-container>
              <v-layout justify-center>
                <div v-show="room.host.avatar_url">
                  <v-avatar size="150">
                    <v-img :src="room.host.avatar_url" />
                  </v-avatar>
                </div>
                <div v-show="!room.host.avatar_url">
                  <v-avatar size="150">
                    <v-img :src="defaultAvatarSrc" />
                  </v-avatar>
                </div>
              </v-layout>

              <v-card-subtitle class="pa-1 font-weight-bold">
                -{{ $t('user.name') }}-
              </v-card-subtitle>
              <v-card-text class="pa-1">
                {{ room.host.name }}
              </v-card-text>

              <v-card-subtitle class="pb-0 pa-1 font-weight-bold">
                -{{ $t('user.self_introduction') }}-
              </v-card-subtitle>
              <v-card-text class="white-space pa-1">
                {{ room.host.self_introduction }}
              </v-card-text>

              <v-card-subtitle class="pa-1 font-weight-bold">
                -{{ $t('user.sex') }}-
              </v-card-subtitle>
              <v-card-text class="pa-1">
                {{ $t(`gender.${room.host.sex}`) }}
              </v-card-text>

              <v-card-subtitle class="pa-1 font-weight-bold">
                -{{ $t('user.age') }}-
              </v-card-subtitle>
              <div v-show="room.host.date_of_birth">
                <v-card-text class="pa-1">
                  {{ host.age }}歳
                </v-card-text>
              </div>
              <div v-show="!room.host.date_of_birth">
                <v-card-text class="pa-1">
                  {{ $t('Unregistered') }}
                </v-card-text>
              </div>

              <v-card-subtitle class="pa-1 font-weight-bold">
                -{{ $t('user.platform') }}-
              </v-card-subtitle>
              <v-card-text class="pa-1">
                {{ room.host.platform }}
              </v-card-text>

              <v-card-subtitle class="pa-1 font-weight-bold">
                -{{ $t('user.kd') }}-
              </v-card-subtitle>
              <div v-show="room.host.kd">
                <v-card-text class="pa-1">
                  {{ room.host.kd }}
                </v-card-text>
              </div>
              <div v-show="!room.host.kd">
                <v-card-text class="pa-1">
                  {{ $t('Unregistered') }}
                </v-card-text>
              </div>

              <v-card-subtitle class="pa-1 font-weight-bold">
                -{{ $t('user.highest_damage') }}-
              </v-card-subtitle>
              <div v-show="room.host.highest_damage">
                <v-card-text class="pa-1">
                  {{ room.host.highest_damage }}
                </v-card-text>
              </div>
              <div v-show="!room.host.highest_damage">
                <v-card-text class="pa-1">
                  {{ $t('Unregistered') }}
                </v-card-text>
              </div>

              <v-card-subtitle class="pa-1 font-weight-bold">
                -{{ $t('user.favorite_weapons') }}-
              </v-card-subtitle>
              <div v-show="room.host.favorite_weapons">
                <v-card-text class="pa-1">
                  {{ room.host.favorite_weapons }}
                </v-card-text>
              </div>
              <div v-show="!room.host.favorite_weapons">
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

        <div v-show="item === '投稿'">
          <v-card
            :id="'room' + room.id"
            max-width="600"
            flat
          >
            <v-list-item>
              <room-item-overlay :application-deadline="room.application_deadline" />

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
              </v-container>
            </v-list-item>
          </v-card>
        </div>
      </v-tab-item>
    </v-tabs-items>

    <template v-if="roomIsOwn()">
      <room-edit-and-delete-button
        :id="room.id"
        @child-delete-method="childRoomDelete"
      />
    </template>

    <template v-else>
      <app-join-request-button
        :room="room"
        :auth-user="authUser"
        :invalid="invalid"
      />
    </template>
  </v-card>
</template>

<script>
export default {
  name: 'RoomDetails',
  props: {
    room: {
      type: Object,
      default: () => {},
      require: true
    },
    authUser: {
      type: Object,
      default: () => {},
      require: true
    }
  },
  data () {
    return {
      items: [
        'プロフィール',
        'ステータス',
        '投稿'
      ],
      tab: null,
      invalid: false,
      timeToDeadline: '',
      host: {
        age: ''
      },
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
    this.childRequestApi()
    this.changeDateFormat()
    this.setUserAge()
  },
  methods: {
    setUserAge () {
      this.host.age = this.getUserAge(this.room.host.date_of_birth)
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
    },
    replaceFormat (str) {
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
    },
    roomIsOwn () {
      return this.authUser.id === this.room.user_id
    },
    childRequestApi () {
      this.$emit('child-request-api', this.room.host)
    },
    childRoomDelete (roomId) {
      this.$emit('child-delete-method', roomId)
    }
  }
}
</script>

<style scoped>
  .white-space {
    white-space: normal;
  }
</style>
