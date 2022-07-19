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
            <v-progress-circular
              indeterminate
              color="primary"
            />
            <p>
              Now Loading Your Apex Legends Status...
            </p>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-else-if="!loading">
      <v-row
        id="profile"
        align="center"
        justify="center"
      >
        <!-- バナーブロック -->
        <v-col
          class="pa-0"
          align="center"
          cols="12"
        >
          <profile-banner :hightest-kill-legend-stats="hightestKillLegendStats" />
        </v-col>

        <v-col cols="12" align="end">
          <v-btn
            color="success"
            to="/profile/edit"
          >
            プロフィールを編集
          </v-btn>
        </v-col>

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
            <div class="text-h6 pa-3 text-center">
              Rank Stats
            </div>

            <div v-if="rankedStats">
              <profile-rank-stats :ranked-stats="rankedStats" />
            </div>
            <div v-else>
              <p>NO DATA</p>
            </div>
          </v-card>
        </v-col>

        <!-- Apex Legends戦績ブロック -->
        <v-col
          align="center"
          cols="12"
        >
          <v-card id="player-stats">
            <div class="text-h6 pa-3 text-center">
              Player Stats
            </div>

            <div v-if="totalStats">
              <profile-total-stats
                :total-stats="totalStats"
                :hightest-kill-legend-stats="hightestKillLegendStats"
              />
            </div>
            <div v-else>
              <p>NO DATA</p>
            </div>
          </v-card>
        </v-col>
      </v-row>
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
      data: '',
      allLegendStats: '',
      hightestKillLegendStats: '',
      rankedStats: [],
      totalStats: '',
      loading: true
    }
  },
  computed: {
    authUser () {
      return this.$auth.user
    }
  },
  created () {
    this.user.age = this.getUserAge(this.authUser.date_of_birth)
    this.getGameData()
  },
  methods: {
    getUserAge (birthday) {
      // console.log(birthday)
      if (!birthday) { return }
      const today = new Date()
      const ymd = birthday.split('-')
      const thisYearsBirthday = new Date(today.getFullYear(), ymd[1] - 1, ymd[2])
      const age = today.getFullYear() - ymd[0]

      return today < thisYearsBirthday ? age - 1 : age
    },
    // TODO room/id/index.vueと同じ表記がある為、クラス化を検討
    async getGameData () {
      await this.$axios.$get(
        'search',
        {
          params: {
            game_id: this.authUser.game_id,
            platform: this.authUser.platform
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
      console.log(e)
      this.isLoading()
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
      console.log('hightestKillLegendStats:', this.hightestKillLegendStats)
    },
    isDifferentGameId (data) {
      return !this.authUser.game_id === data.global.name
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
    }
  }
}
</script>
