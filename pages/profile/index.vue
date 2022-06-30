<template>
  <div>
    <v-row>
      <v-col align="end">
        <v-btn
          color="success"
          to="/profile/edit"
        >
          プロフィールを編集
        </v-btn>
      </v-col>
    </v-row>

    <div v-show="loading">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        />
        <div>
          Now Loading Your Apex Legends Status...
        </div>
      </div>
    </div>

    <div v-show="!loading">
      <div v-if="targetLegend">
        <v-row
          id="profile"
          align="center"
          justify="center"
        >
          <!-- バナーブロック -->
          <v-col
            align="center"
            cols="12"
          >
            <div v-if="targetLegend.ImgAssets">
              <v-img
                :src="targetLegend.ImgAssets.banner"
                max-height="400"
              />
            </div>
            <div v-else>
              <v-img
                :src="defaultAvatarSrc"
                max-height="400"
              />
            </div>
          </v-col>

          <!-- ログインユーザーブロック -->
          <v-col
            align="center"
            cols="12"
            sm="8"
            md="8"
            lg="8"
          >
            <v-card>
              <v-list-item>
                <div v-if="authUser.avatar_url">
                  <v-list-item-avatar size="100">
                    <v-img :src="authUser.avatar_url"/>
                  </v-list-item-avatar>
                </div>
                <div v-else>
                  <v-list-item-avatar size="100">
                    <v-img :src="defaultAvatarSrc"/>
                  </v-list-item-avatar>
                </div>

                <v-list-item-content>
                  <v-list-item-title class="text-h4 text-left">
                    {{ authUser.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-left">
                    {{ authUser.self_introduction }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-left">
                    {{ user.age }}歳
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-left">
                    {{ authUser.sex }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>

          <!-- Apex Legendsランクブロック -->
          <v-col
            align="center"
            cols="12"
            sm="4"
            md="4"
            lg="4"
          >
            <v-card>
              <v-list-item>
                <template v-for="(data, i) in rankData">
                  <v-list-item-content :key="i">
                    <v-list-item-title v-show="isThisArenaRankData(data)">
                      Arena
                    </v-list-item-title>
                    <v-list-item-title v-show="!isThisArenaRankData(data)">
                      BR
                    </v-list-item-title>

                    <v-list-item-icon>
                      <v-img :src="data.rankImg" />
                    </v-list-item-icon>

                    <v-list-item-subtitle>
                      {{ data.rankScore }}RP
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-card>
          </v-col>

          <!-- Apex Legends戦績ブロック -->
          <v-col
            align="center"
            cols="12"
          >
            <v-card>
              <v-list-item>
                <v-list-item-icon>
                  <v-img
                    :src="targetLegend.ImgAssets.icon"
                    max-width="400"
                  />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-card-title>
                    Total Status
                  </v-card-title>
                  <v-row>
                    <v-col
                      cols="6"
                      md="4"
                      lg="4"
                      v-for="(data, i) in totalStatusData"
                      :key="i"
                      v-show="data.name !== 'KD'"
                    >
                      <v-list-item-subtitle>
                        {{ data.name }}
                      </v-list-item-subtitle>

                      <v-list-item-title>
                        {{ data.value }}
                      </v-list-item-title>
                    </v-col>
                  </v-row>

                  <v-card-title>
                    Legend Status
                  </v-card-title>
                  <v-row>
                    <v-col
                      cols="6"
                      md="4"
                      lg="4"
                      v-for="(data, i) in targetLegend.data"
                      :key="i"
                      v-show="filterStatus(data)"
                    >
                      <v-list-item-subtitle>
                        {{ data.name }}
                      </v-list-item-subtitle>

                      <v-list-item-title>
                        {{ data.value }}
                      </v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>

          <v-col
            align="center"
            cols="12"
          >
            <v-card>

            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row
          id="profile"
          align="center"
          justify="center"
        >
          <v-col align="center">
            データがありません
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileIndex',
  data ({ $config: { apiKey } }) {
    return {
      user: {
        age: ''
      },
      defaultAvatarSrc: require('@/static/DefaultAvatar.png'),
      data: '',
      legendData: '',
      targetLegend: '',
      rankData: [],
      totalStatusData: '',
      loading: true,
      apiKey
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
    // TODO APIキーを環境変数に持たせるよう修正
    async getGameData () {
      await this.$axios.$get(
        'https://api.mozambiquehe.re/bridge',
        {
          params: {
            platform: 'PS4',
            player: this.authUser.game_id,
            auth: this.apiKey
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
      this.legendData = this.data.legends.all
      this.getLegendData()
    },
    getLegendKillData () {
      const data = this.legendData
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
      if (data.name in this.legendData) {
        this.targetLegend = this.legendData[data.name]
      }
      this.loading = false
      // console.log('targetLegend:', this.targetLegend)
    },
    isDifferentGameId (data) {
      return !this.authUser.game_id === data.global.name
    },
    setRankData () {
      this.rankData.push(this.data.global.arena)
      this.rankData.push(this.data.global.rank)
    },
    isThisArenaRankData (data) {
      return !data.rankedSeason.indexOf('arena')
    },
    filterStatus (data) {
      return data.name === 'BR Kills' ||
             data.name === 'BR Damage' ||
             data.name === 'BR Wins' ||
             data.name === 'BR Headshots' ||
             data.name.includes('Season')
    },
    setTotalData () {
      this.totalStatusData = this.data.total
    }
  }
}
</script>
