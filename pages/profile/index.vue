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
          <profile-banner :target-legend="targetLegend" />
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
          <div v-if="rankStatsData">
            <profile-rank-stats :rank-stats-data="rankStatsData" />
          </div>
          <div v-else>
            <p>NO DATA</p>
          </div>
        </v-col>

        <!-- Apex Legends戦績ブロック -->
        <v-col
          align="center"
          cols="12"
        >
          <div v-if="totalStatsData">
            <profile-total-stats
              :total-stats-data="totalStatsData"
              :target-legend="targetLegend"
            />
          </div>
          <div v-else>
            <p>NO DATA</p>
          </div>
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
      legendStatsData: '',
      targetLegend: '',
      rankStatsData: [],
      totalStatsData: '',
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
    // TODO ユーザー情報に登録されたplatformを代入するよう修正
    async getGameData () {
      await this.$axios.$get(
        'search',
        {
          params: {
            game_id: this.authUser.game_id
          }
        }
      )
        .then(res => this.requestSuccessful(res))
        .catch(e => this.requestFailure(e))
    },
    requestSuccessful (res) {
      if (this.isDifferentGameId(res)) {
        this.loading = false
        console.log('idが一致しません。')
        return
      }
      this.data = res
      this.setLegendsData()
      this.setRankData()
      this.setTotalData()
    },
    requestFailure (e) {
      this.loading = false
      console.log(e)
    },
    setLegendsData () {
      this.legendStatsData = this.data.legends.all
      this.getLegendData()
    },
    getLegendKillData () {
      const data = this.legendStatsData
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
      const data = this.getHighestKillData()
      if (data.name in this.legendStatsData) {
        this.targetLegend = this.legendStatsData[data.name]
      }
      this.loading = false
      console.log('targetLegend:', this.targetLegend)
    },
    isDifferentGameId (data) {
      return !this.authUser.game_id === data.global.name
    },
    setRankData () {
      this.rankStatsData.push(this.data.global.arena)
      this.rankStatsData.push(this.data.global.rank)
    },
    setTotalData () {
      this.totalStatsData = this.data.total
    }
  }
}
</script>
