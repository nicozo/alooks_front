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
              id="host-rank-stats"
              :loading="loading"
              min-height="200"
            >
              <v-container>
                <v-card-title>
                  {{ $t('profile.ranked_stats.title.current_ranked_stats') }}
                </v-card-title>

                <v-divider />

                <template v-if="loading">
                  <v-row
                    justify="center"
                    align-content="center"
                  >
                    <v-col>
                      getting stats...
                    </v-col>
                  </v-row>
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
        </v-row>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="6"
        xl="6"
      >
        <v-card
          :id="'room' + room.id"
          min-height="200"
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
                {{ $t('room.platform') }}：{{ room.platform }}
              </v-card-text>
              <v-card-text>
                {{ $t('room.game_mode') }}：{{ room.game_mode }}
              </v-card-text>
              <v-card-text>
                {{ $t('room.rank_tier') }}：{{ room.rank_tier }}
              </v-card-text>
              <v-card-text>
                {{ $t('room.application_deadline') }}：{{ timeToDeadline }}
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="success"
                  class="ml-auto"
                  :disabled="invalid"
                  @click.once="request()"
                >
                  {{ $t('btn.invitation_request') }}
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-list-item>
        </v-card>
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
      defaultAvatarSrc: require('@/static/DefaultAvatar.png'),
      data: '',
      allLegendStats: '',
      hightestKillLegendStats: '',
      rankedStats: [],
      totalStats: '',
      loading: true,
      invalid: false,
      timeToDeadline: '',
      host: {
        age: ''
      }
    }
  },
  computed: {
    isRankedStatsExist () {
      return this.rankedStats.length !== 0
    }
  },
  created () {
    this.getGameData()
    this.changeDateFormat()
    this.host.age = this.getUserAge(this.room.host.date_of_birth)
  },
  methods: {
    // TODO profile/index.vueと同じ表記がある為、クラス化を検討
    async getGameData () {
      await this.$axios.$get(
        'search',
        {
          params: {
            game_id: this.room.host.game_id,
            platform: this.room.host.platform
          }
        }
      )
        .then(res => this.requestSuccessful(res))
        .catch(e => this.requestFailure(e))
    },
    requestSuccessful (res) {
      if (!res.global) {
        console.log('データがありません')
      } else if (this.isDifferentGameId(res)) {
        console.log('idが一致しません。')
      } else {
        this.data = res
        this.setLegendsData()
        this.setRankData()
        this.setTotalData()
      }
      this.isLoading()
    },
    requestFailure (e) {
      this.isLoading()
      console.log(e)
    },
    setLegendsData () {
      this.allLegendStats = this.data.legends.all
      this.getLegendData()
    },
    getLegendKillData () {
      const data = this.allLegendStats
      const legendKillData = []
      Object.keys(data).forEach((key) => {
        if (data[key].data !== undefined) {
          Object.values(data[key].data).forEach((value) => {
            if (value.name === 'BR Kills') {
              const obj = {
                name: '',
                value: ''
              }
              obj.name = key
              obj.value = value.value
              legendKillData.push(obj)
            }
          })
        }
      })
      // console.log('legendKillData:', legendKillData)
      return legendKillData
    },
    getHighestKillData () {
      const data = this.getLegendKillData()
      let hightestKillLegendData = ''
      data.forEach((el) => {
        if (!hightestKillLegendData || hightestKillLegendData.value < el.value) {
          hightestKillLegendData = el
        }
      })
      // console.log('hightestKillLegendData:', hightestKillLegendData)
      return hightestKillLegendData
    },
    getLegendData () {
      const legend = this.getHighestKillData()
      if (legend.name in this.allLegendStats) {
        this.hightestKillLegendStats = this.allLegendStats[legend.name]
      }
      // console.log('hightestKillLegendStats:', this.hightestKillLegendStats)
    },
    isDifferentGameId (data) {
      return !this.room.host.game_id === data.global.name
    },
    setRankData () {
      this.rankedStats.push(this.data.global.rank)
      this.rankedStats.push(this.data.global.arena)
    },
    setTotalData () {
      this.totalStats = this.data.total
    },
    isLoading () {
      this.loading = false
    },
    isThisArenaRankStats (data) {
      return data.rankedSeason.includes('arena')
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
    request () {
      const requestBtn = event.currentTarget
      requestBtn.classList.add('v-btn--disabled')
      requestBtn.getElementsByClassName('v-btn__content')[0].innerText = 'リクエスト済み'
      alert('りくえすとしたよ！')
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
  .introduction {
    white-space: normal;
  }
</style>
